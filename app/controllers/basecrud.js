'use strict';

/**
 * Requiring core Path module
 */
var path = require('path');

/**
 * Requiring Core Library
 */
var DioscouriCore = process.mainModule.require('dioscouri-core');

/**
 *  Admin base CRUD controller
 */
class BaseCRUDController extends DioscouriCore.Controller {

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
     * Current model for CRUD
     *
     * @returns {MongooseModel}
     */
    get model() {
        return this._model;
    }

    /**
     * Current model populate fields
     * @returns {string}
     */
    get modelPopulateFields() {
        return this._modelPopulateFields;
    }

    /**
     * Current model populate fields
     * @returns {string}
     */
    get modelSearchableFields() {
        return this._modelSearchableFields;
    }

    /**
     * Current item for CRUD
     *
     * @returns {{}}
     */
    get item() {
        return this._item;
    }

    /**
     * Pre-initialize data and event handlers
     */
    preInit(callback) {
        if (!this.isAuthenticated()) {
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
            callback();
        }
    }

    /**
     * Initialize data and event handlers
     */
    init(callback) {
        this.registerAction('list', 'load');
        this.registerAction('create', 'create');
        this.registerAction('doCreate', 'doCreate');
        this.registerAction('edit', 'edit');
        this.registerAction('doEdit', 'doEdit');
        this.registerAction('delete', 'doDelete');
        this.registerAction('doDelete', 'doDelete');

        callback();
    }

    /**
     * Returns view filters
     *
     * @returns {{}}
     */
    getViewFilters() {
        return {
            search: {
                searchFields: this.modelSearchableFields,
                searchValue: this.getViewSearchValue(),
                basePath: this.getActionUrl('list')
            }
        };
    }

    /**
     * Returns view pagination
     *
     * @returns {{}}
     */
    getViewPageCurrent() {
        if (this.request.params && this.request.params.page) {
            return parseInt(this.request.params.page, 10);
        }
        return 1;
    }

    /**
     * Returns view page size
     *
     * @returns {{}}
     */
    getViewPageSize() {
        var defaultPageSize = 10;
        //var cacheObj = this.request.query.filter;
        var cacheObj = this.request.session;
        if (cacheObj && cacheObj.pageSize != null) {
            return parseInt(cacheObj.pageSize, defaultPageSize);
        } else {
            return defaultPageSize;
        }
    }

    /**
     * Returns view pagination object
     *
     * @returns {{}}
     */
    getViewPagination() {
        return {
            currentPage: this.getViewPageCurrent(),
            pageSize: this.getViewPageSize(),
            basePath: this.getActionUrl('list')
        };
    }

    /**
     * Returns view sorting options
     *
     * @returns {{}}
     */
    getViewSorting() {
        //var sorting = {};
        //var cacheObj = this.request.query.filter;
        //if (cacheObj && cacheObj.sortingField && cacheObj.sortingOrder) {
        //    sorting = {
        //        field: cacheObj.sortingField,
        //        order: cacheObj.sortingOrder,
        //        basePath: this.getActionUrl('list')
        //    };
        //}
        //return sorting;
        var sorting = this.request.session.sorting || {};
        return sorting[this._baseUrl] || {};
    }

    /**
     * Returns view sorting options
     *
     * @returns {{}}
     */
    getViewSearchValue() {
        var cacheObj = this.request.query.filter;
        if (cacheObj && cacheObj.search)
            return cacheObj.search;
        else
            return null;
    }

    /**
     * Returns file name for view
     *
     * @param viewType types: list, edit, create
     * @returns {{}}
     */
    getViewFilename(viewType) {
        var result = path.join(this._baseViewsDir || '', this._viewsPath || '', viewType + '.swig');
        console.log('result: ' + result);
        return result;
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
            case 'create':
                result += '/' + action;
                break;
            case 'edit':
            case 'doEdit':
            case 'delete':
                result += '/' + item.id.toString() + '/' + action;
                break;
            case 'list':
            default:
                result += 's';
                break;
        }

