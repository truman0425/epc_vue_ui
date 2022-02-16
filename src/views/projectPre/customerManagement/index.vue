<!--
 * @Description: 
 * @Version: 1.0
 * @Author: truman
 * @Date: 2022-02-15 19:12:36
 * @LastEditors: Truman
 * @LastEditTime: 2022-02-16 16:28:44
-->
<template>
  <div class="page">
    <el-row style="height:565px">
      <!-- 左侧侧边栏 -->
      <el-col style="width:70px;overflow:hidden;">
          <aside-bar/>
      </el-col>

      <!-- 右侧页面主体 -->
      <el-col class="right-panel">
        <el-tabs v-model="activeName">
          <el-tab-pane label="客户统计" name="first">用户管理</el-tab-pane>
          <el-tab-pane label="客户信息" name="second">
            <customer-info/>
          </el-tab-pane>
        </el-tabs>
      </el-col>
    </el-row>
  </div>
</template>

<script>
// 子组件
import AsideBar from "./components/asideBar.vue";
import CustomerInfo from "./components/customer-info.vue";

export default {
  name: "customerManagement",
  components:{AsideBar,CustomerInfo},
  data() {
    return {
      activeName: "second",
    };
  },
};
</script>

<style lang="scss" scoped>
.page {
  margin: 20px;
  background-color: #fff;
}
::v-deep .el-tabs__item {
  color: #666;
  font-size: 20px;
  font-weight: bold;
  padding: 0 0.25rem !important;
  border-radius: 19px;
  background-color:#fff;
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

::v-deep .el-tabs__header{
  padding: 10px 0px;
  background-color: #f5f6fb;
}
</style>
