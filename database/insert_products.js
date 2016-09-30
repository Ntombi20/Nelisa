var mysql = require('mysql');
var conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '12345',
    port: 3306,
    database: 'nelisa_spaza'
});

var productsCategory = {
        "Milk 1l": "Dairy",
        "Bread": "Bakery",
        "Chakalaka Can": "Canned food",
        "Gold Dish Vegetable Curry Can": "Canned food",
        "Fanta 500ml": "Bevarage",
        "Coke 500ml": "Bevarage",
        "Cream Soda 500ml": "Bevarage",
        "Iwisa Pap 5kg": "Grain product",
        "Top Class Soy Mince": "Grain product",
        "Shampoo 1 litre": "Household",
        "Soap Bar": "Household",
        "Bananas - loose": "Fruit",
        "Apples - loose": "Fruit",
        "Mixed Sweets 5s": "Snacks",
        "Heart Chocolates": "Snacks",
        "Imasi": "Dairy",
        "Rose (plastic)": "Gift",
        "Valentine Cards": "Gift"
    }

conn.query("select * from categories", function(err, categories) {
    if (err) return console.log(err);

    var categoryMap = {};
    categories.forEach(function(cat) {
        var categoryId = cat.id;
        var categoryName = cat.categoryName;
        if (categoryMap[categoryName] == undefined) {
            categoryMap[categoryName] = categoryId
        }
    })

    var productsCategoryMap = {};
    var values = [];
    for (var product in productsCategory) {
        for (var category in categoryMap) {
            if (productsCategory[product] == category) {
                productsCategoryMap[product] = categoryMap[category];
                values.push([product, categoryMap[category]])
            }
        }
    }
    console.log(productsCategoryMap);

    var insertProducts = "INSERT INTO products (product, category_id) VALUES ?";

    conn.query(insertProducts, [values], function(err, results) {
        if (err) {
            console.log(err);
        };
        console.log(results);
        conn.end();
    });

});
