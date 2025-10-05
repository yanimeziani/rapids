#!/bin/bash

# RAPIDS Upgrade Script
# Safely upgrades RAPIDS to a new version

set -e

if [ -z "$1" ]; then
    echo "Usage: ./rapids-upgrade.sh <rapids-new-version.zip>"
    exit 1
fi

NEW_PACKAGE="$1"

if [ ! -f "$NEW_PACKAGE" ]; then
    echo "Error: File not found: $NEW_PACKAGE"
    exit 1
fi

echo "🌊 RAPIDS Upgrade Tool"
echo "======================"
echo ""

# Get current version
CURRENT_VERSION=$(grep "version" .claude/settings.local.json | head -1 | grep -o '"[0-9.]*"' | tr -d '"' || echo "unknown")
echo "Current version: $CURRENT_VERSION"
echo "Upgrading from: $NEW_PACKAGE"
echo ""

# Backup first
echo "📦 Creating backup..."
./scripts/rapids-backup.sh
BACKUP_DIR=$(ls -td .rapids-backup-* | head -1)
echo "✅ Backup created: $BACKUP_DIR"
echo ""

# Extract new version to temp
TEMP_DIR=$(mktemp -d)
echo "📦 Extracting new version..."
unzip -q "$NEW_PACKAGE" -d "$TEMP_DIR"

# Find the actual package directory
PACKAGE_DIR=$(find "$TEMP_DIR" -type d -name "rapids-v*" | head -1)

if [ -z "$PACKAGE_DIR" ]; then
    echo "Error: Invalid RAPIDS package"
    exit 1
fi

NEW_VERSION=$(basename "$PACKAGE_DIR" | sed 's/rapids-v//')
echo "New version: $NEW_VERSION"
echo ""

# Merge updates
echo "🔄 Merging updates..."

# Core files (always update)
CORE_FILES=(
    ".claude/config.json"
    ".claude/agents-config.json"
    ".claude/RAPIDS_METHOD.md"
    ".claude/DEVELOPMENT_GUIDE.md"
    ".claude/SUBAGENTS_GUIDE.md"
    ".claude/README.md"
    ".claude/shortcuts.md"
    ".claudeignore"
)

for file in "${CORE_FILES[@]}"; do
    if [ -f "$PACKAGE_DIR/$file" ]; then
        mkdir -p "$(dirname "$file")"
        cp "$PACKAGE_DIR/$file" "$file"
        echo "✅ Updated: $file"
    fi
done

# Scripts (always update)
if [ -d "$PACKAGE_DIR/scripts" ]; then
    cp "$PACKAGE_DIR/scripts/"*.sh scripts/
    chmod +x scripts/*.sh
    echo "✅ Updated: scripts/"
fi

# Restore user customizations from backup
echo ""
echo "🔄 Restoring your customizations..."
if [ -f "$BACKUP_DIR/.claude/settings.local.json" ]; then
    cp "$BACKUP_DIR/.claude/settings.local.json" .claude/settings.local.json
    # Update version in settings
    sed -i.bak "s/\"version\": \".*\"/\"version\": \"$NEW_VERSION\"/" .claude/settings.local.json
    rm -f .claude/settings.local.json.bak
    echo "✅ Restored: settings.local.json (version updated to $NEW_VERSION)"
fi

# Cleanup
rm -rf "$TEMP_DIR"

echo ""
echo "✅ Upgrade complete!"
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "Old version: $CURRENT_VERSION"
echo "New version: $NEW_VERSION"
echo "Backup: $BACKUP_DIR"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "Next steps:"
echo "1. Review changes: git diff .claude/"
echo "2. Test your setup: ./scripts/check-setup.sh"
echo "3. If issues, restore: ./scripts/rapids-restore.sh $BACKUP_DIR"
echo ""
