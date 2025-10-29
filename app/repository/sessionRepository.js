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
     * Build a 'Session' entity from raw data.
     * 
     * @param {Object} data - The raw session data.
     * @param {string} sessionId - The session identifier.
     * @returns {Session|null} The constructed 'Session' entity or null if data is invalid.
     */
    static buildSessionFromData(data, sessionId) {
        const Session = require('../entities/session');
        const session = new Session();
        session.id = data ? data.id : sessionId;
        return session;
    }

    /**
     * Get the 'Session' entity by ID.
     * 
     * @param {string} sessionId - The session identifier.
     * @returns {Session|null} The 'Session' entity or null if not found.
     */
    static getSessionById(sessionId) {
        const data = this.loadSessionDataById(sessionId);
        return this.buildSessionFromData(data, sessionId);
    }
}

module.exports = SessionRepository;