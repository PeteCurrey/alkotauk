import { supabaseAdmin } from '@/lib/supabase/server';
import canonicalLobby from '../../scripts/data/lobby-canonical-seed.json';
import { CASE_STUDIES } from './case-studies/data';
import { getProducts } from './products';

export type LobbyPillar =
  | 'good-clean-news'
  | 'knowledge'
  | 'workshop'
  | 'field-notes'
  | 'industries'
  | 'trade-desk'
  | 'inside-alkota';

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
  pillar?: LobbyPillar;
  author_slug?: string;
  featured_image_url?: string;
  hero_alt_text?: string;
  reading_time_mins: number;
  is_featured: boolean;
  is_trending?: boolean;
  is_evergreen?: boolean;
  is_published: boolean;
  published_at: string;
  updated_at?: string;
  tags: string[];
  industries?: string[];
  difficulty_level?: 'foundational' | 'intermediate' | 'advanced_engineering';
  provenance_type?: 'uk_original' | 'us_adapted' | 'archive_heritage';
  original_source_url?: string;
  attribution_notice?: string;
  uk_reviewed_by?: string;
  related_machine_slugs?: string[];
  related_case_study_slugs?: string[];
  related_article_slugs?: string[];
  seo_title?: string;
  seo_description?: string;
  canonical_url?: string;
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
  sort_order?: number;
}

export interface LobbySearchItem {
  id: string;
  title: string;
  snippet: string;
  href: string;
  type: 'ARTICLE' | 'WORKSHOP' | 'CASE_STUDY' | 'PRODUCT' | 'RESOURCE' | 'TOOL';
  badge?: string;
  pillar?: string;
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
    pillar: art.pillar || (art.category_slug === 'workshop' ? 'workshop' : art.category_slug === 'good-clean-news' ? 'good-clean-news' : 'knowledge'),
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
  pillar?: LobbyPillar | string;
  authorSlug?: string;
  industry?: string;
  tag?: string;
  featuredOnly?: boolean;
  trendingOnly?: boolean;
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
      if (options.pillar) {
        articles = articles.filter(a => a.pillar === options.pillar || a.category_slug === options.pillar);
      }
      if (options.industry) {
        articles = articles.filter(a => a.industries?.some(ind => ind.toLowerCase() === options.industry?.toLowerCase()));
      }
      if (options.authorSlug) {
        articles = articles.filter(a => a.author_slug === options.authorSlug);
      }
      if (options.featuredOnly) {
        articles = articles.filter(a => a.is_featured);
      }
      if (options.trendingOnly) {
        articles = articles.filter(a => a.is_trending);
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
      pillar: art.pillar || (art.category_slug === 'workshop' ? 'workshop' : art.category_slug === 'good-clean-news' ? 'good-clean-news' : 'knowledge'),
      author: art.author_slug ? authorsMap.get(art.author_slug) : undefined,
      category: art.category_slug ? categoriesMap.get(art.category_slug) : undefined,
    })) as LobbyArticle[];

    if (options.pillar) {
      hydrated = hydrated.filter(a => a.pillar === options.pillar || a.category_slug === options.pillar);
    }
    if (options.industry) {
      hydrated = hydrated.filter(a => a.industries?.some(ind => ind.toLowerCase() === options.industry?.toLowerCase()));
    }
    if (options.trendingOnly) {
      hydrated = hydrated.filter(a => a.is_trending);
    }
    if (options.tag) {
      hydrated = hydrated.filter(a => a.tags?.some(t => t.toLowerCase() === options.tag?.toLowerCase()));
    }

    return hydrated;
  } catch {
    let articles = getSnapshotArticles().filter(a => a.is_published);
    if (options.categorySlug) articles = articles.filter(a => a.category_slug === options.categorySlug);
    if (options.pillar) articles = articles.filter(a => a.pillar === options.pillar || a.category_slug === options.pillar);
    if (options.industry) articles = articles.filter(a => a.industries?.some(ind => ind.toLowerCase() === options.industry?.toLowerCase()));
    if (options.authorSlug) articles = articles.filter(a => a.author_slug === options.authorSlug);
    if (options.featuredOnly) articles = articles.filter(a => a.is_featured);
    if (options.trendingOnly) articles = articles.filter(a => a.is_trending);
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
      pillar: data.pillar || (data.category_slug === 'workshop' ? 'workshop' : data.category_slug === 'good-clean-news' ? 'good-clean-news' : 'knowledge'),
      author: author || undefined,
      category: category || undefined,
    } as LobbyArticle;
  } catch {
    const fallback = getSnapshotArticles().find(a => a.slug === slug);
    return fallback || null;
  }
}

