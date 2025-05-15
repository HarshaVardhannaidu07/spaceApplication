import { NextResponse } from 'next/server';
import { kv } from '@vercel/kv';

export async function POST(request: Request) {
  try {
    const formData = await request.json();

    // Generate a unique ID for the submission
    const submissionId = `submission:${Date.now()}`;

    // Store the form data in Redis
    await kv.hset(submissionId, {
      ...formData,
      submittedAt: new Date().toISOString(),
    });

    return NextResponse.json({ 
      success: true,
      message: "Form submitted successfully!",
    });
  } catch (error) {
    console.error("Redis storage error:", error);
    return NextResponse.json(
      { error: "Failed to save submission" },
      { status: 500 }
    );
  }
}
