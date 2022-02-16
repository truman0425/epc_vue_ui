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

            <div id="detailFlowViewId" class="flow-main">
              <div  class="flow-content" id="detailFlowObjId">
              </div>
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

          </div>

          <!--审批流程-->
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
<!--                  <span>{{ !item.handlerName?'':item.handlerName.length>4?item.handlerName.substring(0,4):item.handlerName }}</span>-->

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

         </div>

<!--          <div class="look-more" v-show="subjectDatas && subjectDatas.length>3">-->
<!--             <div><span>查看完整审批记录</span><i class="el-icon-caret-bottom"></i></div>-->
<!--          </div>-->

        </div>
      </el-col>
    </el-row>


  </div>
</template>

<script>

import ContentPage from './content-page'

import ApproveFlow from '@/views/projectPre/projectManager/projectItem/dialog/approve-flow'

import {
  getApprovalRecord, getApproveListByBusinessId, getNodeDetail,
  getNodeList, getPassFlowTask,
  getRejectFlowTask,
  getTermination, getTodoDetail, getTodoListByBusinessId,
  getTransferFlowTask, getUserByLineId, processIdByBusinessId
} from '@/api/processEngine/processEngine'
import elementResizeDetectorMaker from 'element-resize-detector'

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
    },
    detailId:{
      type:String,
      default:''
    },
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
        dictLabel: '中止'
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
      mainWidth:0,
      mainHeight:0

    };
  },
  created() {
    this.getTodoDetailId()
  },
  mounted(){

  },
  methods: {
    getTodoDetailId(){
      // getTodoListByBusinessId(this.detailId).then(res=>{
      //   if(res.code == 200 && res.data && res.data.length>0){
      //     this.todoId = res.data[0].todoId
      //     this.requsetTodoDetail()
      //   }else{
      //    // this.requsetTodoDetail()
      //   }
      // })
      let that = this
      getApproveListByBusinessId(this.detailId).then(response=>{
         if(response.code == 200){
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
         }
      })


      processIdByBusinessId(this.detailId).then(res=>{
        if(res.data && res.data.length>0){
          var processParam = {}
          processParam.processId = res.data
          this.requestNodeList(processParam)
        }
      })

    },
    initFlow(){
      var that = this;

      that.$nextTick(function() {

        //var elementResizeDetectorMaker = require("element-resize-detector");
        var erd = elementResizeDetectorMaker()
        // //监听id为test的元素 大小变化
        let elements = document.getElementById('detailFlowViewId')
        erd.listenTo({},elements , element=> {

          that.mainWidth = element.offsetWidth;

          let width = window.document.documentElement.getBoundingClientRect().width
          let scale = width/1920
          that.mainHeight = (400*scale).toFixed(2)

          that.initFlowObj();
          that.initFlowById(that.flowObj, that.gooflowData.jsonData)


        })
      })
    },
    selMoreLineClick(e) {
      console.log(JSON.stringify(e) + 'asdfsdfasfdasdfas')
      this.requsetUserByLineId(e)
    },
    requestNodeList(param) {
      var that = this;
      getNodeList(param).then(response => {

        this.gooflowData = response
        // if (that.todoDetailData.isUndefinedProcess == false){
        //   //that.initFlowById(that.flowObj, this.gooflowData.jsonData)
        //   this.initFlow()
        //   console.log(JSON.stringify(response) + "asdgdfhcfghgjhcfghfxfhg")
        // }
        this.initFlow()
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

        flowObj = $.createGooFlow($("#detailFlowObjId"), {
          // width: 1220,
          // height: 500,
          width: that.mainWidth,
          height: that.mainHeight,
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
    requsetTodoDetail() {

      var that = this;
      let param = {}
      param.todoId = this.todoId;
      getTodoDetail(param).then(response => {
        that.todoDetailData = response;
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

        if (that.todoDetailData.isUndefinedProcess == false)
        {
           this.requestNodeList(processParam)
        }
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

.flow-main{
  width: 100%;
  display: flex;
  justify-content: center;
}
.flow-content{
  width: 100%;
  height: 400px;
}
</style>
