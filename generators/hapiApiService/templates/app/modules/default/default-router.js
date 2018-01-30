exports.<%= defaultModule %>Router = (server) => { 
    const { <%= defaultModule %>Controller } = require("./<%= defaultModule %>-controller");
    const { <%= defaultModule %>Validator } = require("./<%= defaultModule %>-validator");
    // Prefix grouping specific route
    server.realm.modifiers.route.prefix = global.config.app.basePrefix + "/" + global.config.app.apiVersion + "/<%= defaultModule %>";
    server.route([
        { 
            method: "GET",
            path: "/", 
            config: {
                handler: <%= defaultModule %>Controller.test
            }
        }
    ]);
};
