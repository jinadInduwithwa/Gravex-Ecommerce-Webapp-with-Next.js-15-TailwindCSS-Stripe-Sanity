// import { TrolleyIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const productType = defineType({
  name: "product",
  title: "Product",
  type: "document",
  // icon: TrolleyIcon,
  fields: [
    defineField({
      name: "name",
      title: "Product Name",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "name",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "images",
      title: "Product Images",
      type: "array",
      of: [{ type: "image", options: { hotspot: true } }],
    }),
    defineField({
      name: "intro",
      title: "Product Intro",
      type: "string",
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "string",
    }),
    defineField({
      name: "price",
      title: "Product Price",
      type: "number",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "discount",
      title: "Discount Percentage",
      type: "number",
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "categories",
      title: "Categories",
      type: "array",
      of: [{ type: "reference", to: { type: "category" } }],
    }),
    defineField({
      name: "stock",
      title: "Total Stock",
      type: "number",
      description: "Total stock across all sizes (auto-calculated from sizes array)",
      readOnly: true,
      validation: (Rule) => Rule.min(0),
    }),
    defineField({
      name: "colors",
      title: "Color Variants",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "colorName",
              title: "Color Name",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "colorCode",
              title: "Color Code (HEX)",
              type: "string",
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "colorImage",
              title: "Color Image",
              type: "image",
              options: { hotspot: true },
            }),
            defineField({
              name: "sizes",
              title: "Sizes and Stock for this Color",
              type: "array",
              of: [
                {
                  type: "object",
                  fields: [
                    defineField({
                      name: "size",
                      title: "Size",
                      type: "string",
                      options: {
                        list: [
                          { title: "XS", value: "xs" },
                          { title: "S", value: "s" },
                          { title: "M", value: "m" },
                          { title: "L", value: "l" },
                          { title: "XL", value: "xl" },
                          { title: "2XL", value: "2xl" },
                          { title: "3XL", value: "3xl" },
                          { title: "One Size", value: "onesize" },
                        ],
                      },
                      validation: (Rule) => Rule.required(),
                    }),
                    defineField({
                      name: "stock",
                      title: "Stock for this Size",
                      type: "number",
                      validation: (Rule) => Rule.required().min(0),
                    }),
                  ],
                  preview: {
                    select: {
                      size: "size",
                      stock: "stock",
                    },
                    prepare(selection) {
                      const { size, stock } = selection;
                      return {
                        title: size?.toUpperCase() || "Size",
                        subtitle: `Stock: ${stock || 0}`,
                      };
                    },
                  },
                },
              ],
              description: "Define sizes and their stock for this color variant",
            }),
          ],
          preview: {
            select: {
              colorName: "colorName",
              colorCode: "colorCode",
              image: "colorImage",
            },
            prepare(selection) {
              const { colorName, colorCode } = selection;
              return {
                title: colorName || "Color",
                subtitle: colorCode || "No color code",
              };
            },
          },
        },
      ],
      description: "Define color variants with their sizes and stock levels",
    }),
    defineField({
      name: "sizes",
      title: "Size Variants with Stock (Deprecated - Use Colors)",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({
              name: "size",
              title: "Size",
              type: "string",
              options: {
                list: [
                  { title: "XS", value: "xs" },
                  { title: "S", value: "s" },
                  { title: "M", value: "m" },
                  { title: "L", value: "l" },
                  { title: "XL", value: "xl" },
                  { title: "2XL", value: "2xl" },
                  { title: "3XL", value: "3xl" },
                  { title: "One Size", value: "onesize" },
                ],
              },
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: "stock",
              title: "Stock for this Size",
              type: "number",
              validation: (Rule) => Rule.required().min(0),
            }),
          ],
          preview: {
            select: {
              size: "size",
              stock: "stock",
            },
            prepare(selection) {
              const { size, stock } = selection;
              return {
                title: size?.toUpperCase() || "Size",
                subtitle: `Stock: ${stock || 0}`,
              };
            },
          },
        },
      ],
      description: "Legacy field - use Colors field instead",
    }),
    defineField({
      name: "status",
      title: "Product Status",
      type: "string",
      options: {
        list: [
          { title: "New", value: "new" },
          { title: "Hot", value: "hot" },
          { title: "Sale", value: "sale" },
        ],
      },
    }),
    defineField({
      name: "variant",
      title: "Product Type",
      type: "string",
      options: {
        list: [
          { title: "Tshirt", value: "tshirt" },
          { title: "Jacket", value: "jacket" },
          { title: "Pants", value: "pants" },
          { title: "Hoodie", value: "hoodie" },
          { title: "Short", value: "short" },
          { title: "Others", value: "others" },
        ],
      },
    }),
  ],
  preview: {
    select: {
      title: "name",
      media: "images",
      subtitle: "price",
    },
    prepare(selection) {
      const { title, subtitle, media } = selection;
      const image = media && media[0];
      return {
        title: title,
        subtitle: `$${subtitle}`,
        media: image,
      };
    },
  },
});
