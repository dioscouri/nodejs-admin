'use strict';

/**
 * Base model
 */
var BaseModel = require('./base');

/**
 *  Permissions model
 */
class AclPermissionModel extends BaseModel {
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
            "aclRole": {type: Types.ObjectId, ref: 'acl_roles'},
            "aclResource": {type: Types.ObjectId, ref: 'acl_resources'},
            "actionName": String
        };

        //Creating DBO Schema
        var AclPermissionDBOSchema = this.createSchema(schemaObject);

        // Registering schema and initializing model
        this.registerSchema(AclPermissionDBOSchema);
    }

    /**
     * Initialize ACL
     *
     * @param callback
     */
    initAcl(callback) {
        var aclModule = require('acl');

        this.acl = new aclModule(new aclModule.memoryBackend());

        this.model.find({})
            .populate('aclRole', 'name')
            .populate('aclResource', 'name')
            .exec(function (err, permissions) {
                if (err) return callback(err);

                permissions.forEach(function (permission) {

                    this.acl.allow(permission.aclRole.name, permission.aclResource.name, permission.actionName);
                    //console.log('ACL Allow: ' + permission.aclRole.name + ' - ' + permission.aclResource.name + ' [' + permission.actionName + ']');

                }.bind(this));

                callback(null, this.acl);

            }.bind(this));
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

        if (item.aclRole == '') {
            validationMessages.push('Acl Role cannot be empty');
        }

        if (item.aclResource == '') {
            validationMessages.push('Acl Resource cannot be empty');
        }

        if (item.actionName == '') {
            validationMessages.push('Acl Action Name cannot be empty');
        }

        if (validationMessages.length == 0) {
            var searchPattern = item.id != null ? {
                "$and": [{
                    aclRole: item.aclRole,
                    aclResource: item.aclResource,
                    actionName: item.actionName
                }, {_id: {"$ne": item.id.toString()}}]
            } : {aclRole: item.aclRole, aclResource: item.aclResource, actionName: item.actionName};
            this.findOne(searchPattern, function (error, document) {
                if (error != null) {
                    validationMessages.push(error.message);
                    return validationCallback(DioscouriCore.ValidationError.create(validationMessages));
                }

                if (document != null && (item.id == null || item.id.toString() != document.id.toString())) {
                    validationMessages.push('This Acl Permission already exists in the database');
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
var modelInstance = new AclPermissionModel('acl_permissions');

/**
 * Exporting Model
 *
 * @type {Function}
 */
exports = module.exports = modelInstance;
