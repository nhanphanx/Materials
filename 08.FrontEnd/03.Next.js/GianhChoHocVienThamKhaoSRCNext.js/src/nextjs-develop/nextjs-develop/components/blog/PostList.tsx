'use client';

import { useState } from 'react';
import { Post } from '@/types';
import PostCard from './PostCard';
import { Button } from '@/components/ui/Button';
import { getPosts } from '@/lib/api';
import { POSTS_PER_PAGE } from '@/lib/constants';

interface PostListProps {
  initialPosts: Post[];
  search?: string;
  category?: string;
}

export default function PostList({ initialPosts, search, category }: PostListProps) {
  const [posts, setPosts] = useState<Post[]>(initialPosts || []);
  const [page, setPage] = useState(2); // Start loading from the second page
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState((initialPosts || []).length === POSTS_PER_PAGE);

  const loadMorePosts = async () => {
    setIsLoading(true);
    const newPosts = await getPosts({
      page,
      limit: POSTS_PER_PAGE,
      search,
      category,
    });

    if (newPosts.length > 0) {
      setPosts((prevPosts) => [...prevPosts, ...newPosts]);
      setPage((prevPage) => prevPage + 1);
      if (newPosts.length < POSTS_PER_PAGE) {
        setHasMore(false);
      }
    } else {
      setHasMore(false);
    }
    setIsLoading(false);
  };

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
      {hasMore && (
        <div className="mt-12 text-center">
          <Button onClick={loadMorePosts} disabled={isLoading}>
            {isLoading ? 'Loading...' : 'Load More'}
          </Button>
        </div>
      )}
    </div>
  );
}
