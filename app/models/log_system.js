'use strict';

/**
 * Requiring base Model
 */
var BaseModel = require('./basemodel.js');

/**
 *  Resources model
 */
class LogSystemModel extends BaseModel {
    /**
     * Model constructor
     */
    constructor(listName) {
        // We must call super() in child class to have access to 'this' in a constructor
        super(listName);
    }

    /**
     * Write a danger log.
     * @param {Object|String} logData - The data to log, or a string log.
     * @param {string} logData.message - Log message.
     * @param {Object} logData.category - Log category.
     */
    danger(logData) {

        if (typeof logData === 'string') {
            logData = {
                message: logData
            }
        }

        this.write({
            priority: 'danger',
            message: logData.message,
            category: logData.category
        })
    }

    /**
     * Write a warning log.
     * @param {Object|String} logData - The data to log, or a string log.
     * @param {string} logData.message - Log message.
     * @param {Object} logData.category - Log category.
     */
    warning(logData) {

        if (typeof logData === 'string') {
            logData = {
                message: logData
            }
        }

        this.write({
            priority: 'warning',
            message: logData.message,
            category: logData.category
        })
    }

    /**
     * Write a info log.
     * @param {Object|String} logData - The data to log, or a string log.
     * @param {string} logData.message - Log message.
     * @param {Object} logData.category - Log category.
     */
    info(logData) {

        if (typeof logData === 'string') {
            logData = {
                message: logData
            }
        }

        this.write({
            priority: 'info',
            message: logData.message,
            category: logData.category
        })
    }

    /**
     * Write a success log.
     * @param {Object|String} logData - The data to log, or a string log.
     * @param {string} logData.message - Log message.
     * @param {Object} logData.category - Log category.
     */
    success(logData) {

        if (typeof logData === 'string') {
            logData = {
                message: logData
            }
        }

        this.write({
            priority: 'success',
            message: logData.message,
            category: logData.category
        })
    }

    /**
     * Write a danger log.
     * @param {Object} logData - The data to log.
     * @param {string} logData.message - Log message.
     * @param {Object} logData.category - Log category.
     * @param {Object} logData.priority - Log priority. Supported values: 'danger', 'warning', 'info', 'success'.
     */
    write(logData) {
        this.insert(logData);
    }
}

/**
 * Creating instance of the model
 */
var modelInstance = new LogSystemModel('log_system');

/**
 * Exporting Model
 *
 * @type {Function}
 */
exports = module.exports = modelInstance;

/**
 * Initializing Schema for model
 */
modelInstance.initSchema('/dbo/log_system.js', __dirname);
