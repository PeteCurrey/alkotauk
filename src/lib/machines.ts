export interface MachineData {
  id: string;
  name: string;
  series: string;
  type: 'hot-water' | 'cold-water' | 'steam' | 'trailer' | 'van-pack' | 'parts-washers' | 'wash-plants';
  specs: {
    pressureBar: string;
    flowLPM: string;
    powerSource: string;
    fuelType: string;
    driveType: string;
    motorKW: string;
    weightKG: string;
    coilWarranty: string;
    certifications: string;
    mobility: string;
    voltageOptions: string;
    idealApplication: string;
    engine?: string;
  };
  highlights: string[];
  slug: string;
  description: string;
}

export const MACHINES: MachineData[] = [
  // --- SERIES 1: AX4 BELT DRIVE (COMPACT ELECTRIC) ---
  {
    id: "216ax4",
    name: "Alkota 216AX4",
    series: "AX4 Series — Compact Electric",
    type: "hot-water",
    specs: {
      pressureBar: "110",
      flowLPM: "7.6",
      powerSource: "115V / 1PH / 20A Electric",
      fuelType: "Diesel / Kerosene",
      driveType: "Belt Drive",
      motorKW: "1.5",
      weightKG: "145",
      coilWarranty: "7 Years",
      certifications: "ETL / UL-1776",
      mobility: "Portable (4-Wheel)",
      voltageOptions: "115V",
      idealApplication: "Schools, wash bays, workshops where space is tight"
    },
    highlights: ["Compact space-saving design", "UL-1776 Certified", "Triplex ceramic plunger pump"],
    slug: "/machines/hot-water/216ax4",
    description: "The compact 115V entry point. Saves space and money without compromising on Alkota quality."
  },
  {
    id: "420ax4",
    name: "Alkota 420AX4",
    series: "AX4 Series — Compact Electric",
    type: "hot-water",
    specs: {
      pressureBar: "138",
      flowLPM: "13.2",
      powerSource: "230V / 1PH Electric",
      fuelType: "Diesel / Kerosene",
      driveType: "Belt Drive",
      motorKW: "4.0",
      weightKG: "165",
      coilWarranty: "7 Years",
      certifications: "CE / UKCA",
      mobility: "Portable (4-Wheel)",
      voltageOptions: "230V",
      idealApplication: "Agricultural buildings and small fleet operations"
    },
    highlights: ["High flow compact unit", "Belt drive durability", "Industrial heat output"],
    slug: "/machines/hot-water/420ax4",
    description: "230V compact belt drive. The step up from the 216 with 75% more flow."
  },

  // --- SERIES 2: X4 BELT DRIVE (THE WORKHORSE) ---
  {
    id: "216x4",
    name: "Alkota 216X4",
    series: "X4 Series — The Industry Standard",
    type: "hot-water",
    specs: {
      pressureBar: "110",
      flowLPM: "7.6",
      powerSource: "115V / 1PH / 20A Electric",
      fuelType: "Diesel / Kerosene",
      driveType: "Belt Drive",
      motorKW: "1.5",
      weightKG: "160",
      coilWarranty: "7 Years",
      certifications: "CE / UKCA",
      mobility: "Portable (4-Wheel)",
      voltageOptions: "115V",
      idealApplication: "Professional low-flow cleaning"
    },
    highlights: ["Industry standard frame", "Ultra-reliable belt drive", "Easy maintenance access"],
    slug: "/machines/hot-water/216x4",
    description: "The compact belt drive classic. Cooler, quieter, and longer-lived than direct drive equivalents."
  },
  {
    id: "420x4",
    name: "Alkota 420X4",
    series: "X4 Series — The Industry Standard",
    type: "hot-water",
    specs: {
      pressureBar: "138",
      flowLPM: "13.6",
      powerSource: "Electric",
      fuelType: "Diesel / Kerosene",
      driveType: "Belt Drive",
      motorKW: "4.0",
      weightKG: "245",
      coilWarranty: "7 Years",
      certifications: "CE / UKCA",
      mobility: "Portable (4-Wheel)",
      voltageOptions: "400V 3-Phase",
      idealApplication: "The best-selling industrial hot water machine"
    },
    highlights: ["Market leading durability", "High-efficiency burner", "Heavy duty 4-wheel chassis"],
    slug: "/machines/hot-water/420x4",
    description: "The industry workhorse. Designed for sustained professional use in the toughest environments."
  },
  {
    id: "430xm4",
    name: "Alkota 430XM4",
    series: "X4 Series — The Industry Standard",
    type: "hot-water",
    specs: {
      pressureBar: "207",
      flowLPM: "14.4",
      powerSource: "230V / 1PH / 40A Electric",
      fuelType: "Diesel / Kerosene",
      driveType: "Belt Drive",
      motorKW: "5.5",
      weightKG: "265",
      coilWarranty: "7 Years",
      certifications: "CE / UKCA",
      mobility: "Portable (4-Wheel)",
      voltageOptions: "230V Single-Phase",
      idealApplication: "Heavy duty single-phase cleaning"
    },
    highlights: ["3,000 PSI output", "Anti-corrosive poly float tank", "Rugged construction"],
    slug: "/machines/hot-water/430xm4",
    description: "Maximum performance on a single-phase supply. 3,000 PSI belt drive power."
  },
  {
    id: "480x4",
    name: "Alkota 480X4",
    series: "X4 Series — The Industry Standard",
    type: "hot-water",
    specs: {
      pressureBar: "207",
      flowLPM: "18.2",
      powerSource: "230V / 3PH Electric",
      fuelType: "Diesel / Kerosene",
      driveType: "Belt Drive",
      motorKW: "7.5",
      weightKG: "280",
      coilWarranty: "7 Years",
      certifications: "CE / UKCA",
      mobility: "Portable (4-Wheel)",
      voltageOptions: "230V 3-Phase",
      idealApplication: "Fixed installations requiring maximum throughput"
    },
    highlights: ["High-flow 3-phase power", "Precision temperature control", "Built for continuous duty"],
    slug: "/machines/hot-water/480x4",
    description: "The high-flow 3-phase electric X4. Engineered for maximum throughput on 3-phase supply."
  },

  // --- SERIES 3: XD4 DIRECT DRIVE (GAS ENGINE) ---
  {
    id: "3305xd4",
    name: "Alkota 3305XD4",
    series: "XD4 Series — Gas Engine Direct Drive",
    type: "hot-water",
    specs: {
      pressureBar: "207",
      flowLPM: "11.4",
      powerSource: "Honda GX270",
      fuelType: "Petrol / Diesel Burner",
      driveType: "Direct Drive",
      motorKW: "9 HP",
      weightKG: "185",
      coilWarranty: "7 Years",
      certifications: "CE / UKCA",
      mobility: "Portable (4-Wheel)",
      voltageOptions: "N/A",
      idealApplication: "Mobile cleaning without mains power"
    },
    highlights: ["Honda GX270 Reliability", "Compact portable frame", "Schedule 80 Coil"],
    slug: "/machines/hot-water/3305xd4",
    description: "Honda-powered independence. 3,000 PSI direct drive performance in a portable package."
  },
  {
    id: "3405xd4",
    name: "Alkota 3405XD4",
    series: "XD4 Series — Gas Engine Direct Drive",
    type: "hot-water",
    specs: {
      pressureBar: "276",
      flowLPM: "11.4",
      powerSource: "Honda GX270",
      fuelType: "Petrol / Diesel Burner",
      driveType: "Direct Drive",
      motorKW: "9 HP",
      weightKG: "190",
      coilWarranty: "7 Years",
      certifications: "CE / UKCA",
      mobility: "Portable (4-Wheel)",
      voltageOptions: "N/A",
      idealApplication: "Independent high-pressure washing"
    },
    highlights: ["4,000 PSI cleaning power", "Honda GX engine", "Rugged industrial pump"],
    slug: "/machines/hot-water/3405xd4",
    description: "The high-pressure specialist. 4,000 PSI output for the most stubborn industrial grime."
  },
  {
    id: "4305xd4",
    name: "Alkota 4305XD4",
    series: "XD4 Series — Gas Engine Direct Drive",
    type: "hot-water",
    specs: {
      pressureBar: "207",
      flowLPM: "15.1",
      powerSource: "Honda GX390",
      fuelType: "Petrol / Diesel Burner",
      driveType: "Direct Drive",
      motorKW: "13 HP",
      weightKG: "205",
      coilWarranty: "7 Years",
      certifications: "CE / UKCA",
      mobility: "Portable (4-Wheel)",
      voltageOptions: "N/A",
      idealApplication: "Commercial mobile wash down"
    },
    highlights: ["High-flow Honda GX390", "Reliable direct drive", "Fast temperature rise"],
    slug: "/machines/hot-water/4305xd4",
    description: "4 GPM flow for fast rinsing and thorough cleaning. The versatile mobile workhorse."
  },
  {
    id: "4405xd4",
    name: "Alkota 4405XD4",
    series: "XD4 Series — Gas Engine Direct Drive",
    type: "hot-water",
    specs: {
      pressureBar: "276",
      flowLPM: "15.1",
      powerSource: "Honda GX390 Electric Start",
      fuelType: "Petrol Engine / Diesel Burner",
      driveType: "Direct Drive",
      motorKW: "13 HP",
      weightKG: "210",
      coilWarranty: "7 Years",
      certifications: "CE / UKCA",
      mobility: "Portable (4-Wheel)",
      voltageOptions: "12V Battery (Starter)",
      idealApplication: "Contract cleaning & professional mobile work"
    },
    highlights: ["Honda GX390 Electric Start", "4,000 PSI @ 4 GPM", "Self-contained power"],
    slug: "/machines/hot-water/4405xd4",
    description: "The flagship XD4. Electric start Honda engine with massive 4,000 PSI cleaning force."
  },

  // --- SERIES 4: GED EXTRA NARROW (GAS/DIESEL ENGINE) ---
  {
    id: "5355ens",
    name: "Alkota 5355ENS",
    series: "GED Series — Extra Narrow Frame",
    type: "hot-water",
    specs: {
      pressureBar: "241",
      flowLPM: "18.9",
      powerSource: "Vanguard 18HP Electric Start",
      fuelType: "Petrol Engine / Diesel Burner",
      driveType: "Belt Drive",
      motorKW: "18 HP",
      weightKG: "285",
      coilWarranty: "7 Years",
      certifications: "CE / UKCA",
      mobility: "Portable or Stationary",
      voltageOptions: "12V Battery (Starter)",
      idealApplication: "Trailer and van mounting"
    },
    highlights: ["18HP Vanguard power", "Sustained all-day operation", "Extra narrow frame"],
    slug: "/machines/hot-water/5355ens",
    description: "The high-volume portable choice. Belt-driven for sustained professional operation."
  },
  {
    id: "5355j",
    name: "Alkota 5355J",
    series: "GED Series — Extra Narrow Frame",
    type: "hot-water",
    specs: {
      pressureBar: "241",
      flowLPM: "18.9",
      powerSource: "Honda GX630 Electric Start",
      fuelType: "Petrol",
      driveType: "Belt Drive",
      motorKW: "13 HP",
      weightKG: "240",
      coilWarranty: "7 Years",
      certifications: "CE / UKCA",
      mobility: "Portable (4-Wheel)",
      voltageOptions: "N/A",
      idealApplication: "Industrial wash down & fleet maintenance"
    },
    highlights: ["Honda GX630 power", "Reliable belt drive", "High heat capacity"],
    slug: "/machines/hot-water/5355j",
    description: "Proven Honda power in the extra-narrow GED configuration. Built for the long haul."
  },
  {
    id: "5357c",
    name: "Alkota 5357C",
    series: "GED Series — Extra Narrow Frame",
    type: "hot-water",
    specs: {
      pressureBar: "241",
      flowLPM: "17.8",
      powerSource: "Kubota Z602 Diesel Engine",
      fuelType: "Diesel (Single Fuel)",
      driveType: "Belt Drive",
      motorKW: "14 HP",
      weightKG: "340",
      coilWarranty: "7 Years",
      certifications: "CE / UKCA",
      mobility: "Portable (4-Wheel)",
      voltageOptions: "12V Battery (Starter)",
      idealApplication: "Remote sites & single-fuel logistics"
    },
    highlights: ["Kubota liquid cooled diesel", "Single fuel simplicity", "Engineered for remote sites"],
    slug: "/machines/hot-water/5357c",
    description: "Single fuel diesel operation. Simplified logistics for remote site cleaning."
  },
  {
    id: "8405hnl",
    name: "Alkota 8405HNL",
    series: "GED Series — Extra Narrow Frame",
    type: "hot-water",
    specs: {
      pressureBar: "276",
      flowLPM: "30.3",
      powerSource: "Honda GX800 EFI",
      fuelType: "Petrol / Diesel Burner",
      driveType: "Belt Drive",
      motorKW: "25 HP",
      weightKG: "395",
      coilWarranty: "7 Years",
      certifications: "CE / UKCA",
      mobility: "Portable (4-Wheel)",
      voltageOptions: "12V Battery",
      idealApplication: "Mining, oil & gas, high-volume fleet"
    },
    highlights: ["25HP Honda EFI power", "8 GPM high volume output", "Massive heat exchange"],
    slug: "/machines/hot-water/8405hnl",
    description: "The high-volume flagship. 8 GPM flow rate for the most demanding bulk cleaning tasks."
  },
  {
    id: "ged-12v-skid",
    name: "GED 12V Skid",
    series: "GED Series — Extra Narrow Frame",
    type: "hot-water",
    specs: {
      pressureBar: "Consult Factory",
      flowLPM: "5–8 GPM depending on spec",
      powerSource: "12V battery-powered burner",
      fuelType: "Petrol/Diesel Engine + Diesel Burner",
      driveType: "Belt Drive",
      motorKW: "Specify requirements",
      weightKG: "Quote only",
      coilWarranty: "7 Years",
      certifications: "UL/CSA Available",
      mobility: "Skid Mounted (Van/Trailer)",
      voltageOptions: "12V",
      idealApplication: "Trailer and van mounting without 115V"
    },
    highlights: ["Self-contained 12V ignition", "Space-saving skid design", "Bespoke configurations"],
    slug: "/machines/hot-water/ged-12v-skid",
    description: "12V battery-powered burner skid unit. Self-contained — no 115V required for ignition."
  },
  {
    id: "ged-115v-skid",
    name: "GED 115V Skid",
    series: "GED Series — Extra Narrow Frame",
    type: "hot-water",
    specs: {
      pressureBar: "Consult Factory",
      flowLPM: "5–8 GPM depending on spec",
      powerSource: "115V burner skid",
      fuelType: "Petrol/Diesel Engine + Diesel Burner",
      driveType: "Belt Drive",
      motorKW: "Specify requirements",
      weightKG: "Quote only",
      coilWarranty: "7 Years",
      certifications: "Industry Standard",
      mobility: "Skid Mounted (Truck/Trailer)",
      voltageOptions: "115V",
      idealApplication: "Standard truck bed and trailer mounting"
    },
    highlights: ["Industry standard skid", "High heat performance", "Rugged mounting frame"],
    slug: "/machines/hot-water/ged-115v-skid",
    description: "115V burner skid unit for trailer, truck bed or van mounting."
  },

  // --- SERIES 5: GAS FIRED SERIES (MAINS GAS/LPG) ---
  {
    id: "4301-ng-lp",
    name: "Alkota 4301 NG/LP",
    series: "Gas Fired Series — Mains Gas & LPG",
    type: "hot-water",
    specs: {
      pressureBar: "207",
      flowLPM: "15.1",
      powerSource: "230V / 1PH / 40A Electric",
      fuelType: "Natural Gas or LPG",
      driveType: "Belt Drive",
      motorKW: "5.5",
      weightKG: "310",
      coilWarranty: "7 Years",
      certifications: "CE / UKCA",
      mobility: "Stationary Base",
      voltageOptions: "230V Single-Phase",
      idealApplication: "Permanent wash bay installation"
    },
    highlights: ["No diesel on site", "Constant fuel supply", "Ideal for indoor use"],
    slug: "/machines/hot-water/4301-ng-lp",
    description: "The standard gas-fired model. No diesel deliveries. Ideal for permanent installations."
  },
  {
    id: "gas-fired-x4",
    name: "Gas Fired X4",
    series: "Gas Fired Series — Mains Gas & LPG",
    type: "hot-water",
    specs: {
      pressureBar: "Multiple Options",
      flowLPM: "Multiple Options",
      powerSource: "Electric Motor",
      fuelType: "Natural Gas / LPG",
      driveType: "Belt Drive",
      motorKW: "Contact for spec",
      weightKG: "Quote only",
      coilWarranty: "7 Years",
      certifications: "ETL/CSA",
      mobility: "Portable NG/LP Configuration",
      voltageOptions: "Contact us",
      idealApplication: "Sites with mains gas requiring a movable machine"
    },
    highlights: ["Portable gas fired system", "Clean burning NG/LP", "Rugged X4 chassis"],
    slug: "/machines/hot-water/gas-fired-x4",
    description: "Portable NG/LP version of the X4 for sites with mains gas connection requiring a movable machine."
  },
  {
    id: "stationary-gas-fired",
    name: "Stationary Gas Fired Series",
    series: "Gas Fired Series — Mains Gas & LPG",
    type: "hot-water",
    specs: {
      pressureBar: "Up to 207",
      flowLPM: "2.1–10 GPM / 7.9–37.9 LPM",
      powerSource: "Electric Motor (1PH or 3PH)",
      fuelType: "Natural Gas or LPG",
      driveType: "Belt Drive",
      motorKW: "Variable",
      weightKG: "Industrial Build",
      coilWarranty: "7 Years",
      certifications: "UL / CSA / ETL",
      mobility: "Fixed Installation",
      voltageOptions: "230V / 400V",
      idealApplication: "Large permanent wash bay installations"
    },
    highlights: ["High flow fixed systems", "Pure gas fuel source", "Engineered for wash bays"],
    slug: "/machines/hot-water/stationary-gas-fired",
    description: "Fixed-installation natural gas or LPG hot water machines covering 2.1 GPM to 10 GPM."
  },

  // --- SERIES 6: DED BIG BOY (DIESEL ENGINE) ---
  {
    id: "ded-big-boy",
    name: "DED Big Boy",
    series: "DED Series — Diesel Engine Drive",
    type: "hot-water",
    specs: {
      pressureBar: "Consult Factory",
      flowLPM: "Contact for spec",
      powerSource: "Diesel Engine",
      fuelType: "Diesel (Single Fuel)",
      driveType: "Belt Drive",
      motorKW: "High Output",
      weightKG: "Massive Capacity",
      coilWarranty: "7 Years",
      certifications: "Industrial Grade",
      mobility: "Portable or Stationary",
      voltageOptions: "12V Battery",
      idealApplication: "Demanding remote site applications"
    },
    highlights: ["Largest diesel system", "Completely self-contained", "Single-fuel simplicity"],
    slug: "/machines/hot-water/ded-big-boy",
    description: "The largest diesel engine hot water machine in the range. For the most demanding remote site applications."
  },

  // --- COLD WATER: BD INDUSTRIAL SERIES ---
  {
    id: "216bd2",
    name: "Alkota 216BD2",
    series: "BD Industrial Series",
    type: "cold-water",
    specs: {
      pressureBar: "110",
      flowLPM: "7.6",
      powerSource: "230V Single Phase",
      fuelType: "N/A",
      driveType: "Direct Drive",
      motorKW: "1.5",
      weightKG: "65",
      coilWarranty: "N/A",
      certifications: "CE / UKCA",
      mobility: "Portable (2-Wheel)",
      voltageOptions: "230V",
      idealApplication: "Light commercial cleaning"
    },
    highlights: ["Compact cabinet design", "Protected controls", "Zero emissions"],
    slug: "/machines/cold-water/216bd2",
    description: "The entry point to the industrial cold range. Compact, protected, and reliable."
  },
  {
    id: "311bd3",
    name: "Alkota 311BD3",
    series: "BD Industrial Series",
    type: "cold-water",
    specs: {
      pressureBar: "138",
      flowLPM: "11.4",
      powerSource: "230V Single Phase",
      fuelType: "N/A",
      driveType: "Direct Drive",
      motorKW: "2.2",
      weightKG: "95",
      coilWarranty: "N/A",
      certifications: "CE / UKCA",
      mobility: "Portable (2-Wheel)",
      voltageOptions: "230V",
      idealApplication: "Industrial wash down"
    },
    highlights: ["Standard industrial flow", "Triplex plunger pump", "Rugged chassis"],
    slug: "/machines/cold-water/311bd3",
    description: "Balanced industrial cold pressure. The versatile choice for workshops and yards."
  },
  {
    id: "430bd",
    name: "Alkota 430BD",
    series: "BD Industrial Series",
    type: "cold-water",
    specs: {
      pressureBar: "207",
      flowLPM: "15.1",
      powerSource: "400V 3-Phase",
      fuelType: "N/A",
      driveType: "Belt Drive",
      motorKW: "5.5",
      weightKG: "110",
      coilWarranty: "N/A",
      certifications: "CE / UKCA",
      mobility: "Portable (4-Wheel)",
      voltageOptions: "400V",
      idealApplication: "Continuous industrial plant use"
    },
    highlights: ["High pressure output", "Belt drive durability", "Cool-run motor"],
    slug: "/machines/cold-water/430bd",
    description: "Heavy duty 3-phase cold water power. Built for continuous operation in industrial plants."
  },

  // --- COLD WATER: S SERIES (HOT WATER READY) ---
  {
    id: "420s",
    name: "Alkota 420S",
    series: "S Series — Hot Water Ready",
    type: "cold-water",
    specs: {
      pressureBar: "138",
      flowLPM: "14.0",
      powerSource: "230V / 1PH",
      fuelType: "Accepts 180°F Inlet Water",
      driveType: "Belt Drive",
      motorKW: "4.0",
      weightKG: "135",
      coilWarranty: "N/A",
      certifications: "Industrial Grade",
      mobility: "Portable",
      voltageOptions: "230V",
      idealApplication: "Facilities with existing hot water supply"
    },
    highlights: ["180°F water compatible", "Quiet belt drive", "Low vibration"],
    slug: "/machines/cold-water/420s",
    description: "Accepts incoming hot water up to 180°F. Delivers hot cleaning performance at cold machine cost."
  },
  {
    id: "430s",
    name: "Alkota 430S",
    series: "S Series — Hot Water Ready",
    type: "cold-water",
    specs: {
      pressureBar: "207",
      flowLPM: "14.4",
      powerSource: "230V / 1PH",
      fuelType: "Accepts 180°F Inlet Water",
      driveType: "Belt Drive",
      motorKW: "5.5",
      weightKG: "140",
      coilWarranty: "N/A",
      certifications: "Industrial Grade",
      mobility: "Portable",
      voltageOptions: "230V",
      idealApplication: "Industrial sites with boiler access"
    },
    highlights: ["High pressure hot-ready", "Industrial triplex pump", "Long duty cycle"],
    slug: "/machines/cold-water/430s",
    description: "3,000 PSI hot-ready cold machine. The professional choice for boiler-equipped sites."
  },
  {
    id: "520s",
    name: "Alkota 520S",
    series: "S Series — Hot Water Ready",
    type: "cold-water",
    specs: {
      pressureBar: "138",
      flowLPM: "18.9",
      powerSource: "230V / 1PH",
      fuelType: "Accepts 180°F Inlet Water",
      driveType: "Belt Drive",
      motorKW: "5.5",
      weightKG: "145",
      coilWarranty: "N/A",
      certifications: "Industrial Grade",
      mobility: "Portable",
      voltageOptions: "230V",
      idealApplication: "High flow hot cleaning"
    },
    highlights: ["5 GPM High Flow", "Hot water compatible", "Belt drive stability"],
    slug: "/machines/cold-water/520s",
    description: "High flow 5 GPM hot-ready system. Ideal for large area degreasing with available hot water."
  },
  {
    id: "530s",
    name: "Alkota 530S",
    series: "S Series — Hot Water Ready",
    type: "cold-water",
    specs: {
      pressureBar: "207",
      flowLPM: "18.9",
      powerSource: "230V / 3PH",
      fuelType: "Accepts 180°F Inlet Water",
      driveType: "Belt Drive",
      motorKW: "7.5",
      weightKG: "160",
      coilWarranty: "N/A",
      certifications: "Industrial Grade",
      mobility: "Portable",
      voltageOptions: "230V 3PH",
      idealApplication: "Professional 3-phase hot cleaning"
    },
    highlights: ["3-phase high throughput", "Extreme heat tolerance", "Cast industrial pump"],
    slug: "/machines/cold-water/530s",
    description: "The peak of the S Series. 3-phase power combined with high flow and 180°F capability."
  },

  // --- COLD WATER: WASH CANNON ---
  {
    id: "25500",
    name: "Wash Cannon 25500",
    series: "Wash Cannon — High Volume",
    type: "cold-water",
    specs: {
      pressureBar: "34",
      flowLPM: "94.6",
      powerSource: "230V / 3PH",
      fuelType: "N/A",
      driveType: "Fixed Installation",
      motorKW: "4.0",
      weightKG: "210",
      coilWarranty: "N/A",
      certifications: "Industrial",
      mobility: "Stationary",
      voltageOptions: "230V / 400V",
      idealApplication: "Livestock buildings, agricultural yards"
    },
    highlights: ["25 GPM High volume", "Handles liquids with solids", "Diaphragm industrial pump"],
    slug: "/machines/cold-water/25500",
    description: "When you need to move water fast. 25 GPM high-volume cleaning for massive industrial areas."
  },
  {
    id: "25750",
    name: "Wash Cannon 25750",
    series: "Wash Cannon — High Volume",
    type: "cold-water",
    specs: {
      pressureBar: "52",
      flowLPM: "94.6",
      powerSource: "230V / 3PH",
      fuelType: "N/A",
      driveType: "Stationary",
      motorKW: "5.5",
      weightKG: "225",
      coilWarranty: "N/A",
      certifications: "Industrial",
      mobility: "Stationary",
      voltageOptions: "230V / 400V",
      idealApplication: "Municipal applications and large depots"
    },
    highlights: ["High pressure volume", "Rugged diaphragm pump", "Extreme coverage speed"],
    slug: "/machines/cold-water/25750",
    description: "High pressure Wash Cannon for municipal and large-scale agricultural concrete yards."
  },
  {
    id: "25755",
    name: "Wash Cannon 25755",
    series: "Wash Cannon — High Volume",
    type: "cold-water",
    specs: {
      pressureBar: "48",
      flowLPM: "94.6",
      powerSource: "Honda GX630 Gas Engine",
      fuelType: "Petrol",
      driveType: "Independent",
      motorKW: "20 HP Class",
      weightKG: "195",
      coilWarranty: "N/A",
      certifications: "Mobile Independent",
      mobility: "Portable Frame",
      voltageOptions: "12V Start",
      idealApplication: "Off-grid large scale wash down"
    },
    highlights: ["Honda GX630 Independent Power", "94.6 LPM flow rate", "Self-contained mobility"],
    slug: "/machines/cold-water/25755",
    description: "The mobile high-volume king. Honda-powered 25 GPM flow for independent site cleaning."
  },
  {
    id: "2110",
    name: "Wash Cannon 2110",
    series: "Wash Cannon — High Volume",
    type: "cold-water",
    specs: {
      pressureBar: "69",
      flowLPM: "79.5",
      powerSource: "230V / 3PH",
      fuelType: "N/A",
      driveType: "Stationary",
      motorKW: "7.5",
      weightKG: "230",
      coilWarranty: "N/A",
      certifications: "Industrial",
      mobility: "Stationary",
      voltageOptions: "230V / 400V",
      idealApplication: "Heavy agricultural contamination"
    },
    highlights: ["1,000 PSI high flow", "Industrial diaphragm pump", "High intensity coverage"],
    slug: "/machines/cold-water/2110",
    description: "The most intense Wash Cannon. 1,000 PSI combined with high flow for stubborn agricultural debris."
  },

  // --- COLD WATER: CHALLENGER SERIES ---
  {
    id: "325csh",
    name: "Challenger 325CSH",
    series: "Challenger Series — Portable Gas",
    type: "cold-water",
    specs: {
      pressureBar: "172",
      flowLPM: "11.4",
      powerSource: "Honda GX200",
      fuelType: "Petrol",
      driveType: "Direct Drive",
      motorKW: "6.5 HP",
      weightKG: "45",
      coilWarranty: "N/A",
      certifications: "Commercial",
      mobility: "Aluminium Frame (Portable)",
      voltageOptions: "N/A",
      idealApplication: "Outdoor maintenance where mains power lacks"
    },
    highlights: ["Lightweight aluminium frame", "Corrosion resistant", "Honda GX200 performance"],
    slug: "/machines/cold-water/325csh",
    description: "The mobile cold water machine for outdoor work. Lightweight aluminium frame with Honda GX power."
  },

  // --- JETTER SERIES ---
  {
    id: "jetter-series",
    name: "Alkota Jetter Series",
    series: "Jetter Series",
    type: "cold-water",
    specs: {
      pressureBar: "Consult for spec",
      flowLPM: "Spec defined by task",
      powerSource: "Electric or Gas",
      fuelType: "N/A",
      driveType: "Specialist",
      motorKW: "Variable",
      weightKG: "Project dependent",
      coilWarranty: "N/A",
      certifications: "Specialist",
      mobility: "Contact for details",
      voltageOptions: "115V / 230V / Gas",
      idealApplication: "Specialist drain jetting & pipe cleaning"
    },
    highlights: ["Specialist drain cleaning", "Contractor grade build", "Pulse logic technology"],
    slug: "/machines/cold-water/jetter-series",
    description: "Specialist drain jetting and pipe cleaning for contractors and municipal water companies."
  },

  // --- STEAM SYSTEMS ---
  {
    id: "steam-oil",
    name: "Industrial Steam Cleaner",
    series: "Steam Systems",
    type: "steam",
    specs: {
      pressureBar: "15",
      flowLPM: "3.5",
      powerSource: "Electric",
      fuelType: "Diesel",
      driveType: "Direct Drive",
      motorKW: "1.5",
      weightKG: "135",
      coilWarranty: "5 Years",
      certifications: "CE / UKCA",
      mobility: "Portable (4-Wheel)",
      voltageOptions: "230V Single-Phase",
      idealApplication: "Engine degreasing & sterilising"
    },
    highlights: ["True 150°C steam", "Low water usage", "Extreme grease cutting"],
    slug: "/machines/steam/oil-fired",
    description: "Specialized steam systems for sterilization and grease removal."
  },

  // --- TRAILERS ---
  {
    id: "trailer-single",
    name: "Single Axle Trailer System",
    series: "Mobile Systems",
    type: "trailer",
    specs: {
      pressureBar: "200",
      flowLPM: "15",
      powerSource: "Honda Petrol",
      fuelType: "Diesel Burner / Petrol Engine",
      driveType: "Gearbox",
      motorKW: "13 HP",
      weightKG: "580 (Empty)",
      coilWarranty: "7 Years",
      certifications: "Road Legal Dept of Transport",
      mobility: "Towable",
      voltageOptions: "12V Battery",
      idealApplication: "Mobile contract cleaning"
    },
    highlights: ["Fully autonomous", "500L water tank", "Integrated hose reels"],
    slug: "/machines/trailer/single-axle",
    description: "Complete mobile washing solution with integrated water supply."
  }
];
