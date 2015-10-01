'use strict';

/**
 * Requiring base Model
 */
var Models                 = {};
Models.AclRolesModel       = require('../acl_roles');
Models.AclPermissionsModel = require('../acl_permissions');

var Types = Models.AclRolesModel.mongoose.Schema.Types;

/**
 * Async operations helper
 *
 * @type {async|exports|module.exports}
 */
var async = require('async');

// Acl User Roles Schema Object
var schemaObject = {
    "name": String,
    "last_modified_by": {type: Types.ObjectId, ref: 'user'}
};

/**
 * Creating DBO Schema
 */
var AclRolesDBOSchema = Models.AclRolesModel.createSchema(schemaObject);

/**
 * To Enable Audit traces.
 * 1. Call enableAudit()
 * 2. Do not forget to add `last_modified_by` field to this schema.
 */
Models.AclRolesModel.enableAudit();

/**
 * Post-remove hook
 */
AclRolesDBOSchema.post('remove', function () {
    var role = this;

    Models.AclPermissionsModel.model.find({
        aclRole: role._id
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

/**
 * Exporting DBO Schema
 *
 * @type {Function}
 */
exports = module.exports = AclRolesDBOSchema;
