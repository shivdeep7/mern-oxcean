const express = require("express");
const route = express.Router();
/**
 * 
 * @Route       GET /applications/
 * @Desc        Get the list of all applications
 * @access      Private
 * @User        Admin can access all the routes while users can access only theirs ( Controlled by roles )
 * 
 */
route.get("/", ( req, res ) => {
    return res.send("This worked")
});


// export the route
module.exports = route; 