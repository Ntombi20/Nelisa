var assert = require("assert");
var results = require("../groupPurchases");
var profit = require('../profit');

var expectedGroup1 = {
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

var expectedGroup2 = {
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

var expectedGroup3 = {
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

var expectedGroup4 = {
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

var expectedProfit = { 'Milk 1l': 320,
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


var filter = results.filterRecords("./files/purchases.csv");

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



describe("Nelisa Narrative: grouping purchases data", function() {
    //weeks: group by total cost(sales price * no sold) and stock item
    it('Should group week1 data by total cost(sales price * no sold) and stock item', function() {
        var groupByWeek1 = results.groupByWeeks("./files/week1.csv");
        assert.deepEqual(groupByWeek1, expectedGroup1);
    });

    it('Should group week2 data by total cost(sales price * no sold) and stock item', function() {
        var groupByWeek2 = results.groupByWeeks("./files/week2.csv");
        assert.deepEqual(groupByWeek2, expectedGroup2);
    });

    it('Should group week3 data by total cost(sales price * no sold) and stock item', function() {
        var groupByWeek3 = results.groupByWeeks("./files/week3.csv");
        assert.deepEqual(groupByWeek3, expectedGroup3);
    });

    it('Should group week4 data by total cost(sales price * no sold) and stock item', function() {
        var groupByWeek4 = results.groupByWeeks("./files/week4.csv");
        assert.deepEqual(groupByWeek4, expectedGroup4);
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
      var getProfit = results.getProfit(expectedWeek1, expectedGroup1);
      assert.deepEqual(getProfit, expectedProfit);
    });

});

describe("Nelisa Narrative: profitable product for each week", function(){

    it('Should get the product that makes the most profit for week one', function(){
      var mostProfitableProduct = profit.mostProfitableProduct(expectedProfit);
      assert.equal(mostProfitableProduct, "Iwisa Pap 5kg");
    });

    it('Should get the product that makes the least profit for week one', function(){
      var leastProfitableProduct = profit.leastProfitableProduct(expectedProfit);
      assert.equal(leastProfitableProduct, "Mixed Sweets 5s");
    });
});

describe("Nelisa Narrative: profitable category for each week", function(){

    it('Should get the category that makes the most profit for week one', function(){
      var mostProfitableCategory = profit.mostProfitableCategory();
      assert.equal(mostProfitableCategory, "Iwisa Pap 5kg");
    });

    it('Should get the category that makes the least profit for week one', function(){
      var leastProfitableCategory = profit.leastProfitableCategory();
      assert.equal(leastProfitableCategory, "Mixed Sweets 5s");
    });
});
