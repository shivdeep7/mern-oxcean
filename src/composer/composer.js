const Services = require("../core/models/services.js")
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

    constructor() {

        // Main modules types 
        this.Addons = {};
        this.Core = {};
        this.services = {};
        this.helpers = {};

        // Entities within the the module
        this.middlewares = {};
        this.models = {};
        this.validators = {};
        this.routes = {};

        // File locations 
        this.corePath = path.join(__dirname, "../core");
        this.addonPath =  path.join(__dirname, "../services");
        this.serviceFile = "service.json";

    }

   /**
    * 
    * @Desc  Method to load the core applications
    * 
    */
   async loadCore() {

        try {
            
            load

        } catch (error) {
            
            console.error(error);
            process.exit(1);

        }

   }

   async loadServices() {
        try {

            const services = await Services.find({type: "addon"}, {name: 1});
            services.forEach(service => {
                
                console.log('\x1b[34m%s\x1b[0m', `[Adding service]`, service.name);
                const configFile = path.join(this.addonPath, service.name, this.serviceFile);
                const config = JSON.parse(fs.readFileSync(configFile));

                if ( typeof config != "object" ) { 
                    console.log(`Error: [${service}] service file not found`)
                    process.exit(0); 
                }

                //this.middlewares[service.name].push(config.middlewares);
                console.log(config);
                this.models[service.name]= config.models;
                //this.validators[service.name].push(config.validators);
                //this.routes[service.name].push(config.routes);

            });

        } catch (err) {
           console.error(err);
           process.exit(1);
        }
    }


    loader(config) {
        this.loadModels(config.name, config.models, "addon");
        this.loadMiddlewares(config.name, config.middlewares);
       // this.loadRoute(config.name);
    }
  
    deploy() {

        // Load the services
        this.loadModels("services");

       // global.Core  = this.Core;
        global.Services = this.services; 
    }

    async manualLoader(directory) {
       const dir = await fs.readdirSync(directory);
       dir.forEach(subdir => {
           const current = path.join(directory, subdir);
          
           if ( fs.lstatSync(current).isDirectory() ) {
                this.loadCore(current);
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

        const serviceTypeDir = service != "Core" && serviceType
        return path.join(__dirname, "../", service, serviceTypeDir, importType, file)

    }



    // Method to load any service
    /**
     * 
     * @Param  service      - The name of the service we want load - Core, Services, modules 
     * @Param  importType      - The type of the file we want to load - Middlware, Model, validator and others
     * 
     **/
    importer(service, importType) {

        try {

            if ( typeof this[importType] == "object" ) {
                Object.keys(this[importType]).forEach(serviceType => {
                    const importName = this[importType][serviceType];
                    const modelFile = this.locator(service, importType, serviceType, `${importName}.js`);
                    console.log(modelFile);
                    console.log('\x1b[35m%s\x1b[0m', `Adding ${service} ${importType}:`, importName, " in", serviceType);
                    this[service][importType] = {
                        [serviceType]: {
                            ...this[service][importType]?.[serviceType],
                            [importType]: require(modelFile)
                        }
                    }
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