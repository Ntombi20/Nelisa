var mysql = require('mysql');
var fs = require('fs');

var conn = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '12345',
        port: 3306,
        database: 'nelisa_spaza_app'
});

var purchasesCSV = './files/purchases.csv';

var shops = [];
var readCSV = fs.readFileSync(purchasesCSV, "utf8");
var removerHeader = readCSV.split('\n').slice(1).filter(Boolean);

removerHeader.forEach(function(purchases) {
    var items = purchases.split(";");
    var shopName = items[0];
    shops.push([shopName]);
});

var insertSuppliers = "INSERT INTO suppliers (shop) VALUE ?";

conn.query(insertSuppliers, [shops], function(err, results) {
    if (err){
      console.log(err);
    }
    console.log(results);
    conn.end();
});
