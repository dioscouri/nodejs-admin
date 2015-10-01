'use strict';

// http server loaded
// an observable event triggered before DB connection established
// sync - an observable event triggered after DB connection established
// sync - all registered models loaded
// sync - all registered routes loaded
// sync - an observable event triggered before http server is run
// sync - server is run

/**
 * Requiring EventEmitter module
 *
 * @type {EventEmitter|exports|module.exports}
 */
var EventEmitter = require('events');

/**
 * Requiring Core Library
 */
var DioscouriCore = require('dioscouri-core');

/**
 * Requiring Application events
 *
 * @type {*|{SERVER_STARTED: string, MONGO_CONNECTED: string}|ApplicationEvent}
 */
var ApplicationEvent = DioscouriCore.ApplicationEvent;

/**
 *  Importing Application Facade
 */
var applicationFacade = DioscouriCore.ApplicationFacade.instance;

class AdminUI extends EventEmitter { // TODO: Should be inheriting from Base Application controller ?

    constructor() {
        super();
    }

    bootstrap() {
        applicationFacade.on(ApplicationEvent.MONGO_CONNECTED, function (event) {

            applicationFacade.loadModels(__dirname + '/models');
            applicationFacade.server.loadRoutes(__dirname + '/routes');

            applicationFacade.server.initAcl(require('./models/acl_permissions'));

            this.emit('APPLICATION_READY'); // TODO
        }.bind(this));
    }
}

module.exports = AdminUI;