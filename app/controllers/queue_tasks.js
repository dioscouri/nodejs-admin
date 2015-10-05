'use strict';

/**
 * Requiring Core Library
 */
var DioscouriCore = require('dioscouri-core');

/**
 * Requiring base Controller
 */
var AdminBaseCrudController = require('./basecrud.js');

/**
 *  AdminQueueTasks controller
 */
class AdminQueueTasks extends AdminBaseCrudController {

    /**
     * Controller constructor
     */
    constructor (request, response) {
        // We must call super() in child class to have access to 'this' in a constructor
        super(request, response);

        /**
         * Current CRUD model instance
         *
         * @type {MongooseModel}
         * @private
         */
        this._model = require('../../models/queue_task.js');

        /**
         * Context of the controller
         *
         * @type {string}
         * @private
         */
        this._baseUrl = '/admin/queue_task';

        /**
         * Path to controller views
         *
         * @type {string}
         * @private
         */
        this._viewsPath = 'queue_tasks';

        /**
         * Mongoose Searchable fields
         *
         * @type {string[]}
         * @private
         */
        this._modelSearchableFields = ['name', 'status'];
    }

    /**
     * Initializing controller
     *
     * @param callback
     */
    init (callback) {
        super.init(function (err) {
            this.registerAction('process');

            callback();
        }.bind(this));
    }

    /**
     * Extract item from request
     *
     * @param item
     * @returns {{}}
     */
    getItemFromRequest (item) {
        var result = super.getItemFromRequest(item);

        result.workerName = this.request.body.workerName;
        result.commandName = this.request.body.commandName;

        return result;
    }

    /**
     * Custom Loading item for Process action
     *
     * @param readyCallback
     */
    preLoad (readyCallback) {
        super.preLoad(function (err) {
            /**
             * Loading item
             */
            if (this.request.params.action == 'process' && this.request.params.id) {
                var itemId = this.request.params.id;
                this.model.findById(itemId, function(error, item){
                    if (error != null) {
                        this.flash.addMessage("Unable to process task! " + error.message, DioscouriCore.FlashMessageType.ERROR );
                        this.terminate();
                        this.response.redirect(this.getActionUrl('list'));
                        return readyCallback(error);
                    }

                    if (item) {
                        this._item = item;
                    } else {
                        this.terminate();
                        this.response.redirect(this.getActionUrl('list'));
                        this.request.flash('error', "Failed to find Task. Task is not exists in the database!");
                    }
                    readyCallback();
                }.bind(this));
            } else {
                readyCallback();
            }
        }.bind(this));


    }

    /**
     * Custom Initialize create view
     *
     * @param readyCallback
     */
    create (readyCallback) {
        this.data.actionUrl = this.getActionUrl('create');
        this.data.baseUrl = this.getActionUrl('list');
        if (this.request.method == 'GET') {
            this.view(DioscouriCore.View.htmlView(this.getViewFilename('create')));
            readyCallback();
        } else {
            this.data.actionUrl = this.getActionUrl('create');
            var itemDetails = this.getItemFromRequest({});

            console.log(itemDetails);

            try {
                // Try to create new queue task using existing Queue instance
                this.queue.enqueue({
                    workerName: itemDetails.workerName,
                    commandName: itemDetails.commandName
                });

                this.flash.addMessage("New Task successfully created!", DioscouriCore.FlashMessageType.SUCCESS );
                this.terminate();
                this.response.redirect(this.getActionUrl('list'));
                readyCallback();
            } catch (err) {
                this.flash.addMessage(err.message, DioscouriCore.FlashMessageType.ERROR );
                this.data.item = itemDetails;
                this.view(DioscouriCore.View.htmlView(this.getViewFilename('create')));
                return readyCallback();
            }
        }
    }

    process (readyCallback) {
        this.data.actionUrl = this.getActionUrl('create');
        this.data.baseUrl = this.getActionUrl('list');

        if (this.request.method == 'GET') {

            this.item.delay = new Date();
            this.item.status = 'queued';  // Set task as pending

            this.item.save(function (error, item) {
                if (error != null) {
                    this.flash.addMessage("Failed to process item! " + error.message, DioscouriCore.FlashMessageType.ERROR);
                    this.terminate();
                    this.response.redirect(this.getActionUrl('list'));

                    return readyCallback(error);
                }

                this.flash.addMessage("Task has been queued.", DioscouriCore.FlashMessageType.SUCCESS);
                this.terminate();
                this.response.redirect(this.getActionUrl('list'));

                // Send DATA_READY event
                readyCallback();
            }.bind(this));
        }
    }
};

/**
 * Exporting Controller
 *
 * @type {Function}
 */
exports = module.exports = function(request, response) {
    var controller = new AdminQueueTasks(request, response);
    controller.run();
};
