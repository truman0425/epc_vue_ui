<template>
  <div class="common-content commonTable">

    <el-table :data="tableData"
              style="width: 100%"
              class="table-main customer-no-border-table"
              size="small"
              border
              :row-class-name="tableRowClassName"
              @selection-change="handleSelectionChange"
              v-loading="loading"
              :row-key="rowKey"
              :header-cell-style="tableHeaderClass"
              :default-expand-all="isExpandAll">

      <!--多选-->
      <el-table-column v-if="multiSelect"
                       type="selection"
                       align="left"
                       width="30">
      </el-table-column>

      <!--单选-->
      <el-table-column v-if="singleSelect"
                       type="selection"
                       label="选择"
                       width="60"
                       align="center">
        <template slot-scope="scope">
          <el-radio :label="scope.$index"
                    v-model="selectItem"
                    @change.native="getTemplateRow(scope.$index,scope.row)">&nbsp;
          </el-radio>
        </template>
      </el-table-column>

      <!--序号-->
      <el-table-column v-if="hasSerial"
                       label="序号"
                       type="index"
                       width="50"
                       align="center">
        <template slot-scope="scope">
          <!-- 有分页时，序号显示 -->
          <span v-if="pageObj">{{(pageObj.currentPage - 1)*pageObj.size + scope.$index + 1}}</span>
          <!-- 无分页时，序号显示 -->
          <span v-else>{{scope.$index + 1}}</span>
        </template>
      </el-table-column>
      <template v-for="(col, index) in columns">
        <!-- 操作列/自定义列 -->
        <slot v-if="col.slot"
              :name="col.slot"></slot>

        <el-table-column v-else-if="col.btns"
                         class="table-col"
                         align="center"
                         :key="index"
                         :label="col.label"
                         :width="col.width"
                         :formatter="col.formatter"
                          >
          <template slot-scope="scope">
            <!--有自定义按钮-->
            <div v-if="scope.row.btns && scope.row.btns.length>0">
              <template v-for="(btn,index) in scope.row.btns">
<!--                <el-button :icon="btn.icon"-->
<!--                           @click="handleClick(scope.row,btn)"-->
<!--                           type="text"-->
<!--                           size="mini"-->
<!--                           :key="index">{{btn.label}}</el-button>-->

              </template>
            </div>
            <!--默认操作的按钮-->
            <div v-else>
              <template v-for="(btn,index) in col.btns">
                <el-button :icon="btn.icon"
                           @click="handleClick(scope.row,btn)"
                           type="text"
                           :disabled="btn.action == 1 ? isCanEdit(scope.row,btn):isCanDel(scope.row,btn)"
                           style="font-size: 18px"
                           :style="{'color':btnColor(scope.row,btn)}"
                           :key="index"> </el-button>
<!--                <el-image-->
<!--                  class="img-state"-->
<!--                  :style="{'margin-left':index == 1?'10px':'0'}"-->
<!--                  @click="handleClick(scope.row,btn)"-->
<!--                  :src="require(`@/assets/image/${btn.icon}`)">-->
<!--                </el-image>-->
              </template>
            </div>
          </template>
        </el-table-column>

        <!--带有formatter的列-->
        <el-table-column v-else-if="col.formatter"
                         class="table-col-commom"
                         :key="index"
                         :prop="col.prop"
                         :label="col.label"
                         :width="col.width"
                         :formatter="col.formatter"
                         align="center"
                          >
        </el-table-column>

        <!-- 普通列 -->
        <el-table-column v-else
                         class="table-col-commom"
                         :key="index"
                         :prop="col.prop"
                         :label="col.label"
                         :width="col.width"
                         :formatter="col.formatter"
                         align="center"
                         style="display: flex;justify-content: center"
                          >
          <template  slot-scope="scope">
            <!--有tag标签-->
            <span v-if="col.tags"
                  class="tag-span"
                  :style="{'background-color':col.prop.indexOf('.') != -1 ? getTagColor2(col.tags,scope.row,col.prop):getTagColor(col.tags,scope.row[col.prop])}">
                  {{col.prop.indexOf('.') != -1 ? getTagValue2(col.tags,scope.row,col.prop): getTagValue(col.tags,scope.row[col.prop])}}</span>
            <!--普通列/有颜色需要点击的列-->
            <div v-else-if="col.hasImage" style="display: flex;justify-content: center;align-items: center">
              <el-image class="img-state"  :src="getImage(scope.row,col.type)">
              </el-image>
            </div>


            <span v-else
                  :class="[col.color?'col-posint':'']"
                  @click="tabItemClick(scope.row,col.color)"
                  :style="{'color':col.color?col.color:''}">


              <el-popover v-if="isTimeCol(col.prop)" trigger="hover" placement="top">
                {{scope.row[col.prop]}}
              <div slot="reference" class="white-space">
                {{getTimeValue(scope.row[col.prop])}}
              </div>
             </el-popover>

              <el-popover v-else-if="(col.prop == 'createBy'||col.prop == 'projectLeader')&&scope.row[col.prop].length>6" trigger="hover" placement="top">
                {{col.prop.indexOf('.') != -1 ? getLabelName(scope.row,col.prop):scope.row[col.prop]}}
              <div slot="reference" class="white-space">
                {{col.prop.indexOf('.') != -1 ? getLabelName(scope.row,col.prop):scope.row[col.prop]}}
              </div>
             </el-popover>

              <el-popover v-else-if="(scope.row[col.prop] && scope.row[col.prop].length>12)||col.showShip" trigger="hover" placement="top">
              {{col.prop.indexOf('.') != -1 ? getLabelName(scope.row,col.prop):scope.row[col.prop]}}
              <div slot="reference" class="white-space">
                {{col.prop.indexOf('.') != -1 ? getLabelName(scope.row,col.prop):scope.row[col.prop]}}
              </div>
             </el-popover>

              <div v-else   class="white-space">
                 <span >
                {{col.prop.indexOf('.') != -1 ? getLabelName(scope.row,col.prop):scope.row[col.prop]}}
              </span>
              </div>

