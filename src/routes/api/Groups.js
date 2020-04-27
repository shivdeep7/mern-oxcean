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
], async (req, res) => {

    const errors = validationResult(req);
    if ( !errors.isEmpty() ) {
        return res.status(404).json(errors);
    }

    try {

        const groups = new Groups({
            name: req.body.name,
            roles: req.body.roles
        })

        const addGroup = await groups.save(groups);
        return res.status(200).json(addGroup);

    } catch (err) {
        console.log(err);
    }


});

module.exports = router;