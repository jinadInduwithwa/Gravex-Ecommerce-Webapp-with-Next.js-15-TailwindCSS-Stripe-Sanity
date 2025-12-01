import { Product } from "@/sanity.types";
import React from "react";
import { Button } from "./ui/button";
import { Minus, Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import useCartStore from "@/store";
import toast from "react-hot-toast";

interface Props {
  product: Product;
  color?: string;
  size?: string;
  className?: string;
}
const QuantityButtons = ({ product, color, size, className }: Props) => {
  const { addItem, getItemCount, removeItem } = useCartStore();
  const itemCount = getItemCount(product?._id, color, size);

  // Get stock for selected color and size
  let isOutOfStock = product?.stock === 0;
  if (color && product?.colors) {
    const selectedColor = product.colors.find(
      (c: { colorName?: string; sizes?: Array<{ size?: string; stock?: number }> }) => c.colorName === color
    );
    const selectedSizeStock = selectedColor?.sizes?.find(
      (s: { size?: string; stock?: number }) => s.size === size
    )?.stock;
    isOutOfStock = selectedSizeStock === 0 || selectedSizeStock === undefined;
  }

  const handleRemoveProduct = () => {
    removeItem(product?._id, color, size);
    if (itemCount > 1) {
      toast.success("Quantity Decreased successfully!");
    } else {
      toast.success(`${product?.name?.substring(0, 12)} removed successfully!`);
    }
  };
  return (
    <div className={cn("flex items-center gap-1 text-base pb-1", className)}>
      <Button
        onClick={handleRemoveProduct}
        disabled={itemCount === 0 || isOutOfStock}
        variant="outline"
        size="icon"
        className="w-6 h-6"
      >
        <Minus />
      </Button>
      <span className="font-semibold w-8 text-center text-darkColor">
        {itemCount}
      </span>
      <Button
        onClick={() => {
          addItem(product, color, size);
          toast.success(
            `${product?.name?.substring(0, 12)}... added successfully!`
          );
        }}
        variant="outline"
        size="icon"
        className="w-6 h-6"
      >
        <Plus />
      </Button>
    </div>
  );
};

export default QuantityButtons;
