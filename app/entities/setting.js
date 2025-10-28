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
 * An entity that represents a single setting.
 */
class Setting {
    /**
     * Returns a new instance of Setting.
     */
    constructor() {
        this._id = null;
        this._type = null;
        this._name = null;
        this._value = null;
        this._defaultValue = null;
        this._description = null;
        this._category = null;
    }

    /**
     * Get the setting identifier.
     * 
     * @returns {number} The setting identifier.
     */
    get id() {
        return this._id;
    }

    /**
     * Set the setting identifier.
     * 
     * @param {*} value - The setting value to set. 
     */
    set id(value) {
        this._id = value;
    }

    /**
     * Get the setting type.
     * 
     * @returns {string} The type of the setting (e.g., 'string', 'number', 'boolean').
     */
    get type() {
        return this._type;
    }

    /**
     * Set the setting type.
     * 
     * @param {string} value - The type of the setting to set.
     */
    set type(value) {
        this._type = value;
    }

    /**
     * Get the setting name.
     * 
     * @returns {string} The name of the setting.
     */
    get name() {
        return this._name;
    }

    /**
     * Set the setting name.
     * 
     * @param {string} value - The name of the setting to set.
     */
    set name(value) {
        this._name = value;
    }

    /**
     * Get the setting value.
     * 
     * @returns {*} The value of the setting.
     */
    get value() {
        return this._value;
    }

    /**
     * Set the setting value.
     * 
     * @param {*} value - The value of the setting to set.
     */
    set value(value) {
        this._value = value;
    }

    /**
     * Get the default value of the setting.
     * 
     * @returns {*} The default value of the setting.
     */
    get defaultValue() {
        return this._defaultValue;
    }

    /**
     * Set the default value of the setting.
     * 
     * @param {*} value - The default value to set.
     */
    set defaultValue(value) {
        this._defaultValue = value;
    }

    /**
     * Get the description for this setting.
     * 
     * @returns {string} The description of the setting.
     */
    get description() {
        return this._description;
    }

    /**
     * Set the description for this setting.
     * 
     * @param {string} value - The description to set.
     */
    set description(value) {
        this._description = value;
    }

    /**
     * Get the category for this setting.
     * 
     * @returns {string} The category name for the setting.
     */
    get category() {
        return this._category;
    }

    /**
     * Set the category for this setting.
     * 
     * @param {string} value - The category name to set.
     */
    set category(value) {
        this._category = value;
    }

    /**
     * Reset this setting to its default value.
     */
    reset() {
        this._value = this._defaultValue;
    }

    /**
     * Convert this Setting to a plain object.
     * 
     * @returns {object} A plain object representation of this Setting.
     */
    toObject() {
        return {
            id: this._id,
            type: this._type,
            name: this._name,
            value: this._value,
            defaultValue: this._defaultValue,
            description: this._description,
            category: this._category,
        };
    }

    /**
     * Create a new Setting instance from a plain object.
     * 
     * @param {object} obj - The object to create from.
     * @returns {Setting} The new Setting instance.
     */
    fromObject(obj) {
        const setting = new Setting();

        setting.id = obj.id ?? null;
        setting.type = obj.type ?? null;
        setting.name = obj.name ?? null;
        setting.value = obj.value ?? null;
        setting.defaultValue = obj.defaultValue ?? null;
        setting.description = obj.description ?? null;
        setting.category = obj.category ?? null;

        return setting;
    }
}

module.exports = Setting;