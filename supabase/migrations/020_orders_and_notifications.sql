-- ============================================================
-- 020_orders_and_notifications.sql — Orders Management & Notifications
-- ============================================================

CREATE TABLE IF NOT EXISTS orders (
  id                  uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  order_number        text NOT NULL UNIQUE,
  customer_name       text NOT NULL,
  customer_email      text NOT NULL,
  customer_phone      text,
  company_name        text,
  shipping_address    jsonb NOT NULL DEFAULT '{}'::jsonb,
  billing_address     jsonb NOT NULL DEFAULT '{}'::jsonb,
  items               jsonb NOT NULL DEFAULT '[]'::jsonb,
  subtotal            decimal(10,2) NOT NULL DEFAULT 0.00,
  vat                 decimal(10,2) NOT NULL DEFAULT 0.00,
  shipping_cost       decimal(10,2) NOT NULL DEFAULT 0.00,
  total               decimal(10,2) NOT NULL DEFAULT 0.00,
  status              text NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'pending', 'hold', 'shipped', 'completed', 'cancelled')),
  payment_status      text NOT NULL DEFAULT 'paid' CHECK (payment_status IN ('paid', 'awaiting_payment', 'invoice_30_days', 'refunded')),
  tracking_number     text,
  carrier             text,
  notes               text,
  created_at          timestamptz NOT NULL DEFAULT now(),
  updated_at          timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS orders_status_idx ON orders(status);
CREATE INDEX IF NOT EXISTS orders_created_at_idx ON orders(created_at DESC);

ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Public can read own orders by email" ON orders;
CREATE POLICY "Public can read own orders by email" ON orders FOR SELECT USING (true);
DROP POLICY IF EXISTS "Service role full access orders" ON orders;
CREATE POLICY "Service role full access orders" ON orders FOR ALL USING (true);

-- Seed some initial realistic orders if empty
INSERT INTO orders (order_number, customer_name, customer_email, customer_phone, company_name, items, subtotal, vat, shipping_cost, total, status, payment_status, created_at)
VALUES 
(
  'ALK-ORD-1082',
  'David Richardson',
  'd.richardson@midlandhaulage.co.uk',
  '07700 900821',
  'Midland Fleet Services',
  '[{"name": "50ft Wire Braided High-Pressure Hose 3/8in (400 BAR)", "sku": "HSE-38-50-400", "unit_price": 86.50, "quantity": 2, "total": 173.00}, {"name": "Industrial Rotating Turbo Nozzle 045", "sku": "NOZ-TRB-045", "unit_price": 54.00, "quantity": 1, "total": 54.00}]'::jsonb,
  227.00,
  45.40,
  12.50,
  284.90,
  'new',
  'paid',
  now() - interval '45 minutes'
),
(
  'ALK-ORD-1081',
  'Gareth Davies',
  'gareth@cambrianquarries.com',
  '07891 234567',
  'Cambrian Aggregates Ltd',
  '[{"name": "Heavy Duty Trigger Gun with Swivel & Extension Lance", "sku": "GUN-HD-SWIV-01", "unit_price": 94.00, "quantity": 1, "total": 94.00}, {"name": "Quick Release Stainless Coupler Set 3/8in", "sku": "CPL-SS-38-SET", "unit_price": 28.50, "quantity": 2, "total": 57.00}]'::jsonb,
  151.00,
  30.20,
  9.50,
  190.70,
  'new',
  'paid',
  now() - interval '3 hours'
),
(
  'ALK-ORD-1080',
  'Mark Thompson',
  'mark.t@thompsonwashplant.co.uk',
  '07788 112233',
  'Thompson Commercial Valeting',
  '[{"name": "Interpump WS201 High Pressure Plunger Pump Assembly", "sku": "PMP-INT-WS201", "unit_price": 425.00, "quantity": 1, "total": 425.00}]'::jsonb,
  425.00,
  85.00,
  15.00,
  525.00,
  'pending',
  'paid',
  now() - interval '1 day'
),
(
  'ALK-ORD-1079',
  'Stuart Bell',
  'sbell@cumbriafarmcare.co.uk',
  '07912 345678',
  'Cumbria Farm Care',
  '[{"name": "Schedule 80 Heating Coil 4-Series Replacement", "sku": "COIL-SCH80-4S", "unit_price": 680.00, "quantity": 1, "total": 680.00}]'::jsonb,
  680.00,
  136.00,
  25.00,
  841.00,
  'shipped',
  'paid',
  now() - interval '2 days'
)
ON CONFLICT (order_number) DO NOTHING;
