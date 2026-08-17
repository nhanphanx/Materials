'use client';

import { Post } from '@/types';

type PostContentProps = {
  post: Post;
};

export default function PostContent({ post }: PostContentProps) {
  return (
    <article className="prose lg:prose-xl max-w-none">
      <div dangerouslySetInnerHTML={{ __html: post.content }} />
    </article>
  );
}
