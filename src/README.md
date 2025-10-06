# RAPIDS v4.0.0 Source Structure

**Minimalist. Polyvalent. Efficient. Beautiful.**

This directory contains the complete refactored source code for RAPIDS v4.0.0.

## Directory Structure

```
src/
├── cli/                      # Command-line interface
│   ├── commands/            # CLI command implementations
│   │   ├── install.ts      # Installation command (TBD)
│   │   ├── init.ts         # Project initialization (TBD)
│   │   ├── migrate.ts      # Project migration (TBD)
│   │   ├── clean.ts        # Cleanup command (TBD)
│   │   ├── update.ts       # Update command (TBD)
│   │   ├── doctor.ts       # Health check command ✅
│   │   ├── config.ts       # Configuration editor ✅
│   │   ├── agent.ts        # Direct agent invocation ✅
│   │   └── template.ts     # Template generator ✅
│   ├── ui/
│   │   ├── components/     # Reusable Ink components
│   │   └── screens/        # Full-screen Ink UIs
│   ├── utils/              # CLI utilities
│   │   ├── filesystem.ts   # File operations ✅
│   │   ├── platform.ts     # Platform detection ✅
│   │   └── validation.ts   # Input validation ✅
│   └── index.ts            # Main CLI entry point ✅
│
├── core/                    # Core engine systems
│   ├── agent-engine/       # Agent discovery and execution
│   │   └── AgentRunner.ts  # Agent execution engine ✅
│   ├── config-manager/     # Configuration management
│   │   └── ConfigLoader.ts # Config loader ✅
│   ├── template-engine/    # Template rendering
│   └── plugin-system/      # Plugin architecture
│
├── agents/                  # Agent system
│   ├── base/               # Base agent classes
│   ├── builtin/            # Built-in agents
│   └── factory/            # Agent factory
│
├── templates/              # Code generation templates
│   ├── configs/            # Config templates
│   ├── projects/           # Project scaffolding
│   └── components/         # Component templates
│
└── types/                  # TypeScript type definitions
    └── index.ts            # Global types ✅
```

## Build Process

The build system (`scripts/build.js`) handles both:

1. **Legacy CLI** (`cli/*.tsx`) → `dist/*.js` (backwards compatible)
2. **New Structure** (`src/*`) → `dist/rapids.js` and command-specific bundles

### Building

```bash
node scripts/build.js
```

### Output

All built files go to `dist/`:
- `install.js` - Main installer (legacy)
- `migrate.js` - Migration tool (legacy)
- `clean.js` - Cleanup tool (legacy)
- `init.js` - Project creator (legacy)
- `update.js` - Updater (legacy)
- `rapids.js` - New unified CLI ✨
- `doctor.js` - Health checker ✨

## Type System

All types are defined in `src/types/index.ts`:

- **Agent Types**: `AgentDefinition`, `AgentConfig`, `AgentExecutionContext`
- **Project Types**: `ProjectAnalysis`, `ProjectMetadata`, `StackConfig`
- **MCP Types**: `MCPServer`, `MCPConfig`, `MCPCredentials`
- **Command Types**: `CommandDefinition`, `CommandContext`
- **Template Types**: `TemplateConfig`, `TemplateFile`
- **Utility Types**: `Result<T, E>`, `ProgressUpdate`, `LogEntry`

## Core Systems

### ConfigLoader (`src/core/config-manager/ConfigLoader.ts`)

Singleton class that handles all configuration loading:

```typescript
import configLoader from '@core/config-manager/ConfigLoader.js';

// Load agent configuration
const agentConfig = await configLoader.loadAgentConfig();

// Load MCP configuration
const mcpConfig = await configLoader.loadMCPConfig();

// Load stack configuration
const stackConfig = await configLoader.loadStackConfig(projectRoot);

// Check installation status
const installed = await configLoader.isInstalled();
```

### AgentRunner (`src/core/agent-engine/AgentRunner.ts`)

Singleton class for agent operations:

