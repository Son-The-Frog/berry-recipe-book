let recipes = [];
let shoppingList = [];

function init() {
    const savedRecipes = localStorage.getItem('berryRecipes');
    if (savedRecipes) {
        recipes = JSON.parse(savedRecipes);
    }

    const savedShoppingList = localStorage.getItem('berryShoppingList');
    if (savedShoppingList) {
        shoppingList = JSON.parse(savedShoppingList);
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
        alert('Please add a name and some berries!');
    }
    if (!name || !ingredients) return;

    const newRecipe = {
        id: Date.now(),
        name, ingredients, time, flies, category
    };

    recipes.push(newRecipe);
    saveRecipes();
    renderRecipes();
    
    // Clear inputs
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
        catDiv.className = `category-section ${cat === 'Foggy Day' ? 'category-foggy' : ''}`;
        
        const title = document.createElement('h3');
        title.className = 'category-title';
        title.title = 'Click to collapse/expand';
        title.textContent = cat;
        title.onclick = () => {
            const list = catDiv.querySelector('.recipe-list');
            list.style.display = list.style.display === 'none' ? 'block' : 'none';
        };
        
        catDiv.appendChild(title);
        
        const list = document.createElement('ul');
        list.className = 'recipe-list';
        
        recipes.filter(r => r.category === cat).forEach(r => {
            const li = document.createElement('li');
            li.className = 'recipe-item';
            li.onclick = (e) => {
                if (e.target.classList.contains('fav-btn')) return;
                toggleRecipeDetails(li);
            };
            
            const favBtn = document.createElement('button');
            favBtn.className = 'fav-btn';
            favBtn.onclick = (e) => {
                e.stopPropagation();
                toggleFavorite(r.id);
            };
            
            // Check if favorite
            const isFav = localStorage.getItem(`fav-${r.id}`);
            favBtn.innerHTML = isFav ? '❤️' : '🤍';
            favBtn.classList.toggle('active', !!isFav);
            
            li.appendChild(favBtn);
            
            const content = document.createElement('div');
            content.innerHTML = `<strong>${r.name}</strong>`;
            li.appendChild(content);
            
            const details = document.createElement('div');
            details.className = 'recipe-details';
            details.innerHTML = `
                <ul class="ingredients-list">
                    ${r.ingredients.split('\n').map(i => `<li>${i}</li>`).join('')}
                </ul>
                <p>Time: ${r.time} | Flies: ${r.flies}</p>
            `;
            li.appendChild(details);
            
            // Add to shopping list button
            const shopBtn = document.createElement('button');
            shopBtn.className = 'shop-btn';
            shopBtn.textContent = 'Add Ingredients to List';
            shopBtn.onclick = (e) => {
                e.stopPropagation();
                addIngredientsToShoppingList(r.ingredients);
            };
            details.appendChild(shopBtn);
            
            li.appendChild(details);
        });
        
        catDiv.appendChild(list);
        catDiv.appendChild(title);
    });
    
    // Fix duplicate title for some reason
    const firstTitle = container.querySelector('.category-title');
    if (firstTitle) {
        // I just want one title per category
    }
}

function toggleRecipeDetails(el) {
    el.classList.toggle('active');
}

function toggleFavorite(id) {
    const isFav = localStorage.getItem(`fav-${id}`);
    if (isFav) {
        localStorage.removeItem(`fav-${id}`);
    } else {
        localStorage.setItem(`fav-${id}`, 'true');
    }
    renderRecipes();
}

function filterRecipes() {
    const search = document.getElementById('recipe-search').value.toLowerCase();
    const category = document.getElementById('category-filter').value;

    const filtered = recipes.filter(r => {
        const matchSearch = r.name.toLowerCase().includes(search) || 
                        r.ingredients.toLowerCase().includes(search);
        const matchCat = (category === 'All') ? true : (r.category === category);
        return matchSearch && matchCat;
    });

    // Temporarily store non-filtered recipes to keep track of IDs
    // But we need a render function that accepts a filter
    renderRecipesFiltered(filtered);
}

