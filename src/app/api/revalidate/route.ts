import { revalidateTag, revalidatePath } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': 'https://admin.vietstrix.com',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

export async function OPTIONS() {
  return new NextResponse(null, { status: 204, headers: CORS_HEADERS });
}

export async function POST(req: NextRequest) {
  try {
    const { secret, tag } = (await req.json()) as { secret?: string; tag?: string };

    if (secret !== process.env.NEXT_PUBLIC_REVALIDATE_SECRET) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401, headers: CORS_HEADERS }
      );
    }

    if (tag) revalidateTag(tag, 'max');
    revalidatePath('/', 'layout');

    return NextResponse.json(
      { revalidated: true, tag },
      { headers: CORS_HEADERS }
    );
  } catch (e) {
    console.error('Error:', e);
    return NextResponse.json(
      { error: 'Failed' },
      { status: 500, headers: CORS_HEADERS }
    );
  }
}
