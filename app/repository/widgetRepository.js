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

const TargetList = require('../lists/targetList');

/**
 * Responsible
 */
class WidgetRepository {
    /**
     * Fetch a widget's raw data by ID.
     * 
     * @param {number} widgetId - The widget identifier.
     * @returns {Object[]|null} The resulting data object or null if data is not found.
     */
    static loadWidgetDataById(widgetId) {
        const CacheProviderFactory = require('../data/cache/cacheProviderFactory');
        const cache = CacheProviderFactory.create();
        const data = cache.get(TargetList.WIDGETS).find(widget => widget.id === parseInt(widgetId, 10));
        return data || null;
    }

    /**
     * Fetch a widget's raw data by it's name.
     * 
     * @param {string} name - The name of the widget.
     * @returns {Object[]|null} The resulting data object or null if data is not found.
     */
    static loadWidgetDataByName(name) {
        const CacheProviderFactory = require('../data/cache/cacheProviderFactory');
        const cache = CacheProviderFactory.create();
        const data = cache.get(TargetList.WIDGETS).find(widget => widget.name === name);
        return data || null;
    }

    /**
     * Build a 'Widget' entity from raw data.
     * 
     * @param {Object} data - The raw widget data.
     * @param {number} widgetId - The widget identifier.
     * @returns {Widget|null} The constructed 'Widget' entity or null if data is invalid.
     */
    static buildWidgetFromData(data, widgetId) {
        const Widget = require('../entities/widget');
        const widget = new Widget();

        widget.id = data && data.id ? parseInt(data.id) : widgetId;
        widget.name = data && data.name ? data.name : null;
        widget.enabled = data && data.enabled ? true : false;

        return widget;
    }

    /**
     * Get the 'Widget' entity by ID.
     * 
     * @param {number} widgetId - The widget identifier.
     * @returns {Widget|null} The 'Widget' entity or null if not found.
     */
    static getWidgetById(widgetId) {
        const data = this.loadWidgetDataById(widgetId);
        return this.buildWidgetFromData(data, widgetId);
    }

    /**
     * Get the 'Widget' entity by it's name.
     * 
     * @param {string} name - The name of the widget (case-sensitive).
     * @returns {Widget|null} The 'Widget'entity or null if not found.
     */
    static getWidgetByName(name) {
        const data = this.loadWidgetDataByName(name);
        return this.buildWidgetFromData(data, data.id ?? null);
    }
}

module.exports = WidgetRepository;