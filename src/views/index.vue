<template>
  <div class="dashboard-editor-container" id="homepage">
    <!-- <iframe id="showPageIframe" src="http://pccs.ceedi.cn/portal-sjy/anasysing/gotoAnasysing.action" scrolling="auto" frameborder="0" style="width:100%;height:100%;" marginheight="0" marginwidth="0">
     </iframe>-->
    <div v-if="!isShowFlow">
      <panel-group @handleSetLineChartData="handleSetLineChartData" />

      <el-row
        style="background: #fff; padding: 16px 16px 0; margin-bottom: 32px"
      >
        <line-chart :chart-data="lineChartData" />
      </el-row>

      <el-row :gutter="32">
        <el-col :xs="24" :sm="24" :lg="8">
          <div class="chart-wrapper">
            <raddar-chart />
          </div>
        </el-col>
        <el-col :xs="24" :sm="24" :lg="8">
          <div class="chart-wrapper">
            <pie-chart />
          </div>
        </el-col>
        <el-col :xs="24" :sm="24" :lg="8">
          <div class="chart-wrapper">
            <bar-chart />
          </div>
        </el-col>
      </el-row>
    </div>
    <!--新首页-->
    <!--流程-我的待办已办抄送-->
    <div
      class="app-box"
      v-if="isShowFlow"
      style="width: 100%; height: 100%"
      ref="dataDetailBackId"
    >
      <!--欢迎界面和消息提醒-->

      <div
        style="
          width: clac(100% - 10px);
          height: 80px;
          margin: 0px 10px 10px 0px;
          padding-top: 20px;
          border: 1px solid #ccc;
          border-top: none;
          background-color: #fff;
        "
      >
        <div class="header-left leftDate">
          <div
            style="float: left; width: 100px; height: 100%; text-align: center"
          >
            <img
              src="../assets/image/u27.svg"
              style="width: 40px; margin: auto"
            />
          </div>
          <div
            style="
              float: left;
              height: 100%;
              text-align: left;
              font-weight: bold;
              line-height: 14px;
            "
          >
            <div style="font-size: 16px">
              {{ userName }} <span>{{ timeInfo }}好</span>
            </div>
            <br />
            <div style="font-size: 16px">
              提醒当前您有
              <span style="font-size: 24px; margin: 0px 15px; color: #d9001b"
                >{{ this.myAgentListTotal
                }}<span style="font-size: 16px">条</span></span
              ><!--+ this.myHaveToDoListTotal + this.myApplyListTotal + this.myCCTaskListTotal-->
              <span style="color: #d9001b">事项需要进行处理</span>
            </div>
          </div>
        </div>

        <div
          class="header-right"
          style="float: right; margin-right: 20px; text-align: right"
        >
          <div
            style="
              float: right;
              height: 100%;
              text-align: left;
              font-weight: bold;
              line-height: 14px;
            "
          >
            <div style="font-size: 16px">
              <span> {{ this.curDate }} </span>
            </div>
            <br />
            <div style="font-size: 16px; color: #898989">
              <!--农历 五月 二十-->
              <span style="color: #ff0000">农历：</span>
              {{ curLunarDate }}
            </div>
          </div>
        </div>
      </div>

      <!--消息列表-->
      <div style="width: clac(100% - 10px); height: auto; margin-right: 10px">
        <el-row style="width: 100%; height: 100%">
          <el-col :span="24">
            <div style="height: 350px; background-color: #fff">
              <div
                style="
                  width: 100%;
                  height: 45px;
                  font-size: 16px;
                  color: rgb(127, 127, 127);
                  padding: 10px;
                  font-weight: bold;
                  border-bottom: 1px solid #eee;
                  text-align: left;
                "
              >
                <span>消息列表</span>
              </div>
              <div style="padding: 10px">
                <el-tabs
                  v-model="activeName"
                  type="card"
                  @tab-click="handleClick"
                >
                  <el-tab-pane :label="myAgentTitle" name="first">
                    <div
                      style="
                        float: left;
                        width: 100%;
                        height: auto;
                        margin: 10px 0px;
                      "
                    >
                      <div class="moreBtn">
                        <a @click="handLeft('/processManager/myAgent')"
                          >更多>></a
                        >
                      </div>
                    </div>
                    <div
                      v-for="(item, index) in myAgentList"
                      :key="index"
                      style="
                        font-size: 14px;
                        text-align: left;
                        padding: 5px 10px;
                        margin: 10px 0px;
                      "
                      id="myAgentList"
                    >
                      <div v-if="index <= 4">
                        <div class="msgDiv" style="width: 100%">
                          <span
                            v-bind:class="{ isRead: item.isRead == 1 }"
                            class="flowTitle"
                            style="font-weight: bold"
                            @click="
                              linkClickById(
                                '/processManager/myAgentDetail',
                                'todoId',
                                item.todoId
                              )
                            "
                            :title="item.todoName"
                          >
                            {{ item.todoName }}
                          </span>
                          <!--v-if="item.isRead == 0" -->
                          <div class="isReadBtn" v-if="item.isRead == 0"></div>
                          <div class="msgTime" style="float: right">
                            {{ item.flowStartTime }}
                          </div>
                        </div>
                      </div>
                    </div>
                  </el-tab-pane>
                  <el-tab-pane :label="myHaveToDoTitle" name="second">
                    <div
                      style="
                        float: left;
                        width: 100%;
                        height: auto;
                        margin: 10px 0px;
                      "
                    >
                      <div class="moreBtn">
                        <a @click="handLeft('/processManager/myHaveToDo')"
                          >更多>></a
                        >
                      </div>
                    </div>
                    <div
                      v-for="(item, index) in myHaveToDoList"
                      :key="index"
                      style="
                        font-size: 14px;
                        text-align: left;
                        padding: 5px 10px;
                        margin: 10px 0px;
                      "
                    >
                      <div v-if="index <= 4">
                        <div class="msgDiv" style="width: 100%">
                          <span
                            v-bind:class="{ isRead: item.isRead == 1 }"
                            class="flowTitle"
                            style="font-weight: bold"
                            @click="
                              linkClickById(
                                '/processManager/myHaveToDoDetail',
                                'havedoId',
                                item.havedoId
                              )
                            "
                            :title="item.todoName"
                            >{{ item.havedoName }}</span
                          >
                          <!--v-if="item.isRead == 0" -->
                          <div class="isReadBtn" v-if="item.isRead == 0"></div>
                          <div class="msgTime" style="float: right">
                            {{ item.flowStartTime }}
                          </div>
                        </div>
                      </div>
                    </div>
                  </el-tab-pane>
                  <el-tab-pane :label="myApplyTitle" name="third">
                    <div
                      style="
                        float: left;
                        width: 100%;
                        height: auto;
                        margin: 10px 0px;
                      "
                    >
                      <div class="moreBtn">
                        <a @click="handLeft('/processManager/myApply')"
                          >更多>></a
                        >
                      </div>
                    </div>
                    <div
                      v-for="(item, index) in myApplyList"
                      :key="index"
                      style="
                        font-size: 14px;
                        text-align: left;
                        padding: 5px 10px;
                        margin: 10px 0px;
                      "
                    >
                      <div v-if="index <= 4">
                        <div class="msgDiv" style="width: 100%">
                          <span
                            v-bind:class="{ isRead: item.isRead == 1 }"
                            class="flowTitle"
                            style="font-weight: bold"
                            @click="
                              linkClickById(
                                '/processManager/myApplyDetail',
                                'taskId',
                                item.taskId
                              )
                            "
                            :title="item.taskName"
                            >{{ item.taskName }}</span
                          >
                          <!--v-if="item.isRead == 0" -->
                          <div class="isReadBtn" v-if="item.isRead == 0"></div>
                          <div class="msgTime" style="float: right">
                            {{ item.createTime }}
                          </div>
                        </div>
                      </div>
                    </div>
                  </el-tab-pane>
                  <el-tab-pane :label="myCCTaskTitle" name="four">
                    <div
                      style="
                        float: left;
                        width: 100%;
                        height: auto;
                        margin: 10px 0px;
                      "
                    >
                      <div class="moreBtn">
                        <a @click="handLeft('/processManager/myCCTask')"
                          >更多>></a
                        >
                      </div>
                    </div>
                    <div
                      v-for="(item, index) in myCCTaskList"
                      :key="index"
                      style="
                        font-size: 14px;
                        text-align: left;
                        padding: 5px 10px;
                        margin: 10px 0px;
                      "
                    >
                      <div v-if="index <= 4">
                        <div class="msgDiv" style="width: 100%">
                          <span
                            v-bind:class="{ isRead: item.isRead == 1 }"
                            class="flowTitle"
                            style="font-weight: bold"
                            @click="
                              linkClickById(
                                '/processManager/myCCTaskDetail',
                                'havedoId',
                                item.havedoId
                              )
                            "
                            :title="item.havedoName"
                            >{{ item.havedoName }}</span
                          >
                          <!--v-if="item.isRead == 0" -->
                          <div class="isReadBtn" v-if="item.isRead == 0"></div>
                          <div class="msgTime" style="float: right">
                            {{ item.flowStartTime }}
                          </div>
                        </div>
                      </div>
                    </div>
                  </el-tab-pane>
                </el-tabs>
              </div>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script>
