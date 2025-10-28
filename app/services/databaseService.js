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

const DatabaseProviderFactory = require('../data/db/databaseProviderFactory');
const UtilHelper = require('../helpers/utilHelper');

/**
 * Initializes the database connection.
 */
module.exports = () => {
    const db = DatabaseProviderFactory.create();

    return db.connect()
        .then(() => {
            UtilHelper.log('Database connected.', 'debug');
        });
};