# Update Documentation

You are running the `/update-doc` command to maintain the `.agent/` documentation system for context optimization.

## Available Sub-Commands

### `/update-doc initialize`
**Purpose:** Set up the `.agent/` folder structure and create initial documentation files.

**Actions:**
1. Create `.agent/` directory with subfolders: `task/`, `system/`, `sop/`, `task/archive/`
2. Create `.agent/readme.md` as documentation index
3. Create system documentation templates:
   - `architecture-overview.md`
   - `database-schema.md`
   - `api-endpoints.md`
   - `critical-paths.md`
   - `stack-decisions.md`
4. Create task template: `template-feature-plan.md`
5. Create SOP template: `template-sop.md`
6. Update `.agent/readme.md` with document index

**When to use:** First time setting up `.agent/` system in a project, or after accidental deletion.

---

### `/update-doc system`
**Purpose:** Review codebase and update architecture, database, and API documentation.

**Actions:**
1. Scan project structure for architecture changes
2. Review database migrations and update `database-schema.md`
3. Check API routes and update `api-endpoints.md`
4. Identify new critical code paths and update `critical-paths.md`
5. Update `.agent/readme.md` with last updated timestamp

**When to use:** After major feature implementation, architecture changes, or database migrations.

---

### `/update-doc sop <issue-description>`
**Purpose:** Create a new Standard Operating Procedure based on recent issue resolution.

**Actions:**
1. Take `<issue-description>` as input (e.g., "S3 integration setup")
2. Generate SOP document in `.agent/sop/` using template
3. Include step-by-step resolution procedure
4. Add troubleshooting section
5. Link related documentation
6. Update `.agent/readme.md` to reference new SOP

**When to use:** After fixing a complex issue, resolving integration problems, or discovering a reusable workflow.

**Example:**
```bash
/update-doc sop Neon database connection pooling
```

---

### `/update-doc index`
**Purpose:** Refresh the `.agent/readme.md` index with latest document list and summaries.

**Actions:**
1. Scan `.agent/task/`, `.agent/system/`, `.agent/sop/` directories
2. Count total documents per category
3. Extract document titles and summaries
4. Update "Current Documents" sections in `.agent/readme.md`
5. Update "Documentation Health" section
6. Update "Last Updated" timestamp

**When to use:** After adding/removing documentation files, or to audit documentation coverage.

---

### `/update-doc plan <feature-name>`
**Purpose:** Create a new feature implementation plan before starting development.

**Actions:**
1. Copy `.agent/task/template-feature-plan.md` to `.agent/task/<feature-name>-plan.md`
2. Fill in feature name and metadata
3. Prompt user to complete problem statement, requirements, and technical design
4. Save plan to task folder
5. Update `.agent/readme.md` to reference new plan

**When to use:** Before implementing any new feature to ensure structured approach.

**Example:**
```bash
/update-doc plan user-profile-picture-upload
```

---

### `/update-doc archive <task-plan-name>`
**Purpose:** Move completed task plan to archive folder.

**Actions:**
1. Move `.agent/task/<task-plan-name>-plan.md` to `.agent/task/archive/`
2. Update plan status to "Completed" with completion date
3. Remove from active tasks in `.agent/readme.md`
4. Update documentation health metrics

**When to use:** After completing a feature and all related updates.

**Example:**
```bash
/update-doc archive user-profile-picture-upload
```

---

## Workflow Integration

### Standard Development Workflow

```
1. Plan Feature
   ↓
   /update-doc plan <feature-name>
   ↓
2. Implement (read .agent/task/<feature-name>-plan.md for context)
   ↓
3. Update System Docs (if architecture changed)
   ↓
   /update-doc system
   ↓
4. Create SOP (if reusable patterns discovered)
   ↓
   /update-doc sop <issue-description>
   ↓
5. Archive Plan
   ↓
   /update-doc archive <feature-name>
   ↓
6. Refresh Index
   ↓
   /update-doc index
```

---

## Token Optimization Tips

### Before Implementation
1. Run `/update-doc plan <feature-name>` to create plan
2. Claude Code reads **only** the plan, not entire codebase
3. Plan references relevant `.agent/system/` docs for context
4. **Token savings: 60-80%** vs full codebase analysis

### During Implementation
1. Claude Code reads:
   - Active task plan (`.agent/task/<feature>-plan.md`)
   - Relevant system docs (`.agent/system/architecture-overview.md`, etc.)
   - Related SOPs (`.agent/sop/`)
2. Does **not** read:
   - Entire codebase
   - Irrelevant documentation
   - Archived plans

### After Implementation
1. Update system docs if needed: `/update-doc system`
2. Create SOP for reusable patterns: `/update-doc sop`
3. Archive completed plan: `/update-doc archive`
4. Clear conversation thread
5. Next feature starts with fresh, minimal context

---

## Sub-Agent Research Pattern

For token-heavy research tasks (e.g., analyzing database performance, evaluating libraries):

1. Use **research sub-agent** in separate thread
2. Sub-agent performs deep analysis, reads docs, compares options
3. Sub-agent returns **summary only** to main thread
4. Main thread uses summary to make decisions
5. **Token savings: 80%+** by isolating research

**When to use sub-agents:**
- Library evaluation (comparing 3+ options)
- Performance analysis (deep profiling)
- Architecture research (design patterns)
- Integration planning (complex third-party APIs)

---

## Maintenance Best Practices

### Keep Docs Fresh
- Update system docs after architecture changes
- Create SOPs when solving complex issues
- Archive old task plans (keep index clean)
- Refresh index weekly

### Keep Docs Concise
- Each doc should be single-purpose
- Use links to related docs instead of duplicating
- Move detailed code examples to actual codebase
- Summaries > exhaustive details

### Review Documentation Health
Run `/update-doc index` regularly to check:
- Total docs per category
- Last updated timestamps
- Missing documentation areas

---

## Examples

### Example 1: New Feature
```bash
# Start planning
/update-doc plan image-upload

# (Implement feature using plan)

# Update system docs after DB migration
/update-doc system

# Create SOP for S3 setup
/update-doc sop S3 bucket configuration for image uploads

# Archive completed plan
/update-doc archive image-upload

# Refresh index
/update-doc index
```

### Example 2: Bug Fix with Reusable Pattern
```bash
# Fix bug (e.g., database connection pooling issue)

# Create SOP for future reference
/update-doc sop Neon database connection pooling errors

# Update index
/update-doc index
```

### Example 3: Architecture Refactor
```bash
# After refactoring monolith to microservices

# Update system documentation
/update-doc system

# Update index to reflect changes
/update-doc index
```

---

## Success Criteria

Documentation system is working well when:
- ✅ New features take <30 minutes to plan
- ✅ Claude Code uses <50K tokens per feature
- ✅ Repeated issues have SOPs (no re-solving)
- ✅ Context switches take <5 minutes
- ✅ Documentation health shows 80%+ coverage

---

**Now execute the sub-command requested by the user.**

If no sub-command provided, show this guide and ask which operation to perform.
