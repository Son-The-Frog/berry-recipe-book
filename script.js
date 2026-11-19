const recipes = [
    { name: "Honey Glazed Berry Berries", ingredients: "Sweet honey, giant red berries, a pinch of sugar.", category: "General", favorite: false, time: "15 mins", flies: 2 },
    { name: "Blueberry Morning Porridge", ingredients: "Oats, warm milk, blueberries, and a drizzle of honey.", category: "Foggy Day", favorite: false, time: "10 mins", flies: 5 },
    { name: "Warm Berry Tea", ingredients: "Dried berries, boiling water, a cinnamon stick.", category: "Foggy Day", favorite: false, time: "5 mins", flies: 1 }
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
                item.onclick = () => toggleRecipe(item);

                const favBtn = document.createElement('button');
                favBtn.className = `fav-btn ${recipe.favorite ? 'active' : ''}`;
                favBtn.innerText = '★';
                favBtn.onclick = (e) => {
                    e.stopPropagation();
                    toggleFavorite(recipe);
                };

                const name = document.createElement('div');
                name.className = 'recipe-name';
                name.innerText = recipe.name;

                const details = document.createElement('div');
                details.className = 'recipe-details';
                details.innerText = `Ingredients: ${recipe.ingredients} | Time: ${recipe.time} | Flies: ${recipe.flies}`;

                item.appendChild(favBtn);
                item.appendChild(name);
                item.appendChild(details);
                item.appendChild(document.createElement('div')); // spacing
                
                list.appendChild(item);
            });

            container.appendChild(section);
        }
    });
}

function toggleRecipe(item) {
    item.classList.toggle('active');
}

function toggleFavorite(recipe) {
    recipe.favorite = !recipe.favorite;
    loadRecipes();
}

function addRecipe() {
    const name = document.getElementById('recipe-name').value;
    const ingredients = document.getElementById('recipe-ingredients').value;
    const time = document.getElementById('recipe-time').value;
    const flies = document.getElementById('recipe-flies').value;
    const category = document.getElementById('recipe-category').value;

    if (name && ingredients) {
        recipes.push({
            name: name,
            ingredients: ingredients,
            time: time || "Unknown",
            flies: flies || 0,
            category: category,
            favorite: false
        });
        
        // Clear inputs
        document.getElementById('recipe-name').value = '';
        document.getElementById('recipe-ingredients').value = '';
        document.getElementById('recipe-time').value = '';
        document.getElementById('recipe-flies').value = '';
        
        loadRecipes();
    }
}

function filterRecipes() {
    const searchText = document.getElementById('recipe-search').value;
    loadRecipes(searchText);
}

loadRecipes();