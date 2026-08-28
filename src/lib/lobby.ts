import { supabaseAdmin } from '@/lib/supabase/server';
import canonicalLobby from '../../scripts/data/lobby-canonical-seed.json';

export interface LobbyAuthor {
  id: string;
  slug: string;
  name: string;
  role: string;
  credentials?: string;
  bio?: string;
  avatar_url?: string;
  linkedin_url?: string;
  twitter_url?: string;
  email?: string;
  sort_order: number;
}

export interface LobbyCategory {
  id: string;
  slug: string;
  name: string;
  description?: string;
  badge_label?: string;
  accent_color: string;
  icon_name: string;
  sort_order: number;
}

export interface LobbyArticle {
  id: string;
  slug: string;
  title: string;
  subtitle?: string;
  excerpt: string;
  content_markdown: string;
  category_slug: string;
  author_slug?: string;
  featured_image_url?: string;
  reading_time_mins: number;
  is_featured: boolean;
  is_published: boolean;
  published_at: string;
  tags: string[];
  related_machine_slugs?: string[];
  seo_title?: string;
  seo_description?: string;
  view_count?: number;
  author?: LobbyAuthor;
  category?: LobbyCategory;
}

export interface LobbyResource {
  id: string;
  slug: string;
  title: string;
  description: string;
  resource_type: string;
  file_url: string;
  file_size_bytes?: number;
  file_format: string;
  is_gated: boolean;
  related_article_slug?: string;
  download_count?: number;
}

// ─── CANONICAL SNAPSHOT HELPERS ──────────────────────────────────────────────

function getSnapshotCategories(): LobbyCategory[] {
  return canonicalLobby.categories as LobbyCategory[];
}

function getSnapshotAuthors(): LobbyAuthor[] {
  return canonicalLobby.authors as LobbyAuthor[];
}

function getSnapshotArticles(): LobbyArticle[] {
  const authorsMap = new Map(getSnapshotAuthors().map(a => [a.slug, a]));
  const categoriesMap = new Map(getSnapshotCategories().map(c => [c.slug, c]));

  return (canonicalLobby.articles as any[]).map(art => ({
    ...art,
    author: art.author_slug ? authorsMap.get(art.author_slug) : undefined,
    category: art.category_slug ? categoriesMap.get(art.category_slug) : undefined,
  }));
}

function getSnapshotResources(): LobbyResource[] {
  return canonicalLobby.resources as LobbyResource[];
}

// ─── EXPORTED DATA ACCESS METHODS ────────────────────────────────────────────

export async function getLobbyCategories(): Promise<LobbyCategory[]> {
  try {
    const { data, error } = await supabaseAdmin
      .from('lobby_categories')
      .select('*')
      .order('sort_order', { ascending: true });

    if (error || !data || data.length === 0) {
      return getSnapshotCategories();
    }
    return data as LobbyCategory[];
  } catch {
    return getSnapshotCategories();
  }
}

export async function getLobbyCategoryBySlug(slug: string): Promise<LobbyCategory | null> {
  const categories = await getLobbyCategories();
  return categories.find(c => c.slug === slug) || null;
}

export async function getLobbyAuthors(): Promise<LobbyAuthor[]> {
  try {
    const { data, error } = await supabaseAdmin
      .from('lobby_authors')
      .select('*')
      .order('sort_order', { ascending: true });

    if (error || !data || data.length === 0) {
      return getSnapshotAuthors();
    }
    return data as LobbyAuthor[];
  } catch {
    return getSnapshotAuthors();
  }
}

export async function getLobbyAuthorBySlug(slug: string): Promise<LobbyAuthor | null> {
  const authors = await getLobbyAuthors();
  return authors.find(a => a.slug === slug) || null;
}

export interface GetLobbyArticlesOptions {
  categorySlug?: string;
  authorSlug?: string;
  tag?: string;
  featuredOnly?: boolean;
  limit?: number;
}

