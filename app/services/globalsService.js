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

const PermissionsService = require('./permissionsService');
const FeatureList = require('../lists/featureList');
const UtilHelper = require('../helpers/utilHelper');
const Settings = require('../settings');
const WidgetHelper = require('../helpers/widgetHelper');
const LocaleHelper = require('../helpers/localeHelper');
const DateTimeHelper = require('../helpers/dateTimeHelper');
const { version } = require('../../package.json');

/**
 * Handles all variables we want to access globally.
 */
class GlobalsService {
    static _instance = null;

    /**
     * Create a new instance of GlobalsService.
     */
    constructor() {
        this._globals = {};
    }

    /**
     * Get the singleton instance of GlobalsService.
     * 
     * @returns {GlobalsService} The singleton instance of GlobalsService.
     */
    static getInstance() {
        if (!GlobalsService._instance) {
            GlobalsService._instance = new GlobalsService();
        }

        return GlobalsService._instance;
    }

    /**
     * Get all the global data.
     * 
     * @param {Object} req - The request object from Express.
     * @returns {Object} The globals object instance.
     */
    async get(req) {
        const member = req._member;
        const settings = req._settings;

        this._globals.baseUrl = process.env.BASE_URL;
        this._globals.themeCssUrl = member.configs.themeCssUrl;
        this._globals.imagesetUrl = member.configs.imagesetUrl;
        this._globals.locale = req._locale;
        this._globals.settings = Settings.getAllObjects();
        this._globals.member = member;
        this._globals.breadcrumbs = UtilHelper.getBreadcrumbs();
        this._globals.widgets = WidgetHelper.getWidgets(req);

        this._globals.featurePermissions = PermissionsService.getFeaturePermissions([
            FeatureList.MEMBERS_LIST,
            FeatureList.SEARCH,
            FeatureList.HELP,
            FeatureList.WHOS_ONLINE,
            FeatureList.TAGS,
            FeatureList.GROUPS,
            FeatureList.ACTIVITY_REGISTER
        ]);

        this._globals.featureList = FeatureList;

        this._globals.urls = {
            forums: UtilHelper.buildUrl(),
            members: UtilHelper.buildUrl(['members', 'list']),
            whosOnline: UtilHelper.buildUrl(['whosonline']),
            search: UtilHelper.buildUrl(['search']),
            help: UtilHelper.buildUrl(['help']),
            signIn: UtilHelper.buildUrl(['auth']),
            createAccount: UtilHelper.buildUrl(['createaccount']),
            manageCookies: UtilHelper.buildUrl(['manage', 'cookies']),
            tags: UtilHelper.buildUrl(['tags']),
            groups: UtilHelper.buildUrl(['groups']),
            activityRegister: UtilHelper.buildUrl(['activityregister']),
        };

        this._globals.allTimes = LocaleHelper.replaceAll('globals', 'allTimes', {
            timeZone: member.dateTime.timeZone,
            gmt: DateTimeHelper.getGmtOffset(),
        });

        this._globals.poweredBy = LocaleHelper.replaceAll('globals', 'poweredBy', {
            link: UtilHelper.buildLink('Echoverse', {
                url: 'https://www.echoversebbs.com',
                target: '_blank',
                emphasize: true,
            }),
            version,
        });

        this._globals.privacyPolicy = {
            display: settings.displayPrivacyPolicyLink,
            url: settings.privacyPolicyUrl._value,
        };

        this._globals.contactUs = {
            display: settings.displayContactUsLink,
            url: settings.contactUsUrl._value,
        };

        return this._globals;
    }
}

module.exports = GlobalsService.getInstance();