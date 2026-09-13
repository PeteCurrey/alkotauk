-- ============================================================================
-- Migration 029: Alkota UK — Phase 8.1 Catalogue Ingestion & Normalisation
-- Description: Ingests 4 All-Electric hot water models (108, 4208, 4308, 5308),
--              corrects 530B phase from 13 to 3, normalises NBSP in voltages,
--              and normalises HTML entities in taglines.
-- ============================================================================

-- 1. Correct 530B phase
UPDATE products SET phase = 3, updated_at = now() WHERE (model_code = '530B' OR slug = 'alkota-530b') AND phase = 13;

-- 2. Normalise NBSP characters in voltage
UPDATE products SET voltage = REPLACE(voltage, E'\u00a0', ' '), updated_at = now() WHERE voltage LIKE E'%\u00a0%';

-- 3. Normalise HTML entity &amp; in tagline and series
UPDATE products SET tagline = REPLACE(tagline, '&amp;', '&'), updated_at = now() WHERE tagline LIKE '%&amp;%';
UPDATE products SET series = REPLACE(series, '&amp;', '&'), updated_at = now() WHERE series LIKE '%&amp;%';

-- 4. Upsert 4 All-Electric hot water models
INSERT INTO products (
  slug, model_code, name, series, category, subcategory,
  status, active, featured, is_elite_series, sort_order,
  tagline, short_description, description, uk_description, engineering_story,
  flow_rate_gpm, flow_rate_lpm, pressure_psi, pressure_bar,
  power_source, heating_fuel, voltage, phase, amp_requirement, motor_hp, motor_kw,
  burner_btu, max_temp_c, portable, mobility, dimensions_mm, dimensions_inches,
  weight_kg, weight_lbs, pump_type, coil_type, warranty_years, coil_warranty_years,
  certifications, duty_application, applications, industries, features, options, extra_specs,
  primary_image_url, gallery_images, pdf_spec_url, pdf_brochure_url,
  meta_title, meta_description, canonical_url, no_index,
  source_url, source_last_checked, upstream_data, migration_status, needs_review
) VALUES (
  'alkota-108', '108', 'Alkota 108', 'All Electric Series', 'hot-water', NULL,
  'published', true, false, false, 40,
  '108 — All Electric Zero-Emission Hot Water Pressure Washer', 'Zero-emission all-electric hot water pressure washer engineered for indoor food processing, pharmaceuticals, and cleanrooms requiring high temperatures without exhaust fumes.', 'The Alkota 108 All-Electric hot water pressure washer delivers continuous high-temperature cleaning with zero combustion emissions. Featuring 60 kW of stainless steel immersion heating elements and a precision triplex plunger pump, the 108 is engineered specifically for indoor facilities where diesel or gas exhaust is strictly prohibited.', 'Alkota 108 is an industrial-grade zero-emission electric hot water pressure washer engineered for UK food processing plants, pharmaceutical production suites, and confined indoor wash bays where open flames and exhaust fumes are strictly forbidden. Delivering 28 bar (400 PSI) at 6.4 L/min (1.7 GPM) with a 60 kW commercial electric heating system, it provides high-temperature chemical-free sanitisation in compliance with UK food safety and indoor air quality standards.', 'Designed for demanding sanitary environments, the Alkota 108 eliminates exhaust emissions by utilising heavy-duty industrial immersion heating elements enclosed in an insulated pressure vessel. With an oil-bath ceramic triplex pump and industrial electric motor, the 108 provides quiet, continuous duty sanitisation with minimal maintenance.',
  1.7, 6.4, 400, 28,
  'Electric Motor', 'All-Electric / Immersion', '240 to 460 v', 3, 60, 0.75, 0.56,
  205000, 93, false, 'Stationary Heavy-Duty Frame', '864 × 610 × 940 mm', '34" L × 24" W × 37" H',
  159, 350, 'Oil Bath Crankcase|Triplex Ceramic Plunger', 'Stainless Steel Immersion Pressure Vessel', 1, 5,
  ARRAY['ETL certified to UL-1776','CSA Certified']::text[], 'Continuous Industrial Indoor Duty (6–10 hrs/day)', ARRAY['Food Processing Sanitation','Pharmaceutical Cleanroom Decontamination','Indoor Facility Maintenance','Commercial Kitchen Degreasing']::text[], ARRAY['manufacturing','food-processing','pharmaceutical','agriculture']::text[], ARRAY['Zero-emission electric heating elements','Precision ceramic plunger triplex pump','Stainless steel float tank','Precision metered chemical injection','Automated temperature control']::text[], ARRAY['Wheel Kit for Mobility','Stainless Steel Outer Cabinet','Auto Start / Stop Control System','Remote Station Interface']::text[], '[{"label":"Heating Capacity","value":"60 kW (6x 10,000 W Immersion Elements)"},{"label":"Heat Rise","value":"138°C (250°F) rise"},{"label":"Voltage Options","value":"240V / 460V 3-Phase (400V 3PH 50Hz UK)"},{"label":"Amperage Draw","value":"60A @ 460V / 120A @ 240V"},{"label":"Hose Specifications","value":"50 ft × 3/8 in High Pressure"}]'::jsonb,
  'https://alkota.com/wp-content/uploads/2023/07/All_Electric_Hot_Water_Pressure_Washer_02_Alkota-1-1024x1024.png', ARRAY[]::text[], 'https://alkota.com/wp-content/uploads/2023/12/Tech_Data_Hot_Water_Pressure_Washer_All_Electric_Series_Alkota_12_23.pdf', 'https://alkota.com/wp-content/uploads/2023/12/Tech_Data_Hot_Water_Pressure_Washer_All_Electric_Series_Alkota_12_23.pdf',
  'Alkota 108 All-Electric Hot Water Pressure Washer | 28 Bar | Alkota UK', 'Alkota 108 all-electric zero-emission industrial hot water pressure washer. 28 bar (400 PSI), 6.4 L/min, 60 kW immersion heat for food plants and indoor cleanrooms.', 'https://alkota.co.uk/machines/hot-water/alkota-108', false,
  'https://alkota.com/products/hot-water-pressure-washers/power-washer-industrial-hot-water-all-electric-series/', '2026-09-13', '{"source":"https://alkota.com/products/hot-water-pressure-washers/power-washer-industrial-hot-water-all-electric-series/","scraped_at":"2026-09-13T12:00:00.000Z","series_raw":"All Electric Series","specs_raw":{"Flow Rate":"1.7 gpm","Pressure":"400 psi","Heat Rise":"250 ºF","Voltage":"240 to 460 v","Phase":"3","Amp Requirement":"60 / 120 amp","Motor Power":"3/4 hp","Water Heater":"Replaceable 6 to 10000 W|Stainless Steel Immersion Heater","Length":"34 in","Width":"24 in","Height":"37 in","Weight":"350 lbs"}}'::jsonb, 'new', false
)
ON CONFLICT (slug) DO UPDATE SET
  model_code = EXCLUDED.model_code,
  name = EXCLUDED.name,
  series = EXCLUDED.series,
  category = EXCLUDED.category,
  flow_rate_gpm = EXCLUDED.flow_rate_gpm,
  flow_rate_lpm = EXCLUDED.flow_rate_lpm,
  pressure_psi = EXCLUDED.pressure_psi,
  pressure_bar = EXCLUDED.pressure_bar,
  power_source = EXCLUDED.power_source,
  heating_fuel = EXCLUDED.heating_fuel,
  voltage = EXCLUDED.voltage,
  phase = EXCLUDED.phase,
  amp_requirement = EXCLUDED.amp_requirement,
  motor_hp = EXCLUDED.motor_hp,
  motor_kw = EXCLUDED.motor_kw,
  burner_btu = EXCLUDED.burner_btu,
  max_temp_c = EXCLUDED.max_temp_c,
  dimensions_mm = EXCLUDED.dimensions_mm,
  dimensions_inches = EXCLUDED.dimensions_inches,
  weight_kg = EXCLUDED.weight_kg,
  weight_lbs = EXCLUDED.weight_lbs,
  primary_image_url = EXCLUDED.primary_image_url,
  pdf_spec_url = EXCLUDED.pdf_spec_url,
  pdf_brochure_url = EXCLUDED.pdf_brochure_url,
  updated_at = now();

