/**
 * ECHOVERSE
 * A NodeJS Bulletin Board System
 * 
 * By Sam Wilcox
 * Email: sam@echoversebbs.com
 * Website: https://www.echoversebbs.com
 * 
 * Echoverse is released under the GPL v3+ license.
 * For further details, visit:
 * https://license.echoversebbs.com
 */

/**
 * An entity that represents a single feature.
 */
class Feature {
    /**
     * Create a new instance of Feature.
     */
    constructor() {
        this._id = null;
        this._name = null;
        this._enabled = false;
        this._users = null;
        this._groups = null;
        this._modification = null;
    }

    /**
     * Get the feature identifier.
     * 
     * @returns {number} The feature identifier.
     */
    get id() {
        return this._id;
    }

    /**
     * Set the feature identifier.
     * 
     * @param {number} value - The feature identifier.
     */
    set id(value) {
        this._id = value;
    }

    /**
     * Get the feature name.
     * 
     * @returns {string|null} The feature name.
     */
    get name() {
        return this._name;
    }

    /**
     * Set the feature name.
     * 
     * @param {string} value - The feature name.
     */
    set name(value) {
        this._name = value;
    }

    /**
     * Get whether the feature is enabled.
     * 
     * @returns {boolean} True if enabled; otherwise, false.
     */
    get enabled() {
        return this._enabled;
    }

    /**
     * Set whether the feature is enabled.
     * 
     * @param {boolean} value - True to enable; false to disable.
     */
    set enabled(value) {
        this._enabled = Boolean(value);
    }

    /**
     * Get the list of user identifiers allowed for this feature.
     * 
     * @returns {Array<number>|null} The array of user IDs, or null.
     */
    get users() {
        return this._users;
    }

    /**
     * Set the list of user identifiers allowed for this feature.
     * 
     * @param {Array<number>|null} value - The array of user IDs, or null.
     */
    set users(value) {
        this._users = value;
    }

    /**
     * Get the list of group identifiers allowed for this feature.
     * 
     * @returns {Array<number>|null} The array of group IDs, or null.
     */
    get groups() {
        return this._groups;
    }

    /**
     * Set the list of group identifiers allowed for this feature.
     * 
     * @param {Array<number>|null} value - The array of group IDs, or null.
     */
    set groups(value) {
        this._groups = value;
    }

    /**
     * Get the last modification timestamp.
     * 
     * @returns {Date|string|null} The modification timestamp.
     */
    get modification() {
        return this._modification;
    }

    /**
     * Set the last modification timestamp.
     * 
     * @param {Date|string|null} value - The modification timestamp.
     */
    set modification(value) {
        this._modification = value;
    }

    /**
     * Convert this Feature instance to a plain object.
     * 
     * @returns {Object} A plain object representation of the Group.
     */
    toObject() {
        return {
            id: this._id,
            name: this._name,
            enabled: this._enabled,
            users: this._users,
            groups: this._groups,
            modification: this._modification,
        };
    }

    /**
     * Create a new Feature instance from a plain object.
     * 
     * @param {Oject} obj - The object to create from.
     * @returns {Group} The new Group instance.
     */
    fromObject(obj) {
        const feature = new Feature();

        feature.id = obj.id ?? null;
        feature.name = obj.name ?? null;
        feature.enabled = obj.enabled ?? null;
        feature.users = obj.users ?? null;
        feature.groups = obj.groups ?? null;
        feature.modification = obj.modification ?? null;

        return feature;
    }
}

module.exports = Feature;