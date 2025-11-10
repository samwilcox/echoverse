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
 * An entity that represents a single Category.
 */
class Category {
    /**
     * Create a new instance of Category.
     */
    constructor() {
        this._id = null;
        this._title = null;
        this._sortOrder = 0;
        this._visible = true;
    }

    /**
     * Get the category identifier for this category.
     * 
     * @returns {number} - The category identifier.
     */
    get id() {
        return this._id;
    }

    /**
     * Set the category identifier for this category.
     * 
     * @param {number} value - The category identifier. 
     */
    set id(value) {
        this._id = value;
    }

    /**
     * Get the title for this category.
     * 
     * @returns {string} - The category title.
     */
    get title() {
        return this._title;
    }

    /**
     * Set the title for this category.
     * 
     * @param {string} value - The category title.
     */
    set title(value) {
        this._title = value;
    }

    /**
     * Get the sort order for this category.
     * 
     * @returns {number} - The sort order value.
     */
    get sortOrder() {
        return this._sortOrder;
    }

    /**
     * Set the sort order for this category.
     * 
     * @param {number} value - The sort order value.
     */
    set sortOrder(value) {
        this._sortOrder = value;
    }

    /**
     * Get the visibility status for this category.
     * 
     * @returns {boolean} - True if the category is visible; otherwise false.
     */
    get visible() {
        return this._visible;
    }

    /**
     * Set the visibility status for this category.
     * 
     * @param {boolean} value - True to make the category visible; false to hide it.
     */
    set visible(value) {
        this._visible = value;
    }

    /**
     * Convert this category entity into a vanilla javascript object.
     * 
     * @returns {Object} The vanilla object representation of the Category entity.
     */
    toObject() {
        return {
            id: this._id ?? null,
            title: this._title ?? null,
            sortOrder: this._sortOrder ?? null,
            visible: this._visible ?? null,
        };
    }

    /**
     * Convert a vanilla javascript object and convert to a Category entity instance.
     * 
     * @param {Category} obj - The vanilla javascript object to convert to a Category entity object.
     * @returns {Category} The Category entity object representation of the given object. 
     */
    fromObject(obj) {
        const category = new Category();

        category.id = obj.id ?? null;
        category.title = obj.title ?? null;
        category.sortOrder = obj.sortOrder ?? 0;
        category._visible = obj.visible ?? true; 

        return category;
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

module.exports = Category;