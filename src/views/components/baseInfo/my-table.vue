<template>
  <div class="common-content commonTable" :class="{'scrollTab':autoWidth}">

    <el-table :data="tableData"
              :style="{'width':autoWidth?'auto':'100%'}"
              class="table-main customer-no-border-table"
              size="small"
              border
              :row-class-name="tableRowClassName"
              @selection-change="handleSelectionChange"
              v-loading="loading"
              :row-key="rowKey"
              :max-height="belowHeight"
              :header-cell-style="tableHeaderClass"
              :default-expand-all="isExpandAll">

      <!--多选-->
      <el-table-column v-if="multiSelect"
                       type="selection"
                       align="center"
                       width="45">
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
                       :width="serialWidth"
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
                <el-button
                          v-if="btn.hasPermi && !btn.disabled"
                          :icon="btn.icon"
                           @click="handleClick(scope.row,btn)"
                           type="text"
                           v-hasPermi="btn.hasPermi?btn.hasPermi:''"
                           :disabled="btn.action == 1 ? isCanEdit(scope.row,btn):isCanDel(scope.row,btn)"
                           class="icon-btn"
                           :style="{'color':btnColor(scope.row,btn)}"
                           :key="index"> </el-button>

                <el-button
                  v-else-if="btn.hasPermi && btn.disabled"
                  :icon="btn.icon"
                  @click="handleClick(scope.row,btn)"
                  type="text"
                  v-hasPermi="btn.hasPermi?btn.hasPermi:''"
                  :disabled="btn.disabled(scope.row,btn)"
                  class="icon-btn"
                  :style="{'color':btn.disabled(scope.row,btn)?'#ddd':btn.color}"
                  :key="index"> </el-button>

                <el-button
                  v-else-if="!btn.hasPermi && btn.disabled"
                  :icon="btn.icon"
                  @click="handleClick(scope.row,btn)"
                  type="text"
                  :disabled="btn.disabled(scope.row,btn)"
                  class="icon-btn"
                  :style="{'color':btn.disabled(scope.row,btn)?'#ddd':btn.color}"
                  :key="index"> </el-button>

                <el-button v-else :icon="btn.icon"
                           @click="handleClick(scope.row,btn)"
                           type="text"
                           :disabled="btn.action == 1 ? isCanEdit(scope.row,btn):btn.action == -1?false:isCanDel(scope.row,btn)"
                           class="icon-btn"
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
                         :show-overflow-tooltip="!isTimeCol(col.prop)"
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
              <el-image v-show="getImage(scope.row,col.type) != -1"  class="img-state" :src="getImage(scope.row,col.type)">
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

<!--              <el-popover v-else-if="(col.prop == 'createBy'||col.prop == 'projectLeader')&&scope.row[col.prop].length>6" trigger="hover" placement="top">-->
<!--                {{col.prop.indexOf('.') != -1 ? getLabelName(scope.row,col.prop):scope.row[col.prop]}}-->
<!--              <div slot="reference" class="white-space">-->
<!--                {{col.prop.indexOf('.') != -1 ? getLabelName(scope.row,col.prop):scope.row[col.prop]}}-->
<!--              </div>-->
<!--             </el-popover>-->

<!--              <el-popover v-else-if="(scope.row[col.prop] && scope.row[col.prop].length>12)||col.showShip" trigger="hover" placement="top">-->
<!--              {{col.prop.indexOf('.') != -1 ? getLabelName(scope.row,col.prop):scope.row[col.prop]}}-->
<!--              <div slot="reference" class="white-space">-->
<!--                {{col.prop.indexOf('.') != -1 ? getLabelName(scope.row,col.prop):scope.row[col.prop]}}-->
<!--              </div>-->
<!--             </el-popover>-->

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

      <template slot="empty">
        <div class="noData" v-show="!loading">
          <span>暂无数据</span>
          <el-image class="nodata-img" :src="require('@/assets/image/projectPre/table_no_data.png')"></el-image>
        </div>
      </template>

    </el-table>
    <!-- 是否调用分页 -->
    <div class="page" v-show="!loading && tableData.length>0">
      <div class="approval-status"  :style="{'visibility':haveApprove?'visible':'hidden'}">
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
                     :layout="layout"
                     :total="pageObj.total">
      </el-pagination>

    </div>

  </div>
</template>

