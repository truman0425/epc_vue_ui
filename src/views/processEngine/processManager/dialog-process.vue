<template>
  <my-dialog ref="psDialog" title="审批节点设置" width="830px">
    <div slot="dialogContent" class="dialog-content">

      <el-form ref="processFrom"
               :rules="processRules"
               :model="nodeDic"
               label-width="160px"
               class="process-ruleForm">
        <div class="process-title-top">
          <span></span>
          <span>流程审批人设置</span>
        </div>
        <el-row :gutter="20" class="approve-type-main">
          <el-col :span="12">
            <el-form-item label="审批类型" prop="projectCode">
              <el-select v-model="nodeDic.approverType"
                         @change="processTypeChange(nodeDic)"
                         placeholder="审批角色">
                <el-option
                  v-for="item in processTypes"
                  :key="item.dictValue"
                  :label="item.dictLabel"
                  :value="item.dictValue">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>

          <el-col :span="12">
            <div class="approve-type">
<!--              //1固定审批人2.审批角色3.指定部门负责人4.指定成员5.申请人自选6前期项目角色7项目机会角色-->
               <!--固定审批人-->
              <div v-show="nodeDic.approverType == 1" class="tag-cls">
                <i class="el-icon-plus" @click="addApproveGd" ></i>
                <span class="approve-user">{{ nodeDic.nodeRoleName||'' }}</span>
                <span class="tag-hol" v-show="!nodeDic.nodeRoleName">请选择</span>
              </div>

              <!--项目角色-->
<!--              <el-select v-show="nodeDic.approverType == 6"-->
<!--                         v-model="nodeDic.nodeRoleId"-->
<!--                         style="width: 100%"-->
<!--                         placeholder="项目角色">-->
<!--                <el-option-->
<!--                  v-for="item in roleList"-->
<!--                  :key="item.dictValue"-->
<!--                  :label="item.dictLabel"-->
<!--                  :value="item.dictValue">-->
<!--                </el-option>-->
<!--              </el-select>-->

              <div v-show="nodeDic.approverType == 2||nodeDic.approverType == 6||nodeDic.approverType == 7"
                   class="tag-cls tag-stl">
                <el-tag
                  v-for="tag in approveRoleTags"
                  :key="tag.name"
                  closable
                  @close="handleClose3(tag)"
                  :type="tag.type">
                  {{tag.name}}
                </el-tag>
                <i class="el-icon-plus" @click="addApproveUser(nodeDic.approverType)" ></i>
              </div>

<!--              &lt;!&ndash;系统角色&ndash;&gt;-->
<!--              <el-select v-show="nodeDic.approverType == 2"-->
<!--                         v-model="nodeDic.nodeRoleId"-->
<!--                         style="width: 100%"-->
<!--                         placeholder="系统角色">-->
<!--                <el-option-->
<!--                  v-for="item in systemRoleList"-->
<!--                  :key="item.dictValue"-->
<!--                  :label="item.dictLabel"-->
<!--                  :value="item.dictValue">-->
<!--                </el-option>-->
<!--              </el-select>-->

              <!--指定部门负责人-->
               <div v-show="nodeDic.approverType == 3" class="approve-type-list">

<!--                 <el-select  v-model="nodeDic.deptFlowType"-->
<!--                            style="width: 100%"-->
<!--                            placeholder="审批方式">-->
<!--                   <el-option-->
<!--                     v-for="item in deptFlowTypes"-->
<!--                     :key="item.dictValue"-->
<!--                     :label="item.dictLabel"-->
<!--                     :value="item.dictValue">-->
<!--                   </el-option>-->
<!--                 </el-select>-->

                 <el-select  v-model="nodeDic.deptTypes2"
                            style="width: 100%;margin-left: 10px"
                            placeholder="负责人" >
                   <el-option
                     v-for="item in deptTypes"
                     :key="item.dictValue"
                     :label="item.dictLabel"
                     :value="item.dictValue">
                   </el-option>
                 </el-select>

                 <el-tooltip class="item" effect="dark" content="当前层级无部门负责人时，由上一级部门负责人审批" placement="top">
                   <i class="el-icon-question"></i>
                 </el-tooltip>

               </div>

              <!--指定成员-->
              <div v-show="nodeDic.approverType == 4" class="approve-type-list">
                <el-input class="suffix-inner"
                          v-model="nodeDic.pointUser"
                          placeholder="请选择指定审批人"
                          readonly
                          style="width: 100%"
                          :title="nodeDic.pointUser"
                          @click.native="inputSelectUser()"
                          suffix-icon="el-icon-plus" />
              </div>

<!--              &lt;!&ndash;申请人本人&ndash;&gt;-->
<!--              <div v-show="nodeDic.approverType == 5" class="approve-type-list">-->

