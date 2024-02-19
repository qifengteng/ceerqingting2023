<template>
    <el-form ref="loginFormRef" :model="loginForm" :rules="loginRules" size="large">
        <el-form-item prop="username">
            <el-input v-model="loginForm.username" placeholder="用户名：admin / user">
                <template #prefix>
                    <el-icon class="el-input__icon">
                        <user />
                    </el-icon>
                </template>
            </el-input>
        </el-form-item>
        <el-form-item prop="password">
            <el-input
                v-model="loginForm.password"
                type="password"
                placeholder="密码：123456"
                show-password
                autocomplete="new-password"
            >
                <template #prefix>
                    <el-icon class="el-input__icon">
                        <lock />
                    </el-icon>
                </template>
            </el-input>
        </el-form-item>
    </el-form>
    <div class="login-btn">
        <el-button :icon="CircleClose" round size="large" @click="resetForm(loginFormRef)"> 重置 </el-button>
        <el-button :icon="UserFilled" round size="large" type="primary" :loading="loading" @click="login(loginFormRef)">
            登录
        </el-button>
    </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from "vue";
import { HOME_URL } from "@/config";
import { useRouter } from "vue-router";
import { getTimeState } from "@/utils";
import { Login } from "@/api/interface";
import { loginApi } from "@/api/modules/login";
import { useUserStore } from "@/stores/modules/user";
import { useTabsStore } from "@/stores/modules/tabs";
import { useKeepAliveStore } from "@/stores/modules/keepAlive";
import { initDynamicRouter } from "@/routers/modules/dynamicRouter";
import { CircleClose, UserFilled } from "@element-plus/icons-vue";
import { FormInstance, FormRules, ElNotification } from "element-plus";
import md5 from "md5";

const router = useRouter();
const userStore = useUserStore();
const tabsStore = useTabsStore();
const keepAliveStore = useKeepAliveStore();

const loading = ref(false);
const loginFormRef = ref<FormInstance>();
const loginForm = reactive<Login.ReqLoginForm>({
    username: "",
    password: ""
});
const loginRules = reactive<FormRules<Login.ReqLoginForm>>({
    username: [{ required: true, message: "请输入用户名", trigger: "blur" }],
    password: [{ required: true, message: "请输入密码", trigger: "blur" }]
});

// login
const login = (formEl: FormInstance | undefined) => {
    if (!formEl) return;
    formEl.validate(async valid => {
        if (!valid) return;
        loading.value = true;
        try {
            // 1.执行登录接口
            const { data } = await loginApi({ ...loginForm, password: md5(loginForm.password) });
            userStore.setToken(data.access_token);

            // 添加动态路由
            await initDynamicRouter();

            // 3.清空 tabs, keepAlive 数据
            tabsStore.setTabs([]);
            keepAliveStore.setKeepAliveName([]);

            // 4.跳转首页
            router.push(HOME_URL);
            ElNotification({
                title: getTimeState(),
                type: "success",
                message: "欢迎登录 侧耳倾听",
                duration: 3000
            });
        } finally {
            loading.value = false;
        }
    });
};

// reset
const resetForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return;
    formEl.resetFields();
};

onMounted(() => {
    // 监听 enter 事件（调用登录）
    document.onkeydown = (e: KeyboardEvent) => {
        e = (window.event as KeyboardEvent) || e;
        if (e.code === "Enter" || e.code === "enter" || e.code === "NumpadEnter") {
            if (loading.value) return;
            login(loginFormRef.value);
        }
    };
});
</script>

<style scoped>
@import "../index.scss";
</style>
