<template>
  <div class="base-tab" id="base-tab">
    <el-tabs type="border-card"  v-model="activeName">
      <el-tab-pane label="系统角色模版设置" name="first">
        <RoleTemplate></RoleTemplate>
      </el-tab-pane>
      <el-tab-pane label="项目角色模版设置" name="second">
        <ProjectRoleTemplate></ProjectRoleTemplate>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
  import RoleTemplate from "./roleTemplateIndex"
  import ProjectRoleTemplate from "./projectRoleTemplateIndex"

  export default {
    name: 'BaseInfo',
    data() {
      return {
        activeName: 'first',
      }
    },
    components: {
      RoleTemplate,
      ProjectRoleTemplate
    },
  }
</script>

<style lang="scss" scope>
.base-tab{
  padding: 0 20px 0 20px;
  margin: 20px;
  background-color: #fff;
  padding-bottom: 0px;
}
</style>
