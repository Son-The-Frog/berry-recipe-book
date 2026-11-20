const recipes = [
    { name: "Honey Glazed Berry Berries", ingredients: "Sweet honey, giant red berries, a pinch of sugar.", category: "General", favorite: false, time: "15 mins", flies: 2, steps: ["Mix honey and berries", "Add sugar and stir"] },
    { name: "Foggy Morning Berry Jam", ingredients: "Blueberries, raspberries, lemon juice, brown sugar.", category: "Foggy Day", favorite: true, time: "30 mins", flies: 5, steps: ["Mash berries", "Simmer with sugar", "Cool and store"] },
    { name: "Sparkling Berry Fizz", ingredients: "Strawberries, sparkling water, mint leaves, honey.", category: "General", favorite: false, time: "5 mins", flies: 1, steps: ["Muddle strawberries", "Add sparkling water", "Garnish with mint"] },
    { name: "Warm Berry Crumble", ingredients: "Mixed berries, oats, butter, cinnamon, honey.", category: "Foggy Day", favorite: true, time: "45 mins", flies: 8, steps: ["Prepare berry base", "Mix crumble topping", "Bake until golden"] },
    { name: "Creamy Berry Parfait", ingredients: "Greek yogurt, fresh blueberries, granola, honey.", category: "General", favorite: false, time: "10 mins", flies: 3, steps: ["Layer yogurt and berries", "Add granola", "Drizzle with honey"] }
];

function renderRecipes() {
    const categoriesContainer = document.getElementById('categories-container');
    categoriesContainer.innerHTML = '';

    const categories = ['General', 'Foggy Day'];

    categories.forEach(cat => {
        const section = document.createElement('div');
        section.className = cat === 'Foggy Day' ? 'category-foggy' : '';
        
        const title = document.createElement('h2');
        title.className = 'category-title';
        title.innerText = cat;
        section.appendChild(title);

        const list = document.createElement('ul');
        list.className = 'recipe-list';

        recipes.filter(r => r.category === cat).forEach((recipe, index) => {
            const li = document.createElement('li');
            li.className = 'recipe-item';
            li.onclick = () => toggleRecipe(li);

            const icon = document.createElement('img');
            icon.src = 'assets/berry_icon.png';
            icon.className = 'berry-icon';
            icon.alt = 'berry';

            const nameSpan = document.createElement('strong');
            nameSpan.innerText = recipe.name;

            const nameContainer = document.createElement('span');
            nameContainer.style.display = 'flex';
            nameContainer.style.alignItems = 'center';
            nameContainer.style.gap = '8px';
            nameContainer.appendChild(icon);
            nameContainer.appendChild(nameSpan);

            const favBtn = document.createElement('button');
            favBtn.className = `fav-btn ${recipe.favorite ? 'active' : ''}`;
            favBtn.innerText = '❤';
            favBtn.onclick = (e) => {
                e.stopPropagation();
                toggleFavorite(recipe);
                renderRecipes();
            };

            li.appendChild(nameContainer);
            li.appendChild(favBtn);

            const details = document.createElement('div');
            details.className = 'recipe-details';
            details.innerHTML = `
                <p><strong>Ingredients:</strong> ${recipe.ingredients}</p>
                <p><strong>Time:</strong> ${recipe.time} | <strong>Flies:</strong> ${recipe.flies}</p>
                <p><strong>Steps:</strong> ${recipe.steps.join(' → ')}</p>
            `;
            li.appendChild(details);
            list.appendChild(li);
        });

        section.appendChild(list);
        categoriesContainer.appendChild(section);
    });
}

function toggleRecipe(element) {
    element.classList.toggle('active');
}

function toggleFavorite(recipe) {
    recipe.favorite = !recipe.favorite;
}

function addRecipe() {
    const name = document.getElementById('recipe-name').value;
    const ingredients = document.getElementById('recipe-ingredients').value;
    const time = document.getElementById('recipe-time').value;
    const flies = document.getElementById('recipe-flies').value;
    const category = document.getElementById('recipe-category').value;

    if (!name || !ingredients) {
        alert("Please add a name and ingredients!");
        return;
    }

    recipes.push({
        name, ingredients, category, time, flies, 
        favorite: false, 
        steps: ["Prepare", "Cook", "Enjoy"]
    });

    document.getElementById('recipe-name').value = '';
    document.getElementById('recipe-ingredients').value = '';
    document.getElementById('recipe-time').value = '';
    document.getElementById('recipe-flies').value = '';

    renderRecipes();
}

