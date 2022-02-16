<template>
  <div style="width: 100vw;height: 100vh;">

    <!-- 流程启动 - 预定审批 -->
    <el-dialog title="流程启动" :visible.sync="resProcessStartState" :before-close="handleClose" width="600px">
      <div style="width: 100%;height: 464px;display: flex; justify-content: center;">
        <div style="width: calc(100% - 40px);height: calc(100% - 40px);">
          <el-form   :rules="resProcessStartRules" class="demo-ruleForm" label-width="120px">
            <el-form-item style="top: 20px" label="选择流程" size="74" prop="selProcessName">

              <el-select :disabled="this.selMoreProcessDatas.length == 1" @change="selMoreProcessClick" style="width: 100%" v-model="selMoreProcessId" placeholder="请选择">
                <el-option
                  v-for="item in selMoreProcessDatas"
                  :key="item.id"
                  :label="item.processName"
                  :value="item.processId">
                </el-option>
              </el-select>
            </el-form-item>

            <!---->
            <el-form-item v-if="cooseThePathState == true"  style="top: 20px" label="选择路径" size="74" prop="selProcessName">

              <el-select @change="resStartSelMoreLineClick" style="width: 100%" v-model="selMoreLineId" placeholder="请选择">
                <el-option
                  v-for="item in selMoreLineDatas"
                  :key="item.id"
                  :label="item.nodeName"
                  :value="item.nodeId">
                </el-option>
              </el-select>
              <!--<el-input style="width: 100%" v-model="ruleForm1.subjectType"></el-input>-->
            </el-form-item>
            <!-- 不可编辑-->
              <el-form-item
                v-if=" selectPeoPleInfo.allowSelectUser == false"
                style="top: 20px" label="指派审批人" size="74" prop="subjectType">

                <el-input style="width: 100%" :disabled="true" v-model="resApplyRuleForm.userName"></el-input>
              </el-form-item>
              <!--  指派审批人单选的情况下  -->
              <el-form-item
                v-if="selectPeoPleInfo.allowSelectMore == false && selectPeoPleInfo.allowSelectUser == true"
                style="top: 20px" label="指派审批人" size="74" prop="subjectType">

                <el-select @change="selUserInfoClick" style="width: 100%" v-model="selectAppPeople" placeholder="请选择">
                  <el-option
                    v-for="item in userInfoOptions"
                    :key="item.id"
                    :label="item.nickName"
                    :value="item.userId">
                  </el-option>
                </el-select>
              </el-form-item>

              <!--  指派审批人多选的情况下  -->
              <el-form-item
                v-if="selectPeoPleInfo.allowSelectMore == true && selectPeoPleInfo.allowSelectUser == true"
                style="top: 20px" label="指派审批人" size="74" prop="subjectType">

                <el-select @change="selUserInfoClick" multiple style="width: 100%" v-model="selectAppPeoples" placeholder="请选择">
                  <el-option
                    v-for="item in userInfoOptions"
                    :key="item.id"
                    :label="item.nickName"
                    :value="item.userId">
                  </el-option>
                </el-select>
                <!--<el-select @change="selUserInfoClick" multiple style="width: 100%" v-model="selectAppPeoples"-->
                           <!--placeholder="请选择">-->
                  <!--<el-option-->
                    <!--v-for="item in userInfoOptions"-->
                    <!--:key="item.id"-->
                    <!--:label="item.nickName"-->
                    <!--:value="item.userId">-->
                  <!--</el-option>-->
                <!--</el-select>-->
              </el-form-item>


           <!-- 新添加的 2022/01/13 开始-->
              <el-form-item
                v-if="ccUserList && ccUserList.length>0"
                style="top: 20px" label="抄送给" size="74" prop="ccUserIdList">

                <el-select @change="selccUserInfoClick" multiple style="width: 100%" v-model="ccUserIdList" placeholder="请选择">
                  <el-option
                    v-for="item in ccUserList"
                    :key="item.userId"
                    :label="item.nickName"
                    :value="item.userId">
                  </el-option>
                </el-select>
              </el-form-item>
            <!-- 新添加的 2022/01/13 结束-->


            <el-form-item label="拟办意见" size="74" >
              <el-input type="textarea" v-model="resStartDescription"
                        :autosize="{ minRows: 6, maxRows: 6}"></el-input>
            </el-form-item>


          </el-form>

        </div>
      </div>

      <div slot="footer" class="dialog-footer">
        <el-button @click="handleClose">取 消</el-button>
        <el-button type="primary" @click="resProcessStartClick()">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 流程启动非预定一 -->
    <el-dialog title="流程启动"  :visible.sync="unResProcessStartState" :before-close="handleClose" width="500px">
      <div style="width: 100%;display: flex; justify-content: center;">
        <div style="width: calc(100% - 40px);height: calc(100% - 40px);">

          <el-form  :rules="unResApplyRules" class="demo-ruleForm">
            <el-form-item style="top: 20px" label="指派审批人" size="74" prop="subjectType">

              <div class="leftborder "
                style="width: 300px;border-radius: 4px;border: 1px solid #DCDFE6;display: flex;flex-direction: row">
                <div style="width: 260px;" class="btn_all" @click="selApplyPeople">
                  <span style="margin-left: 15px;font-size: 12px;color: #C0C4CC">{{unApplyPeopleData.names}}</span>
                </div>
                <div class="el-icon-plus adddata"
                     style="text-align: center;font-size: 16px;color: #909399;">

                </div>

              </div>
            </el-form-item>
            <el-form-item label="拟办意见" size="74">
              <el-input type="textarea" v-model="unResProcessStartDescription"
                        :autosize="{ minRows: 6, maxRows: 6}"></el-input>
            </el-form-item>


          </el-form>

        </div>
      </div>

      <div slot="footer" class="dialog-footer">
        <el-button @click="handleClose">取 消</el-button>
        <el-button type="primary" @click="unResProcessStartEnter">确 定</el-button>
      </div>
    </el-dialog>

    <!--nodeDetail.isPredefinedProcess == false-->
    <!-- 非预定审批 -->
    <el-dialog title="审批" v-if="nodeDetail.isPredefinedProcess == false" :visible.sync="applyState" :before-close="handleClose" width="660px">
      <div style="width: 100%;height: 374px;display: flex; justify-content: center;">
        <div style="width: calc(100% - 40px);height: calc(100% - 40px);">
          <!--prop="subjectType"-->
          <!--prop="title"  :required="true"-->
          <el-form class="demo-ruleForm">
            <el-form-item v-if="nodeDetail.currentIsEnd == true" style="top: 20px" label="指派审批人" size="74" >

              <div
                style="width: 300px;height: 40px;border-radius: 4px;border: 1px solid #DCDFE6;display: flex;flex-direction: row">
                <div style="width: 260px;height: 40px;" @click="selApplyPeople">
                  <span style="margin-left: 15px;font-size: 14px;color: #C0C4CC">{{unApplyPeopleData.names}}</span>
                </div>
                <div class="el-icon-plus"
                     style="width: 40px;height: 40px;line-height: 40px;text-align: center;font-size: 16px;color: #909399;">

                </div>

              </div>
            </el-form-item>
            <el-form-item label="审批意见" size="74" >
              <el-input type="textarea" v-model="unResApplyDescription"
                        :autosize="{ minRows: 6, maxRows: 6}"></el-input>
            </el-form-item>


          </el-form>

        </div>
      </div>

      <div slot="footer" class="dialog-footer">
        <el-button @click="handleClose">取 消</el-button>
        <el-button type="primary" @click="unscheduledApplyEnter">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 指定审批人 -->
    <el-dialog title="指定审批人"  :visible.sync="applyPeopleState" :before-close="applyPeopleClose" width="950px">
      <div style="width: 100%;height: 482px;display: flex; justify-content: center;">
        <div style="width: 100%;height: 100%;">
          <el-row>
            <el-col :span="24">
              <div >
                <el-tabs class="tabss" v-model="activeName" @tab-click="tabTypeSelMethods">
                  <el-tab-pane label="组织成员" name="first"></el-tab-pane>
                  <!-- <el-tab-pane label="项目成员" name="second"></el-tab-pane>
                  <el-tab-pane label="外部成员" name="third"></el-tab-pane> -->
                </el-tabs>
              </div>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <div v-if="activeName =='first' "
                   style="width: 100%;height:calc(482px - 30px);background-color: white;display: flex;flex-direction: row">

                <!--左侧的条件筛选-->
                <div
                  style="height: calc(100% - 20px);width: 259px;display: flex;flex-direction: column; border-right: 1px solid #DDDDDD;">
                  <div>
                    <el-input
                      style="width: 240px"
                      size="50"
                      placeholder="请输入内容"
                      v-model="applyKeyInfo">
                      <i
                        class="el-input__icon el-icon-search"
                        slot="suffix">
                      </i>
                    </el-input>
                  </div>

                  <!-- 树状结构 -->
                  <!--:filter-node-method="filterNode"-->
                  <div style="height: calc(482px - 100px);width: calc(100% - 20px);margin-top: 10px;overflow-y: scroll">

                    <div class="tree">

                      <el-tree
                        :data="applyTreeData"
                        :props="applyDefaultProps"
                        :expand-on-click-node="false"
                        :filter-node-method="applyFilterNode"
                        ref="tree"
                        default-expand-all
                        @node-click="applyHandleTreeClick"
                      >
                        <span class="span-ellipsis" slot-scope="{ node, data }">
		                        <span :title="node.label"  @mouseenter="treeEnterHandle(node.id)" style="width: 100%;height: 30px;line-height: 30px">
                              <i v-if="node.level <= 2" style="color: #48A8F1;" class="el-icon-office-building"></i>
                              <i v-else style="color: #48A8F1;" class="el-icon-folder"></i>
                              {{ node.label }}</span>
                          </span>
                      </el-tree>


                    </div>


                  </div>


                </div>

                <!--右侧的数据列表-->
                <div style="float: left;height: 100%;width:calc(100% - 259px);">

                  <div style="margin-left: 20px;">
                    <el-input
                      style="width: 240px"
                      size="50"
                      placeholder="搜索关键字"
                      @keyup.enter.native="searchPersonnelInformation"
                      v-model="applyListKey">
                      <!--@click="applyhandleIconClick"-->
                      <i
                        class="el-input__icon el-icon-search"
                        slot="suffix"
                        >
                      </i>
                    </el-input>
                  </div>


                  <!-- 多选 -->
                  <div v-if="individualChoice == true"
                    style="margin:10px 0 0 20px;height:380px;width: calc(100% - 10px);overflow-y: scroll;">
                    <el-table
                      :data="applySubjectDatas"
                      @selection-change="applyHandleSelectionChange"
                      @select="applyHandleSelection"
                      :header-cell-style="{'text-align':'center','height':'36px'}"
                      :cell-style="{'text-align':'center'}"
                      :height="370"
                      :row-style="{height: '36px'}"
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
                        prop="nickName"
                        :show-overflow-tooltip="true"
                        label="姓名">
                      </el-table-column>
                      <el-table-column
                        prop="phonenumber"
                        :show-overflow-tooltip="true"
                        label="电话">
                      </el-table-column>
                      <el-table-column
                        prop="dept.deptName"
                        :show-overflow-tooltip="true"
                        label="部门">
                      </el-table-column>
                      <el-table-column
                        prop="roleNames"
                        :show-overflow-tooltip="true"
                        label="角色名称">
                      </el-table-column>
                      <el-table-column
                        prop="email"
                        :show-overflow-tooltip="true"
                        label="邮箱">
                      </el-table-column>

                    </el-table>

                  </div>

                  <!-- 单选 -->
                  <div v-if="individualChoice == false"
                    style="margin-left: 20px;margin-top: 20px;height:380px;width: calc(100% - 10px);overflow-y: scroll;">
                    <!--@select="applyHandleSelection"-->
                    <el-table
                      :data="applySubjectDatas"
                      @current-change="danSqlApplyHandleSelection"
                      @selection-change="applyHandleSelectionChange"
                      :row-style="{height: '50px'}"
                      :header-cell-style="{'text-align':'center'}"
                      :cell-style="{'text-align':'center'}"
                      :height="370"
                      highlight-current-row
                      :fit='true'
                      style="width: 100%">

                      <!--<el-table-column-->
                        <!--type="selection"-->
                        <!--width="55">-->
                      <!--</el-table-column>-->
                      <el-table-column
                        type="index"
                        label="序号"
                        width="50">
                      </el-table-column>
                      <el-table-column
                        prop="nickName"
                        :show-overflow-tooltip="true"
                        label="姓名">
                      </el-table-column>
                      <el-table-column
                        prop="phonenumber"
                        :show-overflow-tooltip="true"
                        label="电话">
                      </el-table-column>
                      <el-table-column
                        prop="dept.deptName"
                        :show-overflow-tooltip="true"
                        label="部门">
                      </el-table-column>
                      <el-table-column
                        prop="roleNames"
                        :show-overflow-tooltip="true"
                        label="角色名称">
                      </el-table-column>
                      <el-table-column
                        prop="email"
                        :show-overflow-tooltip="true"
                        label="邮箱">
                      </el-table-column>

                    </el-table>

                  </div>
                  <div
                    style="position: relative;float: right;margin-top: 0px; height: 40px;display: flex;align-items: center;">
                    <el-pagination
                      @size-change="appayHandleSizeChange"
                      @current-change="appayHandleCurrentChange"
                      :current-page="applyCurrentPage"
                      :page-sizes="applyPageSizes"
                      :page-size="applyPageSize"
                      layout="total, sizes, prev, pager, next, jumper"
                      :total="applyTotalNum">
                    </el-pagination>
                  </div>


                </div>
              </div>
              <div v-if="activeName =='second' "
                   style="width: 100%;height:calc(482px - 30px);background-color: white;display: flex;flex-direction: row">

                <!--左侧的条件筛选-->
                <div
                  style="height: 100%;width: 259px;display: flex;flex-direction: column; border-right: 1px solid #DDDDDD;">
                  <div style="height: 40px;width: 100%;margin-top: 10px">
                    <el-input
                      style="width: 240px"
                      size="50"
                      placeholder="请输入内容"
                      v-model="input4">
                      <i
                        class="el-input__icon el-icon-search"
                        slot="suffix"
                        @click="handleIconClick">
                      </i>
                    </el-input>
                  </div>

                  <!-- 树状结构 -->
                  <div style="height: calc(482px - 80px);width: calc(100% - 20px);padding-top: 10px">

                    <div class="tree">

                      <el-tree
                        :data="data"
                        :props="defaultProps"
                        :expand-on-click-node="false"
                        :filter-node-method="filterNode"
                        ref="tree"
                        default-expand-all
                        @node-click="handleNodeClick"
                      >
                        <span class="custom-tree-node" slot-scope="{ node, data }">
                          <span @mouseenter="treeEnterHandle(node.id)"
                                style="width: 100%;height: 30px;line-height: 30px">
                            <i v-if="node.level <= 1" style="color: #48A8F1;" class="el-icon-office-building"></i>
                            <i v-else style="color: #48A8F1;" class="el-icon-folder"></i>
                          {{ node.label }}
                           </span>
                      </span>
                      </el-tree>


                    </div>


                  </div>


                </div>

                <!--右侧的数据列表-->
                <div style="float: left;height: 100%;width:calc(100% - 259px);">

                  <div style="margin-left: 20px;height:412px;width: calc(100% - 20px);overflow-y: scroll;">
                    <el-table
                      :data="subjectDatas"
                      @selection-change="handleSelectionChange"
                      @select="handleSelection"
                      :header-cell-style="{'text-align':'center'}"
                      :cell-style="{'text-align':'center'}"
                      :height="412"
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
                        prop="subjectType"
                        label="姓名">
                      </el-table-column>
                      <el-table-column
                        prop="subjectCode"
                        label="电话">
                      </el-table-column>
                      <el-table-column
                        prop="isQuote"
                        label="部门">
                      </el-table-column>
                      <el-table-column
                        prop="isQuote"
                        label="角色">
                      </el-table-column>
                      <el-table-column
                        prop="isQuote"
                        label="邮箱">
                      </el-table-column>

                    </el-table>

                  </div>
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
              </div>
              <div v-if="activeName =='third' "
                   style="width: 100%;height:calc(482px - 30px);display: flex;flex-direction: column">
                <div style="width: 100%;height: 40px;">
                  <el-input
                    style="width: 240px"
                    size="50"
                    placeholder="搜索关键字"
                    v-model="input4">
                    <i
                      class="el-input__icon el-icon-search"
                      slot="suffix"
                      @click="handleIconClick">
                    </i>
                  </el-input>
                </div>
                <div style="width: 100%;height: calc(482- 70px);">
                  <div
                    style="margin-left: 0px;margin-top: 20px;height:372px;width:100%;background-color: rebeccapurple">
                    <el-table
                      :data="subjectDatas"
                      @selection-change="handleSelectionChange"
                      @select="handleSelection"
                      :header-cell-style="{'text-align':'center'}"
                      :cell-style="{'text-align':'center'}"
                      :height="372"
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
                        prop="subjectType"
                        label="姓名">
                      </el-table-column>
                      <el-table-column
                        prop="subjectCode"
                        label="电话">
                      </el-table-column>
                      <el-table-column
                        prop="isQuote"
                        label="部门">
                      </el-table-column>
                      <el-table-column
                        prop="isQuote"
                        label="角色">
                      </el-table-column>
                      <el-table-column
                        prop="isQuote"
                        label="邮箱">
                      </el-table-column>

                    </el-table>

                  </div>
                  <div
                    style="position: relative;float: right;margin-top: 10px; height: 40px;display: flex;align-items: center;">
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


              </div>

            </el-col>
          </el-row>


        </div>
      </div>

      <div slot="footer" class="dialog-footer">
        <el-button @click="applyPeopleClose">取 消</el-button>
        <el-button type="primary" @click="designateApproveryEnter">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 预定审批页面 -->
    <el-dialog title="审批" v-if="nodeDetail.isPredefinedProcess == true"  :visible.sync="applyState" :before-close="handleClose" width="660px">
      <div style="width: 100%;height: 374px;display: flex; justify-content: center;">
        <div style="width: calc(100% - 40px);height: calc(100% - 40px);">


          <el-form :model="resApplyRuleForm" :rules="resApplyRules" class="demo-ruleForm">

            <!-- 选择路径 -->
            <el-form-item
              v-if="nodeDetail.nextIsMoreLine == true && nodeDetail.currentIsEnd == true && nodeDetail.nextIsEnd == false"
              style="top: 20px" label="选择下一步线路" size="74" prop="selProcessName">

              <el-select @change="selMoreLineClick" style="width: 100%" v-model="selectApplyLineId" placeholder="请选择">
                <el-option
                  v-for="item in selMoreLineDatas"
                  :key="item.id"
                  :label="item.nodeName"
                  :value="item.nodeId">
                </el-option>
              </el-select>
            </el-form-item>


            <!--  指派审批人不可编辑的情况下  -->
            <el-form-item
              v-if=" selectPeoPleInfo.allowSelectUser == false && nodeDetail.currentIsEnd == true && nodeDetail.nextIsEnd == false"
              style="top: 20px" label="指派审批人" size="74" prop="subjectType">

              <el-input style="width: 100%" :disabled="true" v-model="resApplyRuleForm.userName"></el-input>
            </el-form-item>


            <!--  指派审批人单选的情况下  -->
            <el-form-item
              v-if="selectPeoPleInfo.allowSelectMore == false && selectPeoPleInfo.allowSelectUser == true && nodeDetail.currentIsEnd == true && nodeDetail.nextIsEnd == false"
              style="top: 20px" label="指派审批人" size="74" prop="subjectType">

              <el-select @change="selUserInfoClick" style="width: 100%" v-model="selectAppPeople" placeholder="请选择">
                <el-option
                  v-for="item in userInfoOptions"
                  :key="item.id"
                  :label="item.nickName"
                  :value="item.userId">
                </el-option>
              </el-select>
            </el-form-item>

            <!--  指派审批人多选的情况下  -->
            <el-form-item
              v-if="selectPeoPleInfo.allowSelectMore == true && selectPeoPleInfo.allowSelectUser == true && nodeDetail.currentIsEnd == true && nodeDetail.nextIsEnd == false"
              style="top: 20px" label="指派审批人" size="74" prop="subjectType">

              <el-select @change="selUserInfoClick" multiple style="width: 100%" v-model="selectAppPeoples"
                         placeholder="请选择">
                <el-option
                  v-for="item in userInfoOptions"
                  :key="item.id"
                  :label="item.nickName"
                  :value="item.userId">
                </el-option>
              </el-select>
            </el-form-item>

            <el-form-item label="审批意见" size="74">
              <el-input type="textarea" v-model="resApplyDescription"
                        :autosize="{ minRows: 6, maxRows: 6}"></el-input>
            </el-form-item>

          </el-form>

        </div>
      </div>

      <div slot="footer" class="dialog-footer">
        <el-button @click="handleClose">取 消</el-button>
        <el-button type="primary" @click="reservationAppleEnter">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 移交审批 -->
    <el-dialog title="移交" :visible.sync="handOverApplyState" :before-close="handleClose" width="660px">
      <div style="width: 100%;height: 374px;display: flex; justify-content: center;">
        <div style="width: calc(100% - 40px);height: calc(100% - 40px);">


          <el-form  :rules="unResApplyRules" class="demo-ruleForm">
            <el-form-item style="top: 20px" label="指派审批人" size="74" prop="subjectType">

              <div
                style="width: 300px;height: 40px;border-radius: 4px;border: 1px solid #DCDFE6;display: flex;flex-direction: row">
                <div style="width: 260px;height: 40px;" @click="selApplyPeople">
                  <span style="margin-left: 15px;font-size: 14px;color: #C0C4CC">{{unApplyPeopleData.names}}</span>
                </div>
                <div class="el-icon-plus"
                     style="width: 40px;height: 40px;line-height: 40px;text-align: center;font-size: 16px;color: #909399;">

                </div>

              </div>
            </el-form-item>
            <el-form-item label="审批意见" size="74" >
              <el-input type="textarea" v-model="unResApplyDescription"
                        :autosize="{ minRows: 6, maxRows: 6}"></el-input>
            </el-form-item>


          </el-form>

        </div>
      </div>

      <div slot="footer" class="dialog-footer">
        <el-button @click="handleClose">取 消</el-button>
        <el-button type="primary" @click="handOverApplEnter">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 终止 -->
    <el-dialog title="中止" :visible.sync="applyStopState" :before-close="handleClose" width="660px">
      <div style="width: 100%;height: 140px;display: flex; justify-content: center;">
        <div style="width: calc(100% - 40px);height: calc(100% - 40px);">
          <el-form :rules="suspendRules" class="demo-ruleForm" prop="subjectCode">
            <el-form-item label="审批意见" size="74">
              <el-input type="textarea" v-model="suspendApplyDescription"
                        :autosize="{ minRows: 4, maxRows: 4}"></el-input>
            </el-form-item>
          </el-form>
        </div>

      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="handleClose">取 消</el-button>
        <el-button type="primary" @click="suspendApplyEnter">确 定</el-button>
      </div>
    </el-dialog>

    <!-- 审批驳回 -->
    <!-- 驳回 -->
    <el-dialog title="驳回" :visible.sync="applyRejectedState" :before-close="handleClose" width="786px">
      <div style="width: 100%;height: 374px;display: flex; justify-content: center;">
        <div style="width: 100%;height: calc(100% - 40px);">
          <el-row>
            <el-col :span="24">
              <div style="height: 200px;width:100%;">
                <el-form :model="rejectedForm" :rules="rejectedRules" class="demo-ruleForm">
                  <el-form-item label="驳回指定人" size="74">
                    <el-radio-group v-model="rejectedForm.type">
                      <el-radio style="margin-left: 20px" label="发起人"></el-radio>
                      <el-radio style="margin-left: 20px" label="上一级审批人"></el-radio>
                      <!-- 指派任意审批人 -->
                      <!--<el-radio style="margin-left: 20px"  label="任意节点审批人">任意节点审批人-->
                      <!--<el-input style="margin-left: 10px;width: 200px"></el-input>-->
                      <!--</el-radio>-->
                    </el-radio-group>
                  </el-form-item>
                  <!--<el-form-item style="top: 20px" label="指派审批人" size="74" prop="subjectType">-->
                  <!---->
                  <!--<div-->
                  <!--style="width: 300px;height: 40px;border-radius: 4px;border: 1px solid #DCDFE6;display: flex;flex-direction: row">-->
                  <!--&lt;!&ndash;@click="selApplyPeople"&ndash;&gt;-->
                  <!--<div style="width: 260px;height: 40px;" >-->
                  <!--<span style="margin-left: 15px;font-size: 14px;color: #C0C4CC">请选择</span>-->
                  <!--</div>-->
                  <!--<div class="el-icon-plus"-->
                  <!--style="width: 40px;height: 40px;line-height: 40px;text-align: center;font-size: 16px;color: #909399;">-->

                  <!--</div>-->

                  <!--</div>-->
                  <!--</el-form-item>-->
                  <el-form-item label="审批意见" size="74" prop="description">
                    <el-input type="textarea" v-model="rejectedForm.description"
                              :autosize="{ minRows: 6, maxRows: 6}"></el-input>
                  </el-form-item>


                </el-form>
              </div>
            </el-col>

          </el-row>


        </div>

      </div>
      <div slot="footer" class="dialog-footer">
        <el-button @click="handleClose">取 消</el-button>
        <el-button type="primary" @click="addRejectedEnter">确 定</el-button>
      </div>
    </el-dialog>


  </div>

