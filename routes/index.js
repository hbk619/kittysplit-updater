var express = require('express');
var router = express.Router();
var kittySplit = require('../lib/kittysplit')();
var http = require('http');


router.get('/update/:person', function (req, res) {
	kittySplit.update(req.params.person);


	res.send('happy');

});
module.exports = router;
