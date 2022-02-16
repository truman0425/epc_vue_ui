<template>
  <div id="myAgentDetailView">
    <div class="app-box">
      <div style="height: 100%;width: 100%;overflow-y: scroll"  v-loading="loading">
        <el-row >
          <el-col  :span="24">
            <div id="filterHeightViewId" >
              <div style="width: 100%;height: 100%; overflow-y: scroll" >
                <component :is="userComponentImstance" v-bind:projectData="projectData" title="component"/>
              </div>
            </div>
          </el-col>
        </el-row>

        <div class="applove-info">
          <approve-info @dialogEnterMethod="dialogEnterMethod" ref="approveInfo" :todoId="todoId"></approve-info>
        </div>

      </div>

    </div>

    <div class="app-box" v-if="publicComponentState">
      <PublicComponent style="width: 100vw;height: 100vh;" v-bind:dialogToolsParam="dialogToolsParam" @dialogEnterMethod="dialogEnterMethod"   @handleClose="handleClose">
      </PublicComponent>
    </div>
  </div>

</template>

<script >

import publicComponent from '../publicComponent/publicComponent'
import {getTodoDetail} from '../../../../src/api/processEngine/processEngine'
import {getApprovalRecord,getNodeList} from '../../../../src/api/processEngine/processEngine'

import ApproveInfo from '@/views/projectPre/projectManager/projectItem/components/approve-info'


export default {
  name: 'MyAgentDetail2',
  data(){
    return {
      subjectDatas:[{liucname:"zhangsan"},{liucname:"lisi"},{liucname:"wangwu"}],
      belowHeight: 0,
      belowWidth: 0,
      mainHeight:0.0,
      mainWidth:0,
      flowObj:null,
      publicComponentState:false,
      todoId:"",
      businessParam:[],
      businessName:"",
      url1: '',
      businessId:"3852ccddd2e44c9ab1ea6b57cfbd34c5",
      gooflowData:{},
      ceshilujing:'',
      dialogToolsParam:{
        dialogType:"agree",
        param:{
          todoId:""
        }
      },
      todoDetailData:{

      },
      projectData:{
        projectSid:"",
        type:""
      },
      loading:false,

    }
  },


  components: {
    'PublicComponent':publicComponent,
    ApproveInfo
  },
  computed: {

    userComponentImstance() {
      console.log(this.ceshilujing+"asdfsdfasd");
      return resolve => require.ensure([], () => resolve(require('@/views/'+this.ceshilujing+'.vue')));



    }
  },
  beforeCreate(){

  },
  created(){

    this.todoId = this.$route.query.todoId
    console.log(JSON.stringify(this.todoId)+"hkjjkhghsdhj")
    this.requsetTodoDetail()
    //
    // console.log(JSON.stringify(this.$route.params)+"asfdasdfsdfsd")

  },
  mounted(){


    // var that = this;
    // that.$nextTick(function() {
    //   var elementResizeDetectorMaker = require("element-resize-detector");
    //   var erd = elementResizeDetectorMaker()
    //   // //监听id为test的元素 大小变化
    //   erd.listenTo(document.getElementById('liuchengbackViewId'), function(element) {
    //     //  预算科目列表
    //     that.mainHeight = element.offsetHeight
    //     that.liuChengMainHeight = element.offsetHeight-70+"px"
    //     that.mainWidth = element.offsetWidth;
    //
    //     that.belowHeight = 420;
    //     that.belowWidth = that.mainWidth;
    //     that.initFlowObj();
    //    // that.initFlowById(that.flowObj, that.gooflowData.jsonData)
    //
    //
    //   })
    // })



  },
  methods: {
    requsetTodoDetail() {

      var that = this;
      that.loading = true;

      var param = {}
      param.todoId = this.todoId;
      getTodoDetail(param).then(response => {
        console.log(JSON.stringify(response) + "asdfsdfasdfasdf")
        that.todoDetailData = response;

        that.projectData.projectSid = that.todoDetailData.businessId
        that.projectData.pageType = 'other'
        that.projectData.type = 'view'
        var businessUrls = that.todoDetailData.businessUrl.split('&');
        that.ceshilujing = businessUrls[0];



        if (that.todoDetailData.isUndefinedProcess == false){
          that.todoDetailData.processName = "流程名称:  "+that.todoDetailData.processName;
          that.todoDetailData.flowStartTime ="流程时间:  " + new Date(that.todoDetailData.flowStartTime).format("yyyy-MM-dd hh:mm:ss");

        }else {
          that.todoDetailData.processName = "";
          that.todoDetailData.flowStartTime ="流程时间:  " + new Date(that.todoDetailData.flowStartTime).format("yyyy-MM-dd hh:mm:ss");
          var domDiv = window.document.getElementById("liuchengbackViewId");
          domDiv.style.borderWidth='0'
        }

        this.$nextTick(()=>{
          this.$refs.approveInfo.setBusinessId(that.projectData.projectSid)
        })




        var param = {}
        param.businessId = response.businessId
        // that.businessId = response.businessId
        param.businessType = response.businessType
        var businessUrl = response.businessUrl;
        that.businessParam = businessUrl.split("&");
        that.businessName = that.businessParam[0];
        console.log(JSON.stringify(that.businessParam));
        var processParam = {}
        processParam.processId = response.processId
        this.requsetgApprovalRecord(param);
        this.$refs.approveInfo.requsetgApprovalRecord(param);

        if (that.todoDetailData.isUndefinedProcess == false)
        {
          //this.requestNodeList(processParam)
          this.$refs.approveInfo.setProcessId(response.processId,that.todoDetailData)
        }


        // this.ceshilujing = 'business/projectPlanning/projectPlanningDetail'

      });

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
              item.resultsApproval =  "中止";
            }
          }




        })

        that.loading = false;

      })

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
    // 初始化加载
    initFlowById(e, chartData) {
      e.loadData(chartData);
      e.markItem(this.todoDetailData.nodeId, 'node', true);
    },
    examinationApproval() {

      //  设置 弹出框为同意类型
      this.dialogToolsParam.dialogType='agree'
      this.dialogToolsParam.param.todoId = this.todoId;
      this.publicComponentState = true
    },
    rejectedItems(){
      console.log("adasfas")
      //  设置 弹出框为同意类型
      this.dialogToolsParam.dialogType='rejected'
      this.dialogToolsParam.param.todoId = this.todoId;
      this.publicComponentState = true
    },

    // 移交接口
    handOverApplyItems(){
      this.dialogToolsParam.dialogType='handOver'
      this.dialogToolsParam.param.todoId = this.todoId;
      this.publicComponentState = true
    },

    // 中止事件
    suspendApplyItems(){
      this.dialogToolsParam.dialogType='suspend'
      this.dialogToolsParam.param.todoId = this.todoId;
      this.publicComponentState = true
    },

    // dialog 确定回掉
    dialogEnterMethod(){

      // this.requsetTodoDetail()
      this.publicComponentState = false
      this.$router.go(-1);
      this.$store.dispatch('tagsView/delView', this.$route)

    },
    handleClose() {

      this.publicComponentState = false

    },
    //  返回上一级
    backToView() {
      this.$router.go(-1);
      this.$store.dispatch('tagsView/delView', this.$route)
    },

  },
}






