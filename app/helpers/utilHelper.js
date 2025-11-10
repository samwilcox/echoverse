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

const Settings = require('../settings');
const DataStoreService = require('../services/datastoreService');
const OutputHelper = require('./outputHelper');
const slugify = require('slugify');
const memberService = require('../services/memberService');
const TargetList = require('../lists/targetList');
const DateTimeHelper = require('./dateTimeHelper');
const CookieHelper = require('./cookieHelper');
const CookieList = require('../lists/cookieList');

/**
 * Helpers for the most commonly used tasks.
 */
class UtilHelper {
    /**
     * Log a message.
     * 
     * @param {string} message - The message to log.
     * @param {"normal"|"debug"|"warning"|"error"} [type='normal'] - The message type (default is normal). 
     */
    static log(message, type = 'normal') {
        const colors = {
            reset: '\x1b[0m',
            gray: '\x1b[90m',
            green: '\x1b[32m',
            yellow: '\x1b[33m',
            red: '\x1b[31m',
            cyan: '\x1b[36m'
        };

        const now = new Date();
        const timestamp = now.toISOString().replace('T', ' ').split('.')[0];

        let color;
        let label;
        let display = false;

        switch (type) {
            case 'debug':
                color = colors.cyan;
                label = '[DEBUG]';
                display = process.env.DEBUG.toLowerCase() === 'true' ? true : false;
                break;
            
            case 'warning':
                color = colors.yellow;
                label = '[WARN]';
                display = process.env.WARNINGS.toLowerCase() === 'true' ? true : false;
                break;

            case 'error':
                color = colors.red;
                label = '[ERROR]';
                display = true;
                break;
            
            default:
                color = colors.green;
                label = '[INFO]';
                display = true;
                break;
        }

        if (display) {
            console.log(`${colors.gray}[${timestamp}]${colors.reset} ${color}${label}${colors.reset}: ${message}`);
        }
    }

    /**
     * Get the index inside an array with a given needle.
     * 
     * @param {Array} arr - The array in which to get the index in. 
     * @param {*} needle - The value to get the index for.
     * @returns {number} The index of the value. 
     */
    static getIndexInArr(arr, needle) {
        for (let i = 0; i < arr.length; i++) {
            if (arr[i] === needle) {
                return i;
            }
        }
    } 

    /**
     * Get the current user's IP address.
     * 
     * @param {Object} req - The request object from Express.
     * @returns {string} The user's IP address.
     */
    static getUserIp(req) {
        let ip = req.ip;

        if (ip === '::1' || ip.startsWith('::ffff:')) {
            ip = '127.0.0.1';
        }

        return ip;
    }

    /**
     * Detects whether the user is a search bot.
     * 
     * @param {Object} req - The request object from Express.
     * @returns {Object} Object containing resulting data.
     */
    static detectBots(req) {
        const userAgent = req.headers['user-agent'];
        const botData = { isBot: false, name: null };
        const bots = Settings.get('searchBotListing');

        if (bots) {
            for (const bot of bots) {
                const pattern = typeof bot.pattern === 'string' ? new RegExp(bot.pattern) : bot.pattern;

                if (pattern.test(userAgent)) {
                    botData.isBot = true;
                    botData.name = bot.name;
                    break;
                }
            }
        }

        return botData;
    }

    /**
     * Build an Echoverse URL string.
     * 
     * @param {string[]|null} [segments=null] - An array of segments of the URL (e.g., one/two/three) (default is null). 
     * @param {Object} [options={}] - Options for building the URL.
     * @param {Object} [options.query=null] - Optional query string object (default is null).
     * @returns {string} The URL web address string. 
     */
    static buildUrl(segments = null, options = {}) {
        const { query = null } = options;
        let url = process.env.BASE_URL;
        let initial = true;
        if (!segments) return url;

        segments.forEach(segment => {
            url += `/${segment}`;
        });

        if (query) {
            for (const key in query) {
                url += `${initial ? '?' : '&'}${key}=${query[key]}`;
                initial = false;
            }
        }

        return url;
    }

    /**
     * Initialize the breadcrumbs.
     */
    static initializeBreadcrumbs() {
        DataStoreService.set('breadcrumbs', []);
    }

    /**
     * Add a new breadcrumb.
     * 
     * @param {string} title - The title for the breadcrmb.
     * @param {string} url - The URL address to the breadcrumb.
     */
    static addBreadcrumb(title, url) {
        let breadcrumbs = DataStoreService.get('breadcrumbs');

        if (!breadcrumbs.some(breadcrumb => breadcrumb.title === title)) {
            breadcrumbs.push({
                title,
                url,
            });
        }

        DataStoreService.set('breadcrumbs', breadcrumbs);
    }

    /**
     * Get the breadcrumbs.
     * 
     * @returns {Object[]} An array of breadcrumb objects.
     */
    static getBreadcrumbs() {
        return DataStoreService.get('breadcrumbs');
    }

