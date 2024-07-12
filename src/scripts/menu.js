const buttons = document.querySelectorAll('.menu-btn');
buttons.forEach(button => {
    button.addEventListener('click', function() {
        let selected_btn = this.innerText;
        console.log('Selected Category:', selected_btn); 
        menu_choice(selected_btn);
    });
});


function menu_choice(selected_btn) {
    let num = 0; 
    if (selected_btn === 'COFFEE') { num = 0; }
    else if (selected_btn === 'BOBA') { num = 1; }
    else if (selected_btn === 'SPECIALTY DRINKS') { num = 2; }
    else if (selected_btn === 'HOT BITES') { num = 3; }
    else if (selected_btn === 'SANDWICHES & SALADS') { num = 4; }
    else if (selected_btn === 'SEASONAL') { num = 5; }
    //else if (selected_btn === 'BEER & WINE') { num = 6; }

    const menuList = document.querySelector('#menu-list');
    menuList.classList.remove('fade-in');
    menuList.classList.add('fade-out');

    setTimeout(() => {
        change_menu(num, food_selection[num].items);
        menuList.classList.remove('fade-out');
        menuList.classList.add('fade-in');
    }, 500); // This timeout should match the CSS transition duration
}

function createCardSpace(selected,value) {
    const cardSpace = document.createElement('div');
    cardSpace.style.width = '18rem'; // Set the width of the card
    cardSpace.style.height = 'auto'; // Set the height of the card
    cardSpace.style.marginBottom = '1rem'; // Optional: Adjust margin bottom for spacing between cards
    
    cardSpace.classList.add('card'); 
    
    //This is where our 3d model goes
    const imgElement = document.createElement('img');
    const imageSelection = pic_list[selected][value]; // Get the selected image filename
    imgElement.src = `../../public/assets/images/${imageSelection}`; // Concatenate the base path with the image filename
    imgElement.alt = 'Description of the image'; // Optional: Add an alt attribute for accessibility
    imgElement.classList.add('img-placeholder'); // Optional: Add any classes you want

    cardSpace.appendChild(imgElement);
    return cardSpace;
}

pic_list = [
    ['latte.jpeg','latte2.jpg'],
    ['boba.jpg','boba2.jpg'],
    ['Mocha_coffee.jpg','latte.jpeg'],
    ['fries.jpg','fries2.jpg'],
    ['sandwhich.jpg','green-salad.jpg'],
    ['lemonade1.jpg','lemonade2.jpg']
]


function change_menu(selected, value) {
    const menuList = document.querySelector('#menu-list');

    menuList.innerHTML = ''; 
    for (let i = 1; i < value + 1; i++) {
        

        const card = document.createElement('div');
        card.style.width = '18rem';
        card.classList.add('card');

        card.style.background = '#F5F5DC';
        card.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.5)';

        const cardBody = document.createElement('div');
        cardBody.classList.add('card-body');
        
        const cardTitle = document.createElement('h5');
        cardTitle.classList.add('card-title');
        cardTitle.textContent = foodChoice(selected, i - 1);
        cardTitle.style.textAlign = 'center';
        cardBody.appendChild(cardTitle);

        const hr = document.createElement('hr');
        hr.classList.add('my-1'); // Add Bootstrap margin utility class for spacing
        hr.style.border = 'none';             // No border
        hr.style.backgroundColor = '#000';    // Black color (adjust as needed)
        hr.style.height = '1px';              // Thin line height
        hr.style.width = '100%';              // Full width of its container
        hr.style.margin = '1';                // No margin
        cardBody.appendChild(hr);

        const cardText = document.createElement('div');
        cardText.classList.add('container-text');
        food_text(selected, i - 1, cardText);
        
        
        cardBody.appendChild(cardText);
        card.appendChild(cardBody);
        

        if (i == 1){
            const cardSpace = createCardSpace(selected,0);
            menuList.appendChild(cardSpace);
        }else if (i == 3){
            const cardSpace = createCardSpace(selected,1);
            menuList.appendChild(cardSpace);
        }
        menuList.appendChild(card);
    }
}


