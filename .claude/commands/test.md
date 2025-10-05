# /test - Generate and Run Tests

Creates comprehensive tests for features.

## Usage
```
/test <platform> [target]
```

## Platforms
- `mobile` - Flutter widget/unit tests
- `web` - Jest/React Testing Library
- `backend` - Pytest
- `e2e` - End-to-end tests

## What it does
1. Analyzes code to test
2. Generates test cases
3. Creates test files
4. Runs tests
5. Reports coverage
6. Suggests improvements

## Example
```
/test mobile lib/features/flows/
/test backend app/api/v1/flows.py
/test web app/flows/page.tsx
/test e2e user-workout-flow
```

## Test Types
- Unit tests
- Widget tests (Flutter)
- Component tests (React)
- Integration tests
- API tests
- E2E tests
