# Material Design 3 Design Template

Use this template when creating new designs, UI components, or design systems.

## Context
- Design System: Material Design 3 (Material You)
- Mobile: Flutter with Material 3 widgets
- Web: Material Web Components or Material UI (React)
- Reference: https://m3.material.io/

## Design Deliverables

### 1. Color Scheme
```
Primary Color: #______
Generated Palette:
├── Light Theme
│   ├── Primary: #______
│   ├── On-Primary: #______
│   ├── Primary Container: #______
│   ├── On-Primary Container: #______
│   ├── Secondary: #______
│   ├── Tertiary: #______
│   └── [All color roles...]
└── Dark Theme
    └── [Mirror structure]

Tool: Material Theme Builder or dynamic_color package
```

### 2. Typography Scale
```
Display Large: 57sp / Regular / -0.25 letter spacing
Display Medium: 45sp / Regular / 0 letter spacing
Display Small: 36sp / Regular / 0 letter spacing

Headline Large: 32sp / Regular / 0 letter spacing
Headline Medium: 28sp / Regular / 0 letter spacing
Headline Small: 24sp / Regular / 0 letter spacing

Title Large: 22sp / Medium / 0 letter spacing
Title Medium: 16sp / Medium / +0.15 letter spacing
Title Small: 14sp / Medium / +0.1 letter spacing

Body Large: 16sp / Regular / +0.5 letter spacing
Body Medium: 14sp / Regular / +0.25 letter spacing
Body Small: 12sp / Regular / +0.4 letter spacing

Label Large: 14sp / Medium / +0.1 letter spacing
Label Medium: 12sp / Medium / +0.5 letter spacing
Label Small: 11sp / Medium / +0.5 letter spacing
```

### 3. Component Specifications

For each component, define:
- **States**: Enabled, Disabled, Hover, Focus, Pressed, Error
- **Dimensions**: Width, Height, Padding, Margins
- **Colors**: Surface, container, text colors for each state
- **Elevation**: Shadow level (0-5)
- **Shape**: Corner radius
- **Motion**: Animation duration and easing

Example:
```
Button (Filled):
- Height: 40dp
- Min Width: 64dp
- Padding: 24dp horizontal, 10dp vertical
- Corner Radius: 20dp (full rounded)
- Elevation: 0 (default), 1 (hover), 0 (pressed)
- Container: Primary color
- Label: On-Primary color
- State Layer: On-Primary at 8% (hover), 12% (focus), 12% (pressed)
```

### 4. Layout Grid
```
Mobile (0-599dp):
- Columns: 4
- Margins: 16dp
- Gutters: 16dp

Tablet (600-839dp):
- Columns: 8
- Margins: 24dp
- Gutters: 24dp

Desktop (840dp+):
- Columns: 12
- Margins: 24dp+
- Gutters: 24dp
```

### 5. Accessibility Checklist
- [ ] Color contrast ratio ≥ 4.5:1 (text)
- [ ] Color contrast ratio ≥ 3:1 (UI components)
- [ ] Touch targets ≥ 48x48dp
- [ ] Focus indicators visible
- [ ] Screen reader labels provided
- [ ] Keyboard navigation support
- [ ] Color-blind friendly (not relying on color alone)
- [ ] Motion can be reduced/disabled
- [ ] Alternative text for images
- [ ] Semantic HTML/widget structure

### 6. Responsive Design
- [ ] Mobile breakpoint design (compact)
- [ ] Tablet breakpoint design (medium)
- [ ] Desktop breakpoint design (expanded)
- [ ] Foldable device handling
- [ ] Portrait and landscape orientations
- [ ] Safe area insets considered
- [ ] Adaptive navigation (bottom nav → rail → drawer)

## Implementation Guide

### Flutter Material 3
```dart
// Theme Setup
MaterialApp(
  theme: ThemeData(
    useMaterial3: true,
    colorScheme: ColorScheme.fromSeed(
      seedColor: Color(0xFF______),
      brightness: Brightness.light,
    ),
    typography: Typography.material2021(),
  ),
  darkTheme: ThemeData(
    useMaterial3: true,
    colorScheme: ColorScheme.fromSeed(
      seedColor: Color(0xFF______),
      brightness: Brightness.dark,
    ),
  ),
  themeMode: ThemeMode.system,
)

// Components
- Button: FilledButton, ElevatedButton, OutlinedButton, TextButton
- FAB: FloatingActionButton, FloatingActionButton.extended
- Cards: Card (with elevation or color)
- Navigation: NavigationBar, NavigationRail, NavigationDrawer
- App Bars: AppBar (small, medium, large), BottomAppBar
- Inputs: TextField (filled/outlined)
- Lists: ListTile
- Dialogs: AlertDialog, showDialog
```

