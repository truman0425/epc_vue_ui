<!--<template>-->
<!--  <div id="projectPlanningListVue">-->
<!--    <div class="app-box">-->
<!--      <div-->
<!--        class="app-container"-->
<!--        :style="{ 'min-height': appContantHeight + 'px' }"-->
<!--      >-->

<!--        <div class="page-header">-->
<!--          <div class="header-btn">-->
<!--            <el-row :gutter="20" style="width: 100%;">-->
<!--              <el-col :span="20">-->
<!--                &lt;!&ndash;筛选条件&ndash;&gt;-->
<!--                <table-search-item-->
<!--                  ref="tableSeach"-->
<!--                  :queryParams="queryParams"-->
<!--                  @onSearch="getList"-->
<!--                  :filterOption="filterOptions"-->
<!--                >-->
<!--                </table-search-item>-->
<!--              </el-col>-->
<!--              <el-col :span="4">-->
<!--                    <div class="right-btn">-->
<!--                      <el-button-->
<!--                        style="border: 2px solid; font-weight: bold"-->
<!--                        @click="handleAdd"-->
<!--                        size="small"-->
<!--                        type="primary"-->
<!--                        icon="el-icon-plus"-->
<!--                        plain-->
<!--                      >新增</el-button>-->

<!--                    </div>-->
<!--              </el-col>-->
<!--            </el-row>-->
<!--          </div>-->
<!--        </div>-->

<!--        <my-table-->
<!--          :tableData="projectData"-->
<!--          :columns="columns"-->
<!--          :loading="loading"-->
<!--          multiSelect-->
<!--          :autoWidth="true"-->
<!--          :haveApprove="false"-->
<!--          @tabItemClick="tabItemClick"-->
<!--          @actionBtnClick="actionBtnClick"-->
<!--          @selectionChange="handleSelection"-->
<!--          :pageObj="pageObj"-->
<!--          showShip-->
<!--        >-->
<!--        </my-table>-->

<!--        <div v-show="projectData.length == -9" class="img-div">-->

<!--          <div class="approval-status">-->
<!--            &lt;!&ndash;            0=新增,1=审批中,2=驳回,3=已立项&ndash;&gt;-->
<!--            <div>审批状态：</div>-->
<!--            <div>-->
<!--              <el-image-->
<!--                class="img-state"-->
<!--                :src="require('@/assets/image/approve_add.png')"-->
<!--              ></el-image>-->
<!--              <span class="approve-text">新增</span>-->
<!--            </div>-->
<!--            <div>-->
<!--              <el-image-->
<!--                class="img-state"-->
<!--                :src="require('@/assets/image/approve_spz.png')"-->
<!--              ></el-image>-->
<!--              <span class="approve-text">审批中</span>-->
<!--            </div>-->
<!--            <div>-->
<!--              <el-image-->
<!--                class="img-state"-->
<!--                :src="require('@/assets/image/approve_bh.png')"-->
<!--              ></el-image>-->
<!--              <span class="approve-text">驳回</span>-->
<!--            </div>-->
<!--            <div>-->
<!--              <el-image-->
<!--                class="img-state"-->
<!--                :src="require('@/assets/image/approve_ysp.png')"-->
<!--              ></el-image>-->
<!--              <span class="approve-text">已立项</span>-->
<!--            </div>-->
<!--          </div>-->
<!--        </div>-->



<!--      </div>-->



<!--      &lt;!&ndash; 添加或修改元数据对话框 &ndash;&gt;-->
<!--      <el-dialog :title="title" :visible.sync="open" width="600px" append-to-body>-->
<!--        <el-form ref="form" :model="form.xItem" :rules="rules" label-width="120px">-->
<!--          <el-form-item label="字段名称" prop="name">-->
<!--            <el-input v-model="form.xItem.name" placeholder="请输入元数据名称" />-->
<!--          </el-form-item>-->
<!--          <el-form-item label="数据格式">-->
<!--            <el-select @change="businessTypeChange" class="tableBody12" v-model="form.xItem.dataType" clearable :disabled="form.isUsed==1">-->
<!--              <el-option-->
<!--                v-for="dict in dataTypeOptions"-->
<!--                :key="dict.dictValue"-->
<!--                :label="dict.dictLabel"-->
<!--                :value="dict.dictValue"-->
<!--              />-->
<!--            </el-select>-->
<!--          </el-form-item>-->
<!--          <el-form-item label="关联业务">-->
<!--            <el-select  class="tableBody12" v-model="form.xItem.businessType" clearable   :disabled="form.isUsed==1">-->
<!--              <el-option-->
<!--                v-for="dict in orgbusinessOptions"-->
<!--                :key="dict.dictValue"-->
<!--                :label="dict.dictLabel"-->
<!--                :value="dict.dictValue"-->
<!--              />-->
<!--            </el-select>-->
<!--          </el-form-item>-->
<!--          <el-form-item :label="businessType == '5' || businessType == '8' ? '当前时间':'默认值'">-->
<!--            &lt;!&ndash; 文本&ndash;&gt;-->
<!--            <el-input v-if="businessType == '1'" v-model="form.xItem.defaultValue" placeholder="请输入默认值" />-->
<!--            &lt;!&ndash; 文本域&ndash;&gt;-->
<!--            <el-input v-if="businessType == '2'" type="textarea" v-model="form.xItem.defaultValue" placeholder="请输入默认值" />-->
<!--            &lt;!&ndash; 数值类型 &ndash;&gt;-->
<!--            <el-input v-if="businessType == '3'" type="number" v-model="form.xItem.defaultValue" placeholder="请输入默认值" />-->

