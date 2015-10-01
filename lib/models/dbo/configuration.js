'use strict';

/**
 * Requiring base Model
 */
var Models                = {};
Models.ConfigurationModel = require('../configuration.js');
var Types                 = Models.ConfigurationModel.mongoose.Schema.Types;

// Notification Schema Object
var schemaObject = {
    mandrill: {
        apiKey: {type: String},
        fromName: {type: String},
        fromEmail: {type: String}
    },
    pkgcloud: {
        provider: {type: String},
        userName: {type: String},
        apiKey: {type: String},
        region: {type: String}
    }
};

/**
 * Creating DBO Schema
 */
var ConfigurationDBOSchema = Models.ConfigurationModel.createSchema(schemaObject);

/**
 * Exporting DBO Schema
 *
 * @type {Function}
 */
exports = module.exports = ConfigurationDBOSchema;
