let recipes = [
    { name: "Strawberry Shortcake", ingredients: ["Strawberry", "Cream", "Flour", "Sugar"], time: "30 mins", flies: 5, category: "General" },
    { name: "Blueberry Muffin", ingredients: ["Blueberry", "Butter", "Flour", "Lour", "Sugar"], time: "20 mins", flies: 5, category: "General" },
    { name: "Honey Glazed Berry Berries", ingredients: ["Berry", "Honey", "Butter"], time: "15 mins", flies: 3, category: "Foggy Day" },
    { name: "Blueberry Jam up in the Sky", ingredients: ["Blueberry", "Blueberry", "Sugar", "Lemon"], time: "45 mins", flies: 10, category: "Foggy Day" }
];

let shoppingList = [];

function renderRecipes() {
    const container = document.getElementById('categories-container');
    container.innerHTML = '';

    const categories = [...new Set(recipes.map(r => r.category))];
    
    categories.forEach(category => {
        const categoryDiv = document.createElement('div');
        categoryDiv.className = 'category-group';
        categoryDiv.innerHTML = `<h3 class="category-title">${category}</h3><ul class="recipe-list"></ul>`;
        
        const list = categoryDiv.querySelector('.recipe-list');
        
        recipes.filter(r => r.category === category).forEach(recipe => {
            const li = document.createElement('li');
            li.className = 'recipe-item';
            li.onclick = () => toggleRecipeDetails(li);
            
            li.innerHTML = `
                <strong>${recipe.name}</strong>
                <button class="fav-btn" onclick="event.stopPropagation(); toggleFavorite(this, '${recipe.name}')">★</button>
                <div class="recipe-details">
                    <ul class="ingredients-list">
                        ${recipe.ingredients.map(ing => `<li>${ing}</li>`).join('')}
                    </ul>
                    <p>Time: ${recipe.time} | Flies: ${recipe.flies}</p>
                </div>
            `;
            list.appendChild(li);
        });
    });
}

function toggleRecipeDetails(element) {
    element.classList.toggle('active');
}

function addRecipe() {
    const name = document.getElementById('recipe-name').value;
    const ingredients = document.getElementById('recipe-ingredients').value.split(',').map(i => i.trim());
    const time = document.getElementById('recipe-time').value;
    const flies = document.getElementById('recipe-flies').value;
    const category = document.getElementById('recipe-category').value;

    if (name && ingredients[0] && time && flies) {
        recipes.push({ name, ingredients, time, flies, category });
        renderRecipes();
        
        document.getElementById('recipe-name').value = '';
        document.getElementById('recipe-ingredients').value = '';
        document.getElementById('recipe-time').value = '';
        document.getElementById('recipe-flies').value = '';
    }
}

function filterRecipes() {
    const searchTerm = document.getElementById('recipe-search').value.toLowerCase();
    const categoryFilter = document.getElementById('category-filter').value;

    const filtered = recipes.filter(r => 
        (r.name.toLowerCase().includes(searchTerm) || 
         r.ingredients.some(ing => ing.toLowerCase().includes(searchTerm))) &&
        (categoryFilter === 'All' || r.category === categoryFilter)
    );

    renderFilteredRecipes(filtered);
}

function renderFilteredRecipes(filteredRecipes) {
    const container = document.getElementById('categories-container');
    container.innerHTML = '';

    if (filteredRecipes.length === 0) {
        document.getElementById('no-results-message').style.display = 'block';
        return;
    } else {
        document.getElementById('no-results-message').style.display = 'none';
    }

    const categories = [...new Set(filteredRecipes.map(r => r.category))];
    
    categories.forEach(category => {
        const categoryDiv = document.createElement('div');
        categoryDiv.className = 'category-group';
        categoryDiv.innerHTML = `<h3 class="category-title">${category}</h3><ul class="recipe-list"></ul>`;
        const list = categoryDiv.querySelector('.recipe-list');
        
        filteredRecipes.filter(r => r.category === category).forEach(recipe => {
            const li = document.createElement('li');
            li.className = 'recipe-item';
            li.onclick = () => toggleRecipeDetails(li);
            li.innerHTML = `
                <strong>${recipe.name}</strong>
                <button class="fav-btn" onclick="event.stopPropagation(); toggleFavorite(this, '${recipe.name}')">★</button>
                <div class="recipe-details">
                    <ul class="ingredients-list">
                        ${recipe.ingredients.map(ing => `<li>${ing}</li>`).join('')}
                    </ul>
                    <p>Time: ${recipe.time} | Flies: ${recipe.flies}</p>
                </div>
            `;
            list.appendChild(li);
        });
    });
}

function pickRandomRecipe() {
    const random = recipes[Math.floor(Math.random() * recipes.length)];
    if (random) {
        renderRecipes();
        // I'll need a way to highlight it. For now just alert it.
        alert(`Son's Special Pick: ${random.name}!`);
    }
}

function clearFilters() {
    document.getElementById('recipe-search').value = '';
    document.getElementById('category-filter').value = 'All';
    renderRecipes();
    document.getElementById('no-results-message').style.display = 'none';
}

function toggleFavorite(btn, recipeName) {
    // Just a visual toggle for now
    btn.classList.toggle('active');
}

function addToShoppingList() {
    const input = document.getElementById('shopping-item-input');
    const item = input.value.trim();
    
    if (item) {
        shoppingList.push(item);
        input.value = '';
        renderShoppingList();
    }
}

function renderShoppingList() {
    const listElement = document.getElementById('shopping-list');
    listElement.innerHTML = '';
    
    shoppingList.forEach((item, index) => {
        const li = document.createElement('li');
        li.textContent = item;
        listElement.appendChild(li);
    });
}

window.onload = () => {
    renderRecipes();
};