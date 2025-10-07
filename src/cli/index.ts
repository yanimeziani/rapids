/**
 * RAPIDS v4.0.0 - CLI Entry Point
 * Minimalist. Polyvalent. Efficient.
 */

import { Command } from 'commander';
import { readFileSync } from 'fs';
import { dirname, join } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Read package.json for version
let packageJson;
try {
  // Try from dist directory (built)
  packageJson = JSON.parse(
    readFileSync(join(__dirname, '../package.json'), 'utf-8')
  );
} catch {
  // Try from src directory (development)
  packageJson = JSON.parse(
    readFileSync(join(__dirname, '../../package.json'), 'utf-8')
  );
}

const program = new Command();

program
  .name('rapids')
  .description('🌊 RAPIDS - AI-Powered Development Framework for Claude Code')
  .version(packageJson.version);

// Subcommands will be added here
program
  .command('doctor')
  .description('Check RAPIDS installation health')
  .action(async () => {
    const { doctor } = await import('./commands/doctor.js');
    await doctor();
  });

program
  .command('config')
  .description('Configure RAPIDS settings')
  .action(async () => {
    const { configCommand } = await import('./commands/config.js');
    await configCommand();
  });

program
  .command('agent [name] [prompt...]')
  .description('Invoke RAPIDS agent directly')
  .action(async (name, promptArgs) => {
    const { agentCommand } = await import('./commands/agent.js');
    const prompt = promptArgs ? promptArgs.join(' ') : undefined;
    await agentCommand(name, prompt);
  });

program
  .command('template [type] [name]')
  .description('Generate code from template')
  .action(async (type, name) => {
    const { templateCommand } = await import('./commands/template.js');
    await templateCommand(type, name);
  });

program.parse(process.argv);

export default program;
