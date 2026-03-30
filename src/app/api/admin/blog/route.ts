import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase/server';
import { verifyToken, COOKIE_NAME } from '@/lib/auth';

async function requireAdmin(req: NextRequest) {
  const token = req.cookies.get(COOKIE_NAME)?.value;
  if (!token) return false;
  return !!(await verifyToken(token));
}

export async function GET(req: NextRequest) {
  if (!(await requireAdmin(req))) return NextResponse.json({ error: 'Unauthorised' }, { status: 401 });
  const { data, error } = await supabaseAdmin.from('blog_posts').select('*').order('created_at', { ascending: false });
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}

export async function POST(req: NextRequest) {
  if (!(await requireAdmin(req))) return NextResponse.json({ error: 'Unauthorised' }, { status: 401 });
  const body = await req.json();
  const now = new Date().toISOString();
  const { data, error } = await supabaseAdmin.from('blog_posts').insert({
    title: body.title,
    slug: body.slug,
    excerpt: body.excerpt,
    content: body.content,
    category: body.category || 'news',
    published: body.published ?? false,
    published_at: body.published ? (body.published_at || now) : null,
    featured_image_url: body.featured_image_url,
    meta_title: body.meta_title,
    meta_description: body.meta_description,
    author: body.author || 'Alkota UK',
  }).select().single();
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}
