import CategoryBadge from '@/components/blog/CategoryBadge';
import PostContent from '@/components/blog/PostContent';
import { getAllPosts, getPostBySlug } from '@/lib/api';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { format } from 'date-fns';
import Image from 'next/image';

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params: paramsPromise }: Props): Promise<Metadata> {
  const { slug } = await paramsPromise;
  const post = await getPostBySlug(slug);

  if (!post) {
    return {
      title: 'Post Not Found',
    };
  }

  return {
    title: `${post.title} | NextJS Blog`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: [
        {
          url: post.coverImage,
          width: 800,
          height: 400,
          alt: post.title,
        },
      ],
    },
  };
}

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function PostPage({ params: paramsPromise }: Props) {
  const { slug } = await paramsPromise;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <div className="mt-12 px-4">
      <article>
        <header className="mb-8 text-center">
          <div className="mb-4">
            <CategoryBadge category={post.category} />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">{post.title}</h1>
          <div className="flex items-center justify-center space-x-4 text-sm text-gray-500">
            <span>By {post.author.name}</span>
            <span>{format(new Date(post.publishedAt), 'MMM d, yyyy')}</span>
            <span>{post.readingTime} min read</span>
          </div>
        </header>
        <div className="relative w-full h-64 md:h-96 mb-8">
          <Image
            src={post.coverImage}
            alt={post.title}
            fill
            className="object-cover rounded-lg"
            priority
          />
        </div>
        <PostContent post={post} />
      </article>
    </div>
  );
}
