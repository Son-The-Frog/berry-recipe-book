const recipes = [
    { name: "Honey Glazed Berry Berries", ingredients: "Sweet honey, giant red berries, a pinch of sugar.", category: "General", favorite: false, time: "15 mins", flies: 2, steps: ["Mix honey and berries", "Glaze them with sugar", "Let them sit for 5 minutes"] },
    { name: "Foggy Morning Berry Jam", ingredients: "Blueberries, raspberries, lemon juice, brown sugar", category: "Foggy Day", favorite: false, time: "20 mins", flies: 5, steps: ["Crush berries", "Lather with sugar", "Boil until thick"] },
    { name: "Berry Blast Smoothie Smoothie", ingredients: "Strawberries, bananas, yogurt, honey", category: "General", favorite: false, time: "5 mins", flies: 1, steps: ["Put everything in blender", "Blend until smooth", "Pour into a glass"] },
    { name: "Warm Berry Crumble own own", ingredients: "Strawberries, blueberries, flour, butter, cinnamon", category: "Foggy Day", favorite: false, time: "30 mins", flies: 8, steps: ["Mix flour and butter", "Toss berries with cinnamon", "Bake until golden brown"] },
    { name: "Berry Tartlet Tiny Tiny", ingredients: "Strawberries, blueberries, blueberries, pastry shell, whipped cream", category: "General", favorite: false, time: "10 mins", flies: 3, steps: ["Fill shell with berries", "Top with whipped cream", "Chill for 10 minutes"] }
];

let currentFilter = 'All';
let currentSearch = '';

function renderRecipes() {
    const container = document.getElementById('categories-container');
    container.innerHTML = '';

    const categories = ['General', 'Foggy Day'];
    
    categories.forEach(cat => {
        const filteredRecipes = recipes.filter(r => {
            const matchesCategory = (currentFilter === 'All' || r.category === currentFilter);
            const matchesSearch = r.name.toLowerCase().includes(currentSearch.toLowerCase()) || 
                                r.ingredients.toLowerCase().includes(currentSearch.toLowerCase());
            return matchesCategory && matchesSearch;
        });

        if (filteredRecipes.length > 0) {
            const catDiv = document.createElement('div');
            catDiv.className = `category-section ${cat === 'Foggy Day' ? 'category-foggy' : ''}`;
            
            const title = document.createElement('h2');
            title.className = 'category-title';
            title.innerText = cat;
            catDiv.appendChild(title);

            const list = document.createElement('ul');
            list.className = 'recipe-list';

            filteredRecipes.forEach(recipe => {
                const li = document.createElement('li');
                li.className = 'recipe-item';
                
                // Toggle active state for details
                li.onclick = () => {
                    li.classList.toggle('active');
                };

                const nameContainer = document.createElement('div');
                nameContainer.style.display = 'flex';
                nameContainer.style.alignItems = 'center';
                nameContainer.style.gap = '8px';
                
                const icon = document.createElement('img');
                icon.src = 'assets/berry_icon.png';
                icon.className = 'berry-icon';
                nameContainer.appendChild(icon);

                const nameSpan = document.createElement('strong');
                nameSpan.innerText = recipe.name;
                nameContainer.appendChild(nameSpan);

                const favBtn = document.createElement('button');
                favBtn.className = `fav-btn ${recipe.favorite ? 'active' : ''}`;
                favBtn.innerText = '❤';
                favBtn.onclick = (e) => {
                    e.stopPropagation();
                    recipe.favorite = !recipe.favorite;
                    renderRecipes();
                };
                li.appendChild(nameContainer);
                li.appendChild(favBtn);

                const details = document.createElement('div');
                details.className = 'recipe-details';
                
                // Create detailed ingredients list
                const ingredientsList = document.createElement('ul');
                ingredientsList.className = 'ingredients-list';
                
                const ingredientItems = recipe.ingredients.split(',').map(item => item.trim());
                ingredientItems.forEach(item => {
                    const ingLi = document.createElement('li');
                    ingLi.innerText = item;
                    ingredientsList.appendChild(ingLi);
                });
                
                details.appendChild(ingredientsList);
                
                const info = document.createElement('p');
                info.innerHTML = `Time: ${recipe.time} | Flies: ${recipe.flies}`;
                details.appendChild(info);

                li.appendChild(details);
            });

            list.appendChild(filteredRecipes); // This is a bug from previous step, it should be filteredRecipes.forEach
            // Fixing the loop logic here
            filteredRecipes.forEach(recipe => {
                // The previous loop was already adding items, but I'm replacing the logic with a clean sweep
            });
            
            // Wait, I realized I made a mistake in the previous logic flow. Let me rewrite the renderRecipes loop properly.
            
            // Corrected renderRecipes logic
            
        });
    });
}

