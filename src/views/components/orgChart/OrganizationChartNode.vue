<template>
  <table>
    <tbody>
    <tr>
      <td :colspan="datasource.children && datasource.children.length ? datasource.children.length*2 : null">
        <div class="node" :id="datasource.organzationId">
          <slot :node-data="datasource">
            <div class="title" :title="datasource.organzationName">
              <div class="leftTitle" v-bind:class="{parentTitle:type}">{{ datasource.organzationName }}</div>
              <!--更多-->
              <div class="more" title="" v-if="!type">
                <el-dropdown :hide-on-click="false"  placement="bottom-end">
                <span class="el-dropdown-link" :data-id="datasource.organzationId"><!--v-show="node.id == isTreeHandle" -->
                  <i class="el-icon-more" style="font-size:6px;color: #fff;"></i>
                </span>
                  <el-dropdown-menu slot="dropdown">
                    <!--todo 根据情况更改权限-->
                   <!-- <el-dropdown-item
                      icon="el-icon-circle-plus-outline"
                      @click.native="handleAddFnode(datasource)"
                      v-if="!datasource.nodeType"
                    >插入父级</el-dropdown-item>-->
                    <el-dropdown-item
                      icon="el-icon-circle-plus-outline"
                      v-if="!(datasource.nodeType=='1' || datasource.nodeType=='2')"
                      @click.native="handleAddSnode(datasource)"
                    >插入子节点</el-dropdown-item>
                    <el-dropdown-item
                      icon="el-icon-edit"
                      v-if="datasource.nodeType!='0'"
                      @click.native="handleUpdateNode(datasource)"
                    >编辑节点</el-dropdown-item>
                    <el-dropdown-item
                      icon="el-icon-document-copy"
                      v-if="!datasource.nodeType"
                      @click.native="handleCopyNode(datasource)"
                    >复制节点</el-dropdown-item>
                    <el-dropdown-item
                      icon="el-icon-delete"
                      v-if="!datasource.nodeType"
                      @click.native="handleDeleteNode(datasource)"
                    >删除节点</el-dropdown-item>
                  </el-dropdown-menu>
                </el-dropdown>
              </div>
            </div>
            <div class="content" v-for="item in datasource.organizationUserList">

              <el-dropdown :hide-on-click="false" style="width:100%;">
                <span class="el-dropdown-link" :data-id="datasource.organUserId" style="width:100%;font-weight: bold;"><!--v-show="node.id == isTreeHandle" -->
                  {{item.organUserName}}
                </span>
                <el-dropdown-menu slot="dropdown">
                  <!--todo 根据情况更改权限-->
                  <el-dropdown-item
                  >岗位：{{item.positionName}}</el-dropdown-item>
                  <el-dropdown-item
                  >姓名：{{item.organUserName}}</el-dropdown-item>
                  <el-dropdown-item
                  >工时费：{{item.userRate}}</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </div>
          </slot>
        </div>
      </td>
    </tr>
    <template v-if="datasource.children && datasource.children.length">
      <tr class="lines">
        <td :colspan="datasource.children.length*2">
          <div class="downLine"></div>
        </td>
      </tr>
      <tr class="lines">
        <td class="rightLine"></td>
        <template v-for="n in (datasource.children.length-1)">
          <td class="leftLine topLine"></td>
          <td class="rightLine topLine"></td>
        </template>
        <td class="leftLine"></td>
      </tr>
      <tr class="nodes">
        <td colspan="2" v-for="child in datasource.children" :key="child.organzationId">
          <node :datasource="child" :nodeTypeOptions="nodeTypeOptions" :type="type" @isrefer="isrefer"><!-- :positionOptions="positionOptions"-->
            <template v-for="slot in Object.keys($scopedSlots)" :slot="slot" slot-scope="scope">
              <slot :name="slot" v-bind="scope"/>
            </template>
          </node>

        </td>
      </tr>
    </template>

    <!--废弃-->
   <!-- <el-dialog :title="title" :visible.sync="open"  width="800px" append-to-body>
      <el-scrollbar style="max-height:470px; ">
      <div class="nodeEdit" style="max-height:450px;">
      <el-form ref="form" :model="form" :rules="rules" label-width="100px">
        <el-form-item label="节点类型" prop="nodeType">
          <el-input v-model="form.nodeType" placeholder="请输入节点类型" style="width:60%;"/>
        </el-form-item>
        <el-form-item label="节点名称" prop="nodeName">
          <el-input v-model="form.nodeName" clearable placeholder="请输入节点名称" style="width:60%;" />
        </el-form-item>
        <el-form-item label="主体名称" prop="subjectName">
          <el-input v-model="form.subjectName" clearable placeholder="请输入主体名称" style="width:60%;" />
        </el-form-item>
        <el-form-item label="负责人邀请" style="margin-bottom: 20px;">
        </el-form-item>
        <div class="handleAdd" style="width:100%;padding: 0px 25px;margin-bottom:15px;color: #3E9CFB" @click="hangdleAddPerson">
          <el-button icon="el-icon-plus" size="mini" circle style="margin-right: 15px;color: #3E9CFB;border: 1px solid #3E9CFB;"></el-button><span>添加成员</span>
        </div>

        <div v-for="item in form.nodePerson" style="width:100%;padding: 0px 25px;margin-bottom:15px;">
          <el-button icon="el-icon-minus" size="mini"  @click="handleDeletePerson(item)" circle style="margin-right: 15px;color: #3E9CFB;border: 1px solid #3E9CFB;"></el-button>
            <span class="addFormTitle">姓名：</span><el-input v-model="item.name" clearable style="width:15%;" />
            <span class="addFormTitle">手机号码：</span><el-input v-model="item.number" type="phone" clearable style="width:15%;" />
            <span class="addFormTitle">邮箱：</span><el-input v-model="item.email" clearable style="width:15%;" />
            <span class="addFormTitle">费率：</span><el-input class="inputNumber" style="width:15%;" @change="changeTotal23(scope)"  v-model="item.rate"  maxlength="15"
                                                           oninput="if(isNaN(this.value)) { this.value = null } if(this.value<0){this.value=0} if(this.value>=100){this.value=100}
                                  if(this.value.indexOf('.')>0){this.value=this.value.slice(0,this.value.indexOf('.')+3)}"></el-input>%
        </div>
      </el-form>
      </div>
      </el-scrollbar>

      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>-->

    <!--子节点编辑-->
    <el-dialog :title="title2" :visible.sync="open2"  width="1000px" append-to-body>

      <el-scrollbar style="max-height:470px; " v-show="addPerson==false">
        <div class="nodeEdit" style="max-height:450px;">
          <el-form ref="form" :model="form" :rules="rules" label-width="100px">
            <el-form-item label="节点类型" prop="organzationType">
              <!--<el-input v-model="form.nodeType" placeholder="请输入节点类型" style="width:60%;"/>-->
              <el-select v-model="form.organzationType" style="width:40%;font-weight: bold;">
                <el-option
                  v-for="item in nodeTypeOptions"
                  :key="item.dictValue"
                  :label="item.dictLabel"
                  :value="item.dictValue"
                  :disabled="form.organzationType != item.dictValue"
                  ><!--:disabled=if(form.organzationType==''){
                    return (form.organzationType == '' && item.dictValue != 'subcontract')
                  }else{
                    return form.organzationType != item.dictValue
                  }-->
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="节点名称" prop="organzationName">
              <el-input v-model="form.organzationName" clearable placeholder="请输入节点名称" style="width:40%;" />
            </el-form-item>
            <!--<el-form-item label="主体名称" prop="subjectName">
              <el-input v-model="form.subjectName" clearable placeholder="请输入主体名称" style="width:60%;" />
            </el-form-item>-->
            <el-form-item label="人员邀请" style="margin-bottom: 20px;">
            </el-form-item>
            <div class="handleAdd" style="float:left;width:100%;padding: 0px 25px;margin-bottom:15px;color: #3E9CFB">
              <div  class="handleAddInt" @click="hangdleEditPerson()">
                <el-button icon="el-icon-plus" size="mini" circle style="margin-right: 10px;color: #3E9CFB;border: 1px solid #3E9CFB;"></el-button>
                <span style="margin-right: 15px;">添加内部人员</span>
              </div>
              <div  class="handleAddExt" @click="hangdleAddPerson" style="float:left;">
                <el-button icon="el-icon-plus" size="mini" circle style="margin-right: 10px;color: #EFC585;border: 1px solid #EFC585;"></el-button>
                <span style="color: #EFC585">添加外部人员</span>
              </div>

            </div>

            <div v-for="item in form.organizationUserList" style="width:100%;padding: 0px 25px;margin-bottom:15px;">
              <el-button icon="el-icon-minus" size="mini"  @click="handleDeletePerson(item)" circle style="margin-right: 10px;color: #3E9CFB;border: 1px solid #3E9CFB;"></el-button>
              <span class="addFormTitle">姓名：</span><el-input v-model="item.organUserName" clearable style="width:12%;" :disabled="item.isSystemUser==1"/>
              <span class="addFormTitle">手机号码：</span><el-input v-model="item.organUserTel" type="phone" clearable style="width:12%;" :disabled="item.isSystemUser==1"/>
              <span class="addFormTitle">邮箱：</span><el-input v-model="item.organUserEmail" clearable style="width:12%;" :disabled="item.isSystemUser==1"/>
              <span class="addFormTitle">岗位：</span>
              <el-select v-model="item.positionId" style="width:12%;font-weight: bold;">
               <!-- <el-option
                  v-for="item in positionOptions"
                  :key="item.dictValue"
                  :label="item.dictLabel"
                  :value="item.dictValue">
                </el-option>-->
                <el-option
                  v-for="item in positionOptions"
                  :key="item.positionId"
                  :label="item.positionName"
                  :value="item.positionId">
                </el-option>
              </el-select>
              <!--<el-input v-model="item.positionId" clearable style="width:15%;"/>-->
              <span class="addFormTitle">工时率：</span><el-input class="inputNumber" style="width:12%;"  v-model="item.userRate"  maxlength="15"
                                                             oninput="if(isNaN(this.value)) { this.value = null } if(this.value<0){this.value=0}
                                  if(this.value.indexOf('.')>0){this.value=this.value.slice(0,this.value.indexOf('.')+3)}"></el-input>%
            </div>
          </el-form>
        </div>
      </el-scrollbar>
      <div slot="footer" class="dialog-footer" v-show="addPerson==false">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>

        <div class="nodeEdit" style="max-height:450px;" v-if="addPerson==true">

          <el-row style="padding: 0 15px 0 15px;color:#eeeeee;margin-bottom: 15px">
            <div style="width:100%;">
              <div style="float:left;width:50%;color:#333;font-size:16px;font-weight: bold;">{{title3}}</div>
              <div style="float:left;width:50%;">
              <el-button
                icon="el-icon-back"
                size="mini"
                @click="returnEditNode()"
                style="float:right;"
              >返回</el-button>
              </div>
            </div>
            <el-form :model="queryParams" ref="queryForm" :inline="true" label-width="68px" @submit.native.prevent>
              <el-form-item prop="searchValue">
                <el-input
                  placeholder="查询姓名、手机号、邮箱"
                  clearable
                  size="small"
                  style="width: 200px"
                  v-model="queryParams.searchValue"
                  @keyup.enter.native="handleQuery"
                />
              </el-form-item>
              <!--<el-button type="primary" icon="el-icon-search" size="small" @click="handleQuery" style="height:32px;">查询</el-button>-->
              <el-form-item>
                <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery" style="height:30px;">查询</el-button>
              </el-form-item>
            </el-form>
          </el-row>
          <el-table v-loading="loading" :data="userList" height="300" @selection-change="handleSelectionChange">
            <el-table-column type="selection" width="55" align="center"/>
            <el-table-column label="姓名" prop="nickName" :show-overflow-tooltip="true"></el-table-column>
            <el-table-column label="手机号码" prop="phonenumber" width="120"/>
            <el-table-column label="部门" prop="dept.deptName" :show-overflow-tooltip="true"/>
            <el-table-column label="职务" prop="postName" :show-overflow-tooltip="true"/>
            <el-table-column label="角色" prop="roleName" :show-overflow-tooltip="true"></el-table-column>
            <el-table-column label="邮箱" prop="email" :show-overflow-tooltip="true"/>

          </el-table>
          <pagination
            v-show="total>0"
            :total="total"
            :page.sync="queryParams.pageNum"
            :limit.sync="queryParams.pageSize"
            @pagination="getList"
          />

        </div>
        <div slot="footer" class="dialog-footer" v-if="addPerson==true">
          <el-button type="primary" @click="submitForm2">确 定</el-button>
          <el-button @click="cancel2">取 消</el-button>
        </div>



    </el-dialog>

    </tbody>
  </table>


