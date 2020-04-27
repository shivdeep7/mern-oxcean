// Get the required files
const Services =  require("../models/Services");


const ServiceExitByName = async (name, status) => {

    try {

        const service = await Services.find({ name: name });

        // If we don't want service to exits in the database
        if ( status && service.length != 0 ) {
            return Promise.reject('Service already exits in the database.');
        } 
        
        // If we want service to exit in database
        if ( !status && service.length == 0 ) {
            return Promise.reject('Service does not exits in the database');
        }

    } catch (err) {
        console.log(err);
    }

}

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
    ServicesExitsById,
    ServiceExitByName
}