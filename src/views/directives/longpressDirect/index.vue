<template>
    <div class="card content-box">
        <div class="text">长按指令 🍇🍇🍇🍓🍓🍓</div>
        <el-button v-longpress:2000="() => throttleClick({ di: 1 })" type="primary"> 长按指令 (长按2s后执行一次) </el-button>
    </div>
</template>

<script setup lang="ts">
import { ElMessage } from "element-plus";

const throttleClick = params => {
    ElMessage.success("我是长按按钮触发的事件 🍍🍓🍌");
    console.log(params);
};
</script>
