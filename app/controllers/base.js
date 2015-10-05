'use strict';

/**
 * Requiring Core Library
 */
var DioscouriCore = require('dioscouri-core');

/**
 *  Admin base controller
 */
class AdminBaseController extends DioscouriCore.Controller {

    /**
     * Pre-initialize data and event handlers
     */
    preInit(callback) {

        this._viewsPath = require('path').join(__dirname, '..', 'views');

        return callback(); // TODO: Remove this line

        if (!this.isAuthenticated()) {
            this.flash.addMessage("You must be logged in to access Admin UI!", DioscouriCore.FlashMessageType.ERROR);
            this.terminate();
            this.response.redirect('/login');

            callback();
        } else if (!this.isAdminUser()) {

            this.flash.addMessage("You must be administrator to access Admin UI!", DioscouriCore.FlashMessageType.ERROR);
            this.terminate();
            this.response.redirect('/');

            callback();
        } else {
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
