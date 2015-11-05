'use strict';

/**
 * Requiring Core Library
 */
var DioscouriCore = process.mainModule.require('dioscouri-core');

/**
 * Base model
 */
var BaseModel = require('./base');

/**
 * Async library
 * @type {async|exports|module.exports}
 */
var async = require('async');

/**
 *  Resources model
 */
class AclResourceModel extends BaseModel {
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
            "name": String,
            "actions": [String]
        };

        //Creating DBO Schema
        var AclResourceDBOSchema = this.createSchema(schemaObject);

        AclResourceDBOSchema.post('save', function () {
            var resource = this;

            require('./acl_permissions').model.find({
                aclResource: resource._id,
                actionName: {
                    $nin: resource.actions
                }
            }, function (err, permissions) {
                if (err) return console.log(err);

                async.each(permissions, function (permission, callback) {

                    permission.remove(function (err) {
                        callback(err);
                    });

                }, function (err) {
                    if (err) console.log(err);
                })
            });
        });

        AclResourceDBOSchema.post('remove', function () {
            var resource = this;

            require('./acl_permissions').model.find({
                aclResource: resource._id
            }, function (err, permissions) {
                if (err) return console.log(err);

                async.each(permissions, function (permission, callback) {

                    permission.remove(function (err) {
                        callback(err);
                    });

                }, function (err) {
                    if (err) console.log(err);
                })
            });
        });

        // Registering schema and initializing model
        this.registerSchema(AclResourceDBOSchema);
    }

    /**
     * Validating item before save
     *
     * @param item
     * @param validationCallback
     * @returns {[]}
     */
    validate(item, validationCallback) {
        var validationMessages = [];

        if (item.name == '') {
            validationMessages.push('Name cannot be empty');
        }

        if (validationMessages.length == 0) {
            var searchPattern = item.id != null ? {"$and": [{name: item.name}, {_id: {"$ne": item.id.toString()}}]} : {name: item.name};
            this.findOne(searchPattern, function (error, document) {
                if (error != null) {
                    validationMessages.push(error.message);
                    return validationCallback(DioscouriCore.ValidationError.create(validationMessages));
                }

                if (document != null && (item.id == null || item.id.toString() != document.id.toString())) {
                    validationMessages.push('Acl Resource with the same name already exists in the database');
                }

                return validationCallback(DioscouriCore.ValidationError.create(validationMessages));
            });
        } else {
            validationCallback(DioscouriCore.ValidationError.create(validationMessages));
        }
    }
}

/**
 * Creating instance of the model
 */
var modelInstance = new AclResourceModel('acl_resources');

/**
 * Exporting Model
 *
 * @type {Function}
 */
exports = module.exports = modelInstance;
