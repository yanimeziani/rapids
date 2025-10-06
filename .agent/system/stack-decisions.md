# Technology Stack Decisions

## Purpose
Documents technology choices, alternatives considered, and rationale for RAPIDS architecture.

## CLI & Build System

### Why Ink over Commander/Yargs?
**Decision:** Use Ink 5 (React for terminals)

**Alternatives Considered:**
- Commander.js - CLI framework
- Yargs - Argument parser
- Inquirer.js - Prompts only

**Rationale:**
- ✅ Visual feedback during installation (spinner, progress)
- ✅ Better UX for interactive prompts (project init)
- ✅ React component model for complex UI
- ✅ Gradients, colors, box layouts out-of-box
- ❌ Larger bundle size (mitigated by esbuild tree-shaking)

**Impact:** Beautiful TUI, better user experience, slightly larger bundles

---

### Why esbuild over Webpack/Rollup?
**Decision:** Use esbuild for bundling CLI

**Alternatives Considered:**
- Webpack - Full-featured bundler
- Rollup - Library-focused bundler
- tsup - TypeScript wrapper for esbuild

**Rationale:**
- ✅ 10-100x faster builds (<100ms)
- ✅ Built-in TypeScript/TSX support
- ✅ Simple configuration
- ✅ Tree-shaking and minification
- ✅ ESM output for modern Node.js
- ❌ Less plugin ecosystem (not needed for CLI)

**Impact:** Fast builds, small bundles (~40KB each), simple maintenance

---

### Why ESM over CommonJS?
**Decision:** Use ES Modules (import/export)

**Alternatives Considered:**
- CommonJS (require/module.exports)
- Dual package (ESM + CJS)

**Rationale:**
- ✅ Modern Node.js standard (14+)
- ✅ Better tree-shaking
- ✅ Async module loading
- ✅ Future-proof
- ❌ Requires Node 14+ (acceptable tradeoff)

**Impact:** Smaller bundles, better performance, requires modern Node.js

---

## Agent System

### Why General-Purpose Agents over Specialized Types?
**Decision:** All 11 agents use `general-purpose` type

**Alternatives Considered:**
- `code-searcher` type for search agents
- `statusline-setup` for config agents
- Custom types per agent

**Rationale:**
- ✅ Claude Code has full tool access for general-purpose
- ✅ Flexibility for agents to use any tool
- ✅ Simpler configuration
- ❌ Less type safety (mitigated by clear instructions)

**Impact:** Maximum flexibility, agents can adapt tools to task

---

### Why 11 Agents vs Fewer Generic Ones?
**Decision:** 11 specialized agents

**Alternatives Considered:**
- Single "do-everything" agent
- 3-5 broad category agents

**Rationale:**
- ✅ Clear separation of concerns
- ✅ Specialized prompts optimize for task type
- ✅ Easier to trigger correct agent via context
- ✅ Parallel execution for independent tasks
- ❌ More configuration to maintain (acceptable for quality)

**Impact:** Better task matching, higher quality outputs, parallel workflows

---

### Why marketing-strategist as "Most Critical"?
**Decision:** Prioritize revenue over code quality

**Philosophy:**
- Code without users = wasted effort
- Marketing harder than coding
- Solo devs need distribution focus

**Impact:** Forces validation before building, GTM thinking from day 1

---

## Stack Templates

### Why Next.js 15 over Remix/SvelteKit?
**Decision:** Next.js 15 App Router for web

**Alternatives Considered:**
- Remix - Full-stack React framework
- SvelteKit - Svelte framework
- Astro - Content-focused

**Rationale:**
- ✅ Largest ecosystem and job market
- ✅ Best-in-class Server Components
- ✅ Excellent documentation
- ✅ Vercel deployment (but Dokploy preferred)
- ✅ NextAuth.js integration
- ❌ Learning curve for App Router (docs help)

**Impact:** Fastest development, most resources, best hiring pool

---

### Why Flutter over React Native?
**Decision:** Flutter for mobile

**Alternatives Considered:**
- React Native - JavaScript mobile
- Native (Swift/Kotlin) - Platform-specific

**Rationale:**
- ✅ Single codebase for iOS + Android
- ✅ Better performance than RN
- ✅ Rich widget library (Material Design 3)
- ✅ Hot reload
- ✅ Growing ecosystem
- ❌ Dart language learning curve (small)

**Impact:** Faster mobile development, native performance, beautiful UI

---

### Why FastAPI over Django/Flask?
**Decision:** FastAPI for backend

**Alternatives Considered:**
- Django - Full framework
- Flask - Minimal framework
- Express.js - Node.js backend

**Rationale:**
- ✅ Async/await native (better for I/O)
- ✅ Automatic OpenAPI docs
- ✅ Pydantic validation built-in
- ✅ Type hints for safety
- ✅ Fast performance (on par with Node.js)
- ❌ Smaller ecosystem than Django (acceptable for APIs)

**Impact:** Fast APIs, automatic docs, type safety, modern Python

---

### Why PostgreSQL over MySQL/MongoDB?
**Decision:** PostgreSQL 16+ with Neon

**Alternatives Considered:**
- MySQL - Popular SQL database
- MongoDB - NoSQL document store
- SQLite - Embedded database

