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

const NoCacheProvider = require('./providers/noCacheProvider');

/**
 * Factory class or creating instances of different cache providers.
 */
class CacheProviderFactory {
    static _instance = null;

    /**
     * Creates an instance of the cache provider based on the set type.
     * 
     * @returns {CacheInterface} An instance of the appropriate cache provider.
     * @throws {Error} If the specified cache type is not supported.
     */
    static create() {
        if (CacheProviderFactory._instance !== null) {
            return CacheProviderFactory._instance;
        }

        const enabled = process.env.CACHE_ENABLED.toLowerCase() === 'true';

        if (enabled) {
            switch (process.env.CACHE_MRTHOD.toLowerCase()) {
                default:
                    CacheProviderFactory._instance = new NoCacheProvider();
                    break;
            }
        } else {
            CacheProviderFactory._instance = new NoCacheProvider();
        }

        return CacheProviderFactory._instance;
    }
}

module.exports = CacheProviderFactory;