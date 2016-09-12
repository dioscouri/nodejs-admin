'use strict';

/**
 * Requiring Core Library
 */
var DioscouriCore = process.mainModule.require('dioscouri-core');

/**
 * Requiring base Controller
 */
var AdminBaseCrudController = require('./basecrud.js');

// Loading Async helpers
var async = require('async');

/**
 *  AdminAclPermissions controller
 */
class AdminAclPermissions extends AdminBaseCrudController {

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
        this._model = require('../models/acl_permissions.js');

        /**
         * Context of the controller
         *
         * @type {string}
         * @private
         */
        this._baseUrl = '/admin/acl_permissions';

        /**
         * Path to controller views
         *
         * @type {string}
         * @private
         */
        this._viewsPath = 'acl_permission';
        
        this.registerAction('create-ajax', 'doCreateAjax');
        this.registerAction('delete-ajax', 'doDeleteAjax');
    }

    load(readyCallback) {
        super.load(function (err) {
            if (err) return readyCallback(err);

            async.parallel([function (callback) {
                // TODO: Maybe we can improve this to not use try-catch
                try {
                    DioscouriCore.ApplicationFacade.instance.registry.load('Application.Models.ACLResources').getAll(function (err, resources) {
                        if (err) return callback();

                        this.data.resources = resources;

                        callback();
                    }.bind(this));
                } catch (ex) {
                    console.error(ex);
                    this.data.resources = [];
                    callback();
                }
            }.bind(this), function (callback) {

                require('../models/acl_roles.js').getAll(function (err, roles) {
                    if (err) return callback();

                    this.data.roles = roles;

                    callback();
                }.bind(this));

            }.bind(this)], readyCallback);
        }.bind(this));
    }

    /**
     * Returns view pagination object
     * @override
     * @returns {{}}
     */
    getViewPagination() {
        return {
            currentPage: 1,
            pageSize: 999,
            basePath: this.getActionUrl('list')
        };
    }

    /**
     * Extract item from request
     *
     * @param item
     * @returns {{}}
     */
    getItemFromRequest(item) {
        var result = super.getItemFromRequest(item);

        result.aclRole     = this.request.body.aclRole;
        result.aclResource = this.request.body.aclResource;
        result.actionRame  = this.request.body.actionRame;

        return result;
    }

    /**
     * Proceed Create action
     *
     * @param readyCallback
     */
    doCreateAjax(readyCallback) {
        this.data.actionUrl = this.getActionUrl('create');
        var itemDetails     = this.getItemFromRequest({});
        this.itemDetails = itemDetails;
        
        this.view(this.getViewClassDefinition().jsonView());
        this.data = {};
        
        async.series([
                asyncCallback => {
                    this.model.validate(itemDetails, function (error, validationMessages) {
                        if (error != null) {
                            var validationErrors = (error.messages != null) ? error.messages : validationMessages;
                            this.data.item       = itemDetails;
                            
                            this.data.error = true;
                            this.data.errorMessage = "Failed to save item! " + error.message;

                            error.isValidationFailed = true;
                        }

                        asyncCallback(error);
                    }.bind(this));
                },
                asyncCallback => {
                    // Run before Create item
                    this.onBeforeCreate(asyncCallback);
                },
                asyncCallback => {
                    // Run main create code
                    this._logger.debug('Inserting new item to the database');
                    itemDetails.last_modified_by = this.request.user._id;
                    // Emitting ITEM_BEFORE_INSERT event
                    this.emit(AdminBaseCrudController.CRUDEvents.ITEM_BEFORE_INSERT, {item: itemDetails});
                    this.model.insert(itemDetails, function (error, item) {
                        if (error != null) {
                            this.data.error = true;
                            this.data.errorMessage = "Failed to save item! " + error.message;
                            this.terminate();
                            //this.response.redirect(this.getActionUrl('list'));

                            return asyncCallback(error);
                        }

                        // Set current item as newly inserted item
                        this.itemDetails = item;

                        this.data.item = item;

                        // Send DATA_READY event
                        asyncCallback();
                    }.bind(this));
                },
                asyncCallback => {
                    // Run after Create item
                    this.onAfterCreate(asyncCallback);
                }
            ], (error) => {
                
                if (error != null && error.isValidationFailed) {
                    readyCallback();
                }  else {
                    readyCallback(error);
                }
            }
        );
    }
    
    /**
     * Proceed with Delete operation
     *
     * @param readyCallback
     */
    doDeleteAjax(readyCallback) {
        this.view(this.getViewClassDefinition().jsonView());
        this.data = {};
        
        this.model.removeById(this.itemId, this.request.user._id, function (error, item) {

            // Emitting event
            this.emit(AdminBaseCrudController.CRUDEvents.ITEM_DELETE, {item: item});

            if (error != null) {
                this.data.error = true;
                this.data.errorMessage = "Failed to delete item! " + error.message;
                this.terminate();

                return readyCallback(error);
            }

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
exports = module.exports = function (request, response) {
    var controller = new AdminAclPermissions(request, response);
    controller.run();
};
