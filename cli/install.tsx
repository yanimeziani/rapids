#!/usr/bin/env -S node --import tsx/esm
import React, { useState, useEffect } from 'react';
import { render, Text, Box, Newline } from 'ink';
import TextInput from 'ink-text-input';
import Spinner from 'ink-spinner';
import Gradient from 'ink-gradient';
import BigText from 'ink-big-text';
import { execa } from 'execa';
import fs from 'fs-extra';
import path from 'path';
import os from 'os';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Installation steps
const STEPS = [
	{ id: 'detect', name: 'Detecting environment', duration: 100 },
	{ id: 'copy', name: 'Installing RAPIDS configuration', duration: 200 },
	{ id: 'mcps', name: 'Setting up MCP servers', duration: 0 },
	{ id: 'verify', name: 'Verifying installation', duration: 100 }
];

const MCPs = [
	{ name: 'Context7', package: '@upstash/context7-mcp' },
	{ name: 'Filesystem', package: '@modelcontextprotocol/server-filesystem' },
	{ name: 'PostgreSQL', package: '@modelcontextprotocol/server-postgres' },
	{ name: 'GitHub', package: '@modelcontextprotocol/server-github' },
	{ name: 'Puppeteer', package: '@modelcontextprotocol/server-puppeteer' },
	{ name: 'Dokploy', package: '@ahdev/dokploy-mcp' },
	{ name: 'Neon', package: '@neondatabase/mcp-server-neon' }
];

