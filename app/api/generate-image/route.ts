 // app/api/generate-image/route.ts
import { NextResponse } from 'next/server';

const UNSPLASH_ACCESS_KEY = process.env.UNSPLASH_ACCESS_KEY;

export async function POST(req: Request) {
  try {
    const { emotion } = await req.json();
    if (!emotion) return NextResponse.json({ error: "Emotion is required" }, { status: 400 });

    const response = await fetch(
      `https://api.unsplash.com/photos/random?query=${encodeURIComponent(emotion)}&client_id=${UNSPLASH_ACCESS_KEY}`
    );

    if (!response.ok) {
      return NextResponse.json({ error: "Failed to fetch image from Unsplash" }, { status: 500 });
    }

    const data = await response.json();

    return NextResponse.json({
      imageUrl: data.urls.regular, // or 'small' / 'full'
    });
  } catch (error) {
    console.error("Unsplash API Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
