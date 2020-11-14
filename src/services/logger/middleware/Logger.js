// Get the logging model
const Logs = require("../services/core/models/Logs.js");
const mongoose = require("mongoose");

const Logger = async (req, res, next) => {

    // Get the request data 
    const { method, originalUrl, ip, body, requestID, token, userId } = req;
    const headers = JSON.stringify(req.headers);
    const client = headers["user-agent"];


    // Logs the data
    if ( requestID ) {
        
        // Get the exisiting log
        const { success, status, code } = res.result;

        const logData = {
            success: success,
            status: status,
            token: token,
            code: code,
            user: mongoose.Types.ObjectId(userId)
        }

        !success ? logData.payload = res.result.payload : ""

        var Logged = await Logs.update({
            _id: mongoose.Types.ObjectId(requestID)
        }, logData);

    } else {

        // Compose the log data
        const log = new Logs(
                {
                    method: method,
                    path: originalUrl,
                    ip: ip,
                    code: "00001",
                    requestData: body,
                    client: client,
                }
        )

        // Create a new log 
        var Logged = await log.save(log);
        req.requestID = Logged._id;

    }

     // Add the request id 
     next();
}

module.exports = Logger;