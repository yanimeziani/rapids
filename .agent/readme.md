# RAPIDS Agent Documentation Index

This directory contains structured documentation to optimize Claude Code's context and performance when working on the RAPIDS project.

## 📁 Folder Structure

### `/task` - Implementation Plans & PRDs
Contains Product Requirement Documents, feature plans, and implementation strategies. Read these before starting any implementation work.

**Current Documents:**
- `template-feature-plan.md` - Template for new feature planning
- *(Plans are added here before implementation)*

**When to Read:**
- Before implementing any new feature
- When understanding current development priorities
- When reviewing implementation progress

---

### `/system` - Project Architecture
Contains high-level architectural documentation, database schemas, API contracts, and critical system information.

**Current Documents:**
- `architecture-overview.md` - System architecture and component interactions
- `database-schema.md` - PostgreSQL schema, migrations, and relationships
- `api-endpoints.md` - FastAPI backend routes and contracts
- `critical-paths.md` - Complex code sections requiring careful handling
- `stack-decisions.md` - Technology choices and rationale

**When to Read:**
- When making architectural decisions
- Before modifying database schema
- When working on API integrations
- When refactoring core systems
- Before deployment configurations

---

### `/sop` - Standard Operating Procedures
Contains step-by-step procedures for common tasks and solutions to recurring issues. Generated after completing tasks or fixing mistakes.

**Current Documents:**
- `template-sop.md` - Template for creating new SOPs
- *(SOPs are added as issues are resolved)*

**When to Read:**
- When encountering integration issues
- Before running deployment workflows
- When debugging common errors
- After repeated mistakes to prevent recurrence

---

## 🔄 Workflow Integration

### 1. Planning Phase
```bash
# Use planning mode to create feature plan
# Save plan to .agent/task/{feature-name}-plan.md
# Update this readme with new task link
```

### 2. Implementation Phase
```bash
# Read relevant system docs from .agent/system/
# Follow task plan from .agent/task/
# Reference SOPs from .agent/sop/ as needed
```

### 3. Post-Implementation
```bash
# Update relevant system docs if architecture changed
# Create SOP if new patterns or fixes were discovered
# Archive completed task plan or mark as done
# Update this readme
```

### 4. Context Switching
```bash
# Clear conversation thread
# Read only relevant docs for new feature
# Let documentation provide context instead of re-analyzing codebase
```

---

## 📝 Document Maintenance Commands

### Initialize Documentation
```bash
/update-doc initialize
```
Sets up `.agent` folder structure and creates initial documentation files.

### Update System Docs
```bash
/update-doc system
```
Reviews codebase and updates architecture, database, and API documentation.

### Create SOP
```bash
/update-doc sop <issue-description>
```
Generates a new Standard Operating Procedure based on recent issue resolution.

### Refresh Index
```bash
/update-doc index
```
Updates this readme.md with latest document list and summaries.

---

## 🎯 Context Optimization Strategy

### Token Conservation
- **Read only what's needed**: Don't read all docs for every task
- **Use sub-agents for research**: Isolate token-heavy research in separate threads
- **Keep docs concise**: Each doc should be single-purpose and scannable
- **Archive old plans**: Move completed tasks to `task/archive/`

### Documentation Priorities
1. **High Priority (Always Read)**:
   - Current task plan
   - Relevant system architecture section
   - Related SOPs

2. **Medium Priority (Read When Relevant)**:
   - Database schema (for DB changes)
   - API endpoints (for backend work)
   - Critical paths (for refactoring)

3. **Low Priority (Read on Demand)**:
   - Stack decisions (for tech questions)
   - Archived task plans (for reference)

---

## 🚀 Quick Start for New Features

1. **Plan First**: Run agent in planning mode → save to `.agent/task/`
2. **Read Context**: Check `.agent/system/` for relevant architecture
3. **Check SOPs**: Review `.agent/sop/` for known issues
4. **Implement**: Follow plan with minimal token overhead
5. **Document**: Update system docs and create SOPs if needed

---

## 📊 Documentation Health

**Last Updated**: 2025-10-06
**Total Task Plans**: 0
**Total System Docs**: 5
**Total SOPs**: 0
**Status**: ✅ Initialized

---

*This documentation system reduces token usage by 60-80% compared to full codebase analysis on every task.*
