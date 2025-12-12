// Fetch and display total GitHub stars across all pgEdge org repos
(function() {
    const ORG_NAME = 'pgEdge';
    const CACHE_KEY = 'pgedge_org_stars';
    const CACHE_DURATION = 3600000; // 1 hour in milliseconds

    async function fetchOrgStars() {
        // Check cache first
        const cached = localStorage.getItem(CACHE_KEY);
        if (cached) {
            const { stars, timestamp } = JSON.parse(cached);
            if (Date.now() - timestamp < CACHE_DURATION) {
                return stars;
            }
        }

        try {
            // Fetch all public repos from the org (paginated)
            let allRepos = [];
            let page = 1;
            let hasMore = true;

            while (hasMore) {
                const response = await fetch(
                    `https://api.github.com/orgs/${ORG_NAME}/repos?type=public&per_page=100&page=${page}`,
                    { headers: { 'Accept': 'application/vnd.github.v3+json' } }
                );

                if (!response.ok) {
                    throw new Error(`GitHub API error: ${response.status}`);
                }

                const repos = await response.json();
                if (repos.length === 0) {
                    hasMore = false;
                } else {
                    allRepos = allRepos.concat(repos);
                    page++;
                }
            }

            // Sum up all stars
            const totalStars = allRepos.reduce((sum, repo) => sum + repo.stargazers_count, 0);

            // Cache the result
            localStorage.setItem(CACHE_KEY, JSON.stringify({
                stars: totalStars,
                timestamp: Date.now()
            }));

            return totalStars;
        } catch (error) {
            console.error('Failed to fetch org stars:', error);
            return null;
        }
    }

    function formatStars(count) {
        if (count >= 1000) {
            return (count / 1000).toFixed(1) + 'k';
        }
        return count.toString();
    }

    async function updateStarCount() {
        const stars = await fetchOrgStars();
        if (stars === null) return;

        // Find the star count element (Material theme uses .md-source__repository)
        const sourceElement = document.querySelector('.md-source__facts');
        if (sourceElement) {
            // Look for existing star count or create one
            let starFact = sourceElement.querySelector('.md-source__fact--stars');
            if (!starFact) {
                starFact = document.createElement('li');
                starFact.className = 'md-source__fact md-source__fact--stars';
                sourceElement.appendChild(starFact);
            }
            starFact.textContent = formatStars(stars);
            starFact.title = `${stars} stars across all pgEdge repositories`;
        }
    }

    // Run on page load
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', updateStarCount);
    } else {
        updateStarCount();
    }

    // Re-run after instant navigation (MkDocs Material)
    if (typeof document$ !== 'undefined') {
        document$.subscribe(updateStarCount);
    }
})();
