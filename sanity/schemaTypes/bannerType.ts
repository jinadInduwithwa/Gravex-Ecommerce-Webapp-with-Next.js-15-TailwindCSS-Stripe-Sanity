import { defineField, defineType } from "sanity";

export const bannerType = defineType({
  name: "banner",
  title: "Banners",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Banner Title",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "description",
      title: "Banner Description",
      type: "text",
      rows: 3,
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "buttonText",
      title: "Button Text",
      type: "string",
      description: "Text displayed on the CTA button",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "buttonLink",
      title: "Button Link",
      type: "string",
      description: "URL or internal link for the button (e.g., /products, /category/mens)",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "mobileImage",
      title: "Mobile Image (Portrait - 540x700px recommended)",
      type: "image",
      options: {
        hotspot: true,
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "tabletImage",
      title: "Tablet Image (Landscape - 960x600px recommended)",
      type: "image",
      options: {
        hotspot: true,
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "desktopImage",
      title: "Desktop Image (Full Width - 1920x600px recommended)",
      type: "image",
      options: {
        hotspot: true,
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "altText",
      title: "Alt Text for Accessibility",
      type: "string",
      description: "Describe the banner image for screen readers",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "isActive",
      title: "Active",
      type: "boolean",
      description: "Enable or disable this banner",
      initialValue: true,
    }),
    defineField({
      name: "order",
      title: "Display Order",
      type: "number",
      description: "Lower numbers appear first",
      initialValue: 0,
    }),
  ],
  preview: {
    select: {
      title: "title",
      media: "mobileImage",
      isActive: "isActive",
    },
    prepare(selection) {
      const { title, media, isActive } = selection;
      return {
        title: title,
        media: media,
        subtitle: isActive ? "Active" : "Inactive",
      };
    },
  },
});
