<template>
    <div class="table-box">
        <proTable
            ref="proTableRef"
            :columns="columns"
            :request-api="getTableList"
            :init-param="initParam"
            :data-callback="dataCallback"
            @darg-sort="sortTable"
        ></proTable>
    </div>
</template>

<script setup lang="tsx">
import { reactive, ref } from "vue";
import { User } from "@/api/interface";
import { ElMessage } from "element-plus";
import { ColumnProps, ProTableInstance, HeaderRenderScope } from "@/components/ProTable/interface";
import { getUserGender, getUserStatus, changeUserStatus, getUserList } from "@/api/modules/user";
import { useAuthButtons } from "@/hooks/useAuthButtons";
import { useHandleData } from "@/hooks/useHandleData";
import proTable from "@/components/ProTable/index.vue";

// ProTable 实例
const proTableRef = ref<ProTableInstance>();

// 页面按钮权限 (按钮权限既可以使用 hooks, 也可以直接使用v-auth 指令, 指令适合直接绑定在按钮上, hooks 适合根据按钮权限显示不同内容)
const { BUTTONS } = useAuthButtons();

// 切换用户状态
const changeStatus = async (row: User.ResUserList) => {
    await useHandleData(changeUserStatus, { id: row.id, status: row.status == 1 ? 0 : 1 }, `切换【${row.username}】用户状态`);
    proTable.value.getTableList();
};

// 自定义渲染表头 (使用tsx语法)
const headerRender = (scope: HeaderRenderScope<User.ResUserList>) => {
    return (
        <el-button type="primary" onClick={() => ElMessage.success("我是通过 tsx 语法渲染的表头")}>
            {scope.column.label}
        </el-button>
    );
};
// 表格配置项
const columns = reactive<ColumnProps<User.ResUserList>[]>([
    { type: "selection", fixed: "left", width: 70 },
    { type: "sort", label: "Sort", width: 80 },
    { type: "expand", label: "Expand", width: 85 },
    {
        prop: "username",
        label: "用户姓名",
        search: { el: "input", tooltip: "我是搜索提示" },
        render: scope => {
            return (
                <el-button type="primary" link onClick={() => ElMessage.success("我是通过 tsx 语法渲染的内容")}>
                    {scope.row.username}
                </el-button>
            );
        }
    },
    {
        prop: "gender",
        label: "性别",
        // 字典数据（本地数据）
        // enum: genderType,
        // 字典请求不带参数
        enum: getUserGender,
        // 字典请求携带参数
        // enum: () => getUserGender({ id: 1 }),
        search: { el: "select", props: { filterable: true } },
        fieldNames: { label: "genderLabel", value: "genderValue" }
    },
    {
        // 多级 prop
        prop: "user.detail.age",
        label: "年龄",
        search: {
            // 自定义 search 显示内容
            render: ({ searchParam }) => {
                return (
                    <div class="flx-center">
                        <el-input vModel_trim={searchParam.minAge} placeholder="最小年龄" />
                        <span class="mr10 ml10">-</span>
                        <el-input vModel_trim={searchParam.maxAge} placeholder="最大年龄" />
                    </div>
                );
            }
        }
    },
    { prop: "idCard", label: "身份证号", search: { el: "input" } },
    { prop: "email", label: "邮箱" },
    { prop: "address", label: "居住地址" },
    {
        prop: "status",
        label: "用户状态",
        enum: getUserStatus,
        search: { el: "tree-select", props: { filterable: true } },
        fieldNames: { label: "userLabel", value: "userStatus" },
        render: scope => {
            return (
                <>
                    {BUTTONS.value.status ? (
                        <el-switch
                            model-value={scope.row.status}
                            active-text={scope.row.status ? "启用" : "禁用"}
                            active-value={1}
                            inactive-value={0}
                            onClick={() => changeStatus(scope.row)}
                        />
                    ) : (
                        <el-tag type={scope.row.status ? "success" : "danger"}>{scope.row.status ? "启用" : "禁用"}</el-tag>
                    )}
                </>
            );
        }
    },
    {
        prop: "createTime",
        label: "创建时间",
        headerRender,
        width: 180,
        search: {
            el: "date-picker",
            span: 2,
            props: { type: "datetimerange", valueFormat: "YYYY-MM-DD HH:mm:ss" },
            defaultValue: ["2022-11-12 11:35:00", "2022-12-12 11:35:00"]
        }
    },
    { prop: "operation", label: "操作", fixed: "right", width: 330 }
]);

// 表格拖拽排序
const sortTable = ({ newIndex, oldIndex }: { newIndex?: number; oldIndex?: number }) => {
    console.log(newIndex, oldIndex);
    console.log(proTable.value?.tableData);
    ElMessage.success("修改列表排序成功");
};

// 如果表格需要初始化请求参数，直接定义传给 ProTable (之后每次请求都会自动带上该参数，此参数更改之后也会一直带上，改变此参数会自动刷新表格数据)
const initParam = reactive({ type: 1 });

// dataCallback 是对于返回的表格数据做处理，如果你后台返回的数据不是 list && total && pageNum && pageSize 这些字段，可以在这里进行处理成这些字段
// 或者直接去 hooks/useTable.ts 文件中把字段改为你后端对应的就行
const dataCallback = (data: any) => {
    return {
        list: data.list,
        total: data.total,
        pageNum: data.pageNum,
        pageSize: data.pageSize
    };
};

// 如果你想在请求之前对当前请求参数做一些操作，可以自定义如下函数：params 为当前所有的请求参数（包括分页），最后返回请求列表接口
// 默认不做操作就直接在 ProTable 组件上绑定	:requestApi="getUserList"
const getTableList = (params: any) => {
    let newParams = JSON.parse(JSON.stringify(params));
    newParams.createTime && (newParams.startTime = newParams.createTime[0]);
    newParams.createTime && (newParams.endTime = newParams.createTime[1]);
    delete newParams.createTime;
    return getUserList(newParams);
};
</script>

<style scoped></style>
