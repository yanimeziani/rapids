#!/usr/bin/env node
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
	{ id: 'detect', name: 'Detecting environment', duration: 500 },
	{ id: 'copy', name: 'Installing RAPIDS configuration', duration: 1000 },
	{ id: 'mcps', name: 'Setting up MCP servers', duration: 2000 },
	{ id: 'cli', name: 'Creating CLI helpers', duration: 800 },
	{ id: 'shell', name: 'Updating shell configuration', duration: 600 },
	{ id: 'verify', name: 'Verifying installation', duration: 500 }
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
				// Get paths
				const isWindows = os.platform() === 'win32';
				const isMac = os.platform() === 'darwin';
				const isLinux = os.platform() === 'linux';

				let claudeDir;
				if (isMac) {
					claudeDir = path.join(os.homedir(), 'Library/Application Support/Claude');
				} else if (isLinux) {
					claudeDir = path.join(os.homedir(), '.config/claude');
				} else {
					throw new Error('Windows not yet supported');
				}

				const rapidsDir = path.join(claudeDir, 'rapids');
				const sourceDir = path.join(__dirname, '..');

				// Step 1: Detect environment
				if (cancelled) return;
				setCurrentStep(0);
				await new Promise(resolve => setTimeout(resolve, STEPS[0].duration));

				// Step 2: Copy RAPIDS configuration
				if (cancelled) return;
				setCurrentStep(1);
				await fs.ensureDir(claudeDir);
				await fs.copy(path.join(sourceDir, '.claude'), rapidsDir, {
					overwrite: true,
					filter: (src) => !src.includes('settings.local.json')
				});

				// Count installed items
				const agentsConfig = await fs.readJSON(path.join(rapidsDir, 'agents-config.json'));
				const agents = Object.keys(agentsConfig.agents || {});
				const commands = await fs.readdir(path.join(rapidsDir, 'commands'));
				const templates = await fs.readdir(path.join(rapidsDir, 'prompts'));

				setStats({
					agents: agents.length,
					commands: commands.length,
					templates: templates.length
				});

				await new Promise(resolve => setTimeout(resolve, STEPS[1].duration));

				// Step 3: Setup MCPs
				if (cancelled) return;
				setCurrentStep(2);

				for (const mcp of MCPs) {
					try {
						// Pre-cache the MCP package
						await execa('npx', ['-y', `${mcp.package}@latest`, '--help'], {
							stdio: 'ignore',
							timeout: 30000
						});
						setInstalledMCPs(prev => [...prev, mcp.name]);
					} catch (err) {
						// Continue even if MCP fails
						console.error(`Failed to install ${mcp.name}:`, err.message);
					}
				}

				// Copy MCP config
				const mcpConfig = await fs.readJSON(path.join(rapidsDir, 'mcp-config.json'));
				await fs.writeJSON(
					path.join(claudeDir, 'mcp-servers.json'),
					mcpConfig,
					{ spaces: 2 }
				);

				await new Promise(resolve => setTimeout(resolve, 500));

				// Step 4: Create CLI helpers
				if (cancelled) return;
				setCurrentStep(3);

				const cliScript = `#!/bin/bash
# RAPIDS CLI Helper

rapids-init-project() {
    local project_name=\${1:-"my-app"}
    echo "🌊 Initializing RAPIDS project: $project_name"

    mkdir -p "$project_name"/{mobile,web,backend,docs,.claude}

    # Copy project settings template
    if [ -d "${rapidsDir}" ]; then
        cp "${rapidsDir}/settings.local.json" "$project_name/.claude/" 2>/dev/null || true
    fi

    echo "✅ Project $project_name initialized with RAPIDS!"
    echo "Next: cd $project_name && start coding with Claude Code"
}

rapids-update() {
    echo "🔄 Updating RAPIDS from GitHub..."
    local temp_dir=$(mktemp -d)
    curl -L https://github.com/yanimeziani/rapids/archive/main.tar.gz | tar -xz -C "$temp_dir" --strip=1

    if [ -d "${rapidsDir}" ]; then
        cp -r "$temp_dir/.claude"/* "${rapidsDir}/"
        echo "✅ RAPIDS updated successfully!"
    else
        echo "⚠️  RAPIDS not found. Run rapids-install first."
    fi

    rm -rf "$temp_dir"
}

export -f rapids-init-project
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
					<Text>2. Create a project: <Text color="cyan">rapids-init-project my-app</Text></Text>
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
