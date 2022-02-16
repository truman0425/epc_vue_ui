<template>
  <my-dialog ref="selectCustomer" title="流程监控" >
    <div slot="dialogContent" class="dialog-content">
      <el-row >
        <el-col  :span="24">
          <div id="flowViewId" class="flow-main">
            <div  class="flow-content" id="flowObjId">
            </div>
          </div>

        </el-col>
      </el-row>
      <el-row>
        <el-col :span="24">
          <div class="table-main">
            <el-table
              :data="subjectDatas"
              :cell-style="{'text-align':'center'}"
              class="customer-no-border-table table-cls table-sty"
              :row-class-name="tableRowClassName"
              :header-cell-style="tableHeaderClass"
              :fit='true'
              stripe
              style="width: 100%">

              <el-table-column
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

    <div slot="footer" class="btn-foot">
      <el-button plain @click="closeDialog">取消</el-button>
    </div>

  </my-dialog>
</template>

<script>


import { appChanceList} from "@/api/projectPre/projectManager/project";
import { getNodeList } from '@/api/processEngine/processEngine'
import elementResizeDetectorMaker from 'element-resize-detector'
export default {
  name: "ApproveFlow",
  data() {
    return {
      userLoginName: '',
      subjectDatas:[],
      todoDetailData:{},
      tableData: [],
      radio:null,
      loading:true,
      currentRow: null,
      templateSelection: {},
      selectItem: 0,
      total: 0,//总条数
      queryParams: {//请求参数
        pageNum: 1,
        pageSize: 8
      },
      loading2:false,
      isAdd:{
        ok:''
      },
      gooflowData:{},
      flowObj:null,
      headerHeight:48,
    }
  },
  created() {
    // this.$nextTick(()=>{
    //   this.initFlowObj();
    // })
  },
  mounted() {


  },
  watch:{

  },
  methods: {
    initFlow(){
      var that = this;
      that.$nextTick(function() {

        //var elementResizeDetectorMaker = require("element-resize-detector");
        var erd = elementResizeDetectorMaker()
        // //监听id为test的元素 大小变化
        let elements = document.getElementById('flowViewId')
        erd.listenTo({},elements , element=> {

           that.initFlowObj();
           that.initFlowById(that.flowObj, that.gooflowData.jsonData)


        })
      })
    },
    initFlowObj() {

      var that = this;
      $(function() {
        var flowObj = that.flowObj;
        if (flowObj != undefined) {
          flowObj.destrory();
        }

        flowObj = $.createGooFlow($("#flowObjId"), {
          // width: 1220,
          // height: 500,
          width:800,
          height: 500,
          toolBtns: [],
          // nodeCustoms:{
          //   font:'#FF0000',
          //   node:'#FF0000',
          //
          // },
          haveHead: false,
          headLabel: true,
          title:'流程',
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
          title:'流程',
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
    setTodoDetail(todoDetailData){
      this.todoDetailData = todoDetailData
    },
    requestNodeList(param) {
      var that = this;
      getNodeList(param).then(response => {

        this.gooflowData = response
       // if (that.todoDetailData.isUndefinedProcess == false){
          //that.initFlowById(that.flowObj, this.gooflowData.jsonData)
          console.log(JSON.stringify(response) + "asdgdfhcfghgjhcfghfxfhg")
        //}



      });

    },
    initFlowById(e, chartData) {
      e.loadData(chartData);
      e.markItem(this.todoDetailData.nodeId, 'node', true);
    },
    handledbClick(){},

    openDialog(subjectDatas) {
      this.subjectDatas = subjectDatas
      setTimeout(()=>{
        this.initFlow()
      },300)
      this.$refs.selectCustomer.openDialog();
    },
    closeDialog() {
      this.$refs.selectCustomer.closeDialog();
      this.radio = undefined
      this.templateSelection = {}
    },
    tableHeaderClass ({ row, column, rowIndex, columnIndex }) {
      return {
        background: '#e8f3fe',
        color: '#505A69',
        textAlign: 'center',
        fontSize:'18px',
        height:`${this.headerHeight}px`
      };
    },
    tableRowClassName ({ row, rowIndex }) {
      if (rowIndex % 2 == 0) {
        return 'warning-row';
      } else {
        return 'success-row';
      }
    },
  }
}
</script>

<style lang="scss" scoped>

::v-deep .el-table .success-row {
  background: #f3f9ff;;
}
::v-deep .el-table .warning-row {
  background: #ffffff;
}

::v-deep .el-dialog{
  width:900px!important;
}
::v-deep .el-dialog .el-dialog__body{
  padding-bottom: 30px !important;
}
.dialog-content {
  margin-top: 5px;
  .table-people {
    margin: 10px 0px;
  }
}

.btn-foot {
  display: flex;
  flex-flow: row-reverse;
  .sure-btn{
    width: 96px;
    height: 46px;
    background: #1989FA;
    border-radius: 8px;
  }
  .cancle-btn{
    width: 96px;
    height: 46px;
    background: #FFFFFF;
    border: 1px solid rgba(80, 90, 105, 0.2);
    border-radius: 8px;
  }
}











.btn-fscl{
  background: #FFFFFF;
  border: 1px solid #bfc2c6;
  border-radius: 5px;
  span{
    color: #bfc2c6;
    font-weight: bold;
  }
}

/deep/.el-dialog__header{
  height: 74px;
}
/deep/.i-close{
  height: 74px;
  line-height: 74px;
  color: #1989FA;
  font-size: 24px;
}
/deep/ .title-top{
  background: #f6f9ff;
  color: #1989FA;
  font-size: 24px;
  height: 74px;
}


.btn-public{
  height: 46px;
  background-color: #f6f9ff;
  border-radius: 8px;
  border: solid 2px #1989fa;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 10px;
  margin-left: 10px;
  cursor: pointer;
  .btn-img{
    width: 20px;
    height: 20px;
  }
  >span{
    font-family: MicrosoftYaHei;
    font-size: 16px;
    font-weight: bold;
    font-stretch: normal;
    line-height: 51px;
    letter-spacing: 0px;
    color: #1989fa;
    margin-left: 5px;
  }
}
.btn-public:hover{
  opacity: 0.8;
}


.btn-sure{
  width: 96px !important;
  height: 46px !important;
  background: #1989FA !important;
  border-radius: 8px !important;
  font-size: 16px !important;
}
.btn-cancle{
  width: 96px !important;
  height: 46px !important;
  background: #FFFFFF !important;
  border: 1px solid rgba(80, 90, 105, 0.2) !important;
  border-radius: 8px !important;
  font-size: 16px !important;
}
::v-deep .el-table--medium td{
  height: 47px !important;
  line-height: 47px;
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




//表格修改


/*去掉头部底部边框*/
.table-sty /deep/ .el-table--border,/deep/ .el-table--group{
  border: none;
}

/deep/ .table-sty thead tr th.is-leaf{
  border: 0px solid #EBEEF5;
  border-right: none;
}
.table-sty thead tr th:nth-last-of-type(2){
  border-right: 0px solid #EBEEF5;
}



/deep/ .el-table__header colgroup col[name="gutter"] {
  display: table-cell !important;
}
::v-deep .el-table--border th:first-child .cell,::v-deep .el-table--border td:first-child .cell{
  padding-left: 0 !important;
  padding-right: 0 !important;
}
/deep/ .el-table__body tr,
/deep/ .el-table__body td {
  padding: 0;
  height: 48px;
  font-size: 16px !important;
  color: rgba(85,85,85,0.8) !important;
}

.el-table--border {
  border-right: none;
  border-bottom: none;
}

/deep/ .el-table__row>td{
  border: none;
}
/deep/ .el-table::before {
  height: 0px;
}

::v-deep.el-table--group,
.el-table--border {
  border: 1px solid rgba(80, 90, 105, 0.1);
}
::v-deep.el-table .cell {
  font-size: 16px;
  text-overflow: initial;
}
::v-deep .el-table tbody tr:hover > td {
  background-color: transparent !important;
}
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
/deep/.gutter{
  width: 0px !important;
}
/deep/ .el-table__body{
  width: 100% !important;
}
//表格修改结束

.table-main{
  margin-top: 20px;
  margin-bottom: 50px;
  display: flex;
  justify-content: center;
}

</style>

