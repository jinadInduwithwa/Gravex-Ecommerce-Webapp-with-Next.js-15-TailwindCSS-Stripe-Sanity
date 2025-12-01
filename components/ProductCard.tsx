import { Product } from "@/sanity.types";
import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import PriceView from "./PriceView";
import AddToCartButton from "./AddToCartButton";

const ProductCard = ({ product }: { product: Product }) => {
  // Calculate total stock from colors
  const totalStock =
    product?.colors?.reduce((total: number, color: { sizes?: Array<{ stock?: number }> }) => {
      const colorStock =
        color.sizes?.reduce((sum: number, size: { stock?: number }) => sum + (size.stock || 0), 0) || 0;
      return total + colorStock;
    }, 0) || product?.stock || 0;

  const hasStock = totalStock > 0;

  return (
    <div className="group text-sm overflow-hidden rounded-sm   transition-shadow">
      <div className="bg-gradient-to-r from-zinc-200 via-zinc-300 to-zinc-200 overflow-hidden relative ">
        {product?.images && (
          <Link href={`/product/${product?.slug?.current}`}>
            <Image
              src={urlFor(product?.images[0]).url()}
              width={500}
              height={500}
              alt="productImage"
              priority
              className={`w-full h-40 sm:h-56 md:h-64 lg:h-72 object-cover overflow-hidden hoverEffect ${hasStock && "group-hover:scale-105"}`}
            />
          </Link>
        )}
        {!hasStock && (
          <div className="absolute top-0 left-0 w-full h-full bg-darkColor/50 flex items-center justify-center">
            <p className="text-xl text-white font-semibold text-center">
              Out of Stock
            </p>
          </div>
        )}

        {/* Color Indicators */}
        {product?.colors && product.colors.length > 0 && (
          <div className="absolute bottom-2 left-2 right-2 flex gap-1 flex-wrap">
            {product.colors.slice(0, 5).map((color: { colorName?: string; colorCode?: string }) => (
              <div
                key={color.colorName}
                title={color.colorName}
                className="w-5 h-5 rounded-full border-2 border-white shadow-md"
                style={{ backgroundColor: color.colorCode || "#ccc" }}
              />
            ))}
            {product.colors.length > 5 && (
              <div className="w-5 h-5 rounded-full border-2 border-white shadow-md bg-white flex items-center justify-center text-xs font-bold">
                +{product.colors.length - 5}
              </div>
            )}
          </div>
        )}
      </div>
      <div className="py-2 px-2 sm:py-3 flex flex-col gap-1 sm:gap-1.5 bg-white border border-t-0 ">
        <h2 className="font-semibold line-clamp-1 text-xs sm:text-sm">{product?.name}</h2>
        <PriceView
          className="text-sm sm:text-lg"
          price={product?.price}
          discount={product?.discount}
        />
        <AddToCartButton product={product} />
      </div>
    </div>
  );
};

export default ProductCard;