</template>

<script>
  import {
    getRejectFlowTask,
    getTreeselect,
    getUserList,
    getNodeDetail,
    getUserByLineId,
    getUserByLineId2,
    getPassFlowTask,
    getTransferFlowTask,
    getTermination,
    getWhetherHaveWorkflow,
    getFlowListByBusinessType,
    getFlowLineList,
    startFlowTask,
  } from '../../../../src/api/processEngine/processEngine'

  export default {
    name: 'publicComponent',
    props: {
      dialogToolsParam: ''
    },
    data() {

      return {

        //  预定审批 启动审批
        resProcessStartState: false,
        ruleForm1: {

          subjectType: '',
          subjectCode: '',
          subjectName: '',
          isQuote: '',
          subjectSid: ''

        },
        resProcessStartRules: {
          selProcessName: [
            { required: true, message: '选择相应的审批流程', trigger: 'blur' },
            { min: 1, max: 2000, message: '长度在 1 到 2000 个字符', trigger: 'blur' }
          ],
          subjectType: [
            { required: true, message: '指派审批人', trigger: 'blur' },
            { min: 1, max: 2000, message: '长度在 1 到 2000 个字符', trigger: 'blur' }
          ],
          subjectCode: [
            {
              required: true, message: '请填写审批意见' +
                '', trigger: 'blur'
            },
            { min: 1, max: 2000, message: '长度在 1 到 2000 个字符', trigger: 'blur' }
          ]

        },

        //  审批
        applyState: false,
        applyPeopleState: false,
        activeName: 'first',
        searchType: '',
        data: [{
          id: 1,
          label: '一级 1',
          icon: 'el-icon-success',
          children: [{
            id: 4,
            label: '二级 1-1',
            children: [{
              id: 9,
              label: '三级 1-1-1',
              icon: 'el-icon-info'
            }, {
              id: 10,
              label: '三级 1-1-2'
            }]
          }]
        }, {
          id: 2,
          label: '一级 2',
          children: [{
            id: 5,
            label: '二级 2-1'
          }, {
            id: 6,
            label: '二级 2-2'
          }]
        }, {
          id: 3,
          label: '一级 3',
          children: [{
            id: 7,
            label: '二级 3-1'
          }, {
            id: 8,
            label: '二级 3-2'
          }]
        }],
        //部门相关
        defaultProps: {
          children: 'children',
          label: 'label'
        },
        subjectDatas: [{}, {}, {}, {}],

        // 审批终止
        applyStopState: false,

        // 审批驳回
        applyRejectedState: false,
        rejectedForm: {
          state: '',
          type: '',
          description: ''
        },
        rejectedRules: {
          description: [
            { required: true, message: '选择相应的审批意见', trigger: 'blur' },
            { min: 1, max: 2000, message: '长度在 1 到 2000 个字符', trigger: 'blur' }
          ]

        },

        //   同意审批定义字端
        //部门相关
        applyDefaultProps: {
          children: 'children',
          label: 'label'
        },
        applyTreeData: [],
        applyKeyInfo: '',
        applyListKey: '',
        applySubjectDatas: [],
        applyTotalNum: 0,
        applyCurrentPage: 1,
        applyPageSizes: [10, 100, 200, 300, 400],
        applyPageSize: 10,
        deptId: '',
        deptName: '',
        selUserInfo: [],
        nodeDetail: {},

        // 预定审批
        resApplyRuleForm: {

          userName: '',
          subjectCode: '',
          subjectName: '',
          isQuote: '',
          subjectSid: ''

        },
        selectAppPeople: '',
        selectAppPeoples: [],
        ccUserIdList:[],
        resApplyDescription: '',
        selectPeoPleInfo: {},
        resApplyRules: {
          selProcessName: [
            { required: true, message: '选择相应的审批流程', trigger: 'blur' },
            { min: 1, max: 2000, message: '长度在 1 到 2000 个字符', trigger: 'blur' }
          ],
          subjectType: [
            { required: true, message: '指派审批人', trigger: 'blur' },
            { min: 1, max: 2000, message: '长度在 1 到 2000 个字符', trigger: 'blur' }
          ],
          subjectCode: [
            {
              required: true, message: '请填写审批意见' +
                '', trigger: 'blur'
            },
            { min: 1, max: 2000, message: '长度在 1 到 2000 个字符', trigger: 'blur' }
          ]

        },
        selMoreLineDatas: [],
        ccUserList:[],//新添加的 抄送给
        selectApplyLineId: '',
        userInfoOptions: '',


        //  非预定审批
        //  选择的人员信息
        unApplyPeopleData:{
          names:"选择相应的数据",
          userIds:""

        },
        unResApplyDescription: '',
        unResApplyRules: {
          selProcessName: [
            { required: true, message: '选择相应的审批流程', trigger: 'blur' },
            { min: 1, max: 2000, message: '长度在 1 到 2000 个字符', trigger: 'blur' }
          ],
          subjectType: [
            { required: true, message: '指派审批人', trigger: 'blur' },
            { min: 1, max: 2000, message: '长度在 1 到 2000 个字符', trigger: 'blur' }
          ],
          subjectCode: [
            {
              required: true, message: '请填写审批意见' +
                '', trigger: 'blur'
            },
            { min: 1, max: 2000, message: '长度在 1 到 2000 个字符', trigger: 'blur' }
          ]

        },

        // 移交
        handOverApplyState:false,


        // 中止
        suspendApplyDescription:"",
        suspendRules: {

          subjectCode: [
            {
              required: true, message: '请填写审批意见' +
                '', trigger: 'blur'
            },
            { min: 1, max: 2000, message: '长度在 1 到 2000 个字符', trigger: 'blur' }
          ]

        },



        //   公用字端
        todoId: '',
        individualChoice:true,

      //  流程启动
        selMoreProcessDatas:[],
        selMoreProcessId:"",
        selMoreLineDatas:[],
        selMoreLineId:"",
        selStartPeopleId:"",
        whetherHaveWorkflow:{},
        resStartDescription:"",
        unResProcessStartState:false,
        unResProcessStartDescription:"",
        cooseThePathState:false,
        applyNodeDetail:{}

      }
    },
    watch: {
      // 根据名称筛选部门树
      applyKeyInfo(val) {
        console.log(val + 'aefasdfsdgfsa')
        this.$refs.tree.filter(val)
      }
    },
    created() {

    },
    mounted() {

      this.dialogToolsParam = this.$props.dialogToolsParam
      this.todoId = this.dialogToolsParam.param.todoId
      console.log(JSON.stringify(this.dialogToolsParam) + 'zsdfsdfasdf' + this.todoId)

      if (this.dialogToolsParam.dialogType == 'agree') {

        this.requstNodeDetail();


      } else if (this.dialogToolsParam.dialogType == 'rejected') {
        this.individualChoice = true
        // 审批驳回
        this.applyRejectedState = true
        this.handOverApplyState = true
      }else if (this.dialogToolsParam.dialogType == 'handOver') {
        // 审批移交
        this.individualChoice = true
        this.handOverApplyState = true
      }
      else if (this.dialogToolsParam.dialogType == 'suspend') {
        // 审批中止
        this.applyStopState = true
      }

      else if (this.dialogToolsParam.dialogType == 'startProcess') {
        // 预定审批 审批启动

        this.requestWhetherHaveWorkflow()
      }



      console.log('afdasdAsdasdAsd')

    },
    methods: {

      // 启动审批模块
      //   启动项目获取是否是非预定审批
      requestWhetherHaveWorkflow(){
        var that = this;
        var param = {};
        param.businessType = that.dialogToolsParam.param.businessType
        console.log("sdasfdsdfsf"+that.dialogToolsParam.param.businessType)

        getWhetherHaveWorkflow(param).then(response => {
          console.log(JSON.stringify(response)+"asdasdasdasdasd")

          if (response.code == 200) {
            that.whetherHaveWorkflow = response;
            if (response.whetherHaveWorkflow == 1){

              that.resProcessStartState = true
              that.requestFlowListByBusinessType();

            }else {
              that.unResProcessStartState = true;
            }
          }
        })

      },

      // 选择 线路 事件
      selMoreProcessClick(){

        console.log(this.selMoreProcessId+"asdasd1112344")
        var that = this;

        that.selMoreLineId = "";
        that.resApplyRuleForm.userName = "";
        that.resApplyRuleForm.userId = "";
        that.selectAppPeople = "";
        that.selectAppPeoples = []
        that.selectPeoPleInfo = {};

        var param = {};
        param.processId = that.selMoreProcessId;
        param.businessId = that.dialogToolsParam.param.businessId;

        getFlowLineList(param).then(response => {

          console.log(JSON.stringify(response)+"iiuuhhhj")
          if (response.code == 200) {
            that.selMoreLineDatas = response.data;
            that.cooseThePathState = false
            if(that.selMoreLineDatas.length ==1){
              console.log(JSON.stringify(response)+"iiuuhhhj1")
              that.selMoreLineId = that.selMoreLineDatas[0].nodeId
              that.resStartSelMoreLineClick();
            }else if(that.selMoreLineDatas.length >1){
              that.cooseThePathState = true

            }
          }
        });

      },

      // 选择线路方法
      resStartSelMoreLineClick(){

        this.resApplyRuleForm.userName = "";
        this.selectAppPeople = "";
        this.resApplyRuleForm.userId = "";
        this.selectAppPeoples = []
        this.selectPeoPleInfo = {};
        console.log(this.selMoreLineId+"asdasd1112344")
        console.log('asdfasdfadsf322222')
        this.requsetUserByLineId(this.selMoreLineId)

      },


      // 确认提交 指派审批人
      resProcessStartClick(){

        var param = {}
        var that = this;
        debugger

        if(( that.selMoreProcessId.length <1)){
          that.msgError("请选择流程")
        }else if ( that.selMoreLineId.length <1){
          that.msgError("请选择路径")
        }else {

          if (this.whetherHaveWorkflow.whetherHaveWorkflow == 1){

            //   判断是否是可选的人员 否
            if (that.selectPeoPleInfo.allowSelectUser == false) {
              param.assigneeOrRole = that.selectPeoPleInfo.userId
              param.assigneeOrRoleName = that.selectPeoPleInfo.userName
            }

            //  否
            else {

              // 判断是单选还是多选 单选
              if (that.selectPeoPleInfo.allowSelectMore == false) {

                // console.log(JSON.stringify(that.selectPeoPleInfo)+"asdasdasda")

                for (var i = 0; i < that.selectPeoPleInfo.userList.length; i++) {
                  var userListItem = that.selectPeoPleInfo.userList[i]
                  if (userListItem.userId == that.selectAppPeople) {
                    param.assigneeOrRole = userListItem.userId
                    param.assigneeOrRoleName = userListItem.nickName

                  }
                }

                console.log("12")
              } else {

                var userNames = ''
                var userIds = ''
                that.selectAppPeoples.forEach((item, index) => {

                  for (var j = 0; j < that.selectPeoPleInfo.userList.length; j++) {

                    var userListItem = that.selectPeoPleInfo.userList[j]

                    if (userListItem.userId == item) {

                      userNames = userNames + userListItem.nickName + ','
                      userIds = userIds + userListItem.userId + ','

                    }

                  }
                  console.log("13")

                })

                param.assigneeOrRole = userIds
                param.assigneeOrRoleName = userNames

              }


              // param.assigneeOrRole = userIds
              // param.assigneeOrRoleName = userNames
            }
          }

          //新添加的 2022/01/13 开始
          let ccUserNames = []
          this.ccUserIdList && this.ccUserIdList.forEach(ccUser=>{
            let obj = this.ccUserList.find(s=> s.userId == ccUser)
            if(obj){
              ccUserNames.push(obj.nickName)
            }
          })
          if(this.ccUserIdList && this.ccUserIdList.length>0){
            param.ccUserIdList = this.ccUserIdList.join(',')
            param.ccUserNameList = ccUserNames.join(',')
          }else{
            param.ccUserIdList = ''
            param.ccUserNameList = ''
          }

          //新添加的 2022/01/13 结束



          console.log("asfdasdasda")
          param.processId = that.selMoreProcessId

          param.lineFlag = that.selMoreLineId
          param.remark = that.resStartDescription
          param.businessType = that.dialogToolsParam.param.businessType;
          param.businessId = that.dialogToolsParam.param.businessId;
          param.taskName = that.dialogToolsParam.param.pageSubType + that.dialogToolsParam.param.projectName

          console.log("sdgfsdfhgdfxg"+JSON.stringify(param));

          if(param.assigneeOrRole == undefined){
            that.msgError("请选择人员")
          }else {

            console.log("sdgfsdfhgdfxg"+JSON.stringify(param));
            that.requsetStartFlowTask(param);

          }




        }




      },

      //  启动项目提交
      requsetStartFlowTask(param){

        startFlowTask(param).then(response => {

          if (response.code == 200) {
            console.log(JSON.stringify(response)+"afasdasdads")
            this.$emit('dialogEnterMethod', { 'rejectFlowTask': '审批成功' });
          }

        });

      },

      //  非预定义提交
      unResProcessStartEnter(){


        var param = {}
        var that = this
        if (that.whetherHaveWorkflow.whetherHaveWorkflow == 0) {
          param.assigneeOrRole = that.unApplyPeopleData.userIds
          param.assigneeOrRoleName =  that.unApplyPeopleData.names
          param.processId = "UNDEFINED_PROCESS"
          param.lineFlag = ""
          param.remark = that.unResProcessStartDescription
          param.businessType = that.dialogToolsParam.param.businessType;
          param.businessId = that.dialogToolsParam.param.businessId;
          param.taskName = that.dialogToolsParam.param.pageSubType + that.dialogToolsParam.param.projectName
          that.requsetStartFlowTask(param);
        }
        // console.log(JSON.stringify(param)+"asdasdsafasd")


      },

      //
      requestFlowListByBusinessType(){

        var that = this;
        var param = {};
        param.businessType = that.dialogToolsParam.param.businessType

        getFlowListByBusinessType(param).then(response => {

          console.log(JSON.stringify(response)+"asfdasdsada11111")
          if (response.code == 200) {
            this.selMoreProcessDatas = response.data;
            if(this.selMoreProcessDatas && this.selMoreProcessDatas.length == 1){
              this.selMoreProcessId = this.selMoreProcessDatas[0].processId
              this.selMoreProcessClick()
            }
          } else {
            that.msgError(response.msg)
          }

        })
      },


      //  点击x关闭页面
      handleClose(done) {
        this.$emit('handleClose', { 'cancel': '取消' })
      },

      applyPeopleClose() {
        this.applyPeopleState = false

      },
      applyPeopleEnter() {

      },
      handleIconClick() {

      },
      querySearch(queryString, cb) {
        // var restaurants = this.restaurants;
        // var results = queryString ? restaurants.filter(this.createFilter(queryString)) : restaurants;
        // // 调用 callback 返回建议列表的数据
        // cb(results);
      },
      tabTypeSelMethods(tab, event) {
        console.log(JSON.stringify(this.activeName) + 'asdfsdfsadfa')
      },
      addBudgetEnter() {

      },
      handleSizeChange() {

      },

      //  驳回逻辑
      // 提交
      addRejectedEnter() {

        //  提交驳回信息
        this.requestRejectFlowTask()

      },
      requestRejectFlowTask() {

        // this.$emit('dialogEnterMethod', { 'rejectFlowTask': '驳回成功' })

        this.rejectedForm.todoId = this.todoId
        if (this.rejectedForm.type == '发起人') {
          this.rejectedForm.state = 3
        } else if (this.rejectedForm.type == '上一级审批人') {
          this.rejectedForm.state = 2
        }
        var param = {}
        console.log(JSON.stringify(this.rejectedForm) + 'asdaSFasfdAsdads')
        param = this.rejectedForm
        var that = this
        getRejectFlowTask(param).then(response => {

          if (response.code == 200) {
            console.log(JSON.stringify(response) + 'sdfdfasdfs')
            this.$emit('dialogEnterMethod', { 'rejectFlowTask': '驳回成功' })
          } else {
            that.msgError(response.msg)
          }

        })

      },

      //   审批逻辑代码
      //   非预定性审批
      // 获取页面嘻嘻你判断是否是默认路径
      requstNodeDetail() {

        var that = this
        var param = {}
        param.todoId = this.todoId
        getNodeDetail(param).then(response => {
          if (response.code == 200) {


            // 测试数据
            // response.data.isPredefinedProcess = false
            that.applyNodeDetail = response;
            that.nodeDetail = response.data
            console.log(JSON.stringify(that.nodeDetail)+"asfdasdAsdasd")
            that.applyState = true

            if (response.data.isPredefinedProcess == true) {
              //  如果有多条线路
              if (response.data.nextIsMoreLine == true) {

                console.log('zsdfszdfasdfsdfsdfs' + that.nodeDetail.lineList.length)

                if (that.nodeDetail.lineList.length > 0) {

                  this.selMoreLineDatas = that.nodeDetail.lineList
                  this.selMoreLineDatas.forEach((item, index) => {
                    if (item.nodeName.length < 1) {
                      item.nodeName = '该数据无线路名称'
                      item.id = index
                    }
                  })
                  that.requsetUserByLineId(that.nodeDetail.lineList[0].nodeId)
                }

              }
              //   如果有一条线路
              else {

                that.requsetUserByLineId(that.nodeDetail.nextLineId)

              }

            }

            //  非预定性审批
            else {



            }
          }
          console.log(JSON.stringify(response) + 'sadfsdgsdfsdf')

        })
      },



      // 通过路径获取人员信息
      requsetUserByLineId(e) {

        console.log('asdfasdfadsf322222')

        var param = {}
        param.lineId = e
        param.businessId = this.dialogToolsParam.param.businessId
        var that = this


        if (that.nodeDetail.nextIsEnd != true || this.dialogToolsParam.dialogType == 'startProcess'){
          // 获取线路
          getUserByLineId2(param).then(response => {
            if (response.code == 200) {
              console.log(JSON.stringify(response) + 'asdfasdfadsf')
              this.selectPeoPleInfo = response.data;
              if (this.selectPeoPleInfo.allowSelectUser == true) {
                this.userInfoOptions = this.selectPeoPleInfo.userList
              } else {
                this.resApplyRuleForm.userName = this.selectPeoPleInfo.userName
              }


            //  新添加的 开始
             this.ccUserList = this.selectPeoPleInfo.ccUserList
              //新添加的 结束


            }

          })
        }



      },



      selApplyPeople() {

        this.requestTreeselect()
        this.requestUserList()
        this.applyPeopleState = true

      },

      selMoreLineClick(e) {
        console.log(JSON.stringify(e) + 'asdfsdfasfdasdfas')
        this.requsetUserByLineId(e)
      },
      selUserInfoClick(e) {
        console.log(JSON.stringify(e) + 'asdfsdfasfdasdfas1')
      },
      //新添加的抄送给
      selccUserInfoClick(e) {
        console.log(JSON.stringify(e) + '-----抄送给')
      },

      // 预定义审批界面 确定方法
      reservationAppleEnter() {

        //  判断是否是预定一审批
        // this.nodeDetail
        // this.selectPeoPleInfo

        var param = {}
        var that = this

        if (that.nodeDetail.isPredefinedProcess == true) {

          //  判断是否是多条路径 是
          if (that.nodeDetail.nextIsMoreLine == true) {
            param.lineFlag = that.selectApplyLineId
          }
          //  否
          else {
            param.lineFlag = that.nodeDetail.nextLineId
          }
          //   判断是否是可选的人员 否
          if (that.selectPeoPleInfo.allowSelectUser == false) {

            param.assigneeOrRole = that.selectPeoPleInfo.userId
            param.assigneeOrRoleName = that.selectPeoPleInfo.userName

          }

          //  否
          else {

            // 判断是单选还是多选 单选
            if (that.selectPeoPleInfo.allowSelectMore == false) {

              for (var i = 0; i < that.selectPeoPleInfo.userList.length; i++) {

                var userListItem = that.selectPeoPleInfo.userList[i]

                if (userListItem.userId == that.selectAppPeople) {

                  param.assigneeOrRole = userListItem.userId
                  param.assigneeOrRoleName = userListItem.nickName

                }

              }
            } else {

              var userNames = ''
              var userIds = ''
              that.selectAppPeoples.forEach((item, index) => {

                for (var j = 0; j < that.selectPeoPleInfo.userList.length; j++) {

                  var userListItem = that.selectPeoPleInfo.userList[j]

                  if (userListItem.userId == item) {

                    userNames = userNames + userListItem.nickName + ','
                    userIds = userIds + userListItem.userId + ','

                  }

                }

              })
              param.assigneeOrRole = userIds
              param.assigneeOrRoleName = userNames
            }
          }

        }

        param.todoId = that.todoId

        param.description = that.resApplyDescription

        getPassFlowTask(param).then(response => {

          if (response.code == 200) {
            this.$emit('dialogEnterMethod', { 'rejectFlowTask': '审批成功' })
            console.log(JSON.stringify(response)+"asdfsdfasdasd")
          }
        });
        console.log(JSON.stringify(param) + 'sdfzdsgdfhggfjhfgghfdg')

      },

      // 非预定义审批 获取组织信息列表
      requestTreeselect() {

        var that = this

        getTreeselect().then(response => {

          if (response.code == 200) {
            console.log(JSON.stringify(response) + 'asdasdAsdasd')

            that.applyTreeData = response.data

          } else {
            that.msgError(response.msg)
          }

        })

      },

      // 获取用户信息列表
      requestUserList() {

        var that = this
        var param = {}
        param.pageNum = that.applyCurrentPage
        param.pageSize = that.applyPageSize
        param.searchValue = that.applyListKey
        param.deptId = this.deptId
        param.deptName = this.deptName
        getUserList(param).then(response => {

          if (response.code == 200) {
            that.applySubjectDatas = response.rows
            console.log(JSON.stringify(response) + 'fasdasdasdasd')

            for (var i=0; i<response.rows.length; i++){
             var applySubjectDatasItem = that.applySubjectDatas[i];

              var roleNames = ""
              for (var j=0; j<applySubjectDatasItem.roles.length; j++){

                var rolesItem = applySubjectDatasItem.roles[j];
                if (j == applySubjectDatasItem.roles.length -1){
                  roleNames = rolesItem.roleName
                }else {
                  roleNames = rolesItem.roleName+"," ;
                }


              }
              applySubjectDatasItem.roleNames = roleNames;




            }



            that.applyTotalNum = response.total
          } else {
            that.msgError(response.msg)
          }

        })

      },
      appayHandleSizeChange(e) {

        console.log('asfsdzasdas' + e)
        this.applyPageSize = e
        this.requestUserList()

      },
      appayHandleCurrentChange(e) {

        console.log('asfsdzasdas' + e)
        this.applyCurrentPage = e
        this.requestUserList()

      },

      designateApproveryEnter(){

        var userNames = ''
        var userIds = ''
        this.selUserInfo.forEach((item, index) => {

          if (index < (this.selUserInfo.length - 1)){
            userNames = userNames + item.nickName + ','
            userIds = userIds + item.userId + ','
          }else {
            userNames = userNames + item.nickName
            userIds = userIds + item.userId
          }

        })

        this.unApplyPeopleData.names = userNames
        this.unApplyPeopleData.userIds = userIds
        this.applyPeopleState = false;

      },

      // 非预定审批确定按钮事件
      unscheduledApplyEnter(){

        var that = this



          var param = {}

          if (that.nodeDetail.isPredefinedProcess == false) {

            param.lineFlag = that.nodeDetail.nextLineId
            param.todoId = that.todoId;
            param.description = that.unResApplyDescription
            param.assigneeOrRole = that.unApplyPeopleData.userIds
            param.assigneeOrRoleName =  that.unApplyPeopleData.names

            getPassFlowTask(param).then(response => {
              if (response.code == 200) {
                this.$emit('dialogEnterMethod', { 'rejectFlowTask': '审批成功' })
                console.log(JSON.stringify(response)+"asdfsdfasdasd")
              }
            });
            console.log(JSON.stringify(param) + 'sdfzdsgdfhggfjhfgghfdg')
            // console.log(JSON.stringify(param)+"asfasdfasdfsda")

          }



      },

      // 移交提交接口
      handOverApplEnter(){


        var that = this
        var param = {}
        param.todoId = that.todoId;
        param.description = that.unResApplyDescription
        param.assigneeOrRole = that.unApplyPeopleData.userIds.split(',')[0];
        param.assigneeOrRoleName =  that.unApplyPeopleData.names.split(',')[0];


        getTransferFlowTask(param).then(response => {
          if (response.code == 200) {
            this.$emit('dialogEnterMethod', { 'rejectFlowTask': '移交成功' })
            console.log(JSON.stringify(response)+"asdfsdfasdasd")
          }
        });
        // console.log(JSON.stringify(param) + 'sdfzdsgdfhggfjhfgghfdg')


      },

      //  中止提交方法
      suspendApplyEnter(){

        var that = this
        var param = {}
        param.todoId = that.todoId;
        param.description = that.suspendApplyDescription;
        getTermination(param).then(response => {
          if (response.code == 200) {
            this.$emit('dialogEnterMethod', { 'rejectFlowTask': '中止成功' })
            console.log(JSON.stringify(response)+"asdfsdfasdasd")
          }
        });

      },


      //  选择数据
      applyHandleSelection(e) {

        console.log('fasdfas1' + JSON.stringify(e))
        this.selUserInfo = e

      },
      danSqlApplyHandleSelection(e){
        this.selUserInfo = [];
        this.selUserInfo.push(e)
      },
      applyHandleSelectionChange(e) {
        console.log('fasdfas2' + JSON.stringify(e))

      },
      applyhandleIconClick() {

        // this.applyCurrentPage = e;
        this.requestUserList()

      },
      applyHandleTreeClick(e) {
        console.log(JSON.stringify(e) + 'asdfsadfasdggfdgdf')
        this.deptId = e.id
        this.deptName = e.label
        this.requestUserList()

      },
      // 筛选节点
      applyFilterNode(value, data) {
        if (!value) return true
        return data.label.indexOf(value) !== -1
      },
      // enter事件搜索数据
      searchPersonnelInformation(){
        console.log("asdasfasdfsdfs"+this.applyListKey)
        this.requestUserList()
      },


    }

  }
