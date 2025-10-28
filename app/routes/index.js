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

const Settings = require('../settings');
const indexRoutes = require('./indexRoutes');

/**
 * Setup all routes for Echoverse.
 * 
 * @param {Express} app - The Express application instance.
 */
const setupRoutes = (app) => {
    app.use((req, res, next) => {
        req._settings = Settings.getAll();
        next();
    });

    app.use('/', indexRoutes);
};

module.exports = setupRoutes;