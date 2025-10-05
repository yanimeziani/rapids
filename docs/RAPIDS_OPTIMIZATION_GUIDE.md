# RAPIDS Token Optimization Guide
**Making RAPIDS a beast for quick shipping without burning tokens**

## 🎯 Core Principles
1. **Lazy Loading**: Only read files when absolutely necessary
2. **Parallel Execution**: Run independent tasks concurrently
3. **Subagent Efficiency**: Use subagents for isolated, complex tasks
4. **Smart Context**: Minimize context pollution
5. **Hook Automation**: Automate repetitive tasks

---

## 🔥 Key Optimizations Applied

### 1. **Subagent Strategy** (Based on Claude Docs)
- ✅ **USE subagents for**: Complex searches, multi-file operations, isolated analysis
- ❌ **AVOID subagents for**: Simple edits, single-file reads, quick questions
- **Why**: Subagents have separate context windows, preserving main conversation tokens

### 2. **Parallel Execution** (Config Ready)
```json
{
  "parallelExecution": {
    "enabled": true,
    "maxConcurrent": 3
  }
}
```
- Build mobile + web + backend simultaneously
- Run tests across all platforms in parallel
- Marketing research + copywriting concurrently

### 3. **Hooks for Automation**
Current hooks in `config.json`:
```json
{
  "user-prompt-submit": "echo '🤖 Processing...'",
  "tool-use-start": "echo '🔧 Tool: $TOOL_NAME'"
}
```

**Recommended Additional Hooks:**
- `pre-tool-use`: Validate file operations before execution
- `post-tool-use`: Auto-format code after edits
- `session-start`: Load project context once
- `notification`: Track token usage

### 4. **Output Styles** (For Different Workflows)
Create custom styles in `~/.claude/output-styles/`:

**Rapids Mode** (Speed):
```markdown
Be extremely concise. No preamble, no explanations unless asked.
Use tools efficiently. Batch operations. Assume user knows the stack.
```

**Ship Mode** (Revenue Focus):
```markdown
Every response must consider: Does this make money?
Focus on features that drive revenue, user acquisition, retention.
Skip perfectionism. Ship fast, iterate based on user feedback.
```

### 5. **Smart Agent Configuration**

**Auto-Activate Agents** (Minimize token waste):
- `code-searcher`: Auto-activate on "find", "search", "where is"
- Others: Manual activation to prevent unnecessary context loading

**Context Files** (Minimal, Essential):
```json
{
  "feature-builder": {
    "context": [
      "docs/PRD.md",
      ".claude/prompts/mobile-feature.md",
      ".claude/prompts/backend-api.md",
      ".claude/prompts/web-page.md"
    ]
  }
}
```
- Only include files that provide reusable templates
- Avoid large documentation files
- Use `.claudeignore` aggressively

---

## 🚀 GitHub Actions Integration (CI/CD Automation)

**Setup**:
1. Install Claude GitHub App
2. Add `ANTHROPIC_API_KEY` to secrets
3. Copy workflow to `.github/workflows/claude.yml`

**Use Cases**:
- Auto-fix bugs when issues are created
- Generate tests for new features
- Run security scans on PRs
- Auto-deploy when PR is approved

**Config**:
```yaml
name: Claude Code
on:
  issue_comment:
    types: [created]
jobs:
  claude:
    runs-on: ubuntu-latest
    steps:
      - uses: anthropics/claude-code-action@v1
        with:
          anthropic_api_key: ${{ secrets.ANTHROPIC_API_KEY }}
```

---

## 💰 Token Saving Techniques

### 1. **Use .claudeignore Aggressively**
```
node_modules/
.git/
dist/
build/
*.log
*.lock
coverage/
.next/
.flutter-plugins*
```

### 2. **Compact Context Command**
When context gets bloated:
```
/compact
```

### 3. **Smart File Reading**
- Read with `offset` and `limit` for large files
- Use `Grep` with `head_limit` to reduce output
- Use `Glob` patterns instead of reading directories

### 4. **Batch Tool Calls**
Instead of:
```
Read file1.ts
Read file2.ts
Read file3.ts
```

Do:
```
Read file1.ts, Read file2.ts, Read file3.ts (parallel)
```

### 5. **Subagent Invocation**
For complex, isolated tasks:
```
/agent code-searcher "Find all API endpoints using authentication"
```
This keeps main context clean.

