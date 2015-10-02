'use strict';

/**
 * Requiring base Model
 */
var Models           = {};
Models.LogAuditModel = require('../log_audit');
var Types            = Models.LogAuditModel.mongoose.Schema.Types;

// Log System Schema Object
var schemaObject = {
    resource: {type: String, index: true},
    resourceId: {type: Types.ObjectId},
    diff: {type: [Types.Mixed]},
    message: {type: String},
    userId: {type: Types.ObjectId},
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
var LogAuditModelDBOSchema = Models.LogAuditModel.mongoose.Schema(schemaObject, option);

/**
 * Exporting DBO Schema
 *
 * @type {Function}
 */
exports = module.exports = LogAuditModelDBOSchema;