<!--            &lt;!&ndash; 布尔类型&ndash;&gt;-->
<!--            <el-switch-->
<!--              v-if="businessType == '4'"-->
<!--              v-model="form.xItem.defaultValue"-->
<!--              active-color="#13ce66"-->
<!--              inactive-color="#ff4949"-->
<!--              active-value="1"-->
<!--              inactive-value="0">-->
<!--            </el-switch>-->

<!--            &lt;!&ndash; 时间类型&ndash;&gt;-->
<!--            <el-date-picker-->
<!--              v-if="businessType == '8'"-->
<!--              v-model="form.xItem.defaultValue"-->
<!--              type="date"-->
<!--              value-format="yyyy-MM-dd"-->
<!--              style="width: 100%"-->
<!--              class="suffix-inner"-->
<!--              suffix-icon="el-icon-date"-->
<!--              placeholder="选择日期">-->
<!--            </el-date-picker>-->
<!--            &lt;!&ndash; 单选&ndash;&gt;-->
<!--            <div v-if="businessType == '6'" >-->
<!--              <el-radio-group v-model="form.xItem.defaultValue">-->
<!--                <el-radio class="radios-item" :label="index" v-for="(item,index) in radios">-->
<!--                  <el-input v-model="item.value" placeholder="请输入选项值"></el-input>-->
<!--                  <i @click="removeItem(index,0)" class="el-icon-remove-outline"> </i>-->
<!--                </el-radio>-->
<!--              </el-radio-group>-->
<!--              <el-button class="add-item-btn" type="text" @click="addItem(0)">添加选项</el-button>-->
<!--            </div>-->

<!--            &lt;!&ndash; 多选&ndash;&gt;-->
<!--            <div v-if="businessType == '7'">-->
<!--              <el-checkbox-group v-model="checks">-->
<!--                <el-checkbox :label="index" v-for="(item,index) in checkList">-->
<!--                  <el-input v-model="item.value" placeholder="请输入选项值"></el-input>-->
<!--                  <i @click="removeItem(index,1)" class="el-icon-remove-outline"> </i>-->
<!--                </el-checkbox>-->
<!--              </el-checkbox-group>-->
<!--              <el-button type="text" @click="addItem(1)">添加选项</el-button>-->
<!--            </div>-->

<!--            &lt;!&ndash; 日历类型&ndash;&gt;-->
<!--            <el-date-picker-->
<!--              v-if="businessType == '5'"-->
<!--              v-model="form.xItem.defaultValue"-->
<!--              suffix-icon="el-icon-date"-->
<!--              type="datetime"-->
<!--              value-format="yyyy-MM-dd HH:mm:ss"-->
<!--              style="width: 100%"-->
<!--              placeholder="选择日期时间">-->
<!--            </el-date-picker>-->

<!--          </el-form-item>-->

<!--&lt;!&ndash;          <el-form-item label="描述">&ndash;&gt;-->
<!--&lt;!&ndash;            <el-input type="textarea" v-model="form.xItem.description" size="80" placeholder="请输入80字内描述"></el-input>&ndash;&gt;-->
<!--&lt;!&ndash;          </el-form-item>&ndash;&gt;-->

