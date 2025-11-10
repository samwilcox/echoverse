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

const CacheProviderFactory = require('../data/cache/cacheProviderFactory');
const DatabaseProviderFactory = require('../data/db/databaseProviderFactory');
const QueryBuilder = require('../data/db/queryBuilder');
const MissingParameterError = require('../errors/missingParameterError');
const DateTimeHelper = require('../helpers/dateTimeHelper');
const UtilHelper = require('../helpers/utilHelper');
const TargetList = require('../lists/targetList');

/**
 * Service providing access to the Echoverse data registry.
 */
class RegistryService {
    static _instance = null;

    /**
     * Create a new instance of RegistryService.
     */
    constructor() {
        this._reg = {};
    }

    /**
     * Get the singleton instance for RegistryService.
     * 
     * @returns {RegistryService} The singleton instance of RegistryService.
     */
    static getInstance() {
        if (!RegistryService._instance) {
            RegistryService._instance = new RegistryService();
        }

        return RegistryService._instance;
    }

    /**
     * Check if a key exists in the registry.
     * 
     * @param {string} key - The name of the key to check verification for.
     * @returns {boolean} True if the key exists, false if it does not.
     */
    exists(key) {
        return this._reg.hasOwnProperty(key);
    }

    /**
     * Get the value for a key in the registry.
     * 
     * @param {string} key - The registry key to get the value for.
     * @returns {*|null} The value for the given registry key or null if the key does not exist.
     */
    get(key) {
        if (this.exists(key)) {
            return this._reg[key];
        }

        return null;
    }

    /**
     * Set a value for a key in the registry.
     * 
     * @param {string} key - The name of the registry key to set.
     * @param {*} value - The value to get for the given registry key.
     * @param {"string"|"number"|"boolean"|"object"} type - The value type for the given registry key. 
     * @throws {MissingParameterError} If the type parameter does not match any valid type.
     */
    async set(key, value, type) {
        if (type !== 'string' && type !== 'number' && type !== 'boolean' && type !== 'object') {
            throw new MissingParameterError(`Invalid type parameter: ${type}. Valid types are: string, number, boolean, object.`, { type });
        }

        UtilHelper.log(`Registry: setting value '${value}' for registry key '${key}' with type of '${type}'.`, 'debug');

        this._reg[key] = value;
        const cache = CacheProviderFactory.create();
        const exists = cache.get(TargetList.REGISTRY).find(reg => reg.name === key) ? true : false;
        const db = DatabaseProviderFactory.create();
        const builder = new QueryBuilder();

        if (!exists) {
            await db.query(
                builder
                .clear()
                .insertInto(TargetList.REGISTRY, [
                    'name',
                    'value',
                    'lastModification',
                    'type'
                ], [
                    key,
                    value,
                    DateTimeHelper.dateToEpoch(new Date()),
                    type
                ])
                .build()
            )
            .then(result => {
                UtilHelper.log(`Data inserted successfully: ${JSON.stringify(result)}.`, 'debug');
            })
            .catch(error => {
                UtilHelper.log(`Error inserting data into the database: ${error}.`, 'error');
            });

            await cache.update(TargetList.REGISTRY);
        } else {
            await db.query(
                builder
                .clear()
                .update(TargetList.REGISTRY)
                .set([
                    'value',
                    'lastModification',
                    'type'
                ], [
                    value,
                    DateTimeHelper.dateToEpoch(new Date()),
                    type
                ])
                .where('name = ?', [key])
                .build()
            )
            .then(result => {
                UtilHelper.log(`Data updated successfully: ${JSON.stringify(result)}.`, 'debug');
            })
            .catch(error => {
                UtilHelper.log(`Error updating data: ${error}.`, 'error');
            });
        }

        UtilHelper.log(`Registry: registry key '${key}' updated to value: '${value}' of type: '${type}'.`, 'debug');
    }

    /**
     * Delete a registry key from the registry.
     * 
     * @param {string} key - The name of the registry key to delete.
     */
    async delete(key) {
        if (this.exists(key)) {
            UtilHelper.log(`Registry: deleting registry key '${key}' from the registry.`, 'debug');

            const cache = CacheProviderFactory.create();
            const db = DatabaseProviderFactory.create();
            const builder = new QueryBuilder();

            await db.query(
                builder
                .clear()
                .deleteFrom(TargetList.REGISTRY)
                .where('name = ?', [key])
                .build()
            )
            .then(result => {
                UtilHelper.log(`Registry: deleted data successfully: ${JSON.stringify(result)}.`, 'debug');
            })
            .catch(error => {
                UtilHelper.log(`Registry: error deleting data: ${error}.`, 'error');
            });

            await cache.update(TargetList.REGISTRY);

            UtilHelper.log(`Registry: registry key '${key}' successfully deleted from the registry.`, 'debug');
        }

        UtilHelper.log(`Registry: cannot delete '${key}' from the registry as it does not exist.`, 'debug');
    }

    /**
     * Get the size of the registry.
     * 
     * @returns {number} The total keys in the registry.
     */
    size() {
        return Object.keys(this._reg).length;
    }

    /**
     * Clear out the entire registry.
     * 
     * @warning
     * This is not reversable.
     */
    async clear() {
        this._reg = {};
        
        const db = DatabaseProviderFactory.create();
        const cache = CacheProviderFactory.create();
        const builder = new QueryBuilder();
        const r = cache.get(TargetList.REGISTRY);

        for (const reg of r) {
            await db.query(
                builder
                .clear()
                .deleteFrom(TargetList.REGISTRY)
                .where('id = ?', [reg.id])
                .build()
            )
            .then(result => {
                UtilHelper.log(`Registry: registry key '${key}' successfully deleted from the registry.`, 'debug');
            })
            .catch(error => {
                UtilHelper.log(`Registry: cannot delete registry key: ${error}.`, 'error');
            })
        }

        await cache.update(TargetList.REGISTRY);
    }
}

module.exports = RegistryService.getInstance();