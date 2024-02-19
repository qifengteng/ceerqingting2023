<template>
    <div class="tool-bar-if">
        <CollapseIcon id="collapseIcon"></CollapseIcon>
        <Breadcrumb v-show="globalStore.breadcrumb" id="breadcrumb"></Breadcrumb>
    </div>
</template>

<script setup lang="ts">
import { useGlobalStore } from "@/stores/modules/global";
import CollapseIcon from "@/layouts/components/Header/components/CollapseIcon.vue";
import Breadcrumb from "@/layouts/components/Header/components/Breadcrumb.vue";
const globalStore = useGlobalStore();
</script>

<style scoped lang="scss">
.tool-bar-if {
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    white-space: nowrap;
}
</style>
