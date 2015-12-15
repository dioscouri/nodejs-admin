// Using STRICT mode for ES6 features
"use strict";

/**
 * Requiring Core Library
 */
var DioscouriCore = process.mainModule.require('dioscouri-core');

/**
 * Requiring base Model
 */
var BaseModel = require('./base.js');

/**
 *  Client model class
 */
class AssetModel extends BaseModel {
    /**
     * Model constructor
     */
    constructor (listName) {
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

        // User Schema Object
        var schemaObject = {
            name: {type: String, unique: true},
            assetType: {type: String, index: true},
            fileName: {type: String, index: true, required: true},
            cdnUrl: {type: String, index: true}
        };

        /**
         * Creating DBO Schema
         */
        var AssetDBOSchema = this.createSchema(schemaObject);

        AssetDBOSchema.post('remove', function () {
            /**
             * Remove from pkgcloud cloud
             */
            var client = new DioscouriCore.PkgClient();

            client.client.removeFile('assets', this.fileName, function(err) {
                if (err) console.log(err.stack);
            });
        });

        // Registering schema and initializing model
        this.registerSchema(AssetDBOSchema);
    }
}

/**
 * Creating instance of the model
 */
var modelInstance = new AssetModel('asset');

/**
 * Exporting Model
 *
 * @type {Function}
 */
exports = module.exports = modelInstance;