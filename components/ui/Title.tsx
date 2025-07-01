
import { cn } from '@/lib/utils';
import Link from 'next/link'
import React from 'react'

interface Props {
    children: React.ReactNode;
    className?: string;
}

const Title = ({children, className}: Props) => {
  return (
    <Link href="/">
      <h2 className={cn("text-2xl font-semibold", className)}>
        {children}
      </h2>
    </Link>
  );
};


export default Title
