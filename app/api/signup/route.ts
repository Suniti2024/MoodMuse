import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from "../../../lib/mongodb"; 
import bcrypt from 'bcryptjs';

export async function POST(req: NextRequest) {
  const { username, email, password } = await req.json();
  const { db } = await connectToDatabase();

  const existingUser = await db.collection('users').findOne({ email });


  if (existingUser) {
    return NextResponse.json({ error: 'User already exists' }, { status: 400 });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = { username, email, password: hashedPassword };

  await db.collection('users').insertOne(newUser);
  return NextResponse.json({ message: 'User registered successfully' });
}
