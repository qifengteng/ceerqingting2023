import router from "@/routers";
import { defineStore } from "pinia";
import { TabsState, TabsMenuProps } from "@/stores/interface";
import { useKeepAliveStore } from "@/stores/modules/keepAlive";
import { getUriWithParams } from "@/utils";
import piniaPersistConfig from "@/stores/helper/persist";

const keepAliveStore = useKeepAliveStore();

export const useTabsStore = defineStore({
    id: "ceer-tabs",
    state: (): TabsState => ({
        tabsMenuList: []
    }),
    actions: {
        // Add tabs
        addTabs(tabItem: TabsMenuProps) {
            if (this.tabsMenuList.every(item => item.path !== tabItem.path)) {
                this.tabsMenuList.push(tabItem);
            }
            if (!keepAliveStore.keepAliveName.includes(tabItem.name) && tabItem.isKeepAlive) {
                keepAliveStore.addKeepAliveName(tabItem.name);
            }
        },
        // Remove Tabs
        async removeTabs(tabPath: string, isCurrent: boolean = true) {
            if (isCurrent) {
                this.tabsMenuList.forEach((item, index) => {
                    if (item.path !== tabPath) return;
                    console.log("!!!!");
                    const nextTab = this.tabsMenuList[index + 1] || this.tabsMenuList[index - 1];
                    if (!nextTab) return;
                    router.push(nextTab.path);
                });
            }
            // remove keepalve
            const tabItem = this.tabsMenuList.find(item => item.path == tabPath);
            tabItem?.isKeepAlive && keepAliveStore.removeKeepAliveName(tabItem.name);
            // set tabs
            this.tabsMenuList = this.tabsMenuList.filter(item => item.path !== tabPath);
        },
        // Close Tabs On Side
        async closeTabsOnSide(path: string, type: "left" | "right") {
            const currentIndex = this.tabsMenuList.findIndex(item => item.path == path);
            if (currentIndex !== -1) {
                const range = type === "left" ? [0, currentIndex] : [currentIndex + 1, this.tabsMenuList.length];
                this.tabsMenuList = this.tabsMenuList.filter((item, index) => {
                    return index < range[0] || index >= range[1] || !item.close;
                });
            }
            // set keepAlive
            const KeepAliveList = this.tabsMenuList.filter(item => item.isKeepAlive);
            keepAliveStore.setKeepAliveName(KeepAliveList.map(item => item.name));
        },
        // Close MultipleTab
        closeMultipleTab(tabsMenuValue?: string) {
            this.tabsMenuList = this.tabsMenuList.filter(item => {
                return item.path === tabsMenuValue || !item.close;
            });
            // set keepalive
            const KeepAiveList = this.tabsMenuList.filter(item => item.isKeepAlive);
            keepAliveStore.setKeepAliveName(KeepAiveList.map(item => item.name));
        },
        // Set Tabs
        async setTabs(tabsMenuList: TabsMenuProps[]) {
            this.tabsMenuList = tabsMenuList;
        },
        // Set Tabs Title
        async setTabsTitle(title: string) {
            this.tabsMenuList.forEach(item => {
                if (item.path == getUriWithParams()) item.title = title;
            });
        }
    },
    persist: piniaPersistConfig("ceer-tabs")
});
