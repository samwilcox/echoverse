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
 * Helpers for the most commonly used tasks.
 */
class UtilHelper {
    /**
     * 
     * @param {string} message - The message to log.
     * @param {"normal"|"debug"|"warning"|"error"} [type='normal'] - The message type (default is normal). 
     */
    static log(message, type = 'normal') {

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
}

module.exports = UtilHelper;