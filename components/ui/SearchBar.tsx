'use client';

import { Loader2, Search, X } from 'lucide-react';
import React, { useCallback, useEffect, useState } from 'react';
import { Dialog, DialogContent, DialogTrigger, DialogTitle, DialogHeader } from './dialog';
import { Input } from './input';
import { client } from '@/sanity/lib/client';
import { Product } from '@/sanity.types';
import Link from 'next/link';
import Image from 'next/image';
import { urlFor } from '@/sanity/lib/image';
import PriceView from './PriceView';
import AddToCartButton from './AddToCartButton';

const SearchBar = () => {
  const [search, setSearch] = useState('');
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [showSearch, setShowSearch] = useState(false);

  const fetchProducts = useCallback(async () => {
    if (!search) {
      setProducts([]);
      return;
    }
    setLoading(true);
    try {
      const query = `*[_type == 'product' && name match $search + "*"] | order(name asc) { _id, name, slug, images, price, discount, intro }`;
      const params = { search };
      const response = await client.fetch<Product[]>(query, params);
      setProducts(response || []);
    } catch (error) {
      console.error('Error Fetching Products:', error);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  }, [search]);

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      fetchProducts();
    }, 300);

    return () => clearTimeout(debounceTimer);
  }, [search, fetchProducts]);

  return (
    <Dialog open={showSearch} onOpenChange={() => setShowSearch(!showSearch)}>
      <DialogTrigger asChild>
        <button className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors duration-300">
          <Search className="w-5 h-5 text-gray-700" />
        </button>
      </DialogTrigger>
      <DialogContent className="max-w-5xl min-h-[80vh] max-h-[80vh] flex flex-col bg-white rounded-sm shadow-2xl overflow-hidden sm:p-6 p-4">
        <DialogHeader className="border-b border-gray-200 pb-4">
          <DialogTitle className="text-2xl font-semibold text-gray-900">Search Products</DialogTitle>
          <form className="relative mt-2" onSubmit={(e) => e.preventDefault()}>
            <Input
              className="w-full py-3 pl-10 pr-16 rounded-lg border border-gray-300 focus:ring-2 focus:ring-black focus:border-black transition-all duration-300 text-gray-900 placeholder-gray-400"
              placeholder="Search for products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
            {search && (
              <X
                onClick={() => setSearch('')}
                className="w-5 h-5 absolute right-10 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-red-500 transition-colors duration-300 cursor-pointer"
              />
            )}
            <button
              className="absolute right-0 top-0 h-full px-2 bg-black text-white rounded-r-lg hover:bg-black transition-colors duration-300"
              aria-label="Search"
            >
              <Search className="w-5 h-5" />
            </button>
          </form>
        </DialogHeader>
        <div className="flex-1 overflow-y-auto mt-4 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
          {loading ? (
            <div className="flex items-center justify-center py-10">
              <Loader2 className="w-6 h-6 animate-spin text-black" />
              <span className="ml-2 text-gray-600 font-medium">Searching products...</span>
            </div>
          ) : products.length ? (
            <div className="divide-y divide-gray-200">
              {products.map((product: Product) => (
                <div
                  key={product._id}
                  className="flex items-center p-4 hover:bg-gray-50 transition-colors duration-300"
                >
                  <Link
                    href={`/product/${product.slug?.current}`}
                    onClick={() => setShowSearch(false)}
                    className="h-20 w-20 sm:h-24 sm:w-24 flex-shrink-0 rounded-lg overflow-hidden border border-gray-200 group"
                  >
                    {product.images && product.images[0] && (
                      <Image
                        width={200}
                        height={200}
                        src={urlFor(product.images[0]).url()}
                        alt={product.name || 'Product image'}
                        className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                      />
                    )}
                  </Link>
                  <div className="flex-1 px-4">
                    <Link
                      href={`/product/${product.slug?.current}`}
                      onClick={() => setShowSearch(false)}
                      className="block"
                    >
                      <h3 className="text-lg font-medium text-gray-900 line-clamp-1 transition-colors duration-300">
                        {product?.name}
                      </h3>
                      <p className="text-sm text-gray-500 line-clamp-1">{product?.intro}</p>
                    </Link>
                    <PriceView price={product?.price} discount={product?.discount} />
                  </div>
                 
                </div>
              ))}
            </div>
          ) : (
            <div className="flex items-center justify-center py-10 text-gray-600">
              <Search className="w-6 h-6 mr-2" />
              <span className="text-lg font-medium">
                {search ? 'No products found' : 'Start typing to search products'}
              </span>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SearchBar;