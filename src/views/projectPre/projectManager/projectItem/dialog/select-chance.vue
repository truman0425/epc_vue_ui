<template>
  <my-dialog ref="selectCustomer" title="选择项目机会" >
    <div slot="dialogContent" class="dialog-content">
      <div>
        <div class="body-content">
          <div>
            <div class="searchOrm">
              <div >
              <el-input
                placeholder="搜索项目机会"
                class="search-input"
                v-model="queryParams.projName"
              >

              </el-input>
              <div @click="getList" class="search-btn" >
                <span>搜索</span>
              </div>
              <div @click="resetBtn" class="rest-btn">
                <span>重置</span>
              </div>
              </div>

            </div>

            <div class="table-content">
              <el-table
                :data="tableData"
                class="container_lefts"
                v-loading="loading2"
                @current-change="handleCurrentChange"
                @row-click="chooseone"
                @row-dblclick="handledbClick"
              >
                <el-table-column
                  type="index"
                  label=""
                  width="40"
                >
                  <template slot-scope="scope">
                    <el-radio
                      v-model="radio"
                      width="40"
                      :label="scope.row.projId"
                    >
                      {{&nbsp;}}
                    </el-radio>
                  </template>
                </el-table-column>
                <el-table-column
                  property="projName"
                  align="center"
                  label="项目机会名称" show-overflow-tooltip>
                </el-table-column>

                <el-table-column
                  property="custName"
                  align="center"
                  show-overflow-tooltip
                  label="客户名称">
                </el-table-column>
                <el-table-column
                  property="scale"
                  align="center"
                  label="机会规模（万元）">
                </el-table-column>
                <el-table-column
                  property="projUserName"
                  align="center"
                  label="机会负责人">
                </el-table-column>
              </el-table>
              <div>
                <pagination
                  class="pag-cls"
                  v-show="total>0"
                  :total="total"
                  :page-sizes="[8, 10, 20, 40]"
                  :page.sync="queryParams.pageNum"
                  :limit.sync="queryParams.pageSize"
                  @pagination="getList"
                />
              </div>

            </div>
            <div class="btn-list">
              <el-button class="btn-cancle" plain @click="closeDialog">取消</el-button>
              <el-button class="btn-sure" type="primary" @click="onSure" style="margin-right: 15px">确认</el-button>
            </div>

          </div>

        </div>
      </div>

    </div>

    <div slot="footer" class="btn-foot">
      <el-button plain @click="closeDialog">取消</el-button>
      <el-button type="primary" @click="onSure" style="margin-right: 10px">确认</el-button>
    </div>

  </my-dialog>
</template>

<script>



import { appChanceList} from "@/api/projectPre/projectManager/project";
export default {
  name: "selectProject",
  data() {
    return {
      userLoginName: '',
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
      }
    }
  },
  created() {
    this.getList()
  },
  watch:{
    'queryParams.projectName':{
      handler(){
        if(this.queryParams.projectName == ''){
          this.getList();
        }
      }
    }
  },
  methods: {
    chooseone(row){
      this.radio = row.projId;
    },
    handledbClick(){},
    handleCurrentChange(val) {
      this.currentRow = val;
      this.radio = val.projId;
      this.templateSelection = val;
    },
    openDialog() {

      this.$refs.selectCustomer.openDialog();
    },
    closeDialog() {
      this.$refs.selectCustomer.closeDialog();
      this.radio = undefined
      this.templateSelection = {}
    },
    getTemplateRow(index, row) {
      this.templateSelection = row;
    },
    onSure() {
      if(!this.templateSelection){
        this.$message('请先选择项目机会')
      }else{
        this.$emit('onSelectProject', this.templateSelection)
        this.$refs.selectCustomer.closeDialog();
      }
    },
    seachUser(){
      this.getList()
    },
    fsclAdd(){
      this.$emit('onSelectProject', undefined)
      this.closeDialog()
    },
    resetBtn(){
      this.queryParams = {
        pageNum: 1,
        pageSize: 8,

      }
      this.radio = undefined
      this.templateSelection = {}
      this.getList()
    },
    getList() {
      this.loading2= true
      appChanceList(this.queryParams).then((res) => {
        this.tableData = res.rows;
        this.templateSelection = res.rows[0] || []
        this.total = res.total;
        this.selectItem = 0
        this.loading2 = false
      }).catch(err => {
        this.loading2 = false
      })
    },
    /*新增*/
    addCt(){
      debugger
      this.$refs.addCustomer.openDialog();
    },
    addCustomer(e){
      debugger
      this.$set(this.isAdd,'ok',e)
      if(this.isAdd.ok!=''){
        this.getList()
      }
    }
  }
}
</script>

