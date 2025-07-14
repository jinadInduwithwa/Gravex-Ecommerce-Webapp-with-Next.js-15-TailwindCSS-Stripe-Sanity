import Container from '@/components/Container'
import AddToCartButton from '@/components/ui/AddToCartButton';
import ImageView from '@/components/ui/ImageView';
import PriceView from '@/components/ui/PriceView';
import ProductCharacteristic from '@/components/ui/ProductCharacteristic';
import { getProductBySlug } from '@/sanity/helpers/queries';
import { BoxIcon, FileQuestion, Heart, ListOrdered, ListOrderedIcon, Share } from 'lucide-react';
import { notFound } from 'next/navigation';
import React from 'react'

const SingleProductPage = async({params}:{params:Promise<{slug: String}>;}) => {
  const {slug} = await params;
  const product = await getProductBySlug(slug);
  if (!product) {
    return notFound();
  }
  
  return (
      <Container className='py-10 flex flex-col md:flex-row gap-10'>
        {/* left side */}

          {
            product?.images &&  <ImageView images={product?.images}/>
          }


        {/* right side */}
        <div className='w-full md:w-1/2 flex flex-col gap-5'>
          <div>
            <h2 className='text-3xl md:text-4xl font-bold mb-2'>{product?.name}</h2>
            <PriceView price={product?.price} discount={product?.discount} className='text-lg font-bold'/>
          </div>
          {product?.stock && (
            <p className='bg-green-100 w-24 text-center text-green-600 text-sm py-2.5 font-semibold rounded-lg'>In Stock</p>
          )}
          <p className='text-sm text-gray-600 tracking-wide'>{product?.description}</p>
          <div className='flex items-center gap-2.5 lg:gap-5'>
            <AddToCartButton product={product} className='bg-black/40 text-white hover:bg-black hoverEffect'/>
            <button className='border-2 border-black/30 text-black/60 px-2.5 py-1.5 rounded-md hover:text-black hover:border-black hoverEffect'>
              <Heart className='w-5 h-5'/>
            </button>
          </div>
          <ProductCharacteristic product={product}/>
          <div className='flex flex-wrap items-center justify-between gap-2.5 border-b border-b-gray-200 py-5 -mt-2'>
            <div className='flex items-center gap-2 text-sm text-black hover:text-gray-800'>
              <BoxIcon className='w-5 h-5'/>
              <p>Compare Color</p>
            </div>
            <div className='flex items-center gap-2 text-sm text-black hover:text-gray-800'>
              <FileQuestion className='w-5 h-5'/>
              <p>Ask a Question</p>
            </div>
            <div className='flex items-center gap-2 text-sm text-black hover:text-gray-800'>
              <ListOrderedIcon className='w-5 h-5'/>
              <p>Delivery & Return</p>
            </div>
            <div className='flex items-center gap-2 text-sm text-black hover:text-gray-800'>
              <Share className='w-5 h-5'/>
              <p>Share</p>
            </div>
          </div>
        </div>
      </Container>
  )
}

export default SingleProductPage
