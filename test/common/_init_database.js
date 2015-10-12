
// Using STRICT mode for ES6 features
"use strict";

var DioscouriCore = require('dioscouri-core');

/**
 *  Importing Application Facade and run the Application.
 *
 *  @author Eugene A. Kalosha <ekalosha@dioscouri.com>
 */
var applicationFacade = DioscouriCore.ApplicationFacade.instance;

/**
 * Requiring Async operations helper
 *
 * @type {async|exports|module.exports}
 */
var async = require('async');

/**
 * Loading clients model
 *
 * @type {ClientModel|exports|module.exports}
 */
var clientModel = require('../../app/models/client.js');

/**
 * Initializing/Deinitialize Database
 */
before(function(done) {
    applicationFacade.on(DioscouriCore.ApplicationEvent.MONGO_CONNECTED, function (event) {
        var locals = {};
        console.log('Checking initial data for Admin system');
        async.series([
                function (asyncCallback){
                    asyncCallback();
                },
                function (asyncCallback){
                    asyncCallback();
                }
            ],
            function (error) {
                if (error != null) {
                    console.error('ERROR. Failed to initialize Admin tests. ', error.message);
                }
                done();
            });

    }.bind(applicationFacade));

    // Initializing all modules
    applicationFacade.init();
    // applicationFacade.loadModels('app/models/common');
    applicationFacade.run();
});

// Global after handler
after(function(done) {
    console.log('Clean test data');
    async.series([
        function (asyncCallback){
            asyncCallback();
        },
        function (asyncCallback){
            asyncCallback();
        }
    ],
    function (error) {
        if (error != null) {
            console.error('ERROR. Failed to clean Admin tests. ', error.message);
        }
        done();
    });
});
