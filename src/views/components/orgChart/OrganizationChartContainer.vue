<template>
  <div v-bind="{ scopedSlots: $scopedSlots }"
       class="orgchart-container"
       @wheel="zoom && zoomHandler($event)"
       @mouseup="pan && panning && panEndHandler($event)"
  >
    <div
      class="orgchart"
      :style="{ transform: transformVal, cursor: cursorVal }"
      @mousedown="pan && panStartHandler($event)"
      @mousemove="pan && panning && panHandler($event)"
    >
      <organization-chart-node :datasource="datasource.ownerNode" :type="type" v-if="datasource.ownerNode"
                                :nodeTypeOptions="nodeTypeOptions" @isrefer="isrefer" style="float:left;">
         <template v-for="slot in Object.keys($scopedSlots)" :slot="slot" slot-scope="scope">
           <slot :name="slot" v-bind="scope"/>
         </template>
       </organization-chart-node>

       <organization-chart-node :datasource="datasource.supervisorNode" :type="type" v-if="datasource.supervisorNode"
                               :nodeTypeOptions="nodeTypeOptions" @isrefer="isrefer" style="float:left;">
        <template v-for="slot in Object.keys($scopedSlots)" :slot="slot" slot-scope="scope">
          <slot :name="slot" v-bind="scope"/>
        </template>
      </organization-chart-node>


       <organization-chart-node :datasource="datasource.organTree" :type="type" v-if="datasource.organTree"
                                :nodeTypeOptions="nodeTypeOptions" @isrefer="isrefer" style="float:left;">
         <template v-for="slot in Object.keys($scopedSlots)" :slot="slot" slot-scope="scope">
           <slot :name="slot" v-bind="scope"/>
         </template>
       </organization-chart-node>


      <!--第二种orgChart-->
    <!--  <vo-edit style="background: #fff"
               :data="chartData"
               :exportButton=true
               :toggleCollapse=true
               exportButtonName="导出"
               exportFilename="test"
      >

      </vo-edit>-->

    </div>
  </div>
</template>

<script>
  import $ from 'jquery'
  import OrgChart from './OrganizationChartContainer'
  import OrganizationChartNode from './OrganizationChartNode.vue'
  import data from './data';
  import methods from './methods';

  export default {
    name: 'orgChart',
    props:
      {
        type: {
          type: String,
          required: false
        },
        datasource: {
          type: Object,
          required: true
        },
        pan: {
          type: Boolean,
          required: false
        },
        zoom: {
          type: Boolean,
          required: false
        },
        zoomoutLimit: {
          type: Number,
          required: false,
          default: 0.5
        },
        zoominLimit: {
          type: Number,
          required: false,
          default: 7
        },
      /*  positionOptions: {
          type: Array,
          required: true
        },*/
        nodeTypeOptions: {
          type: Array,
          required: true
        },
        hasexport:{
          type:Boolean,
          required:true
        }
      },
    data:function () {
      return data.init(this);
    },
    watch:{
     /* 'positionOptions'(val){
        this.positionOptions = val;

      },*/
      'nodeTypeOptions'(val){
        this.nodeTypeOptions = val;
      },
      'hasexport'(val){

        if(val==true){

          this.exportFunc(this.datasource);
        }
      }
    },
    components: {
      OrganizationChartNode,
     /* VoEdit*/
    },
    created(){
     // this.getAllPositionList();
    },
    mounted() {
      this.chartData = {
        name: 'JavaScript',
        children: [
          { name: 'Angular' },
          {
            name: 'React',
            children: [{ name: 'Preact' }]
          },
          {
            name: 'Vue',
            children: [{ name: 'Moon' }]
          }
        ]
      };
      this.$nextTick(
        this.mountOrgchart()
      )
    },
    methods:methods,
  };

</script>

