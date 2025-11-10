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
 * An entity that represents a single Forum.
 */
class Forum {
    /**
     * Create a new instance of Forum.
     */
    constructor() {
        this._id = null;
        this._categoryId = null;
        this._title = null;
        this._description = null;
        this._sortOrder = 0;
        this._icon = null;
        this._image = null;
        this._stats = {};
        this._lastPost = {};
        this._showChildForums = true;
        this._parentId = null;
        this._redirect = {};
        this._visible = true;
        this._uniqueTopicViews = true;
        this._canShare = true;
        this._canReport = true;
        this._color = null;
        this._forumType = 'normal';
    }

    /**
     * Get the forum identifier.
     * 
     * @returns {number} - The forum identifier.
     */
    get id() {
        return this._id;
    }

    /**
     * Set the forum identifier.
     * 
     * @param {number} value - The forum identifier.
     */
    set id(value) {
        this._id = value;
    }

    /**
     * Get the category identifier this forum belongs to.
     * 
     * @returns {number} The category identifier this forum belongs to.
     */
    get categoryId() {
        return this._categoryId;
    }

    /**
     * Set the category identifier this forum belongs to.
     * 
     * @param {number} value - The category identifier this forum belongs to.
     */
    set categoryId(value) {
        this._categoryId = value;
    }

    /**
     * Get the title of this forum.
     * 
     * @returns {string} - The forum title.
     */
    get title() {
        return this._title;
    }

    /**
     * Set the title of this forum.
     * 
     * @param {string} value - The forum title.
     */
    set title(value) {
        this._title = value;
    }

    /**
     * Get the description of this forum.
     * 
     * @returns {string} - The forum description.
     */
    get description() {
        return this._description;
    }

    /**
     * Set the description of this forum.
     * 
     * @param {string} value - The forum description.
     */
    set description(value) {
        this._description = value;
    }

    /**
     * Get the sort order for this forum.
     * 
     * @returns {number} - The sort order value.
     */
    get sortOrder() {
        return this._sortOrder;
    }

    /**
     * Set the sort order for this forum.
     * 
     * @param {number} value - The sort order value.
     */
    set sortOrder(value) {
        this._sortOrder = value;
    }

    /**
     * Get the icon for this forum.
     * 
     * @returns {string|null} - The icon file path or null if none is set.
     */
    get icon() {
        return this._icon;
    }

    /**
     * Set the icon for this forum.
     * 
     * @param {string|null} value - The icon file path or null.
     */
    set icon(value) {
        this._icon = value;
    }

    /**
     * Get the image for this forum.
     * 
     * @returns {string|null} - The image file path or null if none is set.
     */
    get image() {
        return this._image;
    }

    /**
     * Set the image for this forum.
     * 
     * @param {string|null} value - The image file path or null.
     */
    set image(value) {
        this._image = value;
    }

    /**
     * Get the statistics object for this forum.
     * 
     * @returns {object} - The forum statistics.
     */
    get stats() {
        return this._stats;
    }

    /**
     * Set the statistics object for this forum.
     * 
     * @param {object} value - The forum statistics.
     */
    set stats(value) {
        this._stats = value;
    }

    /**
     * Get the last post information for this forum.
     * 
     * @returns {object} - The last post object.
     */
    get lastPost() {
        return this._lastPost;
    }

    /**
     * Set the last post information for this forum.
     * 
     * @param {object} value - The last post object.
     */
    set lastPost(value) {
        this._lastPost = value;
    }

    /**
     * Get whether to show child forums for this forum.
     * 
     * @returns {boolean} - True if child forums are shown; otherwise false.
     */
    get showChildForums() {
        return this._showChildForums;
    }

    /**
     * Set whether to show child forums for this forum.
     * 
     * @param {boolean} value - True to show child forums; false to hide them.
     */
    set showChildForums(value) {
        this._showChildForums = value;
    }

    /**
     * Get the parent forum identifier, if any.
     * 
     * @returns {number|null} - The parent forum ID or null if none.
     */
    get parentId() {
        return this._parentId;
    }

    /**
     * Set the parent forum identifier.
     * 
     * @param {number|null} value - The parent forum ID or null.
     */
    set parentId(value) {
        this._parentId = value;
    }

    /**
     * Get the redirect information for this forum.
     * 
     * @returns {object} - The redirect object.
     */
    get redirect() {
        return this._redirect;
    }

    /**
     * Set the redirect information for this forum.
     * 
     * @param {object} value - The redirect object.
     */
    set redirect(value) {
        this._redirect = value;
    }

    /**
     * Get whether this forum is visible.
     * 
     * @returns {boolean} - True if visible; otherwise false.
     */
    get visible() {
        return this._visible;
    }

