#!/usr/bin/env node
/**
 * RAPIDS v4.0.0 - Build Script
 * Builds both old CLI (cli/*.tsx) and new src structure
 */

import { build } from 'esbuild';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import fs from 'fs-extra';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const root = join(__dirname, '..');

async function buildCLI() {
  console.log('🔨 Building RAPIDS CLI...\n');

  // Clean dist
  await fs.remove(join(root, 'dist'));
  await fs.ensureDir(join(root, 'dist'));

  // ==========================================
  // Build legacy CLI files (cli/*.tsx)
  // ==========================================
  console.log('📦 Building legacy CLI commands...');

  const legacyEntryPoints = [
    'cli/install.tsx',
    'cli/init.tsx',
    'cli/update.tsx',
    'cli/migrate.tsx',
    'cli/clean.tsx'
  ];

  for (const entry of legacyEntryPoints) {
    const entryPath = join(root, entry);

    // Check if file exists
    if (!(await fs.pathExists(entryPath))) {
      console.log(`⚠️  Skipping ${entry} (not found)`);
      continue;
    }

    const outfile = join(root, 'dist', entry.replace('.tsx', '.js').replace('cli/', ''));

    try {
      await build({
        entryPoints: [entryPath],
        bundle: true,
        platform: 'node',
        target: 'node20',
        format: 'esm',
        outfile,
        external: [
          'ink',
          'ink-*',
          'react',
          'chalk',
          'execa',
          'fs-extra',
          'ora',
          'gradient-string',
          'conf',
          'update-notifier',
          'cfonts',
          'commander'
        ],
        banner: {
          js: '#!/usr/bin/env node'
        },
        loader: {
          '.tsx': 'tsx',
          '.ts': 'ts'
        },
        jsx: 'automatic',
        jsxImportSource: 'react'
      });

      // Make executable
      await fs.chmod(outfile, 0o755);

      console.log(`✓ Built ${entry} → ${outfile}`);
    } catch (err) {
      console.error(`✗ Failed to build ${entry}:`, err.message);
    }
  }

  // ==========================================
  // Build new src structure (src/*)
  // ==========================================
  console.log('\n📦 Building new source structure...');

  // Check if src directory exists
  if (!(await fs.pathExists(join(root, 'src')))) {
    console.log('⚠️  src/ directory not found, skipping new build');
    console.log('✅ Build complete (legacy only)!');
    return;
  }

  // Build new CLI entry point
  const newCliEntry = join(root, 'src/cli/index.ts');

  if (await fs.pathExists(newCliEntry)) {
    try {
      await build({
        entryPoints: [newCliEntry],
        bundle: true,
        platform: 'node',
        target: 'node20',
        format: 'esm',
        outfile: join(root, 'dist', 'rapids.js'),
        external: [
          'ink',
          'ink-*',
          'react',
          'chalk',
          'execa',
          'fs-extra',
          'ora',
          'gradient-string',
          'conf',
          'update-notifier',
          'cfonts',
          'commander'
        ],
        banner: {
          js: '#!/usr/bin/env node'
        },
        loader: {
          '.ts': 'tsx',
          '.tsx': 'tsx'
        },
        jsx: 'automatic',
        jsxImportSource: 'react'
      });

      await fs.chmod(join(root, 'dist', 'rapids.js'), 0o755);
      console.log('✓ Built src/cli/index.ts → dist/rapids.js');
    } catch (err) {
      console.log(`⚠️  Failed to build new CLI: ${err.message}`);
    }
  }

  // Build new doctor command
  const doctorEntry = join(root, 'src/cli/commands/doctor-wrapper.ts');

  if (await fs.pathExists(doctorEntry)) {
    try {
      await build({
        entryPoints: [doctorEntry],
        bundle: true,
        platform: 'node',
        target: 'node20',
        format: 'esm',
        outfile: join(root, 'dist', 'doctor.js'),
        external: [
          'fs-extra',
          'path',
          'os'
        ],
        banner: {
          js: '#!/usr/bin/env node'
        },
        loader: {
          '.ts': 'ts'
        }
      });

      await fs.chmod(join(root, 'dist', 'doctor.js'), 0o755);
      console.log('✓ Built src/cli/commands/doctor-wrapper.ts → dist/doctor.js');
    } catch (err) {
      console.log(`⚠️  Failed to build doctor: ${err.message}`);
    }
  }

  console.log('\n✅ Build complete!');
  console.log('\n📁 Output directory: dist/');
  const distFiles = await fs.readdir(join(root, 'dist'));
  distFiles.forEach(file => console.log(`   - ${file}`));
}

buildCLI().catch(err => {
  console.error('❌ Build failed:', err);
  process.exit(1);
});
