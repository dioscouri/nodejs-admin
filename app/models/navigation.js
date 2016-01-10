'use strict';

/**
 * Base model
 */
var BaseModel = require('./base');

/**
 *  Navigation model
 */
class NavigationModel extends BaseModel {
    /**
     * Model constructor
     */
    constructor(listName) {
        // We must call super() in child class to have access to 'this' in a constructor
        super(listName);

        /**
         * Navigation tree structure
         * @type {null}
         * @private
         */
        this._navigation = null;

        /**
         * Rebuild timeut
         * @type {null}
         * @private
         */
        this._timeout = null;
    }

    get navigation() {
        return this._navigation;
    }

    /**
     * Define Schema
     *
     * @override
     */
    defineSchema() {

        var schemaObject = {
            name: {type: String, index: true},
            icon: {type: String},
            url: {type: String},
            parent: {type: String, index: true},
            key: {type: String, index: true, unique: true},
            order: {type: Number}
        };

        // Creating DBO Schema
        var NavigationDBOSchema = this.createSchema(schemaObject);

        // Registering schema and initializing model
        this.registerSchema(NavigationDBOSchema);
    }

    /**
     * Create Navigation element
     *
     * @param element
     * @param callback
     */
    create(element, callback) {

        if (typeof callback !== 'function') callback = () => {};

        if (element.parent) {
            element.key = element.parent + '-' + element.name;
        } else {
            element.key = element.name;
        }

        this.model.find({key: element.key}, (err, item) => {
            if (err) return callback(err);

            if (!item) {
                var itemObject = new this.model(element);

                itemObject.save((err) => {
                    if (err) callback(err);
                    this.buildNavigation();
                    callback();
                });
            } else {
                console.log('item: ' + item._id);
                callback();
            }
        });
    }

    /**
     * Update Navigation element
     *
     * @param element
     * @param callback
     */
    update(element, callback) {
        // TODO
        if (callback) callback();
    }

    /**
     * Delete Navigation element
     *
     * @param element
     * @param callback
     */
    'delete'(element, callback) {
        // TODO
        if (callback) callback();
    }

    buildNavigation() {
        if (this._timeout) {
            clearTimeout(this._timeout);
        }
        this._timeout = setTimeout(this.doBuildNavigation.bind(this), 1000);
    }

    doBuildNavigation() {
        this.model.find().sort({order: 'asc'}).exec(function (err, items) {
            if (err) return this._logger.error(err);

            var elements = items.filter(function (item) {
                return !item.parent;
            });

            function getDescendants(element) {
                items.forEach(function (item) {
                    if (item.parent === element.name) {
                        if (!element.descendants) element.descendants = [];
                        element.descendants.push(item);
                        // Recursive
                        getDescendants(item, items);
                    }
                });
                return element;
            }

            var elementsLength = elements.length;
            for (var i = 0; i < elementsLength; i++) {
                elements[i] = getDescendants(elements[i].toObject());
            }

            this._navigation = elements;

        }.bind(this));
    }
}

/**
 * Creating instance of the model
 */
var modelInstance = new NavigationModel('navigation');

/**
 * Exporting Model
 *
 * @type {Function}
 */
exports = module.exports = modelInstance;