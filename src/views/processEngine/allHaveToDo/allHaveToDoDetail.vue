<template>
  <div id="allHaveToDoDetailView">
    <div class="app-box"  v-cloak>
      <div style="height: 100%;width: 100%;overflow-y: scroll" v-loading="loading">
        <div class="app-container"  >
          <div class="page-header" style="height: 50px">
            <div class="header-left">
              <div style="padding-left:20px;display: flex;align-items: center">
                <el-image
                  style="margin-left: 0px;width: 25px;height:25px;"
                  :src="require('@/assets/image/cengji.png')">
                </el-image>
                <span style="font-size: 20px">我的已办详情</span>
              </div>
            </div>
            <div class="header-right">

              <el-button
                @click="backToView()"
                class="back"
                icon="el-icon-back"
                size="mini"
              >返回
              </el-button>


            </div>
          </div>
          <el-row >
            <el-col  :span="24">
              <div id="filterHeightViewId"
                   style="position: relative;width:100%;height: 70vh;padding-top: 10px;padding-bottom: 10px;margin: 0px;overflow-y: scroll">

                <div style="width: 100%;height: 100%; overflow-y: scroll" >

                  <component :is="userComponentImstance" v-bind:projectData="projectData" title="component"/>


                </div>


              </div>
            </el-col>
          </el-row>

        </div>
        <div class="app-container" style="padding-bottom: 20px">

          <el-row >
            <el-col  :span="24">
              <div style="position: relative;width:100%;padding-top: 0px;padding-bottom: 10px;">
                <el-row >
                  <el-col  :span="24">
                    <div style="height: 40px;display: flex;align-items:center;margin-left: -20px">
                      <div class="header-left" style="height: 40px;line-height: 40px">
                        <span style="font-weight: bold;">审批记录</span>
                      </div>
                    </div>
                  </el-col>
                </el-row>

                <el-row >
                  <el-col  :span="24">
                    <div style="height: 30px;display: flex;align-items:center;margin-left: -20px">
                      <div class="header-left" style=";height: 40px;line-height: 30px">
                        <span style="font-size: 12px">{{todoDetailData.processName}}&nbsp;&nbsp;&nbsp;&nbsp;{{todoDetailData.flowStartTime}}</span>
                      </div>
                    </div>
                  </el-col>
                </el-row>
                <el-row >
                  <el-col  :span="24">
                    <div style="margin-top: 10px;height: auto;width: 100%;padding-bottom: 10px">
                      <el-table
                        :data="subjectDatas"
                        :header-cell-style="{'text-align':'center'}"
                        :cell-style="{'text-align':'center'}"
                        :fit='true'
                        :row-style="{height: '50px'}"
                        stripe
                        style="width: 100%">

                        <el-table-column
                          v-if="todoDetailData.isUndefinedProcess == false"
                          prop="nodeName"
                          :show-overflow-tooltip="true"
                          label="流程节点名称">
                        </el-table-column>
                        <el-table-column
                          prop="startTime"
                          :show-overflow-tooltip="true"
                          label="接收时间">
                        </el-table-column>
                        <el-table-column
                          prop="handlingTime"
                          :show-overflow-tooltip="true"
                          label="完成时间">
                        </el-table-column>
                        <el-table-column
                          prop="handlerName"
                          :show-overflow-tooltip="true"
                          label="审批人">
                        </el-table-column>
                        <el-table-column
                          prop="description"
                          :show-overflow-tooltip="true"
                          label="审批意见">
                        </el-table-column>
                        <el-table-column
                          prop="resultsApproval"
                          :show-overflow-tooltip="true"
                          label="审批结果">
                        </el-table-column>

                      </el-table>
                    </div>



                  </el-col>
                </el-row>





              </div>
            </el-col>
          </el-row>
          <el-row >
            <el-col  :span="24">

              <div id="liuchengbackViewId" style="position: relative;width:100%;height: auto;padding-top: 10px;padding-bottom: 0px;margin: 0px; border: 1px solid #DCDFE6; " >

                <div  v-if="todoDetailData.isUndefinedProcess == false" style="width: 100%;height: 100%;margin: 0px;height: 441px;" id="flowObj">
                </div>
              </div>



            </el-col>
          </el-row>
        </div>

      </div>



    </div>

  </div>

