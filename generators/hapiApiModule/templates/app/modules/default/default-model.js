const { <%= defaultModule %>Query } = require("./<%= defaultModule %>-query");
exports.<%= defaultModule %>Model = {
    testModel() {       
        return <%= defaultModule %>Query.testQuery();
    }
};
