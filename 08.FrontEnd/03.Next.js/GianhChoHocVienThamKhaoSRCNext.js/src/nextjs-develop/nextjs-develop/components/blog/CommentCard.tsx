// components/blog/CommentCard.tsx
import { Comment } from '@/types';
import { format } from 'date-fns';

interface CommentCardProps {
  comment: Comment;
}

const CommentCard = ({ comment }: CommentCardProps) => {
  return (
    <div className="bg-gray-100 p-4 rounded-lg">
      <div className="flex items-center mb-2">
        <p className="font-semibold text-gray-800">{comment.author}</p>
        <p className="text-xs text-gray-500 ml-2">
          {format(new Date(comment.createdAt), 'MMM d, yyyy')}
        </p>
      </div>
      <p className="text-gray-700">{comment.content}</p>
    </div>
  );
};

export default CommentCard;
