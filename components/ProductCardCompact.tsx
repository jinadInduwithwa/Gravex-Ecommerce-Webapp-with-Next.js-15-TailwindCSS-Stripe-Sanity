import { Product } from "@/sanity.types";
import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import PriceView from "./PriceView";
import AddToCartButton from "./AddToCartButton";

const ProductCardCompact = ({ product }: { product: Product }) => {
  // Calculate total stock from colors
  const totalStock =
    product?.colors?.reduce((total: number, color: { sizes?: Array<{ stock?: number }> }) => {
      const colorStock =
        color.sizes?.reduce((sum: number, size: { stock?: number }) => sum + (size.stock || 0), 0) || 0;
      return total + colorStock;
    }, 0) || product?.stock || 0;

  const hasStock = totalStock > 0;

  return (
    <div className="group text-xs overflow-hidden rounded-sm transition-shadow h-full flex flex-col">
      {/* Image Container - Compact */}
      <div className="bg-gradient-to-r from-zinc-200 via-zinc-300 to-zinc-200 overflow-hidden relative flex-shrink-0">
        {product?.images && (
          <Link href={`/product/${product?.slug?.current}`}>
            <Image
              src={urlFor(product?.images[0]).url()}
              width={300}
              height={300}
              alt="productImage"
              priority
              className={`w-full h-24 sm:h-32 md:h-40 object-cover overflow-hidden hoverEffect ${
                hasStock && "group-hover:scale-105"
              }`}
            />
          </Link>
        )}
        {!hasStock && (
          <div className="absolute top-0 left-0 w-full h-full bg-darkColor/50 flex items-center justify-center">
            <p className="text-xs sm:text-sm text-white font-semibold text-center px-1">
              Out of Stock
            </p>
          </div>
        )}

        {/* Color Indicators - Compact */}
        {product?.colors && product.colors.length > 0 && (
          <div className="absolute bottom-1 left-1 right-1 flex gap-0.5">
            {product.colors.slice(0, 3).map((color: { colorName?: string; colorCode?: string }) => (
              <div
                key={color.colorName}
                title={color.colorName}
                className="w-3 h-3 rounded-full border-1 border-white shadow-md"
                style={{ backgroundColor: color.colorCode || "#ccc" }}
              />
            ))}
            {product.colors.length > 3 && (
              <div className="w-3 h-3 rounded-full border-1 border-white shadow-md bg-white flex items-center justify-center text-xs font-bold">
                +
              </div>
            )}
          </div>
        )}
      </div>

      {/* Content Container - Compact */}
      <div className="py-1 px-1 sm:py-1.5 flex flex-col gap-0.5 sm:gap-1 bg-white border border-t-0 flex-grow flex-shrink-0">
        <h2 className="font-semibold line-clamp-1 text-xs">{product?.name}</h2>
        <PriceView
          className="text-xs sm:text-sm font-semibold"
          price={product?.price}
          discount={product?.discount}
        />
        <div className="hidden">
          <AddToCartButton product={product} />
        </div>
      </div>
    </div>
  );
};

export default ProductCardCompact;
