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
const UtilHelper = require('../helpers/utilHelper');

/**
 * Initilizes the appliation settings.
 */
module.exports = () => {
    try {
        Settings.initialize();
        UtilHelper.log('Application settings initialized.', 'debug');
    } catch (error) {
        UtilHelper.log(`Failed to initialize the application settings: ${error}.`, 'error');
        throw error;
    }
};