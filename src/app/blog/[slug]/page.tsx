import { notFound } from 'next/navigation';
import { supabaseAdmin } from '@/lib/supabase/server';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { generateSeo } from '@/lib/seo';
import type { Metadata } from 'next';

// Note: marked is imported dynamically to avoid SSR issues with some versions
async function renderMarkdown(content: string): Promise<string> {
  try {
    const { marked } = await import('marked');
    return await marked(content, { gfm: true, breaks: true });
  } catch {
    // Fallback: basic markdown-to-HTML conversion
    return content
      .replace(/^### (.*$)/gm, '<h3>$1</h3>')
      .replace(/^## (.*$)/gm, '<h2>$1</h2>')
      .replace(/^# (.*$)/gm, '<h1>$1</h1>')
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/\n/g, '<br />');
  }
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const { data: post } = await supabaseAdmin.from('blog_posts').select('title,meta_description,featured_image_url').eq('slug', slug).eq('published', true).single();
  if (!post) return {};
  return generateSeo({
    title: `${post.title} | Alkota UK`,
    description: post.meta_description || '',
    image: post.featured_image_url,
  });
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const { data: post, error } = await supabaseAdmin
    .from('blog_posts')
    .select('*')
    .eq('slug', slug)
    .eq('published', true)
    .single();

  if (error || !post) notFound();

  const contentHtml = post.content ? await renderMarkdown(post.content) : '';

  return (
    <main className="min-h-screen bg-white pt-32 pb-24">
      <Navigation />

      <article className="mx-auto max-w-3xl px-6">
        {/* Back */}
        <Link href="/blog" className="flex items-center gap-2 font-ibm-plex-mono text-[10px] uppercase tracking-widest text-alkota-silver hover:text-alkota-orange mb-10 transition-colors">
          ← Back to Field Report
        </Link>

        {/* Category + Date */}
        <div className="flex items-center gap-4 mb-4">
          <span className="font-ibm-plex-mono text-[10px] uppercase tracking-widest text-alkota-orange">{post.category}</span>
          <span className="font-ibm-plex-mono text-[10px] text-alkota-silver">
            {post.published_at ? new Date(post.published_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }) : ''}
          </span>
          <span className="font-ibm-plex-mono text-[10px] text-alkota-silver">// {post.author}</span>
        </div>

        {/* Title */}
        <h1 className="font-barlow-condensed text-6xl md:text-7xl font-black uppercase italic text-alkota-black tracking-tighter leading-none mb-8">
          {post.title}
        </h1>

        {/* Featured Image */}
        {post.featured_image_url && (
          <div className="aspect-[16/9] overflow-hidden mb-10 border border-alkota-iron">
            <img src={post.featured_image_url} alt={post.title} className="w-full h-full object-cover" />
          </div>
        )}

        {/* Excerpt */}
        {post.excerpt && (
          <p className="font-inter text-xl text-alkota-silver leading-relaxed mb-10 border-l-4 border-alkota-orange pl-6">
            {post.excerpt}
          </p>
        )}

        {/* Content */}
        {contentHtml ? (
          <div
            className="prose prose-alkota max-w-none font-inter text-alkota-black"
            style={{ '--tw-prose-body': '#333', '--tw-prose-headings': '#0A0A0A' } as React.CSSProperties}
            dangerouslySetInnerHTML={{ __html: contentHtml }}
          />
        ) : (
          <p className="font-inter text-alkota-silver italic">No content yet.</p>
        )}

        {/* Footer CTA */}
        <div className="mt-16 pt-10 border-t border-alkota-iron">
          <p className="font-ibm-plex-mono text-[10px] uppercase tracking-widest text-alkota-silver mb-4">
            // Need pressure washing equipment?
          </p>
          <div className="flex gap-4">
            <Link href="/machines" className="px-6 py-3 bg-alkota-orange text-white font-black uppercase tracking-widest text-[11px] hover:bg-alkota-orange-hover transition-colors">
              View Machines →
            </Link>
            <Link href="/contact" className="px-6 py-3 border border-alkota-iron text-alkota-black font-black uppercase tracking-widest text-[11px] hover:border-alkota-orange hover:text-alkota-orange transition-colors">
              Request a Quote →
            </Link>
          </div>
        </div>
      </article>

      <Footer />
    </main>
  );
}
