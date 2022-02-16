<template>
  <my-dialog ref="editDialog" title="选择抄送角色" width="400px">
    <div slot="dialogContent" class="dialog-content">
      <div>
        <div class="header-btn">
          <el-button :disabled="approveIndex&&approveIndex!=0"  @click="fsclAdd(0)" :class="{'btn-xmxz':currentIndex == 0,'btn-fscl':currentIndex != 0}"  >项目机会角色</el-button>
          <el-button :disabled="approveIndex&&approveIndex!=1"  @click="fsclAdd(1)" :class="{'btn-xmxz':currentIndex == 1,'btn-fscl':currentIndex != 1}"  >前期项目角色</el-button>
          <el-button :disabled="approveIndex&&approveIndex!=2"  @click="fsclAdd(2)" :type="currentIndex==0?'primary':''" :class="{'btn-xmxz':currentIndex == 2,'btn-fscl':currentIndex != 2}" ><span>审批角色</span></el-button>
        </div>
        <div class="body-content">

          <div>

            <div class="content-cls" v-loading="roleLoading">
              <div class="content-title">
                <span>{{currentIndex == 0 ? '项目机会角色':currentIndex == 1 ? '前期项目角色':'审批角色'}}</span>
                <span></span>
              </div>

              <!-- 项目机会角色-->
              <el-checkbox-group
                v-show="currentIndex == 0"
                 class="ck-list" v-model="chanceCheckList">
                <el-checkbox
                  v-for="item in chanceRoleList"
                  :label="item.projectRoleName"
                ></el-checkbox>
              </el-checkbox-group>

              <!-- 前期项目角色 projectRoleSid-->
              <el-checkbox-group
                v-show="currentIndex == 1"
                class="ck-list" v-model="projectCheckList">
                <el-checkbox
                  v-for="item in projectPreRoleList"
                  :label="item.projectRoleName"
                ></el-checkbox>
              </el-checkbox-group>

              <!-- 审批角色-->
              <el-checkbox-group
                v-show="currentIndex == 2"
                  class="ck-list" v-model="approveCheckList">
                <el-checkbox v-for="item in approveRoleList" :label="item.approvalRoleName"></el-checkbox>
              </el-checkbox-group>

            </div>
          </div>

        </div>
      </div>

    </div>

    <div slot="footer" class="btn-foot">
      <el-button plain @click="closeDialog">取消</el-button>
      <el-button type="primary" @click="onSure" style="margin-right: 10px">确认</el-button>
    </div>
  </my-dialog>
</template>

<script>

import { establishList, priorprojectlist } from '@/api/projectPlanning/projectRegistration'
import {verificationEpcProjectChangeLeader} from '@/api/projectPlanning/projectUser';
import { getRoleList } from '@/api/processEngine/processEngine'
import { getApprovalRoleList } from '@/api/system/approveRole'
import { projectRoleList } from '@/api/projectRole/projectRole'