// Let me rewrite the renderRecipes function fully to ensure it's clean and bug-free
function renderRecipes() {
    const container = document.getElementById('categories-container');
    container.innerHTML = '';

    const categories = ['General', 'Foggy Day'];
    
    categories.forEach(cat => {
        const filteredRecipes = recipes.filter(r => {
            const matchesCategory = (currentFilter === 'All' || r.category === currentFilter);
            const matchesSearch = r.name.toLowerCase().includes(currentSearch.toLowerCase()) || 
                                r.ingredients.toLowerCase().includes(currentSearch.toLowerCase());
            return matchesCategory && matchesSearch;
        });

        if (filteredRecipes.length > 0) {
            const catDiv = document.createElement('div');
            catDiv.className = `category-section ${cat === 'Foggy Day' ? 'category-foggy' : ''}`;
            
            const title = document.createElement('h2');
            title.className = 'category-title';
            title.innerText = cat;
            catDiv.appendChild(title);

            const list = document.createElement('ul');
            list.className = 'recipe-list';

            filteredRecipes.forEach(recipe => {
                const li = document.createElement('li');
                li.className = 'recipe-item';
                li.onclick = () => li.classList.toggle('active');

                const nameContainer = document.createElement('div');
                nameContainer.style.display = 'flex';
                nameContainer.style.alignItems = 'center';
                nameContainer.style.gap = '8px';
                
                const icon = document.createElement('img');
                icon.src = 'assets/berry_icon.png';
                icon.className = 'berry-icon';
                nameContainer.appendChild(icon);

                const nameSpan = document.createElement('strong');
                nameSpan.innerText = recipe.name;
                nameContainer.appendChild(nameSpan);
                nameContainer.appendChild(document.createElement('span')); // placeholder

                const favBtn = document.createElement('button');
                favBtn.className = `fav-btn ${recipe.favorite ? 'active' : ''}`;
                favBtn.innerText = '❤';
                favBtn.onclick = (e) => {
                    e.stopPropagation();
                    recipe.favorite = !recipe.favorite;
                    renderRecipes();
                };
                
                li.appendChild(nameContainer);
                li.appendChild(favBtn);

                const details = document.createElement('div');
                details.className = 'recipe-details';
                
                const ingredientsList = document.createElement('ul');
                ingredientsList.className = 'ingredients-list';
                
                recipe.ingredients.split(',').forEach(item => {
                    const ingLi = document.createElement('li');
                    ingLi.innerText = item.trim();
                    ingredientsList.appendChild(ingLi);
                });
                
                details.appendChild(ingredientsList);
                
                const info = document.createElement('p');
                info.innerHTML = `Time: ${recipe.time} | Flies: ${recipe.flies}`;
                details.appendChild(info);

                li.appendChild(details);
            });
            
            // I accidentally forgot to append the items to the list
            // Correcting that now
            
            // Actually, I'll just write the final clean version below
        });
    });
}

// I will provide the full script.js now to avoid confusion.

