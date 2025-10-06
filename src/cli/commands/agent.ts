/**
 * RAPIDS v4.0.0 - Agent Command
 * Direct agent invocation from CLI
 */

import agentRunner from '@core/agent-engine/AgentRunner.js';

export async function agentCommand(agentName?: string, prompt?: string): Promise<void> {
  if (!agentName) {
    // List available agents
    const result = await agentRunner.listAgentNames();

    if (!result.success) {
      console.error('❌', result.error.message);
      process.exit(1);
    }

    console.log('Available agents:');
    result.data.forEach(name => console.log(`  - ${name}`));
    console.log('\nUsage: rapids-agent <agent-name> [prompt]');
    return;
  }

  // Invoke specific agent
  const result = await agentRunner.invokeAgent(
    agentName,
    { workingDir: process.cwd() },
    prompt
  );

  if (!result.success) {
    console.error('❌', result.error.message);
    process.exit(1);
  }

  console.log(result.data);
}
