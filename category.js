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
