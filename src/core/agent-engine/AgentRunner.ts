/**
 * RAPIDS v4.0.0 - Agent Execution Engine
 * Handles agent discovery, loading, and execution
 */

import fs from 'fs-extra';
import path from 'path';
import type {
  AgentDefinition,
  AgentExecutionContext,
  Result
} from '@types/index.js';
import configLoader from '../config-manager/ConfigLoader.js';

export class AgentRunner {
  private static instance: AgentRunner;

  private constructor() {}

  static getInstance(): AgentRunner {
    if (!AgentRunner.instance) {
      AgentRunner.instance = new AgentRunner();
    }
    return AgentRunner.instance;
  }

  /**
   * Get all available agents
   */
  async getAvailableAgents(): Promise<Result<AgentDefinition[]>> {
    try {
      const configResult = await configLoader.loadAgentConfig();

      if (!configResult.success) {
        return { success: false, error: configResult.error };
      }

      const agents = Object.entries(configResult.data.agents).map(
        ([name, definition]) => ({
          ...definition,
          name
        })
      );

      return { success: true, data: agents };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error : new Error('Failed to get agents')
      };
    }
  }

  /**
   * Find agent by name
   */
  async findAgent(name: string): Promise<Result<AgentDefinition>> {
    try {
      const configResult = await configLoader.loadAgentConfig();

      if (!configResult.success) {
        return { success: false, error: configResult.error };
      }

      const agent = configResult.data.agents[name];

      if (!agent) {
        return {
          success: false,
          error: new Error(`Agent '${name}' not found`)
        };
      }

      return {
        success: true,
        data: { ...agent, name }
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error : new Error('Failed to find agent')
      };
    }
  }

  /**
   * Find agents by trigger
   */
  async findAgentsByTrigger(trigger: string): Promise<Result<AgentDefinition[]>> {
    try {
      const agentsResult = await this.getAvailableAgents();

      if (!agentsResult.success) {
        return { success: false, error: agentsResult.error };
      }

      const matchingAgents = agentsResult.data.filter(agent =>
        agent.triggers.some(t =>
          t.toLowerCase().includes(trigger.toLowerCase()) ||
          trigger.toLowerCase().includes(t.toLowerCase())
        )
      );

      return { success: true, data: matchingAgents };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error : new Error('Failed to find agents by trigger')
      };
    }
  }

  /**
   * Get agent markdown file path
   */
  getAgentPath(name: string): string {
    const userDir = configLoader.getUserDir();
    return path.join(userDir, 'agents', `${name}.md`);
  }

  /**
   * Check if agent exists
   */
  async agentExists(name: string): Promise<boolean> {
    const agentPath = this.getAgentPath(name);
    return fs.pathExists(agentPath);
  }

  /**
   * Generate agent markdown content
   */
  generateAgentMarkdown(agent: AgentDefinition): string {
    const tools = agent.tools || [
      'Bash',
      'Edit',
      'Glob',
      'Grep',
      'Read',
      'Write',
      'WebFetch',
      'WebSearch'
    ];

    const content = `---
name: ${agent.name}
description: ${agent.description}
tools: ${tools.join(', ')}
model: ${agent.model || 'sonnet'}
---

${agent.instructions}

## Context Files
${agent.context && agent.context.length > 0 ? agent.context.map(c => `- ${c}`).join('\n') : 'No specific context files'}

## Triggers
This agent activates for:
${agent.triggers.map(t => `- ${t}`).join('\n')}
`;

    return content;
  }

  /**
   * Invoke agent (for direct CLI invocation)
   */
  async invokeAgent(
    name: string,
    context: AgentExecutionContext,
    prompt?: string
  ): Promise<Result<string>> {
    try {
      const agentResult = await this.findAgent(name);

      if (!agentResult.success) {
        return { success: false, error: agentResult.error };
      }

      // For now, return the agent's instruction template
      // In the future, this could integrate with Claude Code's API
      const message = prompt
        ? `Invoking agent '${name}' with prompt: ${prompt}\n\nContext: ${JSON.stringify(context, null, 2)}`
        : `Agent '${name}' is ready.\n\nInstructions:\n${agentResult.data.instructions}`;

      return { success: true, data: message };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error : new Error('Failed to invoke agent')
      };
    }
  }

  /**
   * List all agent names
   */
  async listAgentNames(): Promise<Result<string[]>> {
    try {
      const agentsResult = await this.getAvailableAgents();

      if (!agentsResult.success) {
        return { success: false, error: agentsResult.error };
      }

      const names = agentsResult.data.map(agent => agent.name);
      return { success: true, data: names };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error : new Error('Failed to list agents')
      };
    }
  }
}

export default AgentRunner.getInstance();
