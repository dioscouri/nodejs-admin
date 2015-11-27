
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
 *  Signin controller
 *
 *  @author Sanel Deljkic <dsanel@dioscouri.com>
 */
class Login extends DioscouriCore.Controller {
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
        this.registerAction('/logout', 'doLogout');

        // Including User Model
        this.userModel = require('../../models/user.js');

        this._viewsPath = require('path').join(__dirname, '..', 'views', 'admin', this._viewsPath || '');

        callback();
    }

    /**
     * Load view file
     *
     * @param dataReadyCallback
     */
    load (dataReadyCallback) {
        var frontUiConfig = this._config && this._config._configuration && this._config._configuration.frontui;

        if (frontUiConfig && frontUiConfig.enableLogin === false) {
            this.flash.addMessage("Login is not enabled", DioscouriCore.FlashMessageType.ERROR);
            this.terminate();
            this.response.redirect('/');
            return dataReadyCallback();
        }

        // Set page data
        this.data.header = "Sign In";
        this.data.title = this._config._configuration.project && this._config._configuration.project.name;
        this.data.frontUiConfig = frontUiConfig;
        this.data.enableRegistration = false;
        if (frontUiConfig && frontUiConfig.enableRegistration === true) {
            this.data.enableRegistration = true;
        }

        // Render login on GET and do Login on POST
        if (this.request.method == 'GET') {
            /**
             * Set output view object
             */
            this.view(DioscouriCore.ModuleView.htmlView('app/views/front/login.swig'));

            dataReadyCallback(null);
        } else {
            this.doLogin(dataReadyCallback);
        }
    }

    /**
     * Signin form post method
     * @param dataReadyCallback
     */
    doLogin (dataReadyCallback) {
        var that = this;

        this.userModel.authenticate(this.request, function (err, user, info) {
            if (err) return dataReadyCallback(err);

            if (!user) {
                that.flash.addMessage(info.message, DioscouriCore.FlashMessageType.ERROR );
                that.terminate();
                that.response.redirect('/login');
                return dataReadyCallback(err);
            }
            that.request.logIn(user, function(err) {
                if (err) return dataReadyCallback(err);

                that.terminate();

                if (that.request.session && that.request.session.returnUrl) {
                    that.response.redirect(302, that.request.session.returnUrl);

                    delete $this.request.session.returnUrl;
                } else {
                    that.response.redirect('/');
                }

                return dataReadyCallback(err);
            });
        });
    }

    /**
     * Proceed with logout action
     *
     * @param dataReadyCallback
     */
    doLogout (dataReadyCallback) {
        // Apply Request Logout
        this.request.logout();

        this.terminate();
        this.response.redirect('/login');

        dataReadyCallback(null);
    }

};

/**
 * Exporting Controller
 *
 * @type {Function}
 */
exports = module.exports = function(request, response) {
    var controller = new Login(request, response);
    controller.run();
};
