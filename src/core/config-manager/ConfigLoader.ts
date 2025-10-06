/**
 * RAPIDS v4.0.0 - Configuration Loader
 * Handles loading and merging of all configuration files
 */

import fs from 'fs-extra';
import path from 'path';
import os from 'os';
import type {
  RapidsConfig,
  AgentConfig,
  MCPConfig,
  StackConfig,
  UserConfig,
  Result
} from '@types/index.js';

export class ConfigLoader {
  private static instance: ConfigLoader;
  private configCache: Map<string, any> = new Map();

  private constructor() {}

  static getInstance(): ConfigLoader {
    if (!ConfigLoader.instance) {
      ConfigLoader.instance = new ConfigLoader();
    }
    return ConfigLoader.instance;
  }

  /**
   * Get the Claude Code user directory
   */
  getUserDir(): string {
    return path.join(os.homedir(), '.claude');
  }

  /**
   * Get the RAPIDS config directory
   */
  getRapidsConfigDir(): string {
    return path.join(this.getUserDir(), 'rapids');
  }

  /**
   * Load agent configuration
   */
  async loadAgentConfig(): Promise<Result<AgentConfig>> {
    try {
      const agentsDir = path.join(this.getUserDir(), 'agents');

      if (!(await fs.pathExists(agentsDir))) {
        return {
          success: false,
          error: new Error('Agents directory not found. Run rapids installation first.')
        };
      }

      // Load subagents-config.json for reference
      const subagentsConfigPath = path.join(
        this.getUserDir(),
        'rapids-subagents-config.json'
      );

      if (await fs.pathExists(subagentsConfigPath)) {
        const config = await fs.readJSON(subagentsConfigPath);
        return { success: true, data: config };
      }

      return {
        success: false,
        error: new Error('Agent configuration not found')
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error : new Error('Failed to load agent config')
      };
    }
  }

  /**
   * Load MCP server configuration
   */
  async loadMCPConfig(): Promise<Result<MCPConfig>> {
    try {
      const mcpConfigPath = path.join(os.homedir(), '.claude.json');

      if (!(await fs.pathExists(mcpConfigPath))) {
        return {
          success: false,
          error: new Error('MCP configuration not found')
        };
      }

      const config = await fs.readJSON(mcpConfigPath);
      return { success: true, data: config };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error : new Error('Failed to load MCP config')
      };
    }
  }

  /**
   * Load stack configuration from project
   */
  async loadStackConfig(projectRoot: string): Promise<Result<StackConfig>> {
    try {
      const stackConfigPath = path.join(projectRoot, '.claude', 'STACK_CONFIG.json');

      if (!(await fs.pathExists(stackConfigPath))) {
        return {
          success: false,
          error: new Error('Stack configuration not found in project')
        };
      }

      const config = await fs.readJSON(stackConfigPath);
      return { success: true, data: config };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error : new Error('Failed to load stack config')
      };
    }
  }

  /**
   * Load user preferences
   */
  async loadUserConfig(): Promise<Result<UserConfig>> {
    try {
      const userConfigPath = path.join(this.getUserDir(), 'rapids-user-config.json');

      if (!(await fs.pathExists(userConfigPath))) {
        // Return empty config if not found
        return { success: true, data: {} };
      }

      const config = await fs.readJSON(userConfigPath);
      return { success: true, data: config };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error : new Error('Failed to load user config')
      };
    }
  }

  /**
   * Save user configuration
   */
  async saveUserConfig(config: UserConfig): Promise<Result<void>> {
    try {
      const userConfigPath = path.join(this.getUserDir(), 'rapids-user-config.json');
      await fs.ensureDir(this.getUserDir());
      await fs.writeJSON(userConfigPath, config, { spaces: 2 });
      return { success: true, data: undefined };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error : new Error('Failed to save user config')
      };
    }
  }

  /**
   * Load complete RAPIDS configuration
   */
  async loadConfig(projectRoot?: string): Promise<Result<RapidsConfig>> {
    try {
      const [agentResult, mcpResult] = await Promise.all([
        this.loadAgentConfig(),
        this.loadMCPConfig()
      ]);

      if (!agentResult.success) {
        return { success: false, error: agentResult.error };
      }

      if (!mcpResult.success) {
        return { success: false, error: mcpResult.error };
      }

      const config: RapidsConfig = {
        version: '4.0.0',
        agents: agentResult.data,
        mcpServers: mcpResult.data
      };

      // Load stack config if project root provided
      if (projectRoot) {
        const stackResult = await this.loadStackConfig(projectRoot);
        if (stackResult.success) {
          config.stackConfig = stackResult.data;
        }
      }

      return { success: true, data: config };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error : new Error('Failed to load configuration')
      };
    }
  }

  /**
   * Clear configuration cache
   */
  clearCache(): void {
    this.configCache.clear();
  }

  /**
   * Check if RAPIDS is installed
   */
  async isInstalled(): Promise<boolean> {
    const userDir = this.getUserDir();
    const agentsDir = path.join(userDir, 'agents');
    const commandsDir = path.join(userDir, 'commands');

    const [agentsExists, commandsExists] = await Promise.all([
      fs.pathExists(agentsDir),
      fs.pathExists(commandsDir)
    ]);

    return agentsExists && commandsExists;
  }
}

export default ConfigLoader.getInstance();
