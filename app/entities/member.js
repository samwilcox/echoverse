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
 * An entity that represents a single Member.
 */
class Member {
    /**
     * Creates a new instance of Member.
     */
    constructor() {
        this._id = null;
        this._username = null;
        this._displayName = null;
        this._emailAddress = null;
        this._displayOnWo = false;
        this._localeId = null;
        this._themeId = null;
        this._signedIn = false;
        this._configs = {};
        this._useDisplayName = false;
        this._dateTime = {};
        this._primaryGroup = null;
        this._secondaryGroups = null;
        this._widgets = {};
    }

    /**
     * Get the member identifier.
     * 
     * @returns {string|number|null} The member identifier.
     */
    get id() {
        return this._id;
    }

    /**
     * Set the member identifier.
     * 
     * @param {string|number} value - The member identifier to set.
     */
    set id(value) {
        this._id = value;
    }

    /**
     * Get the member username.
     * 
     * @returns {string|null} The username of the member.
     */
    get username() {
        return this._username;
    }

    /**
     * Set the member username.
     * 
     * @param {string} value - The username to set.
     */
    set username(value) {
        this._username = value;
    }

    /**
     * Get the display name for this member.
     * 
     * @returns {string|null} The display name.
     */
    get displayName() {
        return this._displayName;
    }

    /**
     * Set the display name for this member.
     * 
     * @param {string} value - The display name to set.
     */
    set displayName(value) {
        this._displayName = value;
    }

    /**
     * Get the email address for this member.
     * 
     * @returns {string|null} The email address.
     */
    get emailAddress() {
        return this._emailAddress;
    }

    /**
     * Set the email address for this member.
     * 
     * @param {string} value - The email address to set.
     */
    set emailAddress(value) {
        this._emailAddress = value;
    }

    /**
     * Get whether this member is displayed on the "Who's Online" list.
     * 
     * @returns {boolean} True if visible, false otherwise.
     */
    get displayOnWo() {
        return this._displayOnWo;
    }

    /**
     * Set whether this member is displayed on the "Who's Online" list.
     * 
     * @param {boolean} value - True if visible, false otherwise.
     */
    set displayOnWo(value) {
        this._displayOnWo = Boolean(value);
    }

    /**
     * Get the locale identifier for this member.
     * 
     * @returns {string|number|null} The locale identifier.
     */
    get localeId() {
        return this._localeId;
    }

    /**
     * Set the locale identifier for this member.
     * 
     * @param {string|number} value - The locale identifier to set.
     */
    set localeId(value) {
        this._localeId = value;
    }

    /**
     * Get the theme identifier for this member.
     * 
     * @returns {string|number|null} The theme identifier.
     */
    get themeId() {
        return this._themeId;
    }

    /**
     * Set the theme identifier for this member.
     * 
     * @param {string|number} value - The theme identifier to set.
     */
    set themeId(value) {
        this._themeId = value;
    }

    /**
     * Determine whether this member is currently signed in.
     * 
     * @returns {boolean} True if signed in, false otherwise.
     */
    get signedIn() {
        return this._signedIn;
    }

    /**
     * Set whether this member is signed in.
     * 
     * @param {boolean} value - True if signed in, false otherwise.
     */
    set signedIn(value) {
        this._signedIn = Boolean(value);
    }

    /**
     * Get this member's configuration map.
     * 
     * @returns {object} The configuration object.
     */
    get configs() {
        return this._configs;
    }

    /**
     * Set this member's configuration map.
     * 
     * @param {object} value - The configuration object to set.
     */
    set configs(value) {
        this._configs = value || {};
    }

    /**
     * Get this member's display name display flag.
     * 
     * @returns {boolean} True to display the member's display name, false not to.
     */
    get useDisplayName() {
        return this._useDisplayName;
    }

    /**
     * Set this member's display name display flag.
     * 
     * @param {boolean} value - True to display the member's display name, false not to.
     */
    set useDisplayName(value) {
        this._useDisplayName = value;
    }

    /**
     * Get the member's date time data object instance.
     * 
     * @returns {Object} The member's date time data object instance.
     */
    get dateTime() {
        return this._dateTime;
    }

