
// Using STRICT mode for ES6 features
"use strict";

/**
 * Requiring Core Library
 */
var DioscouriCore = process.mainModule.require('dioscouri-core');

/**
 * Requiring application Facade
 */
var applicationFacade = DioscouriCore.ApplicationFacade.instance;

/**
 *
 */
var validator = require('validator');

/**
 * Require async library
 *
 * @type {async|exports|module.exports}
 */
var async = require('async');

/**
 *  Signup controller
 *
 *  @author Sanel Deljkic <dsanel@dioscouri.com>
 */
class Signup extends DioscouriCore.Controller {
    /**
     * Constructor
     *
     */
    constructor (request, response) {
        // We must call super() in child class to have access to 'this' in a constructor
        super(request, response);

        /**
         * Global config
         *
         * @private
         */
        this._config = applicationFacade.config;
    }

    /**
     * Initializing controller
     *
     * @param callback
     */
    init (callback) {
        this.registerAction("confirm", "confirm");
        this.registerAction("checkEmail", "checkEmail");

        this.userModel = require('../../models/user.js');
        this.data.userPasswordMinLength = 4;

        callback();
    }

    /**
     * Load view file
     *
     * @param dataReadyCallback
     */
    load (dataReadyCallback) {
        var frontUiConfig = this._config && this._config._configuration && this._config._configuration.frontui;

        var enableRegistration = false;
        if (frontUiConfig && frontUiConfig.enableRegistration === true) {
            enableRegistration = true;
        }
        
        if (!enableRegistration) {
            this.flash.addMessage("Signup is not enabled", DioscouriCore.FlashMessageType.ERROR);
            this.terminate();
            this.response.redirect('/');
            return dataReadyCallback();
        }

        // Set page data
        this.data.header = "Sign Up";
        this.data.baseDomain = '.' + DioscouriCore.ApplicationFacade.instance.config.env.BASE_CLIENTS_DOMAIN;

        if (this.request.method == 'GET') {
            /**
             * Set output view object
             */
            this.view(DioscouriCore.ModuleView.htmlView('app/views/front/signup.swig'));

            // Send DATA_READY event
            dataReadyCallback();
        } else {
            this.doSignup(dataReadyCallback);
        }
    }

    /**
     * Signup form post method
     * @param dataReadyCallback
     */
    doSignup (dataReadyCallback) {
        if (this.request.method != "POST") {
            return dataReadyCallback(new Error("Signup process should be engaged by POST method"));
        }

        var $this = this;
        var locals = {};
        locals.userObject = {
            name: {
                first: this.request.body.firstName,
                last: this.request.body.lastName
            },
            email: this.request.body.email,
            password: this.request.body.password,
            isAdmin: false
        };
        locals.isValid = true;

        async.series([
            function (asyncCallback) {
                this.validateRequest(function(error) {
                    if (error != null) {
                        locals.isValid = false;
                    }
                    console.log(error);
                    asyncCallback(error);
                });
            }.bind(this),
            function (asyncCallback) {
                $this.userModel.insert(locals.userObject, function(error, item){
                    if (error == null) {
                        $this._logger.log('## Inserted user account for: ', item.email);
                        $this.flash.addMessage("User account '" + item.email + "' successfully created", DioscouriCore.FlashMessageType.SUCCESS);
                    } else {
                        $this._logger.error('ERROR. Failed to insert user account: %s. %s', item.email, error.message);
                    }

                    locals.userDetails = item;
                    asyncCallback(error);
                });
            }.bind(this)
        ], function(error) {
            if (locals.isValid) {
                if (error != null) {
                    $this.flash.addMessage("Failed to create account! " + error.message, DioscouriCore.FlashMessageType.ERROR);
                }

                $this.terminate();
                $this.response.redirect('/');

                return dataReadyCallback(null);
            } else {
                $this.data.userObject = locals.userObject;

                $this.flash.addMessage(error.message, DioscouriCore.FlashMessageType.ERROR);

                /**
                 * Set output view object
                 */
                $this.view(DioscouriCore.View.htmlView('app/views/front/signup.swig'));

                // Send DATA_READY event
                dataReadyCallback();
            }
        });
    }


    /**
     * Validating item before save
     *
     * @param validationCallback
     * @returns {array}
     */
    validateRequest (validationCallback) {
        var validationMessages = [];

        if (this.request.body.email == '') {
            validationMessages.push('Email cannot be empty');
        }

        if (this.request.body.password == '') {
            validationMessages.push('Password cannot be empty');
        }

        if (validationMessages.length == 0) {
            async.series([
                function (asyncCallback) {
                    this.userModel.findOne({email: this.request.body.email}, function(error, document){
                        if (error != null) {
                            validationMessages.push(error.message);
                            return asyncCallback(error);
                        }

                        if (document != null) {
                            validationMessages.push('User with the same email already exists in the database');
                            return asyncCallback(DioscouriCore.ValidationError.create(validationMessages));
                        }

                        asyncCallback();
                    });
                }.bind(this)
            ], function(error) {
                console.log(validationMessages);
                validationCallback(DioscouriCore.ValidationError.create(validationMessages));
            });
        } else {
            validationCallback(DioscouriCore.ValidationError.create(validationMessages));
        }
    }

    checkEmail (dataReadyCallback) {
        var $this = this;
        this.userModel.findOne({email: this.request.body.email}, function(error, userDetails) {
            if (error != null) {
                $this.data.isEmailUnique = false;
            } else {
                $this.data.isEmailUnique = userDetails ? false : true;
            }

            /**
             * Set output view object
             */
            $this.view(DioscouriCore.View.jsonView());

            return dataReadyCallback(error);
        });
    }
};

/**
 * Exporting Controller
 *
 * @type {Function}
 */
exports = module.exports = function(request, response) {
    var controller = new Signup(request, response);
    controller.run();
};
