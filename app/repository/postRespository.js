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
 * Responsible for handling and retreival and construction of 'Post' entity.
 */
class PostRepository {
    /**
     * Fetch a post's raw data by ID.
     * 
     * @param {number} postId - The post identifier.
     * @returns {Object[]|null} The resulting data object or null if data is not found.
     */
    static loadPostDataById(postId) {
        const CacheProviderFactory = require('../data/cache/cacheProviderFactory');
        const cache = CacheProviderFactory.create();
        const data = cache.get(TargetList.POSTS).find(post => post.id === parseInt(postId, 10));
        return data || null;
    }

    /**
     * Build a 'Post' entity from raw data.
     * 
     * @param {Object} data - The raw group data.
     * @param {number} postId - The post identifier.
     * @returns {Post|null} The constructed 'Post' entity or null if data is invalid.
     */
    static buildPostFromData(data, postId) {
        const Post = require('../entities/post');
        const post = new Post();

        post.id = data && data.id ? parseInt(data.id) : postId;
        post.categoryId = data && data.categoryId ? parseInt(data.categoryId, 10) : null;
        post.forumId = data && data.forumId ? parseInt(data.forumId, 10) : null;
        post.topicId = data && data.topicId ? parseInt(data.topicId, 10) : null;
        post.created = data && data.created && data.created.length > 0 ? JSON.parse(data.created) : {};
        post.body = data && data.body ? data.body : null;
        post.isFirstPost = data && data.isFirstPost ? parseInt(data.isFirstPost, 10) === 1 : false;
        post.attachments = data && data.attachments && data.attachments.length > 0 ? JSON.parse(data.attachments) : null;
        post.includeSignature = data && data.includeSignature ? parseInt(data.includeSignature, 10) === 1 : false;
        post.ipAddress = data && data.ipAddress ? data.ipAddress : null;
        post.hostname = data && data.hostname ? data.hostname : null;
        post.userAgent = data && data.userAgent ? data.userAgent : null;

        return post;
    }

    /**
     * Get the 'Post' entity by ID.
     * 
     * @param {number} postId - The post identifier.
     * @returns {Post|null} The 'Post' entity or null if not found.
     */
    static getPostById(postId) {
        const data = this.loadPostDataById(postId);
        return this.buildPostFromData(data, postId);
    }
}

module.exports = PostRepository;