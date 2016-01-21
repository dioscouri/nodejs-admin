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
 * Local passport strategy
 */
var LocalStrategy = require('passport-local').Strategy;

/**
 * Ldap passport strategy
 */
var LdapStrategy = require('passport-ldapauth');

/**
 * Requiring Crypto modules
 *
 * @type {*}
 */
var bcrypt = require('bcrypt-nodejs');

/**
 * Async library
 * @type {async|exports|module.exports}
 */
var async = require('async');

/**
 * LDAP library
 *
 * @type {*|exports|module.exports}
 */
var ldap = require('ldapjs');

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

        /**
         * After signUp callback
         *
         * @type {null}
         * @private
         */
        this._afterLDAPSignUp = null;

        var authentication = DioscouriCore.ApplicationFacade.instance.config.env.authentication;

        if (authentication && authentication.ldap && authentication.ldap.enabled === true) {

            var options = this._options = {
                url: authentication.ldap.url,
                base: authentication.ldap.searchBase,
                bindDN: authentication.ldap.bindDn,
                bindCredentials: authentication.ldap.bindCredentials
            };

            this._client = ldap.createClient({
                url: options.url,
                maxConnections: 10,
                bindDN: options.bindDN,
                credentials: options.bindCredentials
            });


            this._client.on('error', function (e) {
                console.log('LDAP connection error:', e);
            });

            this._queue = [];

            var self = this;
            this._client.bind(options.bindDN, options.bindCredentials, function (err) {
                if (err) {
                    return console.log("Error binding to LDAP", 'dn: ' + err.dn + '\n code: ' + err.code + '\n message: ' + err.message);
                }
                self.clientConnected = true;
                self._queue.forEach(function (cb) {
                    cb();
                });
            });
        }
    }

    set afterLDAPSignUp(callback) {
        this._afterLDAPSignUp = callback;
    }

    get afterLDAPSignUp() {
        return this._afterLDAPSignUp;
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
            "isAdmin": Boolean,
            "createdAt": {type: Date, 'default': Date.now},
            "modifiedAt": {type: Date, 'default': Date.now},
            "isVerified": Boolean,
            "name": {
                "last": String,
                "first": String
            },
            "roles": [String],
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
                    if (this.notifications[i].toLowerCase() === 'all' || this.notifications[i].toLowerCase() == notificationType.toLowerCase()) {
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
        };

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

        // Initializing passport
        this._passport = passport;

        this._logger.info('## Registering Authentication Strategies.');
        passport.serializeUser(function (user, done) {
            done(null, user.id);
        });

        passport.deserializeUser(function (id, done) {
            userModel.findById(id, function (err, user) {
                if (err) {
                    console.error(err);
                    return done(err);
                }

                if (user) {
                    (user.roles || []).forEach(function (role) {
                        DioscouriCore.ApplicationFacade.instance.server.acl.addUserRoles(user._id.toString(), role);
                    });
                }

                done(null, user);
            });
        });

        var authentication = DioscouriCore.ApplicationFacade.instance.config.env.authentication;

        if (authentication && authentication.ldap && authentication.ldap.enabled === true) {
            /**
             * LDAP: Sign in using Email and Password.
             */
            passport.use(new LdapStrategy({
                usernameField: 'email',
                server: {
                    url: authentication.ldap.url,
                    bindDn: authentication.ldap.bindDn,
                    bindCredentials: authentication.ldap.bindCredentials,
                    searchBase: authentication.ldap.searchBase,
                    searchFilter: authentication.ldap.searchFilter,
                    tlsOptions: {
                        rejectUnauthorized: false
                    }
                }
            }, (user, done) => {

                userModel._logger.debug('Trying to Authenticate user %s.', require('util').inspect(user));

                async.waterfall([callback => {

                    // Try find user in the local database
                    userModel.findOne({email: user.mail}, callback);

                }, (databaseUser, callback) => {

                    if (!databaseUser) {
                        // Create local user if it's not exist
                        userModel.insert({
                            email: user.mail,
                            name: {
                                first: user.displayName
                            },
                            isAdmin: false
                        }, (err, databaseUser) => {
                            if (err) return callback(err);

                            if (this.afterLDAPSignUp) {

                                this.getAllGroups(user, (err, groups) => {
                                    if (err) return callback(err);

                                    console.log('groups');
                                    console.log(groups);

                                    this.afterLDAPSignUp(databaseUser, user, callback);
                                });

                            } else {

                                callback(null, databaseUser);
                            }
                        });
                    } else {
                        callback(null, databaseUser);
                    }

                }], done);
            }));
        }

        // Local strategy enabled by default but can be disabled in Configuration
        if (!authentication || !authentication.local || authentication.local.enabled !== false) {
            /**
             * Local: Sign in using Email and Password.
             */
            passport.use(new LocalStrategy({usernameField: 'email'}, function (email, password, done) {

                email = email.toLowerCase();

                userModel._logger.debug('Trying to Authenticate user %s.', email);

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
    }

    authenticate(request, callback) {
        var userModel = this;

        var authentication = DioscouriCore.ApplicationFacade.instance.config.env.authentication;

        async.waterfall([function (callback) {

            if (authentication && authentication.ldap && authentication.ldap.enabled === true) {

                userModel.passport.authenticate('ldapauth', function (err, user, info) {

                    if (err) {
                        userModel._logger.warn(err.dn);
                        userModel._logger.warn(err.code);
                        userModel._logger.warn(err.name);
                        userModel._logger.warn(err.message);
                        return callback(err);
                    }

                    callback(null, user, info);

                })(request);

            } else {

                callback(null, null, null);
            }

        }, function (user, info, callback) {

            if (user) return callback(null, user);

            // Local strategy enabled by default but can be disabled in Configuration
            if (!authentication || !authentication.local || authentication.local.enabled !== false) {

                userModel.passport.authenticate('local', function (err, user, info) {

                    if (err) return callback(err);

                    callback(null, user, info);

                })(request);
            } else {

                callback(null, null, {message: 'Unable to authenticate. User not found or password is wrong.'});
            }

        }], callback);
    }

    /**
     * Validate item
     *
     * @param item
     * @param validationCallback
     */
    validate(item, validationCallback) {
        var validationMessages = [];

        if (item.email == '') {
            validationMessages.push('Email cannot be empty');
        }

        if (!item._id && item.password == '') {
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

    /**
     * Send registration confirmation email for this user
     *
     * @param userEmail
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

    getAllGroups(obj, callback) {
        var self = this;
        self.getLDAPGroups(obj, function (err, groups) {
            if (err) return callback(err);

            async.map(groups, self.getAllGroups.bind(self), function (err, res) {
                return callback(err, groups.concat.apply(groups, res));
            });
        });
    };

    getLDAPGroups(obj, callback) {
        var self = this;

        var opts = {
            scope: 'sub',
            filter: '(&(objectclass=group)(member=' + obj.dn + '))'
        };

        self._client.search(self._options.base, opts, function (err, res) {
            if (err) {
                console.log('List groups error:', err);
                return callback(err);
            }
            var entries = [];
            res.on('searchEntry', function (entry) {
                entries.push(entry);
            });

            function done() {
                if (entries.length === 0) return callback(null, []);
                var result = entries.map(function (e) {
                    return e.object;
                });
                callback(null, result);
            }

            res.on('error', function (err) {
                if (err.message === 'Size Limit Exceeded') return done();
                callback(err);
            });

            res.on('end', done);
        });
    };
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
