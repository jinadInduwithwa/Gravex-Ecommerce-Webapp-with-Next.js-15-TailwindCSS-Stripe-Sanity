
import React from 'react'
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from './tooltip';
import Link from 'next/link';
import { Facebook, Instagram, Twitter, Linkedin } from "lucide-react"; 
import { cn } from '@/lib/utils';

interface Props {
    className?: string;
    iconClassName?: string;
    tooltipClassName?: string;
}

const socialLink = [
  {
    title: "Facebook",
    href: "https://facebook.com",
    icon: <Facebook className="w-5 h-5" />
  },
  {
    title: "Instagram",
    href: "https://instagram.com",
    icon: <Instagram className="w-5 h-5" />
  },
  {
    title: "Twitter",
    href: "https://twitter.com",
    icon: <Twitter className="w-5 h-5" />
  },
  {
    title: "LinkedIn",
    href: "https://linkedin.com",
    icon: <Linkedin className="w-5 h-5" />
  },
];

const SocialMedia = ({className, iconClassName, tooltipClassName}:Props) => {
  return (
    <TooltipProvider>
    <div className={cn('flex items-center gap-3.5', className)}>
        {socialLink?.map((item) => (
            <Tooltip key={item?.title}>
                <TooltipTrigger asChild>
                    <Link 
                    href={item?.href}
                    target='_blank'
                    rel="noopener noreferrer"
                    className={cn("p-2 border rounded-full hover:text-white hover:border-white hoverEffect", iconClassName)}
                    
                    >
                        {item.icon}
                    </Link>
                </TooltipTrigger>
                <TooltipContent className={cn("bg-white text-black font-semibold")}>
                    {item.title}
                </TooltipContent>

            </Tooltip>
        ))}
    </div>
  </TooltipProvider>
  )
  
}

export default SocialMedia
