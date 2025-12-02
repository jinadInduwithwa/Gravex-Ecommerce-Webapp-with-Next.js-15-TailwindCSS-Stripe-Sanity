import { defineQuery } from "next-sanity";
import { sanityFetch } from "../lib/live";

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

export const getProductBySlug = async (slug: string) => {
  const PRODUCT_BY_SLUG_QUERY = defineQuery(
    `*[_type == 'product' && slug.current == $slug] | order(name asc) [0] {
      ...,
      colors[] {
        colorName,
        colorCode,
        colorImage,
        sizes[] {
          size,
          stock
        }
      },
      sizeGuideImage
    }`
  );
  try {
    const product = await sanityFetch({
      query: PRODUCT_BY_SLUG_QUERY,
      params: {
        slug,
      },
    });
    return product?.data || null;
  } catch (error) {
    console.error("Error fetching product by Slug:", error);
  }
};

export const getAllCategories = async () => {
  const CATEGORIES_QUERY = defineQuery(
    `*[_type=="category"] | order(title asc) {
      _id,
      title,
      slug,
      description,
      image {
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
    const categories = await sanityFetch({
      query: CATEGORIES_QUERY,
    });
    return categories.data || [];
  } catch (error) {
    console.error("Error fetching all categories");

    return [];
  }
};

export const getProductsByCategory = async (categorySlug: string) => {
  if (!categorySlug) {
    return [];
  }
  const PRODUCTS_BY_CATEGORY_QUERY = defineQuery(
    `*[_type == 'product' && references(*[_type == 'category' && slug.current == $categorySlug]._id)] {
      _id,
      name,
      slug,
      price,
      discount,
      stock,
      _createdAt,
      images[],
      colors[] {
        colorName,
        colorCode,
        colorImage,
        sizes[] {
          size,
          stock
        }
      }
    }`
  );

  try {
    const products = await sanityFetch({
      query: PRODUCTS_BY_CATEGORY_QUERY,
      params: { categorySlug },
    });
    return products?.data || [];
  } catch (error) {
    console.error("Error fetching products by category:", error);
    return [];
  }
};

export const getMyOrders = async (userId: string) => {
  if (!userId) {
    throw new Error("User ID is required");
  }
  const MY_ORDERS_QUERY =
    defineQuery(`*[_type == 'order' && clerkUserId == $userId] | order(orderData desc){
    ...,products[]{
      ...,product->
    }
  }`);

  try {
    const orders = await sanityFetch({
      query: MY_ORDERS_QUERY,
      params: { userId },
    });
    return orders?.data || [];
  } catch (error) {
    console.error("Error fetching orders:", error);
    return [];
  }
};

export const getProductsByVariant = async (variant: string) => {
  if (!variant) {
    return [];
  }
  const PRODUCTS_BY_VARIANT_QUERY = defineQuery(
    `*[_type == 'product' && variant == $variant] {
      _id,
      name,
      slug,
      price,
      discount,
      stock,
      _createdAt,
      images[],
      colors[] {
        colorName,
        colorCode,
        colorImage,
        sizes[] {
          size,
          stock
        }
      }
    }`
  );

  try {
    const products = await sanityFetch({
      query: PRODUCTS_BY_VARIANT_QUERY,
      params: { variant: variant.toLowerCase() },
    });
    return products?.data || [];
  } catch (error) {
    console.error("Error fetching products by variant:", error);
    return [];
  }
};
