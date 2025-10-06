# /fix-bug - Debug and Fix Issues

Intelligently debugs and fixes bugs across the stack.

## Usage
```
/fix-bug <description or error message>
```

## What it does
1. Searches relevant code using Grep and Glob
2. Analyzes error logs and stack traces
3. Identifies root cause
4. Proposes and implements fix
5. Runs tests to verify
6. Updates related code if needed

## Example
```
/fix-bug "Backend health check failing with database connection error"
/fix-bug "Mobile app crashes when opening workout screen"
/fix-bug "Web page shows 404 on /flows route"
```

## Debugging Strategy
1. Check recent changes (git log)
2. Search error patterns in logs
3. Review related code
4. Test hypothesis
5. Apply fix
6. Verify solution