<!--          <el-col :span="8">-->
<!--            <el-form-item label="是否必填" prop="remark">-->
<!--              <el-switch-->
<!--                v-model="form.xItem.required"-->
<!--                active-color="#13ce66"-->
<!--                inactive-color="#ff4949"-->
<!--                active-value="1"-->
<!--                inactive-value="0">-->
<!--              </el-switch>-->
<!--            </el-form-item>-->
<!--          </el-col>-->
<!--          <el-col :span="8">-->
<!--            <el-form-item label="是否可用" prop="remark">-->
<!--              <el-switch-->
<!--                v-model="form.xItem.enable"-->
<!--                active-color="#13ce66"-->
<!--                inactive-color="#ff4949"-->
<!--                active-value="1"-->
<!--                inactive-value="0">-->
<!--              </el-switch>-->
<!--            </el-form-item>-->
<!--          </el-col>-->
<!--          <el-col :span="8">-->
<!--&lt;!&ndash;            <el-form-item label="是否隐藏" prop="remark">&ndash;&gt;-->
<!--&lt;!&ndash;              <el-switch&ndash;&gt;-->
<!--&lt;!&ndash;                v-model="form.xItem.hidden"&ndash;&gt;-->
<!--&lt;!&ndash;                active-color="#13ce66"&ndash;&gt;-->
<!--&lt;!&ndash;                inactive-color="#ff4949"&ndash;&gt;-->
<!--&lt;!&ndash;                active-value="1"&ndash;&gt;-->
<!--&lt;!&ndash;                inactive-value="0">&ndash;&gt;-->
<!--&lt;!&ndash;              </el-switch>&ndash;&gt;-->
<!--&lt;!&ndash;            </el-form-item>&ndash;&gt;-->
<!--          </el-col>-->

<!--          <el-col :span="24">-->
<!--            <el-form-item label="备注">-->
<!--              <el-input type="textarea" v-model="form.xItem.remark" :rows="5" size="80" placeholder="请输入80字内备注"></el-input>-->
<!--            </el-form-item>-->
<!--          </el-col>-->


<!--        </el-form>-->
<!--        <div slot="footer" class="dialog-footer">-->
<!--          <el-button type="primary" @click="submitForm">确 定</el-button>-->
<!--          <el-button @click="cancel">取 消</el-button>-->
<!--        </div>-->
<!--      </el-dialog>-->




<!--    </div>-->
<!--  </div>-->
<!--</template>-->
<!--<script>-->
<!--import { projectstatusDel } from "@/api/projectPlanning/projectStatus";-->
<!--import {-->
<!--  chanceList,-->
<!--  delList,-->
<!--  voidProjChance,-->
<!--  updateProjUser,-->
<!--} from "@/api/projectPre/chanceLib/chanceLib";-->

<!--import {-->
<!--  actionDel,-->
<!--  actionList, actionMainSave-->
<!--} from '@/api/projectPre/projectPlan/planAction'-->

<!--import SelectProject from '@/views/projectPre/projectPlan/actionPlan/dialog/select-project'-->
<!--import { incontractSignList } from '@/api/projectPre/contract/contractSign'-->
<!--import { getMoreEnums } from '@/api/projectPlanning/projectRegistration'-->
<!--import { addxItem, delxItem, editxItem, getAddInfo, getInfoById, getxItemlist } from '@/api/system/meta'-->
<!--import { exportPost } from '@/api/system/post'-->

