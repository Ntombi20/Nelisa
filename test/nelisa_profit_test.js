var assert = require("assert");
var results = require("../groupPurchases");
var profit = require('../profit');
var category = require('../groupCategory');

var expectedSales1 = {
    'Milk 1l': 390,
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
    'Mixed Sweets 5s': 120
}

var expectedSales2 = {
    Imasi: 900,
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
    'Valentine Cards': 56
}

var expectedSales3 = {
    Imasi: 625,
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
    'Milk 1l': 280
}

var expectedSales4 = {
    Imasi: 850,
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
    'Milk 1l': 430
}

var expectedProfit1 = {
    'Milk 1l': 380,
    Imasi: 721,
    Bread: 506,
    'Chakalaka Can': 215,
    'Gold Dish Vegetable Curry Can': 138,
    'Fanta 500ml': 190.5,
    'Coke 500ml': 315,
    'Cream Soda 500ml': 147,
    'Iwisa Pap 5kg': 505,
    'Top Class Soy Mince': 254,
    'Shampoo 1 litre': 87,
    'Soap Bar': 59,
    'Bananas - loose': 74,
    'Apples - loose': -128,
    'Mixed Sweets 5s': -270
}

var expectedProfit2 = {
    Imasi: 870,
    Bread: 321,
    'Chakalaka Can': 195,
    'Gold Dish Vegetable Curry Can': 233,
    'Fanta 500ml': 137.5,
    'Coke 500ml': 243,
    'Cream Soda 500ml': NaN,
    'Iwisa Pap 5kg': 295,
    'Top Class Soy Mince': 232,
    'Shampoo 1 litre': 175,
    'Soap Bar': 25,
    'Bananas - loose': 48,
    'Apples - loose': 22,
    'Mixed Sweets 5s': -53,
    'Milk 1l': 249,
    'Heart Chocolates': 680,
    'Rose (plastic)': 190,
    'Valentine Cards': 36
}


var expectedProfit3 = {
    Imasi: 550,
    Bread: 209,
    'Chakalaka Can': 122,
    'Gold Dish Vegetable Curry Can': 30,
    'Fanta 500ml': 29,
    'Coke 500ml': 12,
    'Cream Soda 500ml': 44,
    'Iwisa Pap 5kg': 92,
    'Top Class Soy Mince': 99,
    'Shampoo 1 litre': 111,
    'Soap Bar': 27,
    'Bananas - loose': 2,
    'Apples - loose': -180,
    'Mixed Sweets 5s': -570,
    'Milk 1l': 210
}

var expectedProfit4 = {
    Imasi: 750,
    Bread: 292,
    'Chakalaka Can': 270,
    'Gold Dish Vegetable Curry Can': 250,
    'Fanta 500ml': 81,
    'Coke 500ml': 163.5,
    'Cream Soda 500ml': 82.5,
    'Iwisa Pap 5kg': 441,
    'Top Class Soy Mince': 456,
    'Shampoo 1 litre': 375,
    'Soap Bar': 121,
    'Bananas - loose': -8,
    'Apples - loose': -316,
    'Mixed Sweets 5s': -574,
    'Milk 1l': 323
}


var filter = results.filterRecords("./files/purchases.csv");
var groupIntoweeks = results.groupIntoweeks(filter);

var expectedWeek1 = {
    'Shampoo 1 litre': 3,
    'Soap Bar': 13,
    'Bananas - loose': 20,
    'Apples - loose': 200,
    'Mixed Sweets 5s': 390,
    Bread: 34,
    Imasi: 29,
    'Chakalaka Can': 15,
    'Coke 500ml': 36,
    'Cream Soda 500ml': 18,
    'Fanta 500ml': 24,
    'Gold Dish Vegetable Curry Can': 15,
    'Iwisa Pap 5kg': 5,
    'Milk 1l': 10,
    'Top Class Soy Mince': 10
}

var expectedWeek2 = {
    'Rose (plastic)': 20,
    'Milk 1l': 31,
    'Bananas - loose': 8,
    'Apples - loose': 20,
    'Mixed Sweets 5s': 200,
    Bread: 15,
    'Chakalaka Can': 15,
    'Coke 500ml': 30,
    'Gold Dish Vegetable Curry Can': 10,
    'Heart Chocolates': 20,
    Imasi: 30,
    'Iwisa Pap 5kg': 5,
    'Top Class Soy Mince': 20,
    'Shampoo 1 litre': 5,
    'Valentine Cards': 20,
    'Soap Bar': 5,
    'Fanta 500ml': 12
}

