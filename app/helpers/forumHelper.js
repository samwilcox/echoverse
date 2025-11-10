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

const NotFoundError = require('../errors/notFoundError');
const ForumRepository = require('../repository/forumRepository');
const MemberRepository = require('../repository/memberRepository');
const TopicRepository = require('../repository/topicRepository');
const UtilHelper = require('./utilHelper');

/**
 * Helpers for forum related tasks.
 */
class ForumHelper {

    /**
     * Get the forum statistics for this forum.
     * 
     * @param {number} forumId - The forum identifier to get the stats for.
     * @returns {Object} An object that contains the raw and formatted stats.
     * 
     * @example
     * parsedStats(1);
     * // ->
     * {
     *     topics: {
     *         raw: 124645,
     *         formatted: 124.64K
     *     },
     *     replies: {
     *         raw: 124645,
     *         formatted: 124.64K
     *     },
     *     clicks: {
     *         raw: 124645,
     *         formatted: 124.64K
     *     }
     * }
     */
    parsedStats(forumId) {
        const forum = ForumRepository.getForumById(forumId);

        if (!forum) {
            throw new NotFoundError(`Cannot find the forum with identifier '${forumId}'.`, { forumId });
        }

        return {
            topics: {
                raw: forum.stats.topics,
                formatted: UtilHelper.formatNumber(forum.stats.topics),
            },
            replies: {
                raw: Math.abs(forum.stats.posts - forum.stats.topics),
                formatted: UtilHelper.formatNumber(Math.abs(forum.stats.posts - forum.stats.topics)),
            },
            clicks: {
                raw: forum.redirect.enabled ? forum.redirect.redirect.clicks : 0,
                formatted: forum.redirect.enabled ? UtilHelper.formatNumber(forum.redirect.clicks) : '0',
            },
        };
    }

    
}

module.exports = ForumHelper;