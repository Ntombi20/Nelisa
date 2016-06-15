var assert = require("assert");
var result = require("../groupProduct");
var mostLeastProduct = require('../mostLeastProduct');

var expectedWeek1 = {
    'Milk 1l': 39,
    Imasi: 30,
    Bread: 45,
    'Chakalaka Can': 23,
    'Gold Dish Vegetable Curry Can': 17,
    'Fanta 500ml': 33,
    'Coke 500ml': 54,
    'Cream Soda 500ml': 22,
    'Iwisa Pap 5kg': 17,
    'Top Class Soy Mince': 22,
    'Shampoo 1 litre': 3,
    'Soap Bar': 12,
    'Bananas - loose': 47,
    'Apples - loose': 36,
    'Mixed Sweets 5s': 49
}

var expectedWeek2 = {
    Imasi: 36,
    Bread: 28,
    'Chakalaka Can': 21,
    'Gold Dish Vegetable Curry Can': 27,
    'Fanta 500ml': 23,
    'Coke 500ml': 42,
    'Cream Soda 500ml': 22,
    'Iwisa Pap 5kg': 10,
    'Top Class Soy Mince': 21,
    'Shampoo 1 litre': 6,
    'Soap Bar': 5,
    'Bananas - loose': 28,
    'Apples - loose': 21,
    'Mixed Sweets 5s': 54,
    'Milk 1l': 28,
    'Heart Chocolates': 20,
    'Rose (plastic)': 14,
    'Valentine Cards': 14
}

var expectedWeek3 = {
    Imasi: 25,
    Bread: 24,
    'Chakalaka Can': 17,
    'Gold Dish Vegetable Curry Can': 8,
    'Fanta 500ml': 14,
    'Coke 500ml': 18,
    'Cream Soda 500ml': 12,
    'Iwisa Pap 5kg': 4,
    'Top Class Soy Mince': 12,
    'Shampoo 1 litre': 4,
    'Soap Bar': 8,
    'Bananas - loose': 17,
    'Apples - loose': 25,
    'Mixed Sweets 5s': 29,
    'Milk 1l': 28
}

var expectedWeek4 = {
    Imasi: 34,
    Bread: 33,
    'Chakalaka Can': 33,
    'Gold Dish Vegetable Curry Can': 34,
    'Fanta 500ml': 24,
    'Coke 500ml': 45,
    'Cream Soda 500ml': 19,
    'Iwisa Pap 5kg': 16,
    'Top Class Soy Mince': 43,
    'Shampoo 1 litre': 13,
    'Soap Bar': 25,
    'Bananas - loose': 22,
    'Apples - loose': 32,
    'Mixed Sweets 5s': 40,
    'Milk 1l': 43
}

var week1Results = result.readRecords("./files/week1.csv");
var week2Results = result.readRecords("./files/week2.csv");
var week3Results = result.readRecords("./files/week3.csv");
var week4Results = result.readRecords("./files/week4.csv");

describe("Nelisa Narrative: filtering and grouping data", function() {
    //filter data
    it('Should read the records for week one and filter the records by Day, Date, Stock item, Number sold, Sales price but return the length of the records', function() {
        var week1Results = result.readRecords("./files/week1.csv");
        assert.equal(105, week1Results.length);
    });

    it('Should read the records for week two and filter the records by Day, Date, Stock item, Number sold, Sales price but return the length of the records', function() {
        var week2Results = result.readRecords("./files/week2.csv");
        assert.equal(117, week2Results.length);
    });

    it('Should read the records for week three and filter the records by Day, Date, Stock item, Number sold, Sales price but return the length of the records', function() {
        var week3Results = result.readRecords("./files/week3.csv");
        assert.equal(104, week3Results.length);
    });

    it('Should read the records for week four and filter the records by Day, Date, Stock item, Number sold, Sales price but return the length of the records', function() {
        var week4Results = result.readRecords("./files/week4.csv");
        assert.equal(119, week4Results.length);
    });

    //group data
    it('Should return stock data group for week one', function() {
        var week1 = result.groupRecords(week1Results);
        assert.deepEqual(expectedWeek1, week1);
    });

    it('Should return stock data group for week two', function() {
        var week2 = result.groupRecords(week2Results);
        assert.deepEqual(expectedWeek2, week2);
    });

    it('Should return stock data group for week three', function() {
        var week3 = result.groupRecords(week3Results);
        assert.deepEqual(expectedWeek3, week3);
    });

    it('Should return stock data group for week four', function() {
        var week4 = result.groupRecords(week4Results);
        assert.deepEqual(expectedWeek4, week4);
    });
});

describe("Nelisa Narrative: Most and least popular product for each week", function() {
    //most popular product for each week
    it('Should return the most popular product sold for week one', function() {
        var mostProduct1 = mostLeastProduct.mostProduct(expectedWeek1);
        assert.equal(mostProduct1, "Coke 500ml");
    });

    it('Should return the most popular product sold for week two', function() {
        var mostProduct2 = mostLeastProduct.mostProduct(expectedWeek2);
        assert.equal(mostProduct2, "Mixed Sweets 5s");
    });

    it('Should return the most popular product sold for week three', function() {
        var mostProduct3 = mostLeastProduct.mostProduct(expectedWeek3);
        assert.equal(mostProduct3, "Mixed Sweets 5s");
    });

    it('Should return the most popular product sold for week four', function() {
        var mostProduct4 = mostLeastProduct.mostProduct(expectedWeek4);
        assert.equal(mostProduct4, "Coke 500ml");
    });

    // least popular product for each week
    it('Should return the least popular product sold for week one', function() {
        var leastProduct1 = mostLeastProduct.leastProduct(expectedWeek1);
        assert.equal(leastProduct1, "Shampoo 1 litre");
    });

    it('Should return the least popular product sold for week two', function() {
        var leastProduct1 = mostLeastProduct.leastProduct(expectedWeek1);
        assert.equal(leastProduct1, "Shampoo 1 litre");
    });

    it('Should return the least popular product sold for week three', function() {
        var leastProduct1 = mostLeastProduct.leastProduct(expectedWeek1);
        assert.equal(leastProduct1, "Shampoo 1 litre");
    });

    it('Should return the least popular product sold for week four', function() {
        var leastProduct1 = mostLeastProduct.leastProduct(expectedWeek1);
        assert.equal(leastProduct1, "Shampoo 1 litre");
    });

});
