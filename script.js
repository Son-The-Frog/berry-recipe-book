const recipes = [
    { name: "Honey Glazed Berry Berries", ingredients: "Sweet honey, giant red berries, a pinch of sugar.", category: "General", favorite: false, time: "15 mins", flies: 2, steps: ["Mix honey and berries", "Add sugar and stir", "Wait for shine"] },
    { name: "Blueberry Morning Porridge", ingredients: "Oats, warm milk, blueberries, and a drizzle of honey.", category: "Foggy Day", favorite: false, time: "10 mins", flies: 5, steps: ["Boil milk", "Add oats and blueberries", "Simmer until cozy"] },
    { name: "Strawberry Summer Sparkle", ingredients: "Fresh strawberries, sparkling water, a mint leaf.", category: "General", favorite: false, time: "5 mins", flies: 1, steps: ["Mash strawberries", "Pour sparkling water", "Garnish with mint"] },
    { name: "Raspberry Winter Warmth", ingredients: "Raspberries, cinnamon stick, hot apple cider.", category: "Foggy Day", favorite: false, time: "12 mins", flies: 3, steps: ["Heat cider", "Add raspberries and cinnamon", "Let it steep"] },
    { name: "Blackberry Midnight Cake", ingredients: "Blackberries, dark chocolate, flour, eggs, honey.", category: "General", favorite: false, time: "45 mins", flies: 8, steps: ["Bake cake", "Top with blackberry glaze", "Cool and enjoy"] }
];

function renderRecipes() {
    const container = document.getElementById('categories-container');
    container.innerHTML = '';
    const categories = ['General', 'Foggy Day'];

    categories.forEach(cat => {
        const catDiv = document.createElement('div');
        catDiv.className = cat === 'Foggy Day' ? 'category-foggy' : '';
        
        const title = document.createElement('h2');
        title.className = 'category-title';
        title.textContent = cat;
        catDiv.appendChild(title);

        const list = document.createElement('ul');
        list.className = 'recipe-list';

        const filtered = recipes.filter(r => r.category === cat);
        filtered.forEach((recipe, index) => {
            const li = document.createElement('li');
            li.className = 'recipe-item';
            li.setAttribute('data-recipe-index', recipes.indexOf(recipe));
            li.innerHTML = `<strong>${recipe.name}</strong> <button class="fav-btn ${recipe.favorite ? 'active' : ''}" onclick="toggleFavorite(event, ${recipes.indexOf(recipe)})">❤</button><div class="recipe-details">${recipe.ingredients} | Time: ${recipe.time} | Flies: ${recipe.flies}<br>Steps: ${recipe.steps.join(' → ')}</div>`;
            li.onclick = () => li.classList.toggle('active');
            list.appendChild(li);
        });

        catDiv.appendChild(list);
        container.appendChild(catDiv);
    });
}

function addRecipe() {
    const name = document.getElementById('recipe-name').value;
    const ingredients = document.getElementById('recipe-ingredients').value;
    const time = document.getElementById('recipe-time').value;
    const flies = document.getElementById('recipe-flies').value;
    const category = document.getElementById('recipe-category').value;

    if (name && ingredients) {
        recipes.push({ name, ingredients, category, favorite: false, time, flies, steps: ["Prepare ingredients", "Cook with love"] });
        renderRecipes();
        document.getElementById('recipe-name').value = '';
        document.getElementById('recipe-ingredients').value = '';
        document.getElementById('recipe-time').value = '';
        document.getElementById('recipe-flies').value = '';
    }
}

function toggleFavorite(event, index) {
    event.stopPropagation();
    recipes[index].favorite = !recipes[index].favorite;
    renderRecipes();
}

function filterRecipes() {
    const searchTerm = document.getElementById('recipe-search').value.toLowerCase();
    const categoryFilter = document.getElementById('category-filter').value;
    const items = document.querySelectorAll('.recipe-item');
    const catDivs = document.querySelectorAll('.category-foggy, #categories-container > div:not(.category-foggy)');
    let visibleCount = 0;

    items.forEach(item => {
        const recipeIndex = item.getAttribute('data-recipe-index');
        const recipe = recipes[recipeIndex];
        const matchesSearch = recipe.name.toLowerCase().includes(searchTerm) || recipe.ingredients.toLowerCase().includes(searchTerm);
        const matchesCategory = categoryFilter === 'All' || recipe.category === categoryFilter;

        if (matchesSearch && matchesCategory) {
            item.style.display = 'block';
            visibleCount++;
        } else {
            item.style.display = 'none';
        }
    });

    catDivs.forEach(div => {
        const hasVisible = div.querySelectorAll('.recipe-item[style="display: block;"]').length > 0;
        div.style.display = hasVisible ? 'block' : 'none';
    });

    const noResults = document.getElementById('no-results-message');
    noResults.style.display = visibleCount === 0 ? 'block' : 'none';
}

function pickRandomRecipe() {
    const randomIndex = Math.floor(Math.random() * recipes.length);
    const recipe = recipes[randomIndex];
    renderRecipes();
    const items = document.querySelectorAll('.recipe-item');
    let targetItem = null;
    
    items.forEach(item => {
        if (item.getAttribute('data-recipe-index') == randomIndex) {
            targetItem = item;
        }
    });

    if (targetItem) {
        targetItem.classList.add('highlight-recipe');
        targetItem.classList.add('active');
    }
}

renderRecipes();