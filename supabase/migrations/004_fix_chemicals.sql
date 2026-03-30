-- ============================================================
-- 004_fix_chemicals.sql — Alkota UK Chemical Catalog Update
-- Run in Supabase SQL Editor
-- ============================================================

-- Add image_url to chemicals table
alter table chemicals add column if not exists image_url text;

-- Update labels and image URLs for seeded chemicals
update chemicals set image_url = '/assets/products/tr440-farm-soap.png', name = 'TR-440 Farm Soap' where slug = 'tr-440-farm-soap';
update chemicals set image_url = '/assets/products/de703-grease-cutter.png', name = 'Grease Cutter DE-703' where slug = 'grease-cutter-de-703';
update chemicals set image_url = '/assets/products/auto-shampoo.png', name = 'Alkota Auto Shampoo' where slug = 'alkota-auto-shampoo';
update chemicals set image_url = '/assets/products/truck-plant-wash.png', name = 'Truck & Plant Wash HD' where slug = 'truck-plant-wash-hd';
update chemicals set image_url = '/assets/products/food-safe-cleaner.png', name = 'Alkota Food Safe Cleaner' where slug = 'alkota-food-safe-cleaner';
update chemicals set image_url = '/assets/products/scale-stop.png', name = 'Scale Stop Additive' where slug = 'scale-stop-additive';
update chemicals set image_url = '/assets/products/masonry-cleaner.png', name = 'Masonry & Concrete Cleaner' where slug = 'masonry-concrete-cleaner';
