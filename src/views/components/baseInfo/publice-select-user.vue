<template>
  <my-dialog ref="userDialog" title="选择人员" >
    <div slot="dialogContent" class="dialog-content">

      <template>
        <el-row>
          <el-col :span="isSingle? 12:8"  class="tree-left">
            <div class="head-container">
              <el-dropdown size="mini" split-button type="primary" style="margin-bottom: 10px;"><!--trigger="click" -->操作菜单
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
            <div v-loading="leftLoading" class="head-container scrollTab">

              <el-tree
                :data="deptOptions"
                :props="defaultProps"
                :expand-on-click-node="false"
                :filter-node-method="filterNode"
                ref="tree"
                style="height: 500px;overflow-y: auto;"
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
          <el-col :span="isSingle?12:16" class="scrollTab" >
            <el-row style="margin-left: 20px;border-bottom: 1px solid #eeeeee;line-height: 35px;padding: 0 20px;margin-bottom: 15px">
              <el-col :span="24">
                <div v-show="queryParams.deptName" class="design-list"><i class="el-icon-user-solid">&nbsp;&nbsp;</i><!--style="float:left;"-->
                  <span :title="queryParams.deptName" style="width:calc(100% - 100px);cursor: pointer;">{{queryParams.deptName}}</span>-成员列表</div><!-- style="float:left;max-width:calc(100% - 143px);white-space: nowrap;cursor:pointer;overflow: hidden;text-overflow: ellipsis;"-->
              </el-col>
            </el-row>
            <el-row class="scrollTab"  v-loading="rightLoading" style="position:relative;padding: 0 15px 0 15px;color:#eeeeee;margin-bottom: 15px">
              <div  :class="[isSingle?'user-count':'user-count2']">
                <span>{{ userTotal }}</span>
              </div>
              <el-transfer
                v-if="isSingle"
                class="singleCls"
                style="margin-left: 20px;margin-right:20px;height: 500px;"
                filterable
                ref="transfer"
                :titles="['人员列表', '已选择']"
                :filter-method="filterMethod"
                @left-check-change="leftCheckChange"
                v-model="valueTran"
                :data="dataTran"
                :props="{
                  key: 'userId',
                  label: 'nickName'
                }"
                :format="{
                  noChecked: '${total}',
                  hasChecked: '${total}'
                }"
              >
                <span  slot-scope="{ option }">
<!--                   <el-tooltip class="item" effect="dark" content="" placement="right">-->
<!--                       <div  slot="content">姓名：{{  option.nickName  }}<br>年龄：18<br></div>-->
<!--                       <span @dblclick="addUserDbHandle">{{ option.nickName }}</span>-->
<!--                   </el-tooltip>-->
                  <span @dblclick="addUserDbHandle">{{ option.nickName }}</span>
<!--                  <i class="el-icon-info"></i>-->
                </span>
              </el-transfer>
              <el-transfer
                v-else
                style="margin-left: 20px;height: 500px"
                filterable
                @change="userChange"
                ref="transfer"
                @input="inputChange"
                :titles="['角色列表', '已选择']"
                :filter-method="filterMethod"
                v-model="valueTran"
                :data="dataTran"
                :props="{
                  key: 'userId',
                  label: 'nickName'
                }"
              >
                <span slot-scope="{ option }">
<!--                   <el-tooltip class="item" effect="dark" content="" placement="right">-->
<!--                       <div slot="content">姓名：{{  option.nickName  }}<br>年龄：18<br></div>-->
<!--                       <span>{{ option.nickName }}</span>-->
<!--                   </el-tooltip>-->
                  <span>{{ option.nickName }}</span>
                  <!--                  <i class="el-icon-info"></i>-->
                </span>
              </el-transfer>
            </el-row>
          </el-col>
        </el-row>
      </template>

    </div>

    <div slot="footer" class="btn-foot">
      <el-button @click="closeDialog" >取 消</el-button>
      <el-button type="primary" style="margin-right: 10px" @click="addUserHandle">确 定</el-button>
    </div>
  </my-dialog>
</template>

<script>

import {qualificationslist} from '@/api/projectPlanning/projectRegistration';

import { copyRole,listRole, getRole, delRole, addRole, updateRole, exportRole, dataScope, changeRoleStatus,typeRole,removeUserFromRole,addUserFromRole } from "@/api/system/role";
import { treeselect as menuTreeselect, roleMenuTreeselect } from "@/api/system/menu";
import { treeselect as deptTreeselect, roleDeptTreeselect, treeselect } from '@/api/system/dept'

