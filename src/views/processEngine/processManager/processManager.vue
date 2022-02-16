<template>
    <div id="processManagerList">
      <div class="app-box">
        <div class="app-container" id="mainContentViewId">
          <div class="page-header" style="height: 50px">
            <div class="header-left">
              <div style="padding-left:20px;display: flex;align-items: center">
                <el-image
                  style="margin-left: 0px;width: 25px;height:25px;"
                  :src="require('@/assets/image/cengji.png')">
                </el-image>
                <span style="font-size: 20px">工作流引擎管理</span>
              </div>
            </div>
            <div class="header-right">
              <!--class="newAdd"-->
              <el-button
                type="primary"
                icon="el-icon-plus"
                size="mini"
                @click="addNewBudgetItems()"
              >创建流程
              </el-button>

            </div>

          </div>
          <el-row>
            <el-col :span="24">
              <div id="filterHeightViewId"
                   style="position: relative;width:100%;height: auto;padding-top: 10px;padding-bottom: 10px;margin: 0px;">
                <div v-if="shaixuanState==true">
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
                  </el-row>
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

          <!-- 流程搜索条件-->
          <el-row>
            <el-col :span="24">
              <el-form  :model="queryParams" ref="queryForm"  class="search-form">
                <el-form-item label="流程标题" prop="menuName">
                  <el-input
                    v-model="queryParams.processName"
                    placeholder="请输入流程标题"
                    clearable
                    size="small"
                  />
                </el-form-item>
                <el-form-item label="关联业务" prop="status">
                  <el-select v-model="queryParams.businessType" placeholder="关联业务" clearable size="small">
                    <el-option
                      v-for="dict in businessOption"
                      :key="dict.businessType"
                      :label="dict.businessName"
                      :value="dict.businessType"
                    />
                  </el-select>
                </el-form-item>
                <el-form-item class="search-btn">
                  <el-button type="primary" icon="el-icon-search" size="mini" @click="requestProcessList" style="height:31px">查询</el-button>
                  <el-button icon="el-icon-refresh" size="mini" @click="resetQuery" style="height:32px;">重置</el-button>
                </el-form-item>
              </el-form>
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
                    prop="processName"
                    :show-overflow-tooltip="true"
                    label="流程标题">
                  </el-table-column>
                  <el-table-column
                    prop="businessName"
                    :show-overflow-tooltip="true"
                    label="关联业务">
                  </el-table-column>
                  <el-table-column
                    prop="userState"
                    :show-overflow-tooltip="true"
                    label="是否开启">
                  </el-table-column>
                  <el-table-column
                    prop="state"
                    :show-overflow-tooltip="true"
                    width="200"
                    label="操作">
                    <template slot-scope="scope">
                      <el-button @click="processEditorMethods(scope.row,scope.$index)" type="text" size="small">编辑</el-button>
                      <el-button @click="processPropertyConfig(scope.row,scope.$index)" type="text" size="small">流程属性配置</el-button>
                      <el-button @click="processDeleteMethods(scope.row,scope.$index)" style="color:#F56C6C" type="text" size="small">删除
                      </el-button>

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

        <!--  弹出框  -->
        <el-dialog title="创建流程" :visible.sync="addProcessState" width="860px" >
          <div >
            <div  >
              <el-form :model="processCreateData" label-position="left"  >
                <el-row>
                  <el-col :span="6" class="info-top">
                    <div></div>
                    <span>基本信息</span>
                  </el-col>
                </el-row>
                <el-row :gutter="20">
                  <el-col :span="12">
                    <el-form-item   label="流程名称"  :required="true">
                      <el-input v-model="processCreateData.processName" maxlength="30"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="关联业务" :required="true"  size="74" >
                      <el-select v-model="processCreateData.businessType" filterable  clearable  style="overflow:auto">
                        <el-option
                          v-for="dict in businessOption"
                          :key="dict.businessType"
                          :label="dict.businessName"
                          :value="dict.businessType"
                        />
                      </el-select>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row :gutter="20">
                  <el-col :span="24">
                    <el-form-item label="描述" prop="changeReason" >
                      <div  >
                        <el-input type="textarea" maxlength="200"  v-model="processCreateData.remark"  placeholder="请输入" :autosize="{ minRows: 4, maxRows: 4}"></el-input>
                      </div>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row :gutter="20">
                  <el-col :span="24">
                    <el-form-item  :required="true" label="是否启用" size="74">
                      <el-radio-group v-model="processCreateData.isEnableStr">
                        <el-radio label="是"></el-radio>
                        <el-radio label="否"></el-radio>
                      </el-radio-group>
                    </el-form-item>
                  </el-col>
                </el-row>

                <el-row>
                  <el-col :span="6" class="info-top">
                    <div></div>
                    <span>其他配置</span>
                  </el-col>
                </el-row>

                <el-row>
                  <el-col :span="24">
                    <el-form-item class="item-width-other" label="审批节点内成员离职、为空等情况的处理方式" :required="true"  size="74" >
                      <el-select @change="otherOptionsChange" v-model="processCreateData.nodeUserNotExit" clearable  style="overflow:auto">
                        <el-option
                          v-for="dict in otherOptions1"
                          :key="dict.dictValue"
                          :label="dict.dictLabel"
                          :value="dict.dictValue"
                        />
                      </el-select>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row v-show="showSelUser">
                  <el-col :span="24">
                    <el-form-item class="item-width-other" label="选择指定审批人" prop="pointUser">
                      <el-input class="suffix-inner"
                                v-model="processCreateData.pointUser"
                                placeholder="请选择指定审批人"
                                readonly
                                @click.native="inputSelectUser()"
                                suffix-icon="el-icon-plus" />
                    </el-form-item>
                  </el-col>
                </el-row>

                <el-row>
                  <el-col :span="24">
                    <el-form-item class="item-width-other" label="当同一个审批人重复审批同一单据时" :required="true"  size="74" >
                      <el-select v-model="processCreateData.nodeUserRepeat" clearable  style="overflow:auto">
                        <el-option
                          v-for="dict in otherOptions2"
                          :key="dict.dictValue"
                          :label="dict.dictLabel"
                          :value="dict.dictValue"
                        />
                      </el-select>
                    </el-form-item>
                  </el-col>
                </el-row>

              </el-form>

            </div>

          </div>


          <div slot="footer" class="dialog-footer">
            <el-button @click="cancelProcessCreateClick">取 消</el-button>
            <el-button type="primary" @click="addProcessCreateClick">确 定</el-button>
          </div>
        </el-dialog>


        <el-dialog title="编辑流程" :visible.sync="editProcessState" width="860px" >
          <div >
            <div  >
              <el-form :model="processCreateData" label-position="left"  >
                <el-row>
                  <el-col :span="6" class="info-top">
                    <div></div>
                    <span>基本信息</span>
                  </el-col>
                </el-row>
                <el-row :gutter="20">
                  <el-col :span="12">
                    <el-form-item   label="流程名称"  :required="true">
                      <el-input v-model="processCreateData.processName" maxlength="30"></el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item label="关联业务" :required="true"  size="74" >
                      <el-select disabled v-model="processCreateData.businessType" filterable clearable  style="overflow:auto">
                        <el-option
                          v-for="dict in businessOption"
                          :key="dict.businessType"
                          :label="dict.businessName"
                          :value="dict.businessType"
                        />
                      </el-select>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row :gutter="20">
                  <el-col :span="24">
                    <el-form-item label="描述" prop="changeReason" >
                      <div  >
                        <el-input type="textarea" maxlength="200"  v-model="processCreateData.remark"  placeholder="请输入" :autosize="{ minRows: 4, maxRows: 4}"></el-input>
                      </div>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row :gutter="20">
                  <el-col :span="24">
                    <el-form-item  :required="true" label="是否启用" size="74">
                      <el-radio-group v-model="processCreateData.isEnableStr">
                        <el-radio label="是"></el-radio>
                        <el-radio label="否"></el-radio>
                      </el-radio-group>
                    </el-form-item>
                  </el-col>
                </el-row>

                <el-row>
                  <el-col :span="6" class="info-top">
                    <div></div>
                    <span>其他配置</span>
                  </el-col>
                </el-row>

                <el-row>
                  <el-col :span="24">
                    <el-form-item class="item-width-other" label="审批节点内成员离职、为空等情况的处理方式" :required="true"  size="74" >
                      <el-select @change="otherOptionsChange" v-model="processCreateData.nodeUserNotExit" clearable  style="overflow:auto">
                        <el-option
                          v-for="dict in otherOptions1"
                          :key="dict.dictValue"
                          :label="dict.dictLabel"
                          :value="dict.dictValue"
                        />
                      </el-select>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row v-show="showSelUser">
                  <el-col :span="24">
                    <el-form-item class="item-width-other" label="选择指定审批人" prop="pointUser">
                      <el-input class="suffix-inner"
                                v-model="processCreateData.pointUser"
                                placeholder="请选择指定审批人"
                                readonly
                                @click.native="inputSelectUser()"
                                suffix-icon="el-icon-plus" />
                    </el-form-item>
                  </el-col>
                </el-row>

                <el-row>
                  <el-col :span="24">
                    <el-form-item class="item-width-other" label="当同一个审批人重复审批同一单据时" :required="true"  size="74" >
                      <el-select v-model="processCreateData.nodeUserRepeat" clearable  style="overflow:auto">
                        <el-option
                          v-for="dict in otherOptions2"
                          :key="dict.dictValue"
                          :label="dict.dictLabel"
                          :value="dict.dictValue"
                        />
                      </el-select>
                    </el-form-item>
                  </el-col>
                </el-row>

              </el-form>

            </div>

          </div>


          <div slot="footer" class="dialog-footer">
            <el-button @click="cancelEditProcessCreateClick">取 消</el-button>
            <el-button type="primary" @click="editProcessCreateClick">确 定</el-button>
          </div>
        </el-dialog>
      </div>

      <!--选择固定审批人-->
      <publice-select-user ref="selUser" @onSelectData="onSelectData"></publice-select-user>

    </div>