<!--              {{col.prop.indexOf('.') != -1 ? getLabelName(scope.row,col.prop):scope.row[col.prop]}}-->
            </span>
          </template>
        </el-table-column>
      </template>
    </el-table>
    <!-- 是否调用分页 -->
    <div class="page" v-show="!loading && tableData.length>0">

      <div class="approval-status">
        <div>
          <el-image class="img-state" :src="require('@/assets/image/approve_add.png')"></el-image>
          <span class="approve-text">草稿</span>
        </div>
        <div>
          <el-image class="img-state" :src="require('@/assets/image/approve_spz.png')"></el-image>
          <span class="approve-text">审批中</span>
        </div>
        <div>
          <el-image class="img-state" :src="require('@/assets/image/approve_ysp.png')"></el-image>
          <span class="approve-text">已审批</span>
        </div>
        <div>
          <el-image class="img-state" :src="require('@/assets/image/approve_bh.png')"></el-image>
          <span class="approve-text">驳回</span>
        </div>
        <div>
          <el-image class="img-state" :src="require('@/assets/image/approve_zz.png')"></el-image>
          <span class="approve-text">中止</span>
        </div>

      </div>

      <el-pagination v-if="pageObj"
                     :page-sizes="[10, 20, 30, 40]"
                     :page-size="pageObj.size"
                     @current-change="pageObj.func"
                     @size-change="pageObj.sizeChange"
                     background
                     layout="total, sizes, prev, pager, next, jumper"
                     :total="pageObj.total">
      </el-pagination>

    </div>

  </div>
</template>

