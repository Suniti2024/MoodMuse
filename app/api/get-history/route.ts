import { NextRequest, NextResponse } from "next/server";
import { connectToDatabase } from "@/lib/mongodb";

export async function POST(req: NextRequest) {
  try {
    const { email } = await req.json();
    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 });
    }

    const { db } = await connectToDatabase();
    const entries = await db
      .collection("moodenteries")
      .find({ email })
      .sort({ date: -1 }) // recent first
      .toArray();

    return NextResponse.json({ entries });
  } catch (error) {
    console.error("Error fetching mood history:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
