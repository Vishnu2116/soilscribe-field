import { toast } from "@/hooks/use-toast";

// Storage keys
export const STORAGE_KEYS = {
  USER: 'tgrec.user',
  SHEET1: 'tgrec.sheet1',
  SHEET2: 'tgrec.sheet2',
  LAST_PROFILE_ID: 'tgrec.lastProfileId'
} as const;

// User data structure
export interface User {
  username: string;
  loggedInAt: string;
}

// Sheet 1 observation structure
export interface Observation {
  depthFrom: number;
  depthTo: number;
  colour: string;
  texture: string;
  mottles: string;
  reaction: string;
  concretions: string;
  rockFragments: string;
}

// Sheet 1 data structure
export interface Sheet1Data {
  header: {
    // Location & Admin
    nwSubWatershed: string;
    village: string;
    tehsil: string;
    district: string;
    state: string;
    
    // Soil Mapping
    series: string;
    mappingUnit: string;
    augerBoreNo: string;
    baseMap: string;
    
    // Site Description
    physiography: string;
    siteLocation: string;
    parentMaterial: string;
    slope: number;
    aspect: string;
    naturalVegetation: string;
    landUse: string;
    salineAlkali: string;
    erosionType: string;
    erosionSeverity: string;
    rockyStonyPhases: string;
    remarks: string;
  };
  observations: Observation[];
}

// Sheet 2 horizon structure
export interface Horizon {
  label: string;
  depthFrom: number;
  depthTo: number;
  boundaryDistinct: string;
  boundaryTopo: string;
  colour: string;
  mottles: string;
  texture: string;
  structureGrade: string;
  structureSize: string;
  structureType: string;
  consistenceDry: string;
  consistenceMoist: string;
  consistenceWet: string;
  coarseFragments: string;
  concretions: string;
  pores: string;
  cutans: string;
  roots: string;
  cracks: string;
  artefacts: string;
  lime: string;
  sampleNo: string;
}

// Sheet 2 data structure
export interface Sheet2Data {
  horizons: Horizon[];
}

// Get data from localStorage
export function getStoredData<T>(key: string, defaultValue: T): T {
  try {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : defaultValue;
  } catch (error) {
    console.error(`Error reading ${key} from localStorage:`, error);
    return defaultValue;
  }
}

// Save data to localStorage
export function saveData<T>(key: string, data: T): void {
  try {
    localStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.error(`Error saving ${key} to localStorage:`, error);
    toast({
      title: "Storage Error",
      description: "Failed to save data locally. Please try again.",
      variant: "destructive"
    });
  }
}

// Autosave with debouncing
const autosaveTimeouts: { [key: string]: NodeJS.Timeout } = {};

export function autosave<T>(key: string, data: T, delay: number = 600): void {
  // Clear existing timeout
  if (autosaveTimeouts[key]) {
    clearTimeout(autosaveTimeouts[key]);
  }
  
  // Set new timeout
  autosaveTimeouts[key] = setTimeout(() => {
    saveData(key, data);
    toast({
      title: "Saved ✓",
      description: "Data saved automatically",
      duration: 2000
    });
  }, delay);
}

// Check if user is logged in
export function isLoggedIn(): boolean {
  const user = getStoredData<User | null>(STORAGE_KEYS.USER, null);
  return user !== null;
}

// Get current user
export function getCurrentUser(): User | null {
  return getStoredData<User | null>(STORAGE_KEYS.USER, null);
}

// Login user
export function loginUser(username: string): void {
  const user: User = {
    username,
    loggedInAt: new Date().toISOString()
  };
  saveData(STORAGE_KEYS.USER, user);
}

// Logout user
export function logoutUser(): void {
  localStorage.removeItem(STORAGE_KEYS.USER);
}

// Get initial empty data structures
export function getEmptySheet1Data(): Sheet1Data {
  return {
    header: {
      nwSubWatershed: '',
      village: '',
      tehsil: '',
      district: '',
      state: 'Telangana',
      series: '',
      mappingUnit: '',
      augerBoreNo: '',
      baseMap: '',
      physiography: '',
      siteLocation: '',
      parentMaterial: '',
      slope: 0,
      aspect: '',
      naturalVegetation: '',
      landUse: '',
      salineAlkali: 'None',
      erosionType: 'None',
      erosionSeverity: 'Slight',
      rockyStonyPhases: 'None',
      remarks: ''
    },
    observations: []
  };
}

export function getEmptySheet2Data(): Sheet2Data {
  return {
    horizons: []
  };
}