'use strict';

/**
 * Requiring core Path module
 */
var path = require('path');

/**
 * Requiring Core Library
 */
var DioscouriCore = process.mainModule.require('dioscouri-core');

/**
 *  Admin base controller
 */
class AdminBaseController extends DioscouriCore.Controller {

    /**
     * Pre-initialize data and event handlers
     */
    preInit(callback) {

        this._viewsPath = path.join(__dirname, '..', 'views', 'admin', this._viewsPath || '');

        this.data.navigation = require('../models/navigation.js').navigation;
        this.data.originalUrl = this.request.originalUrl;

        if (!this.isAuthenticated()) {
            this.request.session.returnUrl = this.request.protocol + '://' + this.request.get('host') + this.request.originalUrl;
            this.flash.addMessage("You must be logged in to access Admin UI!", DioscouriCore.FlashMessageType.ERROR);
            this.terminate();
            this.response.redirect('/admin/login');

            callback();
        } else if (!this.isAdminUser()) {

            this.flash.addMessage("You must be administrator to access Admin UI!", DioscouriCore.FlashMessageType.ERROR);
            this.terminate();
            this.response.redirect('/');

            callback();
        } else {
            this.data.loggedUser = this.request.user;

            callback();
        }
    }
}

/**
 * Exporting Controller
 *
 * @type {Function}
 */
exports = module.exports = AdminBaseController;
