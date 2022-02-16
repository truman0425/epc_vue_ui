<template>
  <div class="app-container app-container-person">
    <div class="page-header mb8">
      <div class="header-left" style="color: #555555;font-size: 20px;"><i class="el-icon-user"></i><span>人员档案</span></div>
      <div class="header-right">
        <el-button
          type="primary"
          icon="el-icon-edit"
          size="mini"
          @click="handleUpdate()"
        >修改</el-button>
        <el-button
          icon="el-icon-back"
          size="mini"
          @click="back"
        >返回</el-button>
      </div>
    </div>
    <el-row :gutter="20" class="person-box" id="person-box">
      <el-col :span="5" :xs="24" class="left">
        <div class="title"><span>头像</span></div>
        <div>
          <div class="text-center">
            <userAvatar ref="userAvatar" @onUploadAvatar="onUploadAvatar"/>
          </div>
          <div class="btn" style="text-align: center;">
            <el-row type="flex" justify="center" style="width:120px;margin:0 auto;margin-bottom: 10px;">
              <el-button @click="editCropper" size="small" round style="width:120px;">上传头像</el-button>
            </el-row >
            <el-row type="flex" justify="center" style="width:120px;margin:0 auto;margin-bottom: 10px;">
              <el-button size="small" @click="handleResetPwd" round style="width:120px;">修改密码</el-button>
            </el-row>
          </div>
        </div>
      </el-col>
      <el-col :span="19" :xs="24" class="right" style="padding: 10px 80px;">
        <el-form ref="user" :model="user"  :rules="rules" label-width="80px" label-position="top">
          <el-row  :gutter="20">
            <el-col :span="12">
              <!--<label>姓名</label>
              <el-input v-model="user.nickName" placeholder=""/>-->
              <el-form-item label="姓名" prop="nickName">
                <el-input v-model="user.nickName" placeholder="请输入用户姓名"/>
              </el-form-item>
            </el-col>
            <el-col :span="12">
             <!-- <label>性别</label>
              <el-input v-model="user.sex"/>-->
              <el-form-item label="性别">
                <el-radio-group v-model="user.sex">
                  <el-radio
                    v-for="dict in sexOptions"
                    :key="dict.dictValue"
                    :label="dict.dictValue"
                    style="float:left;"
                  >{{dict.dictLabel}}
                  </el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row  :gutter="20">
            <el-col :span="12">
             <!-- <label>手机号</label>
              <el-input v-model="user.phonenumber" placeholder=""/>-->
              <el-form-item label="手机号码" prop="phonenumber">
                <el-input v-model="user.phonenumber" placeholder="请输入手机号码" maxlength="11"/>
              </el-form-item>
            </el-col>
            <el-col :span="12">
             <!-- <label>人员编码</label>
              <el-input v-model="user.userId"/>-->
             <!-- <el-form-item label="人员编码" prop="userId">
                <el-input v-model="user.userId" placeholder="请输入人员编码" maxlength="11" disabled/>
              </el-form-item>-->
              <el-form-item label="职务">
                <el-select v-model="user.postIds" filterable clearable multiple placeholder="请选择" style="width:100%;">
                  <el-option
                    v-for="item in postIdsOptions"
                    :key="item.postId"
                    :label="item.postName"
                    :value="item.postId"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row  :gutter="20">
            <el-col :span="12">
              <!--<label>电子邮箱</label>
              <el-input v-model="user.email" placeholder=""/>-->
              <el-form-item label="电子邮箱" prop="email">
                <el-input v-model="user.email" placeholder="请输入电子邮箱" maxlength="50"/>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <!--<label>所属部门</label>
              <el-input v-model="user.dept.deptName" />-->
              <el-form-item label="所属部门" prop="deptId"><!--readonly-->
                <Treeselect v-model="user.deptId" :options="deptOptions" placeholder="请选择所属部门"/>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row :gutter="20">
            <el-col :span="24">
              <el-form-item label="角色">
                <el-select v-model="user.roleIds" filterable clearable multiple placeholder="请选择" style="width:100%;">
                  <el-option
                    v-for="item in roleOptions"
                    :key="item.roleId"
                    :label="item.roleName"
                    :value="item.roleId"
                  ></el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row  :gutter="20">
            <el-col :span="24">
              <!--<label>分管部门</label>
              <el-input placeholder=""/>-->
              <el-form-item label="分管部门" readonly>
                <treeselect :options="deptOptions" placeholder="请选择分管部门"/>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row  :gutter="20">
            <el-col :span="24">
             <!-- <label>数据权限</label>
              <el-input placeholder=""/>-->
              <el-form-item label="数据权限" readonly>
                <el-input placeholder="请输入数据权限" maxlength="50"/>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row  :gutter="20">
            <el-col :span="24">
              <!--<label>个人所属项目</label>
              <el-input placeholder=""/>-->
              <el-form-item label="个人所属项目" readonly>
                <el-input placeholder="请输入个人所属项目" maxlength="50"/>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row  :gutter="20">
            <el-col :span="12">
             <!-- <label>入职时间</label>
              <el-date-picker
                type="date"
                placeholder="选择日期">
              </el-date-picker>-->
              <el-form-item label="入职时间">
                <el-date-picker
                  v-model="user.entryTime"
                  type="date"
                  placeholder="选择日期">
                </el-date-picker>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <!--<label>人员状态</label>
              <el-input placeholder=""/>-->
              <el-form-item label="人员状态">
                <el-radio-group v-model="user.status">
                  <el-radio
                    v-for="dict in statusOptions"
                    :key="dict.dictValue"
                    :label="dict.dictValue"
                    style="float:left;"
                  >{{dict.dictLabel}}
                  </el-radio>
                </el-radio-group>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import {
    listUser,
    getUser,
    getUserDetailInfo,
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
    getUserProfile,
    editUser
  } from "@/api/system/user";
  import {listDept, getDept, delDept, addDept, updateDept} from "@/api/system/dept";
  import userAvatar from "../profile/userAvatar";
  import {getToken} from "@/utils/auth";
  import {treeselect} from "@/api/system/dept";
  import Treeselect from "@riophae/vue-treeselect";
  import "@riophae/vue-treeselect/dist/vue-treeselect.css";

  /*import userInfo from "./userInfo";
  import resetPwd from "./resetPwd";
  import {getUserProfile} from "@/api/system/user";*/

  export default {
    name: "Personnel",
    components: {userAvatar,Treeselect},
    data() {
      return {
        rules: {
          userName: [
            {required: true, message: "用户名称不能为空", trigger: "blur"}
          ],
          nickName: [
            {required: true, message: "用户姓名不能为空", trigger: "blur"}
          ],
          deptId: [
            {required: true, message: "所属部门不能为空", trigger: "blur"}
          ],
          password: [
            {required: true, message: "用户密码不能为空", trigger: "blur"}
          ],
          email: [
            // {required: true, message: "邮箱地址不能为空", trigger: "blur"},
            // {
            //   type: "email",
            //   message: "'请输入正确的邮箱地址",
            //   trigger: ["blur", "change"]
            // }
          ],
          phonenumber: [
            {required: true, message: "手机号码不能为空", trigger: "blur"},
            {
              pattern: /^1[3|4|5|6|7|8|9][0-9]\d{8}$/,
              message: "请输入正确的手机号码",
              trigger: "blur"
            }
          ],
          parentId: [
            {required: true, message: "上级部门不能为空", trigger: "blur"}
          ],
          deptName: [
            {required: true, message: "部门名称不能为空", trigger: "blur"}
          ],
          orderNum: [
            {required: true, message: "菜单顺序不能为空", trigger: "blur"}
          ],
          phone: [
            {
              pattern: /^1[3|4|5|6|7|8|9][0-9]\d{8}$/,
              message: "请输入正确的手机号码",
              trigger: "blur"
            }
          ]
        },
       // user: this.$route.query.personObj,
        queryId:this.$route.query.userId,
        user:{
          dept:{
            deptId:'',
          }
        },
        // 性别状态字典
        sexOptions: [],
        // 部门树选项
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
        //部门相关
        defaultProps: {
          children: "children",
          label: "label"
        },
        deptOptions: undefined,
        // 角色选项
        roleOptions: [],
        //岗位
        postIdsOptions:[],
        // 状态数据字典
        statusOptions: [],
        /*roleGroup: {},
        postGroup: {},
        activeTab: "userinfo"*/
      };
    },
    created() {
      //this.queryId = this.$route.query.userId;
      //获取详情以及角色、岗位列表
      this.getUserDetailInfo(this.queryId);
      //this.getUser();
      this.getTreeselect();
      this.getRoleList();
      this.getDicts("sys_user_sex").then(response => {
        this.sexOptions = response.data;
      });
      this.getDicts("sys_normal_disable").then(response => {
        this.statusOptions = response.data;
      });
    },
    methods: {
      onUploadAvatar(avatar){
        this.$set(this.user,'avatar',avatar)
      },
      editCropper(){
        this.$refs.userAvatar.editCropper()
      },
      //获取用户详情
      getUserDetailInfo(queryId){
        if(queryId){
          getUserDetailInfo(queryId).then(response => {
            let mydata = response.data;
            this.user = mydata;
            this.user.roleIds = response.roleIds;
            this.user.postIds =  response.postIds;
            this.roleOptions  =  response.roles;
            this.postIdsOptions =  response.posts;
            this.$refs.userAvatar.setUserImg(this.user.avatar)
            console.log("查询用户详情数据:"+JSON.stringify(  this.user));
          });
        }else{
          this.msgError("该用户不存在!");
        }

      },
      /** 查询部门下拉树结构 */
      getTreeselect() {
        treeselect().then(response => {

          if (!this.deptOptions && response.data.length > 0) {
            this.queryParams.deptName = response.data[0].label;
            this.queryParams.deptId = response.data[0].id;
          }
          this.deptOptions = response.data;
        });
      },
      /*getUser() {
        getUserProfile().then(response => {
          this.user = response.data;
          this.roleGroup = response.roleGroup;
          this.postGroup = response.postGroup;
        });
        getUser().then(response => {
          this.roleOptions = response.roles;
        });
      },*/
      //查询角色
      /** 获取角色列表*/
      getRoleList() {
        typeRole().then(
          response => {
            this.scopeList = response.data;
            this.scopeListFilter = [...this.scopeList];
          }
        );
      },
      //修改
      handleUpdate(){
        let param = {};
        param = this.user;
        console.log("提交用户编辑参数:"+JSON.stringify(param));
        this.$refs.user.validate(valid=>{
          if(valid){
            editUser(param).then(response => {
              let msg = response.msg;
              this.msgSuccess(msg);
            })/*.catch(response => {
                let msg = response.msg;
                this.msgError(msg);
              })*/;
          }
        })

      },
      handleResetPwd() {
        let _self = this;
        this.$prompt('请输入"' + _self.user.userName + '"的新密码', "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消"
        }).then(({value}) => {
          resetUserPwd(_self.user.userId, value).then(response => {
            if (response.code === 200) {
              this.msgSuccess("修改成功，新密码是：" + value);
            } else {
              this.msgError(response.msg);
            }
          });
        }).catch(() => {
        });
      },
      back(){
        if (this.$route.query.noGoBack) {
          this.$router.push({ path: '/' })
        } else {
          this.$router.go(-1)
        }
        this.$store.dispatch('tagsView/delView', this.$route)
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
    }
  };
