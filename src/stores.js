import { writable } from 'svelte/store';

import domainDescriptions from '$lib/data/domain-descriptions.js';
import riasecStatements from '$lib/data/riasec-statements.js';
import riasecExplanation from '$lib/data/riasec-explanation.js';
import riasecLikes from '$lib/data/riasec-likes.js';
const storedDomainDescriptions = domainDescriptions;
const storedRiasecStatements = riasecStatements;
const storedRiasecExplanation = riasecExplanation;
const storedRiasecLikes = riasecLikes;

export const domains = writable(storedDomainDescriptions || {});
export const statements = writable(storedRiasecStatements || {});
export const explanation = writable(storedRiasecExplanation || {});
export const likes = writable(storedRiasecLikes || {});
export const selectedDomains = writable([]);
export const studentName = writable('');
export const studentGender = writable('');
export const studentClass = writable('');
export const riasecScores = writable({});
export const totalStatements = writable(0);
export const selectedStatements = writable('');