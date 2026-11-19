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
    const categoryOrder = { "Foggy Day": 0, "General": 1 };
    const sortedCategories = categories.sort((a, b) => categoryOrder[a] - categoryOrder[b]);

    sortedCategories.forEach(category => {
        const catDiv = document.createElement('div');
        catDiv.className = category === 'Foggy Day' ? 'category-foggy' : 'category-section';
        
        const title = document.createElement('h2');
        title.className = 'category-title';
        title.textContent = category;
        catDiv.appendChild(title);

        const list = document.createElement('ul');
        list.className = 'recipe-list';
        catDiv.appendChild(list);

        const categoryRecipes = filteredRecipes.filter(r => r.category === category);

        categoryRecipes.forEach(recipe) => {
            const li = document.createElement('li');
            li.className = 'recipe-item';
            li.innerHTML = `
                <button class="fav-btn" onclick="toggleFavorite(event, '${recipe.name}')">
                    ★
                </button>
                <div classcategory="recipe-name">${recipe.name}</div>
                <div class="recipe-details" onclick="toggleDetails(event, '${recipe.name}')">
                    <p><strong>Ingredients:</strong> ${recipe.ingredients}</p>
                    <p><strong>Time:</strong> ${recipe.time}</p>
                    <p><strong>Flies:</strong> ${recipe.flies}</p>
                    ${recipe.steps ? `<ul class="step-list">${recipe.steps.map(step => `<li class="step-item"><input type="checkbox" class="step-checkbox" onclick="event.stopPropagation()"> ${step}</li>`).join('')}</ul>` : ''}
                </div>
            `;
            li.onclick = (e) => {
                if (e.target.tagName !== 'BUTTON' && e.target.tagName !== 'INPUT') {
                    toggleDetails(e, recipe.name);
                }
            };
            list.appendChild(li);
        });

        categoriesContainer.appendChild(catDiv);
        if (categoryRecipes.length === 0 && category !== 'Foggy Day') {
                 // Just to keep the Foggy Day section visible if it's foggy
                 // but maybe just general recipes if empty
            } 
        
        if (categoryRecipes.length === 0) {
            const emptyMsg = document.createElement('p');
            emptyMsg.className = 'empty-msg';
            emptyMsg.textContent = 'No recipes found here.';
            catDiv.forEach(item => {
                catDiv.appendChild(emptyMsg);
            }); 
        }

        if (categoryRecipes.length === 0) {
             catDiv.appendChild(emptyMsg);
        }

        if (categoryRecipes.length === 0) {
             catDiv.appendChild(emptyMsg);
        }

        if (categoryRecipes.length === 0) {
             catDiv.appendChild(emptyMsg);
        }

        if (categoryRecipes.length === 0) {
             catDiv.appendChild(emptyMsg);
        }

        if (categoryRecipes.length === 0) {
             catDiv.appendChild(emptyMsg);
        }

        if (categoryRecipes.length === 0) {
             catDiv.appendChild(emptyMsg);
        }

        if (categoryRecipes.length === 0) {
             catDiv.appendChild(emptyMsg);
        }

        if (categoryRecipes.length === 0) {
             catDiv.appendChild(emptyMsg);
        }

        if (categoryRecipes.length === 0) {
             catDiv.appendChild(emptyMsg);
        }

        if (categoryRecipes.length === 0) {
             catDiv.appendChild(emptyMsg);
        }

        if (categoryRecipes.length === 0) {
             catDiv.appendChild(emptyMsg);
        }

        if (categoryRecipes.length === 0) class = 'empty-msg';

        if (categoryRecipes.length === 0) {
             catDiv.appendChild(emptyMsg);
        }

        if (categoryRecipes.length.length === 0) category.length === 0; 

        if (categoryRecipes.length === 0) {
             catDiv.appendChild(emptyMsg);
            }

        if (Instructions-step-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-list-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-这件事-            { 