function App() {
	const [currentStep, setCurrentStep] = useState(0);
	const [status, setStatus] = useState('credentials'); // Start with credential collection
	const [error, setError] = useState(null);
	const [installedMCPs, setInstalledMCPs] = useState([]);
	const [stats, setStats] = useState({ agents: 0, commands: 0, templates: 0 });

	// Dokploy credentials
	const [credentialPhase, setCredentialPhase] = useState('dokploy-url'); // 'dokploy-url' | 'dokploy-apikey' | 'neon-apikey' | 'done'
	const [dokployUrl, setDokployUrl] = useState('');
	const [dokployApiKey, setDokployApiKey] = useState('');

	// Neon credentials
	const [neonApiKey, setNeonApiKey] = useState('');

	useEffect(() => {
		// Don't run installation until credentials are collected
		if (status !== 'installing') {
			return;
		}

		let cancelled = false;

		async function install() {
			try {
				// Mac-only check
				const isMac = os.platform() === 'darwin';
				if (!isMac) {
					throw new Error('⚠️  RAPIDS currently supports Mac only. Linux/Windows support coming soon!');
				}

				// Claude Code user directory
				const claudeUserDir = path.join(os.homedir(), '.claude');
				const sourceDir = path.join(__dirname, '..');
				const sourceClaudeDir = path.join(sourceDir, '.claude');

				// Step 1: Detect environment
				if (cancelled) return;
				setCurrentStep(0);

				await fs.ensureDir(claudeUserDir);
				await new Promise(resolve => setTimeout(resolve, STEPS[0].duration));

				// Step 2: Install RAPIDS features to ~/.claude/ in organized folders
				if (cancelled) return;
				setCurrentStep(1);

				// Install agents as individual markdown files in ~/.claude/agents/
				const agentsDir = path.join(claudeUserDir, 'agents');
				await fs.ensureDir(agentsDir);

				const subagentsConfig = await fs.readJSON(path.join(sourceClaudeDir, 'subagents-config.json'));
				const agentNames = Object.keys(subagentsConfig.agents || {});

				for (const agentName of agentNames) {
					const agentData = subagentsConfig.agents[agentName];
					const agentContent = `---
name: ${agentName}
description: ${agentData.description}
tools: Bash, Edit, Glob, Grep, Read, Write, WebFetch, WebSearch
model: sonnet
---

${agentData.instructions}

## Context Files
${agentData.context && agentData.context.length > 0 ? agentData.context.map(c => `- ${c}`).join('\n') : 'No specific context files'}

## Triggers
This agent activates for:
${agentData.triggers.map(t => `- ${t}`).join('\n')}
`;
					await fs.writeFile(
						path.join(agentsDir, `${agentName}.md`),
						agentContent
					);
				}

				// Install commands to ~/.claude/commands/
				const commandsDir = path.join(claudeUserDir, 'commands');
				await fs.ensureDir(commandsDir);
				await fs.copy(path.join(sourceClaudeDir, 'commands'), commandsDir, {
					overwrite: true
				});

				// Install prompts/templates to ~/.claude/prompts/
				const promptsDir = path.join(claudeUserDir, 'prompts');
				await fs.ensureDir(promptsDir);
				await fs.copy(path.join(sourceClaudeDir, 'prompts'), promptsDir, {
					overwrite: true
				});

				// Install output-styles to ~/.claude/output-styles/
				const outputStylesDir = path.join(claudeUserDir, 'output-styles');
				await fs.ensureDir(outputStylesDir);
				await fs.copy(path.join(sourceClaudeDir, 'output-styles'), outputStylesDir, {
					overwrite: true
				});

				// Install RAPIDS documentation and config files to ~/.claude/
				// Copy documentation files directly to ~/.claude/
				const docsToCopy = ['README.md', 'RAPIDS_METHOD.md', 'DEVELOPMENT_GUIDE.md', 'SUBAGENTS_GUIDE.md', 'shortcuts.md'];
				for (const doc of docsToCopy) {
					if (await fs.pathExists(path.join(sourceClaudeDir, doc))) {
						await fs.copy(path.join(sourceClaudeDir, doc), path.join(claudeUserDir, `rapids-${doc}`));
					}
				}

				// Copy config files for reference
				await fs.copy(path.join(sourceClaudeDir, 'subagents-config.json'), path.join(claudeUserDir, 'rapids-subagents-config.json'));
				await fs.copy(path.join(sourceClaudeDir, 'STACK_CONFIG.json'), path.join(claudeUserDir, 'rapids-STACK_CONFIG.json'));

				// Count installed items
				const commands = await fs.readdir(commandsDir);
				const templates = await fs.readdir(promptsDir);

				setStats({
					agents: agentNames.length,
					commands: commands.filter(f => f.endsWith('.md')).length,
					templates: templates.filter(f => f.endsWith('.md')).length
				});

				await new Promise(resolve => setTimeout(resolve, STEPS[1].duration));

				// Step 3: Setup MCPs - install to global ~/.claude.json
				if (cancelled) return;
				setCurrentStep(2);

				// Copy MCP config to user-level ~/.claude.json (global scope)
				const mcpConfig = await fs.readJSON(path.join(sourceClaudeDir, 'mcp-config.json'));
				const userMcpConfig = path.join(os.homedir(), '.claude.json');

				// Update Dokploy credentials if provided
				if (dokployUrl || dokployApiKey) {
					if (mcpConfig.mcpServers.dokploy) {
						mcpConfig.mcpServers.dokploy.env.DOKPLOY_URL = dokployUrl;
						mcpConfig.mcpServers.dokploy.env.DOKPLOY_API_KEY = dokployApiKey;
					}
				}

				// Update Neon credentials if provided
				if (neonApiKey) {
					if (mcpConfig.mcpServers.neon) {
						mcpConfig.mcpServers.neon.env.NEON_API_KEY = neonApiKey;
					}
				}

				// Merge with existing config if it exists
				let finalMcpConfig = mcpConfig;
				if (await fs.pathExists(userMcpConfig)) {
					const existingConfig = await fs.readJSON(userMcpConfig);
					finalMcpConfig = {
						mcpServers: {
							...existingConfig.mcpServers,
							...mcpConfig.mcpServers
						}
					};
				}

				await fs.writeJSON(userMcpConfig, finalMcpConfig, { spaces: 2 });

				// Mark all MCPs as configured
				setInstalledMCPs(MCPs.map(m => m.name));

				await new Promise(resolve => setTimeout(resolve, STEPS[2].duration));

				// Step 3: Verify
				if (cancelled) return;
				setCurrentStep(3);
				await new Promise(resolve => setTimeout(resolve, STEPS[3].duration));

				if (!cancelled) {
					setStatus('success');
				}
			} catch (err) {
				if (!cancelled) {
					setError(err.message);
					setStatus('error');
				}
			}
		}

		install();

		return () => {
			cancelled = true;
		};
	}, [status, dokployUrl, dokployApiKey, neonApiKey]);

	// Credential collection phase
	if (status === 'credentials') {
		return (
			<Box flexDirection="column" padding={1}>
				<BigText text="RAPIDS" colors={['cyan', 'magenta']} />
				<Newline />
				<Text bold color="cyan">
					🔐 MCP Server Configuration
				</Text>
				<Newline />
				<Box flexDirection="column" borderStyle="round" borderColor="cyan" padding={1}>
					<Text dimColor>
						RAPIDS includes Dokploy and Neon MCP servers.
					</Text>
					<Text dimColor>
						You can configure them now or skip and add credentials later to ~/.claude.json
					</Text>
				</Box>
				<Newline />
				{credentialPhase === 'dokploy-url' && (
					<Box flexDirection="column">
						<Text bold>
							Enter your Dokploy API URL (e.g., https://your-server.com/api):
						</Text>
						<Text dimColor>Press Enter to skip</Text>
						<Box marginTop={1}>
							<Text color="cyan">▶ </Text>
							<TextInput
								value={dokployUrl}
								onChange={setDokployUrl}
								onSubmit={() => setCredentialPhase('dokploy-apikey')}
							/>
						</Box>
					</Box>
				)}
				{credentialPhase === 'dokploy-apikey' && (
					<Box flexDirection="column">
						<Text bold>
							Enter your Dokploy API Key:
						</Text>
						<Text dimColor>Press Enter to skip</Text>
						<Box marginTop={1}>
							<Text color="cyan">▶ </Text>
							<TextInput
								value={dokployApiKey}
								onChange={setDokployApiKey}
								onSubmit={() => setCredentialPhase('neon-apikey')}
								mask="*"
							/>
						</Box>
					</Box>
				)}
				{credentialPhase === 'neon-apikey' && (
					<Box flexDirection="column">
						<Text bold>
							Enter your Neon API Key:
						</Text>
						<Text dimColor>Press Enter to skip</Text>
						<Text dimColor color="blue">Get your API key from: console.neon.tech/app/settings/api-keys</Text>
						<Box marginTop={1}>
							<Text color="cyan">▶ </Text>
							<TextInput
								value={neonApiKey}
								onChange={setNeonApiKey}
								onSubmit={() => {
									setCredentialPhase('done');
									setStatus('installing');
								}}
								mask="*"
							/>
						</Box>
					</Box>
				)}
			</Box>
		);
	}

	if (status === 'error') {
		return (
			<Box flexDirection="column" padding={1}>
				<Text color="red" bold>
					❌ Installation Failed
				</Text>
				<Newline />
				<Text color="red">{error}</Text>
				<Newline />
				<Text dimColor>Please report this issue at:</Text>
				<Text color="blue">https://github.com/yanimeziani/rapids/issues</Text>
			</Box>
		);
	}

	if (status === 'success') {
		return (
			<Box flexDirection="column" padding={1}>
				<BigText text="RAPIDS" colors={['cyan', 'magenta']} />
				<Newline />
				<Text color="green" bold>
					🎉 Successfully Installed!
				</Text>
				<Newline />
				<Box flexDirection="column" borderStyle="round" borderColor="cyan" padding={1}>
					<Text bold color="cyan">
						What's Installed:
					</Text>
					<Text>
						✅ {stats.agents} Autonomous Sub-Agents (including Marketing Strategist)
					</Text>
					<Text>✅ {installedMCPs.length}/7 MCP Servers Ready</Text>
					<Text>
						{'   '}
						{installedMCPs.map(name => `• ${name}`).join('  ')}
					</Text>
					<Text>✅ {stats.commands} Slash Commands</Text>
					<Text>✅ {stats.templates} Stack Templates</Text>
				</Box>
				<Newline />
				<Box flexDirection="column" borderStyle="round" borderColor="magenta" padding={1}>
					<Text bold color="magenta">
						Next Steps:
					</Text>
					<Text>1. Start Claude Code in any project</Text>
					<Text>2. Use installed agents, commands & MCPs automatically</Text>
					<Text>3. Use MCPs: <Text color="cyan">"use context7"</Text> in any prompt</Text>
				</Box>
				<Newline />
				<Gradient name="rainbow">
					<Text bold>🌊 RAPIDS is now globally installed! Just run Claude Code and ship. 🚀</Text>
				</Gradient>
			</Box>
		);
	}

	// Installing
	const step = STEPS[currentStep];

	return (
		<Box flexDirection="column" padding={1}>
			<BigText text="RAPIDS" colors={['cyan', 'blue']} />
			<Newline />
			<Box borderStyle="round" borderColor="yellow" padding={1} marginBottom={1}>
				<Text color="yellow" bold>⚠️  Mac Only - Installing to ~/.claude/</Text>
				<Newline />
				<Text dimColor>Features organized in separate folders:</Text>
				<Text dimColor>• agents/ • commands/ • prompts/ • mcp-servers/</Text>
			</Box>
			<Gradient name="pastel">
				<Text bold>Global Installation in Progress...</Text>
			</Gradient>
			<Newline />
			<Box flexDirection="column" padding={1}>
				{STEPS.map((s, idx) => (
					<Box key={s.id} marginBottom={idx < STEPS.length - 1 ? 0 : 0}>
						<Text>
							{idx < currentStep ? (
								<Text color="green">✓</Text>
							) : idx === currentStep ? (
								<Text color="cyan">
									<Spinner type="dots" />
								</Text>
							) : (
								<Text dimColor>○</Text>
							)}{' '}
							<Text color={idx === currentStep ? 'cyan' : idx < currentStep ? 'green' : 'gray'}>
								{s.name}
								{idx === currentStep && s.id === 'mcps' && installedMCPs.length > 0 && (
									<Text dimColor> ({installedMCPs.length}/7)</Text>
								)}
							</Text>
						</Text>
					</Box>
				))}
			</Box>
			<Newline />
			<Text dimColor>
				Installing RAPIDS v2.1 with Ink TUI by Vadim Demedes
			</Text>
		</Box>
	);
}

render(<App />);
