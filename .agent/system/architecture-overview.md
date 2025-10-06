# RAPIDS Architecture Overview

## System Purpose
Global npm package providing AI-powered development tooling for Claude Code with 11 autonomous agents, 6 MCP servers, and stack templates.

## High-Level Architecture

```
┌─────────────────────────────────────────────────────────┐
│                    RAPIDS CLI                           │
│  (install.tsx, init.tsx, update.tsx)                   │
└────────────────┬────────────────────────────────────────┘
                 │
                 │ installs to
                 ▼
┌─────────────────────────────────────────────────────────┐
│           ~/.claude/ (Global Config)                    │
│  • agents/         - 11 agent markdown files            │
│  • commands/       - 6 slash commands                   │
│  • prompts/        - 4 stack templates                  │
│  • output-styles/  - 2 output styles                    │
│  • mcp-config.json - 6 MCP servers                      │
└────────────────┬────────────────────────────────────────┘
                 │
                 │ used by
                 ▼
┌─────────────────────────────────────────────────────────┐
│              Project .claude/                           │
│  • config.json            - Hooks, settings             │
│  • subagents-config.json  - Agent definitions           │
│  • STACK_CONFIG.json      - Docker specs                │
│  • settings.local.json    - Project stack config        │
│  • .agent/                - Context optimization        │
│    ├── task/      - Implementation plans                │
│    ├── system/    - Architecture docs                   │
│    └── sop/       - Operating procedures                │
└─────────────────────────────────────────────────────────┘
```

## Core Components

### 1. CLI Layer (`cli/`)
**install.tsx** - Main installer (npm postinstall)
- Detects OS (macOS only currently)
- Copies agents, commands, prompts, output-styles to `~/.claude/`
- Installs MCP config
- Beautiful Ink TUI with progress

**init.tsx** - Project scaffolding wizard
- Interactive stack selection (Full/Mobile/Web+Backend/Backend)
- Generates `.claude/` project config
- Creates Dockerfiles per stack

**update.tsx** - Update mechanism
- Checks npm for latest version
- Preserves user customizations
- Re-runs installation

### 2. Agent System
11 specialized agents (general-purpose type):
- feature-builder, bug-hunter, code-searcher
- test-generator, refactor-master, performance-analyzer
- db-architect, security-scanner, deployment-manager
- **marketing-strategist** (MOST CRITICAL - revenue first)
- design-master (Material Design 3 expert)

**Agent Flow:**
```
User Request → Claude Code → Selects Agent → Agent Executes
                    ↓
              Reads .agent/task/ plan
              Reads .agent/system/ docs
              Follows .agent/sop/ procedures
```

### 3. MCP Server Integration
6 pre-configured servers:
- **context7** - Live documentation (auto-activated)
- **filesystem** - Local file access
- **postgres** - Database queries
- **github** - Repository operations
- **puppeteer** - Web automation
- **dokploy** - Deployment platform

### 4. Context Optimization System (`.agent/`)
**task/** - Feature plans before implementation
**system/** - Architecture, DB schema, API docs
**sop/** - Step-by-step procedures for common tasks

**Token Savings:** 60-80% reduction vs full codebase analysis

## Build System

### esbuild Configuration
- Entry points: `cli/install.tsx`, `cli/init.tsx`, `cli/update.tsx`
- Bundle: true
- Platform: node
- Format: esm
- External: All dependencies (marked in package.json)
- Minify: true
- Output: `dist/`

**Why esbuild:**
- Fast builds (<100ms)
- Small bundles (~50KB per CLI)
- TypeScript/TSX support
- Tree-shaking

## Data Flow

### Installation Flow
```
npm install -g rapids-ai
  → package.json "postinstall": "node dist/install.js"
  → install.tsx runs
  → Copies files to ~/.claude/
  → Displays success TUI
```

### Project Creation Flow
```
rapids init
  → init.tsx runs
  → Prompts for project name
  → Prompts for stack preset
  → Generates .claude/ config
  → Creates Dockerfiles
  → Initializes .agent/ structure
```

### Agent Execution Flow
```
Claude Code receives task
  → Reads .agent/readme.md (index)
  → Loads relevant .agent/system/ docs
  → Checks .agent/task/ for active plan
  → Reviews .agent/sop/ for procedures
  → Selects appropriate agent
  → Agent executes with minimal context
  → Updates .agent/ docs if needed
```

## Stack Dependencies

### CLI Runtime
- Node.js 18+
- Ink 5 (React for terminals)
- TypeScript (via tsx for dev)
- esbuild (bundler)

### Generated Project Stacks
**Mobile:** Flutter + Riverpod + Go Router
**Web:** Next.js 15 + React 18 + NextAuth.js
**Backend:** FastAPI + SQLAlchemy 2.0 + Pydantic v2
**Database:** PostgreSQL 16+ with asyncpg
**Deployment:** Dokploy (Docker PaaS)

## Configuration Files

### Global (`~/.claude/`)
- `mcp-config.json` - MCP server URIs and env vars
- `agents/*.md` - Agent definitions
- `commands/*.md` - Slash command prompts
- `prompts/*.md` - Stack code templates
- `output-styles/*.md` - Output formatting

### Project (`.claude/`)
- `config.json` - Hooks, parallel execution, settings
- `subagents-config.json` - Detailed agent configs
- `STACK_CONFIG.json` - Docker specs, stack requirements
- `settings.local.json` - User's stack selection

## Critical Design Decisions

### Why Ink over Commander/Yargs?
- Visual feedback during install
- Better UX for interactive prompts
- React component model for complex UI

### Why esbuild over Rollup/Webpack?
- 10-100x faster builds
- Simple config
- Built-in TypeScript/TSX

### Why .agent/ folder?
- Token optimization (60-80% savings)
- Prevents repeated codebase analysis
- Scales with project size
- Sub-agent isolation

### Why Docker-first?
- Dokploy requires Docker
- Reproducible deployments
- Multi-stage builds optimize image size

## Security Considerations

- No sensitive data in global config
- `.env` files never committed
- MCP servers sandboxed per project
- Dokploy API keys in env vars only

## Performance Characteristics

**Install time:** ~2-5 seconds
**Init time:** ~1-3 seconds (interactive)
**Update check:** ~500ms
**Bundle sizes:**
- install.js: ~45KB
- init.js: ~40KB
- update.js: ~35KB

## Extension Points

### Adding New Agent
1. Edit `.claude/subagents-config.json`
2. Add to `.claude/config.json` agents array
3. Create slash command (optional)
4. Create prompt template (optional)
5. Update parallel execution use cases

### Adding New MCP Server
1. Add to `.claude/mcp-config.json`
2. Document in CLAUDE.md
3. Update install.tsx if custom setup needed

### Adding New Stack Template
1. Create `.claude/prompts/{stack-name}.md`
2. Update init.tsx stack selection menu
3. Add Dockerfile to templates
4. Update STACK_CONFIG.json

## Future Architecture Plans

- **Linux/Windows support:** Detect OS, adjust paths
- **Plugin system:** User-defined agents and commands
- **Cloud sync:** Sync config across machines
- **Analytics:** Usage metrics for optimization
