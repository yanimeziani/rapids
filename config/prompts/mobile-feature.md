# Mobile Feature Template

Use this template when creating new mobile features.

## Context
- Project: Flowz Flutter App
- Architecture: Feature-based with Riverpod + Go Router
- Theme: `lib/app/app_theme.dart`
- Navigation: `lib/routing/app_router.dart`

## Structure
```
lib/features/<feature>/
├── application/
│   ├── <feature>_controller.dart
│   └── <feature>_state.dart
├── domain/
│   └── models/
├── presentation/
│   ├── <feature>_screen.dart
│   └── widgets/
└── repositories/
```

## Checklist
- [ ] Create feature folder structure
- [ ] Implement state management (Riverpod)
- [ ] Create UI screens/widgets
- [ ] Add to router
- [ ] Connect to backend API
- [ ] Handle loading/error states
- [ ] Add proper navigation
- [ ] Write widget tests
- [ ] Update documentation

## Code Standards
- Use const constructors
- Follow Material Design 3
- Implement proper error handling
- Use async/await for API calls
- Add loading indicators
- Theme colors from AppColors
- Responsive design
