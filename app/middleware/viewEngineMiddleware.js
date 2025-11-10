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

const path = require('path');

/**
 * Middleware for setting up the view engine.
 * 
 * @param {Object} req - The request object from Express.
 * @param {Object} res - The response object from Express.
 * @param {Object} next - The next middleware to execute.
 */
const viewEngineMiddleware = (req, res, next) => {
    try {
        const member = req._member;
        const app = req._app;
        app.set('view engine', 'ejs');
        app.set('views', member.configs.themePath);

        next();
    } catch (error) {
        next(error);
    }
};

module.exports = viewEngineMiddleware;