# Critical Code Paths

## Purpose
This document identifies complex, fragile, or performance-critical code sections that require careful handling during modifications.

## CLI Installation Flow

### File: `cli/install.tsx`
**Criticality:** HIGH - Runs on every global install

**Critical Sections:**

#### 1. Platform Detection (Lines ~50-80)
```typescript
const platform = process.platform;
const configDir = platform === 'darwin'
  ? path.join(os.homedir(), 'Library', 'Application Support', 'Claude')
  : path.join(os.homedir(), '.config', 'claude');
```

**Why Critical:**
- Determines installation location
- Different behavior per OS
- Failure breaks entire installation

**When Modifying:**
- Test on all supported platforms
- Verify symlink `~/.claude/` is created
- Check permissions on config directory

#### 2. File Copying Loop (Lines ~100-150)
```typescript
const sourceDir = path.join(__dirname, '..', '.claude');
await fs.copy(sourceDir, configDir, { overwrite: false });
```

**Why Critical:**
- Preserves user customizations (`overwrite: false`)
- Must not corrupt existing configs
- Symlink creation can fail on Windows

**When Modifying:**
- Always preserve user files
- Test with existing configs present
- Handle permission errors gracefully

#### 3. MCP Config Merge (Lines ~180-220)
```typescript
const existingConfig = await readMcpConfig();
const newConfig = mergeMcpServers(existingConfig, defaultConfig);
await writeMcpConfig(newConfig);
```

**Why Critical:**
- Must merge, not overwrite user's MCP servers
- JSON parsing can fail on corrupted files
- User may have custom MCP servers

**When Modifying:**
- Test with existing MCP configs
- Handle invalid JSON gracefully
- Preserve user-added servers

## Build System

### File: `scripts/build.js`
**Criticality:** HIGH - Required before publishing

**Critical Sections:**

#### esbuild Configuration (Lines ~10-40)
```javascript
await esbuild.build({
  entryPoints: ['cli/install.tsx', 'cli/init.tsx', 'cli/update.tsx'],
  bundle: true,
  platform: 'node',
  format: 'esm',
  external: ['ink', 'react', ...],
  outdir: 'dist'
});
```

**Why Critical:**
- Incorrect `external` causes bloated bundles
- Missing entry point breaks CLI
- Wrong format breaks execution

**When Modifying:**
- Always test built output: `node dist/install.js`
- Check bundle sizes (should be <50KB each)
- Verify all dependencies in `external` are in package.json dependencies

## Agent Execution

### File: `.claude/config.json`
**Criticality:** HIGH - Controls agent behavior

**Critical Sections:**

#### Parallel Execution Rules (Lines ~20-80)
```json
{
  "parallel_execution_use_cases": [
    {
      "use_case": "Implement a feature across mobile and web",
      "agents": ["feature-builder", "design-master"]
    }
  ]
}
```

**Why Critical:**
- Wrong combinations cause conflicts
- Agents may modify same files
- Database schema changes need serialization

**When Modifying:**
- Never parallelize agents working on same file
- DB migrations must be sequential
- Test with actual multi-agent scenarios

#### Agent Tool Access
```json
{
  "agents": {
    "deployment-manager": {
      "tools": ["Bash", "Edit", "Read", "Write", "WebFetch"]
    }
  }
}
```

**Why Critical:**
- Wrong tools break agent functionality
- Security risk if agent has unnecessary access
- Missing tools cause execution failures

**When Modifying:**
- Verify agent needs each tool
- Test agent with minimal tool set first
- Document why each tool is required

## Context Optimization

### File: `.agent/readme.md`
**Criticality:** MEDIUM - Guides AI context loading

**Critical Sections:**

#### Document Priority (Lines ~80-100)
```markdown
1. High Priority (Always Read):
   - Current task plan
   - Relevant system architecture section
```

**Why Critical:**
- Wrong priority wastes tokens
- Missing docs cause incomplete context
- Over-reading bloats context

**When Modifying:**
- Measure token usage before/after changes
- Validate with actual agent tasks
- Update when new doc types added

## Project Initialization

### File: `cli/init.tsx`
**Criticality:** MEDIUM - First project setup

