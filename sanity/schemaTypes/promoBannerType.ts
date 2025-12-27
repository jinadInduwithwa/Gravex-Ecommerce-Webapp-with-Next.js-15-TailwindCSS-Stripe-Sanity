import { defineField, defineType } from "sanity";

export const promoBannerType = defineType({
    name: "promoBanner",
    title: "Promotional Banner",
    type: "document",
    fields: [
        defineField({
            name: "title",
            title: "Banner Title",
            type: "string",
            description: "Internal title for identification",
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: "linkUrl",
            title: "Link URL",
            type: "string",
            description: "Optional link when banner is clicked (e.g., /products, /category/mens)",
        }),
        defineField({
            name: "mobileImage",
            title: "Mobile Image (540x400px recommended)",
            type: "image",
            options: {
                hotspot: true,
            },
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: "tabletImage",
            title: "Tablet Image (960x400px recommended)",
            type: "image",
            options: {
                hotspot: true,
            },
            validation: (rule) => rule.required(),
        }),
        defineField({
            name: "desktopImage",
            title: "Desktop Image (1920x400px recommended)",
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
            description: "Enable or disable this promotional banner",
            initialValue: true,
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
