'use strict';

/**
 * Requiring base Model
 */
var BaseModel = require('./basemodel.js');

/**
 *  Worker model
 */
class QueueTaskArchiveModel extends BaseModel {
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