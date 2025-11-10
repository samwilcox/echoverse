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

const UtilHelper = require('../helpers/utilHelper');
const InvalidError = require('../errors/invalidError');

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

        const safeStr = v => (v === null || v === undefined) ? '' : String(v);
        const hasText = v => typeof v === 'string' ? v.trim().length > 0 : (v !== null && v!== undefined && String(v).trim().length > 0);
        const parseJsonOrNull = v => {
            if (!hasText(v)) return null;

            try {
                return (typeof v === 'string') ? JSON.parse(v) : v;
            } catch (error) {
                throw new InvalidError(`Invalid JSON: ${error.message}.`);
            }
        };
        const toBool = v => {
            if (typeof v === 'boolean') return v;
            if (v === null || v === undefined) return false;
            const s = String(v).trim().toLowerCase();
            return s === 'true' || s === '1' || s === 'yes';
        };
        const toIntOr = (v, dflt) => {
            if (v === null || v === undefined || String(v).trim() === '') return dflt;
            const n = parseInt(v, 10);
            return Number.isNaN(n) ? dflt : n;
        };
        const toFloatOr = (v, dflt) => {
            if (v === null || v === undefined || String(v).trim() === '') return dflt;
            const n = parseFloat(v);
            return Number.isNaN(n) ? dflt : n;
        };

        const setting = new Setting();

        setting.id = data.id ?? settingId;
        setting.type = data.type ?? null;
        setting.name = data.name ?? null;
        setting.description = data.description ?? null;
        setting.category = (data.category ?? data.catgory) ?? null;

        try {
            switch (setting.type) {
                case 'serialized':
                    const val = parseJsonOrNull(data.value);
                    const def = parseJsonOrNull(data.defaultValue);

                    setting.value = val;
                    setting.defaultValue = def;
                    break;

                case 'regexarray':
                    const valueArr = parseJsonOrNull(data.value) ?? [];
                    const defaultArr = parseJsonOrNull(data.defaultValue) ?? [];

                    if (!Array.isArray(valueArr) || !Array.isArray(defaultArr)) {
                        throw new Error('regexarray expects JSON arrays.');
                    }

                    const arr = valueArr.map(p => new RegExp(String(p)));
                    const arrDef = defaultArr.map(p => new RegExp(String(p)));

                    setting.value = arr;
                    setting.defaultValue = arrDef;
                    break;

                case 'bool':
                    setting.value = toBool(data.value);
                    setting.defaultValue = toBool(data.defaultValue);
                    break;

                case 'number':
                    setting.value = toIntOr(data.value, -1);
                    setting.defaultValue = toIntOr(data.defaultValue, -1);
                    break;

                case 'float':
                    const f = toFloatOr(data.value, -1);
                    const df = toFloatOr(data.defaultValue, -1);

                    setting.value = f;
                    setting.defaultValue = df;
                    break;

                case 'string':
                    setting.value = safeStr(data.value);
                    setting.defaultValue = safeStr(data.defaultValue);
                    break;

                default:
                    setting.value = (data.value === undefined) ? null : data.value;
                    setting.defaultValue = (data.defaultValue == undefined) ? null : data.defaultValue;
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