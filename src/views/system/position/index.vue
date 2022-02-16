<template>
  <div class="app-box">
    <div class="role-title">岗位管理</div>
    <el-row :gutter="20">
      <el-col :span="5" :xs="24" class="tree-left">
        <div>
          <el-input
            v-model="roleTypeSearch"
            size="small"
            prefix-icon="el-icon-search"
            clearable
            placeholder="请输入岗位名称"/>
          <p
            class="add-role" @click="handleAdd"
            v-hasPermi="['system:role:add']"><i class="el-icon-circle-plus-outline"></i>&nbsp;添加岗位</p>
          <div>
            <!-- v-for="(item,index) of treePositionList"-->
            <p
              class="role-item clearfix"
              v-for="(item,index) of treePositionListFilter"
              :key="index"
              ref="tree"
              @click="switchRole(item.positionName,item.positionId)">
              <span class="fl" style="width: calc(100% - 19px);height: 30px;line-height: 30px;white-space: nowrap;cursor:pointer;overflow: hidden;text-overflow: ellipsis;">
                <i class="el-icon-user"></i>
                <span class="role-name" :title="item.positionName" style="width:100%;height: 30px;line-height: 30px;white-space: nowrap;cursor:pointer;overflow: hidden;text-overflow: ellipsis;">
                  {{ item.positionName }}
                </span>
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
                        @click.native="copyHandle(item.positionId)"
                        v-hasPermi="['system:dept:add']"
                      >复制岗位</el-dropdown-item>
                      <el-dropdown-item
                        icon="el-icon-delete"
                        @click.native="handleDelete(item)"
                        v-hasPermi="['system:role:remove']"
                      >删除岗位</el-dropdown-item>
                      <el-dropdown-item
                        icon="el-icon-edit"
                        @click.native="handleUpdate(item.positionId)"
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
          <el-col :span="10" :xs="24" class="handle-title"><span style="color: #ffffff">1</span>{{ selestTitle }}-成员列表</el-col>
          <el-col :span="14" :xs="24" class="text-right" v-show="tabIndex === '0'">
              <!--<el-button
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
              >添加成员</el-button>-->
          </el-col>
          <el-col :span="14" :xs="24" class="text-right" v-show="tabIndex === '1'">
            <el-button type="primary" size="small" @click.native="saveForm">保存</el-button>
          </el-col>
          <el-col :span="14" :xs="24" class="text-right" v-show="tabIndex === '2'">
            <el-button type="primary" size="small" @click.native="saveDataScope">保存</el-button>
          </el-col>
        </el-row>
        <div style="padding: 20px;">
          <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane label="岗位成员" name="first">

              <el-table v-loading="loading" :data="postionList" @selection-change="handleSelectionChange">
               <!-- <el-table-column type="selection" width="55" align="center" />-->
                <el-table-column
                  type="index"
                  label="序号"
                  width="55">
                  <template scope="scope">
                    <span>{{(queryParams.pageNum - 1) * queryParams.pageSize + scope.$index + 1}}</span>
                  </template>
                </el-table-column>
                <el-table-column label="姓名" prop="organUserName" :show-overflow-tooltip="true"  />
                <el-table-column label="手机号码" align="center" prop="organUserTel" width="120"/>
                <el-table-column label="项目名称" align="center" prop="projectName" :show-overflow-tooltip="true"/>
                <el-table-column label="项目组织节点名称" align="center" prop="organzationName" :show-overflow-tooltip="true"/>
                <el-table-column label="邮箱" align="center" prop="organUserEmail" :show-overflow-tooltip="true">
                </el-table-column>
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
              <el-tree
                :data="menuOptions"
                show-checkbox
                ref="menu"
                node-key="id"
                empty-text="加载中，请稍后"
                :props="defaultProps"
              ></el-tree>
            </el-tab-pane>
          </el-tabs>
        </div>
      </el-col>
    </el-row>

    <!-- 添加或修改岗位配置对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="500px" append-to-body>
      <el-form ref="form" :model="form" :rules="rules" label-width="80px">
        <el-form-item label="岗位名称" prop="positionName">
          <el-input v-model="form.positionName" placeholder="请输入岗位名称" />
        </el-form-item>
       <!-- <el-form-item label="权限字符" prop="roleKey">
          <el-input v-model="form.roleKey" placeholder="请输入权限字符" />
        </el-form-item>-->
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>

    <!-- 分配岗位数据权限对话框 -->
    <el-dialog :title="title" :visible.sync="openDataScope" width="500px" append-to-body>
      <el-form :model="form" label-width="80px">
        <el-form-item label="岗位名称">
          <el-input v-model="form.positionName" :disabled="true" />
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

    <!-- 添加岗位 -->
    <el-dialog title="添加成员" :visible.sync="openUser" width="850px" append-to-body>
      <el-form ref="form" :model="formUser" label-width="80px" style="width: 50%; height: auto; text-align: center;margin-left:22%;">
        <el-form-item label="岗位名称">
          <el-input :disabled="true"  v-model="queryParams.positionName" style="width: 340px;"  placeholder="请输入岗位名称" />
        </el-form-item>
