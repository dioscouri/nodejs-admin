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
        this.registerAction('/admin/logout', 'doLogout');

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
        var $this = this;

        this.userModel.passport.authenticate('local', function (err, user, info) {
            if (err) return dataReadyCallback(err);

            if (!user) {
                $this.flash.addMessage(info.message, DioscouriCore.FlashMessageType.ERROR);
                $this.terminate();
                $this.response.redirect('/login');
                return dataReadyCallback(err);
            }
            $this.request.logIn(user, function (err) {
                if (err) return dataReadyCallback(err);

                $this.terminate();

                if ($this.request.session.returnUrl != null) {
                    $this.response.redirect(302, $this.request.session.returnUrl);

                    delete $this.request.session.returnUrl;
                } else if (user.isAdmin) {
                    $this.response.redirect('/admin');
                } else {
                    $this.response.redirect('/');
                }

                return dataReadyCallback(err);
            });
        })($this.request);
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
        this.response.redirect('/admin/login');

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
