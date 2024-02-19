<template>
    <el-dropdown trigger="click" :teleported="false">
        <div class="more-button">
            <i :class="'iconfont icon-xiala'"></i>
        </div>
        <template #dropdown>
            <el-dropdown-menu>
                <el-dropdown-item @click="refresh">
                    <el-icon><Refresh /></el-icon> {{ $t("tabs.refresh") }}
                </el-dropdown-item>
                <el-dropdown-item @click="maximize">
                    <el-icon><FullScreen /></el-icon> {{ $t("tabs.maximize") }}
                </el-dropdown-item>
                <el-dropdown-item @click="closeCurrentTab">
                    <el-icon><Remove /></el-icon> {{ $t("tabs.closeCurrent") }}
                </el-dropdown-item>
                <el-dropdown-item @click="tabsStore.closeTabsOnSide(route.fullPath, 'left')">
                    <el-icon><DArrowRight /></el-icon> {{ $t("tabs.closeLeft") }}
                </el-dropdown-item>
                <el-dropdown-item @click="tabsStore.closeTabsOnSide(route.fullPath, 'right')">
                    <el-icon><CircleClose /></el-icon> {{ $t("tabs.closeRight") }}
                </el-dropdown-item>
                <el-dropdown-item divided @click="tabsStore.closeMultipleTab(route.fullPath)">
                    <el-icon><CircleClose /></el-icon>{{ $t("tabs.closeOther") }}
                </el-dropdown-item>
                <el-dropdown-item @click="closeAllTab">
                    <el-icon><FolderDelete /></el-icon> {{ $t("tabs.closeAll") }}
                </el-dropdown-item>
            </el-dropdown-menu>
        </template>
    </el-dropdown>
</template>

<script setup lang="ts">
import { inject, nextTick } from "vue";
import { HOME_URL } from "@/config";
import { useRoute, useRouter } from "vue-router";
import { useTabsStore } from "@/stores/modules/tabs";
import { useGlobalStore } from "@/stores/modules/global";
import { useKeepAliveStore } from "@/stores/modules/keepAlive";

const route = useRoute();
const router = useRouter();
const tabsStore = useTabsStore();
const globalStore = useGlobalStore();
const keepAliveStore = useKeepAliveStore();

const refreshCurrentPage: Function = inject("refresh");
const refresh = () => {
    setTimeout(() => {
        keepAliveStore.removeKeepAliveName(route.name as string);
        refreshCurrentPage(false);
        nextTick(() => {
            keepAliveStore.addKeepAliveName(route.name as string);
            refreshCurrentPage(true);
        });
    }, 0);
};

// maximize current page
const maximize = () => globalStore.setGlobalState("maximize", true);

// close current page
const closeCurrentTab = () => {
    if (route.meta.isAffix) return;
    tabsStore.removeTabs(route.fullPath);
};

// Close ALL
const closeAllTab = () => {
    tabsStore.closeMultipleTab();
    router.push(HOME_URL);
};
</script>

<style scoped lang="scss">
@import "../index.scss";
</style>
