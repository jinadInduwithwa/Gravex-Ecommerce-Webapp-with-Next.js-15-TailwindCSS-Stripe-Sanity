# Banner Management System Documentation

## Overview

This is a complete, production-ready banner management system that allows you to manage multiple banners with responsive images from Sanity Studio and display them in a dynamic slider on your Next.js frontend.

## Features

- ✅ Sanity CMS schema with responsive image fields
- ✅ GROQ queries for fetching banners
- ✅ Automatic responsive image switching (mobile, tablet, desktop)
- ✅ Dynamic banner slider with autoplay
- ✅ Fully accessible (WCAG compliant)
- ✅ Optimized with Next.js Image component
- ✅ TypeScript support
- ✅ Tailwind CSS styling
- ✅ Customizable navigation (arrows, dots)

---

## 1. Sanity Schema

### File: `sanity/schemaTypes/bannerType.ts`

The banner schema defines the following fields:

#### Core Text Fields
- **title** (string, required): Banner headline
- **description** (text, required): Banner subtitle/description
- **buttonText** (string, required): CTA button label
- **buttonLink** (string, required): CTA button URL (supports internal routes like `/products` or `/category/mens`)
- **altText** (string, required): Accessibility text for images

#### Responsive Image Fields
- **mobileImage** (image, required): Portrait-oriented image for mobile devices
  - Recommended size: 540x700px
  - Hotspot support for responsive crops
- **tabletImage** (image, required): Landscape-oriented image for tablets
  - Recommended size: 960x600px
  - Hotspot support for responsive crops
- **desktopImage** (image, required): Full-width image for desktop
  - Recommended size: 1920x600px
  - Hotspot support for responsive crops

#### Management Fields
- **isActive** (boolean): Toggle banner visibility (default: true)
- **order** (number): Display order in slider (lower numbers first)

### Preview Configuration
Banners display with their title and mobile image in the Sanity Studio list view, with active/inactive status.

---

## 2. GROQ Queries

### File: `sanity/helpers/queries.ts`

#### Get All Active Banners

```typescript
export const getAllBanners = async () => {
  const ALL_BANNERS_QUERY = defineQuery(
    `*[_type=="banner" && isActive==true] | order(order asc) {
      _id,
      title,
      description,
      buttonText,
      buttonLink,
      altText,
      mobileImage {
        asset->{
          _id,
          url
        },
        hotspot,
        crop
      },
      tabletImage {
        asset->{
          _id,
          url
        },
        hotspot,
        crop
      },
      desktopImage {
        asset->{
          _id,
          url
        },
        hotspot,
        crop
      }
    }`
  );
  try {
    const banners = await sanityFetch({
      query: ALL_BANNERS_QUERY,
    });
    return banners.data || [];
  } catch (error) {
    console.error("Error fetching banners:", error);
    return [];
  }
};
```

**Key Features:**
- Filters for active banners only (`isActive==true`)
- Orders by the `order` field (ascending)
- Expands image assets to get URLs
- Includes hotspot and crop data for potential image optimization
- Graceful error handling

---

## 3. Frontend Components

### Component 1: BannerSlider.tsx

**Purpose:** Client-side banner slider with autoplay, navigation, and responsive design

**Props:**
```typescript
interface BannerSliderProps {
  banners: Banner[];
  autoPlayInterval?: number;     // Default: 5000ms
  showDots?: boolean;            // Default: true
  showArrows?: boolean;          // Default: true
  height?: string;               // Tailwind height classes
}
```

**Features:**
- Auto-rotating slides with configurable interval
- Dot navigation for quick jumping
- Arrow navigation (left/right)
- Pause on hover
- Fade transitions between slides
- Responsive image handling with `<picture>` tag
- Overlay gradient for text readability
- Mobile-first responsive design

**Usage:**
```typescript
<BannerSlider
  banners={banners}
  autoPlayInterval={5000}
  showDots={true}
  showArrows={true}
  height="h-[400px] md:h-[500px] lg:h-[600px]"
/>
```

### Component 2: ResponsiveBanner.tsx

**Purpose:** Individual banner component with Next.js Image optimization (alternative to BannerSlider)

