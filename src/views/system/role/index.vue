<template>
  <div class="app-box">
    <div class="role-title">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item ><span class="crumb-first">系统管理</span></el-breadcrumb-item>
        <el-breadcrumb-item><span  class="crumb-two">系统角色设置</span></el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <el-row :gutter="20">
      <el-col :span="5" :xs="24" class="tree-left">
        <div>
          <p
            class="add-role" @click="handleAdd"
            v-hasPermi="['system:role:add']"><i class="el-icon-circle-plus-outline"></i>&nbsp;新增角色</p>
          <el-input
            v-model="roleTypeSearch"
            size="small"
            prefix-icon="el-icon-search"
            clearable
            placeholder="检索内容"/>
          <div class="head-container">
              <el-tree
                style="max-height: 700px; overflow: auto;"
                :data="treeRoleListFilter"
                :props="defaultProps"
                :expand-on-click-node="false"
                :filter-node-method="filterNode"
                :highlight-current="showTree"
                ref="tree"
                default-expand-all
                @node-click="handleDeptRoleTreeClick"
                node-key="id"
              >
            <span class="custom-tree-node" slot-scope="{ node, data }" style="width: calc(100% - 14px);">
            <span class="fl" style="width: calc(100% - 19px);height: 30px;line-height: 30px;white-space: nowrap;cursor:pointer;overflow: hidden;text-overflow: ellipsis;">
              <i v-if="data.type == 'role'" class="el-icon-user"></i>
              <span :title="node.label" style="width:100%;height: 30px;line-height: 30px;white-space: nowrap;cursor:pointer;overflow: hidden;text-overflow: ellipsis;"><!--style="width: 100%;height: 30px;line-height: 30px"-->
                <i v-if="node.level <= 2 && data.type == 'company'" style="color: #48A8F1;" class="el-icon-office-building"></i>
                <i v-if="node.level > 2 && data.type == 'company'" style="color: #48A8F1;" class="el-icon-folder"></i>
                {{ node.label }}
              </span>
            </span>
            <span>
              <el-dropdown v-if="data.nodeType == 'role'">
                <span class="el-dropdown-link" :data-id="node.id">
                  <i class="el-icon-more el-icon--right" style="color: #D3D3D3"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item
                    icon="el-icon-document-copy"
                    @click.native="copyHandle(data.id)"
                    v-hasPermi="['system:role:add']"
                  >复制角色</el-dropdown-item>
                  <el-dropdown-item
                    icon="el-icon-delete"
                    @click.native="handleDelete(data)"
                    v-hasPermi="['system:role:remove']"
                  >删除角色</el-dropdown-item>
                  <el-dropdown-item
                    icon="el-icon-edit"
                    @click.native="handleUpdate(data.id)"
                  >编辑</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </span>
          </span>
              </el-tree>
            </div>
        </div>
      </el-col>

      <el-col :span="19" :xs="24" class="table-right">
        <el-row :gutter="10" class="role-handle">
          <el-col :span="16" :xs="24" class="handle-title"><span style="color: #ffffff">1</span>{{ selectCompany }}-{{ selestTitle }}</el-col>
          <el-col :span="8" :xs="24" class="text-right" v-show="tabIndex === '0'">
              <el-button
                type="danger"
                icon="el-icon-delete"
                size="mini"
                :disabled="multiple"
                @click="removeUserHandle"
                v-hasPermi="['system:role:remove']"
              >移除成员</el-button>
              <el-button
                type="primary"
                icon="el-icon-plus"
                size="mini"
                @click.native="handleaddUser"
                v-hasPermi="['system:role:add']"
              >添加成员</el-button>
          </el-col>
          <el-col :span="8" :xs="24" class="text-right" v-show="tabIndex === '1'">
            <el-button type="primary" size="small" @click.native="saveForm">保存</el-button>
          </el-col>
          <el-col :span="8" :xs="24" class="text-right" v-show="tabIndex === '2'">
            <el-button type="primary" size="small" @click.native="saveDataScope">保存</el-button>
          </el-col>
        </el-row>
        <div style="padding: 20px;">
          <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="角色成员" name="first">
              <el-table v-loading="loading" :data="roleList" @selection-change="handleSelectionChange">
                <el-table-column type="selection" width="55" align="center" />
                <el-table-column
                  type="index"
                  label="序号"
                  width="80">
                  <template scope="scope">
                    <span>{{(queryParams.pageNum - 1) * queryParams.pageSize + scope.$index + 1}}</span>
                  </template>
                </el-table-column>
                <el-table-column label="姓名" prop="nickName" :show-overflow-tooltip="true"  />
                <el-table-column label="所属部门" align="center" prop="dept.deptName"/>
                <el-table-column label="手机号码" align="center" prop="phonenumber"/>
                <el-table-column label="电子邮箱" align="center" prop="email" :show-overflow-tooltip="true"/>
              </el-table>

              <pagination
                v-show="total>0"
                :total="total"
                :page.sync="queryParams.pageNum"
                :limit.sync="queryParams.pageSize"
                @pagination="getList"
              />
            </el-tab-pane>
            <el-tab-pane label="功能权限" name="second">
              <el-checkbox @change="checkAll" style="padding-left: 20px; padding-bottom: 4px;">全选</el-checkbox>
              <el-tree
                :data="menuOptions"
                show-checkbox
                ref="menu"
                node-key="id"
                empty-text="加载中，请稍后"
                :props="defaultProps"
              ></el-tree>
            </el-tab-pane>
            <el-tab-pane label="数据权限" name="third">

              <div class="dept">
                <el-radio v-model="radio" label="1">全部数据权限</el-radio><br>
                <!-- <el-radio v-model="radio" label="2">自定数据权限</el-radio><br>
                  <el-tree
                    v-show="radio === '2'"
                    :data="deptOptions"
                    show-checkbox
                    ref="_data"
                    node-key="id"
                    empty-text="加载中，请稍后"
                    :props="defaultProps"
                  ></el-tree> -->
                <el-radio v-model="radio" label="3">本部门数据权限</el-radio><br>
                <el-radio v-model="radio" label="4">本部门及以下数据权限</el-radio><br>
                <el-radio v-model="radio" label="5">仅本人数据权限</el-radio><br>
              </div>
            </el-tab-pane>
          </el-tabs>
        </div>
      </el-col>
    </el-row>

    <!-- 添加或修改角色配置对话框 -->
    <el-dialog :title="title" :visible.sync="open"  append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="140px">
        <el-row>
          <el-col :span="12">
            <el-form-item label="系统角色名称" prop="roleName">
              <el-input v-model="form.roleName" placeholder="请输入系统角色名称" />
              <el-image
                v-show="!form.roleName"
                class="must-img"
                :src="require('@/assets/image/must_input_left.png')" ></el-image>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="权限字符" prop="roleKey">
              <el-input v-model="form.roleKey" placeholder="请输入权限字符" />
              <el-image
                v-show="!form.roleKey"
                class="must-img"
                :src="require('@/assets/image/must_input_left.png')" ></el-image>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-form-item label="所属组织" prop="deptNames" v-if="form.roleId === undefined">
            <el-input v-model="form.deptNames" :disabled="true" placeholder="请选择所属组织" />
            <el-image
              v-show="!deptSearch"
              class="must-img"
              :src="require('@/assets/image/must_input_left.png')" ></el-image>
          </el-form-item>
        </el-row>
        <div style="display: flex;width: 100%;justify-content: center" v-if="form.roleId === undefined">
          <div  class="dept-left">
            <div class="serach-top">
              <el-input
                v-model="deptSearch"
                size="small"
                prefix-icon="el-icon-search"
                clearable
                placeholder="请输入组织名称"/>
              <el-button class="search-btn" type="primary">搜索</el-button>
            </div>
            <div class="head-container">
              <el-tree
                v-model="form.addDeptIds"
                style="height:300px; overflow:auto;"
                :data="companyDeptOptions"
                show-checkbox
                :filter-node-method="filterNode"
                ref="deptTree"
                node-key="id"
                check-strictly
                :props="defaultProps"
                default-expand-all
                @check="handleDeptNodeClick"
              ></el-tree>
            </div>
          </div>
        </div>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>

    <!-- 分配角色数据权限对话框 -->
    <el-dialog :title="title" :visible.sync="openDataScope" width="500px" append-to-body>
      <el-form :model="form" label-width="80px">
        <el-form-item label="角色名称">
          <el-input v-model="form.roleName" :disabled="true" />
        </el-form-item>
        <el-form-item label="权限字符">
          <el-input v-model="form.roleKey" :disabled="true" />
        </el-form-item>
        <el-form-item label="权限范围">
          <el-select v-model="form.dataScope">
            <el-option
              v-for="item in dataScopeOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="数据权限" v-show="form.dataScope == 2">
          <el-tree
            :data="deptOptions"
            show-checkbox
            default-expand-all
            ref="dept"
            node-key="id"
            empty-text="加载中，请稍后"
            :props="defaultProps"
          ></el-tree>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitDataScope">确 定</el-button>
        <el-button @click="cancelDataScope">取 消</el-button>
      </div>
    </el-dialog>


    <!-- 添加角色 -->
    <el-dialog title="添加成员" :visible.sync="openUser" width="850px" append-to-body>
      <el-form ref="form" :model="formUser" label-width="80px" style="width: 50%; height: auto; text-align: center;margin-left:22%;">
        <el-form-item label="角色名称">
          <el-input :disabled="true"  v-model="queryParams.roleName" style="width: 340px;"  placeholder="请输入角色名称" />
        </el-form-item>
