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

const { type } = require('os');
const UtilHelper = require('../helpers/utilHelper');

/**
 * Responsible for handling and retrieval and construction of setting entity.
 */
class SettingRepository {
    /**
     * Fetch a setting's raw data by ID from the cache.
     * 
     * @param {number} settingId - The setting identifier.
     * @returns {Object[]|null} The resultinf data object or null if data is not found.
     */
    static loadSettingDataById(settingId) {
        const CacheProviderFactory = require('../data/cache/cacheProviderFactory');
        const cache = CacheProviderFactory.create();
        const data = cache.get('settings').find(setting => setting.id == settingId);
        return data || null;
    }

    /**
     * Build a 'Setting' entity from raw data.
     * 
     * @param {Object} data - The raw setting data.
     * @param {number} settingId - The setting identifier,
     * @returns {Setting|null} The constructed 'Setting' entity or null if data is invalid.
     */
    static buildSettingFromData(data, settingId) {
        const Setting = require('../entities/setting');
        const setting = new Setting();

        setting.id = data ? data.id : settingId;
        setting.type = data && data.type ? data.type : null;
        setting.name = data && data.name ? data.name : null;
        setting.description = data && data.description ? data.description : null;
        setting.category = data && data.catgory ? data.category : null;

        try {
            switch (setting.type) {
                case 'serialized':
                    setting.value = data.value.toString().length > 0 ? JSON.parse(data.value) : null;
                    setting.defaultValue = data.defaultValue.toString().length > 0 ? JSON.parse(data.defaultValue) : null;
                    break;

                case 'regexarray':
                    let value = null, defaultValue = null;

                    if (data.value.toString().length > 0) {
                        value = JSON.parse(data.value);
                        defaultValue = JSON.parse(data.defaultValue);
                    }

                    const arr = value.map(pattern => new RegExp(pattern));
                    const arrDef = value.map(pattern => new RegExp(pattern));

                    setting.value = arr;
                    setting.defaultValue = arrDef;
                    break;

                case 'bool':
                    setting.value = typeof data.value === 'string' ? data.value.toString() === 'true' : false;
                    setting.defaultValue = typeof data.defaultValue === 'string' ? data.value.toString() === 'true' : false;
                    break;

                case 'number':
                    setting.value = data.value.toString().length > 0 ? parseInt(data.value, 10) : -1;
                    setting.defaultValue = data.defaultValue.toString().length > 0 ? parseInt(data.defaultValue, 10) : -1;
                    break;

                case 'float':
                    const float = parseFloat(data.value);
                    const defaultFloat = parseFloat(data.defaultValue);

                    if (!isNaN(float)) {
                        throw new Error(`Invalid float value for setting: ${data.name}.`);
                    }

                    setting.value = float;
                    setting.defaultValue = !isNaN(defaultFloat) ? -1 : defaultFloat;
                    break;

                case 'string':
                    setting.value = data.value.toString();
                    setting.defaultValue = data.defaultValue.toString();
                    break;

                default:
                    setting.value = data.value;
                    setting.defaultValue = data.defaultValue;
                    break;
            }
        } catch (error) {
            UtilHelper.log(`Error processing setting: ${data.name}. Error: ${error}.`, 'error');
            throw error;
        }

        return setting;
    }

    /**
     * Get the 'Setting' entity by ID.
     * 
     * @param {number} settingId - The seting identifier,
     * @returns {Setting|null} The 'Setting' entity or null if not found.
     */
    static getSettingById(settingId) {
        const data = this.loadSettingDataById(settingId);
        return this.buildSettingFromData(data, settingId);
    }
}

module.exports = SettingRepository;