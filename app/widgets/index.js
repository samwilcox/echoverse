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

const OutputHelper = require('../helpers/outputHelper');

/**
 * Responsible for the contructing of all widgets.
 */
class Widgets {
    /**
     * Constructs the Who's Online? widget.
     * 
     * @returns {string} The Widget HTML source.
     */
    static whosOnline() {
        return OutputHelper.getPartial('widgets', 'whosonline');
    }
}

module.exports = Widgets;