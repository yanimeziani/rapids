# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

RAPIDS is a global npm package that installs AI-powered development tools for Claude Code. It provides 10 autonomous sub-agents, 5 MCP servers, slash commands, and stack templates optimized for Flutter, Next.js 15, FastAPI, PostgreSQL, and DocPloy deployment.

**Key Philosophy**: Ship fast, make money. Token-optimized workflows for solo developers.

## Build & Development Commands

### Build CLI
```bash
node scripts/build.js
```
Builds the three CLI entry points (install, init, update) from TypeScript/TSX to JavaScript using esbuild. Output goes to `dist/` directory.

### Test Installation Locally
```bash
# Build first
node scripts/build.js

# Test the install flow
./cli/install.tsx

# Test project creation
./cli/init.tsx
```

### Publishing
```bash
# Update version in package.json
npm version patch|minor|major

# Build before publishing
node scripts/build.js

# Publish to npm
npm publish
```

### Test the Package
```bash
# Pack locally
npm pack

# Install globally from tarball
npm install -g ./rapids-ai-<version>.tgz

# Run the installer
rapids
```

## Architecture

### CLI Structure
The package has three main CLI commands built with Ink (React for terminals):

1. **`cli/install.tsx`** - Main installer (runs on `npm install -g`)
   - Detects environment (macOS only currently)
   - Installs agents to `~/.claude/agents/`
   - Installs commands to `~/.claude/commands/`
   - Installs prompts/templates to `~/.claude/prompts/`
   - Installs output styles to `~/.claude/output-styles/`
   - Installs MCP config to `~/.claude/mcp-config.json`
   - Displays beautiful Ink TUI with progress

2. **`cli/init.tsx`** - Project scaffolding wizard
   - Interactive project name input
   - Stack preset selection (Full Stack, Mobile Only, Web+Backend, Backend Only)
   - Generates project structure with appropriate Dockerfiles

3. **`cli/update.tsx`** - Update mechanism
   - Checks for latest version
   - Preserves user customizations
   - Re-runs installation

### Global Installation Locations

**macOS**: `~/Library/Application Support/Claude/` → `~/.claude/`
**Linux**: `~/.config/claude/` → `~/.claude/`

Files installed globally:
- `~/.claude/agents/*.md` - 10 agent definitions
- `~/.claude/commands/*.md` - 6 slash commands
- `~/.claude/prompts/*.md` - 3 stack templates
- `~/.claude/output-styles/*.md` - 2 output styles
- `~/.claude/mcp-config.json` - MCP server configuration

### Project Configuration Files

Located in `.claude/` directory:
- `config.json` - Main Claude Code configuration with hooks and settings
- `subagents-config.json` - Detailed agent definitions with triggers and instructions
- `STACK_CONFIG.json` - Stack requirements and Docker specifications
- `settings.local.json` - Project-specific stack configuration
- `mcp-config.json` - MCP server setup (Context7, Filesystem, PostgreSQL, GitHub, Puppeteer)

### The 11 Agents

All agents are general-purpose type with specific roles:

1. **feature-builder** - Builds complete features across mobile, web, and backend
2. **bug-hunter** - Finds and fixes bugs across the entire codebase
3. **code-searcher** - Searches and analyzes code patterns (auto-activate)
4. **test-generator** - Generates comprehensive tests
5. **refactor-master** - Refactors code while maintaining functionality
6. **performance-analyzer** - Analyzes and optimizes performance
7. **db-architect** - Manages database schema and migrations
8. **security-scanner** - Scans for security vulnerabilities
9. **deployment-manager** - Manages deployments to staging and production
10. **marketing-strategist** - THE MOST CRITICAL: Revenue generation, user acquisition, GTM strategy
11. **design-master** - Material Design 3 expert for creating beautiful, accessible, and adaptive UIs

### Stack Templates

Four code generation templates in `.claude/prompts/`:
- `mobile-feature.md` - Flutter + Riverpod patterns
- `backend-api.md` - FastAPI + SQLAlchemy + Pydantic patterns
- `web-page.md` - Next.js 15 App Router patterns
- `design-system.md` - Material Design 3 components, color schemes, and accessibility guidelines

## Token Optimization Strategy

RAPIDS is designed for minimal token usage:

### Read Priority (Read ONLY when needed)
1. **Build/Dev Tasks**: `package.json`, `scripts/build.js`
2. **CLI Development**: `cli/install.tsx`, `cli/init.tsx`, `cli/update.tsx`
3. **Agent Configuration**: `.claude/subagents-config.json`
4. **Stack Config**: `.claude/STACK_CONFIG.json`
5. **Documentation**: Only when explicitly requested

### NEVER Read
- `node_modules/` (always excluded)
- `.git/` (version control)
- `dist/` (build output)
- Documentation unless requested
- Files listed in `.claudeignore`

