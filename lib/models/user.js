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
 * Local passport strategy
 */
var LocalStrategy = require('passport-local').Strategy;

/**
 * Requiring Crypto modules
 *
 * @type {*}
 */
var bcrypt = require('bcrypt-nodejs');

/**
 *  User model
 */
class UserModel extends BaseModel {
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

        // User Schema Object
        var schemaObject = {
            "token": String,
            "password": String,
            "email": String,
            "client": {type: Types.ObjectId, ref: 'client'},
            "isAdmin": Boolean,
            "createdAt": {type: Date, 'default': Date.now},
            "modifiedAt": {type: Date, 'default': Date.now},
            "isVerified": Boolean,
            "name": {
                "last": String,
                "first": String
            },
            notifications: []
        };

        /**
         * Creating DBO Schema
         */
        var UserDBOSchema = this.createSchema(schemaObject);

        /**
         * Pre-save hook
         */
        UserDBOSchema.pre('save', function (next) {
            var user        = this;
            this.modifiedAt = Date.now();
            if (user.isModified('password')) {
                bcrypt.genSalt(10, function (err, salt) {
                    if (err) {
                        return next(err);
                    }

                    bcrypt.hash(user.password, salt, null, function (err, hash) {
                        if (err) {
                            return next(err);
                        }

                        user.password = hash;
                        next();
                    });
                });
            } else {
                return next();
            }
        });

        /**
         * Mongoose Virtual property for full name (first name and last name)
         */
        UserDBOSchema.virtual('fullName').get(function () {
            return this.name.first + ' ' + this.name.last;
        });

        /**
         * Check is notification with specified type allowed for user
         */
        UserDBOSchema.methods.isNotificationAllowed = function (notificationType) {
            var result = false;

            if (notificationType != null && this.notifications != null) {
                for (var i = 0; i < this.notifications.length; i++) {
                    if (this.notifications[i].toLowerCase() == notificationType.toLowerCase()) {
                        return true;
                    }
                }
            }

            return result;
        };

        /**
         * Compare password with currently set password
         *
         * @param candidatePassword
         * @param callback
         */
        UserDBOSchema.methods.comparePassword = function (candidatePassword, callback) {
            var user = this;
            bcrypt.compare(candidatePassword, user.password, function (err, isMatch) {
                if (err) {
                    return callback(err);
                } else {
                    callback(null, isMatch);
                }
            });
        }

        // Registering schema and initializing model
        this.registerSchema(UserDBOSchema);
    }

    /**
     * Passport instance
     *
     * @returns {*|UserModel.passport}
     */
    get passport() {
        return this._passport;
    }

    /**
     * Registering passport handlers
     *
     * @param passport
     */
    registerPassportHandlers(passport) {
        var userModel = this;

        // Initizlizing passport
        this._passport = passport;

        this._logger.info('## Registering LocalStrategy for Authentification.');
        passport.serializeUser(function (user, done) {
            done(null, user.id);
        });

        passport.deserializeUser(function (id, done) {
            userModel.findById(id, function (err, user) {
                if (err) {
                    console.error(err);
                    return done(err);
                }

                require('./acl_permissions').acl.addUserRoles(user._id.toString(), 'user');

                if (user.isAdmin) {
                    require('./acl_permissions').acl.addUserRoles(user._id.toString(), 'admin');
                }

                done(null, user);
            });
        });

        /**
         * Sign in using Email and Password.
         */
        passport.use(new LocalStrategy({usernameField: 'email'}, function (email, password, done) {
            email = email.toLowerCase();
            userModel._logger.debug('Trying to Authentificate user %s.', email);
            userModel.findOne({email: email}, function (err, user) {
                if (!user) {
                    return done(null, false, {message: 'Email ' + email + ' not found'});
                }
                user.comparePassword(password, function (err, isMatch) {
                    if (isMatch) {
                        return done(null, user);
                    }
                    done(null, false, {message: 'Invalid email or password.'});
                });
            });
        }));
    }

    /**
     * Validate item
     *
     * @param item
     * @param callback
     */
    validate(item, validationCallback) {
        var validationMessages = [];

        if (item.email == '') {
            validationMessages.push('Email cannot be empty');
        }

        if (item.password == '') {
            validationMessages.push('Password cannot be empty');
        }

        if (validationMessages.length == 0) {
            var searchPattern = item.id != null ? {"$and": [{email: item.email}, {_id: {"$ne": item.id.toString()}}]} : {email: item.email};
            this.model.findOne(searchPattern, function (error, document) {
                if (error != null) {
                    validationMessages.push(error.message);
                    return validationCallback(DioscouriCore.ValidationError.create(validationMessages));
                }

                if (document != null && (item.id == null || item.id.toString() != document.id.toString())) {
                    validationMessages.push('User with the same email already exists in the database');
                }

                return validationCallback(DioscouriCore.ValidationError.create(validationMessages));
            });
        } else {
            validationCallback(DioscouriCore.ValidationError.create(validationMessages));
        }
    }

;


    /**
     * Send registration confirmation email for this user
     *
     * @param userId
     * @param callback
     */
    sendRegistrationConfirmationEmail(userEmail, callback) {
        var confirmationUrl = DioscouriCore.ApplicationFacade.instance.config.env.BASE_URL;

        var internalErrorCallback   = function (err, item) {
            if (callback)
                callback(err, item);
        };
        var internalSuccessCallback = function (item) {
            if (callback)
                callback(null, item);
        };

        this.findOne({email: userEmail}, function (err, userDetails) {
            if (err != null) {
                internalErrorCallback(err);
            }

            // Notifying user via email
            if (userDetails != null && !userDetails.isVerified) {
                console.warn('Requesting registration confirmation for %s user by %s email', userDetails.fullName, userDetails.email);

                var swig     = require('swig');
                var swigHtml = swig.compileFile("app/views/emails/confirmations/html/registrationConfirmation.swig");
                var swigTxt  = swig.compileFile("app/views/emails/confirmations/text/registrationConfirmation.swig");

                var confirmationEmailData = {
                    fullName: userDetails.fullName,
                    confirmationUrl: confirmationUrl + '/' + userDetails._id,
                    supportEmail: 'support@MerchantWeb.com'
                };

                var message = {
                    html: swigHtml(confirmationEmailData),
                    text: swigTxt(confirmationEmailData)
                };

                var options = {
                    subject: "Please confirm your registration in MerchantWeb!"
                };
                var mailer  = new DioscouriCore.Mailer();
                mailer.send([userDetails.email]
                    , message
                    , options
                    , internalSuccessCallback
                    , internalErrorCallback);
            } else {
                internalCallback(null, userDetails);
            }
        });
    }
}

/**
 * Creating instance of the model
 */
var modelInstance = new UserModel('user');

/**
 * Exporting Model
 *
 * @type {Function}
 */
exports = module.exports = modelInstance;
