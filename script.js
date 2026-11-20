const recipes = [
    { name: "Honey Glazed Berry Berries", ingredients: "Sweet honey, giant red berries, a pinch of sugar.", category: "General", favorite: false, time: "15 mins", flies: 2, steps: ["Mix honey and berries", "Add sugar and stir", "Wait for shine"] },
    { name: "Blueberry Morning Porridge", ingredients: "Oats, warm milk, blueberries, and a drizzle of honey.", category: "Foggy Day", favorite: false, time: "10 mins", flies: 5, steps: ["Boil milk", "Add oats and blueberries", "Stir in honey"] },
    { name: "Warm Berry Tea", ingredients: "Dried berries, boiling water, a cinnamon stick.", category: "Foggy Day", favorite: false, time: "5 mins", flies: 1, steps: ["Steep berries in water", "Add cinnamon", "Wait for warmth"] }
];

function loadRecipes(filterText = "", categoryFilter = "All") {
    const categoriesContainer = document.getElementById('categories-container');
    categoriesContainer.innerHTML = '';

    const filteredRecipes = recipes.filter(recipe => {
        const matchesSearch = recipe.name.toLowerCase().includes(filterText.toLowerCase()) || 
                            recipe.ingredients.toLowerCase().includes(filterText.toLowerCase());
        const matchesCategory = categoryFilter === "All" || recipe.category === categoryFilter;
        return matchesSearch && matchesCategory;
    });

    const categories = ["General", "Foggy Day"];
    
    categories.forEach(cat => {
        const catRecipes = filteredRecipes.filter(r => r.category === cat);
        if (catRecipes.length === 0) return;

        const section = document.createElement('div');
        section.className = cat === "Foggy Day" ? "category-foggy" : "";
        
        const title = document.createElement('h3');
        title.className = 'category-title';
        title.textContent = cat;
        section.appendChild(title);

        const list = document.createElement('ul');
        list.className = 'recipe-list';

        catRecipes.forEach((recipe, index) => {
            const li = document.createElement('li');
            li.className = 'recipe-item';
            li.onclick = () => li.classList.toggle('active');
            
            li.innerHTML = `
                <strong>${recipe.name}</strong>
                <button class="fav-btn ${recipe.favorite ? 'active' : ''}" onclick="toggleFavorite(event, ${recipes.indexOf(recipe)})">❤</button>
                <div class="recipe-details">
                    <p>Ingredients: ${recipe.ingredients}</p>
                    <p>Time: ${recipe.time} | Flies: ${recipe.flies}</p>
                    <p>Steps: ${recipe.steps.join(' → ')}</p>
                </div>
            `;
            list.appendChild(li);
        });

        section.appendChild(list);
        categoriesContainer.appendChild(section);
    });
}

function filterRecipes() {
    const searchText = document.getElementById('recipe-search').value;
    const categoryValue = document.getElementById('category-filter').value;
    loadRecipes(searchText, categoryValue);
}

function addRecipe() {
    const name = document.getElementById('recipe-name').value;
    const ingredients = document.getElementById('recipe-ingredients').value;
    const time = document.getElementById('recipe-time').value;
    const flies = document.getElementById('recipe-flies').value;
    const category = document.getElementById('recipe-category').value;

    if (!name || !ingredients) {
        alert("Please give your recipe a name and some ingredients!");
        return;
    }

    recipes.push({
        name, ingredients, category, time, flies, 
        favorite: false, 
        steps: ["Mix it all up", "Cook with love", "Enjoy!"]
    });

    document.getElementById('recipe-name').value = '';
    document.getElementById('recipe-ingredients').value = '';
    document.getElementById('recipe-time').value = '';
    document.getElementById('recipe-flies').value = '';
    
    filterRecipes();
}

function toggleFavorite(event, index) {
    event.stopPropagation();
    recipes[index].favorite = !recipes[index].favorite;
    filterRecipes();
}

function pickRandomRecipe() {
    const randomIndex = Math.floor(Math.random() * recipes.length);
    const recipe = recipes[randomIndex];
    filterRecipes();
    
    setTimeout(() => {
        const items = document.querySelectorAll('.recipe-item');
        if (items.length > 0) {
            const target = Array.from(items).find(item => item.innerText.includes(recipe.name));
            if (target) {
                target.classList.add('highlight-recipe');
                target.click();
                setTimeout(() => target.classList.remove('highlight-recipe'), 1500);
            }
        }
    }, 100);
}

loadRecipes();