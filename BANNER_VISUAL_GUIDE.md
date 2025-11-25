# 🎨 Banner Slider - Visual Overview

## 📱 Responsive Behavior

### Mobile View (<768px)
```
┌─────────────────────────────────┐
│                                 │
│  ┌─────────────────────────┐    │
│  │                         │    │
│  │   MOBILE IMAGE          │    │
│  │   (540×700px)           │    │
│  │   PORTRAIT              │    │
│  │                         │    │
│  │   Summer Sale           │    │
│  │   Get 50% off           │    │
│  │   [Shop Now]            │    │
│  │                         │    │
│  └─────────────────────────┘    │
│                                 │
│            ●  ○  ○              │ ← Dots at bottom
└─────────────────────────────────┘
  Height: h-[400px]
```

### Tablet View (768px - 1023px)
```
┌─────────────────────────────────────────────┐
│                                             │
│  ┌──────────────────────────────────────┐   │
│  │  ◀                                    ▶  │ ← Arrows appear on hover
│  │    TABLET IMAGE                      │   │
│  │    (960×600px)                       │   │
│  │    LANDSCAPE                         │   │
│  │                                      │   │
│  │    Summer Sale                       │   │
│  │    Get 50% off everything            │   │
│  │    [Shop Now]                        │   │
│  │                                      │   │
│  └──────────────────────────────────────┘   │
│                 ●  ○  ○                     │ ← Dots
└─────────────────────────────────────────────┘
  Height: h-[500px]
```

### Desktop View (≥1024px)
```
┌──────────────────────────────────────────────────────────────┐
│                                                              │
│ ┌────────────────────────────────────────────────────────┐  │
│ │ ◀                         DESKTOP IMAGE           ▶    │  │ ← Arrows always visible
│ │                          (1920×600px)                  │  │
│ │                          FULL-WIDTH                    │  │
│ │                                                        │  │
│ │ Summer Sale                                            │  │
│ │ Get 50% off everything                                │  │
│ │ [Shop Now]                                             │  │
│ │                                                        │  │
│ └────────────────────────────────────────────────────────┘  │
│              ●  ○  ○                                        │ ← Dots at bottom
└──────────────────────────────────────────────────────────────┘
  Height: h-[600px]
```

---

## 🎬 Animation Behavior

### Auto-play Cycle
```
Banner 1 (5 sec)
    ↓ [fade out]
Banner 2 (5 sec)
    ↓ [fade out]
Banner 3 (5 sec)
    ↓ [fade out]
Back to Banner 1 ...
```

### User Interaction
```
User clicks arrow / dot
    ↓
Auto-play STOPS for 2 seconds
    ↓
Auto-play RESUMES
    ↓
Continue cycling

OR

User hovers over slider
    ↓
Auto-play PAUSES
    ↓
User moves mouse away
    ↓
Auto-play RESUMES
```

---

## 🖼️ Image Sizing Guide

| Device | Dimensions | Aspect Ratio | Max File |
|--------|------------|--------------|----------|
| Mobile | 540×700px | 0.77:1 (portrait) | 100KB |
| Tablet | 960×600px | 1.6:1 (landscape) | 150KB |
| Desktop | 1920×600px | 3.2:1 (landscape) | 250KB |

### Example Sizes
```
For clothing/fashion:
- Mobile: Vertical focus on product
- Tablet: Half product, half space
- Desktop: Full width showcase

Mobile (540×700)     Tablet (960×600)     Desktop (1920×600)
┌─────────┐         ┌──────────────┐     ┌──────────────────────┐
│         │         │              │     │                      │
│ OUTFIT  │         │ OUTFIT | TXT │     │ OUTFIT | TEXT        │
│         │         │              │     │                      │
│ TEXT    │         │ TEXT         │     │                      │
└─────────┘         └──────────────┘     └──────────────────────┘
```

---

## 🎯 Navigation Interactions

### Arrows
```
Left Arrow                          Right Arrow
    ↓                                   ↓
[  ◀  ] ← Appears on hover        ▶  [ ]
Position: Left 1rem                Position: Right 1rem
Height: Centered vertically
```

### Dots
```
Current Slide:  ● (white, stretched to w-8)
Other Slides:   ○ (white/50, w-3)

Click dot → Jump to that slide → Auto-play pauses for 2 sec → Resumes

Example with 3 banners:
Slide 1:  ● ○ ○
Slide 2:  ○ ● ○
Slide 3:  ○ ○ ●
```

