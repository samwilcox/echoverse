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

const LocaleHelper = require('../helpers/localeHelper');
const DataStoreService = require('../services/datastoreService');
const UtilHelper = require('../helpers/utilHelper');
const settings = require('../settings');

/**
 * Middleware for initializing the locale.
 * 
 * @param {Express} app - The Express application instance.
 */
const localeMiddleware = (app) => {
    return async (req, res, next) => {
        try {
            req._app = app;
            req._settings = settings.getAllObjects();
            DataStoreService.set('request', req);
            DataStoreService.set('response', res);

            try {
                LocaleHelper.initialize(req._member);
                req._locale = LocaleHelper.getAll();
            } catch (error) {
                const message = `Failed to initialize the locale: ${error}.`;
                UtilHelper.log(message, { error });
                return next(new Error(message));
            }

            next();
        } catch (error) {
            next(error);
        }
    };
};

module.exports = localeMiddleware;