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

const CacheProviderFactory = require('../data/cache/cacheProviderFactory');
const TargetList = require('../lists/targetList');
const WidgetRepository = require('../repository/widgetRepository');
const Widgets = require('../widgets');

/**
 * Helpers for managing widgets.
 */
class WidgetHelper {
    /**
     * Gets the widgets for the current page.
     * 
     * @param {Object} req - The request object from Express.
     * @returns {Object} An object containing the widgets.
     */
    static getWidgets(req) {
        const widgets = {
            none: true,
            left: {
                enabled: false,
                raw: null,
                toHTML: null,
            },
            right: {
                enabled: false,
                raw: null,
                toHTML: null,
            },
            top: {
                enabled: false,
                raw: null,
                toHTML: null,
            },
            bottom: {
                enabled: false,
                raw: null,
                toHTML: null,
            }
        };

        const member = req._member;
        const widgetSettings = member.widgets;
        let none = true;

        const left = this.hasWidgets(req, 'left');
        const right = this.hasWidgets(req, 'right');
        const top = this.hasWidgets(req, 'top');
        const bottom = this.hasWidgets(req, 'bottom');

        if (left) {
            widgets.left.enabled = true;
            widgets.left.raw = widgetSettings.left.widgets;
            widgets.left.toHTML = this.getWidgetsLoc(req, 'left');
            none = false;
        }

        if (right) {
            widgets.right.enabled = true;
            widgets.right.raw = widgetSettings.right.widgets;
            widgets.right.toHTML = this.getWidgetsLoc(req, 'right');
            none = false;
        }

        if (top) {
            widgets.top.enabled = true;
            widgets.top.raw = widgetSettings.top.widgets;
            widgets.top.toHTML = this.getWidgetsLoc(req, 'top');
            none = false;
        }

        if (bottom) {
            widgets.bottom.enabled = true;
            widgets.bottom.raw = widgetSettings.bottom.widgets;
            widgets.bottom.toHTML = this.getWidgetsLoc(req, 'bottom');
            none = false;
        }

        widgets.none = none;

        return widgets;
    }

    /**
     * Check whether a given area on the current page has widgets.
     * 
     * @param {Object} req - The request object from Express.
     * @param {"top"|"bottom"|"left"|"right"} loc - The location of the widgets to check.
     * @returns {boolean} True if the given location has widgets, false if not.
     */
    static hasWidgets(req, loc) {
        const member = req._member;
        const current = req.originalUrl;
        const widgets = member.widgets;
        
        if (!widgets.enabled) return false;
    
        if (widgets.mode === 'all') {
            if (widgets[loc].enabled) return true;
        } else {
            const pages = widgets[loc].specific.pages;
            if (!pages) return false;

            pages.forEach(page => {
                if (page.toLowerCase() === loc.toLowerCase() && page.toLowerCase() === current) return true;
            });
        }

        return false;
    }

    /**
     * Get the widgets for the given location.
     * 
     * @param {Object} req - The request object from Express.
     * @param {"top"|"bottom"|"left"|"right"} loc - The location of the widgets to get.
     * @returns {string} The resulting widget source HTML.
     */
    static getWidgetsLoc(req, loc) {
        const member = req._member;
        const widgets = member.widgets;

        if (!widgets[loc].enabled || !this.isEnabled(req, loc)) return '';

        const widgetsData = widgets[loc].widgets;
        const w = widgetsData.arr;
        let out = '';

        if (w && w.length > 0) {
            w.forEach(wdgt => {
                const e = WidgetRepository.getWidgetById(wdgt);
                
                if (e && e.enabled) {
                    out += this.getWidget(e.id);
                }
            });
        }

        return out;
    }

    /**
     * Helper that checks whether the widgets for the given location is enabled.
     * 
     * @param {Object} req - The request object from Express.
     * @param {"top"|"bottom"|"left"|"right"} loc - The location of the widgets to check.
     * @returns {boolean} True if enabled, false if not.
     */
    static isEnabled(req, loc) {
        const member = req._member;
        const widgets = member.widgets;
        const theseWidgets = widgets[loc].widgets.arr;
        const totalWidgets = theseWidgets.length;

        if (totalWidgets > 0) {
            theseWidgets.forEach(widget => {
                const e = WidgetRepository.getWidgetById(widget);

                if (e) {
                    if (totalWidgets > 0) {
                        if (!e.enabled) {
                            totalWidgets--;
                        }
                    }
                }
            });

            if (totalWidgets > 0) return true;
        }

        return false;
    }

    /**
     * Get a widget by its identifier.
     * 
     * @param {number} widget - The identifier of the widget to get.
     * @returns {string} The resulting widget source HTML.
     */
    static getWidget(widgetId) {
        const widget = WidgetRepository.getWidgetById(widgetId);

        if (widget && widget.enabled) {
            switch (widget.name) {
                case 'whosOnline':
                    return Widgets.whosOnline();
                default:
                    return '';
            }
        }

        return '';
    }
}

module.exports = WidgetHelper;