import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Product } from "./sanity.types";

export interface CartItem {
  product: Product;
  quantity: number;
  selectedColor?: string;
  selectedSize?: string;
}

interface CartState {
  items: CartItem[];
  addItem: (product: Product, color?: string, size?: string) => void;
  removeItem: (productId: string, color?: string, size?: string) => void;
  deleteCartProduct: (productId: string, color?: string, size?: string) => void;
  resetCart: () => void;
  getTotalPrice: () => number;
  getSubtotalPrice: () => number;
  getItemCount: (productId: string, color?: string, size?: string) => number;
  getGroupedItems: () => CartItem[];
  getColorSizeKey: (color?: string, size?: string) => string;
}

const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      getColorSizeKey: (color?: string, size?: string) => {
        return `${color || "default"}-${size || "default"}`;
      },
      addItem: (product, color, size) =>
        set((state) => {
          const key = get().getColorSizeKey(color, size);
          const existingItem = state.items.find(
            (item) =>
              item.product._id === product._id &&
              get().getColorSizeKey(item.selectedColor, item.selectedSize) ===
                key
          );
          if (existingItem) {
            return {
              items: state.items.map((item) =>
                item.product._id === product._id &&
                get().getColorSizeKey(item.selectedColor, item.selectedSize) ===
                  key
                  ? { ...item, quantity: item.quantity + 1 }
                  : item
              ),
            };
          } else {
            return {
              items: [
                ...state.items,
                { product, quantity: 1, selectedColor: color, selectedSize: size },
              ],
            };
          }
        }),
      removeItem: (productId, color, size) =>
        set((state) => {
          const key = get().getColorSizeKey(color, size);
          return {
            items: state.items.reduce((acc, item) => {
              if (
                item.product._id === productId &&
                get().getColorSizeKey(item.selectedColor, item.selectedSize) ===
                  key
              ) {
                if (item.quantity > 1) {
                  acc.push({ ...item, quantity: item.quantity - 1 });
                }
              } else {
                acc.push(item);
              }
              return acc;
            }, [] as CartItem[]),
          };
        }),
      deleteCartProduct: (productId, color, size) =>
        set((state) => {
          const key = get().getColorSizeKey(color, size);
          return {
            items: state.items.filter(
              (item) =>
                !(
                  item.product._id === productId &&
                  get().getColorSizeKey(item.selectedColor, item.selectedSize) ===
                    key
                )
            ),
          };
        }),
      resetCart: () => set({ items: [] }),
      getTotalPrice: () => {
        return get().items.reduce(
          (total, item) => total + (item.product.price ?? 0) * item.quantity,
          0
        );
      },
      getSubtotalPrice: () => {
        return get().items.reduce((total, item) => {
          const price = item.product.price ?? 0;
          const discount = ((item.product.discount ?? 0) * price) / 100;
          const discountedPrice = price + discount;
          return total + discountedPrice * item.quantity;
        }, 0);
      },
      getItemCount: (productId, color, size) => {
        const key = get().getColorSizeKey(color, size);
        const item = get().items.find(
          (item) =>
            item.product._id === productId &&
            get().getColorSizeKey(item.selectedColor, item.selectedSize) === key
        );
        return item ? item.quantity : 0;
      },
      getGroupedItems: () => get().items,
    }),
    { name: "cart-store" }
  )
);

export default useCartStore;
