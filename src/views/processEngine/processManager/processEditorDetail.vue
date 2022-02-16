<template>
  <div id="processEditorDetailView">
    <div class="app-box">
      <!-- 预算科目列表  -->
      <div class="app-container" id="mainContentViewId" ref="mainContentViewId1"  v-loading="loading">
        <div class="page-header" style="height: 50px">

          <div class="header-left">
            <div style="padding-left:20px;display: flex;align-items: center">
              <el-image
                style="margin-left: 0px;width: 25px;height:25px;"
                :src="require('@/assets/image/cengji.png')">
              </el-image>
              <span style="font-size: 20px">{{processName}}</span>
            </div>
            <!--<div style="left: 0px;top: 0px;height: 100%;width: 90px;background-color: red;">-->

            <!--</div>-->
          </div>
          <div class="header-right">
          </div>
        </div>
        <el-row>
          <el-col :span="24">
            <div id="zsdfsdsdfid" class="maiLiuChengView" :style="{height:liuChengMainHeight}">
              <div style="width: 100%;height: 100%;margin: 0px" id="flowObj">
              </div>
            </div>
          </el-col>
        </el-row>
      </div>

      <el-dialog title="审批节点设置" :visible.sync="nodeSettingState" width="804px" >
        <div style="width: 100%;height: 418px;margin-top: -20px;">
          <el-row style="padding: 0 0px;margin-bottom: 10px;">
            <el-col :span="24">
              <div style="padding: 0px;height: 40px;width:100%;display: flex;flex-direction: row;align-items: center">
                <div style="width: 5px;height: 16px;background-color: #1989FA;margin-left: 20px;border: 1px solid #1989FA;border-radius:2.5px;;border-radius:2.5px;"></div>
                <div style="width: 300px;height: 20px;margin-left: 10px;line-height: 20px">
                  <span style="font-size: 16px;color: #303133;">流程基本设置</span>
                </div>
              </div>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <div style="padding: 0px;height: 60px;width:100%;margin-top: -10px;padding-left: 20px;padding-right: 20px">
                <el-row >
                  <el-col :span="11" style="padding-right: 10px">
                    <div style="margin-top: 12px">

                      <el-form label-width="120px">
                        <el-form-item label="是否固定审批人">
                          <el-select v-model="nodeDic.isFixedApprover" clearable  style="overflow:auto">
                            <el-option
                              v-for="dict in fixedApprover"
                              :key="dict.id"
                              :label="dict.lable"
                              :value="dict.id"
                            />
                          </el-select>
                        </el-form-item>
                      </el-form>

                    </div>
                  </el-col>
                  <el-col :span="13" style="padding-left: 10px;padding-right: 10px;">
                    <div style="margin-top: 12px">
                      <el-form label-width="100px">
                        <el-form-item label="固定审批人">

                          <el-select :disabled="nodeDic.fixedName == '0' ||nodeDic.fixedName==''" v-model="nodeDic.fixedApproverId" clearable filterable  style="overflow:auto">
                            <el-option
                              v-for="dict in personnelInfos"
                              :key="dict.userId"
                              :label="dict.nickName"
                              :value="dict.userId"
                            />
                          </el-select>






                          <!--<el-input v-model="form.name" >-->
                            <!--<el-button slot="append"  style="border-left: 0"   icon="el-icon-search"></el-button>-->
                            <!--<el-button slot="append"  icon="el-icon-close"></el-button>-->
                          <!--</el-input>-->
                        </el-form-item>
                      </el-form>
                    </div>
                  </el-col>

                </el-row>
              </div>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <div style="padding: 0px;height: 60px;width:100%;margin-top: -10px;padding-left: 20px;padding-right: 20px">
                <el-row >
                  <el-col :span="11" style="padding-right: 10px">
                    <div style="margin-top: 12px">


                      <el-form ref="form" :model="form" label-width="100px">
                        <el-form-item label="审批角色">
                          <el-select v-model="nodeDic.nodeRoleId" clearable filterable   style="overflow:auto">
                            <el-option
                              v-for="dict in roleListData"
                              :key="dict.roleId"
                              :label="dict.roleName"
                              :value="dict.roleId"
                            />
                          </el-select>
                        </el-form-item>
                      </el-form>

                    </div>
                  </el-col>
                  <el-col :span="13" style="padding-left: 10px;padding-right: 10px;">
                    <div style="margin-top: 12px">
                    </div>
                  </el-col>

                </el-row>
              </div>
            </el-col>
          </el-row>
          <el-row style="padding: 0 0px;margin-bottom: 10px;">
            <el-col :span="24">
              <div style="padding: 0px;height: 40px;width:100%;display: flex;flex-direction: row;align-items: center">
                <div style="width: 5px;height: 16px;background-color: #1989FA;margin-left: 20px;border: 1px solid #1989FA;border-radius:2.5px;;border-radius:2.5px;"></div>
                <div style="width: 300px;height: 20px;margin-left: 10px;line-height: 20px">
                  <span style="font-size: 16px;color: #303133;">流程设置扩展</span>
                </div>

              </div>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <div style="padding: 0px;height: 60px;width:100%;margin-top: -10px;padding-left: 20px;padding-right: 20px">
                <el-row >
                  <el-col :span="8" style="padding-right: 10px">
                    <div style="margin-top: 12px">

                      <el-form label-width="80px">
                        <el-form-item label="是否会审">
                          <el-select v-model="nodeDic.isJointHearing" clearable  style="overflow:auto">
                            <el-option
                              v-for="dict in fixedApprover"
                              :key="dict.id"
                              :label="dict.lable"
                              :value="dict.id"
                            />
                          </el-select>
                        </el-form-item>
                      </el-form>

                    </div>
                  </el-col>
                  <el-col :span="8" style="padding-left: 10px;padding-right: 10px;">
                    <div style="margin-top: 12px">
                      <el-form label-width="80px">
                        <el-form-item label="允许驳回">
                          <el-select v-model="nodeDic.isAllowTurnDown" clearable  style="overflow:auto">
                            <el-option
                              v-for="dict in fixedApprover"
                              :key="dict.id"
                              :label="dict.lable"
                              :value="dict.id"
                            />
                          </el-select>
                        </el-form-item>
                      </el-form>
                    </div>
                  </el-col>
                  <el-col :span="8" style="padding-left: 10px;padding-right: 10px;">
                    <div style="margin-top: 12px">
                      <el-form ref="form" :model="form" label-width="80px">
                        <el-form-item label="互相可见">
                          <el-select v-model="nodeDic.isEachOtherView" clearable  style="overflow:auto">
                            <el-option
                              v-for="dict in fixedApprover"
                              :key="dict.id"
                              :label="dict.lable"
                              :value="dict.id"
                            />
                          </el-select>
                        </el-form-item>
                      </el-form>
                    </div>
                  </el-col>
                </el-row>
              </div>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <div style="padding: 0px;height: 60px;width:100%;margin-top: -10px;">
                <el-row >
                  <el-col :span="12" style="padding-right: 10px">
                    <div style="margin-top: 12px;padding-left: 20px;padding-right: 20px">

                      <el-form ref="form" :model="form" label-width="100px">
                        <el-form-item label="强制参与会审">
                          <el-select v-model="nodeDic.isForceJoin" clearable  style="overflow:auto">
                            <el-option
                              v-for="dict in fixedApprover"
                              :key="dict.id"
                              :label="dict.lable"
                              :value="dict.id"
                            />
                          </el-select>
                        </el-form-item>
                      </el-form>

                    </div>
                  </el-col>

                </el-row>
              </div>
            </el-col>
          </el-row>
          <el-row style="padding: 0 0px;margin-bottom: 10px;">
            <el-col :span="24">
              <div style="padding: 0px;height: 40px;width:100%;display: flex;flex-direction: row;align-items: center">
                <div style="width: 5px;height: 16px;background-color: #1989FA;margin-left: 20px;border: 1px solid #1989FA;border-radius:2.5px;;border-radius:2.5px;"></div>
                <div style="width: 300px;height: 20px;margin-left: 10px;line-height: 20px">
                  <span style="font-size: 16px;color: #303133;">抄送人员设置</span>
                </div>

              </div>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <div style="padding: 0px;height: 60px;width:100%;margin-top: -10px;padding-left: 20px;padding-right: 20px">
                <el-row >
                  <el-col :span="16" style="padding-right: 10px">
                    <div style="margin-top: 12px">

                      <el-form label-width="120px">
                        <el-form-item label="固定抄送人">
                          <el-select v-model="nodeDic.ccPersonnelIds" multiple clearable filterable  style="overflow:auto">
                            <el-option
                              v-for="dict in personnelInfos"
                              :key="dict.userId"
                              :label="dict.nickName"
                              :value="dict.userId"
                            />
                          </el-select>
                        </el-form-item>
                      </el-form>

                    </div>
                  </el-col>
                  <el-col :span="8" style="padding-left: 10px;padding-right: 10px;">
                    <div style="margin-top: 8px">
                    </div>
                  </el-col>

                </el-row>
              </div>
            </el-col>
          </el-row>
          <!--<el-row style="padding: 0 0px;margin-bottom: 10px;">-->
            <!--<el-col :span="24">-->
              <!--<div style="padding: 0px;height: 40px;width:100%;display: flex;flex-direction: row;align-items: center;">-->
                <!--<div style="width: 5px;height: 16px;background-color: #1989FA;margin-left: 20px;border: 1px solid #1989FA;border-radius:2.5px;;border-radius:2.5px;"></div>-->
                <!--<div style="width: 300px;height: 20px;margin-left: 10px;line-height: 20px">-->
                  <!--<span style="font-size: 16px;color: #303133;">三天不审批自动进入下一个审批点</span>-->
                <!--</div>-->

              <!--</div>-->
            <!--</el-col>-->
          <!--</el-row>-->
          <!--<el-row>-->
            <!--<el-col :span="24">-->
              <!--<div style="padding: 0px;height: 60px;width:100%;margin-top: -10px;padding-left: 20px;padding-right: 20px">-->
                <!--<el-row >-->
                  <!--<el-col :span="10" style="padding-right: 10px">-->
                    <!--<div style="margin-top: 12px">-->

                      <!--<el-form  label-width="80px">-->
                        <!--<template>-->
                          <!--<el-radio v-model="nodeDic.nextNoteState" label="0">是</el-radio>-->
                          <!--<el-radio style="margin-left: 50px" v-model="nodeDic.nextNoteState"  label="1">否</el-radio>-->
                        <!--</template>-->
                      <!--</el-form>-->

                    <!--</div>-->
                  <!--</el-col>-->
                  <!--<el-col :span="14" style="padding-left: 10px;padding-right: 10px;">-->
                    <!--<div style="margin-top: 12px">-->

                    <!--</div>-->
                  <!--</el-col>-->

                <!--</el-row>-->
              <!--</div>-->
            <!--</el-col>-->
          <!--</el-row>-->
        </div>


        <div slot="footer" class="dialog-footer">
          <el-button @click="cancelNodeEnterClick">取 消</el-button>
          <!--addNodeEnter,addBudgetEnter-->
          <el-button type="primary" @click="addNodeEnterClick">确 定</el-button>
        </div>
      </el-dialog>
      <el-dialog style="z-index: 999999" title="审批线路设置" :visible.sync="lineSettingState" width="804px" >
        <div style="width: 100%;height: 368px;margin-top: -20px;">
          <el-row style="padding: 0 0px;margin-bottom: 10px;">
            <el-col :span="24">
              <div style="padding: 0px;height: 50px;width:100%;display: flex;flex-direction: row;align-items: center">
                <div style="width: 5px;height: 16px;background-color: #1989FA;margin-left: 20px;border: 1px solid #1989FA;border-radius:2.5px;;border-radius:2.5px;"></div>
                <div style="width: 300px;height: 20px;margin-left: 10px;line-height: 20px">
                  <span style="font-size: 16px;color: #303133;">审批线路设置</span>
                </div>

                <div style="position: absolute; left: calc(100% - 190px); width: 166px; height: 50px; margin-left: 10px; display: flex;flex-direction: row;align-items: center;">
                  <el-button
                    style="background-color: #EF6060;color: white"
                    icon="el-icon-remove-outline"
                    size="mini"
                    @click="deletBusinessItems()"
                  >删除
                  </el-button>
                  <el-button
                    style="margin-left: 20px"
                    type="primary"
                    icon="el-icon-plus"
                    size="mini"
                    @click="addNewBusinessInfo()"
                  >新增
                  </el-button>

                </div>

              </div>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <div style="padding: 0px;height: 60px;width:100%;margin-top: -10px;background-color: red">
                <el-table
                  :data="subjectDatas"
                  @select="businessInfoListSqlClick"
                  @select-all="businessInfoListSqlClick"
                  :header-cell-style="{'text-align':'center'}"
                  :cell-style="{'text-align':'center'}"
                  :row-style="{height: '50px'}"
                  :height="340"
                  :fit='true'
                  stripe
                  style="width: 100%">
                  <el-table-column
                    type="selection"
                    width="55">
                  </el-table-column>
                  <el-table-column
                    type="index"
                    label="序号"
                    width="50">
                  </el-table-column>
                  <el-table-column
                    prop="processName"
                    :show-overflow-tooltip="true"
                    label="业务信息">
                    <template  slot-scope="scope">

                      <el-select @change="businessInfoSqlClick(scope.row)" v-model="scope.row.code" clearable  style="overflow:auto">
                        <el-option
                          v-for="dict in tableColumnsData"
                          :key="dict.code"
                          :label="dict.name"
                          :value="dict.code"
                        />
                      </el-select>
                    </template>
                  </el-table-column>
                  <el-table-column
                    prop="creator"
                    :show-overflow-tooltip="true"
                    label="比对条件">
                    <template  slot-scope="scope">
                      <el-select v-if="scope.row.dataType == 'char' || scope.row.dataType == 'varchar' || scope.row.dataType == 'varchar' || scope.row.dataType == 'text'" v-model="scope.row.contrastType" clearable  style="overflow:auto">
                        <el-option
                          v-for="dict in comCond3"
                          :key="dict.id"
                          :label="dict.lable"
                          :value="dict.id"
                        />
                      </el-select>

                      <el-select v-else-if="scope.row.dataType == 'int' || scope.row.dataType == 'float' || scope.row.dataType == 'double' || scope.row.dataType == 'decimal'" v-model="scope.row.contrastType" clearable  style="overflow:auto">
                        <el-option
                          v-for="dict in comCond2"
                          :key="dict.id"
                          :label="dict.lable"
                          :value="dict.id"
                        />
                      </el-select>

                      <el-select v-else-if="scope.row.dataType == 'date' || scope.row.dataType == 'datetime' || scope.row.dataType == 'timestamp'" v-model="scope.row.contrastType" clearable  style="overflow:auto">
                        <el-option
                          v-for="dict in comCond4"
                          :key="dict.id"
                          :label="dict.lable"
                          :value="dict.id"
                        />
                      </el-select>
                      <el-select v-else v-model="scope.row.contrastType" clearable  style="overflow:auto">
                        <el-option
                          v-for="dict in comCond1"
                          :key="dict.id"
                          :label="dict.lable"
                          :value="dict.id"
                        />
                      </el-select>
                    </template>
                  </el-table-column>

                  <el-table-column
                    prop="currentNodeName"
                    :show-overflow-tooltip="true"
                    label="比对值">
                    <template  slot-scope="scope">
                      <el-input size="small" v-model="scope.row.contrastValue">
                      </el-input>
                    </template>
                  </el-table-column>


                </el-table>

              </div>
            </el-col>
          </el-row>
        </div>


        <div slot="footer" class="dialog-footer">
          <el-button @click="cancelLineEnterClick">取 消</el-button>
          <el-button type="primary" @click="addLineEnterClick">确 定</el-button>
        </div>
      </el-dialog>
      <dialog-process ref="processDialog" @onProcessListener="onProcessListener"></dialog-process>

   </div>
 </div>



