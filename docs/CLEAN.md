# RAPIDS Clean

## Overview

`rapids-clean` is a smart cleanup utility that removes old project files and documentation after migrating to RAPIDS framework. It helps you maintain a clean, RAPIDS-optimized project structure.

## When to Use

Run `rapids-clean` **after** successfully running `rapids-migrate` on an existing project. It will:

- Remove legacy documentation files
- Clean up old configuration files that conflict with RAPIDS patterns
- Delete build artifacts and cache directories
- Remove deprecated helper scripts replaced by RAPIDS agents
- Clean up old CI/CD configs
- Remove migration backups (`.claude.backup/`)

## Usage

```bash
# After migrating your project
cd your-project/
rapids-migrate

# Then clean up old files
rapids-clean
```

## What Gets Cleaned

### Legacy Documentation
- `README.old.md`
- `CONTRIBUTING.old.md`
- `docs/old/**`
- `docs/legacy/**`

### Environment Files (RAPIDS uses `.env` only)
- `.env.local`
- `.env.production`
- `.env.development`
- `.env.example`

### Build Artifacts
- `.next/` - Next.js build cache
- `dist/` - Build output (regenerated on build)
- `build/` - Build output
- `__pycache__/` - Python cache
- `*.pyc` - Python bytecode
- `.pytest_cache/` - Pytest cache

### Replaced Helper Scripts
- `scripts/setup.sh`
- `scripts/init.sh`
- `scripts/bootstrap.sh`
- `bin/setup`
- `bin/init`

### Old CI/CD Configs
- `.travis.yml`
- `.circleci/`
- `azure-pipelines.yml`

### Migration Artifacts
- `.claude.backup/` - Backup created during migration

## Safety Features

### Pre-Cleanup Verification
- Checks if RAPIDS has been initialized (`.claude/` and `CLAUDE.md` exist)
- Will not run on non-RAPIDS projects
- Shows preview of items to be removed before cleaning

### Cleanup Log
All removed items are logged to `.rapids-cleanup.log` with:
- Timestamp
- Item path
- Reason for removal
- Size freed
- Success/failure status

### Size Reporting
Shows total disk space that will be freed before cleanup.

## Output Example

```
⚡ RAPIDS Clean

Found 12 items to clean up:
  📄 .env.local - Use .env only (per CLAUDE.md) (1.2 KB)
  📄 .env.production - Use .env only (per CLAUDE.md) (980 B)
  📁 .next/ - Next.js build cache (45.3 MB)
  📁 __pycache__/ - Python cache (2.1 MB)
  📄 scripts/setup.sh - Replaced by RAPIDS migration (3.4 KB)
  📁 .claude.backup - Migration backup (15.2 KB)
  ... and 6 more items

Total space to free: 47.7 MB

⚡ Starting cleanup in 2 seconds...
 (Log will be saved to .rapids-cleanup.log)
```

## Post-Cleanup

After cleanup completes:
1. Review `.rapids-cleanup.log` to verify removed items
2. Continue working with RAPIDS agents
3. Use `.agent/` documentation system for context optimization

## Philosophy

RAPIDS Clean enforces the "one source of truth" principle:
- **Environment**: `.env` only (no `.env.local`, `.env.production`, etc.)
- **Documentation**: `CLAUDE.md` and `.agent/` system (no scattered READMEs)
- **Setup**: RAPIDS agents replace helper scripts
- **CI/CD**: GitHub Actions with RAPIDS workflow (old configs removed)

## Non-Destructive

`rapids-clean` **never** removes:
- Source code
- `.claude/` configuration
- `.agent/` documentation
- Active package manager files
- `package.json` or dependency configs
- Git repository (`.git/`)

## Workflow

```
┌─────────────────┐
│ Existing Project│
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ rapids-migrate  │ ← Sets up RAPIDS
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  rapids-clean   │ ← Removes old files
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ Clean RAPIDS    │
│    Project      │
└─────────────────┘
```

## Advanced Usage

### Manual Review Before Cleanup

The tool shows a preview and waits 2 seconds before starting. To manually review:

```bash
# Run clean
rapids-clean

# Review the preview list
# Press Ctrl+C within 2 seconds to cancel if needed
```

### Checking Cleanup Log

```bash
# After cleanup
cat .rapids-cleanup.log

# Example output:
# RAPIDS Cleanup Log - 2025-10-06T15:30:00.000Z
# Root: /path/to/project
# Items to remove: 12
# Total size: 47.7 MB
#
# Removed items:
# ✓ .env.local - Use .env only (per CLAUDE.md) (1.2 KB)
# ✓ .next/ - Next.js build cache (45.3 MB)
# ...
```

## Integration with RAPIDS Workflow

After cleaning:

1. **Update Documentation**
   ```bash
   # In Claude Code
   /update-doc system
   ```

2. **Start Building Features**
   ```bash
   /feature <feature-name>
   ```

3. **Use Clean Environment**
   - All environment variables in `.env`
   - No conflicting config files
   - Minimal disk footprint

## FAQ

**Q: Can I run rapids-clean multiple times?**
A: Yes. It's idempotent - subsequent runs will find nothing to clean.

**Q: What if I need a file that was removed?**
A: Check `.rapids-cleanup.log` for the complete list. Most removed files are regenerated on build or replaced by RAPIDS patterns.

**Q: Can I customize what gets cleaned?**
A: Not currently. The cleanup patterns are optimized for RAPIDS best practices. If you need custom cleanup, use standard shell commands.

**Q: Does it remove node_modules/?**
A: No. Package dependencies are never removed. Use `npm/yarn/pnpm prune` for that.

**Q: What about my custom scripts?**
A: Only common setup/init scripts are removed. Custom build or utility scripts are preserved.

## See Also

- [Migration Guide](./MIGRATION.md) - How to migrate existing projects
- [CLAUDE.md](../CLAUDE.md) - Project philosophy and architecture
- [Context System](./.agent/readme.md) - Token optimization with `.agent/` docs
