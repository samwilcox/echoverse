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

/**
 * List of features that can be toggled and customized for Echoverse.
 */
const FeatureList = Object.freeze({
    MEMBERS_LIST: 'membersList',
    SEARCH: 'search',
    HELP: 'help',
    WHOS_ONLINE: 'whosOnline',
    TAGS: 'tags',
    GROUPS: 'groups',
    ACTIVITY_REGISTER: 'activityRegister',
});

module.exports = FeatureList;