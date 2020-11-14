const ServicesModel = require("./core/models/services")
const express = require("express");
const fs = require("fs");
const path = require("path");

/** 
*
* @Class         composer 
* @classdes      Bind the complete entities in one package accessible throughout the application
* @global        Services - Object to access addons entities
* @global        Core     - Object to access core entities of the application - Group, handler, notifications, Roles and others
* @global        Module   - Obeject to access helper modules
**/
class Composer {

    constructor(config) {

        // Main modules types 
        this.Addons = {};
        this.core = {};
        global.modules = {};
        this.helpers = {};
        this.app = express();
        
        // Entities within the the module
        this.middlewares = {};
        this.models = {};
        this.validators = {};
        this.controllers = {};
        this.routes = [];
        this.modules = {};

        // File locations 

        this.serviceFile = "service.json";

    }


   async loadServices() {
        try {
            const services = await ServicesModel.find({}, {name: 1, type: 1});

            services.forEach(service => {
                console.log('\x1b[34m%s\x1b[0m', `[Adding service]`, service.name);
                const serviceDir = path.join(path.join(__dirname, "../services"), service.name);
                const configFile = path.join(serviceDir, this.serviceFile);
                const config = JSON.parse(fs.readFileSync(configFile));
                if ( typeof config != "object" ) { 
                    console.log(`Error: [${service}] service file not found`)
                    process.exit(0); 
                }

                this.models[service.name] = config.models || [];
                this.validators[service.name] = config.validators || [];
                this.middlewares[service.name] = config.middlewares || [];
                this.controllers[service.name] = config.controllers || [];

                // Load the routers
                this.routes.push(
                    {
                        name: service.name,
                        endpoint: config.endpoint,
                        router: path.join(serviceDir, "route.js")
                    }
                )
            });

        } catch (err) {
           console.error(err);
           process.exit(1);
        }
    }

  
    async deploy() {

       // await this.addServices("core"); // Load the core
        await this.addServices("services"); // Load the services        
        // Load the server
        await this.server();
    }

    // Load a service
    async addServices(serviceType) {
        await this.loadModels(serviceType);
        await this.loadMiddlewares(serviceType);
        await this.loadValidator(serviceType);
        await this.loadControllers(serviceType);
        await this.loadRoutes(serviceType)
    }

    async manualLoader(directory) {
       const dir = await fs.readdirSync(directory);
       dir.forEach(subdir => {
           const current = path.join(directory, subdir);
          
           if ( fs.lstatSync(current).isDirectory() ) {
                this.manualLoader(current);
           } 

           if ( fs.lstatSync(current).isFile() && path.extname(current) == ".js" ) {
                console.log('\x1b[35m%s\x1b[0m', `[File added]`, path.basename(current));
               require(current);
           }

       })
    }

    // Load  the models
    loadModels(type) {
        this.importer(type, "models");
    }

    // Load the routers
     loadRoutes(service) {

        console.log("---------------------------");
        console.log("Router Loading started");

        this.routes.forEach(async (route) => {
            const router = `/api/${service}/${route.endpoint}`;
            console.log("Loading router");
            this.app.use(router, require(route.router))
        })
    }

    // Load Middlewares
    loadMiddlewares(type) {
        this.importer(type, "middlewares");
    }
    

    // Run the server
    server() {

        const PORT = process.env.PORT || 5000;
        this.app.listen(PORT, (err) => {
            console.log(`Server is now running at PORT ${PORT}`)
        });

    }

     // Load Controllers
     loadControllers(type) {
        this.importer(type, "controllers");
    }

    // Load validators
    loadValidator(type) {
        this.importer(type, "validators")
    }

    /**
     * 
     * @Desc       Locate the file based on the parameters
     * @params     type - Type of the service - Core, Services, Modules
     * @params     service - Name of the sub service 
     * @params     fileType - The ref fileType - models, 
     * @file       Core - src/core
     * @file       services - src/services/{service}
     * @file        module - src/modules/module 
     * 
     **/
    locator(service, importType, serviceType, file) {

    
        return path.join(__dirname, "../", service, serviceType, importType, file)
    

    }



    // Method to load any service
    /**
     * 
     * @Param  service    - The name of the service we want load - Core, Services, modules 
     * @Param  importType - The type of the file we want to load - Middlware, Model, validator and others
     * 
     **/
    importer(service, importType) {

        console.log("----------------------------")
        console.log(importType, `Loader started`)
        try {

            if ( typeof this[importType] == "object" ) {
                
                // Loop through all the files in the importer
                Object.keys(this[importType]).forEach(serviceType => {
                    
                    const imports = this[importType][serviceType];

                    if ( typeof imports != "object" ) {
                        console.log("Invalid imports");
                        process.exit(1);
                     }

                     if ( modules[importType] == undefined ) {
                        modules[importType] = {}
                     }
                     return imports.forEach(importName => {
                        const importFile = this.locator(service, importType, serviceType, `${importName}.js`);
                        
                        if ( !fs.existsSync(importFile) ) { throw   `File does not exists ${importFile}`}
                        console.log('\x1b[35m%s\x1b[0m', `Adding ${service} ${importType}:`, importName, "in", serviceType);
                        
                        modules[importType][serviceType] = {
                           ...(modules[importType] && modules[importType][serviceType]),
                           [importName]: require(importFile)
                       };
                    }) 
                    

                })
            } else {
                console.error("The import type does not exits or not a object");
                process.exit(1);
            }

           } catch(err) {
            console.error(err);
            process.exit(1);
           }

    }

    // Load the content
   
    

}

module.exports = Composer;