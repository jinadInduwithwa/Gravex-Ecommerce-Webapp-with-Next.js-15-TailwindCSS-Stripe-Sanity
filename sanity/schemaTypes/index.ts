import { type SchemaTypeDefinition } from "sanity";
import { categoryType } from "./categoryType";
import { productType } from "./productType";
import { orderType } from "./orderTypes";
import { bannerType } from "./bannerType";
import { promoBannerType } from "./promoBannerType";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [categoryType, productType, orderType, bannerType, promoBannerType],
};

