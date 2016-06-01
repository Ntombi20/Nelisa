var assert = require("assert");
var results = require("../products");

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



describe("Filter and group data", function(){
    //filter data
    it('Should read the records for week one and filter the records by Day, Date, Stock item, Number sold, Sales price but return the length of the records', function(){

      var week1Results = results.readRecords("./files/week1.csv");
        assert.equal(105, week1Results);
    });

    it('Should read the records for week two and filter the records by Day, Date, Stock item, Number sold, Sales price but return the length of the records', function(){

      var week2Results = results.readRecords("./files/week2.csv");
        assert.equal(117, week2Results);
    });

    it('Should read the records for week three and filter the records by Day, Date, Stock item, Number sold, Sales price but return the length of the records', function(){

      var week3Results = results.readRecords("./files/week3.csv");
        assert.equal(104, week3Results);
    });

    it('Should read the records for week four and filter the records by Day, Date, Stock item, Number sold, Sales price but return the length of the records', function(){

      var week4Results = results.readRecords("./files/week4.csv");
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


});
