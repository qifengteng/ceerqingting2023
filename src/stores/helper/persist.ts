import { PersistedStateOptions } from "pinia-plugin-persistedstate";

/**
 * @description pinia 持久化参数配置
 * @param { string } key 存储持久化的name
 * @param { Array } paths 需要持久化的 state name
 * @returns persist
 */

const piniaPersistConfig = (key: string, paths?: string[]) => {
    const persist: PersistedStateOptions = {
        key,
        storage: localStorage, // sessionStorage
        paths
    };
    return persist;
};

export default piniaPersistConfig;
