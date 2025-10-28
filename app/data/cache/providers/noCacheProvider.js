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

const CacheInterface = require('../cacheInterface');
const toCache = require('../toCache');
const DatabaseProviderFactory = require('../../db/databaseProviderFactory');
const QueryBuilder = require('../../db/queryBuilder');
const UtilHelper = require('../../../helpers/utilHelper');

/**
 * Concrete implementation of the CacheInterface for no caching.
 */
class NoCacheProvider extends CacheInterface {
    /**
     * Creates a new instance of NoCacheProvider.
     */
    constructor() {
        super();
        this._cache = {};
        this._toCache = toCache();
        this._db = DatabaseProviderFactory.create();
        this._builder = new QueryBuilder();
    }

    /**
     * Build the cache.
     * 
     * @throws {Error} If the cache building process fails.
     */
    async build() {
        try {
            UtilHelper.log('Building the cache...');

            await Promise.all(this._toCache.map(async (item) => {
                if (!this._cache.hasOwnProperty(item)) {
                    await this.update(item);
                }
            }));
        } catch (error) {
            UtilHelper.log(`The cache building process failed: ${error}.`, 'error');
            throw error;
        }
    }

    /**
     * Update a given target (table or collection) in the cache.
     * 
     * @param {string} target - The target to update (table or collection).
     * @throws {Error} If the cache update fails.
     */
    async update(target) {
        try {
            const data = await this._db.query(this._builder.clear().select().from(target).build());

            if (!data || data.length === 0) {
                UtilHelper.log(`No data returned for target: ${target}.`, 'warning');
            }

            this._cache[target] = data;
        } catch (error) {
            UtilHelper.log(`Failed to update cache for target: ${target}. Error: ${error}.`, 'error');
            throw error;
        }
    }

    /**
     * Update all the given targets (table or collection) in the cache.
     * 
     * @param {string[]} targets - Array of targets (table or collection) to update in the cache.
     * @throws {Error} If the targets parameter is not an array or if the cache update process fails. 
     */
    async updateAll(targets) {
        if (!Array.isArray(targets)) {
            throw new Error('Cache provider updateAll() method targets parameter must be an array.');
        }

        for (const target of targets) {
            await this.update(target);
        }
    }

    /**
     * Get the data for the given target (table or collection).
     * 
     * @param {string} target - The target to get data from (table or collection).
     * @returns {Object[]} An array of data objects for the specified target.
     */
    get(target) {
        if (target in this._cache) {
            return this._cache[target];
        }

        return [];
    }

    /**
     * Get data for the given targets (table or collection).
     * 
     * @param {Object} targets - An object containing key-value pairs mapping the target.
     * @returns {Object} An object with key-value pairs for each requested target (table or collection).
     * @throws {Error} If the targets parameter is not an object.
     */
    getAll(targets) {
        if (!targets || typeof targets !== 'object') {
            throw new Error('Cache provider getAll() method targets parameter must be an object.');
        }

        const list = {};

        for (const key in targets) {
            list[key] = this.get(targets[key]);
        }

        return list;
    }
}

module.exports = NoCacheProvider;