<!--        <el-form-item label="角色成员" >-->
<!--          <el-input v-model="formUser.roleMember" style="width: 200px;"/>-->
<!--          <el-button type="primary" >搜索</el-button>-->
<!--        </el-form-item>-->
      </el-form>

      <template>
        <el-row>
          <el-col :span="6" class="dept-tree">
            <el-tree
              :data="companyDeptOptions"
              :props="defaultProps"
              :expand-on-click-node="false"
              ref="tree"
              style="height: 300px;"
              default-expand-all
              @node-click="handleNodeClick"
            ></el-tree>
          </el-col>
          <el-col :span="18">
            <el-transfer
              filterable
              :titles="['用户列表', '已选择']"
              :filter-method="filterMethod"
              v-model="valueTran"
              :data="dataTran"
              :props="{
                key: 'userId',
                label: 'nickName'
              }"
            ></el-transfer>
          </el-col>
        </el-row>
      </template>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="addUserHandle">确 定</el-button>
        <el-button @click="openUser = false">取 消</el-button>
      </div>
    </el-dialog>
    <select-user ref="selectUser" :is-single="false" @onSelectData="onSelectData"></select-user>
  </div>
</template>

<script>
import { copyRole,listRole, getRole, delRole, addRole, updateRole, exportRole, dataScope, changeRoleStatus,typeRole,removeUserFromRole,addUserFromRole } from "@/api/system/role";
import { treeselect as menuTreeselect, roleMenuTreeselect } from "@/api/system/menu";
import { companyTreeSelect, roleDeptTreeselect } from "@/api/system/dept";
import SelectUser from './publice-select-user'

