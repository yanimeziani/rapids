# Migrating Existing Projects to RAPIDS

This guide explains how to add RAPIDS framework to an existing project without breaking your code.

## Quick Migration

```bash
cd your-existing-project
rapids-migrate
```

## What It Does

The migration tool:

1. **Analyzes your project**
   - Detects tech stack (Next.js, FastAPI, Flutter)
   - Identifies project structure (monorepo, multi-folder, single)
   - Finds package manager (npm, yarn, pnpm)
   - Locates existing folders (web, backend, mobile, etc.)

2. **Creates RAPIDS configuration** (non-destructive)
   - Adds `.claude/` configuration folder
   - Creates `CLAUDE.md` with project-specific instructions
   - Sets up `.claudeignore` if missing
   - Generates `settings.local.json` with detected structure

3. **Initializes `.agent/` documentation system**
   - Creates folder structure (task, system, sop)
   - Copies templates from global installation
   - Generates initial architecture overview

4. **Preserves your code** (zero changes)
   - No files moved
   - No code modified
   - Existing structure untouched
   - Backup created if `.claude/` exists

## Supported Project Structures

### Monorepo
```
your-project/
├── web/           # Next.js app
├── backend/       # FastAPI
├── mobile/        # Flutter
└── package.json   # Workspaces
```

### Multi-folder
```
your-project/
├── frontend/      # or client/
├── server/        # or api/
└── ...
```

### Single stack
```
your-project/
├── app/           # Next.js or React
├── pages/
├── components/
└── package.json
```

## What You Get

After migration, you can immediately use:

- **11 AI agents** - `/feature`, `/bug`, `/refactor`, `/deploy`, etc.
- **Token optimization** - `.agent/` docs reduce context by 60-80%
- **Slash commands** - `/update-doc`, `/design`, etc.
- **MCP servers** - Context7, Filesystem, PostgreSQL, GitHub, Puppeteer, Dokploy

## Post-Migration Steps

### 1. Document Your Architecture

```bash
# In Claude Code
/update-doc system
```

This creates:
- `architecture-overview.md`
- `database-schema.md` (if DB detected)
- `api-endpoints.md` (if backend detected)
- `critical-paths.md`

### 2. Create Feature Plans

Before building new features:

```bash
/update-doc plan user-authentication
```

Generates structured plan in `.agent/task/`

### 3. Start Using Agents

```bash
/feature "Add user profile page"
/bug "Fix login redirect issue"
/refactor "Extract auth logic to hooks"
/deploy "Push to staging"
```

## Rollback

If you want to undo migration:

```bash
# Remove RAPIDS configuration
rm -rf .claude/ .agent/ CLAUDE.md .claudeignore

# Restore backup if needed
mv .claude.backup .claude
```

## Migration vs Fresh Install

| Aspect | Fresh Install (`rapids init`) | Migration (`rapids-migrate`) |
|--------|-------------------------------|------------------------------|
| **Project structure** | Creates new folders | Preserves existing |
| **Dockerfiles** | Generated automatically | Optional (via agents) |
| **Stack detection** | User selects | Auto-detected |
| **Configuration** | Pre-configured | Adapted to project |
| **Risk** | Zero (new project) | Zero (non-destructive) |

## Common Scenarios

### Scenario 1: Monorepo with Custom Names

If your folders are named differently:

```
your-project/
├── apps/web/      # Not just "web"
├── services/api/  # Not just "backend"
```

Migration detects common patterns:
- `web`, `frontend`, `client` → Web
- `backend`, `server`, `api` → Backend
- `mobile`, `app` → Mobile

Update `.claude/settings.local.json` manually if needed:

```json
{
  "folders": {
    "web": "apps/web",
    "backend": "services/api"
  }
}
```

### Scenario 2: No Docker Yet

Migration doesn't add Dockerfiles automatically. Generate them on-demand:

```bash
# In Claude Code
/feature "Add Dockerfile for production deployment"
```

The agent will create Docker configs based on your stack.

### Scenario 3: Existing Documentation

If you have `docs/` folder:

1. Keep it (migration doesn't touch it)
2. `.agent/` is for **AI context**, not human docs
3. Human docs stay in `docs/`, AI reads `.agent/`

## Best Practices

### Token Optimization

**Before RAPIDS:**
```
You: "Add user authentication"
Claude: *reads entire codebase* (50K tokens)
```

**After RAPIDS:**
```
You: "Add user authentication"
Claude: *reads .agent/system/architecture-overview.md* (2K tokens)
Claude: *reads .agent/system/database-schema.md* (1K tokens)
```

**Savings: 94%**

### Incremental Adoption

You don't need to use all features at once:

1. **Week 1**: Just use agents for feature building
2. **Week 2**: Add `.agent/` docs for token savings
3. **Week 3**: Use slash commands for workflows
4. **Week 4**: Add Dockerfiles for deployment

### Documentation Maintenance

Update `.agent/` docs after major changes:

```bash
/update-doc system    # After architecture changes
/update-doc index     # After adding new docs
```

## Troubleshooting

### Migration Fails

Check:
- You're in project root
- You have write permissions
- `.claude/` isn't read-only

### Agents Don't Understand Project

Run:
```bash
/update-doc system
```

Then describe architecture in `.agent/system/architecture-overview.md`

### Wrong Stack Detected

Edit `.claude/settings.local.json`:

```json
{
  "stack": {
    "web": true,
    "backend": false,  // Disable if no backend
    "mobile": true
  }
}
```

## FAQ

**Q: Will migration break my code?**
A: No. Migration only adds RAPIDS configuration. Your code is untouched.

**Q: Can I migrate a production project?**
A: Yes. Migration is read-only for your code. Only `.claude/` and `.agent/` are created.

**Q: Do I need to restructure my folders?**
A: No. RAPIDS adapts to your structure.

**Q: What if I have custom CI/CD?**
A: Keep it. RAPIDS agents can generate additional workflows without replacing yours.

**Q: Can I customize agents?**
A: Yes. Edit `.claude/config.json` and `.claude/subagents-config.json` after migration.

## Next Steps

- [Read Context Optimization Guide](./CONTEXT_OPTIMIZATION.md)
- [Explore Agent Capabilities](./AGENTS.md)
- [Learn Slash Commands](./COMMANDS.md)
- [Set Up Deployment](./DEPLOYMENT.md)