export default {
  name: "publiceSelectUser",
  props:{
    isSingle: {
      type:Boolean,
      default:true
    }
  },
  data() {
    return {
      // 部门名称
      deptName: undefined,
      formUser: {
        roleName: '',
        roleMember: '',
      },
      leftLoading:false,
      rightLoading:false,
      queryParams: {
        pageNum: 1,
        pageSize: 150,
        roleName: undefined,
        roleIds: undefined,
        roleKey: undefined,
        status: undefined,
        searchValue: undefined,
        beginTime: undefined,
        endTime: undefined
      },
      deptOptions: [],
      defaultProps: {
        children: "children",
        label: "label"
      },
      dataTran: [],
      valueTran: [],
      currentUser:undefined,
      templateSelection:[],
      userList:[],
      userTotal:0,
    }
  },
  created() {
    this.getTreeselect();

  },
  beforeDestroy() {
    window.removeEventListener('click', this.clickOther);
  },
  watch: {
    // 根据名称筛选部门树
    deptName(val) {
      this.$refs.tree.filter(val);
    },
  },
  methods: {
    initWindomListeren(){
      let _this = this
      //当前页面监视键盘输入
      document.onkeydown = function(e) {//事件对象兼容
        let e1 = e || event || window.event || arguments.callee.caller.arguments[0]
        //键盘按键判断:左箭头-37;上箭头-38；右箭头-39;下箭头-40
        //左
        _this.$nextTick(()=>{
          setTimeout(()=>{
            let value = _this.$refs.transfer.$refs.leftPanel.query
            console.log('value='+value)
            if(_this.queryParams.searchValue != value){
              console.log('value...='+value)
              _this.queryParams.searchValue = value
              _this.getList()
            }
          },200)

        })

      }

      window.addEventListener("click", this.clickOther);
    },
    clickOther(){
      console.log('---------------')
      let _this = this
      setTimeout(()=>{
        let value = _this.$refs.transfer.$refs.leftPanel.query
        console.log('value='+value)
        if(_this.queryParams.searchValue != value){
          console.log('value...='+value)
          _this.queryParams.searchValue = value
          _this.getList()
        }
      },200)
    },
    openDialog() {
      this.initWindomListeren()
      this.$refs.userDialog.openDialog();
      this.$nextTick(()=>{
        this.isSingle && (this.$refs.transfer.$refs.rightPanel.$el.style.visibility = "hidden")
      })
    },
    closeDialog() {
      this.templateSelection = undefined
      this.dataTran = []
      this.valueTran = []
      this.queryParams.deptName = ''
      this.userTotal = 0
      document.onkeydown = undefined
      window.removeEventListener('click', this.clickOther);
      this.$refs.userDialog.closeDialog();

    },
    getContent(option){
      let value = '姓名：'+option.nickName+'<br>'+'年龄：18<br>'
      return value
    },
    /** 根据角色ID查询部门树结构 */
    getRoleDeptTreeselect(roleId) {
      roleDeptTreeselect(roleId).then(response => {
        this.deptOptions = response.depts;
        this.$refs._data.setCheckedKeys(response.checkedKeys);
      });
    },
    getTreeselect() {
      this.leftLoading = true
      treeselect().then(response => {
        this.leftLoading = false
        if (response.data.length > 0) {
          this.queryParams.deptName = response.data[0].label
          this.queryParams.deptId = response.data[0].id
        }
        this.deptOptions = response.data;
        //this.getList()
      }).catch(err=>{
        this.leftLoading = false
      });
    },
    treeEnterHandle(id) {
      this.isTreeHandle = id;
    },
    filterNode(value, data) {
      if (!value) return true;
      return data.label.indexOf(value) !== -1;
    },
    handleNodeClick(data) {
      this.queryParams.deptId = data.id;
      this.queryParams.deptName = data.label;
      this.queryParams.searchValue = ''
      this.getList();
    },
    getTemplateRow(index, row) {
      this.templateSelection = row;
    },
    onSure() {


    },
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
    leftCheckChange(e,item2){
      let _list = this.dataTran;
      this.templateSelection = [e[e.length - 1]]
      this.currentUser = e[e.length - 1]?[e[e.length - 1]]:this.currentUser
      setTimeout(()=>{
        this.$refs.transfer.$refs.leftPanel.handleAllCheckedChange = ()=>{}
        this.$refs.transfer.$refs.leftPanel.checkChangeByUser = false
        this.$refs.transfer.$refs.leftPanel.checked = [e[e.length - 1]]
      },100)

    },
    userChange(e){
      e.forEach(s=>{
        let user = this.dataTran.find(res=> res.userId == s)
        user && this.userList.push(user)
      })
      console.log('e='+JSON.stringify(e))
    },
    inputChange(val){
      console.log('inputChange')
    },
    filterMethod(query, item) {
      return item.nickName.indexOf(query) > -1;
    },
    addUserDbHandle(){
      if(this.currentUser){
        let user = this.dataTran.find(res=> res.userId == this.currentUser[0])
        if(user.status == '1'){
          this.$message("该用户已被停用")
        }else{
          this.$emit('onSelectData', user);
          this.closeDialog()
        }
      }else{
        this.$message("请先选择用户")
      }
    },
    addUserHandle() {
      if(this.isSingle){
        if(this.templateSelection[0]){
          let user = this.dataTran.find(res=> res.userId == this.templateSelection[0])
          if(user.status == '1'){
            this.$message("该用户已被停用")
          }else{
            this.$emit('onSelectData', user);
            this.closeDialog()
          }

        }else{
          this.$message("请先选择用户")
        }

      }else{
        if (this.valueTran.length > 0) {
          // let usersIds = [...this.valueTran].join(',')
          // console.log(this.queryParams.roleIds);
           // console.log('valueTran='+this.valueTran);
          let muserList = []
          this.valueTran.forEach(s=>{
            let user = this.userList.find(res=> res.userId == s)
            user && muserList.push(user)
          })
          //this.$emit('onSelectData', userList);


          this.$emit('onSelectData', this.valueTran);//返回用户id列表
          this.$emit('onSelectUserList', muserList);//返回用户列表
          this.valueTran = []
          this.dataTran = []
          this.queryParams = {
              pageNum: 1,
              pageSize: 1000,
              roleName: undefined,
              roleIds: undefined,
              roleKey: undefined,
              status: undefined,
              searchValue: undefined,
              beginTime: undefined,
              endTime: undefined
          }
          this.closeDialog()
        } else {
          this.$message("请先选择用户")
        }

      }


    },
    getList() {
      this.loading = true
      this.rightLoading = true
      listRole(this.queryParams).then(
        response => {
          this.rightLoading = false
          this.dataTran = response.rows;
          this.userTotal = response.total
        }
      ).catch(err=>{
        this.rightLoading = false
      });
    },
  }
}
</script>

