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

function App() {
	const [status, setStatus] = useState('checking'); // checking, downloading, updating, success, error
	const [currentVersion, setCurrentVersion] = useState(null);
	const [latestVersion, setLatestVersion] = useState(null);
	const [error, setError] = useState(null);
	const [progress, setProgress] = useState('');

	useEffect(() => {
		let cancelled = false;

		async function update() {
			try {
				// Get paths
				const claudeDir = os.platform() === 'darwin'
					? path.join(os.homedir(), 'Library/Application Support/Claude')
					: path.join(os.homedir(), '.config/claude');

				const rapidsDir = path.join(claudeDir, '.claude');

				// Check current version
				if (!cancelled) {
					setStatus('checking');
					setProgress('Checking current version...');
				}

				if (await fs.pathExists(path.join(rapidsDir, 'RAPIDS_METHOD.md'))) {
					const content = await fs.readFile(path.join(rapidsDir, 'RAPIDS_METHOD.md'), 'utf-8');
					const match = content.match(/v(\d+\.\d+)/);
					if (match) {
						setCurrentVersion(match[1]);
					}
				}

				await new Promise(resolve => setTimeout(resolve, 1000));

				// Download latest
				if (!cancelled) {
					setStatus('downloading');
					setProgress('Downloading latest RAPIDS from GitHub...');
				}

				const tempDir = await fs.mkdtemp(path.join(os.tmpdir(), 'rapids-'));

				await execa('curl', [
					'-L',
					'https://github.com/yanimeziani/rapids/archive/main.tar.gz',
					'-o',
					path.join(tempDir, 'rapids.tar.gz')
				]);

				await new Promise(resolve => setTimeout(resolve, 500));

				// Extract
				if (!cancelled) {
					setProgress('Extracting archive...');
				}

				await execa('tar', [
					'-xzf',
					path.join(tempDir, 'rapids.tar.gz'),
					'-C',
					tempDir,
					'--strip-components=1'
				]);

				// Get new version
				if (await fs.pathExists(path.join(tempDir, '.claude/RAPIDS_METHOD.md'))) {
					const content = await fs.readFile(path.join(tempDir, '.claude/RAPIDS_METHOD.md'), 'utf-8');
					const match = content.match(/v(\d+\.\d+)/);
					if (match) {
						setLatestVersion(match[1]);
					}
				}

				await new Promise(resolve => setTimeout(resolve, 500));

				// Update
				if (!cancelled) {
					setStatus('updating');
					setProgress('Updating RAPIDS configuration...');
				}

				// Backup current settings
				const settingsBackup = await fs.readJSON(
					path.join(rapidsDir, 'settings.local.json')
				).catch(() => null);

				// Copy new files
				await fs.copy(
					path.join(tempDir, '.claude'),
					rapidsDir,
					{ overwrite: true }
				);

				// Restore settings
				if (settingsBackup) {
					await fs.writeJSON(
						path.join(rapidsDir, 'settings.local.json'),
						settingsBackup,
						{ spaces: 2 }
					);
				}

				// Update MCP config
				const mcpConfig = await fs.readJSON(path.join(rapidsDir, 'mcp-config.json'));
				await fs.writeJSON(
					path.join(claudeDir, 'mcp-servers.json'),
					mcpConfig,
					{ spaces: 2 }
				);

				await new Promise(resolve => setTimeout(resolve, 500));

				// Cleanup
				await fs.remove(tempDir);

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

		update();

		return () => {
			cancelled = true;
		};
	}, []);

	if (status === 'error') {
		return (
			<Box flexDirection="column" padding={1}>
				<Text color="red" bold>
					❌ Update Failed
				</Text>
				<Newline />
				<Text color="red">{error}</Text>
				<Newline />
				<Text dimColor>Please try again or report the issue at:</Text>
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
					✅ Successfully Updated!
				</Text>
				<Newline />
				<Box flexDirection="column" borderStyle="round" borderColor="green" padding={1}>
					{currentVersion && latestVersion && (
						<>
							<Text>
								Version: <Text color="gray">{currentVersion}</Text> → <Text color="green" bold>{latestVersion}</Text>
							</Text>
						</>
					)}
					<Text>✓ RAPIDS configuration updated</Text>
					<Text>✓ MCP servers configuration updated</Text>
					<Text>✓ Your project settings preserved</Text>
				</Box>
				<Newline />
				<Box flexDirection="column" borderStyle="round" borderColor="cyan" padding={1}>
					<Text bold color="cyan">
						What's New in {latestVersion}:
					</Text>
					<Text>• Ink TUI by Vadim Demedes</Text>
					<Text>• Interactive project initialization</Text>
					<Text>• Beautiful terminal UI with gradients</Text>
					<Text>• Improved installation flow</Text>
				</Box>
				<Newline />
				<Gradient name="rainbow">
					<Text bold>🌊 RAPIDS is up to date! Keep shipping fast! 🚀</Text>
				</Gradient>
			</Box>
		);
	}

	// Checking, downloading, or updating
	return (
		<Box flexDirection="column" padding={1}>
			<BigText text="RAPIDS" colors={['cyan', 'blue']} />
			<Newline />
			<Text color="cyan">
				<Spinner type="dots" />
				{' '}
				{progress}
			</Text>
			{currentVersion && (
				<>
					<Newline />
					<Text dimColor>Current version: {currentVersion}</Text>
				</>
			)}
		</Box>
	);
}

render(<App />);
