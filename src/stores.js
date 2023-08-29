import { writable } from 'svelte/store';
import dataCodeDictEn from '$lib/data/en_code_dict.js'
import dataCodeDictHi from '$lib/data/hi_code_dict.js'
import dataGroupDescriptions from '$lib/data/group-descriptions.js';
import dataGroupCodeMap from '$lib/data/group-code-map.js';

const storedOccupationGroupDescriptions = dataGroupDescriptions
const storedGroupCodeMap = dataGroupCodeMap
const storedSelectedGroups = localStorage.selectedGroups || "empty"
const storedCodeDictEn = dataCodeDictEn
const storedCodeDictHi = dataCodeDictHi
const storedSelectionChanged = 0;

export const occupationGroupDescriptions = writable(storedOccupationGroupDescriptions || {})
export const groupCodeMap = writable(storedGroupCodeMap || {})
export const codeDictEn = writable(storedCodeDictEn || {})
export const codeDictHi = writable(storedCodeDictHi || {})
export const selectedGroups = writable(storedSelectedGroups || "empty")
export const selectionChanged = writable(storedSelectionChanged || 0)

selectedGroups.subscribe((value) => localStorage.selectedGroups = value)