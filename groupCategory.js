//Should group the data into categorys
exports.groupCategory = function(categoryMap, productMap) {

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

    var category = {};

    for (var product in productMap) {
        if (category[categoryMap[product]] === undefined) {
            category[categoryMap[product]] = 0;
        }
        category[categoryMap[product]] = category[categoryMap[product]] + productMap[product];
    }
    return category;
};
