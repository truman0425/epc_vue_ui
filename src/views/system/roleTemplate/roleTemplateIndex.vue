<template>
  <div class="app-box">
    <!-- <div class="role-title">角色模版管理</div> -->
    <el-row :gutter="20">
      <el-col :span="5" :xs="24" class="tree-left">
        <div>
          <p
            class="add-role" @click="handleAdd"
            v-hasPermi="['system:roleTemplate:add']"><i class="el-icon-circle-plus-outline"></i>&nbsp;添加系统角色模版</p>
          <el-input
            v-model="roleTypeSearch"
            size="small"
            prefix-icon="el-icon-search"
            clearable
            placeholder="请输入系统角色模版名称"/>
          <div style="max-height: 700px; overflow: auto;">
            <!-- v-for="(item,index) of treeRoleList"-->
            <p
              class="role-item clearfix"
              v-for="(item,index) of treeRoleListFilter"
              :key="index"
              ref="tree"
              @click="switchRole(item.roleName,item.roleId)">
              <span class="fl" style="width: calc(100% - 19px);height: 30px;line-height: 30px;white-space: nowrap;cursor:pointer;overflow: hidden;text-overflow: ellipsis;">
                <i class="el-icon-user"></i>
                <span class="role-name" :title="item.roleName" style="width:100%;height: 30px;line-height: 30px;white-space: nowrap;cursor:pointer;overflow: hidden;text-overflow: ellipsis;">
                  {{ item.roleName }}
                </span>
                <!-- <span :title="item.userCount">
                  {{ item.userCount }}
                </span> -->
              </span>
              <span class="fr">
                <span>
                  <el-dropdown :hide-on-click="false">
                    <span class="el-dropdown-link">
                      <i class="el-icon-more el-icon--right" style="color: #D3D3D3;line-height: 30px;"></i>
                    </span>
                    <el-dropdown-menu slot="dropdown">
                      <el-dropdown-item
                        icon="el-icon-document-copy"
                        @click.native="copyHandle(item.roleId)"
                        v-hasPermi="['system:dept:add']"
                      >复制节点</el-dropdown-item>
                      <el-dropdown-item
                        icon="el-icon-delete"
                        @click.native="handleDelete(item)"
                        v-hasPermi="['system:roleTemplate:remove']"
                      >删除节点</el-dropdown-item>
                      <el-dropdown-item
                        icon="el-icon-edit"
                        @click.native="handleUpdate(item.roleId)"
                      >编辑</el-dropdown-item>
                    </el-dropdown-menu>
                  </el-dropdown>
                </span>
              </span>
            </p>
          </div>
        </div>
      </el-col>

      <el-col :span="19" :xs="24" class="table-right">
        <el-row :gutter="10" class="role-handle">
          <el-col :span="10" :xs="24" class="handle-title"><span style="color: #ffffff">1</span>{{isSetup}}系统角色模版-{{ selestTitle }}</el-col>
          <el-col :span="14" :xs="24" class="text-right" v-show="tabIndex === '0'">
            <el-button type="primary" size="small" @click.native="saveForm">保存</el-button>
            <el-button type="primary" size="small" @click.native="updateToCompany">更新</el-button>
          </el-col>
          <el-col :span="14" :xs="24" class="text-right" v-show="tabIndex === '1'">
            <el-button type="primary" size="small" @click.native="saveDataScope">保存</el-button>
            <el-button type="primary" size="small" @click.native="updateToCompany">更新</el-button>
          </el-col>
        </el-row>
        <div style="padding: 20px;">
          <el-tabs v-model="activeName" @tab-click="handleClick">
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
                <el-radio v-model="radio" label="3">本部门数据权限</el-radio><br>
                <el-radio v-model="radio" label="4">本部门及以下数据权限</el-radio><br>
                <el-radio v-model="radio" label="5">仅本人数据权限</el-radio><br>
              </div>
            </el-tab-pane>
          </el-tabs>
        </div>
      </el-col>
    </el-row>

    <!-- 添加或修改角色模版配置对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="120px">
        <el-form-item label="系统角色模版名称" prop="roleName">
          <el-input v-model="form.roleName" placeholder="请输入系统角色模版名称" />
        </el-form-item>
        <el-form-item label="权限字符" prop="roleKey">
          <el-input v-model="form.roleKey" placeholder="请输入权限字符" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>

    <!-- 分配角色模版数据权限对话框 -->
    <el-dialog :title="title" :visible.sync="openDataScope" width="500px" append-to-body>
      <el-form :model="form" label-width="80px">
        <el-form-item label="系统角色模版名称">
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
  </div>
</template>

<script>
import { copyRole,listRole, getRole, delRole, addRole, updateRole, exportRole, dataScope, changeRoleStatus,typeRole,removeUserFromRole,addUserFromRole,pushToCompany } from "@/api/system/roleTemplate";
import { treeselect as menuTreeselect, roleTemplateMenuTreeselect } from "@/api/system/menu";
import { treeselect as deptTreeselect, roleDeptTreeselect } from "@/api/system/dept";

