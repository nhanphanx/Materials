import CommentForm from '@/components/forms/CommentForm';
import { Toaster } from 'react-hot-toast';
import { getCommentsByPostId } from '@/lib/api';
import CommentCard from '@/components/blog/CommentCard';

export default async function CommentsPage({ params: paramsPromise }: { params: Promise<{ slug: string }> }) {
  const { slug } = await paramsPromise;
  const comments = await getCommentsByPostId(slug);

  return (
    <div className="mt-12  px-4">
      <CommentForm postId={slug} />
      <div className="mt-8 mb-4 space-y-4">
        <h3 className="text-2xl font-bold">Comments ({comments.length})</h3>
        {comments.length > 0 ? (
          comments
            .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
            .map((comment) => <CommentCard key={comment.id} comment={comment} />)
        ) : (
          <p className="text-gray-600">No comments yet. Be the first to comment!</p>
        )}
      </div>
      <Toaster position="bottom-right" />
    </div>
  );
}