<!--export default {-->
<!--  name: "actionPlan",-->
<!--  components: {  SelectProject },-->
<!--  data() {-->
<!--    return {-->
<!--      voidRemark: "",-->
<!--      loading: true,-->
<!--      appContantHeight: 700,-->
<!--      projectData: [], //列表信息-->
<!--      queryParams: {-->
<!--        //请求参数-->
<!--        pageNum: 1,-->
<!--        pageSize: 10,-->
<!--      },-->
<!--      total: 0, //总条数-->
<!--      projectType: [], //项目类型基础数据-->
<!--      approve_status: [], //审批状态-->
<!--      project_status: [], //项目状态-->
<!--      project_main_status: [], //主数据编码状态-->
<!--      queryParams2: {-->
<!--        pageNum: 1,-->
<!--        pageSize: 10,-->
<!--      },-->
<!--      currentRow: null,-->
<!--      multple: [],-->
<!--      //单选-->
<!--      deleteBudgetState: false, //删除-->
<!--      selectionDelData: [], //表格多选项数组-->
<!--      /*筛选*/-->
<!--      filterOptions: [-->
<!--        // {-->
<!--        //   value: "name",-->
<!--        //   label: "字段名称",-->
<!--        //   type: "string",-->
<!--        // } ,-->
<!--        {-->
<!--          value: "enable",-->
<!--          label: "是否可用",-->
<!--          type: "select",-->
<!--          options:[{ dictLabel:'否', dictValue:'0' },{ dictLabel:'是', dictValue:'1' }]-->
<!--        },-->
<!--        {-->
<!--          value: "businessType",-->
<!--          label: "关联业务类型",-->
<!--          type: "select",-->
<!--        }-->
<!--      ],-->
<!--      columns: [-->
<!--        {-->
<!--          label: "字段名称",-->
<!--          prop: "name",-->

<!--          showShip: "1",-->
<!--        },-->
<!--        {-->
<!--          label: "元数据对象",-->
<!--          prop: "businessTypeName",-->

<!--          width: "120",-->
<!--          showShip: "1",-->
<!--        },-->
<!--        {-->
<!--          label: "数据格式",-->
<!--          prop: "businessType",-->
<!--          width: "120",-->

<!--        },-->
<!--        {-->
<!--          label: "默认值",-->
<!--          prop: "defaultValue",-->
<!--          width: "150",-->
<!--          showShip: "1",-->
<!--          formatter: (row, colomn) => {-->
<!--            return this.getDefaultValue(row, row.defaultValue);-->
<!--          }-->
<!--        },-->
<!--        {-->
<!--          label: "是否必填",-->
<!--          prop: "required",-->
<!--          width: "100",-->
<!--          formatter: (row, colomn) => {-->
<!--            return this.selectDictLabel(this.requiredOptions, row.required)-->
<!--          }-->
<!--        },-->
<!--        {-->
<!--          label: "是否可用",-->
<!--          prop: "approvalStatus",-->
<!--          width: "120",-->
<!--          type: 10,-->
<!--          hasImage: true,-->
<!--          formatter: (row, colomn) => {-->
<!--            return this.selectDictLabel(this.enableOptions, row.enable);-->
<!--          }-->
<!--        },-->

<!--        {-->
<!--          label: "备注",-->
<!--          prop: "remark",-->
<!--          width: "120",-->
<!--        },-->

<!--        {-->
<!--          label: "操作",-->
<!--          btns: [-->
<!--            {-->
<!--              label: "查看",-->
<!--              action: "0",-->
<!--              color: "#1989FA",-->
<!--              icon: "el-icon-edit-outline",-->
<!--            },-->
<!--            {-->
<!--              label: "编辑",-->
<!--              action: "2",-->
<!--              color: "#E25255",-->
<!--              icon: "el-icon-delete",-->
<!--            },-->

<!--          ],-->
<!--          width: "120",-->
<!--        },-->
<!--      ],-->
<!--      pageObj: {-->
<!--        size: 2,-->
<!--        total: this.total,-->
<!--        currentPage: 1,-->
<!--        func: (currentPage) => {-->
<!--          this.queryParams.pageNum = currentPage;-->
<!--          this.getList();-->
<!--        },-->
<!--        sizeChange: (size) => {-->
<!--          this.queryParams.pageNum = 1;-->
<!--          this.queryParams.pageSize = size;-->
<!--          this.getList();-->
<!--        },-->
<!--      },-->
<!--      project_contracttmpl_contType:[],-->
<!--      approvalStatus:[-->
<!--        {-->
<!--          dictLabel:'新增',-->
<!--          dictValue:'0'-->
<!--        },-->
<!--        {-->
<!--          dictLabel:'审批中',-->
<!--          dictValue:'1'-->
<!--        },-->
<!--        {-->
<!--          dictLabel:'驳回',-->
<!--          dictValue:'2'-->
<!--        },-->
<!--        {-->
<!--          dictLabel:'已立项',-->
<!--          dictValue:'3'-->
<!--        }-->
<!--      ],-->
<!--      filterOptionsBySelect: [],-->
<!--      // 非单个禁用-->
<!--      single: true,-->
<!--      multiple: true,-->

<!--      currentTopBtnIndex: 0,-->
<!--      // 选中数组-->
<!--      ids: [],-->
<!--      // 元数据表格数据-->
<!--      metaList: [],-->
<!--      // 弹出层标题-->
<!--      title: "",-->
<!--      // 是否显示弹出层-->
<!--      open: false,-->
<!--      // 状态数据字典-->
<!--      statusOptions: [],-->
<!--      // 表单参数-->
<!--      form: {-->
<!--        xItem:{-->
<!--          enable: 1,-->
<!--          required:0-->
<!--        },-->
<!--        isUsed:undefined,-->
<!--      },-->
<!--      radios:[],-->
<!--      checkList:[],-->
<!--      checks:[],-->
<!--      // 表单校验-->
<!--      rules: {-->
<!--        name: [-->
<!--          { required: true, message: "元数据名称不能为空", trigger: "blur" }-->
<!--        ],-->
<!--      },-->
<!--      belowHeight: '400',-->
<!--      mainHeight:0.0,-->
<!--      filterHeight:0.0,-->
<!--      filterShowState:false,-->
<!--      //可用-->
<!--      enableOptions:[],-->
<!--      //必填-->
<!--      requiredOptions:[],-->
<!--      //数据格式-->
<!--      dataTypeOptions:[],-->
<!--      //关联业务-->
<!--      orgbusinessOptions:[],-->
<!--      xitem_related_business:[],-->
<!--      businessType:'1'-->
<!--    };-->
<!--  },-->
<!--  created() {-->
<!--    // this.$set(this.filterOptions[2], "options", this.approvalStatus)-->
<!--    this.$nextTick(() => {-->
<!--      let dom = document.getElementsByClassName("fixed-header");-->
<!--      let headerDom = dom[0];-->
<!--      let clientHeight = headerDom.clientHeight;-->
<!--      let heigth =-->
<!--        window.document.documentElement.getBoundingClientRect().height;-->
<!--      let contantHeight = heigth - clientHeight - 40;-->
<!--      this.appContantHeight = contantHeight;-->
<!--    });-->

<!--    this.getList();-->
<!--    this.getDicts("meta_enable").then(response => {-->
<!--      this.enableOptions = response.data;-->
<!--    });-->
<!--    this.getDicts("meta_required").then(response => {-->
<!--      this.requiredOptions = response.data;-->
<!--    });-->

<!--    //数据格式-->
<!--    //关联业务-->
<!--    this.getBaseData();-->
<!--  },-->
<!--  methods: {-->


<!--    /*表格多选方法*/-->
<!--    handleSelection(selection, row) {-->
<!--      this.selectionDelData = [];-->
<!--      this.selectionDelData = selection;-->
<!--    },-->
<!--    addItem(type){-->

<!--      if(type == 0){-->
<!--        this.radios.push({})-->
<!--      }else{-->
<!--        this.checkList.push({})-->
<!--      }-->
<!--    },-->
<!--    removeItem(index,type){-->
<!--      if(type == 0){-->
<!--        this.radios.splice(index,1)-->
<!--      }else{-->
<!--        this.checkList.splice(index,1)-->
<!--      }-->
<!--    },-->
<!--    businessTypeChange(val){-->
<!--      this.businessType = val-->
<!--      this.$set(this.form.xItem,'defaultValue','')-->
<!--    },-->
<!--    actionBtnClick(obj) {-->
<!--      // 编辑-->
<!--      if (obj.btn.action == 0) {-->
<!--         this.handleUpdate(obj.row)-->
<!--      }-->
<!--      //删除-->
<!--      else if (obj.btn.action == 2) {-->
<!--        this.handleDelete(obj.row)-->
<!--      } else {-->
<!--      }-->
<!--    },-->

<!--    tabItemClick(item) {-->
<!--      this.goDetail(item);-->
<!--    },-->

<!--    getDefaultValue(row,value){-->
<!--      if(row.dataType == '6'){-->
<!--        let fieldValue = row.fieldValue-->
<!--        if(fieldValue && fieldValue.length>0){-->
<!--          return fieldValue.split(',')[parseInt(value)]-->
<!--        }-->
<!--      }-->
<!--      if(row.dataType == '7'){-->
<!--        let fieldValue = row.fieldValue-->
<!--        if(fieldValue && fieldValue.length>0){-->
<!--          let arr = fieldValue.split(',')-->
<!--          let values = value.split(',')-->
<!--          if(arr && arr.length>0 && values && values.length>0){-->
<!--            return values.map(res=> arr[parseInt(res)]).join(',')-->
<!--          }-->
<!--        }-->
<!--      }-->
<!--      return value-->
<!--    },-->


<!--    getBaseData() {-->

<!--      getMoreEnums('xitem_related_business').then((res) => {-->
<!--        if(res.data){-->
<!--          this.orgbusinessOptions = res.data.xitem_related_business;-->

<!--          this.$set(this.filterOptions[1], "options", res.data.xitem_related_business)-->

<!--          this.$nextTick(()=>{-->
<!--            this.$refs.tableSeach.refushOptions(this.filterOptions)-->
<!--            this.$refs.tableSeach.filterList = [-->
<!--              {-->
<!--                filterName: this.filterOptions[0].value,-->
<!--                filterType: this.filterOptions[0].type,-->
<!--                options: this.filterOptions[0].options || [],-->
<!--              },-->
<!--              {-->
<!--                filterName: this.filterOptions[1].value,-->
<!--                filterType: this.filterOptions[1].type,-->
<!--                options: this.filterOptions[1].options || [],-->
<!--              },-->
<!--            ]-->
<!--          })-->
<!--        }-->
<!--      })-->

<!--      getAddInfo().then(response => {-->
<!--        let mydata = response.data;-->
<!--        let arr1 = [];-->
<!--        let arr2 = [];-->
<!--        let mydata1 = mydata.XItenEnumList;-->
<!--        let mydata2 = mydata.businessConfigList;-->
<!--        for(let i=0;i<mydata1.length;i++){-->
<!--          let obj1={};-->
<!--          obj1["dictLabel"]=mydata1[i].name;-->
<!--          obj1["dictValue"]=mydata1[i].type;-->
<!--          arr1.push(obj1);-->
<!--        }-->
<!--        for(let i=0;i<mydata2.length;i++){-->
<!--          let obj2={};-->
<!--          obj2["dictLabel"]=mydata2[i].businessName;-->
<!--          obj2["dictValue"]=mydata2[i].id;-->
<!--          obj2["businessType"]=mydata2[i].businessType;-->
<!--          arr2.push(obj2);-->
<!--        }-->
<!--        this.dataTypeOptions = arr1;-->
<!--        // this.orgbusinessOptions = arr2;-->


<!--      });-->
<!--    },-->


<!--    //编辑查看-->
<!--    goDetail(item) {-->
<!--      this.$router.push({-->
<!--        path: "signContractDdetail",-->
<!--        query: {-->
<!--          contrSignId: item.contrSignId,-->
<!--        },-->
<!--      });-->
<!--    },-->

<!--    getList() {-->
<!--      this.loading = true;-->
<!--      this.projectData = [];-->
<!--      getxItemlist(this.queryParams).then((res) => {-->
<!--        this.projectData = res.rows;-->

<!--        this.pageObj.total = res.total;-->
<!--        this.loading = false;-->
<!--      });-->
<!--    },-->
<!--    rowKey(row) {-->
<!--      return row.projIds;-->
<!--    },-->
<!--    cancel() {-->
<!--      this.open = false;-->
<!--      this.reset();-->
<!--    },-->
<!--    // 表单重置-->
<!--    reset() {-->
<!--      this.form = {-->
<!--        xItem:{-->
<!--          enable: '1',-->
<!--          required:'0'-->
<!--        },-->
<!--        isUsed:undefined,-->
<!--      };-->
<!--      this.resetForm("form");-->
<!--    },-->
<!--    /** 搜索按钮操作 */-->
<!--    handleQuery() {-->
<!--      this.queryParams.pageNum = 1;-->
<!--      this.getList();-->
<!--    },-->
<!--    /** 重置按钮操作 */-->
<!--    resetQuery() {-->
<!--      this.resetForm("queryForm");-->
<!--      this.handleQuery();-->
<!--    },-->
<!--    // 多选框选中数据-->
<!--    handleSelectionChange(selection) {-->
<!--      this.ids = selection.map(item => item.xitemId);-->
<!--      this.single = selection.length!=1-->
<!--      this.multiple = !selection.length-->
<!--    },-->
<!--    /** 新增按钮操作 */-->
<!--    handleAdd() {-->
<!--      this.reset();-->
<!--      this.open = true;-->
<!--      this.title = "添加元数据";-->
<!--    },-->
<!--    /** 修改按钮操作 */-->
<!--    handleUpdate(row) {-->
<!--      this.reset();-->
<!--      const xItemId = row.xitemId || this.ids;-->
<!--      let params = {};-->
<!--      params["xItemId"]=xItemId;-->
<!--      getInfoById(xItemId).then(response => {-->
<!--        //console.log("获取查询元数据"+JSON.stringify(response));-->
<!--        this.form["xItem"] = response.data.xItem;-->
<!--        this.open = true;-->
<!--        this.title = "修改元数据";-->
<!--        this.businessType = response.data.xItem.dataType-->

<!--        if(this.businessType == '6'){-->
<!--          this.$set(this.form.xItem,'defaultValue',parseInt(response.data.xItem.defaultValue))-->
<!--          let arr = response.data.xItem.fieldValue.split(',')-->
<!--          this.radios = arr.map(res=> {-->
<!--            return{-->
<!--              value:res-->
<!--            }-->
<!--          })-->
<!--        }-->
<!--        if(this.businessType == '7'){-->
<!--          let checkArr = response.data.xItem.defaultValue.split(',')-->
<!--          this.checks = checkArr.map(res=> parseInt(res))-->
<!--          let arr = response.data.xItem.fieldValue.split(',')-->
<!--          this.checkList = arr.map(res=> {-->
<!--            return{-->
<!--              value:res-->
<!--            }-->
<!--          })-->
<!--        }-->
<!--      });-->
<!--    },-->
<!--    /** 提交按钮 */-->
<!--    submitForm: function() {-->

<!--      this.form.xItem.updateTime=undefined;-->
<!--      this.form.xItem.createTime=undefined;-->

<!--      let params = {};-->
<!--      params = this.form.xItem;-->

<!--      if(this.businessType == '6'){-->
<!--         params.fieldValue = this.radios.map(res=> res.value).join(',')-->
<!--      }-->
<!--      if(this.businessType == '7'){-->
<!--        let defaultValue = this.checks.join(',')-->
<!--        params.defaultValue = defaultValue-->
<!--        params.fieldValue = this.checkList.map(res=> res.value).join(',')-->
<!--      }-->
<!--      this.$refs["form"].validate(valid => {-->
<!--        if (valid) {-->

<!--          if (this.form.xItem.xitemId != undefined) {-->
<!--            editxItem(params).then(response => {-->
<!--              if (response.code === 200) {-->
<!--                this.msgSuccess("修改成功");-->
<!--                this.open = false;-->
<!--                this.getList();-->
<!--              }-->
<!--            });-->
<!--          } else {-->
<!--            addxItem(params).then(response => {-->
<!--              if (response.code === 200) {-->
<!--                this.msgSuccess("新增成功");-->
<!--                this.open = false;-->
<!--                this.getList();-->
<!--              }-->
<!--            });-->
<!--          }-->
<!--        }-->
<!--      });-->
<!--    },-->
<!--    /** 删除按钮操作 */-->
<!--    handleDelete(row) {-->
<!--      const ids = row.xitemId || this.ids;-->
<!--      //console.log("删除数据："+JSON.stringify(ids));-->
<!--      this.$confirm('是否确认删除元数据?', "警告", {-->
<!--        confirmButtonText: "确定",-->
<!--        cancelButtonText: "取消",-->
<!--        type: "warning"-->
<!--      }).then(function() {-->
<!--        return delxItem(ids);-->
<!--      }).then(() => {-->
<!--        this.getList();-->
<!--        this.msgSuccess("删除成功");-->
<!--      }).catch(function() {});-->
<!--    },-->
<!--    /** 导出按钮操作 */-->
<!--    handleExport() {-->
<!--      const queryParams = this.queryParams;-->
<!--      this.$confirm('是否确认导出所有元数据数据项?', "警告", {-->
<!--        confirmButtonText: "确定",-->
<!--        cancelButtonText: "取消",-->
<!--        type: "warning"-->
<!--      }).then(function() {-->
<!--        return exportPost(queryParams);-->
<!--      }).then(response => {-->
<!--        this.download(response.msg);-->
<!--      }).catch(function() {});-->
<!--    }-->
<!--  },-->
<!--};-->
<!--</script>-->
<!--<style lang="scss" scoped>-->

