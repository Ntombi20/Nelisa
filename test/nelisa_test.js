var assert = require("assert");
var results = require("../filterGroup");
var mostLeastProduct = require('../mostLeastProduct');
var category = require('../category');
var profit = require('../profit');

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


var groupCategory = {
    'Milk 1l': 'Diary',
    Bread: 'Bakery',
    'Chakalaka Can': 'Canned food',
    'Gold Dish Vegetable Curry Can': 'Canned food',
    'Fanta 500ml': 'Bevarage',
    'Coke 500ml': 'Bevarage',
    'Cream Soda 500ml': 'Bevarage',
    'Iwisa Pap 5kg': 'Grain product',
    'Top Class Soy Mince': 'Grain product',
    'Shampoo 1 litre': 'Household',
    'Soap Bar': 'Household',
    'Bananas - loose': 'Fruits',
    'Apples - loose': 'Fruits',
    'Mixed Sweets 5s': 'Snacks',
    Imasi: 'Diary',
    'Heart Chocolates': 'Snacks',
    'Rose (plastic)': 'Gift',
    'Valentine Cards': 'Gift'
}


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

var week1Results = results.readRecords("./files/week1.csv");
var week2Results = results.readRecords("./files/week2.csv");
var week3Results = results.readRecords("./files/week3.csv");
var week4Results = results.readRecords("./files/week4.csv");

