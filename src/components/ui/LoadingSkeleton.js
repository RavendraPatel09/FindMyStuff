import React from 'react';
import { motion } from 'framer-motion';

const LoadingSkeleton = ({ 
  type = 'card', 
  count = 1, 
  className = '',
  animate = true 
}) => {
  const shimmerVariants = {
    initial: { x: '-100%' },
    animate: { 
      x: '100%',
      transition: {
        repeat: Infinity,
        duration: 1.5,
        ease: 'easeInOut'
      }
    }
  };

  const Shimmer = ({ className: shimmerClass = '' }) => (
    <div className={`relative overflow-hidden bg-gray-200 dark:bg-gray-700 rounded ${shimmerClass}`}>
      {animate && (
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 dark:via-gray-600/60 to-transparent"
          variants={shimmerVariants}
          initial="initial"
          animate="animate"
        />
      )}
    </div>
  );

  const CardSkeleton = () => (
    <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
      <div className="flex items-start space-x-4">
        <Shimmer className="w-16 h-16 rounded-xl flex-shrink-0" />
        <div className="flex-1 space-y-3">
          <Shimmer className="h-5 w-3/4" />
          <Shimmer className="h-4 w-1/2" />
          <div className="flex space-x-2">
            <Shimmer className="h-6 w-16 rounded-full" />
            <Shimmer className="h-6 w-20 rounded-full" />
          </div>
        </div>
      </div>
      <div className="mt-4 space-y-2">
        <Shimmer className="h-4 w-full" />
        <Shimmer className="h-4 w-5/6" />
      </div>
      <div className="mt-6 flex justify-between items-center">
        <Shimmer className="h-8 w-24 rounded-lg" />
        <Shimmer className="h-8 w-8 rounded-full" />
      </div>
    </div>
  );

  const ListSkeleton = () => (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-4 shadow border border-gray-200 dark:border-gray-700">
      <div className="flex items-center space-x-3">
        <Shimmer className="w-12 h-12 rounded-lg flex-shrink-0" />
        <div className="flex-1 space-y-2">
          <Shimmer className="h-4 w-2/3" />
          <Shimmer className="h-3 w-1/2" />
        </div>
        <Shimmer className="h-8 w-16 rounded-lg" />
      </div>
    </div>
  );

  const SearchSkeleton = () => (
    <div className="space-y-4">
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-xl border border-gray-200 dark:border-gray-700">
        <Shimmer className="h-14 w-full rounded-xl" />
      </div>
      <div className="flex space-x-2">
        {[...Array(5)].map((_, i) => (
          <Shimmer key={i} className="h-8 w-20 rounded-full" />
        ))}
      </div>
    </div>
  );

  const ProfileSkeleton = () => (
    <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg border border-gray-200 dark:border-gray-700">
      <div className="flex items-center space-x-4 mb-6">
        <Shimmer className="w-20 h-20 rounded-full flex-shrink-0" />
        <div className="space-y-2 flex-1">
          <Shimmer className="h-6 w-1/3" />
          <Shimmer className="h-4 w-1/2" />
          <Shimmer className="h-4 w-2/3" />
        </div>
      </div>
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <Shimmer className="h-16 rounded-xl" />
          <Shimmer className="h-16 rounded-xl" />
        </div>
        <Shimmer className="h-32 w-full rounded-xl" />
      </div>
    </div>
  );

  const TableSkeleton = () => (
    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 overflow-hidden">
      <div className="p-4 border-b border-gray-200 dark:border-gray-700">
        <Shimmer className="h-6 w-1/4" />
      </div>
      <div className="divide-y divide-gray-200 dark:divide-gray-700">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="p-4 flex items-center space-x-4">
            <Shimmer className="w-10 h-10 rounded-lg flex-shrink-0" />
            <div className="flex-1 grid grid-cols-4 gap-4">
              <Shimmer className="h-4" />
              <Shimmer className="h-4" />
              <Shimmer className="h-4" />
              <Shimmer className="h-4 w-2/3" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const getSkeletonComponent = () => {
    switch (type) {
      case 'card':
        return <CardSkeleton />;
      case 'list':
        return <ListSkeleton />;
      case 'search':
        return <SearchSkeleton />;
      case 'profile':
        return <ProfileSkeleton />;
      case 'table':
        return <TableSkeleton />;
      default:
        return <CardSkeleton />;
    }
  };

  return (
    <div className={`space-y-4 ${className}`}>
      {[...Array(count)].map((_, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          {getSkeletonComponent()}
        </motion.div>
      ))}
    </div>
  );
};

// Individual skeleton components for specific use cases
export const ItemCardSkeleton = ({ count = 1 }) => (
  <LoadingSkeleton type="card" count={count} />
);

export const SearchBarSkeleton = () => (
  <LoadingSkeleton type="search" count={1} />
);

export const ProfileSkeleton = () => (
  <LoadingSkeleton type="profile" count={1} />
);

export const TableSkeleton = ({ rows = 5 }) => (
  <LoadingSkeleton type="table" count={1} />
);

export const ListSkeleton = ({ count = 3 }) => (
  <LoadingSkeleton type="list" count={count} />
);

export default LoadingSkeleton;
