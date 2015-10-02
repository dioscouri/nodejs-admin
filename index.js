'use strict';

/**
 * Requiring EventEmitter
 */
var EventEmitter = require('events');

/**
 * Requiring Path node module
 *
 * @type {posix|exports|module.exports}
 */
var path = require('path');

var DioscouriCore = require('dioscouri-core');

var applicationFacade = DioscouriCore.ApplicationFacade.instance;


class PagesApp extends EventEmitter {
    /**
     * Controller constructor
     */
    constructor() {
        super();

        this._appName = 'Admin UI';

        this._appPath = __dirname;

        this._routesPath = path.join(this._appPath, 'app', 'routes');

        this._controllersPath = path.join(this._appPath, 'app', 'controllers');

        this._modelsPath = path.join(this._appPath, 'app', 'models');
    }

    /**
     * Returns App Name
     *
     * @returns {string}
     */
    get appName() {
        return this._appName;
    }

    get routesPath() {
        return this._routesPath;
    }

    get controllersPath() {
        return this._controllersPath;
    }

    get modelsPath() {
        console.log('this._modelsPath: ' + this._modelsPath);
        return this._modelsPath;
    }

    /**
     * Run application facade based on configuration settings
     */
    init() {
        // Set body parsers for Express
    }
}

module.exports = PagesApp;