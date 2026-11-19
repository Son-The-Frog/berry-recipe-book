const recipes = [
    { name: "Honey Glazed Berry Berries", ingredients: "Sweet honey, giant red berries, a pinch of sugar.", category: "General", favorite: false, time: "15 mins", flies: 2 },
    { name: "Blueberry Morning Porridge", ingredients: "Oats, warm milk, blueberries, and a drizzle of honey.", category: "Foggy Day", favorite: false, time: "10 mins", flies: 5 },
    { name: "Warm Berry Tea", ingredients: "Dried berries, boiling water, a cinnamon stick.", category: "Foggy Day", favorite: false, time: "5 mins", flies: 1 }
];

function loadRecipes(filterText = "") {
    const container = document.getElementById('categories-container');
    container.innerHTML = '';

    const categories = [...new Set(recipes.map(r => r.category))];

    categories.forEach(cat => {
        const categoryRecipes = recipes.filter(r => r.category === cat);
        const filteredCategoryRecipes = categoryRecipes.filter(r => 
            r.name.toLowerCase().includes(filterText.toLowerCase()) || 
            r.ingredients.toLowerCase().includes(filterText.toLowerCase())
        );

        if (filteredCategoryRecipes.length > 0) {
            const section = document.createElement('div');
            section.className = `category-section ${cat === 'Foggy Day' ? 'category-foggy' : ''}`;
            
            const title = document.createElement('h3');
            title.className = 'category-title';
            title.title = 'Category: ' + cat;
            title.innerText = cat;
            section.appendChild(title);

            const list = document.createElement('ul');
            list.className = 'recipe-list';

            filteredCategoryRecipes.forEach(recipe => {
                const li = document.createElement('li');
                li.className = 'recipe-item';
                li.onclick = () => toggleRecipe(li);
                
                const favBtn = document.createElement('button');
                favBtn.className = 'fav-btn';
                favBtn.onclick = (e) => {
                    e.stopPropagation();
                    toggleFavorite(recipe);
                };
                favBtn.innerText = recipe.favorite ? '❤️' : '🤍';
                
                const nameSpan = document.createElement('span');
                nameSpan.innerText = recipe.name;
                
                li.appendChild(favBtn);
                li.appendChild(nameSpan);

                const details = document.createElement('div');
                details.className = 'recipe-details';
                details.innerText = `Ingredients: ${recipe.ingredients}\nTime: ${recipe.time} | Flies: ${recipe.flies}`;
                li.appendChild(details);
                
                list.appendChild(li);
            });

            container.appendChild(section);
        }
    });
}

function toggleRecipe(element) {
    element.classList.toggle('active');
}

function toggleFavorite(recipe) {
    recipe.favorite = !recipe.favorite;
    loadRecipes();
}

function addRecipe() {
    const name = document.getElementById('recipe-name').value;
    const ingredients = document.getElementById('recipe-ingredients').value;
    const time = document.getElementById('recipe-time').value;
    const flies = document.getElementById('recipe-flies').value;
    const category = document.getElementById('recipe-category').value;

    if (name && ingredients) {
        recipes.push({
            name: name,
            ingredients: ingredients,
            time: time || 'Unknown',
            flies: flies || 0,
            category: category,
            favorite: false
        });
        
        // Clear form
        document.getElementById('recipe-name').value = '';
        document.getElementById('recipe-ingredients').value = '';
        document.getElementById('recipe-time').value = '';
        document.getElementById('recipe-flies').value = '';

        loadRecipes();
    } else {
        alert('Please enter a name and ingredients!');
    }
}

function filterRecipes() {
    const searchText = document.getElementById('recipe-search').value;
    loadRecipes(searchText);
}

function pickRandomRecipe() {
    const filteredRecipes = recipes.filter(r => r.name.toLowerCase().includes(document.getElementById('recipe-search').value.toLowerCase()) || r.ingredients.toLowerCase().includes(document.getElementById('recipe-search').value.toLowerCase()));
    const available = filteredRecipes.length > 0 ? filteredRecipes : recipes;
    const randomIndex = Math.floor(Math.random() * available.length);
    const selected = available[randomIndex];

    loadRecipes(); // Refresh list to remove highlights
    
    // Find the element in the DOM after loadRecipes is called
    const items = document.querySelectorAll('.recipe-item');
    const targetIndex = recipes.indexOf(selected);
    // This is a bit simplified, since categories split the lists
    // We search for the name to find the correct item
    const itemsWithNames = Array.from(items).filter(item => item.innerText.includes(selected.name));
    const targetElement = itemsWithNames[0];

    if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
        targetElement.classList.add('highlight-recipe');
        targetElement.classList.add('active');
    }
}

// Initial load
loadRecipes();