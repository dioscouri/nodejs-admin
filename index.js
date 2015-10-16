'use strict';

/**
 * Requiring Core Library
 *
 * WARNING: Core modules MUST be included from TOP Level Module.
 * All dependencies for core module must be excluded from the package.json
 */
var DioscouriCore = process.mainModule.require('dioscouri-core');

/**
 * Loader class for the model
 */
class Loader extends DioscouriCore.AppBootstrap {
    /**
     * Model loader constructor
     */
    constructor() {
        // We must call super() in child class to have access to 'this' in a constructor
        super();

        /**
         * Module name
         *
         * @type {null}
         * @private
         */
        this._moduleName = 'NodeJS Admin Module';

        /**
         * Module version
         * @type {string}
         * @private
         */
        this._moduleVersion = '0.0.1';
    }

    /**
     * Initializing module configuration
     */
    init() {
        super.init();

        // Loading module routes
        this.applicationFacade.server.loadRoutes('/app/routes', __dirname);

        // Loading models
        this.applicationFacade.loadModels(__dirname + '/app/models');

        // Init Passport
        var userModel = require('./app/models/user.js');
        this.applicationFacade.server.initPassport(userModel);

        this.applicationFacade.server.initAcl(require('./app/models/acl_permissions'));

        // Initializing Library Exports
        this.applicationFacade.registry.push('Admin.Controllers.BaseAuth', Loader.Admin.Controllers.BaseAuth);
        this.applicationFacade.registry.push('Admin.Controllers.BaseCRUD', Loader.Admin.Controllers.BaseCRUD);
        this.applicationFacade.registry.push('Admin.Models.ACLPermissions', Loader.Admin.Models.ACLPermissions);
        this.applicationFacade.registry.push('Admin.Models.ACLResources', Loader.Admin.Models.ACLResources);
        this.applicationFacade.registry.push('Admin.Models.ACLRoles', Loader.Admin.Models.ACLRoles);
        this.applicationFacade.registry.push('Admin.Models.Base', Loader.Admin.Models.Base);
        this.applicationFacade.registry.push('Admin.Models.Configuration', Loader.Admin.Models.Configuration);
        this.applicationFacade.registry.push('Admin.Models.LogAudit', Loader.Admin.Models.LogAudit);
        this.applicationFacade.registry.push('Admin.Models.LogSystem', Loader.Admin.Models.LogSystem);
        this.applicationFacade.registry.push('Admin.Models.Notification', Loader.Admin.Models.Notification);
        this.applicationFacade.registry.push('Admin.Models.QueueTask', Loader.Admin.Models.QueueTask);
        this.applicationFacade.registry.push('Admin.Models.QueueTaskArchive', Loader.Admin.Models.QueueTaskArchive);
        this.applicationFacade.registry.push('Admin.Models.User', Loader.Admin.Models.User);
        this.applicationFacade.registry.push('Admin.Models.Webhook', Loader.Admin.Models.Webhook);
        this.applicationFacade.registry.push('Admin.Models.WebhookEvent', Loader.Admin.Models.WebhookEvent);
        this.applicationFacade.registry.push('Admin.Models.Asset', Loader.Admin.Models.Asset);

        // Checking Symbolic links
        var fs = require('fs');
        try {
            if (!fs.existsSync(DioscouriCore.ApplicationFacade.instance.basePath + '/public/adminAssets')) {
                fs.symlinkSync(__dirname + '/app/assets', DioscouriCore.ApplicationFacade.instance.basePath + '/public/adminAssets', 'dir');
            }
        } catch (error) {
            console.error('ERROR: Failed to create symbolic links');
            console.error(error.message);
        }
    }

    /**
     * Bootstrapping module
     *
     * MongoDB is available on this stage
     */
    bootstrap() {
        super.bootstrap();
    }

    /**
     * Run module based on configuration settings
     */
    run() {
        super.run();
    }
}

/**
 * Exporting Library Classes
 *
 * @type {{Controllers: {BaseAuth: (AdminBaseController|exports|module.exports), BaseCRUD: (BaseCRUDController|exports|module.exports)}, Models: {ACLPermissions: (AclPermissionModel|exports|module.exports), ACLResources: (AclResourceModel|exports|module.exports), ACLRoles: (AclRoleModel|exports|module.exports), Base: (BaseModel|exports|module.exports), Configuration: (ConfigurationModel|exports|module.exports), LogAudit: (LogAuditModel|exports|module.exports), LogSystem: (LogSystemModel|exports|module.exports), Notification: (NotificationModel|exports|module.exports), QueueTask: (QueueTaskModel|exports|module.exports), QueueTaskArchive: (QueueTaskArchiveModel|exports|module.exports), User: (UserModel|exports|module.exports), Webhook: (WebhookModel|exports|module.exports), WebhookEvent: (WebhookEventsModel|exports|module.exports)}}}
 */
Loader.Admin = {
    Controllers: {
        BaseAuth: require('./app/controllers/base.js'),
        BaseCRUD: require('./app/controllers/basecrud.js')
    },
    Models: {
        ACLPermissions: require('./app/models/acl_permissions.js'),
        ACLResources: require('./app/models/acl_resources.js'),
        ACLRoles: require('./app/models/acl_roles.js'),
        Base: require('./app/models/base.js'),
        Configuration: require('./app/models/configuration.js'),
        LogAudit: require('./app/models/log_audit.js'),
        LogSystem: require('./app/models/log_system.js'),
        Notification: require('./app/models/notification.js'),
        QueueTask: require('./app/models/queue_task.js'),
        QueueTaskArchive: require('./app/models/queue_task_archive.js'),
        User: require('./app/models/user.js'),
        Webhook: require('./app/models/webhook.js'),
        WebhookEvent: require('./app/models/webhookevent.js'),
        Asset: require('./app/models/asset.js')
    }
};

/**
 * Exporting module classes and methods
 */
module.exports = Loader;