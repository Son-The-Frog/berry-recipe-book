const recipes = [
    { name: "Honey Glazed Berry Berries", ingredients: "Sweet honey, giant red berries, a pinch of sugar.", category: "General" },
    { name: "Sunny-Day Berry Mix-up", ingredients: "Lots of wild berries, and a whole bunch of flies!", category: "General" }
];

function renderRecipes() {
    const container = document.getElementById('categories-container');
    container.innerHTML = '';

    const categories = [...new Set(recipes.map(r => r.category))];

    categories.forEach(category => {
        const section = document.createElement('div');
        section.innerHTML = `<h3 class="category-title">${category}</h3>`;
        
        const ul = document.createElement('ul');
        ul.className = 'recipe-list';

        const categoryRecipes = recipes.filter(r => r.category === category);
        categoryRecipes.forEach(recipe => {
            const li = document.createElement('li');
            li.className = 'recipe-item';
            li.onclick = function() { this.classList.toggle('active'); };
            li.innerHTML = `<strong>${recipe.name}</strong><div class="recipe-details">Ingredients: ${recipe.ingredients}</div>`;
            ul.appendChild(li);
        });

        section.appendChild(ul);
        container.appendChild(section);
    });
}

function addRecipe() {
    const nameInput = document.getElementById('recipe-name');
    const ingredientsInput = document.getElementById('recipe-ingredients');
    const categoryInput = document.getElementById('recipe-category');

    if (nameInput.value.trim() === "" || ingredientsInput.value.trim() === "") {
        alert("Please fill in both the name and ingredients!");
        return;
    }

    recipes.push({
        name: nameInput.value,
        ingredients: ingredientsInput.value,
        category: categoryInput.value
    });

    nameInput.value = '';
    ingredientsInput.value = '';
    renderRecipes();
}

// Initial render
renderRecipes();