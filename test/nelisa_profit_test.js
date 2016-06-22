var assert = require("assert");
var results = require("../groupPurchases");
var profit = require('../profit');
var category = require('../groupCategory');

var filter = results.filterRecords("./files/purchases.csv");
var groupIntoweeks = results.groupIntoweeks(filter);

describe("Nelisa Narrative: grouping purchases data for products", function() {
  //weeks: group by total cost(sales price * no sold) and stock item
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

    it('Should group week1 data by total cost(sales price * no sold) and stock item', function() {
        var groupByWeek1 = results.salesByWeeks("./files/week1.csv");
        assert.deepEqual(groupByWeek1, expectedSales1);
    });

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

    it('Should group week2 data by total cost(sales price * no sold) and stock item', function() {
        var groupByWeek2 = results.salesByWeeks("./files/week2.csv");
        assert.deepEqual(groupByWeek2, expectedSales2);
    });

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

    it('Should group week3 data by total cost(sales price * no sold) and stock item', function() {
        var groupByWeek3 = results.salesByWeeks("./files/week3.csv");
        assert.deepEqual(groupByWeek3, expectedSales3);
    });

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

    it('Should group week4 data by total cost(sales price * no sold) and stock item', function() {
        var groupByWeek4 = results.salesByWeeks("./files/week4.csv");
        assert.deepEqual(groupByWeek4, expectedSales4);
    });

    //filter data purchases
    it('Should filter the data for purchases and return the length', function() {
        var filter = results.filterRecords("./files/purchases.csv").length;
        assert.equal(filter, 153);
    });

    //Should group the data for purchases into weeks for week one
    it('Should group the data for purchases into week one', function() {
        var week1date = new Date("7-Feb");
        var groupIntoweeks = results.groupIntoweeks(filter, week1date).length;
        assert.equal(groupIntoweeks.week1, 3434);
    });

    it('Should group the data for purchases into week two', function() {
        var week2date = new Date("14-Feb");
        var groupIntoweeks = results.groupIntoweeks(filter, week2date).length;
        assert.equal(groupIntoweeks.week2, 3434);
    });

    it('Should group the data for purchases into week three', function() {
        var week3date = new Date("21-Feb");
        var groupIntoweeks = results.groupIntoweeks(filter, week3date).length;
        assert.equal(groupIntoweeks.week3, 3434);
    });

    it('Should group the data for purchases into week four', function() {
        var week4date = new Date("1-Mar");
        var groupIntoweeks = results.groupIntoweeks(filter, week4date).length;
        assert.equal(groupIntoweeks.week4, 3434);
    });

    //Should get the purchase cost
    var expectedWeek1 = { 'Shampoo 1 litre': 60,
    'Soap Bar': 39,
    'Bananas - loose': 20,
    'Apples - loose': 300,
    'Mixed Sweets 5s': 1170,
    Bread: 314,
    Imasi: 521,
    'Chakalaka Can': 105,
    'Coke 500ml': 126,
    'Cream Soda 500ml': 81,
    'Fanta 500ml': 108,
    'Gold Dish Vegetable Curry Can': 75,
    'Iwisa Pap 5kg': 100,
    'Milk 1l': 70,
    'Top Class Soy Mince': 80 }


    it('Should get the item and totaly cost for week 1', function() {
        var getPurchaseCost = results.getPurchaseCost(groupIntoweeks.week1);
        assert.deepEqual(getPurchaseCost, expectedWeek1);
    });

    var expectedWeek2 = {
        'Rose (plastic)': 200,
        'Milk 1l': 232,
        'Bananas - loose': 8,
        'Apples - loose': 30,
        'Mixed Sweets 5s': 600,
        Bread: 135,
        'Chakalaka Can': 105,
        'Coke 500ml': 105,
        'Gold Dish Vegetable Curry Can': 67.5,
        'Heart Chocolates': 500,
        Imasi: 510,
        'Iwisa Pap 5kg': 100,
        'Top Class Soy Mince': 160,
        'Shampoo 1 litre': 100,
        'Valentine Cards': 40,
        'Soap Bar': 15,
        'Fanta 500ml': 54
    }

    it('Should get the item and totaly cost for week 2', function() {
        var getPurchaseCost = results.getPurchaseCost(groupIntoweeks.week2);
        assert.deepEqual(getPurchaseCost, expectedWeek2);
    });

    var expectedWeek3 = {
        'Chakalaka Can': 336,
        'Coke 500ml': 367.5,
        'Cream Soda 500ml': 207,
        'Fanta 500ml': 279,
        'Gold Dish Vegetable Curry Can': 227.5,
        Imasi: 1303,
        'Iwisa Pap 5kg': 560,
        'Milk 1l': 505,
        'Top Class Soy Mince': 360,
        'Bananas - loose': 32,
        'Apples - loose': 345,
        'Mixed Sweets 5s': 1950,
        'Shampoo 1 litre': 180,
        'Soap Bar': 63,
        Bread: 719,
        'Rose (plastic)': 200,
        'Heart Chocolates': 500,
        'Valentine Cards': 40
    }

    it('Should get the item and totaly cost for week 3', function() {
        var getPurchaseCost = results.getPurchaseCost(groupIntoweeks.week3);
        assert.deepEqual(getPurchaseCost, expectedWeek3);
    });

    var expectedWeek4 = {
        'Chakalaka Can': 423,
        'Coke 500ml': 451.5,
        'Cream Soda 500ml': 276,
        'Fanta 500ml': 339.5,
        'Gold Dish Vegetable Curry Can': 311.5,
        Imasi: 1728,
        'Iwisa Pap 5kg': 790,
        'Milk 1l': 781.5,
        'Top Class Soy Mince': 480,
        'Bananas - loose': 52,
        'Apples - loose': 570,
        'Mixed Sweets 5s': 2046,
        'Shampoo 1 litre': 300,
        'Soap Bar': 87,
        Bread: 944,
        'Rose (plastic)': 200,
        'Heart Chocolates': 500,
        'Valentine Cards': 40
    }
    it('Should get the item and totaly cost for week 4', function() {
        var getPurchaseCost = results.getPurchaseCost(groupIntoweeks.week4);
        assert.deepEqual(getPurchaseCost, expectedWeek4);
    });

    //Should use groupByWeeks and groupPurchases to get profit
    it('Should use getPurchaseCost and salesByWeeks to get week 1 profit', function() {
        var getProfit = results.getProfit(expectedWeek1, expectedSales1);
        assert.deepEqual(getProfit, expectedProfit1);
    });

    it('Should use getPurchaseCost and salesByWeeks to get week 2 profit', function() {
        var getProfit = results.getProfit(expectedWeek2, expectedSales2);
        assert.deepEqual(getProfit, expectedProfit2);
    });

    it('Should use getPurchaseCost and salesByWeeks to get week 3 profit', function() {
        var getProfit = results.getProfit(expectedWeek3, expectedSales3);
        assert.deepEqual(getProfit, expectedProfit3);
    });

    it('Should use getPurchaseCost and salesByWeeks to get week 4 profit', function() {
        var getProfit = results.getProfit(expectedWeek4, expectedSales4);
        assert.deepEqual(getProfit, expectedProfit4);
    });
});

