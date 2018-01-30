if (!global.config) {
    const { join } = require("path");
    global.config = require("konfig")({
        path: join(__dirname, "config")
    });
}
const Hapi = require('hapi');
const server = new Hapi.Server();
server.connection({
    port: global.config.app["apiPort"] ? global.config.app["apiPort"] : "0000"
}); // tell hapi which TCP Port to "listen" on
const { appRegister } = require("./app/register/app-register");
server.start((err) => {
    if (err) {
        console.error(err.message);
        process.exit(1);
    }
    appRegister(server);
    console.info(`SDK-${global.config.app["apiVersion"]} Visit: http://localhost:` + server.info.port + global.config.app.basePrefix + "/" + global.config.app.apiVersion + "/healthy");
});

