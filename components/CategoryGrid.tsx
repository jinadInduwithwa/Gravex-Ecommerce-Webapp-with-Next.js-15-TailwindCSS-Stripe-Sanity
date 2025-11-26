import React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { getAllCategories } from '@/sanity/helpers/queries'

const CategoryGrid = async () => {
  let menCategory = null
  let womenCategory = null

  try {
    const categories = await getAllCategories()
    
    // Find men and women categories by slug
    const categoriesArray = (categories as any[]) || []
    menCategory = categoriesArray.find(cat => cat.slug?.current === 'mens' || cat.slug?.current === 'men')
    womenCategory = categoriesArray.find(cat => cat.slug?.current === 'womens' || cat.slug?.current === 'women')
  } catch (error) {
    console.error('Error fetching categories:', error)
  }

  return (
    <div className="w-full py-12 md:py-16 lg:py-20">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
        
        {/* FOR HIM Card */}
        <Link href={`/category/${menCategory?.slug?.current || 'mens'}`}>
          <div className="relative w-full aspect-square overflow-hidden group cursor-pointer">
            {/* Image from Sanity */}
            {menCategory?.image?.asset?.url ? (
              <Image
                src={menCategory.image.asset.url}
                alt="Men's Collection"
                fill
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center">
                <span className="text-3xl md:text-4xl lg:text-5xl font-black text-white">
                  FOR HIM
                </span>
              </div>
            )}
            
            {/* Overlay */}
            <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-all duration-300" />
            
            {/* Bottom Content */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-black/80 to-transparent p-4 md:p-6 pt-12 md:pt-16">
              <h3 className="text-white font-semibold text-3xl md:text-3xl uppercase lg:text-4xl xl:text-5xl ransition-colors duration-300">
                For {menCategory?.title || "Men's Collection"}
              </h3>
              <p className="text-white/80 text-xs md:text-sm lg:text-base group-hover:text-white transition-colors duration-300 mt-2">
                {menCategory?.description || 'Explore our premium collection'}
              </p>
            </div>
          </div>
        </Link>

        {/* FOR HER Card */}
        <Link href={`/category/${womenCategory?.slug?.current || 'womens'}`}>
          <div className="relative w-full aspect-square overflow-hidden group cursor-pointer">
            {/* Image from Sanity */}
            {womenCategory?.image?.asset?.url ? (
              <Image
                src={womenCategory.image.asset.url}
                alt="Women's Collection"
                fill
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-pink-400 to-pink-600 flex items-center justify-center">
                <span className="text-3xl md:text-4xl lg:text-5xl font-black text-white">
                  FOR HER
                </span>
              </div>
            )}
            
            {/* Overlay */}
            <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-all duration-300" />
            
            {/* Bottom Content */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-black/80 to-transparent p-4 md:p-6 pt-12 md:pt-16">
              <h3 className="text-white font-semibold text-3xl md:text-3xl uppercase lg:text-4xl xl:text-5xl ransition-colors duration-300">
                For {womenCategory?.title || "Women's Collection"}
              </h3>
              <p className="text-white/80 text-sm md:text-base group-hover:text-white transition-colors duration-300">
                {womenCategory?.description || 'Explore our premium collection'}
              </p>
            </div>
          </div>
        </Link>

      </div>
    </div>
  )
}

export default CategoryGrid
