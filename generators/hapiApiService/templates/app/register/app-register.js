const Hoek = require("hoek");
const { appRouter } = require("./app-router");
exports.appRegister = (server) => {
    this.internalPlugin(server);
    this.externalPlugin(server);
    this.appLifeCycleEvents(server);
    appRouter(server);
};

exports.internalPlugin = (server) => { 
    server.register([
        
    ], (err) => {
        Hoek.assert(!err, err);
    });
};

exports.externalPlugin = (server) => {
    const Inert = require("inert");
    server.register([
        Inert
    ], (err) => {
        Hoek.assert(!err, err);
    });
};


exports.appLifeCycleEvents = (server) => { 
    server.ext("onRequest", (request, reply) => {
        return reply.continue();
    });
    server.ext("onPreAuth", (request, reply) => {

        return reply.continue();
    });
    server.ext("onPostAuth", (request, reply) => {
        return reply.continue();
    });

    server.ext("onPreHandler", (request, reply) => {
        return reply.continue();
    });

    server.ext("onPostHandler", (request, reply) => {
        return reply.continue();
    });

    server.ext("onPreResponse", (request, reply) => {
        return reply.continue();
    });
};

