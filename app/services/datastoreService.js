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
 * Temporary data storage management service.
 */
class DataStoreService {
    static _instance = null;

    /**
     * Create a new instance of DataStoreService.
     */
    constructor() {
        this._data = {};
    }

    /**
     * Get the singleton instance of DataStoreService.
     * 
     * @returns {DataStoreService} The singleton instance of DataStoreService.
     */
    static getInstance() {
        if (!DataStoreService._instance) {
            DataStoreService._instance = new DataStoreService();
        }

        return DataStoreService._instance;
    }

    /**
     * Set a new key in the data store.
     * 
     * @param {string} key - The name for the key.
     * @param {*} value - The value to set for the given key.
     */
    set(key, value) {
        this._data[key] = value;
    }

    /**
     * Get a key in the data store.
     * 
     * @param {string} key - The name of the key to get the value for.
     * @returns {*|null} The value for the given key or null if the key does not exist.
     */
    get(key) {
        return this.exists(key) ? this._data[key] : null;
    }

    /**
     * Check if a key exists in the data store.
     * 
     * @param {string} key - The name of the key to check.
     * @returns {boolean} True if the key exists, false if it does not.
     */
    exists(key) {
        return this._data.hasOwnProperty(key);
    }

    /**
     * Get the total size of the data store.
     * 
     * @returns {number} The size of the data store.
     */
    size() {
        return Object.keys(this._data).length;
    }

    /**
     * Clear the data store - a FULL wipe.
     */
    clear() {
        this._data = {};
    }

    /**
     * Get the entire data store object.
     * 
     * @returns {Object} The entire data store object.
     */
    getAll() {
        return { ...this._data };1
    }
} 

module.exports = DataStoreService.getInstance();