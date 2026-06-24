import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { logError } from '@/utils';

export async function GET() {
  try {
    const filePath = path.join(process.cwd(), 'public/docs/docs-config.json');
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const config = JSON.parse(fileContents);

    return NextResponse.json(config);
  } catch (error) {
    logError('Error reading docs config:', error);
    return NextResponse.json(
      { error: 'Failed to load docs config' },
      { status: 500 }
    );
  }
}
