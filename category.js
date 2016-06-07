//the most popular category sold each week.
exports.mostCategory = function(categoryMap) {
    var product = 0;
    var mostCategory = "";

    for (var category in categoryMap) {
        if (categoryMap[category] > product) {
            product = categoryMap[category];
            mostCategory = category;
        }
    }
    return mostCategory;
};

//the least popular category sold each week.
exports.leastCategory = function(categoryMap) {
    var product = Infinity;
    var leastCategory = "";

    for (var category in categoryMap) {
        if (categoryMap[category] < product) {
            product = categoryMap[category];
            leastCategory = category;
        }
    }
    return leastCategory;
};
