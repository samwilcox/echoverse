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

const CacheProviderFactory = require('../data/cache/cacheProviderFactory');
const UtilHelper = require('../helpers/utilHelper');

/**
 * Builds the cache from the database.
 */
module.exports = () => {
    const cache = CacheProviderFactory.create();

    return cache
        .build()
        .then(() => {
            UtilHelper.log('Cache built.', 'debug');
        });
};