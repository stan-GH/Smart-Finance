var express = require('express');
var router = express.Router();
const Data = require('../schema/Data');

// Makes a request to the database to add user info
router.post('/register/', function(req, res, next) {
    let newUser = new Data({
        userName: req.body.userName,
        password: req.body.password,
        email: req.body.email,
        plan: 'free',
        name: req.body.name,
        balance: req.body.balance,
        todaysExpenses: new Map(),
        allExpenses: new Map(),
        todaysDate: req.body.todaysDate
    });

    newUser.save((err) => {
        if (err) {
            return res.json({success: false, error: err});
        } else {
            return res.json({success: true});
        }
    });
});

module.exports = router;