// Version selector dropdown functionality
// Handles dropdown toggle, outside clicks, keyboard navigation, and smart version switching
(function() {
    'use strict';

    let activeSelector = null;
    let activeMenu = null;
    let activeToggle = null;
    let initialized = new WeakSet();

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
            .then(function(response) { return response.ok; })
            .catch(function() { return false; });
    }

    // Handle version link clicks - try same page, fall back to index
    function handleVersionClick(e) {
        var link = e.target.closest('.md-version-selector__link');
        if (!link) return;

        var selector = link.closest('.md-version-selector');
        if (!selector) return;

        var targetVersion = link.dataset.versionSlug;
        var docset = link.dataset.docset;
        var currentSubpath = selector.dataset.currentSubpath;

        // If no subpath or clicking same version, use default link behavior
        if (!currentSubpath || !targetVersion || !docset) {
            return;
        }

        // Prevent default to handle navigation ourselves
        e.preventDefault();

        var baseUrl = '/' + docset + '/' + targetVersion + '/';
        var samePageUrl = baseUrl + currentSubpath;
        var indexUrl = baseUrl;

        // Try the same page first, fall back to index
        urlExists(samePageUrl).then(function(exists) {
            if (exists) {
                window.location.href = samePageUrl;
            } else {
                window.location.href = indexUrl;
            }
        });
    }

    function initSelector(selector) {
        // Skip if already initialized
        if (initialized.has(selector)) return;

        var toggle = selector.querySelector('.md-version-selector__toggle');
        var menu = selector.querySelector('.md-version-selector__menu');

        if (!toggle || !menu) return;

        // Mark as initialized
        initialized.add(selector);

        // Reset menu state
        menu.style.display = 'none';
        selector.classList.remove('is-open');

        // Add click handler to toggle
        toggle.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();

            var isCurrentlyOpen = selector.classList.contains('is-open');

            if (isCurrentlyOpen) {
                hideMenu();
            } else {
                showMenu(selector, toggle, menu);
            }
        });

        // Add keyboard navigation
        toggle.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                toggle.click();
            }
        });

        // Handle version link clicks for smart switching
        menu.addEventListener('click', handleVersionClick);
    }

    function initVersionSelectors() {
        var selectors = document.querySelectorAll('.md-version-selector');
        selectors.forEach(initSelector);
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
            if (activeToggle) activeToggle.focus();
        }
    });

    // Initialize on page load
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initVersionSelectors);
    } else {
        initVersionSelectors();
    }

    // Re-initialize after instant navigation (MkDocs Material)
    // Use multiple methods for reliability
    if (typeof document$ !== 'undefined') {
        document$.subscribe(function() {
            // Small delay to ensure DOM is updated
            setTimeout(initVersionSelectors, 10);
        });
    }

    // Also use location change detection as fallback
    var lastUrl = location.href;
    setInterval(function() {
        if (location.href !== lastUrl) {
            lastUrl = location.href;
            // Reset initialized set for new page
            initialized = new WeakSet();
            setTimeout(initVersionSelectors, 50);
        }
    }, 100);

    // MutationObserver as additional fallback for dynamically added selectors
    var observer = new MutationObserver(function(mutations) {
        var shouldInit = false;
        mutations.forEach(function(mutation) {
            if (mutation.addedNodes.length) {
                mutation.addedNodes.forEach(function(node) {
                    if (node.nodeType === 1) {
                        if (node.classList && node.classList.contains('md-version-selector')) {
                            shouldInit = true;
                        } else if (node.querySelector && node.querySelector('.md-version-selector')) {
                            shouldInit = true;
                        }
                    }
                });
            }
        });
        if (shouldInit) {
            initVersionSelectors();
        }
    });

    observer.observe(document.body, {
        childList: true,
        subtree: true
    });
})();
