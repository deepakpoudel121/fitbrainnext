# Theme Quick Start Guide

## Athletic Dark Theme Overview

Your FitBrain project now uses a modern **Athletic Dark Theme** with:
- **Electric Lime** primary buttons and accents
- **Ember Orange** secondary accents
- **Dark Athletic Canvas** background
- **OKLch color space** for perceptually uniform colors

## Quick Color Reference

```
Primary (Electric Lime):        bg-primary, text-primary, border-primary
Accent (Ember Orange):          bg-accent, text-accent, border-accent
Secondary:                      bg-secondary, text-secondary
Muted:                          bg-muted, text-muted
Card:                           bg-card, text-card-foreground
Destructive:                    bg-destructive, text-destructive-foreground
Input:                          bg-input, border-input
```

## Common Component Examples

### Primary Button (Electric Lime)
```tsx
<button className="bg-primary text-primary-foreground px-4 py-2 rounded">
  Click Me
</button>
```

### Card with Accent Border
```tsx
<div className="bg-card border-2 border-accent rounded p-4 text-card-foreground">
  Card Content
</div>
```

### Orange Accent Text
```tsx
<h2 className="text-accent font-bold">Important Title</h2>
```

### Muted Secondary Text
```tsx
<p className="text-muted-foreground text-sm">Subtitle or description</p>
```

### Input Field
```tsx
<input 
  className="bg-input border border-border rounded px-3 py-2 text-foreground"
  type="text"
  placeholder="Enter text..."
/>
```

## New Utility Classes

### Grid Background
Adds a subtle grid pattern - perfect for hero sections:
```tsx
<div className="grid-bg h-64 rounded">Header with grid pattern</div>
```

### Glow Effect (Electric Lime)
```tsx
<div className="glow-primary p-4">Glowing content</div>
```

### Noise Texture
```tsx
<div className="noise p-4">Textured background</div>
```

### Text Stroke (Outlined Text)
```tsx
<h1 className="text-stroke text-4xl">Outlined Heading</h1>
```

## Color Values in OKLch

The theme uses OKLch format: `oklch(Lightness Chroma Hue)`

- **Lightness**: 0-1 (0=black, 1=white)
- **Chroma**: 0-0.37 (color intensity)
- **Hue**: 0-360 (color angle)

### Example: Adjusting Primary Color
```css
/* Current Electric Lime */
--primary: oklch(0.92 0.22 125);

/* Make it brighter */
--primary: oklch(0.95 0.22 125);

/* Make it more vivid */
--primary: oklch(0.92 0.26 125);

/* Shift the hue to more green */
--primary: oklch(0.92 0.22 135);
```

## Pages That Look Great with This Theme

✓ **Dashboard** - Electric lime stats cards with orange accents
✓ **Workout Tracker** - Lime buttons, orange progress indicators
✓ **Analytics** - Charts with lime, orange, cyan, yellow, magenta
✓ **User Profile** - Lime highlights on key information
✓ **Settings** - Orange toggle accents

## File Location

Theme definition: `/app/globals.css`
Theme documentation: `/THEME.md`

## Dev Server

Your preview is live at: **http://localhost:3000**

Changes to `/app/globals.css` will hot-reload instantly.

## Tips

1. **Lime is for primary actions** - Use `bg-primary` for main CTAs
2. **Orange for secondary emphasis** - Use `text-accent` or `bg-accent` for secondary info
3. **Dark backgrounds for readability** - Default `bg-background` is very dark for contrast
4. **Use the utility classes** - `.glow-primary` adds that high-tech feeling
5. **Chart colors are coordinated** - All 5 chart colors work well together

## Example: Athletic Dashboard Card

```tsx
<div className="bg-card border border-border rounded-sm p-6 glow-primary">
  <h3 className="text-accent font-bold mb-4">Workout Stats</h3>
  <div className="grid grid-cols-3 gap-4">
    <div className="text-center">
      <p className="text-3xl text-primary font-bold">42</p>
      <p className="text-muted-foreground text-sm">Sessions</p>
    </div>
    <div className="text-center">
      <p className="text-3xl text-accent font-bold">1250</p>
      <p className="text-muted-foreground text-sm">Calories</p>
    </div>
    <div className="text-center">
      <p className="text-3xl text-primary font-bold">89</p>
      <p className="text-muted-foreground text-sm">Minutes</p>
    </div>
  </div>
</div>
```

---

**Happy theming! The electric lime primary and ember orange accents give FitBrain an energetic, athletic vibe perfect for a fitness app.**
