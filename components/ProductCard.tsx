import { Product } from "@/sanity.types";
import { urlFor } from "@/sanity/lib/image";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import PriceView from "./PriceView";
import AddToCartButton from "./AddToCartButton";

export type ViewType = "grid" | "compact" | "showcase";

interface ProductCardProps {
  product: Product;
  viewType?: ViewType;
}

const ProductCard = ({ product, viewType = "grid" }: ProductCardProps) => {
  // Calculate total stock from colors
  const totalStock =
    product?.colors?.reduce((total: number, color: { sizes?: Array<{ stock?: number }> }) => {
      const colorStock =
        color.sizes?.reduce((sum: number, size: { stock?: number }) => sum + (size.stock || 0), 0) || 0;
      return total + colorStock;
    }, 0) || product?.stock || 0;

  const hasStock = totalStock > 0;

  // Dynamic styles based on view type
  const getContainerClasses = () => {
    switch (viewType) {
      case "compact":
        return "group text-xs overflow-hidden rounded-sm transition-shadow h-full flex flex-col";
      case "showcase":
        return "group text-base overflow-hidden rounded-lg transition-all hover:shadow-xl h-full";
      case "grid":
      default:
        return "group text-sm overflow-hidden rounded-sm transition-shadow";
    }
  };

  const getImageContainerClasses = () => {
    switch (viewType) {
      case "compact":
        return "bg-gradient-to-r from-zinc-200 via-zinc-300 to-zinc-200 overflow-hidden relative flex-shrink-0 aspect-square";
      case "showcase":
        return "bg-gradient-to-r from-zinc-200 via-zinc-300 to-zinc-200 overflow-hidden relative w-full flex-shrink-0 aspect-square lg:aspect-video";
      case "grid":
      default:
        return "bg-gradient-to-r from-zinc-200 via-zinc-300 to-zinc-200 overflow-hidden relative aspect-square";
    }
  };

  const getImageClasses = () => {
    switch (viewType) {
      case "compact":
        return "w-full h-full object-contain";
      case "showcase":
        return "w-full h-full object-contain";
      case "grid":
      default:
        return "w-full h-full object-contain";
    }
  };

  const getColorIndicatorClasses = () => {
    switch (viewType) {
      case "compact":
        return "absolute bottom-1 left-1 right-1 flex gap-0.5";
      case "showcase":
        return "absolute bottom-4 left-4 right-4 flex gap-2 flex-wrap";
      case "grid":
      default:
        return "absolute bottom-2 left-2 right-2 flex gap-1 flex-wrap";
    }
  };

  const getColorDotClasses = () => {
    switch (viewType) {
      case "compact":
        return "w-3 h-3 rounded-full border-1 border-white shadow-md";
      case "showcase":
        return "w-7 h-7 rounded-full border-2 border-white shadow-md hover:scale-110 transition-transform";
      case "grid":
      default:
        return "w-5 h-5 rounded-full border-2 border-white shadow-md";
    }
  };

  const getColorMoreDotClasses = () => {
    switch (viewType) {
      case "compact":
        return "w-3 h-3 rounded-full border-1 border-white shadow-md bg-white flex items-center justify-center text-xs font-bold";
      case "showcase":
        return "w-7 h-7 rounded-full border-2 border-white shadow-md bg-white flex items-center justify-center text-sm font-bold hover:scale-110 transition-transform";
      case "grid":
      default:
        return "w-5 h-5 rounded-full border-2 border-white shadow-md bg-white flex items-center justify-center text-xs font-bold";
    }
  };

  const getContentClasses = () => {
    switch (viewType) {
      case "compact":
        return "py-1 px-1 sm:py-1.5 sm:px-1.5 flex flex-col gap-0.5 sm:gap-1 bg-white border border-t-0 flex-grow flex-shrink-0";
      case "showcase":
        return "py-4 px-4 sm:py-5 sm:px-5 md:py-6 md:px-6 flex flex-col gap-3 sm:gap-4 flex-grow bg-white";
      case "grid":
      default:
        return "py-2 px-2 sm:py-2.5 sm:px-2.5 md:py-3 md:px-3 flex flex-col gap-1 sm:gap-1.5 bg-white border border-t-0";
    }
  };

  const getNameClasses = () => {
    switch (viewType) {
      case "compact":
        return "font-semibold line-clamp-1 text-xs";
      case "showcase":
        return "font-bold text-base sm:text-lg md:text-xl line-clamp-2";
      case "grid":
      default:
        return "font-semibold line-clamp-1 text-xs sm:text-sm";
    }
  };

  const getPriceClasses = () => {
    switch (viewType) {
      case "compact":
        return "text-xs sm:text-sm font-semibold";
      case "showcase":
        return "text-base sm:text-lg md:text-xl font-bold";
      case "grid":
      default:
        return "text-xs sm:text-sm md:text-base font-semibold";
    }
  };

  const getOutOfStockClasses = () => {
    switch (viewType) {
      case "compact":
        return "text-xs sm:text-sm text-white font-semibold text-center px-1";
      case "showcase":
        return "text-lg text-white font-semibold text-center";
      case "grid":
      default:
        return "text-xl text-white font-semibold text-center";
    }
  };

  const getColorCountText = () => {
    switch (viewType) {
      case "compact":
        return product?.colors?.length || 0 > 3 ? "+" : "";
      case "showcase":
        return product?.colors?.length || 0 > 8 ? `+${product?.colors?.length - 8}` : "";
      case "grid":
      default:
        return product?.colors?.length || 0 > 5 ? `+${product?.colors?.length - 5}` : "";
    }
  };

  const getColorsSliceCount = () => {
    switch (viewType) {
      case "compact":
        return 3;
      case "showcase":
        return 8;
      case "grid":
      default:
        return 5;
    }
  };

  return (
    <div className={getContainerClasses()}>
      {/* Showcase Layout */}
      {viewType === "showcase" && (
        <div className="flex flex-col lg:flex-row gap-3 lg:gap-4 h-full bg-white border rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow">
          {/* Image Container */}
          <div className={getImageContainerClasses()}>
            {product?.images && (
              <Link href={`/product/${product?.slug?.current}`}>
                <Image
                  src={urlFor(product?.images[0]).url()}
                  width={500}
                  height={500}
                  alt="productImage"
                  priority
                  className={`${getImageClasses()} object-cover overflow-hidden hoverEffect ${
                    hasStock && "group-hover:scale-105"
                  }`}
                />
              </Link>
            )}
            {!hasStock && (
              <div className="absolute top-0 left-0 w-full h-full bg-darkColor/50 flex items-center justify-center">
                <p className={getOutOfStockClasses()}>Out of Stock</p>
              </div>
            )}

            {/* Color Indicators */}
            {product?.colors && product.colors.length > 0 && (
              <div className={getColorIndicatorClasses()}>
                {product.colors.slice(0, getColorsSliceCount()).map((color: { colorName?: string; colorCode?: string }) => (
                  <div
                    key={color.colorName}
                    title={color.colorName}
                    className={getColorDotClasses()}
                    style={{ backgroundColor: color.colorCode || "#ccc" }}
                  />
                ))}
                {product.colors.length > getColorsSliceCount() && (
                  <div
                    className={getColorMoreDotClasses()}
                    title={`+${product.colors.length - getColorsSliceCount()} more colors`}
                  >
                    {getColorCountText()}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Content Container */}
          <div className={getContentClasses()}>
            <div className="flex-grow">
              <h2 className={getNameClasses()}>
                <Link href={`/product/${product?.slug?.current}`} className="hover:text-blue-600 transition-colors line-clamp-2">
                  {product?.name}
                </Link>
              </h2>
              {viewType === "showcase" && (
                <p className="text-gray-600 text-xs sm:text-sm line-clamp-1 mt-1">
                  Available in {product?.colors?.length || 0} color{(product?.colors?.length || 0) !== 1 ? "s" : ""}
                </p>
              )}
            </div>

            <div className="my-2 sm:my-3">
              <PriceView
                className={getPriceClasses()}
                price={product?.price}
                discount={product?.discount}
              />
            </div>

            {viewType === "showcase" && (
              <div>
                <AddToCartButton product={product} />
              </div>
            )}
          </div>
        </div>
      )}

      {/* Grid/Compact Layout */}
      {(viewType === "grid" || viewType === "compact") && (
        <>
          <div className={getImageContainerClasses()}>
            {product?.images && (
              <Link href={`/product/${product?.slug?.current}`}>
                <Image
                  src={urlFor(product?.images[0]).url()}
                  width={500}
                  height={500}
                  alt="productImage"
                  priority
                  className={`${getImageClasses()} object-cover overflow-hidden hoverEffect ${
                    hasStock && "group-hover:scale-105"
                  }`}
                />
              </Link>
            )}
            {!hasStock && (
              <div className="absolute top-0 left-0 w-full h-full bg-darkColor/50 flex items-center justify-center">
                <p className={getOutOfStockClasses()}>Out of Stock</p>
              </div>
            )}

            {/* Color Indicators */}
            {product?.colors && product.colors.length > 0 && (
              <div className={getColorIndicatorClasses()}>
                {product.colors.slice(0, getColorsSliceCount()).map((color: { colorName?: string; colorCode?: string }) => (
                  <div
                    key={color.colorName}
                    title={color.colorName}
                    className={getColorDotClasses()}
                    style={{ backgroundColor: color.colorCode || "#ccc" }}
                  />
                ))}
                {product.colors.length > getColorsSliceCount() && (
                  <div
                    className={getColorMoreDotClasses()}
                    title={`+${product.colors.length - getColorsSliceCount()} more colors`}
                  >
                    {getColorCountText()}
                  </div>
                )}
              </div>
            )}
          </div>

          <div className={getContentClasses()}>
            <h2 className={getNameClasses()}>{product?.name}</h2>
            <PriceView
              className={getPriceClasses()}
              price={product?.price}
              discount={product?.discount}
            />
            {viewType === "grid" && <AddToCartButton product={product} />}
            {viewType === "compact" && (
              <div className="hidden">
                <AddToCartButton product={product} />
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default ProductCard;