**Props:**
```typescript
interface ResponsiveBannerProps {
  banner: Banner;
  index?: number;
  height?: string;
}
```

**Features:**
- Uses Next.js `Image` component for automatic optimization
- Separate images for mobile, tablet, and desktop
- Loading states with opacity transitions
- Priority loading for first banner
- Automatic quality adjustment based on screen size

**Usage:**
```typescript
<ResponsiveBanner
  banner={banner}
  index={0}
  height="h-[400px] md:h-[500px] lg:h-[600px]"
/>
```

### Component 3: HomeBannerSection.tsx

**Purpose:** Server component that fetches banners and renders the slider

**Features:**
- Server-side data fetching
- Automatic null handling if no banners exist
- Zero JavaScript overhead for fetching

**Usage:**
```typescript
// In your layout or page component
import HomeBannerSection from '@/components/HomeBannerSection';

export default function Home() {
  return (
    <main>
      <HomeBannerSection />
      {/* Other page content */}
    </main>
  );
}
```

---

## 4. Custom Hook

### useBanners.ts

**Purpose:** React hook for managing banner data in client components

**Returns:**
```typescript
interface UseBannersReturn {
  banners: Banner[];
  loading: boolean;
  error: string | null;
}
```

**Usage:**
```typescript
'use client';

import { useBanners } from '@/hooks/useBanners';
import BannerSlider from '@/components/BannerSlider';

export default function MyComponent() {
  const { banners, loading, error } = useBanners();

  if (loading) return <div>Loading banners...</div>;
  if (error) return <div>Error: {error}</div>;

  return <BannerSlider banners={banners} />;
}
```

---

## 5. Image Optimization Strategies

### Strategy 1: Using `<picture>` Tag (BannerSlider)
```html
<picture>
  <source
    srcSet="mobile.jpg?w=540&h=700&fit=crop"
    media="(max-width: 767px)"
  />
  <source
    srcSet="tablet.jpg?w=960&h=600&fit=crop"
    media="(min-width: 768px) and (max-width: 1023px)"
  />
  <source
    srcSet="desktop.jpg?w=1920&h=600&fit=crop"
    media="(min-width: 1024px)"
  />
  <img src="fallback.jpg" alt="Banner" />
</picture>
```

**Pros:**
- Native browser support
- Efficient image selection
- No JavaScript needed

**Cons:**
- No automatic optimization
- Requires manual URL parameters

### Strategy 2: Next.js Image Component (ResponsiveBanner)
```typescript
<Image
  src={imageUrl}
  alt={altText}
  fill
  sizes="(max-width: 1023px) 100vw, 100vw"
  quality={75}
/>
```

**Pros:**
- Automatic format conversion (WebP, AVIF)
- Responsive srcset generation
- Built-in lazy loading
- Automatic quality optimization

**Cons:**
- Requires setup for external image domains
- Slightly larger bundle

---

## 6. Setup Instructions

### Step 1: Update Sanity Configuration

If you haven't already, ensure your `next.config.ts` allows external images:

```typescript
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
      },
    ],
  },
};

export default nextConfig;
```

### Step 2: Update TypeScript Types

After creating the banner schema, regenerate Sanity types:

```bash
npm run typegen
```

This will update `sanity.types.ts` with Banner type definitions.

### Step 3: Create Banners in Sanity Studio

1. Go to your Sanity Studio
2. Create a new document in the "Banners" section
3. Fill in all required fields:
   - Title
   - Description
   - Button Text
   - Button Link
   - Alt Text
   - Upload three images (mobile, tablet, desktop)
4. Set `isActive` to true
5. Set the `order` field (0 = first, 1 = second, etc.)
6. Publish

### Step 4: Use in Your Pages

#### In Home Page:

```typescript
// app/(client)/page.tsx
import HomeBannerSection from '@/components/HomeBannerSection';
import CategoryProducts from '@/components/CategoryProducts';

export default function Home() {
  return (
    <main>
      <HomeBannerSection />
      <CategoryProducts />
      {/* Other sections */}
    </main>
  );
}
```

#### In Custom Client Component:

