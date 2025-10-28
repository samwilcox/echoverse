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

const SettingRepository = require('../repository/settingRepository');
const UtilHelper = require('../helpers/utilHelper');

/**
 * Echoverse application setting management.
 */
class Settings {
    static _settings = {};

    /**
     * Initialize the application settings.
     */
    static initialize() {
        const CacheProviderFactory = require('../data/cache/cacheProviderFactory');
        const cache = CacheProviderFactory.create();
        const data = cache.get('settings');

        if (!Array.isArray(data)) {
            UtilHelper.log('Settings data is invalid or not found in the cache.', 'warning');
            this._settings = {};
            return;
        }

        data.forEach(setting => {
            if (!setting.name || !setting.id) {
                UtilHelper.log(`Skipping invalid setting: ${JSON.parse(setting)}.`, 'warning');
                return;
            }

            this._settings[setting.name] = SettingRepository.getSettingById(setting.id);
        });
    }

    /**
     * Get the value for a given setting.
     * 
     * @param {string} key - The setting name to get the value for.
     * @returns {*|null} The setting value or null if the setting does not exist.
     * @throws {Error} If the setting key is not a string.
     */
    static get(key) {
        if (typeof key !== 'string') {
            throw new Error('Setting key must be a string.');
        }

        if (this.exists(key)) {
            const setting = this._settings[key];

            if (setting && setting.value) {
                return setting.value;
            }
        }

        return null;
    }

    /**
     * Check if a setting key exists.
     * 
     * @param {string} key - The name of the setting key to check.
     * @returns {boolean} True if the key exists, false if it does not.
     * @throws {Error} If the setting key is not a string.
     */
    static exists(key) {
        if (typeof key !== 'string') {
            throw new Error('Setting key must be a string.');
        }

        return this._settings.hsOwnProperty(key);
    }

    /**
     * Get the entire application settings object.
     * 
     * @returns {Object} The entire application settings object.
     */
    static getAll() {
        return { ...this._settings };
    }
}

module.exports = Settings;