```typescript
import agentRunner from '@core/agent-engine/AgentRunner.js';

// Get all available agents
const agents = await agentRunner.getAvailableAgents();

// Find specific agent
const agent = await agentRunner.findAgent('marketing-strategist');

// Find agents by trigger
const matchingAgents = await agentRunner.findAgentsByTrigger('refactor');

// Invoke agent
const result = await agentRunner.invokeAgent('bug-hunter', context, prompt);
```

## TypeScript Configuration

### `tsconfig.json`

Main TypeScript configuration with:
- Strict mode enabled
- Path aliases configured (`@/*`, `@cli/*`, `@core/*`, etc.)
- ES2022 target
- ESNext modules

### `tsconfig.build.json`

Build-specific configuration extending main config:
- Removes comments
- Skips test files
- Optimized for production

## Path Aliases

The following path aliases are configured:

- `@/*` → `src/*`
- `@cli/*` → `src/cli/*`
- `@core/*` → `src/core/*`
- `@agents/*` → `src/agents/*`
- `@templates/*` → `src/templates/*`
- `@types/*` → `src/types/*`

## Utilities

### Filesystem (`src/cli/utils/filesystem.ts`)

- `getDirectorySize(dirPath)` - Calculate directory size
- `formatBytes(bytes)` - Human-readable file sizes
- `isAccessible(filePath)` - Check file accessibility
- `copyDirectory(src, dest, overwrite)` - Safe directory copy
- `safeWriteFile(filePath, content, createBackup)` - Write with backup
- `readJSON<T>(filePath)` - Type-safe JSON reading
- `writeJSON(filePath, data)` - Formatted JSON writing
- `findFiles(directory, pattern)` - Recursive file search

### Platform (`src/cli/utils/platform.ts`)

- `detectPlatform()` - Get current platform
- `isPlatformSupported()` - Check platform support
- `getClaudeUserDir()` - Get Claude config directory
- `detectPackageManager(cwd)` - Detect npm/yarn/pnpm
- `getSystemInfo()` - Complete system information
- `isCI()` - Detect CI environment

### Validation (`src/cli/utils/validation.ts`)

- `validateProjectName(name)` - Validate project names
- `validateUrl(url)` - URL validation
- `validateApiKey(key, minLength)` - API key validation
- `validateEmail(email)` - Email validation
- `validateVersion(version)` - Semver validation
- `sanitizeInput(input)` - Sanitize user input

## Phase 1 Status ✅

- [x] Created complete `src/` structure
- [x] Created TypeScript configurations
- [x] Created core type definitions
- [x] Built ConfigLoader system
- [x] Built AgentRunner system
- [x] Created utility functions
- [x] Created new commands (doctor, config, agent, template)
- [x] Reorganized config templates to `config/`
- [x] Updated build system
- [x] Updated .gitignore and .npmignore
- [x] Removed old tarball
- [x] Tested build successfully

## Next Steps (Phase 2)

- [ ] Migrate Ink UI components to `src/cli/ui/components/`
- [ ] Migrate CLI screens to `src/cli/ui/screens/`
- [ ] Refactor install.tsx to use new architecture
- [ ] Refactor init.tsx to use new architecture
- [ ] Refactor migrate.tsx to use new architecture
- [ ] Refactor clean.tsx to use new architecture
- [ ] Build template engine
- [ ] Build plugin system
- [ ] Add comprehensive tests
- [ ] Update documentation

## Development

### Adding a New Command

1. Create `src/cli/commands/my-command.ts`
2. Export command function
3. Add to `src/cli/commands/index.ts`
4. Register in `src/cli/index.ts`
5. Build and test

### Adding a New Utility

1. Create `src/cli/utils/my-utility.ts`
2. Export functions
3. Add to `src/cli/utils/index.ts`
4. Import where needed

### Adding a New Core System

1. Create `src/core/my-system/MyClass.ts`
2. Follow singleton pattern if appropriate
3. Export from module
4. Document in this README

## Philosophy

**Every line of code must serve a purpose.**

- Minimize abstraction layers
- Maximize reusability
- Prefer composition over inheritance
- Keep it simple, keep it fast
- Code is communication

---

**RAPIDS v4.0.0** - Built for speed, designed for elegance.
