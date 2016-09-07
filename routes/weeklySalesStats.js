exports.weeklySalesStats = function(week) {

  var mostLeastProduct = require('./most&least_products');
  var category = require('./most&least_category');
  var profit = require('./profitable_product&category');

    var groupWeek = mostLeastProduct.groupProduct(week);
    var mostProduct = mostLeastProduct.mostProduct(groupWeek);
    var leastProduct = mostLeastProduct.leastProduct(groupWeek);
    var weekCategory = category.groupCategory("./files/category.csv", groupWeek);
    var popularSalesProduct = category.mostCategory(weekCategory);
    var unpopularSalesCategory = category.leastCategory(weekCategory);
    var weekdate = new Date("7-Feb");
    var weekdate = new Date("14-Feb");
    var weekdate = new Date("21-Feb");
    var weekdate = new Date("28-Feb");
    var weekTotalCost = profit.salesByWeeks(week);
    var groupPurchases = profit.groupIntoweeks('./files/purchases.csv', weekdate).week
    var getProfitWeek = profit.getProfit(groupPurchases, weekTotalCost);
    var profitableProduct = profit.mostProfitableProduct(getProfitWeek);
    var profitCategory = category.groupCategory("./files/category.csv", getProfitWeek);
    var profitableCategory = profit.mostProfitableCategory(profitCategory)

    var sales = {
        mostProduct: mostProduct,
        leastProduct: leastProduct,
        popularSalesProduct: popularSalesProduct,
        unpopularSalesCategory: unpopularSalesCategory,
        profitableProduct: profitableProduct,
        profitableCategory: profitableCategory
    }

    return sales;
}

// var week1 = weeklySalesStats('./files/week1.csv');
// var week2 = weeklySalesStats('./files/week2.csv');
// var week3 = weeklySalesStats('./files/week3.csv');
// var week4 = weeklySalesStats('./files/week4.csv');
