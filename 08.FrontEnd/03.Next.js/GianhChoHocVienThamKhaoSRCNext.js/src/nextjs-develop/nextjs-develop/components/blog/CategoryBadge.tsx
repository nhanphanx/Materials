// components/blog/CategoryBadge.tsx
'use client';

import Link from 'next/link';
import { Category } from '@/types';
import React from 'react';

interface CategoryBadgeProps {
  category: Category;
}

const CategoryBadge = ({ category }: CategoryBadgeProps) => {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.stopPropagation(); // Stop the click from propagating to the parent Link
  };

  return (
    <Link
      href={`/blog/category/${category.slug}`}
      onClick={handleClick}
      className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2 hover:bg-gray-300 transition-colors"
    >
      #{category.name}
    </Link>
  );
};

export default CategoryBadge;
