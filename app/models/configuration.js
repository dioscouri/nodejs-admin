'use strict';

/**
 * Requiring base Model
 */
var BaseModel = require('./basemodel.js');

/**
 *  Configuration model class
 */
class ConfigurationModel extends BaseModel {
    /**
     * Model constructor
     */
    constructor(listName) {
        // We must call super() in child class to have access to 'this' in a constructor
        super(listName);

        /**
         * Applocation Configuration
         *
         * @type {Mixed}
         * @private
         */
        this._configuration = null;
    }

    /**
     * Define Schema
     *
     * @override
     */
    defineSchema() {

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

        // Creating DBO Schema
        var ConfigurationDBOSchema = this.createSchema(schemaObject);

        // Registering schema and initializing model
        this.registerSchema(ConfigurationDBOSchema);
    }

    get conf() {
        return this._configuration;
    }

    /**
     * Read configuration from the database
     *
     * @param callback
     */
    readConf(callback) {
        this.model.find({}).exec(function (err, configuration) {
            if (err) return console.log('Unable to get Configuration. ' + err.message);
            if (configuration.length === 0) return console.log('Configuration entry was not found in the Database.');

            this._configuration = configuration[0];
            console.log('#### Configuration loaded');

            if (callback != null) {
                callback(this._configuration);
            }
        }.bind(this));
    }
}

/**
 * Creating instance of the model
 */
var modelInstance = new ConfigurationModel('configuration');

/**
 * Exporting Model
 *
 * @type {Function}
 */
exports = module.exports = modelInstance;