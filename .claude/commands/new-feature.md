# /new-feature - Create a New Feature

Creates a complete feature across mobile, web, and backend with proper architecture.

## Usage
```
/new-feature <feature-name> <description>
```

## What it does
1. Analyzes the existing codebase structure
2. Creates feature files following the project architecture:
   - Mobile: `mobile/lib/features/<feature-name>/`
   - Web: `web/app/<feature-name>/`
   - Backend: `backend/app/api/v1/<feature-name>.py`
3. Generates models, providers, screens, and API endpoints
4. Updates routing and navigation
5. Creates basic tests
6. Updates documentation

## Example
```
/new-feature workout-history "Track and display user workout history"
```

## Architecture Pattern
- **Mobile**: Feature-based folders with presentation/application/domain layers
- **Web**: App Router with Server/Client components
- **Backend**: FastAPI routers with SQLAlchemy models