<!--/deep/ .tj-sx-tj{-->
<!--  display: none;-->
<!--}-->
<!--/deep/ .filter-btn-add2{-->
<!--  display: none;-->
<!--}-->

<!--.app-container {-->
<!--  border-radius: 8px;-->
<!--  min-height: 840px;-->
<!--  padding: 15px 30px 0 30px;-->
<!--  position: relative;-->

<!--  .page-top {-->
<!--    height: 73px;-->
<!--    width: 100%;-->
<!--    position: absolute;-->
<!--    top: -73px;-->
<!--    left: 0;-->
<!--    //border-top-left-radius: 8px;-->
<!--    //border-top-right-radius: 8px;-->
<!--    //background: linear-gradient(white, rgba(25, 137, 250, 0.2));-->
<!--    display: flex;-->
<!--    align-items: center;-->
<!--  }-->
<!--  .page-header {-->

<!--  }-->
<!--}-->
<!--.top-list-btn-select {-->
<!--  height: 36px;-->
<!--  line-height: 36px;-->
<!--  margin-left: 30px;-->
<!--  color: #ffffff;-->
<!--  font-size: 18px;-->
<!--  padding: 0 15px;-->
<!--  text-align: center;-->
<!--  background-color: #1989fa;-->
<!--  border-radius: 17px;-->
<!--  font-weight: normal;-->
<!--  letter-spacing: 2px;-->
<!--  cursor: pointer;-->
<!--}-->
<!--.top-list-btn-unselect:hover {-->
<!--  color: #4187f2;-->
<!--  opacity: 0.7;-->
<!--}-->
<!--.top-list-btn-unselect {-->
<!--  height: 36px;-->
<!--  line-height: 36px;-->
<!--  margin-left: 30px;-->
<!--  color: #1989fa;-->
<!--  font-size: 18px;-->
<!--  padding: 0 15px;-->
<!--  font-weight: normal;-->
<!--  letter-spacing: 2px;-->
<!--  cursor: pointer;-->
<!--}-->

