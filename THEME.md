# Athletic Dark Theme Implementation

## Overview

Your FitBrain application now uses an **Athletic Dark Theme** extracted from the frontendfit repository. This theme features a raw athletic dark canvas with high-voltage electric lime primary accent and ember orange secondary accents.

## Color Palette

### Primary Colors
- **Background**: `oklch(0.14 0.012 250)` - Raw athletic dark canvas
- **Foreground**: `oklch(0.97 0.005 100)` - Off-white text
- **Primary**: `oklch(0.92 0.22 125)` - Electric lime (high voltage accent)
- **Primary Foreground**: `oklch(0.14 0.012 250)` - Dark text on lime

### Secondary Colors
- **Secondary**: `oklch(0.24 0.018 250)` - Dark secondary background
- **Secondary Foreground**: `oklch(0.97 0.005 100)` - Light text
- **Accent**: `oklch(0.65 0.24 25)` - Ember orange for energy
- **Accent Foreground**: `oklch(0.14 0.012 250)` - Dark text on orange

### Supporting Colors
- **Card**: `oklch(0.18 0.014 250)` - Card backgrounds
- **Card Foreground**: `oklch(0.97 0.005 100)` - Card text
- **Muted**: `oklch(0.22 0.014 250)` - Muted backgrounds
- **Muted Foreground**: `oklch(0.65 0.02 250)` - Muted text
- **Border**: `oklch(0.28 0.014 250)` - Border color
- **Input**: `oklch(0.22 0.014 250)` - Input backgrounds
- **Ring**: `oklch(0.92 0.22 125)` - Focus ring (electric lime)
- **Destructive**: `oklch(0.6 0.24 25)` - Destructive actions

### Chart Colors
- **Chart 1**: `oklch(0.92 0.22 125)` - Electric lime
- **Chart 2**: `oklch(0.7 0.2 25)` - Ember orange
- **Chart 3**: `oklch(0.7 0.18 200)` - Cyan/blue
- **Chart 4**: `oklch(0.75 0.18 60)` - Yellow
- **Chart 5**: `oklch(0.65 0.2 320)` - Purple/magenta

## Theme Characteristics

### OKLch Color Space
The theme uses OKLch (Oklch Lightness Chroma Hue) color space for better perceptual uniformity. Benefits:
- Better visual consistency across brightness levels
- More intuitive color relationships
- Improved accessibility for color-blind users

### Design Features
- **Border Radius**: 0.25rem (sharp, athletic aesthetic)
- **Font Display**: Plus Jakarta Sans (headings)
- **Font Sans**: Inter (body text)
- **Font Mono**: Fira Code (code/monospace)

## Utility Classes

New utility classes have been added for the theme:

### `.grid-bg`
Adds a subtle grid background pattern perfect for hero sections or headers.
```tsx
<div className="grid-bg">...</div>
```

### `.noise`
Adds a subtle noise pattern for texture.
```tsx
<div className="noise">...</div>
```

### `.glow-primary`
Adds a glowing box-shadow effect with the primary color.
```tsx
<div className="glow-primary">...</div>
```

### `.text-stroke`
Creates an outlined text effect.
```tsx
<h1 className="text-stroke">Stroked Text</h1>
```

## Usage Examples

### Primary Button
```tsx
<button className="bg-primary text-primary-foreground">
  Action
</button>
```

### Card with Accent
```tsx
<div className="bg-card text-card-foreground border border-border rounded-md p-4">
  Content
</div>
```

### Accent Text
```tsx
<p className="text-accent font-semibold">
  Important message
</p>
```

## Implementation Details

The theme is defined in `/app/globals.css` using Tailwind CSS v4 with inline theme variables. All colors are automatically available as Tailwind classes:

- `bg-primary`, `bg-secondary`, `bg-accent`, etc.
- `text-primary`, `text-secondary`, `text-accent`, etc.
- `border-primary`, `border-secondary`, etc.

## Browser Support

OKLch color space is supported in:
- Chrome/Edge 111+
- Firefox 113+
- Safari 17.2+
- Modern mobile browsers

Fallback colors are automatically generated for older browsers through Tailwind CSS.

## Customization

To adjust colors, edit the `@theme` block in `/app/globals.css`. Example:

```css
--primary: oklch(0.92 0.22 125); /* Adjust lightness, chroma, or hue */
```

The three values represent:
1. **Lightness** (0-1): How bright the color is
2. **Chroma** (0-0.37): Color intensity/saturation
3. **Hue** (0-360): Color angle on the color wheel