</script>

<style lang="scss" scoped>
  .tabss{
    margin-bottom:20px;
    margin-top: -20px;
  }
  /deep/ .el-tree-node__content {
    display: flex;
    align-items: center;
    height: 36px;
    font-size: 14px;
    cursor: pointer;
  }
   .span-ellipsis {
    width: 100%;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  /deep/ .el-dialog__footer {
    padding: 20px;
    padding-top: 20px;
    text-align: right;
    box-sizing: border-box;
    box-shadow: inset 0 1px 0 0 #EEEEEE;
  }

  el-table__row>td {
    border: none;
  }
  .adddata{
    line-height: 46px;
  }
  .el-table::before {
    height: 0px;
  }

  /deep/.el-dialog{
    display: flex;
    flex-direction: column;
    margin:0 !important;
    position:absolute;
    top:50%;
    left:50%;
    transform:translate(-50%,-50%);
    /*height:600px;*/
    max-height:calc(100% - 30px);
    max-width:calc(100% - 30px);
  }
  /deep/.el-dialog .el-dialog__body{
    flex:1;
    overflow: auto;
  }
/deep/ .el-dialog__header{
    background: rgba(65, 135, 242, .1);
    line-height: 42px;
}
/deep/ .el-dialog__headerbtn{
  box-sizing: border-box;
  background: none;

  padding: 0!important;
  color: #4187F2;
  font-size: 24px;
  font-weight: bold;
  align-items: center;
}
/deep/ .i-close{/**关闭按钮 */
  font-size: 24px;
  position: static;
  color: #000;
}

/deep/ .el-dialog__title{
     font-weight: bold;
      color: #4187F2;

      font-size: 24px;
  }
  /deep/ .el-pagination .el-pager li{
    margin: 5px;
    background-color: #f4f4f5;
    color: #606266;
    border-radius: 2px;
  }
  /deep/ .el-pager li.active{
    background-color: #1989fa;
    color: #fff;
  }
  /deep/  .el-pagination .btn-prev {
    margin: 5px;
    background-color: #f4f4f5;
    color: #606266;
    border-radius: 2px;
}
/deep/  .el-pagination .btn-next {
    margin: 5px;
    background-color: #f4f4f5;
    color: #606266;
    border-radius: 2px;
}
/deep/ .el-pagination .el-pagination__total{
  margin: 5px;
}
/deep/ .el-pagination__sizes{
  margin: 5px;
}
/deep/ .el-pagination__jump{
   margin: 5px;
}
</style>
