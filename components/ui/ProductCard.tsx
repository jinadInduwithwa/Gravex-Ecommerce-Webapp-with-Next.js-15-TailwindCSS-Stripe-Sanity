import { Product } from '@/sanity.types';
import { urlFor } from '@/sanity/lib/image';
import Link from 'next/link';
import Image from 'next/image';
import React from 'react';
import PriceView from './PriceView';
import AddToCartButton from './AddToCartButton';

const ProductCard = ({ product }: { product: Product }) => {
  console.log("product", product);

  return (
    <div className="group text-sm rounded-lg shadow-sm transition-shadow hover:shadow-md">
      <div className="relative bg-gradient-to-r from-zinc-200 via-zinc-300 to-zinc-200 overflow-hidden">
        {product?.images?.[0] && (
          <Link href={`/product/${product?.slug?.current}`}>
            <Image
              src={urlFor(product.images[0]).url()}
              width={500}
              height={500}
              alt={product?.name || 'Product image'}
              priority
              className={`w-full h-48 sm:h-64 md:h-72 object-contain transition-transform duration-300 ${
                product?.stock === 0 ? 'opacity-80' : 'group-hover:scale-105 group-hover:saturate-105'
              }`}
              sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 33vw"
            />
          </Link>
        )}
        {product?.stock === 0 && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/50">
            <p className="text-sm sm:text-base text-white font-semibold text-center px-4">
              Out Of Stock
            </p>
          </div>
        )}
      </div>
      <div className="p-3 sm:p-4 flex flex-col gap-2 bg-zinc-50 border border-t-0 rounded-b-lg">
        <h2 className="font-semibold text-sm sm:text-base line-clamp-1">
          {product?.name}
        </h2>
        <p className="text-xs sm:text-sm text-gray-600 line-clamp-2">
          {product?.intro}
        </p>
        <PriceView price={product?.price} discount={product?.discount} />
        <AddToCartButton product={product} />
      </div>
    </div>
  );
};

export default ProductCard;