'use strict';

/**
 * Base model
 */
var BaseModel = require('./base');

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
            message: {type: String},
            modifiedAt: {type: Date, 'default': Date.now, index: true},
            createdAt: {type: Date, 'default': Date.now, index: true},
            isRead: {type: Boolean, 'default': false, index: true}
        };

        // Creating DBO Schema
        var NotificationDBOSchema = this.createSchema(schemaObject);

        NotificationDBOSchema.pre('save', function (next) {
            this.modifiedAt = new Date();

            next();
        });

        // Registering schema and initializing model
        this.registerSchema(NotificationDBOSchema);
    }

    /**
     * Send notification to some user
     *
     * @param {Object} notification - Notification object.
     * @param {Object} notification.notificationType - Type of notification. Ex: BROKEN_REFERENCE, MISSING_TITLE, etc.
     * @param {Object} notification.resourceType - Name of resource (name of Mongoose list).
     * @param {Object} notification.resourceId - ID of resource instance.
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
                console.warn('Notifying user %s with %s via email', notification.targetUser, notification.notificationType)

                var swig     = require('swig');
                var swigHtml = swig.compileFile("app/views/emails/notifications/html/newnotification.swig");
                var swigText = swig.compileFile("app/views/emails/notifications/text/newnotification.swig");

                var mailer = new DioscouriCore.Mailer();
                mailer.send([userDetails.email],
                    {html: swigHtml(notification), text: swigText(notification)},
                    {subject: "New Notification"});


                callback(null, notification);
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