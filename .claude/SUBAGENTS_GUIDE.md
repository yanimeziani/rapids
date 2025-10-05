# 🤖 Guide des Sub-Agents Claude Code - Flowz

Guide complet pour utiliser les **vrais sub-agents** de Claude Code pour un développement ultra-efficace.

## 🎯 Qu'est-ce qu'un Sub-Agent ?

Un sub-agent est une **instance autonome de Claude** qui peut exécuter des tâches complexes multi-étapes **en parallèle** pendant que vous continuez à travailler.

### Différence Clé
```
❌ Documentation (.claude/agents/*.md)
   → Juste des guides de style
   → Pas d'exécution automatique
   → Nécessite copier-coller

✅ Vrais Sub-Agents (Task tool)
   → Exécution autonome
   → Travail en parallèle
   → Retours automatiques
```

## 🚀 Sub-Agents Disponibles pour Flowz

### 1. **Feature Builder** 🏗️
Construit une feature complète (mobile + web + backend).

**Utilisation:**
```
Launch feature-builder agent to create user authentication:
- Google Sign-In
- JWT backend
- Mobile UI with token storage
- Web session management
```

**Ce qu'il fait:**
1. Crée les endpoints backend
2. Crée l'UI mobile Flutter
3. Crée les pages web Next.js
4. Génère tous les tests
5. Met à jour la doc

**Quand l'utiliser:**
- Feature complète multi-couches
- Intégration complexe
- Nouveau module complet

---

### 2. **Bug Hunter** 🔍
Trouve et corrige les bugs dans toute la codebase.

**Utilisation:**
```
Launch bug-hunter agent to fix:
Error: Backend returns 500 on POST /api/v1/flows
Stack trace: [paste trace here]
```

**Ce qu'il fait:**
1. Recherche patterns d'erreur (Grep)
2. Trouve fichiers liés (Glob)
3. Lit le code pertinent
4. Identifie la cause
5. Implémente le fix
6. Ajoute tests de régression

**Quand l'utiliser:**
- Bugs complexes multi-fichiers
- Erreurs intermittentes
- Problèmes de performance

---

### 3. **Code Searcher** 🔎
Recherche et analyse le code (AUTO-ACTIVÉ).

**Utilisation:**
```
Find all places where we handle workout session state
Show me how authentication works
Where is the flow state machine implemented?
```

**Ce qu'il fait:**
- Grep intensif pour patterns
- Glob pour fichiers
- Analyse de dépendances
- Mapping de relations

**Quand l'utiliser:**
- Explorer code inconnu
- Tracer implémentations
- Comprendre architecture

---

### 4. **Test Generator** 🧪
Génère des tests complets.

**Utilisation:**
```
Launch test-generator agent for features/workout module:
- Flutter widget tests
- Next.js component tests
- FastAPI endpoint tests
- E2E flow tests
```

**Ce qu'il fait:**
1. Analyse le code à tester
2. Génère cas de test
3. Crée fichiers de test
4. Exécute les tests
5. Rapport de coverage

**Quand l'utiliser:**
- Nouvelle feature sans tests
- Améliorer coverage
- Tests de régression

---

### 5. **Refactor Master** ♻️
Refactoring intelligent et sûr.

**Utilisation:**
```
Launch refactor-master agent on mobile/lib/features/flows/:
Strategy: Extract reusable widgets and simplify complexity
```

**Ce qu'il fait:**
1. Comprend le code actuel
2. Identifie opportunités
3. Planifie les étapes
4. Applique changements
5. Teste après chaque étape

**Quand l'utiliser:**
- Code smell important
- Duplication excessive
- Complexité élevée

---

### 6. **Performance Analyzer** ⚡
Optimisation de performance.

**Utilisation:**
```
Launch performance-analyzer agent on flows screen:
Issue: Loading 100+ flows causes lag and freezes
Analyze mobile + backend performance
```

**Ce qu'il fait:**
1. Profile l'app
2. Identifie bottlenecks
3. Propose solutions
4. Implémente optimisations
5. Mesure améliorations

**Quand l'utiliser:**
- Lenteur perceptible
- Pics de mémoire
- Queries DB lentes

---

### 7. **DB Architect** 🗄️
Gestion de schéma et migrations.

**Utilisation:**
```
Launch db-architect agent to:
Add workout_analytics table with user_id, flow_id, metrics JSONB, created_at
Generate migration with rollback
```

**Ce qu'il fait:**
1. Analyse schéma actuel
2. Design nouveaux changements
3. Crée migration Alembic
4. Script de rollback
5. Test local

**Quand l'utiliser:**
- Changements de schéma
- Nouvelles tables
- Modifications complexes

---

### 8. **Security Scanner** 🔐
Audit de sécurité complet.

**Utilisation:**
```
Launch security-scanner agent for full audit:
- Check authentication flow
- Scan dependencies
- Verify input validation
- Review API security
```

**Ce qu'il fait:**
1. Scan auth/authorization
2. Check input validation
3. Vérifie data protection
4. Analyse dependencies
5. Rapport avec severity

**Quand l'utiliser:**
- Avant release production
- Après refactoring auth
- Audit périodique

---

### 9. **Deployment Manager** 🚀
Gestion des déploiements.

**Utilisation:**
```
Launch deployment-manager agent to deploy to staging:
- Run all pre-checks
- Build and push images
- Deploy to DocPloy
- Verify health
```