INSERT INTO products (
  slug, model_code, name, series, category, subcategory,
  status, active, featured, is_elite_series, sort_order,
  tagline, short_description, description, uk_description, engineering_story,
  flow_rate_gpm, flow_rate_lpm, pressure_psi, pressure_bar,
  power_source, heating_fuel, voltage, phase, amp_requirement, motor_hp, motor_kw,
  burner_btu, max_temp_c, portable, mobility, dimensions_mm, dimensions_inches,
  weight_kg, weight_lbs, pump_type, coil_type, warranty_years, coil_warranty_years,
  certifications, duty_application, applications, industries, features, options, extra_specs,
  primary_image_url, gallery_images, pdf_spec_url, pdf_brochure_url,
  meta_title, meta_description, canonical_url, no_index,
  source_url, source_last_checked, upstream_data, migration_status, needs_review
) VALUES (
  'alkota-4208', '4208', 'Alkota 4208', 'All Electric Series', 'hot-water', NULL,
  'published', true, false, false, 41,
  '4208 — All Electric Zero-Emission Hot Water Pressure Washer', 'High-pressure all-electric hot water pressure washer providing 138 bar of degreasing power with 60 kW immersion heating and zero emissions.', 'The Alkota 4208 All-Electric hot water pressure washer delivers 138 bar (2000 PSI) at 13.2 L/min (3.5 GPM) for demanding indoor commercial cleaning. Equipped with a 5.0 hp industrial electric motor and 60 kW stainless steel immersion heating elements, it tackles heavy grease and protein soils without creating exhaust fumes.', 'Alkota 4208 is an industrial 138 bar (2,000 PSI) all-electric hot water pressure washer engineered for British food manufacturing facilities, abattoirs, and pharmaceutical plants. Delivering 13.2 L/min (3.5 GPM) backed by 60 kW of electric heating capacity, it strips grease and animal fats cleanly and quietly in indoor environments.', 'Engineered with a heavy welded steel frame and stainless steel float tank, the Alkota 4208 combines heavy-duty mechanical pressure washing performance with emission-free thermal heating. Powered by a 5.0 hp motor with an industrial triplex ceramic plunger pump.',
  3.5, 13.2, 2000, 138,
  'Electric Motor', 'All-Electric / Immersion', '240 to 460 v', 3, 70, 5, 3.73,
  205000, 93, false, 'Stationary Heavy-Duty Frame', '864 × 610 × 940 mm', '34" L × 24" W × 37" H',
  220, 485, 'Oil Bath Crankcase|Triplex Ceramic Plunger', 'Stainless Steel Immersion Pressure Vessel', 1, 5,
  ARRAY['ETL certified to UL-1776','CSA Certified']::text[], 'Continuous Industrial Indoor Duty (6–10 hrs/day)', ARRAY['Food Plant Hygiene & Degreasing','Abattoir & Meat Processing Washdown','Pharmaceutical Manufacturing Sanitisation','Indoor Wash Bays']::text[], ARRAY['manufacturing','food-processing','pharmaceutical','agriculture']::text[], ARRAY['Zero-emission 60 kW electric immersion heat','Precision ceramic plunger triplex pump','Stainless steel float tank','High-pressure chemical metering','Thermostatic temperature regulation']::text[], ARRAY['Wheel Kit for Mobility','Stainless Steel Outer Cabinet','Auto Start / Stop Control System','Remote Station Interface']::text[], '[{"label":"Heating Capacity","value":"60 kW (6x 10,000 W Immersion Elements)"},{"label":"Heat Rise","value":"50°C (90°F) rise"},{"label":"Voltage Options","value":"240V / 460V 3-Phase (400V 3PH 50Hz UK)"},{"label":"Amperage Draw","value":"70A @ 460V / 140A @ 240V"},{"label":"Hose Specifications","value":"50 ft × 3/8 in High Pressure"}]'::jsonb,
  'https://alkota.com/wp-content/uploads/2023/07/All_Electric_Hot_Water_Pressure_Washer_02_Alkota-1-1024x1024.png', ARRAY[]::text[], 'https://alkota.com/wp-content/uploads/2023/12/Tech_Data_Hot_Water_Pressure_Washer_All_Electric_Series_Alkota_12_23.pdf', 'https://alkota.com/wp-content/uploads/2023/12/Tech_Data_Hot_Water_Pressure_Washer_All_Electric_Series_Alkota_12_23.pdf',
  'Alkota 4208 All-Electric Hot Water Pressure Washer | 138 Bar | Alkota UK', 'Alkota 4208 all-electric industrial hot water pressure washer. 138 bar (2,000 PSI), 13.2 L/min, 60 kW electric heating for indoor food production and pharmaceutical plants.', 'https://alkota.co.uk/machines/hot-water/alkota-4208', false,
  'https://alkota.com/products/hot-water-pressure-washers/power-washer-industrial-hot-water-all-electric-series/', '2026-09-13', '{"source":"https://alkota.com/products/hot-water-pressure-washers/power-washer-industrial-hot-water-all-electric-series/","scraped_at":"2026-09-13T12:00:00.000Z","series_raw":"All Electric Series","specs_raw":{"Flow Rate":"3.5 gpm","Pressure":"2000 psi","Heat Rise":"90 ºF","Voltage":"240 to 460 v","Phase":"3","Amp Requirement":"70 / 140 amp","Motor Power":"5 hp","Water Heater":"Replaceable 6 to 10000 W|Stainless Steel Immersion Heater","Length":"34 in","Width":"24 in","Height":"37 in","Weight":"485 lbs"}}'::jsonb, 'new', false
)
ON CONFLICT (slug) DO UPDATE SET
  model_code = EXCLUDED.model_code,
  name = EXCLUDED.name,
  series = EXCLUDED.series,
  category = EXCLUDED.category,
  flow_rate_gpm = EXCLUDED.flow_rate_gpm,
  flow_rate_lpm = EXCLUDED.flow_rate_lpm,
  pressure_psi = EXCLUDED.pressure_psi,
  pressure_bar = EXCLUDED.pressure_bar,
  power_source = EXCLUDED.power_source,
  heating_fuel = EXCLUDED.heating_fuel,
  voltage = EXCLUDED.voltage,
  phase = EXCLUDED.phase,
  amp_requirement = EXCLUDED.amp_requirement,
  motor_hp = EXCLUDED.motor_hp,
  motor_kw = EXCLUDED.motor_kw,
  burner_btu = EXCLUDED.burner_btu,
  max_temp_c = EXCLUDED.max_temp_c,
  dimensions_mm = EXCLUDED.dimensions_mm,
  dimensions_inches = EXCLUDED.dimensions_inches,
  weight_kg = EXCLUDED.weight_kg,
  weight_lbs = EXCLUDED.weight_lbs,
  primary_image_url = EXCLUDED.primary_image_url,
  pdf_spec_url = EXCLUDED.pdf_spec_url,
  pdf_brochure_url = EXCLUDED.pdf_brochure_url,
  updated_at = now();

