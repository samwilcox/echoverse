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

const SqliteProvider = require('./providers/sqliteProvider');

/**
 * Factory class for creating instances of different database providers.
 */
class DatabaseProviderFactory {
    static _instance = null;

    /**
     * Creates an instance of a database provider based on the set type.
     * 
     * @returns {DatabaseInterface} An instance of the appropriate datbase provider.
     * @throws {Error} If the specified database type is not supported.
     */
    static create() {
        if (DatabaseProviderFactory._instance !== null) {
            return DatabaseProviderFactory._instance;
        }

        switch (process.env.DATABASE_PROVIDER.toLowerCase()) {
            case 'sqlite':
                DatabaseProviderFactory._instance = new SqliteProvider();
                break;
            default:
                throw new Error(`Unsupported database type "${process.env.DATABASE_PROVIDER}".`);
        }

        return DatabaseProviderFactory._instance;
    }
}

module.exports = DatabaseProviderFactory;