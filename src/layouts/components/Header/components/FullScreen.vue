<template>
    <div class="fullscreen">
        <i
            :class="['iconfont', isFullscreen ? 'icon-suoxiao' : 'icon-fangda']"
            class="toolBar-icon"
            @click="handeleFullScreen"
        ></i>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { ElMessage } from "element-plus";
import screenfull from "screenfull";

const isFullscreen = ref(screenfull.isFullscreen);

onMounted(() => {
    screenfull.on("change", () => {
        if (screenfull.isFullscreen) isFullscreen.value = true;
        else isFullscreen.value = false;
    });
});

const handeleFullScreen = () => {
    if (!screenfull.isEnabled) ElMessage.warning("当前你的浏览器不支持全屏 ❌");
    screenfull.toggle();
};
</script>

<style scoped></style>
