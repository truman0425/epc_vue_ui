<template>
  <div id="templateDiv">
  <div class="app-box">
  <div class="app-container app-container-post" style=" width: calc(100% - 40px);height: calc(100% - 40px);" id="mainContentViewId">

    <div class="page-header mb8">
      <div class="header-left"><span class="post-title">职务管理</span></div>
      <div class="header-right">
        <el-button
          type="primary"
          icon="el-icon-plus"
          size="mini"
          @click="handleAdd"
          v-hasPermi="['system:post:add']"
        >新增</el-button>
        <el-button
          type="success"
          icon="el-icon-edit"
          size="mini"
          :disabled="single"
          @click="handleUpdate"
          v-hasPermi="['system:post:edit']"
        >修改</el-button>
        <el-button
          type="danger"
          icon="el-icon-delete"
          size="mini"
          :disabled="multiple"
          @click="handleDelete"
          v-hasPermi="['system:post:remove']"
        >删除</el-button>
        <el-button
          type="warning"
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['system:post:export']"
        >导出</el-button>
      </div>
    </div>

    <el-row id="filterHeightViewId">
      <el-col :span="24">
    <el-form :model="queryParams" ref="queryForm" :inline="true" label-width="68px" @submit.native.prevent>
      <el-form-item prop="searchValue">
        <el-input
          v-model="queryParams.searchValue"
          placeholder="职务编码、名称"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        /><!--职务编码、-->
      </el-form-item>
      <el-form-item label="状态" prop="status">
        <el-select v-model="queryParams.status" placeholder="" clearable size="small">
          <el-option
            v-for="dict in statusOptions"
            :key="dict.dictValue"
            :label="dict.dictLabel"
            :value="dict.dictValue"
          />
        </el-select>
      </el-form-item>
      <!--<el-form-item label="职务编码" prop="postCode">
        <el-input
          v-model="queryParams.postCode"
          placeholder="请输入职务编码"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="职务名称" prop="postName">
        <el-input
          v-model="queryParams.postName"
          placeholder="请输入职务名称"
          clearable
          size="small"
          @keyup.enter.native="handleQuery"
        />
      </el-form-item>
      <el-form-item label="状态" prop="status">
        <el-select v-model="queryParams.status" placeholder="职务状态" clearable size="small">
          <el-option
            v-for="dict in statusOptions"
            :key="dict.dictValue"
            :label="dict.dictLabel"
            :value="dict.dictValue"
          />
        </el-select>
      </el-form-item>-->
      <el-form-item>
        <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery" style="height:30px;">查询</el-button>
        <el-button icon="el-icon-refresh" size="mini" @click="resetQuery" style="height:32px;">重置</el-button>
      </el-form-item>
    </el-form>
      </el-col>
    </el-row>

    <el-row>
      <el-col :span="24">
        <div style="padding-left: 20px;padding-right: 20px;">
    <el-table v-loading="loading" :data="postList" @selection-change="handleSelectionChange"
              :header-cell-style="{'height':'40px'}"
              :row-style="{'height':'40px'}"
              :height="belowHeight"
              :fit='true'
              stripe
              style="width: 100%;height:360px;">
      <el-table-column type="selection" width="55"/>
      <el-table-column
        type="index"
        label="序号"
        width="55">
        <template scope="scope">
          <span>{{(queryParams.pageNum - 1) * queryParams.pageSize + scope.$index + 1}}</span>
        </template>
      </el-table-column>
      <!-- <el-table-column label="职务编号" align="center" prop="postId" /> -->
      <el-table-column label="职务编码" prop="postCode" />
      <el-table-column label="职务名称" prop="postName" />
      <el-table-column label="职务排序" prop="postSort" />
      <el-table-column label="状态" prop="status" :formatter="statusFormat" />
      <el-table-column label="创建时间" prop="createTime" width="180">
        <template slot-scope="scope">
          <span>{{ parseTime(scope.row.createTime) }}</span>
        </template>
      </el-table-column>
      <!--<el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button
            size="mini"
            type="text"
            icon="el-icon-edit"
            @click="handleUpdate(scope.row)"
            v-hasPermi="['system:post:edit']"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            v-hasPermi="['system:post:remove']"
          >删除</el-button>
        </template>
      </el-table-column>-->
    </el-table>
    <div style="position: relative;float: right;margin-top: 0px; height: 40px;display: flex;align-items: center;">
    <pagination
      v-show="total>0"
      :total="total"
      :page.sync="queryParams.pageNum"
      :limit.sync="queryParams.pageSize"
      @pagination="getList"
    />
    </div>
     </div>
      </el-col>
    </el-row>
    <!-- 添加或修改职务对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="职务名称" prop="postName">
          <el-input v-model="form.postName" placeholder="请输入职务名称" />
        </el-form-item>
        <el-form-item label="职务编码" prop="postCode">
          <el-input v-model="form.postCode" placeholder="请输入编码名称" />
        </el-form-item>
        <el-form-item label="职务顺序" prop="postSort">
          <el-input-number v-model="form.postSort" controls-position="right" :min="0" />
        </el-form-item>
        <el-form-item label="职务状态" prop="status">
          <el-radio-group v-model="form.status">
            <el-radio
              v-for="dict in statusOptions"
              :key="dict.dictValue"
              :label="dict.dictValue"
            >{{dict.dictLabel}}</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="备注" prop="remark">
          <el-input v-model="form.remark" type="textarea" placeholder="请输入内容" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>

  </div>
  </div>
  </div>
</template>

