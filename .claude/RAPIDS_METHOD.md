# 🌊 RAPIDS Method v3.0

**R**eusable **A**gent-**P**owered **I**ntelligence **D**evelopment **S**ystem

> **npm package** with beautiful Ink TUI for global Claude Code configuration

## 🎯 What is RAPIDS?

RAPIDS is an **npm package** that installs globally to transform **ALL your projects** into AI-assisted development powerhouses.

**What's New in v3.0:**
- 📦 **npm Package**: Install with one command: `npm install -g rapids-ai`
- 🧹 **Hyper-Simple**: Removed all bash scripts - pure npm/Node.js
- 🚀 **Auto-Install**: Runs automatically on `npm install -g`
- 🎨 **Beautiful TUI**: Powered by Ink (same as Claude Code, GitHub Copilot)
- ✨ **Zero Config**: Works immediately after installation

**What Changed in v2.0:**
- ✅ **Global Installation**: Install once, use everywhere
- ✅ **Marketing Strategist Agent**: THE revenue-focused agent (10th agent)
- ✅ **5 MCP Servers**: Context7, Filesystem, PostgreSQL, GitHub, Puppeteer
- ✅ **CLI Commands**: `rapids-init-project`, `rapids-update`
- ✅ **Cutting-Edge**: Uses latest Claude Code & Anthropic features

### The Stack (Your Standard)
- **Mobile**: Flutter (user-facing apps)
- **Web**: Next.js 15+ (landing pages, admin panels)
- **Backend**: Python + FastAPI
- **Database**: PostgreSQL
- **Auth**: Google Auth
- **Deployment**: DocPloy (self-hosted Docker PaaS)

## 🚀 What RAPIDS Gives You (Globally)

### 1. **10 Autonomous Sub-Agents**
Specialized AI agents that work in parallel (up to 3 concurrent):

**Development Agents (9):**
- Feature Builder, Bug Hunter, Code Searcher
- Test Generator, Refactor Master, Performance Analyzer
- DB Architect, Security Scanner, Deployment Manager

**💰 THE MOST CRITICAL AGENT:**
- **Marketing Strategist** - Revenue generation, user acquisition, GTM strategy, copywriting, pricing, growth hacking. Because **code without revenue is worthless**.

### 2. **5 MCP Servers** (Model Context Protocol - Cutting-Edge)
The "USB-C for AI" - globally available tools:
1. **Context7** 🔥 - Up-to-date docs for any library (auto-activated)
2. **Filesystem** - Local file access across all projects
3. **PostgreSQL** - Direct database querying
4. **GitHub** - Repository management
5. **Puppeteer** - Web automation for market research

### 3. **6 Slash Commands**
Instant productivity boosters:
- `/new-feature`, `/fix-bug`, `/refactor`
- `/test`, `/deploy`, `/market` (NEW!)

### 4. **3 Stack-Specific Templates**
Code generation templates for your stack:
- Flutter mobile features (with Riverpod)
- Next.js pages (App Router)
- FastAPI endpoints (with SQLAlchemy)

### 5. **Complete VSCode Integration**
Pre-configured development environment:
- Tasks, Debug configs, Extensions
- Snippets, Settings optimized for your stack

### 6. **Docker-First Deployment**
DocPloy-ready configuration:
- Multi-stage builds
- Health checks
- Parallel service orchestration

### 7. **Global CLI Commands**
Available after installation:
```bash
rapids-init-project <name>  # Create new project
rapids-update               # Update RAPIDS
```

## 📦 Installation (One Command!)

### npm Global Install (Recommended)

```bash
npm install -g rapids-ai
```

**That's it!** The package automatically:
- ✅ Detects your environment (macOS/Linux)
- ✅ Installs 10 AI agents globally
- ✅ Configures 5 MCP servers
- ✅ Creates CLI commands (`rapids`, `rapids-init`, `rapids-update`)
- ✅ Shows beautiful installation progress with Ink TUI

**What Gets Installed:**
- 10 sub-agents → `~/Library/Application Support/Claude/rapids/` (macOS)
- 5 MCP servers → Pre-configured and ready
- CLI commands → `rapids`, `rapids-init`, `rapids-update`
- Templates → Ready for any new project

### Create Projects

```bash
# Interactive project wizard
rapids-init

# Or check for updates
rapids-update
```

## 🎨 Customization

