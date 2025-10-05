# Flowz Development Guide with Claude Code

Guide complet pour développer Flowz efficacement avec l'aide de Claude Code.

## 🚀 Quick Start avec Claude Code

### Commandes Essentielles

```bash
# Créer une nouvelle fonctionnalité
/new-feature workout-history "Track user workout history"

# Corriger un bug
/fix-bug "Backend API returns 500 on /flows endpoint"

# Refactoriser du code
/refactor mobile/lib/features/flows/ extract-widgets

# Générer des tests
/test mobile lib/features/flows/

# Déployer
/deploy staging
```

## 🤖 Utiliser les Agents IA

### 1. Code Reviewer
Revue automatique du code avant commit:
```
Review my changes for the workout feature
```

### 2. Performance Optimizer
Optimiser les performances:
```
Optimize the flows screen, it's loading slowly
```

### 3. Security Auditor
Audit de sécurité:
```
Run security audit on authentication flow
```

### 4. Database Migrator
Gérer les migrations:
```
Create migration for adding workout_sessions table
```

## 📁 Architecture du Projet

### Mobile (Flutter)
```
lib/
├── app/                 # Configuration app
├── core/                # Utilitaires partagés
├── features/            # Fonctionnalités
│   ├── <feature>/
│   │   ├── application/  # Logique métier
│   │   ├── domain/       # Modèles
│   │   └── presentation/ # UI
├── providers/           # Providers Riverpod
└── routing/             # Navigation
```

### Web (Next.js 15)
```
app/
├── <route>/
│   ├── page.tsx         # Page principale
│   ├── layout.tsx       # Layout
│   ├── loading.tsx      # État loading
│   └── error.tsx        # Gestion erreurs
```

### Backend (FastAPI)
```
app/
├── api/v1/              # Routes API
├── models/              # Modèles DB
├── schemas/             # Validation Pydantic
├── services/            # Logique métier
└── main.py             # Application
```

## 🛠️ Workflows Communs

### Ajouter une Nouvelle Fonctionnalité

1. **Planifier avec Claude**
```
Plan the implementation of a workout timer feature:
- Mobile: Real-time timer with pause/resume
- Web: Display workout progress
- Backend: Store workout sessions
```

2. **Créer la structure**
```
/new-feature workout-timer "Real-time workout timer with session tracking"
```

3. **Implémenter itérativement**
- Commencer par le backend (API + DB)
- Puis le mobile (UI + logique)
- Enfin le web (affichage)

4. **Tester**
```
/test mobile lib/features/workout-timer/
/test backend app/api/v1/workout_timer.py
```

5. **Déployer**
```
/deploy staging
# Tester
/deploy prod
```

### Corriger un Bug

1. **Décrire le problème**
```
/fix-bug "Mobile app crashes when selecting a flow with null exercises"
```

2. **Claude va**:
   - Chercher le code pertinent
   - Analyser la cause
   - Proposer un fix
   - L'implémenter
   - Tester

3. **Vérifier le fix**
```
Run the app and verify the fix works
```

### Refactoriser du Code

```
/refactor mobile/lib/features/flows/presentation/flows_screen.dart extract-widgets

# Claude va:
# - Identifier les widgets répétitifs
# - Extraire en composants réutilisables
# - Mettre à jour les imports
# - Tester que tout fonctionne
```

## 🔍 Debugging avec Claude

### Logs d'erreur
Copier-coller directement les logs:
```
Fix this error:
[ERROR] sqlalchemy.exc.OperationalError: (psycopg2.OperationalError)
connection to server failed
```

### Performance
```
The flows list is slow to load, investigate and optimize
```

### Build errors
```
Fix this Flutter build error:
[flutter] Error: Type 'Future<void>' can't be assigned to 'void Function()'
```

## 📊 Bonnes Pratiques

### 1. Contexte Clair
Toujours donner du contexte:
```
❌ "Fix the error"
✅ "Fix the database connection error in backend/app/main.py when connecting to PostgreSQL"
```

### 2. Itérations Courtes
Travailler par petites étapes:
```
✅ "First, add the API endpoint for creating workouts"
✅ "Now connect the mobile UI to this endpoint"
✅ "Finally, add error handling"
```

### 3. Utiliser les Templates
Les prompts dans `.claude/prompts/` sont optimisés:
```
Create a new mobile feature following the mobile-feature template
```

### 4. Tests Automatisés
Toujours tester après changements:
```
/test mobile lib/features/workout/
```

## 🚢 Déploiement

### Checklist Pré-déploiement
```
Run pre-deployment checks:
- All tests passing
- Build succeeds
- Database migrations ready
- Environment variables configured
```

### Déploiement Staging
```
/deploy staging
```

### Déploiement Production
```
/deploy prod
```

### Rollback si Nécessaire
```
Rollback production to previous version
```

## 🔐 Sécurité

### Audit Régulier
```
Run security audit
```

### Avant Chaque Release
```
Check for security vulnerabilities before deploying to production
```

## 📈 Monitoring & Maintenance

### Performance
```
Generate performance report for mobile app
```

### Dependencies
```
/update-deps
# Check for outdated packages across all platforms
```

### Database
```
Analyze database performance and suggest optimizations
```

## 💡 Astuces Avancées

### 1. Recherche de Code
```
Find all places where we handle workout session state
```

### 2. Documentation Auto
```
Generate API documentation for all backend endpoints
```

### 3. Migration de Code
```
Migrate flows_screen.dart from StatefulWidget to ConsumerWidget with Riverpod
```

### 4. Génération de Mocks
```
Generate mock data for testing workout flows
```

## 🎯 Exemples Concrets

### Exemple 1: Ajouter l'Authentification
```
Implement Google Sign-In:
1. Backend: JWT authentication with Google OAuth
2. Mobile: Google Sign-In button with token storage
3. Web: Google Sign-In with session management
```

### Exemple 2: Optimiser les Images
```
Optimize workout exercise images:
- Mobile: Use cached_network_image
- Web: Next.js Image component
- Backend: Serve optimized sizes
```

### Exemple 3: Ajouter Analytics
```
Add PostHog analytics:
- Track workout completions
- Monitor user engagement
- Setup custom events
```

## 🆘 Support & Troubleshooting

### Problème Général
```
I'm stuck with <describe issue>, help me debug and fix it
```

### Comprendre le Code
```
Explain how the workout flow state machine works in mobile/lib/features/workout/
```

### Améliorer la Performance
```
The mobile app is using too much memory, investigate and optimize
```

---

## Commandes de Développement

### Mobile (Flutter)
```bash
cd mobile
flutter pub get
flutter run
flutter test
```

### Web (Next.js)
```bash
cd web
npm install
npm run dev
npm run build
```

### Backend (FastAPI)
```bash
cd backend
docker compose up -d
docker compose logs -f backend
```

### Docker (Tout)
```bash
docker compose up -d
docker compose ps
docker compose logs -f
docker compose down
```

---

**En résumé**: Utilisez Claude Code comme votre binôme de développement. Soyez précis, itératif, et n'hésitez pas à demander de l'aide à chaque étape !
