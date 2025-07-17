// src/sanity/store.ts
import { Product } from '@/sanity.types';
import {create} from 'zustand';
import {createJSONStorage, persist} from 'zustand/middleware';

interface CartItem{
    product:Product;
    quantity: number;
}

interface CartState{
    items: CartItem[];
    addItem: (product:Product) => void;
    removeItem: (productId: string) => void;
    deleteCartProduct: (productId: string) => void;
    resetCart: () => void;
    getTotalPrice: () => number;
    getSubtotalPrice: () => number;
    getItemCount: (productId: string) => number;
    getGroupedItem: () => CartItem[];
}

// Create the Zustand store with persist middleware
const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [], // Initial state: empty cart
      addItem: (product: Product) =>
        set((state) => {
          // Check if the product already exists in the cart
          const existingItem = state.items.find(
            (item) => item.product._id === product._id
          );

          if (existingItem) {
            // If product exists, increment its quantity
            return {
              items: state.items.map((item) =>
                item.product._id === product._id
                  ? { ...item, quantity: item.quantity + 1 }
                  : item
              ),
            };
          } else {
            // If product doesn't exist, add it with quantity 1
            return {
              items: [...state.items, { product, quantity: 1 }],
            };
          }
        }),
        
       removeItem: (productId: string) =>
        set((state) => ({
          items: state.items.reduce<CartItem[]>((acc, item) => {
            if (item.product._id === productId) {
              if (item.quantity > 1) {
                acc.push({ ...item, quantity: item.quantity - 1 });
              } // Else, skip the item (effectively removing it)
            } else {
              acc.push(item);
            }
            return acc;
          }, []),
        })),
       deleteCartProduct: (productId) => 
        set((state) => ({
            items: state.items.filter(
                ({product}) => product?._id !== productId
             ),
        })),
        resetCart: () => set({items:[]}),
        getTotalPrice: () => {
            return get().items.reduce(
                (total, item) => total + (item.product.price ?? 0) * item.quantity,0
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
        getItemCount: (productId) => {
            const item = get().items.find((item) => item.product._id === productId);
            return item ? item.quantity : 0;
        },

        getGroupedItem: () => get().items,
    }),
    {
      name: 'cart-storage', // Key for local storage
      storage: createJSONStorage(() => localStorage), // Use localStorage for persistence
    }
  )
);

export default useCartStore;