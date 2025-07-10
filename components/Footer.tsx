import React from 'react'
import Container from './Container'
import FooterTop from './ui/FooterTop'
import NavLogo from './NavLogo'
import SocialMedia from './ui/SocialMedia'
import { Input } from './ui/input'
import { categoriesData, quickLinkData } from '@/constant'
import Link from 'next/link'

const Footer = () => {
  return (
    <footer >
      <Container>
        <FooterTop/>
        <div className='py-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8'>
          <div className='space-y-4'>
            <NavLogo>Gravex Co.</NavLogo>
            <p className='text-gray-600 text-sm'>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eius molestiae,
               repellat aliquam quae minima cupiditate quam enim quasi pariatur 
            </p>
            <SocialMedia
            className='text-black/60'
            iconClassName='border-black/60 hover:border-black hover:text-black'
            />
          </div>
          <div>
            <h3 className='font-semibold text-black mb-4'>Quick Links</h3>
            <div className='flex flex-col gap-3'>
              {
                quickLinkData?.map((item) => (
                  <Link className='text-gray-600 hover:text-black text-sm font-medium hoverEffect' key={item?.title} href={item?.href}>
                    {item?.title}
                  </Link>
                ))
              }
            </div>
          </div>
          <div>
            <h3 className='font-semibold text-black mb-4'>Categories</h3>
            <div className='flex flex-col gap-3'>
              {
                categoriesData?.map((item) => (
                  <Link className='text-gray-600 hover:text-black text-sm font-medium hoverEffect' key={item?.title} href={`/category${item?.href}`}>
                    {item?.title}
                  </Link>
                ))
              }
            </div>
          </div>
          <div>
            <h3 className='font-semibold text-black mb-4'>Community</h3>
            <p className='text-gray-600 text-sm mb-4'>
              Subscribe to our Community to receive updates and exclusive offers.
            </p>
            <form action="" className='space-y-3'>
              <Input type='email' placeholder='Enter your e-mail' required className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-200'/>
              <button className='w-full bg-black text-white px-4 py-3 rounded-lg hover:bg-gray-800 transition-colors' type='submit'>Join</button>
            </form>

          </div>

        </div>
      </Container>
      
    </footer>
  )
}

export default Footer
