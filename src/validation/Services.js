// Get the required files
const Services =  require("../models/Services");

const ServicesExitsById = async (services) => {

    try {

        const getServices = await Services.countDocuments({"_id": { $in: [ services ] }});
        
        // Compare the array 
        if ( services.length !== getServices ) {
            return Promise.reject('Services does not exits in database');
        }

    } catch (err) {
 
         console.error(err);
         return err;
 
    }
 
 }
 module.exports = {
    ServicesExitsById
}