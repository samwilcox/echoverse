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
const router = express.Router();
const IndexController = require('../controllers/indexController');

const indexController = new IndexController();

router.get('/', indexController.buildIndex.bind(indexController));

module.exports = router;