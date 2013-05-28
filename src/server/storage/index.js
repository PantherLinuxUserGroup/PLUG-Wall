var file = require('./file');
var memory = require('./memory'

var storageFactory = {};
storageFactory['file'] = file;
storageFactory['memory'] = memory;

module.exports = storageFactory;
