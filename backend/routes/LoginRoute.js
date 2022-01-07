var express = require('express');
var router = express.Router();
const Data = require('../schema/Data');



// Makes a request from the login page to the database to get user info based on the user's username
router.get('/login/:name', function(req, res, next) {
    Data.findOne({userName: req.params.name}, function(err, results) {
        if (err) {
            return res.json({success: false, error: err});
        } else {
            return res.json({success: true, userInfo: results});
        }
    })
});

module.exports = router;