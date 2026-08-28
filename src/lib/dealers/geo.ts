/**
 * ALKOTA UK — GEOLOCATION & POSTCODE ENGINE
 * Comprehensive UK Outcode Centroids table for zero-latency,
 * rate-limit-free postcode distance calculation and territory lookup.
 */

export interface LatLng {
  latitude: number;
  longitude: number;
}

// Centroid coordinates for all UK Postcode Area prefixes (124 areas)
export const UK_POSTCODE_CENTROIDS: Record<string, LatLng> = {
  AB: { latitude: 57.1497, longitude: -2.0943 }, // Aberdeen
  AL: { latitude: 51.7527, longitude: -0.3394 }, // St Albans
  B:  { latitude: 52.4862, longitude: -1.8904 }, // Birmingham
  BA: { latitude: 51.3811, longitude: -2.3590 }, // Bath
  BB: { latitude: 53.7488, longitude: -2.4818 }, // Blackburn
  BD: { latitude: 53.7960, longitude: -1.7594 }, // Bradford
  BH: { latitude: 50.7192, longitude: -1.8808 }, // Bournemouth
  BL: { latitude: 53.5769, longitude: -2.4282 }, // Bolton
  BN: { latitude: 50.8225, longitude: -0.1372 }, // Brighton
  BR: { latitude: 51.4039, longitude: 0.0198 },  // Bromley
  BS: { latitude: 51.4545, longitude: -2.5879 }, // Bristol
  BT: { latitude: 54.5973, longitude: -5.9301 }, // Northern Ireland (Belfast)
  CA: { latitude: 54.8925, longitude: -2.9329 }, // Carlisle
  CB: { latitude: 52.2053, longitude: 0.1218 },  // Cambridge
  CF: { latitude: 51.4816, longitude: -3.1791 }, // Cardiff
  CH: { latitude: 53.1905, longitude: -2.8916 }, // Chester
  CM: { latitude: 51.7356, longitude: 0.4685 },  // Chelmsford
  CO: { latitude: 51.8959, longitude: 0.9035 },  // Colchester
  CR: { latitude: 51.3762, longitude: -0.0982 }, // Croydon
  CT: { latitude: 51.2802, longitude: 1.0789 },  // Canterbury
  CV: { latitude: 52.4068, longitude: -1.5197 }, // Coventry
  CW: { latitude: 53.0984, longitude: -2.4414 }, // Crewe
  DA: { latitude: 51.4463, longitude: 0.2198 },  // Dartford
  DD: { latitude: 56.4620, longitude: -2.9707 }, // Dundee
  DE: { latitude: 52.9225, longitude: -1.4746 }, // Derby
  DG: { latitude: 55.0709, longitude: -3.6051 }, // Dumfries
  DH: { latitude: 54.7761, longitude: -1.5733 }, // Durham
  DL: { latitude: 54.5242, longitude: -1.5504 }, // Darlington
  DN: { latitude: 53.5228, longitude: -1.1288 }, // Doncaster
  DT: { latitude: 50.7156, longitude: -2.4397 }, // Dorchester
  DY: { latitude: 52.5123, longitude: -2.0811 }, // Dudley
  E:  { latitude: 51.5285, longitude: -0.0381 }, // London East
  EC: { latitude: 51.5173, longitude: -0.0935 }, // London EC
  EH: { latitude: 55.9533, longitude: -3.1883 }, // Edinburgh
  EN: { latitude: 51.6521, longitude: -0.0810 }, // Enfield
  EX: { latitude: 50.7184, longitude: -3.5339 }, // Exeter
  FK: { latitude: 56.0019, longitude: -3.7839 }, // Falkirk / Stirling
  FY: { latitude: 53.8175, longitude: -3.0357 }, // Blackpool
  G:  { latitude: 55.8642, longitude: -4.2518 }, // Glasgow
  GL: { latitude: 51.8642, longitude: -2.2386 }, // Gloucester
  GU: { latitude: 51.2362, longitude: -0.5704 }, // Guildford
  HA: { latitude: 51.5806, longitude: -0.3420 }, // Harrow
  HD: { latitude: 53.6458, longitude: -1.7850 }, // Huddersfield
  HG: { latitude: 53.9921, longitude: -1.5372 }, // Harrogate
  HP: { latitude: 51.7525, longitude: -0.5574 }, // Hemel Hempstead
  HR: { latitude: 52.0564, longitude: -2.7160 }, // Hereford
  HS: { latitude: 58.2094, longitude: -6.3849 }, // Outer Hebrides
  HU: { latitude: 53.7457, longitude: -0.3367 }, // Hull
  HX: { latitude: 53.7258, longitude: -1.8631 }, // Halifax
  IG: { latitude: 51.5588, longitude: 0.0726 },  // Ilford
  IP: { latitude: 52.0567, longitude: 1.1482 },  // Ipswich
  IV: { latitude: 57.4778, longitude: -4.2247 }, // Inverness
  KA: { latitude: 55.6111, longitude: -4.4958 }, // Kilmarnock / Ayrshire
  KT: { latitude: 51.4085, longitude: -0.3064 }, // Kingston upon Thames
  KW: { latitude: 58.4419, longitude: -3.0950 }, // Kirkwall / Caithness
  KY: { latitude: 56.1165, longitude: -3.1601 }, // Kirkcaldy / Fife
  L:  { latitude: 53.4084, longitude: -2.9916 }, // Liverpool
  LA: { latitude: 54.0470, longitude: -2.8010 }, // Lancaster
  LD: { latitude: 52.2415, longitude: -3.3794 }, // Llandrindod Wells / Powys
  LE: { latitude: 52.6369, longitude: -1.1398 }, // Leicester
  LL: { latitude: 53.3082, longitude: -3.8290 }, // Llandudno / North Wales
  LN: { latitude: 53.2307, longitude: -0.5406 }, // Lincoln
  LS: { latitude: 53.8008, longitude: -1.5491 }, // Leeds
  LU: { latitude: 51.8787, longitude: -0.4200 }, // Luton
  M:  { latitude: 53.4808, longitude: -2.2426 }, // Manchester
  ME: { latitude: 51.3890, longitude: 0.5284 },  // Medway / Maidstone
  MK: { latitude: 52.0406, longitude: -0.7594 }, // Milton Keynes
  ML: { latitude: 55.7874, longitude: -3.9855 }, // Motherwell / Lanarkshire
  N:  { latitude: 51.5833, longitude: -0.1167 }, // London North
  NE: { latitude: 54.9783, longitude: -1.6178 }, // Newcastle upon Tyne
  NG: { latitude: 52.9548, longitude: -1.1581 }, // Nottingham
  NN: { latitude: 52.2405, longitude: -0.9027 }, // Northampton
  NP: { latitude: 51.5842, longitude: -2.9977 }, // Newport
  NR: { latitude: 52.6309, longitude: 1.2974 },  // Norwich
  NW: { latitude: 51.5539, longitude: -0.2037 }, // London NW
  OL: { latitude: 53.5409, longitude: -2.1114 }, // Oldham
  OX: { latitude: 51.7520, longitude: -1.2577 }, // Oxford
  PA: { latitude: 55.8456, longitude: -4.4239 }, // Paisley / Renfrewshire
  PE: { latitude: 52.5695, longitude: -0.2405 }, // Peterborough
  PH: { latitude: 56.3950, longitude: -3.4308 }, // Perth
  PL: { latitude: 50.3755, longitude: -4.1427 }, // Plymouth
  PO: { latitude: 50.8198, longitude: -1.0880 }, // Portsmouth / Isle of Wight
  PR: { latitude: 53.7632, longitude: -2.7031 }, // Preston
  RG: { latitude: 51.4543, longitude: -0.9781 }, // Reading
  RH: { latitude: 51.2382, longitude: -0.1873 }, // Redhill / Crawley
  RM: { latitude: 51.5758, longitude: 0.1837 },  // Romford
  S:  { latitude: 53.3811, longitude: -1.4701 }, // Sheffield / Chesterfield
  SA: { latitude: 51.6214, longitude: -3.9436 }, // Swansea
  SE: { latitude: 51.4816, longitude: -0.0460 }, // London SE
  SG: { latitude: 51.9038, longitude: -0.2023 }, // Stevenage
  SK: { latitude: 53.4106, longitude: -2.1575 }, // Stockport
  SL: { latitude: 51.5105, longitude: -0.5950 }, // Slough
  SM: { latitude: 51.3614, longitude: -0.1945 }, // Sutton
  SN: { latitude: 51.5558, longitude: -1.7797 }, // Swindon
  SO: { latitude: 50.9097, longitude: -1.4044 }, // Southampton
  SP: { latitude: 51.0693, longitude: -1.7957 }, // Salisbury
  SR: { latitude: 54.9069, longitude: -1.3838 }, // Sunderland
  SS: { latitude: 51.5459, longitude: 0.7077 },  // Southend-on-Sea
  ST: { latitude: 53.0027, longitude: -2.1794 }, // Stoke-on-Trent
  SW: { latitude: 51.4645, longitude: -0.1704 }, // London SW
  SY: { latitude: 52.7073, longitude: -2.7553 }, // Shrewsbury
  TA: { latitude: 51.0154, longitude: -3.1032 }, // Taunton
  TD: { latitude: 55.6024, longitude: -2.7847 }, // Galashiels / Scottish Borders
  TF: { latitude: 52.6784, longitude: -2.4453 }, // Telford
  TN: { latitude: 51.1324, longitude: 0.2637 },  // Tonbridge / Tunbridge Wells
  TQ: { latitude: 50.4619, longitude: -3.5253 }, // Torquay
  TR: { latitude: 50.2632, longitude: -5.0510 }, // Truro
  TS: { latitude: 54.5742, longitude: -1.2350 }, // Cleveland / Middlesbrough
  TW: { latitude: 51.4442, longitude: -0.3361 }, // Twickenham
  UB: { latitude: 51.5424, longitude: -0.4784 }, // Uxbridge
  W:  { latitude: 51.5150, longitude: -0.1419 }, // London West
  WA: { latitude: 53.3900, longitude: -2.5970 }, // Warrington
  WC: { latitude: 51.5186, longitude: -0.1207 }, // London WC
  WD: { latitude: 51.6565, longitude: -0.3903 }, // Watford
  WF: { latitude: 53.6833, longitude: -1.4977 }, // Wakefield
  WN: { latitude: 53.5451, longitude: -2.6325 }, // Wigan
  WR: { latitude: 52.1936, longitude: -2.2216 }, // Worcester
  WS: { latitude: 52.5862, longitude: -1.9829 }, // Walsall
  WV: { latitude: 52.5869, longitude: -2.1288 }, // Wolverhampton
  YO: { latitude: 53.9590, longitude: -1.0815 }, // York
  ZE: { latitude: 60.1530, longitude: -1.1493 }, // Shetland
};

