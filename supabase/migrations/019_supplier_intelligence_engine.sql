-- ============================================================
-- 019_supplier_intelligence_engine.sql — Alkota UK Supplier Ingestion & AI Catalogue Intelligence
-- Run in Supabase SQL Editor
-- ============================================================

-- ─── 1. EXTEND SUPPLIERS TABLE (CONNECTOR CONFIG & STATUS) ───────────────────
ALTER TABLE IF EXISTS suppliers
  ADD COLUMN IF NOT EXISTS integration_method    text NOT NULL DEFAULT 'manual' 
    CHECK (integration_method IN ('rest_api', 'graphql', 'xml_feed', 'json_feed', 'pim', 'ftp', 'sftp', 'csv', 'xlsx', 'pdf', 'manual')),
  ADD COLUMN IF NOT EXISTS api_endpoint          text,
  ADD COLUMN IF NOT EXISTS auth_method           text NOT NULL DEFAULT 'none'
    CHECK (auth_method IN ('api_key', 'oauth2', 'basic', 'bearer', 'none')),
  ADD COLUMN IF NOT EXISTS credential_ref        text, -- e.g. 'DUAL_PUMPS' (env var lookup pointer - never stores raw secret)
  ADD COLUMN IF NOT EXISTS last_sync_attempted_at timestamptz,
  ADD COLUMN IF NOT EXISTS sync_status           text NOT NULL DEFAULT 'idle'
    CHECK (sync_status IN ('idle', 'running', 'completed', 'completed_with_warnings', 'failed', 'cancelled')),
  ADD COLUMN IF NOT EXISTS sync_error            text,
  ADD COLUMN IF NOT EXISTS sync_frequency_hours  integer NOT NULL DEFAULT 24,
  ADD COLUMN IF NOT EXISTS products_discovered   integer NOT NULL DEFAULT 0,
  ADD COLUMN IF NOT EXISTS products_changed      integer NOT NULL DEFAULT 0,
  ADD COLUMN IF NOT EXISTS new_products          integer NOT NULL DEFAULT 0;

