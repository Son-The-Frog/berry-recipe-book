let recipes = [];
let shoppingList = [];

function init() {
    const savedRecipes = localStorage.getItem('berryRecipes');
    if (savedRecipes) {
        recipes = JSON.parse(savedRecipes);
    } else {
        recipes = [
            { name: 'Sunny Day Berry Mix', ingredients: ['Sunberries', 'Honey Dew'], time: '10 mins', flies: 2, category: 'General', favorite: false },
            { name: 'Foggy Forest Tart', ingredients: ['Mist-berries', 'Pine Nut'], time: '20 mins', flies: 5, category: 'Foggy Day', favorite: false }
        ];
    }
    
    const savedShopping = localStorage.getItem('berryShoppingList');
    if (savedShopping) {
        shoppingList = JSON.parse(savedShopping);
    } else {
        shoppingList = [];
    }

    renderRecipes();
    renderShoppingList();
}

function addRecipe() {
    const name = document.getElementById('recipe-name').value;
    const ingredientsText = document.getElementById('recipe-ingredients').value;
    const time = document.getElementById('recipe-time').value;
    const flies = document.getElementById('recipe-flies').value;
    const category = document.getElementById('recipe-category').value;

    if (!name || !ingredientsText) {
        alert('Please enter a name and ingredients!');
        return;
    }

    const ingredients = ingredientsText.split(',').map(item => item.trim());
    const newRecipe = { name, ingredients, time, flies, category, favorite: false };
    
    recipes.push(newRecipe);
    saveRecipes();
    renderRecipes();

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
    
    categories.forEach(cat => {
        const catDiv = document.createElement('div');
        catDiv.className = cat === 'Foggy Day' ? 'category-foggy' : '';
        
        const title = document.createElement('h3');
        title.className = 'category-title';
        title.textContext = cat;
        title.innerText = cat;
        catDiv.appendChild(title);

        const list = document.createElement('ul');
        list.className = 'recipe-list';

        recipes.filter(r => r.category === cat).forEach((recipe, index) => {
            const li = document.createElement('li');
            li.className = 'recipe-item';
            li.onclick = () => li.classList.toggle('active');

            li.innerHTML = `
                <strong>${recipe.name}</strong>
                <button class="fav-btn ${recipe.favorite ? 'active' : ''}" onclick="toggleFavorite(event, ${index})">❤</button>
                <div class="recipe-details">
                    <p>Time: ${recipe.time} | Flies: ${recipe.flies}</p>
                    <ul class="ingredients-list">
                        ${recipe.ingredients.map(ing => `<li>${ing}</li>`).join('')}
                    </ul>
                </div>
            `;
            list.appendChild(li);
        });

        catDiv.appendChild(list);
        container.appendChild(catDiv);
    });
}

function toggleFavorite(event, index) {
    event.stopPropagation();
    recipes[index].favorite = !recipes[index].favorite;
    saveRecipes();
    renderRecipes();
}

function filterRecipes() {
    const searchTerm = document.getElementById('recipe-search').value.toLowerCase();
    const categoryFilter = document.getElementById('category-filter').value;
    const items = document.querySelectorAll('.recipe-item');
    let found = false;

    recipes.forEach((recipe, index) => {
        const isMatch = (recipe.name.toLowerCase().includes(searchTerm) || 
                        recipe.ingredients.some(ing => ing.toLowerCase().includes(searchTerm))) &&
                        (categoryFilter === 'All' || recipe.category === categoryFilter);
        
        // This is a simplified filter for the demo render
        // In a real app we'd re-render the whole list
    });

    // Since renderRecipes is based on the whole array, we'll just call it with a filter
    const filtered = recipes.filter(recipe => 
        (recipe.name.toLowerCase().includes(searchTerm) || 
         recipe.ingredients.some(ing => ing.toLowerCase().includes(searchTerm))) &&
        (categoryFilter === 'All' || (categoryFilter === 'option-1' ? recipe.category === 'General' : recipe.category === 'Foggy Day'))
    );

    renderFilteredRecipes(filtered);
}

function renderFilteredRecipes(filtered) {
    const container = document.getElementById('categories-container');
    container.innerHTML = '';
    
    if (filtered.length === 0) {
        document.getElementById('no-results-message').style.display = 'block';
    } else {
        document.getElementById('no-results-message').style.display = 'none';
        const categories = [...new Set(filtered.map(r => r.category))];
        categories.forEach(cat => {
            const catDiv = document.createElement('div');
            catDiv.className = cat === 'Foggy Day' ? 'category-foggy' : '';
            const title = document.createElement('h3');
            title.className = 'category-title';
            title.innerText = cat;
            catDiv.appendChild(title);
            const list = document.createElement('ul');
            list.className = 'recipe-list';
            filtered.filter(r => r.category === cat).forEach(recipe => {
                const li = document.createElement('li');
                li.className = 'recipe-item';
                li.onclick = () => li.classList.toggle('active');
                li.innerHTML = `<strong>${recipe.name}</strong><div class="recipe-details"><p>Time: ${recipe.time} | Flies: ${recipe.flies}</p><ul class="ingredients-list">${recipe.ingredients.map(ing => `<li>${ing}</li>`).join('')}</ul></div>`;
                list.appendChild(li);
            });
            catDiv.appendChild(list);
            container.appendChild(catDiv);
        });
    }
}

function clearFilters() {
    document.getElementById('recipe-search').value = '';
    document.getElementById('category-filter').value = 'All';
    renderRecipes();
    document.getElementById('no-results-message').style.display = 'none';
}

function pickRandomRecipe() {
    if (recipes.length === 0) return;
    const random = recipes[Math.floor(Math.random() * recipes.length)];
    alert(`Try making: ${random.name}!`);
}

function addToShoppingList() {
    const input = document.getElementById('shopping-item-input');
    const item = input.value.trim();
    if (item) {
        shoppingList.push(item);
        input.value = '';
        saveShoppingList();
        renderShoppingList();
    }
}

function removeItem(index) {
    shoppingList.splice(index, 1);
    saveShoppingList();
    renderShoppingList();
}

function saveShoppingList() {
    localStorage.setItem('berryShoppingList', JSON.stringify(shoppingList));
}

function renderShoppingList() {
    const listUl = document.getElementById('shopping-list');
    listUl.innerHTML = '';
    shoppingList.forEach((item, index) => {
        const li = document.createElement('li');
        li.innerHTML = `${item} <button onclick="removeItem(${index})" style="margin-left:10px; cursor:pointer; background:none; border:none; color:red; font-weight:bold;">X</button>`;
        listUl.appendChild(li);
    });
}

window.onload = init;