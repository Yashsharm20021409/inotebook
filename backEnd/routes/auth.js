const express = require('express')
const router = express.Router();
const User = require('../models/User');


// Create a User Using:POST "/api/auth" post req marni h or data bhj skte h
router.post('/',(req,res)=>{

    // res.json([]);
    console.log(req.body)
    const user = User(req.body);
    user.save();
    res.send(req.body)
})

module.exports = router;