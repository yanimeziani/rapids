# RAPIDS Quick Start - Ship Fast, Make Money

## 🚀 Installation (Already Done ✅)
```bash
npm install -g rapids-ai
```

## 🔄 Migrating Existing Project
```bash
cd your-existing-project
rapids-migrate    # Non-destructive migration
rapids-clean      # Clean up old files (optional but recommended)
```

## ⚡️ Usage

### 1. **Activate RAPIDS Output Style**
```bash
/output-style rapids-speed    # Maximum velocity, minimal tokens
/output-style ship-mode       # Revenue-first decision making
```

### 2. **Use Subagents (Token Efficient)**

#### Build Full-Stack Feature:
```bash
/agent feature-builder "Build user authentication with Google OAuth"
```

#### Fix Bugs:
```bash
/agent bug-hunter "Debug payment processing timeout error"
```

#### Search Code (Auto-activates):
```bash
"Find all database queries using raw SQL"
```

#### Generate Tests:
```bash
/agent test-generator "Create tests for user authentication flow"
```

#### Marketing & Revenue:
```bash
/agent marketing-strategist "Create GTM strategy for premium tier launch"
```

### 3. **Parallel Execution** (3x Faster)
```bash
# Build feature + tests + marketing simultaneously
/agent feature-builder "Build feature X" &
/agent test-generator "Test feature X" &
/agent marketing-strategist "GTM for feature X"
```

### 4. **CI/CD Automation**

#### GitHub Actions (Already configured in .github/workflows/):
- Comment `@claude fix this` on issues → Auto-fix
- Open PR → Auto-test + security scan
- Merge to main → Auto-deploy
- Label issue `revenue` → Marketing analysis

#### Setup:
1. Add `ANTHROPIC_API_KEY` to GitHub Secrets
2. Install Claude GitHub App
3. Done! Actions run automatically

### 5. **Hooks (Automation)**
Already configured in `~/.config/claude/config.json`:
- `user-prompt-submit`: Shows RAPIDS startup
- `tool-use-start`: Shows tool being used
- `session-start`: Reminder to ship fast

### 6. **Token Optimization Tips**

✅ **DO**:
- Use subagents for complex tasks (separate context)
- Run parallel operations when independent
- Use `Grep` with `head_limit` to reduce output
- Use `/compact` when context gets large (>150K tokens)
- Read files with `offset`/`limit` for large files

❌ **DON'T**:
- Read entire directories without filtering
- Use main context for isolated searches
- Repeat file reads unnecessarily
- Skip `.claudeignore` configuration

---

## 🎯 Workflows

### Migrate Existing Project:
```bash
1. cd your-project
2. rapids-migrate
   → Analyzes stack, creates .claude/ config, backs up existing config
3. rapids-clean
   → Removes legacy files: .env.local, build cache, old scripts, CI/CD configs
4. /output-style ship-mode
   → Activate revenue-first mode
5. /update-doc system
   → Initialize .agent/ documentation
```

### Ship New Feature (< 2 hours):
```bash
1. /output-style ship-mode
2. /agent marketing-strategist "Validate revenue potential for [feature]"
   → Get business justification first
3. /agent feature-builder "Build [feature] across mobile, web, backend"
   → Implement if revenue-positive
4. /agent test-generator "Generate tests for [feature]"
   → Quality assurance
5. /agent deployment-manager "Deploy to staging"
   → Ship it
6. /agent marketing-strategist "Create launch assets for [feature]"
   → Drive adoption
```

### Debug & Fix (< 30 min):
```bash
1. /output-style rapids-speed
2. /agent bug-hunter "Debug [error message]"
   → Analyzes logs, finds root cause, implements fix
3. /agent test-generator "Add regression test for [bug]"
   → Prevent recurrence
4. git commit && git push
```

### Marketing Campaign (< 1 hour):
```bash
1. /output-style ship-mode
2. /agent marketing-strategist "Create complete marketing campaign for [product]"
   → Landing page copy, email sequence, ad copy, social content
3. /agent feature-builder "Implement analytics tracking for campaign"
   → Measure results
4. /agent deployment-manager "Deploy marketing updates"
```

