// Get the required files
const router = require("express").Router();
const { check, validationResult, body } = require("express-validator");
const Roles = require("../../models/Roles");
const Groups = require("../../models/Groups");

const rolesValidation = require("../../validation/Roles.js");
const mongoose = require("mongoose");

const auth = require("../../middleware/auth.js")

/** 
*   
*   @Route      /api/roles
*   @Desc       Route to create a new rule
*   @access     Private
*   @Group      Admin
*
**/
router.post("/", [auth, 

    check("name", "Name is required").not().isEmpty(),
    check("permissions", "Permissions are required").not().isEmpty(),
    body('name').custom(name => rolesValidation.RoleExitsByName(name, true)),
    body('permissions').custom(permissions => rolesValidation.RoleServiceExits(permissions))

], async ( req, res ) => {

    // Check the request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.result = {
            success: false, 
            status: 400,
            code: 88962,
            payload: errors
        }

        return handler(req, res, next);
    }

    // Get the role info 
    const { name, permissions } = req.body;

    try {

        // Create for a new role
        const role = new Roles({
            name: name,
            permissions: permissions
        });
       
        const addRole = await role.save(role);
        res.result = {
            success: true, 
            status: 200,
            code: 89289,
            payload: addRole
        }

        return handler(req, res, next);

        
    } catch (err) {

        // Log the error on console
        res.result = {
            success: false, 
            status: 500,
            code: 48344,
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

});


/** 
*   
*   @Route      /api/roles
*   @Desc       Route to delete a role
*   @access     Private
*   @Group      Admin
*
**/
router.post("/delete",
[ 
    auth, 
    check("name", "Reference to the role is required.").not().isEmpty(),
    body('name').custom(name => rolesValidation.RoleExitsByName(name, false))

], async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.result = {
            success: false, 
            status: 400,
            code: 43553,
            payload: errors
        }

        return handler(req, res, next);
    }

    try {

        const { name } = req.body;

        // Delete the role
        const deleteRole = await Roles.findOneAndDelete({ name: name });  
        const id = deleteRole._id;

        //Delete the reference
        const deleteGroupReference = await Groups.findOneAndUpdate({ $pull: { "roles":  { $in: id}}})

        res.status(200).json(deleteRole);

    } catch (err) {

        console.log(err);
        res.status(500).json(err);

    }

})

/** 
*   
*   @Route      /api/roles
*   @Desc       Route to edit the role
*   @access     Private
*   @Group      Admin
*
**/
router.put("/",
[ 
    auth, 
    check("name", "Reference to the role is required.").not().isEmpty(),
    body('name').custom(name => rolesValidation.RoleExitsByName(name, false)),
    body('permissions').custom(permissions => rolesValidation.RoleServiceExits(permissions, false))

], async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.result = {
            success: false, 
            status: 400,
            code: 84783,
            payload: errors
        }

        return handler(req, res, next);
    }

    const { name, permissions } = req.body;

    try {

        // Delete the role
        const editRole = await Roles.findOneAndUpdate({ name: name }, { permissions });  
        res.status(200).json(editRole);

    } catch (err) {

        console.log(err);
        res.status(500).json(err);

    }

})



module.exports = router;