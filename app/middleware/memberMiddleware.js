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
const MemberService = require('../services/memberService');
const CacheProviderFactory = require('../data/cache/cacheProviderFactory');
const SessionHelper = require('../helpers/sessionHelper');
const SessionList = require('../lists/sessionList');
const TargetList = require('../lists/targetList');

/**
 * Middlware for initializing the member entity for the user.
 * 
 * @param {Object} req - The request object from Express.
 * @param {Object} res - The response object from Express.
 * @param {Object} next - The next middleware to execute.
 */
const memberMiddleware = async (req, res, next) => {
    try {
        if (SessionHelper.exists(req, SessionList.AUTH_TOKEN)) {
            const cache = CacheProviderFactory.create();
            const data = cache.get(TargetList.MEMBER_DEVICES).find(device => device.token === SessionHelper.get(req, SessionList.AUTH_TOKEN));
            const exists = data ? true : false;
            let memberId = 0;

            if (exists) {
                memberId = data.memberId;
                req._member = MemberRepository.getMemberById(memberId);
                req._member.signedIn = true;
                MemberService.member = req._member;
            } else {
                req._member = MemberRepository.getMemberById(0);
                MemberRepository.member = req._member;
            }
        } else {
            req._member = MemberRepository.getMemberById(0);
            MemberService.member = req._member;
        }

        next();
    } catch (error) {
        next(error);
    }
};

module.exports = memberMiddleware;