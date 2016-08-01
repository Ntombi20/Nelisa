var mysql = require('mysql');
var conn = mysql.createConnection({
        host: 'localhost',
        user: 'ntombi',
        password: 'nicolenma20',
        port: 3306,
        database: 'nelisa_spaza_app'
});

var sql = "INSERT INTO categories (description) VALUE ?";

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

conn.query(sql, [values], function(err, results) {
    if (err){
      console.log(err);
    }
    console.log(results);
    conn.end();
});
