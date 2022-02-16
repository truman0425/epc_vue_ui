<template>
  <my-dialog ref="userDialog" title="选择人员" width="850px">
    <div slot="dialogContent" class="dialog-content">

      <el-row :gutter="20">
        <!--部门数据-->
        <el-col :span="5" :xs="24" class="tree-left">
          <div class="head-container">
            <el-dropdown size="mini" split-button type="primary" style="margin-bottom: 10px;"><!--trigger="click" -->操作菜单
              <!-- <span class="el-dropdown-link">
                   下拉菜单<i class="el-icon-arrow-down el-icon&#45;&#45;right"></i>
               </span>-->
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item @click.native="opeTree(1)">全部展开</el-dropdown-item>
                <el-dropdown-item @click.native="opeTree(2)">全部折叠</el-dropdown-item>
                <el-dropdown-item @click.native="opeTree(3)">展开所有子节点</el-dropdown-item>
                <el-dropdown-item @click.native="opeTree(4)">折叠所有子节点</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
            <el-input
              v-model="deptName"
              placeholder="请输入部门名称"
              clearable
              size="small"
              prefix-icon="el-icon-search"
            /><!-- style="margin-bottom: 20px"-->
          </div>
          <div class="head-container">

            <el-tree
              :data="deptOptions"
              :props="defaultProps"
              :expand-on-click-node="false"
              :filter-node-method="filterNode"
              ref="tree"
              default-expand-all
              @node-click="handleNodeClick"
              node-key="id"
            >
            <div class="custom-tree-node" slot-scope="{ node, data }" style="width: calc(100% - 14px);">
            <div @mouseenter="treeEnterHandle(node.id)" :title="node.label" style="width:100%;height: 30px;line-height: 30px;white-space: nowrap;cursor:pointer;overflow: hidden;text-overflow: ellipsis;"><!--style="width: 100%;height: 30px;line-height: 30px"-->
              <i v-if="node.level <= 2" style="color: #48A8F1;" class="el-icon-office-building"></i>
              <i v-else style="color: #48A8F1;" class="el-icon-folder"></i>
              {{ node.label }}
            </div>
           </div>

          </el-tree>

          </div>
        </el-col>

        <!--用户数据-->
        <el-col :span="19" :xs="24" class="table-right">
          <el-row style="border-bottom: 1px solid #eeeeee;line-height: 35px;padding: 0 20px;margin-bottom: 15px">
            <el-col :span="12">
              <div class="design-list"><i class="el-icon-user-solid">&nbsp;&nbsp;</i><!--style="float:left;"-->
                <span :title="queryParams.deptName" style="width:calc(100% - 100px);cursor: pointer;">{{queryParams.deptName}}</span>-成员列表</div><!-- style="float:left;max-width:calc(100% - 143px);white-space: nowrap;cursor:pointer;overflow: hidden;text-overflow: ellipsis;"-->
            </el-col>
          </el-row>
          <el-row style="padding: 0 15px 0 15px;color:#eeeeee;margin-bottom: 15px">
            <el-form :model="queryParams" ref="queryForm" :inline="true" label-width="68px" @submit.native.prevent>
              <el-form-item prop="searchValue">
                <el-input
                  placeholder="查询姓名、手机号、邮箱"
                  clearable
                  size="small"
                  style="width: 200px"
                  v-model="queryParams.searchValue"
                  @keyup.enter.native="handleQuery"
                />
              </el-form-item>
              <!--<el-button type="primary" icon="el-icon-search" size="small" @click="handleQuery" style="height:32px;">查询</el-button>-->
              <el-form-item>
                <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery" style="height:30px;">查询</el-button>
                <el-button icon="el-icon-refresh" size="mini" @click="resetQuery" style="height:32px;">重置</el-button>
              </el-form-item>
            </el-form>
            <!--单选   @current-change="handleCurrentChange"-->
            <el-table  v-if="isSingle" v-loading="loading" :data="userList"
                       @current-change="handleCurrentChange"   @row-click="chooseone"
                       :cell-class-name="isDeptLeader">
              <!--<el-table-column type="selection" width="55" align="center"/>-->

              <el-table-column v-if="isSingle"  label="" width="65">
                <template scope="scope">
                  <el-radio
                    v-model="radio"
                    :label="scope.row.userId"
                  >
                    {{scope.$index + 1}}
                  </el-radio>
                </template>
              </el-table-column>
              <el-table-column v-else type="selection" width="55" align="center"/>
              <el-table-column label="姓名" prop="nickName">
                <template  slot-scope="scope">
                  <el-button
                    size="mini"
                    type="text"
                    @click="handleUpdate(scope.row)"
                    v-bind:class="{isDeptLeader:scope.row.isDeptLeader=='1'||scope.row.isDeptLeader==1}"
                  >{{scope.row.nickName}}
                  </el-button>
                </template>
              </el-table-column>
              <el-table-column label="账号" prop="userName" :show-overflow-tooltip="true"/>
              <el-table-column label="部门" prop="dept.deptName" :show-overflow-tooltip="true"/>
              <el-table-column label="职务" prop="postName" :show-overflow-tooltip="true"/>
              <!--              <el-table-column label="角色" align="center" prop="roles" :show-overflow-tooltip="true" :filters="scopeList" width="120">-->
              <el-table-column :show-overflow-tooltip="true">
                <template slot-scope="scope" slot="header">
                  <el-popover
                    placement="bottom"
                    width="200"
                    v-model="typeSearchVis"
                    trigger="click">
                    <div class="_type-search_">
                      <el-input
                        placeholder="搜索角色"
                        suffix-icon="el-icon-search"
                        size="mini"
                        style="margin-bottom: 5px"
                        v-model="typeSearch">
                      </el-input>
                      <el-checkbox-group v-model="checkList">
                        <span v-for="(item,index) of scopeListFilter" :key="index">
                          <el-checkbox :label="item.roleId">{{ item.roleName }}</el-checkbox><br>
                        </span>
                      </el-checkbox-group>
                    </div>
                    <div style="text-align: right;">
                      <el-button type="primary" size="mini" @click="typeSearchHandle">确定</el-button>
                    </div>
                    <div slot="reference">
                      <span>角色</span>
                      <span class="el-icon-arrow-down"></span>
                    </div>
                  </el-popover>
                </template>
                <template slot-scope="scope">
                  <span v-for="(item,index) of scope.row.roles" :key="index">
                    {{item.roleName}}
                  </span>
                </template>
              </el-table-column>
              <el-table-column label="手机号码" prop="phonenumber" width="120"/>
              <el-table-column label="邮箱" prop="email" :show-overflow-tooltip="true"/>
              <el-table-column label="状态" prop="dept.status">
                <template slot-scope="scope">
                  {{ switchStatusType(scope.row.status)}}
                </template>
              </el-table-column>
            </el-table>
            <!--多选v-if="isSingle" -->
            <el-table v-else v-loading="loading" :data="userList" @selection-change="handleSelectionChange" :cell-class-name="isDeptLeader">
              <!--<el-table-column type="selection" width="55" align="center"/>-->

              <el-table-column v-if="isSingle"  label="" width="65">
                <template scope="scope">
                  <el-radio
                    v-model="radio"
                    :label="scope.row.userId"
                  >
                    {{scope.$index + 1}}
                  </el-radio>
                </template>
              </el-table-column>
              <el-table-column v-else type="selection" width="55" align="center"/>
              <el-table-column label="姓名" prop="nickName">
                <template  slot-scope="scope">
                  <el-button
                    size="mini"
                    type="text"
                    @click="handleUpdate(scope.row)"
                    v-bind:class="{isDeptLeader:scope.row.isDeptLeader=='1'||scope.row.isDeptLeader==1}"
                  >{{scope.row.nickName}}
                  </el-button>
                </template>
              </el-table-column>
              <el-table-column label="账号" prop="userName" :show-overflow-tooltip="true"/>
              <el-table-column label="部门" prop="dept.deptName" :show-overflow-tooltip="true"/>
              <el-table-column label="职务" prop="postName" :show-overflow-tooltip="true"/>
              <!--              <el-table-column label="角色" align="center" prop="roles" :show-overflow-tooltip="true" :filters="scopeList" width="120">-->
              <el-table-column :show-overflow-tooltip="true">
                <template slot-scope="scope" slot="header">
                  <el-popover
                    placement="bottom"
                    width="200"
                    v-model="typeSearchVis"
                    trigger="click">
                    <div class="_type-search_">
                      <el-input
                        placeholder="搜索角色"
                        suffix-icon="el-icon-search"
                        size="mini"
                        style="margin-bottom: 5px"
                        v-model="typeSearch">
                      </el-input>
                      <el-checkbox-group v-model="checkList">
                        <span v-for="(item,index) of scopeListFilter" :key="index">
                          <el-checkbox :label="item.roleId">{{ item.roleName }}</el-checkbox><br>
                        </span>
                      </el-checkbox-group>
                    </div>
                    <div style="text-align: right;">
                      <el-button type="primary" size="mini" @click="typeSearchHandle">确定</el-button>
                    </div>
                    <div slot="reference">
                      <span>角色</span>
                      <span class="el-icon-arrow-down"></span>
                    </div>
                  </el-popover>
                </template>
                <template slot-scope="scope">
                  <span v-for="(item,index) of scope.row.roles" :key="index">
                    {{item.roleName}}
                  </span>
                </template>
              </el-table-column>
              <el-table-column label="手机号码" prop="phonenumber" width="120"/>
              <el-table-column label="邮箱" prop="email" :show-overflow-tooltip="true"/>
              <el-table-column label="状态" prop="dept.status">
                <template slot-scope="scope">
                  {{ switchStatusType(scope.row.status)}}
                </template>
              </el-table-column>
            </el-table>
            <pagination
              v-show="total>0"
              :total="total"
              :page.sync="queryParams.pageNum"
              :limit.sync="queryParams.pageSize"
              @pagination="getList"
              style="width:100%;"
            />
          </el-row>

        </el-col>
      </el-row>

    </div>
    <div slot="footer" class="btn-foot">
      <el-button plain @click="closeDialog">取消</el-button>
      <el-button type="primary" @click="onSure" style="margin-right: 10px">确认</el-button>
    </div>
  </my-dialog>
