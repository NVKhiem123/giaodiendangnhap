---
name: Sentience Design System
colors:
  surface: '#f8f9ff'
  surface-dim: '#cbdbf5'
  surface-bright: '#f8f9ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#eff4ff'
  surface-container: '#e5eeff'
  surface-container-high: '#dce9ff'
  surface-container-highest: '#d3e4fe'
  on-surface: '#0b1c30'
  on-surface-variant: '#45464d'
  inverse-surface: '#213145'
  inverse-on-surface: '#eaf1ff'
  outline: '#76777d'
  outline-variant: '#c6c6cd'
  surface-tint: '#565e74'
  primary: '#000000'
  on-primary: '#ffffff'
  primary-container: '#131b2e'
  on-primary-container: '#7c839b'
  inverse-primary: '#bec6e0'
  secondary: '#0058be'
  on-secondary: '#ffffff'
  secondary-container: '#2170e4'
  on-secondary-container: '#fefcff'
  tertiary: '#000000'
  on-tertiary: '#ffffff'
  tertiary-container: '#191c1e'
  on-tertiary-container: '#818486'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#dae2fd'
  primary-fixed-dim: '#bec6e0'
  on-primary-fixed: '#131b2e'
  on-primary-fixed-variant: '#3f465c'
  secondary-fixed: '#d8e2ff'
  secondary-fixed-dim: '#adc6ff'
  on-secondary-fixed: '#001a42'
  on-secondary-fixed-variant: '#004395'
  tertiary-fixed: '#e0e3e5'
  tertiary-fixed-dim: '#c4c7c9'
  on-tertiary-fixed: '#191c1e'
  on-tertiary-fixed-variant: '#444749'
  background: '#f8f9ff'
  on-background: '#0b1c30'
  surface-variant: '#d3e4fe'
typography:
  headline-xl:
    fontFamily: Manrope
    fontSize: 36px
    fontWeight: '700'
    lineHeight: 44px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Manrope
    fontSize: 28px
    fontWeight: '600'
    lineHeight: 36px
    letterSpacing: -0.01em
  headline-lg-mobile:
    fontFamily: Manrope
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
    letterSpacing: -0.01em
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
    letterSpacing: 0em
  body-sm:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
    letterSpacing: 0em
  label-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '500'
    lineHeight: 20px
    letterSpacing: 0.01em
  label-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.02em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  base: 4px
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 40px
  container-max: 1200px
  gutter: 24px
  margin-mobile: 16px
---

## Brand & Style
The brand personality is centered on **trust, precision, and clarity**. It targets professional users who value efficiency and security without the coldness of legacy enterprise software. The UI evokes a sense of "calm authority"—it is reliable and systematic but remains approachable through subtle softness.

The chosen style is **Modern Corporate**, blending high-utility minimalism with sophisticated tonal layering. It avoids unnecessary decoration, focusing instead on perfect alignment, generous whitespace, and a high-quality typographic hierarchy that guides the user through secure workflows like authentication and profile management.

## Colors
The palette is rooted in a deep, professional Slate (`#0F172A`) for primary text and brand elements to establish security and permanence. An energetic but refined Blue (`#3B82F6`) serves as the action color, signaling interactivity and progress.

The interface relies heavily on a range of cool neutrals. Backgrounds utilize a near-white Slate (`#F8FAFC`) to minimize eye strain, while borders and secondary text use mid-tone greys to create a soft, non-distracting hierarchy. Success states should use a muted emerald, and error states a soft crimson, maintaining the professional "calm" even during friction.

## Typography
This design system employs a dual-font strategy. **Manrope** is used for headlines to provide a modern, slightly rounded, and friendly character to structural titles. **Inter** is used for all functional text, including body copy, inputs, and labels, due to its exceptional legibility and systematic, neutral appearance.

For mobile devices, headline sizes scale down to prevent excessive line wrapping, while body sizes remain constant to ensure accessibility. All labels use a slightly tighter tracking and medium-to-semibold weights to distinguish them from standard prose.

## Layout & Spacing
The layout follows an **8px linear scale** for consistent rhythm. We utilize a **Fixed Grid** approach for desktop authentication views, centering content in a 400px–480px column to maintain focus. For profile dashboards, a 12-column fluid grid is used with a maximum container width of 1200px.

- **Desktop:** 12-column grid, 24px gutters, 40px+ page margins.
- **Tablet:** 8-column grid, 24px gutters, 24px page margins.
- **Mobile:** 4-column grid, 16px gutters, 16px page margins.

Vertical rhythm is strictly maintained using the `md` (16px) and `lg` (24px) units to separate logical groupings of information.

## Elevation & Depth
Elevation is conveyed through **Tonal Layers** and extremely soft **Ambient Shadows**. This design system avoids heavy drop shadows, opting instead for thin, low-contrast outlines combined with a subtle "Level 1" shadow for floating elements like dropdowns or cards.

- **Level 0 (Base):** The primary background color.
- **Level 1 (Card/Surface):** White background with a 1px border (`#E2E8F0`) and a 4px blur shadow at 5% opacity.
- **Level 2 (Dropdown/Modal):** White background with a 12px blur shadow at 8% opacity.

Depth is also suggested by subtle background shifts; for instance, an input field might have a slightly grayer background until it gains focus.

## Shapes
The shape language is **Rounded**, utilizing a 0.5rem (8px) base radius. This creates a modern, friendly feel that softens the "clinical" nature of security-focused software. 

- **Small elements (Checkboxes):** 4px radius.
- **Medium elements (Buttons, Inputs, Cards):** 8px radius.
- **Large elements (Modals, Feature Sections):** 16px radius.

Buttons and input fields share the same radius to ensure a cohesive "block" appearance when stacked in authentication forms.

## Components
- **Buttons:** Primary buttons use a solid `#3B82F6` background with white text. Secondary buttons use a light slate tint or simple border. Padding is `12px 24px`.
- **Input Fields:** Inputs feature an 8px radius, a 1px border in a light neutral tone, and 16px horizontal padding. On focus, the border shifts to primary blue with a 2px outer glow.
- **Cards:** Used for profile sections and auth containers. Cards should have a white background, the Level 1 shadow, and 24px to 32px of internal padding.
- **Chips/Badges:** Used for status (e.g., "Verified"). These use a "Pill-shape" (32px radius), small-caps typography, and a low-saturation background color corresponding to the status.
- **Lists:** Profile settings use a "Divided List" style with 1px horizontal separators and chevron-right indicators for drill-down actions.
- **Feedback Indicators:** Strength meters for passwords and validation messages must be placed immediately below the relevant input field using `body-sm` typography.