/**
 * Requiring Core Library
 *
 * WARNING: Core modules MUST be included from TOP Level Module.
 * All dependencies for core module must be excluded from the package.json
 */
var DioscouriCore = process.mainModule.require('dioscouri-core');

/**
 * Check requireLogin and redirect to appropriate login page
 * @param request
 * @param response
 * @param next
 * @returns {*}
 */
function checkRequireLogin (request, response, next) {
    // Do not check for favicon.ico
    if (request.originalUrl.indexOf('favicon.ico') > -1) {
        return next();
    }

    // Do not check for API routes
    if (request.originalUrl.indexOf('/api/') > -1) {
        return next();
    }

    var config = DioscouriCore.ApplicationFacade.instance.config;
    config = config && config._configuration && config._configuration.frontui;
    config = config || {};

    if (request.originalUrl !== "/login" && request.originalUrl !== "/admin/login" && config.requireLogin && !request.isAuthenticated()) {
        request.session.returnUrl = request.protocol + '://' + request.get('host') + request.originalUrl;
        if (request.originalUrl.indexOf("/admin") === 0) {
            return response.redirect('/admin/login');
        } else {
            return response.redirect('/login');
        }
    }
    next();
}

/**
 * Exporting Middleware
 * @type {checkRequireLogin}
 */
module.exports = checkRequireLogin;
