
// Using STRICT mode for ES6 features
"use strict";

// Requiring core assert
var assert = require('assert');

/**
 * Requiring init script for main nodejs-lib
 *
 * @type {exports|module.exports}
 * @private
 */
var _init = require('./common/_init.js');

/**
 * Requiring path utils
 * @type {*}
 */
var path = require('path');

// Requiring main nodejs-core lib
var DioscouriCore = require('dioscouri-core');

describe('Bootstrap', function () {

    before(function(done){
        // Set max timeout to 5 sec. As it may take more then 2 secs to run host server
        this.timeout(5000);

        _init.startServer(function () {
            done();
        })
    });

    // Describing initial loading
    describe('init', function () {

        var BootstrapLoader;
        var loader;

        // Controllers initialization test
        it('Initializing loader', function (done) {
            BootstrapLoader = require('../index.js');
            loader = new BootstrapLoader();
            loader.init();
            loader.run();
            loader.bootstrap();

            console.log('\n\n');

            done();
        });

        // Controllers initialization test
        it('Controllers must be initialized', function (done) {
            assert.notEqual(BootstrapLoader.Admin.Controllers, null);
            assert.notEqual(BootstrapLoader.Admin.Controllers.BaseAuth, null);
            assert.notEqual(BootstrapLoader.Admin.Controllers.BaseCRUD, null);

            done();
        });

        // Models initialization test
        it('Models must be initialized', function (done) {
            assert.notEqual(BootstrapLoader.Admin.Models, null);
            assert.notEqual(BootstrapLoader.Admin.Models.ACLPermissions, null);
            assert.notEqual(BootstrapLoader.Admin.Models.ACLResources, null);
            assert.notEqual(BootstrapLoader.Admin.Models.ACLRoles, null);
            assert.notEqual(BootstrapLoader.Admin.Models.Base, null);
            assert.notEqual(BootstrapLoader.Admin.Models.Configuration, null);
            assert.notEqual(BootstrapLoader.Admin.Models.LogAudit, null);
            assert.notEqual(BootstrapLoader.Admin.Models.LogSystem, null);
            assert.notEqual(BootstrapLoader.Admin.Models.Notification, null);
            assert.notEqual(BootstrapLoader.Admin.Models.QueueTask, null);
            assert.notEqual(BootstrapLoader.Admin.Models.QueueTaskArchive, null);
            assert.notEqual(BootstrapLoader.Admin.Models.User, null);
            assert.notEqual(BootstrapLoader.Admin.Models.Webhook, null);
            assert.notEqual(BootstrapLoader.Admin.Models.WebhookEvent, null);

            done();
        });


        // Controllers initialization test
        it('Controllers must be exported to Registry', function (done) {
            assert.notEqual(DioscouriCore.ApplicationFacade.instance.registry.load('Admin.Controllers.BaseAuth'), null);
            assert.notEqual(DioscouriCore.ApplicationFacade.instance.registry.load('Admin.Controllers.BaseCRUD'), null);

            done();
        });

        // Models initialization test
        it('Models must be initialized', function (done) {
            assert.notEqual(DioscouriCore.ApplicationFacade.instance.registry.load('Admin.Models.ACLPermissions'), null);
            assert.notEqual(DioscouriCore.ApplicationFacade.instance.registry.load('Admin.Models.ACLResources'), null);
            assert.notEqual(DioscouriCore.ApplicationFacade.instance.registry.load('Admin.Models.ACLRoles'), null);
            assert.notEqual(DioscouriCore.ApplicationFacade.instance.registry.load('Admin.Models.Base'), null);
            assert.notEqual(DioscouriCore.ApplicationFacade.instance.registry.load('Admin.Models.LogAudit'), null);
            assert.notEqual(DioscouriCore.ApplicationFacade.instance.registry.load('Admin.Models.LogSystem'), null);
            assert.notEqual(DioscouriCore.ApplicationFacade.instance.registry.load('Admin.Models.Notification'), null);
            assert.notEqual(DioscouriCore.ApplicationFacade.instance.registry.load('Admin.Models.QueueTask'), null);
            assert.notEqual(DioscouriCore.ApplicationFacade.instance.registry.load('Admin.Models.QueueTaskArchive'), null);
            assert.notEqual(DioscouriCore.ApplicationFacade.instance.registry.load('Admin.Models.User'), null);
            assert.notEqual(DioscouriCore.ApplicationFacade.instance.registry.load('Admin.Models.Webhook'), null);
            assert.notEqual(DioscouriCore.ApplicationFacade.instance.registry.load('Admin.Models.WebhookEvent'), null);
            assert.notEqual(DioscouriCore.ApplicationFacade.instance.registry.load('Admin.Models.ACLPermissions'), null);
            assert.notEqual(DioscouriCore.ApplicationFacade.instance.registry.load('Admin.Models.ACLPermissions'), null);

            done();
        });

    });
});
