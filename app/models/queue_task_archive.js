'use strict';

/**
 * Base model
 */
var BaseModel = require('./base');

/**
 *  Worker model
 */
class QueueTaskArchiveModel extends BaseModel {
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

        var schemaObject = {
            name: String,
            params: Types.Mixed,
            queue: String,
            attempts: Types.Mixed,
            delay: Date,
            priority: Number,
            status: String,
            enqueued: Date,
            dequeued: Date,
            ended: Date,
            result: {}
        };

        // Creating DBO Schema
        var QueueTaskArchiveDBOSchema = this.createSchema(schemaObject);

        // Registering schema and initializing model
        this.registerSchema(QueueTaskArchiveDBOSchema);
    }
}

/**
 * Creating instance of the model
 */
var modelInstance = new QueueTaskArchiveModel('queue_tasks_archive');

/**
 * Exporting Model
 *
 * @type {Function}
 */
exports = module.exports = modelInstance;