var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const Data = require('../schema/Data');


const dbRoute =
    'mongodb+srv://dbUser:dbUserPassword@cluster0.5qwuc.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';

    mongoose.connect(dbRoute, { useUnifiedTopology: true });
let db = mongoose.connection;

db.once('open', () => console.log('connected to the database'));

// checks if connection with the database is successful
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// Makes a request to the database to get user info based on the user's username
router.get('/profile/:name', function(req, res, next) {
    Data.findOne({userName: req.params.name}, function(err, results) {
        if (err) {
            return res.json({success: false, error: err});
        } else {
            return res.json({success: true, userInfo: results});
        }
    });
});

// Makes a request to the database to get all user data stored
router.get('/profile/', function(req, res, next) {
    Data.find(function(err, results) {
        if (err) {
            res.json({success: false, error: err});
        } else {
            res.json({success: true, allUserInfo: results});
        }
    });
});

// Makes a request to the database to update user's current (today) expenses
router.put('/profile/expense', function(req, res, next) {
    Data.findOneAndUpdate({userName: req.body.userName}, {todaysExpenses: req.body.todaysExpenses}, function(err, results) {
        if (err) {
            res.json({success: false, error: err});
        } else {
            res.json({success: true});
        }
    });
});

// Makes a request to the database to update user's expenses and user's todaysDate
router.put('/profile/', function(req, res, next) {
    updateParams = {todaysExpenses: req.body.todaysExpenses, 
        allExpenses: req.body.allExpenses, todaysDate: req.body.todaysDate}
    Data.findOneAndUpdate({userName: req.body.userName}, updateParams, function(err, results) {
        if (err) {
            res.json({success: false, error: err});
        } else {
            res.json({success: true});
        }
    });
});

// Makes a request to the database to remove a user
// TODO: Make a button that a user can press if they want to delete their account
router.delete('/profile/', function(req, res, next) {
    Data.findOneAndRemove({userName: req.body.userName}, function(err, results) {
        if (err) {
            res.json({success: false, error: err});
        } else {
            res.json({success: true});
        }
    })
})

module.exports = router;
