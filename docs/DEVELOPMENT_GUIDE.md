# RAPIDS Development Guide with Claude Code

Complete guide for developing with RAPIDS and Claude Code efficiently.

## 🚀 Quick Start with Claude Code

### Essential Commands

```bash
# Create a new feature
/new-feature workout-history "Track user workout history"

# Fix a bug
/fix-bug "Backend API returns 500 on /flows endpoint"

# Refactor code
/refactor mobile/lib/features/flows/ extract-widgets

# Generate tests
/test mobile lib/features/flows/

# Deploy
/deploy staging
```

## 🤖 Using AI Agents

### 1. Code Reviewer
Automatic code review before commit:
```
Review my changes for the workout feature
```

### 2. Performance Optimizer
Optimize performance:
```
Optimize the flows screen, it's loading slowly
```

### 3. Security Auditor
Security audit:
```
Run security audit on authentication flow
```

### 4. Database Migrator
Manage migrations:
```
Create migration for adding workout_sessions table
```

## 📁 Project Architecture

### Mobile (Flutter)
```
lib/
├── app/                 # App configuration
├── core/                # Shared utilities
├── features/            # Features
│   ├── <feature>/
│   │   ├── application/  # Business logic
│   │   ├── domain/       # Models
│   │   └── presentation/ # UI
├── providers/           # Riverpod providers
└── routing/             # Navigation
```

### Web (Next.js 15)
```
app/
├── <route>/
│   ├── page.tsx         # Main page
│   ├── layout.tsx       # Layout
│   ├── loading.tsx      # Loading state
│   └── error.tsx        # Error handling
```

### Backend (FastAPI)
```
app/
├── api/v1/              # API routes
├── models/              # Database models
├── schemas/             # Pydantic validation
├── services/            # Business logic
└── main.py             # Application
```

## 🛠️ Common Workflows

### Adding a New Feature

1. **Plan with Claude**
```
Plan the implementation of a workout timer feature:
- Mobile: Real-time timer with pause/resume
- Web: Display workout progress
- Backend: Store workout sessions
```

2. **Create structure**
```
/new-feature workout-timer "Real-time workout timer with session tracking"
```

3. **Implement iteratively**
- Start with backend (API + DB)
- Then mobile (UI + logic)
- Finally web (display)

4. **Test**
```
/test mobile lib/features/workout-timer/
/test backend app/api/v1/workout_timer.py
```

5. **Deploy**
```
/deploy staging
# Test
/deploy prod
```

### Fixing a Bug

1. **Describe the problem**
```
/fix-bug "Mobile app crashes when selecting a flow with null exercises"
```

2. **Claude will**:
   - Search relevant code
   - Analyze the cause
   - Propose a fix
   - Implement it
   - Test

3. **Verify the fix**
```
Run the app and verify the fix works
```

### Refactoring Code

```
/refactor mobile/lib/features/flows/presentation/flows_screen.dart extract-widgets

# Claude will:
# - Identify repetitive widgets
# - Extract into reusable components
# - Update imports
# - Test everything works
```

## 🔍 Debugging with Claude

### Error logs
Copy-paste logs directly:
```
Fix this error:
[ERROR] sqlalchemy.exc.OperationalError: (psycopg2.OperationalError)
connection to server failed
```

### Performance
```
The flows list is slow to load, investigate and optimize
```

### Build errors
```
Fix this Flutter build error:
[flutter] Error: Type 'Future<void>' can't be assigned to 'void Function()'
```

## 📊 Best Practices

### 1. Clear Context
Always provide context:
```
❌ "Fix the error"
✅ "Fix the database connection error in backend/app/main.py when connecting to PostgreSQL"
```

### 2. Short Iterations
Work in small steps:
```
✅ "First, add the API endpoint for creating workouts"
✅ "Now connect the mobile UI to this endpoint"
✅ "Finally, add error handling"
```

### 3. Use Templates
Prompts in `.claude/prompts/` are optimized:
```
Create a new mobile feature following the mobile-feature template
```