function foodChoice(value,i){
    return food_selection[value].list[i].name;    
}


function food_text(value, i, cardText) {
    let price_length = food_selection[value].list[i].prices.length;

    // Create a container for prices
    const priceContainer = document.createElement('div');
    priceContainer.classList.add('container', 'text-center'); // Apply Bootstrap-like classes
    priceContainer.style.fontSize = '15px'; // Adjust font size here if neede

    // Calculate number of rows (2 items per row)
    const numRows = Math.ceil(price_length / 2);

    // Loop through prices
    for (let row = 0; row < numRows; row++) {
        // Create a row for two prices
        const rowContainer = document.createElement('div');
        rowContainer.classList.add('row', 'price-row');

        // Create columns for prices
        for (let col = 0; col < 2; col++) {
            const priceIndex = row * 2 + col;
            if (priceIndex < price_length) {
                const priceItem = document.createElement('p');
                priceItem.textContent = food_selection[value].list[i].prices[priceIndex];
                priceItem.classList.add('col', 'price-item'); // Bootstrap-like column class
                rowContainer.appendChild(priceItem);
            }
        }

        // Append the rowContainer to priceContainer
        priceContainer.appendChild(rowContainer);
    }

    // Append priceContainer to cardText
    cardText.appendChild(priceContainer);

     // Check if description exists and append if so
     if (food_selection[value].list[i].description && food_selection[value].list[i].description.trim() !== '') {
        // Create fieldset element for description
        const fieldset = document.createElement('fieldset');
        fieldset.classList.add('description-fieldset');
        fieldset.style.border = '1px solid #ddd'; // Slightly visible border

        // Create legend for fieldset
        const legend = document.createElement('legend');
        legend.classList.add('description-legend');
        legend.style.fontSize = '10px';
        legend.textContent = 'Description:';
        fieldset.appendChild(legend);

        // Create div for description text
        const description_text = document.createElement('div');
        description_text.classList.add('description-text');
        description_text.style.fontSize = '12px'; // Very small font size
        description_text.style.textAlign = 'center';
        description_text.textContent = food_selection[value].list[i].description;

      
        fieldset.appendChild(description_text);


        cardText.appendChild(fieldset);
    }
}
    


