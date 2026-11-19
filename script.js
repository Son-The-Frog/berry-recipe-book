const recipes = [
    { name: "Honey Glazed Berry Berries", ingredients: "Sweet honey, giant red berries, a pinch of sugar.", category: "General", favorite: false, time: "15 mins" },
    { name: "Blueberry Morning Porridge", ingredients: "Oats, warm milk, blueberries, and a drizzle of honey.", category: "Foggy Day", favorite: false, time: "10 mins" },
    { name: "Warm Berry Tea", ingredients: "Dried berries, boiling water, a cinnamon stick.", category: "Foggy Day", favorite: false, time: "5 mins" }
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
                    recipe.favorite = !recipe.favorite;
                    loadRecipes(document.getElementById('recipe-search').value);
                };

                const name = document.createElement('strong');
                name.innerText = recipe.name;
                
                const timeLabel = document.createElement('span');
                timeLabel.className = 'recipe-time';
                timeLabel.innerText = ` (${recipe.time || 'Unknown time'})`;
                
                item.appendChild(favBtn);
                item.appendChild(name);
                item.appendChild(timeLabel);

                const details = document.createElement('div');
                details.className = 'recipe-details';
                details.innerText = recipe.ingredients;

                item.onclick = () => {
                    item.classList.toggle('active');
                };

                item.appendChild(details);
                list.appendChild(item);
            });
        }
    });

    // Special case for Favorites
    const favoriteRecipes = recipes.filter(r => r.favorite);
    if (favoriteRecipes.length > 0) {
        const favSection = document.createElement('div');
        favSection.className = 'category-section';
        
        const favTitle = document.createElement('h3');
        favTitle.className = 'category-title';
        favTitle.innerText = '⭐ Favorites';
        
        const favList = document.createElement('ul');
        favList.className = 'recipe-list';

        favoriteRecipes.forEach(recipe => {
            const item = document.createElement('li');
            item.className = 'recipe-item';
            
            const favBtn = document.createElement('button');
            favBtn.className = 'fav-btn active';
            favBtn.innerHTML = '❤';
            favBtn.onclick = (e) => {
                e.stopPropagation();
                recipe.favorite = !recipe.favorite;
                loadRecipes(document.getElementById('recipe-search').value);
            };

            const name = document.createElement('strong');
            name.innerText = recipe.name;
            
            const timeLabel = document.createElement('span');
            timeLabel.className = 'recipe-time';
            timeLabel.innerText = ` (${recipe.time || 'Unknown time'})`;

            item.appendChild(favBtn);
            item.appendChild(name);
            item.appendChild(timeLabel);

            const details = document.createElement('div');
            details.className = 'recipe-details';
            details.innerText = recipe.ingredients;

            item.onclick = () => {
                item.classList.toggle('active');
            };

            item.appendChild(details);
            favList.appendChild(item);
        });
        container.appendChild(favSection);
    }
}

function addRecipe() {
    const name = document.getElementById('recipe-name').value;
    const ingredients = document.getElementById('recipe-ingredients').value;
    const time = document.getElementById('recipe-time').value;
    const category = document.getElementById('recipe-category').value;

    if (name && ingredients) {
        recipes.push({ name, ingredients, category, favorite: false, time });
        // Clear inputs
        document.getElementById('recipe-name').value = '';
        document.getElementById('recipe-ingredients').value = '';
        document.getElementById('recipe-time').value = '';
        loadRecipes();
    } else {
        alert('Please enter a name and ingredients!');
    } 
}

function filterRecipes() {
    loadRecipes(document.getElementById('recipe-search').value);
}

// Initial load
loadRecipes();