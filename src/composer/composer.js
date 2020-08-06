const Services = require("../core/models/services.js")
const fs = require("fs");
const path = require("path");
const { throws } = require("assert");
const { config } = require("process");

class Composer {

    constructor() {

        this.addonPath = path.join(__dirname, "../services");
        this.Addon = {};
        this.Core = {};
        this.serviceFile = "service.json";

        this.services = {};

    }

   async loadServices() {
        try {

            const services = await Services.find({type: "addon"}, {name: 1});
            services.forEach(service => {
                
                console.log('\x1b[34m%s\x1b[0m', `[Adding service]`, service.name);
                const config = JSON.parse(fs.readFileSync(path.join(this.addonPath, service.name, this.serviceFile)));
                this.loader(config);

            })

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
  
    compose() {
        global.Core  = this.Core;
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

    // Compose the middlewares
    loadModels(service, models, type) {
       try {
        if ( models ) {
            models.forEach(model => {
                const modelFile = path.join(this.addonPath, service, "models", `${model}.js`);
                console.log('\x1b[35m%s\x1b[0m', `Adding Model`, model);
                if ( type == "addon") {
                    this.Core.models = {
                        ...this.Core.models,
                        [service]: require(modelFile)
                    }
                }
            })
        }
       } catch(err) {
        console.error(err);
        process.exit(1);
       }
    }

     // Compose the middlewares
     loadMiddlewares(service, midlewares) {
        try {
            
            if ( midlewares ) {
                midlewares.forEach(midleware => {
                    const requireFile = path.join(this.addonPath, service, "midlewares", `${midleware}.js`);
                    console.log('\x1b[35m%s\x1b[0m', `Adding Middleware`, midleware);
                    require(requireFile);
                })
            } 

        } catch(err) {
         console.error(err);
         process.exit(1);
        }
     }

    // Load the content
   
    

}

module.exports = Composer;