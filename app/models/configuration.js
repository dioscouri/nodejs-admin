'use strict';

/**
 * Base model
 */
var BaseModel = require('./base');

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
         * @type {}
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
            project: {
                name: {type: String}
            },
            mandrill: {
                apiKey: {type: String},
                fromName: {type: String},
                fromEmail: {type: String}
            },
            pkgcloud: {
                provider: {type: String},

                /** For "rackspace" provider */
                userName: {type: String},
                apiKey: {type: String},
                region: {type: String},

                /** For "azure" provider */
                azureAccount: {type: String},
                azureAccessKey: {type: String},
                azureStorageType: {type: String, enum: ['fileStorage', 'blobStorage']}
            },
            frontui: {
                requireLogin: {type: Boolean, default: false},
                enableLogin: {type: Boolean, default: true},
                enableRegistration: {type: Boolean, default: true}
            },
            authentication: {
                local: {
                    enabled: {type: Boolean, 'default': true}
                },
                ldap: {
                    enabled: {type: Boolean, 'default': false},
                    url: {type: String},
                    bindDn: {type: String},
                    bindCredentials: {type: String},
                    searchBase: {type: String},
                    searchFilter: {type: String}
                }
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

            if (configuration.length === 0) {
                this._configuration = {};
                console.log('Configuration entry was not found in the Database.');
                return callback(this._configuration);
            }

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
