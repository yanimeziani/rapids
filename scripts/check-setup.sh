#!/bin/bash

# Flowz Setup Verification Script
# Vérifie que toute la configuration Claude Code est en place

set -e

echo "🔍 Vérification de la configuration Flowz + Claude Code"
echo "=================================================="
echo ""

# Couleurs
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Fonction de vérification
check_file() {
    if [ -f "$1" ]; then
        echo -e "${GREEN}✅${NC} $1"
        return 0
    else
        echo -e "${RED}❌${NC} $1 (manquant)"
        return 1
    fi
}

check_dir() {
    if [ -d "$1" ]; then
        echo -e "${GREEN}✅${NC} $1/"
        return 0
    else
        echo -e "${RED}❌${NC} $1/ (manquant)"
        return 1
    fi
}

# Compteurs
total=0
passed=0

# 1. Structure Projet
echo -e "${BLUE}📁 Structure du Projet${NC}"
echo "------------------------"
for dir in mobile web backend docs .claude .vscode; do
    total=$((total+1))
    if check_dir "$dir"; then
        passed=$((passed+1))
    fi
done
echo ""

# 2. Configuration Claude Code
echo -e "${BLUE}🤖 Configuration Claude Code${NC}"
echo "-----------------------------"
claude_files=(
    ".claude/config.json"
    ".claude/README.md"
    ".claude/DEVELOPMENT_GUIDE.md"
    ".claude/shortcuts.md"
    ".claudeignore"
)
for file in "${claude_files[@]}"; do
    total=$((total+1))
    if check_file "$file"; then
        passed=$((passed+1))
    fi
done
echo ""

# 3. Slash Commands
echo -e "${BLUE}⚡ Slash Commands${NC}"
echo "----------------"
commands=(
    ".claude/commands/new-feature.md"
    ".claude/commands/fix-bug.md"
    ".claude/commands/refactor.md"
    ".claude/commands/test.md"
    ".claude/commands/deploy.md"
    ".claude/commands/update-deps.md"
)
for cmd in "${commands[@]}"; do
    total=$((total+1))
    if check_file "$cmd"; then
        passed=$((passed+1))
    fi
done
echo ""

# 4. Agents IA
echo -e "${BLUE}🔮 Agents IA${NC}"
echo "------------"
agents=(
    ".claude/agents/code-reviewer.md"
    ".claude/agents/performance-optimizer.md"
    ".claude/agents/security-auditor.md"
    ".claude/agents/db-migrator.md"
)
for agent in "${agents[@]}"; do
    total=$((total+1))
    if check_file "$agent"; then
        passed=$((passed+1))
    fi
done
echo ""

# 5. Templates
echo -e "${BLUE}📝 Templates de Prompts${NC}"
echo "-----------------------"
templates=(
    ".claude/prompts/mobile-feature.md"
    ".claude/prompts/backend-api.md"
    ".claude/prompts/web-page.md"
)
for template in "${templates[@]}"; do
    total=$((total+1))
    if check_file "$template"; then
        passed=$((passed+1))
    fi
done
echo ""

# 6. VSCode
echo -e "${BLUE}⚙️  Configuration VSCode${NC}"
echo "-----------------------"
vscode_files=(
    ".vscode/settings.json"
    ".vscode/extensions.json"
    ".vscode/tasks.json"
    ".vscode/launch.json"
)
for file in "${vscode_files[@]}"; do
    total=$((total+1))
    if check_file "$file"; then
        passed=$((passed+1))
    fi
done
echo ""

# 7. Docker
echo -e "${BLUE}🐳 Docker Services${NC}"
echo "------------------"
if command -v docker &> /dev/null; then
    echo -e "${GREEN}✅${NC} Docker installé"
    passed=$((passed+1))

    if docker compose ps &> /dev/null; then
        services=$(docker compose ps --format "{{.Service}}" 2>/dev/null | wc -l)
        if [ "$services" -gt 0 ]; then
            echo -e "${GREEN}✅${NC} Services Docker en cours: $services"
            docker compose ps --format "table {{.Service}}\t{{.Status}}" | tail -n +2 | while read line; do
                echo "   → $line"
            done
            passed=$((passed+1))
        else
            echo -e "${YELLOW}⚠️${NC}  Services Docker arrêtés (exécuter: docker compose up -d)"
        fi
    fi
else
    echo -e "${RED}❌${NC} Docker non installé"
fi
total=$((total+2))
echo ""

# 8. Documentation
echo -e "${BLUE}📚 Documentation${NC}"
echo "----------------"
docs=(
    "README.md"
    "SETUP_COMPLETE.md"
    "docs/PRD.md"
)
for doc in "${docs[@]}"; do
    total=$((total+1))
    if check_file "$doc"; then
        passed=$((passed+1))
    fi
done
echo ""

# Résumé
echo "=================================================="
percentage=$((passed * 100 / total))
echo -e "Résultat: ${GREEN}$passed${NC}/$total vérifications passées (${percentage}%)"
echo ""

if [ $percentage -eq 100 ]; then
    echo -e "${GREEN}🎉 Configuration complète et opérationnelle!${NC}"
    echo ""
    echo "Prochaines étapes:"
    echo "1. Lire: cat .claude/README.md"
    echo "2. Essayer: /new-feature test-feature 'Simple test'"
    echo "3. Démarrer: docker compose up -d"
elif [ $percentage -ge 80 ]; then
    echo -e "${YELLOW}⚠️  Configuration presque complète${NC}"
    echo "Vérifiez les éléments manquants ci-dessus"
else
    echo -e "${RED}❌ Configuration incomplète${NC}"
    echo "Plusieurs éléments manquent, vérifiez l'installation"
fi

echo ""
echo "Pour plus d'aide: cat .claude/DEVELOPMENT_GUIDE.md"
