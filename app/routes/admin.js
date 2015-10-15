'use strict';

module.exports = function () {
    return {
        // Application index route
        'get|/admin': 'index.js',

        'get,post|/admin/login': 'login.js',

        // System Log route
        'get|/admin/system_logs': 'system_logs.js',
        'get|/admin/system_logs/page/:page': 'system_logs.js',

        // Audit Log routes
        'get|/admin/audit_logs': 'audit_logs.js',
        'get|/admin/audit_logs/page/:page': 'audit_logs.js',

        // System notifications routes
        'get|/admin/notifications': 'notifications.js',
        'get|/admin/notifications/page/:page': 'notifications.js',

        // User management routes
        'get|/admin/users': 'users.js',
        'get,post|/admin/user/:action': 'users.js',
        'get,post|/admin/user/:id/:action': 'users.js',

        // ACL Resources management routes
        'get|/admin/acl_resources': 'acl_resources.js',
        'get,post|/admin/acl_resource/:action': 'acl_resources.js',
        'get,post|/admin/acl_resource/:id/:action': 'acl_resources.js',

        // ACL Roles management routes
        'get|/admin/acl_roles': 'acl_roles.js',
        'get,post|/admin/acl_role/:action': 'acl_roles.js',
        'get,post|/admin/acl_role/:id/:action': 'acl_roles.js',

        // ACL Permissions management routes
        'get|/admin/acl_permissions': 'acl_permissions.js',
        'get,post|/admin/acl_permission/:action': 'acl_permissions.js',
        'get,post|/admin/acl_permission/:id/:action': 'acl_permissions.js',

        // Webhook Events management routes
        'get|/admin/webhookevents': 'webhookevents.js',
        'get,post|/admin/webhookevent/:action': 'webhookevents.js',
        'get,post|/admin/webhookevent/:id/:action': 'webhookevents.js',

        // Webhooks management routes
        'get|/admin/webhooks': 'webhooks.js',
        'get,post|/admin/webhook/:action': 'webhooks.js',
        'get,post|/admin/webhook/:id/:action': 'webhooks.js',

        // Queue Jobs routes
        'get|/admin/queue_tasks': 'queue_tasks.js',
        'get|/admin/queue_tasks/page/:page': 'queue_tasks.js',
        'get,post|/admin/queue_task/:action': 'queue_tasks.js',
        'get,post|/admin/queue_task/:id/:action': 'queue_tasks.js',

        // Queue Archive Jobs routes
        'get|/admin/queue_tasks_archives': 'queue_tasks_archive.js',
        'get|/admin/queue_tasks_archives/page/:page': 'queue_tasks_archive.js',
        'get,post|/admin/queue_tasks_archive/:action': 'queue_tasks_archive.js',
        'get,post|/admin/queue_tasks_archive/:id/:action': 'queue_tasks_archive.js',

        // Configuration management routes
        'get|/admin/configurations': 'configuration.js',
        'get,post|/admin/configuration/:action': 'configuration.js',
        'get,post|/admin/configuration/:id/:action': 'configuration.js'
    };
};