function filterRecipes() {
    const searchTerm = document.getElementById('recipe-search').value.toLowerCase();
    const categoryFilter = document.getElementById('category-filter').value;
    const items = document.querySelectorAll('.recipe-item');
    let found = false;

    recipes.forEach((recipe, index) => {
        const matchesSearch = recipe.name.toLowerCase().includes(searchTerm) || recipe.ingredients.toLowerCase().includes(searchTerm);
        const matchesCat = categoryFilter === 'All' || recipe.category === categoryFilter;
        
        // This is a simple filter that hides elements. 
        // Since renderRecipes recreates the DOM, we filter the active set.
    });

    // Re-rendering is cleaner for category/search changes
    const filteredRecipes = recipes.filter(r => {
        const matchesSearch = r.name.toLowerCase().includes(searchTerm) || r.ingredients.toLowerCase().includes(searchTerm);
        const matchesCat = categoryFilter === 'All' || r.category === categoryFilter;
        return matchesSearch && matchesCat;
    });

    // Since renderRecipes handles categories, we need a modified version for filtering
    renderFilteredRecipes(filteredRecipes);
}

function renderFilteredRecipes(filteredList) {
    const categoriesContainer = document.getElementById('categories-container');
    categoriesContainer.innerHTML = '';

    const categories = ['General', 'Foggy Day'];

    categories.forEach(cat => {
        const filteredForCat = filteredList.filter(r => r.category === cat);
        if (filteredForCat.length === 0) return;

        const section = document.createElement('div');
        section.className = cat === 'Foggy Day' ? 'category-foggy' : '';
        
        const title = document.createElement('h2');
        title.className = 'category-title';
        title.innerText = cat;
        section.appendChild(title);

        const list = document.createElement('ul');
        list.className = 'recipe-list';

        filteredForCat.forEach(recipe => {
            const li = document.createElement('li');
            li.className = 'recipe-item';
            li.onclick = () => toggleRecipe(li);

            const icon = document.createElement('img');
            icon.src = 'assets/berry_icon.png';
            icon.className = 'berry-icon';
            icon.alt = 'berry';

            const nameSpan = document.createElement('strong');
            nameSpan.innerText = recipe.name;

            const nameContainer = document.createElement('span');
            nameContainer.style.display = 'flex';
            nameContainer.style.alignItems = 'center';
            nameContainer.style.gap = '8px';
            nameContainer.appendChild(icon);
            nameContainer.appendChild(nameSpan);

            const favBtn = document.createElement('button');
            favBtn.className = `fav-btn ${recipe.favorite ? 'active' : ''}`;
            favBtn.innerText = '❤';
            favBtn.onclick = (e) => {
                e.stopPropagation();
                toggleFavorite(recipe);
                renderFilteredRecipes(filteredList);
            };

            li.appendChild(nameContainer);
            li.appendChild(favBtn);

            const details = document.createElement('div');
            details.className = 'recipe-details';
            details.innerHTML = `
                <p><strong>Ingredients:</strong> ${recipe.ingredients}</p>
                <p><strong>Time:</strong> ${recipe.time} | <strong>Flies:</strong> ${recipe.flies}</p>
                <p><strong>Steps:</strong> ${recipe.steps.join(' → ')}</p>
            `;
            li.appendChild(details);
            list.appendChild(li);
        });

        section.appendChild(list);
        categoriesContainer.appendChild(section);
    });

    const noResults = document.getElementById('no-results-message');
    noResults.style.display = filteredList.length === 0 ? 'block' : 'none';
}

function clearFilters() {
    document.getElementById('recipe-search').value = '';
    document.getElementById('category-filter').value = 'All';
    renderRecipes();
}

function pickRandomRecipe() {
    const randomRecipe = recipes[Math.floor(Math.random() * recipes.length)];
    alert(`How about trying: ${randomRecipe.name}!`);
}

renderRecipes();