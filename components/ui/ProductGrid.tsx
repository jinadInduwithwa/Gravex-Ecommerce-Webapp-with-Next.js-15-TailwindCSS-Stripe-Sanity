"use client"
import React, { useEffect, useState } from 'react'
import HomeTabbar from './HomeTabbar'
import { productType } from '@/constant';
import { client } from '@/sanity/lib/client';
import { Product } from '@/sanity.types';
import ProductCard from './ProductCard';
import NoProductMsg from './NoProductMsg';
import { motion, AnimatePresence } from 'motion/react';
import { Loader2 } from 'lucide-react';

const ProductGrid = () => {
  const [selectedTab, setSelectedTab] = useState(productType[0]?.title || "");
  const [products, setProduct] = useState([]);
  const [loading, setLoading] = useState(false);

  //fetching product
  const query = `*[_type == 'product' && variant == $variant] | order(name asc)`;
  const params = { variant: selectedTab.toLowerCase() };
  useEffect(() => {
    const fetchData = async() => {
      setLoading(true)
      try {
        const response = await client.fetch(query, params);
        setProduct(await response);
        
      } catch (error) {
        console.log("Product fetching Error", error);
        
      } finally{
        setLoading(false);
      }
    };
    fetchData();
  },[selectedTab]);
  
  return (
    <div className='mt-10 flex flex-col items-center'>

      <HomeTabbar selectedTab={selectedTab}  onTabSelect={setSelectedTab}/>
      {loading ? (
        <div className='flex flex-col items-center justify-center py-10 min-h-80 space-y-4 text-center w-full mt-10'>
          <motion.div className='flex items-center space-x-2 text-gray-700'>
            <Loader2 className='w-5 h-5 animate-spin'/>
            <span className='text-lg font-semibold'>Loading products...</span>
          </motion.div>
        </div>
      ) : products?.length ? 
      <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mt-10 w-full'>
        {
          products.map((product: Product) => (
            <div key={product._id}>
              <ProductCard product={product} />
            </div>
          ))
        }
      </div> 
      : (
        <NoProductMsg selectedTab={selectedTab}/>
      )}
    
    </div>
  )
}

export default ProductGrid
