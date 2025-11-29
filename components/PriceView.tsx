import React from "react";
import PriceFormatter from "./PriceFormatter";
import { cn } from "@/lib/utils";

interface Props {
  price: number | undefined;
  discount: number | undefined;
  className?: string;
}

const PriceView = ({ price, discount, className }: Props) => {
  // Calculate discounted price
  const discountedPrice = price && discount ? price - (discount * price) / 100 : price;
  
  // Don't show if there's no valid price
  if (!discountedPrice || discountedPrice === 0) {
    return null;
  }
  
  return (
    <div className="flex flex-col gap-0.5">
      {/* Show discounted price (larger, bold) */}
      <PriceFormatter 
        amount={discountedPrice} 
        className={cn("font-bold text-base sm:text-lg", className)} 
      />
      {/* Show original price (smaller, strikethrough) only if there's a discount */}
      {price && discount && discount > 0 && (
        <PriceFormatter
          amount={price}
          className={cn("line-through font-medium text-zinc-500 text-xs", className)}
        />
      )}
    </div>
  );
};

export default PriceView;
