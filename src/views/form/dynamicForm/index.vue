<template>
    <div class="card content-box">
        <el-button class="add" type="primary" plain @click="addDomain"> Add Input </el-button>
        <el-form :model="formData" ref="formRef" label-width="100px" class="demo-dynamic">
            <el-form-item
                prop="email"
                label="Email"
                :rules="[
                    {
                        required: true,
                        message: 'Please input email address',
                        trigger: 'blur'
                    },
                    {
                        type: 'email',
                        message: 'Please input correct email address',
                        trigger: ['blur', 'change']
                    }
                ]"
            >
                <el-input v-model="formData.email"></el-input>
            </el-form-item>
            <el-form-item
                v-for="(item, index) in formData.domains"
                :key="item.key"
                :label="'domain' + index"
                :prop="'domains.' + index + '.value'"
                :rules="{
                    required: true,
                    message: 'domain can not be null',
                    trigger: 'blur'
                }"
            >
                <el-input v-model="item.value">
                    <template #append>
                        <el-button type="danger" plain class="mt-2" @click.prevent="removeDomain(item)"> Delete </el-button>
                    </template>
                </el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm(formRef)"> Submit </el-button>
                <el-button @click="resetForm(formRef)"> Reset </el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script setup lang="ts">
import { ref, reactive } from "vue";
import type { FormInstance } from "element-plus";

const formRef = ref<FormInstance>();

interface IdomainItem {
    key: number;
    value: string;
}
const formData = reactive<{
    domains: IdomainItem[];
    email: string;
}>({
    domains: [
        {
            key: 1,
            value: ""
        }
    ],
    email: ""
});

const addDomain = () => {
    formData.domains.push({
        key: Date.now(),
        value: ""
    });
};

const removeDomain = domain => {
    const index = formData.domains.indexOf(domain);
    if (index >= 0) formData.domains.splice(index, 1);
};
const submitForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return;
    formEl.validate(valid => {
        if (valid) {
            console.log("submit!");
        } else {
            console.log("error submit!");
            return false;
        }
    });
};

const resetForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return;
    formEl.resetFields();
};
</script>

<style scoped lang="scss">
@import "./index.scss";
</style>
