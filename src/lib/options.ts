// Dropdown option constants for TGREC Soil Profile app

export const DISTRICTS_TG = [
  "Adilabad", "Bhadradri Kothagudem", "Hanamkonda", "Hyderabad", "Jagtial", 
  "Jangaon", "Jayashankar Bhupalpally", "Jogulamba Gadwal", "Kamareddy", 
  "Karimnagar", "Khammam", "Komaram Bheem Asifabad", "Mahabubabad", 
  "Mahabubnagar", "Mancherial", "Medak", "Medchal–Malkajgiri", "Mulugu", 
  "Nagarkurnool", "Nalgonda", "Narayanpet", "Nirmal", "Nizamabad", 
  "Peddapalli", "Rajanna Sircilla", "Rangareddy", "Sangareddy", "Siddipet", 
  "Suryapet", "Vikarabad", "Wanaparthy", "Warangal", "Yadadri Bhuvanagiri", "Other"
];

export const PHYSIOGRAPHY = [
  "Upland", "Valley", "Piedmont", "Pediment", "Floodplain", "Interfluve", 
  "Alluvial plain", "Coastal plain", "Hill slope", "Mesa/Plateau", "Other"
];

export const SLOPE_ASPECT = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];

export const PARENT_MATERIAL = [
  "Alluvium", "Basalt", "Granite/Gneiss", "Shale", "Limestone", "Laterite", 
  "Colluvium", "Aeolian sand", "Mixed", "Other"
];

export const LAND_USE = [
  "Crop", "Fallow", "Orchard", "Forest", "Grazing", "Built-up", 
  "Industrial", "Roadside", "Water/WT", "Other"
];

export const NATURAL_VEGETATION = [
  "Scrub", "Grass", "Thorn", "Deciduous", "Plantation", "Prosopis", "Barren", "Other"
];

export const SALINITY = ["None", "Slight", "Moderate", "Strong"];

export const EROSION_TYPE = ["None", "Sheet", "Rill", "Gully", "Stream bank", "Wind"];
export const EROSION_SEVERITY = ["Slight", "Moderate", "Severe"];

export const ROCKY_STONY = [
  "None", "Stony", "Very stony", "Extremely stony", "Rock outcrops"
];

export const BASE_MAP = [
  "SOI 1:50k", "SOI 1:25k", "Google Sat", "ESRI Sat", "Bhuvan", "DGPS", "Other"
];

export const SITE_LOCATION = [
  "Summit", "Shoulder", "Backslope", "Footslope", "Toeslope", 
  "Valley floor", "Terrace", "Other"
];

export const TEXTURES = ["S", "LS", "SL", "SiL", "L", "SCL", "SiCL", "CL", "SC", "SiC", "C"];

export const MOTTLES = [
  "None", "Few faint", "Few distinct", "Few prominent", 
  "Common faint", "Common distinct", "Common prominent", 
  "Many faint", "Many distinct", "Many prominent"
];

export const REACTION = [
  "Strongly acid", "Moderately acid", "Slightly acid", "Neutral", 
  "Slightly alkaline", "Moderately alkaline", "Strongly alkaline", 
  "Effervescence present"
];

export const CONCRETIONS = [
  "None", "Fe/Mn few", "Fe/Mn common", "Fe/Mn many", 
  "Ca nodules few", "Ca nodules common", "Ca nodules many"
];

export const BOUNDARY_DISTINCT = ["Abrupt", "Clear", "Gradual", "Diffuse"];
export const BOUNDARY_TOPO = ["Smooth", "Wavy", "Irregular", "Broken"];

export const STRUCTURE_GRADE = ["Weak", "Moderate", "Strong"];
export const STRUCTURE_SIZE = ["Very fine", "Fine", "Medium", "Coarse", "Very coarse"];
export const STRUCTURE_TYPE = [
  "Granular", "Subangular blocky", "Angular blocky", "Prismatic", "Platy", "Massive"
];

export const CONS_DRY = [
  "Loose", "Soft", "Slightly hard", "Hard", "Very hard", "Extremely hard"
];
export const CONS_MOIST = [
  "Very friable", "Friable", "Firm", "Very firm", "Extremely firm"
];
export const CONS_STICKY = ["Non-sticky", "Slightly sticky", "Sticky", "Very sticky"];
export const CONS_PLASTIC = ["Non-plastic", "Slightly plastic", "Plastic", "Very plastic"];

export const FRAGMENT_PCT = ["0–5%", "5–15%", "15–35%", "35–60%", ">60%"];
export const FRAGMENT_SIZE = ["fine gravel", "gravel", "cobble", "stone", "boulder"];

export const PORE_FREQ = ["Very few", "Few", "Common", "Many"];
export const PORE_TYPE = ["tubular", "vesicular", "vughs", "planar"];

export const ROOT_ABUND = ["None", "Very few", "Few", "Common", "Many"];
export const ROOT_SIZE = ["Very fine", "Fine", "Medium", "Coarse", "Very coarse"];

export const CRACKS = [
  "None", "Few hairline", "Few wide", "Common wide", 
  "Many wide", "Through-cracks present"
];

export const ARTEFACTS = ["None", "Brick fragments", "Charcoal/slag", "Plastic", "Other"];

export const LIME = [
  "None visible", "Slight effervescence", "Moderate effervescence", 
  "Strong effervescence", "Soft powdery lime", "Hard nodules"
];

export const CUTANS = [
  "None", "Clay films few", "Clay films common", "Clay films many", 
  "Iron coatings", "Manganese coatings", "Pressure faces/slickensides present"
];

export const MUNSELL_PRESETS = [
  "10YR 3/2", "10YR 4/3", "7.5YR 4/4", "2.5Y 5/2", 
  "5YR 3/4", "2.5YR 3/6", "5Y 5/2", "Custom (enter)"
];

// Common soil series for Telangana (can be expanded)
export const SOIL_SERIES = [
  "Alfisol", "Entisol", "Inceptisol", "Mollisol", "Vertisol", "Other"
];

export const MAPPING_UNITS = [
  "Phase 1", "Phase 2", "Phase 3", "Complex", "Association", "Other"
];

// Helper function to create option objects
export function createOptions(values: string[]) {
  return values.map(value => ({
    value,
    label: value
  }));
}