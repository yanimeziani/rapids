# RAPIDS v4.0.0 Changelog

## v4.0.0-alpha.1 (2025-10-06)

### 🚀 Revolutionary Transformation

RAPIDS v4.0.0 represents a complete architectural refactoring. The mission: transform from good to legendary while maintaining 100% backwards compatibility.

### ✨ New Features

#### Modern Source Structure
- **Complete `src/` reorganization** with clear separation of concerns
  - `src/cli/` - Command-line interface layer
  - `src/core/` - Business logic and engine systems
  - `src/agents/` - Agent system architecture
  - `src/templates/` - Code generation templates
  - `src/types/` - TypeScript type definitions

#### New CLI Commands
- **`rapids doctor`** - Health check for RAPIDS installation
  - Platform detection
  - Installation verification
  - Agent inventory
  - MCP server status

- **`rapids config`** - Interactive configuration editor (stub)
- **`rapids agent <name> [prompt]`** - Direct agent invocation
  - List available agents
  - Invoke agents with prompts
  - Agent discovery and filtering

- **`rapids template [name]`** - Template generator (stub)

#### Core Systems

**ConfigLoader** (`src/core/config-manager/ConfigLoader.ts`)
- Singleton configuration management
- Agent config loading
- MCP config loading
- Stack config loading
- User preferences
- Installation status checking
- Configuration caching

**AgentRunner** (`src/core/agent-engine/AgentRunner.ts`)
- Agent discovery and enumeration
- Agent lookup by name
- Agent search by trigger
- Agent markdown generation
- Agent invocation interface

#### Comprehensive Type System
Complete TypeScript definitions in `src/types/index.ts`:
- Agent types (`AgentDefinition`, `AgentConfig`, `AgentExecutionContext`)
- Project types (`ProjectAnalysis`, `ProjectMetadata`, `StackConfig`)
- Stack configs (Mobile, Web, Backend, Database, Deployment)
- MCP types (`MCPServer`, `MCPConfig`, `MCPCredentials`)
- Command types (`CommandDefinition`, `CommandContext`)
- Template types (`TemplateConfig`, `TemplateFile`, `TemplateVariable`)
- Utility types (`Result<T, E>`, `ProgressUpdate`, `LogEntry`)

#### Utility Libraries

**Filesystem** (`src/cli/utils/filesystem.ts`)
- Directory size calculation
- Byte formatting
- Accessibility checks
- Safe directory copying
- Backup-enabled file writing
- Type-safe JSON operations
- Recursive file finding

**Platform** (`src/cli/utils/platform.ts`)
- Platform detection (macOS, Linux, Windows)
- Platform support checking
- Claude directory resolution
- Package manager detection
- System information gathering
- CI environment detection

**Validation** (`src/cli/utils/validation.ts`)
- Project name validation
- URL validation
- API key validation
- Email validation
- Version string validation
- Input sanitization

### 🔧 Improvements

#### Build System
- **Dual build process** supporting both legacy and modern code
- Legacy CLI (`cli/*.tsx`) → `dist/*.js` (backwards compatible)
- Modern CLI (`src/**/*.ts`) → `dist/rapids.js` + command bundles
- Improved error handling in build script
- Build output summary

#### Configuration Management
- **Reorganized config templates** from `.claude/` to `config/`
  - `config/agents/` - Agent markdown files
  - `config/commands/` - Slash commands
  - `config/prompts/` - Stack templates
  - `config/output-styles/` - Output styles
  - `config/mcp/` - MCP server configurations

#### TypeScript Configuration
- **Strict mode enabled** for maximum type safety
- Path aliases configured (`@/*`, `@cli/*`, `@core/*`, `@agents/*`, `@templates/*`, `@types/*`)
- Separate build configuration (`tsconfig.build.json`)
- ES2022 target with ESNext modules

#### Package Management
- Added `commander` dependency for modern CLI
- Updated `.gitignore` to exclude `*.tgz` files
- Updated `.npmignore` to properly package built files
- Version bumped to `4.0.0-alpha.1`

### 📚 Documentation

#### New Documentation Files
- **`src/README.md`** - Complete source structure documentation
  - Directory structure explanation
  - Build process guide
  - Type system overview
  - Core systems documentation
  - Utility function reference
  - Development guidelines

- **`docs/V4_MIGRATION.md`** - Migration guide for v4.0.0
  - What's new overview
  - Breaking changes (none in Phase 1)
  - User upgrade path
  - Contributor guidelines
  - Architecture principles
  - FAQ and roadmap

- **`docs/CHANGELOG_V4.md`** - Detailed changelog (this file)

### 🧹 Cleanup

- **Removed** old tarball (`rapids-ai-3.9.2.tgz`)
- **Organized** config templates into dedicated `config/` directory
- **Updated** ignore files for cleaner repository

### 🔄 Backwards Compatibility

**100% backwards compatible** with v3.x:
- All existing commands work unchanged
- `rapids` - Installation
- `rapids-migrate` - Migration
- `rapids-clean` - Cleanup
- Existing `.claude/` configurations fully supported
- No breaking changes to user workflows

### 🏗️ Architecture

#### Design Principles
1. **Minimalism** - Every line serves a purpose
2. **Polyvalence** - Maximum reusability
3. **Efficiency** - Fast builds, fast execution
4. **Beauty** - Clean code, elegant solutions

#### Layer Separation
- **CLI Layer** - User interface, depends on Core
- **Core Layer** - Business logic, independent of CLI
- **Agents Layer** - Agent system, used by Core
- **Templates Layer** - Code generation, used by Core
- **Types Layer** - Type definitions, used by all

### 📦 Build Output

```
dist/
├── install.js      # Legacy: Main installer
├── init.js         # Legacy: Project creator
├── migrate.js      # Legacy: Migration tool
├── clean.js        # Legacy: Cleanup tool
├── update.js       # Legacy: Updater
├── rapids.js       # New: Unified CLI
└── doctor.js       # New: Health checker
```

### 🔮 Future Plans

#### Phase 2 (Next)
- Migrate Ink UI components to `src/cli/ui/components/`
- Migrate CLI screens to `src/cli/ui/screens/`
- Refactor existing commands to use new architecture
- Build template engine
- Build plugin system
- Add comprehensive tests

#### Phase 3 (Future)
- Advanced agent features
- Extended MCP integration
- Web dashboard
- Multi-platform support (Linux, Windows)

### 📊 Statistics

- **Files Created**: 20+
- **Lines of Code (new)**: ~2000
- **Build Time**: <5 seconds
- **Backwards Compatibility**: 100%
- **Breaking Changes**: 0

### 🙏 Acknowledgments

Built with:
- **esbuild** - Lightning-fast bundler
- **TypeScript** - Type-safe JavaScript
- **Ink** - React for CLIs
- **commander** - Modern CLI framework

### 🎯 Mission Accomplished

Phase 1 of the RAPIDS v4.0.0 transformation is complete. The foundation is laid for a legendary framework that combines minimalism, polyvalence, efficiency, and beauty.

**Ship fast. Make money. Build legendary software.**

---

**RAPIDS v4.0.0-alpha.1** - The revolution begins.
