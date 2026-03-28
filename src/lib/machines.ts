export interface MachineData {
  id: string;
  name: string;
  series: string;
  type: 'hot-water' | 'cold-water' | 'steam' | 'trailer' | 'van-pack';
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
  };
  highlights: string[];
  slug: string;
}

export const MACHINES: MachineData[] = [
  {
    id: "420x4",
    name: "Alkota 420X4",
    series: "Elite X4 Series",
    type: "hot-water",
    specs: {
      pressureBar: "140",
      flowLPM: "15",
      powerSource: "Electric",
      fuelType: "Diesel / Kerosene",
      driveType: "Belt Drive",
      motorKW: "4.0",
      weightKG: "245",
      coilWarranty: "7 Years",
      certifications: "CE / UKCA",
      mobility: "Portable (4-Wheel)",
      voltageOptions: "400V 3-Phase",
      idealApplication: "Heavy agricultural & commercial"
    },
    highlights: ["Compact chassis", "High-efficiency burner", "Triplex plunger pump"],
    slug: "/machines/hot-water/420x4"
  },
  {
    id: "520x4",
    name: "Alkota 520X4",
    series: "Elite X4 Series",
    type: "hot-water",
    specs: {
      pressureBar: "140",
      flowLPM: "19",
      powerSource: "Electric",
      fuelType: "Diesel / Kerosene",
      driveType: "Belt Drive",
      motorKW: "5.5",
      weightKG: "260",
      coilWarranty: "7 Years",
      certifications: "CE / UKCA",
      mobility: "Portable (4-Wheel)",
      voltageOptions: "400V 3-Phase",
      idealApplication: "High-volume washing bays"
    },
    highlights: ["Increased flow rate", "Industrial-grade components", "Simple maintenance access"],
    slug: "/machines/hot-water/520x4"
  },
  {
    id: "530x4",
    name: "Alkota 530X4",
    series: "Elite X4 Series",
    type: "hot-water",
    specs: {
      pressureBar: "200",
      flowLPM: "19",
      powerSource: "Electric",
      fuelType: "Diesel / Kerosene",
      driveType: "Belt Drive",
      motorKW: "7.5",
      weightKG: "295",
      coilWarranty: "7 Years",
      certifications: "CE / UKCA",
      mobility: "Portable (4-Wheel)",
      voltageOptions: "400V 3-Phase",
      idealApplication: "Extreme heavy duty industrial"
    },
    highlights: ["200 Bar high pressure", "Premium motor", "Advanced heat retention"],
    slug: "/machines/hot-water/530x4"
  },
  {
    id: "4301-ng",
    name: "Alkota 4301 NG",
    series: "Gas Fired Series",
    type: "hot-water",
    specs: {
      pressureBar: "200",
      flowLPM: "15",
      powerSource: "Electric",
      fuelType: "Natural Gas",
      driveType: "Belt Drive",
      motorKW: "5.5",
      weightKG: "310",
      coilWarranty: "7 Years",
      certifications: "CE / UKCA",
      mobility: "Stationary Base",
      voltageOptions: "400V 3-Phase",
      idealApplication: "Indoor fixed wash bays"
    },
    highlights: ["Zero exhaust fumes", "Constant gas supply", "Automated shut-down"],
    slug: "/machines/hot-water/4301-ng"
  },
  {
    id: "216bd2",
    name: "Alkota 216BD2",
    series: "BD Cold Series",
    type: "cold-water",
    specs: {
      pressureBar: "110",
      flowLPM: "11",
      powerSource: "Electric",
      fuelType: "N/A",
      driveType: "Direct Drive",
      motorKW: "2.2",
      weightKG: "65",
      coilWarranty: "N/A",
      certifications: "CE / UKCA",
      mobility: "Portable (2-Wheel)",
      voltageOptions: "230V Single-Phase",
      idealApplication: "Light commercial use"
    },
    highlights: ["Easy transport", "Runs on standard plug", "Durable frame"],
    slug: "/machines/cold-water/216bd2"
  },
  {
    id: "311bd3",
    name: "Alkota 311BD3",
    series: "BD Cold Series",
    type: "cold-water",
    specs: {
      pressureBar: "200",
      flowLPM: "15",
      powerSource: "Electric",
      fuelType: "N/A",
      driveType: "Direct Drive",
      motorKW: "5.5",
      weightKG: "95",
      coilWarranty: "N/A",
      certifications: "CE / UKCA",
      mobility: "Portable (2-Wheel)",
      voltageOptions: "400V 3-Phase",
      idealApplication: "Standard commercial wash"
    },
    highlights: ["Strong 200 Bar output", "Triplex pump", "Rugged cart"],
    slug: "/machines/cold-water/311bd3"
  },
  {
    id: "430bd",
    name: "Alkota 430BD",
    series: "BD Heavy Series",
    type: "cold-water",
    specs: {
      pressureBar: "200",
      flowLPM: "15",
      powerSource: "Electric",
      fuelType: "N/A",
      driveType: "Belt Drive",
      motorKW: "5.5",
      weightKG: "110",
      coilWarranty: "N/A",
      certifications: "CE / UKCA",
      mobility: "Portable (4-Wheel)",
      voltageOptions: "400V 3-Phase",
      idealApplication: "Continuous industrial plant use"
    },
    highlights: ["Belt drive longevity", "Low pump RPM", "Heavy-duty frame"],
    slug: "/machines/cold-water/430bd"
  },
  {
    id: "530bd",
    name: "Alkota 530BD",
    series: "BD Heavy Series",
    type: "cold-water",
    specs: {
      pressureBar: "200",
      flowLPM: "19",
      powerSource: "Electric",
      fuelType: "N/A",
      driveType: "Belt Drive",
      motorKW: "7.5",
      weightKG: "125",
      coilWarranty: "N/A",
      certifications: "CE / UKCA",
      mobility: "Portable (4-Wheel)",
      voltageOptions: "400V 3-Phase",
      idealApplication: "High flow continuous industrial"
    },
    highlights: ["Max flow and pressure", "Cool running", "Premium tier"],
    slug: "/machines/cold-water/530bd"
  },
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
    slug: "/machines/steam/oil-fired"
  },
  {
    id: "steam-dry",
    name: "Dry Steam Generator",
    series: "Steam Systems",
    type: "steam",
    specs: {
      pressureBar: "10",
      flowLPM: "0.5",
      powerSource: "Electric",
      fuelType: "N/A",
      driveType: "No Pump (Boiler)",
      motorKW: "3.5",
      weightKG: "45",
      coilWarranty: "N/A (Boiler)",
      certifications: "CE / UKCA",
      mobility: "Portable (Castors)",
      voltageOptions: "230V Single-Phase",
      idealApplication: "Food plant indoor sterilisation"
    },
    highlights: ["95% dry vapour", "Chemical-free cleaning", "Food safe"],
    slug: "/machines/steam/dry-generator"
  },
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
    slug: "/machines/trailer/single-axle"
  },
  {
    id: "trailer-tandem",
    name: "Tandem Axle Trailer System",
    series: "Mobile Systems",
    type: "trailer",
    specs: {
      pressureBar: "200",
      flowLPM: "21",
      powerSource: "Kubota Diesel",
      fuelType: "Red Diesel",
      driveType: "Belt Drive",
      motorKW: "20 HP",
      weightKG: "950 (Empty)",
      coilWarranty: "7 Years",
      certifications: "Road Legal Dept of Transport",
      mobility: "Towable",
      voltageOptions: "12V Battery",
      idealApplication: "Heavy duty remote site works"
    },
    highlights: ["1000L water tank", "Twin lance capability", "Extreme durability"],
    slug: "/machines/trailer/tandem-axle"
  }
];
