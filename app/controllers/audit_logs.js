'use strict';

/**
 * Requiring base Controller
 */
var AdminBaseCrudController = require('./basecrud.js');

/**
 * Async library
 */
const async = require('async');

/**
 *  AdminLogSystem controller
 */
class AdminLogAudit extends AdminBaseCrudController {

    /**
     * Controller constructor
     */
    constructor(request, response) {
        // We must call super() in child class to have access to 'this' in a constructor
        super(request, response);

        /**
         * Current CRUD model instance
         *
         * @type {*}
         * @private
         */
        this._model = require('../models/log_audit.js');

        /**
         * Context of the controller
         *
         * @type {string}
         * @private
         */
        this._baseUrl = '/admin/audit_logs';

        /**
         * Path to controller views
         *
         * @type {string}
         * @private
         */
        this._viewsPath = 'log_audit';
    }

    load(readyCallback) {

        async.series([callback => {

            super.load(callback);

        }, callback => {

            this.loadFiltersData(callback);

        }], readyCallback);
    }

    loadFiltersData(callback) {

        async.series([callback => {

            this.loadResources(callback);

        }], callback);
    }

    loadResources(callback) {

        this.model.model.distinct('resource', (err, resources) => {
            if (err) return callback(err);

            this.data.filtersData = this.data.filtersData ? this.data.filtersData : {};

            this.data.filtersData.resources = resources;

            callback();
        });
    }
}

/**
 * Exporting Controller
 *
 * @type {Function}
 */
exports = module.exports = function (request, response) {
    var controller = new AdminLogAudit(request, response);
    controller.run();
};