### Best Practices
- Read files only when directly relevant to the task
- Use Grep/Glob for searching instead of reading multiple files
- Batch operations to minimize tool calls
- User should specify which files need modification

## Deployment Requirements

### Docker-First Architecture
RAPIDS enforces Docker for all deployments to DocPloy:

**Web (Next.js)**:
- Multi-stage build required: deps → builder → runner
- Base image: `node:20-alpine`
- Build output: `standalone` mode
- File: `web/Dockerfile`

**Backend (FastAPI)**:
- Single-stage Python build
- Base image: `python:3.12-slim`
- Health checks required
- File: `backend/Dockerfile`

**Mobile (Flutter)**:
- No Docker required (native mobile apps)

## Common Workflows

### Adding a New Agent
1. Edit `.claude/subagents-config.json`
2. Add agent definition with type, description, triggers, instructions
3. Update `.claude/config.json` agents section
4. Create slash command in `.claude/commands/` (optional)
5. Create prompt template in `.claude/prompts/` (optional)
6. Update parallel execution use cases if applicable
7. Test locally before publishing

Example: The `design-master` agent was added with:
- Full agent definition in `subagents-config.json`
- Registration in `config.json`
- `/design` slash command in `commands/design.md`
- Design template in `prompts/design-system.md`
- Parallel execution examples updated

### Modifying CLI
1. Edit source in `cli/*.tsx`
2. Run `node scripts/build.js`
3. Test with `./cli/<command>.tsx` or from `dist/`
4. Verify bundle size and dependencies

### Publishing New Version
1. Update version in `package.json`
2. Update `README.md` and `docs/CHANGELOG.md`
3. Build: `node scripts/build.js`
4. Test locally: `npm pack && npm install -g ./rapids-ai-*.tgz`
5. Publish: `npm publish`
6. Update GitHub Pages docs

## Technology Stack

### CLI Framework
- **Ink 5** - React for terminal UI
- **React 18** - Component framework
- **TypeScript** - Type safety (via tsx)
- **esbuild** - Fast bundler for CLI

### Dependencies
- `execa` - Shell command execution
- `fs-extra` - Enhanced file operations
- `chalk` - Terminal colors
- `gradient-string` - Gradient text
- `ora` - Terminal spinners
- `conf` - Configuration management
- `update-notifier` - Version checking

### Dev Stack for Generated Projects
- **Mobile**: Flutter + Riverpod + Go Router + Hive + Dio
- **Web**: Next.js 15 + React 18 + NextAuth.js
- **Backend**: FastAPI + SQLAlchemy 2.0 + Pydantic v2 + Alembic
- **Database**: PostgreSQL 16+ with asyncpg
- **Deployment**: DocPloy (self-hosted Docker PaaS)

## File Structure

```
rapids/
├── cli/                      # CLI source files
│   ├── install.tsx          # Main installer (bin entry)
│   ├── init.tsx             # Project creation wizard
│   └── update.tsx           # Update mechanism
├── .claude/                  # Configuration (copied globally)
│   ├── agents/              # Agent markdown files
│   ├── commands/            # Slash commands
│   ├── prompts/             # Stack templates
│   ├── output-styles/       # Output style configs
│   ├── config.json          # Main config
│   ├── subagents-config.json # Agent definitions
│   ├── mcp-config.json      # MCP servers
│   └── STACK_CONFIG.json    # Stack specs
├── scripts/
│   └── build.js             # esbuild CLI builder
├── dist/                     # Built CLI files (gitignored)
├── docs/                     # Documentation
├── package.json             # npm package config (bin: ./cli/install.js)
└── README.md                # User documentation
```

## Important Notes

### Platform Support
- Currently: macOS only
- Coming: Linux and Windows support

### Dependencies Management
CLI dependencies are marked as external in esbuild to reduce bundle size. They must be listed in `package.json` dependencies (not devDependencies).

### MCP Servers
Five MCP servers are pre-configured:
1. **@upstash/context7-mcp** - Up-to-date documentation (auto-activated)
2. **@modelcontextprotocol/server-filesystem** - Local file access
3. **@modelcontextprotocol/server-postgres** - Database queries
4. **@modelcontextprotocol/server-github** - Repository management
5. **@modelcontextprotocol/server-puppeteer** - Web automation

### Output Styles
Two custom output styles in `.claude/output-styles/`:
- **rapids-speed.md** - Extremely concise, <50K tokens per feature
- **ship-mode.md** - Revenue-first, every decision driven by ROI

## Revenue-First Philosophy

The marketing-strategist agent is THE MOST CRITICAL because:
- Code without users is worthless
- Features without revenue validation waste time
- Marketing and distribution are harder than coding

Always validate market demand before building.
