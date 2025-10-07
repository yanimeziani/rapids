/**
 * RAPIDS v4.0.0-beta.1 - Config Command
 * Interactive configuration editor with Ink TUI
 */

import React, { useState, useEffect } from 'react';
import { render, Text, Box, Newline } from 'ink';
import SelectInput from 'ink-select-input';
import TextInput from 'ink-text-input';
import Spinner from 'ink-spinner';
import fs from 'fs-extra';
import path from 'path';
import os from 'os';

interface ConfigOption {
  label: string;
  value: string;
}

type EditorMode = 'menu' | 'edit-claude' | 'edit-subagents' | 'edit-mcp' | 'saving' | 'done';

function ConfigEditor() {
  const [mode, setMode] = useState<EditorMode>('menu');
  const [selectedConfig, setSelectedConfig] = useState<string>('');
  const [editValue, setEditValue] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  const claudeConfigPath = path.join(os.homedir(), '.claude', 'config.json');
  const subagentsConfigPath = path.join(os.homedir(), '.claude', 'rapids-subagents-config.json');
  const mcpConfigPath = path.join(os.homedir(), '.claude.json');

  const menuOptions: ConfigOption[] = [
    { label: '⚙️  Edit Claude Code Config (~/.claude/config.json)', value: 'claude' },
    { label: '🤖 Edit Sub-Agents Config (~/.claude/rapids-subagents-config.json)', value: 'subagents' },
    { label: '🔌 Edit MCP Servers (~/.claude.json)', value: 'mcp' },
    { label: '❌ Exit', value: 'exit' }
  ];

  const handleMenuSelect = async (item: ConfigOption) => {
    if (item.value === 'exit') {
      process.exit(0);
    }

    setSelectedConfig(item.value);

    try {
      let configPath = '';
      let configExists = false;

      switch (item.value) {
        case 'claude':
          configPath = claudeConfigPath;
          setMode('edit-claude');
          break;
        case 'subagents':
          configPath = subagentsConfigPath;
          setMode('edit-subagents');
          break;
        case 'mcp':
          configPath = mcpConfigPath;
          setMode('edit-mcp');
          break;
      }

      configExists = await fs.pathExists(configPath);

      if (configExists) {
        const content = await fs.readFile(configPath, 'utf-8');
        setEditValue(content);
      } else {
        setError(`Config file not found: ${configPath}`);
        setMode('menu');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
      setMode('menu');
    }
  };

  const saveConfig = async () => {
    setMode('saving');

    try {
      // Validate JSON
      JSON.parse(editValue);

      let configPath = '';
      switch (selectedConfig) {
        case 'claude':
          configPath = claudeConfigPath;
          break;
        case 'subagents':
          configPath = subagentsConfigPath;
          break;
        case 'mcp':
          configPath = mcpConfigPath;
          break;
      }

      // Backup original
      const backupPath = `${configPath}.backup`;
      if (await fs.pathExists(configPath)) {
        await fs.copy(configPath, backupPath);
      }

      // Save new config
      await fs.writeFile(configPath, editValue, 'utf-8');

      setMode('done');

      setTimeout(() => {
        process.exit(0);
      }, 2000);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Invalid JSON');
      setMode('menu');
    }
  };

  if (mode === 'menu') {
    return (
      <Box flexDirection="column" padding={1}>
        <Text bold color="cyan">
          ⚙️  RAPIDS Configuration Editor
        </Text>
        <Newline />
        {error && (
          <>
            <Text color="red">❌ {error}</Text>
            <Newline />
          </>
        )}
        <Text dimColor>Select a configuration to edit:</Text>
        <Newline />
        <SelectInput items={menuOptions} onSelect={handleMenuSelect} />
        <Newline />
        <Text dimColor>
          Tip: For complex edits, use your preferred editor directly.
        </Text>
      </Box>
    );
  }

  if (mode === 'edit-claude' || mode === 'edit-subagents' || mode === 'edit-mcp') {
    const configNames = {
      'edit-claude': 'Claude Code Config',
      'edit-subagents': 'Sub-Agents Config',
      'edit-mcp': 'MCP Servers'
    };

    return (
      <Box flexDirection="column" padding={1}>
        <Text bold color="cyan">
          Editing: {configNames[mode]}
        </Text>
        <Newline />
        <Text dimColor>
          Note: This is a simple viewer. For detailed editing, use your code editor.
        </Text>
        <Newline />
        <Box flexDirection="column" borderStyle="round" borderColor="cyan" padding={1}>
          <Text dimColor>Config preview (first 20 lines):</Text>
          <Text>{editValue.split('\n').slice(0, 20).join('\n')}</Text>
          {editValue.split('\n').length > 20 && (
            <Text dimColor>... ({editValue.split('\n').length - 20} more lines)</Text>
          )}
        </Box>
        <Newline />
        <Text color="yellow">
          Press Ctrl+C to cancel, or open the file in your editor:
        </Text>
        <Text color="green">
          {selectedConfig === 'claude' && claudeConfigPath}
          {selectedConfig === 'subagents' && subagentsConfigPath}
          {selectedConfig === 'mcp' && mcpConfigPath}
        </Text>
        <Newline />
        <Text dimColor>
          Returning to menu in 5 seconds...
        </Text>
      </Box>
    );
  }

  if (mode === 'saving') {
    return (
      <Box flexDirection="column" padding={1}>
        <Text color="cyan">
          <Spinner type="dots" /> Saving configuration...
        </Text>
      </Box>
    );
  }

  if (mode === 'done') {
    return (
      <Box flexDirection="column" padding={1}>
        <Text color="green" bold>
          ✅ Configuration saved successfully!
        </Text>
        <Newline />
        <Text dimColor>Backup created with .backup extension</Text>
      </Box>
    );
  }

  return null;
}

export async function configCommand(): Promise<void> {
  // Check if RAPIDS is installed
  const claudeDir = path.join(os.homedir(), '.claude');

  if (!await fs.pathExists(claudeDir)) {
    console.log('❌ RAPIDS not installed. Run `npm install -g rapids-ai` first.');
    process.exit(1);
  }

  render(<ConfigEditor />);
}
