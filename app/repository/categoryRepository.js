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
 * Responsible for handling and retreival and construction of 'Category' entity.
 */
class CategoryRepository {
    /**
     * Fetch a category's raw data by ID.
     * 
     * @param {number} categoryId - The category identifier.
     * @returns {Object[]|null} The resulting data object or null if data is not found.
     */
    static loadCategoryDataById(categoryId) {
        const CacheProviderFactory = require('../data/cache/cacheProviderFactory');
        const cache = CacheProviderFactory.create();
        const data = cache.get(TargetList.CATEGORIES).find(category => category.id === parseInt(categoryId, 10));
        return data || null;
    }

    /**
     * Build a 'Category' entity from raw data.
     * 
     * @param {Object} data - The raw group data.
     * @param {number} categoryId - The category identifier.
     * @returns {Category|null} The constructed 'Category' entity or null if data is invalid.
     */
    static buildCategoryFromData(data, categoryId) {
        const Category = require('../entities/category');
        const category = new Category();

        category.id = data && data.id ? data.id : categoryId;
        category.title = data && data.title ? data.title : null;
        category.sortOrder = parseInt(data.sortOrder, 10);
        category.visible = data && data.visible ? parseInt(data.visible, 10) == 1 : false;

        return category;
    }

    /**
     * Get the 'Category' entity by ID.
     * 
     * @param {number} categoryId - The category identifier.
     * @returns {Category|null} The 'Category' entity or null if not found.
     */
    static getCategoryById(categoryId) {
        const data = this.loadCategoryDataById(categoryId);
        return this.buildCategoryFromData(data, categoryId);
    }
}

module.exports = CategoryRepository;