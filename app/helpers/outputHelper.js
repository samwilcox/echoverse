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

const LocaleHelper = require('./localeHelper');
const FileHelper = require('./fileHelper');
const ejs = require('ejs');
const path = require('path');
const MemberService = require('../services/memberService');
const NotFoundError = require('../errors/notFoundError');
const UtilHelper = require('./utilHelper');

/**
 * Helpers for output of HTML.
 */
class OutputHelper {
    /**
     * 
     * @param {string} category - The category name for the partial.
     * @param {string} partial - The name of the partial. 
     * @param {Object[]} [vars={}] - Optional options.
     * @returns {string} The resulting partial source.
     * @throws {NotFoundError} If the partial is not found. 
     */
    static getPartial(category, partial, vars = {}) {
        try {
            const member = MemberService.member;
            console.log(MemberService.member.username);
            const partialPath = path.join(member.configs.themePath, category, `${partial}.ejs`);
            const template = FileHelper.readFile(partialPath);

            if (!template) {
                throw new NotFoundError(`Partial not found at: ${partialPath}.`, { partialPath, category, partial, vars });
            }

            const locale = LocaleHelper.getAll();

            return ejs.render(template, { ...vars, locale }, { async: false });
        } catch (error) {
            UtilHelper.log(`Error rendering partial: ${error.message}.`, 'error');
        }
    }
}

module.exports = OutputHelper;