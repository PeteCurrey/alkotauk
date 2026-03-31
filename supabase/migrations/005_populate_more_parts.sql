-- ============================================================
-- 005_populate_more_parts.sql — Populate Additional Parts
-- ============================================================

INSERT INTO parts (part_number, name, description, category, price, in_stock, active, sort_order)
VALUES
  -- ─── GUNS ──────────────────────────────────────────────────
  ('10-151', 'Alkota Easy-Pull Trigger Gun', 'Industrial grade trigger gun designed for reduced hand fatigue during long periods of use, rated up to 5000 PSI.', 'Guns', NULL, true, true, 100),
  ('ST-1500', 'Suttner ST-1500 Trigger Gun', 'Standard high-pressure trigger gun featuring a durable plastic housing and stainless steel internal components.', 'Guns', NULL, true, true, 101),
  ('10-154', 'YG-5000 Performance Gun', 'Heavy-duty spray gun with an easy-open trigger and comfortable grip for industrial pressure washing applications.', 'Guns', NULL, true, true, 102),
  ('ST-2305', 'Suttner ST-2305 Economical Gun', 'Compact and lightweight trigger gun ideal for medium-duty commercial use, rated for 4500 PSI.', 'Guns', NULL, true, true, 103),
  ('MV-925', 'Mecline MV-925 Trigger Gun', 'High-quality trigger gun with ceramic ball for increased durability and resistance to chemicals.', 'Guns', NULL, true, true, 104),
  ('ST-2605', 'Relax-Action Trigger Gun', 'Features a unique trigger mechanism that requires 40% less holding force and 90% less trigger pull force.', 'Guns', NULL, true, true, 105),
  ('10-157', 'Rear Entry Spray Gun', 'Traditional rear-entry design for easy hose management and maneuvering in tight spaces.', 'Guns', NULL, true, true, 106),
  ('10-159', 'Giant 21250 Trigger Gun', 'Durable Giant brand trigger gun known for its longevity in industrial wash bay environments.', 'Guns', NULL, true, true, 107),
  ('10-162', 'Steam Trigger Gun', 'Specialized gun designed for high-temperature steam applications up to 300°F.', 'Guns', NULL, true, true, 108),
  ('10-165', 'Front Entry Trigger Gun', 'Front-entry design provides balanced handling for specific cleaning angles and reduced wrist strain.', 'Guns', NULL, true, true, 109),

  -- ─── HOSES ─────────────────────────────────────────────────
  ('12-101', '50'' 3/8" 4000 PSI Single Wire Hose', 'High-pressure hose with black bend restrictors, standard for most industrial pressure washers.', 'Hoses', NULL, true, true, 200),
  ('12-105', '100'' 3/8" 4000 PSI Single Wire Hose', 'Extended length high-pressure hose for greater reach in large facilities and outdoor sites.', 'Hoses', NULL, true, true, 201),
  ('12-205', '50'' 3/8" 4000 PSI Non-Marking Hose', 'Gray cover hose that resists leaving scuffs on concrete, tile, and painted surfaces.', 'Hoses', NULL, true, true, 202),
  ('12-300', '50'' 3/8" 6000 PSI Double Wire Hose', 'Double-braided wire reinforcement for ultra-high pressure applications and maximum durability.', 'Hoses', NULL, true, true, 203),
  ('12-401', 'High-Temp Steam Hose', 'Reinforced hose specifically rated for steam and superheated water applications.', 'Hoses', NULL, true, true, 204),
  ('12-502', '1/2" Bypass Hose', 'Low-pressure reinforced hose used for pump bypass loops and water tank connections.', 'Hoses', NULL, true, true, 205),
  ('12-601', 'Chemical Suction Hose (Clear)', 'Reinforced clear PVC hose for drawing detergents and chemicals from drums or tanks.', 'Hoses', NULL, true, true, 206),
  ('12-700', 'Jetter Hose (1/8" x 50'')', 'Narrow, flexible hose used for drain cleaning and pipe scouring at high pressures.', 'Hoses', NULL, true, true, 207),
  ('12-805', 'Heavy-Duty Garden Hose (3/4")', 'Durable water supply hose for connecting pressure washers to site water sources.', 'Hoses', NULL, true, true, 208),
  ('12-901', 'Blue Non-Marking Hose', 'Premium blue cover hose designed for food processing and swimming pool applications.', 'Hoses', NULL, true, true, 209),

  -- ─── NOZZLES ───────────────────────────────────────────────
  ('15-040', '0004 Red Spray Nozzle', '0-degree high-impact nozzle for removing stubborn deposits and cutting through heavy grime.', 'Nozzles', NULL, true, true, 300),
  ('15-041', '1504 Yellow Spray Nozzle', '15-degree fan nozzle for heavy-duty stripping and surface preparation.', 'Nozzles', NULL, true, true, 301),
  ('15-042', '2504 Green Spray Nozzle', '25-degree fan nozzle for general cleaning of vehicles, equipment, and walls.', 'Nozzles', NULL, true, true, 302),
  ('15-043', '4004 White Spray Nozzle', '40-degree wide fan nozzle for gentle rinsing of sensitive surfaces and large areas.', 'Nozzles', NULL, true, true, 303),
  ('15-045', '6540 Black Chemical Nozzle', 'Low-pressure nozzle designed to create suction for downstream chemical injectors.', 'Nozzles', NULL, true, true, 304),
  ('15-500', 'Turbo Nozzle (3.0 Orifice)', 'Rotating nozzle that combines the power of a 0-degree jet with the coverage of a 25-degree fan.', 'Nozzles', NULL, true, true, 305),
  ('15-505', 'Turbo Nozzle (4.0 Orifice)', 'Higher flow rotating nozzle for faster cleaning on high-volume pressure washers.', 'Nozzles', NULL, true, true, 306),
  ('15-601', 'Adjustable Multi-Reg Nozzle', 'Allows for easy switching between high and low pressure and variable spray patterns.', 'Nozzles', NULL, true, true, 307),
  ('15-702', 'Sewer Jetter Nozzle', 'Back-jetting nozzle designed to pull itself into pipes while scouring the interior walls.', 'Nozzles', NULL, true, true, 308),
  ('15-800', 'Steam Nozzle Assembly', 'Specialized nozzle tip designed for optimal steam dispersion and heat retention.', 'Nozzles', NULL, true, true, 309),

  -- ─── PUMPS ─────────────────────────────────────────────────
  ('20-001', 'General Pump TS2021', 'Classic triplex plunger pump, 5.6 GPM @ 3500 PSI, known for extreme reliability and longevity.', 'Pumps', NULL, true, true, 400),
  ('20-005', 'AR RKV4G40 High Pressure Pump', 'Annovi Reverberi triplex pump rated for 4.0 GPM @ 4000 PSI, widely used in mobile units.', 'Pumps', NULL, true, true, 401),
  ('20-010', 'Cat Pump 5CP2120W', 'Premium industrial plunger pump with high-temperature seal kits, rated for continuous duty.', 'Pumps', NULL, true, true, 402),
  ('20-015', 'AR RSV3G30 Pump', 'Direct drive pump for gas engines, compact design for portable residential/commercial units.', 'Pumps', NULL, true, true, 403),
  ('20-022', 'General Pump TX1510', 'Heavy-duty triplex pump with a solid ceramic plunger and forged brass manifold.', 'Pumps', NULL, true, true, 404),
  ('20-030', 'Giant LP123 Plunger Pump', 'Large frame pump designed for large stationary wash systems and high-flow applications.', 'Pumps', NULL, true, true, 405),
  ('20-045', 'Comet ZWD4040G Direct Drive', 'Compact triplex pump with thermal relief valve, designed for 1-inch shaft gas engines.', 'Pumps', NULL, true, true, 406),
  ('20-055', 'General Pump TSS1511', 'Stainless steel manifold pump for use with aggressive chemicals and saltwater environments.', 'Pumps', NULL, true, true, 407),
  ('20-070', 'Cat Pump 310', 'The ''Gold Standard'' of industrial pumps, compact frame with 4.0 GPM capacity.', 'Pumps', NULL, true, true, 408),
  ('20-085', 'Giant P210 Triplex Pump', 'Small, durable pump often used on Alkota''s portable electric hot water units.', 'Pumps', NULL, true, true, 409)
ON CONFLICT (part_number) DO UPDATE SET
  name = EXCLUDED.name,
  description = EXCLUDED.description,
  category = EXCLUDED.category,
  price = EXCLUDED.price;
