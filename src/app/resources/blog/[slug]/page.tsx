import Navigation from '@/components/Navigation';
import { safeFetch, urlFor } from '@/sanity/client';
import Image from 'next/image';

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const query = `*[_type == "blogPost" && slug.current == $slug][0] { title, seo }`;
  const post = await safeFetch(query, { slug: params.slug });
  if (!post) return { title: 'Post Not Found' };
  return {
    title: post.seo?.metaTitle || `${post.title} | Good Clean News`,
    description: post.seo?.metaDescription || 'Alkota UK Blog post.',
  };
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const query = `*[_type == "blogPost" && slug.current == $slug][0] {
    title, publishedAt, author, excerpt,
    "imageUrl": featuredImage.asset->url,
    body
  }`;
  
  const post = await safeFetch(query, {
    slug: params.slug,
    title: 'Dummy Post Placeholder',
    publishedAt: new Date().toISOString(),
    author: 'Alkota Editorial Team',
    excerpt: 'This is a mock blog post placeholder.',
  });

  if (!post?.title) {
     return <main className="min-h-screen bg-alkota-black pt-32 text-center text-white"><h1 className="text-4xl text-alkota-orange">Post Not Found</h1></main>;
  }

  // Generate Article JSON-LD
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.excerpt,
    datePublished: post.publishedAt,
    author: { '@type': 'Person', name: post.author || 'Alkota UK' },
    publisher: { '@type': 'Organization', name: 'Alkota UK' },
    image: post.imageUrl ? urlFor(post.imageUrl).url() : undefined,
  };

  return (
    <main className="min-h-screen bg-alkota-black pt-32 pb-24 text-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <Navigation />
      
      <article className="container mx-auto max-w-4xl px-6">
        <header className="mb-12 border-b border-alkota-iron pb-8 text-center">
           <p className="text-xs text-alkota-orange font-bold uppercase tracking-widest mb-4">
             {new Date(post.publishedAt).toLocaleDateString()} | By {post.author}
           </p>
           <h1 className="mb-6 text-5xl font-black uppercase italic tracking-tighter sm:text-7xl">
             {post.title}
           </h1>
           {post.excerpt && <p className="text-xl text-alkota-silver mx-auto max-w-2xl">{post.excerpt}</p>}
        </header>

        {post.imageUrl && (
           <div className="relative w-full aspect-video bg-alkota-iron mb-12">
             <Image src={post.imageUrl} alt={post.title} fill className="object-cover" />
           </div>
        )}

        <div className="prose prose-invert prose-lg max-w-none prose-a:text-alkota-orange prose-headings:font-black prose-headings:italic">
           {post.body ? (
              <p>Dynamic portable text body parsing will occur here using @portabletext/react.</p>
           ) : (
              <p className="border-l-4 border-alkota-orange pl-6 py-2 bg-alkota-iron/30">Welcome to the blog. Sanity block content will populate here.</p>
           )}
        </div>
      </article>
    </main>
  );
}
