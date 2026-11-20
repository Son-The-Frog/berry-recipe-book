let recipes = [];
let shoppingList = [];

function init() {
    const savedRecipes = localStorage.getItem('berryRecipes');
    if (savedRecipes) {
        recipes = JSON.parse(savedRecipes);
        renderRecipes();
    }
    const savedShoppingList = localStorage.getItem('berryShoppingList');
    if (savedShoppingList) {
        shoppingList = JSON.parse(savedShoppingList);
        renderShoppingList();
    }
}

function addRecipe() {
    const name = document.getElementById('recipe-name').value;
    const ingredients = document.getElementById('recipe-ingredients').value;
    const time = document.getElementById('recipe-time').value;
    const flies = document.getElementById('recipe-flies').value;
    const category = document.getElementById('recipe-category').value;

    if (!name || !ingredients) {
        alert('Please enter at least a name and ingredients!');
        return;
    }

    const newRecipe = {
        id: Date.now(),
        name,
        ingredients,
        time,
        flies,
        category,
        isFavorite: false
    };

    recipes.push(newRecipe);
    saveRecipes();
    renderRecipes();
    clearRecipeForm();
}

function clearRecipeForm() {
    document.getElementById('recipe-name').value = '';
    document.getElementById('recipe-ingredients').value = '';
    document.getElementById('recipe-time').value = '';
    document.getElementById('recipe-flies').value = '';
}

function saveRecipes() {
    localStorage.setItem('berryRecipes', JSON.stringify(recipes));
}

function renderRecipes() {
    const container = document.getElementById('categories-container');
    container.innerHTML = '';

    const categories = [...new Set(recipes.map(r => r.category))];
    
    categories.forEach(category => {
        const categoryDiv = document.createElement('div');
        categoryDiv.innerHTML = `<h3 class="category-title">${category}</h3>`;
        
        const list = document.createElement('ul');
        list.className = 'recipe-list';
        
        const categoryRecipes = recipes.filter(r => r.category === category);
        categoryRecipes.forEach(recipe => {
            const li = document.createElement('li');
            li.className = 'recipe-item';
            li.dataset.id = recipe.id;
            
            const ingredientsArray = recipe.ingredients.split(',').map(i => i.trim());
            
            li.innerHTML = `
                <button class="fav-btn ${recipe.isFavorite ? 'active' : ''}" onclick="toggleFavorite(${recipe.id})">★</button>
                <strong>${recipe.name}</strong>
                <div class="recipe-details">
                    <p>Time: ${recipe.time || 'Unknown'} | Flies: ${recipe.flies || '0'}</p>
                    <ul class="ingredients-list">
                        ${ingredientsArray.map(ing => `<li>${ing}</li>`).join('')}
                    </ul>
                    <button class="add-to-shopping-btn" onclick="addIngredientsToShoppingList(${recipe.id})">Add Ingredients to List</button>
                </div>
            `;
            
            li.onclick = (e) => {
                if (e.target.tagName === 'BUTTON') return;
                li.classList.toggle('active');
            };
            
            list.appendChild(li);
        });
        
        container.appendChild(categoryDiv);
        container.appendChild(list);
    });
}

function toggleFavorite(id) {
    const recipe = recipes.find(r => r.id === id);
    if (recipe) {
        recipe.isFavorite = !recipe.isFavorite;
        saveRecipes();
        renderRecipes();
    }
}

function filterRecipes() {
    const searchTerm = document.getElementById('recipe-search').value.toLowerCase();
    const categoryFilter = document.getElementById('category-filter').value;
    
    const filtered = recipes.filter(recipe => {
        const matchesSearch = recipe.name.toLowerCase().includes(searchTerm) || 
                             recipe.ingredients.toLowerCase().includes(searchTerm);
        const matchesCategory = categoryFilter === 'All' || recipe.category === categoryFilter;
        return matchesSearch && matchesCategory;
    });

    renderFilteredRecipes(filtered);
}

function renderFilteredRecipes(filteredRecipes) {
    const container = document.getElementById('categories-container');
    container.innerHTML = '';

    const categories = [...new Set(filteredRecipes.map(r => r.category))];
    
    categories.forEach(category => {
        const categoryDiv = document.createElement('div');
        categoryDiv.innerHTML = `<h3 class="category-title">${category}</h3>`;
        
        const list = document.createElement('ul');
        list.className = 'recipe-list';
        
        const categoryRecipes = filteredRecipes.filter(r => r.category === category);
        categoryRecipes.forEach(recipe => {
            const li = document.createElement('li');
            li.className = 'recipe-item';
            li.dataset.id = recipe.id;
            
            const ingredientsArray = recipe.ingredients.split(',').map(i => i.trim());
            
            li.innerHTML = `
                <button class="fav-btn ${recipe.isFavorite ? 'active' : ''}" onclick="toggleFavorite(${recipe.id})">★</button>
                <strong>${recipe.name}</strong>
                <div class="recipe-details">
                    <p>Time: ${recipe.time || 'Unknown'} | Flies: ${recipe.flies || '0'}</p>
                    <ul class="ingredients-list">
                        ${ingredientsArray.map(ing => `<li>${ing}</li>`).join('')}
                    </ul>
                    <button class="add-to-shopping-btn" onclick="addIngredientsToShoppingList(${recipe.id})">Add Ingredients to List</button>
                </div>
            `;
            
            li.onclick = (e) => {
                if (e.target.tagName === 'BUTTON') return;
                li.classList.toggle('active');
            };
            
            list.appendChild(li);
        });
        
        container.appendChild(categoryDiv);
        container.appendChild(list);
    });
}

function clearFilters() {
    document.getElementById('recipe-search').value = '';
    document.getElementById('category-filter').value = 'All';
    renderRecipes();
}

function pickRandomRecipe() {
    const randomIndex = Math.floor(Math.random() * recipes.length);
    if (randomIndex === -1) return;
    
    const recipe = recipes[randomIndex];
    const items = document.querySelectorAll('.recipe-item');
    
    // Clear all active states
    items.forEach(item => item.classList.remove('active'));
    
    // Find the item with the id
    const targetItem = document.querySelector(`.recipe-item[data-id="${recipe.id}"]`);
    if (targetItem) {
        targetItem.classList.add('active');
        targetItem.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
}

function addToShoppingList() {
    const input = document.getElementById('shopping-item-input');
    const item = input.value.trim();
    
    if (item) {
        shoppingList.push(item);
        saveShoppingList();
        renderShoppingList();
        input.value = '';
    }
}

function addIngredientsToShoppingList(recipeId) {
    const recipe = recipes.find(r => r.id === recipeId);
    if (recipe && recipe.ingredients) {
        const ingredients = recipe.ingredients.split(',').map(i => i.trim());
        ingredients.forEach(item => {
            if (item && !shoppingList.includes(item)) {
                shoppingList.push(item);
            }
        });
        saveShoppingList();
        renderShoppingList();
    }
}

function saveShoppingList() {
    localStorage.setItem('berryShoppingList', JSON.stringify(shoppingList));
}

function renderShoppingList() {
    const listUl = document.getElementById('shopping-list');
    listUl.innerHTML = '';
    
    shoppingList.forEach((item, index) => {
        const li = document.createElement('li');
        li.textContent = item;
        li.onclick = () => removeShoppingItem(index);
        li.className = 'shopping-item';
        listUl.appendChild(li);
    });
}

function removeShoppingItem(index) {
    shoppingList.splice(index, 1);
    saveShoppingList();
    renderShoppingList();
}

window.onload = init;
