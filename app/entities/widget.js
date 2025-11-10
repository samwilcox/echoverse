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
 * An entity that represents a single Widget.
 */
class Widget {
    /**
     * Create a new instance of Widget.
     */
    constructor() {
        this._id = null;
        this._name = null;
        this._enabled = false;
    }
    
    /**
     * Get the widget identifier.
     * 
     * @returns {number} The widget identifier.
     */
    get id() {
        return this._id;
    }

    /**
     * Set the widget identifier.
     * 
     * @param {number} value - The widget identifier.
     */
    set id(value) {
        this._id = value;
    }

    /**
     * Get the widget name.
     * 
     * @returns {string} The widget name.
     */
    get name() {
        return this._name;
    }

    /**
     * Set the widget name.
     * 
     * @param {string} value - The widget name.
     */
    set name(value) {
        this._name = value;
    }

    /**
     * Get whether this widget is enabled.
     * 
     * @returns {boolean} True if enabled, false if disabled.
     */
    get enabled() {
        return this._enabled;
    }

    /**
     * Set whether this widget is enabled.
     * 
     * @param {boolean} value - True if enabled, false if disabled. 
     */
    set enabled(value) {
        this._enabled = value;
    }

    /**
     * Convert this widget into a vanilla javascript object.
     * 
     * @returns {Object} The vanilla javascript object representation of widgets object.
     */
    toObject() {
        return {
            id: this._id,
            name: this._name,
            enabled: this._enabled,
        };
    }

    /**
     * Create a new Widget entity from a vanilla javascript object.
     * 
     * @param {Object} obj - The vanilla javascript object representation of widgets object.
     * @returns {Widget} The Widget entity object instance.
     */
    fromObject(obj) {
        const widget = new Widget();

        widget.id = obj.id ?? null;
        widget.name = obj.name ?? null;
        widget.enabled = obj.enabled ?? null;

        return widget;
    }

    /**
     * Build the HTML of this widget.
     * 
     * @returns {string} The HTML source for this widget.
     */
    build() {
        
    }
}

module.exports = Widget;