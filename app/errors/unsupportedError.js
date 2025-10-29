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
 * Error thrown when something is not supported.
 */
class UnsupportedError extends Error {
    /**
     * Create a new instance of UnsupportedError.
     * 
     * @param {string} message - The error message.
     * @param {Object} [data={}] - Optional error metadata. 
     */
    constructor(message, data = {}) {
        super(message);
        this.name = this.constructor.name;
        this.data = data;
        Error.captureStackTrace(this, this.constructor);
    }
}

module.exports = UnsupportedError;