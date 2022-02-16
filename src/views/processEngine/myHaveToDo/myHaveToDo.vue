<template>
  <div id="myHaveToDoList">
    <div class="app-box"  v-cloak>
      <div class="app-container" id="mainContentViewId">
        <div class="page-header" style="height: 50px">

          <div class="header-left">
            <div style="padding-left:20px;display: flex;align-items: center">
              <el-image
                style="margin-left: 0px;width: 25px;height:25px;"
                :src="require('@/assets/image/cengji.png')">
              </el-image>
              <span style="font-size: 20px">我的已办</span>
            </div>
          </div>

        </div>
        <!---->
        <el-row >
          <el-col  :span="24">
            <div id="filterHeightViewId"
                 style="position: relative;width:100%;height: auto;padding-top: 10px;padding-bottom: 10px;margin: 0px;">
              <div v-if="filterShowState">
                <el-row>
                  <el-col :span="24" style="padding: 0px">
                    <div
                      style="margin-left: 0px;width:calc(100% - 0px);height: 40px;line-height:40px;">
                      <div class="header-left" style="font-size: 14px">
                        <span>筛选条件</span>
                      </div>
                      <div class="filter-header-right">
                        <!--class="newAdd"-->
                        <el-button
                          type="primary"
                          icon="el-icon-plus"
                          size="mini"
                          @click="addNewBudgetItems()"
                        >重置
                        </el-button>

                      </div>
                    </div>
                  </el-col>
                </el-row  >
                <el-row v-for="(item,index) in filterFatas" :key="item.filterName"
                        style="padding: 0px; height: 40px; width: 100%;left: 20px">
                  <el-col :span="24" style="padding: 0px;height: 40px;">
                    <div style="position: relative;display: flex;flex-direction: row">
                      <div style="margin-left: 20px;width: 24px; height: 40px;" @click="deletFilterCondition(index)">
                        <div class="el-icon-remove-outline" style="font-size: 24px;margin-top: 8px;color: #999999">
                        </div>
                      </div>
                      <div
                        style="width: 580px;height: 40px;display: flex;flex-direction: row;align-items: center;">
                        <div style="margin-left: 30px;padding: 0px;height: auto;width: auto;">
                          <el-select style="width: 150px;" v-model="item.filterName" placeholder="请选择条件">
                            <el-option
                              v-for="item in options"
                              :key="item.value"
                              :label="item.label"
                              :value="item.value">
                            </el-option>
                          </el-select>
                        </div>

                        <div style="margin-left: 10px;padding: 0px;height: auto;width: auto;">
                          <el-input style="width: 300px;" v-model="item.filterValue" placeholder="请输入内容"></el-input>
                        </div>
                      </div>
                    </div>
                  </el-col>
                </el-row>
                <el-row
                  style="padding: 0px; height: 40px; width: 100%;left: 20px">
                  <el-col :span="24" style="padding: 0px;height: 40px;">
                    <div style="position: relative;display: flex;flex-direction: row" @click="addfilterMethods">
                      <div style="margin-left: 20px;width: 24px; height: 40px;">
                        <div class="el-icon-circle-plus-outline" style="font-size: 24px;margin-top: 8px;" type="primary">
                        </div>
                      </div>
                      <div style="margin-left: 20px;width: auto;line-height: 40px; height: 40px;" type="primary">
                        <span style="font-size: 14px">添加筛选条件</span>
                      </div>
                    </div>
                  </el-col>
                </el-row>
              </div>
            </div>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <div style="padding-left: 0px;padding-right: 0px;overflow-y: scroll;padding-bottom: 22px">
              <el-table
                v-loading="loading"
                :data="subjectDatas"
                @selection-change="handleSelectionChange"
                @select="handleSelection"
                :header-cell-style="{'text-align':'center'}"
                :cell-style="{'text-align':'center'}"
                :height="belowHeight"
                :row-style="{height: '50px'}"
                :fit='true'
                stripe
                style="width: 100%">
                <el-table-column
                  type="index"
                  label="序号"
                  width="50">
                </el-table-column>
                <el-table-column
                  prop="havedoName"
                  width="200"
                  :show-overflow-tooltip="true"
                  label="流程标题">
                  <template  slot-scope="scope">
                    <span style="color: #47a1fb;font-size: 12px;cursor: pointer;"  @click="enterMyHaveToDoDetail(scope.row)">{{ scope.row.havedoName }}</span>
                  </template>
                </el-table-column>
                <el-table-column
                  prop="processName"
                  :show-overflow-tooltip="true"
                  label="流程名称">
                </el-table-column>
                <el-table-column
                  prop="flowStarterName"
                  :show-overflow-tooltip="true"
                  label="流程发起人">
                </el-table-column>

                <el-table-column
                  prop="currentNodeName"
                  :show-overflow-tooltip="true"
                  label="流程节点名称">
                </el-table-column>
                <el-table-column
                  prop="currentProcessor"
                  :show-overflow-tooltip="true"
                  label="当前审批人">
                </el-table-column>
                <el-table-column
                  prop="flowStartTime"
                  :show-overflow-tooltip="true"
                  label="流程发起时间">
                </el-table-column>
                <el-table-column
                  prop="taskEndTime"
                  :show-overflow-tooltip="true"
                  label="结束时间">
                </el-table-column>
                <el-table-column
                  prop="statusStr"
                  style="color: red"
                  :show-overflow-tooltip="true"
                  label="审批状态">
                  <template slot-scope="scope">
                    <span type="text" v-if="scope.row.status == 1" style="color: #4BD863" size="small">{{scope.row.statusStr}}</span>
                    <span type="text" v-if="scope.row.status == 2" style="color: #FE9400" size="small">{{scope.row.statusStr}}</span>
                    <span type="text" v-if="scope.row.status == 3 || scope.row.status == 4" style="color: red" size="small">{{scope.row.statusStr}}</span>
                  </template>
                </el-table-column>

              </el-table>
              <div
                style="position: relative;float: right;margin-top: 0px; height: 40px;display: flex;align-items: center;">
                <el-pagination
                  @size-change="handleSizeChange"
                  @current-change="handleCurrentChange"
                  background
                  :current-page="currentPage"
                  :page-sizes="pageSizes"
                  :page-size="pageSize"
                  layout="total, sizes, prev, pager, next, jumper"
                  :total="totalNum">
                </el-pagination>
              </div>
            </div>
          </el-col>
        </el-row>

      </div>
    </div>
  </div>