---

## 🎨 Color Scheme

```
Overlay Gradient:
from-black/50 (left) → to-transparent (right)
└─ Makes text readable over images

Text Color:
Title: white (font-bold)
Description: white/90 (font-medium)
Button: black text on white background

Button Hover:
Normal:   bg-white
Hover:    bg-gray-100

Arrow Buttons:
Normal:   bg-black/50
Hover:    bg-black/75
```

---

## 📐 Spacing & Layout

```
Content Area:
┌────────────────────────────────────┐
│ p-4 sm:p-6 md:p-8 lg:p-12        │ ← Responsive padding
│                                    │
│  ┌──────────────────┐             │
│  │ max-w-xl         │             │
│  │                  │             │
│  │ Title (2-5xl)    │             │
│  │ mb-2 md:mb-4     │             │
│  │                  │             │
│  │ Description      │             │
│  │ mb-4 md:mb-6     │             │
│  │                  │             │
│  │ [Button]         │             │
│  │                  │             │
│  └──────────────────┘             │
│                                    │
└────────────────────────────────────┘

Text Limits:
Title:      line-clamp-2 (max 2 lines)
Description: line-clamp-3 (max 3 lines)
Button:     px-6 md:px-8 py-2 md:py-3
```

---

## 🔄 State Management

```
Component State:

currentIndex: number
  └─ Which banner is displayed (0, 1, 2...)

isAutoPlay: boolean
  └─ true: Rotating
  └─ false: Paused (user interacting or hovering)

Updates:
- Every 5 seconds (if autoplay is true)
- When user clicks arrow/dot
- When user hovers/unhovers
```

---

## 📊 Data Flow Diagram

```
Sanity Studio
    ↓
[Banner Document]
{
  title: "Summer Sale",
  description: "50% off",
  buttonText: "Shop",
  buttonLink: "/products",
  mobileImage: {...},
  tabletImage: {...},
  desktopImage: {...},
  isActive: true,
  order: 0
}
    ↓
getAllBanners() GROQ Query
    ↓
Array of Banners
    ↓
HomeBanner (server component)
    ↓
BannerSlider (client component)
    ↓
Browser Display:
┌────────────────────┐
│  BANNER SLIDER     │
│  [Image]           │
│  [Title]           │
│  [Description]     │
│  [Button]          │
│  [Navigation]      │
└────────────────────┘
```

---

## 🎯 Responsive Breakpoints

```
Tailwind Breakpoints:

sm (640px)  - Small adjustments (text size +)
md (768px)  - Major switch (mobile → tablet image)
lg (1024px) - Another major switch (tablet → desktop image)

Height Classes:
h-[400px] @ default (< sm)
md:h-[500px] @ 768px+
lg:h-[600px] @ 1024px+

Text Size Scale:
title:  text-2xl → sm:text-3xl → md:text-4xl → lg:text-5xl
desc:   text-sm → sm:text-base → md:text-lg
button: px-6 md:px-8, py-2 md:py-3
```

---

## ⚡ Performance Details

```
Image Loading Strategy:

<picture>
  <source media="(max-width: 767px)" srcSet="mobile"/>
  <source media="(min-width: 768px) and (max-width: 1023px)" srcSet="tablet"/>
  <source media="(min-width: 1024px)" srcSet="desktop"/>
  <img fallback/>
</picture>

Browser Optimization:
✅ Only loads image for current screen size
✅ Scales down on mobile (less data)
✅ Scales up on desktop (better quality)
✅ No extra HTTP requests for unused sizes
```

---

## 🧪 Testing Checklist

```
Mobile (< 768px):
[ ] See mobile image (portrait)
[ ] Dots visible at bottom
[ ] Arrows hidden (appear on hover if desktop)
[ ] Text readable
[ ] Button tappable
[ ] Auto-play works
[ ] Manual navigation works

Tablet (768-1023px):
[ ] See tablet image (landscape)
[ ] All above features work
[ ] Larger text sizes

Desktop (≥ 1024px):
[ ] See desktop image (full-width)
[ ] Arrows visible
[ ] All above features work
[ ] Optimal layout
```

---

This visual guide helps understand the banner system's responsive behavior and interactions! 🎨