<script>
export default {
  name: "dataTable",
  props: {
    tableData: {
      type: Array,
      default: null,
    },
    columns: {
      type: Array,
      default: null,
    },
    loading: {
      type: Boolean,
      default: false,
    },
    pageObj: {
      type: Object,
      default: null,
    },
    hasSerial: {
      type: Boolean,
      default: true,
    },
    multiSelect: {//是否多选
      type: Boolean,
      default: false,
    },
    singleSelect: {
      type: Boolean,//单选
      default: false,
    },
    rowKey: {
      type: String,
      default: undefined
    },
    isExpandAll: {
      type: Boolean,
      default: false
    },
    icon:{
      type:String,
      default: ''
    },
    type:{
      type:String,
      default: '0'
    }
  },
  watch:{
    showSearch:{
      handler(o1,o2){
        this.$set(this.pageObj,'hideHeader',o1);
      },
      immediate:true,
      deep:true,
    }
  },
  // props: ['tableData', 'columns', 'loading', 'pageObj' ],
  data () {
    return {
      multipleSelection: [],
      templateSelection: {},
      selectItem: 0,
      showSearch:false,
    }
  },
  methods: {
    btnColor(row,btn){
      if(btn.action == 1){
        if(!this.isCanEdit(row)){
          return btn.color
        }else{
          return '#ddd'
        }
      }else{
        if(!this.isCanDel(row)){
          return btn.color
        }else{
          return '#ddd'
        }
      }
    },
    isCanEdit(row,btn){
      let approvalStatus = row.approvalStatus
      if(row.projectApprovalUpdateStatus){
        approvalStatus = row.projectApprovalUpdateStatus
      }else if(row.projectApprovalStatus){
        approvalStatus = row.projectApprovalStatus
      }
      if(row[`userId`]){
        return true
      }else if(approvalStatus == 0 || approvalStatus == 2){
        return false
      }else{
        return true
      }

    },
    isCanDel(row,btn){
      let approvalStatus = row.approvalStatus
      if(row.projectApprovalUpdateStatus){
        approvalStatus = row.projectApprovalUpdateStatus
      }else if(row.projectApprovalStatus){
        approvalStatus = row.projectApprovalStatus
      }
      if(row[`userId`]){
        return false
      }else if(approvalStatus == 1 || approvalStatus == 3 || approvalStatus == 4){
        return true
      }else{
        return false
      }

    },
    getImage(item,type){
      if(type == 1){
        let approvalStatus = item.approvalStatus
        if(item.projectApprovalUpdateStatus){
          approvalStatus = item.projectApprovalUpdateStatus
        }else if(item.projectApprovalStatus){
          approvalStatus = item.projectApprovalStatus
        }
        if(approvalStatus == 0){
          return require('@/assets/image/approve_add.png')
        }else if(approvalStatus == 1){
          return require('@/assets/image/approve_spz.png')
        }else if(approvalStatus == 2){
          return require('@/assets/image/approve_bh.png')
        }else if(approvalStatus == 3){
          return require('@/assets/image/approve_ysp.png')
        }else if(approvalStatus == 4){
          return require('@/assets/image/approve_zz.png')
        }else if(approvalStatus == 5){
          return require('@/assets/image/approve_zz.png')
        }
      }else if(type == 2){
        if(item.projectCodeMainStatus == 0){
          return require('@/assets/image/maincode_no.png')
        }else if(item.projectCodeMainStatus == 1){
          return require('@/assets/image/maincode_yes.png')
        }
      }

    },
    tabItemClick (e, color) {
      //有颜色需要跳转的列
      if (color) {
        this.$emit('tabItemClick', e);
      }
    },
    sizeChange(pageSize,obj){

    },
    isTimeCol(col){
      if(col == 'createTime'){
        return true
      }else{
        return false
      }
    },
    getTimeValue(val){
      if(val && val.length>10){
        return val.substring(0,val.indexOf(' '))
      }else{
        return val
      }
    },
    getLabelName(row,names){
      let values = names.split('.');
      if(values && values.length > 0){
        if(row[values[0]]){
          return row[values[0]][values[1]]
        }else{
          return ''
        }
      }else{
        return ''
      }
    },
    getTagColor2(tags,row,prop){
      let values = prop.split('.');
      let value = '';
      if(values && values.length > 0){
        if(row[values[0]]){
          value = row[values[0]][values[1]]
        }else{
        }
      }else{
      }
      return this.getTagColor(tags,value);
    },
    getTagValue2 (tags,row,prop) {
      let values = prop.split('.');
      let value = '';
      if(values && values.length > 0){
        if(row[values[0]]){
          value = row[values[0]][values[1]]
        }else{
        }
      }else{
      }
      return this.getTagValue(tags,value);
    },
    getTagValue (tags, value) {
      let tag = tags.filter(obj => obj.dictValue == value);
      if (tag && tag.length > 0) {
        return tag[0].dictLabel
      }
      return tags[0].dictLabel;
    },
    getTagColor (tags, value) {
      let tag = tags.filter(obj => obj.dictValue == value);
      let color = '#2FCA9F';
      if (tag && tag.length > 0) {
        if(tag[0].color != null){
          return tag[0].color
        }
        if(tag[0].dictValue == 1){//低风险
          color = '#2FCA9F';
        }else if(tag[0].dictValue == 2){//中风险
          color = '#F4B924';
        }else if(tag[0].dictValue == 3){//高风险
          color = '#FF5252';
        }else{
          color = '#FF3D3D';
        }
        return color
      }
      return '#2fca9f';
    },
    handleSelectionChange (val) {
      this.multipleSelection = val;
      this.$emit('selectionChange', this.multipleSelection)
    },
    getTemplateRow (index, row) {
      this.templateSelection = row;
      this.$emit('selectionChange', this.templateSelection)
    },
    handleClick (row, btn) {
      let obj = {
        row,
        btn
      }
      //this.toast('点击了');
      this.$emit('actionBtnClick', obj)
    },
    tableRowClassName ({ row, rowIndex }) {
      if (rowIndex % 2 == 0) {
        return 'warning-row';
      } else {
        return 'success-row';
      }
    },
    tableHeaderClass ({ row, column, rowIndex, columnIndex }) {
      return {
        background: '#e8f3fe',
        color: '#505A69',
        textAlign: 'center',
        fontSize:'18px',
        height:'54px'
      };
    },
  }
}
</script>
<style lang="scss" scoped>
::v-deep.el-pagination.is-background .el-pager li:not(.disabled).active {
  background-color: #326ce6;
}
/*.data-table{*/
/*background-color: white;*/
/*padding: 10px;*/
/*border-radius: 6px;*/
/*font-size: 10px;*/
/*.table-main{*/
/*width: 100%;*/