export default {
  name: "Role",
  components:{
    SelectUser
  },
  data() {
    return {
      // 选人 - 角色数据
      dataTran: [],
      valueTran: [],
      formUser: {
        roleName: '',
        roleMember: '',
      },
      // tab Index
      tabIndex: '0',
      // 遮罩层
      loading: true,
      // 选中数组
      ids: [],
      // 非单个禁用
      single: true,
      // 非多个禁用
      multiple: true,
      // 总条数
      total: 0,
      // 角色表格数据
      roleList: [],
      // 弹出层标题
      title: "",
      // 是否显示弹出层
      open: false,
      // 是否显示弹出层
      openUser: false,
      // 是否显示弹出层（数据权限）
      openDataScope: false,
      // 日期范围
      dateRange: [],
      // 状态数据字典
      statusOptions: [],
      // 左侧角色列表树
      treeRoleList: [],
      treeRoleListFilter:[],
      // 当前选中的公司名称
      selectCompany: '',
      // 当前选中的部门
      selestTitle: '',
      // 当前选中的tabs
      selectTabsName: '',
      // 数据范围选项
      dataScopeOptions: [
        {
          value: "1",
          label: "全部数据权限"
        },
        {
          value: "2",
          label: "自定数据权限"
        },
        {
          value: "3",
          label: "本部门数据权限"
        },
        {
          value: "4",
          label: "本部门及以下数据权限"
        },
        {
          value: "5",
          label: "仅本人数据权限"
        }
      ],
      dataScopeOptions3: [],
      // 菜单列表
      menuOptions: [],
      // 部门列表
      deptOptions: [],
      // 公司级部门列表
      companyDeptOptions: [],
      radio: null,
      // 查询参数
      roleId: '',
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        roleName: undefined,
        roleIds: undefined,
        roleKey: undefined,
        deptIds: undefined,
        status: undefined,
        searchValue: undefined,
        beginTime: undefined,
        endTime: undefined,
        deptId: '',
        deptName: ''
      },
      queryParams2: {
        pageNum: 1,
        pageSize: 1000,
        roleName: undefined,
        roleIds: undefined,
        roleKey: undefined,
        status: undefined,
        searchValue: undefined,
        beginTime: undefined,
        endTime: undefined,
        deptId: '',
        deptName: ''
      },
      // 角色列表搜索
      roleTypeSearch:'',
      // 角色列表搜索
      deptSearch:'',
      // 当前激活的tab页
      activeName: 'first',
      // 表单参数
      form: {},
      defaultProps: {
        children: "children",
        label: "label"
      },
      // 表单校验
      rules: {
        roleName: [
          { required: true, message: "角色名称不能为空", trigger: "blur" }
        ],
        roleKey: [
          { required: true, message: "权限字符不能为空", trigger: "blur" }
        ],
        roleSort: [
          { required: true, message: "角色顺序不能为空", trigger: "blur" }
        ],
        deptNames: [
          { required: true, message: "所属组织不能为空", trigger: "blur" }
        ]
      },
      showTree:true
    };
  },
  watch: {
    // 根据名称筛选部门树
    roleTypeSearch(val) {
      this.$refs.tree.filter(val);
    },
    deptSearch(val) {
      this.$refs.deptTree.filter(val);
    }
  },
  created() {
    this.getRoleType();
    this.getCompanyTreeSelect();
    this.getDicts("sys_normal_disable").then(response => {
      this.statusOptions = response.data;
    });
  },
  methods: {
    // 筛选节点
    filterNode(value, data, node) {
      if (!value) return true;
      if (data.label.indexOf(value) !== -1) {
        return true;
      }
      return this.checkBelongToChooseNode(value, data, node);
    },
    // 判断传入的节点是不是选中节点的子节点
    checkBelongToChooseNode(value, data, node) {
      const level = node.level;
      // 如果传入的节点本身就是一级节点就不用校验了
      if (level === 1) {
        return false;
      }
      // 先取当前节点的父节点
      let parentData = node.parent;
      // 遍历当前节点的父节点
      let index = 0;
      while (index < level - 1) {
        // 如果匹配到直接返回
        if (parentData.data.label.indexOf(value) !== -1) {
          return true;
        }
        // 否则的话再往上一层做匹配
        parentData = parentData.parent;
        index ++;
      }
      // 没匹配到返回false
      return false;
    },
    /** 搜索*/
    filterMethod(query, item) {
      return item.nickName.indexOf(query) > -1;
    },
    // 选择公司或角色
    handleDeptRoleTreeClick(data,e) {
      if (data.nodeType !== 'role') return;
      this.queryParams.deptId = e.parent.data.id;
      this.selectCompany = e.parent.data.label;
      this.switchRole(data.label, data.id, data.nodeType, this.selectCompany);
    },
    // 选人节点单击事件
    handleNodeClick(data,e) {
      this.queryParams2.deptId = data.id;
      this.getList2();
    },
    handleDeptNodeClick(e,data) {
      let checkDeptName = "";
      this.$refs.deptTree.getCheckedNodes().forEach(item => {
        checkDeptName += item.label + ",";
      });
      this.form.deptNames=checkDeptName;
    },
    /** 添加成员*/
    addUserHandle() {
      if (this.valueTran.length > 0) {
        let usersIds = [...this.valueTran].join(',')
        this.openUser = false
        addUserFromRole(this.queryParams.roleIds,usersIds).then(response => {
          if (response.code === 200) {
            this.msgSuccess("添加成功");
            this.getList();
          }
        })
      } else {
        this.openUser = false
      }
    },
    onSelectData(list){
      this.valueTran = JSON.parse(JSON.stringify(list))
      if (this.valueTran.length > 0) {
        let usersIds = [...this.valueTran].join(',')
        this.openUser = false
        addUserFromRole(this.queryParams.roleIds,usersIds).then(response => {
          if (response.code === 200) {
            this.msgSuccess("添加成功");
            this.getList();
          }
        })
      } else {
        this.openUser = false
      }
    },
    /** 移除成员*/
    removeUserHandle() {
      let ids = [...this.ids].join(',');
      removeUserFromRole(this.queryParams.roleIds,ids).then(response => {
        if (response.code === 200) {
          this.msgSuccess("移除成功");
          this.getList();
        }
      })
    },
    /* 添加角色 */
    handleaddUser() {
      this.valueTran = [];
      // this.queryParams.deptId = undefined;
      // this.queryParams.deptName = undefined;
      // this.openUser = true;
      // this.getList2();

      this.$refs.selectUser.openDialog(this.queryParams.roleName)
    },
    /* 复制角色 */
    copyHandle(roleId) {
      copyRole(roleId).then(
        response => {
          if (response.code === 200) {
            this.msgSuccess("复制成功");
            this.getList();
            this.getRoleType();
          }
        }
      );
    },
    /*查询角色列表*/
    getRoleType() {
      // this.loading = true;
      typeRole().then(
        response => {
          this.treeRoleList = response.data;
          this.treeRoleListFilter = [...this.treeRoleList];
          this.treeRoleList.forEach(item => {
            if (this.queryParams.roleIds != undefined) {
              return;
            }
            if (item.children !== undefined) {
              item.children.forEach(child => {
                if(child.nodeType === 'role') {
                  this.queryParams.roleName = child.label;
                  this.queryParams.roleIds= child.id;
                  this.queryParams.deptId = item.id;
                  this.selectCompany = item.label;
                  return;
                }
              })
            }
          })
          if (this.queryParams.roleName != undefined && this.queryParams.roleIds != undefined){
            this.switchRole(this.queryParams.roleName,this.queryParams.roleIds, 'role', this.selectCompany);
          }
          // this.getList();
          this.loading = false;
        }
      );
    },
    /** 根据角色类型查询人员列表 */
    getList() {
      this.loading = true;
      let queryParams = this.queryParams;
      queryParams.deptId = undefined;
      queryParams.deptName = undefined;
      listRole(queryParams).then(
        response => {
          this.roleList = response.rows;
          this.total = response.total;
          this.loading = false;
        }
      );
    },
    /** 选人 - 根据角色类型查询人员列表 */
    getList2() {
      listRole(this.queryParams2).then(
        response => {
          this.dataTran = response.rows;
        }
      );
    },
    /** 查询菜单树结构 */
    getMenuTreeselect() {
      menuTreeselect().then(response => {
        this.menuOptions = response.data;
        this.treeRoleList = response.data;
      });
    },
    /** 查询公司级部门树结构 */
    getCompanyTreeSelect() {
      companyTreeSelect().then(response => {
        this.companyDeptOptions = response.data;
      });
    },
    // 所有菜单节点数据
    getMenuAllCheckedKeys() {
      // 目前被选中的菜单节点
      let checkedKeys = this.$refs.menu.getHalfCheckedKeys();
      // 半选中的菜单节点
      let halfCheckedKeys = this.$refs.menu.getCheckedKeys();
      checkedKeys.unshift.apply(checkedKeys, halfCheckedKeys);
      return checkedKeys;
    },
    // 所有部门节点数据
    getDeptAllCheckedKeys() {
      // 目前被选中的部门节点
      let checkedKeys = this.$refs._data.getHalfCheckedKeys();
      // 半选中的部门节点
      let halfCheckedKeys = this.$refs._data.getCheckedKeys();
      checkedKeys.unshift.apply(checkedKeys, halfCheckedKeys);
      return checkedKeys;
    },
    /** 根据角色ID查询菜单树结构 */
    getRoleMenuTreeselect(roleId) {
      this.loading = true;
      roleMenuTreeselect(roleId).then(response => {
        this.menuOptions = response.menus;
        this.$refs.menu.setCheckedKeys(response.checkedKeys);
        this.loading = false;
      });
    },
    /** 根据角色ID查询部门树结构 */
    getRoleDeptTreeselect(roleId) {
      roleDeptTreeselect(roleId).then(response => {
        this.deptOptions = response.depts;
        this.$refs._data.setCheckedKeys(response.checkedKeys);
      });
    },
    // 角色状态修改
    handleStatusChange(row) {
      let text = row.status === "0" ? "启用" : "停用";
      this.$confirm('确认要"' + text + '""' + row.roleName + '"角色吗?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(function() {
          return changeRoleStatus(row.roleId, row.status);
        }).then(() => {
          this.msgSuccess(text + "成功");
        }).catch(function() {
          row.status = row.status === "0" ? "1" : "0";
        });
    },
    // 取消按钮
    cancel() {
      this.open = false;
      this.reset();
    },
    // 取消按钮（数据权限）
    cancelDataScope() {
      this.openDataScope = false;
      this.reset();
    },
    // 表单重置
    reset() {
      // if (this.$refs.menu != undefined) {
      //   this.$refs.menu.setCheckedKeys([]);
      // }
      this.form = {
        roleId: undefined,
        roleName: undefined,
        roleKey: undefined,
        roleSort: 0,
        addDeptIds: [],
        status: "0",
        menuIds: [],
        deptIds: [],
        deptNames: '',
        remark: undefined
      };
      this.resetForm("form");
    },
    /** 搜索按钮操作 */
    handleQuery() {
      this.queryParams.pageNum = 1;
      this.getList();
    },
    /** 重置按钮操作 */
    resetQuery() {
      this.dateRange = [];
      this.resetForm("queryForm");
      this.handleQuery();
    },
    // 多选框选中数据
    handleSelectionChange(selection) {
      this.ids = selection.map(item => item.userId)
      this.single = selection.length!=1
      this.multiple = !selection.length
    },
    /** 新增按钮操作 */
    handleAdd() {
      this.getCompanyTreeSelect();
      this.reset();
      // this.getMenuTreeselect();
      this.open = true;
      this.title = "新增角色";

    },
    /** 修改按钮操作 */
    handleUpdate(roleId) {
      this.reset();
      // const roleId = row.roleId || this.ids
      // this.$nextTick(() => {
      //   this.getRoleMenuTreeselect(roleId);
      // });
      getRole(roleId).then(response => {
        this.form = response.data;
        this.open = true;
        this.title = "编辑";
        this.getRoleType();
      });

    },
    /** 分配数据权限操作 */
    handleDataScope(row) {
      // this.reset();
      // this.$nextTick(() => {
      //   this.getRoleDeptTreeselect(row.roleId);
      // });
      // getRole(row.roleId).then(response => {
      //   this.form = response.data;
      //   console.log(this.form)
      //   this.openDataScope = true;
      //   this.title = "分配数据权限";
      // });sasasaassas
      this.$nextTick(() => {
        this.getRoleDeptTreeselect(this.queryParams.roleIds);
      });
      getRole(this.queryParams.roleIds).then(response => {
        this.form = response.data;
        this.radio = this.form.dataScope;
      });
    },
    /** 提交按钮（功能权限） */
    submitForm: function() {
      if (this.form.roleId == undefined) {
        this.form.addDeptIds = this.$refs.deptTree.getCheckedKeys();
      }
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.roleId != undefined) {
            this.form.menuIds = this.getMenuAllCheckedKeys();
            updateRole(this.form).then(response => {
              if (response.code === 200) {
                this.msgSuccess("修改成功");
                this.open = false;
                this.getList();
                this.getRoleType();
              }
            });
          } else {
            // this.form.menuIds = this.getMenuAllCheckedKeys();
            addRole(this.form).then(response => {
              if (response.code === 200) {
                this.msgSuccess("新增成功");
                this.open = false;
                this.getList();
                this.getRoleType();
              }
            });
          }
        }
      });
    },
    /** 保存按钮（功能权限） */
    saveForm: function() {
      let form  = JSON.parse(JSON.stringify(this.form))
      getRole(this.queryParams.roleIds).then(response => {
        form = response.data;
        form.menuIds = this.getMenuAllCheckedKeys();
        form.roleId = this.queryParams.roleIds;
        updateRole(form).then(response => {
          if (response.code === 200) {
            this.msgSuccess("修改成功");
          }
        });
      });

    },
    /** 提交按钮（数据权限） */
    submitDataScope: function() {
      if (this.form.roleId != undefined) {
        this.form.deptIds = this.getDeptAllCheckedKeys();
        dataScope(this.form).then(response => {
          if (response.code === 200) {
            this.msgSuccess("修改成功");
            this.openDataScope = false;
            this.getList();
          }
        });
      }
    },
    /** 提交按钮（数据权限） */
    saveDataScope: function() {
      let form = JSON.parse(JSON.stringify(this.form));
      // form.deptIds = this.getDeptAllCheckedKeys();
      form.dataScope = this.radio;
      // this.form.deptIds = this.getDeptAllCheckedKeys();
      dataScope(form).then(response => {
        if (response.code === 200) {
          this.msgSuccess("修改成功");
          this.openDataScope = false;
          // this.getList();
        }
      });
    },
    /** 删除按钮操作 */
    handleDelete(item) {
      let roleIds = item.id;
      let roleName = item.label;
      // const roleIds = row.roleId || this.ids;
      this.$confirm('是否确认删除角色名称为"' + roleName + '"的数据项?', "警告", { //删除后，角色下的成员将会变成“普通员工”。
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(function() {
          return delRole(roleIds);
        }).then(() => {
          // this.getList();
          this.getRoleType();
          this.msgSuccess("删除成功");
        }).catch(function() {});
    },
    /** 导出按钮操作 */
    handleExport() {
      const queryParams = this.queryParams;
      this.$confirm('是否确认导出所有角色数据项?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(function() {
          return exportRole(queryParams);
        }).then(response => {
          this.download(response.msg);
        }).catch(function() {});
    },
    // tab 切换
    handleClick(tab, event) {
      this.tabIndex = tab.index;
      if (this.tabIndex === '0') {
        this.selectTabsName = '角色成员';
        this.getList()
      }
      if (tab.index === '1') {
        this.selectTabsName = '功能权限';
        this.getRoleMenuTreeselect(this.queryParams.roleIds)
      }
      if (tab.index == '2') {
        this.selectTabsName = '数据权限';
        this.handleDataScope()
      }
    },
    // 左侧树切换
    switchRole(roleName,roleId,type,deptName) {
      if (type !== 'role') return;
      this.selestTitle = roleName;
      this.queryParams.pageNum = 1;
      this.queryParams.roleName = roleName;
      this.queryParams.roleIds = roleId;
      this.selectCompany = deptName;
      if (this.tabIndex === '0') {
        this.selectTabsName = '角色成员';
        this.getList();
      }
      if (this.tabIndex === '1') {
        this.selectTabsName = '功能权限';
        this.getRoleMenuTreeselect(this.queryParams.roleIds);
      }
      if (this.tabIndex === '2') {
        this.selectTabsName = '数据权限';
        this.handleDataScope();
      }
    },
    checkAll() {
      if (event.target.checked) {
        this.$refs.menu.setCheckedNodes(this.menuOptions);
      } else {
        this.$refs.menu.setCheckedNodes([]);
      }
    }
  }
};
</script>
<style scoped lang="scss">
  .app-box {
    margin: 20px;
    background: #ffffff;
    padding: 20px 0;
    .role-title {
      padding: 0 20px 20px 20px;
      // border-bottom: 1px solid #eeeeee;
      font-size: 20px;
      color: #555555;
    }
    .tree-left {
      padding-top: 15px;
      padding-left: 20px!important;
      border-right: 1px solid #eeeeee;
      min-height: calc(100vh - 200px);
      .add-role {
        font-size: 14px;
        color: #409EFF;
        cursor: pointer;
      }
      .role-item {
        font-size: 14px;
        color: #606266;
        cursor: pointer;
        margin: 20px 0;
        .role-name {
          margin: 0 25px 0 10px;
        }
        .fl {
          &:hover {
            color: #409EFF;
          }
        }
      }
    }
    .table-right {
      padding: 15px 0 0 0!important;
      .role-handle {
        padding: 0 30px 10px 15px;
        border-bottom: 1px solid #eeeeee;
        /*margin-bottom: 10px;*/
        margin: 0 0 10px 0!important;
        .handle-title{
          font-size: 20px;
          line-height: 36px;
        }
      }
      .dept  {
        .el-radio {
          margin-top: 20px;
        }
        .el-radio:nth-child(1) {
          margin-top: 0;
        }
        .el-tree {
          margin: 10px 0 10px 20px;
        }
      }
    }
  }
  /*控制滑动条*/