<script>
export default {
  name: "dataTable",
  props: {
    layout:{
      type:String,
      default: 'total, sizes, prev, pager, next, jumper'
    },
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
    haveApprove: {
      type: Boolean,//单选
      default: true,
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
    autoWidth:{
      type: Boolean,
      default: false
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
  created() {
    let width = window.document.documentElement.getBoundingClientRect().width
    let heigth = window.document.documentElement.getBoundingClientRect().height
    let scale = width/1520
    let scale2 = width/1920
    let scale3 = heigth/943
    this.columns.forEach(res=>{
      let w = parseInt(res.width)
      res.width = scale*w

      if(res.approvalStatus || res.projectApprovalUpdateStatus || res.projectApprovalStatus){
        this.haveApprove = true
      }
    })
    this.belowHeight = (parseInt(this.belowHeight)*scale3).toFixed(2)
    this.belowHeight = parseFloat(this.belowHeight)
    this.serialWidth = (this.serialWidth*scale2).toFixed(2)
    this.headerHeight = (this.headerHeight*scale2).toFixed(2)

  },
  // props: ['tableData', 'columns', 'loading', 'pageObj' ],
  data () {
    return {
      multipleSelection: [],
      templateSelection: {},
      selectItem: 0,
      showSearch:false,
      serialWidth:60,
      // haveApprove:true,
      headerHeight:54,
      belowHeight: '480',
    }
  },
  methods: {
    //action 1 编辑 -1其他 0删除
    btnColor(row,btn){
      if(btn.action == 1){
        if(!this.isCanEdit(row)){
          return btn.color
        }else{
          return '#ddd'
        }
      }else if(btn.action == -1){
        return btn.color
      }
      else{
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
      let clueStatus=row.clueStatus
      if(row.projectApprovalUpdateStatus){
        approvalStatus = row.projectApprovalUpdateStatus
      }else if(row.projectApprovalStatus){
        approvalStatus = row.projectApprovalStatus
      }

      // let projStatus = row.projStatus
      //
      // if(projStatus != 1){
      //   return true
      // }else

      if(row[`userId`]){
        return true
      }else if(approvalStatus == 1 || approvalStatus == 3 || approvalStatus == 4){
        return true
      }else if(clueStatus==2){
        return true
      } else{
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
          return require('@/assets/image/projectPre/chanceLib_gjz.png')
        }else if(approvalStatus == 1){
          return require('@/assets/image/projectPre/chanceLib_spz.png')
        }else if(approvalStatus == 2){
          return require('@/assets/image/projectPre/chanceLib_wx.png')
        }else if(approvalStatus == 3){
          return require('@/assets/image/projectPre/chanceLib_lx.png')
        }else if(approvalStatus == 4){
          return require('@/assets/image/projectPre/chanceLib_lx.png')
        }else if(approvalStatus == 5){
          return require('@/assets/image/projectPre/chanceLib_lx.png')
        }
      }else if(type == 2){
        if(item.projectCodeMainStatus == 0){
          return require('@/assets/image/maincode_no.png')
        }else if(item.projectCodeMainStatus == 1){
          return require('@/assets/image/maincode_yes.png')
        }
      }
      else if(type == 3){
        if(item.projStatus == 1){
          return require('@/assets/image/projectPre/chanceLib_gjz.png')
        }else if(item.projStatus == 2){
          return require('@/assets/image/projectPre/chanceLib_wx.png')
        }else if(item.projStatus == 3){
          return require('@/assets/image/projectPre/chanceLib_spz.png')
        }else if(item.projStatus == 4){
          return require('@/assets/image/projectPre/chanceLib_lx.png')
        }
      }
      else if(type == 4){
        if(item.projHeat == 3){
          return require('@/assets/image/projectPre/chanceLib_r.png')
        }else if(item.projHeat == 2){
          return require('@/assets/image/projectPre/chanceLib_w.png')
        }else if(item.projHeat == 1){
          return require('@/assets/image/projectPre/chanceLib_l.png')
        }
      }
      else if(type == 5){
        if(item.projStatus == 1){
          return require('@/assets/image/projectPre/clue_dcl.png')
        }else if(item.projStatus == 2){
          return require('@/assets/image/projectPre/clue_dcq.png')
        }else if(item.projStatus == 3){
          return require('@/assets/image/projectPre/chanceLib_wx.png')
        }else if(item.projStatus == 4){
          return require('@/assets/image/projectPre/chanceLib_gjz.png')
        }else if(item.projStatus == 5){
          return require('@/assets/image/projectPre/clue_yzjh.png')
        }
      }
      else if(type == 6){
        if(item.clueStatus == 0){
          return require('@/assets/image/projectPre/clue_dcl.png')
        }else if(item.clueStatus == 3){
          return require('@/assets/image/projectPre/clue_dcq.png')
        }else if(item.clueStatus == 4){
          return require('@/assets/image/projectPre/chanceLib_wx.png')
        }
      }
      else if(type == 7){
        if(item.clueStatus == 1){
          return require('@/assets/image/projectPre/chanceLib_gjz.png')
        }else if(item.clueStatus == 2){
          return require('@/assets/image/projectPre/clue_yzjh.png')
        }
      }else if(type == 8){
        if(item.approvalStatus == 0){
          return require('@/assets/image/projectPre/project_item_status_xz.png')
        }else if(item.approvalStatus == 1){
          return require('@/assets/image/projectPre/project_item_status_lxspz.png')
        }else if(item.approvalStatus == 2 || item.approvalStatus == 4){
          return require('@/assets/image/projectPre/project_item_status_wcglx.png')
        }else if(item.approvalStatus == 3){
          return require('@/assets/image/projectPre/project_item_status_ycglx.png')
        }
      }else if(type == 9){
        if(item.projStatus == 1){
          return require('@/assets/image/projectPre/project_status_zxz.png')
        }else if(item.projStatus == 2){
          return require('@/assets/image/projectPre/project_status_ycj.png')
        }else if(item.projStatus == 9){
          return require('@/assets/image/projectPre/project_status_ygb.png')
        }
      }else if(type == 10){
        //0=新增,1=审批中,2=驳回,3=已审批
        let approvalStatus = item.approvalStatus
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
          return require('@/assets/image/projectPre/chanceLib_lx.png')
        }else{
          return -1
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
      if(col == 'createTime' || col == 'lastUpdateTime'){
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
        height:`${this.headerHeight}px`
      };
    },
  }
}
</script>
<style lang="scss" scoped>
::v-deep.el-pagination.is-background .el-pager li:not(.disabled).active {
  background-color: #1989fa;
}
::v-deep .el-pagination span:not([class*=suffix]), ::v-deep.el-pagination button,::v-deep .el-input--mini .el-input__inner{
  height: 42px;
  line-height: 42px;
  font-size: 16px;
  border-radius: 8px !important;
}
::v-deep .el-input--mini .el-input__inner,::v-deep .el-pagination__editor.el-input .el-input__inner,::v-deep .el-pager li{
  font-size: 16px;
  border-radius: 8px !important;
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
  padding-top: 20px;
  .approval-status{
    display: flex;
    color: #555555;
    font-size: 14px;
    align-items: center;
    div{
      display: flex;
      align-items: center;
      margin-left: 20px;
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
  border: 1px solid rgba(80, 90, 105, 0.1);
}
::v-deep.el-table .cell {
  font-size: 16px;
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
  font-weight: bold;
  //height: 45px !important;
}
/deep/ .el-table__body tr,
/deep/ .el-table__body td {
  padding: 0;
  height: 48px;
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
  border: 1px solid rgba(25,137,250,0.5);
}

/deep/ .number{
  width: 42px;
  height: 42px;
  line-height: 42px !important;
  background: #1989FA;
  border-radius: 8px;
}
::v-deep .el-table--border th:first-child .cell,::v-deep .el-table--border td:first-child .cell{
  padding-left: 0 !important;
  padding-right: 0 !important;
}
::v-deep .el-checkbox__input.is-indeterminate .el-checkbox__inner::before {
  left: 50%!important;
  top: 50%!important;
  transform: translate(-50%,-50%)!important;
}
::v-deep .el-checkbox__inner::after{
  left: 50%!important;
  top: 43%!important;
  width: 4px!important;
  transform: translate(-50%,-50%) rotate(45deg)!important;
}
::v-deep .el-checkbox__inner{
  padding: 8px!important;

}
//::v-deep .el-checkbox__inner::after{
//  left: 5.5px;
//}

//左右滚动
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

/deep/ .el-table__body{
  width: 100% !important;
}

/deep/ .el-table {
  th.gutter, colgroup.gutter {
    width: 0px !important;//此处的宽度值，对应你自定义滚动条的宽度即可
  }
}


/deep/ .el-table__header colgroup col[name="gutter"] {
  display: table-cell !important;
}

/deep/ .more{
    width: 0.525rem !important;
    height: 0.525rem !important;
    line-height: 0.525rem !important;
    text-align: center !important;
  }

/deep/ .el-pagination__editor.el-input {
  width: 0.525rem !important;
  height: 0.525rem !important;
  line-height: 0.525rem !important;
}
/deep/ .el-pagination__editor.el-input .el-input__inner {
  height: 0.525rem !important;
}

/deep/ .el-pagination{
  padding: 0 !important;
}
.icon-btn{
  font-size: 26px;
}


.noData{
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin: 30px 0;
  >span{
    font-family: MicrosoftYaHei;
    font-size: 18px;
    font-weight: normal;
    font-stretch: normal;
    line-height: 36px;
    letter-spacing: 0px;
    color: rgba(80,90,105,0.8);
  }
  .nodata-img{
    width: 150px;
  }
}

</style>
<style>
.el-tooltip__popper.is-dark {
  background: #ffffff !important;
  color: #333 !important;
  position: absolute;
  background: #fff;
  min-width: 1.875rem;
  border-radius: 0.05rem;
  border: 1px solid #e6ebf5;
  padding: 0.15rem;
  z-index: 2000;
  color: #606266;
  line-height: 1.4;
  text-align: justify;
  font-size: 0.175rem;
  box-shadow: 0 2px 0.15rem 0 rgb(0 0 0 / 10%);
  word-break: break-all;
}

.el-tooltip__popper[x-placement^="top"] .popper__arrow::after {
  bottom: 1px;
  margin-left: -0.0625rem;
  border-top-color:#fff;
  border-bottom-width: 0;
}

.el-tooltip__popper[x-placement^="top"] .popper__arrow {
  bottom: -0.075rem;
  border-top-color: #e6ebf5;
  border-bottom-width: 0;
}
</style>