**Rationale:**
- ✅ ACID compliance
- ✅ Advanced features (JSON, full-text search, arrays)
- ✅ Better for complex queries
- ✅ Neon serverless (autoscaling, branching)
- ✅ Strong typing and constraints
- ❌ More resource-heavy than MySQL (Neon solves this)

**Impact:** Robust data integrity, serverless scaling, database branches for testing

---

## Deployment

### Why Dokploy over Vercel/Railway/Render?
**Decision:** Dokploy (self-hosted Docker PaaS)

**Alternatives Considered:**
- Vercel - Serverless platform
- Railway - PaaS
- Render - PaaS
- Heroku - PaaS (legacy)
- AWS/GCP - Cloud providers

**Rationale:**
- ✅ Self-hosted = no vendor lock-in
- ✅ Cheaper than managed platforms
- ✅ Full control over infrastructure
- ✅ Docker-native (portable)
- ✅ Supports monorepo + microservices
- ❌ Requires server management (acceptable for control)

**Impact:** Cost savings, flexibility, Docker skills transfer

---

### Why Docker Multi-Stage Builds?
**Decision:** Multi-stage Dockerfiles required

**Alternatives Considered:**
- Single-stage builds
- Pre-built images
- Buildpacks (Heroku-style)

**Rationale:**
- ✅ Smaller images (200MB vs 1GB+)
- ✅ Faster deployments
- ✅ Security (no dev dependencies in production)
- ✅ Separation of build and runtime
- ❌ More complex Dockerfile (templates help)

**Impact:** 70-90% smaller images, faster cold starts, better security

---

## Context Optimization

### Why .agent/ Folder over Code Comments?
**Decision:** Dedicated `.agent/` directory for AI context

**Alternatives Considered:**
- Inline code comments
- Single ARCHITECTURE.md
- Wiki/Notion external docs

**Rationale:**
- ✅ Structured, scannable documentation
- ✅ Separate from code (doesn't clutter)
- ✅ Easy to update without touching code
- ✅ 60-80% token savings over full codebase reads
- ✅ Scales with project size
- ❌ Requires discipline to keep updated (workflows help)

**Impact:** Massive token savings, faster agent responses, better context

---

### Why Sub-Agents for Research?
**Decision:** Use sub-agents for token-heavy research

**Alternatives Considered:**
- Single-threaded research
- External API calls
- Manual documentation

**Rationale:**
- ✅ Isolates token-heavy tasks
- ✅ Returns only summaries to main thread
- ✅ Parallel execution
- ✅ Prevents context pollution
- ❌ More complex workflow (worth it for tokens)

**Impact:** 80%+ token reduction for research tasks, cleaner main context

---

## MCP Servers

### Why 6 Pre-Configured MCP Servers?
**Decision:** Bundle Context7, Filesystem, Postgres, GitHub, Puppeteer, Dokploy

**Alternatives Considered:**
- User installs MCPs manually
- Only bundle essential ones
- Custom MCP implementation

**Rationale:**
- ✅ Works out-of-box (better UX)
- ✅ Covers 90% of use cases
- ✅ Auto-activation for Context7 (live docs)
- ✅ User can add more easily
- ❌ Requires env vars for some (docs help)

**Impact:** Faster onboarding, consistent experience, fewer support issues

---

## Output Styles

### Why Two Output Styles (rapids-speed, ship-mode)?
**Decision:** Pre-configured concise output styles

**Alternatives Considered:**
- Default Claude Code output
- Single custom style
- Per-agent styles

**Rationale:**
- ✅ Token optimization (<50K per feature)
- ✅ Revenue-first thinking (ship-mode)
- ✅ User can switch based on task
- ✅ Reduces verbosity by 70%+
- ❌ Less explanatory (acceptable for speed)

**Impact:** Faster iterations, lower costs, focus on shipping

---

## Language & Type Safety

### Why TypeScript over JavaScript?
**Decision:** TypeScript for CLI, TSX via Ink

**Alternatives Considered:**
- Plain JavaScript
- JSDoc type comments

**Rationale:**
- ✅ Catch errors at build time
- ✅ Better IDE autocomplete
- ✅ Self-documenting code
- ✅ Easier refactoring
- ❌ Build step required (esbuild makes it fast)

**Impact:** Fewer runtime errors, better DX, safer refactoring

---

## Future Decisions to Make

### Platform Support
**Current:** macOS only
**Planned:** Linux, Windows

**Decision Pending:**
- Windows config paths
- Permission handling per OS
- Testing infrastructure

### Plugin System
**Current:** Fixed 11 agents
**Planned:** User-defined agents

**Decision Pending:**
- Plugin API design
- Security sandboxing
- Distribution (npm registry?)

### Cloud Sync
**Current:** Local config only
**Planned:** Optional cloud sync

**Decision Pending:**
- Storage backend (S3, Cloudflare R2?)
- Encryption strategy
- Conflict resolution

---

## Decision-Making Framework

When evaluating new technologies:

1. **Does it reduce tokens?** (Primary goal)
2. **Does it speed up shipping?** (Revenue focus)
3. **Is it well-documented?** (Solo dev constraint)
4. **Is it widely adopted?** (Hiring/support)
5. **Does it avoid vendor lock-in?** (Portability)

If 3+ answers are "yes," consider it. If all 5, adopt it.

---

## Related Files
- `.agent/system/architecture-overview.md` - System design
- `.agent/system/critical-paths.md` - Implementation details
- `CLAUDE.md` - Development guidelines