import "../publicStyle/style.css";
import PanelGroup from "./dashboard/PanelGroup";
import LineChart from "./dashboard/LineChart";
import RaddarChart from "./dashboard/RaddarChart";
import PieChart from "./dashboard/PieChart";
import BarChart from "./dashboard/BarChart";

import { getUserProfile } from "@/api/system/user";

const lineChartData = {
  newVisitis: {
    expectedData: [100, 120, 161, 134, 105, 160, 165],
    actualData: [120, 82, 91, 154, 162, 140, 145],
  },
  messages: {
    expectedData: [200, 192, 120, 144, 160, 130, 140],
    actualData: [180, 160, 151, 106, 145, 150, 130],
  },
  purchases: {
    expectedData: [80, 100, 121, 104, 105, 90, 100],
    actualData: [120, 90, 100, 138, 142, 130, 130],
  },
  shoppings: {
    expectedData: [130, 140, 141, 142, 145, 150, 160],
    actualData: [120, 82, 91, 154, 162, 140, 130],
  },
};

import {
  getTodoList,
  getCcList,
  getHavedoList,
  getUserApproveList,
  getLunarDate,
  updateIsRead,
} from "../api/processEngine/processEngine";
export default {
  name: "Index",
  components: {
    PanelGroup,
    LineChart,
    RaddarChart,
    PieChart,
    BarChart,
  },
  data() {
    return {
      lineChartData: lineChartData.newVisitis,

      isShowFlow: true,
      activeName: "first",
      myAgentTitle: "待办（0）",
      myCCTaskTitle: "抄送（0）",
      resParamInfo: {
        pageNow: 1, // 页数
        pageSize: 100,
        taskName: "",
        processId: "",
        creatorId: "",
        createTime: "",
        receiveTime: "",
      },
      myCCresParamInfo: {
        pageNow: 1, // 页数
        pageSize: 100, // 页长
        taskName: "", //流程标题
        processId: "", //流程名称
        handlerId: "", //当前审批人
        createTime: "", //发起时间
        taskEndTime: "", //结束时间
        taskStatus: "", //审批状态
      },
      myAgentList: [],
      myAgentListTotal: 0,

      myCCTaskList: [],
      myCCTaskListTotal: 0,
      //我的已办
      myHaveToDoTitle: "已办（0）",
      myHaveToDoParamInfo: {
        pageNow: 1, // 页数
        pageSize: 100, // 页长
        taskName: "", //流程标题
        processId: "", //流程名称
        handlerId: "", //当前审批人
        createTime: "", //发起时间
        taskEndTime: "", //结束时间
        taskStatus: "", //审批状态
      },
      myHaveToDoList: [],
      myHaveToDoListTotal: 0,

      //我的申请
      myApplyTitle: "申请（0）",
      myApplyParamInfo: {
        pageNow: 1, // 页数
        pageSize: 100, // 页长
        taskName: "", //流程标题
        processId: "", //流程名称
        handlerId: "", //当前审批人
        createTime: "", //发起时间
        taskEndTime: "", //结束时间
        taskStatus: "", //审批状态
      },
      myApplyList: [],
      myApplyListTotal: 0,

      /*登录用户信息*/
      loginInfo: {},
      userName: "用户",
      timeInfo: "",

      /*右上角日期*/
      curDate: "",
      /*农历日期*/
      curLunarDate: "",
    };
  },
  mounted() {
    /**
     * iframe-宽高自适应显示
     */
    /*function changeMobsfIframe(){
        const mobsf = document.getElementById('showPageIframe');
        const deviceWidth = document.body.clientWidth;
        //const deviceHeight = document.documentElement.offsetHeight;
        const deviceHeight =  document.body.offsetHeight;
        mobsf.style.width = 100 + "%";
        mobsf.style.height = Number(deviceHeight)+130 + 'px'; //数字是页面布局高度差
      }
      changeMobsfIframe();
      window.onresize = function(){
        changeMobsfIframe();
      }*/

    /*加载个人信息*/
    //获取当前时间
    this.getCurDate();

    //查询当前用户信息
    this.getuserInfo();
    /*加载流程相关信息*/
    this.getProcessInfo();
  },
  methods: {
    getLunarDate() {
      getLunarDate().then((res) => {
        let mydata = res.msg;
        this.curLunarDate = mydata;
      });
    },
    handleSetLineChartData(type) {
      this.lineChartData = lineChartData[type];
    },
    add0(m) {
      return m < 10 ? "0" + m : m;
    },
    dateFormatter(row) {
      let date = row.createTime;
      date = this.getLocalTime(date);
      return date;
    },
    getLocalTime(nS) {
      if (!nS) {
        return "--";
      } else {
        var time = new Date(nS);
        var y = time.getFullYear();
        var m = time.getMonth() + 1;
        var d = time.getDate();
        var h = time.getHours();
        var mm = time.getMinutes();
        var s = time.getSeconds();
        // return y+'-'+add0(m)+'-'+add0(d)+' '+add0(h)+':'+add0(mm)+':'+add0(s);
        return y + "-" + this.add0(m) + "-" + this.add0(d);
      }
    },
    getProcessInfo() {
      //我的待办
      let param = this.resParamInfo;
      getTodoList(param).then((res) => {
        if (res.rows) {
          this.myAgentList = res.rows;
          this.myAgentListTotal = res.total;
          this.myAgentTitle = "待办（" + this.myAgentListTotal + ")";

          for (let i = 0; i < this.myAgentList.length; i++) {
            let obj = this.myAgentList[i]["flowStartTime"];
            if (obj) {
              let mydate = this.getLocalTime(obj);
              this.$set(this.myAgentList[i], "flowStartTime", mydate);
            }
          }
        }
      });
      //我的抄送
      let myCCParam = this.myCCresParamInfo;
      getCcList(myCCParam).then((res) => {
        if (res.rows) {
          this.myCCTaskList = res.rows;
          this.myCCTaskListTotal = res.total;
          this.myCCTaskTitle = "抄送（" + this.myCCTaskListTotal + ")";

          for (let i = 0; i < this.myCCTaskList.length; i++) {
            let obj = this.myCCTaskList[i]["flowStartTime"];
            if (obj) {
              let mydate = this.getLocalTime(obj);
              this.$set(this.myCCTaskList[i], "flowStartTime", mydate);
            }
          }
        }
      });
      //我的已办
      let myHaveTo = this.myHaveToDoParamInfo;
      getHavedoList(myHaveTo).then((res) => {
        if (res.rows) {
          this.myHaveToDoList = res.rows;
          this.myHaveToDoListTotal = res.total;
          this.myHaveToDoTitle = "已办（" + this.myHaveToDoListTotal + ")";

          for (let i = 0; i < this.myHaveToDoList.length; i++) {
            let obj = this.myHaveToDoList[i]["flowStartTime"];
            if (obj) {
              let mydate = this.getLocalTime(obj);
              this.$set(this.myHaveToDoList[i], "flowStartTime", mydate);
            }
          }
        }
      });

      //我的申请
      let myApply = this.myApplyParamInfo;
      getUserApproveList(myApply).then((res) => {
        if (res.rows) {
          this.myApplyList = res.rows;
          this.myApplyListTotal = res.total;
          this.myApplyTitle = "申请（" + this.myApplyListTotal + ")";

          for (let i = 0; i < this.myApplyList.length; i++) {
            let obj = this.myApplyList[i]["createTime"];
            if (obj) {
              let mydate = this.getLocalTime(obj);
              this.$set(this.myApplyList[i], "createTime", mydate);
            }
          }
        }
      });
    },

    //获取当前用户信息
    getuserInfo() {
      getUserProfile().then((response) => {
        let mydata = response.data;
        this.loginInfo = mydata;
        this.userName = this.loginInfo.userName;
      });
    },
    //获取当前时间
    getCurDate() {
      let myDate = new Date();
      let hours = myDate.getHours();
      let year = myDate.getFullYear();
      let month = myDate.getMonth() + 1;
      let day = myDate.getDate();
      let newDate = year + "-" + month + "-" + day;
      let week = this.getWeek(newDate);
      this.curDate = year + "年" + month + "月" + day + "日" + "       " + week;

      if (hours >= 6 && hours < 9) {
        this.timeInfo = "早上";
      } else if (hours >= 9 && hours < 11) {
        this.timeInfo = "上午";
      } else if (hours >= 11 && hours < 14) {
        this.timeInfo = "中午";
      } else if (hours >= 14 && hours < 18) {
        this.timeInfo = "下午";
      } else if (hours >= 18 && hours < 24) {
        this.timeInfo = "晚上";
      } else if (hours >= 0 && hours < 6) {
        this.timeInfo = "晚上";
      }
      this.getLunarDate();
    },
    //获取星期几
    getWeek(dateString) {
      var dateArray = dateString.split("-");
      var mydate = new Date(
        dateArray[0],
        parseInt(dateArray[1] - 1),
        dateArray[2]
      );
      return "星期" + "日一二三四五六".charAt(mydate.getDay());
    },
    //先判断是否有权限，然后跳转页面
    handLeft(path) {
      let routerPath = path;
      this.$router.push({
        path: routerPath,
        params: {},
      });
    },
    linkClickById(path, params, id) {
      if (params == "todoId") {
        //a254e654d0564eff8d17f06b12cc8a6f
        updateIsRead(id).then((res) => {
          //刷新页面
          this.getProcessInfo();
          this.$router.push({
            path: path,
            query: {
              todoId: id,
            },
          });
        });
      } else if (params == "havedoId") {
        if (path == "/processManager/myCCTaskDetail") {
          updateIsRead(id).then((res) => {
            //刷新页面
            this.getProcessInfo();
            this.$router.push({
              path: path,
              query: {
                havedoId: id,
              },
            });
          });
        } else {
          this.$router.push({
            path: path,
            query: {
              havedoId: id,
            },
          });
        }
      } else if (params == "taskId") {
        this.$router.push({
          path: path,
          query: {
            taskId: id,
          },
        });
      }
    },
    handleClick(tab, event) {},
  },
};
</script>