<style lang="scss">
  .el-form-item--medium .el-form-item__label{
    font-size: 14px;
    font-weight: bold;
  }
  .orgchart-container {
    position: relative;
    display: inline-block;
    height: auto;
    width: calc(100% - 24px);
   /* border: 2px dashed #aaa;*/
    border-radius: 5px;
    overflow: auto;
    text-align: center;
  }
  .orgchart {
    box-sizing: border-box;
    display: inline-block;
    min-height: 202px;
    min-width: 202px;
    -webkit-touch-callout: none;
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    /*background-image: linear-gradient(
      90deg,
      rgba(200, 0, 0, 0.15) 10%,
      rgba(0, 0, 0, 0) 10%
    ),
    linear-gradient(rgba(200, 0, 0, 0.15) 10%, rgba(0, 0, 0, 0) 10%);*/
    background-size: 10px 10px;
    border: 1px dashed rgba(0, 0, 0, 0);
    padding: 20px;
  }
  .orgchart .hidden,
  .orgchart ~ .hidden {
    display: none;
  }
  .orgchart.b2t {
    transform: rotate(180deg);
  }
  .orgchart.l2r {
    position: absolute;
    transform: rotate(-90deg) rotateY(180deg);
    transform-origin: left top;
  }
  .orgchart .verticalNodes ul {
    list-style: none;
    margin: 0;
    padding-left: 18px;
    text-align: left;
  }
  .orgchart .verticalNodes ul:first-child {
    margin-top: 2px;
  }
  .orgchart .verticalNodes > td::before {
    content: "";
    border: 1px solid rgba(217, 83, 79, 0.8);
  }
  .orgchart .verticalNodes > td > ul > li:first-child::before {
    box-sizing: border-box;
    top: -4px;
    height: 30px;
    width: calc(50% - 2px);
    border-width: 2px 0 0 2px;
  }
  .orgchart .verticalNodes ul > li {
    position: relative;
  }
  .orgchart .verticalNodes ul > li::before,
  .orgchart .verticalNodes ul > li::after {
    box-sizing: border-box;
    content: "";
    position: absolute;
    left: -6px;
    border-color: rgba(217, 83, 79, 0.8);
    border-style: solid;
    border-width: 0 0 2px 2px;
  }
  .orgchart .verticalNodes ul > li::before {
    top: -4px;
    height: 30px;
    width: 11px;
  }
  .orgchart .verticalNodes ul > li::after {
    top: 1px;
    height: 100%;
  }
  .orgchart .verticalNodes ul > li:first-child::after {
    box-sizing: border-box;
    top: 24px;
    width: 11px;
    border-width: 2px 0 0 2px;
  }
  .orgchart .verticalNodes ul > li:last-child::after {
    box-sizing: border-box;
    border-width: 2px 0 0;
  }
  .orgchart.r2l {
    position: absolute;
    transform: rotate(90deg);
    transform-origin: left top;
  }
  .orgchart > .spinner {
    font-size: 100px;
    margin-top: 30px;
    color: rgba(68, 157, 68, 0.8);
  }
  .orgchart table {
    border-spacing: 0;
    border-collapse: separate;
  }
  .orgchart > table{
    margin: 0 20px;
  }
  .orgchart > table:first-child {
    /*margin: 20px auto;*/
  }
  .orgchart td {
    text-align: center;
    vertical-align: top;
    padding: 0;
  }
  .orgchart .lines:nth-child(3) td {
    box-sizing: border-box;
    height: 20px;
  }
  .orgchart .lines .topLine {
    border-top: 2px solid rgba(217, 83, 79, 0.8);
  }
  .orgchart .lines .rightLine {
    border-right: 1px solid rgba(217, 83, 79, 0.8);
    float: none;
    border-radius: 0;
  }
  .orgchart .lines .leftLine {
    border-left: 1px solid rgba(217, 83, 79, 0.8);
    float: none;
    border-radius: 0;
  }
  .orgchart .lines .downLine {
    background-color: rgba(217, 83, 79, 0.8);
    /*background-color: rgba(228, 228, 228, 0.8);*/
    margin: 0 auto;
    height: 20px;
    width: 2px;
    float: none;
  }
  /* node styling */
  .orgchart .node {
    box-sizing: border-box;
    display: inline-block;
    position: relative;
    margin: 0;
    padding: 1px;
    border: 1px dashed transparent;
    text-align: center;
    width: 130px;
  }
  .orgchart.l2r .node,
  .orgchart.r2l .node {
    width: 50px;
    height: 130px;
  }
  .orgchart .node > .spinner {
    position: absolute;
    top: calc(50% - 15px);
    left: calc(50% - 15px);
    vertical-align: middle;
    font-size: 30px;
    color: rgba(68, 157, 68, 0.8);
  }
  .orgchart .node:hover {
    background-color: rgba(227, 228, 233, 0.5);
    transition: 0.5s;
    cursor: default;
    z-index: 20;
  }
  .orgchart .node.focused {
    background-color: rgba(238, 217, 54, 0.5);
  }
  .orgchart .ghost-node {
    position: fixed;
    left: -10000px;
    top: -10000px;
  }
  .orgchart .ghost-node rect {
    fill: #ffffff;
    stroke: #bf0000;
  }
  .orgchart .node.allowedDrop {
    border-color: rgba(68, 157, 68, 0.9);
  }
  .orgchart .node .title{
    width: 100%;
    text-align: center;
    font-size: 12px;
    font-weight: bold;
    height: 30px;
    line-height: 30px;
    /*background-color: rgba(217, 83, 79, 0.8);*/
    background-color: #1989FA;
    color: #fff;
    border-radius: 6px 6px 0 0;
    margin-bottom: 0px;
  }
  .orgchart .node .title .leftTitle{
    text-align: center;
    float: left;
    width: calc(100% - 30px);
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .orgchart .node .title .parentTitle{
    text-align: center;
    float: left;
    width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .orgchart .node .title .more{
    margin: 7.5px;
    float: right;
    width:15px;
    height:15px;
    border-radius: 10px;
    background-color: #1989FA;
    border: 1px solid #fff;
    color: #fff;
    line-height: 7px;
  }
  .orgchart.b2t .node .title {
    transform: rotate(-180deg);
    transform-origin: center bottom;
  }
  .orgchart.l2r .node .title {
    transform: rotate(-90deg) translate(-40px, -40px) rotateY(180deg);
    transform-origin: bottom center;
    width: 120px;
  }
  .orgchart.r2l .node .title {
    transform: rotate(-90deg) translate(-40px, -40px);
    transform-origin: bottom center;
    width: 120px;
  }
  .orgchart .node .title .symbol {
    float: left;
    margin-top: 4px;
    margin-left: 2px;
  }
  .orgchart .node .content {
    box-sizing: border-box;
    width: 100%;
    height: 30px;
    font-size: 11px;
    line-height: 30px;
   /* border: 1px solid rgba(217, 83, 79, 0.8);*/
    text-align: center;
    background-color: #F7F8F9;
    color: #333;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    border-bottom: 1px solid #DDDDDD;
  }
  .orgchart .node .content div{
    width: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .orgchart .node .content:last-child{
    border-bottom: 0px;
    border-radius: 0 0 6px 6px;
  }
  .orgchart.b2t .node .content {
    transform: rotate(180deg);
    transform-origin: center top;
  }
  .orgchart.l2r .node .content {
    transform: rotate(-90deg) translate(-40px, -40px) rotateY(180deg);
    transform-origin: top center;
    width: 120px;
  }
  .orgchart.r2l .node .content {
    transform: rotate(-90deg) translate(-40px, -40px);
    transform-origin: top center;
    width: 120px;
  }
  .el-dropdown-menu__item i{
    margin: 0 10px;
  }
  .el-dropdown-menu--medium .el-dropdown-menu__item{
    padding-top: 5px;
    padding-bottom: 5px;
    border-bottom: 1px solid #eee !important;
  }
  .el-dropdown-menu--medium .el-dropdown-menu__item:last-of-type{
    border-bottom: 0px !important;
  }
  .orgchart .node .edge {
    font-size: 15px;
    position: absolute;
    color: rgba(68, 157, 68, 0.5);
    cursor: default;
    transition: 0.2s;
  }
  .orgchart.noncollapsable .node .edge {
    display: none;
  }
  .orgchart .edge:hover {
    color: #449d44;
    cursor: pointer;
  }
  .orgchart .node .verticalEdge {
    width: calc(100% - 10px);
    width: -webkit-calc(100% - 10px);
    width: -moz-calc(100% - 10px);
    left: 5px;
  }
  .orgchart .node .topEdge {
    top: -4px;
  }
  .orgchart .node .bottomEdge {
    bottom: -4px;
  }
  .orgchart .node .horizontalEdge {
    width: 15px;
    height: calc(100% - 10px);
    height: -webkit-calc(100% - 10px);
    height: -moz-calc(100% - 10px);
    top: 5px;
  }
  .orgchart .node .rightEdge {
    right: -4px;
  }
  .orgchart .node .leftEdge {
    left: -4px;
  }
  .orgchart .node .horizontalEdge::before {
    position: absolute;
    top: calc(50% - 7px);
  }
  .orgchart .node .rightEdge::before {
    right: 3px;
  }
  .orgchart .node .leftEdge::before {
    left: 3px;
  }
  .orgchart .node .toggleBtn {
    position: absolute;
    left: 5px;
    bottom: -2px;
    color: rgba(68, 157, 68, 0.6);
  }
  .orgchart .node .toggleBtn:hover {
    color: rgba(68, 157, 68, 0.8);
  }
  .oc-export-btn {
    display: inline-block;
    position: absolute;
    right: 5px;
    top: 5px;
    padding: 6px 12px;
    margin-bottom: 0;
    font-size: 14px;
    font-weight: 400;
    line-height: 1.42857143;
    text-align: center;
    white-space: nowrap;
    vertical-align: middle;
    touch-action: manipulation;
    cursor: pointer;
    user-select: none;
    color: #fff;
    background-color: #5cb85c;
    border: 1px solid transparent;
    border-color: #4cae4c;
    border-radius: 4px;
  }
  .oc-export-btn[disabled] {
    cursor: not-allowed;
    box-shadow: none;
    opacity: 0.3;
  }
  .oc-export-btn:hover,
  .oc-export-btn:focus,
  .oc-export-btn:active {
    background-color: #449d44;
    border-color: #347a34;
  }
  .orgchart ~ .mask {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 999;
    text-align: center;
    background-color: rgba(0, 0, 0, 0.3);
  }
  .orgchart ~ .mask .spinner {
    position: absolute;
    top: calc(50% - 54px);
    left: calc(50% - 54px);
    color: rgba(255, 255, 255, 0.8);
    font-size: 108px;
  }
  .orgchart .node {
    transition: transform 0.3s, opacity 0.3s;
  }
  .orgchart .slide-down {
    opacity: 0;
    transform: translateY(40px);
  }
  .orgchart.l2r .node.slide-down,
  .orgchart.r2l .node.slide-down {
    transform: translateY(130px);
  }
  .orgchart .slide-up {
    opacity: 0;
    transform: translateY(-40px);
  }
  .orgchart.l2r .node.slide-up,
  .orgchart.r2l .node.slide-up {
    transform: translateY(-130px);
  }
  .orgchart .slide-right {
    opacity: 0;
    transform: translateX(130px);
  }
  .orgchart.l2r .node.slide-right,
  .orgchart.r2l .node.slide-right {
    transform: translateX(40px);
  }
  .orgchart .slide-left {
    opacity: 0;
    transform: translateX(-130px);
  }
  .orgchart.l2r .node.slide-left,
  .orgchart.r2l .node.slide-left {
    transform: translateX(-40px);
  }
</style>

<style>
  html {
    background: #f0f2f5;
  }
  @media (min-width: 768px) {
    .input-node-container {
      margin-top:-20px;
      margin-bottom:15px;
    }
  }
  .edit-container {
    border-radius: 5px;
    height: 80px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .edit-container .item {
    flex: 1;
  }
  .edit-container .item-half {
    height: 24px;
    flex: 0 0 45%;
    text-align: center;
  }
  @media (max-width: 768px) {
    .edit-container {
      height: 140px;
      flex-direction: column;
      flex: 1;
    }
    .edit-container .item {
      flex: auto;
    }
  }
  .json-container {
    margin-right: 15px;
    float: right;
    border-radius: 5px;
  }
  .json {
    margin-top: -12.5px;
    margin-left: 10px;
    display: block;
    overflow-x: auto;
    padding: 0.5em;
    color: #383a42;
    background: #fff;
  }
</style>
