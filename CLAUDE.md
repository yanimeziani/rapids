# RAPIDS - Claude Code Optimization Guide

## Project Overview
RAPIDS is a global Claude Code configuration package with 10 AI agents, 5 MCPs, and marketing automation.

## Token Optimization Strategy

### What to Read (Priority Order)
1. **Core files only when needed**:
   - `package.json` - Project metadata and dependencies
   - `.claudeignore` - Exclusion rules
   - CLI files in `cli/` - Only when modifying installation logic

2. **Configuration (on-demand)**:
   - `.claude/config.json` - Main Claude config
   - `.claude/agents-config.json` - Agent definitions
   - `.claude/mcp-config.json` - MCP server setup
   - `.claude/STACK_CONFIG.json` - Stack templates

3. **Documentation (when specifically asked)**:
   - `.claude/README.md` - Quick reference
   - `.claude/RAPIDS_METHOD.md` - Methodology
   - `.claude/DEVELOPMENT_GUIDE.md` - Dev workflow

### What to NEVER Read (Forbidden)
- `node_modules/` - Dependencies (already in .claudeignore)
- `.git/` - Version control
- Build outputs and cache directories
- Documentation files unless explicitly requested

### Best Practices
1. **Minimal File Reading**: Only read files directly relevant to the task
2. **Batch Operations**: Group related changes to minimize edit operations
3. **Explicit Instructions**: User should specify which files to modify
4. **No Exploratory Reading**: Don't browse directories unnecessarily

### Quick Commands
When user asks to:
- **Install RAPIDS**: Read `cli/install.tsx` only
- **Create project**: Read `cli/init.tsx` only
- **Update agents**: Read `.claude/agents-config.json` only
- **Modify MCP**: Read `.claude/mcp-config.json` only

### File Size Limits
All files are kept lean:
- CLI files: ~300 lines max
- Config files: JSON only, no bloat
- Docs: Concise, reference-style

## Context Window Usage
- **Target**: Minimize token usage for 200K context
- **Strategy**: Read only what's needed, nothing more
- **Benefit**: Faster responses, lower costs, better performance
