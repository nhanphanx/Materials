'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { commentSchema } from '@/lib/validations';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { Button } from '@/components/ui/Button';
import toast from 'react-hot-toast';
import { z } from 'zod';

type CommentFormData = z.infer<typeof commentSchema>;

export default function CommentForm({ postId }: { postId: string }) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<CommentFormData>({
    resolver: zodResolver(commentSchema),
  });

  async function onSubmit(data: CommentFormData) {
    try {
      const response = await fetch('/api/comments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...data, postId }),
      });

      if (!response.ok) {
        throw new Error('Failed to submit comment');
      }

      toast.success('Your comment has been submitted!');
      reset();
      // Optionally, you can trigger a re-fetch of comments here
      // For example, by using router.refresh() if you're on the same page
    } catch (error) {
      console.error(error);
      toast.error('Something went wrong. Please try again.');
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <h3 className="text-2xl font-bold">Leave a Comment</h3>
      <div>
        <Input placeholder="Your Name" {...register('author')} />
        {errors.author && <p className="text-red-500 text-sm mt-1">{errors.author.message}</p>}
      </div>
      <div>
        <Input placeholder="Your Email" {...register('email')} />
        {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>}
      </div>
      <div>
        <Textarea placeholder="Your Comment" {...register('content')} />
        {errors.content && <p className="text-red-500 text-sm mt-1">{errors.content.message}</p>}
      </div>
      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Submitting...' : 'Submit Comment'}
      </Button>
    </form>
  );
}
