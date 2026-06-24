import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { logError } from '@/utils';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string[] }> }
) {
  try {
    const { slug } = await params;

    // Join all slug segments to support nested paths
    const slugPath = slug.join('/');

    // Security check: ensure the file is a .md file
    if (!slugPath.endsWith('.md')) {
      return NextResponse.json({ error: 'Invalid file type' }, { status: 400 });
    }

    // Security check: prevent directory traversal
    if (slugPath.includes('..')) {
      return NextResponse.json({ error: 'Invalid path' }, { status: 400 });
    }

    const filePath = path.join(process.cwd(), 'public/docs', slugPath);

    // Check if file exists
    if (!fs.existsSync(filePath)) {
      logError(`File not found: ${filePath}`);
      return new NextResponse('# Error\n\nDocument not found.', {
        status: 404,
        headers: {
          'Content-Type': 'text/plain; charset=utf-8',
        },
      });
    }

    const fileContents = fs.readFileSync(filePath, 'utf8');

    return new NextResponse(fileContents, {
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
      },
    });
  } catch (error) {
    logError('Error reading markdown file:', error);
    return new NextResponse('# Error\n\nFailed to load document.', {
      status: 500,
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
      },
    });
  }
}
