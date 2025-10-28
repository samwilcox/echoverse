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

const setupRoutes = require('../routes');
const UtilHelper = require('../helpers/utilHelper');

/**
 * Setup the application routes for Echoverse.
 * 
 * @param {Express} app - The Express application object instance.
 */
module.exports = (app) => {
    try {
        setupRoutes(app);
        UtilHelper.log('Application routes setup.', 'debug');
    } catch (error) {
        UtilHelper.log(`Failed to setup the appliation routes: ${error}.`, 'error');
    }
};