var expectedWeek3 = {
    'Chakalaka Can': 48,
    'Coke 500ml': 105,
    'Cream Soda 500ml': 46,
    'Fanta 500ml': 62,
    'Gold Dish Vegetable Curry Can': 42,
    Imasi: 75,
    'Iwisa Pap 5kg': 28,
    'Milk 1l': 70,
    'Top Class Soy Mince': 45,
    'Bananas - loose': 32,
    'Apples - loose': 230,
    'Mixed Sweets 5s': 650,
    'Shampoo 1 litre': 9,
    'Soap Bar': 21,
    Bread: 79,
    'Rose (plastic)': 20,
    'Heart Chocolates': 20,
    'Valentine Cards': 20
}

var expectedWeek4 = {
    'Chakalaka Can': 60,
    'Coke 500ml': 129,
    'Cream Soda 500ml': 60,
    'Fanta 500ml': 75,
    'Gold Dish Vegetable Curry Can': 56,
    Imasi: 100,
    'Iwisa Pap 5kg': 39,
    'Milk 1l': 107,
    'Top Class Soy Mince': 60,
    'Bananas - loose': 52,
    'Apples - loose': 380,
    'Mixed Sweets 5s': 682,
    'Shampoo 1 litre': 15,
    'Soap Bar': 29,
    Bread: 104,
    'Rose (plastic)': 20,
    'Heart Chocolates': 20,
    'Valentine Cards': 20
}

describe("Nelisa Narrative: grouping purchases data for products", function() {
    //weeks: group by total cost(sales price * no sold) and stock item
    it('Should group week1 data by total cost(sales price * no sold) and stock item', function() {
        assert.deepEqual(groupByWeek1, expectedSales1);
    });

    it('Should group week2 data by total cost(sales price * no sold) and stock item', function() {
        var groupByWeek2 = results.salesByWeeks("./files/week2.csv");
        assert.deepEqual(groupByWeek2, expectedSales2);
    });

    it('Should group week3 data by total cost(sales price * no sold) and stock item', function() {
        var groupByWeek3 = results.salesByWeeks("./files/week3.csv");
        assert.deepEqual(groupByWeek3, expectedSales3);
    });
    var groupByWeek1 = results.salesByWeeks("./files/week1.csv");

    it('Should group week4 data by total cost(sales price * no sold) and stock item', function() {
        var groupByWeek4 = results.salesByWeeks("./files/week4.csv");
        assert.deepEqual(groupByWeek4, expectedSales4);
    });

    //filter data purchases
    it('Should filter the data for purchases and return the length', function() {
        var filter = results.filterRecords("./files/purchases.csv").length;
        assert.equal(filter, 153);
    });

    //Should group the data for purchases into weeks
    // it('Should group the data for purchases weeks', function() {
    //     var groupIntoweeks = results.groupIntoweeks(filter);
    //     assert.equal(groupIntoweeks, 3434);
    // });

    //Should get the Quantity
    it('Should get the item nd qty for week 1', function() {
        var getQty = results.getQty(groupIntoweeks.week1);
        assert.deepEqual(getQty, expectedWeek1);
    });

    it('Should get the item nd qty for week 2', function() {
        var getQty = results.getQty(groupIntoweeks.week2);
        assert.deepEqual(getQty, expectedWeek2);
    });

    it('Should get the item nd qty for week 3', function() {
        var getQty = results.getQty(groupIntoweeks.week3);
        assert.deepEqual(getQty, expectedWeek3);
    });

    it('Should get the item nd qty for week 4', function() {
        var getQty = results.getQty(groupIntoweeks.week4);
        assert.deepEqual(getQty, expectedWeek4);
    });

    //Should use groupByWeeks and groupPurchases to get profit
    it('Should use groupIntoweeks and groupByWeek1 to get profit', function() {
        var getProfit = results.getProfit(expectedWeek1, expectedSales1);
        assert.deepEqual(getProfit, expectedProfit1);
    });

    it('Should use groupIntoweeks and groupByWeek2 to get profit', function() {
        var getProfit = results.getProfit(expectedWeek2, expectedSales2);
        assert.deepEqual(getProfit, expectedProfit2);
    });

    it('Should use groupIntoweeks and groupByWeek3 to get profit', function() {
        var getProfit = results.getProfit(expectedWeek3, expectedSales3);
        assert.deepEqual(getProfit, expectedProfit3);
    });

    it('Should use groupIntoweeks and groupByWeek4 to get profit', function() {
        var getProfit = results.getProfit(expectedWeek4, expectedSales4);
        assert.deepEqual(getProfit, expectedProfit4);
    });

});

