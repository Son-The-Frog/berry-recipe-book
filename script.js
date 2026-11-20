const recipes = [
    { name: "Honey Glazed Berry Berries", ingredients: "Sweet honey, giant red berries, a pinch of sugar.", category: "General", favorite: false, time: "15 mins", flies: 5 },
    { name: "Foggy Morning Berry Mash", ingredients: "Blueberries, cream, a bit of salt, warm milk.", category: "Foggy Day", favorite: false, time: "20 mins", flies: 3 },
    { name: "Summer Berry Crisp", ingredients: "Strawberries, raspberries, flour, butter, cinnamon.", category: "General", favorite: false, time: "45 mins", flies: 8 },
    { name: "Warm Berry Compote", ingredients: "Raspberries, orange zest, sugar, a bit of lemon juice.", category: "Foggy Day", favorite: false, time: "10 mins", flies: 2 },
    { name: "Ruby Red Berry Tart", ingredients: "Red currants, puff pastry, powdered sugar, vanilla extract.", category: "General", favorite: false, time: "30 mins", flies: 6 },
];

function renderRecipes() {
    const container = document.getElementById('categories-container');
    container.innerHTML = '';

    const categories = ['General', 'Foggy Day'];
    const searchTerm = document.getElementById('recipe-search').value.toLowerCase();
    const categoryFilter = document.getElementById('category-filter').value;

    categories.forEach(cat => {
        if (categoryFilter !== 'All' && categoryFilter !== cat) {
            return;
        }

        const filteredRecipes = recipes.filter(recipe => {
            return recipe.name.toLowerCase().includes(searchTerm) || 
                   recipe.ingredients.toLowerCase().includes(searchTerm);
        });

        if (filteredRecipes.length === 0) {
            return;
        }

        const section = document.createElement('div');
        section.className = category === 'Foggy Day' ? 'category-foggy' : '';
        section.innerHTML = `<h3 class="category-title">${cat}</h3>`;
        
        const list = document.createElement('ul');
        list.className = 'recipe-list';
        
        filteredRecipes.forEach(recipe => {
            const li = document.createElement('li');
            li.className = 'recipe-item';
            
            // Split ingredients into a list
            const ingredientsArray = recipe.ingredients.split(',').map(item => item.trim());
            const ingredientsHtml = ingredientsArray.map(item => `<li>${item}</li>`).join('');
            
            li.innerHTML = `
                <button class="fav-btn ${recipe.favorite ? 'active' : ''}" onclick="toggleFavorite(event, '${recipe.name}')">★</button>
                <div class="recipe-main">
                    <img src="assets/berry_icon.png" class="berry-icon" alt="berry">
                    <strong>${recipe.name}</strong>
                </div>
                <div class="recipe-details">
                    <p><strong>Time:</strong> ${recipe.time}</p>
                    <p><strong>Flies needed:</strong> ${recipe.flies}</p>
                    <p><strong>Ingredients:</strong></p>
                    <ul class="ingredients-list">
                        ${ingredientsHtml}
                    </ul>
                </div>
            `;
            
            li.onclick = () => {
                li.classList.toggle('active');
            };
            
            list.appendChild(li);
        });
        
        container.appendChild(section);
    });
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
            category: category,
            favorite: false,
            time: time || 'Unknown',
            flies: flies || 0
        });
        
        // Clear inputs
        document.getElementById('recipe-name').value = '';
        document.getElementById('recipe-ingredients').value = '';
        document.getElementById('recipe-time').value = '';
        document.getElementById('recipe-flies').value = '';
        
        renderRecipes();
    }
}

function toggleFavorite(event, name) {
    event.stopPropagation();
    const recipe = recipes.find(r => r.name === name);
    if (recipe) {
        recipe.favorite = !recipe.favorite;
        renderRecipes();
    }
}

function filterRecipes() {
    renderRecipes();
}

function clearFilters() {
    document.getElementById('recipe-search').value = '';
    document.getElementById('category-filter').value = 'All';
    renderRecipes();
}

function pickRandomRecipe() {
    const filtered = recipes.filter(recipe => {
        const searchTerm = document.getElementById('recipe-search').value.toLowerCase();
        return recipe.name.toLowerCase().includes(searchTerm);
    });
    
    if (filtered.length > 0) {
        const randomRecipe = filtered[Math.floor(Math.random() * filtered.length)];
        alert(`How about trying: ${randomRecipe.name}!`);
    }
}

renderRecipes();