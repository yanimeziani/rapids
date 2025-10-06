# Contributing to RAPIDS

Thank you for your interest in contributing to RAPIDS! We're building the most powerful, token-optimized AI development framework, and we'd love your help making it even better.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Setup](#development-setup)
- [Project Structure](#project-structure)
- [How to Contribute](#how-to-contribute)
- [Development Workflow](#development-workflow)
- [Code Standards](#code-standards)
- [Testing](#testing)
- [Commit Messages](#commit-messages)
- [Pull Request Process](#pull-request-process)
- [Adding New Agents](#adding-new-agents)
- [Adding New MCP Servers](#adding-new-mcp-servers)
- [Documentation](#documentation)
- [Community](#community)

## Code of Conduct

This project adheres to the Contributor Covenant [Code of Conduct](CODE_OF_CONDUCT.md). By participating, you are expected to uphold this code. Please report unacceptable behavior to [yani@meziani.org](mailto:yani@meziani.org).

## Getting Started

1. **Fork the repository** on GitHub
2. **Clone your fork** locally:
   ```bash
   git clone https://github.com/YOUR_USERNAME/rapids.git
   cd rapids
   ```
3. **Add upstream remote**:
   ```bash
   git remote add upstream https://github.com/yanimeziani/rapids.git
   ```
4. **Install dependencies**:
   ```bash
   npm install
   ```

## Development Setup

### Prerequisites

- **Node.js** 20 or higher
- **npm** 9 or higher
- **Claude Code** (latest version)
- **Git** for version control

### Build the CLI

```bash
node scripts/build.js
```

This builds the CLI entry points from TypeScript to JavaScript using esbuild. Output goes to `dist/` directory.

### Test Locally

```bash
# Test the installer
./cli/install.tsx

# Test project creation wizard
./cli/init.tsx

# Test migration
./cli/migrate.tsx

# Test cleanup
./cli/clean.tsx
```

### Install Globally (for testing)

```bash
# Build first
node scripts/build.js

# Pack the package
npm pack

# Install globally from tarball
npm install -g ./rapids-ai-*.tgz

# Test the installer
rapids
```

## Project Structure

```
rapids/
├── cli/                      # CLI source files (TypeScript)
│   ├── install.tsx          # Main installer (npm bin entry)
│   ├── init.tsx             # Project creation wizard
│   ├── migrate.tsx          # Non-destructive migration
│   └── clean.tsx            # Cleanup utility
├── config/                   # Configuration templates
│   ├── .claude/             # Claude Code configs (copied globally)
│   │   ├── agents/          # Agent markdown files (11 agents)
│   │   ├── commands/        # Slash commands
│   │   ├── prompts/         # Stack templates
│   │   ├── output-styles/   # Output style configs
│   │   ├── config.json      # Main Claude config
│   │   ├── subagents-config.json  # Agent definitions
│   │   └── mcp-config.json  # MCP server setup
├── scripts/
│   └── build.js             # esbuild CLI builder
├── dist/                     # Built CLI files (gitignored)
├── docs/                     # Documentation
├── .github/
│   ├── ISSUE_TEMPLATE/      # Issue templates
│   ├── workflows/           # GitHub Actions
│   └── PULL_REQUEST_TEMPLATE.md
├── package.json             # npm package config
└── README.md                # User documentation
```

## How to Contribute

### Types of Contributions

We welcome many types of contributions:

1. **Bug fixes** - Fix issues in the CLI, agents, or configurations
2. **New features** - Add new capabilities to the framework
3. **New agents** - Create specialized AI agents for specific tasks
4. **New MCP servers** - Integrate additional Model Context Protocol servers
5. **Documentation** - Improve guides, examples, and reference docs
6. **Stack templates** - Add templates for new tech stacks
7. **Output styles** - Create new token-optimized output modes
8. **Platform support** - Expand support to Windows, Linux
9. **Tests** - Add unit and integration tests
10. **Bug reports** - Report issues you encounter

### Finding Issues to Work On

- Check [Issues](https://github.com/yanimeziani/rapids/issues) labeled `good first issue`
- Look for `help wanted` labels
- Review [feature requests](https://github.com/yanimeziani/rapids/issues?q=is%3Aissue+is%3Aopen+label%3Aenhancement)

## Development Workflow

1. **Create a branch** for your work:
   ```bash
   git checkout -b feature/your-feature-name
   # or
   git checkout -b fix/bug-description
   ```

2. **Make your changes** following our code standards

3. **Test thoroughly**:
   ```bash
   # Build the CLI
   node scripts/build.js

   # Test locally
   ./cli/install.tsx

   # Test as installed package
   npm pack && npm install -g ./rapids-ai-*.tgz && rapids
   ```

4. **Commit your changes** with a descriptive message

5. **Push to your fork**:
   ```bash
   git push origin feature/your-feature-name
   ```

6. **Open a Pull Request** on GitHub

## Code Standards

### TypeScript/JavaScript

- **Use TypeScript** for all new CLI code
- **Use ESM** (ES Modules) - `import`/`export` not `require`
- **Functional style** preferred for React components (Ink)
- **Async/await** for asynchronous operations
- **Descriptive variable names** - `agentDefinitions` not `data`
- **JSDoc comments** for complex functions

### Example

```typescript
/**
 * Detects the project structure and tech stack
 * @param projectPath - Absolute path to project directory
 * @returns Project metadata including stack and structure type
 */
async function detectProjectStack(projectPath: string): Promise<ProjectMeta> {
  // Implementation
}
```

### Configuration Files (JSON)

- **Validate** all JSON files before committing
- **Use 2-space indentation** for consistency
- **No trailing commas** in JSON
- **Meaningful property names** following existing patterns

### Markdown Documentation

- **Use headers** (##, ###) for clear structure
- **Code blocks** with language tags (\`\`\`bash, \`\`\`typescript)
- **Examples** for all major features
- **Links** to related documentation
- **No emojis in body text** (headers only, following existing style)

## Testing

### Current Testing Approach

We currently use manual testing. Automated tests are coming soon!

**Manual Testing Checklist:**

- [ ] Build completes without errors (`node scripts/build.js`)
- [ ] CLI commands execute successfully
- [ ] Installation copies all files correctly
- [ ] Agents are properly configured
- [ ] MCP servers initialize correctly
- [ ] Project creation works for all stack presets
- [ ] Migration detects stack and structure correctly
- [ ] No TypeScript errors
- [ ] Bundle size is reasonable (<500KB per CLI)

### Future: Automated Testing

We plan to add:
- Unit tests for utilities
- Integration tests for CLI commands
- E2E tests for installation flow
- GitHub Actions for CI

**Want to help?** Setting up our testing infrastructure would be a valuable contribution!

## Commit Messages

We follow the [Conventional Commits](https://www.conventionalcommits.org/) specification:

```
<type>(<scope>): <description>

[optional body]

[optional footer]
```

### Types

- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, no logic change)
- `refactor`: Code refactoring
- `test`: Adding or updating tests
- `chore`: Maintenance tasks

### Examples

```
feat(agents): add deployment-manager agent for automated deployments

Add new agent that handles staging and production deployments with
rollback capabilities and health checks.
```

```
fix(cli): resolve install path issue on Linux systems

The installer was using macOS-specific paths. Now detects platform
and uses appropriate config directories.
```

```
docs(contributing): add testing guidelines and commit message format
```

## Pull Request Process

### Before Submitting

1. **Update documentation** if you changed functionality
2. **Test thoroughly** on your system
3. **Check for TypeScript errors**: `npx tsc --noEmit`
4. **Build successfully**: `node scripts/build.js`
5. **Update CHANGELOG.md** if appropriate
6. **Rebase on latest main**:
   ```bash
   git fetch upstream
   git rebase upstream/main
   ```

### PR Description Template

Use the provided template (automatically populated). Include:

- **What** - What does this PR do?
- **Why** - Why is this change needed?
- **How** - How does it work?
- **Testing** - How did you test this?
- **Screenshots** - For UI changes (Ink TUI)

### Review Process

1. **Automated checks** will run (coming soon)
2. **Maintainer review** - We'll review your code and provide feedback
3. **Iterations** - Make requested changes
4. **Approval** - Once approved, we'll merge!

### After Merge

- Your contribution will be included in the next release
- You'll be credited in the CHANGELOG
- Thank you for making RAPIDS better!

## Adding New Agents

Agents are the core of RAPIDS. Here's how to add one:

### 1. Create Agent Definition

Add to `config/.claude/agents/your-agent-name.md`:

```markdown
# Agent Name

## Purpose
Brief description of what this agent does.

## When to Use
- Specific use case 1
- Specific use case 2

## Capabilities
- Capability 1
- Capability 2

## Example Usage
\`\`\`
Launch agent-name to:
- Task 1
- Task 2
\`\`\`
```

### 2. Register in subagents-config.json

Add to `config/.claude/subagents-config.json`:

```json
{
  "name": "agent-name",
  "type": "general",
  "description": "Short description",
  "triggers": ["keyword1", "keyword2"],
  "instructions": [
    "Instruction 1",
    "Instruction 2"
  ]
}
```

### 3. Update config.json

Add to the `agents` array in `config/.claude/config.json`:

```json
{
  "type": "general",
  "name": "agent-name",
  "instructions": "Link to agent definition or full instructions"
}
```

### 4. Create Slash Command (Optional)

Add `config/.claude/commands/agent-name.md`:

```markdown
Launch agent-name agent to:
- Task description
```

### 5. Update Documentation

- Update `README.md` agent count and list
- Add to `docs/SUBAGENTS_GUIDE.md`
- Update `CHANGELOG.md`

### 6. Test

```bash
# Build
node scripts/build.js

# Install locally
./cli/install.tsx

# Test in Claude Code
# Launch the agent and verify it works
```

## Adding New MCP Servers

MCP (Model Context Protocol) servers extend Claude's capabilities:

### 1. Add to mcp-config.json

Edit `config/.claude/mcp-config.json`:

```json
{
  "mcpServers": {
    "server-name": {
      "command": "npx",
      "args": ["-y", "@org/mcp-server-package"],
      "env": {
        "ENV_VAR": "value"
      }
    }
  }
}
```

### 2. Document Required Environment Variables

If the MCP needs env vars:

1. Add to `README.md` in MCP Servers section
2. Note in installation instructions
3. Add to `.env.example` if creating project templates

### 3. Update Installation Count

- Update `README.md` MCP count
- Update `package.json` description
- Update marketing copy

### 4. Test

```bash
# Install with new MCP
./cli/install.tsx

# Verify MCP is in ~/.claude/mcp-config.json
cat ~/.claude/mcp-config.json

# Test in Claude Code
# Try using the MCP server
```

## Documentation

### Documentation Standards

- **Clear and concise** - No fluff
- **Examples** - Show, don't just tell
- **Updated** - Keep docs in sync with code
- **Organized** - Logical structure

### Documentation Files

- `README.md` - Main user documentation
- `CLAUDE.md` - Project context for Claude Code
- `docs/` - Detailed guides
- `CONTRIBUTING.md` - This file
- `CHANGELOG.md` - Version history

### Updating Documentation

When changing functionality:

1. Update relevant documentation files
2. Update code examples
3. Check for broken links
4. Update screenshots if UI changed

## Community

### Getting Help

- **GitHub Issues** - For bugs and feature requests
- **Discussions** - For questions and ideas (coming soon)
- **Email** - [yani@meziani.org](mailto:yani@meziani.org)

### Communication Guidelines

- **Be respectful** and professional
- **Be clear** and concise
- **Be patient** - We're a small team
- **Be constructive** - Focus on solutions

### Recognition

Contributors are recognized in:
- `CHANGELOG.md` for their contributions
- GitHub contributor list
- Special mentions for major features

---

## Quick Reference

### Common Tasks

**Build CLI:**
```bash
node scripts/build.js
```

**Test locally:**
```bash
./cli/install.tsx
```

**Install globally:**
```bash
npm pack && npm install -g ./rapids-ai-*.tgz
```

**Format code:**
```bash
# Coming soon - adding Prettier
```

**Check TypeScript:**
```bash
npx tsc --noEmit
```

### File Locations

- **CLI source**: `cli/`
- **Config templates**: `config/.claude/`
- **Build output**: `dist/`
- **Documentation**: `docs/`
- **Build script**: `scripts/build.js`

---

## Thank You!

Thank you for contributing to RAPIDS! Your contributions help developers worldwide ship faster and make more money.

**Questions?** Open an issue or email [yani@meziani.org](mailto:yani@meziani.org)

🌊 **Ship fast, make money!** 🚀
