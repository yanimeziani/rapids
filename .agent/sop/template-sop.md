# SOP Template

**SOP ID:** [SOP-XXX]
**Title:** [Brief title describing the procedure]
**Category:** [Integration/Deployment/Debugging/Configuration]
**Created:** [Date]
**Last Updated:** [Date]
**Author:** [Name or "Claude Code"]

---

## Purpose

**What is this SOP for?**
[Brief description of when to use this procedure]

**When to use:**
- [Scenario 1: e.g., "When integrating a new MCP server"]
- [Scenario 2: e.g., "When deployment fails with error X"]
- [Scenario 3]

---

## Prerequisites

**Required Knowledge:**
- [Prerequisite 1: e.g., "Familiarity with MCP server configuration"]
- [Prerequisite 2: e.g., "Access to Dokploy dashboard"]

**Required Access:**
- [ ] [Access 1: e.g., "Admin access to project"]
- [ ] [Access 2: e.g., "Environment variables configured"]

**Required Tools:**
- [Tool 1: e.g., "Docker installed"]
- [Tool 2: e.g., "Node.js 18+"]

---

## Step-by-Step Procedure

### Step 1: [First Action]
**Description:** [What you're doing in this step]

**Commands:**
```bash
# Example command
npm install @package/name
```

**Expected Output:**
```
✓ Package installed successfully
```

**If this fails:**
- Check [potential issue 1]
- Verify [potential issue 2]
- See "Troubleshooting" section below

---

### Step 2: [Second Action]
**Description:** [What you're doing in this step]

**Files to Modify:**
- `path/to/file1.ts` - [What to change]
- `path/to/file2.json` - [What to change]

**Example Configuration:**
```json
{
  "key": "value",
  "setting": true
}
```

**Verification:**
```bash
# How to verify this step worked
npm run test
```

---

### Step 3: [Third Action]
**Description:** [What you're doing in this step]

**Checklist:**
- [ ] [Task 1]
- [ ] [Task 2]
- [ ] [Task 3]

---

### Step N: [Final Action]
**Description:** [Final step]

**Success Criteria:**
- [Criterion 1: e.g., "Service starts without errors"]
- [Criterion 2: e.g., "Tests pass"]
- [Criterion 3: e.g., "Feature works in browser"]

---

## Verification & Testing

### How to Verify Success
```bash
# Test command 1
npm run build

# Test command 2
npm test

# Manual verification
# 1. Open browser to http://localhost:3000
# 2. Check feature X works
# 3. Verify no console errors
```

### Expected Results
- [Result 1]
- [Result 2]
- [Result 3]

---

## Troubleshooting

### Common Issues

#### Issue 1: [Error Message or Symptom]
**Symptoms:**
- [Symptom 1]
- [Symptom 2]

**Root Cause:**
[Why this happens]

**Solution:**
```bash
# Fix command
command-to-fix-issue
```

**Alternative Solution:**
[If first solution doesn't work]

---

#### Issue 2: [Error Message or Symptom]
**Symptoms:**
- [Symptom 1]
- [Symptom 2]

**Root Cause:**
[Why this happens]

**Solution:**
[How to fix]

---

#### Issue 3: [Error Message or Symptom]
**Symptoms:**
- [Symptom 1]

**Root Cause:**
[Why this happens]

**Solution:**
[How to fix]

---

## Rollback Procedure

**If something goes wrong, follow these steps to undo changes:**

### Step 1: [Rollback Action 1]
```bash
# Rollback command
git revert HEAD
```

### Step 2: [Rollback Action 2]
```bash
# Restore previous state
npm run restore-backup
```

### Step 3: Verify Rollback
- [ ] [Verification 1]
- [ ] [Verification 2]

---

## Related Documentation

**System Docs:**
- [`.agent/system/architecture-overview.md`] - [Why relevant]
- [`.agent/system/database-schema.md`] - [Why relevant]

**Task Plans:**
- [`.agent/task/feature-x-plan.md`] - [Related feature]

**Other SOPs:**
- [`.agent/sop/related-sop.md`] - [Related procedure]

**External Resources:**
- [Link to external documentation]
- [Link to error reference]

---

## Notes & Warnings

**⚠️ WARNINGS:**
- [Warning 1: e.g., "This will delete data, backup first!"]
- [Warning 2: e.g., "Only run in development environment"]

**📝 NOTES:**
- [Note 1: Useful tip or context]
- [Note 2: Alternative approach]

---

## Change Log

| Date | Change | Author |
|------|--------|--------|
| 2025-01-06 | Created initial SOP | Claude Code |
| [Date] | [Change description] | [Author] |

---

## Example: Real Usage

**Scenario:** [Describe a real example of when this SOP was used]

**Context:** [What was the problem]

**Execution:** [How the SOP was followed]

**Outcome:** [Result after following the SOP]

**Time Saved:** [How much time this SOP saved vs figuring it out again]

---

**Instructions for Use:**
1. Copy this template to `.agent/sop/{descriptive-name}-sop.md`
2. Fill out all sections with specific, actionable steps
3. Include actual commands, not placeholders
4. Test the SOP by following it yourself
5. Update `.agent/readme.md` to reference this SOP
6. Keep updated as procedures change
