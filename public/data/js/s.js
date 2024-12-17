const buttons = document.querySelectorAll('.sidebar button');
        const sections = document.querySelectorAll('.option-section');

        buttons.forEach(button => {
            button.addEventListener('click', () => {
                // Remove active class from all buttons and sections
                buttons.forEach(btn => btn.classList.remove('active'));
                sections.forEach(section => section.classList.remove('active'));

                // Add active class to the clicked button and its section
                button.classList.add('active');
                document.getElementById(button.dataset.target).classList.add('active');
            });
        });

        // Save and apply custom CSS
        const textarea = document.querySelector('textarea');
        const customStyle = document.createElement('style');
        document.head.appendChild(customStyle);

        const savedCSS = localStorage.getItem('customCSS');
        if (savedCSS) {
            customStyle.textContent = savedCSS;
            textarea.value = savedCSS;
        }

        textarea.addEventListener('input', () => {
            const css = textarea.value;
            customStyle.textContent = css;
            localStorage.setItem('customCSS', css);
        });

        // Theme dropdown functionality
        document.addEventListener('DOMContentLoaded', () => {
            const dropdownHeader = document.querySelector('.dropdown-header');
            const dropdownList = document.querySelector('.dropdown-list');
            const selectedTheme = document.getElementById('selected-theme');
            const THEME_KEY = 'userTheme';

            // Show/hide dropdown list
            dropdownHeader.addEventListener('click', () => {
                dropdownList.style.display = dropdownList.style.display === 'block' ? 'none' : 'block';
            });

            // Apply saved theme on load
            const savedTheme = localStorage.getItem(THEME_KEY);
            if (savedTheme) {
                document.body.className = savedTheme;
                const themeName = document.querySelector(`[data-theme="${savedTheme}"]`).textContent;
                selectedTheme.textContent = themeName;
            }

            // Handle theme selection
            dropdownList.addEventListener('click', (event) => {
                if (event.target.tagName === 'LI') {
                    const theme = event.target.getAttribute('data-theme');
                    document.body.className = theme;
                    localStorage.setItem(THEME_KEY, theme);

                    // Update dropdown display
                    selectedTheme.textContent = event.target.textContent;
                    dropdownList.style.display = 'none';
                }
            });

            // Close dropdown when clicking outside
            document.addEventListener('click', (event) => {
                if (!dropdownHeader.contains(event.target) && !dropdownList.contains(event.target)) {
                    dropdownList.style.display = 'none';
                }
            });
        });