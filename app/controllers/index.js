'use strict';

/**
 * Requiring Core Library
 */
var DioscouriCore = process.mainModule.require('dioscouri-core');

/**
 * Requiring base Controller
 */
var AdminBaseController = require('./base.js');

/**
 *  AdminIndex controller
 */
class AdminIndex extends AdminBaseController {

    /**
     * Load view file
     *
     * @param dataReadyCallback
     */
    load(dataReadyCallback) {

        // Set page data
        this.data.header = "Admin Dashboard";

        /**
         * Set output view object
         */
        this.view(DioscouriCore.ModuleView.htmlView(this._viewsPath + '/index.swig'));

        // Send DATA_READY event
        dataReadyCallback();
    }

}

/**
 * Exporting Controller
 *
 * @type {Function}
 */
exports = module.exports = function (request, response) {
    var controller = new AdminIndex(request, response);
    controller.run();
};
