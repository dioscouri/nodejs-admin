// Using STRICT mode for ES6 features
"use strict";

/**
 * Requiring Core Library
 */
var DioscouriCore = process.mainModule.require('dioscouri-core');

/**
 * Requiring base Controller
 */
var AdminBaseCrudController = require('./basecrud.js');

/**
 * Module for parsing multipart-form data requests
 */
var multiparty = require('multiparty');

/**
 * Async Module
 */
var async = require('async');

/**
 *  AdminAclRoles controller
 */
class AdminAssets extends AdminBaseCrudController {

    /**
     * Controller constructor
     */
    constructor(request, response) {
        // We must call super() in child class to have access to 'this' in a constructor
        super(request, response);

        /**
         * Current CRUD model instance
         *
         * @type {MongooseModel}
         * @private
         */
        this._model = require('../models/asset.js');

        /**
         * Context of the controller
         *
         * @type {string}
         * @private
         */
        this._baseUrl = '/admin/asset';

        /**
         * Path to controller views
         *
         * @type {string}
         * @private
         */
        this._viewsPath = 'asset';
    }

    /**
     * Extract item from request
     *
     * @param item
     * @returns {{}}
     */
    getItemFromRequest(item) {
        var result = super.getItemFromRequest(item);

        result.name = this.request.body.name;

        return result;
    }

    /**
     * Init data
     *
     * @param readyCallback
     */
    init(readyCallback) {
        super.init(function (err) {
            if (err) return readyCallback(err);

            if (this.request.method === 'POST') {

                async.waterfall([function (callback) {

                    var form = new multiparty.Form();

                    form.parse(this.request, function (err, fields, files) {
                        if (err) return callback(err);

                        this.request.body = fields;

                        callback(null, files);

                    }.bind(this));

                }.bind(this), function (files, callback) {

                    if (!files.file || !files.file[0]) {
                        return callback();
                    }

                    /**
                     * Upload file to the cloud
                     */
                    var client = new DioscouriCore.PkgClient();

                    client.upload(files.file[0].path, {
                        containerName: 'assets',
                        containerCdn: true,
                        fileName: files.file[0].originalFilename
                    }, function(err, remoteFile) {
                        if (err) return callback(err);

                        this.request.body.cdnUrl = remoteFile.cdnUrl;
                        this.request.body.fileName = remoteFile.name;

                        callback();
                    }.bind(this));

                }.bind(this)], readyCallback);

            } else {
                readyCallback();
            }

        }.bind(this));
    }
}

/**
 * Exporting Controller
 *
 * @type {Function}
 */
exports = module.exports = AdminAssets;