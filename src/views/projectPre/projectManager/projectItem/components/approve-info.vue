<template>
  <!--审批信息-->
  <div class="approve-main" >
    <div class="approve-title">
      <span>审批流程</span>
    </div>

    <el-row>
      <el-col :span="12">
        <div class="approve-content left-form">
          <div class="approve-top">
            <i class="el-icon-tickets"></i>
            <span>审批</span>
          </div>
          <div  class="approve-form">
            <el-form ref="form" :model="form" label-width="120px" :rules="rules">
              <el-row :gutter="20">
                <el-col :span="24">
                  <el-form-item label="审批操作" prop="orgName">
                    <el-select @change="approveChange" v-model="form.approveAction" placeholder="请选择" style="width: 100%">
                      <el-option
                        v-for="item in approveAction"
                        :key="item.dictValue"
                        :disabled="nodeDetail.isAllowTurnDown == '0' && item.dictValue == '1'"
                        :label="item.dictLabel"
                        :value="item.dictValue">
                      </el-option>
                    </el-select>
                  </el-form-item>
                </el-col>
              </el-row>
              <div v-show="form.approveAction == 0">

                <el-row v-if="nodeDetail.nextIsMoreLine == true && nodeDetail.currentIsEnd == true && nodeDetail.nextIsEnd == false">
                  <el-col :span="24">
                    <el-form-item
                      label="选择下一步线路"  prop="selProcessName">
                      <el-select @change="selMoreLineClick" style="width:100%" v-model="form.selectApplyLineId" placeholder="请选择">
                        <el-option
                          v-for="item in selMoreLineDatas"
                          :key="item.id"
                          :label="item.nodeName"
                          :value="item.nodeId">
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                </el-row>

                <el-row :gutter="20">
                  <el-col :span="24">
                    <el-form-item
                      v-if=" selectPeoPleInfo.allowSelectUser == false"
                       label="下一步审批人"   prop="subjectType">

                      <el-input :disabled="true" v-model="form.userName"></el-input>
                    </el-form-item>

                    <!--  指派审批人单选的情况下  -->
                    <el-form-item
                      v-if="selectPeoPleInfo.allowSelectMore == false && selectPeoPleInfo.allowSelectUser == true"
                        label="下一步审批人"   prop="subjectType">

                      <el-select @change="selUserInfoClick" style="width:100%" v-model="form.selectAppPeople" placeholder="请选择">
                        <el-option
                          v-for="item in userInfoOptions"
                          :key="item.id"
                          :label="item.nickName"
                          :value="item.userId">
                        </el-option>
                      </el-select>
                    </el-form-item>

                    <!--  指派审批人多选的情况下  -->
                    <el-form-item
                      v-if="selectPeoPleInfo.allowSelectMore == true && selectPeoPleInfo.allowSelectUser == true"
                        label="下一步审批人"  prop="subjectType">

                      <el-select @change="selUserInfoClick" multiple style="width: 100%" v-model="form.selectAppPeoples" placeholder="请选择">
                        <el-option
                          v-for="item in userInfoOptions"
                          :key="item.id"
                          :label="item.nickName"
                          :value="item.userId">
                        </el-option>
                      </el-select>
                    </el-form-item>

                  </el-col>
                </el-row>
              </div>
              <div v-show="form.approveAction == 1">
                <el-row :gutter="20">
                  <el-col :span="24">
                    <el-form-item label="驳回指定人" prop="orgName">
                      <el-radio-group v-model="form.state">
                        <el-radio :disabled="nodeDetail.isAllowTurnOriginator == '0'" label="3">发起人</el-radio>
                        <el-radio :disabled="nodeDetail.isAllowTurnPrevious == '0'" label="2">上一步审批人</el-radio>
                      </el-radio-group>
                    </el-form-item>
                  </el-col>
                </el-row>

              </div>
              <div v-show="form.approveAction == 3">
                <el-row :gutter="20">
                  <el-col :span="24">
                    <el-form-item label="指派审批人" prop="orgName">
                      <el-input class="suffix-inner"
                                v-model="form.assigneeOrRoleName"
                                placeholder="请选择任务负责人"
                                readonly
                                @click.native="inputSelectUser(1)"
                                suffix-icon="el-icon-plus"/>
                    </el-form-item>
                  </el-col>
                </el-row>

              </div>


              <!-- 新添加的 2022/01/13 开始-->
              <el-row :gutter="20" v-if="selectPeoPleInfo.allowCCSelectUser == true" >
                <el-col :span="24">
                  <el-form-item label="固定抄送人" prop="contractCode">
                    <div class="tag-cls tag-stl">
                      <el-tag
                        v-for="tag in gdUserTags"
                        :key="tag.name"
                        closable
                        @close="handleClose(tag)"
                        :type="tag.type">
                        {{tag.name}}
                      </el-tag>
                      <i class="el-icon-plus" @click="addCsUser" ></i>
                    </div>
                  </el-form-item>
                </el-col>
              </el-row>
              <!-- 新添加的 2022/01/13 结束-->

              <el-row :gutter="20">
                <el-col :span="24">
                  <el-form-item label="审批意见" prop="orgName">
                    <el-input  type="textarea"
                               v-model="form.description"
                               :rows="5"
                    />
                  </el-form-item>
                </el-col>
              </el-row>


            </el-form>
          </div>

          <div class="approve-form-bottom">
            <div v-loading="loadingCommit" class="commit-btn" @click="approveCommit">
              <span>提交</span>
            </div>
          </div>

        </div>
      </el-col>
      <el-col :span="12">
        <div class="approve-content">
          <div class="approve-top approve-right">
            <div>
              <i class="el-icon-tickets"></i>
              <span>审批记录</span>
            </div>
            <div @click="lookFlow">
              <span class="look-flow">查看流程监控</span>
            </div>
          </div>

          <!--审批流程-->
          <div class="scrollTab">
            <div class="approve-flow">

              <template v-for="item in subjectDatas">
                <div class="flow-item">

                  <div class="flow-item-top">
                    <div>
                      <i class="el-icon-success" :style="{'color':item.handlingTime?'#1989fa':'#505a69'}"></i>
                      <span>{{item.handlingTime ?'上一审批节点：':'当前审批节点：'}}</span>
                      <span>{{ item.nodeName }}</span>
                    </div>
                    <span>{{ item.handlingTime }}</span>
                  </div>

                  <div class="flow-item-content">
                    <div class="vertical_dotted_line"></div>
                    <el-image class="user-img" :src="require('@/assets/image/projectPre/temp_user_gj_logo.png')"></el-image>

                    <el-tooltip class="item" effect="dark" :content="item.handlerName" placement="top">
                      <span>{{ !item.handlerName?'':item.handlerName.length>4?item.handlerName.substring(0,3)+'..':item.handlerName }}</span>
                    </el-tooltip>

                    <div class="flow-sugess">
                      <span>审批意见：</span>
                      <span>{{ item.description }}({{item.resultsApproval}})</span>
                    </div>
                  </div>
                </div>
              </template>


              <!--            <div class="flow-item">-->

              <!--              <div class="flow-item-top">-->
              <!--                <div>-->
              <!--                  <i class="el-icon-success"></i>-->
              <!--                  <span>上一审批人：</span>-->
              <!--                  <span>项目负责人</span>-->
              <!--                </div>-->
              <!--                <span>2021-09-08 10:12:00</span>-->
              <!--              </div>-->

              <!--              <div class="flow-item-content">-->
              <!--                <div class="vertical_dotted_line"></div>-->
              <!--                <el-image class="user-img" :src="require('@/assets/image/projectPre/temp_user_gj_logo.png')"></el-image>-->
              <!--                <span>张三</span>-->
              <!--                <div class="flow-sugess">-->
              <!--                  <span>审批意见：</span>-->
              <!--                  <span>同意同意</span>-->
              <!--                </div>-->
              <!--              </div>-->

              <!--            </div>-->

              <!--            <div class="flow-item">-->

              <!--              <div class="flow-item-top">-->
              <!--                <div>-->
              <!--                  <i class="el-icon-success"></i>-->
              <!--                  <span>上一审批人：</span>-->
              <!--                  <span>项目负责人</span>-->
              <!--                </div>-->
              <!--                <span>2021-09-08 10:12:00</span>-->
              <!--              </div>-->

              <!--&lt;!&ndash;              <div class="flow-item-content">&ndash;&gt;-->
              <!--&lt;!&ndash;                <div class="vertical_dotted_line"></div>&ndash;&gt;-->
              <!--&lt;!&ndash;                <el-image class="user-img" :src="require('@/assets/image/projectPre/temp_user_gj_logo.png')"></el-image>&ndash;&gt;-->
              <!--&lt;!&ndash;                <span>张三</span>&ndash;&gt;-->
              <!--&lt;!&ndash;                <div class="flow-sugess">&ndash;&gt;-->
              <!--&lt;!&ndash;                  <span>审批意见：</span>&ndash;&gt;-->
              <!--&lt;!&ndash;                  <span>同意同意</span>&ndash;&gt;-->
              <!--&lt;!&ndash;                </div>&ndash;&gt;-->
              <!--&lt;!&ndash;              </div>&ndash;&gt;-->

              <!--            </div>-->
            </div>
          </div>


