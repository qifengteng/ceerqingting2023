<template>
    <el-dropdown>
        <div class="avatar">
            <img src="@/assets/images/avatar.gif" alt="avatar" />
        </div>
        <template #dropdown>
            <el-dropdown-menu>
                <el-dropdown-item @click="openDialog('infoRef')">
                    <el-icon><User /></el-icon> {{ $t("header.personalData") }}
                </el-dropdown-item>
                <el-dropdown-item @click="openDialog('passwordRef')">
                    <el-icon><User /></el-icon> {{ $t("header.changePassword") }}
                </el-dropdown-item>
                <el-dropdown-item divided @click="logout">
                    <el-icon><User /></el-icon> {{ $t("header.logout") }}
                </el-dropdown-item>
            </el-dropdown-menu>
        </template>
    </el-dropdown>
    <!-- infoDialog -->
    <InfoDoalog ref="infoRef" />
    <!-- PasswordDoalog -->
    <PasswordDoalog ref="passwordRef" />
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { LOGIN_URL } from "@/config";
import { logoutApi } from "@/api/modules/login";
import { ElMessageBox, ElMessage } from "element-plus";
import { useUserStore } from "@/stores/modules/user";
import InfoDoalog from "./InfoDoalog.vue";
import PasswordDoalog from "./PasswordDoalog.vue";

const router = useRouter();
const userStore = useUserStore();
// 退出登录
const logout = () => {
    ElMessageBox.confirm("您是否确认退出登录", "温馨提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
    }).then(async () => {
        // 1,执行退出登录接口
        await logoutApi();
        // 2.清除 Token
        userStore.setToken("");

        // 3.重定向到登录页
        router.replace(LOGIN_URL);
        ElMessage.success("退出登录成功! ");
    });
};

const infoRef = ref<InstanceType<typeof InfoDoalog> | null>(null);
const passwordRef = ref<InstanceType<typeof PasswordDoalog> | null>(null);
// 打开修改密码和个人信息弹窗
const openDialog = (ref: string) => {
    if (ref === "infoRef") infoRef.value?.openDialog();
    if (ref === "passwordRef") passwordRef.value?.openDialog();
};
</script>

<style scoped lang="scss">
.avatar {
    width: 40px;
    height: 40px;
    overflow: hidden;
    cursor: pointer;
    border-radius: 50%;
    &:focus-visible {
        outline: none;
    }
    img {
        width: 100%;
        height: 100%;
    }
}
</style>
