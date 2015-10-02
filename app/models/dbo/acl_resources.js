'use strict';

/**
 * Requiring base Model
 */
var Models                 = {};
Models.AclResourcesModel   = require('../acl_resources');
Models.AclPermissionsModel = require('../acl_permissions');

/**
 * Async operations helper
 *
 * @type {async|exports|module.exports}
 */
var async = require('async');

// Acl Resources Schema Object
var schemaObject = {
    "name": String,
    "actions": [String]
};

/**
 * Creating DBO Schema
 */
var AclResourcesDBOSchema = Models.AclResourcesModel.createSchema(schemaObject);

/**
 * Post-save hook
 */
AclResourcesDBOSchema.post('save', function () {
    var resource = this;

    Models.AclPermissionsModel.model.find({
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

/**
 * Post-remove hook
 */
AclResourcesDBOSchema.post('remove', function () {
    var resource = this;

    Models.AclPermissionsModel.model.find({
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

/**
 * Exporting DBO Schema
 *
 * @type {Function}
 */
exports = module.exports = AclResourcesDBOSchema;