/*.table-col{*/
/*font-size: 16px;*/
/*color: #333333;*/
/*}*/
/*}*/
/*}*/

/*!*::v-deep.el-table__body tr.hover-row>td{*!*/
/*!*background-color: transparent;*!*/
/*!*}*!*/

/*!*::v-deep .el-table tbody tr {*!*/
/*!*pointer-events:none;*!*/
/*!*}*!*/

::v-deep .el-table tbody tr:hover > td {
  background-color: transparent !important;
}

/*::v-deep .el-table .cell {*/
/*color: #333;*/
/*font-size: 13px;*/
/*-webkit-box-sizing: border-box;*/
/*box-sizing: border-box;*/
/*overflow: hidden;*/
/*text-overflow: ellipsis;*/
/*white-space: normal;*/
/*word-break: break-all;*/
/*line-height: 23px;*/
/*padding-right: 10px;*/

/*display: inline-block;*/
/*white-space: nowrap;*/
/*width: 100%;*/
/*overflow: hidden;*/
/*text-overflow:ellipsis;*/
/*}*/

/*::v-deep .el-table td, .el-table th.is-leaf {*/
/*border-bottom: 0px solid #EBEEF5;*/
/*}*/

/*::v-deep .el-table .warning-row {*/
/*background: #ffffff;*/
/*}*/

/*::v-deep .el-table .success-row {*/
/*background: #F0F3FA;*/
/*}*/

/*::v-deep .el-table__row>td{*/
/*border: none;*/
/*}*/

/*::v-deep .el-table::before {//去掉最下面的那一条线*/
/*height: 0px;*/
/*}*/

/*.page-bottom{*/
/*display: flex;*/
/*width: 100%;*/
/*align-items: center;*/
/*justify-content: center;*/
/*margin: 20px 0;*/
/*}*/

/*::v-deep .el-radio__label {*/
/*visibility: hidden;*/
/*}*/

.table-col-commom {
  color: #2a5fe0 !important;
}
.col-posint {
  cursor: pointer;
}
.tag-span {
  color: white;
  border-radius: 6px;
  padding: 5px;
}

::v-deep .el-table .warning-row {
  background: #ffffff;
}
::v-deep .el-table .success-row {
  background: #f3f9ff;;
}
.common-content {
  margin-bottom: 15px;
  background-color: #fff;
  //padding: 15px 15px 0;
  border-radius: 4px;
}
.commonTable {
  padding-bottom: 15px;
  padding-top: 10px;
  .btnBox {
    padding-bottom: 10px;
  }
}
.page {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-top: 15px;
  .approval-status{
    display: flex;
    color: #555555;
    font-size: 14px;
    align-items: center;

    div{
      display: flex;
      align-items: center;
      margin-left: 10px;
      .approve-text{
        margin-left: 5px;
      }
    }
    div:first-child{
      margin-left: 0;
    }
  }
}
::v-deep.el-form-item--small.el-form-item {
  margin-bottom: 15px;
}
::v-deep.el-form-item--small {
  .el-form-item__label {
    font-weight: inherit;
  }
}
::v-deep.el-table--group,
.el-table--border {
  border: 1px solid #ebeef5;
}
::v-deep.el-table .cell {
  font-size: 13px;
  text-overflow: initial;
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

/*表格最外边框*/
.customer-no-border-table /deep/ .el-table--border,/deep/ .el-table--group{
  border: none;
}
/*头部边框*/
/deep/ .customer-no-border-table thead tr th.is-leaf{
  border: 0px solid #EBEEF5;
  border-right: none;
}
.customer-no-border-table thead tr th:nth-last-of-type(2){
  border-right: 0px solid #EBEEF5;
}
/*表格最外层边框-底部边框*/
.customer-no-border-table .el-table--border::after,.customer-no-border-table .el-table--group::after{
  width: 0;
}
.customer-no-border-table::before{
  width: 0;
}
.customer-no-border-table .el-table__fixed-right::before,.el-table__fixed::before{
  width: 0;
}

/deep/ .el-table__header tr,
/deep/ .el-table__header th {
  padding: 0;
  height: 45px !important;
}
/deep/ .el-table__body tr,
/deep/ .el-table__body td {
  padding: 0;
  height: 42px;
  font-size: 16px !important;
  color: #555555 !important;
}

.white-space{
  white-space: nowrap;/*一行显示*/
  overflow: hidden;/*超出部分隐藏*/
  text-overflow: ellipsis;
}
.img-state{
  width: 18px;
  height: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.table-main{
  border: 1px solid #ddd;
}
/deep/ .el-checkbox__inner, /deep/.el-input__inner,/deep/ .el-radio__inner {
  border: 1px solid #1989FA;
}

</style>