</script>
<style lang="scss" scoped>
  .info {
    padding: 20px 30px 20px 10px;
    border-right: 1px solid #eee;

    & /deep/ .svg-icon {
      color: #888;
      margin-right: 15px;
    }

    .pull-right {
      color: #303133;
    }
  }
  .app-container-person{
    .page-header{
      height: 46px;
      line-height: 42px;
      border-bottom: 1px solid #eee;
    }
    .header-left,.header-right{
      display: inline-block;
    }
    .header-left span{
      padding-left: 10px;
    }
    .header-right{
      float: right;
    }
  }
  .person-box{
    .left{

      .title{
        padding: 40px 0 10px;
        text-align: center;
      }
      .btn{
        padding: 10px;
      }
      .el-row{
        /*margin-bottom: 10px;*/
      }
    }
    .right{
      border-left: 1px solid #eee;
      .el-row{
        margin-bottom: 10px;
      }
      .el-date-editor{
        width: 100%;
      }
      label{
        display: block;
        padding: 10px 0;
        font-weight: normal;
        font-size: 14px;
      }
    }
    .el-form-item{
      margin-bottom: 0px !important;
      padding: 0 40px;
    }
  }
  /deep/ .el-input__inner{
    background-color:#F5F7FA !important;
  }
  /deep/ .el-tag.el-tag--info{
    background-color: #F0F2F5;
  }
  /deep/ .vue-treeselect__control{
    background-color:#F5F7FA !important;
  }
  /deep/ .el-form--label-top .el-form-item__label{
    padding:0px !important;
  }
</style>
