<!--
 * @Description: 
 * @Version: 1.0
 * @Author: truman
 * @Date: 2022-02-15 19:12:36
 * @LastEditors: Truman
 * @LastEditTime: 2022-02-17 15:27:27
-->
<template>
  <el-container class="page">
    <!-- 左侧滚动条 -->
    <el-aside class="_aside" width="70px" :style="{height:dynamicHeight}">
      <aside-bar />
    </el-aside>


     <!-- 右侧TAB选项卡 -->
    <el-main ref="main">
      <el-tabs v-model="activeName">
        <!-- <el-tab-pane label="客户统计" name="first">用户管理</el-tab-pane> -->
        <el-tab-pane label="客户信息" name="customerInfo">
          <customer-info />
        </el-tab-pane>
      </el-tabs>
    </el-main>
  </el-container>


</template>

<script>
// 子组件
import AsideBar from "./components/asideBar.vue";
import CustomerInfo from "./components/customer-info.vue";


export default {
  name: "customerManagement",
  components: { AsideBar, CustomerInfo },
  data() {
    return {
      activeName: "customerInfo", // tab 默认展示客户信息
      dynamicHeight:'300px',
      option:{}
    };
  },
  created(){
    this.$nextTick(() => {
      console.log(this.$refs.main.$el.offsetHeight);
      this.dynamicHeight = 400 + 'px';
    })
  }
};
</script>

<style lang="scss" scoped>
.page {
  margin: 20px;
  // background-color: #fff;
}
::v-deep .el-tabs__item {
  color: #666;
  font-size: 20px;
  font-weight: bold;
  padding: 0 0.25rem !important;
  border-radius: 19px;
  background-color: #fff;
  margin-left: 20px;
}
::v-deep .is-active {
  color: #fff;
  background-color: #1989f9;
  border-radius: 19px;
}

::v-deep .el-tabs__active-bar {
  position: static;
  background-color: transparent;
}
::v-deep .el-tabs__nav-wrap::after {
  content: none;
}

::v-deep .el-tabs__header {
  padding: 10px 0px;
  background-color: #f5f6fb;
}

._aside {
  border-right: 1px solid #e9eaf2;
  border-left: 1px solid #757f92;
  margin-top: 80px;
  overflow: hidden;
  background-color: #fff;
  overflow-y: auto;
  scrollbar-width: none;
  -ms-overflow-style: none;
  &::-webkit-scrollbar {
    width: 2px !important;
  }

  &::-webkit-scrollbar-thumb {
    border-radius: 3px;
    height: 20px; /* 滚动条滑块长度 */
    background-color: #ccc;
  }
}
</style>
