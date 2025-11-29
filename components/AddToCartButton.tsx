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
}

const AddToCartButton = ({ product, className }: Props) => {
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
    (c) => c.colorName === selectedColor
  )?.sizes;

  // Calculate stock for selected color and size
  const selectedSizeStock = availableSizes?.find(
    (s) => s.size === selectedSize
  )?.stock;
  const isOutOfStock = selectedSizeStock === 0 || selectedSizeStock === undefined;

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
      <div className="w-full flex flex-col gap-1.5">
        {/* Color Selection */}
        <div className="flex flex-col gap-0.5">
          <label className="text-xs font-semibold text-darkColor">
            Color: <span className="font-normal">{selectedColor}</span>
          </label>
          <div className="flex gap-1.5 flex-wrap">
            {product.colors.map((color) => (
              <button
                key={color.colorName}
                onClick={() => {
                  setSelectedColor(color.colorName);
                  setSelectedSize(color.sizes?.[0]?.size);
                }}
                className={cn(
                  "w-7 h-7 rounded-full border-2 transition-all",
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
        <div className="flex flex-col gap-0.5">
          <label className="text-xs font-semibold text-darkColor">
            Size: <span className="font-normal">{selectedSize?.toUpperCase()}</span>
          </label>
          <div className="flex gap-1 flex-wrap">
            {availableSizes?.map((size) => (
              <button
                key={size.size}
                onClick={() => setSelectedSize(size.size)}
                disabled={size.stock === 0}
                className={cn(
                  "px-2 py-1 border rounded-md text-xs font-semibold transition-all",
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
            <p className="w-full text-center text-sm text-red-600 font-semibold py-2">
              Out of stock
            </p>
          ) : itemCount ? (
            <div className="w-full text-sm">
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground">Qty:</span>
                <QuantityButtons
                  product={product}
                  color={selectedColor}
                  size={selectedSize}
                />
              </div>
              <div className="flex items-center justify-between border-t pt-1">
                <span className="text-xs font-semibold">Total</span>
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
                className
              )}
            >
              Quick Pick
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
