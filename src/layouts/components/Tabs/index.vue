<template>
    <div class="tabs-box">
        <div class="tabs-menu">
            <el-tabs v-model="tabsMenuValue" type="card" @tab-click="tabClick" @tab-remove="tabRemove">
                <el-tab-pane
                    v-for="item in tabsMenuList"
                    :key="item.path"
                    :label="item.title"
                    :name="item.path"
                    :closable="item.close"
                >
                    <template #label>
                        <el-icon v-show="item.icon && tabsIcon" class="tabs-icon">
                            <component :is="item.icon"></component>
                        </el-icon>
                        {{ item.title }}
                    </template>
                </el-tab-pane>
            </el-tabs>
            <MoreButton />
        </div>
    </div>
</template>

<script setup lang="ts">
import Sortable from "sortablejs";
import { ref, computed, onMounted, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useGlobalStore } from "@/stores/modules/global";
import { useTabsStore } from "@/stores/modules/tabs";
import { useAuthStore } from "@/stores/modules/auth";
import { TabsPaneContext, TabPaneName } from "element-plus";
import MoreButton from "./components/MoreButton.vue";

const route = useRoute();
const router = useRouter();
const tabsStore = useTabsStore();
const authStore = useAuthStore();
const globalStore = useGlobalStore();

const tabsMenuValue = ref(route.fullPath);
const tabsMenuList = computed(() => tabsStore.tabsMenuList);
const tabsIcon = computed(() => globalStore.tabsIcon);

onMounted(() => {
    tabsDrop();
    initTabs();
});

// 监听路由变化 ( 防止浏览器后退/前进 不变化 tabsMenuValue )
watch(
    () => route.fullPath,
    () => {
        if (route.meta.isFull) return;
        tabsMenuValue.value = route.fullPath;
        const tabsParams = {
            icon: route.meta.icon,
            title: route.meta.title,
            path: route.fullPath,
            name: route.name,
            close: !route.meta.isAffix,
            isKeepAlive: route.meta.isKeepAlive
        };
        tabsStore.addTabs(tabsParams);
    },
    { immediate: true }
);

// 初始化需要固定的 Tabs, 通常首页需要固定
const initTabs = () => {
    authStore.flatMenuListGet.forEach(item => {
        if (item.meta.isAffix && !item.meta.isHide && !item.meta.isFull) {
            const tabsParams = {
                icon: item.meta.icon,
                title: item.meta.title,
                path: item.path,
                name: item.name,
                close: !item.meta.isAffix,
                isKeepAlive: item.meta.isKeepAlive
            };
            tabsStore.addTabs(tabsParams);
        }
    });
};

// Tab Click
const tabClick = (tabItem: TabsPaneContext) => {
    const fullPath = tabItem.props.name as string;
    router.push(fullPath);
};

// Tab remove
const tabRemove = (fullPath: TabPaneName) => {
    tabsStore.removeTabs(fullPath as string, fullPath == route.fullPath);
};

// tabs 拖拽排序
const tabsDrop = () => {
    Sortable.create(document.querySelector(".el-tabs__nav") as HTMLElement, {
        draggable: ".el-tabs__item",
        animation: 300,
        onEnd({ newIndex, oldIndex }) {
            const tabsList = [...tabsStore.tabsMenuList];
            const currRow = tabsList.splice(oldIndex, 1)[0];
            tabsList.splice(newIndex, 0, currRow);
            tabsStore.setTabs(tabsList);
        }
    });
};
</script>

<style scoped lang="scss">
@import "./index.scss";
</style>
