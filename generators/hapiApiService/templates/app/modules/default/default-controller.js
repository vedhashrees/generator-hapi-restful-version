const { <%= defaultModule %>Model } = require("./<%= defaultModule %>-model");
class <%= defaultModule %>Controller {
    constructor() {
        
    }
    test(request, response) { 
        response("Hello Home Controller v1.0" + <%= defaultModule %>Model.testModel());
    }
}
exports.<%= defaultModule %>Controller = new <%= defaultModule %>Controller();
