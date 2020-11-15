const Groups = require("../models/Groups");
const mongoose = require("mongoose");
//const rolesValidator = require("./Roles.js")

// Get the group by name
const GroupExitsByName = async (name, status) => {
    try { 
               
        // check if the role exits in the database
        const checkGroup = await Groups.find({ name: name });

        // If we don't want role to exits in the database
        if ( status && checkGroup.length != 0 ) {
            return Promise.reject('Group already exits in the database, Maybe try editing it');
        } 
        
        // If we want role to exit in database
        if ( !status && checkGroup.length == 0 ) {
            return Promise.reject('Group does not exits in the database');
        }
 
   } catch (err) {

        console.error(err);
        return err;

   }

}


// Get the role services
const GroupRoleExits = async (roles) => {

    try {
         // Check if services exits
        const getRoles = roles.map(( role ) => { 
             return mongoose.Types.ObjectId.isValid(role) ? mongoose.Types.ObjectId(role) : false;
        });
        
        if (getRoles.indexOf(false) != -1) return Promise.reject('Invalid Object ID');
        return rolesValidator.RolesExitsById(getRoles);

    } catch (err) {

        console.error(err);
        return err;
    }
}

module.exports = {
    GroupRoleExits,
    GroupExitsByName
}