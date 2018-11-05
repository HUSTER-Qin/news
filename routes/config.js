/*
总路由 : 加载并注册各个分路由
 */
var express = require('express');
var router = express.Router();

var user = require('./user');
var index = require('./index');

user(router);
index(router);

module.exports = router;
