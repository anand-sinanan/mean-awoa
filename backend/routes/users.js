// Good to know from learning perspective, express-mongo-crud handles api but never know when this comes in handy

var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var users = require('../models/users.js');

/* GET ALL USERS */
router.get('/', function(req, res, next) {
  users.find(function (err, users) {
    if (err) return next(err);
    res.json(users);
  });
});

/* GET SINGLE USER BY ID */
router.get('/:id', function(req, res, next) {
  users.findById(req.params.id, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* SAVE USER */
router.post('/', function(req, res, next) {
  users.create(req.body, function (err, post) {
    console.log(req.body);
    if (err) return next(err);
    res.json(post);
  });
});

/* UPDATE USER */
router.put('/:id', function(req, res, next) {
  users.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

/* DELETE USER */
router.delete('/:id', function(req, res, next) {
  users.findByIdAndRemove(req.params.id, req.body, function (err, post) {
    if (err) return next(err);
    res.json(post);
  });
});

module.exports = router;
