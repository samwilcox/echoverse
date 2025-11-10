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

const Member = require('../entities/member');
const Settings = require('../settings');
const GroupRepository = require('./groupRepository');
const TargetList = require('../lists/targetList');
const path = require('path');

/**
 * Responsible for handling and retrieval and construction of 'Member' entity.
 */
class MemberRepository {
    /**
     * Fetch a member's raw data by ID.
     * 
     * @param {number} memberId - The member identifier to load data for.
     * @returns {Object[]|null} The resulkting data object or null if the data is not found. 
     */
    static loadMemberDataById(memberId) {
        const CacheProviderFactory = require('../data/cache/cacheProviderFactory');
        const cache = CacheProviderFactory.create();
        const data = cache.get(TargetList.member).find(member => member.id === memberId);
        return data || null;
    }

    /**
     * Build a 'Member' entity from raw data.
     * 
     * @param {Object} data - The raw member data.
     * @param {number} memberId - The member identifier.
     * @returns {Member|null} The constructed 'Member' entity or null if data is invalid. 
     */
    static buildMemberFromData(data, memberId) {
        const Member = require('../entities/member');
        let member = new Member();

        const exists = data && Object.keys(data).length > 0;

        if (exists) {
            member.id = data && data.id ? parseInt(data.id) : memberId;
            member.username = data.username;
            member.displayName = data.displayName ? data.displayName : data.username;
            member.emailAddress = data.emailAddress;
            member.localeId = parseInt(data.localeId, 10);
            member.themeId = parseInt(data.themeId, 10);
            member.useDisplayName = Settings.get('useDisplayName') ? (parseInt(data.useDisplayName, 10) === 1) : false;
            member.dateTime = data && data.dateTime ? JSON.parse(data.dateTime) : null;
            member.primaryGroup = data && data.primaryGroupId ? GroupRepository.getGroupById(parseInt(data.primaryGroupId, 10)) : null;

            // if (data && data.secondaryGroups && data.secondaryGroups.length > 0) {
            //     let groups = [];
            //     const secondaryGroups = JSON.parse(data.secondaryGroups);

            //     secondaryGroups.forEach(group => {
            //         groups.push(GroupRepository.getGroupById(group));
            //     });

            //     member.secondaryGroups = groups;
            // } else {
            //     member.secondaryGroups = null;
            // }

            member.widgets = data && data.widgets ? data.widgets : null;
        } else {
            member = this.populateGuestData(member);
        }

        const CacheProviderFactory = require('../data/cache/cacheProviderFactory');
        const cache = CacheProviderFactory.create();

        data = cache.getAll({
            locales: 'locales',
            themes: 'themes',
        });

        const locale = data.locales.find(locale => locale.id === member.localeId);
        const theme = data.themes.find(theme => theme.id === member.themeId);
        const imagesetFolder = theme.imagesetFolder;

        const configs = {
            localePath: path.join(__dirname, '..', '..', 'locale', locale.folder),
            themePath: path.join(__dirname, '..', '..', 'themes', theme.folder),
            themeCssUrl: `${process.env.BASE_URL}/css/${theme.folder}`,
            imagesetUrl: `${process.env.BASE_URL}/imagesets/${imagesetFolder}`,
            themeFolder: theme.folder,
        };

        member.configs = configs;

        return member;
    }

    /**
     * Get the 'Member' entity by ID.
     * 
     * @param {number} memberId - The member identifier.
     * @returns {Member|null} The 'Member' entity or null if not found.
     */
    static getMemberById(memberId) {
        const data = this.loadMemberDataById(memberId);
        return this.buildMemberFromData(data, memberId);
    }

    /**
     * Populate a given member entity with guest data.
     * 
     * @param {Member} member - The member entity instance.
     * @returns {Member} THe member entity populated with the guest data.
     */
    static populateGuestData(member) {
        member.id = 0;
        member.username = 'Guest';
        member.displayName = 'Guest';
        member.emailAddress = null;
        member.localeId = Settings.get('defaultLocaleId');
        member.themeId = Settings.get('defaultThemeId');
        member.useDisplayName = false;
        member.dateTime = Settings.get('defaultDateTime');
        member.primaryGroup = GroupRepository.getGroupById(Settings.get('guestGroupId'));
        member.secondaryGroups = null;
        member.widgets = Settings.get('defaultWidgets');

        return member;
    }
}

module.exports = MemberRepository;