// Middelware to handle the response
const uuid = require("uuid");
const mongoose = require("mongoose");
const Logger = require("./Logger.js");

const handler = async ( req, res, next ) => {

   try {

        if ( req.requestId != "" ) {

            const { success, status, code, payload } = res.result; 

            // Create a log
            Logger(req, res, next);

            // Send the response
            res.status(status).json({
                "success": success,
                "code": code,
                "status": status,
                "data": payload,
                "request_id": req.requestId,
            }) 

        } else {
            throw new Error('Whoops!') 
        }

   } catch (err) {
        console.error(`Error: ${err}`)
   }

}

module.exports = handler;