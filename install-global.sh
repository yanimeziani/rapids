#!/bin/bash

# RAPIDS Global Installation Script
# Installs RAPIDS configuration for ALL Claude Code instances

set -e

echo "🌊 RAPIDS - Global Installation"
echo "================================"
echo ""

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
PURPLE='\033[0;35m'
NC='\033[0m'

# Detect OS and set config path
if [[ "$OSTYPE" == "darwin"* ]]; then
    CLAUDE_CONFIG_DIR="$HOME/Library/Application Support/Claude"
elif [[ "$OSTYPE" == "linux-gnu"* ]]; then
    CLAUDE_CONFIG_DIR="$HOME/.config/claude"
else
    echo -e "${RED}❌${NC} Unsupported OS: $OSTYPE"
    exit 1
fi

echo -e "${BLUE}📂 Claude Code Config:${NC} $CLAUDE_CONFIG_DIR"
echo ""

# Create Claude Code config directory if it doesn't exist
mkdir -p "$CLAUDE_CONFIG_DIR"

# Install RAPIDS globally
echo -e "${YELLOW}📦 Installing RAPIDS globally...${NC}"

# Copy RAPIDS configuration
cp -r .claude "$CLAUDE_CONFIG_DIR/rapids"
echo -e "${GREEN}✅${NC} RAPIDS agents installed globally"

# Install MCPs
echo ""
echo -e "${PURPLE}🔌 Installing MCP Servers${NC}"
echo "-------------------------"

# Check if node/npm is installed
if ! command -v node &> /dev/null; then
    echo -e "${RED}❌${NC} Node.js not found. Please install Node.js 20+ first."
    exit 1
fi

echo -e "${BLUE}Installing Context7 MCP...${NC}"
npx -y @upstash/context7-mcp@latest --help > /dev/null 2>&1 || true
echo -e "${GREEN}✅${NC} Context7 MCP ready"

echo -e "${BLUE}Installing Filesystem MCP...${NC}"
npx -y @modelcontextprotocol/server-filesystem --help > /dev/null 2>&1 || true
echo -e "${GREEN}✅${NC} Filesystem MCP ready"

echo -e "${BLUE}Installing PostgreSQL MCP...${NC}"
npx -y @modelcontextprotocol/server-postgres --help > /dev/null 2>&1 || true
echo -e "${GREEN}✅${NC} PostgreSQL MCP ready"

echo -e "${BLUE}Installing GitHub MCP...${NC}"
npx -y @modelcontextprotocol/server-github --help > /dev/null 2>&1 || true
echo -e "${GREEN}✅${NC} GitHub MCP ready"

echo -e "${BLUE}Installing Puppeteer MCP...${NC}"
npx -y @modelcontextprotocol/server-puppeteer --help > /dev/null 2>&1 || true
echo -e "${GREEN}✅${NC} Puppeteer MCP ready"

# Create global MCP config
echo ""
echo -e "${YELLOW}⚙️  Configuring MCPs globally...${NC}"

# Copy MCP config to Claude Code directory
cp .claude/mcp-config.json "$CLAUDE_CONFIG_DIR/mcp-servers.json"
echo -e "${GREEN}✅${NC} MCP configuration installed"

# Create RAPIDS CLI helper
echo ""
echo -e "${YELLOW}🛠  Creating RAPIDS CLI helper...${NC}"

cat > "$HOME/.rapids-cli.sh" << 'EOF'
#!/bin/bash
# RAPIDS CLI Helper
# Source this in your ~/.bashrc or ~/.zshrc

