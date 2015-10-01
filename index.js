'use strict';

var App = require('./lib/index');

var instance = new App();
instance.bootstrap();

// TODO: Remove debug
setTimeout(function() {
    console.log('Finished');
}, 5000);

// TODO: Remove debug
instance.on('instance', function(event) {
    console.log(event);
});

module.exports = instance;