/**
 * RAPIDS v4.0.0 - Filesystem Utilities
 */

import fs from 'fs-extra';
import path from 'path';

/**
 * Calculate directory size recursively
 */
export async function getDirectorySize(dirPath: string): Promise<number> {
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
    // Silently skip inaccessible directories
  }

  return size;
}

/**
 * Format bytes to human-readable format
 */
export function formatBytes(bytes: number): string {
  if (bytes === 0) return '0 B';

  const k = 1024;
  const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return `${Math.round((bytes / Math.pow(k, i)) * 100) / 100} ${sizes[i]}`;
}

/**
 * Check if path exists and is accessible
 */
export async function isAccessible(filePath: string): Promise<boolean> {
  try {
    await fs.access(filePath);
    return true;
  } catch {
    return false;
  }
}

/**
 * Copy directory recursively with overwrite option
 */
export async function copyDirectory(
  src: string,
  dest: string,
  overwrite: boolean = false
): Promise<void> {
  await fs.copy(src, dest, { overwrite });
}

/**
 * Create directory if it doesn't exist
 */
export async function ensureDirectory(dirPath: string): Promise<void> {
  await fs.ensureDir(dirPath);
}

/**
 * Safe file write with backup
 */
export async function safeWriteFile(
  filePath: string,
  content: string,
  createBackup: boolean = true
): Promise<void> {
  if (createBackup && (await fs.pathExists(filePath))) {
    const backupPath = `${filePath}.backup`;
    await fs.copy(filePath, backupPath);
  }

  await fs.writeFile(filePath, content, 'utf-8');
}

/**
 * Read JSON file safely
 */
export async function readJSON<T = any>(filePath: string): Promise<T> {
  return fs.readJSON(filePath);
}

/**
 * Write JSON file with formatting
 */
export async function writeJSON(
  filePath: string,
  data: any,
  spaces: number = 2
): Promise<void> {
  await fs.writeJSON(filePath, data, { spaces });
}

/**
 * Find files matching pattern
 */
export async function findFiles(
  directory: string,
  pattern: RegExp
): Promise<string[]> {
  const results: string[] = [];

  async function scan(dir: string) {
    const items = await fs.readdir(dir);

    for (const item of items) {
      const fullPath = path.join(dir, item);
      const stats = await fs.stat(fullPath);

      if (stats.isDirectory()) {
        await scan(fullPath);
      } else if (pattern.test(item)) {
        results.push(fullPath);
      }
    }
  }

  await scan(directory);
  return results;
}
