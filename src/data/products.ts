// Product images
import hotWater from "@/assets/products/hot-water-pressure-washer.png";
import hwAx4 from "@/assets/products/hw-ax4-belt-drive.png";
import hwX4 from "@/assets/products/hw-x4-belt-drive.png";
import hwXd4 from "@/assets/products/hot-water-pressure-washer.png";
import hwGasFiredX4 from "@/assets/products/hw-gas-fired-x4.png";
import hwGasFiredStationary from "@/assets/products/hw-gas-fired-stationary.png";
import hwGedNarrow from "@/assets/products/hw-ged-narrow.png";

import coldWater from "@/assets/products/cold-water-pressure-washer.png";

import steamCleaner from "@/assets/products/steam-cleaner.png";
import steamOilFired from "@/assets/products/steam-oil-fired.png";
import steamGasFired from "@/assets/products/steam-gas-fired.png";

import trailer from "@/assets/products/pressure-washer-trailer.png";

import partsWasher from "@/assets/products/parts-washer.png";

import spaceHeater from "@/assets/products/space-heater.png";

import waterTreatment from "@/assets/products/water-treatment.png";
import waterMediaFiltration from "@/assets/products/water-media-filtration.png";
import waterEvaporator from "@/assets/products/water-evaporator.png";

export interface ProductModel {
  name: string;
  gpm: string;
  psi: string;
  powerSource: string;
  heatingFuel?: string;
  configuration: string;
}

export interface ProductSeries {
  name: string;
  image: string;
  specs: Record<string, string>;
  highlights: string[];
  models?: ProductModel[];
}

export interface ProductCategory {
  slug: string;
  title: string;
  subtitle: string;
  heroImage: string;
  description: string;
  extendedDescription?: string;
  series: ProductSeries[];
}

