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
            title.innerText = (cat === 'General' ? '🍓' : '☁️') + " " + cat;
            
            const list = document.createElement('ul');
            list.className = 'recipe-list';

            filteredCategoryRecipes.forEach((recipe, index) => {
                const recipeId = `recipe-${recipe.category}-${index}`;
                const li = document.createElement('li');
                li.className = 'recipe-item';
                li.id = recipeId;
                li.onclick = () => toggleRecipeDetails(li);
                
                const name = document.createElement('div');
                name.className = 'recipe-name';
                name.innerText = recipe.name;
                
                const details = document.createElement('div');
                details.className = 'recipe-details';
                details.innerText = `Ingredients: ${recipe.ingredients} | Time: ${recipe.time} | Flies: ${recipe.flies}`;
                
                const favBtn = document.createElement('button');
                favBtn.className = 'fav-btn';
                favBtn.innerText = '❤';
                favBtn.onclick = (e) => {
                    e.stopPropagation();
                    toggleFavorite(recipe);
                };
                
                li.appendChild(name);
                li.appendChild(details);
                li.appendChild(favBtn);
                list.appendChild(li);
            });

            container.appendChild(section);
        }
    });
}

function toggleRecipeDetails(element) {
    element.classList.toggle('active');
}

function toggleFavorite(recipe) {
    recipe.favorite = !recipe.favorite;
    loadRecipes();
}

function filterRecipes() {
    const searchInput = document.getElementById('recipe-search');
    loadRecipes(searchInput.value);
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
            time: time || "Unknown", 
            flies: flies || 0, 
            category, 
            favorite: false 
        });
        
        // Clear inputs
        document.getElementById('recipe-name').value = '';
        document.getElementById('recipe-ingredients').value = '';
        document.getElementById('recipe-time').value = '';
        document.getElementById('recipe-flies').value = '';
        
        loadRecipes();
    } else {
        alert("Please fill in the name and ingredients!");
    }}

function pickRandomRecipe() {
    if (recipes.length === 0) return;

    const randomIndex = Math.floor(Math.random() * recipes.length);
    const selectedRecipe = recipes[randomIndex];
    
    // We need to find the element in the DOM
    // Since recipes are grouped by category, we're currently rendering them
    // based on the filtered list. We need a search for the element based on the name
    // because IDs are based on index in filtered list.
    // Since we're loadRecipes() is called often, we need a better way to find the elements.
    // loadRecipes() now creates IDs like recipe-category-index
    
    // To make it a a simple way to find it, we'll just search for the name
    const allItems = document.querySelectorAll('.recipe-item');
    const target = Array.from(allItems).find(el => el.querySelector('.recipe-name').innerText === selectedRecipe.name);

    if (target) {
        // Remove highlight from others
        document.querySelectorAll('.recipe-item').forEach(el => el.classList.remove('highlight-recipe'));
        
        target.classList.add('highlight-recipe');
        target.classList.add('active');
        target.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
}

function __init__() {
    loadRecipes();
}

__init__();