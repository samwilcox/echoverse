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

const UtilHelper = require('../helpers/utilHelper');

/**
 * Model for the index portion of Echoverse.
 */
class IndexModel {
    /**
     * Create a new instance of IndexModel.
     */
    constructor() {
        this._vars = {};
    }

    /**
     * Builds the index of Echoverse.
     * 
     * @param {Object} req - The request object from Express.
     * @param {Object} res - The response object from Express.
     * @param {Object} next - The next middleware to execute.
     */
    async buildIndex(req, res, next) {
        const member = req._member;
        const locale = req._locale;

        UtilHelper.addBreadcrumb(locale.index.forumsBreadcrumb, UtilHelper.buildUrl());

        return this._vars;
    }
}

module.exports = IndexModel;