<!--          <div class="look-more" v-show="subjectDatas && subjectDatas.length>3">-->
<!--             <div><span>查看完整审批记录</span><i class="el-icon-caret-bottom"></i></div>-->

<!--          </div>-->

        </div>
      </el-col>
    </el-row>
    <!--    选人多选 -->
    <publice-select-user @onSelectData="onSelectData" ref="selectUser"   ></publice-select-user>
    <!--    选人单选 -->
    <publice-select-user ref="selectUser2"  ></publice-select-user>

    <approve-flow ref="approveFlow"></approve-flow>

    <!--选择固定审批人多选-->
    <publice-select-user ref="selUser2" @onSelectUserList="onSelectUserList2" :is-single="false"></publice-select-user>

  </div>
</template>

<script>

import ContentPage from './content-page'

import ApproveFlow from '@/views/projectPre/projectManager/projectItem/dialog/approve-flow'

import {
  getApprovalRecord, getNodeDetail,
  getNodeList, getPassFlowTask,
  getRejectFlowTask,
  getTermination,
  getTransferFlowTask, getUserByLineId,getTodoListByBusinessId
} from '@/api/processEngine/processEngine'

export default {
  components:{ContentPage,ApproveFlow},
  props: {
    title: {
      type: String,
      default: "",
    },
    todoId:{
      type:String,
      default:''
    }
  },
  inject: {
    myPartent: {
      default: () => {
        return null
      }
    }
  },
  data() {
    return {
      form:{
        approveAction:'0'
      },
      rules: {},
      approveAction:[{
        dictValue: '0',
        dictLabel: '同意'
      },{
        dictValue: '1',
        dictLabel: '驳回'
      },{
        dictValue: '2',
        dictLabel: '终止'
      },{
        dictValue: '3',
        dictLabel: '移交'
      }],
      subjectDatas:[],
      gooflowData:{},
      todoDetailData:{},
      flowObj:null,
      loading:false,
      applyNodeDetail:{},
      nodeDetail: {},
      selMoreLineDatas: [],
      selectPeoPleInfo: {},
      userInfoOptions:[],
      dialogType:'',
      processId:'',
      loadingCommit:false,
      ccUserList:[],//新添加的 抄送给
      gdUserTags:[],
      businessId:''
    };
  },
  created() {

    this.requstNodeDetail()
  },
  mounted(){

  },
  methods: {

    approveInit(){


    },
    setBusinessId(id){
      this.businessId = id
    },
    approveChange(){
      this.$set(this.form,'description','')
    },
    selccUserInfoClick(){

    },
    lookFlow(){
      this.$refs.approveFlow.openDialog(this.subjectDatas)
    },
    setProcessId(processId,todoDetailData){
      this.todoDetailData = todoDetailData
      this.processId = processId
      this.$refs.approveFlow.setTodoDetail(todoDetailData)
      this.$refs.approveFlow.requestNodeList({processId})
    },
    approveCommit(){
      this.loadingCommit = true
      if(this.form.approveAction == 0){//同意
        this.reservationAppleEnter()
      }else if(this.form.approveAction == 1){//驳回
        this.requestRejectFlowTask()
      }else if(this.form.approveAction == 2){//终止
        this.suspendApplyEnter()
      }else if(this.form.approveAction == 3){//移交
        this.handOverApplEnter()
      }
    },
    handleClose(tag){
      this.gdUserTags = this.gdUserTags.filter(res=> res.id != tag.id)
    },
    addCsUser(){
      this.$refs.selUser2.openDialog()
    },
    inputSelectUser(type){
      if(type == 1){
        this.$refs.selectUser.openDialog()
      }else{
        this.$refs.selectUser2.openDialog()
      }
    },
    selMoreLineClick(e) {
      console.log(JSON.stringify(e) + 'asdfsdfasfdasdfas')
      this.requsetUserByLineId(e)
    },
    onSelectData(user){
      this.$set(this.form,'assigneeOrRoleName',user.nickName)
      this.$set(this.form,'assigneeOrRole',user.userId)
    },
    onSelectData2(user){
      this.form.assigneeOrRole = user.userId
      this.form.assigneeOrRoleName = user.nickName
    },
    onSelectUserList2(list){
       if(list && list.length>0){
         list.forEach(res=>{
           let user = this.gdUserTags.find(r=> r.id == res.userId)
           if(!user){
             this.gdUserTags.push({
               id:res.userId,
               name:res.nickName,
               type: 'info'})
           }
         })
       }
    },
    onSelectUserList(userList){
      var userNames = ''
      var userIds = ''
      userList.forEach((item, index) => {

        if (index < (userList.length - 1)){
          userNames = userNames + item.nickName + ','
          userIds = userIds + item.userId + ','
        }else {
          userNames = userNames + item.nickName
          userIds = userIds + item.userId
        }

      })
      // this.unApplyPeopleData.names = userNames
      // this.unApplyPeopleData.userIds = userIds

      // this.form.assigneeOrRole = that.unApplyPeopleData.userIds.split(',')[0];
      // this.form.assigneeOrRoleName =  that.unApplyPeopleData.names.split(',')[0];
    },
    //同意
    reservationAppleEnter() {

      //  判断是否是预定一审批

      var param = {}
      var that = this

      if (that.nodeDetail.isPredefinedProcess == true) {

        //  判断是否是多条路径 是
        if (that.nodeDetail.nextIsMoreLine == true) {
          param.lineFlag = this.form.selectApplyLineId
        }
        //  否
        else {
          param.lineFlag = that.nodeDetail.nextLineId
        }
        //   判断是否是可选的人员 否
        if (that.selectPeoPleInfo.allowSelectUser == false) {

          param.assigneeOrRole = that.selectPeoPleInfo.userId
          param.assigneeOrRoleName = that.selectPeoPleInfo.userName

        }

        //  否
        else {

          // 判断是单选还是多选 单选
          if (that.selectPeoPleInfo.allowSelectMore == false) {

            for (var i = 0; i < that.selectPeoPleInfo.userList.length; i++) {

              var userListItem = that.selectPeoPleInfo.userList[i]

              if (userListItem.userId == this.form.selectAppPeople) {

                param.assigneeOrRole = userListItem.userId
                param.assigneeOrRoleName = userListItem.nickName

              }

            }
          } else {

            var userNames = ''
            var userIds = ''
            this.form.selectAppPeoples && this.form.selectAppPeoples.forEach((item, index) => {

              for (var j = 0; j < that.selectPeoPleInfo.userList.length; j++) {

                var userListItem = that.selectPeoPleInfo.userList[j]

                if (userListItem.userId == item) {

                  userNames = userNames + userListItem.nickName + ','
                  userIds = userIds + userListItem.userId + ','

                }

              }

            })
            param.assigneeOrRole = userIds
            param.assigneeOrRoleName = userNames
          }
        }

      }



      //新添加的 2022/01/13 开始
      let ids = this.gdUserTags.map(res=> res.id) || []
      let names = this.gdUserTags.map(res=> res.name)||[]
      if(ids && ids.length>0){
        param.ccHumanId = ids.join(',')
        param.ccHumanName = names.join(',')
      }else{
        param.ccHumanId = ''
        param.ccHumanName = ''
      }
      //新添加的 2022/01/13 结束


      param.todoId = that.todoId

      param.description = this.form.description

      getPassFlowTask(param).then(response => {
        this.loadingCommit = false

        if (response.code == 200) {
          this.$message.success(response.msg||'审批成功')
          setTimeout(()=>{
            this.$emit('dialogEnterMethod', { 'rejectFlowTask': '审批成功' })
          },500)
        }
      }).catch(err=>{
        this.loadingCommit = false
      })
      console.log(JSON.stringify(param) + 'sdfzdsgdfhggfjhfgghfdg')

    },
    //移交
    handOverApplEnter(){
      var that = this
      this.form.todoId = this.todoId
      // this.form.assigneeOrRole = that.unApplyPeopleData.userIds.split(',')[0];
      // this.form.assigneeOrRoleName =  that.unApplyPeopleData.names.split(',')[0];
      getTransferFlowTask(this.form).then(response => {
        this.loadingCommit = false
        if (response.code == 200) {
          this.$message.success(response.msg||'移交成功')
          setTimeout(()=>{
            this.$emit('dialogEnterMethod', { 'rejectFlowTask': '移交成功' })
          },500)
        }
      }).catch(err=>{
        this.loadingCommit = false
      })
      // console.log(JSON.stringify(param) + 'sdfzdsgdfhggfjhfgghfdg')
    },
    //终止
    suspendApplyEnter(){
      this.form.todoId = this.todoId
      getTermination(this.form).then(response => {
        this.loadingCommit = false
        if (response.code == 200) {

          this.$message.success(response.msg||'终止成功')
          setTimeout(()=>{
            this.$emit('dialogEnterMethod', { 'rejectFlowTask': '终止成功' })
          },500)

          console.log(JSON.stringify(response)+"asdfsdfasdasd")
        }
      }).catch(err=>{
        this.loadingCommit = false
      })
    },
    //审批驳回
    requestRejectFlowTask() {
      debugger
      this.form.todoId = this.todoId
      var that = this
      getRejectFlowTask(this.form).then(response => {
        this.loadingCommit = false
        if (response.code == 200) {
           this.$message.success('驳回成功')
          setTimeout(()=>{
            this.$emit('dialogEnterMethod', { 'rejectFlowTask': '驳回成功' })
          },500)
        } else {
          that.msgError(response.msg)
        }
      }).catch(err=>{
        this.loadingCommit = false
      })
    },

    requstNodeDetail() {

      var that = this
      var param = {}
      param.todoId = this.todoId
      getNodeDetail(param).then(response => {
        if (response.code == 200) {
          // 测试数据
          // response.data.isPredefinedProcess = false
          that.applyNodeDetail = response;
          that.nodeDetail = response.data
          console.log(JSON.stringify(that.nodeDetail)+"asfdasdAsdasd")
          that.applyState = true

          if (response.data.isPredefinedProcess == true) {
            //  如果有多条线路
            if (response.data.nextIsMoreLine == true) {

              console.log('zsdfszdfasdfsdfsdfs' + that.nodeDetail.lineList.length)

              if (that.nodeDetail.lineList.length > 0) {

                this.selMoreLineDatas = that.nodeDetail.lineList
                this.selMoreLineDatas.forEach((item, index) => {
                  if (item.nodeName.length < 1) {
                    item.nodeName = '该数据无线路名称'
                    item.id = index
                  }
                })
                that.requsetUserByLineId(that.nodeDetail.lineList[0].nodeId)
              }

            }
            //   如果有一条线路
            else {

              that.requsetUserByLineId(that.nodeDetail.nextLineId)
            }
          }
          //  非预定性审批
          else {

          }
        }
        console.log(JSON.stringify(response) + 'sadfsdgsdfsdf')

      })
    },
    requsetUserByLineId(e) {

      console.log('asdfasdfadsf322222')
      var param = {}
      param.lineId = e
      param.businessId = this.businessId
      var that = this

      if (that.nodeDetail.nextIsEnd != true || this.dialogType == 'startProcess'){
        // 获取线路
        getUserByLineId(param).then(response => {
          if (response.code == 200) {
            console.log(JSON.stringify(response) + 'asdfasdfadsf')
            this.selectPeoPleInfo = response.data;
            if (this.selectPeoPleInfo.allowSelectUser == true) {
              this.userInfoOptions = this.selectPeoPleInfo.userList
              this.$set(this,'userInfoOptions',this.selectPeoPleInfo.userList)
            } else {
              this.form.userName = this.selectPeoPleInfo.userName
              this.$set(this.form,'userName',this.selectPeoPleInfo.userName)
            }

            this.ccUserList = this.selectPeoPleInfo.ccUserList

            if(this.ccUserList && this.ccUserList.length>0){
              this.gdUserTags = this.ccUserList.map((res,index)=>{
                return{
                  id:res.userId,
                  name:res.nickName,
                  type: 'info'
                }
              })
            }

          }
        })
      }
    },
    requestNodeList(param) {
      var that = this;
      getNodeList(param).then(response => {

        this.gooflowData = response
        if (that.todoDetailData.isUndefinedProcess == false){
          that.initFlowById(that.flowObj, this.gooflowData.jsonData)
          console.log(JSON.stringify(response) + "asdgdfhcfghgjhcfghfxfhg")
        }
        that.loading = false;

      });

    },
    initFlowObj() {

      var that = this;
      $(function() {
        var flowObj = that.flowObj;
        if (flowObj != undefined) {
          flowObj.destrory();
        }

        flowObj = $.createGooFlow($("#flowObj"), {
          // width: 1220,
          // height: 500,
          width: that.belowWidth,
          height: that.belowHeight,
          toolBtns: [],
          // nodeCustoms:{
          //   font:'#FF0000',
          //   node:'#FF0000',
          //
          // },
          haveHead: false,
          headLabel: true,
          initLabelText: "测试流程",
          haveTool: false,
          haveGroup: true,
          useOperStack: true,
          settingEnable: true,//是否是设置模式
        });
        that.flowObj = flowObj
        // flowObj.mark='#FF0000'
        flowObj.setNodeRemarks({
          cursor: "选择指针",
          direct: "结点连线",
          start: "入口结点",
          "end": "结束结点",
          "task": "任务结点",
          node: "自动结点",
          chat: "决策结点",
          state: "状态结点",
          plug: "附加插件",
          fork: "分支结点",
          "join": "联合结点",
          "complex": "复合结点",
          group: "组织划分框编辑开关",
        });

      })

    },
    initFlowById(e, chartData) {
      e.loadData(chartData);
      e.markItem(this.todoDetailData.nodeId, 'node', true);
    },
    requsetgApprovalRecord(param) {

      var that = this;

      getApprovalRecord(param).then(response => {

        console.log(JSON.stringify(response) + "sdgfxdfgsdfzsdfxds")
        that.subjectDatas = response.rows;

        that.subjectDatas.forEach((item,index)=> {

          if (item.handlingTime!=null){
            var curStartTime = item.handlingTime
            var curdata =  new Date(curStartTime).format("yyyy-MM-dd hh:mm:ss");
            item.handlingTime = curdata;
          } else {
            item.handlingTime = "";
          }

          if (item.startTime!=null){
            var curStartTime1 = item.startTime
            var curdata1 =  new Date(curStartTime1).format("yyyy-MM-dd hh:mm:ss");
            item.startTime = curdata1;
          } else {
            item.startTime = "";
          }

          item.resultsApproval =""
          if(item.delFlag == "-1"){
            item.resultsApproval = "待审批";
          }else{
            if(item.havedoType == "1"){
              if(item.basePid == "-1"){
                item.resultsApproval = "发起流程";
              }else{
                item.resultsApproval = "通过";
              }
            }else if(item.havedoType == "2"){
              item.resultsApproval =  "驳回至上一步";
            }else if(item.havedoType == "3"){
              item.resultsApproval =  "驳回至发起人";
            }else if(item.havedoType == "4"){
              item.resultsApproval =  "移交";
            }else if(item.havedoType == "6"){
              item.resultsApproval =  "终止";
            }
          }
        })

        that.loading = false;

      })

    },

  }
};
</script>
<style lang="scss" scoped>

