const recipes = [
    { name: "Honey Glazed Berry Berries", ingredients: "Sweet honey, giant red berries, a pinch of sugar.", category: "General", favorite: false },
    { name: "Blueberry Morning Porridge", ingredients: "Oats, warm milk, blueberries, and a drizzle of honey.", category: "Foggy Day", favorite: false },
    { name: "Warm Berry Tea", ingredients: "Dried berries, boiling water, a cinnamon stick.", category: "Foggy Day", favorite: false }
];

function loadRecipes(filterText = "") {
    const container = document.getElementById('categories-container');
    container.innerHTML = '';

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

            filteredCategoryRecipes.forEach((recipe, index) => {
                const item = document.createElement('li');
                item.className = 'recipe-item';
                
                // Create Favorite Button
                const favBtn = document.createElement('button');
                favBtn.className = 'fav-btn' + (recipe.favorite ? ' active' : '');
                favBtn.innerHTML = '❤';
                favBtn.onclick = (e) => {
                    e.stopPropagation();
                    toggleFavorite(recipe);
                };

                item.innerHTML = `
                    <strong>${recipe.name}</strong>
                    <div class="recipe-details">
                        ${recipe.ingredients}
                    </div>
                `;
                item.appendChild(favBtn);
                
                item.onclick = () => {
                    item.classList.toggle('active');
                };
                
                list.appendChild(item);
            });

            container.appendChild(section);
        }
    });
}

function toggleFavorite(recipe) {
    recipe.favorite = !recipe.favorite;
    loadRecipes(document.getElementById('recipe-search').value);
}

function addRecipe() {
    const name = document.getElementById('recipe-name').value;
    const ingredients = document.getElementById('recipe-ingredients').value;
    const category = document.getElementById('recipe-category').value;

    if (name && ingredients) {
        recipes.push({ name, ingredients, category, favorite: false });
        
        document.getElementById('recipe-name').value = '';
        document.getElementById('recipe-ingredients').value = '';
        
        loadRecipes();
    }
}

function filterRecipes() {
    loadRecipes(document.getElementById('recipe-search').value);
}

// Initial load
loadRecipes();