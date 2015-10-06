'use strict';

/**
 * Requiring Core Library
 */
var DioscouriCore = require('dioscouri-core');

/**
 *  Worker model
 */
class QueueTaskModel extends DioscouriCore.MongooseModel {
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
var modelInstance = new QueueTaskModel('queue_task');

/**
 * Exporting Model
 *
 * @type {Function}
 */
exports = module.exports = modelInstance;