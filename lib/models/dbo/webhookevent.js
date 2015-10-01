'use strict';

/**
 * Requiring base Model
 */
var Models                = {};
Models.WebhookEventsModel = require('../webhookevent.js');

// WebhookEvent Schema Object
var schemaObject = {
    name: {type: String, unique: true, required: true},
    key: {type: String, unique: true, required: true},
    description: String
};

/**
 * Creating DBO Schema
 */
var WebhookEventsDBOSchema = Models.WebhookEventsModel.createSchema(schemaObject);

/**
 * Exporting DBO Schema
 *
 * @type {Function}
 */
exports = module.exports = WebhookEventsDBOSchema;