<script>
import { listPost, getPost, delPost, addPost, updatePost, exportPost } from "@/api/system/post";

export default {
  name: "Post",
  data() {
    return {
      // 遮罩层
      loading: true,
      // 选中数组
      ids: [],
      // 非单个禁用
      single: true,
      // 非多个禁用
      multiple: true,
      // 总条数
      total: 0,
      // 职务表格数据
      postList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 状态数据字典
      statusOptions: [],
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        postCode: undefined,
        postName: undefined,
        status: undefined,
        orderByColumn: 'postSort',
        isAsc : 'asc'
      },
      // 表单参数
      form: {},
      // 表单校验
      rules: {
        postName: [
          { required: true, message: "职务名称不能为空", trigger: "blur" }
        ],
        postCode: [
          { required: true, message: "职务编码不能为空", trigger: "blur" }
        ],
        postSort: [
          { required: true, message: "职务顺序不能为空", trigger: "blur" }
        ]
      },
      belowHeight: '400',
      mainHeight:0.0,
      filterHeight:0.0,
      filterShowState:false

    };
  },
  mounted() {

    var that = this;
    var mainHeight=0.0;

    var elementResizeDetectorMaker = require("element-resize-detector");
    // 创建实例
    var erd = elementResizeDetectorMaker();
    //监听id为test的元素 大小变化
    erd.listenTo(document.getElementById('filterHeightViewId'), function(element) {

      //  预算科目列表
      var width = element.offsetWidth;
      that.filterHeight = element.offsetHeight;
      var abc = that.mainHeight - that.filterHeight - 120;
      that.$nextTick(function() {
        that.belowHeight = abc;
      })

    })
    var erd1 = elementResizeDetectorMaker();
    //监听id为test的元素 大小变化
    erd1.listenTo(document.getElementById('mainContentViewId'), function(element){
      //  预算科目列表
      that.mainHeight = element.offsetHeight;
      var abc = that.mainHeight - 115 - that.filterHeight;
      that.$nextTick(function() {
        that.belowHeight = abc;
      })


    })

  },
  created() {
    this.getList();
    this.getDicts("sys_normal_disable").then(response => {
      this.statusOptions = response.data;
    });
  },
  methods: {
    /** 查询职务列表 */
    getList() {
      this.loading = true;
      listPost(this.queryParams).then(response => {
        this.postList = response.rows;
        this.total = response.total;
        this.loading = false;
      });
    },
    // 职务状态字典翻译
    statusFormat(row, column) {
      return this.selectDictLabel(this.statusOptions, row.status);
    },
    // 取消按钮
    cancel() {
      this.open = false;
      this.reset();
    },
    // 表单重置
    reset() {
      this.form = {
        postId: undefined,
        postCode: undefined,
        postName: undefined,
        postSort: 0,
        status: "0",
        remark: undefined
      };
      this.resetForm("form");
    },
    /** 搜索按钮操作 */
    handleQuery() {
      this.queryParams.pageNum = 1;
      this.getList();
    },
    /** 重置按钮操作 */
    resetQuery() {
      this.resetForm("queryForm");
      this.handleQuery();
    },
    // 多选框选中数据
    handleSelectionChange(selection) {
      this.ids = selection.map(item => item.postId)
      this.single = selection.length!=1
      this.multiple = !selection.length
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset();
      this.open = true;
      this.title = "添加职务";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const postId = row.postId || this.ids
      getPost(postId).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "修改职务";
      });
    },
    /** 提交按钮 */
    submitForm: function() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.postId != undefined) {
            updatePost(this.form).then(response => {
              if (response.code === 200) {
                this.msgSuccess("修改成功");
                this.open = false;
                this.getList();
              }
            });
          } else {
            addPost(this.form).then(response => {
              if (response.code === 200) {
                this.msgSuccess("新增成功");
                this.open = false;
                this.getList();
              }
            });
          }
        }
      });
    },
    /** 删除按钮操作 */
    handleDelete(row) {
      const postIds = row.postId || this.ids;
      this.$confirm('是否确认删除职务编号为"' + postIds + '"的数据项?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(function() {
          return delPost(postIds);
        }).then(() => {
          this.getList();
          this.msgSuccess("删除成功");
        }).catch(function() {});
    },
    /** 导出按钮操作 */
    handleExport() {
      const queryParams = this.queryParams;
      this.$confirm('是否确认导出所有职务数据项?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(function() {
          return exportPost(queryParams);
        }).then(response => {
          this.download(response.msg);
        }).catch(function() {});
    }
  }
};
</script>
<style scoped lang="scss">
  @import "../../../publicStyle/style.css";
  .post-title {
    font-size: 20px;
    color: #555555;
  }
  /deep/ ::-webkit-scrollbar {
    width: 0 !important;
  }
  /deep/ ::-webkit-scrollbar {
    width: 0 !important;height: 0;
  }
</style>
<style>
  .app-container-post .page-header{
    height: 46px;
    line-height: 42px;
    border-bottom: 1px solid #eee;
  }
  .app-container-post .header-left,.header-right{
    display: inline-block;
  }
  .app-container-post .header-left span{
    padding-left: 10px;
  }
  .app-container-post .header-right{
    float: right;
  }
  .el-checkbox__inner{
    border:1px solid #ccc;
  }
  .pagination-container{
    position: relative;
    height: 50px;
    margin-bottom: 0px;
    margin-top: 0px;
    padding: 10px 20px !important;
  }
  #templateDiv .app-box {
    position: absolute;
    width: 100%;
    height: 100%;
  }
</style>

