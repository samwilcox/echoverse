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
 * Responsible for handling and retreival and construction of 'Topic' entity.
 */
class TopicRepository {
    /**
     * Fetch a topic's raw data by ID.
     * 
     * @param {number} topicId - The topic identifier.
     * @returns {Object[]|null} The resulting data object or null if data is not found.
     */
    static loadTopicDataById(topicId) {
        const CacheProviderFactory = require('../data/cache/cacheProviderFactory');
        const cache = CacheProviderFactory.create();
        const data = cache.get(TargetList.TOPICS).find(topic => topic.id === parseInt(topicId, 10));
        return data || null;
    }

    /**
     * Build a 'Topic' entity from raw data.
     * 
     * @param {Object} data - The raw group data.
     * @param {number} topicId - The topic identifier.
     * @returns {Topic|null} The constructed 'Topic' entity or null if data is invalid.
     */
    static buildTopicFromData(data, topicId) {
        const Topic = require('../entities/topic');
        const topic = new Topic();

        topic.id = data && data.id ? parseInt(data.id) : topicId;
        topic.categoryId = data && data.categoryId ? parseInt(data.categoryId, 10) : null;
        topic.forumId = data && data.forumId ? parseInt(data.forumId, 10) : null;
        topic.title = data && data.title ? data.title : null;
        topic.created = data && data.created ? JSON.parse(data.created) : {};
        topic.pinned = data && data.pinned ? parseInt(data.pinned, 10) === 1 : false;
        topic.locked = data && data.locked ? parseInt(data.locked, 10) === 1 : false;
        topic.hidden = data && data.hidden ? parseInt(data.hidden, 10) === 1 : false;
        topic.lastPost = data && data.lastPost ? JSON.parse(data.lastPost) : { hasLastPost: false };
        topic.stats = data && data.stats ? JSON.parse(data.stats) : {};
        topic.solution = data && data.solution ? JSON.parse(data.solution) : { present: false };

        return topic;
    }

    /**
     * Get the 'Topic' entity by ID.
     * 
     * @param {number} topicId - The topic identifier.
     * @returns {Topic|null} The 'Topic' entity or null if not found.
     */
    static getTopicById(topicId) {
        const data = this.loadTopicDataById(topicId);
        return this.buildTopicFromData(data, topicId);
    }
}

module.exports = TopicRepository;