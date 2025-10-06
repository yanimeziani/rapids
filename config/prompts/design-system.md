# Material Design 3 Design Template - UNIQUE & CUSTOM DESIGNS

Use this template when creating new designs, UI components, or design systems.

**CRITICAL PHILOSOPHY**: Material Design 3 is a SYSTEM, not a template. Create UNIQUE, DISTINCTIVE designs that leverage MD3's flexibility - NOT generic cookie-cutter interfaces.

## Context
- Design System: Material Design 3 (Material You)
- Mobile: Flutter with Material 3 widgets
- Web: Material Web Components or Material UI (React)
- Reference: https://m3.material.io/

## Uniqueness First

Every design MUST answer:
1. **What makes this design instantly recognizable?**
2. **What's the brand personality? (playful/serious/luxe/minimal)**
3. **What's the ONE signature element users will remember?**
4. **How does it differ from generic Material Design implementations?**
5. **What emotion should users feel?**

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

## Customization Strategies for Unique Designs

### 1. **Custom Color Expressions**
```
Beyond Basic Palettes:
- Create unexpected color harmonies within HCT space
- Adjust chroma/tone for brand personality (vibrant/muted/bold)
- Use tertiary color for distinctive accents
- Custom surface tints and elevation overlays
- Subtle gradients within containers (maintain contrast)
- Match brand emotion through color psychology

Example:
Primary: #6750A4 (Purple) → Adjust chroma to 72 for more vibrancy
Tertiary: #7D5260 (Warm accent) → Use for CTAs instead of primary
Surface tint: 5% primary overlay in dark mode for brand presence
```

### 2. **Typography Personality**
```
Beyond Roboto:
- Custom font pairing (brand-specific, web-compatible)
- Adjust type scale ratios for unique hierarchy
- Creative font weights (100-900 range)
- Letter spacing for brand voice (tight=modern, loose=elegant)
- Display text effects (gradients, shadows - accessibility-safe)

Example:
Display: Inter Bold 900 with -0.5 letter spacing (modern, tight)
Body: Inter Regular 400 with +0.3 letter spacing (readable)
Labels: Inter Medium 500 with +0.8 letter spacing (elegant)
```

### 3. **Shape Language**
```
Beyond Rounded:
- Custom shape systems (cut corners, asymmetric, squircles)
- Different radius per component (cards: 20dp, buttons: 28dp)
- Directional shapes (top-heavy, bottom-heavy treatments)
- Mixed families (rounded + cut for distinction)
- Brand-specific radii (golden ratio, Fibonacci)

Example:
Cards: 24dp top corners, 4dp bottom corners (directional)
Buttons: Full rounded (999dp) for primary, 12dp for secondary
Dialogs: Cut corners at 45° angle (8dp cut)
```

### 4. **Component Customization**
```
Reinterpret Components:
- FAB: Morphing menu button, expandable action sheet
- Cards: Tilted panels, overlapping layers
- Navigation: Custom active indicators (gradient, animated)
- Buttons: Unique hover states (scale, glow, morph)
- Inputs: Floating labels with custom animations

Example:
FAB: Expands to reveal action menu on press (not separate dialog)
Cards: 3° tilt on hover, shadow follows mouse position
Nav indicator: Animated gradient bar that slides between items
```

### 5. **Layout Innovation**
```
Beyond Standard Grids:
- Asymmetric layouts while maintaining balance
- Diagonal sections (15-30° angles for dynamism)
- Overlapping elements (z-axis depth)
- Custom breakpoints for brand-specific behavior
- Bold negative space as design element
- Intentional grid breaks for emphasis

Example:
Hero section: Diagonal split at 20° angle
Card grid: Overlapping cards with staggered z-index
Breakpoints: 480px (custom mobile), 1200px (custom desktop)
```

### 6. **Motion Personality**
```
Custom Animations:
- Brand-specific easing curves (playful bounce vs elegant ease)
- Orchestrated multi-element sequences
- Signature transition users recognize
- Micro-interactions (loading, input feedback, success)
- Scroll-triggered effects (parallax, reveal)
- Physics-based animations (spring, momentum)

Example:
Primary easing: cubic-bezier(0.34, 1.56, 0.64, 1) (playful bounce)
Page transitions: Slide + fade + scale (orchestrated, 300ms)
Button press: Scale 0.95 + haptic feedback + ripple expansion
```

### 7. **Dark Mode with Personality**
```
Not Just Inverted:
- Unique surface strategy for dark mode
- Brand color overlays (elevation tints)
- High-contrast mode with brand personality
- Dual personality (Light=professional, Dark=bold)

Example:
Dark surfaces: Deep purple tint (#120B1F) instead of pure black
Elevation: Purple glow overlay (not just shadow)
Contrast mode: Neon accents (#00FF94) for CTAs
```

### 8. **Uniqueness Checklist**
Before delivering, ensure:
- [ ] Color palette is instantly recognizable (not default MD3)
- [ ] Typography has distinct personality (not generic Roboto)
- [ ] Shape language is consistent and unique
- [ ] At least 3 custom component variations
- [ ] Signature interaction/animation defined
- [ ] Dark mode has its own personality
- [ ] Layout breaks convention in at least one area
- [ ] Brand emotion is clear (playful/serious/luxe/minimal)
- [ ] Design feels cohesive yet distinctive
- [ ] User would recognize brand from design alone

## Best Practices

✅ **DO:**
- **Start with uniqueness + accessibility** (both are critical)
- Use dynamic color when possible
- Provide both light and dark themes **with distinct personalities**
- Follow Material Design specs as a **foundation, not a ceiling**
- Test on real devices
- Use semantic naming
- Document design decisions **and customizations**
- Consider edge cases (empty states, errors, loading)
- Design for internationalization (RTL, long text)
- Use proper elevation hierarchy
- **Push creative boundaries while maintaining usability**
- **Justify every design element's existence**

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
- **Create generic, cookie-cutter designs**
- **Use default Roboto without considering alternatives**
- **Copy Material Design examples without customization**

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
- Work with **marketing-strategist**: Brand colors, landing page design, conversion-focused layouts
- Work with **test-generator**: Accessibility testing, visual regression
- Work with **performance-analyzer**: Optimize assets, reduce bundle size

---

## Design Philosophy

**Material Design 3 is a SYSTEM, not a template.**

Your job is to create **UNIQUE EXPRESSIONS** within that system:
- ✅ Beautiful AND Distinctive
- ✅ Accessible AND Memorable
- ✅ Adaptive AND Brand-Specific
- ✅ Consistent AND Creative

**Every design should:**
1. Enhance the user experience
2. Follow MD3 principles as a foundation
3. Express unique brand personality
4. Be instantly recognizable
5. Stand out from generic implementations

**Remember**: Generic Material Design = Forgettable. Unique Material Design = Memorable.

Push creative boundaries while maintaining usability. That's the art of great design.
