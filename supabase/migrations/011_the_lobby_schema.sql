-- ============================================================================
-- ALKOTA UK — PHASE 03: THE LOBBY SCHEMA MIGRATION
-- ============================================================================

-- 1. Lobby Authors Table
CREATE TABLE IF NOT EXISTS public.lobby_authors (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    slug TEXT UNIQUE NOT NULL,
    name TEXT NOT NULL,
    role TEXT NOT NULL,
    credentials TEXT,
    bio TEXT,
    avatar_url TEXT,
    linkedin_url TEXT,
    twitter_url TEXT,
    email TEXT,
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Lobby Categories Table
CREATE TABLE IF NOT EXISTS public.lobby_categories (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    slug TEXT UNIQUE NOT NULL,
    name TEXT NOT NULL,
    description TEXT,
    badge_label TEXT,
    accent_color TEXT DEFAULT '#FF6900',
    icon_name TEXT DEFAULT 'FileText',
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Lobby Articles & Whitepapers Table
CREATE TABLE IF NOT EXISTS public.lobby_articles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    slug TEXT UNIQUE NOT NULL,
    title TEXT NOT NULL,
    subtitle TEXT,
    excerpt TEXT NOT NULL,
    content_markdown TEXT NOT NULL,
    category_slug TEXT NOT NULL REFERENCES public.lobby_categories(slug) ON UPDATE CASCADE ON DELETE RESTRICT,
    author_slug TEXT REFERENCES public.lobby_authors(slug) ON UPDATE CASCADE ON DELETE SET NULL,
    featured_image_url TEXT,
    reading_time_mins INTEGER DEFAULT 5,
    is_featured BOOLEAN DEFAULT FALSE,
    is_published BOOLEAN DEFAULT TRUE,
    published_at TIMESTAMPTZ DEFAULT NOW(),
    tags TEXT[] DEFAULT '{}',
    related_machine_slugs TEXT[] DEFAULT '{}',
    seo_title TEXT,
    seo_description TEXT,
    view_count INTEGER DEFAULT 0,
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Lobby Downloads & Technical Documents
CREATE TABLE IF NOT EXISTS public.lobby_resources (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    slug TEXT UNIQUE NOT NULL,
    title TEXT NOT NULL,
    description TEXT,
    resource_type TEXT NOT NULL DEFAULT 'whitepaper', -- 'whitepaper', 'cad_drawing', 'compliance_brief', 'spec_sheet'
    file_url TEXT NOT NULL,
    file_size_bytes BIGINT,
    file_format TEXT DEFAULT 'PDF',
    is_gated BOOLEAN DEFAULT FALSE,
    related_article_slug TEXT REFERENCES public.lobby_articles(slug) ON UPDATE CASCADE ON DELETE SET NULL,
    download_count INTEGER DEFAULT 0,
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes for high-performance reading & searching
CREATE INDEX IF NOT EXISTS idx_lobby_articles_category ON public.lobby_articles(category_slug);
CREATE INDEX IF NOT EXISTS idx_lobby_articles_author ON public.lobby_articles(author_slug);
CREATE INDEX IF NOT EXISTS idx_lobby_articles_published ON public.lobby_articles(is_published, published_at DESC);
CREATE INDEX IF NOT EXISTS idx_lobby_articles_featured ON public.lobby_articles(is_featured) WHERE is_featured = TRUE;

-- Enable RLS
ALTER TABLE public.lobby_authors ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.lobby_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.lobby_articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.lobby_resources ENABLE ROW LEVEL SECURITY;

-- Public read policies
CREATE POLICY "Public can read lobby authors" ON public.lobby_authors FOR SELECT USING (true);
CREATE POLICY "Public can read lobby categories" ON public.lobby_categories FOR SELECT USING (true);
CREATE POLICY "Public can read published articles" ON public.lobby_articles FOR SELECT USING (is_published = true);
CREATE POLICY "Public can read lobby resources" ON public.lobby_resources FOR SELECT USING (true);

-- Admin full access policies (Service role bypasses RLS automatically, but authenticated admin gets full CRUD)
CREATE POLICY "Admin full access to lobby authors" ON public.lobby_authors FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Admin full access to lobby categories" ON public.lobby_categories FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Admin full access to lobby articles" ON public.lobby_articles FOR ALL USING (true) WITH CHECK (true);
CREATE POLICY "Admin full access to lobby resources" ON public.lobby_resources FOR ALL USING (true) WITH CHECK (true);
