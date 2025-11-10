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

/**
 * Executed when the document is "ready".
 */
$(document).ready(() => {
    sizeHeaders();
});

/**
 * Makes sure that both the headers for the menu and the body are
 * the same height.
 */
const sizeHeaders = () => {
    const menuHeader = $('#menu-header');
    const bodyHeader = $('#body-header');
    const menuHeaderHeight = menuHeader.outerHeight();
    const bodyHeaderHeight = bodyHeader.outerHeight();

    if (bodyHeaderHeight > menuHeaderHeight) {
        menuHeader.css('height', `${bodyHeaderHeight}px`);
    } else if (menuHeaderHeight > bodyHeaderHeight) {
        bodyHeader.css('height', `${menuHeaderHeight}px`);
    }
};

/**
 * Displays the toggle icon to the user when they hover on the category bar element.
 * 
 * @param {Object} e - The element object instance.
 */
const categoryToggleOnHover = (e) => {
    const $icon = $('#' + $(e).data('icon'));
    $icon.stop(true, true).fadeTo(150, 1);
};

/**
 * Hides the toggle icon to the user when they hover off the category bar element.
 * 
 * @param {Object} e - The element object instance.
 */
const categoryToggleOffHover = (e) => {
    const $icon = $('#' + $(e).data('icon'));
    $icon.stop(true, true).fadeTo(150, 0);
};

/**
 * Handles when a user clicks on a div.
 * 
 * @param {Object} e - The element object instance.
 */
const onDivClick = (e) => {
    const url = $(e).data('url');
    location.href = url;
};