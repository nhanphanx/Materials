/**
 * TEACHING POINT: Use 'type' for data shapes
 * - Simpler syntax
 * - Consistent with Next.js docs
 * - Use 'interface' only for extensible contracts (rare in this project)
 */

export type Author = {
  id: string;
  name: string;
  avatar: string;
  bio: string;
  email?: string;
};

export type Category = {
  id: string;
  name: string;
  slug: string;
  description?: string;
};

export type Post = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage: string;
  author: Author;
  category: Category;
  publishedAt: string;
  tags: string[];
  readingTime: number;
};

export type Comment = {
  id: string;
  postId: string;
  author: string;
  email: string;
  content: string;
  createdAt: string;
};

export type ContactFormData = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

export type ContactMessage = {
  id: string;
  name: string;
  email: string;
  message: string;
  createdAt: string;
};
