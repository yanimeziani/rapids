/**
 * RAPIDS v4.0.0-beta.1 - Agent Command
 * Direct agent invocation from CLI
 */

import React, { useState, useEffect } from 'react';
import { render, Text, Box, Newline } from 'ink';
import Spinner from 'ink-spinner';
import SelectInput from 'ink-select-input';
import fs from 'fs-extra';
import path from 'path';
import os from 'os';

interface Agent {
  name: string;
  description: string;
  triggers: string[];
}

interface SelectOption {
  label: string;
  value: string;
}

type AgentMode = 'loading' | 'list' | 'executing' | 'done' | 'error';

function AgentRunner({ agentName, task }: { agentName?: string; task?: string }) {
  const [mode, setMode] = useState<AgentMode>('loading');
  const [agents, setAgents] = useState<Agent[]>([]);
  const [selectedAgent, setSelectedAgent] = useState<string>(agentName || '');
  const [result, setResult] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  const subagentsConfigPath = path.join(
    os.homedir(),
    '.claude',
    'rapids-subagents-config.json'
  );

  useEffect(() => {
    loadAgents();
  }, []);

  const loadAgents = async () => {
    try {
      if (!(await fs.pathExists(subagentsConfigPath))) {
        setError('RAPIDS not installed. Run `npm install -g rapids-ai` first.');
        setMode('error');
        return;
      }

      const config = await fs.readJSON(subagentsConfigPath);
      const agentList: Agent[] = Object.entries(config.agents || {}).map(
        ([name, data]: [string, any]) => ({
          name,
          description: data.description,
          triggers: data.triggers || []
        })
      );

      setAgents(agentList);

      if (agentName && task) {
        // Direct execution
        setMode('executing');
        await executeAgent(agentName, task);
      } else {
        // Show list for selection
        setMode('list');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load agents');
      setMode('error');
    }
  };

  const executeAgent = async (name: string, taskDescription: string) => {
    try {
      setMode('executing');
      setSelectedAgent(name);

      // For now, just show instructions on how to invoke the agent
      // In a future version, this could integrate with Claude API
      const agent = agents.find((a) => a.name === name);

      if (!agent) {
        setError(`Agent "${name}" not found`);
        setMode('error');
        return;
      }

      // Simulate processing
      await new Promise((resolve) => setTimeout(resolve, 1500));

      setResult(
        `Agent "${name}" invoked with task: "${taskDescription}"\n\n` +
          `To execute this agent in Claude Code:\n` +
          `1. Open Claude Code in your project\n` +
          `2. Use one of these triggers:\n` +
          agent.triggers.map((t) => `   - ${t}`).join('\n') + '\n' +
          `3. Or mention: "@${name} ${taskDescription}"\n\n` +
          `Note: Direct CLI execution requires Claude API integration (coming soon).`
      );

      setMode('done');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Agent execution failed');
      setMode('error');
    }
  };

  const handleAgentSelect = (item: SelectOption) => {
    const agent = agents.find((a) => a.name === item.value);
    if (agent) {
      setSelectedAgent(agent.name);
      setResult(
        `Agent: ${agent.name}\n\n` +
          `Description: ${agent.description}\n\n` +
          `Triggers:\n${agent.triggers.map((t) => `  - ${t}`).join('\n')}\n\n` +
          `To use this agent in Claude Code:\n` +
          `1. Open Claude Code in your project\n` +
          `2. Use any of the triggers above\n` +
          `3. Or mention: "@${agent.name}"`
      );
      setMode('done');
    }
  };

  if (mode === 'loading') {
    return (
      <Box padding={1}>
        <Text color="cyan">
          <Spinner type="dots" /> Loading RAPIDS agents...
        </Text>
      </Box>
    );
  }

  if (mode === 'error') {
    return (
      <Box flexDirection="column" padding={1}>
        <Text color="red" bold>
          ❌ Error
        </Text>
        <Newline />
        <Text color="red">{error}</Text>
      </Box>
    );
  }

  if (mode === 'list') {
    const options: SelectOption[] = agents.map((agent) => ({
      label: `${agent.name} - ${agent.description}`,
      value: agent.name
    }));

    return (
      <Box flexDirection="column" padding={1}>
        <Text bold color="cyan">
          🤖 RAPIDS Agents ({agents.length} available)
        </Text>
        <Newline />
        <Text dimColor>Select an agent to view details:</Text>
        <Newline />
        <SelectInput items={options} onSelect={handleAgentSelect} />
        <Newline />
        <Text dimColor>
          Usage: rapids agent &lt;name&gt; &lt;task&gt;
        </Text>
      </Box>
    );
  }

  if (mode === 'executing') {
    return (
      <Box flexDirection="column" padding={1}>
        <Text color="cyan">
          <Spinner type="dots" /> Executing agent: {selectedAgent}
        </Text>
        <Newline />
        <Text dimColor>Task: {task}</Text>
      </Box>
    );
  }

  if (mode === 'done') {
    return (
      <Box flexDirection="column" padding={1}>
        <Text bold color="green">
          ✅ Agent Information
        </Text>
        <Newline />
        <Box
          flexDirection="column"
          borderStyle="round"
          borderColor="cyan"
          padding={1}
        >
          <Text>{result}</Text>
        </Box>
      </Box>
    );
  }

  return null;
}

export async function agentCommand(
  agentName?: string,
  prompt?: string
): Promise<void> {
  render(<AgentRunner agentName={agentName} task={prompt} />);
}
