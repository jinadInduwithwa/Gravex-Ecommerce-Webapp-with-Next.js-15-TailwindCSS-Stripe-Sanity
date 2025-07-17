'use client';

import { ShoppingBag } from 'lucide-react';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import useCartStore from '@/sanity/store';

const CartIcon = () => {
  const { items } = useCartStore();
  const [isHydrated, setIsHydrated] = useState(false);

  // Wait for store hydration
  useEffect(() => {
    setIsHydrated(true);
  }, []);

  // Calculate total items (sum of quantities)
  const totalItems = isHydrated ? items.reduce((total, item) => total + item.quantity, 0) : 0;

  return (
    <Link href="/cart" className="group relative">
      <ShoppingBag className="w-5 h-5 group-hover:text-gray-900 transition-colors duration-300" />
      <span className="absolute -top-2 -right-2 bg-black text-white h-5 w-5 rounded-full text-xs font-semibold flex items-center justify-center">
        {totalItems}
      </span>
    </Link>
  );
};

export default CartIcon;