</template>

<script >

  import publicComponent from '../publicComponent/publicComponent'
  import {getHavedoDetail} from '../../../../src/api/processEngine/processEngine'
  import {getApprovalRecord,getNodeList} from '../../../../src/api/processEngine/processEngine'



  export default {
    name: 'AllHaveToDoDetail',
    data(){
      return {
        subjectDatas:[{liucname:"zhangsan"},{liucname:"lisi"},{liucname:"wangwu"}],
        belowHeight: 0,
        belowWidth: 0,
        mainHeight:0.0,
        mainWidth:0,
        flowObj:null,
        // publicComponentState:false,
        havedoId:"",
        businessParam:[],
        businessName:"",
        url1: '',
        businessId:"3852ccddd2e44c9ab1ea6b57cfbd34c5",
        gooflowData:{},
        ceshilujing:'',
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

    },
    computed: {

      userComponentImstance() {
        console.log(this.ceshilujing+"asdfsdfasd");
        return resolve => require.ensure([], () => resolve(require('../../'+this.ceshilujing+'.vue')));



      }
    },
    beforeCreate(){

    },
    created(){

      this.havedoId = this.$route.query.havedoId
      console.log(JSON.stringify(this.havedoId)+"hkjjkhghsdhj")
      this.requsetTodoDetail()

      console.log(JSON.stringify(this.$route.params)+"asfdasdfsdfsd")

    },
    mounted(){


      var that = this;
      that.$nextTick(function() {
        var elementResizeDetectorMaker = require("element-resize-detector");
        var erd = elementResizeDetectorMaker()
        // //监听id为test的元素 大小变化
        erd.listenTo(document.getElementById('liuchengbackViewId'), function(element) {
          //  预算科目列表
          that.mainHeight = element.offsetHeight
          that.liuChengMainHeight = element.offsetHeight-70+"px"
          that.mainWidth = element.offsetWidth;

          that.belowHeight = 420;
          that.belowWidth = that.mainWidth;
          that.initFlowObj();
          that.initFlowById(that.flowObj, that.gooflowData.jsonData)


        })
      })



    },
    methods: {
      requsetTodoDetail() {

        this.loading=true;
        var that = this;
        var param = {}
        param.havedoId = this.havedoId;
        getHavedoDetail(param).then(response => {
          // console.log(JSON.stringify(response) + "asdfsdfasdfasdf")
          if (response.code == 200) {

            that.todoDetailData = response;
            that.projectData.projectSid = that.todoDetailData.businessId
            that.projectData.pageType = 'other'
            that.projectData.type = 'view'
            // businessUrl
            var businessUrls = that.todoDetailData.businessUrl.split('&');
            this.ceshilujing = businessUrls[0];



            if (that.todoDetailData.isUndefinedProcess == false){
              that.todoDetailData.processName = "流程名称:  "+that.todoDetailData.processName;
              that.todoDetailData.flowStartTime ="流程时间:  " + new Date(that.todoDetailData.flowStartTime).format("yyyy-MM-dd hh:mm:ss");

            }else {
              that.todoDetailData.processName = "";
              that.todoDetailData.flowStartTime ="流程时间:  " + new Date(that.todoDetailData.flowStartTime).format("yyyy-MM-dd hh:mm:ss");
              var domDiv = window.document.getElementById("liuchengbackViewId");
              domDiv.style.borderWidth='0'
            }


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

          } else {
            that.msgError(response.msg)
          }
          this.loading=false;


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

          this.loading=false;

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
          this.loading=false;


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



      //  返回上一级
      backToView() {
        this.$router.go(-1);
        this.$store.dispatch('tagsView/delView', this.$route)
      },

    },
  }






</script>

<style lang="scss" scoped>
  #allHaveToDoDetailView .app-box {

    position: absolute;
    width: 100%;
    height: 100%;
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
</style>
