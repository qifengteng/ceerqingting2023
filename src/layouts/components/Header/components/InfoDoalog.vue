<template>
    <el-dialog v-model="dialogVisible" title="个人信息" width="500px" draggable>
        <span>This is userInfo</span>
        <template #footer>
            <span>
                <el-button @click="dialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
            </span>
        </template>
    </el-dialog>
</template>

<script setup lang="ts">
import { ref } from "vue";

const dialogVisible = ref(false);
const openDialog = () => (dialogVisible.value = true);

defineExpose({ openDialog });
</script>

<style scoped></style>
