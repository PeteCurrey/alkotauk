# Alkota UK — Product Catalogue Import & Ingestion Audit

**Generated:** 2026-08-28T20:22:33.148Z  
**Ingestion Engine:** Alkota UK Ingestion Engine v2.0  
**Authoritative Upstream Source:** Alkota USA (alkota.com)  
**Total Upstream Series Crawled:** 35  
**Total Canonical Machines Normalised:** 127  
**Database Records Processed:** 0 successful, 127 errors  

---

## Executive Summary

Alkota UK has established an automated, idempotent ingestion pipeline that parses specifications, model variants, high-resolution cutouts, PDF technical brochures, and engineering metadata directly from Alkota USA.

All machines have been normalised into British units (**bar**, **L/min**, **kg**, **mm**, **°C**) while preserving original source values. Upstream data is strictly separated from UK editorial content, guaranteeing that future catalogue synchronisations will not overwrite UK SEO descriptions or local market customisations.

---

## Imported Machine Inventory

| Model | Series | Category | Flow (L/min) | Pressure (Bar) | Power | PDF Spec | Status |
|---|---|---|---|---|---|---|---|
| **216AX4** | Belt Driven Power Washers with Triplex Pump | `hot-water` | 7.6 L/min | 110 bar | 115 v | [PDF](https://alkota.com/wp-content/uploads/2023/12/Tech_Data_Hot_Water_Pressure_Washer_AX4_Belt_Drive_Series_Alkota_12_23.pdf) | ✅ published |
| **311AX4** | Belt Driven Power Washers with Triplex Pump | `hot-water` | 11.4 L/min | 76 bar | 115 v | [PDF](https://alkota.com/wp-content/uploads/2023/12/Tech_Data_Hot_Water_Pressure_Washer_AX4_Belt_Drive_Series_Alkota_12_23.pdf) | ✅ published |
| **320AX4** | Belt Driven Power Washers with Triplex Pump | `hot-water` | 11.4 L/min | 138 bar | 230 v | [PDF](https://alkota.com/wp-content/uploads/2023/12/Tech_Data_Hot_Water_Pressure_Washer_AX4_Belt_Drive_Series_Alkota_12_23.pdf) | ✅ published |
| **324AX4** | Belt Driven Power Washers with Triplex Pump | `hot-water` | 11.4 L/min | 165 bar | 230 v | [PDF](https://alkota.com/wp-content/uploads/2023/12/Tech_Data_Hot_Water_Pressure_Washer_AX4_Belt_Drive_Series_Alkota_12_23.pdf) | ✅ published |
| **420X4** | Electric Driven Oil Fired Hot Water Pressure Washer | `hot-water` | 13.2 L/min | 138 bar | 230 v | [PDF](https://alkota.com/wp-content/uploads/2023/12/Tech_Data_Hot_Water_Pressure_Washer_X4_Belt_Drive_Series_Alkota_12_23.pdf) | ✅ published |
| **216X4** | Electric Driven Oil Fired Hot Water Pressure Washer | `hot-water` | 7.6 L/min | 110 bar | 115 v | [PDF](https://alkota.com/wp-content/uploads/2023/12/Tech_Data_Hot_Water_Pressure_Washer_X4_Belt_Drive_Series_Alkota_12_23.pdf) | ✅ published |
| **320X4** | Electric Driven Oil Fired Hot Water Pressure Washer | `hot-water` | 11.4 L/min | 138 bar | 230 v | [PDF](https://alkota.com/wp-content/uploads/2023/12/Tech_Data_Hot_Water_Pressure_Washer_X4_Belt_Drive_Series_Alkota_12_23.pdf) | ✅ published |
| **430XM4** | Electric Driven Oil Fired Hot Water Pressure Washer | `hot-water` | 13.6 L/min | 207 bar | 230 v | [PDF](https://alkota.com/wp-content/uploads/2023/12/Tech_Data_Hot_Water_Pressure_Washer_X4_Belt_Drive_Series_Alkota_12_23.pdf) | ✅ published |
| **523X4** | Electric Driven Oil Fired Hot Water Pressure Washer | `hot-water` | 18.2 L/min | 159 bar | 230 v | [PDF](https://alkota.com/wp-content/uploads/2023/12/Tech_Data_Hot_Water_Pressure_Washer_X4_Belt_Drive_Series_Alkota_12_23.pdf) | ✅ published |
| **4405XD4** | Gasoline Driven Oil Fired Hot Water Pressure Washer | `hot-water` | 15.1 L/min | 276 bar | 230V / 1PH | [PDF](https://alkota.com/wp-content/uploads/2024/03/Tech_Data_Hot_Water_Pressure_Washer_XD4__Direct_Drive_Series_Alkota_03_24.pdf) | ✅ published |
| **3305XD4** | Gasoline Driven Oil Fired Hot Water Pressure Washer | `hot-water` | 11.4 L/min | 207 bar | 230V / 1PH | [PDF](https://alkota.com/wp-content/uploads/2024/03/Tech_Data_Hot_Water_Pressure_Washer_XD4__Direct_Drive_Series_Alkota_03_24.pdf) | ✅ published |
| **4301** | LP and Natural Gas Hot Water Pressure Washers | `hot-water` | 15.1 L/min | 207 bar | 230 v | [PDF](https://alkota.com/wp-content/uploads/2024/05/Gas-Fired-Series_5_25.pdf) | ✅ published |
| **4201** | LP and Natural Gas Hot Water Pressure Washers | `hot-water` | 13.6 L/min | 138 bar | 230 v | [PDF](https://alkota.com/wp-content/uploads/2024/05/Gas-Fired-Series_5_25.pdf) | ✅ published |
| **5301** | LP and Natural Gas Hot Water Pressure Washers | `hot-water` | 18.9 L/min | 207 bar | 230 v | [PDF](https://alkota.com/wp-content/uploads/2024/05/Gas-Fired-Series_5_25.pdf) | ✅ published |
| **8351** | LP and Natural Gas Hot Water Pressure Washers | `hot-water` | 30.3 L/min | 241 bar | 230 v | [PDF](https://alkota.com/wp-content/uploads/2024/05/Gas-Fired-Series_5_25.pdf) | ✅ published |
| **10301** | LP and Natural Gas Hot Water Pressure Washers | `hot-water` | 37.9 L/min | 207 bar | 230 v | [PDF](https://alkota.com/wp-content/uploads/2024/05/Gas-Fired-Series_5_25.pdf) | ✅ published |
| **216X4PT** | Hot Water Pressure Washer Gas Fired X4 Portable | `hot-water` | 7.6 L/min | 110 bar | 115 v | [PDF](https://alkota.com/wp-content/uploads/2023/12/Tech_Data_Hot_Water_Pressure_Washer_Gas_Fired_X4_Series_Alkota_12_23.pdf) | ✅ published |
| **311X4PT** | Hot Water Pressure Washer Gas Fired X4 Portable | `hot-water` | 11.4 L/min | 76 bar | 115 v | [PDF](https://alkota.com/wp-content/uploads/2023/12/Tech_Data_Hot_Water_Pressure_Washer_Gas_Fired_X4_Series_Alkota_12_23.pdf) | ✅ published |
| **320X4PT** | Hot Water Pressure Washer Gas Fired X4 Portable | `hot-water` | 11.4 L/min | 138 bar | 230 v | [PDF](https://alkota.com/wp-content/uploads/2023/12/Tech_Data_Hot_Water_Pressure_Washer_Gas_Fired_X4_Series_Alkota_12_23.pdf) | ✅ published |
| **324X4PT** | Hot Water Pressure Washer Gas Fired X4 Portable | `hot-water` | 11.4 L/min | 165 bar | 230 v | [PDF](https://alkota.com/wp-content/uploads/2023/12/Tech_Data_Hot_Water_Pressure_Washer_Gas_Fired_X4_Series_Alkota_12_23.pdf) | ✅ published |
| **5357C** | Diesel Hot Water Pressure Washers - Skid Mounted | `hot-water` | 18.9 L/min | 241 bar | 230V / 1PH | [PDF](https://alkota.com/wp-content/uploads/2023/12/Tech_Data_Hot_Water_Pressure_Washer_DED_Diesel_Series_Alkota_12_23.pdf) | ✅ published |
| **5357KZ** | Diesel Hot Water Pressure Washers - Skid Mounted | `hot-water` | 18.9 L/min | 241 bar | 230V / 1PH | [PDF](https://alkota.com/wp-content/uploads/2023/12/Tech_Data_Hot_Water_Pressure_Washer_DED_Diesel_Series_Alkota_12_23.pdf) | ✅ published |
| **5357** | Diesel Hot Water Pressure Washers - Skid Mounted | `hot-water` | 18.9 L/min | 241 bar | 230V / 1PH | [PDF](https://alkota.com/wp-content/uploads/2023/12/Tech_Data_Hot_Water_Pressure_Washer_DED_Diesel_Series_Alkota_12_23.pdf) | ✅ published |
| **5407** | Diesel Hot Water Pressure Washers - Skid Mounted | `hot-water` | 18.9 L/min | 276 bar | 230V / 1PH | [PDF](https://alkota.com/wp-content/uploads/2023/12/Tech_Data_Hot_Water_Pressure_Washer_DED_Diesel_Series_Alkota_12_23.pdf) | ✅ published |
| **8307K** | Industrial Diesel Steam Heated Pressure Washers | `hot-water` | 30.3 L/min | 207 bar | 230V / 1PH | [PDF](https://alkota.com/wp-content/uploads/2023/12/Tech_Data_Hot_Water_Pressure_Washer_DED_Big_Boy_Series_Alkota_12_23.pdf) | ✅ published |
| **5357K** | Industrial Diesel Steam Heated Pressure Washers | `hot-water` | 18.9 L/min | 241 bar | 230V / 1PH | [PDF](https://alkota.com/wp-content/uploads/2023/12/Tech_Data_Hot_Water_Pressure_Washer_DED_Big_Boy_Series_Alkota_12_23.pdf) | ✅ published |
| **5507K** | Industrial Diesel Steam Heated Pressure Washers | `hot-water` | 18.9 L/min | 345 bar | 230V / 1PH | [PDF](https://alkota.com/wp-content/uploads/2023/12/Tech_Data_Hot_Water_Pressure_Washer_DED_Big_Boy_Series_Alkota_12_23.pdf) | ✅ published |
| **10307KKA** | Industrial Diesel Steam Heated Pressure Washers | `hot-water` | 37.9 L/min | 207 bar | 230V / 1PH | [PDF](https://alkota.com/wp-content/uploads/2023/12/Tech_Data_Hot_Water_Pressure_Washer_DED_Big_Boy_Series_Alkota_12_23.pdf) | ✅ published |
| **5355JB** | Gas Engine Hot Water Pressure Washer - 115 Volt Skid | `hot-water` | 18.9 L/min | 241 bar | 230V / 1PH | [PDF](https://alkota.com/wp-content/uploads/2023/12/Tech_Data_Hot_Water_Pressure_Washer_GED_115V_Skid_Series_Alkota_12_23.pdf) | ✅ published |
| **5305EAB** | Gas Engine Hot Water Pressure Washer - 115 Volt Skid | `hot-water` | 18.9 L/min | 241 bar | 230V / 1PH | [PDF](https://alkota.com/wp-content/uploads/2023/12/Tech_Data_Hot_Water_Pressure_Washer_GED_115V_Skid_Series_Alkota_12_23.pdf) | ✅ published |
| **8305H** | Gas Engine Hot Water Pressure Washer - 115 Volt Skid | `hot-water` | 30.3 L/min | 241 bar | 230V / 1PH | [PDF](https://alkota.com/wp-content/uploads/2023/12/Tech_Data_Hot_Water_Pressure_Washer_GED_115V_Skid_Series_Alkota_12_23.pdf) | ✅ published |
| **5355J** | Industrial Series | `hot-water` | 18.9 L/min | 241 bar | 230V / 1PH | [PDF](https://alkota.com/wp-content/uploads/2023/12/Tech_Data_Hot_Water_Pressure_Washer_GED_12V_Skid_Series_Alkota_12_23.pdf) | ✅ published |
| **5355EAD** | Industrial Series | `hot-water` | 18.9 L/min | 241 bar | 230V / 1PH | [PDF](https://alkota.com/wp-content/uploads/2023/12/Tech_Data_Hot_Water_Pressure_Washer_GED_12V_Skid_Series_Alkota_12_23.pdf) | ✅ published |
| **5505J** | Industrial Series | `hot-water` | 17 L/min | 345 bar | 230V / 1PH | [PDF](https://alkota.com/wp-content/uploads/2023/12/Tech_Data_Hot_Water_Pressure_Washer_GED_12V_Skid_Series_Alkota_12_23.pdf) | ✅ published |
| **5355ENS** | Compact Hot Water Pressure Washers | `hot-water` | 18.9 L/min | 241 bar | 230V / 1PH | [PDF](https://alkota.com/wp-content/uploads/2023/12/Tech_Data_Hot_Water_Pressure_Washer_EN_HN_Series_Alkota_12_23.pdf) | ✅ published |
| **5355ENL** | Compact Hot Water Pressure Washers | `hot-water` | 18.9 L/min | 241 bar | 230V / 1PH | [PDF](https://alkota.com/wp-content/uploads/2023/12/Tech_Data_Hot_Water_Pressure_Washer_EN_HN_Series_Alkota_12_23.pdf) | ✅ published |
| **5355HNS** | Compact Hot Water Pressure Washers | `hot-water` | 18.9 L/min | 241 bar | 230V / 1PH | [PDF](https://alkota.com/wp-content/uploads/2023/12/Tech_Data_Hot_Water_Pressure_Washer_EN_HN_Series_Alkota_12_23.pdf) | ✅ published |
| **8405HNL** | Compact Hot Water Pressure Washers | `hot-water` | 30.3 L/min | 276 bar | 230V / 1PH | [PDF](https://alkota.com/wp-content/uploads/2023/12/Tech_Data_Hot_Water_Pressure_Washer_EN_HN_Series_Alkota_12_23.pdf) | ✅ published |
| **4301-NG/LP** | Industrial Hot Water Pressure Washers Made in America. | `hot-water` | 15.1 L/min | 207 bar | 230V / 1PH | [PDF](https://alkota.com/wp-content/uploads/2026/02/ELITE_4301-2026.pdf) | ✅ published |
| **219CSE** | 219CSE Electric Pressure Washer | `cold-water` | — | — | 120 | [PDF](https://alkota.com/wp-content/uploads/2023/12/Tech_Data_Cold_Water_Pressure_Washer_219_CSE_Electric_Alkota_12_23.pdf.pdf) | ✅ published |
| **216BD** | Industrial Cold Water High Pressure Washer | `cold-water` | 7.6 L/min | 110 bar | 115V, 1 PH, 20 Amp | [PDF](https://alkota.com/wp-content/uploads/2023/08/ALK-BDI-1221-BD-INDUSTRIAL-SERIES.pdf) | ✅ published |
| **311BD** | Industrial Cold Water High Pressure Washer | `cold-water` | 11.4 L/min | 76 bar | 115V, 1 PH, 20 Amp | [PDF](https://alkota.com/wp-content/uploads/2023/08/ALK-BDI-1221-BD-INDUSTRIAL-SERIES.pdf) | ✅ published |
| **420BD** | Industrial Cold Water High Pressure Washer | `cold-water` | 15.1 L/min | 138 bar | 230V, 1 PH, 22 Amp | [PDF](https://alkota.com/wp-content/uploads/2023/08/ALK-BDI-1221-BD-INDUSTRIAL-SERIES.pdf) | ✅ published |
| **430BD** | Industrial Cold Water High Pressure Washer | `cold-water` | 15.1 L/min | 207 bar | 230V, 1 PH, 24 Amp | [PDF](https://alkota.com/wp-content/uploads/2023/08/ALK-BDI-1221-BD-INDUSTRIAL-SERIES.pdf) | ✅ published |
| **530BD** | Industrial Cold Water High Pressure Washer | `cold-water` | 18.9 L/min | 207 bar | 230V, 3 PH, 25 Amp | [PDF](https://alkota.com/wp-content/uploads/2023/08/ALK-BDI-1221-BD-INDUSTRIAL-SERIES.pdf) | ✅ published |
| **420S** | Cold Water Electric Power Washer | `cold-water` | 14 L/min | 138 bar | 230 v | [PDF](https://alkota.com/wp-content/uploads/2023/12/Tech_Data_Cold_Water_Pressure_Washer_S_SH_Series_Electric_Alkota_12_23.pdf) | ✅ published |
| **530S** | Cold Water Electric Power Washer | `cold-water` | 18.9 L/min | 207 bar | 230 v | [PDF](https://alkota.com/wp-content/uploads/2023/12/Tech_Data_Cold_Water_Pressure_Washer_S_SH_Series_Electric_Alkota_12_23.pdf) | ✅ published |
| **HHS440** | Cold Water Pressure Washer for Farms | `cold-water` | 15.1 L/min | 276 bar | 230 v | [PDF](https://alkota.com/wp-content/uploads/2023/07/Tech_Data_Hog_Barn_Pressure_Washer_Alkota.pdf) | ✅ published |
| **HHS530** | Cold Water Pressure Washer for Farms | `cold-water` | 18.9 L/min | 207 bar | 230 v | [PDF](https://alkota.com/wp-content/uploads/2023/07/Tech_Data_Hog_Barn_Pressure_Washer_Alkota.pdf) | ✅ published |
| **HHS720** | Cold Water Pressure Washer for Farms | `cold-water` | 26.5 L/min | 138 bar | 230 v | [PDF](https://alkota.com/wp-content/uploads/2023/07/Tech_Data_Hog_Barn_Pressure_Washer_Alkota.pdf) | ✅ published |
| **HHS1015** | Cold Water Pressure Washer for Farms | `cold-water` | 37.9 L/min | 103 bar | 230 v | [PDF](https://alkota.com/wp-content/uploads/2023/07/Tech_Data_Hog_Barn_Pressure_Washer_Alkota.pdf) | ✅ published |
| **420B** | Wash Bay Cabinet Cold Water Pressure Washer | `cold-water` | 13.6 L/min | 138 bar | 230 v | [PDF](https://alkota.com/wp-content/uploads/2023/12/Tech_Data_Cold_Water_Pressure_Washer_Wash_Bay_Series_Alkota_12_23.pdf) | ✅ published |
| **430B** | Wash Bay Cabinet Cold Water Pressure Washer | `cold-water` | 14.4 L/min | 207 bar | 230 v | [PDF](https://alkota.com/wp-content/uploads/2023/12/Tech_Data_Cold_Water_Pressure_Washer_Wash_Bay_Series_Alkota_12_23.pdf) | ✅ published |
| **530B** | Wash Bay Cabinet Cold Water Pressure Washer | `cold-water` | 18.9 L/min | 207 bar | 230 v | [PDF](https://alkota.com/wp-content/uploads/2023/12/Tech_Data_Cold_Water_Pressure_Washer_Wash_Bay_Series_Alkota_12_23.pdf) | ✅ published |
| **835B** | Wash Bay Cabinet Cold Water Pressure Washer | `cold-water` | 30.3 L/min | 241 bar | 230 / 460 v | [PDF](https://alkota.com/wp-content/uploads/2023/12/Tech_Data_Cold_Water_Pressure_Washer_Wash_Bay_Series_Alkota_12_23.pdf) | ✅ published |
| **1030B** | Wash Bay Cabinet Cold Water Pressure Washer | `cold-water` | 37.9 L/min | 207 bar | 230 / 460 v | [PDF](https://alkota.com/wp-content/uploads/2023/12/Tech_Data_Cold_Water_Pressure_Washer_Wash_Bay_Series_Alkota_12_23.pdf) | ✅ published |
| **25500** | High Volume Pressure Washers | `cold-water` | 94.6 L/min | 34 bar | 230 v | [PDF](https://alkota.com/wp-content/uploads/2023/12/Tech_Data_Cold_Water_Pressure_Washer_Wash_Cannon_Alkota_12_23.pdf) | ✅ published |
| **25750** | High Volume Pressure Washers | `cold-water` | 94.6 L/min | 48 bar | 230 v | [PDF](https://alkota.com/wp-content/uploads/2023/12/Tech_Data_Cold_Water_Pressure_Washer_Wash_Cannon_Alkota_12_23.pdf) | ✅ published |
| **25755-GAS-ENGINE** | High Volume Pressure Washers | `cold-water` | 94.6 L/min | 48 bar | 230V / 1PH | [PDF](https://alkota.com/wp-content/uploads/2023/12/Tech_Data_Cold_Water_Pressure_Washer_Wash_Cannon_Alkota_12_23.pdf) | ✅ published |
| **2110** | High Volume Pressure Washers | `cold-water` | 79.5 L/min | 69 bar | 230 v | [PDF](https://alkota.com/wp-content/uploads/2023/12/Tech_Data_Cold_Water_Pressure_Washer_Wash_Cannon_Alkota_12_23.pdf) | ✅ published |
| **210J** | Electric &amp; Gasoline Jetter Drain Cleaner | `cold-water` | 7.6 L/min | 103 bar | 230V / 1PH | [PDF](https://alkota.com/wp-content/uploads/2023/12/Tech_Data_Cold_Water_Pressure_Washer_Jetter_Series_Alkota_12_23.pdf) | ✅ published |
| **440J** | Electric &amp; Gasoline Jetter Drain Cleaner | `cold-water` | 15.1 L/min | 276 bar | 230V / 1PH | [PDF](https://alkota.com/wp-content/uploads/2023/12/Tech_Data_Cold_Water_Pressure_Washer_Jetter_Series_Alkota_12_23.pdf) | ✅ published |
| **840J** | Electric &amp; Gasoline Jetter Drain Cleaner | `cold-water` | 30.3 L/min | 276 bar | 230V / 1PH | [PDF](https://alkota.com/wp-content/uploads/2023/12/Tech_Data_Cold_Water_Pressure_Washer_Jetter_Series_Alkota_12_23.pdf) | ✅ published |
| **325CSH** | Aluminum Frame Cold Water Power Washers | `cold-water` | 11.4 L/min | 172 bar | 230V / 1PH | [PDF](https://alkota.com/wp-content/uploads/2023/12/Tech_Data_Cold_Water_Pressure_Washer_Challenger_Series_Alkota_12_23.pdf) | ✅ published |
| **216CSE** | Aluminum Frame Cold Water Power Washers | `cold-water` | 7.6 L/min | 110 bar | 230V / 1PH | [PDF](https://alkota.com/wp-content/uploads/2023/12/Tech_Data_Cold_Water_Pressure_Washer_Challenger_Series_Alkota_12_23.pdf) | ✅ published |
| **320CSE** | Aluminum Frame Cold Water Power Washers | `cold-water` | 11.4 L/min | 138 bar | 230V / 1PH | [PDF](https://alkota.com/wp-content/uploads/2023/12/Tech_Data_Cold_Water_Pressure_Washer_Challenger_Series_Alkota_12_23.pdf) | ✅ published |
| **845S** | Gas &amp; Diesel Cold Water Pressure Washers | `cold-water` | 30.3 L/min | 276 bar | 230V / 1PH | [PDF](https://alkota.com/wp-content/uploads/2023/12/Tech_Data_Cold_Water_Pressure_Washer_SM_Gasoline_Series_Alkota_12_23.pdf) | ✅ published |
| **4355** | Gas &amp; Diesel Cold Water Pressure Washers | `cold-water` | 15.1 L/min | 21 bar | 230V / 1PH | [PDF](https://alkota.com/wp-content/uploads/2023/12/Tech_Data_Cold_Water_Pressure_Washer_SG_Gasoline_Series_Alkota_12_23.pdf) | ✅ published |
| **537S** | Gas &amp; Diesel Cold Water Pressure Washers | `cold-water` | 18.9 L/min | 241 bar | 230V / 1PH | [PDF](https://alkota.com/wp-content/uploads/2024/09/Tech_Data_Cold_Water_Pressure_Washer_SG_Diesel_Series_Alkota_4_24.pdf) | ✅ published |
| **555M** | Gas &amp; Diesel Cold Water Pressure Washers | `cold-water` | 18.9 L/min | 345 bar | 230V / 1PH | [PDF](https://alkota.com/wp-content/uploads/2023/12/Tech_Data_Cold_Water_Pressure_Washer_M_Gasoline_Series_Alkota_12_23.pdf) | ✅ published |
| **246EN** | Industrial Portable Dry Stream Generators | `steam` | 3.8 L/min | 7 bar | 115 v | [PDF](https://alkota.com/wp-content/uploads/2025/09/246EN-Rev.B.pdf) | ✅ published |
| **126** | Industrial Portable Dry Stream Generators | `steam` | 3.8 L/min | 7 bar | 115 v | [PDF](https://alkota.com/wp-content/uploads/2023/07/Tech_Data_Industrial_Dry_Vapor_Steam_Alkota.pdf) | ✅ published |
| **181** | LP / NG Gas Fired Steam Cleaners | `steam` | — | — | 115 v | [PDF](https://alkota.com/wp-content/uploads/2023/12/Tech_Data_Steam_Cleaners_LP_NG_Gas_Fired_Steam_Cleaners_Alkota_12_23.pdf) | ✅ published |
| **241** | LP / NG Gas Fired Steam Cleaners | `steam` | — | — | 115 v | [PDF](https://alkota.com/wp-content/uploads/2023/12/Tech_Data_Steam_Cleaners_LP_NG_Gas_Fired_Steam_Cleaners_Alkota_12_23.pdf) | ✅ published |
| **301** | LP / NG Gas Fired Steam Cleaners | `steam` | — | — | 230 v | [PDF](https://alkota.com/wp-content/uploads/2023/12/Tech_Data_Steam_Cleaners_LP_NG_Gas_Fired_Steam_Cleaners_Alkota_12_23.pdf) | ✅ published |
| **401** | LP / NG Gas Fired Steam Cleaners | `steam` | — | — | 230 v | [PDF](https://alkota.com/wp-content/uploads/2023/12/Tech_Data_Steam_Cleaners_LP_NG_Gas_Fired_Steam_Cleaners_Alkota_12_23.pdf) | ✅ published |
| **122** | Oil Fired Steam Cleaners for Grease | `steam` | — | — | 115 v | [PDF](https://alkota.com/wp-content/uploads/2023/12/Tech_Data_Steam_Cleaners_Steam_Cleaner_Series_Portable_Alkota_12_23.pdf) | ✅ published |
| **240** | Oil Fired Steam Cleaners for Grease | `steam` | — | — | 115 v | [PDF](https://alkota.com/wp-content/uploads/2023/12/Tech_Data_Steam_Cleaners_Steam_Cleaner_Series_Portable_Alkota_12_23.pdf) | ✅ published |
| **122X4** | Oil Fired Steam Cleaners for Grease | `steam` | — | — | 115 v | [PDF](https://alkota.com/wp-content/uploads/2023/12/Tech_Data_Steam_Cleaners_Steam_Cleaner_Series_Portable_Alkota_12_23.pdf) | ✅ published |
| **240EN** | Oil Fired Steam Cleaners for Grease | `steam` | — | — | 115 v | [PDF](https://alkota.com/wp-content/uploads/2023/12/Tech_Data_Steam_Cleaners_Steam_Cleaner_Series_Portable_Alkota_12_23.pdf) | ✅ published |
| **INDUSTRIAL-HEATERS** | Diesel/Kerosene Industrial Forced Air Space Heaters | `space-heater` | — | — | 230V / 1PH | [PDF](https://alkota.com/wp-content/uploads/2024/05/SPACE-HEATER-SERIES-1.pdf) | ✅ published |
| **210WH** | Industrial Horizontal Hot Water Heaters | `water-heater` | — | — | 230V / 1PH | [PDF](https://alkota.com/wp-content/uploads/2023/12/Tech_Data_Horizontal_Water_Heaters_Series_Alkota_12_23.pdf) | ✅ published |
| **410H** | Industrial Horizontal Hot Water Heaters | `water-heater` | — | — | 230V / 1PH | [PDF](https://alkota.com/wp-content/uploads/2023/12/Tech_Data_Horizontal_Water_Heaters_Series_Alkota_12_23.pdf) | ✅ published |
| **510H** | Industrial Horizontal Hot Water Heaters | `water-heater` | — | — | 230V / 1PH | [PDF](https://alkota.com/wp-content/uploads/2023/12/Tech_Data_Horizontal_Water_Heaters_Series_Alkota_12_23.pdf) | ✅ published |
| **760H** | Industrial Horizontal Hot Water Heaters | `water-heater` | — | — | 230V / 1PH | [PDF](https://alkota.com/wp-content/uploads/2023/12/Tech_Data_Horizontal_Water_Heaters_Series_Alkota_12_23.pdf) | ✅ published |
| **511** | Gas Fired Stationary Continuous Water Heaters | `water-heater` | — | — | 230V / 1PH | [PDF](https://alkota.com/wp-content/uploads/2024/05/STATIONARY-GAS-FIRED-WATER-HEATERS_6_5_25.pdf) | ✅ published |
| **411** | Gas Fired Stationary Continuous Water Heaters | `water-heater` | — | — | 230V / 1PH | [PDF](https://alkota.com/wp-content/uploads/2024/05/STATIONARY-GAS-FIRED-WATER-HEATERS_6_5_25.pdf) | ✅ published |
| **761** | Gas Fired Stationary Continuous Water Heaters | `water-heater` | — | — | 230V / 1PH | [PDF](https://alkota.com/wp-content/uploads/2024/05/STATIONARY-GAS-FIRED-WATER-HEATERS_6_5_25.pdf) | ✅ published |
| **1011-NG** | Gas Fired Stationary Continuous Water Heaters | `water-heater` | — | — | 230V / 1PH | [PDF](https://alkota.com/wp-content/uploads/2024/05/STATIONARY-GAS-FIRED-WATER-HEATERS_6_5_25.pdf) | ✅ published |
| **1011-LP** | Gas Fired Stationary Continuous Water Heaters | `water-heater` | — | — | 230V / 1PH | [PDF](https://alkota.com/wp-content/uploads/2024/05/STATIONARY-GAS-FIRED-WATER-HEATERS_6_5_25.pdf) | ✅ published |
| **510** | Water Heaters - Stationary Oil Fired UL Certified | `water-heater` | — | — | 230V / 1PH | [PDF](https://alkota.com/wp-content/uploads/2026/02/OIL_FIRED_WATER_HEATER_STATIONART_12_2025.pdf.pdf) | ✅ published |
| **410** | Water Heaters - Stationary Oil Fired UL Certified | `water-heater` | — | — | 230V / 1PH | [PDF](https://alkota.com/wp-content/uploads/2025/06/STATIONARY-OIL-FIRED-WATER-HEATERS_6_3_25.pdf) | ✅ published |
| **760** | Water Heaters - Stationary Oil Fired UL Certified | `water-heater` | — | — | 230V / 1PH | [PDF](https://alkota.com/wp-content/uploads/2025/06/STATIONARY-OIL-FIRED-WATER-HEATERS_6_3_25.pdf) | ✅ published |
| **1010** | Water Heaters - Stationary Oil Fired UL Certified | `water-heater` | — | — | 230V / 1PH | [PDF](https://alkota.com/wp-content/uploads/2025/06/STATIONARY-OIL-FIRED-WATER-HEATERS_6_3_25.pdf) | ✅ published |
| **1060** | Water Heaters - Stationary Oil Fired UL Certified | `water-heater` | — | — | 230V / 1PH | [PDF](https://alkota.com/wp-content/uploads/2025/06/STATIONARY-OIL-FIRED-WATER-HEATERS_6_3_25.pdf) | ✅ published |
| **AL3040** | Front Load Industrial Automatic Parts Washers | `parts-washer` | — | — | 230 v | [PDF](https://alkota.com/wp-content/uploads/2024/10/Tech_Data_Front_Load_Industrial_Parts_Washer_AL3040_Alkota_01.pdf) | ✅ published |
| **AL3045** | Front Load Industrial Automatic Parts Washers | `parts-washer` | — | — | 230/460 v | [PDF](https://alkota.com/wp-content/uploads/2024/10/Tech_Data_Front_Load_Industrial_Parts_Washer_AL3040_Alkota_01.pdf) | ✅ published |
| **AL3054** | Front Load Industrial Automatic Parts Washers | `parts-washer` | — | — | 230/460 v | [PDF](https://alkota.com/wp-content/uploads/2024/10/Tech_Data_Front_Load_Industrial_Parts_Washer_AL3040_Alkota_01.pdf) | ✅ published |
| **AL3645** | Front Load Industrial Automatic Parts Washers | `parts-washer` | — | — | 230/460 v | [PDF](https://alkota.com/wp-content/uploads/2024/10/Tech_Data_Front_Load_Heavy_Duty_Automatic_Parts_Washer_AL3645_AL3654_Alkota_01.pdf) | ✅ published |
| **AL3654** | Front Load Industrial Automatic Parts Washers | `parts-washer` | — | — | 230/460 v | [PDF](https://alkota.com/wp-content/uploads/2024/10/Tech_Data_Front_Load_Heavy_Duty_Automatic_Parts_Washer_AL3645_AL3654_Alkota_01.pdf) | ✅ published |
| **AL5045** | Front Load Industrial Automatic Parts Washers | `parts-washer` | — | — | 230/460 v | [PDF](https://alkota.com/wp-content/uploads/2023/07/Tech_Data_Front_Load_Heavy_Duty_Automatic_Parts_Washer_AL5045_Alkota_01.pdf) | ✅ published |
| **AL5060** | Front Load Industrial Automatic Parts Washers | `parts-washer` | — | — | 230/460 v | [PDF](https://alkota.com/wp-content/uploads/2023/07/Tech_Data_Front_Load_Heavy_Duty_Automatic_Parts_Washer_AL5045_Alkota_01.pdf) | ✅ published |
| **AL5072** | Front Load Industrial Automatic Parts Washers | `parts-washer` | — | — | 230/460 v | [PDF](https://alkota.com/wp-content/uploads/2023/07/Tech_Data_Front_Load_Heavy_Duty_Automatic_Parts_Washer_AL5045_Alkota_01.pdf) | ✅ published |
| **112** | Industrial Aqueous Parts Washers | `parts-washer` | — | — | 230/1 v | [PDF](https://alkota.com/wp-content/uploads/2024/10/Tech_Data_Front_Load_Heavy_Duty_Automatic_Parts_Washer_PWB_Alkota_01.pdf) | ✅ published |
| **113** | Industrial Aqueous Parts Washers | `parts-washer` | — | — | 230/1 v | [PDF](https://alkota.com/wp-content/uploads/2024/10/Tech_Data_Front_Load_Heavy_Duty_Automatic_Parts_Washer_PWB_Alkota_01.pdf) | ✅ published |
| **412** | Industrial Aqueous Parts Washers | `parts-washer` | — | — | 230/3 v | [PDF](https://alkota.com/wp-content/uploads/2024/10/Tech_Data_Front_Load_Heavy_Duty_Automatic_Parts_Washer_PWB_Alkota_01.pdf) | ✅ published |
| **612** | Industrial Aqueous Parts Washers | `parts-washer` | — | — | 230/3 v | [PDF](https://alkota.com/wp-content/uploads/2024/10/Tech_Data_Front_Load_Heavy_Duty_Automatic_Parts_Washer_PWB_Alkota_01.pdf) | ✅ published |
| **812A** | Industrial Aqueous Parts Washers | `parts-washer` | — | — | 230/3 v | [PDF](https://alkota.com/wp-content/uploads/2024/10/Tech_Data_Front_Load_Heavy_Duty_Automatic_Parts_Washer_PWB_Alkota_01.pdf) | ✅ published |
| **812B** | Industrial Aqueous Parts Washers | `parts-washer` | — | — | 230/3 v | [PDF](https://alkota.com/wp-content/uploads/2024/10/Tech_Data_Front_Load_Heavy_Duty_Automatic_Parts_Washer_PWB_Alkota_01.pdf) | ✅ published |
| **812C** | Industrial Aqueous Parts Washers | `parts-washer` | — | — | 230/3 v | [PDF](https://alkota.com/wp-content/uploads/2024/10/Tech_Data_Front_Load_Heavy_Duty_Automatic_Parts_Washer_PWB_Alkota_01.pdf) | ✅ published |
| **110** | Compact Top Load Parts Washers | `parts-washer` | — | — | 230 v | [PDF](https://alkota.com/wp-content/uploads/2023/07/Tech_Data_Top_Load_Parts_Washer_PWB110_Alkota_01.pdf) | ✅ published |
| **AL2424** | Compact Top Load Parts Washers | `parts-washer` | — | — | 230 v | [PDF](https://alkota.com/wp-content/uploads/2023/07/Tech_Data_Top_Load_Parts_Washer_PWB110_Alkota_01.pdf) | ✅ published |
| **AL2735-RO** | Automatic Parts Washer - Rollout Turntable | `parts-washer` | — | — | 230/460 v | [PDF](https://alkota.com/wp-content/uploads/2024/10/Tech_Data_Front_Load_Heavy_Duty_Automatic_Parts_Washer_AL2735RO_Alkota_01.pdf) | ✅ published |
| **AL3640-RO** | Automatic Parts Washer - Rollout Turntable | `parts-washer` | — | — | 230/460 v | [PDF](https://alkota.com/wp-content/uploads/2023/07/Tech_Data_Front_Load_Heavy_Duty_Automatic_Parts_Washer_AL2735RO_Alkota_01.pdf) | ✅ published |
| **AL4054-RO** | Automatic Parts Washer - Rollout Turntable | `parts-washer` | — | — | 230/460 v | [PDF](https://alkota.com/wp-content/uploads/2023/07/Tech_Data_Front_Load_Heavy_Duty_Automatic_Parts_Washer_AL2735RO_Alkota_01.pdf) | ✅ published |
| **AL3030RBD** | Automatic Parts Washer - Rollout Turntable | `parts-washer` | — | — | 230/460 v | [PDF](https://alkota.com/wp-content/uploads/2023/07/Tech_Data_Front_Load_Heavy_Duty_Automatic_Parts_Washer_AL3030RBD_Alkota_01.pdf) | ✅ published |
| **AL3048RBD** | Automatic Parts Washer - Rollout Turntable | `parts-washer` | — | — | 230/460 v | [PDF](https://alkota.com/wp-content/uploads/2023/07/Tech_Data_Front_Load_Heavy_Duty_Automatic_Parts_Washer_AL3030RBD_Alkota_01.pdf) | ✅ published |
| **20151** | Pressure Washer Trailers - Single &amp; Tandem Axle | `trailer` | — | — | 230V / 1PH | — | ✅ published |
| **20152** | Pressure Washer Trailers - Single &amp; Tandem Axle | `trailer` | — | — | 230V / 1PH | — | ✅ published |
| **20152C** | Pressure Washer Trailers - Single &amp; Tandem Axle | `trailer` | — | — | 230V / 1PH | — | ✅ published |
| **20152K** | Pressure Washer Trailers - Single &amp; Tandem Axle | `trailer` | — | — | 230V / 1PH | — | ✅ published |
| **20171** | Pressure Washer Trailers - Single &amp; Tandem Axle | `trailer` | — | — | 230V / 1PH | — | ✅ published |
| **15/20-LP** | Waste Water Evaporation Systems | `water-treatment` | — | — | 230V / 1PH | [PDF](https://alkota.com/wp-content/uploads/2025/08/15_20-Evaporator.pdf) | ✅ published |
| **15/20-NG** | Waste Water Evaporation Systems | `water-treatment` | — | — | 230V / 1PH | [PDF](https://alkota.com/wp-content/uploads/2025/08/15_20-Evaporator.pdf) | ✅ published |
| **8-VFS-1** | Portable Water Reclaim System | `water-treatment` | — | — | 120 v | — | ✅ published |
| **CSF-5** | Media Filtration Systems | `water-treatment` | — | — | 115 v | [PDF](https://alkota.com/wp-content/uploads/2024/07/Tech_Data_Water_Treatment_CFS_Media_Filtration_Alkota.pdf) | ✅ published |
| **CSF-10** | Media Filtration Systems | `water-treatment` | — | — | 115 v | [PDF](https://alkota.com/wp-content/uploads/2024/07/Tech_Data_Water_Treatment_CFS_Media_Filtration_Alkota.pdf) | ✅ published |

---

## Granular Ingestion Log

```json
[
  {
    "source_url": "https://alkota.com/products/hot-water-pressure-washers/ax4-belt-drive-series/",
    "model": "216AX4",
    "category": "hot-water",
    "status": "warning",
    "specs_count": 21,
    "has_image": true,
    "has_pdf": true,
    "warnings": [
      "Could not find the table 'public.products' in the schema cache"
    ]
  },
  {
    "source_url": "https://alkota.com/products/hot-water-pressure-washers/ax4-belt-drive-series/",
    "model": "311AX4",
    "category": "hot-water",
    "status": "warning",
    "specs_count": 21,
    "has_image": true,
    "has_pdf": true,
    "warnings": [
      "Could not find the table 'public.products' in the schema cache"
    ]
  },
  {
    "source_url": "https://alkota.com/products/hot-water-pressure-washers/ax4-belt-drive-series/",
    "model": "320AX4",
    "category": "hot-water",
    "status": "warning",
    "specs_count": 21,
    "has_image": true,
    "has_pdf": true,
    "warnings": [
      "Could not find the table 'public.products' in the schema cache"
    ]
  },
  {
    "source_url": "https://alkota.com/products/hot-water-pressure-washers/ax4-belt-drive-series/",
    "model": "324AX4",
    "category": "hot-water",
    "status": "warning",
    "specs_count": 21,
    "has_image": true,
    "has_pdf": true,
    "warnings": [
      "Could not find the table 'public.products' in the schema cache"
    ]
  },
  {
    "source_url": "https://alkota.com/products/hot-water-pressure-washers/x4-belt-drive-series/",
    "model": "420X4",
    "category": "hot-water",
    "status": "warning",
    "specs_count": 37,
    "has_image": true,
    "has_pdf": true,
    "warnings": [
      "Could not find the table 'public.products' in the schema cache"
    ]
  },
  {
    "source_url": "https://alkota.com/products/hot-water-pressure-washers/x4-belt-drive-series/",
    "model": "216X4",
    "category": "hot-water",
    "status": "warning",
    "specs_count": 37,
    "has_image": true,
    "has_pdf": true,
    "warnings": [
      "Could not find the table 'public.products' in the schema cache"
    ]
  },
  {
    "source_url": "https://alkota.com/products/hot-water-pressure-washers/x4-belt-drive-series/",
    "model": "320X4",
    "category": "hot-water",
    "status": "warning",
    "specs_count": 22,
    "has_image": true,
    "has_pdf": true,
    "warnings": [
      "Could not find the table 'public.products' in the schema cache"
    ]
  },
  {
    "source_url": "https://alkota.com/products/hot-water-pressure-washers/x4-belt-drive-series/",
    "model": "430XM4",
    "category": "hot-water",
    "status": "warning",
    "specs_count": 38,
    "has_image": true,
    "has_pdf": true,
    "warnings": [
      "Could not find the table 'public.products' in the schema cache"
    ]
  },
  {
    "source_url": "https://alkota.com/products/hot-water-pressure-washers/x4-belt-drive-series/",
    "model": "523X4",
    "category": "hot-water",
    "status": "warning",
    "specs_count": 21,
    "has_image": true,
    "has_pdf": true,
    "warnings": [
      "Could not find the table 'public.products' in the schema cache"
    ]
  },
  {
    "source_url": "https://alkota.com/products/hot-water-pressure-washers/xd4-direct-drive-series/",
    "model": "4405XD4",
    "category": "hot-water",
    "status": "warning",
    "specs_count": 32,
    "has_image": true,
    "has_pdf": true,
    "warnings": [
      "Could not find the table 'public.products' in the schema cache"
    ]
  },
  {
    "source_url": "https://alkota.com/products/hot-water-pressure-washers/xd4-direct-drive-series/",
    "model": "3305XD4",
    "category": "hot-water",
    "status": "warning",
    "specs_count": 18,
    "has_image": true,
    "has_pdf": true,
    "warnings": [
      "Could not find the table 'public.products' in the schema cache"
    ]
  },
  {
    "source_url": "https://alkota.com/products/hot-water-pressure-washers/gas-fired-hot-water-pressure-washer/",
    "model": "4301",
    "category": "hot-water",
    "status": "warning",
    "specs_count": 22,
    "has_image": true,
    "has_pdf": true,
    "warnings": [
      "Could not find the table 'public.products' in the schema cache"
    ]
  },
  {
    "source_url": "https://alkota.com/products/hot-water-pressure-washers/gas-fired-hot-water-pressure-washer/",
    "model": "4201",
    "category": "hot-water",
    "status": "warning",
    "specs_count": 22,
    "has_image": true,
    "has_pdf": true,
    "warnings": [
      "Could not find the table 'public.products' in the schema cache"
    ]
  },
  {
    "source_url": "https://alkota.com/products/hot-water-pressure-washers/gas-fired-hot-water-pressure-washer/",
    "model": "5301",
    "category": "hot-water",
    "status": "warning",
    "specs_count": 22,
    "has_image": true,
    "has_pdf": true,
    "warnings": [
      "Could not find the table 'public.products' in the schema cache"
    ]
  },
  {
    "source_url": "https://alkota.com/products/hot-water-pressure-washers/gas-fired-hot-water-pressure-washer/",
    "model": "8351",
    "category": "hot-water",
    "status": "warning",
    "specs_count": 22,
    "has_image": true,
    "has_pdf": true,
    "warnings": [
      "Could not find the table 'public.products' in the schema cache"
    ]
  },
  {
    "source_url": "https://alkota.com/products/hot-water-pressure-washers/gas-fired-hot-water-pressure-washer/",
    "model": "10301",
    "category": "hot-water",
    "status": "warning",
    "specs_count": 22,
    "has_image": true,
    "has_pdf": true,
    "warnings": [
      "Could not find the table 'public.products' in the schema cache"
    ]
  },
  {
    "source_url": "https://alkota.com/products/hot-water-pressure-washers/gas-fired-x4-series/",
    "model": "216X4PT",
    "category": "hot-water",
    "status": "warning",
    "specs_count": 25,
    "has_image": true,
    "has_pdf": true,
    "warnings": [
      "Could not find the table 'public.products' in the schema cache"
    ]
  },
  {
    "source_url": "https://alkota.com/products/hot-water-pressure-washers/gas-fired-x4-series/",
    "model": "311X4PT",
    "category": "hot-water",
    "status": "warning",
    "specs_count": 25,
    "has_image": true,
    "has_pdf": true,
    "warnings": [
      "Could not find the table 'public.products' in the schema cache"
    ]
  },
  {
    "source_url": "https://alkota.com/products/hot-water-pressure-washers/gas-fired-x4-series/",
    "model": "320X4PT",
    "category": "hot-water",
    "status": "warning",
    "specs_count": 25,
    "has_image": true,
    "has_pdf": true,
    "warnings": [
      "Could not find the table 'public.products' in the schema cache"
    ]
  },
  {
    "source_url": "https://alkota.com/products/hot-water-pressure-washers/gas-fired-x4-series/",
    "model": "324X4PT",
    "category": "hot-water",
    "status": "warning",
    "specs_count": 25,
    "has_image": true,
    "has_pdf": true,
    "warnings": [
      "Could not find the table 'public.products' in the schema cache"
    ]
  },
  {
    "source_url": "https://alkota.com/products/hot-water-pressure-washers/hot-water-pressure-washer-diesel-engine-skid/",
    "model": "5357C",
    "category": "hot-water",
    "status": "warning",
    "specs_count": 37,
    "has_image": true,
    "has_pdf": true,
    "warnings": [
      "Could not find the table 'public.products' in the schema cache"
    ]
  },
  {
    "source_url": "https://alkota.com/products/hot-water-pressure-washers/hot-water-pressure-washer-diesel-engine-skid/",
    "model": "5357KZ",
    "category": "hot-water",
    "status": "warning",
    "specs_count": 21,
    "has_image": true,
    "has_pdf": true,
    "warnings": [
      "Could not find the table 'public.products' in the schema cache"
    ]
  },
  {
    "source_url": "https://alkota.com/products/hot-water-pressure-washers/hot-water-pressure-washer-diesel-engine-skid/",
    "model": "5357",
    "category": "hot-water",
    "status": "warning",
    "specs_count": 21,
    "has_image": true,
    "has_pdf": true,
    "warnings": [
      "Could not find the table 'public.products' in the schema cache"
    ]
  },
  {
    "source_url": "https://alkota.com/products/hot-water-pressure-washers/hot-water-pressure-washer-diesel-engine-skid/",
    "model": "5407",
    "category": "hot-water",
    "status": "warning",
    "specs_count": 21,
    "has_image": true,
    "has_pdf": true,
    "warnings": [
      "Could not find the table 'public.products' in the schema cache"
    ]
  },
  {
    "source_url": "https://alkota.com/products/hot-water-pressure-washers/pressure-washer-hot-water-diesel-engine-ded-big-boy-diesel/",
    "model": "8307K",
    "category": "hot-water",
    "status": "warning",
    "specs_count": 22,
    "has_image": true,
    "has_pdf": true,
    "warnings": [
      "Could not find the table 'public.products' in the schema cache"
    ]
  },
  {
    "source_url": "https://alkota.com/products/hot-water-pressure-washers/pressure-washer-hot-water-diesel-engine-ded-big-boy-diesel/",
    "model": "5357K",
    "category": "hot-water",
    "status": "warning",
    "specs_count": 22,
    "has_image": true,
    "has_pdf": true,
    "warnings": [
      "Could not find the table 'public.products' in the schema cache"
    ]
  },
  {
    "source_url": "https://alkota.com/products/hot-water-pressure-washers/pressure-washer-hot-water-diesel-engine-ded-big-boy-diesel/",
    "model": "5507K",
    "category": "hot-water",
    "status": "warning",
    "specs_count": 22,
    "has_image": true,
    "has_pdf": true,
    "warnings": [
      "Could not find the table 'public.products' in the schema cache"
    ]
  },
  {
    "source_url": "https://alkota.com/products/hot-water-pressure-washers/pressure-washer-hot-water-diesel-engine-ded-big-boy-diesel/",
    "model": "10307KKA",
    "category": "hot-water",
    "status": "warning",
    "specs_count": 20,
    "has_image": true,
    "has_pdf": true,
    "warnings": [
      "Could not find the table 'public.products' in the schema cache"
    ]
  },
  {
    "source_url": "https://alkota.com/products/hot-water-pressure-washers/pressure-washer-hot-water-gas-engine-115-volt-skid/",
    "model": "5355JB",
    "category": "hot-water",
    "status": "warning",
    "specs_count": 23,
    "has_image": true,
    "has_pdf": true,
    "warnings": [
      "Could not find the table 'public.products' in the schema cache"
    ]
  },
  {
    "source_url": "https://alkota.com/products/hot-water-pressure-washers/pressure-washer-hot-water-gas-engine-115-volt-skid/",
    "model": "5305EAB",
    "category": "hot-water",
    "status": "warning",
    "specs_count": 23,
    "has_image": true,
    "has_pdf": true,
    "warnings": [
      "Could not find the table 'public.products' in the schema cache"
    ]
  },
  {
    "source_url": "https://alkota.com/products/hot-water-pressure-washers/pressure-washer-hot-water-gas-engine-115-volt-skid/",
    "model": "8305H",
    "category": "hot-water",
    "status": "warning",
    "specs_count": 23,
    "has_image": true,
    "has_pdf": true,
    "warnings": [
      "Could not find the table 'public.products' in the schema cache"
    ]
  },
  {
    "source_url": "https://alkota.com/products/hot-water-pressure-washers/pressure-washer-hot-water-gas-engine-12-volt-skid/",
    "model": "5355J",
    "category": "hot-water",
    "status": "warning",
    "specs_count": 36,
    "has_image": true,
    "has_pdf": true,
    "warnings": [
      "Could not find the table 'public.products' in the schema cache"
    ]
  },
  {
    "source_url": "https://alkota.com/products/hot-water-pressure-washers/pressure-washer-hot-water-gas-engine-12-volt-skid/",
    "model": "5355EAD",
    "category": "hot-water",
    "status": "warning",
    "specs_count": 20,
    "has_image": true,
    "has_pdf": true,
    "warnings": [
      "Could not find the table 'public.products' in the schema cache"
    ]
  },
  {
    "source_url": "https://alkota.com/products/hot-water-pressure-washers/pressure-washer-hot-water-gas-engine-12-volt-skid/",
    "model": "5505J",
    "category": "hot-water",
    "status": "warning",
    "specs_count": 20,
    "has_image": true,
    "has_pdf": true,
    "warnings": [
      "Could not find the table 'public.products' in the schema cache"
    ]
  },
  {
    "source_url": "https://alkota.com/products/hot-water-pressure-washers/pressure-washer-hot-water-narrow-frame-gas-diesel-engine/",
    "model": "5355ENS",
    "category": "hot-water",
    "status": "warning",
    "specs_count": 44,
    "has_image": true,
    "has_pdf": true,
    "warnings": [
      "Could not find the table 'public.products' in the schema cache"
    ]
  },
  {
    "source_url": "https://alkota.com/products/hot-water-pressure-washers/pressure-washer-hot-water-narrow-frame-gas-diesel-engine/",
    "model": "5355ENL",
    "category": "hot-water",
    "status": "warning",
    "specs_count": 24,
    "has_image": true,
    "has_pdf": true,
    "warnings": [
      "Could not find the table 'public.products' in the schema cache"
    ]
  },
  {
    "source_url": "https://alkota.com/products/hot-water-pressure-washers/pressure-washer-hot-water-narrow-frame-gas-diesel-engine/",
    "model": "5355HNS",
    "category": "hot-water",
    "status": "warning",
    "specs_count": 24,
    "has_image": true,
    "has_pdf": true,
    "warnings": [
      "Could not find the table 'public.products' in the schema cache"
    ]
  },
  {
    "source_url": "https://alkota.com/products/hot-water-pressure-washers/pressure-washer-hot-water-narrow-frame-gas-diesel-engine/",
    "model": "8405HNL",
    "category": "hot-water",
    "status": "warning",
    "specs_count": 43,
    "has_image": true,
    "has_pdf": true,
    "warnings": [
      "Could not find the table 'public.products' in the schema cache"
    ]
  },
  {
    "source_url": "https://alkota.com/alkota-elite-series-hot-water-pressure-washers/",
    "model": "4301-NG/LP",
    "category": "hot-water",
    "status": "warning",
    "specs_count": 20,
    "has_image": true,
    "has_pdf": true,
    "warnings": [
      "Could not find the table 'public.products' in the schema cache"
    ]
  },
  {
    "source_url": "https://alkota.com/products/pressure-washer-cold-water/219cse-electric-pressure-washer/",
    "model": "219CSE",
    "category": "cold-water",
    "status": "warning",
    "specs_count": 10,
    "has_image": true,
    "has_pdf": true,
    "warnings": [
      "Could not find the table 'public.products' in the schema cache",
      "Missing flow rate",
      "Missing pressure rating"
    ]
  },
  {
    "source_url": "https://alkota.com/products/pressure-washer-cold-water/bd-industrial-series/",
    "model": "216BD",
    "category": "cold-water",
    "status": "warning",
    "specs_count": 13,
    "has_image": true,
    "has_pdf": true,
    "warnings": [
      "Could not find the table 'public.products' in the schema cache"
    ]
  },
  {
    "source_url": "https://alkota.com/products/pressure-washer-cold-water/bd-industrial-series/",
    "model": "311BD",
    "category": "cold-water",
    "status": "warning",
    "specs_count": 13,
    "has_image": true,
    "has_pdf": true,
    "warnings": [
      "Could not find the table 'public.products' in the schema cache"
    ]
  },
  {
    "source_url": "https://alkota.com/products/pressure-washer-cold-water/bd-industrial-series/",
    "model": "420BD",
    "category": "cold-water",
    "status": "warning",
    "specs_count": 13,
    "has_image": true,
    "has_pdf": true,
    "warnings": [
      "Could not find the table 'public.products' in the schema cache"
    ]
  },
  {
    "source_url": "https://alkota.com/products/pressure-washer-cold-water/bd-industrial-series/",
    "model": "430BD",
    "category": "cold-water",
    "status": "warning",
    "specs_count": 13,
    "has_image": true,
    "has_pdf": true,
    "warnings": [
      "Could not find the table 'public.products' in the schema cache"
    ]
  },
  {
    "source_url": "https://alkota.com/products/pressure-washer-cold-water/bd-industrial-series/",
    "model": "530BD",
    "category": "cold-water",
    "status": "warning",
    "specs_count": 13,
    "has_image": true,
    "has_pdf": true,
    "warnings": [
      "Could not find the table 'public.products' in the schema cache"
    ]
  },
  {
    "source_url": "https://alkota.com/products/pressure-washer-cold-water/cold-power-washer-s-series-electric/",
    "model": "420S",
    "category": "cold-water",
    "status": "warning",
    "specs_count": 11,
    "has_image": true,
    "has_pdf": true,
    "warnings": [
      "Could not find the table 'public.products' in the schema cache"
    ]
  },
  {
    "source_url": "https://alkota.com/products/pressure-washer-cold-water/cold-power-washer-s-series-electric/",
    "model": "530S",
    "category": "cold-water",
    "status": "warning",
    "specs_count": 11,
    "has_image": true,
    "has_pdf": true,
    "warnings": [
      "Could not find the table 'public.products' in the schema cache"
    ]
  },
  {
    "source_url": "https://alkota.com/products/pressure-washer-cold-water/cold-water-pressure-washer-hog-house-special/",
    "model": "HHS440",
    "category": "cold-water",
    "status": "warning",
    "specs_count": 12,
    "has_image": true,
    "has_pdf": true,
    "warnings": [
      "Could not find the table 'public.products' in the schema cache"
    ]
  },
  {
    "source_url": "https://alkota.com/products/pressure-washer-cold-water/cold-water-pressure-washer-hog-house-special/",
    "model": "HHS530",
    "category": "cold-water",
    "status": "warning",
    "specs_count": 12,
    "has_image": true,
    "has_pdf": true,
    "warnings": [
      "Could not find the table 'public.products' in the schema cache"
    ]
  },
  {
    "source_url": "https://alkota.com/products/pressure-washer-cold-water/cold-water-pressure-washer-hog-house-special/",
    "model": "HHS720",
    "category": "cold-water",
    "status": "warning",
    "specs_count": 12,
    "has_image": true,
    "has_pdf": true,
    "warnings": [
      "Could not find the table 'public.products' in the schema cache"
    ]
  },
  {
    "source_url": "https://alkota.com/products/pressure-washer-cold-water/cold-water-pressure-washer-hog-house-special/",
    "model": "HHS1015",
    "category": "cold-water",
    "status": "warning",
    "specs_count": 12,
    "has_image": true,
    "has_pdf": true,
    "warnings": [
      "Could not find the table 'public.products' in the schema cache"
    ]
  },
  {
    "source_url": "https://alkota.com/products/pressure-washer-cold-water/cold-water-pressure-washer-wash-bay-cabinet-modules/",
    "model": "420B",
    "category": "cold-water",
    "status": "warning",
    "specs_count": 12,
    "has_image": true,
    "has_pdf": true,
    "warnings": [
      "Could not find the table 'public.products' in the schema cache"
    ]
  },
  {
    "source_url": "https://alkota.com/products/pressure-washer-cold-water/cold-water-pressure-washer-wash-bay-cabinet-modules/",
    "model": "430B",
    "category": "cold-water",
    "status": "warning",
    "specs_count": 12,
    "has_image": true,
    "has_pdf": true,
    "warnings": [
      "Could not find the table 'public.products' in the schema cache"
    ]
  },
  {
    "source_url": "https://alkota.com/products/pressure-washer-cold-water/cold-water-pressure-washer-wash-bay-cabinet-modules/",
    "model": "530B",
    "category": "cold-water",
    "status": "warning",
    "specs_count": 12,
    "has_image": true,
    "has_pdf": true,
    "warnings": [
      "Could not find the table 'public.products' in the schema cache"
    ]
  },
  {
    "source_url": "https://alkota.com/products/pressure-washer-cold-water/cold-water-pressure-washer-wash-bay-cabinet-modules/",
    "model": "835B",
    "category": "cold-water",
    "status": "warning",
    "specs_count": 12,
    "has_image": true,
    "has_pdf": true,
    "warnings": [
      "Could not find the table 'public.products' in the schema cache"
    ]
  },
  {
    "source_url": "https://alkota.com/products/pressure-washer-cold-water/cold-water-pressure-washer-wash-bay-cabinet-modules/",
    "model": "1030B",
    "category": "cold-water",
    "status": "warning",
    "specs_count": 12,
    "has_image": true,
    "has_pdf": true,
    "warnings": [
      "Could not find the table 'public.products' in the schema cache"
    ]
  },
  {
    "source_url": "https://alkota.com/products/pressure-washer-cold-water/high-volume-pressure-washer-wash-cannon/",
    "model": "25500",
    "category": "cold-water",
    "status": "warning",
    "specs_count": 11,
    "has_image": true,
    "has_pdf": true,
    "warnings": [
      "Could not find the table 'public.products' in the schema cache"
    ]
  },
  {
    "source_url": "https://alkota.com/products/pressure-washer-cold-water/high-volume-pressure-washer-wash-cannon/",
    "model": "25750",
    "category": "cold-water",
    "status": "warning",
    "specs_count": 11,
    "has_image": true,
    "has_pdf": true,
    "warnings": [
      "Could not find the table 'public.products' in the schema cache"
    ]
  },
  {
    "source_url": "https://alkota.com/products/pressure-washer-cold-water/high-volume-pressure-washer-wash-cannon/",
    "model": "25755-GAS-ENGINE",
    "category": "cold-water",
    "status": "warning",
    "specs_count": 11,
    "has_image": true,
    "has_pdf": true,
    "warnings": [
      "Could not find the table 'public.products' in the schema cache"
    ]
  },
  {
    "source_url": "https://alkota.com/products/pressure-washer-cold-water/high-volume-pressure-washer-wash-cannon/",
    "model": "2110",
    "category": "cold-water",
    "status": "warning",
    "specs_count": 11,
    "has_image": true,
    "has_pdf": true,
    "warnings": [
      "Could not find the table 'public.products' in the schema cache"
    ]
  },
  {
    "source_url": "https://alkota.com/products/pressure-washer-cold-water/jetter-series/",
    "model": "210J",
    "category": "cold-water",
    "status": "warning",
    "specs_count": 12,
    "has_image": true,
    "has_pdf": true,
    "warnings": [
      "Could not find the table 'public.products' in the schema cache"
    ]
  },
  {
    "source_url": "https://alkota.com/products/pressure-washer-cold-water/jetter-series/",
    "model": "440J",
    "category": "cold-water",
    "status": "warning",
    "specs_count": 12,
    "has_image": true,
    "has_pdf": true,
    "warnings": [
      "Could not find the table 'public.products' in the schema cache"
    ]
  },
  {
    "source_url": "https://alkota.com/products/pressure-washer-cold-water/jetter-series/",
    "model": "840J",
    "category": "cold-water",
    "status": "warning",
    "specs_count": 12,
    "has_image": true,
    "has_pdf": true,
    "warnings": [
      "Could not find the table 'public.products' in the schema cache"
    ]
  },
  {
    "source_url": "https://alkota.com/products/pressure-washer-cold-water/pressure-washers-aluminum-frame-challenger/",
    "model": "325CSH",
    "category": "cold-water",
    "status": "warning",
    "specs_count": 14,
    "has_image": true,
    "has_pdf": true,
    "warnings": [
      "Could not find the table 'public.products' in the schema cache"
    ]
  },
  {
    "source_url": "https://alkota.com/products/pressure-washer-cold-water/pressure-washers-aluminum-frame-challenger/",
    "model": "216CSE",
    "category": "cold-water",
    "status": "warning",
    "specs_count": 13,
    "has_image": true,
    "has_pdf": true,
    "warnings": [
      "Could not find the table 'public.products' in the schema cache"
    ]
  },
  {
    "source_url": "https://alkota.com/products/pressure-washer-cold-water/pressure-washers-aluminum-frame-challenger/",
    "model": "320CSE",
    "category": "cold-water",
    "status": "warning",
    "specs_count": 13,
    "has_image": true,
    "has_pdf": true,
    "warnings": [
      "Could not find the table 'public.products' in the schema cache"
    ]
  },
  {
    "source_url": "https://alkota.com/products/pressure-washer-cold-water/pressure-washers-cold-water-s-series-gas-diesel-engine/",
    "model": "845S",
    "category": "cold-water",
    "status": "warning",
    "specs_count": 11,
    "has_image": true,
    "has_pdf": true,
    "warnings": [
      "Could not find the table 'public.products' in the schema cache"
    ]
  },
  {
    "source_url": "https://alkota.com/products/pressure-washer-cold-water/pressure-washers-cold-water-s-series-gas-diesel-engine/",
    "model": "4355",
    "category": "cold-water",
    "status": "warning",
    "specs_count": 11,
    "has_image": true,
    "has_pdf": true,
    "warnings": [
      "Could not find the table 'public.products' in the schema cache"
    ]
  },
  {
    "source_url": "https://alkota.com/products/pressure-washer-cold-water/pressure-washers-cold-water-s-series-gas-diesel-engine/",
    "model": "537S",
    "category": "cold-water",
    "status": "warning",
    "specs_count": 11,
    "has_image": true,
    "has_pdf": true,
    "warnings": [
      "Could not find the table 'public.products' in the schema cache"
    ]
  },
  {
    "source_url": "https://alkota.com/products/pressure-washer-cold-water/pressure-washers-cold-water-s-series-gas-diesel-engine/",
    "model": "555M",
    "category": "cold-water",
    "status": "warning",
    "specs_count": 11,
    "has_image": true,
    "has_pdf": true,
    "warnings": [
      "Could not find the table 'public.products' in the schema cache"
    ]
  },
  {
    "source_url": "https://alkota.com/products/steam-cleaners/dry-stream-generators/",
    "model": "246EN",
    "category": "steam",
    "status": "warning",
    "specs_count": 17,
    "has_image": true,
    "has_pdf": true,
    "warnings": [
      "Could not find the table 'public.products' in the schema cache"
    ]
  },
  {
    "source_url": "https://alkota.com/products/steam-cleaners/dry-stream-generators/",
    "model": "126",
    "category": "steam",
    "status": "warning",
    "specs_count": 13,
    "has_image": true,
    "has_pdf": true,
    "warnings": [
      "Could not find the table 'public.products' in the schema cache"
    ]
  },
  {
    "source_url": "https://alkota.com/products/steam-cleaners/gas-fired-steam-cleaners-lp/",
    "model": "181",
    "category": "steam",
    "status": "warning",
    "specs_count": 24,
    "has_image": true,
    "has_pdf": true,
    "warnings": [
      "Could not find the table 'public.products' in the schema cache",
      "Missing flow rate",
      "Missing pressure rating"
    ]
  },
  {
    "source_url": "https://alkota.com/products/steam-cleaners/gas-fired-steam-cleaners-lp/",
    "model": "241",
    "category": "steam",
    "status": "warning",
    "specs_count": 24,
    "has_image": true,
    "has_pdf": true,
    "warnings": [
      "Could not find the table 'public.products' in the schema cache",
      "Missing flow rate",
      "Missing pressure rating"
    ]
  },
  {
    "source_url": "https://alkota.com/products/steam-cleaners/gas-fired-steam-cleaners-lp/",
    "model": "301",
    "category": "steam",
    "status": "warning",
    "specs_count": 24,
    "has_image": true,
    "has_pdf": true,
    "warnings": [
      "Could not find the table 'public.products' in the schema cache",
      "Missing flow rate",
      "Missing pressure rating"
    ]
  },
  {
    "source_url": "https://alkota.com/products/steam-cleaners/gas-fired-steam-cleaners-lp/",
    "model": "401",
    "category": "steam",
    "status": "warning",
    "specs_count": 24,
    "has_image": true,
    "has_pdf": true,
    "warnings": [
      "Could not find the table 'public.products' in the schema cache",
      "Missing flow rate",
      "Missing pressure rating"
    ]
  },
  {
    "source_url": "https://alkota.com/products/steam-cleaners/steam-cleaners-oil-fired/",
    "model": "122",
    "category": "steam",
    "status": "warning",
    "specs_count": 25,
    "has_image": true,
    "has_pdf": true,
    "warnings": [
      "Could not find the table 'public.products' in the schema cache",
      "Missing flow rate",
      "Missing pressure rating"
    ]
  },
  {
    "source_url": "https://alkota.com/products/steam-cleaners/steam-cleaners-oil-fired/",
    "model": "240",
    "category": "steam",
    "status": "warning",
    "specs_count": 25,
    "has_image": true,
    "has_pdf": true,
    "warnings": [
      "Could not find the table 'public.products' in the schema cache",
      "Missing flow rate",
      "Missing pressure rating"
    ]
  },
  {
    "source_url": "https://alkota.com/products/steam-cleaners/steam-cleaners-oil-fired/",
    "model": "122X4",
    "category": "steam",
    "status": "warning",
    "specs_count": 25,
    "has_image": true,
    "has_pdf": true,
    "warnings": [
      "Could not find the table 'public.products' in the schema cache",
      "Missing flow rate",
      "Missing pressure rating"
    ]
  },
  {
    "source_url": "https://alkota.com/products/steam-cleaners/steam-cleaners-oil-fired/",
    "model": "240EN",
    "category": "steam",
    "status": "warning",
    "specs_count": 25,
    "has_image": true,
    "has_pdf": true,
    "warnings": [
      "Could not find the table 'public.products' in the schema cache",
      "Missing flow rate",
      "Missing pressure rating"
    ]
  },
  {
    "source_url": "https://alkota.com/products/industrial-heaters/industrial-heaters/",
    "model": "INDUSTRIAL-HEATERS",
    "category": "space-heater",
    "status": "warning",
    "specs_count": 4,
    "has_image": true,
    "has_pdf": true,
    "warnings": [
      "Could not find the table 'public.products' in the schema cache",
      "Missing flow rate",
      "Missing pressure rating"
    ]
  },
  {
    "source_url": "https://alkota.com/products/water-heaters-2/water-heater-horizontal-oil-fired/",
    "model": "210WH",
    "category": "water-heater",
    "status": "warning",
    "specs_count": 13,
    "has_image": true,
    "has_pdf": true,
    "warnings": [
      "Could not find the table 'public.products' in the schema cache",
      "Missing flow rate",
      "Missing pressure rating"
    ]
  },
  {
    "source_url": "https://alkota.com/products/water-heaters-2/water-heater-horizontal-oil-fired/",
    "model": "410H",
    "category": "water-heater",
    "status": "warning",
    "specs_count": 13,
    "has_image": true,
    "has_pdf": true,
    "warnings": [
      "Could not find the table 'public.products' in the schema cache",
      "Missing flow rate",
      "Missing pressure rating"
    ]
  },
  {
    "source_url": "https://alkota.com/products/water-heaters-2/water-heater-horizontal-oil-fired/",
    "model": "510H",
    "category": "water-heater",
    "status": "warning",
    "specs_count": 13,
    "has_image": true,
    "has_pdf": true,
    "warnings": [
      "Could not find the table 'public.products' in the schema cache",
      "Missing flow rate",
      "Missing pressure rating"
    ]
  },
  {
    "source_url": "https://alkota.com/products/water-heaters-2/water-heater-horizontal-oil-fired/",
    "model": "760H",
    "category": "water-heater",
    "status": "warning",
    "specs_count": 13,
    "has_image": true,
    "has_pdf": true,
    "warnings": [
      "Could not find the table 'public.products' in the schema cache",
      "Missing flow rate",
      "Missing pressure rating"
    ]
  },
  {
    "source_url": "https://alkota.com/products/water-heaters-2/water-heaters-stationary-gas-fired-ul-and-csa-certified/",
    "model": "511",
    "category": "water-heater",
    "status": "warning",
    "specs_count": 14,
    "has_image": true,
    "has_pdf": true,
    "warnings": [
      "Could not find the table 'public.products' in the schema cache",
      "Missing flow rate",
      "Missing pressure rating"
    ]
  },
  {
    "source_url": "https://alkota.com/products/water-heaters-2/water-heaters-stationary-gas-fired-ul-and-csa-certified/",
    "model": "411",
    "category": "water-heater",
    "status": "warning",
    "specs_count": 14,
    "has_image": true,
    "has_pdf": true,
    "warnings": [
      "Could not find the table 'public.products' in the schema cache",
      "Missing flow rate",
      "Missing pressure rating"
    ]
  },
  {
    "source_url": "https://alkota.com/products/water-heaters-2/water-heaters-stationary-gas-fired-ul-and-csa-certified/",
    "model": "761",
    "category": "water-heater",
    "status": "warning",
    "specs_count": 14,
    "has_image": true,
    "has_pdf": true,
    "warnings": [
      "Could not find the table 'public.products' in the schema cache",
      "Missing flow rate",
      "Missing pressure rating"
    ]
  },
  {
    "source_url": "https://alkota.com/products/water-heaters-2/water-heaters-stationary-gas-fired-ul-and-csa-certified/",
    "model": "1011-NG",
    "category": "water-heater",
    "status": "warning",
    "specs_count": 14,
    "has_image": true,
    "has_pdf": true,
    "warnings": [
      "Could not find the table 'public.products' in the schema cache",
      "Missing flow rate",
      "Missing pressure rating"
    ]
  },
  {
    "source_url": "https://alkota.com/products/water-heaters-2/water-heaters-stationary-gas-fired-ul-and-csa-certified/",
    "model": "1011-LP",
    "category": "water-heater",
    "status": "warning",
    "specs_count": 14,
    "has_image": true,
    "has_pdf": true,
    "warnings": [
      "Could not find the table 'public.products' in the schema cache",
      "Missing flow rate",
      "Missing pressure rating"
    ]
  },
  {
    "source_url": "https://alkota.com/products/water-heaters-2/water-heaters-stationary-oil-fired-ul-certified/",
    "model": "510",
    "category": "water-heater",
    "status": "warning",
    "specs_count": 16,
    "has_image": true,
    "has_pdf": true,
    "warnings": [
      "Could not find the table 'public.products' in the schema cache",
      "Missing flow rate",
      "Missing pressure rating"
    ]
  },
  {
    "source_url": "https://alkota.com/products/water-heaters-2/water-heaters-stationary-oil-fired-ul-certified/",
    "model": "410",
    "category": "water-heater",
    "status": "warning",
    "specs_count": 16,
    "has_image": true,
    "has_pdf": true,
    "warnings": [
      "Could not find the table 'public.products' in the schema cache",
      "Missing flow rate",
      "Missing pressure rating"
    ]
  },
  {
    "source_url": "https://alkota.com/products/water-heaters-2/water-heaters-stationary-oil-fired-ul-certified/",
    "model": "760",
    "category": "water-heater",
    "status": "warning",
    "specs_count": 16,
    "has_image": true,
    "has_pdf": true,
    "warnings": [
      "Could not find the table 'public.products' in the schema cache",
      "Missing flow rate",
      "Missing pressure rating"
    ]
  },
  {
    "source_url": "https://alkota.com/products/water-heaters-2/water-heaters-stationary-oil-fired-ul-certified/",
    "model": "1010",
    "category": "water-heater",
    "status": "warning",
    "specs_count": 16,
    "has_image": true,
    "has_pdf": true,
    "warnings": [
      "Could not find the table 'public.products' in the schema cache",
      "Missing flow rate",
      "Missing pressure rating"
    ]
  },
  {
    "source_url": "https://alkota.com/products/water-heaters-2/water-heaters-stationary-oil-fired-ul-certified/",
    "model": "1060",
    "category": "water-heater",
    "status": "warning",
    "specs_count": 16,
    "has_image": true,
    "has_pdf": true,
    "warnings": [
      "Could not find the table 'public.products' in the schema cache",
      "Missing flow rate",
      "Missing pressure rating"
    ]
  },
  {
    "source_url": "https://alkota.com/products/industrial-parts-washers/parts-washer-front-load/",
    "model": "AL3040",
    "category": "parts-washer",
    "status": "warning",
    "specs_count": 23,
    "has_image": true,
    "has_pdf": true,
    "warnings": [
      "Could not find the table 'public.products' in the schema cache",
      "Missing flow rate",
      "Missing pressure rating"
    ]
  },
  {
    "source_url": "https://alkota.com/products/industrial-parts-washers/parts-washer-front-load/",
    "model": "AL3045",
    "category": "parts-washer",
    "status": "warning",
    "specs_count": 23,
    "has_image": true,
    "has_pdf": true,
    "warnings": [
      "Could not find the table 'public.products' in the schema cache",
      "Missing flow rate",
      "Missing pressure rating"
    ]
  },
  {
    "source_url": "https://alkota.com/products/industrial-parts-washers/parts-washer-front-load/",
    "model": "AL3054",
    "category": "parts-washer",
    "status": "warning",
    "specs_count": 22,
    "has_image": true,
    "has_pdf": true,
    "warnings": [
      "Could not find the table 'public.products' in the schema cache",
      "Missing flow rate",
      "Missing pressure rating"
    ]
  },
  {
    "source_url": "https://alkota.com/products/industrial-parts-washers/parts-washer-front-load/",
    "model": "AL3645",
    "category": "parts-washer",
    "status": "warning",
    "specs_count": 22,
    "has_image": true,
    "has_pdf": true,
    "warnings": [
      "Could not find the table 'public.products' in the schema cache",
      "Missing flow rate",
      "Missing pressure rating"
    ]
  },
  {
    "source_url": "https://alkota.com/products/industrial-parts-washers/parts-washer-front-load/",
    "model": "AL3654",
    "category": "parts-washer",
    "status": "warning",
    "specs_count": 22,
    "has_image": true,
    "has_pdf": true,
    "warnings": [
      "Could not find the table 'public.products' in the schema cache",
      "Missing flow rate",
      "Missing pressure rating"
    ]
  },
  {
    "source_url": "https://alkota.com/products/industrial-parts-washers/parts-washer-front-load/",
    "model": "AL5045",
    "category": "parts-washer",
    "status": "warning",
    "specs_count": 22,
    "has_image": true,
    "has_pdf": true,
    "warnings": [
      "Could not find the table 'public.products' in the schema cache",
      "Missing flow rate",
      "Missing pressure rating"
    ]
  },
  {
    "source_url": "https://alkota.com/products/industrial-parts-washers/parts-washer-front-load/",
    "model": "AL5060",
    "category": "parts-washer",
    "status": "warning",
    "specs_count": 22,
    "has_image": true,
    "has_pdf": true,
    "warnings": [
      "Could not find the table 'public.products' in the schema cache",
      "Missing flow rate",
      "Missing pressure rating"
    ]
  },
  {
    "source_url": "https://alkota.com/products/industrial-parts-washers/parts-washer-front-load/",
    "model": "AL5072",
    "category": "parts-washer",
    "status": "warning",
    "specs_count": 22,
    "has_image": true,
    "has_pdf": true,
    "warnings": [
      "Could not find the table 'public.products' in the schema cache",
      "Missing flow rate",
      "Missing pressure rating"
    ]
  },
  {
    "source_url": "https://alkota.com/products/industrial-parts-washers/parts-washers-front-load-swing-out/",
    "model": "112",
    "category": "parts-washer",
    "status": "warning",
    "specs_count": 17,
    "has_image": true,
    "has_pdf": true,
    "warnings": [
      "Could not find the table 'public.products' in the schema cache",
      "Missing flow rate",
      "Missing pressure rating"
    ]
  },
  {
    "source_url": "https://alkota.com/products/industrial-parts-washers/parts-washers-front-load-swing-out/",
    "model": "113",
    "category": "parts-washer",
    "status": "warning",
    "specs_count": 17,
    "has_image": true,
    "has_pdf": true,
    "warnings": [
      "Could not find the table 'public.products' in the schema cache",
      "Missing flow rate",
      "Missing pressure rating"
    ]
  },
  {
    "source_url": "https://alkota.com/products/industrial-parts-washers/parts-washers-front-load-swing-out/",
    "model": "412",
    "category": "parts-washer",
    "status": "warning",
    "specs_count": 17,
    "has_image": true,
    "has_pdf": true,
    "warnings": [
      "Could not find the table 'public.products' in the schema cache",
      "Missing flow rate",
      "Missing pressure rating"
    ]
  },
  {
    "source_url": "https://alkota.com/products/industrial-parts-washers/parts-washers-front-load-swing-out/",
    "model": "612",
    "category": "parts-washer",
    "status": "warning",
    "specs_count": 17,
    "has_image": true,
    "has_pdf": true,
    "warnings": [
      "Could not find the table 'public.products' in the schema cache",
      "Missing flow rate",
      "Missing pressure rating"
    ]
  },
  {
    "source_url": "https://alkota.com/products/industrial-parts-washers/parts-washers-front-load-swing-out/",
    "model": "812A",
    "category": "parts-washer",
    "status": "warning",
    "specs_count": 17,
    "has_image": true,
    "has_pdf": true,
    "warnings": [
      "Could not find the table 'public.products' in the schema cache",
      "Missing flow rate",
      "Missing pressure rating"
    ]
  },
  {
    "source_url": "https://alkota.com/products/industrial-parts-washers/parts-washers-front-load-swing-out/",
    "model": "812B",
    "category": "parts-washer",
    "status": "warning",
    "specs_count": 17,
    "has_image": true,
    "has_pdf": true,
    "warnings": [
      "Could not find the table 'public.products' in the schema cache",
      "Missing flow rate",
      "Missing pressure rating"
    ]
  },
  {
    "source_url": "https://alkota.com/products/industrial-parts-washers/parts-washers-front-load-swing-out/",
    "model": "812C",
    "category": "parts-washer",
    "status": "warning",
    "specs_count": 17,
    "has_image": true,
    "has_pdf": true,
    "warnings": [
      "Could not find the table 'public.products' in the schema cache",
      "Missing flow rate",
      "Missing pressure rating"
    ]
  },
  {
    "source_url": "https://alkota.com/products/industrial-parts-washers/parts-washers-top-load/",
    "model": "110",
    "category": "parts-washer",
    "status": "warning",
    "specs_count": 23,
    "has_image": true,
    "has_pdf": true,
    "warnings": [
      "Could not find the table 'public.products' in the schema cache",
      "Missing flow rate",
      "Missing pressure rating"
    ]
  },
  {
    "source_url": "https://alkota.com/products/industrial-parts-washers/parts-washers-top-load/",
    "model": "AL2424",
    "category": "parts-washer",
    "status": "warning",
    "specs_count": 23,
    "has_image": true,
    "has_pdf": true,
    "warnings": [
      "Could not find the table 'public.products' in the schema cache",
      "Missing flow rate",
      "Missing pressure rating"
    ]
  },
  {
    "source_url": "https://alkota.com/products/industrial-parts-washers/products-parts-washer-rollout-turntable/",
    "model": "AL2735-RO",
    "category": "parts-washer",
    "status": "warning",
    "specs_count": 25,
    "has_image": true,
    "has_pdf": true,
    "warnings": [
      "Could not find the table 'public.products' in the schema cache",
      "Missing flow rate",
      "Missing pressure rating"
    ]
  },
  {
    "source_url": "https://alkota.com/products/industrial-parts-washers/products-parts-washer-rollout-turntable/",
    "model": "AL3640-RO",
    "category": "parts-washer",
    "status": "warning",
    "specs_count": 25,
    "has_image": true,
    "has_pdf": true,
    "warnings": [
      "Could not find the table 'public.products' in the schema cache",
      "Missing flow rate",
      "Missing pressure rating"
    ]
  },
  {
    "source_url": "https://alkota.com/products/industrial-parts-washers/products-parts-washer-rollout-turntable/",
    "model": "AL4054-RO",
    "category": "parts-washer",
    "status": "warning",
    "specs_count": 25,
    "has_image": true,
    "has_pdf": true,
    "warnings": [
      "Could not find the table 'public.products' in the schema cache",
      "Missing flow rate",
      "Missing pressure rating"
    ]
  },
  {
    "source_url": "https://alkota.com/products/industrial-parts-washers/products-parts-washer-rollout-turntable/",
    "model": "AL3030RBD",
    "category": "parts-washer",
    "status": "warning",
    "specs_count": 23,
    "has_image": true,
    "has_pdf": true,
    "warnings": [
      "Could not find the table 'public.products' in the schema cache",
      "Missing flow rate",
      "Missing pressure rating"
    ]
  },
  {
    "source_url": "https://alkota.com/products/industrial-parts-washers/products-parts-washer-rollout-turntable/",
    "model": "AL3048RBD",
    "category": "parts-washer",
    "status": "warning",
    "specs_count": 23,
    "has_image": true,
    "has_pdf": true,
    "warnings": [
      "Could not find the table 'public.products' in the schema cache",
      "Missing flow rate",
      "Missing pressure rating"
    ]
  },
  {
    "source_url": "https://alkota.com/products/pressure-washer-trailers/pressure-washer-trailers-single-and-tandem-axle/",
    "model": "20151",
    "category": "trailer",
    "status": "warning",
    "specs_count": 10,
    "has_image": true,
    "has_pdf": false,
    "warnings": [
      "Could not find the table 'public.products' in the schema cache",
      "Missing flow rate",
      "Missing pressure rating",
      "Missing PDF spec sheet"
    ]
  },
  {
    "source_url": "https://alkota.com/products/pressure-washer-trailers/pressure-washer-trailers-single-and-tandem-axle/",
    "model": "20152",
    "category": "trailer",
    "status": "warning",
    "specs_count": 10,
    "has_image": true,
    "has_pdf": false,
    "warnings": [
      "Could not find the table 'public.products' in the schema cache",
      "Missing flow rate",
      "Missing pressure rating",
      "Missing PDF spec sheet"
    ]
  },
  {
    "source_url": "https://alkota.com/products/pressure-washer-trailers/pressure-washer-trailers-single-and-tandem-axle/",
    "model": "20152C",
    "category": "trailer",
    "status": "warning",
    "specs_count": 10,
    "has_image": true,
    "has_pdf": false,
    "warnings": [
      "Could not find the table 'public.products' in the schema cache",
      "Missing flow rate",
      "Missing pressure rating",
      "Missing PDF spec sheet"
    ]
  },
  {
    "source_url": "https://alkota.com/products/pressure-washer-trailers/pressure-washer-trailers-single-and-tandem-axle/",
    "model": "20152K",
    "category": "trailer",
    "status": "warning",
    "specs_count": 9,
    "has_image": true,
    "has_pdf": false,
    "warnings": [
      "Could not find the table 'public.products' in the schema cache",
      "Missing flow rate",
      "Missing pressure rating",
      "Missing PDF spec sheet"
    ]
  },
  {
    "source_url": "https://alkota.com/products/pressure-washer-trailers/pressure-washer-trailers-single-and-tandem-axle/",
    "model": "20171",
    "category": "trailer",
    "status": "warning",
    "specs_count": 9,
    "has_image": true,
    "has_pdf": false,
    "warnings": [
      "Could not find the table 'public.products' in the schema cache",
      "Missing flow rate",
      "Missing pressure rating",
      "Missing PDF spec sheet"
    ]
  },
  {
    "source_url": "https://alkota.com/products/water-treatment-and-recovery-systems/evaporation-systems/",
    "model": "15/20-LP",
    "category": "water-treatment",
    "status": "warning",
    "specs_count": 7,
    "has_image": true,
    "has_pdf": true,
    "warnings": [
      "Could not find the table 'public.products' in the schema cache",
      "Missing flow rate",
      "Missing pressure rating"
    ]
  },
  {
    "source_url": "https://alkota.com/products/water-treatment-and-recovery-systems/evaporation-systems/",
    "model": "15/20-NG",
    "category": "water-treatment",
    "status": "warning",
    "specs_count": 7,
    "has_image": true,
    "has_pdf": true,
    "warnings": [
      "Could not find the table 'public.products' in the schema cache",
      "Missing flow rate",
      "Missing pressure rating"
    ]
  },
  {
    "source_url": "https://alkota.com/products/water-treatment-and-recovery-systems/pressure-washer-recycling-vacuum-filtration-system/",
    "model": "8-VFS-1",
    "category": "water-treatment",
    "status": "warning",
    "specs_count": 11,
    "has_image": true,
    "has_pdf": false,
    "warnings": [
      "Could not find the table 'public.products' in the schema cache",
      "Missing flow rate",
      "Missing pressure rating",
      "Missing PDF spec sheet"
    ]
  },
  {
    "source_url": "https://alkota.com/products/water-treatment-and-recovery-systems/water-treatment-systems/",
    "model": "CSF-5",
    "category": "water-treatment",
    "status": "warning",
    "specs_count": 18,
    "has_image": true,
    "has_pdf": true,
    "warnings": [
      "Could not find the table 'public.products' in the schema cache",
      "Missing flow rate",
      "Missing pressure rating"
    ]
  },
  {
    "source_url": "https://alkota.com/products/water-treatment-and-recovery-systems/water-treatment-systems/",
    "model": "CSF-10",
    "category": "water-treatment",
    "status": "warning",
    "specs_count": 18,
    "has_image": true,
    "has_pdf": true,
    "warnings": [
      "Could not find the table 'public.products' in the schema cache",
      "Missing flow rate",
      "Missing pressure rating"
    ]
  }
]
```

---

## Next Steps for UK Editorial Review
1. Review machines flagged with missing UK 230V/400V specifications.
2. Confirm stock availability with UK distribution centre before marking `featured`.
3. Add UK-specific case studies and application photography where available.
