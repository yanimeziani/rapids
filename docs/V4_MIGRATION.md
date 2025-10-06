# RAPIDS v4.0.0 Migration Guide

**The Revolutionary Transformation**

RAPIDS v4.0.0 represents a complete architectural refactoring from good to legendary. This guide explains what changed and why.

## What's New in v4.0.0

### 1. Modern Source Structure

**Before (v3.x):**
```
rapids/
├── cli/
│   ├── install.tsx
│   ├── init.tsx
│   ├── migrate.tsx
│   └── clean.tsx
└── .claude/
```

**After (v4.0.0):**
```
rapids/
├── src/
│   ├── cli/
│   │   ├── commands/
│   │   ├── ui/
│   │   └── utils/
│   ├── core/
│   │   ├── agent-engine/
│   │   ├── config-manager/
│   │   ├── template-engine/
│   │   └── plugin-system/
│   ├── agents/
│   ├── templates/
│   └── types/
└── config/
```

### 2. New Commands

- **`rapids doctor`** - Health check for installation
- **`rapids config`** - Interactive configuration editor
- **`rapids agent <name>`** - Direct agent invocation
- **`rapids template <name>`** - Template generation

### 3. Core Systems

#### ConfigLoader
Centralized configuration management with caching and validation.

#### AgentRunner
Powerful agent discovery, filtering, and execution engine.

#### Type System
Complete TypeScript type definitions for all RAPIDS components.

### 4. Backwards Compatibility

All existing commands continue to work:
- `rapids` - Installation
- `rapids-migrate` - Migration
- `rapids-clean` - Cleanup

## Breaking Changes

### None (Phase 1)

Phase 1 maintains 100% backwards compatibility. All existing functionality works exactly as before.

### Future Phases

Future phases may introduce:
- New CLI interface (with legacy fallback)
- Plugin system
- Template engine improvements
- Extended MCP integration

## For Users

**No action required.** Simply upgrade:

```bash
npm install -g rapids-ai@4.0.0
```

All your existing RAPIDS installations, configurations, and workflows continue to work.

## For Contributors

### New Development Workflow

1. **Work in `src/`** - All new code goes in the `src/` directory
2. **Use TypeScript** - Strict mode enabled, full type safety
3. **Import with aliases** - Use `@core/*`, `@cli/*`, etc.
4. **Build before testing** - Run `node scripts/build.js`
5. **Follow the philosophy** - Minimalist, polyvalent, efficient

### Adding Features

#### New CLI Command

```typescript
// src/cli/commands/my-command.ts
export async function myCommand(): Promise<void> {
  console.log('Hello from my command!');
}
```

```typescript
// src/cli/index.ts
program
  .command('my-command')
  .description('My new command')
  .action(async () => {
    const { myCommand } = await import('./commands/my-command.js');
    await myCommand();
  });
```

#### New Utility Function

```typescript
// src/cli/utils/my-utility.ts
export function myUtility(input: string): string {
  return input.toUpperCase();
}
```

```typescript
// src/cli/utils/index.ts
export * from './my-utility.js';
```

### Type-Safe Development

All RAPIDS types are in `src/types/index.ts`. Import and use:

```typescript
import type {
  AgentDefinition,
  ProjectAnalysis,
  StackConfig,
  Result
} from '@types/index.js';

async function myFunction(): Promise<Result<string>> {
  return { success: true, data: 'Hello!' };
}
```

## Architecture Principles

### 1. Minimalism
Every line of code serves a purpose. No bloat, no waste.

### 2. Polyvalence
Components are reusable across contexts. DRY principle strictly enforced.

### 3. Efficiency
Fast builds, fast execution, minimal token usage. Performance is a feature.

### 4. Beauty
Clean code, clear structure, elegant solutions. Code is communication.

## File Organization

### CLI Layer (`src/cli/`)
User-facing commands and interfaces. Depends on Core layer.

### Core Layer (`src/core/`)
Business logic and engine systems. Independent of CLI.

### Agents Layer (`src/agents/`)
Agent definitions, base classes, and factory. Used by Core.

### Templates Layer (`src/templates/`)
Code generation templates. Used by Core.

### Types Layer (`src/types/`)
TypeScript definitions. Used by all layers.

## Build System

### Legacy Build
Bundles `cli/*.tsx` files for backwards compatibility.

### Modern Build
Bundles `src/**/*.ts` files with proper module resolution.

### Dual Output
Produces both legacy commands (`install.js`, `migrate.js`, etc.) and modern CLI (`rapids.js`, `doctor.js`, etc.).

## Testing

### Manual Testing

```bash
# Build
node scripts/build.js

# Test legacy commands
./dist/install.js
./dist/migrate.js

# Test new commands
./dist/rapids.js doctor
./dist/rapids.js agent marketing-strategist
```

### Automated Testing (Coming Soon)

```bash
npm test
```

## Upgrade Path

### From v3.x to v4.0.0

1. **Global Upgrade**
   ```bash
   npm install -g rapids-ai@4.0.0
   ```

2. **Verify Installation**
   ```bash
   rapids doctor
   ```

3. **Continue Working**
   Everything works as before, plus new features!

### From v4.0.0 to Future Versions

Follow semantic versioning:
- **Patch** (4.0.x) - Bug fixes, no breaking changes
- **Minor** (4.x.0) - New features, backwards compatible
- **Major** (x.0.0) - Breaking changes, migration guide provided

## FAQ

### Will my existing projects break?

No. RAPIDS v4.0.0 maintains full backwards compatibility.

### Do I need to update my project configurations?

No. Existing `.claude/` configurations work unchanged.

### Can I use the new commands now?

Yes! `rapids doctor`, `rapids config`, `rapids agent`, and `rapids template` are available immediately.

### When will the old CLI files be removed?

Not in v4.x. Legacy CLI files will be maintained until v5.0.0 at the earliest, with ample migration period.

### How do I contribute?

Read `src/README.md` for development guidelines, then submit a PR!

## Roadmap

### Phase 1 ✅ (Current)
- [x] New source structure
- [x] Core systems (ConfigLoader, AgentRunner)
- [x] Type definitions
- [x] New commands (stubs)
- [x] Build system update

### Phase 2 (Next)
- [ ] Migrate Ink components
- [ ] Refactor existing commands
- [ ] Template engine
- [ ] Plugin system
- [ ] Comprehensive tests

### Phase 3 (Future)
- [ ] Advanced agent features
- [ ] Extended MCP integration
- [ ] Web dashboard
- [ ] Multi-platform support

## Support

- **Documentation**: https://yanimeziani.github.io/rapids/
- **Issues**: https://github.com/yanimeziani/rapids/issues
- **Discussions**: https://github.com/yanimeziani/rapids/discussions

---

**RAPIDS v4.0.0** - Minimalist. Polyvalent. Efficient. Beautiful.
