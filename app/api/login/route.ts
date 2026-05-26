import { NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

import { connectDB } from '@/lib/mongo';
import User from '@/models/User';

export async function POST(req: Request) {
  try {
    await connectDB();

    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { message: 'Email and password required' },
        { status: 400 }
      );
    }

    let user = await User.findOne({ email });

    // Create user if not found
    if (!user) {
      user = await User.create({
        email,
        password, // Plain text (not recommended)
      });

      const token = jwt.sign(
        { id: user._id },
        process.env.JWT_SECRET!,
        { expiresIn: '7d' }
      );

      return NextResponse.json({
        message: 'Account created successfully',
        token,
        newUser: true,
      });
    }

    // Plain text password comparison
    if (password !== user.password) {
      return NextResponse.json(
        { message: 'Invalid password' },
        { status: 401 }
      );
    }

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET!,
      { expiresIn: '7d' }
    );

    return NextResponse.json({
      message: 'Login successful',
      token,
      newUser: false,
    });

  } catch (error) {
    console.log(error);

    return NextResponse.json(
      { message: 'Server error' },
      { status: 500 }
    );
  }
}