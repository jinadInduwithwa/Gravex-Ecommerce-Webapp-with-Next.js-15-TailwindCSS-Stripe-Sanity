import { cn } from '@/lib/utils';
import React from 'react';

interface Props {
  amount: number | undefined;
  className?: string;
}

const PriceFormatter = ({ amount, className }: Props) => {
  const formattedPrice = amount?.toLocaleString('en-US', {
    style: 'currency',
    currency: 'LKR',
    minimumFractionDigits: 2,
  });

  return (
    <span className={cn('text-sm font-semibold text-black', className)}>
      {formattedPrice ?? 'LKR 0.00'}
    </span>
  );
};

export default PriceFormatter;
