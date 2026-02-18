import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import PageSEO from "@/components/PageSEO";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

interface BlogPostData {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string | null;
  image_url: string | null;
  category: string;
}

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<BlogPostData | null>(null);
  const [related, setRelated] = useState<BlogPostData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      const { data } = await supabase
        .from("blog_posts")
        .select("id, slug, title, excerpt, content, image_url, category")
        .eq("slug", slug)
        .eq("is_published", true)
        .maybeSingle();
      setPost(data);

      if (data) {
        const { data: relatedData } = await supabase
          .from("blog_posts")
          .select("id, slug, title, excerpt, content, image_url, category")
          .eq("is_published", true)
          .neq("id", data.id)
          .limit(2);
        setRelated(relatedData || []);
      }
      setLoading(false);
    };
    fetchPost();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen">
        <Navigation />
        <section className="pt-28 pb-16">
          <div className="container mx-auto px-6">
            <p className="text-sm text-muted-foreground font-light">Loading...</p>
          </div>
        </section>
        <Footer />
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen">
        <Navigation />
        <section className="pt-28 pb-16">
          <div className="container mx-auto px-6 text-center">
            <h1 className="text-3xl font-light mb-4">Post Not Found</h1>
            <Link to="/blog">
              <Button variant="outline" size="sm" className="font-light tracking-wide">
                Back to Blog
              </Button>
            </Link>
          </div>
        </section>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <PageSEO
        title={post.title}
        description={post.excerpt}
        path={`/blog/${post.slug}`}
      />
      <Navigation />

      <section className="pt-28 pb-8 bg-muted/30">
        <div className="container mx-auto px-6">
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground font-light hover:text-foreground transition-colors mb-6"
          >
            <ArrowLeft size={14} strokeWidth={1} />
            Back to Blog
          </Link>
          <div className="max-w-3xl">
            <span className="text-primary text-xs font-light tracking-[0.2em] uppercase">
              {post.category}
            </span>
            <h1 className="text-3xl md:text-4xl font-light tracking-tight mt-2 mb-6">
              {post.title}
            </h1>
          </div>
        </div>
      </section>

      <section className="py-12 bg-background">
        <div className="container mx-auto px-6">
          <div className="max-w-3xl">
            {post.image_url && (
              <img
                src={post.image_url}
                alt={post.title}
                className="w-full aspect-video object-cover mb-10"
              />
            )}
            <div className="prose prose-lg max-w-none">
              {post.content ? (
                <div className="text-muted-foreground font-light leading-relaxed whitespace-pre-line">
                  {post.content}
                </div>
              ) : (
                <>
                  <p className="text-muted-foreground font-light leading-relaxed text-lg mb-6">
                    {post.excerpt}
                  </p>
                  <p className="text-muted-foreground font-light leading-relaxed">
                    For the full article and detailed information, please{" "}
                    <Link to="/contact" className="text-primary hover:underline">
                      contact our team
                    </Link>{" "}
                    or visit your local Alkota UK distributor for expert guidance
                    tailored to your specific needs.
                  </p>
                </>
              )}
            </div>

            {related.length > 0 && (
              <div className="mt-12 pt-8 border-t border-border">
                <h3 className="text-lg font-light mb-4">Related Articles</h3>
                <div className="grid sm:grid-cols-2 gap-6">
                  {related.map((r) => (
                    <Link
                      key={r.id}
                      to={`/blog/${r.slug}`}
                      className="group border border-border hover:border-primary/30 transition-colors"
                    >
                      <div className="overflow-hidden">
                        {r.image_url && (
                          <img
                            src={r.image_url}
                            alt={r.title}
                            className="w-full aspect-video object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                        )}
                      </div>
                      <div className="p-4">
                        <h4 className="text-sm font-light group-hover:text-primary transition-colors line-clamp-2">
                          {r.title}
                        </h4>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default BlogPost;
