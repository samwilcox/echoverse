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

const fs = require('fs');
const path = require('path');
const UtilHelper = require('./utilHelper');

/**
 * Helpers for working with the local file system.
 */
class FileHelper {
    /**
     * Create a new file with the given content.
     * 
     * @param {string} filePath - Path of the file to create.
     * @param {string} content - Content to write to the file.
     * @throws {Error} If the file creation process fails.
     */
    static createFile(filePath, content = '') {
        try {
            fs.writeFileSync(filePath, content, { flag: 'wx' });
        } catch (error) {
            UtilHelper.log(`Error creating file: ${filePath}.`, 'error');
            throw error;
        }
    }

    /**
     * Write content to an existing file (overwrites content).
     * 
     * @param {string} filePath - Path of the file to write to.
     * @param {string} content - Content to write to the file.
     * @throws {Error} If the file write process fails.
     */
    static writeFile(filePath, content = '') {
        try {
            fs.writeFileSync(filePath, content);
        } catch (error) {
            UtilHelper.log(`Error writing data to file: ${filePath}.`, 'error');
            throw error;
        }
    }

    /**
     * Append content to an existing file.
     * 
     * @param {string} filePath - Path of the file to write to.
     * @param {string} content - Content to write to the file.
     * @throws {Error} If the file write process fails.
     */
    static appendToFile(filePath, content) {
        try {
            fs.appendFileSync(filePath, content);
        } catch (error) {
            UtilHelper.log(`Error appending to file: ${filePath}.`, 'error');
            throw error;
        }
    }

    /**
     * Read content from an existing file.
     * 
     * @param {string} filePath - The path of the file to read content from.
     * @returns {string} The content of the file.
     * @throws {Error} If the file read process fails.
     */
    static readFile(filePath) {
        try {
            const content = fs.readFileSync(filePath, 'utf-8');
            return content;
        } catch (error) {
            UtilHelper.log(`Error reading content from file: ${filePath}.`, 'error');
            throw error;
        }
    }

    /**
     * Delete an existing file.
     * 
     * @param {string} filePath - The path of the file to delete.
     * @throws {Error} If the file deletion process fails.
     */
    static deleteFile(filePath) {
        try {
            fs.unlinkSync(filePath);
        } catch (error) {
            UtilHelper.log(`Error deleting file: ${filePath}.`, 'error');
            throw error;
        }
    }

    /**
     * Set permissions on an existing file.
     * 
     * @param {string} filePath - The path of the file to modify permissions on.
     * @param {number} mode - Permissions in octel (e.g., 0x644).
     * @throws {Error} If the set permissions process fails.
     */
    static setPermissions(filePath, mode) {
        try {
            fs.chmodSync(filePath, mode);
        } catch (error) {
            UtilHelper.log(`Error setting permissions on file: ${filePath}. Mode: ${mode}.`, 'error');
            throw error;
        }
    }

    /**
     * Move an existing file.
     * 
     * @param {string} filePath - The path to the file to move.
     * @param {string} destination - The path of the destination of the file.
     * @throws {Error} If the file move process fails.
     */
    static moveFile(filePath, destination) {
        try {
            const destDir = path.dirname(destination);
            fs.mkdirSync(destDir, { recursive: true });
            fs.renameSync(filePath, destination);
        } catch (error) {
            UtilHelper.log(`Error moving file: ${filePath} to ${destination}.`, 'error');
            throw error;
        }
    }

    /**
     * Get the size of an existing file.
     * 
     * @param {string} filePath - The path to the file to get the size for.
     * @returns {number} The size of the given file.
     * @throws {Error} If the file size retreival process fails.
     */
    static fileSize(filePath) {
        try {
            const stats = fs.statSync(filePath);
            return stats.size;
        } catch (error) {
            UtilHelper.log(`Error reading the size of file: ${filePath}.`, 'error');
            throw error;
        }
    }

    /**
     * Create a directory if it does not yet exist.
     * 
     * @param {string} directory - The path to the directory to create if it does not exist.
     * @throws {Error} If the directory creation process fails.
     */
    static createDirectoryIfNotExists(directory) {
        try {
            fs.mkdirSync(directory, { recursive: true });
        } catch (error) {
            UtilHelper.log(`Error creating directory: ${directory}.`, error);
            throw error;
        }
    }

    /**
     * Format a given file size in bytes to a better human-readable representation.
     * 
     * @param {number} bytes - The file size in bytes.
     * @returns {string} A human-readable file size representation (e.g., 1.12 MB).
     */
    static formatFileSize(bytes) {
        const Settings = require('../settings');

        if (bytes === 0) return "0 B";

        const sizeUnits = Settings.get('fileSizeUnits');
        const i = Math.floor(Math.log(bytes) / Math.log(1024));
        const formattedSize = (bytes / Math.pow(1024, i)).toFixed(2);

        return `${formattedSize} ${sizeUnits[i]}`;
    }

    /**
     * Delete the contents of a given directory.
     * 
     * @param {string} dirPath - The path to the directory to clear.
     */
    static deleteDirectoryContents(dirPath) {
        const files = fs.readdirSync(dirPath);

        files.forEach(file => {
            const filePath = path.join(dirPath, file);
            const stats = fs.statSync(filePath);

            if (stats.isDirectory()) {
                this.deleteDirectoryContents(filePath);
                fs.rmdirSync(filePath);
            } else {
                fs.unlinkSync(filePath);
            }
        });
    }

    /**
     * Check if a given file exists.
     * 
     * @param {string} filePath - The file path to check.
     * @returns {boolean} True if the file exists, false if it does not.
     */
    static exists(filePath) {
        try {   
            fs.accessSync(filePath);
            return true;
        } catch (error) {
            return false;
        }
    }
}

module.exports = FileHelper;