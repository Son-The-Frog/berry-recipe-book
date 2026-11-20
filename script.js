const recipes = [
    { name: "Honey Glazed Berry Berries", ingredients: "Sweet honey, giant red berries, a pinch of sugar.", category: "General", favorite: false, time: "15 mins", flies: 2, steps: ["Mix honey and berries", "Add sugar and stir", "Wait for shine"] },
    { name: "Blueberry Morning Porridge", ingredients: "Oats, warm milk, blueberries, and a drizzle of honey.", category: "Foggy Day", favorite: false, time: "10 mins", flies: 5, steps: ["Boil milk", "Add oats and blueberries", "Stir in honey"] },
    { name: "Warm Berry Tea", ingredients: "Dried berries, boiling water, a cinnamon stick.", category: "Foggy Day", favorite: false, time: "5 mins", flies: 1, steps: ["Steep berries in water", "Add cinnamon", "Wait for warmth"] }
];

function loadRecipes(filterText = "") {
    const categoriesContainer = document.getElementById('categories-container');
    categoriesContainer.innerHTML = '';
    
    const filteredRecipes = recipes.filter(r => 
        r.name.toLowerCase().includes(filterText.toLowerCase()) || 
        r.ingredients.toLowerCase().includes(filterText.toLowerCase())
    );

    const categories = [...new Set(recipes.map(r => r.category))];

    categories.forEach(cat => {
        const catRecipes = filteredRecipes.filter(r => r.category === cat);
        if (catRecipes.length === 0) return;

        const catDiv = document.createElement('div');
        catDiv.className = cat === 'Foggy Day' ? 'category-foggy' : 'category-section';
        
        const title = document.createElement('h3');
        title.className = 'category-title';
        title.textContent = cat;
        catDiv.appendChild(title);

        const ul = document.createElement('ul');
        ul.className = 'recipe-list';

        catRecipes.forEach((recipe, index) => {
            const li = document.createElement('li');
            li.className = 'recipe-item';
            li.innerHTML = `
                <strong>${recipe.name}</strong>
                <button class="fav-btn ${recipe.favorite ? 'active' : ''}" onclick="toggleFavorite(event, ${recipes.indexOf(recipe)})">❤</button>
                <div class="recipe-details">
                    <p><strong>Ingredients:</strong> ${recipe.ingredients}</p>
                    <p><strong>Time:</strong> ${recipe.time} | <strong>Flies:</strong> ${recipe.flies}</p>
                    <p><strong>Steps:</strong> ${recipe.steps.join(' → ')}</p>
                </div>
            `;
            li.onclick = () => li.classList.toggle('active');
            ul.appendChild(li);
        });

        catDiv.appendChild(ul);
        categoriesContainer.appendChild(catDiv);
    });
}

function addRecipe() {
    const name = document.getElementById('recipe-name').value;
    const ingredients = document.getElementById('recipe-ingredients').value;
    const time = document.getElementById('recipe-time').value;
    const flies = document.getElementById('recipe-flies').value;
    const category = document.getElementById('recipe-category').value;

    if (!name || !ingredients) return alert("Please give your recipe a name and some ingredients!");

    recipes.push({ name, ingredients, time, flies, category, favorite: false, steps: ["Mix and cook!"] });
    loadRecipes();
    
    document.getElementById('recipe-name').value = '';
    document.getElementById('recipe-ingredients').value = '';
    document.getElementById('recipe-time').value = '';
    document.getElementById('recipe-flies').value = '';
}

function toggleFavorite(event, index) {
    event.stopPropagation();
    recipes[index].favorite = !recipes[index].favorite;
    loadRecipes(document.getElementById('recipe-search').value);
}

function filterRecipes() {
    const text = document.getElementById('recipe-search').value;
    loadRecipes(text);
}

function pickRandomRecipe() {
    const randomIndex = Math.floor(Math.random() * recipes.length);
    const recipe = recipes[randomIndex];
    loadRecipes();
    
    setTimeout(() => {
        const items = document.querySelectorAll('.recipe-item');
        const target = Array.from(items).find(item => item.querySelector('strong').textContent === recipe.name);
        if (target) {
            target.classList.add('highlight-recipe');
            target.click();
        }
    }, 100);
}

window.onload = loadRecipes;