<style lang="scss" scoped>
.dashboard-editor-container {
  padding: 20px;
  background-color: rgb(240, 242, 245);
  position: relative;

  .chart-wrapper {
    background: #fff;
    padding: 16px 16px 0;
    margin-bottom: 32px;
  }
}

@media (max-width: 1024px) {
  .chart-wrapper {
    padding: 8px;
  }
}

#homepage {
  /*首页样式*/
  .linkDiv:hover,
  .linkDiv:focus {
    background-color: #ccc !important;
    transition: 0.5s;
  }
  /*首页页面*/
  /deep/ .el-tabs__header {
    margin-bottom: 5px !important;
  }
  .pie-wrap {
    width: 100%;
    height: 126px;
  }

  .msgTime {
    text-decoration: none;
    color: #aaaaaa;
  }
  .moreBtn {
    float: right;
    color: #7f7f7f;
    font-family: "Arial Negreta", "Arial Normal", "Arial";
    font-weight: 700;
    font-style: normal;
    font-size: 14px;
    cursor: pointer;
    background: #fff;
  }
  .moreBtn a:hover {
    /*color: #02A7F0;*/
    text-decoration: underline;
  }
  .msgDiv {
    cursor: pointer;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    width: calc(100% - 100px);
  }
  .msgDiv:hover {
    color: #5a5e66;
  }
  #myAgentList {
    .msgDiv {
      cursor: pointer;
      color: #02a7f0;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      width: calc(100% - 100px);
    }
    .msgDiv:hover {
      color: #0f87f0;
    }
  }
  .flowTitle {
    float: left;
  }
}
</style>
