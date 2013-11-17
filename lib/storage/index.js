var file = require('./file');
var memory = require('./memory');
var redis = require('./redis');

var storageFactory = {};
storageFactory['file'] = file;
storageFactory['memory'] = memory;
storageFactory['redis'] = redis;

module.exports = storageFactory;
