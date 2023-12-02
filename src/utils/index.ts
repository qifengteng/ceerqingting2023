/**
 * @description 获取浏览器默认语言
 * @returns {String}
 */
export function getBrowserLang() {
    let browserlang = navigator.language ? navigator.language : navigator.browserLanguage;

    let defaultBrowserLang = "";
    if (["cn", "zh", "zh-cn"].includes(browserlang)) {
        defaultBrowserLang = "zh";
    } else {
        defaultBrowserLang = "en";
    }
    return defaultBrowserLang;
}
