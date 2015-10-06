'use strict';

/**
 * Base model
 */
var BaseModel = require('./base');

/**
 * Merge module
 * @type {*|exports|module.exports}
 */
var merge = require('merge');

/**
 *  Resources model
 */
class LogAuditModel extends BaseModel {
    /**
     * Model constructor
     */
    constructor(listName) {
        // We must call super() in child class to have access to 'this' in a constructor
        super(listName);
    }

    /**
     * Define Schema
     *
     * @override
     */
    defineSchema() {

        var Types = this.mongoose.Schema.Types;

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
        }; // TODO: Extend

        // Creating DBO Schema
        var LogAuditDBOSchema = this.createSchema(schemaObject);

        // Registering schema and initializing model
        this.registerSchema(LogAuditDBOSchema);
    }

    /**
     * @param {Object} rawData - The data to log.
     * @param {string} rawData.resource - Name of affected resource.
     * @param {Object} rawData.resourceId - Affected resource ID.
     * @param {Object} [rawData.diff] - Difference, JSON object.
     * @param {string} rawData.message - Text message.
     * @param {Object} rawData.userId - User ID who made the change.
     */
    writeRaw(rawData) {
        this.insert(rawData, function(){}); // TODO: Remove extra argument
    }

    /**
     * @param {Object} logData - The data to log.
     * @param {string} logData.resource - Name of affected resource.
     * @param {Object} logData.item - Affected instance.
     * @param {Object} [logData.oldItem] - Affected old instance.
     * @param {Object} [logData.created] - Flag, item was created.
     * @param {Object} [logData.modified] - Flag, item was modified.
     * @param {Object} [logData.removed] - Flag, item was removed.
     * @param {Object} [logData.userId] - User ID who made the change.
     * @param {function} [callback] - Callback function.
     */
    traceModelChange(logData, callback) {

        if (typeof callback === 'undefined') callback = function () {
        };

        var rawData = {
            resource: logData.resource,
            resourceId: logData.item._id,
            userId: logData.userId
        };

        if (logData.created) {

            this.writeRaw(merge(rawData, {
                message: logData.item.name ? logData.item.name + ' was created.' : logData.resource + ' was created.'
            }));

            return callback();
        }

        if (logData.modified) {

            var diff = [];

            for (var k in logData.item) {
                if (logData.item.hasOwnProperty(k) && k !== 'last_modified_by') {
                    if (JSON.stringify(logData.item[k]) !== JSON.stringify(logData.oldItem[k])) {
                        diff.push({
                            name: k,
                            from: logData.oldItem[k],
                            to: logData.item[k]
                        });
                    }
                }
            }

            this.writeRaw(merge(rawData, {
                message: logData.oldItem.name ? logData.oldItem.name + ' was modified.' : logData.resource + ' was modified.',
                diff: JSON.stringify(diff)
            }));

            callback();
        }

        if (logData.removed) {

            this.writeRaw(merge(rawData, {
                message: logData.item.name ? logData.item.name + ' was removed.' : logData.resource + ' was removed.'
            }));

            return callback();
        }
    }
}

/**
 * Creating instance of the model
 */
var modelInstance = new LogAuditModel('log_audit');

/**
 * Exporting Model
 *
 * @type {Function}
 */
exports = module.exports = modelInstance;