INSERT INTO products (
  slug, model_code, name, series, category, subcategory,
  status, active, featured, is_elite_series, sort_order,
  tagline, short_description, description, uk_description, engineering_story,
  flow_rate_gpm, flow_rate_lpm, pressure_psi, pressure_bar,
  power_source, heating_fuel, voltage, phase, amp_requirement, motor_hp, motor_kw,
  burner_btu, max_temp_c, portable, mobility, dimensions_mm, dimensions_inches,
  weight_kg, weight_lbs, pump_type, coil_type, warranty_years, coil_warranty_years,
  certifications, duty_application, applications, industries, features, options, extra_specs,
  primary_image_url, gallery_images, pdf_spec_url, pdf_brochure_url,
  meta_title, meta_description, canonical_url, no_index,
  source_url, source_last_checked, upstream_data, migration_status, needs_review
) VALUES (
  'alkota-4308', '4308', 'Alkota 4308', 'All Electric Series', 'hot-water', NULL,
  'published', true, true, false, 42,
  '4308 — All Electric Zero-Emission Hot Water Pressure Washer', 'Heavy-duty 207 bar all-electric hot water pressure washer engineered for maximum continuous indoor industrial degreasing with 60 kW immersion heat.', 'The Alkota 4308 All-Electric hot water pressure washer produces 207 bar (3000 PSI) at 13.2 L/min (3.5 GPM) using a powerful 7.5 hp industrial electric motor and 60 kW electric immersion heating system. Built to deliver severe-duty degreasing power inside facilities where fossil fuel combustion cannot be tolerated.', 'Alkota 4308 is an industrial 207 bar (3,000 PSI) all-electric hot water pressure washer engineered for UK heavy industrial processing facilities and indoor wash rooms. Delivering 13.2 L/min (3.5 GPM) with a 7.5 hp continuous-duty motor and 60 kW electric heating vessel, it eliminates heavy grease, road grime, and industrial residues with zero exhaust emissions.', 'Built for operators needing high-pressure hot water washing inside buildings without running expensive flue ducts or dealing with exhaust fumes. The 4308 features a Schedule 80 stainless steel immersion heating system, heavy gauge welded steel chassis, and industrial ceramic triplex pump.',
  3.5, 13.2, 3000, 207,
  'Electric Motor', 'All-Electric / Immersion', '240 to 460 v', 3, 75, 7.5, 5.59,
  205000, 93, false, 'Stationary Heavy-Duty Frame', '864 × 610 × 940 mm', '34" L × 24" W × 37" H',
  240, 530, 'Oil Bath Crankcase|Triplex Ceramic Plunger', 'Stainless Steel Immersion Pressure Vessel', 1, 5,
  ARRAY['ETL certified to UL-1776','CSA Certified']::text[], 'Continuous Industrial Indoor Duty (6–10 hrs/day)', ARRAY['Heavy Industrial Food Plant Washdown','Pharmaceutical Manufacturing Cleanrooms','Indoor Machinery Degreasing','Enclosed Wash Bays']::text[], ARRAY['manufacturing','food-processing','pharmaceutical','agriculture']::text[], ARRAY['Zero-emission 60 kW electric immersion heat','High-pressure 207 bar industrial ceramic plunger pump','Stainless steel float tank','Precision metered chemical injection','Automated thermostatic control']::text[], ARRAY['Wheel Kit for Mobility','Stainless Steel Outer Cabinet','Auto Start / Stop Control System','Remote Station Interface']::text[], '[{"label":"Heating Capacity","value":"60 kW (6x 10,000 W Immersion Elements)"},{"label":"Heat Rise","value":"50°C (90°F) rise"},{"label":"Voltage Options","value":"240V / 460V 3-Phase (400V 3PH 50Hz UK)"},{"label":"Amperage Draw","value":"75A @ 460V / 150A @ 240V"},{"label":"Hose Specifications","value":"50 ft × 3/8 in High Pressure"}]'::jsonb,
  'https://alkota.com/wp-content/uploads/2023/07/All_Electric_Hot_Water_Pressure_Washer_02_Alkota-1-1024x1024.png', ARRAY[]::text[], 'https://alkota.com/wp-content/uploads/2023/12/Tech_Data_Hot_Water_Pressure_Washer_All_Electric_Series_Alkota_12_23.pdf', 'https://alkota.com/wp-content/uploads/2023/12/Tech_Data_Hot_Water_Pressure_Washer_All_Electric_Series_Alkota_12_23.pdf',
  'Alkota 4308 All-Electric Hot Water Pressure Washer | 207 Bar | Alkota UK', 'Alkota 4308 heavy-duty all-electric hot water pressure washer. 207 bar (3,000 PSI), 13.2 L/min, 60 kW electric immersion heat for continuous industrial indoor degreasing.', 'https://alkota.co.uk/machines/hot-water/alkota-4308', false,
  'https://alkota.com/products/hot-water-pressure-washers/power-washer-industrial-hot-water-all-electric-series/', '2026-09-13', '{"source":"https://alkota.com/products/hot-water-pressure-washers/power-washer-industrial-hot-water-all-electric-series/","scraped_at":"2026-09-13T12:00:00.000Z","series_raw":"All Electric Series","specs_raw":{"Flow Rate":"3.5 gpm","Pressure":"3000 psi","Heat Rise":"90 ºF","Voltage":"240 to 460 v","Phase":"3","Amp Requirement":"75 / 150 amp","Motor Power":"7.5 hp","Water Heater":"Replaceable 6 to 10000 W|Stainless Steel Immersion Heater","Length":"34 in","Width":"24 in","Height":"37 in","Weight":"530 lbs"}}'::jsonb, 'new', false
)
ON CONFLICT (slug) DO UPDATE SET
  model_code = EXCLUDED.model_code,
  name = EXCLUDED.name,
  series = EXCLUDED.series,
  category = EXCLUDED.category,
  flow_rate_gpm = EXCLUDED.flow_rate_gpm,
  flow_rate_lpm = EXCLUDED.flow_rate_lpm,
  pressure_psi = EXCLUDED.pressure_psi,
  pressure_bar = EXCLUDED.pressure_bar,
  power_source = EXCLUDED.power_source,
  heating_fuel = EXCLUDED.heating_fuel,
  voltage = EXCLUDED.voltage,
  phase = EXCLUDED.phase,
  amp_requirement = EXCLUDED.amp_requirement,
  motor_hp = EXCLUDED.motor_hp,
  motor_kw = EXCLUDED.motor_kw,
  burner_btu = EXCLUDED.burner_btu,
  max_temp_c = EXCLUDED.max_temp_c,
  dimensions_mm = EXCLUDED.dimensions_mm,
  dimensions_inches = EXCLUDED.dimensions_inches,
  weight_kg = EXCLUDED.weight_kg,
  weight_lbs = EXCLUDED.weight_lbs,
  primary_image_url = EXCLUDED.primary_image_url,
  pdf_spec_url = EXCLUDED.pdf_spec_url,
  pdf_brochure_url = EXCLUDED.pdf_brochure_url,
  updated_at = now();

