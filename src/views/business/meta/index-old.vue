<template>
  <div id="templateDiv">
  <div class="app-box">
  <div class="app-container app-container-post" style=" width: calc(100% - 40px);height: calc(100% - 40px);" id="mainContentViewId">

    <div class="page-header mb8">
      <div class="header-left"><span class="post-title">元数据配置</span></div>
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
        <!--<el-button
          type="warning"
          icon="el-icon-download"
          size="mini"
          @click="handleExport"
          v-hasPermi="['system:post:export']"
        >导出</el-button>-->
      </div>
    </div>

    <el-row id="filterHeightViewId">
      <el-col :span="24">
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <div style="padding-left: 20px;padding-right: 20px;">
    <el-table v-loading="loading" :data="metaList" @selection-change="handleSelectionChange"
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
      <el-table-column label="字段名称" prop="name" />
      <el-table-column label="元数据对象" prop="businessTypeName" />
      <el-table-column label="数据格式" prop="businessType" />
      <el-table-column label="默认值" prop="defaultValue" />
      <el-table-column label="是否必填" prop="required" :formatter="requiredFormat" />
      <el-table-column label="是否可用" prop="enable" :formatter="enableFormat" />
      <el-table-column label="备注" prop="remark"/>
      <el-table-column label="操作" align="center" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button size="mini"
                     type="text"
                     icon="el-icon-edit"
                     @click="handleUpdate(scope.row)"
                     v-hasPermi="['system:menu:edit']"
          >修改</el-button>
          <el-button
            size="mini"
            type="text"
            icon="el-icon-delete"
            @click="handleDelete(scope.row)"
            style="color:#e64242;"
            v-hasPermi="['system:menu:remove']"
          >删除</el-button>
        </template>
      </el-table-column>
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
    <!-- 添加或修改元数据对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="600px" append-to-body>
      <el-form ref="form" :model="form.xItem" :rules="rules" label-width="120px">
        <el-form-item label="字段名称" prop="name">
          <el-input v-model="form.xItem.name" placeholder="请输入元数据名称" />
        </el-form-item>
        <el-form-item label="数据格式">
          <el-select class="tableBody12" v-model="form.xItem.dataType" clearable  style="overflow:auto;float:left;width:100%;height:36px;" :disabled="form.isUsed==1">
            <el-option
              v-for="dict in dataTypeOptions"
              :key="dict.dictValue"
              :label="dict.dictLabel"
              :value="dict.dictValue"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="关联业务">
          <el-select class="tableBody12" v-model="form.xItem.businessType" clearable  style="overflow:auto;float:left;width:100%;height:36px;" :disabled="form.isUsed==1">
            <el-option
              v-for="dict in orgbusinessOptions"
              :key="dict.dictValue"
              :label="dict.dictLabel"
              :value="dict.dictValue"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="默认值">
          <el-input v-model="form.xItem.defaultValue" placeholder="请输入默认值" />
        </el-form-item>
        <el-form-item label="备注">
          <el-input type="textarea" v-model="form.xItem.remark" size="80" placeholder="请输入80字内备注"></el-input>
        </el-form-item>
        <el-form-item label="描述">
          <el-input type="textarea" v-model="form.xItem.description" size="80" placeholder="请输入80字内描述"></el-input>
        </el-form-item>

          <el-col :span="8">
            <el-form-item label="是否必填" prop="remark">
          <el-switch
            v-model="form.xItem.required"
            active-color="#13ce66"
            inactive-color="#ff4949"
            active-value="1"
            inactive-value="0">
          </el-switch>
        </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="是否可用" prop="remark">
          <el-switch
            v-model="form.xItem.enable"
            active-color="#13ce66"
            inactive-color="#ff4949"
            active-value="1"
            inactive-value="0">
          </el-switch>
        </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="是否隐藏" prop="remark">
          <el-switch
            v-model="form.xItem.hidden"
            active-color="#13ce66"
            inactive-color="#ff4949"
            active-value="1"
            inactive-value="0">
          </el-switch>
        </el-form-item>
          </el-col>
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
import {getxItemlist,getAddInfo,getxItemtype,getxItemtypeById,queryaddepcproject,queryeditepcproject,savexItemData,addxItem,editxItem,delxItem,getInfoById} from "@/api/system/meta";
import { listPost, getPost, delPost, addPost, updatePost, exportPost } from "@/api/system/post";


