'use strict';

/**
 * Requiring Core Library
 */
var DioscouriCore = process.mainModule.require('dioscouri-core');

/**
 *  Signin controller
 */
class Login extends DioscouriCore.Controller {

    /**
     * Initializing controller
     *
     * @param callback
     */
    init(callback) {
        this.registerAction('/logout', 'doLogout');

        // Including User Model
        this.userModel = require('../models/user.js');

        this._viewsPath = require('path').join(__dirname, '..', 'views', 'admin', this._viewsPath || '');

        callback();
    }

    /**
     * Load view file
     *
     * @param dataReadyCallback
     */
    load(dataReadyCallback) {
        // Set page data
        this.data.header = "Sign In - Admin UI";

        // Render login on GET and do Login on POST
        if (this.request.method === 'GET') {
            /**
             * Set output view object
             */
            this.view(DioscouriCore.ModuleView.htmlView(this._viewsPath + '/login.swig'));

            dataReadyCallback(null);
        } else {
            this.doLogin(dataReadyCallback);
        }
    }

    /**
     * Signin form post method
     * @param dataReadyCallback
     */
    doLogin(dataReadyCallback) {
        var that = this;

        this.userModel.passport.authenticate('local', function (err, user, info) {
            if (err) return dataReadyCallback(err);

            if (!user) {
                that.flash.addMessage(info.message, DioscouriCore.FlashMessageType.ERROR);
                that.terminate();
                that.response.redirect('/login');
                return dataReadyCallback(err);
            }
            that.request.logIn(user, function (err) {
                if (err) return dataReadyCallback(err);

                that.terminate();
                if (user.isAdmin) {
                    that.response.redirect('/admin');
                } else {
                    that.response.redirect('/');
                }

                return dataReadyCallback(err);
            });
        })(that.request);
    }

    /**
     * Proceed with logout action
     *
     * @param dataReadyCallback
     */
    doLogout(dataReadyCallback) {
        // Apply Request Logout
        this.request.logout();

        this.terminate();
        this.response.redirect('/login');

        dataReadyCallback(null);
    }
}

/**
 * Exporting Controller
 *
 * @type {Function}
 */
exports = module.exports = function (request, response) {
    var controller = new Login(request, response);
    controller.run();
};
