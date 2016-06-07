var assert = require("assert");
var results = require("../filterGroup");
var mostLeastProduct = require('../mostLeastProduct');
var category = require('../category');

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


describe("Nelisa Narrative", function() {

    //filter dataconsole.log(school[category]);
    it('Should read the records for week one and filter the records by Day, Date, Stock item, Number sold, Sales price but return the length of the records', function() {
        var week1Results = results.readRecords("./files/week1.csv");
        assert.equal(105, week1Results);
    });

    it('Should read the records for week two and filter the records by Day, Date, Stock item, Number sold, Sales price but return the length of the records', function() {
        var week2Results = results.readRecords("./files/week2.csv");
        assert.equal(117, week2Results);
    });

    it('Should read the records for week three and filter the records by Day, Date, Stock item, Number sold, Sales price but return the length of the records', function() {
        var week3Results = results.readRecords("./files/week3.csv");
        assert.equal(104, week3Results);
    });

    it('Should read the records for week four and filter the records by Day, Date, Stock item, Number sold, Sales price but return the length of the records', function() {
        var week4Results = results.readRecords("./files/week4.csv");
        assert.equal(119, week4Results);
    });

    //group data
    it('Should return stock data group for week one', function() {
        var week1Results = results.groupRecords("./files/week1.csv");
        assert.deepEqual(expectedWeek1, week1Results);
    });

    it('Should return stock data group for week two', function() {
        var week2Results = results.groupRecords("./files/week2.csv");
        assert.deepEqual(expectedWeek2, week2Results);
    });

    it('Should return stock data group for week three', function() {
        var week3Results = results.groupRecords("./files/week3.csv");
        assert.deepEqual(expectedWeek3, week3Results);
    });

    it('Should return stock data group for week four', function() {
        var week4Results = results.groupRecords("./files/week4.csv");
        assert.deepEqual(expectedWeek4, week4Results);
    });

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


    //the most popular category sold each week
    it('Should return the most category product sold for week one', function(){
      var mostCategory1 = category.mostCategory(expectedCategory1);
      assert.equal(mostCategory1, "Bevarage");
    });

    it('Should return the most category product sold for week two', function(){
      var mostCategory2 = category.mostCategory(expectedCategory2);
      assert.equal(mostCategory2, "Bevarage");
    });

    it('Should return the most category product sold for week three', function(){
      var mostCategory3 = category.mostCategory(expectedCategory3);
      assert.equal(mostCategory3, "Diary");
    });

    it('Should return the most category product sold for week four', function(){
      var mostCategory4 = category.mostCategory(expectedCategory4);
      assert.equal(mostCategory4, "Bevarage");
    });

    //the least popular category sold each week
    it('Should return the least category product sold for week one', function(){
      var mostCategory1 = category.leastCategory(expectedCategory1);
      assert.equal(mostCategory1, "Household");
    });

    it('Should return the least category product sold for week two', function(){
      var leastCategory2 = category.leastCategory(expectedCategory2);
      assert.equal(leastCategory2, "Household");
    });

    it('Should return the least category product sold for week three', function(){
      var leastCategory3 = category.leastCategory(expectedCategory3);
      assert.equal(leastCategory3, "Household");
    });

    it('Should return the least category product sold for week four', function(){
      var leastCategory4 = category.leastCategory(expectedCategory4);
      assert.equal(leastCategory4, "Bakery");
    });

});
