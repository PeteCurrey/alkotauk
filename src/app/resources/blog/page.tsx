import Navigation from '@/components/Navigation';
import { safeFetch } from '@/sanity/client';
import Link from 'next/link';

export const metadata = {
  title: 'Good Clean News | Alkota UK Blog',
  description: 'Read the latest industry news, maintenance tips, and product announcements from Alkota UK.',
};

export default async function BlogPage() {
  const query = `*[_type == "blogPost"] | order(publishedAt desc) {
    title,
    slug,
    excerpt,
    publishedAt,
    "imageUrl": featuredImage.asset->url
  }`;
  
  const posts = await safeFetch(query, []);
  const hasPosts = posts.length > 0;

  return (
    <main className="min-h-screen bg-alkota-black pt-32 pb-24 text-white">
      <Navigation />
      <div className="container mx-auto max-w-7xl px-6">
        <h1 className="mb-4 text-5xl font-black uppercase italic tracking-tighter sm:text-7xl">
          GOOD CLEAN <span className="text-alkota-orange">NEWS.</span>
        </h1>
        <p className="mb-16 text-xl text-alkota-silver max-w-2xl">The official Alkota UK blog. Expert advice, industry insights, and the platinum standard of cleaning journalism.</p>
        
        {!hasPosts ? (
          <div className="border border-alkota-iron bg-alkota-steel/30 p-12 text-center">
            <h3 className="text-2xl font-black italic mb-4">No Articles Yet</h3>
            <p className="text-alkota-silver">Check back soon for the latest news from Alkota UK.</p>
          </div>
        ) : (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
             {posts.map((post: any) => (
                <Link key={post.slug.current} href={`/resources/blog/${post.slug.current}`} className="group border border-alkota-iron bg-alkota-steel/30 overflow-hidden hover:border-alkota-orange transition-all">
                   <div className="h-48 w-full bg-alkota-iron relative overflow-hidden">
                      {/* Image would go here */}
                      <div className="absolute inset-0 bg-alkota-black/20 group-hover:bg-transparent transition-all"></div>
                   </div>
                   <div className="p-6">
                      <p className="text-xs text-alkota-orange font-bold uppercase tracking-widest mb-3">{new Date(post.publishedAt).toLocaleDateString()}</p>
                      <h3 className="text-2xl font-black uppercase italic tracking-tight text-white mb-4 line-clamp-2 group-hover:text-alkota-orange">{post.title}</h3>
                      <p className="text-alkota-silver text-sm line-clamp-3">{post.excerpt}</p>
                   </div>
                </Link>
             ))}
          </div>
        )}
      </div>
    </main>
  );
}
