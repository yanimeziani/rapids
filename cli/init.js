#!/usr/bin/env node
import React, { useState } from 'react';
import { render, Text, Box, Newline } from 'ink';
import TextInput from 'ink-text-input';
import SelectInput from 'ink-select-input';
import Spinner from 'ink-spinner';
import Gradient from 'ink-gradient';
import BigText from 'ink-big-text';
import fs from 'fs-extra';
import path from 'path';
import os from 'os';

const STACK_PRESETS = [
	{
		label: '🚀 Full Stack (Mobile + Web + Backend)',
		value: 'full',
		folders: ['mobile', 'web', 'backend', 'docs', '.claude']
	},
	{
		label: '📱 Mobile Only (Flutter)',
		value: 'mobile',
		folders: ['mobile', 'docs', '.claude']
	},
	{
		label: '🌐 Web + Backend',
		value: 'web-backend',
		folders: ['web', 'backend', 'docs', '.claude']
	},
	{
		label: '⚡ Backend Only (FastAPI)',
		value: 'backend',
		folders: ['backend', 'docs', '.claude']
	}
];

function App() {
	const [stage, setStage] = useState('name'); // name, preset, creating, success
	const [projectName, setProjectName] = useState('');
	const [selectedPreset, setSelectedPreset] = useState(null);
	const [error, setError] = useState(null);

	const handleNameSubmit = (value) => {
		if (!value || value.trim() === '') {
			setError('Project name cannot be empty');
			return;
		}
		if (!/^[a-zA-Z0-9-_]+$/.test(value)) {
			setError('Project name can only contain letters, numbers, hyphens, and underscores');
			return;
		}
		setProjectName(value);
		setError(null);
		setStage('preset');
	};

	const handlePresetSelect = async (item) => {
		setSelectedPreset(item);
		setStage('creating');

		try {
			const projectPath = path.join(process.cwd(), projectName);

			// Check if directory exists
			if (await fs.pathExists(projectPath)) {
				setError(`Directory '${projectName}' already exists`);
				setStage('error');
				return;
			}

			// Create project structure
			await fs.ensureDir(projectPath);

			for (const folder of item.folders) {
				await fs.ensureDir(path.join(projectPath, folder));
			}

			// Copy RAPIDS configuration
			const claudeDir = os.platform() === 'darwin'
				? path.join(os.homedir(), 'Library/Application Support/Claude')
				: path.join(os.homedir(), '.config/claude');

			const rapidsDir = path.join(claudeDir, 'rapids');

			if (await fs.pathExists(rapidsDir)) {
				// Copy settings template
				const settingsTemplate = {
					project: {
						name: projectName,
						version: '1.0.0',
						description: `Built with RAPIDS v2.1`,
						repository: `https://github.com/yourusername/${projectName}`,
						website: `https://${projectName}.com`
					},
					stack: {
						mobile: {
							framework: 'Flutter',
							stateManagement: 'Riverpod',
							routing: 'Go Router'
						},
						web: {
							framework: 'Next.js',
							version: '15+',
							runtime: 'React 18'
						},
						backend: {
							framework: 'FastAPI',
							language: 'Python 3.12+',
							database: 'PostgreSQL 16',
							orm: 'SQLAlchemy'
						}
					},
					ports: {
						backend: 8001,
						web: 3000,
						database: 5433
					}
				};

				await fs.writeJSON(
					path.join(projectPath, '.claude/settings.local.json'),
					settingsTemplate,
					{ spaces: 2 }
				);
			}

			// Create Dockerfiles based on preset
			if (item.folders.includes('web')) {
				const webDockerfile = `FROM node:20-alpine AS deps
WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm ci

FROM node:20-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public
EXPOSE 3000
CMD ["node", "server.js"]
`;
				await fs.writeFile(path.join(projectPath, 'web/Dockerfile'), webDockerfile);
			}

			if (item.folders.includes('backend')) {
				const backendDockerfile = `FROM python:3.12-slim
WORKDIR /app
RUN apt-get update && apt-get install -y gcc postgresql-client && rm -rf /var/lib/apt/lists/*
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
COPY . .
HEALTHCHECK --interval=30s --timeout=10s --start-period=40s --retries=3 CMD python -c "import requests; requests.get('http://localhost:8000/health')"
EXPOSE 8000
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
`;
				await fs.writeFile(path.join(projectPath, 'backend/Dockerfile'), backendDockerfile);
			}

			// Create docker-compose.yml if full stack
			if (item.value === 'full' || item.value === 'web-backend') {
				const dockerCompose = `services:
  db:
    image: postgres:16-alpine
    environment:
      POSTGRES_USER: \${POSTGRES_USER:-app}
      POSTGRES_PASSWORD: \${POSTGRES_PASSWORD:-dev_password}
      POSTGRES_DB: \${POSTGRES_DB:-app}
    ports:
      - "5433:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U \${POSTGRES_USER:-app}"]
      interval: 10s
      timeout: 5s
      retries: 5

  backend:
    build:
      context: ./backend
    environment:
      DATABASE_URL: postgresql+asyncpg://\${POSTGRES_USER:-app}:\${POSTGRES_PASSWORD:-dev_password}@db:5432/\${POSTGRES_DB:-app}
    ports:
      - "8001:8000"
    depends_on:
      db:
        condition: service_healthy
    restart: unless-stopped

  web:
    build:
      context: ./web
    environment:
      NEXT_PUBLIC_API_URL: http://localhost:8001
    ports:
      - "3000:3000"
    depends_on:
      - backend
    restart: unless-stopped

volumes:
  postgres_data:
`;
				await fs.writeFile(path.join(projectPath, 'docker-compose.yml'), dockerCompose);
			}

			// Create README
			const readme = `# ${projectName}

Built with RAPIDS v2.1 - Global Claude Code Configuration

## Stack

${item.folders.includes('mobile') ? '- **Mobile**: Flutter + Riverpod + Go Router\n' : ''}${item.folders.includes('web') ? '- **Web**: Next.js 15 + React 18\n' : ''}${item.folders.includes('backend') ? '- **Backend**: FastAPI + PostgreSQL + SQLAlchemy\n' : ''}
## Quick Start

${item.value === 'full' || item.value === 'web-backend' ? `\`\`\`bash
# Start all services
docker compose up -d

# Backend: http://localhost:8001
# Web: http://localhost:3000
\`\`\`
` : ''}
## RAPIDS Agents

All 10 RAPIDS agents are available globally:

- Launch marketing-strategist agent for GTM strategy
- Launch feature-builder for full-stack features
- Launch bug-hunter to find and fix issues
- Launch test-generator for comprehensive tests

## MCP Servers

Use in any Claude Code prompt:

- \`"use context7"\` - Up-to-date documentation
- \`"use puppeteer"\` - Web automation & market research
- \`"use postgres"\` - Direct database queries

---

**RAPIDS v2.1**: Install once. Ship fast. Make money. 🌊
`;
			await fs.writeFile(path.join(projectPath, 'README.md'), readme);

			setStage('success');
		} catch (err) {
			setError(err.message);
			setStage('error');
		}
	};

	if (stage === 'error') {
		return (
			<Box flexDirection="column" padding={1}>
				<Text color="red" bold>
					❌ Project Creation Failed
				</Text>
				<Newline />
				<Text color="red">{error}</Text>
				<Newline />
				<Text dimColor>Try again with a different name</Text>
			</Box>
		);
	}

	if (stage === 'success') {
		return (
			<Box flexDirection="column" padding={1}>
				<Gradient name="rainbow">
					<Text bold>🎉 Project Created Successfully!</Text>
				</Gradient>
				<Newline />
				<Box flexDirection="column" borderStyle="round" borderColor="green" padding={1}>
					<Text color="green" bold>
						✓ {projectName}
					</Text>
					<Text>
						  Preset: {selectedPreset.label}
					</Text>
					<Text>
						  Folders: {selectedPreset.folders.join(', ')}
					</Text>
				</Box>
				<Newline />
				<Text bold color="cyan">
					Next Steps:
				</Text>
				<Text>
					1. <Text color="cyan">cd {projectName}</Text>
				</Text>
				<Text>2. Open in Claude Code</Text>
				<Text>3. Start coding with all 10 RAPIDS agents!</Text>
				<Newline />
				<Gradient name="pastel">
					<Text>🌊 Happy coding with RAPIDS!</Text>
				</Gradient>
			</Box>
		);
	}

	if (stage === 'creating') {
		return (
			<Box flexDirection="column" padding={1}>
				<Text color="cyan">
					<Spinner type="dots" />
					{' '}
					Creating {projectName}...
				</Text>
			</Box>
		);
	}

	if (stage === 'preset') {
		return (
			<Box flexDirection="column" padding={1}>
				<BigText text="RAPIDS" colors={['cyan', 'magenta']} />
				<Newline />
				<Text bold>Select Stack Preset:</Text>
				<Newline />
				<SelectInput items={STACK_PRESETS} onSelect={handlePresetSelect} />
			</Box>
		);
	}

	// Stage: name
	return (
		<Box flexDirection="column" padding={1}>
			<BigText text="RAPIDS" colors={['cyan', 'magenta']} />
			<Newline />
			<Text bold>Create New Project</Text>
			<Newline />
			<Box>
				<Text>Project name: </Text>
				<TextInput
					value={projectName}
					onChange={setProjectName}
					onSubmit={handleNameSubmit}
					placeholder="my-awesome-app"
				/>
			</Box>
			{error && (
				<>
					<Newline />
					<Text color="red">{error}</Text>
				</>
			)}
			<Newline />
			<Text dimColor>Enter a name and press Enter</Text>
		</Box>
	);
}

render(<App />);
