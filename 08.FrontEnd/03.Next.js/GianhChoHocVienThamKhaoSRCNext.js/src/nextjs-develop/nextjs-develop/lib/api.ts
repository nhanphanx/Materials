import { Post, Category, Comment } from '@/types';
import postsData from '@/data/posts.json';
import commentsData from '@/data/comments.json';

export async function getPosts(options?: {
  limit?: number;
  page?: number;
  search?: string;
  category?: string;
}): Promise<Post[]> {
  // Simulate API delay
  await new Promise((resolve) => setTimeout(resolve, 500));

  let posts = postsData as Post[];

  // Filter by search
  if (options?.search) {
    const searchLower = options.search.toLowerCase();
    posts = posts.filter((post) =>
      post.title.toLowerCase().includes(searchLower) ||
      post.excerpt.toLowerCase().includes(searchLower)
    );
  }

  // Filter by category
  if (options?.category) {
    posts = posts.filter((post) => post.category.slug === options.category);
  }

  // Sort by date (newest first)
  posts.sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());

  // Handle pagination
  if (options?.page && options?.limit) {
    const start = (options.page - 1) * options.limit;
    const end = start + options.limit;
    posts = posts.slice(start, end);
  } else if (options?.limit) {
    posts = posts.slice(0, options.limit);
  }

  return posts;
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  const post = (postsData as Post[]).find((p) => p.slug === slug);
  return post || null;
}

export async function getAllPosts(): Promise<Post[]> {
  return postsData as Post[];
}

export async function getCategories(): Promise<Category[]> {
  const posts = postsData as Post[];
  const categoryMap = new Map<string, Category>();

  posts.forEach((post) => {
    categoryMap.set(post.category.id, post.category);
  });

  return Array.from(categoryMap.values());
}

export async function getCommentsByPostId(postId: string): Promise<Comment[]> {
  // We don't need a delay here as comments are loaded after the main post
  const allComments = commentsData as Comment[];
  return allComments.filter((comment) => comment.postId === postId);
}
