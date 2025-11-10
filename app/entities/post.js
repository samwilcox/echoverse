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

const DateTimeHelper = require("../helpers/dateTimeHelper");

/**
 * An entity that represents a single Post.
 */
class Post {
    /**
     * Create a new instance of Post.
     */
    constructor() {
        this._id = null;
        this._categoryId = null;
        this._forumId = null;
        this._topicId = null;
        this._created = {};
        this._body = null;
        this._isFirstPost = false;
        this._attachments = null;
        this._includeSignature = false;
        this._ipAddress = null;
        this._hostname = null;
        this._userAgent = null;
    }

    /**
     * Get the post identifier.
     * 
     * @returns {number} - The post identifier.
     */
    get id() {
        return this._id;
    }

    /**
     * Set the post identifier.
     * 
     * @param {number} value - The post identifier.
     */
    set id(value) {
        this._id = value;
    }

    /**
     * Get the category identifier for this post.
     * 
     * @returns {number|null} - The category ID.
     */
    get categoryId() {
        return this._categoryId;
    }

    /**
     * Set the category identifier for this post.
     * 
     * @param {number|null} value - The category ID.
     */
    set categoryId(value) {
        this._categoryId = value;
    }

    /**
     * Get the forum identifier for this post.
     * 
     * @returns {number|null} - The forum ID.
     */
    get forumId() {
        return this._forumId;
    }

    /**
     * Set the forum identifier for this post.
     * 
     * @param {number|null} value - The forum ID.
     */
    set forumId(value) {
        this._forumId = value;
    }

    /**
     * Get the topic identifier for this post.
     * 
     * @returns {number|null} - The topic ID.
     */
    get topicId() {
        return this._topicId;
    }

    /**
     * Set the topic identifier for this post.
     * 
     * @param {number|null} value - The topic ID.
     */
    set topicId(value) {
        this._topicId = value;
    }

    /**
     * Get the creation details for this post.
     * 
     * @returns {Object} - The creation information.
     */
    get created() {
        return this._created;
    }

    /**
     * Set the creation details for this post.
     * 
     * @param {Object} value - The creation information.
     */
    set created(value) {
        this._created = value;
    }

    /**
     * Get the body content of this post.
     * 
     * @returns {string|null} - The post body text.
     */
    get body() {
        return this._body;
    }

    /**
     * Set the body content of this post.
     * 
     * @param {string|null} value - The post body text.
     */
    set body(value) {
        this._body = value;
    }

    /**
     * Get whether this post is the first post in its topic.
     * 
     * @returns {boolean} - True if first post; otherwise false.
     */
    get isFirstPost() {
        return this._isFirstPost;
    }

    /**
     * Set whether this post is the first post in its topic.
     * 
     * @param {boolean} value - True if first post; false otherwise.
     */
    set isFirstPost(value) {
        this._isFirstPost = value;
    }

    /**
     * Get the attachments associated with this post.
     * 
     * @returns {number[]|null} - The list of attachments or null.
     */
    get attachments() {
        return this._attachments;
    }

    /**
     * Set the attachments associated with this post.
     * 
     * @param {number[]|null} value - The list of attachments or null.
     */
    set attachments(value) {
        this._attachments = value;
    }

    /**
     * Get whether the user's signature should be included.
     * 
     * @returns {boolean} - True if the signature should be included.
     */
    get includeSignature() {
        return this._includeSignature;
    }

    /**
     * Set whether the user's signature should be included.
     * 
     * @param {boolean} value - True to include the signature; false to omit.
     */
    set includeSignature(value) {
        this._includeSignature = value;
    }

    /**
     * Get the IP address from which this post was created.
     * 
     * @returns {string|null} - The IP address or null.
     */
    get ipAddress() {
        return this._ipAddress;
    }

    /**
     * Set the IP address from which this post was created.
     * 
     * @param {string|null} value - The IP address or null.
     */
    set ipAddress(value) {
        this._ipAddress = value;
    }

    /**
     * Get the hostname associated with this post.
     * 
     * @returns {string|null} - The hostname or null.
     */
    get hostname() {
        return this._hostname;
    }

    /**
     * Set the hostname associated with this post.
     * 
     * @param {string|null} value - The hostname or null.
     */
    set hostname(value) {
        this._hostname = value;
    }

    /**
     * Get the user agent string recorded with this post.
     * 
     * @returns {string|null} - The user agent or null.
     */
    get userAgent() {
        return this._userAgent;
    }

    /**
     * Set the user agent string recorded with this post.
     * 
     * @param {string|null} value - The user agent or null.
     */
    set userAgent(value) {
        this._userAgent = value;
    }

    /**
     * Convert this Post entity to a vanilla javascript object representation.
     * 
     * @returns {Object} A vanilla javascript object representation of this Post entity.
     */
    toObject() {
        return {
            id: this._id ?? null,
            categoryId: this._categoryId ?? null,
            forumId: this._forumId ?? null,
            topicId: this._topicId ?? null,
            created: this._created ?? {},
            body: this._body ?? null,
            isFirstPost: this._isFirstPost ?? false,
            attachments: this._attachments ?? null,
            includeSignature: this._includeSignature ?? false,
            ipAddress: this._ipAddress ?? null,
            hostname: this._hostname ?? null,
            userAgent: this._userAgent ?? null,
        };
    }

    /**
     * Convert a vanilla javascript object to a Post entity representation.
     * 
     * @param {Object} obj - The vanilla object respresentation of a Post entity.
     * 
     * @returns {Post} The Post entity representation of the given vanilla javascript object.
     */
    fromObject(obj) {
        const post = new Post();

        post.id = obj.id ?? null;
        post.categoryId = obj.categoryId ?? null;
        post.forumId = obj.forumId ?? null;
        post.topicId = obj.topicId ?? null;
        post.created = obj.created ?? {};
        post.body = obj.body ?? null;
        post.isFirstPost = obj.isFirstPost ?? null;
        post.attachments = obj.attachments ?? null;
        post.includeSignature = obj.includeSignature ?? false;
        post.ipAddress = obj.ipAddress ?? null;
        post.hostname = obj.hostname ?? null;
        post.userAgent = obj.userAgent ?? null;

        return post;
    }

    /**
     * Get the formatted timestamp for when this post was created.
     * 
     * @returns {string} The formatted created at timestamp for when this post was created.
     */
    createdAt() {
        return DateTimeHelper.dateFormatter(this._created.timestamp, { timeAgo: true });
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

module.exports = Post;