

// import { NextResponse } from 'next/server';

// export async function POST(req: Request) {
//   try {
//     const { text } = await req.json();

//     // MOCK RESPONSE (instead of calling OpenAI)
//     const mockEmotion = "happy"; // Just return a fixed emotion for testing

//     return NextResponse.json({ emotion: mockEmotion });

//   } catch (error) {
//     return NextResponse.json("Internal Server Error" , { status: 500 });
//   }
// }
// /app/api/emotion/route.js (if using App Router)
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  const { text } = await req.json();

  const response = await fetch("https://api-inference.huggingface.co/models/j-hartmann/emotion-english-distilroberta-base", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${process.env.HUGGINGFACE_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ inputs: text }),
  });

  const result = await response.json();
  const emotion = result[0]?.[0]?.label || "neutral";

  return NextResponse.json({ emotion });
}
