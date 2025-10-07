# RAPIDS CLI Commands (v4.0.0-beta.1)

Complete guide to all RAPIDS CLI commands.

## Installation

```bash
npm install -g rapids-ai
```

## Core Commands

### `rapids` - Main CLI

The main entry point provides access to all RAPIDS commands.

```bash
rapids --help
rapids --version
```

---

## Command Reference

### 1. `rapids config` - Configuration Editor

Interactive TUI for editing RAPIDS configuration files.

**Usage:**
```bash
rapids config
```

**Features:**
- View and edit Claude Code config (`~/.claude/config.json`)
- Manage sub-agents config (`~/.claude/rapids-subagents-config.json`)
- Configure MCP servers (`~/.claude.json`)
- Automatic backup before saving
- JSON validation

**Interactive Menu:**
1. Edit Claude Code Config
2. Edit Sub-Agents Config
3. Edit MCP Servers
4. Exit

**Config Files:**
- `~/.claude/config.json` - Claude Code settings, hooks, agents
- `~/.claude/rapids-subagents-config.json` - Agent definitions and triggers
- `~/.claude.json` - MCP server configurations

**Example:**
```bash
# Launch interactive config editor
rapids config

# Navigate with arrow keys
# Select config file to edit
# View preview and get file path for editing
```

---

### 2. `rapids agent` - Agent Management

List available agents or invoke them directly (future: Claude API integration).

**Usage:**
```bash
# List all agents
rapids agent

# Get agent details
rapids agent marketing-strategist

# Invoke agent with task (shows instructions)
rapids agent feature-builder "create login screen"
```

**Available Agents:**
- **feature-builder** - Build complete features (mobile, web, backend)
- **bug-hunter** - Find and fix bugs
- **code-searcher** - Search and analyze code patterns
- **test-generator** - Generate comprehensive tests
- **refactor-master** - Refactor code safely
- **performance-analyzer** - Optimize performance
- **db-architect** - Manage database and Neon serverless PostgreSQL
- **security-scanner** - Scan for vulnerabilities
- **deployment-manager** - Deploy with Dokploy MCP
- **marketing-strategist** - Revenue generation and GTM strategy
- **design-master** - Material Design 3 expert

**Output:**
```
Agent: marketing-strategist

Description: Revenue generation, user acquisition, and scaling

Triggers:
  - /market
  - marketing strategy
  - user acquisition
  - revenue

To use this agent in Claude Code:
1. Open Claude Code in your project
2. Use any of the triggers above
3. Or mention: "@marketing-strategist"
```

**Future:** Direct Claude API execution for autonomous task completion.

---

### 3. `rapids template` - Code Generation

Generate code from templates with proper file structure and naming conventions.

**Usage:**
```bash
# Interactive mode (select template, enter name)
rapids template

# Direct generation
rapids template mobile-feature UserProfile
rapids template backend-api Order
rapids template web-page dashboard
rapids template design-system Button
```

**Available Templates:**

#### Mobile Feature (Flutter)
```bash
rapids template mobile-feature UserProfile
```

Generates:
```
lib/features/user_profile/
├── application/
│   ├── user_profile_controller.dart
│   └── user_profile_state.dart
├── domain/models/
├── presentation/
│   ├── user_profile_screen.dart
│   └── widgets/
└── repositories/
```

Features:
- Riverpod state management
- Material Design 3 widgets
- Proper naming conventions (snake_case)

#### Backend API (FastAPI)
```bash
rapids template backend-api Product
```

Generates:
```
app/api/product/
├── router.py      # API endpoints
├── schemas.py     # Pydantic models
└── crud.py        # Database operations
```

Features:
- FastAPI routes with proper HTTP methods
- SQLAlchemy models
- Pydantic v2 schemas
- Async database operations

#### Web Page (Next.js)
```bash
rapids template web-page dashboard
```

Generates:
```
app/dashboard/
└── page.tsx       # Next.js 15 page component
```

Features:
- App Router (Next.js 15)
- TypeScript
- Tailwind CSS ready
- Server/Client component patterns

#### Design Component
```bash
rapids template design-system CustomButton
```

Generates:
```
components/CustomButton.tsx
```

Features:
- Material Design 3 ready
- TypeScript props interface
- Reusable component pattern

**Naming Conventions:**
- Input: `UserProfile`, `OrderHistory`, `ProductCard`
- Mobile: `user_profile_screen.dart` (snake_case)
- Backend: `product/router.py` (snake_case)
- Web: `dashboard/page.tsx` (kebab-case)

---

### 4. `rapids doctor` - Health Check

Verify RAPIDS installation and configuration.

**Usage:**
```bash
rapids doctor
```

