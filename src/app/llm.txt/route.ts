import { generateLLMsTxt } from '@/app/llm';

export const revalidate = 3600; // Cache for 1 hour

export async function GET() {
  try {
    const content = await generateLLMsTxt();
    return new Response(content, {
      headers: {
        'Content-Type': 'text/plain; charset=utf-8',
        'Cache-Control': 'public, max-age=3600, s-maxage=3600',
      },
    });
  } catch (error) {
    console.error('Error generating llm.txt route response:', error);
    return new Response('Error generating content', { status: 500 });
  }
}