    /**
     * Set whether this forum is visible.
     * 
     * @param {boolean} value - True to make visible; false to hide.
     */
    set visible(value) {
        this._visible = value;
    }

    /**
     * Get whether unique topic views are enabled.
     * 
     * @returns {boolean} - True if unique topic views are enabled.
     */
    get uniqueTopicViews() {
        return this._uniqueTopicViews;
    }

    /**
     * Set whether unique topic views are enabled.
     * 
     * @param {boolean} value - True to enable unique topic views.
     */
    set uniqueTopicViews(value) {
        this._uniqueTopicViews = value;
    }

    /**
     * Get whether sharing is allowed in this forum.
     * 
     * @returns {boolean} - True if sharing is allowed; otherwise false.
     */
    get canShare() {
        return this._canShare;
    }

    /**
     * Set whether sharing is allowed in this forum.
     * 
     * @param {boolean} value - True to allow sharing; false to disallow.
     */
    set canShare(value) {
        this._canShare = value;
    }

    /**
     * Get whether reporting is allowed in this forum.
     * 
     * @returns {boolean} - True if reporting is allowed; otherwise false.
     */
    get canReport() {
        return this._canReport;
    }

    /**
     * Set whether reporting is allowed in this forum.
     * 
     * @param {boolean} value - True to allow reporting; false to disallow.
     */
    set canReport(value) {
        this._canReport = value;
    }
    
    /**
     * Get the color for this forum.
     * 
     * @returns {string} The color HEX code for this forum.
     */
    get color() {
        return this._color;
    }

    /**
     * Set the color for this forum.
     * 
     * @param {string} value - The color HEX code for this forum.
     */
    set color(value) {
        this._color = value;
    }

    /**
     * Get the forum type for this forum.
     * 
     * @returns {"normal"|"qa"} - The forum type of this forum.
     */
    get forumType() {
        return this._forumType;
    }
    
    /**
     * Set the forum type for this forum.
     * 
     * @param {"normal"|"qa"} value - The forum type of this forum. 
     */
    set forumType(value) {
        this._forumType = value;
    }

    /**
     * Convert this Forum entity to a vanilla javascript object.
     * 
     * @returns {Object} The vanilla javascript object representation of this Forum entity.
     */
    toObject() {
        return {
            id: this._id ?? null,
            categoryId: this._categoryId ?? null,
            title: this._title ?? null,
            description: this._description ?? null,
            sortOrder: this._sortOrder ?? 0,
            icon: this._icon ?? null,
            image: this._image ?? null,
            stats: this._stats ?? {},
            lastPost: this._lastPost ?? { hasLastPost: false },
            showChildForums: this._showChildForums ?? false,
            parentId: this._parentId ?? null,
            redirect: this._redirect ?? { enabled: false },
            visible: this._visible ?? false,
            uniqueTopicViews: this._uniqueTopicViews ?? false,
            canShare: this._canShare ?? false,
            canReport: this._canReport ?? false,
            color: this._color ?? nullm,
            forumType: this._forumType ?? 'normal',
        };
    }

    /**
     * Convert a vanilla javascript object to a Forum entity.
     * 
     * @param {Object} obj -The vanilla javascript object representation of this Forum entity.
     * @returns {Forum} The Forum entity representation of the given vanilla javascript object.
     */
    fromObject(obj) {
        const forum = new Forum();

        forum.id = obj.id ?? null;
        forum.categoryId = obj.categoryId ?? null;
        forum.title = obj.title ?? null;
        forum.description = obj.description ?? null;
        forum.sortOrder = obj.sortOrder ?? 0;
        forum.icon = obj.icon ?? null;
        forum.image = obj.image ?? null;
        forum.stats = obj.stats ?? {};
        forum.lastPost = obj.lastPost ?? { hasLastPost: false };
        forum.showChildForums = obj.showChildForums ?? false;
        forum.parentId = obj.parentId ?? null;
        forum.redirect = obj.redirect ?? { enabled: false };
        forum.visible = obj.visible ?? false;        
        forum.uniqueTopicViews = obj.uniqueTopicViews ?? false;
        forum.canShare = obj.canShare ?? false;
        forum.canReport = obj.canReport ?? false;
        forum.color = obj.color ?? null;
        forum.forumType = obj.forumType ?? 'normal';

        return forum;
    }

    /**
     * Get the URL to this forum.
     * 
     * @returns {string} The URL to this forum.
     */
    url() {
        return `${UtilHelper.buildUrl(['forum'])}/${UtilHelper.addIdAndNumberToUrl(this._id, this._title)}`;
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

module.exports = Forum;