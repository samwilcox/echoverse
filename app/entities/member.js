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
            isAdmin: this._isAdmin
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
        
        return member;
    }
}

module.exports = Member;