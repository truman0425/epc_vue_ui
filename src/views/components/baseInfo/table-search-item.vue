<template>
  <div class="filter-main" v-show="isVisible">
    <div class="filter-body">
      <div class="body-content">
        <div
          v-for="(item, index) in filterList"
          class="filter-body-main"
          :key="index"
        >
          <el-button
            :style="{
              visibility: index != 0 && index != 1 ? 'visible' : 'hidden',
            }"
            :disabled="filterList.length == 1"
            v-show="filterList.length != 2"
            @click="removeItem(index)"
            size="mini"
            class="filter-btn-j btn-add-del"
            icon="el-icon-minus"
            circle
          ></el-button>
          <el-select
            class="el-select-btn"
            @change="filterSelClick"
            v-model="item.filterName"
            placeholder="请选择条件"
          >
            <el-option
              v-for="item in filterOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
          <div class="filter-item">
            <el-input
              class="query-input"
              v-if="!item.filterType"
              @change="filterItemSelClick(item)"
              v-model="item.filterValue"
              placeholder="请输入内容"
              clearable
            ></el-input>
            <el-input
              class="query-input"
              v-if="item.filterType == 'worktime'"
              type="text"
              @focus="selectWorkTime(item)"
              v-model="timeStages"
              placeholder="请选择填报日期"
            ></el-input>
            <el-input
              class="query-input"
              @change="filterItemSelClick(item)"
              v-if="item.filterType == 'string'"
              :type="item.inputType ? item.inputType : 'text'"
              v-model="item.filterValue"
              placeholder="请输入内容"
              clearable
            ></el-input>
            <el-date-picker
              class="query-input"
              @change="filterItemSelClick(item)"
              v-if="item.filterType == 'date'"
              v-model="item.filterValue"
              type="date"
              placeholder="选择日期"
              format="yyyy-MM-dd"
              value-format="yyyy-MM-dd"
              clearable
            ></el-date-picker>
            <el-select
              class="query-input"
              @change="filterItemSelClick(item)"
              v-if="item.filterType == 'select'"
              v-model="item.filterValue"
              placeholder="请选择"
              clearable
            >
              <el-option
                v-for="item2 in item.options"
                :key="item2.dictValue"
                :label="item2.dictLabel"
                :value="item2.dictValue"
              >
              </el-option>
            </el-select>
            <el-date-picker
              class="query-input"
              v-model="daterange"
              @change="filterItemSelClick(item)"
              v-if="item.filterType == 'daterange'"
              type="daterange"
              format="yyyy-MM-dd"
              value-format="yyyy-MM-dd"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              clearable
            >
            </el-date-picker>
          </div>
          <el-button
            v-show="index == filterList.length - 1"
            size="mini"
            class="filter-btn-add2 btn-add-del"
            @click="addFilter"
            icon="el-icon-plus"
            circle
          ></el-button>
          <span
            @click="addFilter"
            v-show="index == filterList.length - 1"
            class="tj-sx-tj"
            >添加筛选条件</span
          >
          <!--        <el-button-->
          <!--          style="margin-left: 10px"-->
          <!--          v-show="index == filterList.length -1 "-->
          <!--          size="mini" class="filter-btn-add" @click="resetQuery"-->
          <!--          icon="el-icon-refresh" circle></el-button>-->

          <!--        <el-image :src="require('@/assets/image/filter_rest.png')"></el-image>-->
        </div>
      </div>

      <div class="filter-bottom">
        <!--      <el-button type="primary" icon="el-icon-search" size="mini" @click="searchQuery" >查询</el-button>-->
        <!--      <el-button icon="el-icon-refresh" size="mini" @click="resetQuery" >重置</el-button>-->
      </div>
    </div>
    <!--  <div class="filter-footer">-->
    <!--    <el-button :disabled="filterList.length == filterAllOptions.length" size="mini" class="filter-btn-add" @click="addFilter"  icon="el-icon-plus" circle></el-button>-->
    <!--    <span  @click="addFilter" class="add-filter">添加筛选条件</span>-->
    <!--  </div>-->
  </div>
</template>

<script>
import { getMoreEnums } from "@/api/projectPlanning/projectRegistration";

