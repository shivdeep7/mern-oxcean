const Roles = require("../models/Roles");
const mongoose = require("mongoose");
const serviceValidator = require("./Services.js")

// Check if the role exits 
const RoleExitsByName = async (name, status) => {
    try { 
               
        // check if the role exits in the database
        const checkRole = await Roles.find({ name: name });

        // If we don't want role to exits in the database
        if ( status && checkRole.length != 0 ) {
            return Promise.reject('Role already exits in the database, Maybe try editing it');
        } 
        
        // If we want role to exit in database
        if ( !status && checkRole.length == 0 ) {
            return Promise.reject('Role does not exits in the database');
        }
 
   } catch (err) {

        console.error(err);
        return err;

   }

}



// Get the role services
const RoleServiceExits = async (permissions) => {

    try {
         // Check if services exits
        const services = permissions.map(( permission ) => { 
             return mongoose.Types.ObjectId.isValid(permission["service"]) ? mongoose.Types.ObjectId(permission["service"]) : false;
        });
        
        if (services.indexOf(false) != -1) return Promise.reject('Invalid Object ID');
        return serviceValidator.ServicesExitsById(services);

    } catch (err) {

        console.error(err);
        return err;
    }
}

// Roles does not exits in the database
const RolesExitsById = async (roles) => {

    try {

        const getRoles = await Roles.countDocuments({"_id": { $in: [ roles ] }});
        
        // Compare the array 
        if ( roles.length !== getRoles ) {
            return Promise.reject('Roles does not exits in database');
        }

    } catch (err) {
 
         console.error(err);
         return err;
 
    }
 
 }

module.exports = {
    RoleExitsByName,
    RoleServiceExits,
    RolesExitsById
}