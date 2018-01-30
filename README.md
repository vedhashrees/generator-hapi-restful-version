# generator-sispcloud
>This is a *yeoman generator* utility module to generate a sample hapi api service project.

#### Note: This is tailored for our project requirements.

## Installation 
  Install the following two packages globally as below.
```sh
 $ npm install yeoman -g
 $ npm install retire -g
 $ npm install gulp -g
 $ npm install generator-sispcloud -g
```

## Usage:
1) To generate the skeleton of a Hapi REST API service node project , use the following command

```sh
  $ yo sispcloud:hapiApiService
```

![step1](https://user-images.githubusercontent.com/29759244/35551559-b042ce12-05b5-11e8-85ff-eab07e06bb85.PNG)


2) To generate a Hapi REST API service with a new version , use the following command

```sh
  $ yo sispcloud:hapiApiVersion
```

![step2](https://user-images.githubusercontent.com/29759244/35551574-c16dfefa-05b5-11e8-9a67-3fe5d3b15c40.PNG)

3) To generate a Hapi REST API service with a new module , use the following command

```sh
  $ yo sispcloud:hapiApiModule
```

![step3](https://user-images.githubusercontent.com/29759244/35551593-d0cf232e-05b5-11e8-961f-b5cd495c513d.PNG)


4) After the successful creation of new module `eg. auth` ,
goto `app-router.js` file in the folder path  `app/register` and add the following line as below as highlighted in red in the screenshot.

```javascript 
const {authRouter} = require(",,/modules/auth/auth-router");
```

Inside appRouter function add the following line.
```javascript
appRouter(server);
```

![step4](https://user-images.githubusercontent.com/29759244/35551897-5e8a3194-05b7-11e8-88e3-811dbbbf18e1.PNG)

####Note: any project related config values can be initialized in `config\app.json`
To get the configuration values in the project , use as below 
`eg . global.config.app.apiPort`

if the new config file is added in the name of user.json into config directory as `config\user.json`, then use as below  `eg . global.config.user.name`





