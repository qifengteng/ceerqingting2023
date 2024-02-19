<template>
    <div class="card content-box">
        <span class="text"> 防抖指令 🍇🍇🍇🍓🍓🍓 </span>
        <el-button type="primary" v-debounce:1000="() => debounceClick({ str: '参数' })"> 防抖按钮 (0.5s 后执行) </el-button>
    </div>
</template>

<script setup lang="ts">
import { ElMessage } from "element-plus";

const debounceClick = (params: { [key: string]: any }) => {
    console.log(params);
    ElMessage.success("我是防抖按钮触发的事件 🍍🍓🍌");
};
</script>

<style scoped lang="scss">
@import "./index.scss";
</style>
