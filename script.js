const recipes = [
    { name: "Honey Glazed Berry Berries", ingredients: "Sweet honey, giant red berries, a pinch of sugar.", category: "General", favorite: false, time: "15 mins", flies: 2, steps: ["Mix honey and berries", "Add sugar and stir"] },
    { name: "Foggy Morning Berry Mash", ingredients: "Wild blueberries, warm rain-water, a drizzle of maple syrup.", category: "Foggy Day", favorite: false, time: "10 mins", flies: 1, steps: ["Mash blueberries", "Add warm water", "Drizzle syrup"] },
    { name: "Sparkling Berry Fizz", ingredients: "Raspberries, sparkling spring water, a mint leaf.", category: "General", favorite: false, time: "5 mins", flies: 0, steps: ["Crush raspberries", "Pour water over them", "Garnish with mint"] },
    { name: "Cozy Berry Stew", ingredients: "Mixed berries, thickened root broth, a tiny piece of cinnamon bark.", category: "Foggy Day", favorite: false, time: "30 mins", flies: 3, steps: ["Simmer broth", "Add berries and cinnamon", "Cook until thick"] }
];

function displayRecipes() {
    const container = document.getElementById('categories-container');
    container.innerHTML = '';

    const categories = ['General', 'Foggy Day'];
    
    categories.forEach(cat => {
        const filtered = recipes.filter(r => r.category === cat);
        if (filtered.length > 0) {
            const catDiv = document.createElement('div');
            catDiv.className = cat === 'Foggy Day' ? 'category-foggy' : '';
            
            const title = document.createElement('h2');
            title.className = 'category-title';
            title.innerText = cat;
            catDiv.appendChild(title);

            const list = document.createElement('ul');
            list.className = 'recipe-list';

            filtered.forEach((recipe, index) => {
                const fullIndex = recipes.indexOf(recipe);
                const li = document.createElement('li');
                li.className = 'recipe-item';
                li.onclick = () => li.classList.toggle('active');

                const icon = document.createElement('img');
                icon.src = 'assets/berry_icon.png';
                icon.className = 'berry-icon';
                
                const name = document.createElement('strong');
                name.innerText = ` ${recipe.name}`;

                const favBtn = document.createElement('button');
                favBtn.className = `fav-btn ${recipe.favorite ? 'active' : ''}`;
                favBtn.innerText = '❤';
                favBtn.onclick = (e) => {
                    e.stopPropagation();
                    recipe.favorite = !recipe.favorite;
                    favBtn.classList.toggle('active');
                };

                li.appendChild(icon);
                li.appendChild(name);
                li.appendChild(favBtn);

                const details = document.createElement('div');
                details.className = 'recipe-details';
                
                const ingredientsList = document.createElement('ul');
                ingredientsList.className = 'ingredients-list';
                recipe.ingredients.split(',').forEach(ing => {
                    const item = document.createElement('li');
                    item.innerText = ing.trim();
                    ingredientsList.appendChild(item);
                });

                details.innerHTML = `<div><strong>Time:</strong> ${recipe.time} | <strong>Flies:</strong> ${recipe.flies}</div>`;
                details.appendChild(ingredientsList);
                
                const stepsDiv = document.createElement('div');
                stepsDiv.style.marginTop = '10px';
                stepsDiv.innerHTML = `<strong>Steps:</strong> ${recipe.steps.join(' → ')}`;
                details.appendChild(stepsDiv);

                li.appendChild(details);
                list.appendChild(li);
            });
            catDiv.appendChild(list);
            container.appendChild(catDiv);
        }
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
            name,
            ingredients,
            category,
            favorite: false,
            time: time || 'Unknown',
            flies: flies || 0,
            steps: ["Prepare ingredients", "Mix and serve"]
        });
        displayRecipes();
        document.getElementById('recipe-name').value = '';
        document.getElementById('recipe-ingredients').value = '';
        document.getElementById('recipe-time').value = '';
        document.getElementById('recipe-flies').value = '';
    }
}

function filterRecipes() {
    const searchTerm = document.getElementById('recipe-search').value.toLowerCase();
    const categoryFilter = document.getElementById('category-filter').value;
    const items = document.querySelectorAll('.recipe-item');
    const catDivs = document.querySelectorAll('.category-foggy, .container > div:not(.search-container):not(.recipe-form):not(#no-results-message)');
    
    let visibleCount = 0;

    items.forEach(item => {
        const text = item.innerText.toLowerCase();
        const category = item.closest('.category-foggy') ? 'Foggy Day' : 'General';
        const matchesSearch = text.includes(searchTerm);
        const matchesCategory = categoryFilter === 'All' || category === categoryFilter;

        if (matchesSearch && matchesCategory) {
            item.style.display = 'block';
            visibleCount++;
        } else {
            item.style.display = 'none';
        }
    });

    document.getElementById('no-results-message').style.display = visibleCount === 0 ? 'block' : 'none';
}

function clearFilters() {
    document.getElementById('recipe-search').value = '';
    document.getElementById('category-filter').value = 'All';
    filterRecipes();
}

function pickRandomRecipe() {
    const filtered = recipes.filter(r => r.category === 'General' || r.category === 'Foggy Day');
    const random = filtered[Math.floor(Math.random() * filtered.length)];
    alert(`How about making: ${random.name}?`);
}

displayRecipes();