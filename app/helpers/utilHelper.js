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
}

module.exports = UtilHelper;