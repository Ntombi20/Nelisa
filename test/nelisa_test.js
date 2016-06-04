var assert = require("assert");
var results = require("../filterGroup");
var mostLeastProduct = require('../mostLeastProduct');
var category = require('../category');

var expectedWeek1 = { 'Milk 1l': 39,
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
                      'Mixed Sweets 5s': 49 }

var expectedWeek2 = { Imasi: 36,
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
                      'Valentine Cards': 14 }

var expectedWeek3 = { Imasi: 25,
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
                      'Milk 1l': 28 }

var expectedWeek4 = { Imasi: 34,
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
                      'Milk 1l': 43 }

var week1Results = results.readRecords("./files/week1.csv");
var week2Results = results.readRecords("./files/week2.csv");
var week4Results = results.readRecords("./files/week4.csv");
var week3Results = results.readRecords("./files/week3.csv");

var expectedCategory = { Diary: ', Milk 1l, Imasi',
                        'Grain product': ', Bread, Iwisa Pap 5kg, Top Class Soy Mince',
                        'Canned food': ', Chakalaka Can, Gold Dish Vegetable Curry Can',
                        Bevarage: ', Fanta 500ml, Coka 500ml, Cream Soda 500ml',
                        Household: ', Shampoo 1 litre, Soap Bar',
                        Fruits: ', Bananas - loose, Apples - loose',
                        Snacks: ', Mixed Sweets 5s, Heart chocalate',
                        Gift: ', Rose (plastic), Valentine card' }


describe("Nelisa Narrative", function(){

    //filter data
    it('Should read the records for week one and filter the records by Day, Date, Stock item, Number sold, Sales price but return the length of the records', function(){

        assert.equal(105, week1Results);
    });

    it('Should read the records for week two and filter the records by Day, Date, Stock item, Number sold, Sales price but return the length of the records', function(){

        assert.equal(117, week2Results);
    });

    it('Should read the records for week three and filter the records by Day, Date, Stock item, Number sold, Sales price but return the length of the records', function(){

        assert.equal(104, week3Results);
    });

    it('Should read the records for week four and filter the records by Day, Date, Stock item, Number sold, Sales price but return the length of the records', function(){

        assert.equal(119, week4Results);
    });

    //group data
    it('Should return stock data group for week one', function(){

        var week1Results = results.groupRecords("./files/week1.csv");
          assert.deepEqual(expectedWeek1, week1Results);
      });

      it('Should return stock data group for week two', function(){

        var week2Results = results.groupRecords("./files/week2.csv");
          assert.deepEqual(expectedWeek2, week2Results);
      });

      it('Should return stock data group for week three', function(){

        var week3Results = results.groupRecords("./files/week3.csv");
          assert.deepEqual(expectedWeek3, week3Results);
      });

      it('Should return stock data group for week four', function(){

        var week4Results = results.groupRecords("./files/week4.csv");
          assert.deepEqual(expectedWeek4, week4Results);
      });

    //most popular product for each week
    it('Should return the most popular product sold for week one', function(){

      var mostProduct1 = mostLeastProduct.mostProduct(expectedWeek1);
        assert.equal(mostProduct1, "Coke 500ml");
    });

    it('Should return the most popular product sold for week two', function(){

      var mostProduct2 = mostLeastProduct.mostProduct(expectedWeek2);
        assert.equal(mostProduct2, "Mixed Sweets 5s");
    });

    it('Should return the most popular product sold for week three', function(){

      var mostProduct3 = mostLeastProduct.mostProduct(expectedWeek3);
        assert.equal(mostProduct3, "Mixed Sweets 5s");
    });

    it('Should return the most popular product sold for week four', function(){

      var mostProduct4 = mostLeastProduct.mostProduct(expectedWeek4);
        assert.equal(mostProduct4, "Coke 500ml");
    });

    // least popular product for each week
    it('Should return the least popular product sold for week one', function(){

      var leastProduct1 = mostLeastProduct.leastProduct(expectedWeek1);
        assert.equal(leastProduct1, "Shampoo 1 litre");
    });

    it('Should return the least popular product sold for week two', function(){

      var leastProduct1 = mostLeastProduct.leastProduct(expectedWeek1);
        assert.equal(leastProduct1, "Shampoo 1 litre");
    });

    it('Should return the least popular product sold for week three', function(){

      var leastProduct1 = mostLeastProduct.leastProduct(expectedWeek1);
        assert.equal(leastProduct1, "Shampoo 1 litre");
    });

    it('Should return the least popular product sold for week four', function(){

      var leastProduct1 = mostLeastProduct.leastProduct(expectedWeek1);
        assert.equal(leastProduct1, "Shampoo 1 litre");
    });

    //get all the category using the data
    it('Should group the data into category', function(){

      var allCategory1 = results.groupCategory("./files/category.csv");
        assert.deepEqual(allCategory1, expectedCategory);
    });

    // it('Should group the data into category for week two', function(){
    //
    //   var allCategory2 = results.groupCategory(week2Results);
    //     assert.deepEqual(allCategory2, 0);
    // });
    //
    // it('Should group the data into category for week three', function(){
    //
    //   var allCategory3 = results.groupCategory(week3Results);
    //     assert.deepEqual(allCategory3, 0);
    // });
    //
    // it('Should group the data into category for week one', function(){
    //
    //   var allCategory4 = results.groupCategory(week4Results);
    //     assert.deepEqual(allCategory4, 0);
    // });
});
