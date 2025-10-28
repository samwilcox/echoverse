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
const app = express();
const initializeDatabase = require('./services/databaseService');
const initializeCache = require('./services/cacheService');
const initializeSettings = require('./services/settingsService');
const initializeRoutes = require('./services/routesService');