-- ─── 2. IMPORT BATCHES TABLE ───────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS import_batches (
  id                          uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  supplier_id                 uuid NOT NULL REFERENCES suppliers(id) ON DELETE CASCADE,
  status                      text NOT NULL DEFAULT 'queued'
    CHECK (status IN ('queued', 'running', 'completed', 'completed_with_warnings', 'failed', 'cancelled')),
  trigger_method              text NOT NULL DEFAULT 'manual'
    CHECK (trigger_method IN ('manual', 'scheduled', 'webhook', 'file_upload')),
  triggered_by                text DEFAULT 'admin',
  started_at                  timestamptz NOT NULL DEFAULT now(),
  completed_at                timestamptz,
  products_discovered         integer NOT NULL DEFAULT 0,
  products_new                integer NOT NULL DEFAULT 0,
  products_changed            integer NOT NULL DEFAULT 0,
  products_duplicate          integer NOT NULL DEFAULT 0,
  products_failed             integer NOT NULL DEFAULT 0,
  products_requiring_review   integer NOT NULL DEFAULT 0,
  error_message               text,
  notes                       text,
  metadata                    jsonb DEFAULT '{}'::jsonb,
  created_at                  timestamptz NOT NULL DEFAULT now(),
  updated_at                  timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE import_batches ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Service role full access import batches" ON import_batches;
CREATE POLICY "Service role full access import batches" ON import_batches FOR ALL USING (true);
CREATE INDEX IF NOT EXISTS import_batches_supplier_idx ON import_batches(supplier_id);
CREATE INDEX IF NOT EXISTS import_batches_status_idx ON import_batches(status);

-- ─── 3. EXTEND STAGED SUPPLIER PRODUCTS ───────────────────────────────────────
ALTER TABLE IF EXISTS staged_supplier_products
  ADD COLUMN IF NOT EXISTS batch_id            uuid REFERENCES import_batches(id) ON DELETE SET NULL,
  ADD COLUMN IF NOT EXISTS retrieved_at        timestamptz NOT NULL DEFAULT now(),
  ADD COLUMN IF NOT EXISTS raw_supplier_id     text,
  ADD COLUMN IF NOT EXISTS mpn                 text,
  ADD COLUMN IF NOT EXISTS manufacturer        text,
  ADD COLUMN IF NOT EXISTS image_urls          text[] DEFAULT '{}',
  ADD COLUMN IF NOT EXISTS document_urls       text[] DEFAULT '{}',
  ADD COLUMN IF NOT EXISTS ai_category         text,
  ADD COLUMN IF NOT EXISTS ai_brand            text,
  ADD COLUMN IF NOT EXISTS ai_confidence       decimal(4,2),
  ADD COLUMN IF NOT EXISTS ai_model            text,
  ADD COLUMN IF NOT EXISTS ai_reasoning        text,
  ADD COLUMN IF NOT EXISTS ai_run_at           timestamptz,
  ADD COLUMN IF NOT EXISTS ai_task_type        text,
  ADD COLUMN IF NOT EXISTS anomaly_flags       text[] DEFAULT '{}',
  ADD COLUMN IF NOT EXISTS validation_warnings text[] DEFAULT '{}',
  ADD COLUMN IF NOT EXISTS admin_action        text 
    CHECK (admin_action IN ('approved', 'rejected', 'merged', 'mapped')),
  ADD COLUMN IF NOT EXISTS admin_action_by     text,
  ADD COLUMN IF NOT EXISTS admin_action_at     timestamptz,
  ADD COLUMN IF NOT EXISTS published_at        timestamptz;

CREATE INDEX IF NOT EXISTS staged_batch_idx ON staged_supplier_products(batch_id);
CREATE INDEX IF NOT EXISTS staged_import_status_idx ON staged_supplier_products(import_status);
CREATE INDEX IF NOT EXISTS staged_admin_action_idx ON staged_supplier_products(admin_action);

-- ─── 4. AI DECISION LOG TABLE (AUDITABLE AI INTELLIGENCE) ────────────────────
CREATE TABLE IF NOT EXISTS ai_decision_log (
  id                          uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  task_type                   text NOT NULL 
    CHECK (task_type IN ('classification', 'brand_match', 'product_match', 'duplicate_detection', 'attribute_extraction', 'anomaly_scan')),
  source_type                 text NOT NULL DEFAULT 'staged_product'
    CHECK (source_type IN ('staged_product', 'batch', 'manual', 'canonical_part')),
  source_id                   text NOT NULL,
  input_summary               text NOT NULL,
  result                      jsonb NOT NULL DEFAULT '{}'::jsonb,
  confidence                  decimal(4,2) NOT NULL DEFAULT 0.00,
  model                       text NOT NULL DEFAULT 'gpt-4o-mini',
  human_approved              boolean,
  human_action_by             text,
  human_action_at             timestamptz,
  overridden                  boolean NOT NULL DEFAULT false,
  override_value              jsonb,
  created_at                  timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE ai_decision_log ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Service role full access ai decisions" ON ai_decision_log;
CREATE POLICY "Service role full access ai decisions" ON ai_decision_log FOR ALL USING (true);
CREATE INDEX IF NOT EXISTS ai_decision_task_idx ON ai_decision_log(task_type);
CREATE INDEX IF NOT EXISTS ai_decision_source_idx ON ai_decision_log(source_id);

-- ─── 5. SUPPLIER SYNC LOGS (STRUCTURED OBSERVABILITY) ────────────────────────
CREATE TABLE IF NOT EXISTS supplier_sync_logs (
  id                          uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  batch_id                    uuid NOT NULL REFERENCES import_batches(id) ON DELETE CASCADE,
  level                       text NOT NULL DEFAULT 'info' CHECK (level IN ('info', 'warn', 'error')),
  event                       text NOT NULL,
  message                     text NOT NULL,
  payload                     jsonb DEFAULT '{}'::jsonb,
  part_number                 text,
  supplier_sku                text,
  created_at                  timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE supplier_sync_logs ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Service role full access sync logs" ON supplier_sync_logs;
CREATE POLICY "Service role full access sync logs" ON supplier_sync_logs FOR ALL USING (true);
CREATE INDEX IF NOT EXISTS sync_logs_batch_idx ON supplier_sync_logs(batch_id);
CREATE INDEX IF NOT EXISTS sync_logs_level_idx ON supplier_sync_logs(level);

-- ─── 6. PRICING & MARGIN RULES TABLE ──────────────────────────────────────────
CREATE TABLE IF NOT EXISTS pricing_margin_rules (
  id                          uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  rule_type                   text NOT NULL CHECK (rule_type IN ('global', 'category', 'brand', 'supplier', 'product')),
  target_id                   text, -- slug or ID of category/brand/supplier
  margin_pct                  decimal(5,2) NOT NULL,
  fixed_markup                decimal(10,2) NOT NULL DEFAULT 0.00,
  min_margin_pct              decimal(5,2),
  trade_discount_pct          decimal(5,2) NOT NULL DEFAULT 15.00,
  active                      boolean NOT NULL DEFAULT true,
  notes                       text,
  created_at                  timestamptz NOT NULL DEFAULT now(),
  updated_at                  timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE pricing_margin_rules ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Service role full access margin rules" ON pricing_margin_rules;
CREATE POLICY "Service role full access margin rules" ON pricing_margin_rules FOR ALL USING (true);

