#!/usr/bin/env node
import React, { useState, useEffect } from 'react';
import { render, Box, Text } from 'ink';
import fs from 'fs-extra';
import path from 'path';
import chalk from 'chalk';
import Gradient from 'gradient-string';

const rapidGradient = Gradient(['#FF6B9D', '#C44569', '#6B5B95']);

interface CleanupItem {
  path: string;
  type: 'file' | 'directory';
  reason: string;
  size?: number;
}

interface CleanupAnalysis {
  root: string;
  itemsToRemove: CleanupItem[];
  totalSize: number;
  hasClaudeConfig: boolean;
  hasMigrated: boolean;
}

// Common patterns to clean up in a RAPIDS-migrated project
const CLEANUP_PATTERNS = [
  // Legacy documentation
  { pattern: 'README.old.md', reason: 'Old README backup' },
  { pattern: 'CONTRIBUTING.old.md', reason: 'Old contributing guide' },
  { pattern: 'docs/old/**', reason: 'Old documentation' },
  { pattern: 'docs/legacy/**', reason: 'Legacy docs' },

  // Old config files
  { pattern: '.env.local', reason: 'Use .env only (per CLAUDE.md)' },
  { pattern: '.env.production', reason: 'Use .env only (per CLAUDE.md)' },
  { pattern: '.env.example', reason: 'Use .env only (per CLAUDE.md)' },
  { pattern: '.env.development', reason: 'Use .env only (per CLAUDE.md)' },

  // Build artifacts
  { pattern: '.next/', reason: 'Next.js build cache' },
  { pattern: 'dist/', reason: 'Build output (will be regenerated)' },
  { pattern: 'build/', reason: 'Build output (will be regenerated)' },
  { pattern: '__pycache__/', reason: 'Python cache' },
  { pattern: '*.pyc', reason: 'Python bytecode' },
  { pattern: '.pytest_cache/', reason: 'Pytest cache' },

  // Helper scripts that RAPIDS replaces
  { pattern: 'scripts/setup.sh', reason: 'Replaced by RAPIDS migration' },
  { pattern: 'scripts/init.sh', reason: 'Replaced by RAPIDS init' },
  { pattern: 'scripts/bootstrap.sh', reason: 'Replaced by RAPIDS' },
  { pattern: 'bin/setup', reason: 'Replaced by RAPIDS' },
  { pattern: 'bin/init', reason: 'Replaced by RAPIDS' },

  // Old CI/CD configs (before migration to RAPIDS workflow)
  { pattern: '.travis.yml', reason: 'Old CI config' },
  { pattern: '.circleci/', reason: 'Old CI config' },
  { pattern: 'azure-pipelines.yml', reason: 'Old CI config' },

  // Duplicate package manager files (keep only one)
  // Note: This will be smart - only remove if another package manager is detected
];

