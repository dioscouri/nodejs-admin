'use strict';

/**
 * Requiring Core Library
 */
var DioscouriCore = require('dioscouri-core');

/**
 * Requiring base Model
 */
var BaseModel = require('./basemodel.js');

/**
 *  User Roles model
 */
class AclRoleModel extends BaseModel {
    /**
     * Model constructor
     */
    constructor(listName) {
        // We must call super() in child class to have access to 'this' in a constructor
        super(listName);
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
            this.model.findOne(searchPattern, function (error, document) {
                if (error != null) {
                    validationMessages.push(error.message);
                    return validationCallback(DioscouriCore.ValidationError.create(validationMessages));
                }

                if (document != null && (item.id == null || item.id.toString() != document.id.toString())) {
                    validationMessages.push('Acl Role with the same name already exists in the database');
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
var modelInstance = new AclRoleModel('acl_roles');

/**
 * Exporting Model
 *
 * @type {Function}
 */
exports = module.exports = modelInstance;

/**
 * Initializing Schema for model
 */
modelInstance.initSchema('/dbo/acl_roles.js', __dirname);