<!--/deep/ ::-webkit-scrollbar {-->
<!--  width: 0 !important;-->
<!--}-->
<!--/deep/ ::-webkit-scrollbar {-->
<!--  width: 0 !important;-->
<!--  height: 0;-->
<!--}-->

<!--.header-btn {-->
<!--  display: flex;-->
<!--  align-items: center;-->
<!--  justify-content: space-between;-->
<!--}-->
<!--/deep/ .el-button&#45;&#45;primary.is-plain {-->
<!--  color: #1989fa;-->
<!--  background: #fff;-->
<!--  border-color: #1989fa;-->
<!--}-->
<!--.right-btn {-->
<!--  height: 66px;-->
<!--  display: flex;-->
<!--  align-items: center;-->
<!--  margin-right: -20px;-->
<!--  justify-content: flex-end;-->
<!--  color: #1989fa;-->
<!--}-->
<!--.right-btn button {-->
<!--  width: 96px;-->
<!--  height: 46px;-->
<!--  border: 2px solid #1989fa;-->
<!--  border-radius: 8px;-->
<!--  font-size: 18px;-->
<!--  margin-top: 10px;-->
<!--  font-family: Microsoft YaHei;-->
<!--  margin-right: 10px;-->
<!--  font-weight: bold;-->
<!--  color: #1989fa;-->
<!--}-->
<!--/deep/ .el-icon-plus {-->
<!--  font-weight: bold;-->
<!--}-->
<!--/deep/ .el-icon-upload2 {-->
<!--  font-weight: bold;-->
<!--}-->
<!--.img-state {-->
<!--  width: 21px;-->
<!--  height: 21px;-->
<!--  display: flex;-->
<!--  align-items: center;-->
<!--  justify-content: center;-->
<!--}-->
<!--.approval-status {-->
<!--  display: flex;-->
<!--  color: #505a69;-->
<!--  font-size: 14px;-->
<!--  align-items: center;-->
<!--  margin-bottom: 19px;-->
<!--  div {-->
<!--    display: flex;-->
<!--    align-items: center;-->
<!--    margin-left: 20px;-->
<!--    .approve-text {-->
<!--      margin-left: 5px;-->
<!--    }-->
<!--  }-->
<!--  div:first-child {-->
<!--    margin-left: 0;-->
<!--  }-->
<!--}-->
<!--.img-div {-->
<!--  margin-top: -70px;-->
<!--  padding-bottom: 20px;-->
<!--}-->
<!--.fc-btn {-->
<!--  width: 96px;-->
<!--  height: 46px;-->
<!--  text-align: center;-->
<!--  line-height: 46px;-->
<!--  font-size: 18px;-->
<!--  background-color: #ffffff;-->
<!--  border-radius: 8px;-->
<!--  border: solid 2px #1989fa;-->
<!--  color: #1989fa;-->
<!--  font-weight: bold;-->
<!--  margin-top: 10px;-->
<!--  margin-right: 5px;-->
<!--}-->
<!--.fc-btn:hover {-->
<!--  cursor: pointer;-->
<!--}-->
<!--.el-icon-more {-->
<!--  margin-top: 10px;-->
<!--  color: #1989fa;-->
<!--  width: 22px;-->
<!--  display: inline-block;-->
<!--  font-size: 22px;-->
<!--  transform: rotate(90deg);-->
<!--}-->
<!--::v-deep .el-dropdown-menu__item {-->
<!--  padding: 8px !important;-->
<!--  color: #1989fa !important;-->
<!--  font-size: 16px;-->
<!--  font-weight: bold;-->
<!--}-->
<!--::v-deep .el-dropdown-menu__item&#45;&#45;divided:before {-->
<!--  background-color: initial;-->
<!--}-->
<!--.back-img {-->
<!--  margin-right: 5px;-->
<!--}-->
<!--.scrollTab {-->
<!--  overflow: initial !important;-->
<!--}-->
<!--.tableBody12{-->
<!--  width: 100%;-->
<!--}-->
<!--/deep/ .el-dialog__header{-->
<!--  background-color: #f1f9ff;-->
<!--  border-top-left-radius: 10px;-->
<!--  border-top-right-radius: 10px;-->
<!--}-->
<!--/deep/ .el-dialog__footer{-->
<!--  border-bottom-right-radius: 10px !important;-->
<!--  border-bottom-left-radius: 10px !important;-->
<!--  background-color: white;-->
<!--}-->
<!--/deep/ .el-dialog__title{-->
<!--  color: #1989fa;-->
<!--}-->
<!--.el-icon-remove-outline{-->
<!--  font-size: 20px;-->
<!--  margin-left: 10px;-->
<!--}-->
<!--.radios-item{-->
<!--  margin-top: 10px;-->

<!--}-->
<!--.add-item-btn{-->
<!--  width: 100%;-->
<!--  text-align: left;-->
<!--}-->

<!--@import '~@/assets/styles/new-table-index';-->
<!--</style>-->

