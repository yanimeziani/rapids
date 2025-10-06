#!/usr/bin/env tsx
import React, { useState, useEffect } from 'react';
import { render, Box, Text } from 'ink';
import fs from 'fs-extra';
import path from 'path';
import { execaCommand } from 'execa';
import chalk from 'chalk';
import Gradient from 'gradient-string';

const rapidGradient = Gradient(['#FF6B9D', '#C44569', '#6B5B95']);

interface ProjectAnalysis {
  root: string;
  hasNextJs: boolean;
  hasFastAPI: boolean;
  hasFlutter: boolean;
  hasDocker: boolean;
  hasClaudeConfig: boolean;
  packageManager: 'npm' | 'yarn' | 'pnpm' | null;
  structure: 'monorepo' | 'multi-folder' | 'single' | 'unknown';
  detectedFolders: {
    web?: string;
    backend?: string;
    mobile?: string;
  };
}

interface MigrateAppProps {}

const MigrateApp: React.FC<MigrateAppProps> = () => {
  const [status, setStatus] = useState('Analyzing project...');
  const [analysis, setAnalysis] = useState<ProjectAnalysis | null>(null);
  const [step, setStep] = useState<'analyzing' | 'confirm' | 'migrating' | 'done' | 'error'>('analyzing');
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    analyzeProject();
  }, []);

  const analyzeProject = async () => {
    try {
      const cwd = process.cwd();

      // Detect tech stack
      const hasNextJs = await fs.pathExists(path.join(cwd, 'next.config.js')) ||
                        await fs.pathExists(path.join(cwd, 'next.config.ts')) ||
                        await fs.pathExists(path.join(cwd, 'next.config.mjs'));

      const hasFastAPI = await fs.pathExists(path.join(cwd, 'main.py')) ||
                         await fs.pathExists(path.join(cwd, 'app', 'main.py'));

      const hasFlutter = await fs.pathExists(path.join(cwd, 'pubspec.yaml'));

      const hasDocker = await fs.pathExists(path.join(cwd, 'Dockerfile')) ||
                        await fs.pathExists(path.join(cwd, 'docker-compose.yml'));

      const hasClaudeConfig = await fs.pathExists(path.join(cwd, '.claude'));

      // Detect package manager
      let packageManager: 'npm' | 'yarn' | 'pnpm' | null = null;
      if (await fs.pathExists(path.join(cwd, 'pnpm-lock.yaml'))) packageManager = 'pnpm';
      else if (await fs.pathExists(path.join(cwd, 'yarn.lock'))) packageManager = 'yarn';
      else if (await fs.pathExists(path.join(cwd, 'package-lock.json'))) packageManager = 'npm';

      // Detect project structure
      const detectedFolders: ProjectAnalysis['detectedFolders'] = {};
      let structure: ProjectAnalysis['structure'] = 'unknown';

      // Check for monorepo patterns
      const hasWorkspaces = await fs.pathExists(path.join(cwd, 'package.json')).then(exists => {
        if (!exists) return false;
        const pkg = fs.readJsonSync(path.join(cwd, 'package.json'));
        return pkg.workspaces || pkg.private;
      }).catch(() => false);

      // Scan for common folder names
      const folders = await fs.readdir(cwd);

      if (folders.includes('web') || folders.includes('frontend') || folders.includes('client')) {
        detectedFolders.web = folders.includes('web') ? 'web' : (folders.includes('frontend') ? 'frontend' : 'client');
      }

      if (folders.includes('backend') || folders.includes('server') || folders.includes('api')) {
        detectedFolders.backend = folders.includes('backend') ? 'backend' : (folders.includes('server') ? 'server' : 'api');
      }

      if (folders.includes('mobile') || folders.includes('app')) {
        detectedFolders.mobile = folders.includes('mobile') ? 'mobile' : 'app';
      }

      // Determine structure
      if (hasWorkspaces || Object.keys(detectedFolders).length > 1) {
        structure = 'monorepo';
      } else if (Object.keys(detectedFolders).length === 1) {
        structure = 'multi-folder';
      } else if (hasNextJs || hasFastAPI || hasFlutter) {
        structure = 'single';
      }

      const analysisResult: ProjectAnalysis = {
        root: cwd,
        hasNextJs,
        hasFastAPI,
        hasFlutter,
        hasDocker,
        hasClaudeConfig,
        packageManager,
        structure,
        detectedFolders,
      };

      setAnalysis(analysisResult);
      setStep('confirm');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
      setStep('error');
    }
  };

  const migrate = async () => {
    if (!analysis) return;

    setStep('migrating');
    setStatus('Creating backup...');

    try {
      // Create backup of existing .claude/ if it exists
      const claudeDir = path.join(analysis.root, '.claude');
      if (await fs.pathExists(claudeDir)) {
        const backupDir = path.join(analysis.root, '.claude.backup');
        await fs.copy(claudeDir, backupDir);
        setStatus('Backup created at .claude.backup/');
      }

      setStatus('Creating .claude/ configuration...');
      await fs.ensureDir(claudeDir);

      // Create basic config
      setStatus('Generating config.json...');
      const config = {
        projectName: path.basename(analysis.root),
        stack: {
          web: analysis.hasNextJs || !!analysis.detectedFolders.web,
          backend: analysis.hasFastAPI || !!analysis.detectedFolders.backend,
          mobile: analysis.hasFlutter || !!analysis.detectedFolders.mobile,
        },
        folders: analysis.detectedFolders,
        packageManager: analysis.packageManager,
      };
      await fs.writeJson(path.join(claudeDir, 'settings.local.json'), config, { spaces: 2 });

      // Copy STACK_CONFIG.json from global
      setStatus('Setting up stack config...');
      const homeClaudeDir = path.join(process.env.HOME || '~', '.claude');
      if (await fs.pathExists(path.join(homeClaudeDir, 'STACK_CONFIG.json'))) {
        await fs.copy(
          path.join(homeClaudeDir, 'STACK_CONFIG.json'),
          path.join(claudeDir, 'STACK_CONFIG.json')
        );
      }

      // Create CLAUDE.md with project instructions
      setStatus('Creating CLAUDE.md...');
      const claudeMd = `# CLAUDE.md

This project has been migrated to RAPIDS framework.

## Project Structure

${analysis.structure === 'monorepo' ? '- **Monorepo structure**' : ''}
${analysis.detectedFolders.web ? `- **Web**: \`${analysis.detectedFolders.web}/\` ${analysis.hasNextJs ? '(Next.js)' : ''}` : ''}
${analysis.detectedFolders.backend ? `- **Backend**: \`${analysis.detectedFolders.backend}/\` ${analysis.hasFastAPI ? '(FastAPI)' : ''}` : ''}
${analysis.detectedFolders.mobile ? `- **Mobile**: \`${analysis.detectedFolders.mobile}/\` ${analysis.hasFlutter ? '(Flutter)' : ''}` : ''}

## Next Steps

1. **Initialize context system**: Run \`/update-doc initialize\` in Claude Code
2. **Document architecture**: Run \`/update-doc system\`
3. **Create feature plans**: Use \`/update-doc plan <feature-name>\` before building

## Migration Notes

- Original structure preserved
- RAPIDS agents and commands available
- Use \`.agent/\` docs to reduce token usage
- Dockerfiles can be generated on demand with agents

## Package Manager

${analysis.packageManager ? `This project uses **${analysis.packageManager}**` : 'No package manager detected'}
`;
      await fs.writeFile(path.join(analysis.root, 'CLAUDE.md'), claudeMd);

      // Create .claudeignore if not exists
      setStatus('Setting up .claudeignore...');
      const claudeignorePath = path.join(analysis.root, '.claudeignore');
      if (!await fs.pathExists(claudeignorePath)) {
        const claudeignore = `node_modules/
.git/
dist/
build/
.next/
__pycache__/
*.pyc
.env
.DS_Store
`;
        await fs.writeFile(claudeignorePath, claudeignore);
      }

      // Initialize .agent/ folder
      setStatus('Initializing .agent/ documentation system...');
      const agentDir = path.join(analysis.root, '.agent');
      await fs.ensureDir(path.join(agentDir, 'task'));
      await fs.ensureDir(path.join(agentDir, 'task', 'archive'));
      await fs.ensureDir(path.join(agentDir, 'system'));
      await fs.ensureDir(path.join(agentDir, 'sop'));

      // Copy templates from global
      const globalAgentDir = path.join(homeClaudeDir, '.agent');
      if (await fs.pathExists(globalAgentDir)) {
        const readmePath = path.join(globalAgentDir, 'readme.md');
        if (await fs.pathExists(readmePath)) {
          await fs.copy(readmePath, path.join(agentDir, 'readme.md'));
        }

        const taskTemplatePath = path.join(globalAgentDir, 'task', 'template-feature-plan.md');
        if (await fs.pathExists(taskTemplatePath)) {
          await fs.copy(taskTemplatePath, path.join(agentDir, 'task', 'template-feature-plan.md'));
        }

        const sopTemplatePath = path.join(globalAgentDir, 'sop', 'template-sop.md');
        if (await fs.pathExists(sopTemplatePath)) {
          await fs.copy(sopTemplatePath, path.join(agentDir, 'sop', 'template-sop.md'));
        }
      }

      // Create initial architecture overview
      setStatus('Generating architecture overview...');
      const archOverview = `# Architecture Overview

## Project Type
${analysis.structure === 'monorepo' ? 'Multi-stack monorepo' : analysis.structure === 'single' ? 'Single-stack project' : 'Multi-folder project'}

## Tech Stack
${analysis.hasNextJs ? '- **Web**: Next.js\n' : ''}${analysis.hasFastAPI ? '- **Backend**: FastAPI\n' : ''}${analysis.hasFlutter ? '- **Mobile**: Flutter\n' : ''}
## Folder Structure
\`\`\`
${analysis.root}/
${analysis.detectedFolders.web ? `├── ${analysis.detectedFolders.web}/    # Web application\n` : ''}${analysis.detectedFolders.backend ? `├── ${analysis.detectedFolders.backend}/  # Backend API\n` : ''}${analysis.detectedFolders.mobile ? `├── ${analysis.detectedFolders.mobile}/   # Mobile app\n` : ''}└── .agent/        # Context documentation
\`\`\`

## Critical Paths
(To be documented - run code analysis or manually update)

## Key Design Decisions
(To be documented based on existing codebase)
`;
      await fs.writeFile(path.join(agentDir, 'system', 'architecture-overview.md'), archOverview);

      setStatus('Migration complete!');
      setStep('done');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Migration failed');
      setStep('error');
    }
  };

  // Auto-proceed with migration after confirmation
  useEffect(() => {
    if (step === 'confirm') {
      setTimeout(() => migrate(), 1000);
    }
  }, [step]);

  if (step === 'error') {
    return (
      <Box flexDirection="column" padding={1}>
        <Text color="red">✗ {error}</Text>
      </Box>
    );
  }

  if (step === 'analyzing' || !analysis) {
    return (
      <Box flexDirection="column" padding={1}>
        <Text>{rapidGradient('⚡ RAPIDS Migration')}</Text>
        <Text>{status}</Text>
      </Box>
    );
  }

  if (step === 'confirm') {
    return (
      <Box flexDirection="column" padding={1}>
        <Text>{rapidGradient('⚡ RAPIDS Migration')}</Text>
        <Box marginTop={1} flexDirection="column">
          <Text bold>Project Analysis:</Text>
          <Text>  Structure: {analysis.structure}</Text>
          {analysis.hasNextJs && <Text>  ✓ Next.js detected</Text>}
          {analysis.hasFastAPI && <Text>  ✓ FastAPI detected</Text>}
          {analysis.hasFlutter && <Text>  ✓ Flutter detected</Text>}
          {analysis.hasDocker && <Text>  ✓ Docker detected</Text>}
          {analysis.packageManager && <Text>  ✓ Package manager: {analysis.packageManager}</Text>}
          {Object.keys(analysis.detectedFolders).length > 0 && (
            <Text>  ✓ Folders: {Object.values(analysis.detectedFolders).join(', ')}</Text>
          )}
        </Box>
        <Box marginTop={1}>
          <Text color="yellow">⚡ Starting migration...</Text>
        </Box>
      </Box>
    );
  }

  if (step === 'migrating') {
    return (
      <Box flexDirection="column" padding={1}>
        <Text>{rapidGradient('⚡ RAPIDS Migration')}</Text>
        <Text>{status}</Text>
      </Box>
    );
  }

  return (
    <Box flexDirection="column" padding={1}>
      <Text>{rapidGradient('⚡ RAPIDS Migration Complete!')}</Text>
      <Box marginTop={1} flexDirection="column">
        <Text bold>What's new:</Text>
        <Text>  ✓ .claude/ configuration created</Text>
        <Text>  ✓ CLAUDE.md instructions added</Text>
        <Text>  ✓ .agent/ documentation system initialized</Text>
        <Text>  ✓ .claudeignore configured</Text>
      </Box>
      <Box marginTop={1} flexDirection="column">
        <Text bold color="cyan">Next steps:</Text>
        <Text>  1. Open Claude Code in this project</Text>
        <Text>  2. Run: /update-doc system</Text>
        <Text>  3. Start using agents: /feature, /bug, /refactor</Text>
      </Box>
      <Box marginTop={1}>
        <Text color="green">Your existing code is unchanged. RAPIDS tooling is now available!</Text>
      </Box>
    </Box>
  );
};

render(<MigrateApp />);
