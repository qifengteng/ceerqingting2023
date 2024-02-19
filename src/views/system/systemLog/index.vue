<template>
    <div class="card content-box">
        <h4 class="text">
            flex左对齐 (固定4列, 不固定宽固定间隔, 使用flex-basic设置基本宽实现, 缺点:分辨率变化, 元素宽度会变)
            <span style="color: green">缺点宽度不固定</span>
        </h4>
        <div class="flex-content">
            <div class="flex-item card" v-for="item in count" :key="item"></div>
        </div>
        <h4 class="text">
            flex左对齐 (固定宽, 固定列, 根据个数动态设置margin) <span style="color: red">使用动态margin, 不实用</span>
        </h4>
        <div class="flex-fixed-column">
            <div class="flex-item card" v-for="item in count" :key="item"></div>
        </div>
        <h4 class="text">flex左对齐 (固定宽, 不固定间隔不固定列)<span style="color: green">使用增加高度为0的新增项</span></h4>
        <div class="flex-div">
            <div class="flex-item card" v-for="item in count" :key="item"></div>
            <div style="width: 300px; height: 0" v-for="n in 10" :key="n"></div>
        </div>
        <h4 class="text">flex左对齐 (固定宽, 不固定间隔不固定列, 使用伪元素)<span style="color: red">使用伪元素</span></h4>
        <div class="flex-after">
            <div class="flex-item card" v-for="item in count" :key="item"></div>
        </div>
        <h4 class="text">
            flex左对齐 (固定宽, 不固定间隔不固定列, 使用伪元素)<span style="color: green">放弃flex布局使用grid布局</span>
        </h4>
        <div class="grid">
            <div class="flex-item card" v-for="item in count" :key="item"></div>
        </div>
    </div>
</template>

<script setup lang="ts" name="systemLog">
const count = 6;
</script>

<style scoped lang="scss">
.flex-content {
    width: 100%;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 20px;
    .flex-item {
        flex: 0 0 calc((100% - 60px) / 4); // 60px 是所有间隔的宽度和, 计算每个元素的基准宽度
        height: 200px;
    }
}

.flex-fixed-column {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    .flex-item {
        width: 24%;
        height: 200px;
        margin-bottom: 20px;
        margin-right: 10px;
        // &:last-child:nth-child(4n - 1) {
        //     margin-right: calc(24% * 1 + 1% * 1);
        // }
        // &:last-child:nth-child(4n - 2) {
        //     margin-right: calc(24% * 2 + 1% * 2);
        // }
        &:not(:nth-child(4n)) {
            margin-right: calc(4% / 3);
        }
    }
}

.flex-div {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 20px;
    .flex-item {
        width: 300px;
        height: 200px;
        margin-right: 10px;
    }
}

.flex-after {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    flex-wrap: wrap;
    // gap: 20px;
    .flex-item {
        width: 300px;
        height: 200px;
        margin-right: 10px;
    }
    &::after {
        content: "";
        flex: auto;
    }
}

.grid {
    width: 100%;
    display: grid;
    justify-content: space-between;
    align-self: start;
    grid-template-columns: repeat(auto-fill, 310px);
    gap: 20px;
    .flex-item {
        width: 300px;
        height: 200px;
        margin-right: 10px;
    }
}
</style>