<style lang="scss" scoped>
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


.container_lefts .el-table td,
.container_lefts .el-table th.is-leaf,
.container_lefts .el-table--border,
.container_lefts .el-table--group {
  border: none;
  cursor: pointer;
}
.container_lefts .el-table::before {
  height: 0;
}
.container_lefts{
  height:380px;
  padding: 20px 17px;
  overflow: auto;
  border-radius: 5px;
}

.table-content{
  background: #FFFFFF;
  box-shadow: 0px 1px 7px 0px rgba(236, 236, 236, 0.75);
  border-radius: 5px;
  display: flex;
  flex-direction: column;
}
/deep/ .el-table__header-wrapper, .el-table__footer-wrapper {
  overflow: hidden;
  border-bottom: 1px solid #ddd;
  margin-bottom: 10px;
  width: 100%;
}
.body-content{
  background: #f6f9ff;
  border-radius: 5px;
  padding: 18px;
}
.pag-cls{
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  margin-top: 30px;
  margin-bottom: 20px;
}

/deep/ .pagination-container .el-pagination {
  right: 0;
  position: absolute;
  width: 50%;
  display: flex;
  align-items: center;
  justify-content: center;

}
/deep/ .el-dialog--center .el-dialog__footer {
  display: none;
}

.btn-list{
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  margin-top: 20px;
  margin-bottom: 15px;
  margin-right: 0;
  button{
    width: 74px;
    height: 35px;
    border-radius: 4px;
    font-size: 13px;
  }
  .btn-cancle{
    background: #FFFFFF;
    margin-right:5px;
    border: 1px solid rgba(80, 90, 105, 0.2);

  }
}

/deep/ .dialog-bottom-top-line{
  height: 0;
}
.search-input{
  width: 264px !important;
  height: 46px !important;
  background: #FFFFFF !important;
  border: 1px solid rgba(80, 90, 105, 0.2) !important;
  border-radius: 8px !important;
  /deep/.el-input__inner{
    width: 264px !important;
    height: 46px !important;
    background: #FFFFFF !important;
    border: 1px solid rgba(80, 90, 105, 0.2) !important;
    border-radius: 8px !important;
  }
}

.search-btn{

  background: #008BFA;
  border-radius: 3px;
  font-size: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 10px;
  color: white;
  cursor: pointer;
  width: 96px;
  height: 46px;
  background: #1989FA;
  border-radius: 8px;
}
.search-btn:hover{
  background: #47a1fb;
}
.search-btn:active{
  background: #1989FA;
  color: white !important;
}
.rest-btn:hover{
  color: #47a1fb;
}
.search-btn:active{
  color: #1989FA;
}

.rest-btn{
  width: 70px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #169BD5;
  font-size: 16px;
  font-family: Microsoft YaHei;
  font-weight: 400;
  color: #1989FA;
  span{
    border-bottom: 1px solid #169BD5;
    padding-bottom: 3px;
    cursor: pointer;
  }
}
.addCt{
  border-color: #006EE5 !important;
  color: #006EE5 !important;

  border-radius: 5px;
}
/deep/ .searchOrm .el-input--medium .el-input__inner {
  height: 46px;
  border: 1px solid #ddd;
  border-radius: 5px;
}

.searchOrm{
  width:100%;
  height:100%;
  display: flex; align-items: center;
  margin-bottom: 20px;
  justify-content: space-between;
  >div:first-child{
    display: flex;
    align-items: center;

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

/deep/ .el-table th.is-leaf, /deep/ .el-table td {
  border-bottom: 0px solid #dfe6ec;
}
/deep/ .el-table .el-table__header-wrapper th{
  background: white;
  font-size: 15px;
  font-weight: bold;
  color: #000000;
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
/deep/.el-radio__inner {
  border: 1px solid #ccc;
  margin-left: 15px;
}

/deep/ .el-table__body tr,
/deep/ .el-table__body td {
  padding: 0;
  height: 38px;
  color: #333333 !important;
  font-size: 15px;
}
/deep/.el-table::before {
  left: 0;
  bottom: 0;
  width: 100%;
  height: 0px;
}
/deep/ .el-radio{
  display: flex;
  justify-content: center;
}
::v-deep .el-pagination span:not([class*=suffix]){
  height: initial !important;
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
</style>