.approve-main{
  padding: 40px 30px;
  .approve-title{
    font-family: MicrosoftYaHei-Bold;
    font-size: 24px;
    color: #505a69;
  }
}
.left-form{
  margin-right: 20px;
}
.approve-content{
  height: 520px;
  margin-top: 35px;
  background-color: #ffffff;
  border: solid 1px rgba(80,90,105,0.2);
  .approve-top{
    height: 70px;
    background-color: #f8fbff;
    display: flex;
    align-items: center;
    i{
      font-size: 28px;
      color: #1989fa;
      margin-left: 30px;
    }
    span{
      font-family: MicrosoftYaHei;
      font-size: 24px;
      font-weight: bold;
      color: #505a69;
      margin-left: 10px;
    }
  }
  .approve-form{
    padding: 30px;
  }
}
.commit-btn{
  width: 89px;
  height: 46px;
  background-color: #1989fa;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  &:hover{
    opacity: 0.7;
  }
  &:active{
    opacity: 0.9;
  }
  span{
    font-size: 16px;
    font-weight: bold;
    color: #ffffff;
  }
}
.approve-form-bottom{
  display: flex;
  justify-content: flex-end;
  margin-right: 30px;
}

.approve-right{
  display: flex;
  justify-content: space-between;
  padding-right: 30px;
}
.look-flow{
  font-size: 16px !important;
  color: #1989fa !important;
  cursor: pointer;
  &:hover{
    opacity: 0.7;
  }
  &:active{
    opacity: 0.9;
  }
}

