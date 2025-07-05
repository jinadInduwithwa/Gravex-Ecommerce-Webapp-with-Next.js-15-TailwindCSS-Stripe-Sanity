"use client";
import React, { useEffect, useState } from 'react';
import HomeTabbar from './HomeTabbar';
import { productType } from '@/constant';
import { client } from '@/sanity/lib/client';
import { Product } from '@/sanity.types';
import ProductCard from './ProductCard';
import NoProductMsg from './NoProductMsg';
import { motion, AnimatePresence } from 'motion/react';
import { Loader2 } from 'lucide-react';

const ProductGrid = () => {
  const [selectedTab, setSelectedTab] = useState(productType[0]?.title || '');
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);

  // Fetching products
  const query = `*[_type == 'product' && variant == $variant] | order(name asc)`;
  const params = { variant: selectedTab.toLowerCase() };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await client.fetch<Product[]>(query, params);
        setProducts(response);
      } catch (error) {
        console.error('Product fetching error:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [selectedTab]);

  return (
    <div className="mt-6 sm:mt-8 md:mt-10 flex flex-col items-center w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <HomeTabbar selectedTab={selectedTab} onTabSelect={setSelectedTab} />
      <AnimatePresence mode="wait">
        {loading ? (
          <motion.div
            key="loading"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center justify-center py-10 min-h-[20rem] space-y-4 text-center w-full"
          >
            <div className="flex items-center space-x-2 text-gray-700">
              <Loader2 className="w-5 h-5 sm:w-6 sm:h-6 animate-spin" />
              <span className="text-base sm:text-lg font-semibold">
                Loading products...
              </span>
            </div>
          </motion.div>
        ) : products.length ? (
          <motion.div
            key="products"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 mt-6 sm:mt-8 w-full"
          >
            {products.map((product: Product) => (
              <motion.div
                key={product._id}
                layout
                transition={{ duration: 0.3 }}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div
            key="no-products"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <NoProductMsg selectedTab={selectedTab} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProductGrid;