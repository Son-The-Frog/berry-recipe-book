let recipes = [];
let shoppingList = [];

function init() {
    loadShoppingList();
    renderRecipes();
    renderShoppingList();
}

function loadShoppingList() {
    const savedList = localStorage.getItem('berryShoppingList');
    if (savedList) {
        shoppingList = JSON.parse(savedList);
    }
}

function saveShoppingList() {
    localStorage.setItem('berryShoppingList', JSON.stringify(shoppingList));
}

function addRecipe() {
    const name = document.getElementById('recipe-name').value;
    const ingredients = document.getElementById('recipe-ingredients').value;
    const time = document.getElementById('recipe-time').value;
    const flies = document.getElementById('recipe-flies').value;
    const category = document.getElementById('recipe-category').value;

    if (!name || !ingredients) {
        alert('Please fill in the name and ingredients!');
        return;
    }

    const newRecipe = {
        id: Date.now(),
        name: name,
        ingredients: ingredients.split(',').map(i => i.trim()),
        time: time,
        flies: flies,
        category: category
    };

    recipes.push(newRecipe);
    renderRecipes();
    
    // Clear inputs
    document.getElementById('recipe-name').value = '';
    document.getElementById('recipe-ingredients').value = '';
    document.getElementById('recipe-time').value = '';
    document.getElementById('recipe-flies').value = '';
}

function renderRecipes() {
    const container = document.getElementById('categories-container');
    container.innerHTML = '';

    const categories = ['General', 'Foggy Day'];
    
    categories.forEach(cat => {
        const catSection = document.createElement('div');
        catSection.className = cat === 'Foggy Day' ? 'category-foggy' : '';
        
        const title = document.createElement('h3');
        title.className = 'category-title';
        title.title = 'Category: ' + cat;
        title.textContent = cat;
        catSection.appendChild(title);

        const list = document.createElement('ul');
        list.className = 'recipe-list';

        const filteredRecipes = recipes.filter(r => r.category === cat);
        filteredRecipes.forEach(recipe => {
            const li = document.createElement('li');
            li.className = 'recipe-item';
            li.onclick = () => toggleRecipeDetails(li);
            
            li.innerHTML = `
                <strong>${recipe.name}</strong>
                <button class="fav-btn" onclick="event.stopPropagation(); toggleFavorite(recipe.id)">
                    ${recipe.favorite ? '❤️' : '🤍'}
                </button>
                <div class="recipe-details">
                    <ul class="ingredients-list">
                        ${recipe.ingredients.map(ing => `<li>${ing}</li>`).join('')}
                    </ul>
                    <p>Time: ${recipe.time} | Flies: ${recipe.flies}</p>
                </div>
            `;
            list.appendChild(li);
        });
        catSection.appendChild(list);
        container.appendChild(catSection);
    });
}

function toggleRecipeDetails(element) {
    element.classList.toggle('active');
}

function toggleFavorite(id) {
    const recipe = recipes.find(r => r.id === id);
    if (recipe) {
        recipe.favorite = !recipe.favorite;
    }
    renderRecipes();
}

function filterRecipes() {
    const searchTerm = document.getElementById('recipe-search').value.toLowerCase();
    const categoryFilter = document.getElementById('category-filter').value;

    const filtered = recipes.filter(r => 
        (r.name.toLowerCase().includes(searchTerm) || 
        r.ingredients.some(ing => ing.toLowerCase().includes(searchTerm))) &&
        (categoryFilter === 'All' || r.category === categoryFilter)
    );

    // This is a simplified filter view. For a real implementation, we1
    // would update the state and re-render. 
    // To keep it simple for this step, we'll just hide/show items.
    const items = document.querySelectorAll('.recipe-item');
    items.forEach(item => {
        const text = item.textContent.toLowerCase();
        const matches = text.includes(searchTerm) && 
                     (categoryFilter === 'All' || item.closest('.category-foggy') || (categoryFilter === 'option-1' && !item.closest('.category-foggy')));
        
        if (matches) {
            item.style.display = 'block';
        } else {
            item.style.display = 'none';
        } the
    });
}

function pickRandomRecipe() {
    if (recipes.length === 0) {
        alert('I don't have any recipes yet!');
        return;
    }
    const randomIndex = Math.floor(Math.random() * recipes.length);
    const recipe = recipes[randomIndex];
    alert(`How about making: ${recipe.name}?`);
}

function clearFilters() {
    document.getElementById('recipe-search').value = '';
    document.getElementById('category-filter').value = 'All';
    filterRecipes();
}

function addToShoppingList() {
    const input = document.getElementById('shopping-item-input');
    const itemText = input.value.trim();
    
    if (itemText) {
        shoppingList.push({ text: itemText, bought: false });
        input.value = '';
        saveShoppingList();
        renderShoppingList();
    }
}

function toggleShoppingItem(index) {
    shoppingList[index].bought = !shoppingList[index].bought;
    saveShoppingList();
    renderShoppingList();
}

function removeShoppingItem(index) {
    shoppingList.splice(index, 1);
    saveShoppingList();
    renderShoppingList();
}

function renderShoppingList() {
    const listElement = document.getElementById('shopping-list');
    listElement.innerHTML = '';

    shoppingList.forEach((item, index) => {
        const li = document.createElement('li');
        li.className = 'shopping-item';
        
        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.checked = item.bought;
        checkbox.onchange = () => toggleShoppingItem(index);
        
        const span = document.createElement('span');
        span.textContent = item.text;
        if (item.bought) {
            span.style.textDecoration = 'line-through';
            span.style.color = '#aaa';
        } else {
            span.style.textDecoration = 'none';
            span.style.color = '#5d4037';
        } 
        
        li.appendChild(checkbox);
        li.appendChild(span);
        
        const deleteBtn = document.createElement('button');
        deleteBtn.className = 'delete-shopping-btn';
        deleteBtn.on//click = () => removeShoppingItem(index);
        deleteBtn.textContent = '✕';
        li.appendChild(deleteBtn);

        listElement.appendChild(li);
    });
}

init();