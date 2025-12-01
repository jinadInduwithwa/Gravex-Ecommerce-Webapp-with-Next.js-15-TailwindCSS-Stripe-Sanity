"use client";
import { Product } from "@/sanity.types";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import QuantityButtons from "./QuantityButtons";
import PriceFormatter from "./PriceFormatter";
import useCartStore from "@/store";

interface Props {
  product: Product;
  className?: string;
  size?: "compact" | "large"; // 'compact' for product cards, 'large' for product page
}

const AddToCartButton = ({ product, className, size = "compact" }: Props) => {
  const { addItem, getItemCount } = useCartStore();
  const [selectedColor, setSelectedColor] = useState<string | undefined>(
    product?.colors?.[0]?.colorName
  );
  const [selectedSize, setSelectedSize] = useState<string | undefined>(
    product?.colors?.[0]?.sizes?.[0]?.size
  );

  const itemCount = getItemCount(product?._id, selectedColor, selectedSize);

  // Get available sizes for selected color
  const availableSizes = product?.colors?.find(
    (c: { colorName?: string; sizes?: Array<{ size?: string; stock?: number }> }) => c.colorName === selectedColor
  )?.sizes;

  // Calculate stock for selected color and size
  const selectedSizeStock = availableSizes?.find(
    (s: { size?: string; stock?: number }) => s.size === selectedSize
  )?.stock;
  const isOutOfStock = selectedSizeStock === 0 || selectedSizeStock === undefined;

  // Size-based styling
  const isLarge = size === "large";
  const colorButtonSize = isLarge ? "w-10 h-10" : "w-7 h-7";
  const colorLabelSize = isLarge ? "text-sm" : "text-xs";
  const sizeButtonSize = isLarge ? "px-3 py-2 text-sm" : "px-2 py-1 text-xs";
  const gapSize = isLarge ? "gap-2.5" : "gap-1.5";
  const gapSmall = isLarge ? "gap-1.5" : "gap-0.5";

  const handleAddToCart = () => {
    if (!selectedColor || !selectedSize) {
      toast.error("Please select both color and size");
      return;
    }
    addItem(product, selectedColor, selectedSize);
    toast.success(
      `${product?.name?.substring(0, 12)}... (${selectedColor}, ${selectedSize?.toUpperCase()}) added!`
    );
  };

  // If product has colors, show color and size selector
  if (product?.colors && product.colors.length > 0) {
    return (
      <div className={cn("w-full flex flex-col", gapSize)}>
        {/* Color Selection */}
        <div className={cn("flex flex-col", gapSmall)}>
          <label className={cn("font-semibold text-darkColor", colorLabelSize)}>
            Color: <span className="font-normal">{selectedColor}</span>
          </label>
          <div className={cn("flex flex-wrap", gapSize)}>
            {product.colors.map((color: { colorName?: string; colorCode?: string; sizes?: Array<{ size?: string; stock?: number }> }) => (
              <button
                key={color.colorName}
                onClick={() => {
                  setSelectedColor(color.colorName);
                  setSelectedSize(color.sizes?.[0]?.size);
                }}
                className={cn(
                  "rounded-full border-2 transition-all",
                  colorButtonSize,
                  selectedColor === color.colorName
                    ? "border-darkColor"
                    : "border-gray-300 hover:border-gray-400"
                )}
                style={{
                  backgroundColor: color.colorCode || "#ccc",
                }}
                title={color.colorName}
              />
            ))}
          </div>
        </div>

        {/* Size Selection */}
        <div className={cn("flex flex-col", gapSmall)}>
          <label className={cn("font-semibold text-darkColor", colorLabelSize)}>
            Size: <span className="font-normal">{selectedSize?.toUpperCase()}</span>
          </label>
          <div className={cn("flex flex-wrap", gapSize)}>
            {availableSizes?.map((size: { size?: string; stock?: number }) => (
              <button
                key={size.size}
                onClick={() => setSelectedSize(size.size)}
                disabled={size.stock === 0}
                className={cn(
                  "border rounded-md font-semibold transition-all",
                  sizeButtonSize,
                  selectedSize === size.size
                    ? "bg-darkColor text-white border-darkColor"
                    : "border-gray-300 text-darkColor hover:border-darkColor",
                  size.stock === 0 && "opacity-50 cursor-not-allowed"
                )}
              >
                {size.size?.toUpperCase()}
              </button>
            ))}
          </div>
        </div>

        {/* Add to Cart or Quantity Buttons */}
        <div className="w-full flex items-center">
          {isOutOfStock && itemCount === 0 ? (
            <p className={cn("w-full text-center text-red-600 font-semibold py-2", isLarge ? "text-base" : "text-sm")}>
              Out of stock
            </p>
          ) : itemCount ? (
            <div className={cn("w-full", isLarge ? "text-base" : "text-sm")}>
              <div className="flex items-center justify-between">
                <span className={cn("text-muted-foreground", isLarge ? "text-sm" : "text-xs")}>
                  {isLarge ? "Quantity:" : "Qty:"}
                </span>
                <QuantityButtons
                  product={product}
                  color={selectedColor}
                  size={selectedSize}
                />
              </div>
              <div className="flex items-center justify-between border-t pt-1 mt-1">
                <span className={cn("font-semibold", isLarge ? "text-sm" : "text-xs")}>
                  {isLarge ? "Total Price" : "Total"}
                </span>
                <PriceFormatter
                  amount={product?.price ? product?.price * itemCount : 0}
                />
              </div>
            </div>
          ) : (
            <Button
              onClick={handleAddToCart}
              className={cn(
                "w-full bg-darkColor text-white shadow-none border-none font-semibold tracking-wide hover:bg-darkColor/90 transition-colors hoverEffect",
                isLarge ? "text-base py-3" : "text-sm",
                className
              )}
            >
              {isLarge ? "Add to Cart" : "Quick Pick"}
            </Button>
          )}
        </div>
      </div>
    );
  }

  // Fallback for products without colors
  return (
    <div className="w-full flex items-center">
      {product?.stock === 0 && !itemCount ? (
        <p className="w-full text-center text-sm text-red-600 font-semibold py-2">
          Out of stock
        </p>
      ) : itemCount ? (
        <div className="w-full text-sm">
          <div className="flex items-center justify-between">
            <span className="text-xs text-muted-foreground">Quantity</span>
            <QuantityButtons product={product} />
          </div>
          <div className="flex items-center justify-between border-t pt-1">
            <span className="text-xs font-semibold">Subtotal</span>
            <PriceFormatter
              amount={product?.price ? product?.price * itemCount : 0}
            />
          </div>
        </div>
      ) : (
        <Button
          onClick={() => {
            addItem(product);
            toast.success(
              `${product?.name?.substring(0, 12)}... added successfully!`
            );
          }}
          className={cn(
            "w-full bg-darkColor text-white shadow-none border-none font-semibold tracking-wide hover:bg-darkColor/90 transition-colors hoverEffect",
            className
          )}
        >
          Add to cart
        </Button>
      )}
    </div>
  );
};

export default AddToCartButton;