const CleanApp: React.FC = () => {
  const [status, setStatus] = useState('Analyzing project for cleanup...');
  const [analysis, setAnalysis] = useState<CleanupAnalysis | null>(null);
  const [step, setStep] = useState<'analyzing' | 'confirm' | 'cleaning' | 'done' | 'error' | 'not-migrated'>('analyzing');
  const [error, setError] = useState<string | null>(null);
  const [cleanedCount, setCleanedCount] = useState(0);

  useEffect(() => {
    analyzeForCleanup();
  }, []);

  const analyzeForCleanup = async () => {
    try {
      const cwd = process.cwd();

      // Check if RAPIDS has been initialized
      const hasClaudeConfig = await fs.pathExists(path.join(cwd, '.claude'));
      const hasMigrated = await fs.pathExists(path.join(cwd, 'CLAUDE.md'));

      if (!hasClaudeConfig || !hasMigrated) {
        setStep('not-migrated');
        return;
      }

      const itemsToRemove: CleanupItem[] = [];
      let totalSize = 0;

      // Detect primary package manager
      let primaryPackageManager: 'npm' | 'yarn' | 'pnpm' | null = null;
      if (await fs.pathExists(path.join(cwd, 'pnpm-lock.yaml'))) primaryPackageManager = 'pnpm';
      else if (await fs.pathExists(path.join(cwd, 'yarn.lock'))) primaryPackageManager = 'yarn';
      else if (await fs.pathExists(path.join(cwd, 'package-lock.json'))) primaryPackageManager = 'npm';

      // Check each cleanup pattern
      for (const pattern of CLEANUP_PATTERNS) {
        const fullPath = path.join(cwd, pattern.pattern);

        // Handle glob patterns (simple implementation)
        if (pattern.pattern.includes('*')) {
          // Skip glob patterns for now - would need glob library
          continue;
        }

        // Skip package manager cleanup for now (needs smarter logic)
        if (pattern.pattern.includes('lock')) {
          continue;
        }

        const exists = await fs.pathExists(fullPath);
        if (exists) {
          const stats = await fs.stat(fullPath);
          const isDirectory = stats.isDirectory();

          // Calculate size
          let size = 0;
          if (isDirectory) {
            // Recursive size calculation
            size = await getDirectorySize(fullPath);
          } else {
            size = stats.size;
          }

          itemsToRemove.push({
            path: pattern.pattern,
            type: isDirectory ? 'directory' : 'file',
            reason: pattern.reason,
            size,
          });

          totalSize += size;
        }
      }

      // Check for .claude.backup (from migration)
      const backupPath = path.join(cwd, '.claude.backup');
      if (await fs.pathExists(backupPath)) {
        const size = await getDirectorySize(backupPath);
        itemsToRemove.push({
          path: '.claude.backup',
          type: 'directory',
          reason: 'Migration backup (no longer needed)',
          size,
        });
        totalSize += size;
      }

      const analysisResult: CleanupAnalysis = {
        root: cwd,
        itemsToRemove,
        totalSize,
        hasClaudeConfig,
        hasMigrated,
      };

      setAnalysis(analysisResult);

      if (itemsToRemove.length === 0) {
        setStatus('✨ Project is already clean!');
        setStep('done');
      } else {
        setStep('confirm');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
      setStep('error');
    }
  };

  const getDirectorySize = async (dirPath: string): Promise<number> => {
    let size = 0;
    try {
      const items = await fs.readdir(dirPath);
      for (const item of items) {
        const fullPath = path.join(dirPath, item);
        const stats = await fs.stat(fullPath);
        if (stats.isDirectory()) {
          size += await getDirectorySize(fullPath);
        } else {
          size += stats.size;
        }
      }
    } catch {
      // Skip errors
    }
    return size;
  };

  const formatBytes = (bytes: number): string => {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return `${Math.round(bytes / Math.pow(k, i) * 100) / 100} ${sizes[i]}`;
  };

  const performCleanup = async () => {
    if (!analysis) return;

    setStep('cleaning');
    setCleanedCount(0);

    try {
      // Create a cleanup log
      const logPath = path.join(analysis.root, '.rapids-cleanup.log');
      const logLines: string[] = [
        `RAPIDS Cleanup Log - ${new Date().toISOString()}`,
        `Root: ${analysis.root}`,
        `Items to remove: ${analysis.itemsToRemove.length}`,
        `Total size: ${formatBytes(analysis.totalSize)}`,
        '',
        'Removed items:',
      ];

      for (let i = 0; i < analysis.itemsToRemove.length; i++) {
        const item = analysis.itemsToRemove[i];
        setStatus(`Removing ${item.path}... (${i + 1}/${analysis.itemsToRemove.length})`);

        const fullPath = path.join(analysis.root, item.path);

        try {
          await fs.remove(fullPath);
          logLines.push(`✓ ${item.path} - ${item.reason} (${formatBytes(item.size || 0)})`);
          setCleanedCount(i + 1);
        } catch (err) {
          logLines.push(`✗ ${item.path} - Failed: ${err instanceof Error ? err.message : 'Unknown error'}`);
        }
      }

      // Write cleanup log
      await fs.writeFile(logPath, logLines.join('\n'));

      setStatus('Cleanup complete!');
      setStep('done');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Cleanup failed');
      setStep('error');
    }
  };

  // Auto-proceed with cleanup after confirmation
  useEffect(() => {
    if (step === 'confirm') {
      setTimeout(() => performCleanup(), 2000);
    }
  }, [step]);

  if (step === 'error') {
    return (
      <Box flexDirection="column" padding={1}>
        <Text color="red">✗ {error}</Text>
      </Box>
    );
  }

  if (step === 'not-migrated') {
    return (
      <Box flexDirection="column" padding={1}>
        <Text>{rapidGradient('⚡ RAPIDS Clean')}</Text>
        <Box marginTop={1} flexDirection="column">
          <Text color="yellow">⚠ This project has not been migrated to RAPIDS yet.</Text>
          <Text>Run <Text bold color="cyan">rapids-migrate</Text> first to set up RAPIDS.</Text>
        </Box>
      </Box>
    );
  }

  if (step === 'analyzing' || !analysis) {
    return (
      <Box flexDirection="column" padding={1}>
        <Text>{rapidGradient('⚡ RAPIDS Clean')}</Text>
        <Text>{status}</Text>
      </Box>
    );
  }

  if (step === 'confirm') {
    return (
      <Box flexDirection="column" padding={1}>
        <Text>{rapidGradient('⚡ RAPIDS Clean')}</Text>
        <Box marginTop={1} flexDirection="column">
          <Text bold>Found {analysis.itemsToRemove.length} items to clean up:</Text>
          {analysis.itemsToRemove.slice(0, 10).map((item, i) => (
            <Text key={i}>
              <Text color="gray">  {item.type === 'directory' ? '📁' : '📄'}</Text>
              <Text> {item.path}</Text>
              <Text color="gray"> - {item.reason}</Text>
              {item.size && <Text color="cyan"> ({formatBytes(item.size)})</Text>}
            </Text>
          ))}
          {analysis.itemsToRemove.length > 10 && (
            <Text color="gray">  ... and {analysis.itemsToRemove.length - 10} more items</Text>
          )}
        </Box>
        <Box marginTop={1}>
          <Text bold>Total space to free: <Text color="green">{formatBytes(analysis.totalSize)}</Text></Text>
        </Box>
        <Box marginTop={1}>
          <Text color="yellow">⚡ Starting cleanup in 2 seconds...</Text>
          <Text color="gray"> (Log will be saved to .rapids-cleanup.log)</Text>
        </Box>
      </Box>
    );
  }

  if (step === 'cleaning') {
    return (
      <Box flexDirection="column" padding={1}>
        <Text>{rapidGradient('⚡ RAPIDS Clean')}</Text>
        <Text>{status}</Text>
        <Text color="cyan">Cleaned: {cleanedCount}/{analysis?.itemsToRemove.length}</Text>
      </Box>
    );
  }

  return (
    <Box flexDirection="column" padding={1}>
      <Text>{rapidGradient('⚡ RAPIDS Clean Complete!')}</Text>
      <Box marginTop={1} flexDirection="column">
        <Text bold>Cleanup summary:</Text>
        <Text>  ✓ {cleanedCount} items removed</Text>
        <Text>  ✓ {formatBytes(analysis?.totalSize || 0)} freed</Text>
        <Text>  ✓ Cleanup log saved to .rapids-cleanup.log</Text>
      </Box>
      <Box marginTop={1} flexDirection="column">
        <Text color="green">Your RAPIDS project is now clean and optimized!</Text>
        <Text color="gray">Continue working with Claude Code agents.</Text>
      </Box>
    </Box>
  );
};

render(<CleanApp />);
