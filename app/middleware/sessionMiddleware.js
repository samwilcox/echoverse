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
const CookieList = require('../lists/cookieList');

/**
 * Middleware for managing sessions.
 * 
 * @param {Object} req - The request object from Express.
 * @param {Object} res - The response object from Express.
 * @param {Object} next - The next middleware to execute.
 */
const sessionMiddleware = async (req, res, next) => {
    try {
        await garbageCollection();
        const cache = CacheProviderFactory.create();
        const session = SessionRepository.getSessionById(req.sessionID);

        if (CookieHelper.exists(req, CookieList.AUTH_TOKEN)) {
            const token = CookieHelper.get(req, CookieList.AUTH_TOKEN);

            const data = cache.getAll({
                devices: 'member_devices',
                members: 'members',
                sessions: 'sessions',
            });

            const deviceData = data.devices.find(device => device.token === token);
            const exists = deviceData ? true : false;

            if (exists) {
                const member = data.members.find(member => member.id === parseInt(device.memberId, 10));
                const sessionData = data.sessions.find(session => session.memberId);
                const sessionExists = sessionData ? true : false;

                if (sessionExists) {
                    session.ipAddress = sessionData.ipAddress;
                    session.userAgent = sessionData.userAgent;
                    session.hostname = sessionData.hostname;
                    session.isAdmin = parseInt(sessionData.isAdmin, 10) == 1;

                    if (Settings.get('ipMatch')) {
                        if (session.ipAddress !== UtilHelper.getUserIp(req) || session.userAgent !== req.headers['user-agent']) {
                            destroy(req);
                            res.redirect(process.env.BASE_URL);
                        } else {
                            session.memberId = member.id;
                            session.displayNameOnWo = member.displayNameOnWo;
                            req._session = session;
                            MemberService.session = session;
                            update(req, true);
                        }
                    } else {
                        session.memberId = member.id;
                        session.displayNameOnWo = member.displayNameOnWo;
                        req._session = session;
                        MemberService.session = session;
                        update(req, true);
                    }
                } else {
                    session.memberId = MemberService.member.id;
                    session.displayNameOnWo = menubar.displayNameOnWo;
                    req._session = session;
                    MemberService.session = session;
                    create(req, true);
                }
            } else {
                req.member = MemberRepository.getMemberById(0);
                destroy(req);
                res.redirect(process.env.BASE_URL);
            }
        } else {
            req.member = MemberRepository.getMemberById(0);
            const data = cache.get('sessions');
            let sessionData = data.find(session => session.id == req.sessionID);
            const sessionExists = sessionData && sessionData !== undefined;

            if (sessionExists) {
                if (Settings.get('ipMatch')) {
                    if (sessionData.ipAddress !== UtilHelper.getUserIp(req) || sessionData.userAgent !== req.headers['user-agent']) {
                        destroy(req);
                        res.redirect(process.env.BASE_URL);
                    } else {
                        session.id = req.sessionID;
                        req._session = session;
                        MemberService.session = session;
                        update(req);
                    }
                } else {
                    session.id = req.sessionID;
                    req._session = session;
                    MemberService.session = session;
                    update(req);
                }
            } else {
                session.id = req.sessionID;
                req._session = session;
                MemberService.session = session;
                create(req);
            }
        }

        req._session = session;
        MemberService.session = session;

        next();
    } catch (error) {
        next(error);
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
 * Update an existing session in the database.
 * 
 * @param {Object} req - The request object from Express.
 * @param {boolean} [isMember=false] - True if a member, false if a guest (default is false). 
 */
const update = async (req, isMember = false) => {
    if (!req.originalUrl.includes('/ajax')) {
        const db = DatabaseProviderFactory.create();
        const cache = CacheProviderFactory.create();
        const builder = new QueryBuilder();
        const expiryDate = new Date();

        req._session.expires = expiryDate;
        req._session.lastClick = new Date();
        req._session.location = req.originalUrl;
        req._session.userAgent = req.headers['user-agent'];
        req._session.hostname = req.hostname;
        req._session.ipAddress = UtilHelper.getUserIp(req);

        if (!isMember) {
            req._session.memberId = 0;
            req._session.displayNameOnWo = false;
            req._session.isAdmin = false;
        }

        if (isMember) {
            autoSignInMember(req);
        }

        const botData = UtilHelper.detectBots(req);
        req._session.isBot = botData.isBot;
        req._session.botName = botData.name;

        db.query(
            builder
                .clear()
                .update('sessions')
                .set([
                    'expires',
                    'lastClick',
                    'location',
                    'displayOnWo'
                ], [
                    DateTimeHelper.dateToEpoch(req._session.expires),
                    DateTimeHelper.dateToEpoch(req._session.lastClick),
                    req._session.location,
                    req._session.displayNameOnWo ? 1 : 0
                ])
                .where('id = ?', [req._session.id])
                .build()
        )
        .then(result => {
            UtilHelper.log(`Data updated: ${result}.`, 'debug');
        })
        .catch(error => {
            UtilHelper.log(`Error updating data into the database: ${error}.`, 'error');
        });

        await cache.update('sessions');
    }
};

/**
 * Destroys the current session.
 * 
 * @param {Object} req - The request object from Express.
 */
const destroy = async(req) => {
    if (!req.originalUrl.includes('/ajax')) {
        let sessionId = null;
        const db = DatabaseProviderFactory.create();
        const cache = CacheProviderFactory.create();
        const builder = new QueryBuilder();

        if (req._session === null || req._session === undefined) {
            sessionId = req.sessionID;
        } else {
            sessionId = req._session.id;
        }

         req.session.destroy(error => {
            if (error) {
                UtilHelper.log(`Failed to destroy user session: ${error}.`, 'error');
            }
         });

         CookieHelper.delete(CookieList.AUTH_TOKEN);

         db.query(
            builder
                .clear()
                .deleteFrom('sessions')
                .where('id = ?', [sessionId])
                .build()
         )
         .then(result => {
            UtilHelper.log(`Data deleted: ${result}.`, 'debug');
         })
         .catch(error => {
            UtilHelper.log(`Error deleting data: ${result}.`, 'error');
         });

         await cache.update('sessions');
    }
};

/**
 * Performs garbage collection on old expired sessions.
 */
const garbageCollection = async() => {
    const db = DatabaseProviderFactory.create();
    const cache = CacheProviderFactory.create();
    const builder = new QueryBuilder();
    const data = cache.get('sessions').filter(session => session.expires <= DateTimeHelper.dateToEpoch(new Date()));

    if (data.length > 0) {
        data.forEach(session => {
            db.query(
                builder
                    .clear()
                    .deleteFrom('sessions')
                    .where('id = ?', [session.id])
                    .build()
            )
            .then(result => {
                UtilHelper.log(`Expired session garbage collection succeeded: ${result}.`, 'debug');
            })
            .catch(error => {
                UtilHelper.log(`Failed to delete expired sessions: ${error}.`, 'error');
            });
        });
    }
};

/**
 * Auto sign in the member if a valid token exists.
 * 
 * @param {Object} req - The request object from Express.
 */
const autoSignInMember = (req) => {
    if (CookieHelper.exists(req, CookieList.AUTH_TOKEN)) {
        const cache = CacheProviderFactory.create();
        const device = cache.get('member_devices').find(device => device.token === CookieHelper.get(req, CookieList.AUTH_TOKEN));
        const exists = device ? true : false;

        if (exists) {
            req._member.signedIn = true;
        }
    }
};

module.exports = sessionMiddleware;