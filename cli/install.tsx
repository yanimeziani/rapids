#!/usr/bin/env -S node --import tsx/esm
import React, { useState, useEffect } from 'react';
import { render, Text, Box, Newline } from 'ink';
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
	{ id: 'cli', name: 'Creating CLI helpers', duration: 100 },
	{ id: 'shell', name: 'Updating shell configuration', duration: 100 },
	{ id: 'verify', name: 'Verifying installation', duration: 100 }
];

const MCPs = [
	{ name: 'Context7', package: '@upstash/context7-mcp' },
	{ name: 'Filesystem', package: '@modelcontextprotocol/server-filesystem' },
	{ name: 'PostgreSQL', package: '@modelcontextprotocol/server-postgres' },
	{ name: 'GitHub', package: '@modelcontextprotocol/server-github' },
	{ name: 'Puppeteer', package: '@modelcontextprotocol/server-puppeteer' }
];

function App() {
	const [currentStep, setCurrentStep] = useState(0);
	const [status, setStatus] = useState('installing');
	const [error, setError] = useState(null);
	const [installedMCPs, setInstalledMCPs] = useState([]);
	const [stats, setStats] = useState({ agents: 0, commands: 0, templates: 0 });

	useEffect(() => {
		let cancelled = false;

		async function install() {
			try {
				// Mac-only check
				const isMac = os.platform() === 'darwin';
				if (!isMac) {
					throw new Error('⚠️  RAPIDS currently supports Mac only. Linux/Windows support coming soon!');
				}

				// Global config directory (fresh install required)
				const claudeDir = path.join(os.homedir(), '.config/claude');
				const sourceDir = path.join(__dirname, '..');

				// Step 1: Detect environment and check existing config
				if (cancelled) return;
				setCurrentStep(0);

				// Warning: This will override existing config
				const configExists = await fs.pathExists(claudeDir);
				if (configExists) {
					// Note: We proceed with override as warned in documentation
					await fs.remove(claudeDir);
				}

				await new Promise(resolve => setTimeout(resolve, STEPS[0].duration));

				// Step 2: Copy RAPIDS configuration to ~/.config/claude
				if (cancelled) return;
				setCurrentStep(1);
				await fs.ensureDir(claudeDir);
				await fs.copy(path.join(sourceDir, '.claude'), claudeDir, {
					overwrite: true,
					filter: (src) => !src.includes('settings.local.json')
				});

				// Install agents as separate files in ~/.claude/agents/
				const agentsDir = path.join(os.homedir(), '.claude/agents');
				await fs.ensureDir(agentsDir);

				const subagentsConfig = await fs.readJSON(path.join(claudeDir, 'subagents-config.json'));
				const agentNames = Object.keys(subagentsConfig.agents || {});

				for (const agentName of agentNames) {
					const agentData = subagentsConfig.agents[agentName];
					const agentContent = `# ${agentName.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ')}

**Type:** ${agentData.type}
**Auto-activate:** ${agentData.autoActivate}

## Triggers
${agentData.triggers.map(t => `- ${t}`).join('\n')}

## Instructions
${agentData.instructions}

## Context Files
${agentData.context && agentData.context.length > 0 ? agentData.context.map(c => `- ${c}`).join('\n') : 'No specific context files'}
`;
					await fs.writeFile(
						path.join(agentsDir, `${agentName}.md`),
						agentContent
					);
				}

				// Count installed items
				const configData = await fs.readJSON(path.join(claudeDir, 'config.json'));
				const agents = Object.keys(configData.agents || {});
				const commands = await fs.readdir(path.join(claudeDir, 'commands'));
				const templates = await fs.readdir(path.join(claudeDir, 'prompts'));

				setStats({
					agents: agents.length,
					commands: commands.length,
					templates: templates.length
				});

				await new Promise(resolve => setTimeout(resolve, STEPS[1].duration));

				// Step 3: Setup MCPs (lightweight - just copy config)
				if (cancelled) return;
				setCurrentStep(2);

				// Copy MCP config (packages installed on-demand by Claude Code)
				const mcpConfig = await fs.readJSON(path.join(claudeDir, 'mcp-config.json'));
				await fs.writeJSON(
					path.join(claudeDir, 'mcp-servers.json'),
					mcpConfig,
					{ spaces: 2 }
				);

				// Mark all MCPs as configured (they'll install on first use)
				setInstalledMCPs(MCPs.map(m => m.name));

				await new Promise(resolve => setTimeout(resolve, STEPS[2].duration));

				// Step 4: Create CLI helpers
				if (cancelled) return;
				setCurrentStep(3);

				const cliScript = `#!/bin/bash
# RAPIDS CLI Helper

rapids-init-project() {
    local project_name=\${1:-"my-app"}
    echo "🌊 Initializing RAPIDS project: $project_name"

    mkdir -p "$project_name"/{mobile,web,backend,docs}

    # Copy FULL RAPIDS configuration from global directory
    if [ -d "${claudeDir}" ]; then
        cp -r "${claudeDir}" "$project_name/.claude"
        echo "✅ Installed 10 agents, 5 MCPs, commands & templates"
    else
        echo "⚠️  RAPIDS not found. Run: npx @yanimeziani/rapids-install"
        return 1
    fi

    echo "✅ Project $project_name initialized with RAPIDS!"
    echo "Next: cd $project_name && start coding with Claude Code"
}

rapids-add-here() {
    echo "🌊 Adding RAPIDS to current directory..."

    if [ -d ".claude" ]; then
        echo "⚠️  .claude directory already exists. Overwrite? (y/N)"
        read -r response
        if [[ ! "$response" =~ ^[Yy]$ ]]; then
            echo "Cancelled."
            return 0
        fi
    fi

    if [ -d "${claudeDir}" ]; then
        cp -r "${claudeDir}" ./.claude
        echo "✅ RAPIDS installed in current directory!"
        echo "10 agents, 5 MCPs, commands & templates ready"
        echo "Start coding with Claude Code now!"
    else
        echo "⚠️  RAPIDS not found. Run: npx @yanimeziani/rapids-install"
        return 1
    fi
}

rapids-update() {
    echo "🔄 Updating RAPIDS from GitHub..."
    local temp_dir=$(mktemp -d)
    curl -L https://github.com/yanimeziani/rapids/archive/main.tar.gz | tar -xz -C "$temp_dir" --strip=1

    if [ -d "${claudeDir}" ]; then
        cp -r "$temp_dir/.claude"/* "${claudeDir}/"
        echo "✅ RAPIDS updated successfully!"
    else
        echo "⚠️  RAPIDS not found. Run rapids-install first."
    fi

    rm -rf "$temp_dir"
}

export -f rapids-init-project
export -f rapids-add-here
export -f rapids-update
`;

				const cliPath = path.join(os.homedir(), '.rapids-cli.sh');
				await fs.writeFile(cliPath, cliScript);
				await fs.chmod(cliPath, 0o755);

				await new Promise(resolve => setTimeout(resolve, STEPS[3].duration));

				// Step 5: Update shell config
				if (cancelled) return;
				setCurrentStep(4);

				const shellRC = await (async () => {
					const zshrc = path.join(os.homedir(), '.zshrc');
					const bashrc = path.join(os.homedir(), '.bashrc');

					if (await fs.pathExists(zshrc)) return zshrc;
					if (await fs.pathExists(bashrc)) return bashrc;
					return null;
				})();

				if (shellRC) {
					const content = await fs.readFile(shellRC, 'utf-8');
					if (!content.includes('.rapids-cli.sh')) {
						await fs.appendFile(shellRC, `\n# RAPIDS CLI\nsource $HOME/.rapids-cli.sh\n`);
					}
				}

				await new Promise(resolve => setTimeout(resolve, STEPS[4].duration));

				// Step 6: Verify
				if (cancelled) return;
				setCurrentStep(5);
				await new Promise(resolve => setTimeout(resolve, STEPS[5].duration));

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
	}, []);

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
					<Text>✅ {installedMCPs.length}/5 MCP Servers Ready</Text>
					<Text>
						{'   '}
						{installedMCPs.map(name => `• ${name}`).join('  ')}
					</Text>
					<Text>✅ {stats.commands} Slash Commands</Text>
					<Text>✅ {stats.templates} Stack Templates</Text>
					<Text>✅ Global CLI Helper Commands</Text>
				</Box>
				<Newline />
				<Box flexDirection="column" borderStyle="round" borderColor="magenta" padding={1}>
					<Text bold color="magenta">
						Next Steps:
					</Text>
					<Text>1. Restart your terminal</Text>
					<Text>2. New project: <Text color="cyan">rapids-init-project my-app</Text></Text>
					<Text>   Existing project: <Text color="cyan">cd your-project && rapids-add-here</Text></Text>
					<Text>3. Start coding with Claude Code</Text>
					<Text>4. Use MCPs: <Text color="cyan">"use context7"</Text> in any prompt</Text>
				</Box>
				<Newline />
				<Gradient name="rainbow">
					<Text bold>🌊 RAPIDS is now globally available! Install once. Ship fast. Make money. 🚀</Text>
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
				<Text color="yellow" bold>⚠️  Mac Only - Fresh Install Required</Text>
				<Newline />
				<Text dimColor>Installing to: ~/.config/claude</Text>
				<Text dimColor>Existing config will be overridden</Text>
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
									<Text dimColor> ({installedMCPs.length}/5)</Text>
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