</script>

<style lang="scss" scoped>
#myAgentDetailView .app-box {

  //position: absolute;
  //width: 100%;
  //height: 100%;
  /*background-color: red;*/
  .newAdd {
    color: white;
    background-color: #1989FA;
  }
  .agree {
    background: #1989FA;
    font-size: 14px;
    color: #FFFFFF;
  }
  .handOver{

    background: #FFFFFF;
    border: 1px solid #1989FA;
    font-size: 14px;
    color: #1989FA;

  }
  .back{
    background: #FFFFFF;
    border: 1px solid #DCDFE6;
    font-size: 14px;
    color: #606266;
  }
  .suspend{
    background: #FFFFFF;
    border: 1px solid #F56C6C;
    font-size: 14px;
    color: #EF6060;
  }
  .rejected{
    background: #FFFFFF;
    border: 1px solid #F56C6C;
    font-size: 14px;
    color: #EF6060;

  }
  .dels {
    background-color: #F56C6C;
    color: #fff;
  }
  .mores {
    background-color: #F1F2F3;
    color: #999999;
  }
  .page-header {
    margin-left: -20px;
    margin-right: -20px;
    margin-top: -20px;
    height: 45px;
    line-height: 45px;
    border-bottom: 1px solid #eee;
    background: #fff;

    padding: 0 0px;
  }
  .header-left, .header-right, .filter-header-right {
    display: inline-block;
    color: #555555;
  }
  .header-left span {
    padding-left: 20px;
  }
  .header-right {
    padding-right: 20px;
    float: right;
  }
  .filter-header-right {
    padding-right: 0px;
    float: right;
  }
  .container-box {
    padding: 10px;
  }
  .page-title {
    height: 46px;
    line-height: 46px;
    position: relative;
  }
  .page-title::before {
    content: "";
    position: absolute;
    width: 5px;
    height: 18px;
    background: #1989FA;
    top: 14px;
  }
  .page-title span {
    padding-left: 10px;
  }
  .el-select, .el-cascader, .el-date-editor {
    width: 100%;
  }
  .app-container {
    width: calc(100% - 40px);
    height: auto;
    /*height: calc(100% - 40px);*/
  }

}

::-webkit-scrollbar {
  width: 0 !important;
}
::-webkit-scrollbar {
  width: 0 !important;height: 0;
}

.el-button:hover, .el-button:focus {
  color: #1989FA;
  border-color: #badcfe;
  background-color: white;
}

.applove-info{

  height: 644px;
  background-color: #ffffff;
  box-shadow: 0px 1px 10px 0px #ececec;
  border-radius: 8px;
  margin: 0 20px 20px 20px;
}

</style>
