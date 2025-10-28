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

const sqlite3 = require('sqlite3');
const DatabaseInterface = require('../databaseInterface');
const UtilHelper = require('../../../helpers/utilHelper');

/**
 * Concrete implementation for SQLite provider.
 */
class SqliteProvider extends DatabaseInterface {
    /**
     * Creates a new instance of SqliteProvider.
     */
    constructor() {
        super();
        this._db = null;
        this._prefix = process.env.SQLITE_TABLE_PREFIX;
    }

    /**
     * Connect to the database.
     */
    connect() {
        const dbPath = process.env.SQLITE_DATABASE_PATH || './database.db';

        return new Promise((resolve, reject) => {
            this._db = new sqlite3.Database(dbPath, sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE, (error) => {
                if (error) {
                    UtilHelper.log(`Failed to connect to the SQLite database: ${error}.`, 'error');
                    return reject(error);
                }

                UtilHelper.log('Connected to the SQLite database.', 'debug');
                resolve();
            });
        });
    }

    /**
     * Execute a query on the database.
     * 
     * @param {Object} sql - The SQL query object.
     * @returns {Promise} A promise that resolves with the result of the query.
     */
    query(sql) {
        return new Promise((resolve, reject) => {
            if (!sql.query || typeof sql.query !== 'string') {
                return reject(new Error('Invalid SQL query string.'));
            }

            const isSelectQuery = sql.query.trim().toUpperCase().startsWith('SELECT');

            if (isSelectQuery) {
                this._db.all(sql.query, sql.values || [], (error, rows) => {
                    if (error) {
                        UtilHelper.log(`Query error: ${error}.`, 'error');
                        return reject(error);
                    }

                    resolve();
                });
            } else {
                this._db.run(sql.query, sql.values || [], (error) => {
                    if (error) {
                        UtilHelper.log(`Query error: ${error}.`, 'error');
                        return reject(error);
                    }

                    resolve();
                });
            }
        });
    }

    /**
     * Disconnect from the database.
     */
    disconnect() {
        return new Promise((resolve, reject) => {
            if (this._db) {
                this._db.close((error) => {
                    if (error) {
                        UtilHelper.log(`Failed to close the SQLite database connection: ${error}.`, 'error');
                        return reject(error);
                    }

                    UtilHelper.log('Disconnected from the SQLite database.', 'debug');
                    resolve();
                });
            } else {
                return reject(new Error('No active connection to close.'))
            }
        });
    }
}

module.exports = SqliteProvider;