-- Migration 030: Phase 8.4 Source Reconciliation Cleanup & Specification Normalisation
-- Idempotent updates for motor horsepower, phase corrections, and character entity sanitation.

DO $$
BEGIN
  -- 1. Phase corrections for 3-phase 230/3 Aqueous Parts Washers
  UPDATE products
  SET phase = 3
  WHERE model_code IN ('412', '612', '812A', '812B', '812C')
    AND (phase IS DISTINCT FROM 3);

  -- 2. 530B Phase and Voltage verification
  UPDATE products
  SET phase = 3,
      voltage = '230 v'
  WHERE model_code = '530B'
    AND (phase IS DISTINCT FROM 3 OR voltage IS DISTINCT FROM '230 v');

  -- 3. Motor Horsepower and kW population from manufacturer specifications
  UPDATE products SET motor_hp = 2.3, motor_kw = 1.7 WHERE model_code IN ('216BD', '311BD', '210J') AND motor_hp IS NULL;
  UPDATE products SET motor_hp = 5.0, motor_kw = 3.7 WHERE model_code IN ('420BD', '420S', '420B') AND motor_hp IS NULL;
  UPDATE products SET motor_hp = 8.0, motor_kw = 6.0 WHERE model_code IN ('430BD', '430B') AND motor_hp IS NULL;
  UPDATE products SET motor_hp = 10.0, motor_kw = 7.5 WHERE model_code IN ('530BD', '530S', '530B', 'HHS440', 'HHS530', 'HHS720', 'HHS1015', '25500') AND motor_hp IS NULL;
  UPDATE products SET motor_hp = 15.0, motor_kw = 11.2 WHERE model_code IN ('25750', '2110') AND motor_hp IS NULL;
  UPDATE products SET motor_hp = 20.0, motor_kw = 14.9 WHERE model_code IN ('25755-GAS-ENGINE', '835B', '1030B') AND motor_hp IS NULL;
  UPDATE products SET motor_hp = 1.0, motor_kw = 0.7 WHERE model_code = '246EN' AND motor_hp IS NULL;
  UPDATE products SET motor_hp = 0.75, motor_kw = 0.6 WHERE model_code IN ('126', 'CSF-5', 'CSF-10') AND motor_hp IS NULL;

  -- 4. Clean HTML entities and non-breaking spaces in text columns
  UPDATE products
  SET tagline = REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(tagline, '&nbsp;', ' '), chr(160), ' '), '&amp;', '&'), '&#8211;', '–'), '&#8217;', '''')
  WHERE tagline LIKE '%&nbsp;%' OR tagline LIKE '%' || chr(160) || '%' OR tagline LIKE '%&amp;%' OR tagline LIKE '%&#8211;%' OR tagline LIKE '%&#8217;%';

  UPDATE products
  SET short_description = REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(short_description, '&nbsp;', ' '), chr(160), ' '), '&amp;', '&'), '&#8211;', '–'), '&#8217;', '''')
  WHERE short_description LIKE '%&nbsp;%' OR short_description LIKE '%' || chr(160) || '%' OR short_description LIKE '%&amp;%' OR short_description LIKE '%&#8211;%' OR short_description LIKE '%&#8217;%';

  UPDATE products
  SET description = REPLACE(REPLACE(REPLACE(REPLACE(REPLACE(description, '&nbsp;', ' '), chr(160), ' '), '&amp;', '&'), '&#8211;', '–'), '&#8217;', '''')
  WHERE description LIKE '%&nbsp;%' OR description LIKE '%' || chr(160) || '%' OR description LIKE '%&amp;%' OR description LIKE '%&#8211;%' OR description LIKE '%&#8217;%';

END $$;
