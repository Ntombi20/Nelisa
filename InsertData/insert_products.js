var mysql = require('mysql');
var conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '12345',
    port: 3306,
    database: 'nelisa_spaza_app'
});

var productsCategory = {
        "Milk": "Dairy",
        "Bread": "Bakery",
        "Chakalaka Canned": "Canned food",
        "Gold dish vegetable curry can": "Canned food",
        "Fanta 500ml": "Bevarage",
        "Coke 500ml": "Bevarage",
        "Cream soda 500ml": "Bevarage",
        "Iwisa Pap 5kg": "Grain product",
        "Top class soy mince": "Grain product",
        "Shampoo": "Household",
        "Soap bar": "Household",
        "Bananas-loose": "Fruit",
        "Apples-loose": "Fruit",
        "Mixed sweets 5s": "Snacks",
        "Heart chocolate": "Snacks",
        "Imasi": "Dairy",
        "Rose (plastic)": "Gift",
        "Valentine cards": "Gift"
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

    var insertProducts = "INSERT INTO products (product, category_id) VALUES ?";

    conn.query(insertProducts, [values], function(err, results) {
        if (err) {
            console.log("There is an error with populating the product table");
        };

        console.log(results);
        conn.end();
    });

});
// conn.end();