describe("Nelisa Narrative: filtering and grouping data", function() {
    //filter data
    it('Should read the records for week one and filter the records by Day, Date, Stock item, Number sold, Sales price but return the length of the records', function() {
        var week1Results = results.readRecords("./files/week1.csv");
        assert.equal(105, week1Results.length);
    });

    it('Should read the records for week two and filter the records by Day, Date, Stock item, Number sold, Sales price but return the length of the records', function() {
        var week2Results = results.readRecords("./files/week2.csv");
        assert.equal(117, week2Results.length);
    });

    it('Should read the records for week three and filter the records by Day, Date, Stock item, Number sold, Sales price but return the length of the records', function() {
        var week3Results = results.readRecords("./files/week3.csv");
        assert.equal(104, week3Results.length);
    });

    it('Should read the records for week four and filter the records by Day, Date, Stock item, Number sold, Sales price but return the length of the records', function() {
        var week4Results = results.readRecords("./files/week4.csv");
        assert.equal(119, week4Results.length);
    });

    //group data
    it('Should return stock data group for week one', function() {
        var week1 = results.groupRecords(week1Results);
        assert.deepEqual(expectedWeek1, week1);
    });

    it('Should return stock data group for week two', function() {
        var week2 = results.groupRecords(week2Results);
        assert.deepEqual(expectedWeek2, week2);
    });

    it('Should return stock data group for week three', function() {
        var week3 = results.groupRecords(week3Results);
        assert.deepEqual(expectedWeek3, week3);
    });

    it('Should return stock data group for week four', function() {
        var week4 = results.groupRecords(week4Results);
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

describe("Nelisa Narrative: grouping category data", function() {
    //get all the category using the data
    it('Should group the data into category', function() {
        var allCategory1 = results.groupCategory("./files/category.csv");
        assert.deepEqual(allCategory1, groupCategory);
    });

    //get the category and the total product sold in that category for each week.
    it('Should return the get the category and the total product sold in that category for week one.', function() {
        var category = results.category(groupCategory, expectedWeek1);
        assert.deepEqual(category, expectedCategory1);
    });

    it('Should return the get the category and the total product sold in that category for week two.', function() {
        var category = results.category(groupCategory, expectedWeek2);
        assert.deepEqual(category, expectedCategory2);
    });

    it('Should return the get the category and the total product sold in that category for week three.', function() {
        var category = results.category(groupCategory, expectedWeek3);
        assert.deepEqual(category, expectedCategory3);
    });

    it('Should return the get the category and the total product sold in that category for week four.', function() {
        var category = results.category(groupCategory, expectedWeek4);
        assert.deepEqual(category, expectedCategory4);
    });

});

describe("Nelisa Narrative: Most and least popular category sold each week", function() {
    //the most popular category sold each week
    it('Should return the most category product sold for week one', function() {
        var mostCategory1 = category.mostCategory(expectedCategory1);
        assert.equal(mostCategory1, "Bevarage");
    });

    it('Should return the most category product sold for week two', function() {
        var mostCategory2 = category.mostCategory(expectedCategory2);
        assert.equal(mostCategory2, "Bevarage");
    });

    it('Should return the most category product sold for week three', function() {
        var mostCategory3 = category.mostCategory(expectedCategory3);
        assert.equal(mostCategory3, "Diary");
    });

    it('Should return the most category product sold for week four', function() {
        var mostCategory4 = category.mostCategory(expectedCategory4);
        assert.equal(mostCategory4, "Bevarage");
    });

    //the least popular category sold each week
    it('Should return the least category product sold for week one', function() {
        var mostCategory1 = category.leastCategory(expectedCategory1);
        assert.equal(mostCategory1, "Household");
    });

    it('Should return the least category product sold for week two', function() {
        var leastCategory2 = category.leastCategory(expectedCategory2);
        assert.equal(leastCategory2, "Household");
    });

    it('Should return the least category product sold for week three', function() {
        var leastCategory3 = category.leastCategory(expectedCategory3);
        assert.equal(leastCategory3, "Household");
    });

    it('Should return the least category product sold for week four', function() {
        var leastCategory4 = category.leastCategory(expectedCategory4);
        assert.equal(leastCategory4, "Bakery");
    });

});

var expectedPurchases = { 'Chakalaka Can': 676,
                          'Coke 500ml': 598.5,
                          'Cream Soda 500ml': 357,
                          'Fanta 500ml': 433.5,
                          'Gold Dish Vegetable Curry Can': 479,
                          Imasi: 2238,
                          'Iwisa Pap 5kg': 1020,
                          'Milk 1l': 1061.5,
                          'Top Class Soy Mince': 808,
                          'Bananas - loose': 72,
                          'Apples - loose': 795,
                          'Mixed Sweets 5s': 2070,
                          'Shampoo 1 litre': 520,
                          'Soap Bar': 156,
                          Bread: 1270,
                          'Rose (plastic)': 200,
                          'Heart Chocolates': 500,
                          'Valentine Cards': 40 }

var groupByWeek1 = { 'Milk 1l': 390,
                    Imasi: 750,
                    Bread: 540,
                    'Chakalaka Can': 230,
                    'Gold Dish Vegetable Curry Can': 153,
                    'Fanta 500ml': 214.5,
                    'Coke 500ml': 351,
                    'Cream Soda 500ml': 165,
                    'Iwisa Pap 5kg': 510,
                    'Top Class Soy Mince': 264,
                    'Shampoo 1 litre': 90,
                    'Soap Bar': 72,
                    'Bananas - loose': 94,
                    'Apples - loose': 72,
                    'Mixed Sweets 5s': 120 }

var groupByWeek2 = { Imasi: 900,
                    Bread: 336,
                    'Chakalaka Can': 210,
                    'Gold Dish Vegetable Curry Can': 243,
                    'Fanta 500ml': 149.5,
                    'Coke 500ml': 273,
                    'Cream Soda 500ml': 165,
                    'Iwisa Pap 5kg': 300,
                    'Top Class Soy Mince': 252,
                    'Shampoo 1 litre': 180,
                    'Soap Bar': 30,
                    'Bananas - loose': 56,
                    'Apples - loose': 42,
                    'Mixed Sweets 5s': 147,
                    'Milk 1l': 280,
                    'Heart Chocolates': 700,
                    'Rose (plastic)': 210,
                    'Valentine Cards': 56 }

var groupByWeek3 = { Imasi: 625,
                  Bread: 288,
                  'Chakalaka Can': 170,
                  'Gold Dish Vegetable Curry Can': 72,
                  'Fanta 500ml': 91,
                  'Coke 500ml': 117,
                  'Cream Soda 500ml': 90,
                  'Iwisa Pap 5kg': 120,
                  'Top Class Soy Mince': 144,
                  'Shampoo 1 litre': 120,
                  'Soap Bar': 48,
                  'Bananas - loose': 34,
                  'Apples - loose': 50,
                  'Mixed Sweets 5s': 80,
                  'Milk 1l': 280 }

var groupByWeek4 = { Imasi: 850,
                    Bread: 396,
                    'Chakalaka Can': 330,
                    'Gold Dish Vegetable Curry Can': 306,
                    'Fanta 500ml': 156,
                    'Coke 500ml': 292.5,
                    'Cream Soda 500ml': 142.5,
                    'Iwisa Pap 5kg': 480,
                    'Top Class Soy Mince': 516,
                    'Shampoo 1 litre': 390,
                    'Soap Bar': 150,
                    'Bananas - loose': 44,
                    'Apples - loose': 64,
                    'Mixed Sweets 5s': 108,
                    'Milk 1l': 430 }

var expectedProfit1 = { 'Milk 1l': 350,
                        Imasi: 710,
                        Bread: 500,
                        'Chakalaka Can': 190,
                        'Gold Dish Vegetable Curry Can': 113,
                        'Fanta 500ml': 174.5,
                        'Coke 500ml': 311,
                        'Cream Soda 500ml': 125,
                        'Iwisa Pap 5kg': 470,
                        'Top Class Soy Mince': 224,
                        'Shampoo 1 litre': 50,
                        'Soap Bar': 32,
                        'Bananas - loose': 54,
                        'Apples - loose': 32,
                        'Mixed Sweets 5s': 80 }


var expectedProfit2 = { Imasi: 860,
                        Bread: 296,
                        'Chakalaka Can': 170,
                        'Gold Dish Vegetable Curry Can': 203,
                        'Fanta 500ml': 109.5,
                        'Coke 500ml': 233,
                        'Cream Soda 500ml': 125,
                        'Iwisa Pap 5kg': 260,
                        'Top Class Soy Mince': 212,
                        'Shampoo 1 litre': 140,
                        'Soap Bar': -10,
                        'Bananas - loose': 16,
                        'Apples - loose': 2,
                        'Mixed Sweets 5s': 107,
                        'Milk 1l': 240,
                        'Heart Chocolates': 660,
                        'Rose (plastic)': 170,
                        'Valentine Cards': 16 }


var expectedProfit3 = { Imasi: 585,
                        Bread: 248,
                        'Chakalaka Can': 130,
                        'Gold Dish Vegetable Curry Can': 32,
                        'Fanta 500ml': 51,
                        'Coke 500ml': 77,
                        'Cream Soda 500ml': 50,
                        'Iwisa Pap 5kg': 80,
                        'Top Class Soy Mince': 104,
                        'Shampoo 1 litre': 80,
                        'Soap Bar': 8,
                        'Bananas - loose': -6,
                        'Apples - loose': 10,
                        'Mixed Sweets 5s': 40,
                        'Milk 1l': 240 }


var expectedProfit4 = { Imasi: 810,
                        Bread: 356,
                        'Chakalaka Can': 290,
                        'Gold Dish Vegetable Curry Can': 266,
                        'Fanta 500ml': 116,
                        'Coke 500ml': 252.5,
                        'Cream Soda 500ml': 102.5,
                        'Iwisa Pap 5kg': 440,
                        'Top Class Soy Mince': 476,
                        'Shampoo 1 litre': 350,
                        'Soap Bar': 110,
                        'Bananas - loose': 4,
                        'Apples - loose': 24,
                        'Mixed Sweets 5s': 68,
                        'Milk 1l': 390 }



describe("Nelisa Narrative: grouping purchases data", function() {
    //group data purchases
    it('Should return bulks data group for item and total cost', function() {
        var groupByPurchases = results.groupPurchases("./files/purchases.csv");
        assert.deepEqual(groupByPurchases, expectedPurchases);
    });

    //group data products
    it('Should return stock data group for week one for item and total cost', function() {
        var week1 = results.groupByWeeks(week1Results);
        assert.deepEqual(week1, groupByWeek1);
    });

    it('Should return stock data group for week two for item and total cost', function() {
        var week2 = results.groupByWeeks(week2Results);
        assert.deepEqual(week2, groupByWeek2);
    });

    it('Should return stock data group for week three for item and total cost', function() {
        var week3 = results.groupByWeeks(week3Results);
        assert.deepEqual(week3, groupByWeek3);
    });

    it('Should return stock data group for week four for item and total cost', function() {
        var week4 = results.groupByWeeks(week4Results);
        assert.deepEqual(week4, groupByWeek4);
    });

    //get profit
    it('Should return the profit using groupByWeeks and groupByPurchases for week one', function() {
        var profit = results.getProfit(expectedPurchases, groupByWeek1);
        assert.deepEqual(profit, expectedProfit1);
    });

    it('Should return the profit using groupByWeeks and groupByPurchases for week two', function() {
        var profit = results.getProfit(expectedPurchases, groupByWeek2);
        assert.deepEqual(profit, expectedProfit2);
    });

    it('Should return the profit using groupByWeeks and groupByPurchases for week three', function() {
        var profit = results.getProfit(expectedPurchases, groupByWeek3);
        assert.deepEqual(profit, expectedProfit3);
    });

    it('Should return the profit using groupByWeeks and groupByPurchases for week four', function() {
        var profit = results.getProfit(expectedPurchases, groupByWeek4);
        assert.deepEqual(profit, expectedProfit4);
    });

    //the most profitable product for each week;
    it('Should return the most profitable product for week one', function() {
        var mostProfitableProduct1 = profit.mostProfitableProduct(expectedProfit1);
        assert.equal(mostProfitableProduct1, "Imasi");
    });

    it('Should return the most profitable product for week two', function() {
        var mostProfitableProduct2 = profit.mostProfitableProduct(expectedProfit2);
        assert.equal(mostProfitableProduct2, "Imasi");
    });

    it('Should return the most profitable product for week three', function() {
        var mostProfitableProduct3 = profit.mostProfitableProduct(expectedProfit3);
        assert.equal(mostProfitableProduct3, "Imasi");
    });

    it('Should return the most profitable product for week four', function() {
        var mostProfitableProduct4 = profit.mostProfitableProduct(expectedProfit4);
        assert.equal(mostProfitableProduct4, "Imasi");
    });
});
