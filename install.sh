#!/bin/bash

echo "🌊 RAPIDS v1.0 - Quick Installer"
echo "================================="
echo ""

# Make scripts executable
chmod +x scripts/*.sh 2>/dev/null

# Run init if available
if [ -f "scripts/rapids-init.sh" ]; then
    ./scripts/rapids-init.sh
else
    echo "✅ RAPIDS files copied to your project"
    echo ""
    echo "Next steps:"
    echo "1. Read: cat .claude/RAPIDS_METHOD.md"
    echo "2. Verify: ./scripts/check-setup.sh"
    echo "3. Start coding with Claude Code!"
fi
