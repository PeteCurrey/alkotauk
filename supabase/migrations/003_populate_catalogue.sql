-- ============================================================
-- 003_populate_catalogue.sql — Populate Parts & Attachments
-- ============================================================

-- ─── POPULATE PARTS ─────────────────────────────────────────────────────────

INSERT INTO parts (part_number, name, description, category, price, in_stock, active, image_url, sort_order)
VALUES
  -- Guns
  ('JA6-00132B', 'GUN, TRIGGER - 8 GPM, 5650 PSI MAX (GP #YRL56)', 'High-pressure trigger gun capable of 8 GPM and 5650 PSI max, with a 320°F temperature rating.', 'Guns', NULL, true, true, NULL, 10),
  ('JA6-00142', 'GUN, TRIGGER - 21 GPM, 8700 PSI (SUTTNER #ST-3600)', 'Industrial-grade trigger gun for extreme pressure applications up to 8700 PSI and 21 GPM flow.', 'Guns', NULL, true, true, NULL, 11),
  ('JA6-00143', 'GUN, TRIGGER - 7 GPM, 4000 PSI (MTM #M407)', 'Reliable 4000 PSI trigger gun designed for standard pressure washing tasks at 7 GPM.', 'Guns', NULL, true, true, NULL, 12),
  
  -- Hoses
  ('K02-03103E33', 'HOSE, JUMPER - 3/8" X 3'', 2 WIRE, 6000 PSI', '3-foot jumper hose with 2-wire reinforcement, 6000 PSI rating, and 3/8" M swivel ends.', 'Hoses', NULL, true, true, NULL, 20),
  ('K02-03106E33', 'HOSE, JUMPER - 3/8" X 6'', 2 WIRE, 6000 PSI', '6-foot jumper hose with 2-wire reinforcement, 6000 PSI rating, and 3/8" M swivel ends.', 'Hoses', NULL, true, true, NULL, 21),
  ('K02-03110E33', 'HOSE, JUMPER - 3/8" X 10'', 2 WIRE, 6000 PSI', '10-foot jumper hose with 2-wire reinforcement, 6000 PSI rating, and 3/8" M swivel ends.', 'Hoses', NULL, true, true, NULL, 22),
  
  -- Nozzles
  ('JA0-00030-2', 'TIP, SPRAY - 0 DEGREE #3 - GP #900030Q', '0-degree spray tip with #3 orifice and a 1/4" quick connect plug rated for 5000 PSI.', 'Nozzles', NULL, true, true, NULL, 30),
  ('JA0-00035-1', 'TIP, SPRAY - 0 DEGREE #3.5 - GP #900035M', '0-degree spray tip with #3.5 orifice and 1/4" male threading rated for 5000 PSI.', 'Nozzles', NULL, true, true, NULL, 31),
  ('JA0-00040-2', 'TIP, SPRAY - 0 DEGREE #4 - GP #900040Q', '0-degree spray tip with #4 orifice and 1/4" quick connect plug rated for 5000 PSI.', 'Nozzles', NULL, true, true, NULL, 32),
  
  -- Pumps
  ('N06-00038', 'PUMP, WATER - CAT #1050 (10 GPM / 2200 PSI)', 'High-capacity water pump from Cat Pumps, rated for 10 GPM and 2200 PSI at 958 RPM.', 'Pumps', NULL, true, true, NULL, 40),
  ('N06-00056', 'PUMP, WATER - CAT #550 (5 GPM / 3000 PSI)', 'Durable Cat Pump offering 5 GPM and 3000 PSI at 1415 RPM with a 24mm shaft.', 'Pumps', NULL, true, true, NULL, 41),
  ('N06-00057', 'PUMP, WATER - CAT #2SF22ELS (2.2 GPM / 2000 PSI)', 'Compact Cat Pump with 2.2 GPM and 2000 PSI, featuring a 5/8" hollow shaft for motor mounting.', 'Pumps', NULL, true, true, NULL, 42)
ON CONFLICT (part_number) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  category = EXCLUDED.category,
  price = EXCLUDED.price;

-- ─── POPULATE ATTACHMENTS ───────────────────────────────────────────────────

-- Using some of the accessories found in research
INSERT INTO attachments (name, slug, description, category, price, in_stock, active, featured, sort_order)
VALUES
  ('Whirl-A-Way Surface Cleaner', 'whirl-a-way-surface-cleaner', 'High-speed rotating surface cleaner for driveways, patios and large flat areas.', 'Accessories', NULL, true, true, true, 10),
  ('Sandblast Kit', 'sandblast-kit', 'Wet sandblasting attachment for removing rust, paint and scale with your pressure washer.', 'Accessories', NULL, true, true, false, 11),
  ('Gutter Cleaner Wand', 'gutter-cleaner-wand', 'U-shaped wand attachment for cleaning gutters safely from the ground.', 'Accessories', NULL, true, true, false, 12),
  ('Turbo Nozzle - Rotating', 'turbo-nozzle-rotating', 'High-impact rotating nozzle for extreme cleaning power on hard surfaces.', 'Nozzles', NULL, true, true, true, 13)
ON CONFLICT (slug) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  category = EXCLUDED.category,
  price = EXCLUDED.price;
