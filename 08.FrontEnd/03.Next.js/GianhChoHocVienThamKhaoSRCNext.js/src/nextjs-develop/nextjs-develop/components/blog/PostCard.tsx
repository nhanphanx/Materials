'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Post } from '@/types';
import { Card } from '@/components/ui/Card';
import { format } from 'date-fns';
import CategoryBadge from './CategoryBadge';

interface PostCardProps {
  post: Post;
}

export default function PostCard({ post }: PostCardProps) {
  return (
    <Card className="h-full flex flex-col transition-transform duration-200 hover:-translate-y-1 hover:shadow-lg group relative">
      {/* Invisible overlay link */}
      <Link href={`/blog/${post.slug}`} className="absolute inset-0 z-0" aria-label={`Read more about ${post.title}`} />

      <div className="relative h-48 w-full overflow-hidden">
        <Image
          src={post.coverImage}
          alt={post.title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
      <div className="p-5 flex flex-col grow">
        <div className="relative z-10 flex items-center gap-2 mb-3">
          <CategoryBadge category={post.category} />
          <span className="text-xs text-gray-500">
            {post.readingTime} min read
          </span>
        </div>
        
        <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors line-clamp-2">
          {/* This link is visually the title but is above the overlay link due to z-index */}
          <Link href={`/blog/${post.slug}`} className="relative z-10">
            {post.title}
          </Link>
        </h3>
        
        <p className="text-gray-600 text-sm mb-4 line-clamp-3 grow">
          {post.excerpt}
        </p>
        
        <div className="flex items-center mt-auto pt-4 border-t border-gray-100">
          <div className="relative w-8 h-8 rounded-full overflow-hidden mr-3">
            <Image 
              src={post.author.avatar} 
              alt={post.author.name}
              fill
              className="object-cover"
            />
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-medium text-gray-900">{post.author.name}</span>
            <span className="text-xs text-gray-500">
              {format(new Date(post.publishedAt), 'MMM d, yyyy')}
            </span>
          </div>
        </div>
      </div>
    </Card>
  );
}
