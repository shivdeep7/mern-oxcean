/***
 * 
 *  Desc: Middleware to control the flow of the application based on the services and user roles
 *  Author: Shivdeep Singh
 * 
***/

const _ = require("lodash");
const Users = require("../models/Users.js")
module.exports = authorization = async ( req, res, next ) => {
  
   // Check if user have the permission to the route
   const { groups } = req.user;
   const { method, originalUrl } = req;
   const requestedService = originalUrl.split("/")[2];
   const roles = _.map(groups, 'roles')[0];

   try {

      let service = [];

      roles.forEach(( key ) => {
          service = key.permissions.filter( x => x.service.name.toLowerCase() == requestedService );
      });

      if (service.length) {

        /*
        *
        * Protcted - True or false ( User only access their data ) 
        * access-Type - Read ( User cannot access delete or edit ) or full ( User can access everything )
        * 
        */
        const { accessType, protected } = service;
        const readRestrictions = [ 
          "PUT",
          "DELETE"
        ];

        if ( accessType == "Read-Only" && readRestrictions.indexOf(method) != -1) {
          res.status(404).json({"access": "You don't have permission to the method"});
        }

        // Send the request with protected route 
        req.user.permission = protected;

      }  else {
        res.status(404).json({"access": "You don't have permssion to access th is route"});
      }

      next();

   } catch (err) {

       // Log the error on console
       res.result = {
        success: false, 
        status: 500,
        code: 00024,
        payload: {
            errors: [
                {
                    msg: err,
                }
            ]
        }
    }

    return handler(req, res, next);

   }

 }