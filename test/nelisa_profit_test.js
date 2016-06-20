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

var expectedProfit =
  { 'Milk 1l': 380,
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
    'Mixed Sweets 5s': -270 }


var filter = results.filterRecords("./files/purchases.csv");

var expectedWeek1 = { 'Shampoo 1 litre': 3,
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
  'Top Class Soy Mince': 10 }

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

var bulk1 ={ Household: 16,
  Fruits: 220,
  Snacks: 390,
  Bakery: 34,
  Diary: 39,
  'Canned food': 30,
  Bevarage: 78,
  'Grain product': 15 }

describe("Nelisa Narrative: grouping purchases data", function() {
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
    it('Should filter the data for purchases and return the length', function(){
      var filter = results.filterRecords("./files/purchases.csv").length;
      assert.equal(filter, 153);
    });

    //Should group the data for purchases into weeks
    it('Should group the data for purchases week 1', function(){
      var groupIntoweeks = results.groupIntoweeks(filter);
      assert.deepEqual(groupIntoweeks, expectedWeek1);
    });

    // //Should use groupByWeeks and groupPurchases to get profit
    it('Should use groupIntoweeks and groupByWeek1 to get profit', function(){
      var getProfit = results.getProfit(expectedWeek1, expectedSales1);
      assert.deepEqual(getProfit, expectedProfit);
    });

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
});

describe("Nelisa Narrative: profitable product for each week", function(){

    it('Should get the product that makes the most profit for week one', function(){
      var mostProfitableProduct = profit.mostProfitableProduct(expectedProfit);
      assert.equal(mostProfitableProduct, "Imasi");
    });

});

describe("Nelisa Narrative: profitable category for each week", function(){

    it('Should get the category that makes the most profit for week one', function(){
      var mostProfitableCategory = profit.mostProfitableCategory(bulk1);
      assert.equal(mostProfitableCategory, "Snacks");
    });

});