### 1. Update Stack Info
Edit `.claude/settings.local.json`:
```json
{
  "project": {
    "name": "YourProject",
    "website": "https://yourproject.com"
  },
  "stack": {
    "mobile": {
      "framework": "Flutter",
      "stateManagement": "Riverpod"  // or Bloc, Provider
    }
  }
}
```

### 2. Modify Templates
Templates are in `.claude/prompts/`:
- `mobile-feature.md` - Customize Flutter patterns
- `backend-api.md` - Customize FastAPI patterns
- `web-page.md` - Customize Next.js patterns

### 3. Add Custom Agents
Create `.claude/agents/your-agent.md` with your specifications.

### 4. Add Custom Commands
Create `.claude/commands/your-command.md`.

## 🔄 Upgrading RAPIDS

### Check Version
```bash
cat .claude/RAPIDS_METHOD.md | grep "v[0-9]"
```

### Upgrade Process
```bash
# 1. Backup your customizations
./scripts/rapids-backup.sh

# 2. Download new version
curl -L https://your-repo/rapids-v2.0.zip -o rapids-new.zip

# 3. Merge updates
./scripts/rapids-upgrade.sh rapids-new.zip

# 4. Review changes
git diff .claude/
```

### Version Compatibility

| RAPIDS Version | Claude Code | Anthropic Model | Features | Status |
|----------------|-------------|-----------------|----------|--------|
| **v3.0** | Latest | Sonnet 4.5 | **npm package** + Ink TUI + 10 agents | ✅ **Current** |
| v2.1 | Latest | Sonnet 4.5 | Ink TUI + Global + Marketing | ⚠️ Legacy |
| v2.0 | Latest | Sonnet 4.5 | Global install + Marketing | ⚠️ Legacy |

## 🏗️ Architecture

```
.claude/
├── RAPIDS_METHOD.md          # This file
├── config.json               # Core config
├── agents-config.json        # Sub-agents definitions
├── settings.local.json       # Your stack config
├── STACK_CONFIG.json         # Stack requirements & Docker specs
├── commands/                 # Slash commands
│   ├── new-feature.md
│   ├── fix-bug.md
│   └── ...
├── agents/                   # Agent documentation
│   ├── code-reviewer.md
│   └── ...
├── prompts/                  # Stack templates
│   ├── mobile-feature.md    # Flutter + Riverpod
│   ├── backend-api.md       # FastAPI + SQLAlchemy
│   └── web-page.md          # Next.js 15
└── DEVELOPMENT_GUIDE.md     # Full guide

.vscode/
├── settings.json            # Stack-optimized settings
├── extensions.json          # Recommended extensions
├── tasks.json              # Build/deploy tasks
└── launch.json             # Debug configs

scripts/
├── rapids-init.sh          # First-time setup
├── rapids-backup.sh        # Backup customizations
├── rapids-upgrade.sh       # Upgrade to new version
└── check-setup.sh          # Verify installation

web/
└── Dockerfile              # Next.js multi-stage build for DocPloy

backend/
└── Dockerfile              # FastAPI with health checks for DocPloy

docker-compose.yml          # Local development orchestration
```

## 🎯 Core Principles

### 1. **Stack-First Design**
Every template, agent, and command is optimized for:
- Flutter mobile development
- Next.js web applications
- FastAPI backends
- PostgreSQL databases
- DocPloy deployment

### 2. **Parallel Execution**
Sub-agents run in parallel for maximum productivity:
```
Launch 3 agents in parallel:
- Backend API creation
- Mobile UI development
- Web admin panel
```

### 3. **Zero-Config Philosophy**
Works out of the box with sensible defaults.
Customize only what you need.

### 4. **Upgrade-Safe**
Your customizations are preserved during upgrades.

## 📊 Benefits

### Before RAPIDS
```
⏱️  Feature development: 3-5 days
🐛 Bug fixing: 2-4 hours
🧪 Test writing: Manual, inconsistent
🚀 Deployment: Manual, error-prone
```

### After RAPIDS
```
⚡ Feature development: 4-8 hours (with agents)
🎯 Bug fixing: 15-30 minutes (agent-assisted)
✅ Test writing: Auto-generated, comprehensive
🚢 Deployment: 1-click to DocPloy
```

**Productivity Multiplier: ~10x**

## 🔧 Stack-Specific Features

### Flutter Mobile
- Riverpod state management templates
- Go Router navigation patterns
- Material Design 3 components
- Platform-specific optimizations
- Google Auth integration