### Web (Material Web Components)
```javascript
// Import components
import '@material/web/button/filled-button.js';
import '@material/web/button/outlined-button.js';

// Use in HTML
<md-filled-button>Click me</md-filled-button>

// Theme with CSS custom properties
:root {
  --md-sys-color-primary: #_____;
  --md-sys-color-on-primary: #_____;
  /* ... other tokens ... */
}
```

## Design Workflow Checklist

### Phase 1: Research & Planning
- [ ] Understand user needs and requirements
- [ ] Audit existing design patterns
- [ ] Define brand color (if applicable)
- [ ] Choose adaptive patterns needed
- [ ] List required components

### Phase 2: Design
- [ ] Generate color scheme (light + dark)
- [ ] Define typography scale
- [ ] Design key screens (mobile, tablet, desktop)
- [ ] Create component library
- [ ] Document spacing and layout rules
- [ ] Design interaction states
- [ ] Define motion specs

### Phase 3: Accessibility
- [ ] Run contrast checker
- [ ] Test with screen reader
- [ ] Verify touch target sizes
- [ ] Test keyboard navigation
- [ ] Check color-blind simulation

### Phase 4: Documentation
- [ ] Export design tokens (JSON)
- [ ] Create Figma file (optional)
- [ ] Write implementation notes
- [ ] Document component usage
- [ ] Create style guide

### Phase 5: Handoff
- [ ] Provide color values (hex/RGB)
- [ ] Share typography scale
- [ ] Export icons and assets
- [ ] Provide spacing measurements
- [ ] Share prototype links (if any)

## Material Design 3 Components Library

### Actions
- Buttons (6 types), FAB (4 types), Icon Buttons (4 types), Segmented Buttons

### Communication
- Badge, Progress Indicators, Snackbar

### Containment
- Cards (3 types), Carousel (3 types), Divider, Lists, Bottom Sheets, Side Sheets, Dialogs, Tooltips

### Navigation
- Bottom App Bar, Navigation Bar, Navigation Drawer, Navigation Rail, Top App Bar (4 sizes), Tabs, Search

### Selection
- Checkbox, Chips (4 types), Date Pickers, Menus, Radio Button, Sliders (3 types), Switch, Time Pickers

### Text Inputs
- Text Fields (2 types), Autocomplete

## Best Practices

✅ **DO:**
- Start with accessibility requirements
- Use dynamic color when possible
- Provide both light and dark themes
- Follow Material Design specs exactly
- Test on real devices
- Use semantic naming
- Document design decisions
- Consider edge cases (empty states, errors, loading)
- Design for internationalization (RTL, long text)
- Use proper elevation hierarchy

❌ **DON'T:**
- Skip accessibility checks
- Use custom colors without contrast testing
- Ignore responsive breakpoints
- Override Material Design patterns without reason
- Forget state variations (hover, focus, pressed)
- Use arbitrary spacing values
- Rely on color alone for information
- Ignore safe areas on mobile
- Forget about dark mode
- Use outdated Material Design 2 patterns

## Design Tools

- **Figma**: Material 3 Design Kit (official)
- **Material Theme Builder**: Generate color schemes
- **Material Symbols**: 2500+ icons
- **Contrast Checker**: WebAIM, Stark
- **Screen Reader**: TalkBack (Android), VoiceOver (iOS/macOS)
- **Color Utilities**: material-color-utilities library
- **Prototyping**: Figma, Adobe XD

## Resources

- Official Docs: https://m3.material.io/
- Flutter Material 3: https://docs.flutter.dev/ui/design/material
- Material Web: https://material-web.dev/
- Figma Kit: https://www.figma.com/community/file/1035203688168086460
- Color Tool: https://m3.material.io/theme-builder
- Icons: https://fonts.google.com/icons

## Integration with RAPIDS

- Work with **feature-builder**: Provide design specs → implementation
- Work with **marketing-strategist**: Brand colors, landing page design
- Work with **test-generator**: Accessibility testing, visual regression
- Work with **performance-analyzer**: Optimize assets, reduce bundle size

---

**Design Philosophy**: Material Design 3 is beautiful, accessible, adaptive, and consistent. Every design should enhance the user experience while following the system's principles.