describe("Nelisa Narrative: profitable product for each week", function() {

    it('Should get the product that makes the most profit for week one', function() {
        var mostProfitableProduct = profit.mostProfitableProduct(expectedProfit1);
        assert.equal(mostProfitableProduct, "Imasi");
    });

    it('Should get the product that makes the most profit for week two', function() {
        var mostProfitableProduct = profit.mostProfitableProduct(expectedProfit2);
        assert.equal(mostProfitableProduct, "Imasi");
    });

    it('Should get the product that makes the most profit for week three', function() {
        var mostProfitableProduct = profit.mostProfitableProduct(expectedProfit3);
        assert.equal(mostProfitableProduct, "Imasi");
    });

    it('Should get the product that makes the most profit for week four', function() {
        var mostProfitableProduct = profit.mostProfitableProduct(expectedProfit4);
        assert.equal(mostProfitableProduct, "Imasi");
    });

});

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

var bulk1 = {
    Household: 16,
    Fruits: 220,
    Snacks: 390,
    Bakery: 34,
    Diary: 39,
    'Canned food': 30,
    Bevarage: 78,
    'Grain product': 15
}

var bulk2 = {
    Gift: 40,
    Diary: 61,
    Fruits: 28,
    Snacks: 220,
    Bakery: 15,
    'Canned food': 25,
    Bevarage: 42,
    'Grain product': 25,
    Household: 10
}


var bulk3 = {
    'Canned food': 90,
    Bevarage: 213,
    Diary: 145,
    'Grain product': 73,
    Fruits: 262,
    Snacks: 670,
    Household: 30,
    Bakery: 79,
    Gift: 40
}

var bulk4 = {
    'Canned food': 116,
    Bevarage: 264,
    Diary: 207,
    'Grain product': 99,
    Fruits: 432,
    Snacks: 702,
    Household: 44,
    Bakery: 104,
    Gift: 40
}

describe("Nelisa Narrative: grouping purchases data for category", function() {

    //get all the category using the data
    it('Should group the data into category', function() {
        var purchasesCategory = category.groupCategory("./files/category.csv");
        assert.deepEqual(purchasesCategory, groupCategory);
    });

    //get the category and the total product sold in that category for each week.
    it('Should return the get the category and the total product sold in that category for week one.', function() {
        var cat = category.category(groupCategory, expectedWeek1);
        assert.deepEqual(cat, bulk1);
    });

    it('Should return the get the category and the total product sold in that category for week two.', function() {
        var cat = category.category(groupCategory, expectedWeek2);
        assert.deepEqual(cat, bulk2);
    });

    it('Should return the get the category and the total product sold in that category for week three.', function() {
        var cat = category.category(groupCategory, expectedWeek3);
        assert.deepEqual(cat, bulk3);
    });

    it('Should return the get the category and the total product sold in that category for week four.', function() {
        var cat = category.category(groupCategory, expectedWeek4);
        assert.deepEqual(cat, bulk4);
    });
});

describe("Nelisa Narrative: profitable category for each week", function() {

    it('Should get the category that makes the most profit for week one', function() {
        var mostProfitableCategory = profit.mostProfitableCategory(bulk1);
        assert.equal(mostProfitableCategory, "Snacks");
    });

    it('Should get the category that makes the most profit for week two', function() {
        var mostProfitableCategory = profit.mostProfitableCategory(bulk2);
        assert.equal(mostProfitableCategory, "Snacks");
    });

    it('Should get the category that makes the most profit for week three', function() {
        var mostProfitableCategory = profit.mostProfitableCategory(bulk3);
        assert.equal(mostProfitableCategory, "Snacks");
    });

    it('Should get the category that makes the most profit for week four', function() {
        var mostProfitableCategory = profit.mostProfitableCategory(bulk3);
        assert.equal(mostProfitableCategory, "Snacks");
    });

});