**Critical Sections:**

#### Stack Selection Logic (Lines ~100-200)
```typescript
const stackMap = {
  'fullstack': ['mobile', 'web', 'backend'],
  'mobile': ['mobile'],
  'web+backend': ['web', 'backend'],
  'backend': ['backend']
};
```

**Why Critical:**
- Wrong stack creates invalid project
- Missing Dockerfiles break deployment
- Incorrect dependencies cause build failures

**When Modifying:**
- Test each stack preset
- Verify all required files are generated
- Check Docker builds work

#### .claude/ Directory Setup (Lines ~250-300)
```typescript
await fs.copy(
  path.join(__dirname, '..', 'templates', '.claude'),
  path.join(projectPath, '.claude')
);
```

**Why Critical:**
- Missing config breaks Claude Code integration
- Incorrect subagents-config breaks agents
- Wrong STACK_CONFIG causes deployment issues

**When Modifying:**
- Test project creation end-to-end
- Verify all config files present
- Check agents activate correctly

## Performance-Critical Operations

### Token Usage in Agents
**Impact:** High token costs, slow responses

**Critical Areas:**
1. Reading entire files when only metadata needed
2. Full codebase scans instead of targeted searches
3. Repetitive file reads in loops

**Optimization Rules:**
- Use Grep/Glob before Read
- Read `.agent/` docs instead of code
- Cache file contents in conversation
- Use sub-agents for research tasks

### MCP Server Initialization
**Impact:** Slow startup, connection failures

**Critical Areas:**
1. Database connections (postgres MCP)
2. GitHub API rate limits
3. Filesystem permission checks

**Optimization Rules:**
- Lazy-load MCP servers (only when used)
- Cache GitHub API responses
- Use connection pooling for databases

## Deployment Critical Paths

### Dockerfile Multi-Stage Builds
**Impact:** Failed deployments, large images

**Critical Sections:**
```dockerfile
# Stage 1: Dependencies
FROM node:20-alpine AS deps
COPY package*.json ./
RUN npm ci --only=production

# Stage 2: Build
FROM node:20-alpine AS builder
COPY --from=deps /app/node_modules ./node_modules
RUN npm run build

# Stage 3: Runner
FROM node:20-alpine AS runner
COPY --from=builder /app/.next/standalone ./
```

**Why Critical:**
- Wrong stage order increases image size
- Missing files break runtime
- Incorrect COPY breaks build

**When Modifying:**
- Test Docker build locally first
- Verify image size (<200MB for Next.js)
- Check runtime dependencies included

## Error-Prone Operations

### 1. Git Hooks (.claude/config.json)
```json
{
  "user_prompt_submit_hook": "npm run lint"
}
```
**Risk:** Blocking user input if hook fails
**Mitigation:** Always exit 0 or handle errors

### 2. Database Migrations
**Risk:** Data loss, schema corruption
**Mitigation:** Always test on branch first, write reversible migrations

### 3. MCP Server Environment Variables
**Risk:** Missing credentials break functionality
**Mitigation:** Validate env vars on startup, show clear errors

## Testing Critical Paths

### Before Every Release:
1. ✅ Run `npm run build` successfully
2. ✅ Test `npm pack` and local install
3. ✅ Test `rapids` command (install flow)
4. ✅ Test `rapids init` with all stack presets
5. ✅ Verify agents activate correctly
6. ✅ Check Docker builds work
7. ✅ Test on clean macOS system

## Recovery Procedures

### Corrupted Installation
```bash
# Remove global install
npm uninstall -g rapids-ai

# Clean config
rm -rf ~/.claude

# Reinstall
npm install -g rapids-ai
```

### Failed Build
```bash
# Clean dist
rm -rf dist

# Rebuild
node scripts/build.js

# Test output
node dist/install.js --help
```

### MCP Config Issues
```bash
# Backup user config
cp ~/.claude/mcp-config.json ~/.claude/mcp-config.backup.json

# Reset to default
rapids update  # Re-runs installation with defaults
```

## Related Files
- `.agent/system/architecture-overview.md` - System design
- `.agent/sop/` - Operating procedures for common issues
