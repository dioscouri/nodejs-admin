'use strict';

/**
 * Requiring Core Library
 */
var DioscouriCore = process.mainModule.require('dioscouri-core');

/**
 *  Base model
 */
class BaseModel extends DioscouriCore.MongooseModel {
    /**
     * Model constructor
     */
    constructor(listName) {
        // We must call super() in child class to have access to 'this' in a constructor
        super(listName);

        /**
         * Requiring system logger
         *
         * @type {*|exports|module.exports}
         */
        this._logger = DioscouriCore.Logger;

        try {
            var currentModel = this.model;
        } catch (err) {

            if ('OverwriteModelError' === err.name) {
                return this._logger.log('Model %s is already defined', this._list);
            }

            if ('MissingSchemaError' !== err.name) {
                throw err;
            }

            // Defining current schema
            this.defineSchema();
        }
    }

    /**
     * Define Schema. Must be overriden in descendants.
     *
     * @abstract
     */
    defineSchema() {

    }
}

/**
 * Exporting Model
 *
 * @type {Function}
 */
exports = module.exports = BaseModel;