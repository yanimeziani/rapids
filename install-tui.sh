#!/bin/bash

# RAPIDS v2.1 - Interactive TUI Installer
# Uses Ink by Vadim Demedes for beautiful terminal UI

set -e

echo "🌊 RAPIDS v2.1 - Interactive Installation"
echo "=========================================="
echo ""

# Check Node.js
if ! command -v node &> /dev/null; then
    echo "❌ Node.js not found. Please install Node.js 20+ first."
    echo "   Install with: brew install node"
    exit 1
fi

# Check version
NODE_VERSION=$(node -v | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 20 ]; then
    echo "❌ Node.js 20+ required. Current version: $(node -v)"
    echo "   Update with: brew upgrade node"
    exit 1
fi

# Install dependencies if needed
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install --silent
    echo ""
fi

# Run the beautiful Ink TUI installer
echo "🎨 Launching interactive installer..."
echo ""
node --import tsx/esm cli/install.js
