import { writable } from 'svelte/store';

const STORAGE_KEY = 'color-scheme';

function getInitialScheme(): 'light' | 'dark' {
    if (typeof localStorage !== 'undefined') {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored === 'light' || stored === 'dark') return stored;
    }
    // Optionally, check system preference:
    if (typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        return 'dark';
    }
    return 'light';
}

export function toggleColorScheme() {
    const colorScheme = writable<'light' | 'dark'>(getInitialScheme());

    colorScheme.subscribe((scheme) => {
        if (typeof localStorage !== 'undefined') {
            localStorage.setItem(STORAGE_KEY, scheme);
        }
    });

    function toggleScheme() {
        colorScheme.update((scheme) => (scheme === 'light' ? 'dark' : 'light'));
    }

    return {
        ...colorScheme,
        toggleScheme,
    };
}