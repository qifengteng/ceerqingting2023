const mode = import.meta.env.VITE_ROUTER_MODE;

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

/**
 * @description 使用递归扁平化菜单，方便添加动态路由
 * @param {Array} menuList 菜单列表
 * @returns {Array}
 */
export function getFlatMenuList(menuList: Menu.MenuOptions[]): Menu.MenuOptions[] {
    let newMenuList: Menu.MenuOptions[] = JSON.parse(JSON.stringify(menuList));
    return newMenuList.flatMap(item => [item, ...(item.children ? getFlatMenuList(item.children) : [])]);
}

/**
 * @description 使用递归过滤出需要渲染在左侧菜单的列表 (需要剔除 isHide == true 的菜单)
 * @param {Array} menuList 菜单列表
 * @param {Array}
 */
export function getShowMenuList(menuList: Menu.MenuOptions[]) {
    let newMenuList: Menu.MenuOptions[] = JSON.parse(JSON.stringify(menuList));
    return newMenuList.filter(item => {
        item.children?.length && (item.children = getShowMenuList(item.children));
        return !item.meta?.isHide;
    });
}

/**
 * @description 使用递归找出所有面包屑存储到 pinia/vuex 中
 * @param {Array} menuList 菜单列表
 * @param {Array} parent 父级菜单
 * @param result 处理后的结果
 * @returns {Object}
 */
export function getAllBreadcrumbList(menuList: Menu.MenuOptions[], parent = [], result: { [key: string]: any } = {}) {
    for (const item of menuList) {
        result[item.path] = [...parent, item];
        if (item.children) getAllBreadcrumbList(item.children, result[item.path], result);
    }
    return result;
}
/**
 * @description 获取不同路由模式所对应的 url + params
 * @returns {String}
 */
export function getUriWithParams() {
    const url = {
        hash: location.hash.substring(1),
        history: location.pathname + location.search
    };
    return url[mode];
}

/**
 * @description 获取当前时间对应的提示语
 * @returns {String}
 */
export function getTimeState() {
    let timeNow = new Date();
    let hours = timeNow.getHours();
    if (hours >= 6 && hours < 10) return `早上好 ⛅`;
    if (hours >= 10 && hours < 14) return `中午好 🌞`;
    if (hours >= 14 && hours <= 18) return `下午好 🌞`;
    if (hours >= 18 && hours <= 24) return `晚上好 🌛`;
    if (hours >= 0 && hours < 6) return `凌晨好 🌛`;
}

/**
 * @description 处理 prop, 当 prop 为多级嵌套时. ==> 返回最后一级 prop
 * @param { String }prop 当前的prop
 * @returns { String }
 */
export function handleProp(prop: string) {
    const propArr = prop.split(".");
    if (propArr.length === 1) return prop;
    return propArr[propArr.length - 1];
}
