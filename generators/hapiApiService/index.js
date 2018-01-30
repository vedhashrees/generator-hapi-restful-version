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
        this.destinationRoot(Path.join(this.appName, "v" + this.apiVersion));
        if (this.fs.exists(this.destinationPath("server.js"))) {
            console.log(chalk.red(`Already project ${chalk.cyan(this.appName)} has found in file system`));
            process.exit(1);
        }
    }
    copyProjectIndexes() {      
        this.fs.copyTpl(
            this.templatePath("_package.json"),
            this.destinationPath('package.json'),
            {
                appName: this.appName,
                appVersion: this.apiVersion
            }
        );
        this.fs.copyTpl(
            this.templatePath("_npm-shrinkwrap.json"),
            this.destinationPath('npm-shrinkwrap.json'),
            {
                appName: this.appName
            }
        );
        this.fs.copy(
            this.templatePath("_README.md"),
            this.destinationPath('README.md')
        );
        this.fs.copyTpl(
            this.templatePath("_server.js"),
            this.destinationPath('server.js'),
            {
                apiPort: this.apiPort,
                apiVersion: this.apiVersion
            }
        );
        this.fs.copy(
            this.templatePath('gulpfile.js'),
            this.destinationPath('gulpfile.js')
        );
        this.fs.copy(
            this.templatePath('.retireignore.json'),
            this.destinationPath('.retireignore.json')
        );
        this.fs.copy(
            this.templatePath('.editorconfig'),
            this.destinationPath('.editorconfig')
        );
        this.fs.copy(
            this.templatePath('LICENSE'),
            this.destinationPath('LICENSE')
        );
    }
    copyDocsDir() {
        this.fs.copy(
            this.templatePath('docs'),
            this.destinationPath('docs')
          );
    }
    createAppConfDirAndCopyAll() {
        this.fs.copyTpl(
            this.templatePath("config/app.json"),
            this.destinationPath('config/app.json'),
            {                
                apiPort: this.apiPort,
                basePrefix: this.basePrefix,
                apiVersion: this.apiVersion
            }
        );
    }
    createAppDefaultModuleAndCopyAll() {
        const filesName = ["router", "validator", "controller", "model", "query"];
        for (let file in filesName) {
            this.fs.copyTpl(
                this.templatePath(`app/modules/default/default-${filesName[file]}.js`),
                this.destinationPath("app/modules/"+ this.defaultModule +"/"+ this.defaultModule + `-${filesName[file]}.js`),
                {   
                    defaultModule: this.defaultModule
                }
            );
        }
    }
    createAppRegisterDirAndCopyAll() {
        this.fs.copy(
            this.templatePath("app/register/app-register.js"),
            this.destinationPath('app/register/app-register.js')
        );
        this.fs.copyTpl(
            this.templatePath("app/register/app-router.js"),
            this.destinationPath('app/register/app-router.js'),
            {   
                defaultModule: this.defaultModule
            }
        );
        this.installDependencies();
    }
}