</template>

<script>
  import {getNodeList,saveNodeList,getUserList,saveNodeSetting,getRoleList,getNodeById,getTableColumnsByNodeId,saveCustomRules,getCustomRules} from '../../../api/processEngine/processEngine'
  import dialogProcess from './dialog-process'

  export default {
    name: 'ProcessEditor',
    components:{dialogProcess},
    data(){
      return {
        abc:"ssss",
        processId:"",
        flowObj:null,
        chartData:null,
        belowHeight: 0,
        belowWidth: 0,
        mainHeight:0.0,
        mainWidth:0,
        filterHeight:0.0,
        liuChengMainHeight:"",
        nodeSettingState:false,
        lineSettingState:false,
        form:{
          name:"",

        },
        subjectDatas:[],
        chartData:{},
        fixedApprover:[{
          id:1,
          lable:"是"
        },{
          id:0,
          lable:"否"
        }],
        nodeDic:{
          isFixedApprover:0,
          isJointHearing:0,
          isEachOtherView:0,
          fixedApproverId:"",
          fixedApproverName:"",
          ccPersonnelIds:[],
          ccFixedId:"",
          ccFixedName:"",
          forcedToCc:"",
          nextNoteState:"0",
          isAllowTurnDown:0,
          isForceJoin:0,
          nodeRoleId:"",
          nodeRoleName:""
        },
        personnelInfos:[],
        selNodeId:"",
        roleListData:[],
        nodeInfo:{},
        // businessListData:[],
        tableColumnsData:[],
        comCond1:[
          {
            id:1,
            lable:"等于"
          },
          {
            id:2,
            lable:"不等于"
          },
          {
            id:3,
            lable:"大于"
          },
          {
            id:4,
            lable:"小于"
          },
          {
            id:5,
            lable:"包含"
          },
          {
            id:6,
            lable:"不包含"
          },
          {
            id:7,
            lable:"大于等于"
          },
          {
            id:8,
            lable:"小于等于"
          },

        ],
        comCond2:[
          {
            id:1,
            lable:"等于"
          },
          {
            id:2,
            lable:"不等于"
          },
          {
            id:3,
            lable:"大于"
          },
          {
            id:4,
            lable:"小于"
          },
          {
            id:7,
            lable:"大于等于"
          },
          {
            id:8,
            lable:"小于等于"
          },

        ],
        comCond3:[
          {
            id:1,
            lable:"等于"
          },
          {
            id:2,
            lable:"不等于"
          },
          {
            id:5,
            lable:"包含"
          },
          {
            id:6,
            lable:"不包含"
          },


        ],
        comCond4:[
          {
            id:1,
            lable:"等于"
          },
          {
            id:2,
            lable:"不等于"
          },
          {
            id:3,
            lable:"大于"
          },
          {
            id:4,
            lable:"小于"
          },
        ],
        currSqlLineNodeId:"",
        handleSelebusinessInfo:[],
        processName:"",
        loading:false,



      }
    },
    created(){


      this.processId = this.$route.query.processId;
      this.processName =  this.$route.query.processName;
      this.initFlowObj('edit');
      this.requestUserList();
      this.requestRoleList();


      // getbusinessList

    },
    mounted(){



      var that = this;
      that.$nextTick(function() {

        var elementResizeDetectorMaker = require("element-resize-detector");
        var erd = elementResizeDetectorMaker()
        // //监听id为test的元素 大小变化
        erd.listenTo(document.getElementById('mainContentViewId'), function(element) {
          that.mainHeight = element.offsetHeight
          that.mainWidth = element.offsetWidth
          console.log(that.mainHeight+"++++++++++++++"+that.mainWidth)
          // //  预算科目列表
          // that.mainHeight = element.offsetHeight
          // that.liuChengMainHeight = element.offsetHeight-70+"px"
          // that.mainWidth = element.offsetWidth
          that.belowHeight = that.mainHeight - 70;
          that.belowWidth = that.mainWidth;
          that.initFlowObj('edit');
        })
      })




    },

    methods: {


      // 获取默认节点数据
      requestNodeList(flowObj){

        var that = this;
        var param = {}
        param.processId = that.processId
        that.loading = true;
        getNodeList(param).then(response => {

          that.chartData = response.jsonData
          that.loadFlowObjData(that.chartData,flowObj)


        })
      },

      requestRoleList(){

        var that = this;
        var param = {}
        getRoleList(param).then(response => {

          that.roleListData = response.data;

        })

      },


      requestTableColumnsByNodeId(e){

        var param = {};
        param.nodeId = e

        getTableColumnsByNodeId(param).then(response => {
          console.log(JSON.stringify(response) + "asasdasfsdasd");
          if (response.code == '200') {
            this.tableColumnsData = response.data;
          }
        })

      },

      // 加载流程数据
      loadFlowObjData(chartData,flowObj){

        flowObj.loadData(chartData);
        this.loading = false;


      },

      initFlowObj(type){

        var that = this;
        $(function () {
          console.log("fasfasdasd" + type)
          var flowObj = that.flowObj;
          if (flowObj != undefined) {
            flowObj.destrory();
          }

          flowObj = $.createGooFlow($("#flowObj"), {
            // width: 1220,
            // height: 500,
            width: that.belowWidth,
            height: that.belowHeight,
            toolBtns: type == "edit" ? ["start round", "end round", "task"] : [],
            // toolBtns: type == "edit" ? ["start round", "end round", "task", "node", "join", "fork", "complex mix"] : [],
            haveHead: true,
            headLabel: true,
            initLabelText:"测试流程",
            headBtns: type == "edit" ? ["save", "undo", "redo" ,"clean","reload","back"] : ["reload","back"],//如果haveHead=true，则定义HEAD区的按钮
            haveTool: type == "view" ? false : true,
            // haveGroup: true,
            haveGroup: false,
            useOperStack: true,
            settingEnable: type == "edit" ? false : true,//是否是设置模式
          });
          that.flowObj = flowObj
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
          flowObj.setHeadToolsRemarks({
            back: "返回",
            save: "保存",
            undo: "后退",
            redo: "前进",
            reload: "切换模式",
            clear: "清空",
            clean:'删除',
          });

          // 返回按钮
          flowObj.onBtnBackClick = function () {
            console.log("asfasdfasdf")

            that.$router.go(-1);
            // that.$router.go(0);
          }
          flowObj.onBtnCleanClick = function () {
            flowObj.clearData();
          }
          //切换模式
          flowObj.onFreshClick = function () {
            flowObj = null
            that.initFlowObj(type == "edit" || type == "view" ? "setting" : "edit");
            // console.log("asfasdfasdf")
          }
          flowObj.onBtnSaveClick = function () {
            //节点保存时提示如果流程已被引用过则保存后流程会升级版本
            that.saveFlowData(this.exportData());
            // console.log("gsdfasdfasd")
          }
          flowObj.nodeSetting= function (e) {
            //节点保存时提示如果流程已被引用过则保存后流程会升级版本

            console.log("fffffffff"+e)
            // that.nodeSettingState = true;
              that.selNodeId = e
              that.requestNodeById(e);
            // that.$refs.processDialog.openDialog()


          }
          flowObj.lineSetting= function (e) {
            //节点保存时提示如果流程已被引用过则保存后流程会升级版本

            that.lineSettingState=true;
            console.log("hhhhhhhhhhhhhhh"+e)
            that.currSqlLineNodeId = e
            that.requestTableColumnsByNodeId(e);
            that.requestCustomRules(e)
          }


          if ( that.chartData == null || JSON.stringify(that.chartData) == "{}"){
            // 初始化渲染
            that.requestNodeList(flowObj)
            console.log("hhhhhhhhhhhhhhh"+1)
          }else {
            that.loadFlowObjData(that.chartData,flowObj)
            console.log("hhhhhhhhhhhhhhh"+2+JSON.stringify(that.chartData))
          }


        })



      },
      requestNodeById(e){
        var that = this;
        var param = {}
        param.nodeId = e
        getNodeById(param).then(response => {

          if (response.code == '200') {
            that.$refs.processDialog.openDialog(response.data)
            console.log(JSON.stringify(response)+"asfasdfasdfasdf");
            that.nodeInfo = response
            that.nodeDic.isFixedApprover = that.nodeInfo.data.isFixedApprover == undefined?0:parseInt(that.nodeInfo.data.isFixedApprover);
            that.nodeDic.isJointHearing =  that.nodeInfo.data.isJointHearing == undefined?0:     parseInt(that.nodeInfo.data.isJointHearing);
            that.nodeDic.isEachOtherView = that.nodeInfo.data.isEachOtherView == undefined?0: parseInt(that.nodeInfo.data.isEachOtherView);
            that.nodeDic.fixedApproverId =  that.nodeInfo.data.fixedApproverId == undefined?"":that.nodeInfo.data.fixedApproverId;
            that.nodeDic.fixedApproverName = that.nodeInfo.data.fixedApproverName == undefined?"": that.nodeInfo.data.fixedApproverName;
            that.nodeDic.isAllowTurnDown =  that.nodeInfo.data.isAllowTurnDown == undefined?0: parseInt(that.nodeInfo.data.isAllowTurnDown);
            that.nodeDic.isForceJoin = that.nodeInfo.data.isForceJoin == undefined?0: parseInt(that.nodeInfo.data.isForceJoin);
            that.nodeDic.nodeRoleId = that.nodeInfo.data.nodeRoleId == undefined?"": that.nodeInfo.data.nodeRoleId;
            that.nodeDic.nodeRoleName = that.nodeInfo.data.nodeRoleName == undefined? "": that.nodeInfo.data.nodeRoleName;
            var ccFixedIds = that.nodeInfo.data.ccFixedId == undefined?"": that.nodeInfo.data.ccFixedId.split(",")
            that.nodeDic.ccPersonnelIds = ccFixedIds;
          }

        })

      },
      saveFlowData(chartData){
        this.chartData = chartData;
        this.requestSaveNodeList();

      },

      // 获取线的节点信息
      requestCustomRules(e){
        var param = {}
        param.nodeId = e
        getCustomRules(param).then(response => {
          console.log(JSON.stringify(response)+"sfddsfdsfsdsadAS")
          if (response.code == '200') {
            this.subjectDatas = response.data;

            this.subjectDatas.forEach((item,index)=> {

              item.contrastType = parseInt(item.contrastType);
              item.index = index;

            })
          }


        })

      },

      // 保存节点信息
      requestSaveNodeList(){

        var param = {}
        var that = this;
        param.chartData = JSON.stringify(this.chartData);
        param.processId = this.processId;
        saveNodeList(param).then(response => {
          if (response.code == '200') {

            this.processId = response.data.newProcessId
            that.msgSuccess("保存成功");
            console.log(JSON.stringify(response)+"xixixixixixi")
            that.requestNodeList(that.flowObj);
          }


        })

      },

      // 获取用户信息列表
      requestUserList() {

        var that = this
        var param = {}
        getUserList(param).then(response => {

          if (response.code == 200) {
            // that.applySubjectDatas = response.rows
            console.log(JSON.stringify(response) + 'ffffgggggghhhhhh');
            that.personnelInfos = response.rows;

            } else {
            that.msgError(response.msg)
          }

        })

      },

      // 初始化加载
      initFlowById(e,chartData){
        console.log("fasdfasdasd"+JSON.stringify(chartData));
        e.loadData(chartData);

      },
      addNodeEnterClick(){

        this.personnelInfos.forEach((item,index)=>{

          if (item.userId == this.nodeDic.fixedApproverId) {
            this.nodeDic.fixedApproverName = item.nickName;
          }

        })

        this.roleListData.forEach((item,index)=> {

          if (this.nodeDic.nodeRoleId == item.roleId) {

            this.nodeDic.nodeRoleName = item.roleName

          }
        });

        var userNames="";
        var userIds="";

        if(this.nodeDic.ccPersonnelIds != null && this.nodeDic.ccPersonnelIds.length>0){
          this.nodeDic.ccPersonnelIds.forEach((item,index)=> {
            this.personnelInfos.forEach((itemUser,indexUser)=>{

              if (itemUser.userId == item) {
                if (index == (this.nodeDic.ccPersonnelIds.length -1))
                {
                  userNames = userNames+itemUser.nickName;
                  userIds = userIds+itemUser.userId;
                }else{
                  userNames = userNames+itemUser.nickName+",";
                  userIds = userIds+itemUser.userId+",";

                }
              }
            });

          });
        }





        this.nodeDic.ccFixedId = userIds;
        this.nodeDic.ccFixedName = userNames;
        console.log(JSON.stringify(this.nodeDic)+"awfsdfsdfgfddgdfd")
        this.nodeDic.nodeId = this.selNodeId
        this.requsetSaveNodeSetting();
      },


      requsetSaveNodeSetting(){
        var param = {}
        var that = this;
        param = this.nodeDic;
        saveNodeSetting(param).then(response => {

          if (response.code == '200') {

            this.msgSuccess("保存成功");
            console.log(JSON.stringify(response)+"xixixixixixihahah")
            that.nodeSettingState = false;
            that.$refs.processDialog.closeDialog()

          }


        })
      },

      // 取消节点的弹出框
      cancelNodeEnterClick(){

        this.nodeSettingState = false;

      },

      // 列表选择方法
      businessInfoListSqlClick(e,a){
        this.handleSelebusinessInfo = [];
        this.handleSelebusinessInfo = e;
        console.log(JSON.stringify(e)+"fdfffffffff"+JSON.stringify(a))

      },

      // 确定线的条件
      //
      addLineEnterClick(){

        // console.log(JSON.stringify(this.subjectDatas)+"asfdadsfasdfsdf")

        var businessInfo = {}
        businessInfo.name = "";
        businessInfo.code = ""
        businessInfo.dataType = ""
        businessInfo.contrastType = ""
        businessInfo.contrastValue = ""

        var dataCompleteState = true
        this.subjectDatas.forEach((item,index)=> {
          if (item.name.length<1 || item.contrastType.length<1 || item.contrastValue.length<1){
            dataCompleteState = false;
          }
        })

        if(dataCompleteState == false){
          this.msgError("请填写完整的数据")

        }else {

          this.requestSaveCustomRules(this.subjectDatas)
        }


      },

      // 保存线的条件
      requestSaveCustomRules(subjectDatas){
        var that = this;
        var param = {}
        param.processId = this.processId;
        param.nodeId = this.currSqlLineNodeId;
        param.customRulesList = JSON.stringify(subjectDatas);
        console.log(JSON.stringify(param)+"ffff")
        saveCustomRules(param).then(response => {
          if (response.code == '200') {

            that.msgSuccess("保存成功");
            console.log(JSON.stringify(response)+"hahahahahahahaha")
            this.lineSettingState=false

          }
        })

      },

      // 取消线的条件
      cancelLineEnterClick(){

        this.lineSettingState=false

      },

      // 新增业务信息
      addNewBusinessInfo(){


          var businessInfo = {}
          businessInfo.name = "";
          businessInfo.code = ""
          businessInfo.dataType = ""
          businessInfo.contrastType = ""
          businessInfo.contrastValue = ""

           var maxIndex = 0

          this.subjectDatas.forEach((item,index)=> {
            if (item.index>maxIndex){
              maxIndex = item.index;
            }
          })


          businessInfo.index = maxIndex+1;
          this.subjectDatas.push(businessInfo);




      },

      // 删除选择的数据
      deletBusinessItems(){


        console.log(JSON.stringify(this.handleSelebusinessInfo)+"xixixixixixihahahahahahah")
        console.log(JSON.stringify(this.subjectDatas)+"doudoudoudoudoudou")

        if (this.handleSelebusinessInfo.length > 0){
            this.handleSelebusinessInfo.forEach((item1,index1)=> {
              this.subjectDatas.forEach((item,index)=> {
                if (item1.index == item.index) {
                  this.subjectDatas.splice(index, 1);
                }
              })
            })
        }
        // this.msgSuccess("数据删除成功");

        this.handleSelebusinessInfo = [];

      },
      businessInfoSqlClick(e){


        this.tableColumnsData.forEach((item,index)=> {
          if (item.code == e.code){
            e.dataType = item.dataType;
            e.name = item.name
            e.contrastType = "";
            e.contrastValue = "";

          }
        })
        console.log(JSON.stringify(e)+"asdsfdasdasdasdsad")

      },
      //流程配置弹窗回调
      onProcessListener(nodeDic){
        this.nodeDic = nodeDic
        this.nodeDic.nodeId = this.selNodeId
        console.log('data---'+JSON.stringify(this.nodeDic))
        this.requsetSaveNodeSetting();
      }

    }
  }
