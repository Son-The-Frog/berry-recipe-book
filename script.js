let recipes = [];
let shoppingList = [];

function init() {
    const savedRecipes = localStorage.getItem('son_berry_recipes');
    if (savedRecipes) {
        recipes = JSON.parse(savedRecipes);
    }

    const savedShopping = localStorage.getItem('son_berry_shopping');
    if (savedShopping) {
        shoppingList = JSON.parse(savedShopping);
    }

    renderRecipes();
    renderShoppingList();
}

function addRecipe() {
    const name = document.getElementById('recipe-name').value;
    const ingredients = document.getElementById('recipe-ingredients').value;
    const time = document.getElementById('recipe-time').value;
    const flies = document.getElementById('recipe-flies').value;
    const category = document.getElementById('recipe-category').value;

    if (!name || !ingredients) {
        alert('Please enter a name and ingredients!');
        return;
    }

    const recipe = {
        id: Date.now(),
        name,
        ingredients: ingredients.split(',').map(i => i.trim()),
        time,
        flies,
        category,
        isFavorite: false
    };

    recipes.push(recipe);
    saveAndRender();
    
    document.getElementById('recipe-name').value = '';
    document.getElementById('recipe-ingredients').value = '';
    document.getElementById('recipe-time').value = '';
    document.getElementById('recipe-flies').value = '';
}

function toggleFavorite(id, event) {
    event.stopPropagation();
    const recipe = recipes.find(r => r.id === id);
    if (recipe) {
        recipe.isFavorite = !recipe.isFavorite;
        saveAndRender();
    }
}

function renderRecipes(filteredRecipes = recipes) {
    const container = document.getElementById('categories-container');
    container.innerHTML = '';

    const categories = [...new Set(filteredRecipes.map(r => r.category))];

    categories.forEach(cat => {
        const catDiv = document.createElement('div');
        catDiv.className = cat === 'Foggy Day' ? 'category-foggy' : '';
        
        const title = document.createElement('h3');
        title.className = 'category-title';
        title.title = 'Click to filter';
        title.innerText = cat;
        catDiv.appendChild(title);

        const list = document.createElement('ul');
        list.className = 'recipe-list';

        filteredRecipes.filter(r => r.category === cat).forEach(recipe => {
            const item = document.createElement('li');
            item.className = 'recipe-item';
            item.onclick = () => item.classList.toggle('active');
            
            item.innerHTML = `
                <strong>${recipe.name}</strong>
                <button class="fav-btn ${recipe.isFavorite ? 'active' : ''}" onclick="toggleFavorite(${recipe.id}, event)">❤</button>
                <div class="recipe-details">
                    <p>Time: ${recipe.time || 'Not set'} | Flies: ${recipe.flies || '0'}</p>
                    <ul class="ingredients-list">
                        ${recipe.ingredients.map(ing => `<li>${ing}</li>`).join('')}
                    </ul>
                </div>
            `;
            list.appendChild(item);
        });

        catDiv.appendChild(list);
        container.appendChild(catDiv);
    });
}

function filterRecipes() {
    const searchTerm = document.getElementById('recipe-search').value.toLowerCase();
    const categoryFilter = document.getElementById('category-filter').value;

    const filtered = recipes.filter(r => {
        const matchesSearch = r.name.toLowerCase().includes(searchTerm) || 
                             r.ingredients.some(i => i.toLowerCase().includes(searchTerm));
        const matchesCategory = categoryFilter === 'All' || 
                                (categoryFilter === 'option-1' && r.category === 'General') || 
                                (categoryFilter === 'option-2' && r.category === 'Foggy Day');
        return matchesSearch && matchesCategory;
    });

    if (filtered.length === 0) {
        document.getElementById('no-results-message').style.display = 'block';
    } else {
        document.getElementById('no-results-message').style.display = 'none';
    }

    renderRecipes(filtered);
}

function clearFilters() {
    document.getElementById('recipe-search').value = '';
    document.getElementById('category-filter').value = 'All';
    filterRecipes();
}

function pickRandomRecipe() {
    if (recipes.length === 0) return;
    const randomIdx = Math.floor(Math.random() * recipes.length);
    const recipe = recipes[randomIdx];
    
    document.getElementById('recipe-search').value = recipe.name;
    filterRecipes();
}

function addToShoppingList() {
    const input = document.getElementById('shopping-item-input');
    const itemText = input.value.trim();
    
    if (itemText) {
        shoppingList.push({ text: itemText, bought: false });
        saveShoppingAndRender();
        input.value = '';
    }
}

function removeFromShoppingList(index) {
    shoppingList.splice(index, 1);
    saveShoppingAndRender();
}

function toggleShoppingItem(index) {
    shoppingList[index].bought = !shoppingList[index].bought;
    saveShoppingAndRender();
}

function renderShoppingList() {
    const listElement = document.getElementById('shopping-list');
    listElement.innerHTML = '';

    shoppingList.forEach((item, index) => {
        const li = document.createElement('li');
        li.className = `shopping-item ${item.bought ? 'bought' : ''}`;
        
        li.innerHTML = `
            <input type="checkbox" ${item.bought ? 'checked' : ''} onchange="toggleShoppingItem(${index})">
            <span>${item.text}</span>
            <button class="remove-shopping-btn" onclick="removeFromShoppingList(${index})">Remove</button>
        `;
        listElement.appendChild(li);
    });
}

function saveAndRender() {
    localStorage.setItem('son_berry_recipes', JSON.stringify(recipes));
    renderRecipes();
}

function saveShoppingAndRender() {
    localStorage.setItem('son_berry_shopping', JSON.stringify(shoppingList));
    renderShoppingList();
}

window.onload = init;