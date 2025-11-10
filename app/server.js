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

const express = require('express');
const app = express();
const initializeDatabase = require('./services/databaseService');
const initializeCache = require('./services/cacheService');
const initializeSettings = require('./services/settingsService');
const initializeRoutes = require('./services/routesService');
const initializeMiddleware = require('./middleware/indexMiddleware');
const startServer = require('./services/serverService');
const Settings = require('./settings');
const UtilHelper = require('./helpers/utilHelper');

/**
 * Initializes the Echoverse application.
 */
module.exports = () => {
    initializeDatabase()
        .then(() => initializeCache())
        .then(() => {
            initializeSettings();
            initializeMiddleware(app);
            initializeRoutes(app);
            UtilHelper.initializeBreadcrumbs();
            startServer(app);
        })
        .catch(error => {
            UtilHelper.log(`Error initializing Echoverse: ${error}.`, 'error');
            process.exit(1);
        });
};