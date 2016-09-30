var mysql = require('mysql');
var fs = require('fs');

var conn = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '12345',
    port: 3306,
    database: 'nelisa_spaza'
});

var purchasesCSV = '../files/purchases.csv';

var purchasesMap = [];
var readCSV = fs.readFileSync(purchasesCSV, "utf8");
var removerHeader = readCSV.split('\n').slice(1).filter(Boolean);

removerHeader.forEach(function(purchases) {
    var items = purchases.split(";");
    var quantity = items[3];
    var price = items[4].replace("R", "").replace(",", ".");
    var editDate = items[1].split("-");

    var d = new Date(editDate),
        month = '' + (d.getMonth() + 1),
        day = '' + editDate[0],
        year = 2016;

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    var date = [year, month, day].join('/');

    var shops = items[0];
    purchasesMap.push({
        Shop: shops,
        Date: date,
        price: price,
        Quantity: quantity
    });
});

var insertPurchases = "INSERT INTO purchases (products_id, suppliers_id, quantity, price, date) VALUE ?";

conn.query("select * from products", function(err, products) {
    if (err) return console.log(err);

    var productsMap = {};
    products.forEach(function(product) {
        var productId = product.category_id;
        var productName = product.product;
        if (productsMap[productName] == undefined) {
            productsMap[productName] = productId
        }
    })

    conn.query("select * from suppliers", function(err, suppliers) {
        if (err) return console.log(err);

        var suppliersMap = {};
        suppliers.forEach(function(shops) {
            var supplierId = shops.id;
            var supplierName = shops.shop;
            // if (suppliersMap[supplierName] == undefined) {
            suppliersMap[supplierName] = supplierId
                // }
        });

        var values = [];
        for (var purchases in purchasesMap) {
            for (var product in productsMap) {
                for (var suppliers in suppliersMap) {
                    if (suppliers == purchasesMap[purchases].Shop) {
                        values.push([productsMap[product],
                            suppliersMap[suppliers],
                            purchasesMap[purchases].Quantity,
                            purchasesMap[purchases].price,
                            purchasesMap[purchases].Date
                        ]);
                    }
                }
            }
        }

        conn.query(insertPurchases, [values], function(err, results) {
            if (err) {
                console.log(err);
            }
            console.log(results);
            conn.end();
        });
    });


});
