// Dropdown menu functionality for navigation tabs
// Supports multiple dropdown menus, moves menu to body to avoid CSS containment issues
(function() {
    let activeDropdown = null;
    let activeMenu = null;
    let activeToggle = null;

    function positionMenu(toggle, menu) {
        const rect = toggle.getBoundingClientRect();
        menu.style.position = 'fixed';
        menu.style.top = rect.bottom + 'px';
        menu.style.left = rect.left + 'px';
        menu.style.zIndex = '999999';
    }

    function showMenu(dropdown, toggle, menu) {
        // Close any currently open dropdown first
        if (activeDropdown && activeDropdown !== dropdown) {
            hideMenu();
        }

        // Move menu to body to escape any CSS containment
        if (menu.parentElement !== document.body) {
            document.body.appendChild(menu);
        }

        positionMenu(toggle, menu);
        menu.style.display = 'block';
        dropdown.classList.add('is-open');
        toggle.setAttribute('aria-expanded', 'true');

        activeDropdown = dropdown;
        activeMenu = menu;
        activeToggle = toggle;
    }

    function hideMenu() {
        if (activeMenu) {
            activeMenu.style.display = 'none';
        }
        if (activeDropdown) {
            activeDropdown.classList.remove('is-open');
        }
        if (activeToggle) {
            activeToggle.setAttribute('aria-expanded', 'false');
        }

        activeDropdown = null;
        activeMenu = null;
        activeToggle = null;
    }

    function initDropdowns() {
        const dropdowns = document.querySelectorAll('.md-tabs__dropdown');

        dropdowns.forEach(function(dropdown) {
            const toggle = dropdown.querySelector('.md-tabs__dropdown-toggle');
            const menu = dropdown.querySelector('.md-tabs__dropdown-menu');

            if (!toggle || !menu) return;

            // Store reference to menu on dropdown element
            dropdown._menu = menu;

            // Reset menu state
            menu.style.display = 'none';
            dropdown.classList.remove('is-open');

            // Remove any existing listeners by cloning
            const newToggle = toggle.cloneNode(true);
            toggle.parentNode.replaceChild(newToggle, toggle);

            newToggle.addEventListener('click', function(e) {
                e.preventDefault();
                e.stopPropagation();

                const isCurrentlyOpen = dropdown.classList.contains('is-open');

                if (isCurrentlyOpen) {
                    hideMenu();
                } else {
                    showMenu(dropdown, this, dropdown._menu);
                }
            });

            // Add click handlers to menu links
            const links = menu.querySelectorAll('.md-tabs__dropdown-link');
            links.forEach(function(link) {
                link.addEventListener('click', function() {
                    hideMenu();
                });
            });
        });
    }

    // Close dropdown when clicking outside
    document.addEventListener('click', function(e) {
        if (!activeDropdown || !activeMenu) return;

        // Check if click is outside both dropdown and menu
        if (!activeDropdown.contains(e.target) && !activeMenu.contains(e.target)) {
            hideMenu();
        }
    });

    // Close dropdown on escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && activeDropdown) {
            hideMenu();
            activeToggle?.focus();
        }
    });

    // Close on scroll
    window.addEventListener('scroll', function() {
        if (activeDropdown) {
            hideMenu();
        }
    });

    // Initialize on page load
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initDropdowns);
    } else {
        initDropdowns();
    }

    // Re-initialize after instant navigation (MkDocs Material)
    if (typeof document$ !== 'undefined') {
        document$.subscribe(initDropdowns);
    }
})();