<!--              </div>-->

              <!--申请人自选-->
              <div v-show="nodeDic.approverType == 5" class="approve-type-list">
                <el-select  v-model="nodeDic.isLimitRange"
                            style="width: 100%"
                            @change="rangeChange"
                            placeholder="可选范围">
                  <el-option
                    v-for="item in selectRange"
                    :key="item.dictValue"
                    :label="item.dictLabel"
                    :value="item.dictValue">
                  </el-option>
                </el-select>

                <el-select
                            @change="selectUserTypeChange"
                            v-model="nodeDic.chooseType"
                            style="width: 100%;margin-left: 10px"
                            placeholder="选人方式">
                  <el-option
                    v-for="item in selectUserType"
                    :key="item.dictValue"
                    :label="item.dictLabel"
                    :value="item.dictValue">
                  </el-option>
                </el-select>

<!--                <el-checkbox style="margin-left: 10px" v-model="nodeDic.approveByOrder">依次审批</el-checkbox>-->

              </div>

            </div>
          </el-col>

        </el-row>

        <el-row v-show="selectRangeTypeVal == '1' && nodeDic.approverType == 5 && selectUserTypeVal">
          <el-col :span="24" class="user-tag-list">
            <el-tag
              :key="tag"
              v-for="tag in dynamicTags"
              closable
              :disable-transitions="false"
              @close="handleCloseTag(tag)">
              {{tag}}
            </el-tag>
            <el-button class="tag-list-add" type="text" @click="addPointUser">选择指定人员</el-button>
          </el-col>
        </el-row>

        <div class="process-title-top">
          <span></span>
          <span>流程会审设置</span>
        </div>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="是否会审" prop="contractCode">
              <el-select
                v-model="nodeDic.isJointHearing"
                placeholder="">
                <el-option
                  v-for="item in isEachOtherViews"
                  :key="item.dictValue"
                  :label="item.dictLabel"
                  :value="item.dictValue">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="相互可见" prop="contractName">
              <el-select
                v-model="nodeDic.isEachOtherView"
                placeholder="">
                <el-option
                  v-for="item in isEachOtherViews"
                  :key="item.dictValue"
                  :label="item.dictLabel"
                  :value="item.dictValue">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>

        <div class="process-title-top">
          <span></span>
          <span>流程抄送人设置</span>
        </div>

        <el-row :gutter="20"  >
          <el-col :span="24">
            <el-form-item label="固定抄送人" prop="contractCode">
              <div class="tag-cls tag-stl">
                <el-tag
                  v-for="tag in gdUserTags"
                  :key="tag.name"
                  closable
                  @close="handleClose(tag)"
                  :type="tag.type">
                  {{tag.name}}
                </el-tag>
                <i class="el-icon-plus" @click="addGdUser" ></i>
              </div>
            </el-form-item>
          </el-col>
        </el-row>


        <el-row :gutter="20" >
          <el-col :span="24">
            <el-form-item label="抄送角色" prop="contractCode">
               <div class="tag-cls tag-stl">
                 <el-tag
                   v-for="tag in gdRoleTags"
                   :key="tag.name"
                   closable
                   @close="handleClose2(tag)"
                   :type="tag.type">
                   {{tag.name}}
                 </el-tag>
                  <i class="el-icon-plus" @click="addCsUser" ></i>
               </div>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="20"  >
          <el-col :span="24">
            <el-form-item label="指定部门负责人" prop="contractCode">
              <el-select  v-model="nodeDic.ccdeptTypes"
                          placeholder="负责人" multiple>
                <el-option
                  v-for="item in deptTypes"
                  :key="item.dictValue"
                  :label="item.dictLabel"
                  :value="item.dictValue">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="20">
          <el-col :span="24">
            <el-form-item label=""  >
              <el-checkbox class="ck-cls" style="margin-left: 20px" v-model="nodeDic.ccIsChoiceByself">允许申请人自选</el-checkbox>
              <el-checkbox class="ck-cls"  v-model="nodeDic.ccIsToself">抄送给申请人本人</el-checkbox>
            </el-form-item>
          </el-col>
        </el-row>

        <div class="process-title-top">
          <span></span>
          <span>节点扩展设置</span>
        </div>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="允许驳回" prop="contractCode">
              <el-select
                @change="allowTurnDownChange"
                v-model="nodeDic.isAllowTurnDown"
                placeholder="">
                <el-option
                  v-for="item in isEachOtherViews"
                  :key="item.dictValue"
                  :label="item.dictLabel"
                  :value="item.dictValue">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="可打回发起人" prop="contractName">
              <el-select
                v-model="nodeDic.isAllowTurnOriginator"
                placeholder="">
                <el-option
                  v-for="item in isEachOtherViews"
                  :key="item.dictValue"
                  :disabled="nodeDic.isAllowTurnDown == 0 && item.dictValue == 1"
                  :label="item.dictLabel"
                  :value="item.dictValue">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="可打回上一步" prop="contractCode">
              <el-select
                v-model="nodeDic.isAllowTurnPrevious"
                placeholder="">
                <el-option
                  v-for="item in isEachOtherViews"
                  :key="item.dictValue"
                  :disabled="nodeDic.isAllowTurnDown == 0 && item.dictValue == 1"
                  :label="item.dictLabel"
                  :value="item.dictValue">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="可以直接结束流程" prop="contractName">
              <el-select
                v-model="nodeDic.isAllowFinish"
                placeholder="">
                <el-option
                  v-for="item in isEachOtherViews"
                  :key="item.dictValue"
                  :label="item.dictLabel"
                  :value="item.dictValue">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>

        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item label="可转办流程" prop="isJointHearing">
              <el-select
                v-model="nodeDic.isAllowTransfer"
                placeholder="">
                <el-option
                  v-for="item in isEachOtherViews"
                  :key="item.dictValue"
                  :label="item.dictLabel"
                  :value="item.dictValue">
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>

        </el-row>

      </el-form>


      <!--选择固定审批人-->
      <publice-select-user ref="selUser" @onSelectData="onSelectData"></publice-select-user>

      <!--选择固定审批人多选-->
      <publice-select-user ref="selUser2" @onSelectUserList="onSelectData2" :is-single="false"></publice-select-user>

      <!--选择抄送人员-->
      <publice-select-user :isSingle="false" ref="gdUser" @onSelectUserList="onSelectUserList"></publice-select-user>
      <!--选择抄送角色-->
      <dialog-role ref="dialogRole" @onSelectRole="onSelectRole"></dialog-role>

    </div>

    <div slot="footer" class="btn-foot">
      <el-button plain @click="closeDialog">取消</el-button>
      <el-button type="primary" @click="onSure" style="margin-right: 10px">确认</el-button>
    </div>

  </my-dialog>