<!--        <el-form-item label="岗位成员" >-->
<!--          <el-input v-model="formUser.roleMember" style="width: 200px;"/>-->
<!--          <el-button type="primary" >搜索</el-button>-->
<!--        </el-form-item>-->
      </el-form>

      <template>
        <el-row>
          <el-col :span="6" class="dept-tree">
            <el-tree
              :data="deptOptions2"
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
              :titles="['岗位列表', '已选择']"
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
  </div>
</template>

<script>
import { copyRole,listRole, getRole, delRole, addRole, updateRole, exportRole, dataScope, changeRoleStatus,typeRole,removeUserFromRole,addUserFromRole } from "@/api/system/role";
import { listTreeposition,listposition,getPosition,addPosition,updatePosition,delPosition,copyPosition,positionMenuTreeselect,getUserListBydeptId,getPositionUserList} from "@/api/system/position";
import { treeselect as menuTreeselect, roleMenuTreeselect } from "@/api/system/menu";
import { treeselect as deptTreeselect, roleDeptTreeselect } from "@/api/system/dept";

export default {
  name: "Role",
  data() {
    return {
      // 选人 - 岗位数据
      dataTran: [],
      valueTran: [],
      formUser: {
        positionName: '',
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
      // 岗位表格数据
      postionList: [],
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
      // 左侧岗位列表树
      treePositionList: [],
      treePositionListFilter:[],
      // 当前选中的部门
      selestTitle: '',
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
      dataScopeOptions2: [
        {
          id: "1",
          label: "全部数据权限"
        },
        {
          id: "2",
          label: "自定数据权限"
        },
        {
          id: "3",
          label: "本部门数据权限"
        },
        {
          id: "4",
          label: "本部门及以下数据权限"
        },
        {
          id: "5",
          label: "仅本人数据权限"
        }
      ],
      dataScopeOptions3: [],
      // 菜单列表
      menuOptions: [],
      // 部门列表
      deptOptions: [],
      deptOptions2: [],
      radio: null,
      // 查询参数
      positionId: '',
      queryParams: {
        pageNum: 1,
        pageSize: 10,
        positionName: undefined,
        positionId: undefined,
        roleKey: undefined,
        status: undefined,
        searchValue: undefined,
        beginTime: undefined,
        endTime: undefined
      },
      queryParams2: {
        /*pageNum: 1,
        pageSize: 1000,*/
      },
      // 岗位列表搜索
      roleTypeSearch:'',
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
        positionName: [
          { required: true, message: "岗位名称不能为空", trigger: "blur" }
        ],
        roleKey: [
          { required: true, message: "权限字符不能为空", trigger: "blur" }
        ],
        roleSort: [
          { required: true, message: "岗位顺序不能为空", trigger: "blur" }
        ]
      }
    };
  },
  watch: {
    roleTypeSearch(val) {
      let value = val.trim();
      if (!value) {this.treePositionListFilter =  this.treePositionList; return};
      this.treePositionListFilter = this.treePositionList.filter(item => {
        return item.positionName.indexOf(value) > -1;
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
    /** 搜索*/
    filterMethod(query, item) {
      return item.nickName.indexOf(query) > -1;
    },
    // 选人节点单击事件
    handleNodeClick(data) {
      this.queryParams2.deptId = data.id;
      this.getList2();
    },
    /** 添加成员*/
    addUserHandle() {
      if (this.valueTran.length > 0) {
        let usersIds = [...this.valueTran].join(',')
        this.openUser = false
        addUserFromRole(this.queryParams.positionId,usersIds).then(response => {
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
      removeUserFromRole(this.queryParams.positionId,ids).then(response => {
        if (response.code === 200) {
          this.msgSuccess("移除成功");
          this.getList();
        }
      })
    },
    /* 添加成员 */
    handleaddUser() {
      this.valueTran = [];
      this.queryParams2.positionId = undefined;
      this.queryParams2.positionName = undefined;
      this.openUser = true;
      this.getList2();
    },
    /* 复制岗位 */
    copyHandle(positionId) {
      copyPosition(positionId).then(
        response => {
          if (response.code === 200) {
            this.msgSuccess("复制成功");
            this.getList();
            this.getRoleType();
          }
        }
      );
    },
    /*查询岗位列表*/
    getRoleType() {
      let params = {};
      listposition(params).then(response => {
        this.treePositionList = response.data;
        this.treePositionListFilter = [...this.treePositionList];
        if (this.treePositionList.length > 0) {
          this.queryParams.positionName = this.treePositionList[0].positionName;
          this.queryParams.positionId= this.treePositionList[0].positionId;
          this.switchRole(this.queryParams.positionName,this.queryParams.positionId);
        }
      });

    },
    /** 根据岗位类型查询人员列表 */
    getList() {
      this.loading = true;
      getPositionUserList(this.queryParams).then(
        response => {
          this.postionList = response.rows;
          this.total = response.total;
          this.loading = false;
        }
      );
    },
    /** 选人 - 根据岗位类型查询人员列表 */
    getList2() {
      getUserListBydeptId(this.queryParams2).then(
        response => {
          this.dataTran = response.data;
        }
      );
    },
    /** 查询菜单树结构 */
    getMenuTreeselect() {
      menuTreeselect().then(response => {
        this.menuOptions = response.data;
        this.treePositionList = response.data;
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
    /** 根据岗位ID查询菜单树结构 */
    getRoleMenuTreeselect(positionId) {
      this.loading = true;
      positionMenuTreeselect(positionId).then(response => {

        this.menuOptions = response.menus;
        this.$refs.menu.setCheckedKeys(response.checkedKeys);
        this.loading = false;
      });
    },
    /** 根据岗位ID查询部门树结构 */
    getRoleDeptTreeselect(positionId) {
      roleDeptTreeselect(positionId).then(response => {
        this.deptOptions = response.depts;
        this.$refs._data.setCheckedKeys(response.checkedKeys);
      });
    },
    // 岗位状态修改
    handleStatusChange(row) {
      let text = row.status === "0" ? "启用" : "停用";
      this.$confirm('确认要"' + text + '""' + row.positionName + '"岗位吗?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(function() {
          return changeRoleStatus(row.positionId, row.status);
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
      this.form = {
        positionId: undefined,
        positionName: undefined,
        status: "0",
        menuIds: [],
        remark: null
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
      this.title = "添加岗位";
    },
    /** 修改按钮操作 */
    handleUpdate(positionId) {
      this.reset();
      getPosition(positionId).then(response => {
        //console.log("查询岗位详情："+JSON.stringify(response));
        this.form = response.data;
        this.open = true;
        this.title = "编辑";
        this.getRoleType();
      });

    },
    /** 分配数据权限操作 */
    handleDataScope(row) {
      this.$nextTick(() => {
        this.getRoleDeptTreeselect(this.queryParams.positionId);
      });
      getRole(this.queryParams.positionId).then(response => {
        this.form = response.data;
        this.radio = this.form.dataScope;
      });
    },
    /** 提交按钮（功能权限） */
    submitForm: function() {
      console.log("新增的form表单："+JSON.stringify(this.form));
      this.$refs["form"].validate(valid => {
        if (valid) {
          if (this.form.positionId != undefined) {
            this.form.menuIds = this.getMenuAllCheckedKeys();
            updatePosition(this.form).then(response => {
              if (response.code === 200) {
                this.msgSuccess("修改成功");
                this.open = false;
                this.getList();
                this.getRoleType();
              }
            });
          } else {
            this.form.menuIds = this.getMenuAllCheckedKeys();
            addPosition(this.form).then(response => {
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
      getPosition(this.queryParams.positionId).then(response => {
        form = response.data;
        form.menuIds = this.getMenuAllCheckedKeys();
        form.positionId = this.queryParams.positionId;
        updatePosition(form).then(response => {
          if (response.code === 200) {
            this.msgSuccess("修改成功");
          }
        });
      });

    },
    /** 提交按钮（数据权限） */
    submitDataScope: function() {
      if (this.form.positionId != undefined) {
        this.form.positionId = this.getDeptAllCheckedKeys();
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
      form.positionId = this.getDeptAllCheckedKeys();
      form.dataScope = this.radio;
      // this.form.positionId = this.getDeptAllCheckedKeys();
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
      let positionId = item.positionId;
      let positionName = item.positionName;
      // const positionId = row.positionId || this.ids;
      this.$confirm('是否确认删除岗位名称为"' + positionName + '"的数据项?', "警告", { //删除后，岗位下的成员将会变成“普通员工”。
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(function() {
          return delPosition(positionId);
        }).then(() => {
          // this.getList();
          this.getRoleType();
          this.msgSuccess("删除成功");
        }).catch(function() {});
    },
    /** 导出按钮操作 */
    handleExport() {
      const queryParams = this.queryParams;
      this.$confirm('是否确认导出所有岗位数据项?', "警告", {
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
      if (this.tabIndex === '0') {this.getList()}
      if (tab.index === '1') {this.getRoleMenuTreeselect(this.queryParams.positionId)}
      if (tab.index == '2') {this.handleDataScope()};
    },
    // 左侧树切换
    switchRole(positionName,positionId) {
      this.selestTitle = positionName;
      this.queryParams.pageNum = 1;
      this.queryParams.positionName = positionName;
      this.queryParams.positionId = positionId;
      if (this.tabIndex === '0') {
        this.getList();
      }
      if (this.tabIndex === '1') {
        this.getRoleMenuTreeselect(this.queryParams.positionId);
      }
      if (this.tabIndex === '2') {
        this.handleDataScope();
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
      padding: 0 20px 10px 20px;
      border-bottom: 1px solid #eeeeee;
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
