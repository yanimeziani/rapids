# /refactor - Intelligent Code Refactoring

Refactors code while maintaining functionality and tests.

## Usage
```
/refactor <target> <strategy>
```

## Strategies
- `extract` - Extract reusable components/functions
- `simplify` - Reduce complexity
- `optimize` - Improve performance
- `modernize` - Update to latest patterns
- `clean` - Remove dead code

## Example
```
/refactor mobile/lib/features/flows/presentation extract-widgets
/refactor backend/app/main.py simplify
/refactor web/app/page.tsx modernize
```

## Process
1. Analyze current implementation
2. Identify improvement opportunities
3. Plan refactoring steps
4. Apply changes incrementally
5. Run tests continuously
6. Update documentation
