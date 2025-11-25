# Banner System - Quick Reference

## 🚀 5-Minute Setup

### 1. Generate Types
```bash
npm run typegen
```

### 2. Create Banner in Sanity Studio
- Title: "Your Banner Title"
- Description: "Your description"
- ButtonText: "Shop Now"
- ButtonLink: "/products"
- altText: "Description for accessibility"
- Upload 3 images (mobile, tablet, desktop)
- Set Active: ON
- Set Order: 0
- Publish

### 3. Add to Homepage
```typescript
// app/(client)/page.tsx
import HomeBannerSection from "@/components/HomeBannerSection";

export default function Home() {
  return (
    <div>
      <HomeBannerSection />
      {/* Rest of page */}
    </div>
  );
}
```

### 4. Done! 🎉

---

## 📦 Components Available

### `<HomeBannerSection />`
Server component - Recommended for homepage
```typescript
<HomeBannerSection />
```

### `<BannerSlider />`
Client component with full control
```typescript
<BannerSlider
  banners={banners}
  autoPlayInterval={5000}
  showDots={true}
  showArrows={true}
/>
```

### `<ResponsiveBanner />`
Single banner with Next.js Image optimization
```typescript
<ResponsiveBanner banner={banner} index={0} />
```

### `useBanners` Hook
Client-side hook for custom implementations
```typescript
const { banners, loading, error } = useBanners();
```

---

## 🔗 GROQ Query

**File:** `sanity/helpers/queries.ts`

```typescript
getAllBanners()  // Returns: Promise<Banner[]>
```

---

## 📱 Responsive Breakpoints

| Screen | Image | Width Range |
|--------|-------|-------------|
| Mobile | mobileImage | < 768px |
| Tablet | tabletImage | 768px - 1023px |
| Desktop | desktopImage | ≥ 1024px |

---

## 🎨 Customization Examples

### Change Height
```typescript
<BannerSlider banners={banners} height="h-96 md:h-full lg:h-screen" />
```

### Disable Autoplay
```typescript
<BannerSlider banners={banners} autoPlayInterval={0} />
```

### Hide Navigation
```typescript
<BannerSlider banners={banners} showDots={false} showArrows={false} />
```

### Modify Button Style
Edit `BannerSlider.tsx` or `ResponsiveBanner.tsx`:
```typescript
<Link
  href={banner.buttonLink}
  className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
>
  {banner.buttonText}
</Link>
```

---

## 📊 Banner Fields in Sanity

| Field | Type | Required | Purpose |
|-------|------|----------|---------|
| title | string | ✅ | Banner headline |
| description | text | ✅ | Banner subtitle |
| buttonText | string | ✅ | CTA button label |
| buttonLink | string | ✅ | Button URL |
| altText | string | ✅ | Image accessibility |
| mobileImage | image | ✅ | Portrait image |
| tabletImage | image | ✅ | Landscape image |
| desktopImage | image | ✅ | Full-width image |
| isActive | boolean | ❌ | Show/hide banner |
| order | number | ❌ | Display priority |

---

## 🎯 Best Practices

✅ Upload optimized images (not original 4K files)
✅ Set descriptive alt text for accessibility
✅ Use clear, concise button text
✅ Test on mobile, tablet, desktop
✅ Keep description under 100 characters
✅ Set unique order numbers for each banner

---

## 🐛 Quick Troubleshooting

| Problem | Solution |
|---------|----------|
| Banners not showing | Check `isActive=true` in Sanity |
| Images not loading | Run `npm run typegen` |
| Slider not working | Check console for errors |
| Types not found | Run `npm run typegen` again |

---

## 📂 Key Files

```
sanity/schemaTypes/bannerType.ts ..................... Schema
sanity/helpers/queries.ts ............................ Queries
components/BannerSlider.tsx .......................... Slider
components/ResponsiveBanner.tsx ...................... Single
components/HomeBannerSection.tsx ..................... Server
hooks/useBanners.ts .................................. Hook
```

---

## 🔍 Test Your Setup

1. Visit Sanity Studio
2. Click "Banners"
3. Create a test banner
4. Go to Vision
5. Run: `*[_type=="banner" && isActive==true]`
6. Should see your banner in results

---

## 💡 Pro Tips

- Use `order: 0` for the first banner, `1` for second, etc.
- Toggle `isActive` to quickly hide banners
- Image URLs are optimized automatically by Sanity
- Banners cache for better performance
- Use internal routes: `/products`, `/category/men`

---

## 🚀 Ready to Deploy?

1. All banners created in Sanity ✅
2. Styles customized ✅
3. Tested on all devices ✅
4. `npm run build` passes ✅
5. Deploy to production! 🎉

---

## 📖 Full Documentation

See `BANNER_SYSTEM_DOCUMENTATION.md` for complete details.
