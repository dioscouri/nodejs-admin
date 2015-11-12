
// Using STRICT mode for ES6 features
"use strict";

module.exports = function () {
    var routes = {
        'get,post|/login': 'front/login.js',
        'get|/logout': 'front/login.js',

        'get,post|/signup': 'front/signup.js',
        'get|/api/signup/:action': 'front/signup.js',
        'get|/api/signup/:action/:id': 'front/signup.js',
        'get,post|/signup/:action': 'front/signup.js'
    };

    return routes;
};
