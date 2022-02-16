<!--
 * @Date: 2022-02-16 11:11:43
 * @LastEditors: Truman
 * @LastEditTime: 2022-02-16 16:07:57
 * @FilePath: \epc_vue_ui\src\views\projectPre\customerManagement\components\customer-info.vue
-->
<template>
  <div class="customerInfo">
    <el-row class="customer-span">
      <span
        v-for="(item, index) in customerTypes"
        :key="item"
        @click="customerTypeChange(item, index)"
        :class="{ active: activeCustomerType === index }"
        >{{ item }}
      </span>
    </el-row>

    <el-row :gutter="20" style="width: 100%" class="condition-row">
      <el-col :span="20">
        <!--筛选条件-->
        <table-search-item
          ref="tableSeach"
          :queryParams="queryParams"
          @onSearch="getList"
          :filterOption="filterOptions"
        >
        </table-search-item>
      </el-col>
      <el-col :span="4">
        <div class="right-btn">
          <el-button
            v-hasPermi="['cust:customer:add']"
            @click="add"
            size="small"
            type="primary"
            icon="el-icon-plus"
            >新增</el-button
          >
        </div>
      </el-col>
    </el-row>

    <my-table
      :tableData="projectData"
      :columns="columns"
      :loading="loading"
      :haveApprove="false"
      :pageObj="pageObj"
      style="padding-left:10px"
    >
    </my-table>
  </div>
</template>

<script>
export default {
  name: "CustomerInfo",
  data() {
    return {
      customerTypes: ["全部客户", "已成交客户", "未成交客户"],
      activeCustomerType: 0, //当前选中客户类型
      queryParams: {
        //请求参数
        pageNum: 1,
        pageSize: 10,
      },
      /*筛选*/
      filterOptions: [
        {
          value: "customerName",
          label: "客户名称",
          type: "string",
        },
        {
          value: "contactsName",
          label: "联系人",
          type: "string",
        },
        {
          value: "customerType",
          label: "客户类型",
          type: "select",
        },
        {
          value: "customerRating",
          label: "客户评级",
          type: "select",
        },
        {
          value: "customerNature",
          label: "客户性质",
          type: "select",
        },
      ],
      projectData: [
        {
          id: 0,
          customerCode: "CSR_220209AEFD7",
          customerName: "北京木子半导体有限公司",
          contactsName: "李伟军 18717263378",
          personName: "刘明君",
          customerType: "个体客户",
          createTime: "2020-03-29",
        },
        {
          id: 1,
          customerCode: "CSR_220209AEFD7",
          customerName: "北京木子半导体有限公司",
          contactsName: "李伟军 18717263378",
          personName: "刘明君",
          customerType: "个体客户",
          createTime: "2020-03-29",
        },
        {
          id: 2,
          customerCode: "CSR_220209AEFD7",
          customerName: "北京木子半导体有限公司",
          contactsName: "李伟军 18717263378",
          personName: "刘明君",
          customerType: "个体客户",
          createTime: "2020-03-29",
        },
        {
          id: 3,
          customerCode: "CSR_220209AEFD7",
          customerName: "北京木子半导体有限公司",
          contactsName: "李伟军 18717263378",
          personName: "刘明君",
          customerType: "个体客户",
          createTime: "2020-03-29",
        },
        {
          id: 4,
          customerCode: "CSR_220209AEFD7",
          customerName: "北京木子半导体有限公司",
          contactsName: "李伟军 18717263378",
          personName: "刘明君",
          customerType: "个体客户",
          createTime: "2020-03-29",
        },
        {
          id: 5,
          customerCode: "CSR_220209AEFD7",
          customerName: "北京木子半导体有限公司",
          contactsName: "李伟军 18717263378",
          personName: "刘明君",
          customerType: "个体客户",
          createTime: "2020-03-29",
        },
        {
          id: 6,
          customerCode: "CSR_220209AEFD7",
          customerName: "北京木子半导体有限公司",
          contactsName: "李伟军 18717263378",
          personName: "刘明君",
          customerType: "个体客户",
          createTime: "2020-03-29",
        },
        {
          id: 7,
          customerCode: "CSR_220209AEFD7",
          customerName: "北京木子半导体有限公司",
          contactsName: "李伟军 18717263378",
          personName: "刘明君",
          customerType: "个体客户",
          createTime: "2020-03-29",
        },
        {
          id: 8,
          customerCode: "CSR_220209AEFD7",
          customerName: "北京木子半导体有限公司",
          contactsName: "李伟军 18717263378",
          personName: "刘明君",
          customerType: "个体客户",
          createTime: "2020-03-29",
        },
        {
          id: 9,
          customerCode: "CSR_220209AEFD7",
          customerName: "北京木子半导体有限公司",
          contactsName: "李伟军 18717263378",
          personName: "刘明君",
          customerType: "个体客户",
          createTime: "2020-03-29",
        },
      ], //列表信息
      queryParams: {
        //请求参数
        pageNum: 1,
        pageSize: 10,
      },
      columns: [
        {
          label: "客户编号",
          prop: "customerCode",
        },
        {
          label: "客户名称",
          prop: "customerName",
          color: "#1989FA",
          showShip: true,
        },
        {
          label: "客户联系人",
          prop: "contactsName",
        },
        {
          label: "客户负责人",
          prop: "personName",
        },
        {
          label: "客户类别",
          prop: "customerType",
        },
        {
          label: "客户成交日期",
          prop: "createTime",
        },
        {
          label: "操作",
          btns: [
            {
              label: "查看",
              action: "0",
              color: "#1989FA",
              icon: "el-icon-edit-outline",
              hasPermi: ["cust:customer:edit"],
            },
            {
              label: "编辑",
              action: "2",
              color: "#E25255",
              icon: "el-icon-delete",
              hasPermi: ["cust:customer:remove"],
            },
          ],
          width: "110",
        },
      ],
      pageObj: {
        size: 2,
        total: 1,
        currentPage: 1,
        func: (currentPage) => {
          this.queryParams.pageNum = currentPage;
          this.getList();
        },
        sizeChange: (size) => {
          this.queryParams.pageNum = 1;
          this.queryParams.pageSize = size;
          this.getList();
        },
      },
      loading: false,
      queryParams: {
        //请求参数
        pageNum: 1,
        pageSize: 10,
      },
    };
  },
  created() {},
  mounted() {},
  methods: {
    /**
     * 客户类型改变事件
     */
    customerTypeChange(item, index) {
      this.activeCustomerType = index;
    },
    /**
     * 列表页查询事件
     */
    getList() {},
    /**
     * 新增事件
     */
    add() {},
  },
};
</script>

<style lang="scss" scoped>
.customer-span {
  margin: 10px;

  span {
    font-size: 20px;
    color: #847c96;
    margin: 0 8px;
    transition: color 1s linear;
  }
}

.active {
  font-weight: bold;
  color: #000 !important;
  text-decoration: underline;
}
.condition-row {
  margin-left: 10px !important;
}

.right-btn {
  height: 66px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
}
.right-btn button {
  width: 96px;
  height: 46px;
  border-radius: 8px;
  font-size: 18px;
  font-family: Microsoft YaHei;
  font-weight: bold;
}
</style>
