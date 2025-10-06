# RAPIDS Changelog

## v3.9.3 - Rapids Clean Feature (2025-10-06)

### 🚀 New Features
- **rapids-clean** command - Smart cleanup utility for migrated projects
  - Removes legacy environment files (`.env.local`, `.env.production`, etc.)
  - Cleans build artifacts and cache directories
  - Removes deprecated helper scripts
  - Deletes old CI/CD configs
  - Removes migration backups
  - Pre-cleanup verification and size reporting
  - Full cleanup log to `.rapids-cleanup.log`

### 📚 Documentation
- Added `docs/CLEAN.md` - Complete guide for rapids-clean utility
- Updated all documentation to reference rapids-clean workflow
- Added cleanup step in migration workflows

### 🔧 Configuration
- Package.json now includes `rapids-clean` bin entry
- Build process updated to compile clean.tsx

---

## v3.9.2 - Build Fixes (2025-10-06)

### 🐛 Bug Fixes
- Fixed CLI build process parse errors
- Improved ESM compatibility in build output
- Updated esbuild configuration for proper bundling

### 🔧 Infrastructure
- Fixed npm cache path in GitHub Actions workflow
- Added package-lock.json for CI/CD stability
- Improved build reliability

---

## v3.9.1 - Migration Improvements (2025-10-06)

### 🚀 Features
- **rapids-migrate** command - Non-destructive project migration
  - Auto-detects project stack (Next.js, FastAPI, Flutter)
  - Identifies project structure (monorepo, multi-folder, single)
  - Creates `.claude/` configuration without touching code
  - Initializes `.agent/` documentation system
  - Backs up existing `.claude/` if present
  - 100% safe - no code modifications

### 📚 Documentation
- Added `docs/MIGRATION.md` - Complete migration guide
- Updated documentation to include migration workflows
- Added migration examples and troubleshooting

### 🔧 Updates
- Updated MCP count from 5 to 7 (added Neon and Dokploy)
- Updated agent count to 11 (includes design-master)
- Package.json now includes rapids-migrate bin entry

---

## v3.5.0 - Token-Optimized Beast Mode (2025-10-04)

### 🚀 Major Features

#### Token Optimization (40-60% Savings)
- **Subagent isolation** with separate context windows
- **Parallel execution** - Run 3 agents concurrently
- **Auto-compact** triggers at 150K tokens
- **Smart file reading** with `offset`, `limit`, `head_limit`
- **Optimized configs** in `.claude/config.json`

#### Output Styles (NEW!)
- **RAPIDS Speed Mode** (`/output-style rapids-speed`)
  - Extremely concise, action-first
  - No preamble or explanations
  - Target: <50K tokens per feature

- **Ship Mode** (`/output-style ship-mode`)
  - Revenue-first decision making
  - Validates ROI before building
  - Focus on MRR, CAC, LTV, churn

#### CI/CD Automation (NEW!)
- **GitHub Actions templates** in `.github/workflows/claude-ci.yml`
  - `@claude fix this` → Auto-fix bugs
  - Open PR → Auto-test + security scan
  - Merge to main → Auto-deploy
  - Label `revenue` → Marketing analysis
- Easy setup: Add `ANTHROPIC_API_KEY` to secrets

### 📚 Documentation
- **Quick Start Guide** (`docs/QUICK_START.md`)
  - Installation instructions
  - Agent usage examples
  - Workflows for shipping fast

- **Optimization Guide** (`docs/RAPIDS_OPTIMIZATION_GUIDE.md`)
  - Token saving techniques
  - Hook automation
  - Subagent strategies
  - Best practices

### 🔧 Configuration Updates
- Enhanced hooks in `config.json`:
  - `session-start`: Reminds "Ship fast, make money"
  - `user-prompt-submit`: RAPIDS branding
  - `tool-use-start`: Tool indicators

- Token optimization settings:
  - `compactOnThreshold`: 150000
  - `tokenOptimization`: true

### 📦 Package Structure
```
rapids/
├── .claude/
│   ├── config.json              # Optimized hooks & settings
│   ├── agents-config.json       # 10 agents with triggers
│   ├── output-styles/           # NEW: Speed & Ship modes
│   │   ├── rapids-speed.md
│   │   └── ship-mode.md
│   ├── agents/                  # Agent definitions
│   ├── commands/                # Slash commands
│   └── prompts/                 # Templates
├── .github/
│   └── workflows/
│       └── claude-ci.yml        # NEW: CI/CD automation
├── docs/                        # NEW: Documentation
│   ├── QUICK_START.md
│   └── RAPIDS_OPTIMIZATION_GUIDE.md
├── cli/                         # Installation scripts
├── package.json                 # v3.5.0
└── README.md                    # Updated with new features
```

### 🎯 Performance Improvements

**Token Savings Examples:**
| Task | Before | After | Savings |
|------|--------|-------|---------|
| Full-stack feature | 80-120K | 35-50K | ~60% |
| Bug fix + test | 25-40K | 10-18K | ~55% |
| Marketing campaign | 30-50K | 15-25K | ~45% |

### 🔄 Breaking Changes
None - fully backward compatible!

### 📝 What's Changed from v3.0.0
1. ✅ Added 2 output styles (RAPIDS Speed, Ship Mode)
2. ✅ Integrated GitHub Actions CI/CD templates
3. ✅ Created comprehensive documentation (2 guides)
4. ✅ Optimized config with auto-compact
5. ✅ Enhanced hooks for better UX
6. ✅ Organized docs in dedicated folder
7. ✅ Updated README with token optimization stats

### 🚀 Upgrade Instructions

```bash
# Update globally
npm update -g rapids-ai

# Re-run installer to get new configs
rapids

# Activate new output styles
/output-style rapids-speed  # or ship-mode
```

### 🎉 What Users Get Now

1. **Install** → `npm install -g rapids-ai && rapids`
2. **Output styles** → `/output-style ship-mode`
3. **Build feature** → `/agent feature-builder "Build X"`
4. **Ship fast** → Feature → production in <2 hours
5. **Save tokens** → 40-60% reduction
6. **Automate CI/CD** → Copy workflow, add API key, done

### 🏆 Success Metrics to Track
- ✅ Token usage per feature: <50K target
- ✅ Time to ship: <2 hours
- ✅ Revenue impact: Track via marketing-strategist
- ✅ Build success rate: >80%
- ✅ Subagent usage: >60% of complex tasks

### 💡 Philosophy
**RAPIDS v3.5.0 Core Principle:**
> "The only metric that matters is revenue. Ship fast, optimize tokens, make money."

---

## v3.0.0 - Initial npm Package (2025-10-04)
- Initial release as npm package
- 10 AI agents (feature-builder, bug-hunter, etc.)
- 5 MCP servers (Context7, Filesystem, PostgreSQL, GitHub, Puppeteer)
- Beautiful Ink TUI installation
- Global installation support

---

**Full Documentation**: See `docs/` folder
**Installation**: `npm install -g rapids-ai`
**Philosophy**: Ship fast, make money 🚀
