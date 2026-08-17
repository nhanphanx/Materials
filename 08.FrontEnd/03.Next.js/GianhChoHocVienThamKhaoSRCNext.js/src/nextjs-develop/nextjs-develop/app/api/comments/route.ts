// app/api/comments/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import fs from 'fs/promises';
import path from 'path';
import { commentSchema } from '@/lib/validations';

type Comment = z.infer<typeof commentSchema> & {
  id: string;
  postId: string;
  createdAt: string;
};

export async function POST(request: NextRequest) {
  try {
    const body: unknown = await request.json();

    // Create a new schema on the fly that includes postId
    const commentWithPostIdSchema = commentSchema.extend({
      postId: z.string(),
    });

    // Parse the body against the new schema
    const validatedData = commentWithPostIdSchema.parse(body);
    const { postId, ...commentData } = validatedData;

    const commentsPath = path.join(process.cwd(), 'data', 'comments.json');
    let comments: Comment[] = [];

    try {
      const fileContent = await fs.readFile(commentsPath, 'utf-8');
      comments = JSON.parse(fileContent);
    } catch {
      // File might not exist, ignore and start with an empty array
    }

    const newComment: Comment = {
      id: Date.now().toString(),
      postId,
      ...commentData,
      createdAt: new Date().toISOString(),
    };

    comments.push(newComment);

    await fs.writeFile(commentsPath, JSON.stringify(comments, null, 2), 'utf-8');

    return NextResponse.json({
      success: true,
      message: 'Comment submitted successfully!',
      comment: newComment,
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      // Log the validation errors to see exactly what's failing
      console.error('Zod Validation Errors:', error.errors);
      return NextResponse.json({ success: false, errors: error.errors }, { status: 400 });
    }
    console.error('Error in POST /api/comments:', error);
    return NextResponse.json({ success: false, message: 'An internal server error occurred.' }, { status: 500 });
  }
}

/**
 * TEACHING POINT: GET Comments by Post ID
 * - Filter comments for specific post
 * - Used by parallel route @comments
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const postId = searchParams.get('postId');

    const commentsPath = path.join(process.cwd(), 'data', 'comments.json');

    let comments: Comment[] = [];
    try {
      const fileContent = await fs.readFile(commentsPath, 'utf-8');
      comments = JSON.parse(fileContent);
    } catch {
      console.error('file not found or json format invalid:', commentsPath);
      return NextResponse.json({ success: false, message: 'file not found or json format invalid.' }, { status: 500 });
    }

    // Filter by postId if provided
    if (postId) {
      comments = comments.filter((comment: Comment) => comment.postId === postId);
    }

    // Sort by newest first
    comments.sort((a: Comment, b: Comment) =>
      new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );

    return NextResponse.json(comments);
  } catch (error) {
    console.error('Error in GET /api/comments:', error);
    return NextResponse.json(
      { success: false, message: 'An internal server error occurred.' },
      { status: 500 }
    );
  }
}