export async function getLobbyArticles(options: GetLobbyArticlesOptions = {}): Promise<LobbyArticle[]> {
  try {
    let query = supabaseAdmin
      .from('lobby_articles')
      .select('*')
      .eq('is_published', true)
      .order('published_at', { ascending: false });

    if (options.categorySlug) {
      query = query.eq('category_slug', options.categorySlug);
    }
    if (options.authorSlug) {
      query = query.eq('author_slug', options.authorSlug);
    }
    if (options.featuredOnly) {
      query = query.eq('is_featured', true);
    }
    if (options.limit) {
      query = query.limit(options.limit);
    }

    const { data, error } = await query;

    if (error || !data || data.length === 0) {
      let articles = getSnapshotArticles().filter(a => a.is_published);
      if (options.categorySlug) {
        articles = articles.filter(a => a.category_slug === options.categorySlug);
      }
      if (options.authorSlug) {
        articles = articles.filter(a => a.author_slug === options.authorSlug);
      }
      if (options.featuredOnly) {
        articles = articles.filter(a => a.is_featured);
      }
      if (options.tag) {
        articles = articles.filter(a => a.tags?.some(t => t.toLowerCase() === options.tag?.toLowerCase()));
      }
      if (options.limit) {
        articles = articles.slice(0, options.limit);
      }
      return articles;
    }

    // Attach authors & categories
    const authors = await getLobbyAuthors();
    const categories = await getLobbyCategories();
    const authorsMap = new Map(authors.map(a => [a.slug, a]));
    const categoriesMap = new Map(categories.map(c => [c.slug, c]));

    let hydrated = data.map((art: any) => ({
      ...art,
      author: art.author_slug ? authorsMap.get(art.author_slug) : undefined,
      category: art.category_slug ? categoriesMap.get(art.category_slug) : undefined,
    })) as LobbyArticle[];

    if (options.tag) {
      hydrated = hydrated.filter(a => a.tags?.some(t => t.toLowerCase() === options.tag?.toLowerCase()));
    }

    return hydrated;
  } catch {
    let articles = getSnapshotArticles().filter(a => a.is_published);
    if (options.categorySlug) articles = articles.filter(a => a.category_slug === options.categorySlug);
    if (options.authorSlug) articles = articles.filter(a => a.author_slug === options.authorSlug);
    if (options.featuredOnly) articles = articles.filter(a => a.is_featured);
    if (options.tag) articles = articles.filter(a => a.tags?.some(t => t.toLowerCase() === options.tag?.toLowerCase()));
    if (options.limit) articles = articles.slice(0, options.limit);
    return articles;
  }
}

export async function getLobbyArticleBySlug(slug: string): Promise<LobbyArticle | null> {
  try {
    const { data, error } = await supabaseAdmin
      .from('lobby_articles')
      .select('*')
      .eq('slug', slug)
      .eq('is_published', true)
      .maybeSingle();

    if (error || !data) {
      const fallback = getSnapshotArticles().find(a => a.slug === slug);
      return fallback || null;
    }

    const [author, category] = await Promise.all([
      data.author_slug ? getLobbyAuthorBySlug(data.author_slug) : Promise.resolve(null),
      data.category_slug ? getLobbyCategoryBySlug(data.category_slug) : Promise.resolve(null),
    ]);

    return {
      ...data,
      author: author || undefined,
      category: category || undefined,
    } as LobbyArticle;
  } catch {
    const fallback = getSnapshotArticles().find(a => a.slug === slug);
    return fallback || null;
  }
}

export async function getLobbyResources(): Promise<LobbyResource[]> {
  try {
    const { data, error } = await supabaseAdmin
      .from('lobby_resources')
      .select('*')
      .order('sort_order', { ascending: true });

    if (error || !data || data.length === 0) {
      return getSnapshotResources();
    }
    return data as LobbyResource[];
  } catch {
    return getSnapshotResources();
  }
}

export async function searchLobby(query: string): Promise<LobbyArticle[]> {
  if (!query || query.trim().length === 0) return [];
  const q = query.toLowerCase().trim();
  const allArticles = await getLobbyArticles();

  return allArticles.filter(art => {
    const inTitle = art.title.toLowerCase().includes(q);
    const inExcerpt = art.excerpt.toLowerCase().includes(q);
    const inTags = art.tags?.some(t => t.toLowerCase().includes(q));
    const inContent = art.content_markdown.toLowerCase().includes(q);
    return inTitle || inExcerpt || inTags || inContent;
  });
}