/deep/ .el-transfer__buttons{
  width:91px !important;
  margin-right: 30px !important;
}
/deep/ .el-button+.el-button{
    margin-left:0px;
  }
</style>
<style lang="scss" scoped>
::v-deep .el-dialog {
  width: 984px !important;
}
  .dept-tree .el-tree {
    height: 90px;
    overflow: auto;
    margin-right: 20px;
    border: 1px solid #eeeeee;
    border-radius: 4px;
  }
  .pagination-container{
    height:50px;
  }
  .el-checkbox__inner,.el-input__inner,.el-radio__inner{
    border:1px solid #ccc;
  }


  .must-img{
    position: absolute;
    top: 50%;
    height: 90%;
    left: 0;
    width: 3px;
    margin-top: -20px;
  }
  .dept-left{
    display: flex;
    flex-direction: column;
    box-shadow: #ddd 1px 1px 18px;
    padding: 15px;
    border-radius: 8px;
    width: 550px;
    >span{
      color: #333333;
      font-size: 16px;
      margin-bottom: 10px;
    }
    .serach-top{
      display: flex;
      align-items: center;


      .search-btn{
        margin-left: 10px;
      }
    }
    ::-webkit-scrollbar {
      display: none; /* Chrome Safari */
    }
    scrollbar-width: none;
  }

 /deep/ .el-pagination {
    text-align: right!important;
    padding: 0 !important;
  }

</style>

