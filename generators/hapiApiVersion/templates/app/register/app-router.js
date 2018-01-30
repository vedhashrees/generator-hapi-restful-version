const Path = require("path");
const {  <%= defaultModule %>Router } = require("../modules/<%= defaultModule %>/<%= defaultModule %>-router");
exports.appRouter = (server) => {
    
    /*** bof::static routes ***/
    server.realm.modifiers.route.prefix = global.config.app.basePrefix + "/" + global.config.app.apiVersion;
    server.route([
        { 
            method: "GET",
            path: "/healthy", 
            config: {
                handler: (request, response) => { 
                    response({ "status": "good" });
                }
            }
        },
        {
            method: 'GET',
            path: '/docs/{param*}',
            handler: {
                directory: {
                    path: Path.join(__dirname, "../../docs"),
                    redirectToSlash: true,
                    index: true,
                }
            }
        }
    ]);

    /*** bof::dynamic routes ***/
    <%= defaultModule %>Router(server);
};
