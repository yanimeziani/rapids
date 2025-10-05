# 🌊 RAPIDS

**R**eusable **A**gent-**P**owered **I**ntelligence **D**evelopment **S**ystem

> **Global** Claude Code configuration for solo developers who ship fast and make money

## 🎯 What is RAPIDS?

RAPIDS is a **global installation** for Claude Code that gives you 10 autonomous agents, 5 MCP servers, and cutting-edge AI tooling across **ALL your projects**.

**The Game-Changer**: Install once, use everywhere. No more per-project setup.

**Optimized for:**
- Flutter mobile apps with Riverpod
- Next.js 15 web applications
- FastAPI backends with async/await
- PostgreSQL databases
- DocPloy deployment
- **Making money** (Marketing & Business Strategy Agent)

## ⚡ Global Installation (One-Time)

### Interactive TUI (Recommended - Beautiful!)

```bash
# Clone RAPIDS
git clone https://github.com/yanimeziani/rapids.git
cd rapids

# Run interactive installer with Ink TUI
./install-tui.sh

# Restart terminal, then create projects interactively:
node --import tsx/esm cli/init.js
# Or use the CLI helper (after restart):
rapids-init-project
```

### Classic Bash (Alternative)

```bash
# For systems without Node.js 20+
./install-global.sh
```

## 🚀 What You Get (Globally)

### 10 Autonomous Sub-Agents
AI agents that work in parallel (up to 3 simultaneously):

**Development Agents:**
- **Feature Builder** - Complete features across mobile/web/backend
- **Bug Hunter** - Find and fix bugs autonomously
- **Code Searcher** - Deep code analysis (auto-activated)
- **Test Generator** - Comprehensive test generation
- **Refactor Master** - Intelligent refactoring
- **Performance Analyzer** - Full-stack optimization
- **DB Architect** - Database schema management
- **Security Scanner** - Security audits
- **Deployment Manager** - Automated deployments

**💰 THE MOST CRITICAL AGENT:**
- **Marketing Strategist** - Revenue generation, user acquisition, GTM strategy, copywriting, pricing, growth hacking. **Because code without revenue is worthless.**

### 5 MCP Servers (Cutting-Edge)
**Model Context Protocol** - The "USB-C for AI":
1. **Context7** 🔥 - Up-to-date documentation for any library (auto-activated)
2. **Filesystem** - Local file access across all projects
3. **PostgreSQL** - Direct database querying and schema inspection
4. **GitHub** - Repository management, issues, PRs, code search
5. **Puppeteer** - Web automation for market research & competitor analysis

### 6 Slash Commands
- `/new-feature` - Create complete features
- `/fix-bug` - Debug and fix issues
- `/refactor` - Intelligent code refactoring
- `/test` - Generate and run tests
- `/deploy` - Deploy to staging/production
- `/market` - Marketing strategy, GTM, copywriting, revenue optimization

### 3 Stack Templates
- Flutter + Riverpod mobile features
- Next.js 15 App Router pages
- FastAPI + SQLAlchemy endpoints

### Docker-First (Always Included)
- Dockerfiles for web (Next.js) and backend (FastAPI)
- docker-compose.yml for local development
- Multi-stage builds optimized for DocPloy
- Health checks and auto-restart

### Global CLI Commands
```bash
rapids-init-project <name>  # Create new project with RAPIDS
rapids-update               # Update RAPIDS to latest version
```

## 📦 What's Included

```
rapids/
├── .claude/                      # Claude Code configuration
│   ├── agents-config.json        # 10 sub-agents (including Marketing!)
│   ├── mcp-config.json           # 5 MCP servers configuration
│   ├── commands/                 # 6 slash commands
│   ├── prompts/                  # 3 stack templates
│   ├── agents/                   # Agent documentation
│   │   └── marketing-strategist.md  # 💰 The money-maker
│   ├── RAPIDS_METHOD.md          # Full methodology
│   └── STACK_CONFIG.json         # Stack requirements
├── .vscode/                      # VSCode integration
├── scripts/                      # Automation scripts
├── web/Dockerfile                # Next.js multi-stage build
├── backend/Dockerfile            # FastAPI with health checks
├── docker-compose.yml            # Local development template
├── install-global.sh             # Global installer (one-time)
└── install.sh                    # Per-project installer (legacy)
```

**Global Installation Location:**
- macOS: `~/Library/Application Support/Claude/rapids/`
- Linux: `~/.config/claude/rapids/`

## 🎨 Usage Examples

### Use MCP Servers in Any Prompt
```
"use context7 to show me the latest Next.js 15 App Router patterns"

"use puppeteer to scrape competitor pricing from example.com"

"use postgres to show me all tables in my database"
```

### Launch Marketing Agent (THE MONEY-MAKER)
```
Launch marketing-strategist agent to:
- Create go-to-market strategy for my fitness app
- Write landing page copy that converts
- Analyze competitors and recommend pricing
- Design user acquisition funnel with $1000 budget
- Create 30-day content calendar for Twitter/X
```

### Build Feature with Parallel Agents
```
Launch feature-builder + test-generator + marketing-strategist in parallel to:
- Build user authentication feature
- Generate comprehensive tests
- Plan launch strategy for new feature
```

## 📚 Documentation

- [**RAPIDS Method**](./.claude/RAPIDS_METHOD.md) - Complete methodology
- [**Development Guide**](./.claude/DEVELOPMENT_GUIDE.md) - Usage guide
- [**Sub-Agents Guide**](./.claude/SUBAGENTS_GUIDE.md) - Agent details
- [**Stack Config**](./.claude/STACK_CONFIG.json) - Stack requirements

## 🔧 Maintenance

```bash
# Backup customizations before upgrading
./scripts/rapids-backup.sh

# Upgrade to new version
./scripts/rapids-upgrade.sh rapids-new.zip

# Restore from backup
./scripts/rapids-restore.sh

# Verify installation
./scripts/check-setup.sh
```

## 📊 Productivity Gains

- **Feature Development**: 3-5 days → 4-8 hours (85% faster)
- **Bug Fixing**: 2-4 hours → 15-30 minutes (90% faster)
- **Test Writing**: Manual → Auto-generated
- **Deployment**: 30 minutes → 5 minutes (83% faster)
- **Overall**: ~10x productivity multiplier

## 🎯 Philosophy

- **Global-First**: Install once, use everywhere. No per-project setup.
- **Revenue-Focused**: Marketing agent ensures you actually make money.
- **Cutting-Edge**: Uses latest Claude Code features (MCPs, sub-agents, parallel execution).
- **Minimalistic**: Only essential files, no bloat.
- **Stack-First**: Optimized for Flutter + Next.js + FastAPI + PostgreSQL + DocPloy.
- **Parallel-Ready**: Run 3 agents simultaneously for 10x productivity.
- **Docker-First**: Always includes Dockerfiles for production deployment.

## 📄 License

MIT License - Use freely in your projects.

## 🙏 Credits

Built for solo developers deploying on DocPloy with:
- Anthropic Claude Code
- Claude Sonnet 4.5
- Your determination to ship fast

---

**Version**: 2.0 (Global Installation + Marketing Agent + MCPs)
**Stack**: Flutter • Next.js 15 • FastAPI • PostgreSQL • DocPloy
**MCPs**: Context7 • Filesystem • PostgreSQL • GitHub • Puppeteer

🌊 **Install once. Ship fast. Make money.** 🚀
