/**
 * RAPIDS v4.0.0 - Platform Detection Utilities
 */

import os from 'os';
import path from 'path';
import fs from 'fs-extra';

export type Platform = 'macos' | 'linux' | 'windows' | 'unknown';
export type PackageManager = 'npm' | 'yarn' | 'pnpm' | null;

/**
 * Detect current platform
 */
export function detectPlatform(): Platform {
  const platform = os.platform();

  switch (platform) {
    case 'darwin':
      return 'macos';
    case 'linux':
      return 'linux';
    case 'win32':
      return 'windows';
    default:
      return 'unknown';
  }
}

/**
 * Check if platform is supported
 */
export function isPlatformSupported(): boolean {
  const platform = detectPlatform();
  // Currently only macOS is supported
  return platform === 'macos';
}

/**
 * Get Claude Code user directory for current platform
 */
export function getClaudeUserDir(): string {
  const platform = detectPlatform();

  switch (platform) {
    case 'macos':
      return path.join(os.homedir(), '.claude');
    case 'linux':
      return path.join(os.homedir(), '.config', 'claude');
    case 'windows':
      return path.join(os.homedir(), 'AppData', 'Local', 'Claude');
    default:
      return path.join(os.homedir(), '.claude');
  }
}

/**
 * Detect package manager in project
 */
export async function detectPackageManager(cwd: string): Promise<PackageManager> {
  if (await fs.pathExists(path.join(cwd, 'pnpm-lock.yaml'))) {
    return 'pnpm';
  }

  if (await fs.pathExists(path.join(cwd, 'yarn.lock'))) {
    return 'yarn';
  }

  if (await fs.pathExists(path.join(cwd, 'package-lock.json'))) {
    return 'npm';
  }

  return null;
}

/**
 * Get system information
 */
export interface SystemInfo {
  platform: Platform;
  arch: string;
  nodeVersion: string;
  npmVersion?: string;
  homeDir: string;
  claudeDir: string;
}

export async function getSystemInfo(): Promise<SystemInfo> {
  return {
    platform: detectPlatform(),
    arch: os.arch(),
    nodeVersion: process.version,
    homeDir: os.homedir(),
    claudeDir: getClaudeUserDir()
  };
}

/**
 * Check if running in CI environment
 */
export function isCI(): boolean {
  return !!(
    process.env.CI ||
    process.env.CONTINUOUS_INTEGRATION ||
    process.env.GITHUB_ACTIONS ||
    process.env.GITLAB_CI ||
    process.env.CIRCLECI
  );
}
