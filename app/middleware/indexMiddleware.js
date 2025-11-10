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

const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const session = require('express-session');
const passport = require('passport');
const ejsLayouts = require('express-ejs-layouts');
const { secureStateMiddleware } = require('securestate');
const sessionMiddleware = require('./sessionMiddleware');
const memberMiddleware = require('./memberMiddleware');
const localeMiddleware = require('./localeMiddleware');
const viewEngineMiddleware = require('./viewEngineMiddleware');
const UtilHelper = require('../helpers/utilHelper');

/**
 * Setup all the middleware for Echoverse.
 * 
 * @param {Express} app - The Express application object instance.
 */
module.exports = (app) => {
    app.use(cors());
    app.use(cookieParser());
    app.use(express.json());
    app.use(express.urlencoded({ extended: true }));
    app.use(express.static('public'));
    app.use(secureStateMiddleware);
    app.use(session({
        secret: process.env.SESSION_SECRET_KEY,
        resave: false,
        saveUninitialized: true,
        cookie: {
            secure: process.env.SESSION_SECURE_COOKIE.toLowerCase() === 'true',
            maxAge: parseInt(process.env.SESSION_COOKIE_MAX_AGE_SECONDS, 10),
        },
    }));
    app.use(memberMiddleware);
    app.use(sessionMiddleware);
    app.use(localeMiddleware(app));
    app.use(viewEngineMiddleware);
    app.use(ejsLayouts);

    UtilHelper.log('Echoverse middleware has been setup.', 'debug');
};