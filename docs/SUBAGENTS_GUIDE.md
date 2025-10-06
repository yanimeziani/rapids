# 🤖 RAPIDS Sub-Agents Guide

Complete guide to using **true sub-agents** in Claude Code for ultra-efficient development.

## 🎯 What is a Sub-Agent?

A sub-agent is an **autonomous Claude instance** that can execute complex multi-step tasks **in parallel** while you continue working.

### Key Difference
```
❌ Documentation (.claude/agents/*.md)
   → Just style guides
   → No automatic execution
   → Requires copy-paste

✅ True Sub-Agents (Task tool)
   → Autonomous execution
   → Parallel work
   → Automatic returns
```

## 🚀 Available Sub-Agents in RAPIDS

### 1. **Feature Builder** 🏗️
Builds complete features (mobile + web + backend).

**Usage:**
```
Launch feature-builder agent to create user authentication:
- Google Sign-In
- JWT backend
- Mobile UI with token storage
- Web session management
```

**What it does:**
1. Creates backend endpoints
2. Creates Flutter mobile UI
3. Creates Next.js web pages
4. Generates all tests
5. Updates documentation

**When to use:**
- Complete multi-layer features
- Complex integrations
- New full modules

---

### 2. **Bug Hunter** 🔍
Finds and fixes bugs throughout the codebase.

**Usage:**
```
Launch bug-hunter agent to fix:
Error: Backend returns 500 on POST /api/v1/flows
Stack trace: [paste trace here]
```

**What it does:**
1. Searches for error patterns (Grep)
2. Finds related files (Glob)
3. Reads relevant code
4. Identifies root cause
5. Implements fix
6. Adds regression tests

**When to use:**
- Complex multi-file bugs
- Intermittent errors
- Performance issues

---

### 3. **Code Searcher** 🔎
Searches and analyzes code (AUTO-ACTIVATED).

**Usage:**
```
Find all places where we handle workout session state
Show me how authentication works
Where is the flow state machine implemented?
```

**What it does:**
- Intensive Grep for patterns
- Glob for files
- Dependency analysis
- Relationship mapping

**When to use:**
- Exploring unfamiliar code
- Tracing implementations
- Understanding architecture

---

### 4. **Test Generator** 🧪
Generates comprehensive tests.

**Usage:**
```
Launch test-generator agent for features/workout module:
- Flutter widget tests
- Next.js component tests
- FastAPI endpoint tests
- E2E flow tests
```

**What it does:**
1. Analyzes code to test
2. Generates test cases
3. Creates test files
4. Runs tests
5. Coverage report

**When to use:**
- New features without tests
- Improving coverage
- Regression tests

---

### 5. **Refactor Master** ♻️
Intelligent and safe refactoring.

**Usage:**
```
Launch refactor-master agent on mobile/lib/features/flows/:
Strategy: Extract reusable widgets and simplify complexity
```

**What it does:**
1. Understands current code
2. Identifies opportunities
3. Plans steps
4. Applies changes
5. Tests after each step

**When to use:**
- Significant code smells
- Excessive duplication
- High complexity

---

### 6. **Performance Analyzer** ⚡
Performance optimization.

**Usage:**
```
Launch performance-analyzer agent on flows screen:
Issue: Loading 100+ flows causes lag and freezes
Analyze mobile + backend performance
```

**What it does:**
1. Profiles the app
2. Identifies bottlenecks
3. Proposes solutions
4. Implements optimizations
5. Measures improvements

**When to use:**
- Noticeable slowness
- Memory spikes
- Slow database queries

---

### 7. **DB Architect** 🗄️
Schema and migration management.

**Usage:**
```
Launch db-architect agent to:
Add workout_analytics table with user_id, flow_id, metrics JSONB, created_at
Generate migration with rollback
```

**What it does:**
1. Analyzes current schema
2. Designs new changes
3. Creates Alembic migration
4. Rollback script
5. Local testing

**When to use:**
- Schema changes
- New tables
- Complex modifications

---

### 8. **Security Scanner** 🔐
Complete security audit.

