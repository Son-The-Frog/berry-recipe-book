const recipes = [
    { name: "Honey Glazed Berry Berries", ingredients: "Sweet honey, giant red berries, a pinch of sugar.", category: "General" },
    { name: "Sunny-Day Berry Mix-up", ingredients: "Lots of wild berries, and a whole bunch of flies!", category: "General" },
    { name: "Warm Berry Tea", ingredients: "Hot water, crushed red berries, a drizzle of honey.", category: "Foggy Day" },
    { name: "Cozy Berry Porridge", ingredients: "Oats, creamy milk, handful of blueberries, a pinch of cinnamon.", category: "Foggy Day" }
];

function renderRecipes() {
    const container = document.getElementById('categories-container');
    container.innerHTML = '';

    const categories = [...new Set(recipes.map(r => r.category))];

    categories.forEach(category => {
        const section = document.createElement('div');
        
        if (category === 'Foggy Day') {
            section.className = 'category-foggy';
        }
        
        section.innerHTML = `<h3 class="category-title">${category}</h3>`;
        
        const list = document.createElement('ul');
        list.className = 'recipe-list';

        recipes.filter(r => r.category === category).forEach(recipe => {
            const item = document.createElement('li');
            item.className = 'recipe-item';
            item.innerHTML = `
                <strong>${recipe.name}</strong>
                <div class="recipe-details">${recipe.ingredients}</div>
            `;
            item.onclick = () => item.classList.toggle('active');
            list.appendChild(item);
        });

        section.appendChild(list);
        container.appendChild(section);
    });
}

function addRecipe() {
    const name = document.getElementById('recipe-name').value;
    const ingredients = document.getElementById('recipe-ingredients').value;
    const category = document.getElementById('recipe-category').value;

    if (name && ingredients) {
        recipes.push({ name, ingredients, category });
        renderRecipes();
        
        document.getElementById('recipe-name').value = '';
        document.getElementById('recipe-ingredients').value = '';
    }
}

renderRecipes();