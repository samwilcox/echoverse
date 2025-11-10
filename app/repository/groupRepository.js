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

const DateTimeHelper = require('../helpers/dateTimeHelper');
const TargetList = require('../lists/targetList');

/**
 * Responsible for handling and retreival and construction of 'Group' entity.
 */
class GroupRepository {
    /**
     * Fetch a group's raw data by ID.
     * 
     * @param {number} groupId - The group identifier.
     * @returns {Object[]|null} The resulting data object or null if data is not found.
     */
    static loadGroupDataById(groupId) {
        const CacheProviderFactory = require('../data/cache/cacheProviderFactory');
        const cache = CacheProviderFactory.create();
        const data = cache.get(TargetList.GROUPS).find(group => group.id === parseInt(groupId, 10));
        return data || null;
    }

    /**
     * Build a 'Group' entity from raw data.
     * 
     * @param {Object} data - The raw group data.
     * @param {number} groupId - The group identifier.
     * @returns {Group|null} The constructed 'Group' entity or null if data is invalid.
     */
    static buildGroupFromData(data, groupId) {
        const Group = require('../entities/group');
        const group = new Group();

        group.id = data && data.id ? parseInt(data.id) : groupId;
        group.sortOrder = parseInt(data.sortOrder, 10);
        group.name = data && data.name ? data.name : null;
        group.description = data && data.description ? data.description : null;
        group.createdAt = DateTimeHelper.epochToDate(data.createdAt);
        group.color = data && data.color ? data.color : null;
        group.emphasize = data && data.emphasize ? parseInt(data.emphasize, 10) === 1 : false;
        group.display = data && data.display ? parseInt(data.display, 10) === 1 : false;
        group.isModerator = data && data.isModerator ? parseInt(data.isModerator, 10) === 1 : false;
        group.isAdmin = data && data.isAdmin ? parseInt(data.isAdmin, 10) === 1 : false;
        group.canBeModified = data && data.canBeModified ? parseInt(data.canBeModified, 10) === 1 : false;
        group.canBeDeleted = data && data.canBeDeleted ? parseInt(data.canBeDeleted, 10) === 1 : false;

        return group;
    }

    /**
     * Get the 'Group' entity by ID.
     * 
     * @param {number} groupId - The group identifier.
     * @returns {Group|null} The 'Group' entity or null if not found.
     */
    static getGroupById(groupId) {
        const data = this.loadGroupDataById(groupId);
        return this.buildGroupFromData(data, groupId);
    }
}

module.exports = GroupRepository;