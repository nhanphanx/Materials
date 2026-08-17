import { getPosts, getCategories } from '@/lib/api';
import PostList from '@/components/blog/PostList';
import { notFound } from 'next/navigation';
import { POSTS_PER_PAGE } from '@/lib/constants';

export async function generateStaticParams() {
  const categories = await getCategories();
  return categories.map((category) => ({
    category: category.slug,
  }));
}

export default async function CategoryPage({ params: paramsPromise }: { params: Promise<{ category: string }> }) {
  const { category: slug } = await paramsPromise;
  const initialPosts = await getPosts({ category: slug, page: 1, limit: POSTS_PER_PAGE });
  const categories = await getCategories();
  const category = categories.find(c => c.slug === slug);

  if (!category) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-12 text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Category: {category.name}</h1>
        <p className="text-xl text-gray-600">
          Posts filed under &quot;{category.name}&quot;.
        </p>
      </div>
      
      <PostList initialPosts={initialPosts} category={slug} />
    </div>
  );
}