let food_selection = [
    { //coffee
        food: 'coffee',
        items: 8,
        list: [
            {
                name: "LATTE",
                prices: ["(H) $4.75", "(C) $5.25"],
                description: ""
            },
            {
                name: "CORTADO",
                prices: ["(H) $4.25", " (C) $4.75 "],
                description: ""
            },
            {
                name: "DRIP COFFEE", //change this later
                prices: [
                    "$3 (H) Small", 
                    "$3.50 (C) Small", 
                    "$3.50 (H) Medium", 
                    "$4 (H) Large", 
                    "$4.25 (C) Large"
                ],
                description: ""
            },
            {
                name: "CAFE AU LAIT",
                prices: ["$3.25 (H)"],
                description: ""
            },
            {
                name: "CAPPUCINO",
                prices: ["$4.50 (H)"],
                description: ""
            },
            {
                name: "MOCHA",
                prices: ["$5.75 (H)", "$6.25 (C)"],
                description: ""
            },
            {
                name: "RED EYE",
                prices: ["$4.50 (H)", "$4.75 (C)"],
                description: ""
            },
            {
                name: "AMERICANO",
                prices: ["$3.75 (H)", "$4.25 (C)"],
                description: ""
            }
        ]
        
    },
    { //boba
        food: "boba",
        items: 7,
        list: [
            {
                name: "THE OG",
                prices: ["Medium: $4.25", "Large: $5.25", "Hot: $5.25" ],
                description: ""
            },
            {
                name: "BROWN SUGAR BOBA",
                prices: ["Medium: $4.75", "Large: $5.75", "Hot: $5.75"],
                description: "Caffeine free"
            },
            {
                name: "TARO BOBA COCONUT BOBA",
                prices: ["Medium: $4.25", "Large: $5.25", "Hot: $5.25"],
                description: "Caffeine free, dairy free"
            },
            {
                name: "FRUIT GREEN/BLACK TEA",
                prices: ["Medium: $4.25", "Large: $5.25"],
                description: "Comes in a variety of flavors: mango, strawberry, passionfruit, peach, green apple, lychee, kiwi. Feel free to mix and match!"
            },
            {
                name: "FRUIT BLACK TEA",
                prices: ["Medium: $4.25", "Large: $5.25"],
                description: "Comes in a variety of flavors: peach, strawberry. Feel free to mix and match!"
            },
            {
                name: "JASMINE MILK TEA WINTERMELON MILK TEA",
                prices: ["Medium: $4.25", "Large: $5.25", "Hot: $5.25"],
                description: "Dairy free"
            },
            {
                name: "TOPPINGS",
                prices: ["+$0.50"],
                description: "Tapioca pearls, lychee jelly, mixed jelly, grass jelly, pop strawberry, pop passionfruit, mango stars"
            }
        ]
    },
    { //specialty
        food: "specialty",
        items: 9,
        list: [
            {
                name: "MATCHA LATTE",
                prices: ["$5.25 (H)", "$5.75 (C)"],
                description: ""
            },
            {
                name: "HOT CHOCOLATE",
                prices: ["$4.50 (H)", "S'mores: $5.50"],
                description: ""
            },
            {
                name: "NUTELLA LATTE",
                prices: ["$5.75 (H)", "$6.25 (C)"],
                description: ""
            },
            {
                name: "CHAI",
                prices: ["$5.00 (H)", "$5.50 (C)"],
                description: ""
            },
            {
                name: "DIRTY CHAI",
                prices: ["$6.25 (H)", "$6.75 (C)"],
                description: ""
            },
            {
                name: "LAVENDAR LATTE",
                prices: ["$5.75 (H)", "$6.25 (C)"],
                description: ""
            },
            {
                name: "ROSE LATTE",
                prices: ["$5.75 (H)", "$6.25 (C)"],
                description: ""
            },
            {
                name: "BROWN SUGAR LATTE",
                prices: ["$5.75 (H)", "$6.25 (C)"],
                description: ""
            },
            {
                name: "BUMBLEBEE LATTE",
                prices: ["$6.25 (H)", "$6.75 (C)"],
                description: ""
            }
        ]
    },
    { //hot bites
        food: "hot bites",
        items: 8,
        list: [
            { name: "CHICKEN POPPERS", prices: ["$6.00" ], description: ""},
            { name: "MOZZ STICKS", prices: ["$7.00"],  description: "" },
            { name: "PIGS IN A BLANKET", prices: [ "$7.00" ],  description: ""},
            { name: "TATER TOTS", prices: ["$5.00"],  description: ""},
            { name: "CHICKEN TENDERS", prices: ["$8.00" ],  description: ""},
            { name: "ONION RINGS", prices:[ "$5.00" ],  description: ""},
            { name: "FRIES", prices: ["$5.00"],  description: "" },
            { name: "SWEET POTATO FRIES", prices: ["$6.00" ],  description: ""}
        ]
        
    },
    { //sandwhiches-salads
        food: "sandwhiches-salads",
        items: 12,
        list: [
            {
                name: "BEYOND BUSSIN SANDWICH",
                prices: ["$15.00"],
                description: "SHEEEESH Our new VEGAN sandwich highlighting the beyond burger and our house-made vegan chipotle aioli alongside lettuce, onion and avocado. Comes with a side of our house made chipotle aioli and chips"
            },
            {
                name: "SPICY CHICKEN SANDWICH",
                prices: ["$13.00"],
                description: "Spicy mayo, grilled chicken, crispy bacon and avocado on Italian herb focaccia. Comes with chips"
            },
            {
                name: "ITALIAN PANINI",
                prices: ["$11.00"],
                description: "Prosciutto, pesto, and mozzarella in between herb focaccia and pressed til golden brown and crispy (pesto contains pine nuts). Comes with chips"
            },
            {
                name: "TUNA MELT",
                prices: ["$11.00"],
                description: "House-made tuna salad with American cheese on Italian herb focaccia pressed to perfection (can be spicy on request). Comes with chips"
            },
            {
                name: "ZESTO CHICKEN SANDWICH",
                prices: ["$13.00"],
                description: "Basil pesto, grilled chicken, fresh mozzarella and lemon zest on Italian herb focaccia (pesto contains pine nuts). Comes with chips"
            },
            {
                name: "TURKEY CLUB",
                prices: ["$11.00"],
                description: "Roast turkey, lettuce, tomato, crispy bacon and American cheese on sourdough. Comes with chips"
            },
            {
                name: "GRILLED CHEESE",
                prices: ["$6.50"],
                description: "Comes with chips. +bacon/tomato/turkey: $1.50"
            },
            {
                name: "MIXED GREEN SALAD",
                prices: ["$6.50"],
                description: "w/tomato, vegan. +smoked salmon: $5.00, +boiled egg: $1.00, +avocado: $1.50"
            },
            {
                name: "COBB SALAD",
                prices: ["$10.00"],
                description: "Romaine lettuce, bacon, egg, chicken, tomato, and avocado tossed with ranch"
            },
            {
                name: "PIZZA PANINI",
                prices: ["$11.00"],
                description: "Pepperoni, fresh mozzarella, marinara and olive oil on Italian herb focaccia and pressed to perfection! Comes with chips"
            },
            {
                name: "SMOKED SALMON TARTINE",
                prices: ["$11.00"],
                description: "Lemon zest infused cream cheese on toasted heritage wheat. Piled high with smoked salmon and topped with pickled red onion. Comes with a side salad"
            },
            {
                name: "AVOCADO TOAST",
                prices:["$10.00"],
                description: "Avocado mashed with salt, pepper, lemon juice and olive oil on toasted heritage wheat. Comes with a side salad. +egg: $1"
            }
        ]
    },
    { //seasonal
        food: "seasonal",
        items: 8,
        list: [
            {
                name: "PINA COLADA",
                prices: ["Medium: $4.75", "Large: $5.75"],
                description: "Our coconut boba with pineapple flavor!"
            },
            {
                name: "MATCHA LEMONADE",
                prices: ["Medium: $5.00", "Large: $6.00"],
                description: "Our freshly squeezed lemonade with a balance of an earthy shot of matcha"
            },
            {
                name: "YUZU-ADE",
                prices: ["Large: $5.25"],
                description: "Popular in South Korea, Yuzu-Ade is a carbonated drink with yuzu marmalade. Yuzu is a citrus with a tart and fragrant flavor of orange and grapefruit."
            },
            {
                name: "FRESHLY SQUEEZED LEMONADE",
                prices: ["Medium: $4.00", "Large: $5.00"],
                description: "Real lemons with our signature recipe = amazing lemonade"
            },
            {
                name: "MATCHA LAVENDER OAT",
                prices: ["$6.50"],
                description: "Lavender infused into our oatmilk steamed over a matcha shot."
            },
            {
                name: "Berry Lavendar Lemonade",
                prices: ["Medium: $5.25", "Large: $6.25"],
                description: "Made with real bourbon and definitely the drink we're most excited for this fall."
            },
            {
                name: "Citrus Boba (Grapefruit or Orange)",
                prices: ["Large: $6.00"],
                description: "Made with real fruit juice and fruit slices!"
            },
            {
                name: "ROTATING BEER/WINE PROGRAM",
                prices: [],
                description: "Check out our beer and wine at the front of our store! We're constantly rotating out product from local breweries!"
            }
        ]
    },
];