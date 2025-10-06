# /maid - Safe Directory Cleanup

Tidies up project directories without breaking anything. Removes unnecessary files, organizes code, and optimizes project structure.

## Usage
```
/maid <target> <level>
```

## Cleanup Levels
- `light` - Safe cleanup only (build artifacts, temp files, caches)
- `medium` - Includes unused dependencies and dead code
- `deep` - Full cleanup with reorganization (requires confirmation)

## Default Target
If no target specified, runs on current working directory with `light` level.

## Examples
```
/maid                              # Light cleanup of current directory
/maid . light                      # Same as above
/maid backend/ medium             # Medium cleanup of backend
/maid . deep                      # Deep cleanup of entire project
```

## What Gets Cleaned (by level)

### Light (Always Safe)
- Build artifacts: `dist/`, `build/`, `.next/`, `out/`
- Temporary files: `*.tmp`, `*.temp`, `*.log`, `.DS_Store`
- Cache directories: `.cache/`, `__pycache__/`, `.pytest_cache/`
- Test coverage: `coverage/`, `.coverage`, `htmlcov/`
- IDE files: `.vscode/`, `.idea/` (if not in .gitignore)
- Dependency caches: `.flutter-plugins-dependencies`, `node_modules/.cache/`
- Docker build cache: Check and suggest `docker system prune`

### Medium (Requires Analysis)
- Unused dependencies: Analyze package.json, requirements.txt, pubspec.yaml
- Dead code: Functions/classes not referenced anywhere
- Duplicate files: Same content, different names
- Oversized files: Images/assets that should be optimized
- Commented-out code blocks (>10 lines)
- Empty directories

### Deep (Requires Confirmation)
- Reorganize file structure to match best practices
- Move misplaced files to correct directories
- Consolidate duplicate utilities
- Update import paths after moves
- Refactor inconsistent naming

## Safety Rules
1. **NEVER delete** without user confirmation for medium/deep
2. **ALWAYS check** .gitignore before removing
3. **NEVER touch** source control directories (.git/)
4. **NEVER delete** configuration files (package.json, etc.)
5. **ALWAYS create** backup list before deep cleanup
6. **VERIFY** tests pass after cleanup
7. **SKIP** files with uncommitted git changes

## Process
1. Scan target directory
2. Identify cleanup candidates
3. Show summary of what will be removed
4. Ask for confirmation (medium/deep only)
5. Perform cleanup operations
6. Report results and space saved
7. Run tests to verify nothing broke

## Stack-Specific Cleanup

### Flutter (mobile/)
- `.flutter-plugins`, `.flutter-plugins-dependencies`
- `android/app/build/`, `ios/Pods/`, `ios/.symlinks/`
- `*.g.dart` generated files (if stale)

### Next.js (web/)
- `.next/`, `out/`, `.vercel/`
- `node_modules/.cache/`
- Turbopack cache

### FastAPI (backend/)
- `__pycache__/`, `*.pyc`, `*.pyo`
- `.pytest_cache/`, `.mypy_cache/`
- `venv/`, `env/` (if misconfigured)

### Docker
- Unused volumes: `docker volume ls`
- Dangling images: `docker image prune`
- Build cache: `docker builder prune`

## Output
Shows:
- Number of files removed
- Disk space freed
- Suggestions for further optimization
- Any warnings or items that need manual review

## Pro Tips
- Run `/maid . light` before every commit
- Use `/maid backend/ medium` after removing features
- Schedule deep cleanup monthly
- Always commit before running deep cleanup
