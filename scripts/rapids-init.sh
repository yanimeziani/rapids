#!/bin/bash

# RAPIDS Method Initialization Script
# Configures a new project with RAPIDS methodology

set -e

echo "🌊 RAPIDS Method - Initialization"
echo "=================================="
echo ""

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
PURPLE='\033[0;35m'
NC='\033[0m'

# Check if .claude/ exists
if [ -d ".claude" ]; then
    echo -e "${GREEN}✅${NC} RAPIDS already initialized"
else
    echo -e "${RED}❌${NC} .claude/ directory not found"
    echo "Please extract RAPIDS package first"
    exit 1
fi

# Project name (from directory)
PROJECT_NAME=$(basename "$PWD")

echo -e "${BLUE}📦 Project:${NC} $PROJECT_NAME"
echo ""

# Interactive configuration
echo -e "${PURPLE}🔧 Configuration${NC}"
echo "----------------"

# Ask for project details
read -p "Project Name [$PROJECT_NAME]: " input_name
PROJECT_NAME=${input_name:-$PROJECT_NAME}

read -p "Project Website (e.g., myapp.com): " PROJECT_WEBSITE
read -p "DocPloy URL (e.g., docploy.meziani.org): " DOCPLOY_URL

echo ""
echo -e "${BLUE}📱 Stack Configuration${NC}"
echo "----------------------"

# Mobile
read -p "Mobile Framework [Flutter]: " MOBILE_FRAMEWORK
MOBILE_FRAMEWORK=${MOBILE_FRAMEWORK:-Flutter}

read -p "State Management [Riverpod]: " STATE_MGMT
STATE_MGMT=${STATE_MGMT:-Riverpod}

# Web
read -p "Web Framework [Next.js]: " WEB_FRAMEWORK
WEB_FRAMEWORK=${WEB_FRAMEWORK:-Next.js}

# Backend
read -p "Backend Framework [FastAPI]: " BACKEND_FRAMEWORK
BACKEND_FRAMEWORK=${BACKEND_FRAMEWORK:-FastAPI}

read -p "Database [PostgreSQL]: " DATABASE
DATABASE=${DATABASE:-PostgreSQL}

echo ""
echo -e "${YELLOW}📝 Updating configuration...${NC}"

# Update settings.local.json
cat > .claude/settings.local.json << EOF
{
  "project": {
    "name": "$PROJECT_NAME",
    "version": "1.0.0",
    "description": "Built with RAPIDS Method",
    "website": "https://$PROJECT_WEBSITE",
    "deployment": {
      "staging": "https://staging.$PROJECT_WEBSITE",
      "production": "https://$PROJECT_WEBSITE",
      "docploy": "https://$DOCPLOY_URL"
    }
  },
  "stack": {
    "mobile": {
      "framework": "$MOBILE_FRAMEWORK",
      "stateManagement": "$STATE_MGMT",
      "routing": "Go Router"
    },
    "web": {
      "framework": "$WEB_FRAMEWORK",
      "version": "15+",
      "runtime": "React 18",
      "styling": "CSS-in-JS"
    },
    "backend": {
      "framework": "$BACKEND_FRAMEWORK",
      "language": "Python 3.12+",
      "database": "$DATABASE",
      "orm": "SQLAlchemy"
    },
    "infrastructure": {
      "containerization": "Docker Compose",
      "hosting": "DocPloy"
    }
  },
  "ports": {
    "backend": 8001,
    "web": 3000,
    "database": 5433
  },
  "ai_agents": {
    "feature_builder": { "enabled": true },
    "bug_hunter": { "enabled": true },
    "code_searcher": { "enabled": true, "auto_activate": true },
    "test_generator": { "enabled": true },
    "refactor_master": { "enabled": true },
    "performance_analyzer": { "enabled": true },
    "db_architect": { "enabled": true },
    "security_scanner": { "enabled": true },
    "deployment_manager": { "enabled": true }
  },
  "development": {
    "auto_format": true,
    "auto_save": true,
    "lint_on_save": true,
    "test_on_change": false
  },
  "rapids": {
    "version": "1.0",
    "initialized": "$(date -u +"%Y-%m-%dT%H:%M:%SZ")"
  }
}
EOF

echo -e "${GREEN}✅${NC} Configuration updated"
echo ""

# Create .gitignore for RAPIDS if needed
if [ ! -f ".gitignore" ]; then
    echo -e "${YELLOW}📝 Creating .gitignore...${NC}"
    cat > .gitignore << 'EOF'
# RAPIDS - Standard .gitignore

# Dependencies
node_modules/
.npm/
mobile/.dart_tool/
mobile/.pub-cache/
mobile/build/

# Build outputs
web/.next/
web/out/
*.pyc
__pycache__/

# Environment
.env
.env.local
.env.*.local

# IDE
.vscode/
.idea/
*.swp

# OS
.DS_Store

# Docker
postgres_data/
EOF
    echo -e "${GREEN}✅${NC} .gitignore created"
fi

# Initialize git if not already
if [ ! -d ".git" ]; then
    echo -e "${YELLOW}📝 Initializing git...${NC}"
    git init
    echo -e "${GREEN}✅${NC} Git initialized"
fi

# Create initial commit
if ! git rev-parse HEAD > /dev/null 2>&1; then
    echo -e "${YELLOW}📝 Creating initial commit...${NC}"
    git add .
    git commit -m "feat: Initialize project with RAPIDS Method v1.0

- Configure Claude Code with 9 sub-agents
- Set up Flutter mobile + Next.js web + FastAPI backend
- DocPloy deployment configuration
- VSCode integration

Built with RAPIDS (Reusable Agent-Powered Intelligence Development System)"
    echo -e "${GREEN}✅${NC} Initial commit created"
fi

# Run setup verification
echo ""
echo -e "${BLUE}🔍 Verifying installation...${NC}"
if [ -f "./scripts/check-setup.sh" ]; then
    ./scripts/check-setup.sh
else
    echo -e "${YELLOW}⚠️${NC}  check-setup.sh not found, skipping verification"
fi

echo ""
echo -e "${GREEN}🎉 RAPIDS Initialization Complete!${NC}"
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo -e "${PURPLE}Next Steps:${NC}"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "1. 📚 Read the guides:"
echo "   cat .claude/RAPIDS_METHOD.md"
echo "   cat .claude/DEVELOPMENT_GUIDE.md"
echo ""
echo "2. 🚀 Start Docker services:"
echo "   docker compose up -d"
echo ""
echo "3. 🤖 Try your first sub-agent:"
echo '   "Launch code-searcher agent to analyze project structure"'
echo ""
echo "4. 🏗️  Create your first feature:"
echo '   "/new-feature user-profile \"User profile with settings\""'
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo -e "${BLUE}🌊 Happy coding with RAPIDS!${NC}"
echo ""
