'use strict';

/**
 * Requiring base Model
 */
var Models          = {};
Models.WebhookModel = require('../webhook.js');
var Types           = Models.WebhookModel.mongoose.Schema.Types;

// Webhook Schema Object
var schemaObject = {
    clientId: {type: Types.ObjectId, ref: 'client'},
    clientUserId: {type: Types.ObjectId, ref: 'user'},
    webhookEventId: {type: Types.ObjectId, ref: 'webhookevent'},
    url: {type: String, required: true},
    updatedAt: {type: Date, 'default': Date.now},
    createdAt: {type: Date, 'default': Date.now}
};

/**
 * Creating DBO Schema
 */
var WebhookDBOSchema = Models.WebhookModel.createSchema(schemaObject);

/**
 * Exporting DBO Schema
 *
 * @type {Function}
 */
exports = module.exports = WebhookDBOSchema;
