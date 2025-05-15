import { NextResponse } from 'next/server';
import { createClient } from 'redis';

// Initialize Redis client
const redisClient = createClient({
  url: process.env.REDIS_URL, // Your Redis connection URL
});

// Connect to Redis (cache the connection)
let isConnected = false;
async function getRedisClient() {
  if (!isConnected) {
    await redisClient.connect();
    isConnected = true;
  }
  return redisClient;
}

export async function POST(request: Request) {
  try {
    const formData = await request.json();
    const redis = await getRedisClient();

    // Store data in Redis (using HMSET for hash storage)
    const submissionId = `submission:${Date.now()}`;
    await redis.hSet(submissionId, {
      ...formData,
      submittedAt: new Date().toISOString(),
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Redis error:', error);
    return NextResponse.json(
      { error: 'Failed to save to Redis' },
      { status: 500 }
    );
  }
}