function renderRecipes() {
    const container = document.getElementById('categories-container');
    container.innerHTML = '';

    const categories = ['General', 'Foggy Day'];
    
    categories.forEach(cat => {
        const filteredRecipes = recipes.filter(r => {
            const matchesCategory = (currentFilter === 'All' || r.category === currentFilter);
            const matchesSearch = r.name.toLowerCase().includes(currentSearch.toLowerCase()) || 
                                r.ingredients.toLowerCase().includes(currentSearch.toLowerCase());
            return matchesCategory && matchesSearch;
        });

        if (filteredRecipes.length > 0) {
            const catDiv = document.createElement('div');
            catDiv.className = `category-section ${cat === 'Foggy Day' ? 'category-foggy' : ''}`;
            
            const title = document.createElement('h2');
            title.className = 'category-title';
            title.innerText = cat;
            catDiv.appendChild(title);

            const list = document.createElement('ul');
            list.className = 'recipe-list';

            filteredRecipes.forEach(recipe => {
                const li = document.createElement('li');
                li.className = 'recipe-item';
                li.onclick = () => li.classList.toggle('active');

                const nameContainer = document.createElement('div');
                nameContainer.style.display = 'flex';
                nameContainer.style.alignItems = 'center';
                nameContainer.style.gap = '8px';
                
                const icon = document.createElement('img');
                icon.src = 'assets/berry_icon.png';
                icon.className = 'berry-icon';
                nameContainer.appendChild(icon);

                const nameSpan = document.createElement('strong');
                nameSpan.innerText = recipe.name;
                nameContainer.appendChild(nameSpan);

                const favBtn = document.createElement('button');
                favBtn.className = `fav-btn ${recipe.favorite ? 'active' : ''}`;
                favBtn.innerText = '❤';
                favBtn.onclick = (e) => {
                    e.stopPropagation();
                    recipe.favorite = !recipe.favorite;
                    renderRecipes();
                };
                
                li.appendChild(nameContainer);
                li.appendChild(favBtn);

                const details = document.createElement('div');
                details.className = 'recipe-details';
                
                const ingredientsList = document.createElement('ul');
                ingredientsList.className = 'ingredients-list';
                
                recipe.ingredients.split(',').forEach(item => {
                    const ingLi = document.createElement('li');
                    ingLi.innerText = item.trim();
                    ingredientsList.appendChild(ingLi);
                });
                
                details.appendChild(ingredientsList);
                
                const info = document.createElement('p');
                info.innerHTML = `Time: ${recipe.time} | Flies: ${recipe.flies}`;
                details.appendChild(info);

                li.appendChild(details);
                list.appendChild(li);
            });
            catDiv.appendChild(list);
            container.appendChild(catDiv);
        });
    });
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

    recipes.push({
        name: name,
        ingredients: ingredients,
        time: time,
        flies: parseInt(flies) || 0,
        category: category,
        favorite: false
    });

    document.getElementById('recipe-name').value = '';
    document.getElementById('recipe-ingredients').value = '';
    document.getElementById('recipe-time').value = '';
    document.getElementById('recipe-flies').value = '';
    
    renderRecipes();
}

function filterRecipes() {
    currentSearch = document.getElementById('recipe-search').value;
    currentFilter = document.getElementById('category-filter').value;
    renderRecipes();
}

function clearFilters() {
    currentSearch = '';
    currentFilter = 'All';
    document.getElementById('recipe-search').value = '';
    document.getElementById('category-filter').value = 'All';
    renderRecipes();
}

function pickRandomRecipe() {
    const filtered = recipes.filter(r => {
        const matchesCategory = (currentFilter === 'All' || r.category === currentFilter);
        const matchesSearch = r.name.toLowerCase().includes(currentSearch.toLowerCase()) || 
                                r.ingredients.toLowerCase().includes(currentSearch.toLowerCase());
        return matchesCategory && matchesSearch;
    });
    
    if (filtered.length === 0) {
        alert('No recipes to pick from!');
        return;
    }
    
    const randomRecipe = filtered[Math.floor(Math.random() * filtered.length)];
    alert(`How about trying: ${randomRecipe.name}!`);
}

window.onload = () => {
    renderRecipes();
};