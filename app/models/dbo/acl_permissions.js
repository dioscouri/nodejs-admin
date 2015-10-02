'use strict';

/**
 * Requiring base Model
 */
var Models                 = {};
Models.AclPermissionsModel = require('../acl_permissions');
var Types                  = Models.AclPermissionsModel.mongoose.Schema.Types; // TODO Hmm..

// Acl Permissions Schema Object
var schemaObject = {
    "aclRole": {type: Types.ObjectId, ref: 'acl_roles'},
    "aclResource": {type: Types.ObjectId, ref: 'acl_resources'},
    "actionName": String
};

/**
 * Creating DBO Schema
 */
var AclPermissionsDBOSchema = Models.AclPermissionsModel.createSchema(schemaObject);

/**
 * Exporting DBO Schema
 *
 * @type {Function}
 */
exports = module.exports = AclPermissionsDBOSchema;