export default {
  name: "RoleTemplate",
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
      // 当前选中的部门
      selestTitle: '',
      // 是否已设置
      isSetup: '',
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
      // 菜单列表
      menuOptions: [],
      // 部门列表
      deptOptions: [],
      deptOptions2: [],
      radio: null,
      // 查询参数
      roleId: '',
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        roleName: undefined,
        roleIds: undefined,
        roleKey: undefined,
        status: undefined,
        searchValue: undefined,
        beginTime: undefined,
        endTime: undefined
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
        endTime: undefined
      },
      // 角色列表搜索
      roleTypeSearch:'',
      // 当前激活的tab页
      activeName: 'second',
      // 表单参数
      form: {},
      defaultProps: {
        children: "children",
        label: "label"
      },
      // 表单校验
      rules: {
        roleName: [
          { required: true, message: "角色模版名称不能为空", trigger: "blur" }
        ],
        roleKey: [
          { required: true, message: "权限字符不能为空", trigger: "blur" }
        ],
        roleSort: [
          { required: true, message: "角色模版顺序不能为空", trigger: "blur" }
        ]
      }
    };
  },
  watch: {
    roleTypeSearch(val) {
      let value = val.trim();
      if (!value) {this.treeRoleListFilter =  this.treeRoleList; return};
      this.treeRoleListFilter = this.treeRoleList.filter(item => {
        return item.roleName.indexOf(value) > -1;
      });

    },
  },
  created() {
    this.getRoleType();
    this.getDeptTreeselect();
    this.getDicts("sys_normal_disable").then(response => {
      this.statusOptions = response.data;
    });
  },
  methods: {
    // 更新系统角色模版至相应组织层级
    updateToCompany() {
      this.$confirm("是否更新所有组织层级?", "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        pushToCompany(this.queryParams.roleIds).then(
          response => {
            if (response.code === 200) {
              this.msgSuccess("更新成功");
            }
          }
        );
      }).catch(function () {});
    },
    /** 搜索*/
    filterMethod(query, item) {
      return item.nickName.indexOf(query) > -1;
    },
    // 选人节点单击事件
    handleNodeClick(data) {
      this.queryParams2.deptId = data.id;
      this.queryParams2.deptName = data.label;
      this.getList2();
    },
    /* 添加角色 */
    handleaddUser() {
      this.valueTran = [];
      this.queryParams2.deptId = undefined;
      this.queryParams2.deptName = undefined;
      this.openUser = true;
      this.getList2();
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
          if (this.treeRoleList.length > 0) {
            this.queryParams.roleName = this.treeRoleList[0].roleName;
            this.queryParams.roleIds= this.treeRoleList[0].roleId;
            this.switchRole(this.queryParams.roleName,this.queryParams.roleIds);
          }
          // this.getList();
          // this.loading = false;
        }
      );
    },
    /** 根据角色类型查询人员列表 */
    getList() {
      this.loading = true;
      listRole(this.queryParams).then(
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
    /** 查询部门树结构 */
    getDeptTreeselect() {
      deptTreeselect().then(response => {
        this.deptOptions2 = response.data;
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
      roleTemplateMenuTreeselect(roleId).then(response => {
        this.menuOptions = response.menus;
        this.$refs.menu.setCheckedKeys(response.checkedKeys);
        this.loading = false;
        if (response.checkedKeys.length == 0) {
          this.isSetup = '(未设置)';
        } else {
          this.isSetup = '';
        }
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
        status: "0",
        menuIds: [],
        deptIds: [],
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
      this.reset();
      // this.getMenuTreeselect();
      this.open = true;
      this.title = "添加角色模版";
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
      // this.$nextTick(() => {
      //   this.getRoleDeptTreeselect(this.queryParams.roleIds);
      // });
      getRole(this.queryParams.roleIds).then(response => {
        this.form = response.data;
        this.radio = this.form.dataScope;
        let checkedMenus = this.getMenuAllCheckedKeys();
        if (checkedMenus.length == 0) {
          this.isSetup = '(未设置)';
        } else {
          this.isSetup = '';
        }
      });
    },
    /** 提交按钮（功能权限） */
    submitForm: function() {
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
            this.form.menuIds = this.getMenuAllCheckedKeys();
            let addForm = this.form;
            addForm.menuIds = undefined;
            addForm.menuIds = undefined;
            addRole(addForm).then(response => {
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
            let checkedMenus = this.getMenuAllCheckedKeys();
            if (checkedMenus.length == 0) {
              this.isSetup = '(未设置)';
            } else {
              this.isSetup = '';
            }
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
      let roleIds = item.roleId;
      let roleName = item.roleName;
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
      if (tab.index === '0') {
        this.getRoleMenuTreeselect(this.queryParams.roleIds);
      }
      if (tab.index == '1') {
        this.handleDataScope();
      };
    },
    // 左侧树切换
    switchRole(roleName,roleId) {
      this.selestTitle = roleName;
      this.queryParams.pageNum = 1;
      this.queryParams.roleName = roleName;
      this.queryParams.roleIds = roleId;
      if (this.tabIndex === '0') {
        this.getRoleMenuTreeselect(this.queryParams.roleIds);
      }
      if (this.tabIndex === '1') {
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
    margin: -20px 0 20px 0;
    background: #ffffff;
    // padding: 20px 0;
    .role-title {
      padding: 0 20px 10px 20px;
      border-bottom: 1px solid #eeeeee;
      font-size: 20px;
      color: #555555;
    }
    .tree-left {
      padding-top: 10px;
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
<style lang="scss">
  .dept-tree .el-tree {
    height: 290px;
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
</style>
