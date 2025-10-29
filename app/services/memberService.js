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

const MemberRepository = require('../repository/memberRepository');

/**
 * Provides services for managing bulletin board members.
 */
class MemberService {
    static _instance = null;
    static _member = null;
    static _session = null;

    /**
     * Get the singleton instance of MemberService.
     * 
     * @returns {MemberService} The singleton instance of MemberService.
     */
    static getInstance() {
        if (!MemberService._instance) {
            MemberService._instance = new MemberService();
        }

        return MemberService._instance;
    }

    /**
     * Get the member entity object instance of the current member or guest.
     * 
     * @returns {Member} The member entity object instance.
     */
    get member() {
        return { ...this._member };
    }

    /**
     * Set the member entity object instance of the current member or guest.
     * 
     * @param {Member} value - The member entity object instance. 
     */
    set member(value) {
        this._member = value;
    }

    /**
     * Get the member's session entity object instance of the current member of guest.
     * 
     * @returns {Session} The member's session entity object instance.
     */
    get session() {
        return { ...this._session };
    }

    /**
     * Set the member's session entity object instance of the current member or guest.
     * 
     * @param {Session} value - The member's session entity object instance. 
     */
    set session(value) {
        this._session = value;
    }
}

module.exports = MemberService.getInstance();