### 4. Automated Tests
Always test after changes:
```
/test mobile lib/features/workout/
```

## 🚢 Deployment

### Pre-Deployment Checklist
```
Run pre-deployment checks:
- All tests passing
- Build succeeds
- Database migrations ready
- Environment variables configured
```

### Staging Deployment
```
/deploy staging
```

### Production Deployment
```
/deploy prod
```

### Rollback if Necessary
```
Rollback production to previous version
```

## 🔐 Security

### Regular Audit
```
Run security audit
```

### Before Each Release
```
Check for security vulnerabilities before deploying to production
```

## 📈 Monitoring & Maintenance

### Performance
```
Generate performance report for mobile app
```

### Dependencies
```
/update-deps
# Check for outdated packages across all platforms
```

### Database
```
Analyze database performance and suggest optimizations
```

## 💡 Advanced Tips

### 1. Code Search
```
Find all places where we handle workout session state
```

### 2. Auto Documentation
```
Generate API documentation for all backend endpoints
```

### 3. Code Migration
```
Migrate flows_screen.dart from StatefulWidget to ConsumerWidget with Riverpod
```

### 4. Mock Generation
```
Generate mock data for testing workout flows
```

## 🎯 Concrete Examples

### Example 1: Adding Authentication
```
Implement Google Sign-In:
1. Backend: JWT authentication with Google OAuth
2. Mobile: Google Sign-In button with token storage
3. Web: Google Sign-In with session management
```

### Example 2: Optimizing Images
```
Optimize workout exercise images:
- Mobile: Use cached_network_image
- Web: Next.js Image component
- Backend: Serve optimized sizes
```

### Example 3: Adding Analytics
```
Add PostHog analytics:
- Track workout completions
- Monitor user engagement
- Setup custom events
```

## 🆘 Support & Troubleshooting

### General Problem
```
I'm stuck with <describe issue>, help me debug and fix it
```

### Understanding Code
```
Explain how the workout flow state machine works in mobile/lib/features/workout/
```

### Improving Performance
```
The mobile app is using too much memory, investigate and optimize
```

## 🌊 RAPIDS-Specific Workflows

### Migrating Existing Project

```bash
# Navigate to project root
cd your-existing-project

# Run migration (non-destructive)
rapids-migrate

# Clean up old files
rapids-clean

# Start using RAPIDS
/update-doc system
```

**Migration automatically**:
- Detects stack and structure
- Creates `.claude/` config
- Initializes `.agent/` system
- Backs up existing `.claude/` if present

See `docs/MIGRATION.md` for full details.

### Using rapids-clean

After migrating, clean up legacy files:

```bash
rapids-clean
```

This removes:
- Old environment files (`.env.local`, `.env.production`, etc.)
- Legacy documentation
- Build artifacts and cache
- Deprecated helper scripts
- Old CI/CD configs
- Migration backups

See `docs/CLEAN.md` for full details.

### Context Optimization with `.agent/`

Use the `.agent/` documentation system to save 60-80% tokens:

```bash
# Initialize .agent/ folder
/update-doc initialize

# Create feature plan before building
/update-doc plan workout-timer

# Update architecture docs after major changes
/update-doc system

# Create SOP for recurring issues
/update-doc sop "database-connection-timeout-fix"

# Archive completed plans
/update-doc archive workout-timer
```

---

## Development Commands

### Mobile (Flutter)
```bash
cd mobile
flutter pub get
flutter run
flutter test
```

### Web (Next.js)
```bash
cd web
npm install
npm run dev
npm run build
```

### Backend (FastAPI)
```bash
cd backend
docker compose up -d
docker compose logs -f backend
```

### Docker (All)
```bash
docker compose up -d
docker compose ps
docker compose logs -f
docker compose down
```

---

**Summary**: Use Claude Code as your development partner. Be precise, iterative, and don't hesitate to ask for help at every step!
