import { Product } from '@/sanity.types'
import React from 'react'
import { Button } from './button';
import { cn } from '@/lib/utils';
import QuentityButtions from './QuentityButtions';
import PriceFormatter from './PriceFormatter';

interface Props{
    product: Product;
    className?: string;
}
const AddToCartButton = ({product, className}:Props) => {
    const isOutOfStock = product?.stock === 0;
    const itemCount = 0;
  return (
    <div className='w-full'>
        {
            itemCount ? (
                <div className='w-full text-sm'>
                    <div className='flex items-center justify-between border-t pt-1'>
                        <span className='text-xs text-muted-foreground'>Quentity</span>
                        <QuentityButtions product={product} />
                    </div>
                    
                    <div>
                        <span className='text-xs font-semibold'>SubTotal </span>
                        <PriceFormatter amount={product?.price ? product?.price*itemCount:0}/>
                    </div>
                </div>
            ):(
            <Button disabled={isOutOfStock} className={cn("w-full text-white shadow-none border border-black/30 font-semibold tracking-wide hover:text-white hoverEffect")}>
                Add To Cart
            </Button>

            )
        }
      
    </div>
  )
}

export default AddToCartButton
