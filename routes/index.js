var express = require('express');
var router = express.Router();
var kittySplit = require('../lib/kittysplit')();
var http = require('http');


router.get('/update/:person', function (req, res) {
	kittySplit.update(req.params.person);

	res.send('happy');
});

router.post('/configure', function (req, res) {
	kittySplit.configure(req.body);
	res.sendStatus(200);
});

module.exports = router;