**Usage:**
```
Launch security-scanner agent for full audit:
- Check authentication flow
- Scan dependencies
- Verify input validation
- Review API security
```

**What it does:**
1. Scans auth/authorization
2. Checks input validation
3. Verifies data protection
4. Analyzes dependencies
5. Report with severity

**When to use:**
- Before production release
- After auth refactoring
- Periodic audits

---

### 9. **Deployment Manager** 🚀
Deployment management.

**Usage:**
```
Launch deployment-manager agent to deploy to staging:
- Run all pre-checks
- Build and push images
- Deploy to Dokploy
- Verify health
```

**What it does:**
1. Pre-deployment checks
2. Builds Docker images
3. Tags versions
4. Deploys to Dokploy
5. Health checks
6. Monitoring

**When to use:**
- Staging/prod deployments
- Important releases
- Rollback needed

---

### 10. **Marketing Strategist** 💰
THE MOST CRITICAL AGENT: Revenue generation, user acquisition, GTM strategy.

**Usage:**
```
Launch marketing-strategist agent to:
- Validate market for feature X
- Create landing page copy
- Design user acquisition funnel
- Plan product launch campaign
```

**What it does:**
1. Market research and competitor analysis
2. Pricing and monetization strategy
3. Copywriting (landing pages, emails, ads)
4. User acquisition channels
5. Growth hacking tactics
6. Revenue forecasting

**When to use:**
- Before building features (validate revenue potential)
- Launching new products
- Optimizing conversion
- Scaling user acquisition
- Any revenue-related decision

---

### 11. **Design Master** 🎨
Material Design 3 expert for UNIQUE, CUSTOM designs.

**Usage:**
```
Launch design-master agent to:
- Create UNIQUE Material Design 3 color scheme with custom personality
- Design distinctive navigation with signature interactions
- Generate creative layouts that stand out while staying accessible
```

**What it does:**
1. Creates custom Material Design 3 themes
2. Designs unique brand experiences (NOT generic templates)
3. Ensures WCAG accessibility compliance
4. Provides responsive layouts for all devices
5. Generates implementation-ready code

**When to use:**
- Creating distinctive brand identity
- Designing new features with unique UI
- Accessibility audits
- Responsive design implementation

---

## 🔥 Parallel Execution

One of the **major strengths** of sub-agents: **parallelism**.

### Example 1: Create Complete Feature
```
Launch 3 agents in parallel to create workout timer feature:

Agent 1 (backend): Create API endpoints for timer sessions
Agent 2 (mobile): Create Flutter timer UI with Riverpod
Agent 3 (web): Create Next.js timer display page

Run them simultaneously and report back when all done.
```

### Example 2: Multi-Platform Tests
```
Run tests in parallel across all platforms:

Agent 1: Flutter tests
Agent 2: Next.js tests
Agent 3: FastAPI tests

Report combined results.
```

### Example 3: Full Stack Performance
```
Analyze performance in parallel:

Agent 1: Mobile app profiling
Agent 2: Web bundle analysis
Agent 3: Backend query optimization

Provide unified performance report.
```

### Example 4: Design + Build + Market
```
Launch design-master + feature-builder + marketing-strategist in parallel:

Agent 1 (design): Create UNIQUE UI/UX for feature
Agent 2 (build): Implement the feature
Agent 3 (market): Plan launch campaign and copy

Deliver complete product ready to ship.
```

## 📋 When to Use Sub-Agents

### ✅ ALWAYS use for:
- Features touching mobile + web + backend
- Complex multi-file searches
- Refactoring >5 files
- Comprehensive feature tests
- Performance analysis
- Security audits
- Complex database migrations
- Market research and GTM planning
- Custom design systems

### ❌ DO NOT use for:
- Simple single-file edits
- Quick questions
- Reading documentation
- Trivial changes

## 💡 Usage Patterns

### Pattern 1: Feature Development
```
Step 1: Launch marketing-strategist to validate revenue potential
Step 2: Launch design-master + feature-builder in parallel (design + implement)
Step 3: Once built, launch test-generator
Step 4: Finally, launch deployment-manager for staging
```

