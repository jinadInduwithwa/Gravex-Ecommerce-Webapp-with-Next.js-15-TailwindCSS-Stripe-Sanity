import React from 'react'
import Title from './Title'

const HomeBanner = () => {
  return (
    <div className='flex flex-col items-center gap-2'>
      <Title className='text-3xl md:text-4xl uppercase font-bold text-center'>Best Clothing collection</Title>
      <p className='text-sm text-center text-gray-600/80 font-medium max-w-[480px]'>Find everything you need to look and feel your best, and shop the latest men&apos;s fashion and life style products </p>
    </div>
  )
}

export default HomeBanner
