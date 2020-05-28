const express = require('express');
const router = express.Router();
const User = require("../models/User");
const Joi = require('@hapi/joi');
const bcrypt = require('bcrypt');

router.post("/", async function (req, res) {
    console.log(req.body)
    let {error} = validateLogin(req.body); // validate if the request body is valid

    if (error) return res.status(400).send(error.details[0].message)

    let user = await User.query().findOne('email', '=', req.body.email); //Check if user email exists in database
    if (!user) return res.status(400).send('Invalid email or password'); // throw generic error if user doesn't exist in database

    const validPassword = await bcrypt.compare(req.body.password, user.password)  // check if password in the req matches with the hashed password in db
    if (!validPassword) return res.status(400).send('Invalid email or password'); // throw generic error if password isn't valid

    const token = user.generateAuthToken() //generate json webtoken

    res.send(token)
})


function validateLogin(req) {
    const loginSchema = Joi.object({
        email: Joi.string().required(),
        password: Joi.string().required()
    })

    return loginSchema.validate(req)
}


module.exports = router;