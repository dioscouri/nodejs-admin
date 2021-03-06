'use strict';

/**
 * Base model
 */
var BaseModel = require('./base');

/**
 * Core fs library
 *
 * @type {exports|module.exports}
 */
var fs = require('fs');

/**
 * Core path library
 *
 * @type {posix|exports|module.exports}
 */
var path = require('path');

/**
 * HTML -> Text conversion helper
 *
 * @type {*|exports|module.exports}
 */
var htmlToText = require('html-to-text');

/**
 * Async helper
 *
 * @type {async|exports|module.exports}
 */
var async = require('async');

/**
 * Application core
 */
var DioscouriCore = process.mainModule.require('dioscouri-core');

/**
 *  Notification model
 */
class NotificationModel extends BaseModel {
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
            notificationType: {type: String, index: true},
            resourceType: {type: String, index: true},
            resourceId: {type: String, index: true},
            originator: {type: Types.ObjectId, ref: 'user', index: true},
            targetUser: {type: Types.ObjectId, ref: 'user', index: true},
            priority: {type: String, 'default': 'warning'},
            message: {type: String},
            createdAt: {type: Date, 'default': Date.now, index: true},
            isRead: {type: Boolean, 'default': false, index: true}
        };

        // Creating DBO Schema
        var NotificationDBOSchema = this.createSchema(schemaObject);

        NotificationDBOSchema.post('save', item => {

            // Update instance validation status
            this.updateResourceValidationStatus(item.resourceType, item.resourceId);
        });

        NotificationDBOSchema.post('remove', item => {

            // Update instance validation status
            this.updateResourceValidationStatus(item.resourceType, item.resourceId);
        });

        // Registering schema and initializing model
        this.registerSchema(NotificationDBOSchema);
    }

    /**
     * Update resource instance validation status
     *
     * @param resourceType
     * @param resourceId
     * @param callback
     */
    updateResourceValidationStatus(resourceType, resourceId, callback) {

        if (typeof callback != 'function') callback = () => {};

        async.waterfall([callback => {

            // Find all notifications for this resource instance
            this.mongoose.model('notifications').find({
                resourceType: resourceType,
                resourceId: resourceId
            }, (err, items) => {

                if (err) return callback(err);

                var validationStatuses = ['danger', 'warning', 'info', 'success'];
                var validationStatus   = '';

                items.forEach(item => {
                    if (validationStatus == '' ||
                        validationStatuses.indexOf(item.priority) < validationStatuses.indexOf(validationStatus)) {
                        validationStatus = item.priority;
                    }
                });

                callback(null, validationStatus);
            });

        }, (validationStatus, callback) => {

            // Get item
            var Model = this.mongoose.model(resourceType);

            Model.findById(resourceId).exec((err, item) => {
                if (err) return callback(err);
                if (!item) return callback();

                if (item.validationStatus != validationStatus) {
                    // Update validationStatus without hooks
                    Model.where({_id: resourceId}).update({validationStatus: validationStatus}, callback);
                } else {
                    callback();
                }
            });
        }], err => {
            if (err) this.logger.error('NotificationModel::updateResourceValidationStatus: ' + err.message);
            callback(err);
        });
    }

    /**
     * Send notification to some user
     *
     * @param {Object} notification - Notification object.
     * @param {Object} notification.notificationType - Type of notification. Ex: BROKEN_REFERENCE, MISSING_TITLE, etc.
     * @param {Object} notification.resourceType - Name of resource (name of Mongoose list).
     * @param {Object} notification.resourceId - ID of resource instance.
     * @param {Object} [notification.priority] - Priority, default: 'warning'.
     * @param {Object} [notification.message] - Text message.
     * @param {Object} [notification.originator] - User who have modified the instance.
     * @param {Object} [notification.targetUser] - User to notify.
     *
     * @param callback
     */
    sendNotification(notification, callback) {

        var itemObject = new this.model(notification);

        itemObject.save(err => {
            if (err) return callback(err);

            if (notification.targetUser) {
                // Processing with email notification
                this.sendUserEmailNotification(itemObject, callback);
            } else {
                callback(null, itemObject);
            }
        });
    }

    /**
     * Check is target user approved notification and send notification for this user
     *
     * @param notification
     * @param callback
     */
    sendUserEmailNotification(notification, callback) {
        var userModel = require('./user.js');
        userModel.model.findById(notification.targetUser, function (error, userDetails) {
            if (error != null) {
                return callback(error, notification);
            }

            // Notifying user via email
            if (userDetails != null && userDetails.isNotificationAllowed(notification.notificationType)) {
                console.warn('Notifying user %s with %s via email', notification.targetUser, notification.notificationType);

                var templateFile = DioscouriCore.ApplicationFacade.instance.basePath + '/app/views/emails/newnotification.swig';

                fs.access(templateFile, fs.F_OK | fs.R_OK, err => {
                    if (err) {
                        // Use template file from nodejs-admin
                        templateFile = path.resolve(__dirname, '..', 'views/emails/newnotification.swig');
                    }

                    htmlToText.fromFile(templateFile, function (err, text) {
                        if (err) return console.error(err);

                        var mailer = new DioscouriCore.Mailer();

                        var swig = require('swig');

                        mailer.send([userDetails.email], {
                            html: swig.renderFile(templateFile, {notification: notification}),
                            text: text
                        }, {
                            subject: 'New Notification'
                        });

                        callback(null, notification);
                    });
                });

            } else {
                callback(null, notification);
            }
        });
    }

    /**
     * Send notification to some user
     *
     * @param message
     * @param originator
     * @param targetUser
     * @param resourceType
     * @param notificationType
     * @param callback
     */
    createNotification(message, originator, targetUser, resourceType, notificationType, callback) {
        // Notification object
        var notification = {
            notificationType: notificationType,
            resourceType: resourceType,
            targetUser: targetUser,
            message: message,
            createdAt: new Date(),
            isRead: false
        };

        if (originator != null) {
            notification.originator = originator;
        }

        this.sendNotification(notification, callback);
    }
}

/**
 * Creating instance of the model
 */
var modelInstance = new NotificationModel('notifications');

/**
 * Exporting Model
 *
 * @type {Function}
 */
exports = module.exports = modelInstance;