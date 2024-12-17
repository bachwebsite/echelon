const THEME_KEY = 'userTheme';

// Apply saved theme on page load
function applyTheme(theme) {
    document.body.className = theme; // Add theme class to body
    localStorage.setItem(THEME_KEY, theme);
}

// Load the saved theme from localStorage (if available)
function loadSavedTheme() {
    const savedTheme = localStorage.getItem(THEME_KEY);
    if (savedTheme) {
        document.body.className = savedTheme;
    }
}

// Set up event listeners for theme change from the dropdown
document.addEventListener('DOMContentLoaded', () => {
    loadSavedTheme();

    const themeItems = document.querySelectorAll('.dropdown-list li');
    themeItems.forEach(item => {
        item.addEventListener('click', () => {
            const theme = item.dataset.theme;
            applyTheme(theme);
            // Update dropdown display to show selected theme
            document.getElementById('selected-theme').textContent = item.textContent;
        });
    });
});
