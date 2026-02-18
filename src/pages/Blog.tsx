import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import PageSEO from "@/components/PageSEO";
import { blogPosts } from "@/data/blogPosts";
import { Link } from "react-router-dom";

const Blog = () => {
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

      {/* Featured Post */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-6">
          <Link
            to={`/blog/${blogPosts[0].slug}`}
            className="group block mb-16"
          >
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="overflow-hidden">
                <img
                  src={blogPosts[0].imageUrl}
                  alt={blogPosts[0].title}
                  className="w-full aspect-video object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div>
                <span className="text-primary text-xs font-light tracking-[0.2em] uppercase">
                  {blogPosts[0].category}
                </span>
                <h2 className="text-2xl md:text-3xl font-light tracking-tight mt-2 mb-4 group-hover:text-primary transition-colors">
                  {blogPosts[0].title}
                </h2>
                <p className="text-muted-foreground font-light leading-relaxed">
                  {blogPosts[0].excerpt}
                </p>
                <span className="inline-block mt-4 text-sm text-primary font-light tracking-wide">
                  Read More →
                </span>
              </div>
            </div>
          </Link>

          {/* Grid */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.slice(1).map((post) => (
              <Link
                key={post.slug}
                to={`/blog/${post.slug}`}
                className="group border border-border hover:border-primary/30 transition-colors"
              >
                <div className="overflow-hidden">
                  <img
                    src={post.imageUrl}
                    alt={post.title}
                    className="w-full aspect-video object-cover group-hover:scale-105 transition-transform duration-500"
                  />
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
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Blog;
