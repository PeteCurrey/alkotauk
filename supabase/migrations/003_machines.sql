-- ============================================================
-- 003_machines.sql — Alkota UK Machine Catalog (Refined)
-- Run in Supabase SQL Editor
-- ============================================================

-- ─── SEED: MACHINES (XH4 Series - Electric) ───────────────────────────────────
insert into machines (name, model_code, slug, tagline, category, series, gpm, psi, btu, drive, hp, voltage, image_url, sort_order) values
  ('Alkota 430XH', '430XH', 'alkota-430xh', 'Elite portable electric hot water.', 'hot-water', 'XH4', 3.9, 3000, 350000, 'belt', 8.0, '230V, 1 PH, 40 AMP', '/assets/products/430xh.png', 10),
  ('Alkota 420XH', '420XH', 'alkota-420xh', 'Standard industrial power.', 'hot-water', 'XH4', 3.5, 2000, 350000, 'belt', 5.0, '230V, 1 PH, 30 AMP', '/assets/products/420xh.png', 11),
  ('Alkota 330XH4', '330XH4', 'alkota-330xh4', 'Compact high-pressure electric.', 'hot-water', 'XH4', 3.0, 3000, 273000, 'belt', 6.0, '230V, 1 PH, 30 AMP', '/assets/products/330xh4.png', 12);

-- ─── SEED: MACHINES (EN/HN Series - Gas) ──────────────────────────────────────
insert into machines (name, model_code, slug, tagline, category, series, gpm, psi, btu, drive, engine, image_url, featured, sort_order) values
  ('Alkota 5355HNL', '5355HNL', 'alkota-5355hnl', 'The rugged industry standard.', 'hot-water', 'EN/HN', 5.0, 3500, 355000, 'belt', 'GX630 Honda (Electric Start)', '/assets/products/5355hnl.png', true, 20),
  ('Alkota 8405HNL', '8405HNL', 'alkota-8405hnl', 'Extreme volume hot water.', 'hot-water', 'EN/HN', 8.0, 4000, 510000, 'belt', 'GX800 EFI Honda (Electric Start)', '/assets/products/8405hnl.png', false, 21),
  ('Alkota 7407DNL', '7407DNL', 'alkota-7407dnl', 'Diesel-powered high capacity.', 'hot-water', 'EN/HN', 7.0, 4000, 630000, 'belt', 'Kubota D902 Diesel', '/assets/products/7407dnl.png', false, 22);

-- ─── SEED: MACHINES (GED 12V Series) ──────────────────────────────────────────
insert into machines (name, model_code, slug, tagline, category, series, gpm, psi, btu, engine, image_url, sort_order) values
  ('Alkota 4405F', '4405F', 'alkota-4405f', 'Versatile gasoline performance.', 'hot-water', 'GED 12V', 4.0, 4000, 235000, 'Vanguard 18 HP', '/assets/products/4405f.png', 30);

-- ─── SEED: MACHINES (DED Series - Diesel) ─────────────────────────────────────
insert into machines (name, model_code, slug, tagline, category, series, gpm, psi, btu, engine, image_url, sort_order) values
  ('Alkota 10307KK', '10307KK', 'alkota-10307kk', 'The heavy-duty diesel workhorse.', 'hot-water', 'DED', 10.0, 3000, 785000, 'Kubota D1305 Water Cooled', '/assets/products/10307kk.png', 40);

-- ─── SEED: MACHINES (Specialty) ────────────────────────────────────────────────
insert into machines (name, model_code, slug, tagline, category, series, image_url, sort_order) values
  ('Alkota Model 111', '111', 'alkota-model-111', 'High-pressure steam cleaning.', 'steam', 'Steam', '/assets/products/model-111.png', 50),
  ('Alkota Model 911', '911', 'alkota-model-911', 'Precision parts washing.', 'parts-washers', 'Parts Washers', '/assets/products/model-911.png', 60),
  ('Alkota VFS-1', 'VFS-1', 'alkota-vfs-1', 'Advanced vacuum filtration.', 'water-treatment', 'Water Treatment', '/assets/products/vfs-1.png', 70);