    /**
     * Set the member's date time data object instance.
     * 
     * @param {Object} value - The member's date time data object instance.
     */
    set dateTime(value) {
        this._dateTime = value;
    }

    /**
     * Get this member's primary group identifier.
     * 
     * @returns {number} The member's primary group identifier.
     */
    get primaryGroup() {
        return this._primaryGroup;
    }

    /**
     * Set this member's primary group identifier.
     * 
     * @param {number} value - The member's primary group identifier.
     */
    set primaryGroup(value) {
        this._primaryGroup = value;
    }

    /**
     * Get this member's secondary group identifiers.
     * 
     * @returns {number[]|null} An array of group identifiers, null if not part of any secondary group.
     */
    get secondaryGroups() {
        return this._secondaryGroups;
    }

    /**
     * Set this member's secondary group identifiers.
     * 
     * @param {number[]|null} value - An array of group identifiers, null if not part of any secondary group. 
     */
    set secondaryGroups(value) {
        this._secondaryGroups = value;
    }

    /**
     * Get the member's widget settings object.
     * 
     * @returns {Object} The member's widget settings object.
     */
    get widgets() {
        return this._widgets;
    }

    /**
     * Set the member's widget setting object.
     * 
     * @param {Object} value - The member's widget settings object.
     */
    set widgets(value) {
        this._widgets = value;
    }

    /**
     * Convert this Member instance to a plain object.
     * 
     * @returns {Object} A plain object representation of this Member.
     */
    toObject() {
        return {
            id: this._id,
            username: this._username,
            displayName: this._displayName,
            emailAddress: this._emailAddress,
            displayOnWo: this._displayOnWo,
            localeId: this._localeId,
            themeId: this._themeId,
            signedIn: this._signedIn,
            configs: this._configs,
            createdAt: this._createdAt,
            updatedAt: this._updatedAt,
            lastLogin: this._lastLogin,
            isAdmin: this._isAdmin,
            useDisplayName: this._useDisplayName,
            dateTime: this._dateTime,
            primaryGroup: this._primaryGroup,
            secondaryGroups: this._secondaryGroups,
            widgets: this._widgets,
        };
    }

    /**
     * Create a new Mmber instance from a plain object.
     * 
     * @param {Object} obj - The object to create from.
     * @returns {Member} The new Member instance. 
     */
    fromObject(obj) {
        const member = new Member();

        member.id = obj.id ?? null;
        member.username = obj.username ?? null;
        member.displayName = obj.displayName ?? null;
        member.emailAddress = obj.emailAddress ?? null;
        member.displayOnWo = obj.displayOnWo ?? false;
        member.localeId = obj.localeId ?? null;
        member.themeId = obj.themeId ?? null;
        member.signedIn = obj.signedIn ?? false;
        member.configs = obj.configs ?? {};
        member.createdAt = obj.createdAt ?? null;
        member.updatedAt = obj.updatedAt ?? null;
        member.lastLogin = obj.lastLogin ?? null;
        member.isAdmin = obj.isAdmin ?? false;
        member.useDisplayName = obj.useDisplayName ?? false;
        member.dateTime = obj.dateTime ?? {};
        member.primaryGroup = obj.primaryGroup ?? null;
        member.secondaryGroups = obj.secondaryGroups ?? null;
        member.widgets = obj.widgets ?? null;
        
        return member;
    }

    /**
     * Check if this user (member or guest) has moderator permissions.
     * 
     * @returns {boolean} True if has moderator permissions, false if not.
     */
    isModerator() {
        if (this._primaryGroup.isModerator) {
            return true;
        }

        if (this._secondaryGroups && this._secondaryGroups.length > 0) {
            this._secondaryGroups.forEach(group => {
                if (group.isModerator) {
                    return true;
                }
            });
        }

        return false;
    }

    /**
     * Check if this user (member or guest) has administrative permissions.
     * 
     * @returns {boolean} True if has admin permissions, false if not.
     */
    isAdmin() {
        if (this._primaryGroup.isAdmin) {
            return true;
        }

        if (this._secondaryGroups && this._secondaryGroups.length > 0) {
            this._secondaryGroups.forEach(group => {
                if (group.isAdmin) {
                    return true;
                }
            });
        }

        return false;
    }
}

module.exports = Member;