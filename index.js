'use strict';

/**
 * Requiring Core Library
 *
 * WARNING: Core modules MUST be included from TOP Level Module.
 * All dependencies for core module must be excluded from the package.json
 */
var DioscouriCore = process.mainModule.require('dioscouri-core');

/**
 * Loader class for the model
 */
class Loader extends DioscouriCore.ModuleBootstrap {
    /**
     * Model loader constructor
     */
    constructor() {
        // We must call super() in child class to have access to 'this' in a constructor
        super();

        /**
         * Module name
         *
         * @type {null}
         * @private
         */
        this._moduleName = 'NodeJS Admin Module';

        /**
         * Module version
         * @type {string}
         * @private
         */
        this._moduleVersion = '0.0.1';
    }

    /**
     * Initializing module configuration
     */
    init() {
        super.init();

        // Loading module routes
        this.applicationFacade.server.loadRoutes('/app/routes', __dirname);

        // Loading models
        this.applicationFacade.loadModels(__dirname + '/app/models');

        // Checking Symbolic links
        var fs = require('fs');
        try {
            if (!fs.existsSync(DioscouriCore.ApplicationFacade.instance.basePath + '/public/admin')) {
                fs.symlinkSync(DioscouriCore.ApplicationFacade.instance.basePath + '/public/admin', __dirname + '/app/public', 'dir');
            }
        } catch (error) {
            console.error('ERROR: Failed to create symbolic links');
            console.error(error.message);
        }
    }

    /**
     * Bootstrapping module
     *
     * MongoDB is available on this stage
     */
    bootstrap() {
        super.bootstrap();
    }

    /**
     * Run module based on configuration settings
     */
    run() {
        super.run();
    }
}

/**
 * Exporting module classes and methods
 */
module.exports = Loader;