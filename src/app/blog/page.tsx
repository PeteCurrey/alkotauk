import { supabaseAdmin } from '@/lib/supabase/server';
import Link from 'next/link';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { generateSeo } from '@/lib/seo';
import type { Metadata } from 'next';

export const metadata: Metadata = generateSeo({
  title: 'News & Insights | Alkota UK',
  description: 'Technical insights, application guides, maintenance advice and industry news from Alkota UK.',
});

const CATEGORY_LABELS: Record<string, string> = {
  news: 'News', application: 'Application Guide', maintenance: 'Maintenance',
  industry: 'Industry', product: 'Product', compliance: 'Compliance',
};

export default async function BlogPage() {
  const { data: posts } = await supabaseAdmin
    .from('blog_posts')
    .select('id,title,slug,excerpt,category,published_at,featured_image_url,author')
    .eq('published', true)
    .order('published_at', { ascending: false });

  return (
    <main className="min-h-screen bg-white pt-32 pb-24">
      <Navigation />

      <div className="mx-auto max-w-7xl px-6">
        {/* Header */}
        <div className="mb-16">
          <span className="font-ibm-plex-mono text-[10px] text-alkota-orange uppercase tracking-[0.4em]">// News & Insights</span>
          <h1 className="font-barlow-condensed text-7xl md:text-9xl font-black uppercase italic text-alkota-black tracking-tighter mt-2">
            THE FIELD <span className="text-alkota-orange">REPORT.</span>
          </h1>
          <p className="font-inter text-alkota-silver uppercase tracking-wider text-sm mt-4 max-w-xl">
            Technical insights, application guides and industry news from sixty years in the field.
          </p>
        </div>

        {/* Posts grid */}
        {!posts || posts.length === 0 ? (
          <div className="border border-alkota-iron p-16 text-center">
            <p className="font-ibm-plex-mono text-[10px] uppercase tracking-widest text-alkota-silver">No posts published yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post: any) => (
              <Link key={post.id} href={`/blog/${post.slug}`} className="group block border border-alkota-iron hover:border-alkota-orange transition-colors">
                {post.featured_image_url ? (
                  <div className="aspect-[16/9] overflow-hidden bg-alkota-steel">
                    <img src={post.featured_image_url} alt={post.title} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105" />
                  </div>
                ) : (
                  <div className="aspect-[16/9] bg-alkota-black flex items-center justify-center">
                    <span className="font-barlow-condensed text-6xl font-black italic text-alkota-iron">ALK</span>
                  </div>
                )}
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="font-ibm-plex-mono text-[9px] uppercase tracking-widest text-alkota-orange">
                      {CATEGORY_LABELS[post.category] || post.category}
                    </span>
                    <span className="font-ibm-plex-mono text-[9px] text-alkota-silver">
                      {post.published_at ? new Date(post.published_at).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' }) : ''}
                    </span>
                  </div>
                  <h2 className="font-barlow-condensed text-2xl font-black uppercase italic text-alkota-black group-hover:text-alkota-orange transition-colors leading-tight">
                    {post.title}
                  </h2>
                  {post.excerpt && (
                    <p className="font-inter text-[13px] text-alkota-silver leading-relaxed mt-3 line-clamp-3">{post.excerpt}</p>
                  )}
                  <p className="font-ibm-plex-mono text-[9px] uppercase tracking-widest text-alkota-orange mt-4">
                    Read article →
                  </p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>

      <Footer />
    </main>
  );
}