```typescript
'use client';

import { useBanners } from '@/hooks/useBanners';
import BannerSlider from '@/components/BannerSlider';

export default function CustomBannerComponent() {
  const { banners, loading, error } = useBanners();

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error loading banners</div>;
  if (!banners.length) return <div>No banners available</div>;

  return (
    <section>
      <BannerSlider banners={banners} />
    </section>
  );
}
```

---

## 7. Customization Guide

### Change Slider Height
```typescript
<BannerSlider
  banners={banners}
  height="h-[300px] md:h-[400px] lg:h-[700px]"
/>
```

### Disable Autoplay
```typescript
<BannerSlider
  banners={banners}
  autoPlayInterval={0}  // Disables autoplay
/>
```

### Hide Navigation
```typescript
<BannerSlider
  banners={banners}
  showDots={false}
  showArrows={false}
/>
```

### Custom Styling

Modify the `ResponsiveBanner.tsx` or `BannerSlider.tsx` components:

```typescript
// Change button styling
<Link
  href={banner.buttonLink}
  className="inline-block px-8 py-3 bg-blue-600 text-white font-bold rounded-md hover:bg-blue-700"
>
  {banner.buttonText}
</Link>
```

---

## 8. Performance Optimization Tips

1. **Image Compression**: Optimize images before uploading to Sanity
   - Mobile: 540x700px, <100KB
   - Tablet: 960x600px, <150KB
   - Desktop: 1920x600px, <250KB

2. **Use Sanity Image URL Parameters**:
   ```typescript
   // Add quality and format parameters
   `${url}?w=1920&h=600&q=80&auto=format`
   ```

3. **Lazy Load Banners**:
   ```typescript
   <HomeBannerSection />  // Uses server-side fetching
   ```

4. **Cache Configuration**: Set appropriate cache headers in Sanity config

---

## 9. Troubleshooting

### Banners Not Appearing
- Check if `isActive` is set to `true` in Sanity
- Verify the GROQ query returns data in Sanity Vision
- Check browser console for errors

### Images Not Loading
- Verify image URLs in Sanity are accessible
- Check if `cdn.sanity.io` is in Next.js image remotePatterns
- Ensure alt text is provided

### Slider Not Animating
- Check if JavaScript is enabled
- Verify BannerSlider is rendered on client-side (`'use client'`)
- Check browser console for errors

### TypeScript Errors
- Run `npm run typegen` to regenerate types
- Verify imports match file locations

---

## 10. File Structure Summary

```
project-root/
├── sanity/
│   ├── schemaTypes/
│   │   ├── bannerType.ts          (Banner schema)
│   │   └── index.ts               (Updated with bannerType)
│   ├── helpers/
│   │   └── queries.ts             (GROQ queries - getAllBanners)
│
├── components/
│   ├── BannerSlider.tsx           (Client slider component)
│   ├── ResponsiveBanner.tsx       (Single banner with Next.js Image)
│   └── HomeBannerSection.tsx      (Server component wrapper)
│
├── hooks/
│   └── useBanners.ts              (Custom hook for banner data)
│
└── sanity.types.ts                (Auto-generated types)
```

---

## 11. API Reference

### Banner Interface

```typescript
interface Banner {
  _id: string;
  title: string;
  description: string;
  buttonText: string;
  buttonLink: string;
  altText: string;
  mobileImage: BannerImage;
  tabletImage: BannerImage;
  desktopImage: BannerImage;
}

interface BannerImage {
  asset?: {
    _id: string;
    url: string;
  };
  hotspot?: {
    x: number;
    y: number;
    height: number;
    width: number;
  };
  crop?: {
    top: number;
    bottom: number;
    left: number;
    right: number;
  };
}
```

---

## 12. Production Checklist

- [ ] All banner images are optimized and compressed
- [ ] GROQ query tested in Sanity Vision
- [ ] Banner schema deployed to Sanity
- [ ] `npm run typegen` executed
- [ ] BannerSlider imported in homepage
- [ ] Tested on mobile, tablet, and desktop
- [ ] Image URLs accessible from external CDN
- [ ] Alt text is descriptive and accurate
- [ ] Button links are correct
- [ ] Autoplay interval is appropriate

---

This banner management system is fully production-ready and follows Next.js and React best practices!
