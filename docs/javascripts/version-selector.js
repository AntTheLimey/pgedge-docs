// Version selector dropdown functionality
// Uses event delegation to avoid duplicate handlers and state issues
(function() {
    'use strict';

    // Single source of truth for open menu
    var openSelector = null;

    function getElements(selector) {
        return {
            selector: selector,
            toggle: selector.querySelector('.md-version-selector__toggle'),
            menu: selector.querySelector('.md-version-selector__menu')
        };
    }

    function showMenu(selector) {
        var els = getElements(selector);
        if (!els.toggle || !els.menu) return;

        // Close any other open menu first
        if (openSelector && openSelector !== selector) {
            hideMenu();
        }

        els.menu.style.display = 'block';
        selector.classList.add('is-open');
        els.toggle.setAttribute('aria-expanded', 'true');
        openSelector = selector;
    }

    function hideMenu() {
        if (!openSelector) return;

        var els = getElements(openSelector);
        if (els.menu) {
            els.menu.style.display = 'none';
        }
        openSelector.classList.remove('is-open');
        if (els.toggle) {
            els.toggle.setAttribute('aria-expanded', 'false');
        }
        openSelector = null;
    }

    function isMenuOpen(selector) {
        return openSelector === selector;
    }

    // Check if a URL exists (returns a promise)
    function urlExists(url) {
        return fetch(url, { method: 'HEAD' })
            .then(function(response) { return response.ok; })
            .catch(function() { return false; });
    }

    // Handle clicks using event delegation
    document.addEventListener('click', function(e) {
        // Check if click is on a version selector toggle
        var toggle = e.target.closest('.md-version-selector__toggle');
        if (toggle) {
            e.preventDefault();
            e.stopPropagation();

            var selector = toggle.closest('.md-version-selector');
            if (!selector) return;

            if (isMenuOpen(selector)) {
                hideMenu();
            } else {
                showMenu(selector);
            }
            return;
        }

        // Check if click is on a version link
        var link = e.target.closest('.md-version-selector__link');
        if (link) {
            var selector = link.closest('.md-version-selector');
            if (!selector) return;

            var targetVersion = link.dataset.versionSlug;
            var docset = link.dataset.docset;
            var currentSubpath = selector.dataset.currentSubpath;

            // If no subpath, let the default link behavior happen
            if (!currentSubpath || !targetVersion || !docset) {
                hideMenu();
                return;
            }

            // Prevent default to handle navigation ourselves
            e.preventDefault();
            hideMenu();

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
            return;
        }

        // Click outside - close any open menu
        if (openSelector && !openSelector.contains(e.target)) {
            hideMenu();
        }
    });

    // Handle keyboard navigation using event delegation
    document.addEventListener('keydown', function(e) {
        // Escape closes any open menu
        if (e.key === 'Escape' && openSelector) {
            var els = getElements(openSelector);
            hideMenu();
            if (els.toggle) {
                els.toggle.focus();
            }
            return;
        }

        // Enter/Space on toggle
        var toggle = e.target.closest('.md-version-selector__toggle');
        if (toggle && (e.key === 'Enter' || e.key === ' ')) {
            e.preventDefault();
            toggle.click();
        }
    });

    // Initialize menu state (ensure all menus start closed)
    function initMenuState() {
        var selectors = document.querySelectorAll('.md-version-selector');
        selectors.forEach(function(selector) {
            var menu = selector.querySelector('.md-version-selector__menu');
            if (menu) {
                menu.style.display = 'none';
            }
            selector.classList.remove('is-open');
            var toggle = selector.querySelector('.md-version-selector__toggle');
            if (toggle) {
                toggle.setAttribute('aria-expanded', 'false');
            }
        });
        // Reset open state on navigation
        openSelector = null;
    }

    // Initialize on page load
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initMenuState);
    } else {
        initMenuState();
    }

    // Re-initialize after instant navigation (MkDocs Material)
    if (typeof document$ !== 'undefined') {
        document$.subscribe(function() {
            // Small delay to ensure DOM is updated
            setTimeout(initMenuState, 10);
        });
    }

    // Fallback: detect URL changes and reset state
    var lastUrl = location.href;
    setInterval(function() {
        if (location.href !== lastUrl) {
            lastUrl = location.href;
            setTimeout(initMenuState, 50);
        }
    }, 100);
})();
