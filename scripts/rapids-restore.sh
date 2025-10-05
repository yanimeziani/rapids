#!/bin/bash

# RAPIDS Restore Script
# Restores customizations from backup

set -e

if [ -z "$1" ]; then
    echo "Usage: ./rapids-restore.sh <backup-directory>"
    echo ""
    echo "Available backups:"
    ls -td .rapids-backup-* 2>/dev/null || echo "  No backups found"
    exit 1
fi

BACKUP_DIR="$1"

if [ ! -d "$BACKUP_DIR" ]; then
    echo "Error: Backup directory not found: $BACKUP_DIR"
    exit 1
fi

echo "🌊 RAPIDS Restore"
echo "================="
echo ""
echo "Restoring from: $BACKUP_DIR"
echo ""

# Show what will be restored
if [ -f "$BACKUP_DIR/MANIFEST.txt" ]; then
    echo "Manifest:"
    cat "$BACKUP_DIR/MANIFEST.txt"
    echo ""
fi

read -p "Continue with restore? (y/N) " -n 1 -r
echo
if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo "Restore cancelled"
    exit 0
fi

# Restore files
echo "Restoring files..."
rsync -av "$BACKUP_DIR/.claude/" .claude/ 2>/dev/null || true
rsync -av "$BACKUP_DIR/.vscode/" .vscode/ 2>/dev/null || true

echo ""
echo "✅ Restore complete!"
echo ""
echo "Files restored from: $BACKUP_DIR"
