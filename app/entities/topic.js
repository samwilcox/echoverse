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

const UtilHelper = require("../helpers/utilHelper");

/**
 * An entity that represents a single Topic.
 */
class Topic {
    /**
     * Create a new instance of Topic.
     */
    constructor() {
        this._id = null;
        this._categoryId = null;
        this._forumId = null;
        this._title = null;
        this._created = {};
        this._pinned = false;
        this._locked = false;
        this._hidden = false;
        this._lastPost = {};
        this._stats = {};
        this._solution = {};
    }

    /**
     * Get the topic identifier.
     * 
     * @returns {number} - The topic identifier.
     */
    get id() {
        return this._id;
    }

    /**
     * Set the topic identifier.
     * 
     * @param {number} value - The topic identifier.
     */
    set id(value) {
        this._id = value;
    }

    /**
     * Get the category identifier associated with this topic.
     * 
     * @returns {number|null} - The category ID.
     */
    get categoryId() {
        return this._categoryId;
    }

    /**
     * Set the category identifier for this topic.
     * 
     * @param {number|null} value - The category ID.
     */
    set categoryId(value) {
        this._categoryId = value;
    }

    /**
     * Get the forum identifier associated with this topic.
     * 
     * @returns {number|null} - The forum ID.
     */
    get forumId() {
        return this._forumId;
    }

    /**
     * Set the forum identifier for this topic.
     * 
     * @param {number|null} value - The forum ID.
     */
    set forumId(value) {
        this._forumId = value;
    }

    /**
     * Get the title of this topic.
     * 
     * @returns {string} - The topic title.
     */
    get title() {
        return this._title;
    }

    /**
     * Set the title of this topic.
     * 
     * @param {string} value - The topic title.
     */
    set title(value) {
        this._title = value;
    }

    /**
     * Get the creation details for this topic.
     * 
     * @returns {Object} - The creation information.
     */
    get created() {
        return this._created;
    }

    /**
     * Set the creation details for this topic.
     * 
     * @param {Object} value - The creation information.
     */
    set created(value) {
        this._created = value;
    }

    /**
     * Get whether this topic is pinned.
     * 
     * @returns {boolean} - True if pinned; otherwise false.
     */
    get pinned() {
        return this._pinned;
    }

    /**
     * Set whether this topic is pinned.
     * 
     * @param {boolean} value - True to pin the topic; false to unpin.
     */
    set pinned(value) {
        this._pinned = value;
    }

    /**
     * Get whether this topic is locked.
     * 
     * @returns {boolean} - True if locked; otherwise false.
     */
    get locked() {
        return this._locked;
    }

    /**
     * Set whether this topic is locked.
     * 
     * @param {boolean} value - True to lock the topic; false to unlock.
     */
    set locked(value) {
        this._locked = value;
    }

    /**
     * Get whether this topic is hidden.
     * 
     * @returns {boolean} - True if hidden; otherwise false.
     */
    get hidden() {
        return this._hidden;
    }

    /**
     * Set whether this topic is hidden.
     * 
     * @param {boolean} value - True to hide the topic; false to show it.
     */
    set hidden(value) {
        this._hidden = value;
    }

    /**
     * Get the last post information for this topic.
     * 
     * @returns {Object} - The last post object.
     */
    get lastPost() {
        return this._lastPost;
    }

    /**
     * Set the last post information for this topic.
     * 
     * @param {Object} value - The last post object.
     */
    set lastPost(value) {
        this._lastPost = value;
    }

    /**
     * Get the statistics object for this topic.
     * 
     * @returns {Object} - The topic statistics.
     */
    get stats() {
        return this._stats;
    }

    /**
     * Set the statistics object for this topic.
     * 
     * @param {Object} value - The topic statistics.
     */
    set stats(value) {
        this._stats = value;
    }

    /**
     * Get the solution information for this topic.
     * 
     * @returns {Object} - The solution object.
     */
    get solution() {
        return this._solution;
    }

    /**
     * Set the solution information for this topic.
     * 
     * @param {Object} value - The solution object.
     */
    set solution(value) {
        this._solution = value;
    }

    /**
     * Convert this Topic entity to a vanilla javascript representation object.
     * 
     * @returns {Object} The vanilla javascript object representation of this Topic entity.
     */
    toObject() {
        return {
            id: this._id ?? null,
            categoryId: this._categoryId ?? null,
            forumId: this._forumId ?? null,
            title: this._title ?? null,
            created: this._created ?? {},
            pinned: this._pinned ?? false,
            locked: this._locked ?? false,
            hidden: this._hidden ?? false,
            lastPost: this._lastPost ?? { hasLastPost: false },
            stats: this._stats ?? {},
            solution: this._solution ?? { present: false },
        };
    }

    /**
     * Convert a vanilla javascript object to a Topic entity representation.
     * 
     * @param {Object} obj - The Topic entity representation of the given vanilla javascript object.
     */
    fromObject(obj) {
        const topic = new Topic();

        topic.id = obj.id ?? null;
        topic.categoryId = obj.categoryId ?? null;
        topic.forumId = obj.forumId ?? null;
        topic.title = obj.title ?? null;
        topic.created = obj.created ?? {};
        topic.pinned = obj.pinned ?? false;
        topic.locked = obj.locked ?? false;
        topic.hidden = obj.hidden ?? false;
        topic.lastPost = obj.lastPost ?? { hasLastPost: false };
        topic.stats = obj.stats ?? {};
        topic.solution = obj.solution ?? { present: false };

        return topic;
    }

    /**
     * Get the URL to this topic.
     * 
     * @returns {string} The URL to this topic.
     */
    url() {
        return `${UtilHelper.buildUrl(['topic'])}/${UtilHelper.addIdAndNumberToUrl(this._id, this._title)}`;
    }

    /**
     * Build the HTML source for this entity.
     * 
     * @returns {string} The HTML source for this entity.
     */
    build() {
        return '';
    }
}

module.exports = Topic;