INSERT INTO products (
  slug, model_code, name, series, category, subcategory,
  status, active, featured, is_elite_series, sort_order,
  tagline, short_description, description, uk_description, engineering_story,
  flow_rate_gpm, flow_rate_lpm, pressure_psi, pressure_bar,
  power_source, heating_fuel, voltage, phase, amp_requirement, motor_hp, motor_kw,
  burner_btu, max_temp_c, portable, mobility, dimensions_mm, dimensions_inches,
  weight_kg, weight_lbs, pump_type, coil_type, warranty_years, coil_warranty_years,
  certifications, duty_application, applications, industries, features, options, extra_specs,
  primary_image_url, gallery_images, pdf_spec_url, pdf_brochure_url,
  meta_title, meta_description, canonical_url, no_index,
  source_url, source_last_checked, upstream_data, migration_status, needs_review
) VALUES (
  'alkota-5308', '5308', 'Alkota 5308', 'All Electric Series', 'hot-water', NULL,
  'published', true, false, false, 43,
  '5308 — All Electric Zero-Emission High-Volume Hot Water Pressure Washer', 'High-volume 18.2 L/min all-electric hot water pressure washer with 90 kW immersion heating capacity for intensive indoor industrial sanitisation.', 'The Alkota 5308 All-Electric hot water pressure washer is the flagship high-output zero-emission cleaning system. Powered by a 10.0 hp industrial motor and a massive 90 kW stainless steel immersion heating array, it delivers 18.2 L/min (4.8 GPM) at 207 bar (3000 PSI) of continuous high-temperature water with zero exhaust gases.', 'Alkota 5308 is a premier high-volume 18.2 L/min (4.8 GPM) all-electric hot water pressure washer engineered for heavy UK food manufacturing operations, pharmaceutical facilities, and indoor sanitisation suites. Delivering 207 bar (3,000 PSI) with a massive 90 kW electric immersion heating array, it handles severe grease and protein soils at high throughput with zero emissions.', 'The most powerful emission-free hot water pressure washer in the Alkota lineup. The 5308 incorporates 9 replaceable 10 kW immersion elements (90 kW total), a 10 hp heavy-duty industrial electric motor, and a high-flow ceramic triplex pump built for 24/7 industrial manufacturing shifts.',
  4.8, 18.2, 3000, 207,
  'Electric Motor', 'All-Electric / Immersion', '460 v', 3, 105, 10, 7.46,
  307000, 93, false, 'Stationary Heavy-Duty Frame', '864 × 610 × 940 mm', '34" L × 24" W × 37" H',
  240, 530, 'Oil Bath Crankcase|Triplex Ceramic Plunger', 'Stainless Steel Immersion Pressure Vessel', 1, 5,
  ARRAY['ETL certified to UL-1776','CSA Certified']::text[], 'Continuous Industrial Indoor Duty (6–10 hrs/day)', ARRAY['High-Volume Food Processing Sanitation','Pharmaceutical Manufacturing Cleanrooms','Indoor Industrial Production Washdown','Heavy Grease & Protein Removal']::text[], ARRAY['manufacturing','food-processing','pharmaceutical','agriculture']::text[], ARRAY['High-output 90 kW zero-emission immersion heat','Continuous-duty 10 hp industrial electric motor','Precision ceramic plunger triplex pump','Stainless steel float tank','Dual chemical injection ports']::text[], ARRAY['Wheel Kit for Mobility','Stainless Steel Outer Cabinet','Auto Start / Stop Control System','Remote Station Interface']::text[], '[{"label":"Heating Capacity","value":"90 kW (9x 10,000 W Immersion Elements)"},{"label":"Heat Rise","value":"58°C (105°F) rise"},{"label":"Voltage Options","value":"460V 3-Phase (400V 3PH 50Hz UK)"},{"label":"Amperage Draw","value":"105A @ 460V"},{"label":"Hose Specifications","value":"50 ft × 3/8 in High Pressure"}]'::jsonb,
  'https://alkota.com/wp-content/uploads/2023/07/All_Electric_Hot_Water_Pressure_Washer_02_Alkota-1-1024x1024.png', ARRAY[]::text[], 'https://alkota.com/wp-content/uploads/2023/12/Tech_Data_Hot_Water_Pressure_Washer_All_Electric_Series_Alkota_12_23.pdf', 'https://alkota.com/wp-content/uploads/2023/12/Tech_Data_Hot_Water_Pressure_Washer_All_Electric_Series_Alkota_12_23.pdf',
  'Alkota 5308 All-Electric High-Volume Hot Water Pressure Washer | 207 Bar | Alkota UK', 'Alkota 5308 high-volume all-electric hot water pressure washer. 207 bar (3,000 PSI), 18.2 L/min, 90 kW electric heating system for maximum continuous industrial indoor sanitation.', 'https://alkota.co.uk/machines/hot-water/alkota-5308', false,
  'https://alkota.com/products/hot-water-pressure-washers/power-washer-industrial-hot-water-all-electric-series/', '2026-09-13', '{"source":"https://alkota.com/products/hot-water-pressure-washers/power-washer-industrial-hot-water-all-electric-series/","scraped_at":"2026-09-13T12:00:00.000Z","series_raw":"All Electric Series","specs_raw":{"Flow Rate":"4.8 gpm","Pressure":"3000 psi","Heat Rise":"105 ºF","Voltage":"460 v","Phase":"3","Amp Requirement":"105 amp","Motor Power":"10 hp","Water Heater":"Replaceable 9 to 10000 W|Stainless Steel Immersion Heater","Length":"34 in","Width":"24 in","Height":"37 in","Weight":"530 lbs"}}'::jsonb, 'new', false
)
ON CONFLICT (slug) DO UPDATE SET
  model_code = EXCLUDED.model_code,
  name = EXCLUDED.name,
  series = EXCLUDED.series,
  category = EXCLUDED.category,
  flow_rate_gpm = EXCLUDED.flow_rate_gpm,
  flow_rate_lpm = EXCLUDED.flow_rate_lpm,
  pressure_psi = EXCLUDED.pressure_psi,
  pressure_bar = EXCLUDED.pressure_bar,
  power_source = EXCLUDED.power_source,
  heating_fuel = EXCLUDED.heating_fuel,
  voltage = EXCLUDED.voltage,
  phase = EXCLUDED.phase,
  amp_requirement = EXCLUDED.amp_requirement,
  motor_hp = EXCLUDED.motor_hp,
  motor_kw = EXCLUDED.motor_kw,
  burner_btu = EXCLUDED.burner_btu,
  max_temp_c = EXCLUDED.max_temp_c,
  dimensions_mm = EXCLUDED.dimensions_mm,
  dimensions_inches = EXCLUDED.dimensions_inches,
  weight_kg = EXCLUDED.weight_kg,
  weight_lbs = EXCLUDED.weight_lbs,
  primary_image_url = EXCLUDED.primary_image_url,
  pdf_spec_url = EXCLUDED.pdf_spec_url,
  pdf_brochure_url = EXCLUDED.pdf_brochure_url,
  updated_at = now();

