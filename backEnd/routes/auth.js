const express = require('express')
const router = express.Router();
const User = require('../models/User');
const { body, validationResult } = require('express-validator');

// Create a User Using:POST "/api/auth/createuser" post req marni h or data bhj skte h (not for Login)
router.post('/createuser', [

    body('name', 'Enter a Valid Name').isLength({ min: 3 }),
    // email must be an email
    body('email', 'Enter a Valid Email').isEmail(),
    // password must be at least 5 chars long
    body('password', 'PassWord Must Be more then 5 Charcters').isLength({ min: 5 })
], async (req, res) => {
    try {


        // check if error occurs and then errors and bad request
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        // to check if user with this email exists already
        let user = await User.findOne({ email: req.body.email })
        if (user) {
            return res.status(400).json({ error: 'This Email Already Exits' })
        }
        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password
        })

        // .then(user => res.json(user)).catch(err=>{console.log("User already Exits")
        // res.json({error:'Please Try With Another Email',message:err.message})})
        res.json({ created: 'Account Has Been Created successfully',user })
    } catch (error) {
        // About ideally we not doing this console.log
        console.error(error.message)
    }
})

module.exports = router;