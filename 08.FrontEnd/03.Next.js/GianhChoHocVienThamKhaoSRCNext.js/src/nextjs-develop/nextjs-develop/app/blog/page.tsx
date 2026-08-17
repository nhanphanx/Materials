import { getPosts, getCategories } from '@/lib/api';
import PostList from '@/components/blog/PostList';
import SearchBar from '@/components/blog/SearchBar';
import CategoryBadge from '@/components/blog/CategoryBadge';
import { POSTS_PER_PAGE } from '@/lib/constants';

export const metadata = {
  title: 'Blog | NextJS Learning Platform',
  description: 'Read our latest articles about Next.js and Web Development',
};

type BlogPageProps = {
  searchParams: Promise<{
    q?: string;
    category?: string;
  }>;
};

export default async function BlogPage({ searchParams: searchParamsPromise }: BlogPageProps) {
  const searchParams = await searchParamsPromise;
  const initialPosts = await getPosts({
    page: 1,
    limit: POSTS_PER_PAGE,
    search: searchParams.q,
    category: searchParams.category,
  });
  const categories = await getCategories();

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-12 text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Our Blog</h1>
        <p className="text-xl text-gray-600">
          Explore the latest thoughts and tutorials.
        </p>
      </div>

      <SearchBar />

      <div className="mb-8 flex flex-wrap items-center justify-center gap-2">
        <span className="font-semibold">Categories:</span>
        {categories.map((category) => (
          <CategoryBadge key={category.id} category={category} />
        ))}
      </div>
      
      <PostList
        key={`${searchParams.q || ''}-${searchParams.category || ''}`}
        initialPosts={initialPosts}
        search={searchParams.q}
        category={searchParams.category}
      />
    </div>
  );
}