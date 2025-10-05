# /deploy - Deploy to Production

Handles deployment to DocPloy (docploy.meziani.org) and flowz.fit.

## Usage
```
/deploy [environment]
```

## Environments
- `dev` - Development environment
- `staging` - Staging for testing
- `prod` - Production (flowz.fit)

## What it does
1. Runs all tests
2. Builds Docker images
3. Pushes to registry
4. Updates deployment configs
5. Deploys to DocPloy
6. Runs health checks
7. Notifies completion

## Example
```
/deploy staging
/deploy prod
```

## Pre-deployment Checks
- ✅ All tests passing
- ✅ Build succeeds
- ✅ Database migrations ready
- ✅ Environment vars set
- ✅ Health checks configured
- ✅ Rollback plan ready

## Deployment Strategy
1. Build & test locally
2. Push to DocPloy
3. Run migrations
4. Health check
5. Switch traffic
6. Monitor logs
