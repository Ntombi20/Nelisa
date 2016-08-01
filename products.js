var mysql = require('mysql');
var conn = mysql.createConnection({
        host: 'localhost',
        user: 'ntombi',
        password: 'nicolenma20',
        port: 3306,
        database: 'nelisa_spaza_app'
});

var sql = "INSERT INTO products (description, price) VALUE ?";

//create a list of lists
var values = [
    ["Milk", 10.00],
    ["Bread", 12.00],
    ["Chakalaka Canned", 10.00],
    ["Gold dish vegetable curry can", 9.00],
    ["Fanta 500ml", 6.50],
    ["Coke 500ml", 6.50],
    ["Cream soda 500ml", 10.00],
    ["Iwisa Pap 5kg", 30.00],
    ["Top class soy mince", 12.00],
    ["Shampoo", 30.00],
    ["Soap bar", 6.00],
    ["Bananas-loose", 2.00],
    ["Apples-loose", 2.00],
    ["Mixed sweets 5s", 3.00],
    ["Heart chocolate", 35.00],
    ["Imasi", 25.00],
    ["Rose (plastic)", 15.00],
    ["Valentine cards", 4.00]
];

conn.query(sql, [values], function(err, results) {
    if (err){
      console.log(err);
    }
    console.log(results);
    conn.end();
});