export async function getRelatedLobbyArticles(article: LobbyArticle, limit = 3): Promise<LobbyArticle[]> {
  const allArticles = await getLobbyArticles();
  const filtered = allArticles.filter(a => a.slug !== article.slug);

  // Score based on shared tags, pillar, category, and industries
  const scored = filtered.map(other => {
    let score = 0;
    if (other.pillar === article.pillar) score += 3;
    if (other.category_slug === article.category_slug) score += 2;
    if (article.tags && other.tags) {
      const sharedTags = other.tags.filter(t => article.tags.includes(t));
      score += sharedTags.length * 2;
    }
    if (article.industries && other.industries) {
      const sharedInd = other.industries.filter(i => article.industries?.includes(i));
      score += sharedInd.length * 2;
    }
    return { article: other, score };
  });

  scored.sort((a, b) => b.score - a.score);
  return scored.slice(0, limit).map(s => s.article);
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

export async function searchLobbyUnified(query: string): Promise<LobbySearchItem[]> {
  if (!query || query.trim().length === 0) return [];
  const q = query.toLowerCase().trim();

  const [articles, resources, products] = await Promise.all([
    getLobbyArticles(),
    getLobbyResources().catch(() => []),
    getProducts().catch(() => []),
  ]);

  const results: LobbySearchItem[] = [];

  // 1. Articles & Guides
  articles.forEach(art => {
    const inTitle = art.title.toLowerCase().includes(q);
    const inExcerpt = art.excerpt.toLowerCase().includes(q);
    const inTags = art.tags?.some(t => t.toLowerCase().includes(q));
    const inContent = art.content_markdown.toLowerCase().includes(q);

    if (inTitle || inExcerpt || inTags || inContent) {
      results.push({
        id: art.id,
        title: art.title,
        snippet: art.excerpt,
        href: `/lobby/${art.category_slug}/${art.slug}`,
        type: art.pillar === 'workshop' ? 'WORKSHOP' : 'ARTICLE',
        badge: art.category?.badge_label || art.category_slug.toUpperCase(),
        pillar: art.pillar,
      });
    }
  });

  // 2. Case Studies (Field Notes)
  CASE_STUDIES.forEach(cs => {
    const inTitle = cs.title.toLowerCase().includes(q) || cs.headline.toLowerCase().includes(q);
    const inSector = cs.sector.toLowerCase().includes(q);
    const inProblem = cs.problem.toLowerCase().includes(q);

    if (inTitle || inSector || inProblem) {
      results.push({
        id: `cs-${cs.slug}`,
        title: cs.title,
        snippet: cs.standfirst || cs.problem.slice(0, 140) + '...',
        href: `/resources/case-studies/${cs.slug}`,
        type: 'CASE_STUDY',
        badge: 'FIELD STUDY',
      });
    }
  });

  // 3. Products
  products.forEach((prod: any) => {
    const inName = prod.name?.toLowerCase().includes(q);
    const inDesc = (prod.description || prod.tagline || '').toLowerCase().includes(q);
    if (inName || inDesc) {
      results.push({
        id: `prod-${prod.slug}`,
        title: prod.name,
        snippet: prod.tagline || prod.description || 'Engineered industrial pressure cleaning system.',
        href: `/machines/${prod.category || 'hot-water'}/${prod.slug}`,
        type: 'PRODUCT',
        badge: (prod.series || prod.category || 'MACHINE').toUpperCase(),
      });
    }
  });

  // 4. Resources
  resources.forEach(res => {
    if (res.title.toLowerCase().includes(q) || res.description.toLowerCase().includes(q)) {
      results.push({
        id: res.id,
        title: res.title,
        snippet: res.description,
        href: res.file_url,
        type: 'RESOURCE',
        badge: res.file_format || 'PDF',
      });
    }
  });

  return results;
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

