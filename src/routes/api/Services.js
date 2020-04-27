const express = require("express");
const router = express.Router();
const { check, validationResult, body } = require("express-validator");

// Get the validators
const { ServiceExitByName } = require("../../validation/Services")

// Get the middleware
const auth = require("../../middleware/auth.js")

// Get the models
const Services = require("../../models/Services.js");
const Roles = require("../../models/Roles.js");


/**
 * 
 * @Route    POST /api/servies
 * @Desc     Route to create a service
 * @access   Private
 * @User     Admin
 * 
 */
router.post("/", [
    auth,
    check("name", "Please provide the service name").not().isEmpty(),
    check("route", "Please provide the service route").not().isEmpty(),
    check("data", "Please provide the service Collection").not().isEmpty(),
    check("type", "Please provide the service type").not().isEmpty(),
    body("name").custom(name => ServiceExitByName(name, true))
], async (req, res) => {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json(errors);
    }

    try { 
        
        // Create new service
        const service = new Services({
            name: req.body.name,
            route: req.body.route,
            data: req.body.data,
            type: req.body.type
        });

        const newService = await service.save(service);
        const id = newService._id;

        // Add a new permission to admin 
        await Roles.findOneAndUpdate({name: "Admin"}, { $push: { "permissions": { "service": id, "accessType": "full"}} });

        res.status(200).json(newService);

    } catch (err) {

        console.log(err);

    }

})

/**
 * 
 * @ROUTE    PUT /api/services
 * @Desc     Route to edit the service
 * @access   Private 
 * @user     Admin
 *
 */
router.put("/", [
    auth,
    check("name", "Please provide the service name").not().isEmpty(),
    check("route", "Please provide the service route").not().isEmpty(),
    check("data", "Please provide the service Collection").not().isEmpty(),
    check("type", "Please provide the service type").not().isEmpty(),
    body("name").custom(name => ServiceExitByName(name, false))
], async (req, res) => {

    const errors = validationResult(req);
    if ( !errors.isEmpty() ) {
        res.status(404).json(errors);
    }

    try {

        // Create new service
        const data = {
            route: req.body.route,
            data: req.body.data,
            type: req.body.type
        };

        const editService = await Services.findOneAndUpdate({name: req.body.name}, data);
        res.status(200).json(editService);

    } catch(err) {

        console.log(err);

    }

})

/**
 * 
 * @ROUTE    DELETE /api/services
 * @Desc     Route to delete the service
 * @access   Private 
 * @user     Admin
 *
 */
router.delete("/", [
    auth,
    check("name", "Name is required to delete the document").not().isEmpty(),
    body("name").custom(name => ServiceExitByName(name, false))
], async (req, res) => {

    const errors = validationResult(req);
    if ( !errors.isEmpty() ) {
        res.status(404).json(errors);
    }

    try {

        // Delete the service
        const deleteService = await Services.findOneAndDelete({name: req.body.name});
        const id = deleteService._id;
        
        // Delete the role reference 
        const deleteRoleReference = await Roles.findOneAndUpdate({ $pull: { "permissions": {  "service": id }}})

        
        res.status(200).json(deleteService);

    } catch(err) {

        console.log(err);

    }

})


module.exports = router;