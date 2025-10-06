/**
 * RAPIDS v4.0.0 - Doctor Command
 * Health check for RAPIDS installation
 */

import configLoader from '@core/config-manager/ConfigLoader.js';
import agentRunner from '@core/agent-engine/AgentRunner.js';
import { getSystemInfo, isPlatformSupported } from '../utils/platform.js';

export async function doctor(): Promise<void> {
  console.log('🔍 RAPIDS Health Check\n');

  // Check platform
  const systemInfo = await getSystemInfo();
  console.log(`Platform: ${systemInfo.platform} (${systemInfo.arch})`);
  console.log(`Node: ${systemInfo.nodeVersion}`);
  console.log(`Home: ${systemInfo.homeDir}`);
  console.log(`Claude Dir: ${systemInfo.claudeDir}\n`);

  if (!isPlatformSupported()) {
    console.log('⚠️  Platform not yet supported. macOS only for now.');
    return;
  }

  // Check installation
  const isInstalled = await configLoader.isInstalled();
  console.log(`Installation: ${isInstalled ? '✅ Installed' : '❌ Not installed'}\n`);

  if (!isInstalled) {
    console.log('Run `rapids` to install RAPIDS');
    return;
  }

  // Check agents
  const agentsResult = await agentRunner.listAgentNames();
  if (agentsResult.success) {
    console.log(`Agents: ${agentsResult.data.length} available`);
    console.log(`  ${agentsResult.data.join(', ')}\n`);
  }

  // Check MCP config
  const mcpResult = await configLoader.loadMCPConfig();
  if (mcpResult.success) {
    const mcpCount = Object.keys(mcpResult.data.mcpServers || {}).length;
    console.log(`MCP Servers: ${mcpCount} configured\n`);
  }

  console.log('✅ RAPIDS is healthy and ready!');
}
