/**
 *  
 * Purpose: File to handle /user route 
 * Original Author: Shivdeep Singh
 *  
 * 
 **/ 
const router = require("express").Router();


router.get("/", (req, res) => {
    return res.status(200).send("Connection Successful");
})  

module.exports = router;