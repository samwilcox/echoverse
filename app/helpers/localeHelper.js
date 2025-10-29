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

const FileHelper = require('./fileHelper');
const path = require('path');
const fs = require('fs');
const NotFoundError = require('../errors/notFoundError');
const ParseError = require('../errors/parseError');

/**
 * Helpers for working with locales (languages).
 */
class LocaleHelper {
    static _locale = {};

    /**
     * Initialize the locale.
     * 
     * @param {Member} member - The member entity instance.
     * @throws {Error} If either JSON parsing fails or a file does not exist.
     */
    static initialize(member) {
        const manifestFilePath = path.join(member.configs.localePath, 'manifest.json');

        if (!FileHelper.exists(manifestFilePath)) {
            throw new NotFoundError(`Manifest JSON file for locale '${member.localeId}' does not exist.`, { localeId: member.localeId });
        }

        let manifestJson;

        try {
            const manifestData = FileHelper.readFile(manifestFilePath);
            manifestJson = JSON.parse(manifestData);
        } catch (error) {
            throw new ParseError(`Failed to parse manifest.json for locale '${member.localeId}': ${error.message}.`, { localeId: member.localeId, manifestFile: manifestFilePath });
        }

        const files = manifestJson.files;

        if (!Array.isArray(files)) {
            throw new ParseError(`Manifest for locale '${member.localeId}' must include a 'files' array.`, { localeId: member.localeId });
        }

        this._locale = {};

        for (const fileName of files) {
            const localeFilePath = path.join(member.configs.localePath, fileName);

            if (!FileHelper.exists(localeFilePath)) {
                throw new NotFoundError(`Locale file ${fileName}' listed in manifest.json does not exist.`, { localeId: member.localeId, fileName });
            }

            try {
                const fileData = FileHelper.readFile(localeFilePath);
                const parsedJson = JSON.parse(fileData);
                const key = path.basename(fileName, '.json');
                this._locale[key] = parsedJson;
            } catch (error) {
                throw new ParseError(`Failed to parse locale file '${fileName}': ${error.message}.`, { localeId: member.localeId, fileName });
            }
        }
     }

     /**
      * Get the entire locale collection in a single object.
      * 
      * @returns {Object} The entire locale collection object.
      */
     static getAll() {
        return { ...this._locale };
     }

     /**
      * Get the locale for a given category.
      * 
      * @param {string} category - The name of the category to get.
      * @returns {Object|null} The object containing the locale for the given category name or null if the category does not exist.
      */
     static getCategory(category) {
        return LocaleHelper._locale[category] ?? null;
     }

     /**
      * Get the locale string for the given category and identifier.
      * 
      * @param {string} category - The name of the category to get.
      * @param {string} identifier - The string identifier from the given category to get.
      * @returns {string|null} The locale string or null if either the category or identifier does not exist.
      */
     static get(category, identifier) {
        return LocaleHelper._locale[category][identifier] ?? null;
     }

     /**
      * Replace a single item in the given category and identifier locale string.
      * 
      * @param {string} category - The name of the category.
      * @param {string} identifier - The string identifier.
      * @param {string} needle - The string to replace.
      * @param {string} replacement - The string replacement for the needle.
      * @returns {string} Locale string with replacement(s).
      */
     static replace(category, identifier, needle, replacement) {
        let words = this.get(category, identifier);

        if (!words.includes('${' + needle + '}')) {
            return words;
        }

        return words.replace('${' + needle + '}', replacement);
     }

     /**
      * Replace multiple items in the specified category and identifier locale string.
      * 
      * @param {string} category - The namne of the category.
      * @param {string} identifier - The string identifier. 
      * @param {Object[]} replacements - Object containing key-value pairs for replacements.
      * @returns {string} Locale string with replacements. 
      */
     static replaceAll(category, identifier, replacements) {
        let words = this.get(category, identifier);

        for (const key in replacements) {
            words = words.replace('${' + key + '}', replacements[key]);
        }

        return words;
     }
}

module.exports = LocaleHelper;