        return result;
    }

    /**
     * Loading item for edit actions
     *
     * @param readyCallback
     */
    preLoad(readyCallback) {
        var query = this.request.query;

        /**
         * Handle GET request with query setPageSize
         */
        if (this.request.method == 'GET' && query.filter && query.filter.pageSize) {
            this.request.session.pageSize = parseInt(query.filter.pageSize, 10);
        }

        /**
         * Handle GET request with query sortingField and sortingOrder
         */
        if (this.request.method == 'GET' && query.filter && query.filter.sortingField && query.filter.sortingOrder) {
            this.request.session.sorting                = this.request.session.sorting || {};
            this.request.session.sorting[this._baseUrl] = {
                field: query.filter.sortingField,
                order: query.filter.sortingOrder,
                basePath: this.getActionUrl('list')
            };
        }

        /**
         * Loading item
         */
        if (this.request.params.action == 'edit' || this.request.params.action == 'doEdit') {
            var itemId = this.request.params.id;
            this.model.findById(itemId, function (error, item) {
                if (error != null) {
                    this.flash.addMessage("Failed to edit item! " + error.message, DioscouriCore.FlashMessageType.ERROR);
                    this.terminate();
                    this.response.redirect(this.getActionUrl('list'));

                    return readyCallback(error);
                }

                // Send remove item statuses
                if (item != null) {
                    this._item = item;
                } else {
                    // Terminating page
                    this.terminate();
                    this.response.redirect(this.getActionUrl('list'));
                    this.request.flash('error', "Failed to edit Item. Item is not exists in the database!");
                }

                // Send DATA_READY event
                readyCallback();
            }.bind(this));
        } else {
            readyCallback();
        }
    }

    /**
     * Initialize list view
     *
     * @param readyCallback
     */
    load(readyCallback) {
        var filters     = this.getViewFilters();
        var populations = this.modelPopulateFields;
        var pagination  = this.getViewPagination();
        var sorting     = this.getViewSorting();

        this.model.getListFiltered(filters, populations, pagination, sorting, function (error, items) {
            if (error != null) {
                return readyCallback(error);
            }

            // Set page data
            this.data.items     = items;
            this.data.createUrl = this.getActionUrl('create');
            this.data.baseUrl   = this._baseUrl;

            /**
             * Set output view object
             */
            this.view(DioscouriCore.ModuleView.htmlView(this.getViewFilename('list'), this.data, error));

            // Send DATA_READY event
            readyCallback();
        }.bind(this));
    }

    /**
     * Validate item and returns list of validation errors
     *
     * @param item
     * @returns {Array}
     */
    validateItem(item, validationCallback) {
        validationCallback(null, null);
    }

    /**
     * Extract item from request
     *
     * @param item
     * @returns {{}}
     */
    getItemFromRequest(item) {
        var result = item != null ? item : {};

        for (var key in this.request.body) {
            result[key] = this.request.body[key];
        }

        return result;
    }

    /**
     * Initialize create view
     *
     * @param readyCallback
     */
    create(readyCallback) {

        this.data.actionUrl = this.getActionUrl('create');
        if (this.request.method == 'GET') {
            this.view(DioscouriCore.ModuleView.htmlView(this.getViewFilename('create')));
            readyCallback();
        } else {
            this.data.actionUrl = this.getActionUrl('create');
            var itemDetails     = this.getItemFromRequest({});
            this.model.validate(itemDetails, function (error, validationMessages) {
                if (error == null) {
                    this._logger.debug('Inserting new item to the database');
                    itemDetails.last_modified_by = this.request.user._id;
                    this.model.insert(itemDetails, function (error, item) {
                        if (error != null) {
                            this.flash.addMessage("Failed to save item! " + error.message, DioscouriCore.FlashMessageType.ERROR);
                            this.terminate();
                            this.response.redirect(this.getActionUrl('list'));

                            return readyCallback(error);
                        }

                        this.onItemHasBeenInserted();

                        // Send DATA_READY event
                        readyCallback();
                    }.bind(this));
                } else {
                    var validationErrors = (error.messages != null) ? error.messages : validationMessages;
                    this.flash.addMessage(validationErrors.join('<br />'), DioscouriCore.FlashMessageType.ERROR);
                    this.data.item       = itemDetails;
                    this.view(DioscouriCore.ModuleView.htmlView(this.getViewFilename('create')));
                    readyCallback();
                }
            }.bind(this));
        }

    }

    onItemHasBeenInserted() {
        this.flash.addMessage("Item successfully inserted to the database!", DioscouriCore.FlashMessageType.SUCCESS);
        this.terminate();
        this.response.redirect(this.getActionUrl('list'));
    }

    /**
     * Initialize edit view
     *
     * @param readyCallback
     */
    edit(readyCallback) {
        this.data.isEditMode = true;
        this.data.actionUrl  = this.getActionUrl('edit', this.item);
        this.data.item       = this.item;
        if (this.request.method == 'GET') {
            this.view(DioscouriCore.ModuleView.htmlView(this.getViewFilename('edit')));
            readyCallback();
        } else {
            var itemDetails = this.getItemFromRequest(this.item);
            this.model.validate(itemDetails, function (error, validationMessages) {
                if (error == null) {
                    itemDetails.last_modified_by = this.request.user._id;
                    itemDetails                  = this.beforeSave(itemDetails);
                    itemDetails.save(function (error, item) {
                        if (error != null) {
                            this.flash.addMessage("Failed to save item! " + error.message, DioscouriCore.FlashMessageType.ERROR);
                            this.terminate();
                            this.response.redirect(this.getActionUrl('list'));

                            return readyCallback(error);
                        }

                        this.onItemHasBeenSaved();

                        // Send DATA_READY event
                        readyCallback();
                    }.bind(this));
                } else {
                    var validationErrors = (error.messages != null) ? error.messages : validationMessages;
                    this.flash.addMessage(validationErrors.join('<br />'), DioscouriCore.FlashMessageType.ERROR);
                    this.data.item       = itemDetails;
                    this.view(DioscouriCore.ModuleView.htmlView(this.getViewFilename('edit')));
                    readyCallback();
                }
            }.bind(this));
        }
    }

    beforeSave(item) {
        return item;
    }

    onItemHasBeenSaved() {
        this.flash.addMessage("Item successfully updated in the database!", DioscouriCore.FlashMessageType.SUCCESS);
        this.terminate();
        this.response.redirect(this.getActionUrl('list'));
    }

    /**
     * Proceed with Delete operation
     *
     * @param readyCallback
     */
    doDelete(readyCallback) {
        var itemId = this.request.params.id;
        this.model.removeById(itemId, this.request.user._id, function (error, item) {
            if (error != null) {
                this.flash.addMessage("Failed to delete item! " + error.message, DioscouriCore.FlashMessageType.ERROR);
                this.terminate();
                this.response.redirect(this.getActionUrl('list'));

                return readyCallback(error);
            }

            // Send remove item statuses
            if (item != null) {
                this.flash.addMessage("Item successfully removed from the database!", DioscouriCore.FlashMessageType.SUCCESS);
            } else {
                this.flash.addMessage("Failed to delete Item. Item is not exists in the database!", DioscouriCore.FlashMessageType.ERROR);
            }

            // Terminating page
            this.terminate();
            this.response.redirect(this.getActionUrl('list'));

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
