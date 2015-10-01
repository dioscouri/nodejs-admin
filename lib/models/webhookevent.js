'use strict';

/**
 * Requiring base Model
 */
var BaseModel = require('./basemodel.js');

/**
 *  Webhook Events Model class
 */
class WebhookEventsModel extends BaseModel {
    /**
     * Model constructor
     */
    constructor(listName) {
        // We must call super() in child class to have access to 'this' in a constructor
        super(listName);
    }
}

/**
 * Creating instance of the model
 */
var modelInstance = new WebhookEventsModel('webhookevent');

/**
 * Exporting Model
 *
 * @type {Function}
 */
exports = module.exports = modelInstance;

/**
 * Initializing Schema for model
 */
modelInstance.initSchema('./dbo/webhookevent.js');
