const Path = require("path");
const config = require("konfig")({
    path: Path.join(__dirname, "../config")
}).app;
const baseName = Path.basename(__dirname);
const Generator = require('yeoman-generator');
const { prompt } = require('inquirer');
const Mkdirp = require("mkdirp");
const chalk = require('chalk');

module.exports = class extends Generator {
    constructor(args, opts) {
        super(args, opts);
    }
    askFor() {
        return this.prompt(config.q[baseName]).then((answers) => {
            if (answers.apiPort === "0000") {
                answers.apiPort = Math.floor(Math.random() * 10000 + 1);
            }
            Object.assign(this, answers);
        });
    }
    createProjectWithVersionDir() {
        this.destinationRoot();        
    }
    createAppDefaultModuleAndCopyAll() {
        if (this.fs.exists(this.destinationPath(this.defaultModule + "/" + this.defaultModule + `-router.js`))) {
            console.log(chalk.red(`Already api ${chalk.cyan(this.defaultModule)} module has found in file system.`));
            process.exit(1);
        }
        const filesName = ["router", "validator", "controller", "model", "query"];
        for (let file in filesName) {
            this.fs.copyTpl(
                this.templatePath(`app/modules/default/default-${filesName[file]}.js`),
                this.destinationPath(this.defaultModule +"/"+ this.defaultModule + `-${filesName[file]}.js`),
                {   
                    defaultModule: this.defaultModule
                }
            );
        }
    }
}
