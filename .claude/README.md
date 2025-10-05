# 🤖 Configuration Claude Code - Flowz

Configuration optimale de Claude Code pour le développement solo de Flowz.

## 📚 Documentation

- **[Guide de Développement](./DEVELOPMENT_GUIDE.md)** - Guide complet d'utilisation
- **[Shortcuts](./shortcuts.md)** - Commandes rapides
- **[Config](./config.json)** - Configuration hooks et settings

## 🎯 Slash Commands Disponibles

| Commande | Description | Exemple |
|----------|-------------|---------|
| `/new-feature` | Créer une fonctionnalité complète | `/new-feature workout-timer "Real-time workout timer"` |
| `/fix-bug` | Débugger et corriger | `/fix-bug "API returns 500 on /flows"` |
| `/refactor` | Refactoriser du code | `/refactor mobile/lib/features/flows/ extract-widgets` |
| `/test` | Générer et exécuter tests | `/test mobile lib/features/flows/` |
| `/deploy` | Déployer en production | `/deploy staging` |
| `/update-deps` | Mettre à jour dépendances | `/update-deps mobile` |

## 🤖 Sub-Agents IA Autonomes (VRAIS AGENTS)

**Les sub-agents sont des instances autonomes de Claude qui travaillent en parallèle!**

📖 **Guide Complet**: [.claude/SUBAGENTS_GUIDE.md](.claude/SUBAGENTS_GUIDE.md)

### Agents Disponibles (9)

1. **Feature Builder** 🏗️ - Construit features complètes (mobile + web + backend)
2. **Bug Hunter** 🔍 - Trouve et corrige bugs multi-fichiers
3. **Code Searcher** 🔎 - Recherche code (AUTO-ACTIVÉ)
4. **Test Generator** 🧪 - Génère tests complets
5. **Refactor Master** ♻️ - Refactoring intelligent
6. **Performance Analyzer** ⚡ - Optimisation performance
7. **DB Architect** 🗄️ - Gestion DB et migrations
8. **Security Scanner** 🔐 - Audit de sécurité
9. **Deployment Manager** 🚀 - Déploiements automatisés

### Utilisation Rapide

```bash
# Un seul agent
Launch bug-hunter agent to fix: [paste error]

# Parallèle (3 agents simultanés!)
Launch 3 agents in parallel to create user profile:
- Agent 1 (backend): API endpoints
- Agent 2 (mobile): Flutter UI
- Agent 3 (web): Next.js pages
```

### Exemple Concret
```
Launch feature-builder agent to create workout history:
- Backend: workout_sessions table + API
- Mobile: History screen with timeline
- Web: Analytics dashboard
- Tests: All layers
```

L'agent travaille **autonomement** et vous rapporte quand c'est fait!

## 📋 Templates de Prompts

### Mobile (Flutter)
```
Create a new mobile feature following mobile-feature.md template
```
Structure:
- Application layer (Riverpod)
- Domain models
- Presentation (UI)
- Tests

### Backend (FastAPI)
```
Create a new API endpoint following backend-api.md template
```
Structure:
- Router
- SQLAlchemy model
- Pydantic schemas
- Service layer

### Web (Next.js)
```
Create a new web page following web-page.md template
```
Structure:
- Server Component
- Metadata
- Loading/Error states
- Client components si nécessaire

## 🚀 Quick Start

### 1. Première Utilisation
```bash
# Ouvrir le projet dans Claude Code
cd /path/to/flowz

# Claude détectera automatiquement la config .claude/
```

### 2. Créer une Fonctionnalité
```
/new-feature user-profile "User profile with settings and preferences"
```

### 3. Corriger un Bug
```
/fix-bug "Mobile app crashes on workout completion"
```

### 4. Déployer
```
/deploy staging
```

## 🎨 Personnalisation

### Ajouter un Nouveau Command
1. Créer `.claude/commands/<name>.md`
2. Définir usage et comportement
3. Documenter avec exemples

### Ajouter un Nouvel Agent
1. Créer `.claude/agents/<name>.md`
2. Définir activation triggers
3. Spécifier checklist et process

### Modifier les Hooks
Éditer `.claude/config.json`:
```json
{
  "hooks": {
    "tool-use-start": {
      "command": "echo 'Custom message'",
      "description": "Your description"
    }
  }
}
```

## 🔧 Fichiers de Configuration

```
.claude/
├── config.json           # Configuration principale
├── commands/            # Slash commands custom
│   ├── new-feature.md
│   ├── fix-bug.md
│   ├── refactor.md
│   ├── test.md
│   ├── deploy.md
│   └── update-deps.md
├── prompts/             # Templates de prompts
│   ├── mobile-feature.md
│   ├── backend-api.md
│   └── web-page.md
├── agents/              # Agents IA spécialisés
│   ├── code-reviewer.md
│   ├── performance-optimizer.md
│   ├── security-auditor.md
│   └── db-migrator.md
├── DEVELOPMENT_GUIDE.md # Guide complet
├── shortcuts.md         # Commandes rapides
└── README.md           # Ce fichier
```

## 💡 Astuces

### 1. Context Is King
Donnez toujours du contexte:
```
❌ "Fix the error"
✅ "Fix the database connection error in backend/app/main.py"
```

### 2. Itérations Courtes
```
First, create the API endpoint
Then, connect the mobile UI
Finally, add error handling
```

### 3. Utiliser les Templates
```
Create a new feature following the mobile-feature template
```

### 4. Combiner les Agents
```
1. Review my authentication code
2. Run security audit
3. Optimize performance
```

## 🎯 Workflows Recommandés

### Feature Development
```mermaid
Plan → Backend → Mobile → Web → Test → Deploy
```
1. `plan feature <name>`
2. `/new-feature <name>`
3. `add tests`
4. `/deploy staging`

### Bug Fixing
```mermaid
Describe → Find → Fix → Test → Verify
```
1. `/fix-bug <description>`
2. Verify fix locally
3. Deploy if critical

### Maintenance
```mermaid
Update → Test → Security → Performance
```
1. `/update-deps`
2. `/test all`
3. `run security audit`
4. `analyze performance`

## 📊 Monitoring & Analytics

### Check Health
```
check project health
```

### Performance Report
```
generate performance report
```

### Security Status
```
check security status
```

## 🆘 Support

### Problème avec Claude Code?
```
I'm having trouble with Claude Code configuration, help me debug
```

### Comprendre la Config?
```
Explain how the .claude/ configuration works
```

### Ajouter une Fonctionnalité?
```
How do I add a custom slash command?
```

---

## 🎉 Prochaines Étapes

1. **Lire** [DEVELOPMENT_GUIDE.md](./DEVELOPMENT_GUIDE.md)
2. **Essayer** les slash commands
3. **Utiliser** les agents IA
4. **Personnaliser** selon vos besoins

**Bon développement avec Claude Code! 🚀**