/**
 * Extracts the 1-to-2 letter Postcode Area prefix from a raw UK postcode string.
 * Example: 'S42 5UY' -> 'S', 'M17 1JT' -> 'M', 'LS9 0RA' -> 'LS', 'EC1A 1BB' -> 'EC'
 */
export function extractPostcodeArea(postcode: string): string | null {
  if (!postcode) return null;
  const clean = postcode.trim().toUpperCase().replace(/\s+/g, '');
  const match = clean.match(/^([A-Z]{1,2})/);
  return match ? match[1] : null;
}

/**
 * Gets geographic coordinates for a UK postcode.
 * First checks for full area match (e.g. 'LS', 'SW', 'S').
 */
export function geocodePostcode(postcode: string): LatLng | null {
  const area = extractPostcodeArea(postcode);
  if (area && UK_POSTCODE_CENTROIDS[area]) {
    return UK_POSTCODE_CENTROIDS[area];
  }
  return null;
}

/**
 * Calculate Great-Circle distance between two coordinates using Haversine formula.
 * @returns distance in miles
 */
export function calculateHaversineDistance(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const R = 3958.8; // Radius of the Earth in miles
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c;
  return Math.round(distance * 10) / 10; // Round to 1 decimal place
}

/**
 * Formats distance in miles nicely for user display.
 */
export function formatDistanceMiles(miles: number): string {
  if (miles <= 1) return 'Within 1 mile';
  return `${miles.toFixed(1)} miles away`;
}
