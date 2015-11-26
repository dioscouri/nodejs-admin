'use strict';

/**
 * Requiring lodash lib
 */
var _ = require('lodash');

/**
 * Requiring core Path module
 */
var path = require('path');

/**
 * Requiring Core Library
 */
var DioscouriCore = process.mainModule.require('dioscouri-core');

/**
 * Excel parse library
 *
 * @type {excelParser|exports|module.exports}
 */
var excelParser = require('excel-parser');

/**
 * Library for parse file uploads
 *
 * @type {exports|module.exports}
 */
var multiparty = require('multiparty');

/**
 * Async library
 *
 * @type {async|exports|module.exports}
 */
var async = require('async');

/**
 * Object managing library
 * @type {*|exports|module.exports}
 */
var objectPath = require('object-path');

/**
 * Excel library
 *
 * @type {CFB|exports|module.exports}
 */
var XLSX = require('xlsx');

/**
 * Secured Controller
 *
 * @type {*|exports|module.exports}
 */
var SecuredController = require('./securedcontroller.js');

/**
 *  Admin base CRUD controller
 */
class BaseCRUDController extends DioscouriCore.Controllers.CRUDController {

    /**
     * Controller constructor
     */
    constructor(request, response) {
        // We must call super() in child class to have access to 'this' in a constructor
        super(request, response);

        /**
         * Current CRUD model instance
         *
         * @type {MongooseModel}
         * @private
         */
        this._model = null;

        /**
         * Mongoose Population fields
         * url: {@link http://mongoosejs.com/docs/populate.html|Mongoose Doc}
         *
         * @type {string}
         * @private
         */
        this._modelPopulateFields = '';

        /**
         * Mongoose Searchable fields
         *
         * @type {string}
         * @private
         */
        this._modelSearchableFields = [];

        /**
         * Current Item from the Database
         *
         * @type {}
         * @private
         */
        this._item = null;

        /**
         * Context of the controller
         *
         * @type {string}
         * @private
         */
        this._baseUrl = '/admin/index';

        /**
         * Path to basic views
         *
         * @type {string}
         * @private
         */
        this._viewsPath = 'index';

        /**
         * Path to UI templates
         *
         * @type {string}
         * @private
         */
        this._baseViewsDir = path.join(__dirname, '..', 'views', 'admin', '');
    }

    /**
     * Pre-initialize data and event handlers
     */
    preInit(callback) {

        this.data.navigation = require('../models/navigation.js').navigation;
        this.data.originalUrl = this.request.originalUrl;

        if (!this.isAuthenticated()) {
            this.request.session.returnUrl = this.request.protocol + '://' + this.request.get('host') + this.request.originalUrl;
            this.flash.addMessage("You must be logged in to access Admin UI!", DioscouriCore.FlashMessageType.ERROR);
            this.terminate();
            this.response.redirect('/login');

            callback();
        } else if (!this.isAdminUser()) {

            this.flash.addMessage("You must be administrator to access Admin UI!", DioscouriCore.FlashMessageType.ERROR);
            this.terminate();
            this.response.redirect('/');

            callback();
        } else {
            this.data.loggedUser = this.request.user;

            callback();
        }
    }

    /**
     * Initialize data and event handlers
     */
    init(callback) {
        this.registerAction('audit', 'doAudit');

        super.init(callback);
    }

    /**
     * Returns url for action
     *
     * @param action
     * @param item
     */
    getActionUrl(action, item) {
        var result = this._baseUrl;

        switch (action) {
            case 'audit':
                result += '/' + item.id.toString() + '/' + action;
                break;
            default:
                result = super.getActionUrl(action, item);
                break;
        }

        return result;
    }

    /**
     * Show Audit logs
     *
     * @param readyCallback
     */
    doAudit(readyCallback) {

        var filters    = this.getViewFilters();
        var pagination = this.getViewPagination();
        var sorting    = this.getViewSorting();

        filters.inField = [{
            fieldName: 'resource',
            fieldValue:  this.model._list
        }, {
            fieldName: 'resourceId',
            fieldValue:  this.itemId
        }];

        // Use Audit model
        this._model = require('../models/log_audit');

        this.model.getListFiltered(filters, '', pagination, sorting, function (error, data) {
            if (error != null) {
                return readyCallback(error);
            }

            // Set page data
            if (data != null) {
                for (var key in data) {
                    if (data.hasOwnProperty(key)) {
                        this.data[key] = data[key];
                    }
                }
            }

            /**
             * Used in sorting() macro in SWIG
             */
            this.data.filter                  = {sorting: sorting};
            this.data.filter.sorting.basePath = pagination.basePath = this.data.baseUrl = this._baseUrl + '/' + this.itemId + '/audit';

            this.data.viewActionUrl = this.getActionUrl('view', {id: this.itemId});

            /**
             * Set output view object
             */
            this.view(DioscouriCore.ModuleView.htmlView(this.getViewFilename('audit'), this.data, error));

            // Send DATA_READY event
            readyCallback();
        }.bind(this));
    }
}

/**
 * Exporting Controller
 *
 * @type {Function}
 */
exports = module.exports = BaseCRUDController;
