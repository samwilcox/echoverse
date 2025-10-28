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
 * Resonsible for handling and retrieval and construction of the 'Session' entity.
 */
class SessionRepository {
    /**
     * Fetch a session's raw data by ID.
     * 
     * @param {string} sessionId - The session identifier.
     * @returns {Object[]|null} The resulting data object or null if data is not found.
     */
    static loadSessionDataById(sessionId) {
        const CacheProviderFactory = require('../data/cache/cacheProviderFactory');
        const cache = CacheProviderFactory.create();
        const data = cache.get('sessions').find(session => session.id === sessionId);
        return data || null;
    }

    /**
     * 
     * @param {Object} data - The raw session data.
     * @param {string} sessionId - The session identifier.
     */
    static buildSessionFromData(data, sessionId) {

    }
}

module.exports = SessionRepository;