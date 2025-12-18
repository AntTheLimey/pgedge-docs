// Version selector dropdown functionality
// Handles dropdown toggle, outside clicks, keyboard navigation, and smart version switching
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

    // Check if a URL exists (returns a promise)
    function urlExists(url) {
        return fetch(url, { method: 'HEAD' })
            .then(response => response.ok)
            .catch(() => false);
    }

    // Handle version link clicks - try same page, fall back to index
    function handleVersionClick(e) {
        const link = e.target.closest('.md-version-selector__link');
        if (!link) return;

        const selector = link.closest('.md-version-selector');
        if (!selector) return;

        const targetVersion = link.dataset.versionSlug;
        const docset = link.dataset.docset;
        const currentSubpath = selector.dataset.currentSubpath;

        // If no subpath or clicking same version, use default link behavior
        if (!currentSubpath || !targetVersion || !docset) {
            return;
        }

        // Prevent default to handle navigation ourselves
        e.preventDefault();

        const baseUrl = '/' + docset + '/' + targetVersion + '/';
        const samePageUrl = baseUrl + currentSubpath;
        const indexUrl = baseUrl;

        // Try the same page first, fall back to index
        urlExists(samePageUrl).then(exists => {
            if (exists) {
                window.location.href = samePageUrl;
            } else {
                window.location.href = indexUrl;
            }
        });
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

            // Handle version link clicks for smart switching
            menu.addEventListener('click', handleVersionClick);
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
