var express = require('express');
var router = express.Router();
const Data = require('../schema/Data');


// Makes a request to the database to update user's plan
router.put('/products/', function(req, res, next) {
    Data.findOneAndUpdate({userName: req.body.userName}, {plan: req.body.plan, balance: req.body.balance}, function(err, results) {
        if (err) {
            return res.json({success: false, error: err});
        } else {
            return res.json({success: true});
        }
    });
});

module.exports = router;