export default {
  name: "filter-search-item",
  props: {
    filterOption: {
      type: Array,
      default: [],
    },
    visibility: {
      type: Boolean,
      default: true,
    },
    timeStages:{
      type:String,
      default:''
    },
    queryParams: {
      type: Object,
      default: {},
    },
  },
  watch: {
    visibility(val) {
      this.isVisible = !this.isVisible;
    },
  },
  data() {
    return {
      filterList: [
        {
          filterName: "projectName",
          filterType: "string",
          options: [],
        },
      ],
      daterange: "",
      filterAllOptions: [],
      isVisible: this.visibility,
      filterOptions: [],
    };
  },
  created() {
    this.getBaseNum(
      "approve_status,project_type,project_main_status,project_status"
    );
    this.filterAllOptions = JSON.parse(JSON.stringify(this.filterOption));
    this.filterList = [
      {
        filterName: this.filterOption[0].value,
        filterType: this.filterOption[0].type,
        options: this.filterOption[0].options || [],
      },
      {
        filterName: this.filterOption[1].value,
        filterType: this.filterOption[1].type,
        options: this.filterOption[1].options || [],
      },
    ];
    this.filterOptions = this.filterAllOptions;
    setTimeout(() => {
      this.filterOptions = this.filterAllOptions.filter(
        (res) =>
          res.value != this.filterOption[0].value &&
          res.value != this.filterOption[1].value
      );
    }, 500);
  },
  methods: {
    hideView() {
      this.isVisible = false;
    },
    refushOptions(options){
      this.filterAllOptions = JSON.parse(JSON.stringify(options))
    },
    getBaseNum(base) {
      getMoreEnums(base).then((res) => {
        if (res.data) {
          this.filterAllOptions.forEach((s) => {
            if (s.label == "审批状态") {
              //this.$set(s, "options", res.data.approve_status);
            } else if (s.label == "项目状态") {
              //this.$set(s, "options", res.data.project_status);
            } else if (s.label == "主数据同步状态") {
              this.$set(s, "options", res.data.project_main_status);
            } else if (s.label == "工时状态") {
              this.$set(s, "options", res.data.approve_status);
            }
          });
        }
      });
    },
    removeItem(index) {
      this.queryParams[this.filterList[index].filterName] = "";
      this.filterList.splice(index, 1);
      this.filterOptions = this.filterAllOptions;
      setTimeout(() => {
        this.filterOptions = this.filterAllOptions.filter((res) => {
          let obj = this.filterList.find((r) => r.filterName == res.value);
          return obj ? false : true;
        });
        this.searchQuery();
      }, 500);

      console.log("filelist=" + JSON.stringify(this.filterList));
      console.log("filelisto=" + JSON.stringify(this.filterOptions));
    },
    addFilter() {
      console.log(3333);
      if (this.filterList.length <= this.filterAllOptions.length - 1) {
        this.filterList.push({
          filterName: "",
        });
      }
      if (this.filterList.length <= this.filterAllOptions.length - 1) {
        this.filterList.push({
          filterName: "",
        });
      }
    },
    searchQuery() {
      //this.queryParams.epcProjectEstablish = {}

      this.filterList.forEach((item) => {
        this.queryParams[item.filterName] = item.filterValue;
        // this.queryParams[`epcProjectEstablish.${item.filterName}`] =
        //   item.filterValue;
        if (item.filterType == "daterange" && this.daterange != "") {

          if(item.filterName.indexOf('beginContrOrderDate') != -1){
            this.queryParams['beginContrOrderDate'] = this.daterange && this.daterange.length > 0 ? this.daterange[0]:'';
            this.queryParams['endContrOrderDate'] = this.daterange && this.daterange.length > 0 ? this.daterange[1]:'';
          }

          else if(item.filterName.indexOf('beginPlanStartDate') != -1){
            this.queryParams['beginPlanStartDate'] = this.daterange && this.daterange.length > 0 ? this.daterange[0]:'';
            this.queryParams['endPlanStartDate'] = this.daterange && this.daterange.length > 0 ? this.daterange[1]:'';
          }

          else if(item.filterName.indexOf('beginPlanEndDate') != -1){
            this.queryParams['beginPlanEndDate'] = this.daterange && this.daterange.length > 0 ? this.daterange[0]:'';
            this.queryParams['endPlanEndDate'] = this.daterange && this.daterange.length > 0 ? this.daterange[1]:'';
          }

          else if(item.filterName.indexOf('beginLatestTime') != -1){
            this.queryParams['beginLatestTime'] = this.daterange && this.daterange.length > 0 ? this.daterange[0]:'';
            this.queryParams['endLatestTime'] = this.daterange && this.daterange.length > 0 ? this.daterange[1]:'';
          }

          else if(item.filterName.indexOf('beginCollactDate') != -1){
            this.queryParams['beginCollactDate'] = this.daterange && this.daterange.length > 0 ? this.daterange[0]:'';
            this.queryParams['endCollactDate'] = this.daterange && this.daterange.length > 0 ? this.daterange[1]:'';
          }
          else if(item.filterName.indexOf('beginCreateTime') != -1){
            this.queryParams['beginCreateTime'] = this.daterange && this.daterange.length > 0 ? this.daterange[0]:'';
            this.queryParams['endCreateTime'] = this.daterange && this.daterange.length > 0 ? this.daterange[1]:'';
          }
          else if(item.filterName.indexOf('params') != -1){
             this.queryParams['beginCreateTime'] = this.daterange && this.daterange.length > 0 ? this.daterange[0]:'';
             this.queryParams['endCreateTime'] = this.daterange && this.daterange.length > 0 ? this.daterange[1]:'';
           }
          else{
            this.queryParams.beginTime = this.daterange && this.daterange.length > 0 ? this.daterange[0]:'';
            this.queryParams.endTime = this.daterange && this.daterange.length > 0 ? this.daterange[1]:'';
          }

        }
      });
      this.$emit("onSearch");
    },
    resetQuery() {
      this.filterList.forEach((res) => {
        res.filterValue = "";
        this.daterange = "";
        this.queryParams.beginTime = "";
        this.queryParams.endTime = "";
        this.queryParams['beginCreateTime'] = '';
        this.queryParams['endCreateTime'] = '';
        if(this.queryParams.beginContrOrderDate){
          this.$delete(this.queryParams,'beginContrOrderDate')
        }
        if(this.queryParams.endContrOrderDate){
          this.$delete(this.queryParams,'endContrOrderDate')
        }
        if(this.queryParams.beginPlanStartDate){
          this.$delete(this.queryParams,'beginPlanStartDate')
        }
        if(this.queryParams.endPlanStartDate){
          this.$delete(this.queryParams,'endPlanStartDate')
        }
        if(this.queryParams.beginPlanEndDate){
          this.$delete(this.queryParams,'beginPlanEndDate')
        }
        if(this.queryParams.endPlanEndDate){
          this.$delete(this.queryParams,'endPlanEndDate')
        }

        if(this.queryParams.beginCollactDate){
          this.$delete(this.queryParams,'beginCollactDate')
        }

        if(this.queryParams.endCollactDate){
          this.$delete(this.queryParams,'endCollactDate')
        }



      });

      this.searchQuery();
    },
    selectWorkTime(item){
       this.$emit("onSearch",item);

    },
    filterSelClick(item) {
      this.filterOptions = this.filterAllOptions.filter((res) => {
        let obj = this.filterList.find((r) => r.filterName == res.value);
        return obj ? false : true;
      });
      let obj = this.filterAllOptions.find((res) => res.value == item);
      let obj2 = this.filterList.find((res) => res.filterName == item);
      if (obj) {
        this.$set(obj2, "filterType", obj.type);
        this.$set(obj2, "filterValue", "");
        this.$set(obj2, "inputType", obj.inputType);
        this.$set(obj2, "options", obj.options);
      }
    },
    filterItemSelClick() {
      this.searchQuery();
      this.$forceUpdate();
    },
  },
};
</script>

