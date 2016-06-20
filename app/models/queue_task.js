'use strict';

/**
 * Base model
 */
var BaseModel = require('./base');

/**
 *  Worker model
 */
class QueueTaskModel extends BaseModel {
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
            queue: { type: String, index: true }, // name of the worker
            name: { type: String, index: true }, // name of the method in the worker
            params: { type: Types.Mixed }, // params sent to the worker.method
            attempts: { type: Types.Mixed },
            delay: { type: Date, default: Date.now, index: true },
            priority: { type: Number, default: 1, index: true },
            status: { type: String, default: "queued", index: true },
            enqueued: { type: Date, default: Date.now, index: true },
            dequeued: { type: Date, index: true },
            ended: { type: Date, index: true },
            result: {}
        };

        // Creating DBO Schema
        var QueueTaskDBOSchema = this.createSchema(schemaObject);
        
        QueueTaskDBOSchema.pre('save', function(next){
            var $this = this;
            
            if (!$this.attempts) {
                $this.attempts = {count: 3, delay: 1000 * 60}; // 3 attempts with 1 min delay
            }
            next();
        });

        // Registering schema and initializing model
        this.registerSchema(QueueTaskDBOSchema);
    }
}

/**
 * Creating instance of the model
 */
var modelInstance = new QueueTaskModel('queue_task');

/**
 * Exporting Model
 *
 * @type {Function}
 */
exports = module.exports = modelInstance;
