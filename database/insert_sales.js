var mysql = require('mysql');
var fs = require('fs');

var conn = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '12345',
        port: 3306,
        database: 'nelisa_spaza_app'
});

var salesCSV = '../files/sales.csv';

var dataMap = [];
var readCSV = fs.readFileSync(salesCSV, "utf8");
var removerHeader = readCSV.split('\n').slice(1).filter(Boolean);

removerHeader.forEach(function(sales) {
    var items = sales.split(",");
    var editDate = items[1].split("-");

    var d = new Date(editDate),
        month = '' + (d.getMonth() + 1),
        day = '' + editDate[0],
        year = 2016;

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    var date = [year, month, day].join('/');

    var Number_sold = items[3];
    var Sales_Price = items[4].replace("R", "");
    var stock_item = items[2];
    dataMap.push({
        Date: date,
        Stock_item: stock_item,
        Number_sold: Number_sold,
        Sales_Price: Sales_Price
    });
});

// };
var insertSales = "INSERT INTO sales (date, quantity, price, products_id) VALUE ?";

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


    var values = [];
    for (var sales in dataMap) {
        for (var product in productsMap) {
            if (product == dataMap[sales].Stock_item) {
                values.push([ dataMap[sales].Date,
                              dataMap[sales].Number_sold,
                              dataMap[sales].Sales_Price,
                              productsMap[product] ]);
            }
        }
    }

    conn.query(insertSales, [values], function(err, results) {
        if (err){
          console.log(err);
        }
        console.log(results);
        conn.end();
    });
});
