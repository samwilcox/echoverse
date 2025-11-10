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

const UninitializedError = require('../errors/uninitializedError');

/**
 * Helpers for managing session data.
 */
class SessionHelper {
    /**
     * Set a session variable.
     * 
     * @param {Object} req - The request object from Express.
     * @param {string} key - The name for the key.
     * @param {*} value - The value to set.
     */
    static set (req, key, value) {
        if (!req.session) {
            throw new UninitializedError('Session is not initialized');
        }

        req.session[key] = value;
    }

    /**
     * Get a session variable value.
     * 
     * @param {Object} req - The request object from Express.
     * @param {string} key - The key to get value for.
     * @returns {*|null} The value for the given key or null if key does not exist.
     */
    static get(req, key) {
        return req.session && req.session[key] ? req.session[key] : null;
    }

    /**
     * Check if a session variable exists.
     * 
     * @param {Object} req - The request object from Express.
     * @param {string} key - The key to check.
     * @returns {boolean} True if the key exists, false if it does not.
     */
    static exists(req, key) {
        return req.session && key in req.session;
    }

    /**
     * Delete a session variable.
     * 
     * @param {Object} req - The request object from Express.
     * @param {string} key - The name of the key to delete.
     */
    static delete(req, key) {
        if (req.session && this.exists(req, key)) {
            delete req.session[key];
        }
    }

    /**
     * Get the total size of the session.
     * This is basically the total set session variables.
     * 
     * @param {Object} req - The request object from Express.
     * @returns {number} The total session variables set.
     */
    static size(req) {
        return req.session ? Object.keys(req.session).length : 0;
    }

    /**
     * Get the entire session collection object.
     * 
     * @param {Object} req - The request object from Express.
     * @returns {Object} The session data object.
     */
    static getAll(req) {
        return { ...this.req.session || {} };
    }
}

module.exports = SessionHelper;