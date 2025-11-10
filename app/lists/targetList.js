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
 * List of all the targets (tables or collections) for Echoverse.
 */
const TargetList = Object.freeze({
    SESSIONS: 'sessions',
    MEMBERS: 'members',
    SETTINGS: 'settings',
    LOCALES: 'locales',
    THEMES: 'themes',
    MEMBER_DEVICES: 'member_devices',
    GROUPS: 'user_groups',
    FEATURES: 'features',
    WIDGETS: 'widgets',
    REGISTRY: 'registry',
    CATEGORIES: 'categories',
    FORUMS: 'forums',
    TOPICS: 'topics',
    POSTS: 'posts',
    CONTENT_TRACKER: 'content_tracker',
});

module.exports = TargetList;