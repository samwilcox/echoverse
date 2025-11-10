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
 * Returns the list of targets (table or collection) to be cached.
 * 
 * @returns {string[]} An array of all the targets (table or collection) to cache.
 */
const toCache = () => {
    return [
        'sessions',
        'members',
        'settings',
        'locales',
        'themes',
        'member_devices',
        'user_groups',
        'features',
        'widgets',
        'registry',
        'categories',
        'forums',
        'topics',
        'posts',
        'content_tracker',
    ];
};

module.exports = toCache;