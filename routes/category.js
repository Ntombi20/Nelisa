//Should group the data into categorys
exports.groupCategory = function(category, productMap) {

    var fs = require('fs');
    var categoryMap = {};
    var readFile = fs.readFileSync(category, "utf8");
    var group = readFile.split('\n').slice(1).filter(Boolean);

    group.forEach(function(groupCategory) {
        var item = groupCategory.split(",");
        var categoryName = item[0];
        var categoryItem = item[1];

        if (categoryMap[categoryItem] === undefined) {
            categoryMap[categoryItem] = "";
        }
        categoryMap[categoryItem] = categoryMap[categoryItem] + categoryName;
    })

    var categoryGrouped = {};

    for (var product in productMap) {
        if (categoryGrouped[categoryMap[product]] === undefined) {
            categoryGrouped[categoryMap[product]] = 0;
        }
        categoryGrouped[categoryMap[product]] = categoryGrouped[categoryMap[product]] + productMap[product];
    }
    return categoryGrouped;
};
//the most popular category sold each week.
exports.mostCategory = function(categoryMap) {
    var qty = 0;
    var mostCategory = "";

    for (var category in categoryMap) {
        if (categoryMap[category] > qty) {
            qty = categoryMap[category];
            mostCategory = {
                item: category,
                qty: categoryMap[category]
            };
        }
    }
    return mostCategory;
};

//the least popular category sold each week.
exports.leastCategory = function(categoryMap) {
    var qty = Infinity;
    var leastCategory = "";

    for (var category in categoryMap) {
        if (categoryMap[category] < qty) {
            qty = categoryMap[category];
            leastCategory = {
                item: category,
                qty: categoryMap[category]
            };
        }
    }
    return leastCategory;
};
