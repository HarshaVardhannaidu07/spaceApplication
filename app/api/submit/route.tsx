import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function POST(request: Request) {
  try {
    const formData = await request.json();

    // Ensure the 'data' directory exists
    const dataDir = path.join(process.cwd(), 'data');
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true }); // Creates the directory if it doesn't exist
    }

    // Path to submissions.json
    const filePath = path.join(dataDir, 'submissions.json');
    
    // Read existing data (or initialize empty array)
    let submissions = [];
    if (fs.existsSync(filePath)) {
      const fileData = fs.readFileSync(filePath, 'utf8');
      submissions = JSON.parse(fileData);
    }
    
    // Add new submission
    submissions.push({
      ...formData,
      submittedAt: new Date().toISOString(),
      id: Date.now().toString(),
    });
    
    // Write back to file
    fs.writeFileSync(filePath, JSON.stringify(submissions, null, 2));
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error saving submission:', error);
    return NextResponse.json(
      { error: 'Failed to save submission' },
      { status: 500 }
    );
  }
}