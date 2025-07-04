import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Loader2 } from 'lucide-react';

interface NoProductMsgProps {
  selectedTab: string;
  className?: string;
}

const NoProductMsg: React.FC<NoProductMsgProps> = ({ selectedTab, className }) => {
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, staggerChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  };

  return (
    <motion.div
      className={cn(
        'flex flex-col items-center justify-center py-10 min-h-[20rem] space-y-4 text-center w-full mt-10 px-4',
        className
      )}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.h2
        className="text-2xl md:text-3xl font-bold text-gray-800"
        variants={itemVariants}
      >
        No Products Available
      </motion.h2>
      <motion.p
        className="text-gray-600 text-sm md:text-base max-w-md"
        variants={itemVariants}
      >
        We're sorry, no products match{' '}
        <span className="font-semibold text-black">{selectedTab}</span>
      </motion.p>
      <motion.div
        className="flex items-center flex-row space-x-2"
        variants={itemVariants}
      >
        <Loader2 className="w-4 h-4 animate-spin" />
        <span className="text-sm md:text-base">We're restocking shortly</span>
      </motion.div>
      <motion.p
        className="text-gray-600 text-sm md:text-base max-w-md"
        variants={itemVariants}
      >
        Please check back later or explore our other product categories
      </motion.p>
    </motion.div>
  );
};

export default NoProductMsg;