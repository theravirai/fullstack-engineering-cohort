// js/theme.js

const THEME_KEY = 'theme-preference';

/**
 * Applies the given theme to the document body using three distinct DOM APIs.
 * Demonstrates: setAttribute, dataset (property), and classList.
 * @param {'light'|'dark'} theme 
 */
function applyTheme(theme) {
    const isDark = theme === 'dark';

    // 1. setAttribute API (HTML Attribute modification)
    // - attribute represents the value as represented in the HTML source code/markup.
    // - setAttribute explicitly updates the HTML attribute on the DOM node.
    document.body.setAttribute('data-theme', theme);

    // 2. dataset Property API (DOM Object Property modification)
    // - property represents the dynamic live state in the browser's JavaScript execution context.
    // - dataset is a special DOMStringMap property that synchronizes back to custom data-* attributes.
    document.body.dataset.theme = theme;

    // 3. classList API (CSS Class styling wrapper)
    // - classList is a DOMTokenList property providing helper methods to manipulate the element's classes.
    document.body.classList.toggle('dark-theme', isDark);

    // Update the button icon
    const themeIcon = document.getElementById('theme-icon');
    if (themeIcon) {
        themeIcon.textContent = isDark ? '☀️' : '🌙';
    }

    // Save choice to localStorage (Persistence)
    localStorage.setItem(THEME_KEY, theme);
    console.log(`[Theme Manager] Applied & saved theme: ${theme}`);
}

/**
 * Initializes the theme system. Retrieves stored theme preference or falls back
 * to standard user preference, applies it, and registers click event listener.
 */
export function initTheme() {
    // Retrieve theme preference from localStorage, or check system preference
    const storedTheme = localStorage.getItem(THEME_KEY);
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const initialTheme = storedTheme || (systemPrefersDark ? 'dark' : 'light');

    // Apply the initial theme
    applyTheme(initialTheme);

    // Wire up theme toggle button event listener
    const themeToggleBtn = document.getElementById('theme-toggle');
    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            // Using getAttribute to read the live HTML attribute
            const currentTheme = document.body.getAttribute('data-theme') || 'light';
            const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';
            applyTheme(nextTheme);
        });
    } else {
        console.warn('Theme toggle button not found in DOM.');
    }
}
