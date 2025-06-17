// import { NextResponse } from 'next/server';
// import { connectToDatabase } from '@/lib/mongodb';
// import { getServerSession } from 'next-auth'; // or use your auth logic

// export async function POST(req) {
//   const session = await getServerSession(); // ⬅️ replace with your session logic
//   if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

//   const { mood, text } = await req.json();

//   const { db } = await connectToDatabase();
//   await db.collection("moodenteries").insertOne({
//     userId: session.user.id,
//     mood,
//     text,
//     timestamp: new Date()
//   });

//   return NextResponse.json({ success: true });
// }
 import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongodb';
import { request } from 'http';

export async function POST(req:Request) {
  try {
    const { email, mood, date } = await req.json();

    if (!email || !mood) {
      return NextResponse.json({ message: "Missing email or mood" }, { status: 400 });
    }

    const { db } = await connectToDatabase();

    // Check if user exists
    const user = await db.collection("users").findOne({ email });
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    // Save mood entry
    const result = await db.collection("moodenteries").insertOne({
      email,
      mood,
      date: date || new Date().toISOString(),
    });

    return NextResponse.json({ message: "Mood saved successfully", id: result.insertedId }, { status: 200 });

  } catch (error) {
    console.error("Error saving mood:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
