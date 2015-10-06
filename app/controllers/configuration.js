'use strict';

/**
 * Requiring base Controller
 */
var AdminBaseCrudController = require('./basecrud.js');

/**
 *  AdminConfiguration controller
 */
class AdminConfiguration extends AdminBaseCrudController {

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
        this._model = require('../models/configuration.js');

        /**
         * Context of the controller
         *
         * @type {string}
         * @private
         */
        this._baseUrl = '/admin/configuration';

        /**
         * Path to controller views
         *
         * @type {string}
         * @private
         */
        this._viewsPath = 'configuration';
    }

    /**
     * Extract item from request
     *
     * @param item
     * @returns {{}}
     */
    getItemFromRequest(item) {
        var result = super.getItemFromRequest(item);

        result.mandrill = {
            apiKey: this.request.body.mandrillApiKey,
            fromName: this.request.body.mandrillFromName,
            fromEmail: this.request.body.mandrillFromEmail
        };

        result.pkgcloud = {
            provider: this.request.body.pkgcloudProvider,
            apiKey: this.request.body.pkgcloudApiKey,
            userName: this.request.body.pkgcloudUserName,
            region: this.request.body.pkgcloudRegion
        };

        return result;
    }

    load(readyCallback) {
        super.load(function (err) {
            if (err) return readyCallback(err);

            this.terminate();

            if (this.data.items.length === 0) {
                this.response.redirect(this.getActionUrl('create'));
            } else {
                this.response.redirect(this.getActionUrl('edit', this.data.items[0]));
            }
        }.bind(this));
    }
}

/**
 * Exporting Controller
 *
 * @type {Function}
 */
exports = module.exports = function (request, response) {
    var controller = new AdminConfiguration(request, response);
    controller.run();
};