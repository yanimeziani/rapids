# /update-deps - Update Dependencies

Safely updates project dependencies across all platforms.

## Usage
```
/update-deps [platform]
```
- `mobile` - Update Flutter packages
- `web` - Update npm packages
- `backend` - Update Python packages
- (empty) - Update all platforms

## What it does
1. Checks current versions
2. Identifies outdated packages
3. Reviews breaking changes
4. Updates package files
5. Tests after update
6. Documents changes

## Example
```
/update-deps mobile
/update-deps web
/update-deps backend
/update-deps
```

## Safety Checks
- Semantic versioning analysis
- Breaking change detection
- Compatibility verification
- Rollback plan if needed