### Pattern 2: Bug Investigation
```
Step 1: Launch bug-hunter with error details
Step 2: In parallel, launch code-searcher to find related code
Step 3: After fix, launch test-generator for regression tests
```

### Pattern 3: Refactoring
```
Step 1: Launch performance-analyzer to identify issues
Step 2: Launch refactor-master with strategy
Step 3: Launch test-generator to ensure no breaks
```

### Pattern 4: Product Launch
```
Step 1: Launch marketing-strategist for market validation
Step 2: Launch design-master for UNIQUE brand identity
Step 3: Launch feature-builder to implement validated feature
Step 4: Launch marketing-strategist for launch campaign assets
Step 5: Launch deployment-manager to ship
```

## 🎯 Best Practices

### 1. Be Precise
```
❌ "Fix the bug"
✅ "Launch bug-hunter agent to fix: Database connection timeout in backend/app/main.py line 15"
```

### 2. Provide Context
```
✅ "Launch feature-builder with context:
   - Similar to existing flows feature
   - Uses same DB structure
   - Follow PRD section 2.3"
```

### 3. Use Parallelism
```
✅ "Launch 3 agents in parallel:
   Agent 1: Build backend API
   Agent 2: Build mobile UI
   Agent 3: Design landing page for feature
   All for user profile feature"
```

### 4. Validate Results
Always verify what agents did:
```
Show me what the feature-builder agent created
Run tests to verify bug-hunter agent's fix
Review the design-master's color scheme
```

## 🔧 Configuration

Sub-agents are configured in:
- `.claude/subagents-config.json` - Main configuration
- Auto-detection based on your phrases

### Auto Triggers
Some agents activate automatically:
- **code-searcher**: "find", "search", "where is"
- **bug-hunter**: "error", "bug", "fix"
- **feature-builder**: "create feature", "implement"
- **marketing-strategist**: "revenue", "users", "GTM"

## 📊 Monitoring

### View Active Agents
```
Show active sub-agents
List running agents and their progress
```

### Agent Logs
```
Show logs from feature-builder agent
Get progress report from deployment-manager
```

## 🚨 Troubleshooting

### Agent Not Responding
```
Check status of bug-hunter agent
Cancel and restart deployment-manager
```

### Unexpected Results
```
Explain what the refactor-master agent changed
Review test-generator agent's test cases
```

## 🎓 Learning Path

### Start Simple
```
# Day 1: Single agent
Launch code-searcher to find all API endpoints

# Day 2: Complex agent
Launch feature-builder for simple settings page

# Day 3: Parallelism
Launch mobile + backend agents in parallel for new feature
```

### Progressive Examples

#### Level 1: Search
```
Find all files handling user authentication
```

#### Level 2: Simple Feature
```
Launch feature-builder to add user preferences table and API
```

#### Level 3: Complete Feature
```
Launch 3 agents in parallel to build workout analytics:
- Backend: Analytics API + DB schema
- Mobile: Charts with fl_chart
- Web: Dashboard with Recharts
```

#### Level 4: Full Workflow
```
1. Launch marketing-strategist to validate revenue potential
2. Launch design-master for UNIQUE design system
3. Launch feature-builder for implementation
4. Launch test-generator after build
5. Launch security-scanner before deploy
6. Launch deployment-manager to staging
7. Launch marketing-strategist for launch assets
```

---

## 🎉 Conclusion

Sub-agents transform your solo development into a **virtual team**:

- 🏗️ **Feature Builder** = Full-stack developer
- 🔍 **Bug Hunter** = Expert debugger
- 🧪 **Test Generator** = QA engineer
- ⚡ **Performance Analyzer** = Optimization specialist
- 🔐 **Security Scanner** = Security expert
- 🚀 **Deployment Manager** = DevOps engineer
- 💰 **Marketing Strategist** = Growth/marketing lead
- 🎨 **Design Master** = Brand designer/UX expert
- 🗄️ **DB Architect** = Database specialist
- ♻️ **Refactor Master** = Code quality engineer
- 🔎 **Code Searcher** = Research analyst

**Use them massively to 10x your productivity!** 🚀
