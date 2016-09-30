var mysql = require('mysql');
var fs = require('fs');

var conn = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '12345',
        port: 3306,
        database: 'nelisa_spaza'
});

var shops = [
    ['Markro'],
    ['Epping Market'],
    ['HomeMade'],
    ['Joe Spaza Shop'],
    ['ChinaTown']
];

var insertSuppliers = "INSERT INTO suppliers (shop) VALUE ?";

conn.query(insertSuppliers, [shops], function(err, results) {
    if (err){
      console.log(err);
    }
    console.log(results);
    conn.end();
});
