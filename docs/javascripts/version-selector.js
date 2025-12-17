// Version selector dropdown functionality
// Handles dropdown toggle, outside clicks, and keyboard navigation
(function() {
    let activeSelector = null;
    let activeMenu = null;
    let activeToggle = null;

    function showMenu(selector, toggle, menu) {
        // Close any currently open selector first
        if (activeSelector && activeSelector !== selector) {
            hideMenu();
        }

        menu.style.display = 'block';
        selector.classList.add('is-open');
        toggle.setAttribute('aria-expanded', 'true');

        activeSelector = selector;
        activeMenu = menu;
        activeToggle = toggle;
    }

    function hideMenu() {
        if (activeMenu) {
            activeMenu.style.display = 'none';
        }
        if (activeSelector) {
            activeSelector.classList.remove('is-open');
        }
        if (activeToggle) {
            activeToggle.setAttribute('aria-expanded', 'false');
        }

        activeSelector = null;
        activeMenu = null;
        activeToggle = null;
    }

    function initVersionSelectors() {
        const selectors = document.querySelectorAll('.md-version-selector');

        selectors.forEach(function(selector) {
            const toggle = selector.querySelector('.md-version-selector__toggle');
            const menu = selector.querySelector('.md-version-selector__menu');

            if (!toggle || !menu) return;

            // Reset menu state
            menu.style.display = 'none';
            selector.classList.remove('is-open');

            // Remove any existing listeners by cloning
            const newToggle = toggle.cloneNode(true);
            toggle.parentNode.replaceChild(newToggle, toggle);

            newToggle.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();

                const isCurrentlyOpen = selector.classList.contains('is-open');

                if (isCurrentlyOpen) {
                    hideMenu();
                } else {
                    showMenu(selector, this, menu);
                }
            });

            // Add keyboard navigation
            newToggle.addEventListener('keydown', function(e) {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    this.click();
                }
            });
        });
    }

    // Close dropdown when clicking outside
    document.addEventListener('click', function(e) {
        if (!activeSelector || !activeMenu) return;

        // Check if click is outside both selector and menu
        if (!activeSelector.contains(e.target)) {
            hideMenu();
        }
    });

    // Close dropdown on escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && activeSelector) {
            hideMenu();
            activeToggle?.focus();
        }
    });

    // Initialize on page load
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initVersionSelectors);
    } else {
        initVersionSelectors();
    }

    // Re-initialize after instant navigation (MkDocs Material)
    if (typeof document$ !== 'undefined') {
        document$.subscribe(initVersionSelectors);
    }
})();