.approve-flow{
   margin-top: 40px;
  height: 350px;
  overflow-y: auto;

  .flow-item{
    margin: 0 30px;
    margin-top: 15px;

    .flow-item-top{
      height: 60px;
      background-color: #e8f3fe;
      border-radius: 8px;
      padding: 0 20px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      >div>span{
        font-size: 18px;
        font-weight: bold;
        color: #505a69;
      }
      >div>i{
        color: #1989fa;
        font-size: 25px;
        margin-right: 10px;
      }
      >div{
        display: flex;
        align-items: center;
      }
      >span{
        font-size: 16px;
        color: rgba(80,90,105,0.5);
      }
    }
    .flow-item-content{
      margin-top: 15px;
      display: flex;
      min-height: 47px;
      align-items: center;
      margin-left: 35px;
      .user-img{
        width: 37px;
        height: 37px;
      }
      >span{
        font-size: 16px;
        font-weight: bold;
        margin-left: 10px;
        margin-right: 10px;
        min-width: 64px;
        color: rgba(80,90,105,0.5);
      }
    }
    .flow-sugess{
      height: 47px;
      width: 490px;
      background-color: #f8fbff;
      border-radius: 8px;
      border: solid 1px rgba(210,210,210,0.3);
      display: flex;
      align-items: center;
      padding: 0 30px;
      >span:first-child{
        font-size: 16px;
        color:rgba(80,90,105,0.5);
      }
      >span:last-child{
        font-size: 16px;
        color: #1989fa;
      }
    }
  }

}
.vertical_dotted_line
{
  border-left: 2px dotted #1989fa;
  min-height: 47px;
  margin-right: 30px;
}
.look-more{
  display: flex;
  justify-content: flex-end;
  margin-top: 30px;
  margin-right: 30px;
  >div{
    display: flex;
    align-items: center;
    cursor: pointer;
    &:hover{
      opacity: 0.7;
    }
    &:active{
      opacity: 0.9;
    }
    >span{
      font-size: 16px;
      color: #1989fa;
    }
    >i{
      color: #1989fa;
      font-size: 25px;
      margin-left: 5px;
    }
  }
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



.tag-cls{
  border: 1px solid #ccc;
  border-radius: 8px;
  min-height: 45px;
  display: flex;
  align-items: center;
  padding: 0 10px;
  position: relative;
  width: 100%;
  >i{
    font-size: 30px;
    position: absolute;
    right: 5px;
    color: #ccc;
    top: 0;
    display: flex;
    align-items: center;
    cursor: pointer;
    bottom: 0;
  }
}
.tag-stl{
  display: flex;
  flex-wrap: wrap;
  padding-right: 30px;
  padding-bottom: 10px;
}
/deep/ .el-tag{
  margin-top: 10px;
  margin-left: 10px;
}

</style>