<style lang="scss" scoped>
.filter-main {
  margin-top: 10px;
  .filter-body {
    display: flex;
    align-items: flex-end;

    .filter-body-main:nth-child(2n) {
      margin-left: 49px;
    }

    .filter-body-main {
      display: flex;
      align-items: center;
      margin: 10px 0;

      .filter-btn-j {
        margin-right: 15px;

        /deep/ .el-button {
          border: 1px solid #999;
          border-color: #999;
          color: #999 !important;
        }
      }

      .filter-item {
        margin-left: 5px;
      }
    }
    .filter-bottom {
      display: flex;
      align-items: center;
      margin-bottom: 12px;
      margin-left: 10px;
    }
    .filter-footer {
      display: flex;
      align-items: center;
      .filter-btn-add {
        margin-right: 15px;
        border: 1px solid #1989fa !important;
        border-color: #1989fa !important;
        margin-left: 10px;
        color: #1989fa;
        border: 1px solid;

        /deep/ .el-button {
          border: 1px solid #1989fa !important;
          border-color: #1989fa !important;
        }
      }
    }
  }
}
.query-input {
  width: 270px !important;
}
.add-filter {
  margin-left: 10px;
  cursor: pointer;
}
.body-content {
  display: flex;
  flex-wrap: wrap;
}
.btn-add-del {
  width: 23px;
  height: 23px;
  padding: 0;
  margin-left: 10px;
}
.tj-sx-tj {
  color: #1989fa;
  font-size: 18px;
  margin-left: 3px;
  cursor: pointer;
}
/deep/ .el-input__inner {
  border-radius: 8px;
  height: 46px;
  line-height: 46px;
  font-size: 16px;
}
.el-select-btn {
  width: 164px;
}

/deep/ .el-range-separator {
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
}

.filter-btn-add2 {
  margin-right: 2px;
  border: 1px solid #1989fa !important;
  border-color: #1989fa !important;
  margin-left: 10px;
  color: #1989fa;
  border: 1px solid;

  /deep/ .el-button {
    border: 1px solid #1989fa !important;
    border-color: #1989fa !important;
  }
}
</style>
