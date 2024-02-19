<template>
    <div class="dataScreen-container">
        <div class="dataScreen-content" ref="dataScreenRef">
            <h1 style="color: #fff">侧耳倾听</h1>
        </div>
    </div>
</template>

<script setup lang="ts" name="dataScreen">
import { ref, onMounted, onBeforeUnmount } from "vue";
import dayjs from "dayjs";

const dataScreenRef = ref<HTMLElement | null>(null);

onMounted(() => {
    if (dataScreenRef.value) {
        dataScreenRef.value.style.transform = `scale(${getScale()}) translate(-50%, -50%)`;
        dataScreenRef.value.style.width = "1920px";
        dataScreenRef.value.style.height = "1080px";
    }
    window.addEventListener("resize", resize);
});

const resize = () => {
    if (dataScreenRef.value) {
        dataScreenRef.value.style.transform = `scale(${getScale()}) translate(-50%, -50%)`;
    }
};

const getScale = (width = 1920, height = 1080) => {
    let ww = window.innerWidth / width;
    let wh = window.innerHeight / height;
    return ww < wh ? ww : wh;
};

// 获取当前时间
let timer: NodeJS.Timer | null = null;
let time = ref<string>(dayjs().format("YYYY年MM月DD HH:mm:ss"));
timer = setInterval(() => {
    time.value = dayjs().format("YYYY年MM月DD HH:mm:ss");
}, 1000);
onBeforeUnmount(() => {
    window.removeEventListener("resize", resize);
    clearInterval(timer);
});
</script>

<style scoped lang="scss">
@import "./index.scss";
</style>