export const productCategories: ProductCategory[] = [
  {
    slug: "hot-water-pressure-washers",
    title: "Hot Water Pressure Washers",
    subtitle: "Clear Away Grease & Oil Fast",
    heroImage: hotWater,
    description:
      "Hot water pressure washing equipment powers through stubborn grease, dirt, and oil, letting you finish commercial and industrial cleaning jobs quickly. Heated with diesel, kerosene, home heating oil, liquid propane, or natural gas, hot power washers eliminate stubborn deposits with high-pressure heated water.",
    extendedDescription:
      "Explore our complete range of hot water pressure washers — from compact electric-driven units to heavy-duty gas engine models. Every Alkota hot water pressure washer is built with serviceability and longevity in mind.",
    series: [
      {
        name: "Gas Fired Series",
        image: hwGasFiredStationary,
        specs: {
          "GPM": "3–8",
          "PSI": "1,800–5,000",
          "Power Source": "230V Electric",
          "Heating Fuel": "Gas (LP or NG)",
          "Configuration": "Stationary",
        },
        highlights: ["Clean burning LP or NG", "Stationary installation", "High output range"],
        models: [
          { name: "Gas Fired 8251", gpm: "8", psi: "2,500", powerSource: "230V", heatingFuel: "Gas (LP or NG)", configuration: "Stationary" },
          { name: "Gas Fired 7301", gpm: "7", psi: "3,000", powerSource: "230V", heatingFuel: "Gas (LP or NG)", configuration: "Stationary" },
          { name: "Gas Fired 5501", gpm: "5", psi: "5,000", powerSource: "230V", heatingFuel: "Gas (LP or NG)", configuration: "Stationary" },
          { name: "Gas Fired 5401", gpm: "5", psi: "4,000", powerSource: "230V", heatingFuel: "Gas (LP or NG)", configuration: "Stationary" },
          { name: "Gas Fired 5231", gpm: "5", psi: "2,300", powerSource: "230V", heatingFuel: "Gas (LP or NG)", configuration: "Stationary" },
          { name: "Gas Fired 5181", gpm: "5", psi: "1,800", powerSource: "230V", heatingFuel: "Gas (LP or NG)", configuration: "Stationary" },
          { name: "Gas Fired 4231", gpm: "4", psi: "2,300", powerSource: "230V", heatingFuel: "Gas (LP or NG)", configuration: "Stationary" },
          { name: "Gas Fired 4181", gpm: "4", psi: "1,800", powerSource: "230V", heatingFuel: "Gas (LP or NG)", configuration: "Stationary" },
          { name: "Gas Fired 3301", gpm: "3", psi: "3,000", powerSource: "230V", heatingFuel: "Gas (LP or NG)", configuration: "Stationary" },
          { name: "Gas Fired 3241", gpm: "3", psi: "2,400", powerSource: "230V", heatingFuel: "Gas (LP or NG)", configuration: "Stationary" },
        ],
      },
      {
        name: "Gas Fired X4 Series",
        image: hwGasFiredX4,
        specs: {
          "GPM": "2–3.5",
          "PSI": "1,000–3,000",
          "Power Source": "115V or 230V",
          "Heating Fuel": "Gas (LP or NG)",
          "Configuration": "Portable",
        },
        highlights: ["Clean burning LP or NG", "Electric motor driven", "Portable frame"],
        models: [
          { name: "Gas Fired X4 3301", gpm: "3", psi: "3,000", powerSource: "230V", heatingFuel: "Gas (LP or NG)", configuration: "Portable" },
          { name: "Gas Fired X4 3241", gpm: "3", psi: "2,400", powerSource: "230V", heatingFuel: "Gas (LP or NG)", configuration: "Portable" },
          { name: "Gas Fired X4 3201", gpm: "3", psi: "2,000", powerSource: "115V", heatingFuel: "Gas (LP or NG)", configuration: "Portable" },
          { name: "Gas Fired X4 2241", gpm: "2", psi: "2,400", powerSource: "115V", heatingFuel: "Gas (LP or NG)", configuration: "Portable" },
          { name: "Gas Fired X4 2201", gpm: "2", psi: "2,000", powerSource: "115V", heatingFuel: "Gas (LP or NG)", configuration: "Portable" },
          { name: "Gas Fired X4 2101", gpm: "2", psi: "1,000", powerSource: "115V", heatingFuel: "Gas (LP or NG)", configuration: "Portable" },
        ],
      },
      {
        name: "AX4 Belt Drive Series",
        image: hwAx4,
        specs: {
          "GPM": "2–3.5",
          "PSI": "1,000–2,400",
          "Power Source": "115V or 230V",
          "Heating Fuel": "Oil (Diesel / Kerosene)",
          "Configuration": "Portable",
        },
        highlights: ["Compact electric driven", "Oil fired heat", "Belt drive pump"],
        models: [
          { name: "AX4 3524", gpm: "3.5", psi: "2,400", powerSource: "230V", heatingFuel: "Oil", configuration: "Portable" },
          { name: "AX4 3520", gpm: "3.5", psi: "2,000", powerSource: "230V", heatingFuel: "Oil", configuration: "Portable" },
          { name: "AX4 3024", gpm: "3", psi: "2,400", powerSource: "230V", heatingFuel: "Oil", configuration: "Portable" },
          { name: "AX4 3020", gpm: "3", psi: "2,000", powerSource: "115V", heatingFuel: "Oil", configuration: "Portable" },
          { name: "AX4 2424", gpm: "2.1", psi: "2,400", powerSource: "115V", heatingFuel: "Oil", configuration: "Portable" },
          { name: "AX4 2015", gpm: "2", psi: "1,500", powerSource: "115V", heatingFuel: "Oil", configuration: "Portable" },
          { name: "AX4 2010", gpm: "2", psi: "1,000", powerSource: "115V", heatingFuel: "Oil", configuration: "Portable" },
        ],
      },
      {
        name: "X4 Belt Drive Series",
        image: hwX4,
        specs: {
          "GPM": "2–4.8",
          "PSI": "1,000–3,500",
          "Power Source": "230V or 230–460V",
          "Heating Fuel": "Oil (Diesel / Kerosene)",
          "Configuration": "Portable",
        },
        highlights: ["Electric driven", "Oil fired heat", "Heavy-duty belt drive"],
        models: [
          { name: "X4 4835", gpm: "4.8", psi: "3,500", powerSource: "230–460V", heatingFuel: "Oil", configuration: "Portable" },
          { name: "X4 4530", gpm: "4.5", psi: "3,000", powerSource: "230–460V", heatingFuel: "Oil", configuration: "Portable" },
          { name: "X4 4030", gpm: "4", psi: "3,000", powerSource: "230V", heatingFuel: "Oil", configuration: "Portable" },
          { name: "X4 4025", gpm: "4", psi: "2,500", powerSource: "230V", heatingFuel: "Oil", configuration: "Portable" },
          { name: "X4 3530", gpm: "3.5", psi: "3,000", powerSource: "230V", heatingFuel: "Oil", configuration: "Portable" },
          { name: "X4 3525", gpm: "3.5", psi: "2,500", powerSource: "230V", heatingFuel: "Oil", configuration: "Portable" },
          { name: "X4 3030", gpm: "3", psi: "3,000", powerSource: "230V", heatingFuel: "Oil", configuration: "Portable" },
          { name: "X4 3025", gpm: "3", psi: "2,500", powerSource: "230V", heatingFuel: "Oil", configuration: "Portable" },
          { name: "X4 2020", gpm: "2", psi: "2,000", powerSource: "115V", heatingFuel: "Oil", configuration: "Portable" },
          { name: "X4 2010", gpm: "2", psi: "1,000", powerSource: "115V", heatingFuel: "Oil", configuration: "Portable" },
        ],
      },
      {
        name: "XD4 Direct Drive Series",
        image: hwXd4,
        specs: {
          "GPM": "3–4",
          "PSI": "2,500–4,000",
          "Power Source": "Gas Engine (Honda)",
          "Heating Fuel": "Oil (Diesel / Kerosene)",
          "Configuration": "Portable",
        },
        highlights: ["Honda powered", "Oil fired heat", "Direct drive pump"],
        models: [
          { name: "XD4 4040", gpm: "4", psi: "4,000", powerSource: "Gas Engine", heatingFuel: "Oil", configuration: "Portable" },
          { name: "XD4 4035", gpm: "4", psi: "3,500", powerSource: "Gas Engine", heatingFuel: "Oil", configuration: "Portable" },
          { name: "XD4 4030", gpm: "4", psi: "3,000", powerSource: "Gas Engine", heatingFuel: "Oil", configuration: "Portable" },
          { name: "XD4 3530", gpm: "3.5", psi: "3,000", powerSource: "Gas Engine", heatingFuel: "Oil", configuration: "Portable" },
          { name: "XD4 3525", gpm: "3.5", psi: "2,500", powerSource: "Gas Engine", heatingFuel: "Oil", configuration: "Portable" },
          { name: "XD4 3030", gpm: "3", psi: "3,000", powerSource: "Gas Engine", heatingFuel: "Oil", configuration: "Portable" },
        ],
      },
      {
        name: "GED-EN Extra Narrow Series",
        image: hwGedNarrow,
        specs: {
          "GPM": "4–9.5",
          "PSI": "2,000–4,000",
          "Power Source": "Gas Engine",
          "Heating Fuel": "Oil (Diesel / Kerosene)",
          "Configuration": "Portable or Stationary",
        },
        highlights: ["Extra narrow frame", "Gas engine driven", "High GPM output"],
        models: [
          { name: "GED-EN 5040", gpm: "5", psi: "4,000", powerSource: "Gas Engine", heatingFuel: "Oil", configuration: "Portable" },
          { name: "GED-EN 5035", gpm: "5", psi: "3,500", powerSource: "Gas Engine", heatingFuel: "Oil", configuration: "Portable" },
          { name: "GED-EN 5030", gpm: "5", psi: "3,000", powerSource: "Gas Engine", heatingFuel: "Oil", configuration: "Portable" },
          { name: "GED-EN 4530", gpm: "4.5", psi: "3,000", powerSource: "Gas Engine", heatingFuel: "Oil", configuration: "Portable" },
          { name: "GED-EN 4030", gpm: "4", psi: "3,000", powerSource: "Gas Engine", heatingFuel: "Oil", configuration: "Portable" },
          { name: "GED-EN 4020", gpm: "4", psi: "2,000", powerSource: "Gas Engine", heatingFuel: "Oil", configuration: "Portable" },
        ],
      },
    ],
  },
  {
    slug: "cold-water-pressure-washers",
    title: "Cold Water Pressure Washers",
    subtitle: "The Toughest in the Industry",
    heroImage: coldWater,
    description:
      "Cold water pressure washers by Alkota are the toughest, most reliable cold pressure washers in the industry. Built for demanding commercial and industrial applications where hot water isn't required.",
    extendedDescription:
      "Available in gasoline and electric powered configurations with a wide range of GPM and PSI ratings. From compact portable units to heavy-duty wash bay and wash cannon systems.",
    series: [
      {
        name: "SM Gasoline Series",
        image: coldWater,
        specs: {
          "GPM": "2–4",
          "PSI": "Up to 4,000",
          "Power Source": "Gasoline Engine",
          "Configuration": "Portable",
        },
        highlights: ["Honda powered", "Portable design", "Commercial grade"],
      },
      {
        name: "S Series Electric",
        image: coldWater,
        specs: {
          "GPM": "2–5",
          "PSI": "Up to 3,000",
          "Power Source": "Electric (230V / 460V)",
          "Configuration": "Stationary",
        },
        highlights: ["Electric motor driven", "Wall mount option", "Quiet operation"],
      },
      {
        name: "Wash Bay Series",
        image: coldWater,
        specs: {
          "GPM": "3–10",
          "PSI": "Up to 2,500",
          "Power Source": "Electric",
          "Configuration": "Stationary",
        },
        highlights: ["Multi-bay capable", "Coin/token operated options", "Heavy-duty pump"],
      },
    ],
  },
  {
    slug: "steam-cleaners",
    title: "Steam & Dry Steam Cleaners",
    subtitle: "Powerful Cleaning, Gentle on Surfaces",
    heroImage: steamCleaner,
    description:
      "Steam cleaning gives you powerful grime-moving steam while keeping the pressure low for gentle cleaning on surfaces that need more care. Beyond cleaning, steam is perfect for curing, disinfecting surfaces quickly, detailing engine compartments, and more.",
    extendedDescription:
      "Steam cleaners use temperature-controlled steam (300–350°F) at lower pressures (250–400 PSI) to clear away grease, oil, and contaminants without damaging surfaces. Perfect for sterilizing, disinfecting, de-icing, and flushing chemicals.",
    series: [
      {
        name: "Oil Fired Steam Cleaners",
        image: steamOilFired,
        specs: {
          "GPH": "120–240",
          "PSI": "Up to 400",
          "Power Source": "115V",
          "Heating Fuel": "Oil (Diesel / Kerosene)",
          "Configuration": "Portable",
        },
        highlights: ["Temperature controlled steam", "Portable design", "300–350°F operating temp"],
      },
      {
        name: "Gas Fired Steam Cleaners",
        image: steamGasFired,
        specs: {
          "GPH": "180–400",
          "PSI": "Up to 400",
          "Power Source": "115V & 230V",
          "Heating Fuel": "Natural Gas or LP",
          "Configuration": "Stationary",
        },
        highlights: ["Clean burning fuel", "High volume output", "Stationary installation"],
      },
      {
        name: "Dry Steam Generators",
        image: steamCleaner,
        specs: {
          "GPM": "1",
          "PSI": "100",
          "Power Source": "115V & 230V",
          "Heating Fuel": "Oil (Diesel / Kerosene)",
          "Configuration": "Portable",
        },
        highlights: ["Minimal moisture output", "Sanitizing capability", "Compact design"],
      },
    ],
  },
  {
    slug: "pressure-washer-trailers",
    title: "Pressure Washer Trailers",
    subtitle: "High Pressure Cleaning on the Move",
    heroImage: trailer,
    description:
      "With a trailer-mounted power washer, water tank, and hose reels, our pressure washer trailers are right at home in demanding industrial and commercial cleaning environments like oil fields, military bases, farms, and ranches.",
    extendedDescription:
      "A welded tubular frame ensures durability, and our customization options allow versatile tailoring to specific cleaning needs. These self-contained industrial cleaning machines let you take your pressure washing equipment directly to your cleaning site, no matter how remote. Featuring DOT-approved running lights with all wiring routed through the trailer frame to eliminate damage.",
    series: [
      {
        name: "Single Axle Trailers",
        image: trailer,
        specs: {
          "Frame": "Tubular Steel Construction",
          "Finish": "Powder Coated",
          "Lights": "DOT-Approved",
          "Configuration": "Single Axle",
        },
        highlights: ["Made in USA", "Customize with hot or cold water washers", "Water storage options"],
      },
      {
        name: "Tandem Axle Trailers",
        image: trailer,
        specs: {
          "Frame": "Tubular Steel Construction",
          "Finish": "Powder Coated",
          "Lights": "DOT-Approved",
          "Configuration": "Tandem Axle",
        },
        highlights: ["Heavy-duty capacity", "Multiple hose reels", "Full customization"],
      },
    ],
  },
  {
    slug: "parts-washers",
    title: "Industrial Parts Washers",
    subtitle: "Clean Parts in Minutes",
    heroImage: partsWasher,
    description:
      "Parts washers by Alkota save you time and money cleaning your parts in just minutes. Put your parts on the turntable, close the door and set the timer. Come back in a few minutes and your parts will be grease and oil free.",
    extendedDescription:
      "Alkota aqueous parts washers operate with hot water and biodegradable detergents, eliminating the need for damaging solvents and aerosol cleaners. Available in front load swing-out and top load configurations.",
    series: [
      {
        name: "Model 112",
        image: partsWasher,
        specs: {
          "Solution Capacity": "50 gal",
          "Turntable Load Limit": "500 lbs",
          "Turntable Diameter": "26 in",
          "Pump Flow Rate": "50 GPM at 45 PSI",
          "Motor Power": "3 HP",
          "Heater Power": "6 kW",
          "Load Type": "Front Load",
          "Weight": "1,100 lbs",
        },
        highlights: ["Compact design", "Parts basket included", "Insulated cabinet"],
      },
      {
        name: "Model 412",
        image: partsWasher,
        specs: {
          "Solution Capacity": "70 gal",
          "Turntable Load Limit": "800 lbs",
          "Turntable Diameter": "26 in",
          "Pump Flow Rate": "90 GPM at 60 PSI",
          "Motor Power": "5 HP",
          "Heater Power": "12 kW",
          "Load Type": "Front Load",
          "Weight": "1,500 lbs",
        },
        highlights: ["Mid-size capacity", "Higher flow rate", "Optional rinse cycle"],
      },
      {
        name: "Model 612",
        image: partsWasher,
        specs: {
          "Solution Capacity": "120 gal",
          "Turntable Load Limit": "1,000 lbs",
          "Turntable Diameter": "36 in",
          "Pump Flow Rate": "110 GPM at 60 PSI",
          "Motor Power": "7.5 HP",
          "Heater Power": "12 kW",
          "Load Type": "Front Load",
          "Weight": "1,850 lbs",
        },
        highlights: ["Large capacity", "36-inch turntable", "Heavy-duty motor"],
      },
      {
        name: "Model 812A",
        image: partsWasher,
        specs: {
          "Solution Capacity": "225 gal",
          "Turntable Load Limit": "1,500 lbs",
          "Turntable Diameter": "36 in",
          "Pump Flow Rate": "190 GPM at 65 PSI",
          "Motor Power": "15 HP",
          "Heater Power": "18 kW",
          "Load Type": "Front Load",
          "Weight": "2,800 lbs",
        },
        highlights: ["Industrial capacity", "15 HP motor", "High flow rate"],
      },
    ],
  },
  {
    slug: "space-heaters",
    title: "Space Heaters",
    subtitle: "Industrial Heating Solutions",
    heroImage: spaceHeater,
    description:
      "Alkota delivers the heat with forced air and infrared space heaters. Keep the job site toasty year-round with one of our oil-fired industrial space heaters.",
    series: [
      {
        name: "Forced Air Heaters",
        image: spaceHeater,
        specs: {
          "Fuel": "Diesel / Kerosene",
          "Type": "Forced Air",
          "Application": "Industrial / Commercial",
        },
        highlights: ["Rapid heating", "Portable design", "Oil fired"],
      },
      {
        name: "Infrared Heaters",
        image: spaceHeater,
        specs: {
          "Fuel": "Diesel / Kerosene",
          "Type": "Infrared Radiant",
          "Application": "Industrial / Commercial",
        },
        highlights: ["Radiant heat", "Efficient operation", "Zone heating"],
      },
    ],
  },
  {
    slug: "water-treatment",
    title: "Water Treatment",
    subtitle: "Environmental Compliance Solutions",
    heroImage: waterTreatment,
    description:
      "Water treatment and recovery systems from Alkota help you comply with most federal and state regulations that prohibit discarding wash water into sewers and streams.",
    extendedDescription:
      "From on-site filtration systems and evaporators to vacuum filtration systems for mobile power washing applications, Alkota has you covered. We also offer containment mats and tools to make your recovery process as easy as possible.",
    series: [
      {
        name: "Vacuum Filtration System (VFS)",
        image: waterTreatment,
        specs: {
          "Capacity": "5 GPM",
          "Design": "Small & Compact",
          "Feature": "Multiple Phase Separation",
          "Configuration": "Portable or Stationary",
        },
        highlights: ["Portable design", "Easy to service", "Minimizes disposal cost"],
      },
      {
        name: "Media Filtration System (CSF-10)",
        image: waterMediaFiltration,
        specs: {
          "Capacity": "10 GPM",
          "Sand Capacity": "300 lbs",
          "Maintenance": "Low",
        },
        highlights: ["Low maintenance", "Affordable", "Environmental compliance"],
      },
      {
        name: "Evaporation System",
        image: waterEvaporator,
        specs: {
          "Fuel": "LP or Natural Gas",
          "Operation": "Clean Burning",
          "Noise": "Quiet",
        },
        highlights: ["Evaporates bulk wastewater", "Clean burning", "Use almost anywhere"],
      },
    ],
  },
];