</template>

<script>


import {
  listUser,
  getUser,
  delUser,
  addUser,
  updateUser,
  exportUser,
  resetUserPwd,
  changeUserStatus,
  importTemplate,
  setDeptLeader,
  switchDept,
  typeRole,
  getBaseUserlist
} from "@/api/system/user";
import {listDept, getDept, delDept, addDept, updateDept} from "@/api/system/dept";
import {getToken} from "@/utils/auth";
import {treeselect} from "@/api/system/dept";
import Treeselect from "@riophae/vue-treeselect";
import "@riophae/vue-treeselect/dist/vue-treeselect.css";

export default {
  name: "userDialog",
  components: {Treeselect},
  props: {
    isSingle:Boolean,
  },
  data() {
    return {
      //返回的数据
      selectDatas:[],
      // 角色搜索弹框显示
      typeSearchVis: false,
      // 选中角色
      checkList: [],
      scopeListFilter: [],
      // 角色搜索
      typeSearch: '',
      //角色列表
      scopeList:[],
      entryTime:"",//入职时间
      activeName: 'user',
      // 遮罩层
      loading: true,
      // 选中数组
      ids: [],
      selectedItem: [],
      // 非单个禁用
      single: true,
      // 非多个禁用
      multiple: true,
      // 总条数
      total: 0,
      // 用户表格数据
      userList: null,
      // 弹出层标题
      title: "",
      // 部门树选项
      deptOptions: undefined,
      // 是否显示弹出层
      open: false,
      // 部门名称
      deptName: undefined,
      // 默认密码
      initPassword: undefined,
      // 日期范围
      dateRange: [],
      // 状态数据字典
      statusOptions: [],
      // 性别状态字典
      sexOptions: [],
      // 职务选项
      postOptions: [],
      // 角色选项
      roleOptions: [],
      //用户选项
      userOption:[],
      //部门类型
      orgTypeOptions:[],
      isEdit:false,
      // 表单参数
      form: {},
      //部门相关
      defaultProps: {
        children: "children",
        label: "label"
      },
      deptTitle: "",
      parentName: '',
      deptOpen: false,
      deptForm: {},
      deptChangeOpen: false,
      deptChangeForm: {},
      // 属性菜单后边三个点 显示控制
      isTreeHandle: -1,
      // 用户导入参数
      upload: {
        // 是否显示弹出层（用户导入）
        open: false,
        // 弹出层标题（用户导入）
        title: "",
        // 是否禁用上传
        isUploading: false,
        // 是否更新已经存在的用户数据
        updateSupport: 0,
        // 设置上传的请求头部
        headers: {Authorization: "Bearer " + getToken()},
        // 上传的地址
        url: process.env.VUE_APP_BASE_API + "/system/user/importData"
      },
      // 查询参数
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        searchValue: '',
        // userName: undefined,
        // phonenumber: undefined,
        // status: undefined,
        deptId: undefined,
        deptName: undefined,
        roleIds: undefined
      },
      //用户查询参数
      queryParams2: {
        pageNum: 1,
        pageSize: 10,
      },
      //单选
      radio:null,
      ismultiple:true,

    }
  },
  watch: {
    // 根据名称筛选部门树
    deptName(val) {
      this.$refs.tree.filter(val);
    },
    typeSearch(val) {
      let value = val.trim();
      if (!value) {this.scopeListFilter =  this.scopeList; return};
      this.scopeListFilter = this.scopeList.filter(item => {
        return item.roleName.indexOf(value) > -1;
      })
    }
  },
  created() {
    this.getList();
    this.getTreeselect();
    this.getRoleList();
    //编辑时加载所有用户
    this.gethuman();
    this.getDicts("sys_normal_disable").then(response => {
      this.statusOptions = response.data;
    });
    this.getDicts("sys_user_sex").then(response => {
      this.sexOptions = response.data;
    });
    this.getConfigKey("sys.user.initPassword").then(response => {
      this.initPassword = response.msg;
    });
    this.getDicts("orgType").then(response => {
      this.orgTypeOptions = response.data;
    });

  },
  methods: {
    /*弹出框通用方法 打开关闭*/
    openDialog() {
      console.log("用户弹框被调用打开");
      this.$refs.userDialog.openDialog();
    },
    closeDialog() {
      this.$refs.userDialog.closeDialog();
    },
    /*弹出框确认后提交的数据*/
    onSure() {
      this.$emit('onSelectData', this.selectDatas);
      this.closeDialog();
    },

    /** 角色搜索*/
    typeSearchHandle() {
      let str = undefined;
      let arr = [...this.checkList];
      if (arr.length > 0) {
        str = arr.join(',')
      }
      this.queryParams.roleIds = str;
      this.typeSearchVis = false;
      this.getList();
    },
    /** 获取角色列表*/
    getRoleList() {
      typeRole().then(
        response => {
          this.scopeList = response.data;
          this.scopeListFilter = [...this.scopeList];
          //console.log(this.scopeList);
        }
      );
    },
    /** 人员划转 */
    switchDeptHandle() {
      if (this.deptChangeForm.deptId && this.deptChangeForm.usersId) {
        switchDept(this.deptChangeForm.deptId,this.deptChangeForm.usersId).then(response => {
          if (response.code === 200) {
            this.msgSuccess("人员划转成功");
            this.deptChangeOpen = false;
            this.deptChangeForm.deptId = undefined;
            this.deptChangeForm.usersId = undefined;
            this.getList();
          }
        });
      }
    },
    /** 设置部门负责人 */
    setleaderHandle() {
      let row = this.selectedItem[0];
      let data = {
        deptId: this.selectedItem[0].deptId,
        leader: this.selectedItem[0].userName
      }
      setDeptLeader(data).then(response => {
        if (response.code === 200) {
          this.getList();
          this.msgSuccess("设置成功");
        }
      });
    },
    /** 查询用户列表 */
    getList() {
      this.loading = true;
      listUser(this.addDateRange(this.queryParams, this.dateRange)).then(response => {
          this.userList = response.rows;
          this.total = response.total;
          this.loading = false;
        }
      );
    },
    /** 查询部门下拉树结构 */
    getTreeselect() {
      treeselect().then(response => {
        if (!this.deptOptions && response.data.length > 0) {
          this.queryParams.deptName = response.data[0].label
          this.queryParams.deptId = response.data[0].id
        }
        this.deptOptions = response.data;
      });
    },
    // 筛选节点
    filterNode(value, data) {
      if (!value) return true;
      return data.label.indexOf(value) !== -1;
    },
    // 节点单击事件
    handleNodeClick(data) {
      this.queryParams.deptId = data.id;
      this.queryParams.deptName = data.label;
      this.getList();
    },
    // 用户状态修改
    handleStatusChange(type) {
      //单个修改用户状态
      /*let row = this.selectedItem[0];
      row.status = row.status === "0" ? "1" : "0";
      let text = row.status
      text = row.status === "0" ? "启用" : "停用";
      this.$confirm('确认要"' + text + '""' + row.userName + '"用户吗?', "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(function () {
        return changeUserStatus(row.userId, row.status);
      }).then(() => {
        this.msgSuccess(text + "成功");
        this.getList();
      }).catch(function () {
        row.status = row.status === "0" ? "1" : "0";
      });*/
      //如果没有选中项不执行
      let text = '';
      if(type==1){
        text="激活";
      }else{
        text="停用";
      }
      this.$confirm('确认要' + text + '选中的用户吗?', "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(_ => {

        let userIds = [];
        for(let i=0;i<this.selectedItem.length;i++){
          userIds.push(this.selectedItem[i].userId);
        }
        return changeUserStatus(userIds.join(","), type);
      }).then(() => {
        this.msgSuccess(text + "成功");
        this.getList();
      }).catch(function () {
        //row.status = row.status === "0" ? "1" : "0";
      });



    },
    // 取消按钮
    cancel() {
      this.open = false;
      this.deptOpen = false;
      this.reset();
      this.resetDept();
    },
    // 表单重置
    reset() {
      this.form = {
        userId: undefined,
        deptId: undefined,
        userName: undefined,
        nickName: undefined,
        password: undefined,
        phonenumber: undefined,
        email: undefined,
        sex: undefined,
        status: "0",
        remark: undefined,
        postIds: [],
        roleIds: []
      };
      this.resetForm("form");
    },
    /** 搜索按钮操作 */
    handleQuery() {
      this.queryParams.page = 1;
      this.getList();
    },
    /** 重置按钮操作 */
    resetQuery() {
      this.dateRange = [];
      this.resetForm("queryForm");
      this.handleQuery();
    },
    // 单选框选中数据
    chooseone(row){
      this.radio = row.userId;
    },
    handleCurrentChange(val) {
      this.radio = val.userId;
      this.selectDatas = val;
    },
    // 多选框选中数据
    handleSelectionChange(selection) {
      this.ids = selection.map(item => item.userId);
      this.selectedItem = selection.map(item => item);
      this.single = selection.length != 1;
      this.multiple = !selection.length;

      this.selectDatas = selection;
    },
    /** 转换部门数据结构 */
    normalizer(node) {
      if (node.children && !node.children.length) {
        delete node.children;
      }
      return {
        id: node.deptId,
        label: node.deptName,
        children: node.children
      };
    },
    handleDeptChange(row) {
      let str = [], ids = [];
      str = this.selectedItem.map(item => `${item.userName}`)
      ids = this.selectedItem.map(item => `${item.userId}`)
      this.deptChangeForm.names = str.join('，')
      this.deptChangeForm.usersId = ids.join(',')
      this.deptChangeOpen = true
    },
    treeEnterHandle(id) {
      this.isTreeHandle = id;
    },
    switchStatusType(type) {
      var res = "";
      if (type === '0') {
        res = "正常"
      } else {
        res = "停用"
      }
      return res;
    },
    //操作树菜单
    opeTree(type){

      let self = this;
      // 将没有转换成树的原数据
      let list = this.deptOptions;
      //全部展开
      if(type==1){
        for (let i = 0; i < list.length; i++) {
          // 将没有转换成树的原数据设置key为... 的展开
          self.$refs.tree.store.nodesMap[list[i].id].expanded = true
        }
      }else if(type==2){//全部关闭
        for (let i = 0; i < list.length; i++) {
          self.$refs.tree.store.nodesMap[list[i].id].expanded = false
        }
      }else if(type==3){//全部展开子节点
        for(let i=0;i<this.$refs.tree.store._getAllNodes().length;i++){
          this.$refs.tree.store._getAllNodes()[i].expanded=true;
        }
      }else if(type==4){//全部关闭子节点
        for(let i=0;i<this.$refs.tree.store._getAllNodes().length;i++){
          this.$refs.tree.store._getAllNodes()[i].expanded=false;
        }
      }


    },
    uploadUser(){
      this.queryParams2["pageNum"] = parseInt(this.queryParams2["pageNum"])+1;
      getBaseUserlist(this.queryParams2).then(response => {
        let code = response.code;
        let mydata = response.rows;
        let arr = [];
        for(let i=0;i<mydata.length;i++){
          let obj ={};
          obj["dictLabelName"] = mydata[i].nickName+ "  "+mydata[i].deptName;
          obj["dictLabel"] = mydata[i].nickName;
          obj["dictValue"] = mydata[i].userId;
          //arr.push(obj);
          this.userOption.push(obj);
        }
      });
    },
    dataFilter(val){
      this.queryParams2["pageSize"] = 10;
      let param = this.queryParams2;
      param["searchValue"] = val;
      getBaseUserlist(param).then(response => {
        let code = response.code;
        let mydata = response.rows;
        let arr = [];
        for(let i=0;i<mydata.length;i++){
          let obj ={};
          obj["dictLabelName"] = mydata[i].nickName + "  " +mydata[i].deptName;
          obj["dictLabel"] = mydata[i].nickName;
          obj["dictValue"] = mydata[i].userId;
          arr.push(obj);
        }
        this.userOption=arr;
      });

    },
    //筛选人员，格式替换
    gethuman(param){

      getBaseUserlist("").then(response => {
        let code = response.code;
        let mydata = response.rows;
        let arr = [];
        for(let i=0;i<mydata.length;i++){
          let obj ={};
          obj["dictLabelName"] = mydata[i].nickName + "  " + mydata[i].deptName ;
          obj["dictLabel"] = mydata[i].nickName;
          obj["dictValue"] = mydata[i].userId;
          arr.push(obj);
        }
        this.userOption=arr;
      });
    },
    isDeptLeader({row,column,rowIndex,columnIndex}){
      if(row.isDeptLeader === '1' || row.isDeptLeader === 1){
        return 'isDeptLeader';
      }
    },


  }
}
</script>

<style lang="scss" scoped>
 /deep/ .pagination-container {
    .el-pagination{
      position: relative !important;
    }
  }
</style>
