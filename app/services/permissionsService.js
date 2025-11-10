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

const FeatureList = require('../lists/featureList');
const FeatureRepository = require('../repository/featureRepository');
const MemberService = require('./memberService');
const MemberRepository = require('../repository/memberRepository');
const InvalidError = require('../errors/invalidError');

/**
 * Provides services for permission-related operations.
 */
class PermissionsService {
    static _instance = null;

    /**
     * Get the singleton instance of PermissionsService.
     * 
     * @returns {PermissionsService} The singleton instance of PermissionsService.
     */
    static getInstance() {
        if (!PermissionsService._instance) {
            PermissionsService._instance = new PermissionsService();
        }

        return PermissionsService._instance;
    }

    /**
     * Get the feature permission for the given feature.
     * 
     * @param {FeatureList} feature - The feature to get permission for. 
     * @param {number} [memberId=null] - Optional member identifier to get permissions for (default is current user).
     * @returns {boolean} True if valid permission, false if no permission. 
     */
    getFeaturePermission(feature, memberId = null) {
        // const featureEntity = FeatureRepository.getFeatureByName(feature);
        // const member = MemberRepository.getMemberById(memberId ? memberId : MemberService.member.id);

        // if (featureEntity) {
        //     const enabled = featureEntity.enabled;
        //     const users = featureEntity.users;
        //     const groups = featureEntity.groups;

        //     if (!enabled) {
        //         return false;
        //     }

        //     if (member.isAdmin()) {
        //         return true;
        //     }

        //     const inUsers = users?.find(user => user.id == member.id);

        //     if (inUsers) {
        //         return true;
        //     }

        //     groups.forEach(group => {
        //         if (group.id === member.primaryGroup.id) {
        //             return true;
        //         }

        //         if (member.secondaryGroups && member.secondaryGroups.length > 0) {
        //             member.secondaryGroups.forEach(secGroup => {
        //                 if (group.id === secGroup.id) {
        //                     return true;
        //                 }
        //             });
        //         }
        //     });
        // }

        return true;
    }

    /**
     * Get the feature permissions for all the given features.
     * 
     * @param {FeatureList[]} features - An array of the features to get permission for. 
     * @param {number} [memberId=null] - Optional member identifier to get permissions for (default is current user).
     * @returns {Object} An object containing key-value pairs for each permission (key = FeatureList, value = boolean result). 
     */
    getFeaturePermissions(features, memberId = null) {
        const permissions = {};

        if (!features || !Array.isArray(features)) {
            throw new InvalidError('getFeaturePermissions() features parameter must be non-null and an array of FeatureList.');
        }

        features.forEach(feature => {
            permissions[feature] = this.getFeaturePermission(feature, memberId);
        });

        return permissions;
    }
}

module.exports = PermissionsService.getInstance();