var expectedProfit1 = { 'Milk 1l': 320,
  Imasi: 229,
  Bread: 226,
  'Chakalaka Can': 125,
  'Gold Dish Vegetable Curry Can': 78,
  'Fanta 500ml': 106.5,
  'Coke 500ml': 225,
  'Cream Soda 500ml': 84,
  'Iwisa Pap 5kg': 410,
  'Top Class Soy Mince': 184,
  'Shampoo 1 litre': 30,
  'Soap Bar': 33,
  'Bananas - loose': 74,
  'Apples - loose': -228,
  'Mixed Sweets 5s': -1050 }

var expectedProfit2 = { Imasi: 390,
  Bread: 201,
  'Chakalaka Can': 105,
  'Gold Dish Vegetable Curry Can': 175.5,
  'Fanta 500ml': 95.5,
  'Coke 500ml': 168,
  'Cream Soda 500ml': NaN,
  'Iwisa Pap 5kg': 200,
  'Top Class Soy Mince': 92,
  'Shampoo 1 litre': 80,
  'Soap Bar': 15,
  'Bananas - loose': 48,
  'Apples - loose': 12,
  'Mixed Sweets 5s': -453,
  'Milk 1l': 48,
  'Heart Chocolates': 200,
  'Rose (plastic)': 10,
  'Valentine Cards': 16 }


