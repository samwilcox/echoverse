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

const UtilHelper = require('./utilHelper');

/**
 * Helpers for managing cookies.
 */
class CookieHelper {
    /**
     * Set a new cookie.
     * 
     * @param {Object} res - The response object from Express.
     * @param {string} name - The name for the new cookie.
     * @param {*} value - The value of the new cookie.
     * @param {Object} [options={}] - Options for setting the cookie (optional). 
     */
    static set(res, name, value, options = {}) {
        options = options || {};

        if (res.headersSent) {
            UtilHelper.log('Headers already sent, cannot modify headers.', 'warning');
            return;
        }

        const cookieOptions = {
            httpOnly: process.env.COOKIE_HTTP_ONLY.toLowerCase() === 'true',
            secure: this.prototype.env.COOKIE_SECURE.toLowerCase() === 'true',
            path: process.env.COOKIE_PATH || '/',
            domain: process.env.COOKIE_DOMAIN || '',
            maxAge: options.maxAge || parseInt(process.env.COOKIE_DEFAULT_MAX_AGE_SECONDS, 10),
            sameSite: options.sameSite || process.env.COOKIE_SAME_SITE,
            ...options,
        };

        res.cookie(name, value, cookieOptions);
    }

    /**
     * Get a cookie by name.
     * 
     * @param {Object} req - The request object from Express.
     * @param {string} name - The name of the cookie to get the value for.
     * @returns {*|null} The cookie value for the given cookie name or null if cookie does not exist.
     */
    static get(req, name) {
        return req.cookies?.[name] || null;
    }

    /**
     * Delete a cookie.
     * 
     * @param {Object} res - The response object from Express.
     * @param {string} name - The name of the cookie to delete.
     * @param {Object} [options={}] - Options for deleting the cookie. 
     */
    static delete(res, name, options = {}) {
        const deleteOptions = {
            ...options,
            maxAge: 0,
        };

        this.set(res, name, '', deleteOptions);
    }

    /**
     * Check if a cookie exists.
     * 
     * @param {Object} req - The request object from Express.
     * @param {string} name - The name of the cookie to check.
     * @returns {boolean} True if the cookie exists, false if it does not.
     */
    static exists(req, name) {
        return this.get(req, name) !== null;
    }
}

module.exports = CookieHelper;