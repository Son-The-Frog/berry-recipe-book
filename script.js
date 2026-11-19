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
        const catDiv = document.createElement('div');
        catDiv.className = `category-section ${cat === 'Foggy Day' ? 'category-foggy' : ''}`;
        
        const title = document.createElement('h3');
        title.className = 'category-title';
        title.innerText = cat;
        catDiv.appendChild(title);

        const list = document.createElement('ul');
        list.className = 'recipe-list';
        
        recipes.filter(r => r.category === cat && r.name.toLowerCase().includes(filterText.toLowerCase())).
            // Simple filter for ingredients too
            .filter(r => r.ingredients.toLowerCase().includes(filterText.toLowerCase()))
            .forEach(recipe => {
                const li = document.createElement('li');
                li.className = 'recipe-item';
                li.innerHTML = `
                    <button class="fav-btn ${recipe.favorite ? 'active' : ''}" onclick="event.stopPropagation(); toggleFavorite(event, '${recipe.name}')">
                        ${recipe.favorite ? '❤️' : '🤍'}
                    </button>
                    <div class="recipe-name">${recipe.name}</div>
                    <div class="recipe-details">
                        ${recipe.time} | ${recipe.flies} flies needed
                    </div>
                `;
                li.onclick = () => {
                    li.classList.add('click-bounce');
                    setTimeout(() => li.classList.remove('click-bounce'), 300);
                    li.classList.toggle('active');
                };
                
                list.appendChild(li);
            });

        catDiv.appendChild(list);
        container.appendChild(catDiv);
    });
}

function addRecipe() {
    const name = document.getElementById('recipe-name').value;
    const ingredients = document.getElementById('recipe-ingredients').value;
    const time = document.getElementById('recipe-time').value;
    const flies = document.getElementById('recipe-flies').value;
    const category = document.getElementById('recipe-category').value;

    if (!name || !ingredients) {
        alert("Please give your berry recipe a name and ingredients!");
        return;
    }

    recipes.push({
        name: name,
        ingredients: ingredients,
        category: category,
        favorite: false,
        time: time,
        flies: flies
    });

    // Clear inputs
    document.getElementById('recipe-name').value = '';
    document.getElementById('recipe-ingredients').value = '';
    document.getElementById('recipe-time').value = '';
    document.getElementById('recipe-flies').value = '';

    loadRecipes();
}

function toggleFavorite(event, recipeName) {
    const recipe = recipes.find(r => r.name === recipeName);
    if (recipe) {
        recipe.favorite = !recipe.favorite;
        loadRecipes();
    }
}

function filterRecipes() {
    loadRecipes(document.getElementById('recipe-search').value);
}

function pickRandomRecipe() {
    const filtered = recipes.filter(r => r.name.toLowerCase().includes(document.getElementById('recipe-search').value.toLowerCase()));
    if (filtered.length === 0) {
        alert("No berries to pick! Try searching for something else.");
        return;
    }
    
    const randomIndex = Math.floor(Math.random() * filtered.length);
    const selectedRecipe = filtered[randomIndex];
    
    // Redraw to ensure we have the element to target
    loadRecipes();
    
    // Find the element by name (since we can't easily map indices to DOM elements)
    const recipeElements = document.querySelectorAll('.recipe-item');
    const target// [context trimmed]...]