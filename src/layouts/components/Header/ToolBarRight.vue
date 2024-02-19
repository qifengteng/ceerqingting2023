<template>
    <div class="tool-bar-ri">
        <div class="header-icon">
            <AssemblySize />
            <Language id="language" />
            <SearchMenu />
            <ThemeSetting id="themeSetting" />
            <Message id="message" />
            <FullScreen id="fullscreen" />
        </div>
        <span class="username">{{ username }}</span>
        <Avatar />
    </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { useUserStore } from "@/stores/modules/user";
import AssemblySize from "./components/AssemblySize.vue";
import Language from "./components/Language.vue";
import SearchMenu from "./components/SearchMenu.vue";
import ThemeSetting from "./components/ThemeSetting.vue";
import Message from "./components/Message.vue";
import FullScreen from "./components/FullScreen.vue";
import Avatar from "./components/Avatar.vue";

const userStore = useUserStore();
const username = computed(() => userStore.userInfo.name);
</script>

<style scoped lang="scss">
.tool-bar-ri {
    display: flex;
    align-items: center;
    justify-content: center;
    padding-right: 25px;
    .header-icon {
        display: flex;
        align-items: center;
        & > * {
            margin-left: 21px;
            color: var(--el-header-text-color);
        }
    }
    .username {
        margin: 0 20px;
        font-size: 15px;
        color: var(--el-header-text-color);
    }
}
</style>
