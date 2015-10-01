'use strict';

/**
 * Requiring base Model
 */
var Models            = {};
Models.LogSystemModel = require('../log_system');

// Log System Schema Object
var schemaObject = {
    priority: {type: String, index: true},
    category: {type: String, index: true},
    message: {type: String, index: true},
    createdAt: {type: Date, 'default': Date.now}
};

var option = {
    safe: {
        w: 0
    }
};

/**
 * Creating DBO Schema
 */
var LogSystemModelDBOSchema = Models.LogSystemModel.mongoose.Schema(schemaObject, option);

/**
 * Exporting DBO Schema
 *
 * @type {Function}
 */
exports = module.exports = LogSystemModelDBOSchema;