</template>

<script>

import { getMoreEnums } from '@/api/projectPlanning/projectRegistration'
import { getApprovalRoleList,getManagerList } from '@/api/system/approveRole'
import DialogRole from './dialog-role'
import { getRoleList } from '@/api/processEngine/processEngine'

export default {
  name: 'dialogProcess',
  components: {  DialogRole },
  props: {
    msg: {
      type: String,
      default: '保存成功'
    },
    nodeDic2: {
      type: Object,
      default: () => {
      }
    }
  },
  data() {
    return {
      message: this.msg,
      nodeDic: {
        approverType: 0,
        isJointHearing: 0,
        isEachOtherView: 0,
        fixedApproverId: '',
        fixedApproverName: '',
        ccPersonnelIds: [],
        ccFixedId: '',
        ccFixedName: '',
        forcedToCc: '',
        nextNoteState: '0',
        isAllowTurnDown: 0,
        isForceJoin: 0,
        nodeRoleId: '',
        nodeRoleName: '',
        isAllowTurnOriginator:0,//是否允许打回发起人，当isAllowTurnDown=0时，必须为0
        isAllowTurnPrevious:0,//是否允许打回上一步，当isAllowTurnDown=0时，必须为0
        isAllowFinish:0,//是否允许直接结束
        isAllowTransfer:0//是否允许转办
      },
      gdUserTags: [],
      gdRoleTags: [],
      projectRoleTags: [],
      approvalBusinessHuman: [],
      sysApprovalRole:[],
      isEachOtherViews: [{
        dictValue: '1',
        dictLabel: '是'
      },
        {
          dictValue: '0',
          dictLabel: '否'
        }],
      //1固定审批人2.审批角色3.指定部门负责人4.指定成员5.申请人自选6前期项目角色7项目机会角色
      processTypes: [{
        dictValue: '1',
        dictLabel: '固定审批人'
       },
        {
          dictValue: '2',
          dictLabel: '审批角色'
        },
        // {
        //   dictValue: '2',
        //   dictLabel: '业务人员'
        // },
        {
          dictValue: '3',
          dictLabel: '指定部门负责人'
        },
        {
          dictValue: '4',
          dictLabel: '指定成员'
        },
        // {
        //   dictValue: '5',
        //   dictLabel: '申请人本人'
        // },
        {
          dictValue: '5',
          dictLabel: '申请人自选'
        },
        {
          dictValue: '6',
          dictLabel: '前期项目角色'
        },
        {
          dictValue: '7',
          dictLabel: '项目机会角色'
        }

        ],
      ccTypes:[
        {
          dictValue: '1',
          dictLabel: '固定抄送人'
        },
        {
          dictValue: '2',
          dictLabel: '抄送项目角色'
        },
        {
          dictValue: '3',
          dictLabel: '抄送审批角色'
        },
        {
          dictValue: '4',
          dictLabel: '部门负责人'
        }

      ],

      deptTypes: [{
        dictLabel:'直属负责人',
        dictValue:'1'
      }],
      deptFlowTypes: [{
        dictValue: '0',
        dictLabel: '从下至上'
      },
        {
          dictValue: '1',
          dictLabel: '从上至下'
        },

      ],
      selectRange: [{
        dictValue: '0',
        dictLabel: '不限范围'
      },
        {
          dictValue: '1',
          dictLabel: '指定范围'
        },
      ],
      selectUserType: [{
        dictValue: '1',
        dictLabel: '单选'
      },
        {
          dictValue: '2',
          dictLabel: '多选'
        },
      ],
      selectUserTypeVal:undefined,
      selectRangeTypeVal:undefined,
      dynamicTags:[],

      processRules: {
        operatingPrincipal: [{ required: true, message: '请选择经营负责人', trigger: 'change' }]
      },
      roleList:[],
      systemRoleList:[],
      managerList:[],
      selectRoleUserType:0,
      approveRoleTags:[]
    }
  },
  created() {
    this.getBaseNum('approval_business_human,sys_approval_role')
    this.getApproveList()
  },
  methods: {
    openDialog(data) {
      this.nodeDic = data
      this.initData()
      console.log('opendata='+JSON.stringify(data))
      this.$refs.psDialog.openDialog()
    },
    closeDialog() {
      this.$refs.psDialog.closeDialog()
    },
    initData(){

      if(this.nodeDic.ccFixedName){
        let ccFixedName = this.nodeDic.ccFixedName
        let ccFixedId = this.nodeDic.ccFixedId
        let ccFixedNames = ccFixedName.split(',')
        let ccFixedIds = ccFixedId.split(',')
        this.gdUserTags = ccFixedIds.map((res,index)=>{
          return{
            id:res,
            name:ccFixedNames[index],
            type: 'info'
          }
        })
      }else {
        this.gdUserTags = []
      }

      if(this.nodeDic.ccNodeRoleName || this.nodeDic.ccNodeApprovalRoleName){
        let ccNodeRoleName = ''
        let ccNodeRoleId = ''
        let roleIndex = -1
        if(this.nodeDic.ccNodeRoleName && this.nodeDic.ccNodeApprovalRoleName){
          ccNodeRoleName = this.nodeDic.ccNodeRoleName+','+this.nodeDic.ccNodeApprovalRoleName
          ccNodeRoleId = this.nodeDic.ccNodeRoleId+','+this.nodeDic.ccNodeApprovalRoleId
          roleIndex = 0
        }else if(this.nodeDic.ccNodeRoleName){
          ccNodeRoleName = this.nodeDic.ccNodeRoleName
          ccNodeRoleId = this.nodeDic.ccNodeRoleId
          roleIndex = 1
        }else{
          ccNodeRoleName = this.nodeDic.ccNodeApprovalRoleName
          ccNodeRoleId = this.nodeDic.ccNodeApprovalRoleId
          roleIndex = 2
        }

        let ccNodeRoleNames = ccNodeRoleName.split(',')
        let ccNodeRoleIds = ccNodeRoleId.split(',')
        this.gdRoleTags = ccNodeRoleIds.map((res,index)=>{
          let type = 0
          if(roleIndex == 0){
            let arrs = this.nodeDic.ccNodeRoleId.split(',')
            if(index >= arrs.length){
              type = 1
            }else{
              type = 0
            }
          }else if(roleIndex == 2){
            type = 1
          }
          return{
            id:res,
            name:ccNodeRoleNames[index],
            type: 'info',
            roleType:type
          }
        })
      }else{
        this.gdRoleTags = []
      }


      ///后面修改的
      let flowNodeCcs = this.nodeDic.flowNodeCcs
      let listRules = []
      flowNodeCcs.forEach(res=>{
        if(res.ccToId && (res.ccType == 2||res.ccType == 3||res.ccType == 7)){
          let ccFixedNames = res.ccToName.split(',')
          let ccFixedIds = res.ccToId.split(',')
          ccFixedIds.forEach((s,index)=>{
            listRules.push({
              id:s,
              name:ccFixedNames[index],
              type: 'info',
              roleType:res.ccType == 2?'1':'0'
            })
          })
        }
      })

      this.gdRoleTags = listRules

      let userRulesList = flowNodeCcs.filter(res=> res.ccType == '1')

      if(userRulesList && userRulesList.length>0 && userRulesList[0].ccToId && userRulesList[0].ccToId.length>0){
        let ccFixedName = userRulesList[0].ccToName
        let ccFixedId = userRulesList[0].ccToId
        let ccFixedNames = ccFixedName.split(',')
        let ccFixedIds = ccFixedId.split(',')
        this.gdUserTags = ccFixedIds.map((res,index)=>{
          return{
            id:res,
            name:ccFixedNames[index],
            type: 'info'
          }
        })
      }else {
        this.gdUserTags = []
      }

      let deptRulesList = flowNodeCcs.filter(res=> res.ccType == '4')
      if(deptRulesList && deptRulesList.length>0 && deptRulesList[0].ccToId && deptRulesList[0].ccToId.length>0){ //抄送人负责部门
        let ccFixedId = deptRulesList[0].ccToId || ''
        let depts = ccFixedId.split(',')
        if(depts && depts.length>0){
          this.$set(this.nodeDic,'ccdeptTypes',depts)
        }else{
          this.$set(this.nodeDic,'ccdeptTypes',[])
        }
      }

      //1固定审批人2.审批角色3.指定部门负责人4.指定成员5.申请人自选-->
      let approverType = this.nodeDic.approverType
      if(approverType == '1'){//1固定审批人
        this.$set(this.nodeDic,'nodeRoleName',this.nodeDic.approverName)
      }else if(approverType == '2'){//系统角色
        this.$set(this.nodeDic,'nodeRoleId',this.nodeDic.approverId)
      }else if(approverType == '3'){//指定部门负责人
        // this.$set(this.nodeDic,'nodeRoleId',this.nodeDic.approverId)
        // let depts = this.nodeDic.approverId.split(',')
        // this.$set(this.nodeDic,'deptTypes',depts)

        this.$set(this.nodeDic,'deptTypes2','1')

      }else if(approverType == '4'){//指定成员
        this.$set(this.nodeDic,'pointUser',this.nodeDic.approverName)
      }else if(approverType == '5'){//申请人自选
        if(this.nodeDic.approverName && this.nodeDic.approverName.length>0){
          let users = this.nodeDic.approverName.split(',')
          this.dynamicTags = users
        }else{
          this.dynamicTags = []
        }

      }else if(approverType == '6'){//项目角色
        this.$set(this.nodeDic,'nodeRoleId',this.nodeDic.approverId)
      }


      if(approverType == '2'|| approverType == '6' || approverType == '7'){
        let names = this.nodeDic.approverName.split(',')
        let ids = this.nodeDic.approverId.split(',')
        this.approveRoleTags = []
        ids.forEach((res,index)=>{
            this.approveRoleTags.push({
              name:names[index],
              id:ids[index]
            })
        })
      }

      this.selectRangeTypeVal = this.nodeDic.isLimitRange
      this.selectUserTypeVal = this.nodeDic.chooseType

      if(this.nodeDic.ccIsChoiceByself == '1'){
        this.$set(this.nodeDic,'ccIsChoiceByself',true)
      }else{
        this.$set(this.nodeDic,'ccIsChoiceByself',false)
      }
      if(this.nodeDic.ccIsToself == '1'){
        this.$set(this.nodeDic,'ccIsToself',true)
      }else{
        this.$set(this.nodeDic,'ccIsToself',false)
      }

    },
    onSure() {

      let ids = []
      let names = []
      this.gdUserTags.forEach(res=>{
        ids.push(res.id)
        names.push(res.name)
      })

      // 审批角色
      let ids2 = []
      let names2 = []

      //项目机会
      let ids3 = []
      let names3 = []


      //前期项目
      let ids5 = []
      let names5 = []

      this.gdRoleTags.forEach(res=>{
        // 0 审批角色  1项目机会 2前期项目
        if(res.roleType == 0){
          ids2.push(res.id)
          names2.push(res.name)
        }else if(res.roleType == 1){
          ids3.push(res.id)
          names3.push(res.name)
        }else if(res.roleType == 2){
          ids5.push(res.id)
          names5.push(res.name)
        }
      })



      this.$set(this.nodeDic,'ccFixedId',ids.join(','))
      this.$set(this.nodeDic,'ccFixedName',names.join(','))
      this.$set(this.nodeDic,'ccNodeRoleId',ids2.length>0?ids2.join(','):'')
      this.$set(this.nodeDic,'ccNodeRoleName',names2.length>0?names2.join(','):'')
      this.$set(this.nodeDic,'ccNodeApprovalRoleId',ids3.length>0?ids3.join(','):'')
      this.$set(this.nodeDic,'ccNodeApprovalRoleName',names3.length>0?names3.join(','):'')

      let obj1 = {
        ccType:1,
        ccToId:ids.join(','),
        ccToName:names.join(',')
      }
      let obj2 = {
        ccType:3, //审批角色
        ccToId:ids2.length>0?ids2.join(','):'',
        ccToName:names2.length>0?names2.join(','):''
      }
      let obj3 = {
        ccType:2,//项目机会角色
        ccToId:ids3.length>0?ids3.join(','):'',
        ccToName:names3.length>0?names3.join(','):''
      }

      let obj5 = {
        ccType:7,//前期项目
        ccToId:ids5.length>0?ids5.join(','):'',
        ccToName:names5.length>0?names5.join(','):''
      }

      let obj4 = {
        ccType:4,
        ccToId:'',
        ccToName:''
      }

      //1固定审批人2.审批角色3.指定部门负责人4.指定成员5.申请人自选6前期项目角色7项目机会角色
      if(this.nodeDic.approverType == 2||this.nodeDic.approverType == 6||this.nodeDic.approverType == 7){
        let rolesIdArr = []
        let rolesNameArr = []
        this.approveRoleTags.forEach(res=>{
          rolesIdArr.push(res.id)
          rolesNameArr.push(res.name)
        })

        if(rolesIdArr && rolesIdArr.length>0){
          this.nodeDic.approverId = rolesIdArr.join(',')
          this.nodeDic.approverName = rolesNameArr.join(',')
        }else{
          this.nodeDic.approverId = ''
          this.nodeDic.approverName = ''
        }
      }

      if(!this.nodeDic.approverId){
        //1固定审批人2.审批角色3.指定部门负责人4.指定成员5.申请人自选6前期项目角色7项目机会角色
        if(this.nodeDic.approverType == 2||this.nodeDic.approverType == 6||this.nodeDic.approverType == 7){
          this.$message.warning('请先选择审批角色')
          return
        }else if(this.nodeDic.approverType == 1||this.nodeDic.approverType == 4){
          this.$message.warning('请先选择审批人员')
          return
        }
      }


      // nodeDic.deptTypes
      if(this.nodeDic.approverType == 3){ //审批类型部门负责人
        let deptTypes = this.nodeDic.deptTypes || []
        let names = []
        deptTypes.forEach(res=>{
          let obj = this.deptTypes.find(s=> s.dictValue == res)
          if(obj){
            names.push(obj.dictLabel)
          }
        })
        // this.nodeDic.approverId = deptTypes.join(',')
        // this.nodeDic.approverName = names.join(',')
        this.nodeDic.approverId = ''
        this.nodeDic.approverName = ''
      }

      //抄送人部门
      if(this.nodeDic.ccdeptTypes && this.nodeDic.ccdeptTypes.length>0){
        let deptTypes = this.nodeDic.ccdeptTypes || []
        let names = []
        deptTypes.forEach(res=>{
          let obj = this.deptTypes.find(s=> s.dictValue == res)
          if(obj){
            names.push(obj.dictLabel)
          }
        })
        obj4 = {
          ccType:4,
          ccToId:deptTypes.join(','),
          ccToName:names.join(',')
        }
      }
      // nodeDic.ccdeptTypes

      let list = []
      if(obj1.ccToId && obj1.ccToId.length>0){
        list.push(obj1)
      }
      if(obj2.ccToId && obj2.ccToId.length>0){
        list.push(obj2)
      }

      if(obj3.ccToId && obj3.ccToId.length>0){
        list.push(obj3)
      }

      if(obj4.ccToId && obj4.ccToId.length>0){
        list.push(obj4)
      }

      if(obj5.ccToId && obj5.ccToId.length>0){
        list.push(obj5)
      }

      if(this.nodeDic.ccIsChoiceByself){
        this.$set(this.nodeDic,'ccIsChoiceByself','1')
      }else{
        this.$set(this.nodeDic,'ccIsChoiceByself','0')
      }
      if(this.nodeDic.ccIsToself){
        this.$set(this.nodeDic,'ccIsToself','1')
        list.push({
          ccType:6,
        })
      }else{
        this.$set(this.nodeDic,'ccIsToself','0')
      }

      if(this.nodeDic.approverType == 5){
        if(this.nodeDic.isLimitRange == 1){
          this.$set(this.nodeDic,'chooseRange',this.nodeDic.approverId)
        }else{
          this.$set(this.nodeDic,'approverId','')
          this.$set(this.nodeDic,'approverName','')
        }
      }

      this.$set(this.nodeDic,'flowNodeCcs',list)

      this.$emit('onProcessListener',this.nodeDic)
      console.log('nodedic='+JSON.stringify(this.nodeDic))
      //this.closeDialog()
    },
    getBaseNum(base) {
      getMoreEnums(base).then((res) => {
        if (res.data) {
          this.approvalBusinessHuman = res.data.approval_business_human
          this.sysApprovalRole = res.data.sys_approval_role
        }
      })
    },
    handleClose(tag){
      this.gdUserTags = this.gdUserTags.filter(res=> res.id != tag.id)
    },
    handleClose2(tag){
      this.gdRoleTags = this.gdRoleTags.filter(res=> res.id != tag.id)
      this.$refs.dialogRole.unSelectTag(tag,this.nodeDic)
    },
    handleClose3(tag){
      this.approveRoleTags = this.approveRoleTags.filter(res=> res.id != tag.id)
      this.$refs.dialogRole.unSelectTag(tag,this.nodeDic)
    },
    processTypeChange(obj) {
      this.$set(this.nodeDic,'nodeRoleName','')
      this.$set(this.nodeDic,'nodeRoleId','')
      this.approveRoleTags = []
      this.$set(this.nodeDic,'approverId','')
      this.$set(this.nodeDic,'approverName','')
    },
    ccTypeChange(){

    },
    allowTurnDownChange(){
      if(this.nodeDic.isAllowTurnDown == 0){
        this.$set(this.nodeDic,'isAllowTurnOriginator','0')
        this.$set(this.nodeDic,'isAllowTurnPrevious','0')
      }
    },
    addApproveGd(){
      this.$refs.selUser.openDialog()
    },
    onSelectData(user){
      if(this.nodeDic.approverType == 5){
        this.dynamicTags = []
        this.dynamicTags.push(user.nickName)

      }else{
        this.$set(this.nodeDic,'nodeRoleName',user.nickName)
        this.$set(this.nodeDic,'nodeRoleId',user.userId)
        this.$set(this.nodeDic,'fixedApproverId',user.userId)
        this.$set(this.nodeDic,'fixedApproverName',user.nickName)
      }

      this.$set(this.nodeDic,'approverName',user.nickName)
      this.$set(this.nodeDic,'approverId',user.userId)
      //console.log('user='+JSON.stringify(user))
    },
    onSelectData2(list){
     console.log('list='+JSON.stringify(list))
      if(this.nodeDic.approverType == 4){
        let users = list.map(res=> res.nickName)
        this.$set(this.nodeDic,'pointUser',users.join(','))
      }else{
        this.dynamicTags = list.map(res=> res.nickName)
      }

      let users = list.map(res=> res.nickName)
      let ids = list.map(res=> res.userId)

      this.$set(this.nodeDic,'approverName',users.join(','))
      this.$set(this.nodeDic,'approverId',ids.join(','))

    },
    rangeChange(val){
      this.selectRangeTypeVal = val
    },
    selectUserTypeChange(val){
      this.selectUserTypeVal = val
      // this.dynamicTags = []
    },
    inputSelectUser(){
      this.$refs.selUser2.openDialog()
    },
    handleCloseTag(tag){
      this.dynamicTags = this.dynamicTags.filter(res=> res != tag)
    },
    addPointUser(){
      // if(this.selectUserTypeVal == '1'){
      //   this.$refs.selUser.openDialog()
      // }else{
        this.$refs.selUser2.openDialog()
      // }

    },

    onSelectUserList(list){
      let ids = []
      let names = []
      this.gdUserTags = list.map(res=>{
        ids.push(res.userId)
        names.push(res.nickName)
        return{
          name:res.nickName,
          id:res.userId,
          type: 'info'
        }
      })
      this.$set(this.nodeDic,'ccFixedId',ids.join(','))
      this.$set(this.nodeDic,'ccFixedName',names.join(','))

      // this.$set(this.nodeDic,'approverId',ids.join(','))
      // this.$set(this.nodeDic,'approverName',names.join(','))
     // console.log('userList='+JSON.stringify(list))
    },
    onSelectRole(obj){

      if(this.selectRoleUserType == 1){
        this.gdRoleTags = []
        if(obj.approveCheckList && obj.approveCheckList.length>0){
          obj.approveCheckList.forEach(res=>{
            this.gdRoleTags.push({
              name:`${res.approvalRoleName}(审批角色)`,
              id:res.approvalRoleId,
              type: 'info',
              roleType:0
            })
          })
        }
        if(obj.chanceCheckList && obj.chanceCheckList.length>0){
          obj.chanceCheckList.forEach(res=>{
            this.gdRoleTags.push({
              name:`${res.projectRoleName}(项目机会)`,
              id:res.projectRoleSid,
              type: 'info',
              roleType:1
            })
          })
        }
        if(obj.projectCheckList && obj.projectCheckList.length>0){
          obj.projectCheckList.forEach(res=>{
            this.gdRoleTags.push({
              name:`${res.projectRoleName}(前期项目)`,
              id:res.projectRoleSid,
              type: 'info',
              roleType:2
            })
          })
        }
      }else{

        this.approveRoleTags = []
        if(obj.approveCheckList && obj.approveCheckList.length>0){
          obj.approveCheckList.forEach(res=>{
            this.approveRoleTags.push({
              name:`${res.approvalRoleName}`,
              id:res.approvalRoleId,
              type: 'info',
              roleType:0
            })
          })
        }
        if(obj.chanceCheckList && obj.chanceCheckList.length>0){
          obj.chanceCheckList.forEach(res=>{
            this.approveRoleTags.push({
              name:`${res.projectRoleName}`,
              id:res.projectRoleSid,
              type: 'info',
              roleType:1
            })
          })
        }
        if(obj.projectCheckList && obj.projectCheckList.length>0){
          obj.projectCheckList.forEach(res=>{
            this.approveRoleTags.push({
              name:`${res.projectRoleName}`,
              id:res.projectRoleSid,
              type: 'info',
              roleType:2
            })
          })
        }
      }
    },
    addGdUser(){
      this.$refs.gdUser.openDialog()
    },
    addCsUser(type){
      this.rolueType = type
      this.selectRoleUserType = 1
      this.$refs.dialogRole.openDialog(this.nodeDic)
    },
    addApproveUser(type){
      this.selectRoleUserType = 2
      //1固定审批人2.审批角色3.指定部门负责人4.指定成员5.申请人自选6前期项目角色7项目机会角色
      if(type == 2){
        this.$refs.dialogRole.openDialog(this.nodeDic,'2',this.approveRoleTags)
      }else if(type == 6){
        this.$refs.dialogRole.openDialog(this.nodeDic,'1',this.approveRoleTags)
      }else if(type == 7){
        this.$refs.dialogRole.openDialog(this.nodeDic,'0',this.approveRoleTags)
      }

    },
    getApproveList() {
      getManagerList().then(res=>{
        if(res.code == 200){
          this.managerList = res.data
          // this.deptTypes = res.data.map(r=>{
          //   return{
          //     dictLabel:`${r.userName}(${r.nickName})`,
          //     dictValue:r.userId
          //   }
          // })
        }
      })
      getApprovalRoleList().then(
        response => {
          if(response.code == 200 && response.data.length > 0){
            //this.roleList = response.data;
            this.roleList = response.data.map(obj=>{
              return{
                dictValue: obj.approvalRoleId,
                dictLabel: obj.approvalRoleName
              }
            })
            //console.log('roleList='+JSON.stringify(this.roleList))
          }
        }
      ).catch(err=>{

      });


      getRoleList({}).then(response => {

        if(response.code == 200){
          this.systemRoleList = response.data.map(obj=>{
            return{
              dictValue: obj.deptId,
              dictLabel: obj.roleName+'('+obj.deptId+')'
            }
          })
        }
      }).catch(err=>{

      })

    }
  },

}
</script>

