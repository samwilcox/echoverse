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

const TargetList = require('../lists/targetList');

/**
 * Responsible for handling and retreival and construction of 'Forum' entity.
 */
class ForumRepository {
    /**
     * Fetch a forum's raw data by ID.
     * 
     * @param {number} forumId - The forum identifier.
     * @returns {Object[]|null} The resulting data object or null if data is not found.
     */
    static loadForumDataById(forumId) {
        const CacheProviderFactory = require('../data/cache/cacheProviderFactory');
        const cache = CacheProviderFactory.create();
        const data = cache.get(TargetList.FORUMS).find(forum => forum.id === parseInt(forumId, 10));
        return data || null;
    }

    /**
     * Build a 'Forum' entity from raw data.
     * 
     * @param {Object} data - The raw group data.
     * @param {number} forumId - The forum identifier.
     * @returns {Forum|null} The constructed 'Forum' entity or null if data is invalid.
     */
    static buildForumFromData(data, forumId) {
        const Forum = require('../entities/forum');
        const forum = new Forum();

        forum.id = data && data.id ? parseInt(data.id) : forumId;
        forum.categoryId = data && data.categoryId ? parseInt(data.categoryId, 10) : null;
        forum.title = data && data.title ? data.title : null;
        forum.description = data && data.description ? data.description : null;
        forum.sortOrder = data && data.sortOrder ? parseInt(data.sortOrder, 10) : 0;
        forum.icon = data && data.icon ? data.icon : null;
        forum.image = data && data.image ? data.image : null;
        forum.stats = data && data.stats && data.stats.length > 0 ? JSON.parse(data.stats) : {};
        forum.lastPost = data && data.lastPost && data.lastPost.length > 0 ? JSON.parse(data.lastPost) : { hasLastPost: false };
        forum.showChildForums = data && data.showChildForums ? parseInt(data.showChildForums, 10) === 1 : false;
        forum.parentId = data && data.parentId ? parseInt(data.parentId, 10) : null;
        forum.redirect = data && data.redirect && data.redirect.length > 0 ? JSON.parse(data.redirect) : { enabled: false };
        forum.visible = data && data.visible ? parseInt(data.visible, 10) ===1 : false;
        forum.uniqueTopicViews = data && data.uniqueTopicViews ? parseInt(data.uniqueTopicViews, 10) === 1 : false;
        forum.canShare = data && data.canShare ? parseInt(data.canShare, 10) === 1 : false;
        forum.canReport = data && data.canReport ? parseInt(data.canReport, 10) === 1 : false;
        forum.color = data && data.color ? data.color : null;
        forum.forumType = data && data.forumType ? data.forumType.toString() : 'normal';
        
        return forum;
    }

    /**
     * Get the 'Forum' entity by ID.
     * 
     * @param {number} forumId - The forum identifier.
     * @returns {Forum|null} The 'Forum' entity or null if not found.
     */
    static getForumById(forumId) {
        const data = this.loadForumDataById(forumId);
        return this.buildForumFromData(data, forumId);
    }
}

module.exports = ForumRepository;