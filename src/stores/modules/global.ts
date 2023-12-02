import { defineStore } from "pinia";
import piniaPersistConfig from "@/stores/helper/persist";
import { GlobalState } from "@/stores/interface";

export const useGlobalStore = defineStore({
    id: "ceer-global",
    // 修改默认值后, 需清除 localStorage 数据
    state: () => ({
        // 布局方式 (纵向: vertical | 经典: classic | 横向: transverse | 分栏: columns)
        layout: "vertical",
        // element 组件大小
        assemblySize: "default",
        // 当前系统语言
        language: null
    }),
    actions: {
        // Set GlobalState
        setGlobalState(...args: ObjToKeyValArray<GlobalState>) {
            this.$patch({ [args[0]]: args[1] });
        }
    },
    persist: piniaPersistConfig("ceer-global")
});
