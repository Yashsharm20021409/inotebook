const express = require('express')
const router = express.Router();
const User = require('../models/User');
const { body, validationResult } = require('express-validator');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
const { findOne } = require('../models/User');
const fetchUser = require('../middleware/fetchUser')

const JWT_SECRET = 'ThisIsOurTo$ken'

//IMP:- get req eslye use ni ki kuki use hm mostly data send krne k lie use krte h due to this data(password,email,username) will be shown in address

// Create a User Using:POST "/api/auth/createuser" post req marni h or data bhj skte h (not for Login)
router.post('/createuser', [

    body('name', 'Enter a Valid Name').isLength({ min: 3 }),
    // email must be an email
    body('email', 'Enter a Valid Email').isEmail(),
    // password must be at least 5 chars long
    body('password', 'PassWord Must Be more then 5 Charcters').isLength({ min: 5 })
], async (req, res) => {
    let success =false;

    try {
        // check if error occurs and then errors and bad request
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({success, errors: errors.array() });
        }

        // to check if user with this email exists already
        let user = await User.findOne({ email: req.body.email })
        if (user) {

            return res.status(400).json({success, error: 'This Email Already Exits' })
        }

        const salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(req.body.password, salt)
        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: secPass
        })

        const data = {
            user: {
                id: user.id
            }
        }
        var authToken = jwt.sign(data, JWT_SECRET);
        // console.log(authToken)

        // .then(user => res.json(user)).catch(err=>{console.log("User already Exits")
        // res.json({error:'Please Try With Another Email',message:err.message})})
        // res.json({ created: 'Account Has Been Created successfully',user })
        success = true;
        res.json({ success,authToken })
    } catch (error) {
        // About ideally we not doing this console.log
        console.error(error.message)
        res.status(500).send("Internal Server Error");
    }
})



//Route 2: Authentication a User using JWT: POST "/api/auth/login" No login req
router.post('/login', [
    body('email', 'Enter a Valid Email').isEmail(),
    body('password', 'cannot be blanked').exists(),
], async (req, res) => {

    // check if error occurs and then errors and bad request
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;
    
    let success = false;
    try {
        let user = await User.findOne({ email })
        if (!user) {
            return res.status(400).json({success, error: 'Please try to Login with correct Credentials' });
        }

        //it takes the passWord(string) provided by user and the hash Password avialble in DATABASE(hash)
        const passwordCompare = await bcrypt.compare(password, user.password);
        if (!passwordCompare) {
            // success = false;
            return res.status(400).json({success, error: 'Please try to Login with correct Credentials' });
        }

        // agar passWord Match hogya then we send the data of the user
        const data = {
            user: {
                id: user.id
            }
        }
        var authToken = jwt.sign(data, JWT_SECRET);
        success = true;
        res.json({success, authToken });
    } catch (error) {
        // About ideally we not doing this console.log
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }

})

// Route 3: Get Logged in User Details using: POST "api/auth/getuser" Login required
router.post('/getuser',fetchUser, async (req, res) => {

    try {
        const userID = req.user.id
        let user = await User.findOne({ userID }).select('-password');
        res.send(user)

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error"); 
    }
})

module.exports = router;