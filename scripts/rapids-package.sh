#!/bin/bash

# RAPIDS Packager
# Creates distributable RAPIDS package

set -e

VERSION="1.0"
PACKAGE_NAME="rapids-v${VERSION}"
OUTPUT_FILE="${PACKAGE_NAME}.zip"

echo "🌊 RAPIDS Packager v${VERSION}"
echo "=============================="
echo ""

# Create temporary directory
TEMP_DIR=$(mktemp -d)
PACKAGE_DIR="$TEMP_DIR/$PACKAGE_NAME"

mkdir -p "$PACKAGE_DIR"

echo "📦 Creating package structure..."
echo ""

# Copy RAPIDS files
echo "Copying configuration files..."
cp -r .claude "$PACKAGE_DIR/"
cp -r .vscode "$PACKAGE_DIR/"
cp .claudeignore "$PACKAGE_DIR/"

# Copy scripts
echo "Copying scripts..."
mkdir -p "$PACKAGE_DIR/scripts"
cp scripts/rapids-*.sh "$PACKAGE_DIR/scripts/"
cp scripts/check-setup.sh "$PACKAGE_DIR/scripts/"
chmod +x "$PACKAGE_DIR/scripts/"*.sh

# Copy documentation
echo "Copying documentation..."
cp README.md "$PACKAGE_DIR/"
cp SETUP_COMPLETE.md "$PACKAGE_DIR/"

# Create package README
cat > "$PACKAGE_DIR/README.txt" << 'EOF'
🌊 RAPIDS Method Package
========================

Quick Installation:
1. Extract this package into your project root
2. Run: ./scripts/rapids-init.sh
3. Follow the prompts
4. Start using Claude Code with sub-agents!

Full documentation:
- .claude/RAPIDS_METHOD.md
- .claude/DEVELOPMENT_GUIDE.md
- SETUP_COMPLETE.md

Stack Support:
- Flutter (mobile)
- Next.js 15+ (web)
- FastAPI (backend)
- PostgreSQL (database)
- DocPloy (deployment)

Version: 1.0
License: MIT
EOF

# Create install script at root
cat > "$PACKAGE_DIR/install.sh" << 'EOF'
#!/bin/bash
echo "🌊 Installing RAPIDS..."
chmod +x scripts/*.sh
./scripts/rapids-init.sh
EOF
chmod +x "$PACKAGE_DIR/install.sh"

# Remove any local/sensitive data
echo "Cleaning sensitive data..."
rm -f "$PACKAGE_DIR/.claude/settings.local.json"
rm -f "$PACKAGE_DIR/.env"*

# Create default settings template
cat > "$PACKAGE_DIR/.claude/settings.local.json.template" << 'EOF'
{
  "project": {
    "name": "YourProject",
    "version": "1.0.0",
    "description": "Built with RAPIDS Method",
    "website": "https://yourproject.com",
    "deployment": {
      "staging": "https://staging.yourproject.com",
      "production": "https://yourproject.com",
      "docploy": "https://docploy.yourserver.com"
    }
  },
  "stack": {
    "mobile": {
      "framework": "Flutter",
      "stateManagement": "Riverpod",
      "routing": "Go Router"
    },
    "web": {
      "framework": "Next.js",
      "version": "15+",
      "runtime": "React 18"
    },
    "backend": {
      "framework": "FastAPI",
      "language": "Python 3.12+",
      "database": "PostgreSQL",
      "orm": "SQLAlchemy"
    }
  },
  "rapids": {
    "version": "1.0"
  }
}
EOF

# Create zip
echo ""
echo "📦 Creating zip archive..."
cd "$TEMP_DIR"
zip -r "$OUTPUT_FILE" "$PACKAGE_NAME" -q

# Move to current directory
mv "$OUTPUT_FILE" "$OLDPWD/"

# Cleanup
rm -rf "$TEMP_DIR"

# Get file size
SIZE=$(ls -lh "$OUTPUT_FILE" | awk '{print $5}')

echo ""
echo "✅ Package created successfully!"
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "📦 File: $OUTPUT_FILE"
echo "📊 Size: $SIZE"
echo "🏷️  Version: $VERSION"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "Distribution:"
echo "1. Upload to your server/repo"
echo "2. Share with: curl -L https://yourserver.com/$OUTPUT_FILE -o rapids.zip"
echo "3. Users extract and run: ./install.sh"
echo ""
echo "Package contents:"
unzip -l "$OUTPUT_FILE" | head -30
echo ""
