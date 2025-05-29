import { NextResponse } from 'next/server';

const apiKey = process.env.GHOST_CONTENT_API_KEY;
const apiUrl = process.env.GHOST_API_URL;

export async function GET() {
  try {
    const response = await fetch(`${apiUrl}/ghost/api/content/posts/?key=${apiKey}&include=authors,tags&limit=6`);

    if (!response.ok) {
      throw new Error(`Failed to fetch posts: ${response.status}`);
    }

    const data = await response.json();
    return NextResponse.json(data);  
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    return NextResponse.json({ error: 'Failed to load blog posts' }, { status: 500 });
  }
}