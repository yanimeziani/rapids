#!/usr/bin/env node
import { build } from 'esbuild';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import fs from 'fs-extra';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const root = join(__dirname, '..');

async function buildCLI() {
  console.log('🔨 Building RAPIDS CLI...');

  // Clean dist
  await fs.remove(join(root, 'dist'));
  await fs.ensureDir(join(root, 'dist'));

  const entryPoints = [
    'cli/install.tsx',
    'cli/init.tsx',
    'cli/update.tsx',
    'cli/migrate.tsx'
  ];

  for (const entry of entryPoints) {
    const outfile = join(root, 'dist', entry.replace('.tsx', '.js').replace('cli/', ''));

    await build({
      entryPoints: [join(root, entry)],
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
        'cfonts'
      ],
      banner: {
        js: '#!/usr/bin/env node'
      }
    });

    // Make executable
    await fs.chmod(outfile, 0o755);

    console.log(`✓ Built ${entry} → ${outfile}`);
  }

  console.log('✅ Build complete!');
}

buildCLI().catch(err => {
  console.error('Build failed:', err);
  process.exit(1);
});
