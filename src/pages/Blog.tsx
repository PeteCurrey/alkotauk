import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import PageSEO from "@/components/PageSEO";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  image_url: string | null;
  category: string;
}

const Blog = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      const { data } = await supabase
        .from("blog_posts")
        .select("id, slug, title, excerpt, image_url, category")
        .eq("is_published", true)
        .order("published_at", { ascending: false });
      setPosts(data || []);
      setLoading(false);
    };
    fetchPosts();
  }, []);

  return (
    <div className="min-h-screen">
      <PageSEO
        title="Good Clean News – Blog"
        description="Expert insights, tips, and product news from Alkota UK. Learn about industrial pressure washers, steam cleaners, and cleaning best practices."
        path="/blog"
      />
      <Navigation />

      {/* Hero */}
      <section className="pt-28 pb-16 bg-muted/30">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl">
            <p className="text-primary text-sm font-light tracking-[0.3em] uppercase mb-4">
              Blog
            </p>
            <h1 className="text-4xl md:text-5xl font-light tracking-tight mb-6">
              Good Clean News
            </h1>
            <p className="text-muted-foreground font-light leading-relaxed">
              Expert insights, product guides, maintenance tips, and industry
              news from the Alkota team. Stay up to date with the latest in
              industrial cleaning.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 bg-background">
        <div className="container mx-auto px-6">
          {loading ? (
            <p className="text-sm text-muted-foreground font-light">Loading...</p>
          ) : posts.length === 0 ? (
            <p className="text-sm text-muted-foreground font-light text-center py-12">No posts yet. Check back soon!</p>
          ) : (
            <>
              {/* Featured Post */}
              <Link
                to={`/blog/${posts[0].slug}`}
                className="group block mb-16"
              >
                <div className="grid md:grid-cols-2 gap-8 items-center">
                  <div className="overflow-hidden">
                    {posts[0].image_url && (
                      <img
                        src={posts[0].image_url}
                        alt={posts[0].title}
                        className="w-full aspect-video object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    )}
                  </div>
                  <div>
                    <span className="text-primary text-xs font-light tracking-[0.2em] uppercase">
                      {posts[0].category}
                    </span>
                    <h2 className="text-2xl md:text-3xl font-light tracking-tight mt-2 mb-4 group-hover:text-primary transition-colors">
                      {posts[0].title}
                    </h2>
                    <p className="text-muted-foreground font-light leading-relaxed">
                      {posts[0].excerpt}
                    </p>
                    <span className="inline-block mt-4 text-sm text-primary font-light tracking-wide">
                      Read More →
                    </span>
                  </div>
                </div>
              </Link>

              {/* Grid */}
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {posts.slice(1).map((post) => (
                  <Link
                    key={post.id}
                    to={`/blog/${post.slug}`}
                    className="group border border-border hover:border-primary/30 transition-colors"
                  >
                    <div className="overflow-hidden">
                      {post.image_url && (
                        <img
                          src={post.image_url}
                          alt={post.title}
                          className="w-full aspect-video object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      )}
                    </div>
                    <div className="p-6">
                      <span className="text-primary text-xs font-light tracking-[0.2em] uppercase">
                        {post.category}
                      </span>
                      <h3 className="text-lg font-light tracking-tight mt-2 mb-3 group-hover:text-primary transition-colors line-clamp-2">
                        {post.title}
                      </h3>
                      <p className="text-sm text-muted-foreground font-light leading-relaxed line-clamp-3">
                        {post.excerpt}
                      </p>
                      <span className="inline-block mt-4 text-sm text-primary font-light tracking-wide">
                        Read More →
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Blog;