<style lang="scss" scoped>

//::v-deep .el-dialog{
//  width:840px!important;
//}

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

.dialog-content {
  margin-top: 15px;
  padding: 0 10px;
  display: flex;
  flex-direction: column;

  .process-title-top {
    display: flex;
    width: 100%;
    margin-bottom: 20px;
    > span:first-child {
      width: 5px;
      height: 20px;
      background-color: #0F87F0;
      border-radius: 3px;
      margin-right: 10px;
    }

    > span:last-child {
      font-size: 16px;
      color: #333;
    }
  }

  .tag-cls{
    border: 1px solid #ccc;
    border-radius: 8px;
    min-height: 45px;
    display: flex;
    align-items: center;
    padding: 0 10px;
    position: relative;
    width: 100%;
    >i{
      font-size: 30px;
      position: absolute;
      right: 5px;
      color: #ccc;
      top: 0;
      display: flex;
      align-items: center;
      cursor: pointer;
      bottom: 0;
    }
  }
  .tag-stl{
    display: flex;
    flex-wrap: wrap;
    padding-right: 30px;
    padding-bottom: 10px;
  }
  /deep/ .el-tag{
    margin-top: 10px;
  }
  .approve-type{
    display: flex;
    .approve-user,.tag-hol{
      padding: 0 10px;
      display: flex;
      align-items: center;
    }
    .tag-hol{
      color: #ccc;
    }
  }

  .table-people {
    margin: 10px 0px;
  }
}

.btn-foot {
  display: flex;
  justify-content: center;
}

/deep/ .dialog-bottom-top-line {
  height: 0px;
}

.foot-btn {
  display: flex;
  justify-content: center;
  width: 60px;
  height: 24px;
  background: #4187F2;
  border-radius: 3px;
  font-size: 11px;
  color: white;
  text-align: center;
  cursor: pointer;

  span {
    display: flex;
    align-items: center;

  }
}

/deep/ .title-top {
  padding: 10px 20px;
}

/deep/ .i-close {
  visibility: hidden;
}
.el-tag + .el-tag {
  margin-left: 10px;
}
/deep/ .el-row{
  padding: 0 !important;
}
.approve-type-list{
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-between;
}
.approve-type-main{
  /deep/ .el-form-item{
    margin-bottom: 20px !important;
  }
}
.el-icon-question{
  font-size: 20px;
  margin-left: 10px;
  cursor: pointer;
}
.user-tag-list{
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  margin-left: 120px;
  .tag-list-add{
    margin-left: 10px;
    margin-top: 10px;
  }
}
.ck-cls{
  margin-left: 10px;
  font-size: 18px;
  /deep/ .el-checkbox__label{
    font-size: 18px;
  }
}

</style>
