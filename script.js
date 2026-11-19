const recipes = [
    { name: "Honey Glazed Berry Berries", ingredients: "Sweet honey, giant red berries, a pinch of sugar.", category: "General" },
    { name: "Sunny-Day Berry Mix-up", ingredients: "Lots of wild berries, and a whole bunch of flies!", category: "General" }
];

function renderRecipes() {
    const container = document.getElementById('categories-container');
    container.innerHTML = '';

    const categories = [...new Set(recipes.map(r => r.category))];

    categories.forEach(category => {
        const section = document.createElement('div');
        section.innerHTML = `<h3 class=