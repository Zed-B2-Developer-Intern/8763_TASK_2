import { NextResponse } from 'next/server';
import prisma from '@/lib/prisma';

export async function GET() {
  const posts = await prisma.post.findMany();
  return NextResponse.json(posts);
}

export async function POST(request: Request) {
  const body = await request.json();
  const { title, content, authorId } = body;

  try {
    const newPost = await prisma.post.create({
      data: {
        title,
        content,
        authorId,
      },
    });

    return NextResponse.json(newPost, { status: 201 });
  } catch (error) {
    console.error('Error creating post:', error);
    return NextResponse.json({ error: 'Failed to create post' }, { status: 500 });
  }
}
