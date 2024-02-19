<template>
    <div class="card content-box">
        <div class="text">节流指令 🍇🍇🍇🍓🍓🍓</div>
        <el-button v-throttle:2000="() => throttleClick({ di: 1 })" type="primary"> 节流按钮 (每隔1s后执行一次) </el-button>
    </div>
</template>

<script setup lang="ts">
import { ElMessage } from "element-plus";

const throttleClick = params => {
    ElMessage.success("我是节流按钮触发的事件 🍍🍓🍌");
    console.log(params);
};
</script>