var expectedProfit3 = { Imasi: -678,
  Bread: -431,
  'Chakalaka Can': -166,
  'Gold Dish Vegetable Curry Can': -155.5,
  'Fanta 500ml': -188,
  'Coke 500ml': -250.5,
  'Cream Soda 500ml': -117,
  'Iwisa Pap 5kg': -440,
  'Top Class Soy Mince': -216,
  'Shampoo 1 litre': -60,
  'Soap Bar': -15,
  'Bananas - loose': 2,
  'Apples - loose': -295,
  'Mixed Sweets 5s': -1870,
  'Milk 1l': -225 }


var expectedProfit4 = { Imasi: -878,
  Bread: -548,
  'Chakalaka Can': -93,
  'Gold Dish Vegetable Curry Can': -5.5,
  'Fanta 500ml': -183.5,
  'Coke 500ml': -159,
  'Cream Soda 500ml': -133.5,
  'Iwisa Pap 5kg': -310,
  'Top Class Soy Mince': 36,
  'Shampoo 1 litre': 90,
  'Soap Bar': 63,
  'Bananas - loose': -8,
  'Apples - loose': -506,
  'Mixed Sweets 5s': -1938,
  'Milk 1l': -351.5 }

describe("Nelisa Narrative: profitable product for each week", function() {

    it('Should get the product that makes the most profit for week one', function() {
        var mostProfitableProduct = profit.mostProfitableProduct(expectedProfit1);
        assert.equal(mostProfitableProduct, "Iwisa Pap 5kg");
    });

    it('Should get the product that makes the most profit for week two', function() {
        var mostProfitableProduct = profit.mostProfitableProduct(expectedProfit2);
        assert.equal(mostProfitableProduct, "Imasi");
    });

    it('Should get the product that makes the most profit for week three', function() {
        var mostProfitableProduct = profit.mostProfitableProduct(expectedProfit3);
        assert.equal(mostProfitableProduct, "Bananas - loose");
    });

    it('Should get the product that makes the most profit for week four', function() {
        var mostProfitableProduct = profit.mostProfitableProduct(expectedProfit4);
        assert.equal(mostProfitableProduct, "Shampoo 1 litre");
    });

});

var bulk1 = { Diary: 549,
  Bakery: 226,
  'Canned food': 203,
  Bevarage: 415.5,
  'Grain product': 594,
  Household: 63,
  Fruits: -154,
  Snacks: -1050 }

var bulk2 = { Diary: 438,
  Bakery: 201,
  'Canned food': 280.5,
  Bevarage: NaN,
  'Grain product': 292,
  Household: 95,
  Fruits: 60,
  Snacks: -253,
  Gift: 26 }

var bulk3 = { Diary: -903,
  Bakery: -431,
  'Canned food': -321.5,
  Bevarage: -555.5,
  'Grain product': -656,
  Household: -75,
  Fruits: -293,
  Snacks: -1870 }

var bulk4 = { Diary: -1229.5,
  Bakery: -548,
  'Canned food': -98.5,
  Bevarage: -476,
  'Grain product': -274,
  Household: 153,
  Fruits: -514,
  Snacks: -1938 }

describe("Nelisa Narrative: grouping purchases data for category", function() {

    //get all the category using the data
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

    it('Should group the data into category', function() {
        var purchasesCategory = category.groupCategory("./files/category.csv");
        assert.deepEqual(purchasesCategory, groupCategory);
    });

    //get the category and the total product sold in that category for each week.
    it('Should return the get the category and the total product sold in that category for week one.', function() {
        var cat = category.category(groupCategory, expectedProfit1);
        assert.deepEqual(cat, bulk1);
    });

    it('Should return the get the category and the total product sold in that category for week two.', function() {
        var cat = category.category(groupCategory, expectedProfit2);
        assert.deepEqual(cat, bulk2);
    });

    it('Should return the get the category and the total product sold in that category for week three.', function() {
        var cat = category.category(groupCategory, expectedProfit3);
        assert.deepEqual(cat, bulk3);
    });

    it('Should return the get the category and the total product sold in that category for week four.', function() {
        var cat = category.category(groupCategory, expectedProfit4);
        assert.deepEqual(cat, bulk4);
    });
});

describe("Nelisa Narrative: profitable category for each week", function() {

    it('Should get the category that makes the most profit for week one', function() {
        var mostProfitableCategory = profit.mostProfitableCategory(bulk1);
        assert.equal(mostProfitableCategory, "Grain product");
    });

    it('Should get the category that makes the most profit for week two', function() {
        var mostProfitableCategory = profit.mostProfitableCategory(bulk2);
        assert.equal(mostProfitableCategory, "Diary");
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