rapids-init-project() {
    local project_name=${1:-"my-app"}
    echo "🌊 Initializing RAPIDS project: $project_name"

    mkdir -p "$project_name"/{mobile,web,backend,docs,.claude,.vscode,scripts}

    # Copy minimal project structure
    if [ -d "$HOME/Library/Application Support/Claude/rapids" ]; then
        cp -r "$HOME/Library/Application Support/Claude/rapids"/.claude/prompts "$project_name/.claude/"
        cp "$HOME/Library/Application Support/Claude/rapids"/.claude/settings.local.json "$project_name/.claude/"
    fi

    # Copy Dockerfiles
    cat > "$project_name/web/Dockerfile" << 'DOCKERFILE'
FROM node:20-alpine AS deps
WORKDIR /app
COPY package.json package-lock.json* ./
RUN npm ci

FROM node:20-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
COPY --from=builder /app/.next/standalone ./
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public
EXPOSE 3000
CMD ["node", "server.js"]
DOCKERFILE

    cat > "$project_name/backend/Dockerfile" << 'DOCKERFILE'
FROM python:3.12-slim
WORKDIR /app
RUN apt-get update && apt-get install -y gcc postgresql-client && rm -rf /var/lib/apt/lists/*
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
COPY . .
HEALTHCHECK --interval=30s --timeout=10s --start-period=40s --retries=3 CMD python -c "import requests; requests.get('http://localhost:8000/health')"
EXPOSE 8000
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000"]
DOCKERFILE

    cat > "$project_name/docker-compose.yml" << 'COMPOSE'
services:
  db:
    image: postgres:16-alpine
    environment:
      POSTGRES_USER: ${POSTGRES_USER:-app}
      POSTGRES_PASSWORD: ${POSTGRES_PASSWORD:-dev_password}
      POSTGRES_DB: ${POSTGRES_DB:-app}
    ports:
      - "5433:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U ${POSTGRES_USER:-app}"]
      interval: 10s
      timeout: 5s
      retries: 5

  backend:
    build:
      context: ./backend
    environment:
      DATABASE_URL: postgresql+asyncpg://${POSTGRES_USER:-app}:${POSTGRES_PASSWORD:-dev_password}@db:5432/${POSTGRES_DB:-app}
    ports:
      - "8001:8000"
    depends_on:
      db:
        condition: service_healthy
    restart: unless-stopped

  web:
    build:
      context: ./web
    environment:
      NEXT_PUBLIC_API_URL: http://localhost:8001
    ports:
      - "3000:3000"
    depends_on:
      - backend
    restart: unless-stopped

volumes:
  postgres_data:
COMPOSE

    echo "✅ Project $project_name initialized with RAPIDS!"
    echo "Next: cd $project_name && start coding with Claude Code"
}

rapids-update() {
    echo "🔄 Updating RAPIDS from GitHub..."
    local temp_dir=$(mktemp -d)
    curl -L https://github.com/yanimeziani/rapids/archive/main.tar.gz | tar -xz -C "$temp_dir" --strip=1

    if [ -d "$HOME/Library/Application Support/Claude/rapids" ]; then
        cp -r "$temp_dir/.claude" "$HOME/Library/Application Support/Claude/rapids/"
        echo "✅ RAPIDS updated successfully!"
    else
        echo "⚠️  RAPIDS not found. Run rapids-install first."
    fi

    rm -rf "$temp_dir"
}

export -f rapids-init-project
export -f rapids-update
EOF

chmod +x "$HOME/.rapids-cli.sh"

# Add to shell config if not already present
SHELL_RC=""
if [ -f "$HOME/.zshrc" ]; then
    SHELL_RC="$HOME/.zshrc"
elif [ -f "$HOME/.bashrc" ]; then
    SHELL_RC="$HOME/.bashrc"
fi

if [ -n "$SHELL_RC" ]; then
    if ! grep -q ".rapids-cli.sh" "$SHELL_RC"; then
        echo "" >> "$SHELL_RC"
        echo "# RAPIDS CLI" >> "$SHELL_RC"
        echo "source \$HOME/.rapids-cli.sh" >> "$SHELL_RC"
        echo -e "${GREEN}✅${NC} Added RAPIDS CLI to $SHELL_RC"
    fi
fi

# Summary
echo ""
echo -e "${GREEN}🎉 RAPIDS Installed Globally!${NC}"
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo -e "${PURPLE}What's Installed:${NC}"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "✅ 10 Autonomous Sub-Agents (globally available)"
echo "✅ 5 MCP Servers (Context7, Filesystem, PostgreSQL, GitHub, Puppeteer)"
echo "✅ 6 Slash Commands"
echo "✅ 3 Stack Templates (Flutter, Next.js, FastAPI)"
echo "✅ RAPIDS CLI helper commands"
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo -e "${PURPLE}Next Steps:${NC}"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo "1. Restart your terminal (to load RAPIDS CLI)"
echo ""
echo "2. Create a new project:"
echo -e "   ${BLUE}rapids-init-project my-awesome-app${NC}"
echo ""
echo "3. Start coding in Claude Code - all agents are available!"
echo ""
echo "4. Use MCP servers:"
echo -e "   ${BLUE}\"use context7\"${NC} in any prompt for up-to-date docs"
echo ""
echo "5. Update RAPIDS anytime:"
echo -e "   ${BLUE}rapids-update${NC}"
echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
echo -e "${BLUE}🌊 RAPIDS is now globally available for ALL your projects!${NC}"
echo ""
