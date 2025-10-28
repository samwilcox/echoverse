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
 * Interface contract for cache providers to implement.
 */
class CacheInterface {
    /**
     * Build the cache.
     * 
     * @throws {Error} If this method is not implemented by a cache provider class.
     */
    build() {
        throw new Error('build() method must be implemented.');
    }

    /**
     * Update a given target (table or collection) in the cache.
     * 
     * @param {string} target - The target to update (table or collection).
     * @throws {Error} If this method is not implemented by a cache provider class.
     */
    update(target) {
        throw new Error('update() method must be implemented.');
    }

    /**
     * Update all the given targets (table or collection) in the cache.
     * 
     * @param {string[]} targets - Array of targets (table or collection) to update in the cache.
     * @throws {Error} If this method is not implemented by a cache provider class. 
     */
    updateAll(targets) {
        throw new Error('updateAll() method must be implemented.');
    }

    /**
     * Get the data for the given target (table or collection).
     * 
     * @param {string} target - The target to get data from (table or collection).
     * @returns {Object[]} An array of data objects for the specified target.
     * @throws {Error} If this method is not implemented by a cache provider class.
     */
    get(target) {
        throw new Error('get() method must be implemented.');
    }

    /**
     * Get data for the given targets (table or collection).
     * 
     * @param {Object} targets - An object containing key-value pairs mapping the target.
     * @returns {Object} An object with key-value pairs for each requested target (table or collection).
     * @throws {Error} If this method is not implemented by a cache provider class.
     */
    getAll(targets) {
        throw new Error('getAll() method must be implemented.');
    }
}

module.exports = CacheInterface;