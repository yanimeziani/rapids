# /design - Create Material Design 3 UI

Creates beautiful, accessible, and adaptive UIs following Material Design 3 principles.

## Usage
```
/design <component-name> <description>
```

## What it does
1. Analyzes design requirements and context
2. Generates Material Design 3 compliant designs:
   - Color scheme (light + dark themes)
   - Typography scale
   - Component specifications
   - Responsive layouts (mobile, tablet, desktop)
   - Accessibility compliance (WCAG 2.1 AA)
   - Motion and interaction specs
3. Provides implementation code:
   - Flutter Material 3 widgets
   - Material Web Components
   - Design tokens (JSON)
4. Creates design documentation
5. Validates accessibility standards

## Examples
```
/design user-profile-card "Card displaying user avatar, name, and stats with actions"
```

```
/design app-navigation "Bottom navigation for mobile, rail for tablet, drawer for desktop"
```

```
/design color-scheme "Generate dynamic color scheme from brand color #6442d6"
```

## Design Deliverables
- **Color Palette**: Complete tonal palette with all color roles
- **Components**: Detailed specs (sizes, spacing, states, colors)
- **Layouts**: Responsive grid with breakpoints
- **Accessibility**: Contrast ratios, touch targets, screen reader support
- **Code**: Implementation-ready Flutter/Web code
- **Documentation**: Design specs and usage guidelines

## Material Design 3 Features
- **Dynamic Color**: Personalized color schemes from user preferences
- **Adaptive Design**: Responsive layouts for all screen sizes
- **Accessibility**: WCAG 2.1 AA compliant by default
- **Components**: 30+ components (buttons, cards, navigation, inputs, etc.)
- **Typography**: Complete type scale (display → label)
- **Motion**: Purposeful animations with proper easing
- **Elevation**: Tonal elevation with surface tints

## Integration
- Works with `/new-feature` to design and implement features
- Exports design tokens for consistent theming
- Provides Figma-compatible specifications
- Generates Flutter `ThemeData` and Web CSS variables

## Best Practices Applied
✅ Accessibility-first design
✅ Light and dark theme support
✅ Responsive breakpoints (compact, medium, expanded)
✅ Material Design 3 compliance
✅ State variations (enabled, hover, focus, pressed, disabled, error)
✅ Proper elevation hierarchy
✅ Touch target sizes ≥ 48x48dp
✅ Color contrast ratios ≥ 4.5:1 for text
✅ Semantic structure for screen readers

## Reference
Material Design 3: https://m3.material.io/
