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

const IndexModel = require('../models/indexModel');
const GlobalsService = require('../services/globalsService');

/**
 * Controller for the index of Echoverse.
 */
class IndexController {
    /**
     * Creates a new instance of IndexController.
     */
    constructor() {
        this._model = new IndexModel();
    }

    /**
     * Build the index of Echoverse.
     * 
     * @param {Object} req - The request object from Express.
     * @param {Object} res - The response object from Express.
     * @param {Object} next - The next middleware to execute.
     */
    async buildIndex(req, res, next) {
        try {
            const vars = await this._model.buildIndex(req, res, next);
            const globals = await GlobalsService.get(req);
            res.render('home/index', { layout: 'layout', ...globals, vars });
        } catch (error) {
            next(error);
        }
    }
}

module.exports = IndexController;