'use strict';

/**
 * Requiring Core Library
 */
var DioscouriCore = require('dioscouri-core');

/**
 * Requiring base Model
 */
var BaseModel = require('./basemodel.js');

/**
 *  Client model class
 */
class WebhookModel extends BaseModel {
    /**
     * Model constructor
     */
    constructor(listName) {
        // We must call super() in child class to have access to 'this' in a constructor
        super(listName);
    }

    /**
     * Validating item before save
     *
     * @param item
     * @param validationCallback
     * @returns {[]}
     */
    validate(item, validationCallback) {
        var validationMessages = [];


        if (!item.clientId) {
            validationMessages.push('Client cannot be empty');
        }

        if (!item.clientUserId) {
            validationMessages.push('User cannot be empty');
        }

        if (!item.webhookEventId) {
            validationMessages.push('Webhook event cannot be empty');
        }

        if (!item.url) {
            validationMessages.push('Webhook URL cannot be empty');
        }

        validationCallback(DioscouriCore.ValidationError.create(validationMessages));
    }
}

/**
 * Creating instance of the model
 */
var modelInstance = new WebhookModel('webhook');

/**
 * Exporting Model
 *
 * @type {Function}
 */
exports = module.exports = modelInstance;

/**
 * Initializing Schema for model
 */
modelInstance.initSchema('./dbo/webhook.js');
