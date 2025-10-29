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

const { DateTime } = require('luxon');
const moment = require('moment-timezone');
const LocaleHelper = require('./localeHelper');
const UnsupportedError = require('../errors/unsupportedError');
const InvalidError = require('../errors/invalidError');
const Settings = require('../settings');

/**
 * Helpers for managing dates and times.
 */
class DateTimeHelper {
    /**
     * Convert a given javascript Date object to its epoch representation.
     * 
     * @param {Date} date - The javascript Date object to convert to epoch value.
     * @returns {number} The epoch representation of the Date object. 
     */
    static dateToEpoch(date) {
        return date.getTime();
    }

    /**
     * Convert a given epoch value to a javascript Date object.
     * 
     * @param {number} epoch - The epoch value to convert to a javascript Date object.
     * @returns {Date} The javascript Date object from the epoch value.
     */
    static epochToDate(epoch) {
        return new Date(epoch);
    }

    /**
     * Get the GMT offset for the current theme.
     * 
     * @returns {string} The GMT offset string.
     */
    static getGmtOffset() {
        const MemberService = require('../services/memberService');
        const member = MemberService._member;
        const dateTime = member.dateTime;
        const now = DateTime.now().setZone(dateTime.timeZone);
        const offset = now.offset / 60;
        return `${offset}:00`;
    }

    /**
     * Converts a time difference in seconds to a 'time ago' format.
     * 
     * @param {number} diffInSeconds - The time difference in seconds.
     * @returns {string} A human-readable 'time ago' format.
     */
    static getTimeAgo(diffInSeconds) {
        const intervals = [
            { singularLabel: LocaleHelper.get('dateTimeHelper', 'yearAgo'), label: LocaleHelper.get('dateTimeHelper', 'yearsAgo'), seconds: 31536000 },
            { singularLabel: LocaleHelper.get('dateTimeHelper', 'monthAgo'), label: LocaleHelper.get('dateTimeHelper', 'monthsAgo'), seconds: 2592000 },
            { singularLabel: LocaleHelper.get('dateTimeHelper', 'weekAgo'), label: LocaleHelper.get('dateTimeHelper', 'weeksAgo'), seconds: 604800 },
            { singularLabel: LocaleHelper.get('dateTimeHelper', 'dayAgo'), label: LocaleHelper.get('dateTimeHelper', 'daysAgo'), seconds: 86400 },
            { singularLabel: LocaleHelper.get('dateTimeHelper', 'hourAgo'), label: LocaleHelper.get('dateTimeHelper', 'hoursAgo'), seconds: 3600 },
            { singularLabel: LocaleHelper.get('dateTimeHelper', 'minuteAgo'), label: LocaleHelper.get('dateTimeHelper', 'minutesAgo'), seconds: 60 },
        ];

        for (const interval of intervals) {
            const count = Math.floor(diffInSeconds / interval.seconds);

            if (count >= 1) {
                return count > 1
                    ? interval.label.replace('${total}', count)
                    : interval.singularLabel.replace('${total}', count);
            }
        }

        return LocaleHelper.get('dateTimeHelper', 'justNow');
    }

    /**
     * Format a timestamp to a formatted date string.
     * 
     * @param {Date|number|string} timestamp - The timestamp to format.
     * @param {Object} [options={}] - Options for formatting the date.
     * @param {boolean} [options.timeOnly=false] - True to return only the time, false not to (default is false).
     * @param {boolean} [options.dateOnly=false] - True to return only the date, false not to (default is false).
     * @param {boolean} [options.timeAgo=false] - True to return a 'human-readable' format if within a specified duration.
     * @returns {string} The resulting formatted date string. 
     */
    static dateFormatter(timestamp, options = {}) {
        const {
            timeOnly = false,
            dateOnly = false,
            timeAgo = false,
        } = options;

        const MemberService = require('../services/memberService');
        const member = MemberService.member;
        const dateTime = member.dateTime;
        let inputDate;

        if (timestamp instanceof Date) {
            inputDate = DateTime.fromJSDate(timestamp);
        } else if (typeof timestamp === 'number') {
            inputDate = timestamp > 9999999999
                ? DateTime.fromMillis(timestamp)
                : DateTime.fromSeconds(timestamp);
        } else if (typeof timestamp === 'string') {
            inputDate = DateTime.fromISO(timestamp);
        } else {
            throw new UnsupportedError(`Unsupported timestamp type: ${typeof timestamp}.`, { timestamp });
        }

        if (!inputDate.isValid) {
            throw new InvalidError('Invalid timestamp provided.');
        }

        const now = DateTime.local();
        const diffInSeconds = now.diff(inputDate, 'seconds').seconds;
        const timeAgoDurationInSeconds = Settings.get('timeAgoDurationInDays') * 24 * 60 * 60;

        if (timeAgo && dateTime.timeAgo && diffInSeconds < timeAgoDurationInSeconds) {
            return this.getTimeAgo(diffInSeconds);
        }

        if (timeOnly) {
            return inputDate.setZone(dateTime.timeZone).toFormat(dateTime.timeFormat);
        }

        if (dateOnly) {
            return inputDate.setZone(dateTime.timeZone).toFormat(dateTime.dateFormat);
        }

        return inputDate.setZone(dateTime.timeZone).toFormat(dateTime.dateTimeFormat);
    }
}

module.exports = DateTimeHelper;