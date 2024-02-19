<template>
    <!-- 查新表单 -->
    <searchForm
        v-show="isShowSearch"
        :columns="searchColumns"
        :search="_search"
        :reset="_reset"
        :search-param="searchParam"
        :search-col="searchCol"
    ></searchForm>
    <div>
        <el-table ref="tableRef"></el-table>
    </div>
</template>

<script setup lang="ts" name="ProTable">
import { computed, reactive, ref, unref, provide } from "vue";
import { useTable } from "@/hooks/useTable";
import { ColumnProps } from "./interface";
import { BreakPoint } from "@/components/Grid/interface";
import { ElTable } from "element-plus";
import { handleProp } from "@/utils";
import SearchForm from "../SearchForm/index.vue";

export interface ProTableProps {
    columns: ColumnProps[]; // 列配置项  ==> 必传
    data?: any[]; // 静态 table data 数据，若存在则不会使用 requestApi 返回的 data ==> 非必传
    requestApi?: (params: any) => Promise<any>; // 请求表格数据的 api ==> 非必传
    requestAuto?: boolean; // 是否自动执行请求 api ==> 非必传（默认为true）
    requestError?: (params: any) => void; // 表格 api 请求错误监听 ==> 非必传
    dataCallback?: (data: any) => any; // 返回数据的回调函数，可以对数据进行处理 ==> 非必传
    title?: string; // 表格标题 ==> 非必传
    pagination?: boolean; // 是否需要分页组件 ==> 非必传（默认为true）
    initParam?: any; // 初始化请求参数 ==> 非必传（默认为{}）
    border?: boolean; // 是否带有纵向边框 ==> 非必传（默认为true）
    toolButton?: ("refresh" | "setting" | "search")[] | boolean; // 是否显示表格功能按钮 ==> 非必传（默认为true）
    rowKey?: string; // 行数据的 Key，用来优化 Table 的渲染，当表格数据多选时，所指定的 id ==> 非必传（默认为 id）
    searchCol?: number | Record<BreakPoint, number>; // 表格搜索项 每列占比配置 ==> 非必传 { xs: 1, sm: 2, md: 2, lg: 3, xl: 4 }
}
// 接收父组件参数, 配置默认值
const props = withDefaults(defineProps<ProTableProps>(), {
    columns: () => [],
    requestAuto: true,
    pagination: true,
    initParam: {},
    border: true,
    toolButton: true,
    rowKey: "id",
    searchCol: () => ({ xs: 1, sm: 2, md: 2, lg: 3, xl: 4 })
});

// table 示例
const tableRef = ref<InstanceType<typeof ElTable>>();

// column 列类型
// const columnTypes: TypeProps[] = ["selection", "radio", "index", "expand", "sort"];

// 是否显示搜索模块
const isShowSearch = ref(true);

// 表格操作 Hooks
const {
    // tableData,
    // pageable,
    searchParam,
    searchInitParam,
    // getTableList,
    search,
    reset
    // handleSizeChange,
    // handleCurrentChange
} = useTable(props.requestApi, props.initParam, props.pagination, props.dataCallback, props.requestError);

// 接收 columns 并设置为响应式
const tableColumns = reactive(props.columns);

// 扁平化columns
const flatColumns = computed(() => flatColumnsFunc(tableColumns));

// 扁平化 colums 的方法
const flatColumnsFunc = (columns: ColumnProps[], flatArr: ColumnProps[] = []) => {
    columns.forEach(async col => {
        if (col._children?.length) flatArr.push(...flatColumnsFunc(col._children));
        flatArr.push(col);

        // column 添加默认 isShow && isFIlterEnum 属性值
        col.isShow = col.isShow ?? true;
        col.isFilterEnum = col.isFilterEnum ?? true;

        // 设置enumMap
        await setEnumMap(col);
    });
    return flatArr.filter(item => !item._children?.length);
};

// 定义 enumMap 存储enum值, (避免异步请求无法格式化单元格内容 || 无法填充搜索下拉选择)
const enumMap = ref(new Map<string, { [key: string]: any }[]>());
const setEnumMap = async ({ prop, enum: enumValue }: ColumnProps) => {
    if (!enumValue) return;

    // 如果当前enumMap 存在相同的值 return
    if (enumMap.value.has(prop!) && (typeof enumValue === "function" || enumMap.value.get(prop!) === enumValue)) return;

    // 当前enum为静态数据, 则直接存储到 enumMap
    if (typeof enumValue !== "function") return enumMap.value.set(prop!, unref(enumValue));

    // 当前enum为后台数据需要请求数据, 则调用该请求接口, 并存储到 enumMap
    const { data } = await enumValue();
    enumMap.value.set(prop!, data);
};

// 注入 enumMap
provide("enumMap", enumMap);
// 过滤需要搜索的配置项 && 排序
const searchColumns = computed(() => {
    return flatColumns.value
        ?.filter(item => item.search?.el || item.search?.render)
        .sort((a, b) => a.search!.order! - b.search!.order!);
});
// 设置 搜索表单默认排序 && 搜索表单项的默认值
searchColumns.value?.forEach((column, index) => {
    column.search!.order = column.search?.order ?? index + 2;
    const key = column.search?.key ?? handleProp(column.prop!);
    const defaultValue = column.search?.defaultValue;
    if (defaultValue !== undefined && defaultValue !== null) {
        searchInitParam.value[key] = defaultValue;
        searchParam.value[key] = defaultValue;
    }
});

// 定义 emit 事件
const emit = defineEmits<{
    search: [];
    reset: [];
    dargSort: [{ newIndex?: number; oldIndex?: number }];
}>();

const _search = () => {
    search();
    emit("search");
};

const _reset = () => {
    reset();
    emit("reset");
};

// 暴露给父组件的参数和方法 (外部需要什么，都可以从这里暴露出去)
defineExpose({
    search,
    reset
});
</script>

<style scoped></style>
