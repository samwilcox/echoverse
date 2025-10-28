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
 * An entity that represents a single Session.
 */
class Session {
    /**
     * Creates a new instance of Session.
     */
    constructor() {
        this._id = null;
        this._memberId = null;
        this._expires = null;
        this._lastClick = null;
        this._location = null;
        this._ipAddress = null;
        this._hostname = null;
        this._userAgent = null;
        this._displayName = null;
        this._isBot = false;
        this._botName = null;
        this._isAdmin = false;
    }

    /**
     * Get the session identifier,
     * 
     * @returns {string} The session identifier string.
     */
    get id() {
        return this._id;
    }

    /**
     * Set the session identifier.
     * 
     * @param {string} value - The session identifier to set. 
     */
    set id(value) {
        this._id = value;
    }

    /**
     * Get the member identifier associated with this session.
     * 
     * @returns {string|number|null} The member identifier.
     */
    get memberId() {
        return this._memberId;
    }

    /**
     * Set the member identifier for this session.
     * 
     * @param {string|number} value - The member identifier to set.
     */
    set memberId(value) {
        this._memberId = value;
    }

    /**
     * Get the expiration timestamp for this session.
     * 
     * @returns {Date|null} The expiration date.
     */
    get expires() {
        return this._expires;
    }

    /**
     * Set the expiration timestamp for this session.
     * 
     * @param {Date|string|number} value - The expiration time to set.
     */
    set expires(value) {
        this._expires = value instanceof Date ? value : new Date(value);
    }

    /**
     * Get the timestamp of the last user click or activity.
     * 
     * @returns {Date|null} The last click time.
     */
    get lastClick() {
        return this._lastClick;
    }

    /**
     * Set the timestamp of the last user click or activity.
     * 
     * @param {Date|string|number} value - The last click time to set.
     */
    set lastClick(value) {
        this._lastClick = value instanceof Date ? value : new Date(value);
    }

    /**
     * Get the user's last known location.
     * 
     * @returns {string|null} The location string.
     */
    get location() {
        return this._location;
    }

    /**
     * Set the user's last known location.
     * 
     * @param {string} value - The location string to set.
     */
    set location(value) {
        this._location = value;
    }

    /**
     * Get the user's IP address.
     * 
     * @returns {string|null} The IP address string.
     */
    get ipAddress() {
        return this._ipAddress;
    }

    /**
     * Set the user's IP address.
     * 
     * @param {string} value - The IP address to set.
     */
    set ipAddress(value) {
        this._ipAddress = value;
    }

    /**
     * Get the hostname for this session.
     * 
     * @returns {string|null} The hostname string.
     */
    get hostname() {
        return this._hostname;
    }

    /**
     * Set the hostname for this session.
     * 
     * @param {string} value - The hostname string to set.
     */
    set hostname(value) {
        this._hostname = value;
    }

    /**
     * Get the user agent string for this session.
     * 
     * @returns {string|null} The user agent string.
     */
    get userAgent() {
        return this._userAgent;
    }

    /**
     * Set the user agent string for this session.
     * 
     * @param {string} value - The user agent string to set.
     */
    set userAgent(value) {
        this._userAgent = value;
    }

    /**
     * Get the display name of the user associated with this session.
     * 
     * @returns {string|null} The display name.
     */
    get displayName() {
        return this._displayName;
    }

    /**
     * Set the display name of the user associated with this session.
     * 
     * @param {string} value - The display name to set.
     */
    set displayName(value) {
        this._displayName = value;
    }

    /**
     * Determine if this session belongs to a bot.
     * 
     * @returns {boolean} True if a bot session, false otherwise.
     */
    get isBot() {
        return this._isBot;
    }

    /**
     * Set whether this session belongs to a bot.
     * 
     * @param {boolean} value - True if bot, false otherwise.
     */
    set isBot(value) {
        this._isBot = Boolean(value);
    }

    /**
     * Get the bot name if this session belongs to a bot.
     * 
     * @returns {string|null} The bot name.
     */
    get botName() {
        return this._botName;
    }

    /**
     * Set the bot name for this session.
     * 
     * @param {string} value - The bot name to set.
     */
    set botName(value) {
        this._botName = value;
    }

    /**
     * Determine if this session belongs to an admin.
     * 
     * @returns {boolean} True if admin session, false otherwise.
     */
    get isAdmin() {
        return this._isAdmin;
    }

    /**
     * Set whether this session belongs to an admin.
     * 
     * @param {boolean} value - True if admin session, false otherwise.
     */
    set isAdmin(value) {
        this._isAdmin = Boolean(value);
    }

    /**
     * Convert this Session instance to a plain object.
     * 
     * @returns {object} A plain object representation of the Session.
     */
    toObject() {
        return {
            id: this._id,
            memberId: this._memberId,
            expires: this._expires,
            lastClick: this._lastClick,
            location: this._location,
            ipAddress: this._ipAddress,
            hostname: this._hostname,
            userAgent: this._userAgent,
            displayName: this._displayName,
            isBot: this._isBot,
            botName: this._botName,
            isAdmin: this._isAdmin,
        };
    }

    /**
     * Create a new Session instance from a plain object.
     * 
     * @param {object} obj - The object to create from.
     * @returns {Session} The new Session instance.
     */
    fromObject(obj) {
        const session = new Session();

        session.id = obj.id ?? null;
        session.memberId = obj.memberId ?? null;
        session.expires = obj.expires ?? null;
        session.lastClick = obj.lastClick ?? null;
        session.location = obj.location ?? null;
        session.ipAddress = obj.ipAddress ?? null;
        session.hostname = obj.hostname ?? null;
        session.userAgent = obj.userAgent ?? null;
        session.displayName = obj.displayName ?? null;
        session.isBot = obj.isBot ?? false;
        session.botName = obj.botName ?? null;
        session.isAdmin = obj.isAdmin ?? false;
        
        return session;
    }
}

module.exports = Session;