---

## 🎨 RAPIDS Configuration Recommendations

### Update `~/.config/claude/config.json`:

```json
{
  "hooks": {
    "user-prompt-submit": {
      "command": "echo '🚀 RAPIDS processing...'",
      "description": "RAPIDS startup message"
    },
    "tool-use-start": {
      "command": "echo '⚡️ $TOOL_NAME'",
      "description": "Tool indicator"
    },
    "session-start": {
      "command": "echo '💎 RAPIDS loaded. Ship fast, make money.'",
      "description": "Session reminder"
    }
  },
  "settings": {
    "defaultModel": "claude-sonnet-4-5",
    "autoSave": true,
    "contextWindow": "large",
    "compactOnThreshold": 150000
  },
  "agents": {
    "auto-activate": ["code-searcher"],
    "manual-activate": [
      "feature-builder",
      "bug-hunter",
      "test-generator",
      "refactor-master",
      "performance-analyzer",
      "db-architect",
      "security-scanner",
      "deployment-manager",
      "marketing-strategist"
    ]
  }
}
```

### Update `~/.config/claude/agents-config.json`:

**Key Changes**:
1. Set `code-searcher` to `autoActivate: true`
2. Minimize `context` arrays (only essential templates)
3. Add clear `triggers` for voice/text activation
4. Optimize agent instructions (concise, actionable)

---

## 📊 Token Budget Tracking

**Recommended Hook** (Add to config):
```json
{
  "notification": {
    "command": "if [[ \"$NOTIFICATION_TYPE\" == \"token_warning\" ]]; then echo '⚠️  Token usage high. Consider /compact'; fi",
    "description": "Token usage alerts"
  }
}
```

---

## 🏆 Best Practices

### When to Use Each Agent:
1. **feature-builder**: New features (mobile + web + backend)
2. **bug-hunter**: Debugging, error investigation
3. **code-searcher**: Finding implementations, patterns (AUTO)
4. **test-generator**: After building features
5. **refactor-master**: Tech debt cleanup
6. **performance-analyzer**: Speed/optimization issues
7. **db-architect**: Schema changes, migrations
8. **security-scanner**: Before production deploy
9. **deployment-manager**: Staging/prod releases
10. **marketing-strategist**: MOST IMPORTANT - Revenue, users, GTM

### Workflow Example (Token Efficient):
```
1. User: "Build user profile feature"
2. /agent feature-builder "Build user profile with mobile, web, backend"
   (Isolated context, runs independently)
3. /agent test-generator "Generate tests for user profile"
   (Separate context, parallel if possible)
4. /agent marketing-strategist "Create landing page copy for profiles"
   (Business value, concurrently)
5. Main context: Review outputs, commit, deploy
```

**Token Savings**: ~40-60% vs doing everything in main context

---

## 🔧 Troubleshooting (From Docs)

### Common Issues:
1. **Slow performance**:
   - Run `/compact`
   - Check token usage
   - Use subagents for heavy tasks

2. **Authentication errors**:
   - `/logout` and restart

3. **Search not working**:
   - Install `ripgrep` system package
   - Use `Grep` tool instead of bash grep

4. **WSL performance**:
   - Move projects to Linux filesystem
   - Configure Windows Firewall for JetBrains

---

## 📈 Success Metrics

Track these to validate optimization:
- ✅ **Token usage per task** (target: <50K for features)
- ✅ **Time to ship** (feature → production in <2 hours)
- ✅ **Revenue impact** (marketing-strategist activation rate)
- ✅ **Build success rate** (tests passing first time)
- ✅ **Subagent usage** (60%+ of complex tasks via subagents)

---

## 🎯 Next Steps

1. ✅ Install RAPIDS (`npx tsx cli/install.tsx`) - DONE
2. ✅ Review all Claude Code docs - DONE
3. ⏭️ Apply optimizations to config files
4. ⏭️ Create custom output styles
5. ⏭️ Set up GitHub Actions
6. ⏭️ Test parallel execution
7. ⏭️ Measure token savings

---

**Remember**: The goal isn't perfect code. It's **shipping fast and making money**. RAPIDS is optimized for velocity and revenue, not perfection.

🚀 **Ship it. Make money. Repeat.**
