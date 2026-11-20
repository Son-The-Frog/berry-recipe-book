const recipes = [
    { name: "Honey Glazed Berry Berries", ingredients: "Sweet honey, giant red berries, a pinch of sugar.", category: "General", favorite: false, time: "15 mins", flies: 2 },
    { name: "Foggy Morning Berry Jam", ingredients: "Blueberries, blackberries, lemon juice, brown sugar.", category: "Foggy Day", favorite: true, time: "30 mins", flies: 5 },
    { name: "Sparkling Berry Sorbet", ingredients: "Raspberries, lime, ice crystals, mint leaf.", category: "General", favorite: false, time: "10 mins", flies: 1 },
    { name: "Cozy Berry Porridge", ingredients: "Oats, milk, strawberries, a drizzle of maple syrup.", category: "Foggy Day", favorite: true, time: "20 mins", flies: 3 }
];

function renderRecipes() {
    const container = document.getElementById('categories-container');
    container.innerHTML = '';

    const categories = [...new Set(recipes.map(r => r.category))];

    categories.forEach(cat => {
        const catDiv = document.createElement('div');
        catDiv.className = `category-section ${cat === 'Foggy Day' ? 'category-foggy' : ''}`;

        const title = document.createElement('h2');
        title.className = 'category-title';
        title.textContent = cat;
        catDiv.appendChild(title);

        const list = document.createElement('ul');
        list.className = 'recipe-list';

        const filtered = recipes.filter(r => {
            const searchTerm = document.getElementById('recipe-search').value.toLowerCase();
            const categoryFilter = document.getElementById('category-filter').value;
            const matchesSearch = r.name.toLowerCase().includes(searchTerm) || r.ingredients.toLowerCase().includes(searchTerm);
            const matchesCategory = categoryFilter === 'All' || r.category === categoryFilter;
            return matchesSearch && matchesCategory;
        });

        filtered.forEach((recipe, index) => {
            const item = document.createElement('li');
            item.className = 'recipe-item';
            
            const favBtn = document.createElement('button');
            favBtn.className = `fav-btn ${recipe.favorite ? 'active' : ''}`;
            favBtn.innerHTML = '❤';
            favBtn.onclick = (e) => {
                e.stopPropagation();
                toggleFavorite(recipe);
            };

            const header = document.createElement('div');
            header.className = 'recipe-header';
            header.innerHTML = `<img src="assets/berry_icon.png" class="berry-icon" alt="berry"> <strong>${recipe.name}</strong>`;
            
            const details = document.createElement('div');
            details.className = 'recipe-details';
            
            const ingredientsArray = recipe.ingredients.split(',').map(i => i.trim());
            const ingredientsHtml = `<ul class="ingredients-list">${ingredientsArray.map(i => `<li>${i}</li>`).join('')}</ul>`;
            
            details.innerHTML = `
                <div><strong>Ingredients:</strong> ${ingredientsHtml}</div>
                <div><strong>Time:</strong> ${recipe.time}</div>
                <div><strong>Flies needed:</strong> ${recipe.flies}</div>
            `;

            item.appendChild(favBtn);
            item.appendChild(header);
            item.appendChild(details);
            item.onclick = () => item.classList.toggle('active');

            list.appendChild(item);
        });

        catDiv.appendChild(list);
        container.appendChild(catDiv);
    });

    if (container.innerHTML === '') {
        document.getElementById('no-results-message').style.display = 'block';
    } else {
        document.getElementById('no-results-message').style.display = 'none';
    }
}

function addRecipe() {
    const name = document.getElementById('recipe-name').value;
    const ingredients = document.getElementById('recipe-ingredients').value;
    const time = document.getElementById('recipe-time').value;
    const flies = document.getElementById('recipe-flies').value;
    const category = document.getElementById('recipe-category').value;

    if (name && ingredients) {
        recipes.push({ name, ingredients, category, favorite: false, time, flies: parseInt(flies) || 0 });
        renderRecipes();
        document.getElementById('recipe-name').value = '';
        document.getElementById('recipe-ingredients').value = '';
        document.getElementById('recipe-time').value = '';
        document.getElementById('recipe-flies').value = '';
    }
}

function toggleFavorite(recipe) {
    recipe.favorite = !recipe.favorite;
    renderRecipes();
}

function filterRecipes() {
    renderRecipes();
}

function clearFilters() {
    document.getElementById('recipe-search').value = '';
    document.getElementById('category-filter').value = 'All';
    renderRecipes();
}

function pickRandomRecipe() {
    if (recipes.length === 0) return;
    const randomIdx = Math.floor(Math.random() * recipes.length);
    const randomRecipe = recipes[randomIdx];
    
    // We simulate the selection by clearing filters, then finding the item and clicking it
    clearFilters();
    setTimeout(() => {
        const items = document.querySelectorAll('.recipe-item');
        const recipeItems = Array.from(items).filter(item => item.innerText.includes(randomRecipe.name));
        if (recipeItems.length > 0) {
            recipeItems[0].classList.add('active');
            recipeItems[0].scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }, 50);
}

window.onload = renderRecipes;