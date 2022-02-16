//导入后台接口
import $ from 'jquery'
import OrganizationChartNode from './OrganizationChartNode.vue'

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
import {getorganzation,addOrganization,getAddInfo,uploadOrganization,deleteOrganization,getOrganizationDetailById,addOrganizationUser,editOrganizationUser,editOrganizationUserList,copyOrganize} from '@/api/projectPlanning/projectRegistration'
import {getView} from '@/api/projectPlanning/projectRegistration'
import {getAllPositionList} from '@/api/system/position'
import ElButton from "../../../../node_modules/element-ui/packages/button/src/button.vue";

export default {
  handleClick (nodeData) {
    this.$emit('node-click', nodeData);
  },
  panEndHandler () {
    this.panning = false
    this.cursorVal = 'default'
  },
  panHandler (e) {
    let newX = 0
    let newY = 0
    if (!e.targetTouches) { // pand on desktop
      newX = e.pageX - this.startX
      newY = e.pageY - this.startY
    } else if (e.targetTouches.length === 1) { // pan on mobile device
      newX = e.targetTouches[0].pageX - this.startX
      newY = e.targetTouches[0].pageY - this.startY
    } else if (e.targetTouches.length > 1) {
      return;
    }
    if (this.transformVal === '') {
      if (this.transformVal.indexOf('3d') === -1) {
        this.transformVal = 'matrix(1,0,0,1,' + newX + ',' + newY + ')'
      } else {
        this.transformVal = 'matrix3d(1,0,0,0,0,1,0,0,0,0,1,0,' + newX + ', ' + newY + ',0,1)'
      }
    } else {
      let matrix = this.transformVal.split(',')
      if (this.transformVal.indexOf('3d') === -1) {
        matrix[4] = newX
        matrix[5] = newY + ')'
      } else {
        matrix[12] = newX
        matrix[13] = newY
      }
      this.transformVal = matrix.join(',')
    }
  },
  panStartHandler (e) {
    if ($(e.target).closest('.node').length) {
      this.panning = false
      return
    } else {
      this.cursorVal = 'move'
      this.panning = true
    }
    let lastX = 0
    let lastY = 0
    if (this.transformVal !== '') {
      let matrix = this.transformVal.split(',')
      if (this.transformVal.indexOf('3d') === -1) {
        lastX = parseInt(matrix[4])
        lastY = parseInt(matrix[5])
      } else {
        lastX = parseInt(matrix[12])
        lastY = parseInt(matrix[13])
      }
    }
    if (!e.targetTouches) { // pand on desktop
      this.startX = e.pageX - lastX
      this.startY = e.pageY - lastY
    } else if (e.targetTouches.length === 1) { // pan on mobile device
      this.startX = e.targetTouches[0].pageX - lastX
      this.startY = e.targetTouches[0].pageY - lastY
    } else if (e.targetTouches.length > 1) {
      return
    }
  },
  setChartScale (newScale) {
    let matrix = ''
    let targetScale = 1
    if (this.transformVal === '') {
      this.transformVal = 'matrix(' + newScale + ', 0, 0, ' + newScale + ', 0, 0)'
    } else {
      matrix = this.transformVal.split(',')
      if (this.transformVal.indexOf('3d') === -1) {
        targetScale = Math.abs(window.parseFloat(matrix[3]) * newScale)
        if (targetScale > this.zoomoutLimit && targetScale < this.zoominLimit) {
          matrix[0] = 'matrix(' + targetScale
          matrix[3] = targetScale
          this.transformVal = matrix.join(',')
        }
      } else {
        targetScale = Math.abs(window.parseFloat(matrix[5]) * newScale)
        if (targetScale > this.zoomoutLimit && targetScale < this.zoominLimit) {
          matrix[0] = 'matrix3d(' + targetScale
          matrix[5] = targetScale
          this.transformVal = matrix.join(',')
        }
      }
    }
  },
  zoomHandler (e) {
    let newScale  = 1 + (e.deltaY > 0 ? -0.2 : 0.2)
    this.setChartScale(newScale)
  },

  /*组织架构more 菜单展示*/
  //添加父节点
  handleAddFnode(data){
    this.open2 = true;
    this.title2 = "插入父节点";
    this.curNodeType = 1;
    this.form.parentId=data.parentId;
    if(this.datasource.organizationUserList) {
      this.form.organizationUserList = JSON.parse(JSON.stringify(this.datasource.organizationUserList));
      this.index1 = this.datasource.organizationUserList.length;
      for (let i = 0; i < this.form.organizationUserList.length; i++) {
        this.form.organizationUserList[i]["index"] = i + 1;
      }
    }
    this.initUser();
  },
  //添加子节点
  handleAddSnode(data){

    this.open2 = true;
    this.title2 = "插入子节点";
    this.curNodeType = 2;
    let organzationIds = data.organzationId;
    getOrganizationDetailById(organzationIds).then(response => {
      this.form = response.data.organization;
      this.positionOptions = response.data.positionList;
      //写死固定节点类型
      this.form.organzationType='subcontract';
      this.form.parentId=this.form.organzationId;
      //this.form.organzationId="";
      this.form.organzationName="";
      this.form.organizationUserList="";
      this.form.organzationId = undefined;
      if(this.form.organizationUserList){
        this.index1 = this.form.organizationUserList.length;
        for(let i=0;i<this.form.organizationUserList.length;i++){
          this.form.organizationUserList[i].index = i+1;
          if( this.form.organizationUserList[i].isSystemUser=='1'){//内部员工


          }else{//外部员工

          }

        }

      }else{
        this.form.organizationUserList=[];
      }
    })
    this.initUser();
  },
  //编辑节点
  handleUpdateNode(data){
    this.open2 = true;
    this.title2 = "子节点编辑";
    this.curNodeType = 3;
    let organzationIds = data.organzationId;
    getOrganizationDetailById(organzationIds).then(response => {
      this.form = response.data.organization;
      this.positionOptions = response.data.positionList;
      if(this.form.organizationUserList){
        this.index1 = this.form.organizationUserList.length;
        for(let i=0;i<this.form.organizationUserList.length;i++){
          this.form.organizationUserList[i].index = i+1;
          if( this.form.organizationUserList[i].isSystemUser=='1'){//内部员工
            //this.form.organizationUserList[i]["isSystemUser"] = 1;

          }else{//外部员工
            //this.form.organizationUserList[i]["isSystemUser"] = 0;
          }

        }

      }else{
        this.form.organizationUserList=[];
      }

      //console.log("获取编辑的节点信息："+JSON.stringify(this.form));
    })
  },
  //重置用户信息数据
  initUser(){
    this.queryParams={
      pageNum: 1,
      pageSize: 10,
    };
    this.handleQuery();
  },
  /*添加外部人员*/
  hangdleAddPerson(){
    this.index1 = parseInt(this.index1+1);
    let addObj={};
      addObj=JSON.parse(JSON.stringify(this.form));
      addObj["index"]=this.index1;
      addObj["isSystemUser"]="0";
      addObj["userId"]="";
      addObj["organUserId"]="";
      addObj["organUserName"]="";
      addObj["organUserTel"]="";
      addObj["organUserEmail"]="";
      addObj["positionId"]="";
      addObj["userRate"]="";
    this.form.organizationUserList.push(addObj);
    //console.log("添加外部人员的数据："+JSON.stringify( this.form.organizationUserList));
  },
  //添加内部外部人员，0添加页面1选择内部人员2选择外部人员
  hangdleEditPerson(){
    this.title3 = "选择内部人员";
    this.existIds = [];
    for(let i=0;i<this.form.organizationUserList.length;i++){
      if(this.form.organizationUserList[i].isSystemUser == '0'){

      }else{
        this.existIds.push(this.form.organizationUserList[i].userId);
      }
    }
    this.addPerson = true;
    this.initUser();
  },
  /*删除*/
  handleDeletePerson(data){
    for(let i=0;i<this.form.organizationUserList.length;i++){
      if(data){
        if(this.form.organizationUserList[i].index == data.index){
          this.form.organizationUserList.splice(i,1);
        }else{

        }
      }else{
        if(this.form.organizationUserList[i].id==data.id){
          this.form.organizationUserList.splice(i,1);
        }
      }
    }

  },
  //提交添加子节点
  submitForm(){
    //console.log("提交保存的form表单："+JSON.stringify(this.form));
    let isComplete = true;
    let notCompleteMsg = '';
    this.$refs["form"].validate(valid => {
      if (valid) {
        //添加的用户数据不能为控
        if(this.form.organizationUserList && this.form.organizationUserList.length > 0){
            for(let i=0;i<this.form.organizationUserList.length;i++){
                  if(this.form.organizationUserList[i].organUserName==null || this.form.organizationUserList[i].organUserTel==null || this.form.organizationUserList[i].organUserEmail==null || this.form.organizationUserList[i].userRate==null){
                    isComplete = false;
                    notCompleteMsg="请将邀请的人员信息补充完整";
                    break;
                  }
            }
        }else{
          isComplete = true;
        }
        if(isComplete){
          if(this.curNodeType==1){
            //新增父节点
            addOrganization(this.form).then(response => {
            })
          }else if(this.curNodeType==2){
            //新增子节点
            //保存一：保存节点信息
            let params1 = {};
            params1 = this.form;
            //console.log("提交编辑的子节点的参数："+JSON.stringify(params1));
            getAddInfo().then(response => {
                //获取保存子节点数据
              let organizationId = response.data.organzationId;
              //保存一：保存节点信息
              let params1 = {};
             // this.form.organizationId = organizationId;
              params1 = JSON.parse(JSON.stringify(this.form));
              params1.organzationId = organizationId;
              //params1.organizationUserList = this.form.organizationUserList;
              for(let i=0;i< params1.organizationUserList.length;i++){
                params1.organizationUserList[i]["organzationId"] = organizationId;
              }
              //console.log("提交编辑的子节点的参数："+JSON.stringify(params1));
              addOrganization(params1).then(response => {
                this.refershDatasource();
              })


            })


          }else if(this.curNodeType==3){
            //编辑保存
            //保存一：保存节点信息
            let params1 = {};
            params1 = this.form;
            params1.organizationUserList=this.form.organizationUserList;
            //console.log("提交编辑的子节点的参数："+JSON.stringify(params1));
            uploadOrganization(params1).then(response => {
              this.refershDatasource();

            })

          }

          this.open2 = false;
        }else{
          this.msgWarning(notCompleteMsg);
        }

        /*if (this.form.positionId != undefined) {
          this.form.menuIds = this.getMenuAllCheckedKeys();
          updatePosition(this.form).then(response => {
            if (response.code === 200) {
              this.msgSuccess("修改成功");
              this.open = false;
            }
          });
        } else {
          this.form.menuIds = this.getMenuAllCheckedKeys();
          addPosition(this.form).then(response => {
            if (response.code === 200) {
              this.msgSuccess("新增成功");
              this.open = false;
            }
          });
        }*/
      }
    });
  },
  // 取消按钮添加子节点
  cancel() {
    this.open2 = false;
  },
  /*子节点编辑页面提交和取消*/
  //提交子节点编辑页面
  submitForm2(){
    //获取选中的用户数据
    //console.log(JSON.stringify(this.selectedItem));
    let selectUserList = this.selectedItem;

    for(let i=0;i<selectUserList.length;i++){
        let obj = {};
        this.index1 += i+1;
        //obj = selectUserList[i];
        obj=JSON.parse(JSON.stringify(this.form));
        obj["index"] = this.index1;
        obj["isSystemUser"] = "1";
        obj["positionId"] = selectUserList[i].postIds;
        obj["userId"] = selectUserList[i].userId;
        obj["organUserName"] = selectUserList[i].nickName;
        obj["organUserTel"] = selectUserList[i].phonenumber;
        obj["organUserEmail"] = selectUserList[i].email;
        obj["positionId"] = selectUserList[i].positionId;
        obj["organizationUserList"] = undefined;
       // obj["userRate"] = "";
      this.form.organizationUserList.push(obj);
    }

    //console.log("添加内部人员数据："+JSON.stringify(this.form.organizationUserList));
    //this.initUser();
    this.addPerson = false;
  },
  //取消子节点编辑页面
  cancel2() {
    //this.open2 = false;
    this.addPerson = false;
  },

  handleCopyNode(data){
    let organzationIds = data.organzationId;
    copyOrganize(organzationIds).then(response => {
       this.msgSuccess("复制成功");
       //刷新页面
      this.refershDatasource();
    })
  },
  handleDeleteNode(data){
    //刷新组织架构数据
    let organzationId = data.organzationId;
     this.$confirm('是否确认删除节点名称为"' + data.organzationName + '"的数据项?', "警告", {
       confirmButtonText: "确定",
       cancelButtonText: "取消",
       type: "warning"
     }).then(function() {
       return deleteOrganization(organzationId);
     }).then(() => {
       //刷新页面
       this.refershDatasource();
        this.msgSuccess("删除成功");
     }).catch(function() {});
  },
  //返回到编辑子节点
  returnEditNode(){
    this.addPerson = false;
  },
  //查询用户列表
  getList(){
    this.loading = true;
    this.queryParams["existIds"]= this.existIds.join(",");
    listUser(this.queryParams).then(response => {
        this.userList = response.rows;
        this.total = response.total;
        this.loading = false;
      }
    );
  },
  //多选人员
  handleSelectionChange(selection) {
    this.ids = selection.map(item => item.userId);
    this.selectedItem = selection.map(item => item);

  },
  //查询用户表数据
  handleQuery(){
    this.queryParams.page = 1;
    this.getList();
  },
  //查询所有的岗位
  getAllPositionList(){
    getAllPositionList().then(response => {
      let mydata = response.data;
      let arr = [];
      for(let i=0;i<mydata.length;i++){
        let obj = {};
        obj["dictLabel"] = mydata[i].positionName;
        obj["dictValue"] = mydata[i].positionId;
        arr.push(obj);
      }
      this.positionOptions = arr;
    })
  },
  refershDatasource(){
    this.refer = true;
      //刷新页面
    this.$emit('isrefer',this.refer);


    this.loading = true;
    let id = this.queryId;
    if(id=="" || id==null){
      this.msgWarning("该项目不存在");
    }else{
      let params = {};
      params["projectId"]=id;

      getView(id).then((response)=>{
        this.queryId = response.epcproject.projectSid;
        //增加一个顶级父节点
        let parentNode = {};
        parentNode["dataScope"]=null;
        parentNode["delFlag"]="0";
        parentNode["leader"]=null;
        parentNode["orderNum"]=0;
        parentNode["organzationId"]=null;
        parentNode["organzationName"]=response.epcproject.projectName;
        parentNode["params"]={};
        parentNode["parentId"]=null;
        parentNode["projectId"]='0';
        parentNode["nodeType"]='0';//0父节点1业主2监理
        getorganzation(params).then((res)=>{
          //把所有的数据归到当前项目下(项目作为所有组织架构的父节点)
          let parentChildren=[];
          //组织架构
          let organTree = res.data.organTree;
          //业主
          let ownerNode = res.data.ownerNode;
          ownerNode["nodeType"]='1';
          //监理
          let supervisorNode = res.data.supervisorNode;
          supervisorNode["nodeType"]='2';
          parentChildren.push(ownerNode);
          parentChildren.push(supervisorNode);

          if(organTree){
            for(let i=0;i<organTree.length;i++){
              parentChildren.push(organTree[i]);
            }
          }
          parentNode["children"]=parentChildren;
          this.$nextTick(function () {
              this.orgTree = parentNode;
            }.bind(this));

          //console.log("获取刷新后的组织树结构:"+JSON.stringify(this.orgTree));
        }).catch((res)=>{
          parentNode["children"]=[];
          this.orgTree = parentNode;
        })

      });

    }
  },
  isrefer(data){
    //alert("执行获取子组件刷新消息");
    this.$emit('isrefer',data);
    //console.log("子组件获取到子组件的值："+data);
  },
  exportFunc(data){
    this.$refs.test.export("测试", "png");
  },
  mountOrgchart() {
    this.$children.forEach((item) => {
      item.orgchart !== undefined ? this.orgchart = item.orgchart : null
    })
  },
}
