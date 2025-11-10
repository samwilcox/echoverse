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

const http = require('http');
const DatabaseProviderFactory = require('../data/db/databaseProviderFactory');
const UtilHelper = require('../helpers/utilHelper');

/**
 * Starts the HTTP server.
 * 
 * @param {Express} app - The Express application object instance.
 */
module.exports = (app) => {
    const port = parseInt(process.env.SERVER_PORT, 10);
    const server = http.createServer(app);

    server.listen(port, () => {
        UtilHelper.log(`Echoverse server is running on port ${port}.`);
    });

    /**
     * Handle cleanup when Echoverse gets torn down.
     */
    const cleanUp = async () => {
        const db = DatabaseProviderFactory.create();
        UtilHelper.log('Shutting down Echoverse gracefully...', 'debug');

        try {
            server.close(() => {
                UtilHelper.log('Echoverse server closed.', 'debug');
                process.exit(1);
            });
        } catch (error) {
            UtilHelper.log(`Error shutting down Echoverse server: ${error}.`, 'error');
            process.exit(1);
        } finally {
            await db.disconnect();
        }
    };

    process.on('SIGINT', cleanUp);
    process.on('SIGTERM', cleanUp);
};