var express = require('express');
var router = express.Router();
const Data = require('../schema/Data');

router.get('/user/:name', function(req, res, next) {
    Data.findOne({userName: req.params.name}, function(err, results) {
        if (err) {
            return res.json({success: false, error: err});
        } else {
            return res.json({success: true, userInfo: results});
        }
    });
});