</template>

<script>
  /*import ElButton from "../../../../node_modules/element-ui/packages/button/src/button.vue";*/

  import data from './data';
  import methods from './methods';

  export default {
    components: {
      /*ElButton*/
    },
    name: 'node',
    props: {
      type: {
        type: String,
        required: false
      },
      datasource: {
        type: Object,
        required: true
      },
     /* positionOptions: {
        type: Array,
        required: true
      },*/
      nodeTypeOptions: {
        type: Array,
        required: true
      },
    },
    data:function () {
      return data.init(this);
    },
    watch:{
     /* 'positionOptions'(val){
        this.positionOptions = val;

      },*/
      /*'nodeTypeOptions'(val){
        this.nodeTypeOptions = val;
      }*/
      /*'isrefer'(val){
       // alert(val);
        this.$emit('isrefer',val);
      }*/
    },
    created(){
      this.queryId = this.$route.query.projectSid;
    },
    methods:methods,
  };
</script>
<style scoped lang="scss">
  .handleAdd span:hover{
    cursor: pointer;
    color: #1989FA;
  }
  .handleAddInt{
    float:left;
  }
  .handleAddInt button:hover{
    color: #1989FA;
    border-color: #badcfe;
    background-color: #e8f3ff;
  }
  .handleAddInt span:hover{
    cursor: pointer;
    color: #1989FA;
  }
  .handleAddExt button:hover{
    color: #EFC585;
    border-color: #EFC585;
    background-color: #FEF2D7;
  }
  .handleAddExt span:hover{
    cursor: pointer;
    color: #EFC585;
  }
  .addFormTitle{
    width:10px;
  }
</style>