    /**
     * Build a link.
     * 
     * @param {string} title - The title of the link.
     * @param {Object} [options={}] - Options for building the link. 
     * @param {string} [options.url=''] - The URL web address for this link (default is blank).
     * @param {boolean} [options.js=false] - True if the link is using javascript, false if just a normal link (default is false).
     * @param {string} [options.jsText=null] - The javascript string (e.g., onclick="callMe();") (default is null).
     * @param {Object} [options.data=null] - An object of key-value pairs for data parameters.
     * @param {string} [options.target=null] - The target window for the link to open in (default is null).
     * @param {string} [options.separator=null] - A separating character or characters to separate this link from others.
     * @param {string} [options.icon=null] - The icon to append to the beginning of the link (default is null).
     * @param {string} [options.trailingIcon=null] - The icon to place at the end of the link (default is null).
     * @param {string} [options.tooltip=null] - The tooltip text for the link (default is null).
     * @param {string} [options.tooltipPlacement='top'] - The placement of the tooltip from the link (default is 'top').
     * @param {string} [options.cssClasses=null] - An array of CSS classes to add to the link element.
     * @param {boolean} [options.emphasize=false] - True to bold the link, false for normal text for the link (default is false).
     * @returns {string} The resulting link source.
     */
    static buildLink(title, options = {}) {
        const {
            url = '',
            js = false,
            jsText = null,
            data = null,
            target = null,
            separator = null,
            icon = null,
            trailingIcon = null,
            tooltip = null,
            tooltipPlacement = null,
            cssClasses = null,
            emphasize = false,
        } = options;

        return OutputHelper.getPartial('utilHelper', 'link', {
            title,
            url,
            js,
            jsText,
            data,
            target,
            separator,
            icon,
            trailingIcon,
            tooltip,
            tooltipPlacement,
            cssClasses,
            emphasize,
        });
    }

    /**
     * Format a number into a human-readable format (e.g., 1.23K, 4.45M, 32.30G).
     * If the value is under 1000, then the number just gets returned as is.
     * 
     * @param {number} number - The number to format.
     * @param {Object} [options={}] - Options for formatting the number.
     * @param {number} [options.decimals=2] - The total decimal points to format (default is 2).
     * @param {boolean} [options.space=false] - True to include a space between the number and the unit, false not to (default is false).
     * @param {boolean} [options.fullUnit=false] - True to show the entire unit (e.g., KB, MB, etc), false to show the single character unit representation (default false).
     * @returns {string} The formatted number string.
     * 
     * @example
     * formatNumber(124645); // -> 124.64K
     * formatNumber(124645, { fullUnit: true }); // -> 124.64KB
     * formatNumber(124645, { space: true }); // -> 124.64 K
     * formatNumber(124645, { space: true, fullUnit: true }); // -> 124.64 KB
     */
    static formatNumber(number, options = {}) {
        const {
            decimals = 2,
            space = false,
            fullUnit = false,
        } = options;

        if (number < 1000) {
            return number.toString();
        }

        const units = {
            single: ["", "K", "M", "G", "T", "P", "E"],
            full: ["", "KB", "MB", "GB", "TB", "PB", "EB"],
        };

        const index = Math.floor(Math.log10(number) / 3);
        const scaledNum = (number / Math.pow(1000, index)).toFixed(decimals);
        return `${scaledNum.replace(/\.?0+$/, "")}${space ? ' ' : ''}${fullUnit ? units.full[index] : units.single[index]}`;
    }

    /**
     * Add an identifier and name to an URL and slugify the name.
     * 
     * @param {number|string} id - The identifier to add.    
     * @param {string} name - The name to add.
     * @returns {string} - The id and name slugified for the URL.
     */
    static addIdAndNumberToUrl(id, name) {
        const cleanedString = String(name).replace(/[^\w\s-]/g, '-');
        return `${id}/${slugify(cleanedString, { lower: true, replacement: '-' })}`;
    }

    /**
     * Check if a given content is read.
     * 
     * @param {"forum"|"topic"} contentType - The content type of the content.
     * @param {number} contentId - The content identifier. 
     * @param {Date} timestamp - The timestamp Date object.
     * @returns {boolean} True if read, false if not. 
     */
    static isContentRead(contentType, contentId, timestamp) {
        const member = memberService.member;
        const CacheProviderFactory = require('../data/cache/cacheProviderFactory');
        const cache = CacheProviderFactory.create();

        if (member.signedIn) {
            const data = cache.get(TargetList.CONTENT_TRACKER).find(content => content.contentType === contentType && content.contentId === contentId && content.memberId === member.id);
            const exists = data ? true : false;

            if (!exists) return false;

            if (data.lastReadOn <= DateTimeHelper.dateToEpoch(timestamp)) {
                return true;
            } else {
                return false;
            }
        } else {
            const req = DataStoreService.get('request');

            if (CookieHelper.exists(req, CookieList.CONTENT_TRACKER)) {
                const tracker = JSON.parse(CookieHelper.get(req, CookieList.CONTENT_TRACKER));
                const trackerData = tracker.find(t => t.contentType === contentType && t.contentId == contentId);
                const exists = trackerData ? true : false;

                if (exists) return false;

                if (trackerData.lastReadOn <= DateTimeHelper.dateToEpoch(timestamp)) {
                    return true;
                } else {
                    return false;
                }
            } else {
                return false;
            }
        }
    }
}

module.exports = UtilHelper;