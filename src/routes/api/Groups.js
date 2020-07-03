const express = require("express");
const router = express.Router();
const { check, validationResult, body } = require("express-validator");

// Get the models
const Groups = require("../../models/Groups");

// Get the validators
const groupsValidator = require("../../validation/Groups");

/**
 * 
 * @Route   POST /api/groups
 * @Desc    Route to create a group
 * @Access  Private
 * @User    Admin
 * 
 */
router.post("/", [
    auth,
    check("name", "Name is required").not().isEmpty(),
    check("roles", "Roles are required to create a group").not().isEmpty(),
    body("name").custom((name) => groupsValidator.GroupExitsByName(name, true)),
    body("roles").custom((roles) => groupsValidator.GroupRoleExits(roles))
], async (req, res, next) => {

    const errors = validationResult(req);
    if ( !errors.isEmpty() ) {
        res.result = {
            success: false, 
            status: 400,
            code: 37739,
            payload: errors
        }

        return handler(req, res, next);
    }

    try {

        const groups = new Groups({
            name: req.body.name,
            roles: req.body.roles
        })

        const addGroup = await groups.save(groups);
        res.result = {
            success: true, 
            status: 200,
            code: 32345,
            payload: addGroup
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

module.exports = router;