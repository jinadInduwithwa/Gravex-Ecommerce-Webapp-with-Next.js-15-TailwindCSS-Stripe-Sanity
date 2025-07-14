"use client";
import { SanityImageCrop, SanityImageHotspot } from '@sanity/image-url/lib/types/types';
import React, { useState } from 'react';
import imageUrlBuilder from '@sanity/image-url';
import { createClient } from '@sanity/client';
import {motion, AnimatePresence} from 'motion/react';
import Image from 'next/image';
import { urlFor } from '@/sanity/lib/image';

// Initialize Sanity client (replace with your project details)
const client = createClient({
  projectId: 'your-project-id', // Replace with your Sanity project ID
  dataset: 'your-dataset', // Replace with your Sanity dataset
  apiVersion: '2023-05-03', // Use the appropriate API version
  useCdn: true,
});

// Create image URL builder
const builder = imageUrlBuilder(client);

// Interface for a single Sanity image
interface SanityImage {
  _type: 'image';
  _key?: string;
  asset: {
    _ref: string;
    _type: 'reference';
    _weak?: boolean;
  };
  hotspot?: SanityImageHotspot;
  crop?: SanityImageCrop;
}

// Props interface for the ImageView component
interface Props {
  images?: SanityImage[];
}

// ImageView component
const ImageView= ({ images = [] }:Props) => {
 const [active, setActive] = useState(images[0])
  return (
    <div className='w-full md:w-1/2 space-y-2 md:space-y-4'>
     <AnimatePresence mode='wait'>
        <motion.div key={active?._key} initial={{opacity: 0}} animate={{opacity: 1}} exit={{opacity: 0}} transition={{duration: 0.5}} className='w-full max-h-[550px] min-h-[450px] border border-black/10 rounded-md group overflow-hidden'>
          <Image src={urlFor(active).url()} alt='product image' width={700} height={700} priority className='w-full h-96 max-h-[550px] min-h-[550px] object-contain group-hover:scale-110 hoverEffect rounded-md' />
        </motion.div>
     </AnimatePresence>
     <div className='grid grid-cols-6 gap-2 h-20 md:h-28'>
       {images.map((image) => (
        <button onClick={()=> setActive(image)} key={image?._key} className={`border rounded-md overflow-hidden ${active?._key === image?._key ? "ring-1 ring-black" : ""}`}>
          <Image
            src={urlFor(image).url()}
            alt='Product image'
            width={100}
            height={100}
            className='w-full h-auto object-contain'
          />
        </button>
       ))}
     </div>
    </div>
  );
};

export default ImageView;