export default {
  name: "selectWorkDept",
  data() {
    return {
      userLoginName: '',
      tableData: [],
      radio:null,
      loading:true,
      roleLoading:false,
      currentRow: null,
      templateSelection: {},
      selectItem: 0,
      total: 0,//总条数
      queryParams: {//请求参数
        pageNum: 1,
        pageSize: 8,
        projectLibraryStatus:'9',
        orderByColumn: "createTime",
        isAsc : "desc",
        priorProjectName:''
      },
      checkList: ['选中且禁用','复选框 A'],
      chanceCheckList:[],
      projectCheckList:[],
      proCheckList:[],
      approveCheckList:[],
      currentIndex:0,
      proRoleList:[],
      approveRoleList:[],
      queryRoleParams: {
        //项目角色类型参数
        projectRoleType: undefined,
        //功能权限类型参数
        projectAuthType: undefined
      },
      approveIndex:undefined,
      chanceRoleList:[],//项目机会角色
      projectPreRoleList:[]//前期项目角色
    }
  },
  created() {

    this.getList()
    this.requestRoleList()
    this.getProjectRoleList('1')
    this.getProjectRoleList('2')
  },
  watch:{
    'queryParams.projectName':{
      handler(){
        if(this.queryParams.projectName == ''){
          this.getList();
        }
      }
    }
  },
  methods: {
    /**
     * 获取项目机会角色 前期项目角色
     */
    getProjectRoleList(type) {

      this.queryRoleParams.projectRoleType = type
      this.queryRoleParams.projectAuthType = type
      projectRoleList(this.queryRoleParams).then(
        response => {
          if(type == 1){
            this.chanceRoleList = response.rows;
          }else{
            this.projectPreRoleList = response.rows;
          }

        }
      );
    },
    requestRoleList(){
      this.roleLoading = true
      getRoleList({}).then(response => {
        this.roleLoading = false
        if(response.code == 200){
          this.proRoleList = response.data;
        }
      }).catch(err=>{
        this.roleLoading = false
      })
      getApprovalRoleList().then(
        response => {
          if(response.code == 200 && response.data.length > 0){
            this.approveRoleList = response.data;
          }
        }
      ).catch(err=>{
      });

    },
    chooseone(row){
      this.radio = row.priorProjectSid;
    },
    handledbClick(row, event, column) {

    },
    handleCurrentChange(val) {
      //this.multple = val;
      this.currentRow = val;
      this.radio = val.priorProjectSid;
    },
    openDialog(data,index,list) {
      if(this.approveCheckList.length == 0 && this.proCheckList.length == 0){
        this.initData(data)
      }
      this.approveIndex = index
      if(this.approveIndex){
        this.currentIndex = this.approveIndex
        if(list && list.length>0){
          if(index == 0){
              this.chanceCheckList = list.map(res=> res.name)
          }else if(index == 1){
             this.projectCheckList = list.map(res=> res.name)
          }else{
             this.approveCheckList = list.map(res=> res.name)
          }
        }
      }
      this.$refs.editDialog.openDialog();
    },
    initData(data){
      if(data.ccNodeRoleName){
        let name = data.ccNodeRoleName
        let names = name.split(',')
        names && (this.approveCheckList = names)
      }

      if(data.ccNodeApprovalRoleName){
        let name = data.ccNodeApprovalRoleName
        let names = name.split(',')
        names && (this.proCheckList = names)
      }
    },
    closeDialog() {
      this.approveCheckList = []
      this.chanceCheckList = []
      this.projectCheckList = []
      this.approveIndex = undefined
      this.currentIndex = 0
      this.$refs.editDialog.closeDialog();
    },
    getTemplateRow(index, row) {
      this.templateSelection = row;
    },
    onSure() {

      if(this.approveCheckList.length == 0 && this.chanceCheckList.length == 0 && this.projectCheckList.length == 0){
        this.$message('请先选择')
      }else{
        let list1 = []
        this.approveCheckList.forEach(res=>{
          let entity = this.approveRoleList.find(s=> s.approvalRoleName == res)
          entity && list1.push(entity)
        })
        let list2 = []
        this.chanceCheckList.forEach(res=>{
          let entity = this.chanceRoleList.find(s=> s.projectRoleName == res)
          entity && list2.push(entity)
        })

        let list3 = []
        this.projectCheckList.forEach(res=>{
          let entity = this.projectPreRoleList.find(s=> s.projectRoleName == res)
          entity && list3.push(entity)
        })

        let obj = {
          approveCheckList:list1,
          chanceCheckList:list2,
          projectCheckList:list3
        }

        this.$emit('onSelectRole',  obj)
        this.closeDialog()
      }
    },
    unSelectTag(tag,obj){

      if(this.approveCheckList.length == 0 && this.chanceCheckList.length == 0 && this.projectCheckList.length == 0){
        this.initData(obj)
      }
      setTimeout(()=>{
        this.approveCheckList = this.approveCheckList.filter(res=> res != tag.name)
        this.chanceCheckList = this.chanceCheckList.filter(res=> res != tag.name)
        this.projectCheckList = this.projectCheckList.filter(res=> res != tag.name)
      },1500)

    },
    seachUser(){
      this.getList()
    },
    fsclAdd(index){
      this.currentIndex = index
    },
    resetBtn(){
      this.queryParams = {
        pageNum: 1,
        pageSize: 8,
        orderByColumn: "createTime",
        isAsc : "desc",
        priorProjectName:''
      }
      this.getList()
    },
    getList() {

      this.loading = true
      priorprojectlist(this.queryParams).then((res) => {
        this.tableData = res.rows;
        this.templateSelection = res.rows[0] || []
        console.log(JSON.stringify(res.rows));
        this.total = res.total;
        this.selectItem = 0
        this.loading = false
      }).catch(err => {
        this.loading = false
      })
    },
  }
}
</script>

