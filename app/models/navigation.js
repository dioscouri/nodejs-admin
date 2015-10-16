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

        var Types = this.mongoose.Schema.Types;

        var schemaObject = {
            name: {type: String, index: true},
            icon: {type: String},
            url: {type: String},
            parent: {type: String, index: true},
            key: {type: String, index: true, unique: true}
        };

        // Creating DBO Schema
        var NavigationDBOSchema = this.createSchema(schemaObject);

        NavigationDBOSchema.pre('save', function (next) {

            if (this.parent) {
                this.key = this.parent + '-' + this.name;
            } else {
                this.key = this.name;
            }

            next();
        });

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
        var itemObject = new this.model(element);

        itemObject.save(function (err) {
            if (callback) callback(err);
            this.buildNavigation();
        }.bind(this));
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
        this.getAll(function (err, items) {
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