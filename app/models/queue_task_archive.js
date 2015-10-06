'use strict';

/**
 * Requiring Core Library
 */
var DioscouriCore = require('dioscouri-core');

/**
 *  Worker model
 */
class QueueTaskArchiveModel extends DioscouriCore.MongooseModel {
    /**
     * Model constructor
     */
    constructor (listName) {
        // We must call super() in child class to have access to 'this' in a constructor
        super(listName);
    }
}

/**
 * Creating instance of the model
 */
var modelInstance = new QueueTaskArchiveModel('queue_tasks_archive');

/**
 * Exporting Model
 *
 * @type {Function}
 */
exports = module.exports = modelInstance;