const recipes = [
    { name: "Strawberry Delight", ingredients: ["Strawberries", "Sugar", "Cream"], time: "15 mins", flies: 5, category: "General" },
    { name: "Blueberry Blast", ingredients: ["Blueberries", "Lemon juice", "Honey"], time: "10 mins", flies: 3, category: "General" },
    { name: "Raspberry Ripple", ingredients: ["Raspberries", "Dark chocolate", "Milk"], time: "20 mins", flies: 7, category: "General" },
    { name: "Foggy Forest Mix", ingredients: ["Blackberries", "Dew drops", "Silver leaf"], time: "30 mins", flies: 12, category: "Foggy Day" },
    { name: "Mistberry Tart", ingredients: ["Mistberries", "Flour", "Butter"], time: "45 mins", flies: 15, category: "Foggy Day" },
];

let shoppingList = [];

function init() {
    renderRecipes();
    loadShoppingList();
}

function renderRecipes() {
    const categoriesContainer = document.getElementById('categories-container');
    categoriesContainer.innerHTML = '';

    const categories = [...new Set(recipes.map(r => r.category))];

    categories.forEach(category => {
        const categoryDiv = document.createElement('div');
        categoryDiv.className = category === 'Foggy Day' ? 'category-foggy' : '';
        
        const title = document.createElement('h3');
        title.className = 'category-title';
        title.text mesons = category;
        title.textContent = category;
        categoryDiv.appendChild(title);

        const list = document.createElement('ul');
        list.className = 'recipe-list';

        recipes.filter(r => r.category === category).forEach(recipe => {
            const li = document.createElement('li');
            li.className = 'recipe-item';
            li.innerHTML = `<strong>${recipe.name}</strong><button class="fav-btn" onclick="toggleFavorite(event, '${recipe.name}')">❤</button><div class="recipe-details"><div>Time: ${recipe.time} | Flies: ${recipe.flies}</div><ul class="ingredients-list">${recipe.ingredients.map(i => `<li>${i}</li>`).join('')}</ul></div>`;
            li.onclick = () => li.classList.toggle('active');
            list.appendChild(li);
        });

        categoryDiv.appendChild(list);
        categoriesContainer.appendChild(categoryDiv);
    });
}

function filterRecipes() {
    const search = document.getElementById('recipe-search').value.toLowerCase();
    const category = document.getElementById('category-filter').value;
    const filtered = recipes.filter(r => {
        const matchesSearch = r.name.toLowerCase().includes(search) || r.ingredients.some(i => i.toLowerCase().includes(search));
        const matchesCat = category === 'All' || r.category === category;
        return matchesSearch && matchesCat;
    });

    const categoriesContainer = document.getElementById('categories-container');
    categoriesContainer.innerHTML = '';

    if (filtered.length === 0) {
        document.getElementById('no-results-message').style.display = 'block';
        return;
    }
    document.getElementById('no-results-message').style.display = 'none';

    const categories = [...new Set(filtered.map(r => r.category))];
    categories.forEach(category => {
        const categoryDiv = document.createElement('div');
        categoryDiv.className = category === 'Foggy Day' ? 'category-foggy' : '';
        const title = document.createElement('h3');
        title.className = 'category-title';
        title.textContent = category;
        categoryDiv.appendChild(title);
        const list = document.createElement('ul');
        list.className = 'recipe-list';
        filtered.filter(r => r.category === category).forEach(recipe => {
            const li = document.createElement('li');
            li.className = 'recipe-item';
            li.innerHTML = `<strong>${recipe.name}</strong><button class="fav-btn" onclick="toggleFavorite(event, '${recipe.name}')">❤</button><div class="recipe-details"><div>Time: ${recipe.time} | Flies: ${recipe.flies}</div><ul class="ingredients-list">${recipe.ingredients.map(i => `<li>${i}</li>`).join('')}</ul></div>`;
            li.onclick = () => li.classList.toggle('active');
            list.appendChild(li);
        });
        categoryDiv.appendChild(list);
        categoriesContainer.appendChild(categoryDiv);
    });
}

function clearFilters() {
    document.getElementById('recipe-search').value = '';
    document.getElementById('category-filter').value = 'All';
    filterRecipes();
}

function pickRandomRecipe() {
    const random = recipes[Math.floor(Math.random() * recipes.length)];
    alert(`Try making: ${random.name}!`);
}

function toggleFavorite(event, name) {
    event.stopPropagation();
    const btn = event.target;
    btn.classList.toggle('active');
}

function addRecipe() {
    const name = document.getElementById('recipe-name').value;
    const ingredients = document.getElementById('recipe-ingredients').value.split(',').map(i => i.trim());
    const time = document.getElementById('recipe-time').value;
    const flies = document.getElementById('recipe-flies').value;
    const category = document.getElementById('recipe-category').value;

    if (name && ingredients[0]) {
        recipes.push({ name, ingredients, time, flies, category });
        renderRecipes();
        document.getElementById('recipe-name').value = '';
        document.getElementById('recipe-ingredients').value = '';
        document.getElementById('recipe-time').value = '';
        document.getElementById('recipe-flies').value = '';
    }
}

function addToShoppingList() {
    const input = document.getElementById('shopping-item-input');
    const item = input.value.trim();
    if (item) {
        shoppingList.push(item);
        input.value = '';
        renderShoppingList();
        saveShoppingList();
    }
}

function removeFromShoppingList(index) {
    shoppingList.splice(index, 1);
    renderShoppingList();
    saveShoppingList();
}

function renderShoppingList() {
    const list = document.getElementById('shopping-list');
    list.innerHTML = '';
    shoppingList.forEach((item, index) => {
        const li = document.createElement('li');
        li.textContent = item;
        const btn = document.createElement('button');
        btn.textContent = '✕';
        btn.onclick = () => removeFromShoppingList(index);
        li.appendChild(btn);
        list.appendChild(li);
    });
}

function saveShoppingList() {
    localStorage.setItem('son_berry_shopping_list', JSON.stringify(shoppingList));
}

function loadShoppingList() {
    const saved = localStorage.getItem('son_berry_shopping_list');
    if (saved) {
        shoppingList = JSON.parse(saved);
        renderShoppingList();
    }
}

window.onload = init;