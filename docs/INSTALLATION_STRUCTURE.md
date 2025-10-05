# RAPIDS Installation Structure

## Overview
RAPIDS now installs to `~/.claude/` with features organized in separate folders following Claude Code conventions.

## Directory Structure

When you run `npx @yanimeziani/rapids-install`, the following structure is created in `~/.claude/`:

```
~/.claude/
├── agents/                    # AI Agent definitions (10 agents)
│   ├── bug-hunter.md
│   ├── code-searcher.md
│   ├── db-architect.md
│   ├── deployment-manager.md
│   ├── feature-builder.md
│   ├── marketing-strategist.md
│   ├── performance-analyzer.md
│   ├── refactor-master.md
│   ├── security-scanner.md
│   └── test-generator.md
│
├── commands/                  # Slash commands
│   ├── stack.md
│   ├── init-mobile.md
│   ├── init-web.md
│   └── ...
│
├── prompts/                   # Stack templates
│   ├── nextjs-stack.md
│   ├── react-native-stack.md
│   └── ...
│
├── output-styles/            # Custom output formatting
│   └── ...
│
├── mcp-servers/              # MCP server configurations
│   ├── rapids-mcps.json      # RAPIDS MCP definitions
│   └── ...
│
└── rapids-config/            # RAPIDS configuration & docs
    ├── config.json           # Main RAPIDS config
    ├── subagents-config.json # Agent definitions
    ├── STACK_CONFIG.json     # Stack templates config
    ├── README.md             # RAPIDS quick reference
    ├── RAPIDS_METHOD.md      # Methodology guide
    ├── DEVELOPMENT_GUIDE.md  # Development workflow
    ├── SUBAGENTS_GUIDE.md    # Agent usage guide
    └── shortcuts.md          # Keyboard shortcuts
```

## Key Benefits

### 1. **Feature Separation**
Each type of feature lives in its own directory:
- **Agents** → `~/.claude/agents/`
- **Commands** → `~/.claude/commands/`
- **Prompts** → `~/.claude/prompts/`
- **MCPs** → `~/.claude/mcp-servers/`
- **Config** → `~/.claude/rapids-config/`

### 2. **No Conflicts**
Installing to `~/.claude/` with separate folders means:
- RAPIDS features don't override Claude Code internals
- Easy to identify what came from RAPIDS
- Clean uninstall (just remove the RAPIDS folders)

### 3. **Standard Compliance**
Follows Claude Code conventions:
- `~/.claude/` is the standard user config directory
- Feature folders match Claude Code's expected structure
- Agents are individual `.md` files (not bundled in config)

## How It Works

### Global Installation
```bash
npx @yanimeziani/rapids-install
```
- Installs all features to `~/.claude/` in organized folders
- Creates CLI helpers (`rapids-init-project`, `rapids-add-here`)
- Makes features available globally

### Project Initialization
```bash
rapids-init-project my-app
```
Copies all RAPIDS features from `~/.claude/` to `my-app/.claude/`:
- All 10 agents
- All slash commands
- All prompt templates
- All MCP configurations
- All documentation

### Add to Existing Project
```bash
cd existing-project
rapids-add-here
```
Copies RAPIDS features to current directory's `.claude/` folder.

## Migration from Previous Versions

### Before (v3.0-3.4)
```
~/.config/claude/    # Wrong location
├── config.json      # Mixed with agents
├── agents/          # Bundled config
└── ...
```

### Now (v3.5+)
```
~/.claude/           # Correct location
├── agents/          # ✅ Separate folder
├── commands/        # ✅ Separate folder
├── prompts/         # ✅ Separate folder
├── mcp-servers/     # ✅ Separate folder
└── rapids-config/   # ✅ Separate folder
```

## Uninstalling RAPIDS

To remove RAPIDS features:
```bash
rm -rf ~/.claude/agents/bug-hunter.md \
       ~/.claude/agents/code-searcher.md \
       # ... other RAPIDS agents
       ~/.claude/rapids-config \
       ~/.claude/mcp-servers/rapids-mcps.json
```

Or more simply, identify and remove files created by RAPIDS (they're all in separate, identifiable folders).

## Technical Notes

- **Agents**: Each agent is a separate `.md` file for easy editing
- **Commands**: Standard Claude Code slash command format
- **Prompts**: Standard Claude Code prompt template format
- **MCPs**: Standard MCP server configuration format
- **No Override**: Existing `~/.claude/` files are preserved (RAPIDS uses separate folders)
