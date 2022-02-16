<template>
  <el-popover
    placement="bottom"
    width="300"
    trigger="click">
    <template>
      <el-row>
        <el-col :span="24"  class="tree-left">
          <div style="position: fixed;position: fixed;z-index: 9999; background: white;width: 280px">
            <span>{{ setTitle }}</span>
            <div class="serach-top">
              <el-input
                v-model="deptSearch"
                size="small"
                prefix-icon="el-icon-search"
                clearable
                placeholder="请输入部门名称"/>
              <el-button class="search-btn" type="primary">搜索</el-button>
            </div>
          </div>

          <div class="head-container">
            <el-tree
              :data="switchCompanyOptions"
              class="filter-tree filter-tree-right"
              node-key="id"
              default-expand-all
              :expand-on-click-node="false"
              :filter-node-method="filterNode"
              @node-click="handleNodeClick"
              ref="tree">
              <div class="custom-tree-node" slot-scope="{ node, data }" style="width: calc(100% - 14px);">
                <div :title="node.label" style="width:100%;height: 30px;line-height: 30px;white-space: nowrap;cursor:pointer;overflow: hidden;text-overflow: ellipsis;">
                  <i style="color: #48A8F1;" class="el-icon-office-building"></i>
                  <!-- <i style="color: #48A8F1;" class="el-icon-folder"></i> -->
                  {{ node.label }}
                </div>
              </div>
            </el-tree>
          </div>
        </el-col>
      </el-row>
    </template>
    <slot slot="reference" name="referenceSlot"></slot>
  </el-popover>
</template>
<script>


export default {
  name: "publiceSelectDept",
  props:{
    setTitle: {
      type: String,
      default: undefined
    },
    switchCompanyOptions: {
      type: Array,
      default: []
    }
  },
  data() {
    return {
      deptSearch: ''
    }
  },
  watch: {
    // 根据名称筛选部门树
    deptSearch(val) {
      this.$refs.tree.filter(val);
    },
  },
  created() {
    console.log("switchCompanyOptions===>", this.switchCompanyOptions);
  },
  methods: {
    // 筛选节点
    filterNode(value, data) {
      if (!value) return true;
      return data.label.indexOf(value) !== -1;
    },
    handleNodeClick(data, e) {
      this.$emit('onSelectCompanyCallback', data);
    }
  }
}
</script>

<style lang="scss" scoped>

.dialog-content {
  margin-top: 15px;
  .table-people {
    margin: 10px 0px;
  }
}

.btn-foot {
  display: flex;
  flex-flow: row-reverse;
}
/deep/ .el-transfer-panel__body {
  height: 500px;
}
/deep/ .el-transfer-panel__list.is-filterable {
  height: 100%;
  padding-top: 0;
  padding-bottom: 10px;
  overflow-y: auto;
  height: 400px !important;
}
/deep/ .el-input{
  width: 80%;
}
.head-container{
  margin-top: 80px;

}

.singleCls{
  /deep/ .el-transfer__buttons{
    visibility: hidden;
  }
  /deep/ .el-transfer-panel .el-checkbox__inner {
    height: 14px;
    width: 14px;
    border-radius: 14px;
  }
  /deep/ .is-indeterminate{
    visibility: hidden;
  }
  /deep/ .el-transfer-panel__header{

  }
  /deep/ .el-transfer-panel{
    width: 250px;
  }
  /deep/ .el-transfer-panel__list{
    overflow-y: auto;
    height: 400px !important;
  }
}
.tree-left{
  height: 500px;
  overflow-y: auto;
  scrollbar-width: none;
  >div>span{
    font-size: 18px;
    color: #333333;
    font-weight: bold;
  }
  .serach-top{
    display: flex;
    align-items: center;
    margin-top: 10px;

    .search-btn{
      margin-left: 10px;
    }
  }
}
::-webkit-scrollbar {
  display: none; /* Chrome Safari */
}

</style>
