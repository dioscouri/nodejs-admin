'use strict';

/**
 * Requiring Core Library
 */
var DioscouriCore = require('dioscouri-core');

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

        // Defining current schema
        this.defineSchema();
    }

    /**
     * Define Schema. Must be overriden in descendants.
     *
     * @abstract
     */
    defineSchema() {
        ;
    }

    /**
     * Enabling audit logs
     */
    enableAudit() {

        var $this = this;

        /**
         * Instance of Audit log model
         */
        this.logAudit = require('./log_audit');

        /**
         * Save old item to trace
         */
        this._schema.pre('save', function (next) {

            if (this.isNew) {
                return next();
            }

            $this.model.findById(this._id, function (err, item) {
                if (err) return next(err);

                this.oldItem = item.toObject();
                next();

            }.bind(this));
        });

        /**
         * Add trace on `create` and `modify`.
         */
        this._schema.post('save', function (item) {
            if (this.oldItem) {
                $this.logAudit.traceModelChange({
                    modified: true,
                    resource: $this._list,
                    item: item.toObject(),
                    oldItem: this.oldItem,
                    userId: item.last_modified_by
                });
            } else {
                $this.logAudit.traceModelChange({
                    created: true,
                    resource: $this._list,
                    item: item.toObject(),
                    userId: item.last_modified_by
                });
            }
        });

        /**
         * Add trace on `remove`.
         */
        this._schema.post('remove', function (item) {
            $this.logAudit.traceModelChange({
                removed: true,
                resource: $this._list,
                item: item.toObject(),
                userId: item.last_modified_by // TODO
            });
        });
    }
}

/**
 * Exporting Model
 *
 * @type {Function}
 */
exports = module.exports = BaseModel;
