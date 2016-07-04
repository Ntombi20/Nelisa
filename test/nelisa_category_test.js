var assert = require("assert");
var category = require('../category');

var expectedCategory1 = {
    Diary: 69,
    Bakery: 45,
    'Canned food': 40,
    Bevarage: 109,
    'Grain product': 39,
    Household: 15,
    Fruits: 83,
    Snacks: 49
}

var expectedCategory2 = {
    Diary: 64,
    Bakery: 28,
    'Canned food': 48,
    Bevarage: 87,
    'Grain product': 31,
    Household: 11,
    Fruits: 49,
    Snacks: 74,
    Gift: 28
}

var expectedCategory3 = {
    Diary: 53,
    Bakery: 24,
    'Canned food': 25,
    Bevarage: 44,
    'Grain product': 16,
    Household: 12,
    Fruits: 42,
    Snacks: 29
}

var expectedCategory4 = {
    Diary: 77,
    Bakery: 33,
    'Canned food': 67,
    Bevarage: 88,
    'Grain product': 59,
    Household: 38,
    Fruits: 54,
    Snacks: 40
}

describe("Nelisa Narrative: grouping category data", function() {
    //get the category and the total product sold in that category for each week.
    it('Should return the get the category and the total product sold in that category for week one.', function() {
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
        var salesCategory1 = category.groupCategory("./files/category.csv", expectedWeek1);
        assert.deepEqual(salesCategory1, expectedCategory1);
    });

    it('Should return the get the category and the total product sold in that category for week two.', function() {
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
        var salesCategory2 = category.groupCategory("./files/category.csv", expectedWeek2);
        assert.deepEqual(salesCategory2, expectedCategory2);
    });

    it('Should return the get the category and the total product sold in that category for week three.', function() {
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
        var salesCategory3 = category.groupCategory("./files/category.csv", expectedWeek3);
        assert.deepEqual(salesCategory3, expectedCategory3);
    });

    it('Should return the get the category and the total product sold in that category for week four.', function() {
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
        var salesCategory4 = category.groupCategory("./files/category.csv", expectedWeek4);
        assert.deepEqual(salesCategory4, expectedCategory4);
    });

});

describe("Nelisa Narrative: Most and least popular category sold each week", function() {
    //the most popular category sold each week
    it('Should return the most category product sold for week one', function() {
        var mostCategory1 = category.mostCategory(expectedCategory1);
        assert.deepEqual(mostCategory1, {
            item: 'Bevarage',
            qty: 109
        });
    });

    it('Should return the most category product sold for week two', function() {
        var mostCategory2 = category.mostCategory(expectedCategory2);
        assert.deepEqual(mostCategory2, {
            item: 'Bevarage',
            qty: 87
        });
    });

    it('Should return the most category product sold for week three', function() {
        var mostCategory3 = category.mostCategory(expectedCategory3);
        assert.deepEqual(mostCategory3, {
            item: 'Diary',
            qty: 53
        });
    });

    it('Should return the most category product sold for week four', function() {
        var mostCategory4 = category.mostCategory(expectedCategory4);
        assert.deepEqual(mostCategory4, {
            item: 'Bevarage',
            qty: 88
        });
    });

    //the least popular category sold each week
    it('Should return the least category product sold for week one', function() {
        var mostCategory1 = category.leastCategory(expectedCategory1);
        assert.deepEqual(mostCategory1, {
            item: 'Household',
            qty: 15
        });
    });

    it('Should return the least category product sold for week two', function() {
        var leastCategory2 = category.leastCategory(expectedCategory2);
        assert.deepEqual(leastCategory2, {
            item: 'Household',
            qty: 11
        });
    });

    it('Should return the least category product sold for week three', function() {
        var leastCategory3 = category.leastCategory(expectedCategory3);
        assert.deepEqual(leastCategory3, {
            item: 'Household',
            qty: 12
        });
    });

    it('Should return the least category product sold for week four', function() {
        var leastCategory4 = category.leastCategory(expectedCategory4);
        assert.deepEqual(leastCategory4, {
            item: 'Bakery',
            qty: 33
        });
    });

});