<style lang="scss" scoped>
::v-deep .el-dialog{
  width: 984px !important;
}
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
  margin-top: 10px;
}
.user-count{
  position: absolute;
  z-index: 999;
  width: 100px;
  height: 35px;
  text-align: center;
  background-color: #f5f7fa;
  right: 39px;
  top: 4px;
  color: black;
  display: flex;
  align-content: center;
  justify-content: flex-end;
  >span{
    display: flex;
    align-items: center;
    margin-right: 10px;
  }
}

.user-count2{
  position: absolute;
  position: absolute;
  left: 150px;
  z-index: 99;
  width: 80px;
  height: 35px;
  text-align: center;
  background-color: #f5f7fa;
  top: 4px;
  color: black;
  display: flex;
  align-content: center;
  justify-content: flex-end;
  >span{
    display: flex;
    align-items: center;
    margin-right: 10px;
  }
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
    width: 100%;
  }
  /deep/ .el-transfer-panel__list{
    overflow-y: auto;
    height: 400px !important;
  }
}
::v-deep .el-input__prefix{
  background: none !important;
  top: 0 !important;
}
::v-deep .title-top{
  background: #f3f9ff !important;
  color: #1989fa!important;
}
::v-deep .el-button-group .el-button--primary:first-child{
  //height: 29px;
}


//页面滚动条修改 开始
.scrollTab{

}

.scrollTab .el-scrollbar {
  height: 100%;
}
.scrollTab {
  overflow: overlay;
}
/* 最为关键得两个样式代码，可以设置全局滚动条样式，也可以按需设置 */
.scrollTab ::-webkit-scrollbar {
  /* 设置竖向滚动条的宽度 */
  width: 5px !important;
  /* 设置横向滚动条的高度 */
  height: 5px !important;
}
.scrollTab ::-webkit-scrollbar-thumb {
  /*滚动条的背景色*/
  background-color: rgba(144,147,153,.3);
  border-radius: 35px !important;
  position: relative;
}

//页面滚动条修改结束

</style>
