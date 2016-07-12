var assert = require("assert");
var mostLeastProduct = require('../routes/mostLeastProduct');

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

describe("Nelisa Narrative: procssing product sold data", function() {
    //filter data
    it('Should return a group csv by item and quantity of week1', function() {
        var week1Results = mostLeastProduct.groupProduct("./files/week1.csv");
        assert.deepEqual(week1Results, expectedWeek1);
    });

    it('Should return a group csv by item and quantity of week2', function() {
        var week1Results = mostLeastProduct.groupProduct("./files/week2.csv");
        assert.deepEqual(week1Results, expectedWeek2);
    });

    it('Should return a group csv by item and quantity of week3', function() {
        var week1Results = mostLeastProduct.groupProduct("./files/week3.csv");
        assert.deepEqual(week1Results, expectedWeek3);
    });

    it('Should return a group csv by item and quantity of week4', function() {
        var week1Results = mostLeastProduct.groupProduct("./files/week4.csv");
        assert.deepEqual(week1Results, expectedWeek4);
    });
});

describe("Nelisa Narrative: Most and least popular product for each week", function() {
    //most popular product for each week
    it('Should return the most popular product sold for week one', function() {
        var mostProduct1 = mostLeastProduct.mostProduct(expectedWeek1);
        assert.deepEqual(mostProduct1, { item: 'Coke 500ml', qty: 54 });
    });

    it('Should return the most popular product sold for week two', function() {
        var mostProduct2 = mostLeastProduct.mostProduct(expectedWeek2);
        assert.deepEqual(mostProduct2, { item: 'Mixed Sweets 5s', qty: 54 });
    });

    it('Should return the most popular product sold for week three', function() {
        var mostProduct3 = mostLeastProduct.mostProduct(expectedWeek3);
        assert.deepEqual(mostProduct3, { item: 'Mixed Sweets 5s', qty: 29 });
    });


    it('Should return the most popular product sold for week four', function() {
        var mostProduct4 = mostLeastProduct.mostProduct(expectedWeek4);
        assert.deepEqual(mostProduct4, { item: 'Coke 500ml', qty: 45 });
    });

    // least popular product for each week
    it('Should return the least popular product sold for week one', function() {
        var leastProduct1 = mostLeastProduct.leastProduct(expectedWeek1);
        assert.deepEqual(leastProduct1, { item: 'Shampoo 1 litre', qty: 3 });
    });

    it('Should return the least popular product sold for week two', function() {
        var leastProduct1 = mostLeastProduct.leastProduct(expectedWeek2);
        assert.deepEqual(leastProduct1, { item: 'Soap Bar', qty: 5 });
    });

    it('Should return the least popular product sold for week three', function() {
        var leastProduct1 = mostLeastProduct.leastProduct(expectedWeek3);
        assert.deepEqual(leastProduct1, { item: 'Iwisa Pap 5kg', qty: 4 });
    });

    it('Should return the least popular product sold for week four', function() {
        var leastProduct1 = mostLeastProduct.leastProduct(expectedWeek4);
        assert.deepEqual(leastProduct1, { item: 'Shampoo 1 litre', qty: 13 });
    });

});
