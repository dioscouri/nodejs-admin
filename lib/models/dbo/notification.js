'use strict';

/**
 * Requiring base Model
 */
var Models               = {};
Models.NotificationModel = require('../notification.js');
var Types                = Models.NotificationModel.mongoose.Schema.Types;

// Notification Schema Object
var schemaObject = {
    notificationType: {type: String, index: true},
    resourceType: {type: String, index: true},
    resourceId: {type: String, index: true},
    originator: {type: Types.ObjectId, ref: 'user', index: true},
    targetUser: {type: Types.ObjectId, ref: 'user', index: true},
    message: {type: String},
    modifiedAt: {type: Date, 'default': Date.now, index: true},
    createdAt: {type: Date, 'default': Date.now, index: true},
    isRead: {type: Boolean, index: true}
};

/**
 * Creating DBO Schema
 */
var NotificationDBOSchema = Models.NotificationModel.createSchema(schemaObject);

/**
 * Pre-save hook
 */
NotificationDBOSchema.pre('save', function (next) {
    this.modifiedAt = new Date();

    next();
});

/**
 * Exporting DBO Schema
 *
 * @type {Function}
 */
exports = module.exports = NotificationDBOSchema;
