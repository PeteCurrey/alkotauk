import { useParams, Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import PageSEO from "@/components/PageSEO";
import { blogPosts } from "@/data/blogPosts";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const post = blogPosts.find((p) => p.slug === slug);

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
            <img
              src={post.imageUrl}
              alt={post.title}
              className="w-full aspect-video object-cover mb-10"
            />
            <div className="prose prose-lg max-w-none">
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
            </div>

            <div className="mt-12 pt-8 border-t border-border">
              <h3 className="text-lg font-light mb-4">Related Articles</h3>
              <div className="grid sm:grid-cols-2 gap-6">
                {blogPosts
                  .filter((p) => p.slug !== post.slug)
                  .slice(0, 2)
                  .map((related) => (
                    <Link
                      key={related.slug}
                      to={`/blog/${related.slug}`}
                      className="group border border-border hover:border-primary/30 transition-colors"
                    >
                      <div className="overflow-hidden">
                        <img
                          src={related.imageUrl}
                          alt={related.title}
                          className="w-full aspect-video object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                      <div className="p-4">
                        <h4 className="text-sm font-light group-hover:text-primary transition-colors line-clamp-2">
                          {related.title}
                        </h4>
                      </div>
                    </Link>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default BlogPost;
