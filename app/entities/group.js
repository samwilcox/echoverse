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
 * An entity that represents a single Group.
 */
class Group {
    /**
     * Create a new instance of Group.
     */
    constructor() {
        this._id = null;
        this._sortOrder = null;
        this._name = null;
        this._description = null;
        this._createdAt = null;
        this._color = null;
        this._emphasize = false;
        this._display = false;
        this._isModerator = false;
        this._isAdmin = false;
        this._canBeModified = false;
        this._canBeDeleted = false;
    }

    /**
     * Get the group identifier.
     * 
     * @returns {string|number|null} The group identifier.
     */
    get id() {
        return this._id;
    }

    /**
     * Set the group identifier.
     * 
     * @param {string|number} value - The group identifier to set.
     */
    set id(value) {
        this._id = value;
    }

    /**
     * Get the sort order for this group.
     * 
     * @returns {number|null} The sort order.
     */
    get sortOrder() {
        return this._sortOrder;
    }

    /**
     * Set the sort order for this group.
     * 
     * @param {number} value - The sort order to set.
     */
    set sortOrder(value) {
        this._sortOrder = value;
    }

    /**
     * Get the group name.
     * 
     * @returns {string|null} The group name.
     */
    get name() {
        return this._name;
    }

    /**
     * Set the group name.
     * 
     * @param {string} value - The group name to set.
     */
    set name(value) {
        this._name = value;
    }

    /**
     * Get the group description.
     * 
     * @returns {string|null} The group description.
     */
    get description() {
        return this._description;
    }

    /**
     * Set the group description.
     * 
     * @param {string} value - The group description to set.
     */
    set description(value) {
        this._description = value;
    }

    /**
     * Get the date this group was created.
     * 
     * @returns {Date|null} The creation date.
     */
    get createdAt() {
        return this._createdAt;
    }

    /**
     * Set the date this group was created.
     * 
     * @param {Date|string|number} value - The creation date to set.
     */
    set createdAt(value) {
        this._createdAt = value instanceof Date ? value : new Date(value);
    }

    /**
     * Get the color associated with this group.
     * 
     * @returns {string|null} The color string.
     */
    get color() {
        return this._color;
    }

    /**
     * Set the color associated with this group.
     * 
     * @param {string} value - The color string to set.
     */
    set color(value) {
        this._color = value;
    }

    /**
     * Determine whether this group should be emphasized in UI.
     * 
     * @returns {boolean} True if emphasized, false otherwise.
     */
    get emphasize() {
        return this._emphasize;
    }

    /**
     * Set whether this group should be emphasized in UI.
     * 
     * @param {boolean} value - True if emphasized, false otherwise.
     */
    set emphasize(value) {
        this._emphasize = Boolean(value);
    }

    /**
     * Determine whether this group is displayed publicly.
     * 
     * @returns {boolean} True if displayed, false otherwise.
     */
    get display() {
        return this._display;
    }

    /**
     * Set whether this group is displayed publicly.
     * 
     * @param {boolean} value - True if displayed, false otherwise.
     */
    set display(value) {
        this._display = Boolean(value);
    }

    /**
     * Determine if this group grants moderator privileges.
     * 
     * @returns {boolean} True if moderator group, false otherwise.
     */
    get isModerator() {
        return this._isModerator;
    }

    /**
     * Set whether this group grants moderator privileges.
     * 
     * @param {boolean} value - True if moderator group, false otherwise.
     */
    set isModerator(value) {
        this._isModerator = Boolean(value);
    }

    /**
     * Determine if this group grants administrator privileges.
     * 
     * @returns {boolean} True if admin group, false otherwise.
     */
    get isAdmin() {
        return this._isAdmin;
    }

    /**
     * Set whether this group grants administrator privileges.
     * 
     * @param {boolean} value - True if admin group, false otherwise.
     */
    set isAdmin(value) {
        this._isAdmin = Boolean(value);
    }

    /**
     * Determine if this group can be modified.
     * 
     * @returns {boolean} True if modifiable, false otherwise.
     */
    get canBeModified() {
        return this._canBeModified;
    }

    /**
     * Set whether this group can be modified.
     * 
     * @param {boolean} value - True if modifiable, false otherwise.
     */
    set canBeModified(value) {
        this._canBeModified = Boolean(value);
    }

    /**
     * Determine if this group can be deleted.
     * 
     * @returns {boolean} True if deletable, false otherwise.
     */
    get canBeDeleted() {
        return this._canBeDeleted;
    }

    /**
     * Set whether this group can be deleted.
     * 
     * @param {boolean} value - True if deletable, false otherwise.
     */
    set canBeDeleted(value) {
        this._canBeDeleted = Boolean(value);
    }

    /**
     * Convert this Group instance to a plain object.
     * 
     * @returns {Object} A plain object representation of the Group.
     */
    toObject() {
        return {
            id: this._id,
            sortOrder: this._sortOrder,
            name: this._name,
            description: this._description,
            createdAt: this._createdAt,
            color: this._color,
            emphasize: this._emphasize,
            display: this._display,
            isModerator: this._isModerator,
            isAdmin: this._isAdmin,
            canBeModified: this._canBeModified,
            canBeDeleted: this._canBeDeleted
        };
    }

    /**
     * Create a new Group instance from a plain object.
     * 
     * @param {Oject} obj - The object to create from.
     * @returns {Group} The new Group instance.
     */
    static fromObject(obj) {
        const group = new Group();

        group.id = obj.id ?? null;
        group.sortOrder = obj.sortOrder ?? null;
        group.name = obj.name ?? null;
        group.description = obj.description ?? null;
        group.createdAt = obj.createdAt ?? null;
        group.color = obj.color ?? null;
        group.emphasize = obj.emphasize ?? false;
        group.display = obj.display ?? false;
        group.isModerator = obj.isModerator ?? false;
        group.isAdmin = obj.isAdmin ?? false;
        group.canBeModified = obj.canBeModified ?? false;
        group.canBeDeleted = obj.canBeDeleted ?? false;

        return group;
    }
}

module.exports = Group;