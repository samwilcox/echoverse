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
 * Responsible
 */
class FeatureRepository {
    /**
     * Fetch a feature's raw data by ID.
     * 
     * @param {number} featureId - The feature identifier.
     * @returns {Object[]|null} The resulting data object or null if data is not found.
     */
    static loadFeatureDataById(featureId) {
        const CacheProviderFactory = require('../data/cache/cacheProviderFactory');
        const cache = CacheProviderFactory.create();
        const data = cache.get(TargetList.FEATURES).find(feature => feature.id === parseInt(featureId, 10));
        return data || null;
    }

    /**
     * Fetch a feature's raw data by it's name.
     * 
     * @param {string} name - The name of the feature.
     * @returns {Object[]|null} The resulting data object or null if data is not found.
     */
    static loadFeatureDataByName(name) {
        const CacheProviderFactory = require('../data/cache/cacheProviderFactory');
        const cache = CacheProviderFactory.create();
        const data = cache.get(TargetList.FEATURES).find(feature => feature.name === name);
        return data || null;
    }

    /**
     * Build a 'Feature' entity from raw data.
     * 
     * @param {Object} data - The raw feature data.
     * @param {number} featureId - The feature identifier.
     * @returns {Feature|null} The constructed 'Feature' entity or null if data is invalid.
     */
    static buildFeatureFromData(data, featureId) {
        const Feature = require('../entities/feature');
        const feature = new Feature();

        feature.id = data ? data.id : featureId;
        feature.name = data && data.name ? data.name : null;
        feature.enabled = data && data.enabled ? parseInt(data.enabled, 10) === 1 : false;
        feature.users = data && data.users && data.users.toString().length > 0 ? JSON.parse(data.users) : null;
        feature.groups = data && data.groups && data.groups.toString().length > 0 ? JSON.parse(data.groups) : null;
        feature.modification = data && data.modification && data.modification.toString().length > 0 ? JSON.parse(data.modification) : null;

        return feature;
    }

    /**
     * Get the 'Feature' entity by ID.
     * 
     * @param {number} featureId - The feature identifier.
     * @returns {Feature|null} The 'Feature' entity or null if not found.
     */
    static getFeatureById(featureId) {
        const data = this.loadFeatureDataById(featureId);
        return this.buildFeatureFromData(data, featureId);
    }

    /**
     * Get the 'Feature' entity by it's name.
     * 
     * @param {string} name - The name of the feature (case-sensitive).
     * @returns {Feature|null} The 'Feature'entity or null if not found.
     */
    static getFeatureByName(name) {
        const data = this.loadFeatureDataByName(name);
        return this.buildFeatureFromData(data, data.id ?? null);
    }
}

module.exports = FeatureRepository;