import { writable } from 'svelte/store';
import type { ZodIssue } from 'zod';

export const zodIssues = writable<Array<ZodIssue>>([]);

export function addZodIssue(issue: ZodIssue) {
	zodIssues.update((prevIssues) => [...prevIssues, issue]);
}

export function setZodIssues(issues: Array<ZodIssue> | undefined) {
	if (!issues) {
		zodIssues.set([]);
		return;
	}
	zodIssues.set(issues);
}
