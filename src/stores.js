import { writable } from 'svelte/store';

import domainDescriptions from '$lib/data/domain-descriptions.js';
import riasecStatements from '$lib/data/riasec-statements.js';
import riasecExplanation from '$lib/data/riasec-explanation.js';
const storedDomainDescriptions = domainDescriptions;
const storedRiasecStatements = riasecStatements;
const storedRiasecExplanation = riasecExplanation;

export const domains = writable(storedDomainDescriptions || {});
export const statements = writable(storedRiasecStatements || {});
export const explanation = writable(storedRiasecExplanation || {});
export const selectedDomains = writable([]);