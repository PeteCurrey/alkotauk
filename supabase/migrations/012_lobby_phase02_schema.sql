-- =====================================================================
-- MIGRATION 012: The Lobby — Phase 02 Schema Extension
-- Adds new columns required by Phase 02 LobbyArticle interface
-- =====================================================================

-- ── 1. PILLAR COLUMN ──────────────────────────────────────────────────────────
ALTER TABLE lobby_articles
  ADD COLUMN IF NOT EXISTS pillar TEXT
    CONSTRAINT lobby_articles_pillar_check CHECK (
      pillar IN ('good-clean-news','knowledge','workshop','field-notes','industries','trade-desk','inside-alkota')
    );

-- ── 2. HERO ALT TEXT ──────────────────────────────────────────────────────────
ALTER TABLE lobby_articles
  ADD COLUMN IF NOT EXISTS hero_alt_text TEXT;

-- ── 3. EDITORIAL FLAGS ────────────────────────────────────────────────────────
ALTER TABLE lobby_articles
  ADD COLUMN IF NOT EXISTS is_trending BOOLEAN NOT NULL DEFAULT FALSE;

ALTER TABLE lobby_articles
  ADD COLUMN IF NOT EXISTS is_evergreen BOOLEAN NOT NULL DEFAULT FALSE;

-- ── 4. UPDATED AT ─────────────────────────────────────────────────────────────
ALTER TABLE lobby_articles
  ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ;

-- ── 5. INDUSTRIES ARRAY ───────────────────────────────────────────────────────
ALTER TABLE lobby_articles
  ADD COLUMN IF NOT EXISTS industries TEXT[] NOT NULL DEFAULT '{}';

-- ── 6. DIFFICULTY LEVEL ───────────────────────────────────────────────────────
ALTER TABLE lobby_articles
  ADD COLUMN IF NOT EXISTS difficulty_level TEXT
    CONSTRAINT lobby_articles_difficulty_check CHECK (
      difficulty_level IN ('foundational','intermediate','advanced_engineering')
    );

-- ── 7. PROVENANCE TRACKING ────────────────────────────────────────────────────
ALTER TABLE lobby_articles
  ADD COLUMN IF NOT EXISTS provenance_type TEXT NOT NULL DEFAULT 'uk_original'
    CONSTRAINT lobby_articles_provenance_check CHECK (
      provenance_type IN ('uk_original','us_adapted','archive_heritage')
    );

ALTER TABLE lobby_articles
  ADD COLUMN IF NOT EXISTS original_source_url TEXT;

ALTER TABLE lobby_articles
  ADD COLUMN IF NOT EXISTS attribution_notice TEXT;

ALTER TABLE lobby_articles
  ADD COLUMN IF NOT EXISTS uk_reviewed_by TEXT;

-- ── 8. RELATIONAL CROSS-LINKS ─────────────────────────────────────────────────
ALTER TABLE lobby_articles
  ADD COLUMN IF NOT EXISTS related_case_study_slugs TEXT[] NOT NULL DEFAULT '{}';

ALTER TABLE lobby_articles
  ADD COLUMN IF NOT EXISTS related_article_slugs TEXT[] NOT NULL DEFAULT '{}';

-- ── 9. SEO / CANONICAL ────────────────────────────────────────────────────────
ALTER TABLE lobby_articles
  ADD COLUMN IF NOT EXISTS canonical_url TEXT;

-- ── 10. EDITORIAL STATUS WORKFLOW ─────────────────────────────────────────────
-- Extends beyond simple is_published flag for Phase 03 import workflow
ALTER TABLE lobby_articles
  ADD COLUMN IF NOT EXISTS editorial_status TEXT NOT NULL DEFAULT 'published'
    CONSTRAINT lobby_articles_editorial_status_check CHECK (
      editorial_status IN ('imported','review_required','approved','published','archived','excluded')
    );

-- ── 11. PHASE 03: IMPORT / SOURCE TRACKING ───────────────────────────────────
ALTER TABLE lobby_articles
  ADD COLUMN IF NOT EXISTS import_source TEXT;                  -- e.g. 'alkota_com_gcn'
ALTER TABLE lobby_articles
  ADD COLUMN IF NOT EXISTS import_quality TEXT
    CONSTRAINT lobby_articles_quality_check CHECK (
      import_quality IN ('excellent','good','needs_refresh','historical','exclude')
    );
ALTER TABLE lobby_articles
  ADD COLUMN IF NOT EXISTS uk_localisation_flags TEXT[] NOT NULL DEFAULT '{}'; -- e.g. ['metric_conversion_needed','us_regulations']
ALTER TABLE lobby_articles
  ADD COLUMN IF NOT EXISTS original_publish_date DATE;          -- original publish date from source
ALTER TABLE lobby_articles
  ADD COLUMN IF NOT EXISTS word_count INTEGER;

-- ── 12. INDEXES ───────────────────────────────────────────────────────────────
CREATE INDEX IF NOT EXISTS idx_lobby_articles_pillar
  ON lobby_articles (pillar);

CREATE INDEX IF NOT EXISTS idx_lobby_articles_is_trending
  ON lobby_articles (is_trending) WHERE is_trending = TRUE;

CREATE INDEX IF NOT EXISTS idx_lobby_articles_is_evergreen
  ON lobby_articles (is_evergreen) WHERE is_evergreen = TRUE;

CREATE INDEX IF NOT EXISTS idx_lobby_articles_editorial_status
  ON lobby_articles (editorial_status);

CREATE INDEX IF NOT EXISTS idx_lobby_articles_industries
  ON lobby_articles USING GIN (industries);

-- ── 13. UPDATED_AT TRIGGER ────────────────────────────────────────────────────
CREATE OR REPLACE FUNCTION update_lobby_articles_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS lobby_articles_updated_at_trigger ON lobby_articles;
CREATE TRIGGER lobby_articles_updated_at_trigger
  BEFORE UPDATE ON lobby_articles
  FOR EACH ROW EXECUTE FUNCTION update_lobby_articles_updated_at();

-- ── 14. ROW LEVEL SECURITY (extend existing policy) ──────────────────────────
-- Ensure only published or approved articles are readable via anon key
DROP POLICY IF EXISTS "Published articles are publicly readable" ON lobby_articles;
CREATE POLICY "Published articles are publicly readable"
  ON lobby_articles FOR SELECT
  TO anon, authenticated
  USING (
    is_published = TRUE
    AND editorial_status IN ('published','approved')
  );
