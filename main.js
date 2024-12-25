const navButton = document.querySelector('[aria-controls="site-navigation"]');
const siteNav = document.querySelector('.site-navigation');

const cards = document.querySelectorAll('.mushroom-guide .card');
const seasonFilter = document.querySelector('#season-filter');
const typeFilter = document.querySelector('#type-filter');
const noMatches = document.querySelector('.no-matches');

navButton.addEventListener('click', () => {
    const isNavOpen = navButton.getAttribute('aria-expanded') === 'true'; // attributes are always strings
    navButton.setAttribute('aria-expanded', !isNavOpen);
});

const filter = {
    season: 'all',
    type: 'all',
};

seasonFilter.addEventListener('change', updateFilters);
typeFilter.addEventListener('change', updateFilters);

function updateFilters(event) {
    const element = event.target;
    filter[element.name] = element.value;
    if (!document.startViewTransition) {
        filterCards();
        return;
    }
    document.startViewTransition(() => filterCards());
}

function filterCards() {
    let noResults = true;
    cards.forEach((card) => {
        const edible = card.querySelector('[data-edible]').dataset.edible;
        const season = card.querySelector('[data-season]').dataset.season;

        const showEdible = filter.type === 'all' || filter.type === edible;
        const showSeason = filter.season === 'all' || filter.season === season;

        if (showEdible && showSeason) {
            card.hidden = false;
            noResults = false;
        } else {
            card.hidden = true;
        }
    });
    if (noResults) {
        noMatches.hidden = false;
    } else {
        noMatches.hidden = true;
    }
}
