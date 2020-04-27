// Middelware to handle the response
const uuid = require("uuid");
const Logs = require("../modles/Logs.js");

const handler = async ( req, res, next ) => {

   try {

        if ( res.response && res.id ) {

            // Error type
            const { status, code, data } = res.response; 
            const { user, requestId  } = res;

            // Create a timeline 
            const timeline = Logs.update(
                {
                    requests: { $elemMatch: { requestId: requestId } }
                },
                { 
                    code: code,
                    payload: payload,
                    status: status
                }
            )

            const payload = {};
            payload.success = status;
            if ( status ) payload.data = data;
            if ( !status ) payload.error = data; 

            // Send the response
            res.status(400).json(payload) 

        } else {
            throw new Error('Whoops!') 
        }

   } catch (err) {
        console.error(" Error here ")
   }

}