### Performance Optimization:
```bash
1. /agent performance-analyzer "Analyze and optimize [component/service]"
   → Identifies bottlenecks, suggests fixes
2. /agent refactor-master "Implement performance improvements"
3. /agent test-generator "Add performance benchmarks"
```

---

## 🏆 Best Practices

### Agent Selection:
- **feature-builder**: New features (mobile + web + backend)
- **bug-hunter**: Debugging anything
- **code-searcher**: Find implementations (auto-activates)
- **test-generator**: After building features
- **refactor-master**: Tech debt cleanup
- **performance-analyzer**: Speed issues
- **db-architect**: Database changes
- **security-scanner**: Pre-production scans
- **deployment-manager**: Staging/prod deploys
- **marketing-strategist**: Revenue, users, growth

### Token Efficiency:
- Main context: Quick edits, simple tasks
- Subagents: Complex, isolated tasks
- Parallel: Independent operations
- Compact: When context > 150K tokens

### Revenue Focus:
Every task should answer: **"Does this make money?"**
- ✅ User acquisition features
- ✅ Conversion optimization
- ✅ Retention improvements
- ✅ Revenue-generating capabilities
- ❌ Perfectionism without ROI
- ❌ Tech debt with no user impact

---

## 📊 Success Metrics

Track these to validate RAPIDS effectiveness:
- **Token usage per feature**: Target < 50K tokens
- **Time to ship**: Feature → production < 2 hours
- **Revenue impact**: Use marketing-strategist for validation
- **Build success rate**: First-time success > 80%
- **Subagent utilization**: > 60% of complex tasks

---

## 🔧 Configuration Locations

- **User config**: `~/.config/claude/config.json`
- **Agents**: `~/.config/claude/agents-config.json`
- **Output styles**: `~/.config/claude/output-styles/`
- **Project config**: `.claude/config.json` (override user settings)
- **Ignore files**: `.claudeignore`
- **GitHub Actions**: `.github/workflows/claude-ci.yml`

---

## 🚨 Troubleshooting

### Issue: Token usage too high
```bash
/compact                    # Reduce context
/output-style rapids-speed  # Minimize verbosity
# Use more subagents (isolated context)
```

### Issue: Slow responses
```bash
# Use parallel execution
/agent agent1 "task1" & /agent agent2 "task2"

# Or reduce context
/compact
```

### Issue: Agent not activating
```bash
# Check triggers in ~/.config/claude/agents-config.json
# Manually activate:
/agent <agent-name> "task description"
```

### Issue: CI/CD not working
1. Verify `ANTHROPIC_API_KEY` in GitHub Secrets
2. Install Claude GitHub App
3. Check workflow file in `.github/workflows/`

---

## 💡 Pro Tips

1. **Start every session with**:
   ```bash
   /output-style ship-mode
   ```
   → Sets revenue-first mindset

2. **Validate before building**:
   ```bash
   /agent marketing-strategist "Will users pay for [feature]?"
   ```
   → Don't build if answer is no

3. **Batch operations**:
   ```bash
   # Instead of sequential
   /agent feature-builder "feature" &
   /agent test-generator "tests" &
   /agent marketing-strategist "gtm"
   ```
   → Save time and tokens

4. **Use project-specific configs**:
   - Create `.claude/config.json` in each project
   - Override agents, hooks, settings per project
   - Team shares via git

5. **Track revenue metrics**:
   - MRR/ARR growth
   - CAC (Customer Acquisition Cost)
   - LTV (Lifetime Value)
   - Churn rate
   - Conversion rate
   → Marketing-strategist provides these

---

## 🎯 Remember

**RAPIDS Philosophy**:
1. Ship fast (velocity > perfection)
2. Make money (revenue > features)
3. Optimize tokens (efficiency > verbosity)
4. Automate everything (CI/CD > manual)
5. Measure results (data > assumptions)

**The only metric that matters: Revenue.**

🚀 **Now go build something that makes money.**