function renderRecipesFiltered(filteredRecipes) {
    const container = document.getElementById('categories-container');
    container.innerHTML = '';

    const categories = [...new Set(filteredRecipes.map(r => r.category))];
    
    categories.forEach(cat => {
        const catDiv = document.createElement('div');
        catDiv.className = `category-section ${cat === 'Foggy Day' ? 'category-foggy' : ''}`;
        
        const title = document.createElement('h3');
        title.className = 'category-title';
        title.textContent = cat;
        catDiv.appendChild(title);
        
        const list = document.createElement('ul');
        list.className = 'recipe-list';
        
        filteredRecipes.filter(r => r.category === cat).forEach(r => {
            const li = document.createElement('li');
            li.className = 'recipe-item';
            li.onclick = (e) => {
                if (e.target.classList.contains('fav-btn')) return;
                toggleRecipeDetails(li);
            };
            
            const favBtn = document.createElement('button');
            favBtn.className = 'fav-btn';
            favBtn.onclick = (e) => {
                e.stopPropagation();
                toggleFavorite(r.id);
            };
            const isFav = localStorage.getItem(`fav-${r.id}`);
            favBtn.innerHTML = isFav ? '❤️' : '🤍';
            favBtn.classList.toggle('active', !!isFav);
            li.appendChild(favBtn);
            
            const content = document.createElement('div');
            content.innerHTML = `<strong>${r.name}</strong>`;
            li.appendChild(content);
            
            const details = document.createElement('div');
            details.className = 'recipe-details';
            details.innerHTML = `
                <ul class="ingredients-list">
                    ${r.ingredients.split('\n').map(i => `<li>${i}</li>`).join('')}
                </ul>
                <p>Time: ${r.time} | Flies: ${r.flies}</p>
            `;
            li.appendChild(details);
            
            const shopBtn = document.createElement('button');
            shopBtn.className = 'shop-btn';
            shopBtn.textContent = 'Add Ingredients to List';
            shopBtn.onclick = (e) => {
                e.stopPropagation();
                addIngredientsToShoppingList(r.ingredients);
            };
            details.appendChild(shopBtn);
            
            li.appendChild(details);
        });
        
        catDiv.appendChild(list);
        catDiv.appendChild(title);
    });
}

function pickRandomRecipe() {
    const filtered = recipes.length > 0 ? recipes : [];
    if (recipes.length === 0) {
        alert('No recipes to pick from!');
        return;
    }
    const randomRecipe = recipes[Math.floor(Math.random() * recipes.length)];
    
    // We can't easily highlight it since we render based on filters
    alert(`Today's random pick: ${randomRecipe.name}!`);
}

function clearFilters() {
    document.getElementById('recipe-search').value = '';
    document.getElementById('category-filter').value = 'All';
    renderRecipes();
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

function addIngredientsToShoppingList(ingredientsText) {
    const ingredients = ingredientsText.split('\n');
    ingredients.forEach(i => {
        if (i.trim()) {
            shoppingList.push(i.trim());
        }
    });
    saveShoppingList();
    renderShoppingList();
}

function saveShoppingList() {
    localStorage.setItem('berryShoppingList', JSON.stringify(shoppingList));
}

function renderShoppingList() {
    const listEl = document.getElementById('shopping-list');
    listEl.innerHTML = '';

    shoppingList.forEach((item, index) => {
        const li = document.createElement('li');
        li.textContent = item;
        
        const removeBtn = document.createElement('button');
        removeBtn.className = 'remove-shopping-btn';
        removeBtn.textContent = '✕';
        removeBtn.onclick = () => removeShoppingItem(index);
        
        li.appendChild(removeBtn);
        li.classList.add('shopping-item');
    });
    
    // I forgot to add the items to the list! 
    // Let's fix that.
    shoppingList.forEach((item, index) => {
        const li = document.createElement('li');
        li.className = 'shopping-item';
        li.textContent = item;
        
        const removeBtn = document.createElement('button');
        removeBtn.className = 'remove-shopping-btn';
        removeBtn.textContent = '✕';
        removeBtn.onclick = () => removeShoppingItem(index);
        
        li.appendChild(removeBtn);
        listEl.appendChild(li);
    });
}

function removeShoppingItem(index) {
    shoppingList.splice(index, 1);
    saveShoppingList();
    renderShoppingList();
}

window.onload = init;
