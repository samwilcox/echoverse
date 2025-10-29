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

const SessionRepository = require('../repository/sessionRepository');
const MemberRepository = require('../repository/memberRepository');
const CacheProviderFactory = require('../data/cache/cacheProviderFactory');
const CookieHelper = require('../helpers/cookieHelper');
const Settings = require('../settings');
const UtilHelper = require('../helpers/utilHelper');
const DatabaseProviderFactory = require('../data/db/databaseProviderFactory');
const QueryBuilder = require('../data/db/queryBuilder');
const DateTimeHelper = require('../helpers/dateTimeHelper');
const MemberService = require('../services/memberService');

/**
 * Middleware for managing sessions.
 * 
 * @param {Object} req - The request object from Express.
 * @param {Object} res - The response object from Express.
 * @param {Object} next - The next middleware to execute.
 */
const sessionMiddleware = async (req, res, next) => {
    try {
        
    } catch (error) {

    }
};

/**
 * Create a new session in the database.
 * 
 * @param {Object} req - The request object from Express.
 * @param {boolean} [isMember=false] - True if a member, false if a guest (default is false). 
 */
const create = async (req, isMember = false) => {
    if (!req.originalUrl.includes('/ajax')) {
        const db = DatabaseProviderFactory.create();
        const cache = CacheProviderFactory.create();
        const builder = new QueryBuilder();
        const expiryDate = new Date();
        expiryDate.setMinutes(expiryDate.getMinutes() + Settings.get('sessionDuration') * 60);

        req._session.expires = expiryDate;
        req._session.lastClick = new Date();
        req._session.location = req.originalUrl;
        req._session.userAgent = req.headers['user-agent'];
        req._session.hostname = req.hostname;
        req._session.ipAddress = UtilHelper.getUserIp(req);

        if (!isMember) {
            req._session.memberId = 0;
            req._session.isAdmin = false;
            req._session.displayNameOnWo = false;
        }

        if (!isMember) {
            autoSignInMember(req);
        }

        const botData = UtilHelper.detectBots(req);
        req._session.isBot = botData.isBot;
        req._session.botName = botData.name;

        db.query(
            builder
                .clear()
                .insertInto('sessions', [
                    'id',
                    'memberId',
                    'expires',
                    'lastClick',
                    'location',
                    'ipAddress',
                    'hostname',
                    'userAgent',
                    'displayOnWo',
                    'isBot',
                    'botName',
                    'isAdmin'
                ], [
                    req._session.id,
                    req._session.memberId,
                    DateTimeHelper.dateToEpoch(req._session.expires),
                    DateTimeHelper.dateToEpoch(req._session.lastClick),
                    req._session.location,
                    req._session.ipAddress,
                    req._session.hostname,
                    req._session.userAgent,
                    req._session.displayOnWo ? 1 : 0,
                    req._session.isBot ? 1 : 0,
                    req._session.botName,
                    req._session.isAdmin ? 1 : 0
                ])
                .build()
        )
        .then(result => {
            UtilHelper.log(`Data inserted successfully: ${result}.`, 'debug');
        })
        .catch(error => {
            UtilHelper.log(`Error inserting data into the database: ${error}.`, 'error');
        });

        await cache.update('sessions');
    }
};

/**
 * Auto sign in the member if a valid token exists.
 * 
 * @param {Object} req - The request object from Express.
 */
const autoSignInMember = (req) => {

};

module.exports = sessionMiddleware;