</script>

<style lang="scss" scoped>
  #processEditorDetailView .app-box {

    position: absolute;
    width: 100%;
    height: 100%;
    /*background-color: gray;*/
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
      width: calc(100% - 40px);
      height: calc(100% - 40px);
    }

  }




</style>


<style scoped>
  .el-form--label-top .el-form-item__label {
    padding: 0;
    font-weight: normal;


  }

  .el-divider--horizontal {
    margin: 0;
  }

  .el-form-item {
    margin-bottom: 0;
  }

  .el-input--medium .el-input__inner {
    height: 32px;
    line-height: 32px;
    /*border: 1px solid #eee;*/
    font-size: 14px;
    color: #9C9C9C;
  }


  /*  预算调整  */
  .add_persion .el-dialog__body {
    padding: 10px 20px;
  }

  .add_persion .el-form-item {
    margin-bottom: 10px;
  }

  .add_persion .el-form--label-top .el-form-item__label {
    padding: 0;
  }

  .add_persion .el-select {
    width: 100%;
  }

  .add_persion .el-date-editor.el-input, .el-date-editor.el-input__inner {
    width: 100%;
  }

  .el-form-item__label{
    text-align: left;

  }

  .el-form-item {
    margin-bottom: 0;
    /*margin-top: 15px;*/
  }

  .el-radio {
    margin-left: 20px;
    color: #606266;
    font-weight: 500;
    line-height: 1;
    position: relative;
    cursor: pointer;
    display: inline-block;
    white-space: nowrap;
    outline: none;
    font-size: 14px;
    margin-right: 5px;
    -moz-user-select: none;
    -webkit-user-select: none;
    -ms-user-select: none;
  }

  .maiLiuChengView{
    width: 100%;
    height: 500px;
    margin-left: -20px;

  }

  ::-webkit-scrollbar {
    width: 0 !important;
  }
  ::-webkit-scrollbar {
    width: 0 !important;height: 0;
  }


  /deep/  el-table__row>td {
    border: none;
  }

  .el-table::before {
    height: 0px;
  }

  .el-dialog__footer {
    padding: 20px;
    padding-top: 20px;
    text-align: right;
    box-sizing: border-box;
    box-shadow: inset 0 1px 0 0 #EEEEEE;
  }

  .el-dialog{
    display: flex;
    flex-direction: column;
    margin:0 !important;
    position:absolute;
    top:50%;
    left:50%;
    transform:translate(-50%,-60%);
    /*height:600px;*/
    max-height:calc(100% - 30px);
    max-width:calc(100% - 30px);
  }
  .el-dialog .el-dialog__body{
    flex:1;
    overflow: auto;
  }

</style>
