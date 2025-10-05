#!/bin/bash

# RAPIDS Backup Script
# Backs up your customizations before upgrade

set -e

BACKUP_DIR=".rapids-backup-$(date +%Y%m%d-%H%M%S)"

echo "🌊 RAPIDS - Backup Customizations"
echo "==================================="
echo ""

# Create backup directory
mkdir -p "$BACKUP_DIR"

echo "📦 Backing up customizations to: $BACKUP_DIR"
echo ""

# Files to backup (user customizations)
CUSTOM_FILES=(
    ".claude/settings.local.json"
    ".claude/commands/*.md"
    ".claude/agents/*.md"
    ".claude/prompts/*.md"
    ".vscode/settings.json"
)

# Backup each file
for pattern in "${CUSTOM_FILES[@]}"; do
    for file in $pattern; do
        if [ -f "$file" ]; then
            # Create directory structure
            dir=$(dirname "$file")
            mkdir -p "$BACKUP_DIR/$dir"

            # Copy file
            cp "$file" "$BACKUP_DIR/$file"
            echo "✅ Backed up: $file"
        fi
    done
done

# Create manifest
cat > "$BACKUP_DIR/MANIFEST.txt" << EOF
RAPIDS Backup Manifest
=====================
Date: $(date)
Project: $(basename "$PWD")

Files backed up:
$(find "$BACKUP_DIR" -type f ! -name "MANIFEST.txt")

Restore with:
./scripts/rapids-restore.sh $BACKUP_DIR
EOF

echo ""
echo "✅ Backup complete: $BACKUP_DIR"
echo ""
echo "To restore:"
echo "  ./scripts/rapids-restore.sh $BACKUP_DIR"
