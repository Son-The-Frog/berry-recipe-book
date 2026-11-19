const recipes = [
    { name: "Honey Glazed Berry Berries", ingredients: "Sweet honey, giant red berries, a pinch of sugar.", category: "General" },
    { name: "Blueberry Morning Porridge", ingredients: "Oats, warm milk, blueberries, and a drizzle of honey.", category: "Foggy Day" },
    { name: "Warm Berry Tea", ingredients: "Dried berries, boiling water, a cinnamon stick.", category: "Foggy Day" }
];

function loadRecipes(filterText = "") {
    const container = document.getElementById('categories-container');
    container.innerHTML = '';

    const filteredRecipes = recipes.filter(r => 
        r.name.toLowerCase().includes(filterText.toLowerCase()) || 
        r.ingredients.toLowerCase().includes(filterText.toLowerCase())
    );

    const categories = [...new Set(recipes.map(r => r.category))];

    categories.forEach(cat => {
        const categoryRecipes = recipes.filter(r => r.category === cat);
        const filteredCategoryRecipes = categoryRecipes.filter(r => 
            r.name.toLowerCase().includes(filterText.toLowerCase()) || 
            r.ingredients.toLowerCase().includes(filterText.toLowerCase())
        );

        if (filteredCategoryRecipes.length > 0) {
            const section = document.createElement('div');
            section.className = `category-section ${cat === 'Foggy Day' ? 'category-foggy' : ''}`;
            
            const title = document.createElement('h3');
            title.className = 'category-title';
            title.innerText = (cat === 'General' ? '🍓' : '☁️') + " " + cat;
            
            const list = document.createElement('ul');
            list.className = 'recipe-list';

            filteredCategoryRecipes.forEach(recipe => {
                const item = document.createElement('li');
                item.className = 'recipe-item';
                item.innerHTML = `<strong>${recipe.name}</strong><div class="recipe-details">${recipe.ingredients}</div>`;
                item.onclick = () => item.classList.toggle('active');
                list.appendChild(item);
            });

            section.appendChild(title);
            section.appendChild(list);
            container.appendChild(section);
        }
    });
}

function filterRecipes() {
    const searchInput = document.getElementById('recipe-search');
    loadRecipes(searchInput.value);
}

function addRecipe() {
    const name = document.getElementById('recipe-name').value;
    const ingredients = document.getElementById('recipe-ingredients').value;
    const category = document.getElementById('recipe-category').value;

    if (name && ingredients) {
        recipes.push({ name, ingredients, category });
        loadRecipes();
        document.getElementById('recipe-name').value = '';
        document.getElementById('recipe-ingredients').value = '';
    }
}

window.onload = loadRecipes;
