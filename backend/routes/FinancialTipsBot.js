var express = require('express');
let Twitter = require('twitter');
var router = express.Router();


var client = new Twitter({
    consumer_key: 'ru4RYqmqN1VCpKnWnivVaEeEZ',
    consumer_secret: 'ysnFvBdo4Glt6TluhrCLqudNNhkO2E9HmGC33lGP0fNHshhRcD',
    bearer_token: 'AAAAAAAAAAAAAAAAAAAAAHnEOwEAAAAAnzI3%2FeimCcCjxVpyyvXa%2FoK6mQA%3D3DUUQgzctHmxGes7PohxcmfkHdsVFxt4wQbj7oXqCNxTwVYL8h'
});

router.get('/tips/', function(req, res, next) {
    client.get('statuses/user_timeline', {user_id: 1226302873}, function(err, data, clientResp) {
        if (err) {
            return res.json({success: false, error: err});
        } else {
            return res.json({success: true, tweets: data});
        }
    });
});

module.exports = router;