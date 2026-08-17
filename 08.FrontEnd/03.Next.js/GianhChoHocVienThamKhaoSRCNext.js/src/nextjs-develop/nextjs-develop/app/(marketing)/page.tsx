import { getPosts } from '@/lib/api';
import PostList from '@/components/blog/PostList';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { POSTS_PER_PAGE } from '@/lib/constants';

export default async function HomePage() {
  const posts = await getPosts({ page: 1, limit: POSTS_PER_PAGE });

  return (
    <div className="space-y-16 pb-16">
      {/* Hero Section */}
      <section className="bg-linear-to-b from-blue-50 to-white py-12">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
            Welcome to NextJS Blog
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-8">
            A learning platform designed to help you master Next.js App Router, 
            Server Components, and modern web development patterns.
          </p>
          <div className="flex justify-center gap-4">
            <Link href="/blog">
              <Button>Read the Blog</Button>
            </Link>
            <Link href="/about">
              <Button variant="outline">Learn More</Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Latest Posts Section */}
      <section className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-3xl font-bold text-gray-900">Latest Posts</h2>
          <Link href="/blog" className="text-blue-600 hover:text-blue-800 font-medium">
            View all posts →
          </Link>
        </div>
        <PostList initialPosts={posts} />
      </section>
    </div>
  );
}