### Next.js Web
- App Router (Next.js 15+)
- Server/Client component patterns
- API routes with type safety
- Optimized builds (standalone)
- Google Auth (NextAuth)

### FastAPI Backend
- Async/await patterns
- SQLAlchemy 2.0 ORM
- Pydantic v2 validation
- Alembic migrations
- Google OAuth integration

### PostgreSQL
- Migration templates
- Index optimization
- Query analysis
- Backup strategies

### DocPloy Deployment
- Multi-stage Docker builds (always included)
- Health check patterns (backend)
- Volume management (PostgreSQL data)
- Service orchestration (docker-compose.yml)
- **REQUIRED**: Dockerfiles for web and backend
- Standalone Next.js builds optimized for Docker
- Python slim images for smaller containers

## 🌟 Example Workflows

### New Feature Development
```bash
# 1. Create feature with sub-agent
Launch feature-builder agent to create user notifications:
- Backend: notifications table, FCM integration
- Mobile: Notifications screen with permissions
- Web: Admin panel to send notifications
- Deploy to DocPloy staging

# Agent builds everything in parallel, you review and deploy
```

### Bug Fixing
```bash
# 1. Describe bug to agent
Launch bug-hunter agent to fix:
Error: PostgreSQL connection pool exhausted in production
Occurs during high traffic on DocPloy

# Agent finds issue, implements fix, deploys
```

### Performance Optimization
```bash
# 1. Request analysis
Launch performance-analyzer agent:
- Mobile: Optimize flow list loading
- Backend: Reduce API response time
- Database: Query optimization

# Agent analyzes full stack, implements fixes
```

## 📚 Learning Path

### Day 1: Setup & Basics
- Install RAPIDS
- Try simple commands
- Explore one agent

### Week 1: Agent Mastery
- Use all 9 agents
- Parallel execution
- Custom templates

### Month 1: Full Productivity
- Custom agents
- Automated workflows
- 10x development speed

## 🆘 Troubleshooting

### Agent Not Working
```bash
# Check configuration
./scripts/check-setup.sh

# Verify Claude Code version
claude --version
```

### Customizations Lost After Upgrade
```bash
# Restore from backup
./scripts/rapids-restore.sh
```

### Stack Mismatch
Edit `.claude/settings.local.json` to match your stack.

## 🎓 Best Practices

### 1. Use Agents for Complex Tasks
```
✅ Launch feature-builder for new modules
✅ Use bug-hunter for multi-file issues
❌ Don't use agents for single-line edits
```

### 2. Leverage Parallel Execution
```
✅ Build mobile + web + backend simultaneously
✅ Run tests across all platforms
❌ Don't run agents sequentially when they could be parallel
```

### 3. Customize Templates
Update templates to match your coding style and patterns.

### 4. Keep RAPIDS Updated
Check for updates monthly.

## 🔐 Security

### Secrets Management
RAPIDS includes `.claudeignore` to exclude:
- `.env` files
- Secrets
- Credentials
- API keys

### Pre-deployment Checks
Security scanner agent checks:
- Hardcoded secrets
- SQL injection vulnerabilities
- XSS vulnerabilities
- Outdated dependencies

## 🚢 DocPloy Integration

### Deployment Workflow
```bash
# 1. Build and test
./scripts/rapids-deploy.sh staging

# 2. Agent handles:
- Docker builds
- Health checks
- Database migrations
- Service deployment

# 3. Verify on DocPloy dashboard
```

### Rollback
```bash
Launch deployment-manager agent to rollback production to previous version
```

## 📈 Metrics & Analytics

Track your productivity:
```bash
# Features built this month
git log --since="1 month ago" --grep="feat:" --oneline | wc -l

# Bugs fixed
git log --since="1 month ago" --grep="fix:" --oneline | wc -l

# Agent-assisted commits
git log --since="1 month ago" --grep="Co-authored-by: Claude" | wc -l
```

## 🌍 Community

### Share Your RAPIDS Setup
- Fork and customize
- Share improvements
- Contribute back

### Get Help
- GitHub Issues
- Discord community
- Documentation wiki

## 📄 License

MIT License - Use freely in your projects.

## 🙏 Credits

Created for solo developers who want to move fast without breaking things.

Powered by:
- Anthropic Claude Code
- Claude Sonnet 4.5
- Your determination to build great products

---

**Version**: 1.0
**Last Updated**: January 2025
**Next Update**: Check for v1.1 in March 2025

**🌊 Ride the RAPIDS to 10x productivity! 🚀**
