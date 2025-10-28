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
 * Interface contract for database providers.
 */
class DatabaseInterface {
    /**
     * Connect to the database.
     * 
     * @throws {Error} If this method is not implemented by a provider class.
     */
    connect() {
        throw new Error('connect() method must be implemented.');
    }

    /**
     * Execute a query on the database.
     * 
     * @param {Object} sql - The SQL query object.
     * @returns {Promise} A promise that resolves with the result of the query.
     * @throws {Error} If this method is not implemented by a provider class.
     */
    query(sql) {
        throw new Error('query() method must be implemented.');
    }

    /**
     * Disconnect from the database.
     * 
     * @throws {Error} If this method is not implemented by a provider class.
     */
    disconnect() {
        throw new Error('disconnect() method must be implemented.');
    }
}

module.exports = DatabaseInterface;