</template>

<script>


  import {getProcessList,getbusinessList,getProcessAdd,getProcessEdit,processRemove} from '../../../api/processEngine/processEngine'
  export default {
    name: 'ProcessManager',
    data() {
      return {
        queryParams:{
          pageNum:1,
          pageSize:10,
        },
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
        showSelUser:false,
        otherOptions1:[
          {
            dictLabel:'自动同意',
            dictValue:'1'
          },
          {
            dictLabel:'转交给指定人员处理',
            dictValue:'2'
          }
        ],
        otherOptions2:[
          {
            dictLabel:'仅首个节点需要审批，其余自动同意',
            dictValue:'1'
          },
          {
            dictLabel:'仅连续审批时自动同意',
            dictValue:'2'
          },
          {
            dictLabel:'每个节点都需要审批',
            dictValue:'3'
          }
        ],
        totalNum:0,
        filterHeight:0.0,
        currentPage:1,
        pageSizes:[1,10,100, 200, 300, 400],
        pageSize:10,
        subjectDatas:[],
        belowHeight:'333',
        addProcessState:false,
        editProcessState:false,
        ruleForm:{

          subjectType:"",
          subjectCode:"",
          subjectName:"",
          isQuote:"",
          subjectSid:""

        },
        rules: {
          subjectType: [
            { required: true, message: '请输入流程名称', trigger: 'blur' },
            { min: 1, max: 25, message: '长度在 1 到 25 个字符', trigger: 'blur' }
          ],
          subjectCode: [
            { required: true, message: '请选择关联业务' +
                '', trigger: 'blur' },
            { min: 1, max: 25, message: '长度在 1 到 25 个字符', trigger: 'blur' }
          ],
          subjectName: [
            { required: true, message: '请输入成本明细', trigger: 'blur' },
            { min: 1, max: 25, message: '长度在 1 到 25 个字符', trigger: 'blur' }
          ]
        },
        shaixuanState:false,
        processCreateData:{

          processName:"",
          businessName:"",
          businessType:"",
          remark:"",
          isEnable:"",
          isEnableStr:"",
          processId:"",
        },
        businessOption:[],
        loading:false,
      }
    },
    created(){

      var clientHeight =   document.body.clientHeight
      this.belowHeight = (clientHeight - 250).toString();
      this.requsetBusinessList();
      this.requestProcessList();
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
        //console.log(abc + 'asdfasdfasd')
        that.$nextTick(function() {
          that.belowHeight = abc
        })


      })


    },
    methods: {
      onSelectData(user){
        this.$set(this.processCreateData,'pointUser',user.nickName)
        this.$set(this.processCreateData,'appointApprover',user.userId)
        // this.$set(this.nodeDic,'appointApprover',user.userId)
        // this.$set(this.nodeDic,'fixedApproverId',user.userId)
        // this.$set(this.nodeDic,'fixedApproverName',user.nickName)
        //console.log('user='+JSON.stringify(user))
        //processCreateData.pointUser
      },
      inputSelectUser(){
        this.$refs.selUser.openDialog()
      },
      otherOptionsChange(val){

        if(val == '2'){
          this.showSelUser = true
        }else{
          this.showSelUser = false
        }
      },
      resetQuery(){
        this.queryParams = {
          pageNum:1,
          pageSize:10,
        }
        this.requestProcessList()
      },
      // 获取数据列表
      requestProcessList(){
        var that = this;
        var param = {}
        that.loading = true;
        param.pageNum=this.currentPage;
        param.pageSize=this.pageSize;
        param = {
          ...this.queryParams,
          pageNum:this.currentPage,
          pageSize:this.pageSize,
        }
        getProcessList(param).then(response => {

          if (response.code == '200') {
            this.subjectDatas = response.rows;
            that.subjectDatas.forEach((item,index)=>{
              if (item.isEnable == '1') {
                item.userState = "是"
              }else {
                item.userState = "否"
              }
            })
            this.totalNum = response.total;
            //JSON.stringify(response) + "asfdasdasdasdsgfsd");
          }
          that.loading = false;
        })

      },

      // 创建流程
      addNewBudgetItems(){


        // 初始化新增的数据
        this.processCreateData.processName = "";
        this.processCreateData.businessType = "";
        this.processCreateData.remark = "";
        this.processCreateData.isEnable = "";
        this.processCreateData.isEnableStr = "";
        this.processCreateData.processId = "";
        this.addProcessState = true
        this.requsetBusinessList();

      },


      requsetBusinessList(){

        var param = {}
        getbusinessList(param).then(response => {

          if (response.code == '200') {
            this.businessOption = response.data;
          }
          //console.log(JSON.stringify(response)+"asfasdasdasdasss")
        });


      },

      // 确定选择
      addProcessCreateClick(){




        this.businessOption.forEach((item,index)=> {

          if (item.businessType == this.processCreateData.businessType){
            this.processCreateData.businessName = item.businessName
          }

        });

        if (this.processCreateData.isEnableStr == "是"){


          this.processCreateData.isEnable = '1';

        }else if(this.processCreateData.isEnableStr == "否"){

          this.processCreateData.isEnable = '0';

        }



        // processName:"",
        //   businessName:"",
        //   businessType:"",
        //   remark:"",
        //   isEnable:"",
        //   isEnableStr:"",
        //   processId:"",


        if(this.processCreateData.processName.length<1){

          this.msgError("请填写流程名称")

        }else if (this.processCreateData.businessType.length<1) {
          this.msgError("请关联相关业务")
        }else if (this.processCreateData.isEnable.length<1) {
          this.msgError("请选择是否启用流程")
        }else {
          this.requsetProcessAdd();
        }






      },



      requsetProcessAdd(){

        var param = {}
        param = this.processCreateData;
        getProcessAdd(param).then(response => {

          if (response.code == '200') {
            // this.businessOption = response.data;
            //console.log(JSON.stringify(response)+"xixixihahahahhahah")
            this.addProcessState = false;
            this.msgSuccess("保存成功");
            this.requestProcessList();
          }

        });


      },
      cancelProcessCreateClick(){


        this.addProcessState = false;





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
        //
        this.requestProcessList()

      },
      handleCurrentChange(e){
        this.currentPage = e;
        this.requestProcessList()
      },


      // 流程编辑
      processEditorMethods(e1){

        //console.log(JSON.stringify(e)+"xixixixihahahahahha")
        let e = JSON.parse(JSON.stringify(e1))

        this.processCreateData.processName = e.processName;
        this.processCreateData.businessName = e.businessName;
        this.processCreateData.businessType = e.businessType;
        this.processCreateData.remark = e.remark;
        this.processCreateData.processId = e.processId;

        this.processCreateData.nodeUserNotExit = e.nodeUserNotExit;
        this.$set(this.processCreateData,'nodeUserNotExit',e.nodeUserNotExit || '')
        this.$set(this.processCreateData,'appointApprover',e.appointApprover || '')
        this.$set(this.processCreateData,'nodeUserRepeat', e.nodeUserRepeat || '')
        this.$set(this.processCreateData,'pointUser',e.appointApprover ||'')
        // this.processCreateData.appointApprover = e.appointApprover;
        // this.processCreateData.pointUser = e.appointApprover;
        // this.processCreateData.nodeUserRepeat = e.nodeUserRepeat;

        //this.processCreateData = {...e}
        this.editProcessState = true


        if (e.isEnable == '1') {
          this.processCreateData.isEnable = e.isEnable
          this.processCreateData.isEnableStr = "是"
          this.$set(this.processCreateData,'isEnableStr','是')

        }else {
          this.processCreateData.isEnable = e.isEnable
          this.processCreateData.isEnableStr = "否"
          this.$set(this.processCreateData,'isEnableStr','否')

        }
        this.$forceUpdate()

        this.requsetBusinessList();
        //


      },

      cancelEditProcessCreateClick(){
        this.editProcessState = false
      },

      // 编辑流程信息
      editProcessCreateClick(){

        if (this.processCreateData.isEnableStr == "是"){


          this.processCreateData.isEnable = '1';

        }else if(this.processCreateData.isEnableStr == "否"){

          this.processCreateData.isEnable = '0';

        }

        if(this.processCreateData.processName.length<1){

          this.msgError("请填写流程名称")

        }else if (this.processCreateData.isEnable.length<1){
          this.msgError("请选择谁否启用")
        }else {
          this.requsetProcessEdit()
        }



      },

      requsetProcessEdit(){

        var param = {}
        param = this.processCreateData;
        if(param.nodeUserNotExit != '2'){
          param.appointApprover = ''
        }
        getProcessEdit(param).then(response => {

          if (response.code == '200') {
            // this.businessOption = response.data;
           // console.log(JSON.stringify(response)+"xixixihahahahhahah")
            this.editProcessState = false;
            this.msgSuccess("保存成功");
            this.requestProcessList();
          }

        });


      },

      //   流程属性配置
      processPropertyConfig(e){


        //console.log(JSON.stringify(e)+"asdfszdfsfs")

        this.$router.push({
          path:'processEditorDetail',
          query: {
            processName:e.processName,
            processId:e.processId,

          }
        })

      },
      // 流程删除
      processDeleteMethods(e){


        var that = this;

        this.$confirm('是否确认删除该条流程数据？', '温馨提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {

          //console.log(JSON.stringify(e)+"asdfszdfsfs");
          var param={};
          param.ids = e.processId;
          processRemove(param).then(response => {

            if (response.code == '200') {
              // this.businessOption = response.data;
              //JSON.stringify(response)+"xixixihahahahhahah")
              that.editProcessState = false;
              that.msgSuccess("删除成功");
              that.requestProcessList();
            }

          });



        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });




      },





    }
  }
</script>

<style lang="scss" scoped>
  #processManagerList .app-box {

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
      /*width: calc(100% - 40px);*/
      height: calc(100% - 40px);
    }

  }

  .item-width-other{

   /deep/ .el-form-item__label{
      width:800px !important;
      text-align: right;
    }
  }
  .info-top{
    display: flex;
    align-items: center;
    margin-bottom: 20px;
    margin-top: 10px;
    margin-left: 20px;
    div{
      width: 5px;
      height: 20px;
      border-radius: 3px;
      background-color: #1989fa;
      margin-right: 5px;
    }
    span{
      font-size: 18px;
      font-weight: bold;
    }
  }
  /deep/ .el-dialog__header {
    background: #ebf2fe;
    color: #1989fa;
  }
  /deep/ .el-dialog__title{
    color: #1989fa;
  }



</style>


<style  scoped>
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
  /deep/ .el-form-item{
    display: flex;
  }
  /deep/ .el-form-item__content{
    width: 100%;
  }
  /deep/ .el-form-item__label{
    width: 140px;
    text-align: right;
  }

  .search-form{
    display: flex;
    align-items: center;

  }
  .search-btn{
    margin-left: 20px;
  }
</style>