</template>

<script>
  import {getHavedoList} from '../../../../src/api/processEngine/processEngine'
  export default {
    name: 'MyHaveToDo',
    data() {
      return {
        filterShowState:false,
        belowHeight:'333',
        filterHeight:0.0,
        totalNum:0,
        filterHeight:0.0,
        currentPage:1,
        pageSizes:[1,10,100, 200, 300, 400],
        pageSize:10,
        subjectDatas:[],
        filterFatas: [{
          filterName: '',
          filterValue: ''
        }],
        options: [{
          value: '1',
          label: '科目类别'
        }, {
          value: '2',
          label: '科目编号'
        }, {
          value: '3',
          label: '成本明细'
        }],
        loading:false,

      }
    },
    created(){

      var clientHeight =   document.body.clientHeight
      this.belowHeight = (clientHeight - 250).toString();
      this.requestHaveTodoList()
    },
    mounted() {

      var that = this
      var mainHeight=0.0;
      var elementResizeDetectorMaker = require("element-resize-detector");
      // 创建实例
      var erd = elementResizeDetectorMaker()
      //监听id为test的元素 大小变化
      erd.listenTo(document.getElementById('filterHeightViewId'), function(element) {

        //  预算科目列表
        var width = element.offsetWidth
        that.filterHeight = element.offsetHeight
        var abc = that.mainHeight - that.filterHeight - 105
        that.$nextTick(function() {
          that.belowHeight = abc
        })
      })

      var erd1 = elementResizeDetectorMaker()
      //监听id为test的元素 大小变化
      erd1.listenTo(document.getElementById('mainContentViewId'), function(element){
        //  预算科目列表
        that.mainHeight = element.offsetHeight
        var abc = that.mainHeight - that.filterHeight - 105
        console.log(abc + 'asdfasdfasd')
        that.$nextTick(function() {
          that.belowHeight = abc
        })


      })


    },
    methods: {

      requestHaveTodoList(){

        var that = this;
        var param={};
        that.loading = true;
        param.pageNum=this.currentPage;
        param.pageSize=this.pageSize;
        getHavedoList(param).then(response => {
          if (response.code == '200'){
            console.log(JSON.stringify(response)+"sdfsdfsadfasd")
            that.subjectDatas = response.rows;
            that.totalNum = response.total;
            // //1 没有返回值
            that.subjectDatas.forEach((item,index)=>{
              if (item.status == "1"){
                item.statusStr = "审批中"
              }else if(item.status == "2"){
                item.statusStr = "驳回"
              }else if(item.status == "3"){
                item.statusStr = "审批完成"
              }else if(item.status == "4"){
                item.statusStr = "中止"
              }
              // //执行代码
              // var curStartTime = item.startTime
              // var curdata =  new Date(curStartTime).format("yyyy-MM-dd hh:mm:ss");
              // item.startTime = curdata
              //
              // //执行代码1
              // var flowStartTime = item.flowStartTime
              // var curdata1 =  new Date(flowStartTime).format("yyyy-MM-dd hh:mm:ss");
              // item.flowStartTime = curdata1
            })
          }
          that.loading = false;


        });

      },

      // 添加筛选条件
      addfilterMethods(){

        var filterFatas = {
          filterName: '',
          filterValue: ''
        }

        this.filterFatas.push(filterFatas)



      },

      // 选择流程改变事件
      handleSelectionChange(){

      },

      handleSelection(){

      },



      // 分页数据列表
      handleSizeChange(e){
        // console.log(e+"asdfasdf")
        this.pageSize = e;
        this.requestHaveTodoList()

      },
      handleCurrentChange(e){
        this.currentPage = e;
        this.requestHaveTodoList()
      },


      // 流程编辑
      enterMyHaveToDoDetail(e){

        this.$router.push({
          path:'myHaveToDoDetail',
          query: {
            havedoId:e.havedoId
          }
        })

      },

      //   流程属性配置
      processPropertyConfig(){

      },
      // 流程删除
      processDeleteMethods(){

      },

      // 创建流程
      addNewBudgetItems(){



      }



    }
  }
</script>

<style lang="scss" scoped>
  #myHaveToDoList .app-box {

    position: absolute;
    width: 100%;
    height: 100%;
    .newAdd {
      color: white;
      background-color: #1989FA;
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
    .filter-header-right{
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
      /*width: calc(100% - 40px);*/
      height: calc(100% - 40px);
    }

  }

  ::-webkit-scrollbar {
    width: 0 !important;
  }
  ::-webkit-scrollbar {
    width: 0 !important;height: 0;
  }
  el-table__row>td {
    border: none;
  }

  .el-table::before {
    height: 0px;
  }
</style>