<style lang="scss" scoped>
::v-deep .el-dialog{
  width: 550px!important;
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
.container_lefts{

  padding: 20px 17px;
  height:340px;
  overflow: auto;
  border-radius: 5px;
}

.container_lefts .el-table td,
.container_lefts .el-table th.is-leaf,
.container_lefts .el-table--border,
.container_lefts .el-table--group {
  border: none;
  cursor: pointer;
}
.container_lefts .el-table::before {
  height: 0;
}

.table-content{
  background: #FFFFFF;
  box-shadow: 0px 1px 7px 0px rgba(236, 236, 236, 0.75);
  border-radius: 5px;
  display: flex;
  flex-direction: column;
}
/deep/ .el-table__header-wrapper, .el-table__footer-wrapper {
  overflow: hidden;
  border-bottom: 1px solid #ddd;
  margin: 0 10px;
  margin-bottom: 10px;
  width: 97%;
}
.body-content{
  background: #f3f9ff;
  border-radius: 5px;
  padding: 18px;
  margin-top: 20px;
}
.pag-cls{
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin-top: 30px;
}

.btn-list{
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  margin-top: 50px;
  margin-right: 0;
  button{
    border-radius: 8px;
    font-size: 16px;
    width: 96px;
    height: 46px;
  }
  .btn-cancle{
    background: #FFFFFF;
    border: 1px solid rgba(80, 90, 105, 0.2);

  }
}

/deep/ .dialog-bottom-top-line{
  height: 0;
}


/deep/ .searchOrm .el-input--medium .el-input__inner {
  line-height: 36px;
  border: 1px solid #ddd;
  border-radius: 5px;
}
.btn-xmxz{
  width: 160px;
  height: 46px;
  background: #1989FA;
  border-radius: 8px;
  color: #FFFFFF;
  font-size: 16px;
}
.btn-fscl{
  width: 160px;
  height: 46px;
  border-radius: 8px;
  background: #FFFFFF;
  border: 1px solid #1989FA;
  font-size: 16px;
  border-radius: 5px;
  color: #1989FA;
  span{
    color: #1989FA;
    font-weight: bold;
  }
}

/deep/ .el-table th.is-leaf, /deep/ .el-table td {
  border-bottom: 0px solid #dfe6ec;
}
/deep/ .el-table .el-table__header-wrapper th{
  background: #FFFFFF !important;
  font-size: 16px;
}
/deep/ .title-top{
  background: #f3f9ff;
  color: #1989FA;
}
/deep/.el-radio__inner {
  border: 1px solid #ccc;
  margin-left: 15px;
}

/deep/ .el-table__body tr,
/deep/ .el-table__body td {
  padding: 0;
  height: 30px;
  font-size: 16px;
  color: #505A69 !important;
}
/deep/.el-table::before {
  left: 0;
  bottom: 0;
  width: 100%;
  height: 0px;
}

/deep/ .el-radio{
  display: flex;
  justify-content: center;
}
::v-deep .el-pagination span:not([class*=suffix]){
  height: initial !important;
}


.content-cls{
  display: flex;
  flex-direction: column;
  padding: 25px;
  background-color: white;
  height: 500px;
  .content-title{
    display: flex;
    flex-direction: column;
    width: 100%;
    >span:first-child{
      font-size: 20px;
      display: flex;
      justify-content: center;
    }
    >span:last-child{
      width: 100%;
      //margin: 20px 20px;
      margin-top: 20px;
      margin-bottom: 20px;
      height: 1px;
      background-color: #ccc;
    }
  }
  .ck-list{
    display: flex;
    flex-direction: column;
    max-height: 400px;
    overflow-y: auto;

    /deep/ .el-checkbox{
      height: 35px;
      line-height: 35px;
      font-size: 18px !important;
    }
  }
}
::-webkit-scrollbar {
  display: none; /* Chrome Safari */
}
</style>