export default {
  components: {},
  name: "meta",
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
      // 元数据表格数据
      metaList: [],
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
      },
      // 表单参数
      form: {
        xItem:{},
        isUsed:undefined,
      },
      // 表单校验
      rules: {
        name: [
          { required: true, message: "元数据名称不能为空", trigger: "blur" }
        ],
      },
      belowHeight: '400',
      mainHeight:0.0,
      filterHeight:0.0,
      filterShowState:false,

      //可用
      enableOptions:[],
      //必填
      requiredOptions:[],
      //数据格式
      dataTypeOptions:[],
      //关联业务
      orgbusinessOptions:[],
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
    erd1.listenTo(document.getElementById('mainContentViewId'), function(element){
      // 列表
      that.mainHeight = element.offsetHeight;
      var abc = that.mainHeight - 115 - that.filterHeight;
      that.$nextTick(function() {
        that.belowHeight = abc;
      })


    })

  },
  created() {
    this.getList();
    this.getDicts("meta_enable").then(response => {
      this.enableOptions = response.data;
    });
    this.getDicts("meta_required").then(response => {
      this.requiredOptions = response.data;
    });

    //数据格式
    //关联业务
    this.getBaseData();
  },
  methods: {
    /** 查询元数据列表 */
    getList() {
      this.loading = true;
      getxItemlist(this.queryParams).then(response => {
        this.metaList = response.rows;
        this.total = response.total;
        this.loading = false;
      });
    },
    getBaseData() {
      getAddInfo().then(response => {
        let mydata = response.data;
        let arr1 = [];
        let arr2 = [];
        let mydata1 = mydata.XItenEnumList;
        let mydata2 = mydata.businessConfigList;
        for(let i=0;i<mydata1.length;i++){
          let obj1={};
          obj1["dictLabel"]=mydata1[i].name;
          obj1["dictValue"]=mydata1[i].type;
          arr1.push(obj1);
        }
        for(let i=0;i<mydata2.length;i++){
          let obj2={};
          obj2["dictLabel"]=mydata2[i].businessName;
          obj2["dictValue"]=mydata2[i].id;
          obj2["businessType"]=mydata2[i].businessType;
          arr2.push(obj2);
        }
        this.dataTypeOptions = arr1;
        this.orgbusinessOptions = arr2;
      });
    },
    // 元数据状态字典翻译
    enableFormat(row, column) {
      return this.selectDictLabel(this.enableOptions, row.enable);
    },
    // 必填状态字典翻译
    requiredFormat(row, column) {
      return this.selectDictLabel(this.requiredOptions, row.required);
    },
    // 取消按钮
    cancel() {
      this.open = false;
      this.reset();
    },
    // 表单重置
    reset() {
      this.form = {
        xItem:{},
        isUsed:undefined,
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
      this.ids = selection.map(item => item.xitemId);
      this.single = selection.length!=1
      this.multiple = !selection.length
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.reset();
      this.open = true;
      this.title = "添加元数据";
    },
    /** 修改按钮操作 */
    handleUpdate(row) {
      this.reset();
      const xItemId = row.xitemId || this.ids;
      let params = {};
      params["xItemId"]=xItemId;
      getInfoById(xItemId).then(response => {
        //console.log("获取查询元数据"+JSON.stringify(response));
        this.form["xItem"] = response.data.xItem;
        this.open = true;
        this.title = "修改元数据";
      });
    },
    /** 提交按钮 */
    submitForm: function() {

      this.form.xItem.updateTime=undefined;
      this.form.xItem.createTime=undefined;

      let params = {};
      params = this.form.xItem;
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.xItem.xitemId != undefined) {
            editxItem(params).then(response => {
              if (response.code === 200) {
                this.msgSuccess("修改成功");
                this.open = false;
                this.getList();
              }
            });
          } else {
            addxItem(params).then(response => {
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
      const ids = row.xitemId || this.ids;
      //console.log("删除数据："+JSON.stringify(ids));
      this.$confirm('是否确认删除元数据?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(function() {
          return delxItem(ids);
        }).then(() => {
          this.getList();
          this.msgSuccess("删除成功");
        }).catch(function() {});
    },
    /** 导出按钮操作 */
    handleExport() {
      const queryParams = this.queryParams;
      this.$confirm('是否确认导出所有元数据数据项?', "警告", {
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
  .app-container{
    padding:5px 20px;
  }
</style>

