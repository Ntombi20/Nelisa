var mysql = require('mysql');
var conn = mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '12345',
        port: 3306,
        database: 'nelisa_spaza'
});

var insertCategory = "INSERT INTO categories (categoryName) VALUE ?";

//create a list of lists
var values = [
    ['Dairy'],
    ['Bakery'],
    ['Canned food'],
    ['Bevarage'],
    ['Grain product'],
    ['Household'],
    ['Fruit'],
    ['Snacks'],
    ['Gift']
];

conn.query(insertCategory, [values], function(err, results) {
    if (err){
      console.log(err);
    }
    console.log(results);
    conn.end();
});