**Checks:**
- RAPIDS installation status
- Configuration file presence
- Agent availability
- MCP server configuration
- File permissions

**Output:**
```
🔍 RAPIDS Installation Health Check

✅ RAPIDS installed: v4.0.0-beta.1
✅ Agents: 11/11 available
✅ MCP Servers: 7/7 configured
✅ Templates: 4/4 ready
✅ Commands: All accessible

🎉 RAPIDS is healthy!
```

---

## Legacy Commands

These commands remain unchanged from v3.x:

### `rapids-install`
Full installation wizard (MCP credentials, file copying).
```bash
rapids-install
```

### `rapids-migrate`
Migrate existing project to RAPIDS.
```bash
rapids-migrate
```

### `rapids-clean`
Remove RAPIDS configuration.
```bash
rapids-clean
```

---

## Command Architecture

### File Structure
```
src/cli/
├── index.ts              # Main CLI entry (Commander.js)
├── commands/
│   ├── config.ts        # Config editor (Ink TUI)
│   ├── agent.ts         # Agent management (Ink TUI)
│   ├── template.ts      # Template generator (Ink TUI)
│   └── doctor.ts        # Health check
└── utils/
    ├── validation.ts
    ├── filesystem.ts
    └── platform.ts
```

### Technologies
- **Commander.js** - Argument parsing and command routing
- **Ink** - React-based terminal UI
- **React 18** - Component framework for TUI
- **esbuild** - Fast bundling
- **fs-extra** - File system operations

### Build Process
```bash
# Build all commands
node scripts/build.js

# Output: dist/rapids.js (main entry point)
```

---

## Examples

### Full Workflow

1. **Install RAPIDS**
   ```bash
   npm install -g rapids-ai
   ```

2. **Check Installation**
   ```bash
   rapids doctor
   ```

3. **Configure Settings**
   ```bash
   rapids config
   # Select "Edit MCP Servers"
   # Add API keys if needed
   ```

4. **Generate Feature**
   ```bash
   rapids template mobile-feature LoginScreen
   rapids template backend-api Auth
   rapids template web-page login
   ```

5. **Review Agents**
   ```bash
   rapids agent
   # Browse available agents
   # Note triggers for use in Claude Code
   ```

6. **Use in Claude Code**
   ```
   Open Claude Code > Type:
   "@feature-builder create user dashboard with charts"
   ```

---

## Configuration Files

### User-Level (~/.claude/)
- `config.json` - Claude Code configuration
- `rapids-subagents-config.json` - Agent definitions
- `agents/` - Individual agent markdown files
- `commands/` - Slash commands
- `prompts/` - Stack templates
- `output-styles/` - Output formatters

### Global (~/.claude.json)
- MCP server configurations
- Environment variables
- API keys (Dokploy, Neon)

### Project-Level (.claude/)
- `config.json` - Project-specific overrides
- `subagents-config.json` - Custom agents
- `settings.local.json` - Stack configuration

---

## Troubleshooting

### Command Not Found
```bash
# Reinstall globally
npm install -g rapids-ai

# Verify installation
which rapids
rapids --version
```

### Config Editor Issues
```bash
# Check RAPIDS installation
rapids doctor

# Manually edit config
code ~/.claude/rapids-subagents-config.json
```

### Template Generation Fails
```bash
# Ensure you're in a project directory
pwd

# Check RAPIDS templates are installed
ls ~/.claude/prompts/
```

### Agent List Empty
```bash
# Reinstall RAPIDS
npm install -g rapids-ai

# Verify agents installed
ls ~/.claude/agents/
```

---

## Development

### Testing Commands Locally
```bash
# Build
node scripts/build.js

# Test without global install
node dist/rapids.js --help
node dist/rapids.js agent
node dist/rapids.js template
node dist/rapids.js config
```

### Adding New Commands
1. Create command file in `src/cli/commands/`
2. Export function with Ink TUI
3. Register in `src/cli/index.ts`
4. Rebuild: `node scripts/build.js`
5. Test: `node dist/rapids.js <command>`

### Command Template
```typescript
import React, { useState } from 'react';
import { render, Text, Box } from 'ink';

function MyCommand() {
  return (
    <Box flexDirection="column" padding={1}>
      <Text bold color="cyan">My Command</Text>
    </Box>
  );
}

export async function myCommand() {
  render(<MyCommand />);
}
```

---

## Next Steps

1. **Explore Agents**: `rapids agent`
2. **Generate Code**: `rapids template`
3. **Configure MCPs**: `rapids config`
4. **Check Health**: `rapids doctor`
5. **Use in Claude Code**: Trigger agents in your project

**Documentation**: https://yanimeziani.github.io/rapids/
**Issues**: https://github.com/yanimeziani/rapids/issues