**Ce qu'il fait:**
1. Pre-deployment checks
2. Build Docker images
3. Tag versions
4. Deploy to DocPloy
5. Health checks
6. Monitoring

**Quand l'utiliser:**
- Déploiement staging/prod
- Release importantes
- Rollback nécessaire

---

## 🔥 Exécution en Parallèle

Une des **forces majeures** des sub-agents : le **parallélisme**.

### Exemple 1: Créer Feature Complète
```
Launch 3 agents in parallel to create workout timer feature:

Agent 1 (backend): Create API endpoints for timer sessions
Agent 2 (mobile): Create Flutter timer UI with Riverpod
Agent 3 (web): Create Next.js timer display page

Run them simultaneously and report back when all done.
```

### Exemple 2: Tests Multi-Plateformes
```
Run tests in parallel across all platforms:

Agent 1: Flutter tests
Agent 2: Next.js tests
Agent 3: FastAPI tests

Report combined results.
```

### Exemple 3: Performance Full Stack
```
Analyze performance in parallel:

Agent 1: Mobile app profiling
Agent 2: Web bundle analysis
Agent 3: Backend query optimization

Provide unified performance report.
```

## 📋 Quand Utiliser des Sub-Agents

### ✅ TOUJOURS utiliser pour:
- Features touchant mobile + web + backend
- Recherches complexes multi-fichiers
- Refactoring >5 fichiers
- Tests complets d'une feature
- Analyse de performance
- Audits de sécurité
- Migrations de DB complexes

### ❌ NE PAS utiliser pour:
- Édition simple 1 fichier
- Questions rapides
- Lecture de documentation
- Changements triviaux

## 💡 Patterns d'Utilisation

### Pattern 1: Feature Development
```
Step 1: Launch feature-builder for backend + mobile
Step 2: While building, launch code-searcher to find similar patterns
Step 3: Once built, launch test-generator
Step 4: Finally, launch deployment-manager for staging
```

### Pattern 2: Bug Investigation
```
Step 1: Launch bug-hunter with error details
Step 2: In parallel, launch code-searcher to find related code
Step 3: After fix, launch test-generator for regression tests
```

### Pattern 3: Refactoring
```
Step 1: Launch performance-analyzer to identify issues
Step 2: Launch refactor-master with strategy
Step 3: Launch test-generator to ensure no breaks
```

## 🎯 Best Practices

### 1. Soyez Précis
```
❌ "Fix the bug"
✅ "Launch bug-hunter agent to fix: Database connection timeout in backend/app/main.py line 15"
```

### 2. Donnez du Contexte
```
✅ "Launch feature-builder with context:
   - Similar to existing flows feature
   - Uses same DB structure
   - Follow PRD section 2.3"
```

### 3. Utilisez le Parallélisme
```
✅ "Launch 2 agents in parallel:
   Agent 1: Build backend API
   Agent 2: Build mobile UI
   Both for user profile feature"
```

### 4. Vérifiez les Résultats
Toujours vérifier ce que les agents ont fait:
```
Show me what the feature-builder agent created
Run tests to verify bug-hunter agent's fix
```

## 🔧 Configuration

Les sub-agents sont configurés dans:
- `.claude/agents-config.json` - Configuration principale
- Auto-détection basée sur vos phrases

### Triggers Auto
Certains agents s'activent automatiquement:
- **code-searcher**: "find", "search", "where is"
- **bug-hunter**: "error", "bug", "fix"
- **feature-builder**: "create feature", "implement"

## 📊 Monitoring

### Voir les Agents Actifs
```
Show active sub-agents
List running agents and their progress
```

### Logs d'Agents
```
Show logs from feature-builder agent
Get progress report from deployment-manager
```

## 🚨 Dépannage

### Agent Ne Répond Pas
```
Check status of bug-hunter agent
Cancel and restart deployment-manager
```

### Résultats Inattendus
```
Explain what the refactor-master agent changed
Review test-generator agent's test cases
```

## 🎓 Apprentissage

### Commencer Simple
```
# Jour 1: Un seul agent
Launch code-searcher to find all API endpoints

# Jour 2: Agent complexe
Launch feature-builder for simple settings page

# Jour 3: Parallélisme
Launch mobile + backend agents in parallel for new feature
```

### Exemples Progressifs

#### Niveau 1: Recherche
```
Find all files handling user authentication
```

#### Niveau 2: Feature Simple
```
Launch feature-builder to add user preferences table and API
```

#### Niveau 3: Feature Complète
```
Launch 3 agents in parallel to build workout analytics:
- Backend: Analytics API + DB schema
- Mobile: Charts with fl_chart
- Web: Dashboard with Recharts
```

#### Niveau 4: Workflow Complet
```
1. Launch feature-builder for analytics
2. Launch test-generator after build
3. Launch security-scanner before deploy
4. Launch deployment-manager to staging
```

---

## 🎉 Conclusion

Les sub-agents transforment votre développement solo en **équipe virtuelle**:

- 🏗️ **Feature Builder** = Votre développeur full-stack
- 🔍 **Bug Hunter** = Votre débuggeur expert
- 🧪 **Test Generator** = Votre QA engineer
- ⚡ **Performance Analyzer** = Votre optimization specialist
- 🔐 **Security Scanner** = Votre security expert
- 🚀 **Deployment Manager** = Votre DevOps engineer

**Utilisez-les massivement pour 10x votre productivité!** 🚀
