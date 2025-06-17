import { NextRequest, NextResponse } from 'next/server';
import { connectToDatabase } from "../../../lib/mongodb"; 
import bcrypt from 'bcryptjs';

export async function POST(req: NextRequest) {
  const { email, password } = await req.json();
  const { db } = await connectToDatabase();

  const user = await db.collection('users').findOne({ email });
  if (!user) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 });
  }

  const isPasswordCorrect = await bcrypt.compare(password, user.password);
  if (!isPasswordCorrect) {
    return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
  }

  return NextResponse.json({ message: 'Login successful', user: { username: user.username, email: user.email } });
}
