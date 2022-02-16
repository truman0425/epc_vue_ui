<template>
  <div class="app-container-nm">
    <el-tabs v-model="activeName" type="border-card">
      <el-tab-pane label="组织架构" name="user">
        <el-row :gutter="20">
          <!--部门数据-->
          <el-col :span="5" :xs="24" class="tree-left">
            <div class="head-container">
              <el-dropdown size="mini" split-button type="primary" style="margin-bottom: 10px;"><!--trigger="click" -->操作菜单
                <!-- <span class="el-dropdown-link">
                     下拉菜单<i class="el-icon-arrow-down el-icon&#45;&#45;right"></i>
                 </span>-->
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item @click.native="opeTree(1)">全部展开</el-dropdown-item>
                  <el-dropdown-item @click.native="opeTree(2)">全部折叠</el-dropdown-item>
                  <el-dropdown-item @click.native="opeTree(3)">展开所有子节点</el-dropdown-item>
                  <el-dropdown-item @click.native="opeTree(4)">折叠所有子节点</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
              <el-input
                v-model="deptName"
                placeholder="请输入部门名称"
                clearable
                size="small"
                prefix-icon="el-icon-search"
              /><!-- style="margin-bottom: 20px"-->
            </div>
            <div class="head-container">
              <el-tree
                :data="deptOptions"
                :props="defaultProps"
                :expand-on-click-node="false"
                :filter-node-method="filterNode"
                ref="tree"
                class="table-tree"
                default-expand-all
                @node-click="handleNodeClick"
                node-key="id"
              >
            <span class="custom-tree-node" slot-scope="{ node, data }" style="width: calc(100% - 14px);">
            <span @mouseenter="treeEnterHandle(node.id)" :title="node.label" style="width:100%;height: 30px;line-height: 30px;white-space: nowrap;cursor:pointer;overflow: hidden;text-overflow: ellipsis;"><!--style="width: 100%;height: 30px;line-height: 30px"-->
              <i v-if="node.level <= 2" style="color: #48A8F1;" class="el-icon-office-building"></i>
              <i v-else style="color: #48A8F1;" class="el-icon-folder"></i>
              {{ node.label }}
            </span>
              <!--            <span>{{ node.level }}</span>-->
              <!--            <span>{{ data.children?'是':'否' }}</span>-->
            <span>
              <el-dropdown :hide-on-click="false">
                <span class="el-dropdown-link" :data-id="node.id"><!--v-show="node.id == isTreeHandle" -->
                  <i class="el-icon-more el-icon--right" style="color: #D3D3D3"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                  <!--todo 根据情况更改权限-->
                  <el-dropdown-item
                    icon="el-icon-circle-plus-outline"
                    @click.native="handleAddDept(node, data)"
                    v-hasPermi="['system:dept:add']"
                  >添加子部门</el-dropdown-item>
                  <el-dropdown-item
                    v-if="node.level !== 1"
                    icon="el-icon-delete"
                    @click.native="handleDeptDelete(data)"
                  >删除部门</el-dropdown-item>
                  <el-dropdown-item
                    icon="el-icon-edit"
                    @click.native="handleDeptUpdate(data,node)"
                  >编辑</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </span>
          </span>
              </el-tree>
            </div>
          </el-col>

          <!--用户数据-->
          <el-col :span="19" :xs="24" class="table-right">
            <el-row style="border-bottom: 1px solid #eeeeee;line-height: 35px;padding: 0 20px;margin-bottom: 15px">
              <el-col :span="12">
                <div class="design-list"><i class="el-icon-user-solid">&nbsp;&nbsp;</i><!--style="float:left;"-->
                  <span :title="queryParams.deptName" style="width:calc(100% - 100px);cursor: pointer;">{{queryParams.deptName}}</span>-成员列表</div><!-- style="float:left;max-width:calc(100% - 143px);white-space: nowrap;cursor:pointer;overflow: hidden;text-overflow: ellipsis;"-->
              </el-col>

              <el-col :span="12">
                <div class="fr">
                  <el-button
                    type="primary"
                    size="small"
                    @click="handleAdd"
                    v-hasPermi="['system:user:add']"
                  >添加用户
                  </el-button>
                  <el-button
                    :disabled="single"
                    size="small"
                    @click="setleaderHandle"
                    v-hasPermi="['system:user:edit']"
                  >设置部门负责人</el-button>
                  <el-button
                    size="small"
                    :disabled="multiple"
                    @click="handleDeptChange"
                    v-hasPermi="['system:user:edit']"
                  >人员划转</el-button>
                  <el-dropdown :hide-on-click="false">
                    <span class="el-dropdown-link">
                      <!--<button class="el-button&#45;&#45;mini mbutton"><i>...</i></button>-->
                       <el-button size="mini" style="background: #F1F2F3;"   class="el-button&#45;&#45;mini mbutton el-icon-more mores"></el-button>
                    </span>
                    <el-dropdown-menu slot="dropdown">
                      <el-dropdown-item
                        @click.native="handleStatusChange(1)"
                        :disabled="multiple"
                        v-hasPermi="['system:user:edit']"
                      >人员停用</el-dropdown-item><!--:disabled="single"-->
                      <el-dropdown-item
                        @click.native="handleStatusChange(0)"
                        :disabled="multiple"
                        v-hasPermi="['system:user:edit']"
                      >人员激活</el-dropdown-item><!--  :disabled="single"-->
                      <el-dropdown-item
                        @click.native="handleImport"
                        v-hasPermi="['system:user:import']"
                      >导入Excel</el-dropdown-item>
                      <el-dropdown-item
                        @click.native="handleExport"
                        v-hasPermi="['system:user:export']"
                      >导出Excel</el-dropdown-item>
                    </el-dropdown-menu>
                  </el-dropdown>
                </div>
              </el-col>
            </el-row>
            <el-row style="padding: 0 15px 0 15px;color:#eeeeee;margin-bottom: 15px">
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
                <el-button icon="el-icon-refresh" size="mini" @click="resetQuery" style="height:32px;">重置</el-button>
              </el-form-item>
              </el-form>
            </el-row>
            <!--<el-form :model="queryParams" ref="queryForm" :inline="true" label-width="68px">
              <el-form-item label="用户名称" prop="userName">
                <el-input
                  v-model="queryParams.userName"
                  placeholder="请输入用户名称"
                  clearable
                  size="small"
                  style="width: 240px"
                  @keyup.enter.native="handleQuery"
                />
              </el-form-item>
              <el-form-item label="手机号码" prop="phonenumber">
                <el-input
                  v-model="queryParams.phonenumber"
                  placeholder="请输入手机号码"
                  clearable
                  size="small"
                  style="width: 240px"
                  @keyup.enter.native="handleQuery"
                />
              </el-form-item>
              <el-form-item label="状态" prop="status">
                <el-select
                  v-model="queryParams.status"
                  placeholder="用户状态"
                  clearable
                  size="small"
                  style="width: 240px"
                >
                  <el-option
                    v-for="dict in statusOptions"
                    :key="dict.dictValue"
                    :label="dict.dictLabel"
                    :value="dict.dictValue"
                  />
                </el-select>
              </el-form-item>
              <el-form-item label="创建时间">
                <el-date-picker
                  v-model="dateRange"
                  size="small"
                  style="width: 240px"
                  value-format="yyyy-MM-dd"
                  type="daterange"
                  range-separator="-"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                ></el-date-picker>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" icon="el-icon-search" size="mini" @click="handleQuery">搜索</el-button>
                <el-button icon="el-icon-refresh" size="mini" @click="resetQuery">重置</el-button>
              </el-form-item>
            </el-form>-->

            <!--            <el-row :gutter="10" class="mb8">-->
            <!--              <el-col :span="1.5">-->
            <!--                <el-button-->
            <!--                  type="primary"-->
            <!--                  icon="el-icon-plus"-->
            <!--                  size="mini"-->
            <!--                  @click="handleAdd"-->
            <!--                  v-hasPermi="['system:user:add']"-->
            <!--                >新增-->
            <!--                </el-button>-->
            <!--              </el-col>-->
            <!--              <el-col :span="1.5">-->
            <!--                <el-button-->
            <!--                  icon="el-icon-edit"-->
            <!--                  size="mini"-->
            <!--                  :disabled="multiple"-->
            <!--                  @click="handleDeptChange"-->
            <!--                  v-hasPermi="['system:user:edit']"-->
            <!--                >人员划转-->
            <!--                </el-button>-->
            <!--              </el-col>-->
            <!--              <el-col :span="1.5">-->
            <!--                <el-button-->
            <!--                  type="success"-->
            <!--                  icon="el-icon-edit"-->
            <!--                  size="mini"-->
            <!--                  :disabled="single"-->
            <!--                  @click="handleUpdate"-->
            <!--                  v-hasPermi="['system:user:edit']"-->
            <!--                >修改-->
            <!--                </el-button>-->
            <!--              </el-col>-->
            <!--              <el-col :span="1.5">-->
            <!--                <el-button-->
            <!--                  type="danger"-->
            <!--                  icon="el-icon-delete"-->
            <!--                  size="mini"-->
            <!--                  :disabled="multiple"-->
            <!--                  @click="handleDelete"-->
            <!--                  v-hasPermi="['system:user:remove']"-->
            <!--                >删除-->
            <!--                </el-button>-->
            <!--              </el-col>-->
            <!--              <el-col :span="1.5">-->
            <!--                <el-button-->
            <!--                  type="info"-->
            <!--                  icon="el-icon-upload2"-->
            <!--                  size="mini"-->
            <!--                  @click="handleImport"-->
            <!--                  v-hasPermi="['system:user:import']"-->
            <!--                >导入-->
            <!--                </el-button>-->
            <!--              </el-col>-->
            <!--              <el-col :span="1.5">-->
            <!--                <el-button-->
            <!--                  type="warning"-->
            <!--                  icon="el-icon-download"-->
            <!--                  size="mini"-->
            <!--                  @click="handleExport"-->
            <!--                  v-hasPermi="['system:user:export']"-->
            <!--                >导出-->
            <!--                </el-button>-->
            <!--              </el-col>-->
            <!--            </el-row>-->

            <el-table v-loading="loading" :data="userList" @selection-change="handleSelectionChange" :cell-class-name="isDeptLeader">
              <el-table-column type="selection" width="55" align="center"/>
              <el-table-column label="姓名" prop="nickName">
                <template  slot-scope="scope">
                  <el-button
                    size="mini"
                    type="text"
                    @click="handleUpdate(scope.row)"
                    v-bind:class="{isDeptLeader:scope.row.isDeptLeader=='1'||scope.row.isDeptLeader==1}"
                  >{{scope.row.nickName}}
                  </el-button>
                </template>
              </el-table-column>
              <el-table-column label="账号" prop="userName" :show-overflow-tooltip="true"/>
              <el-table-column label="部门" prop="dept.deptName" :show-overflow-tooltip="true"/>
              <el-table-column label="职务" :show-overflow-tooltip="true">
                <template slot-scope="scope">
                  <span v-for="(item,index) of scope.row.posts" :key="index">
                    {{item.postName}}
                  </span>
                </template>
              </el-table-column>
              <el-table-column :show-overflow-tooltip="true">
                <template slot-scope="scope" slot="header">
                  <el-popover
                    placement="bottom"
                    width="200"
                    v-model="typeSearchVis"
                    trigger="click">
                    <div class="_type-search_">
                      <el-input
                        placeholder="搜索角色"
                        suffix-icon="el-icon-search"
                        size="mini"
                        style="margin-bottom: 5px"
                        v-model="typeSearch">
                      </el-input>
                      <el-checkbox-group v-model="checkList">
                        <span v-for="(item,index) of scopeListFilter" :key="index">
                          <el-checkbox :label="item.roleId">{{ item.roleName }}</el-checkbox><br>
                        </span>
                      </el-checkbox-group>
                    </div>
                    <div style="text-align: right;">
                      <el-button type="primary" size="mini" @click="typeSearchHandle">确定</el-button>
                    </div>
                    <div slot="reference">
                      <span>角色</span>
                      <span class="el-icon-arrow-down"></span>
                    </div>
                  </el-popover>
                </template>
                <template slot-scope="scope">
                  <span v-for="(item,index) of scope.row.roles" :key="index">
                    {{item.roleName}}
                  </span>
                </template>
              </el-table-column>
              <el-table-column label="手机号码" prop="phonenumber" width="120"/>
              <el-table-column label="邮箱" prop="email" :show-overflow-tooltip="true"/>
              <el-table-column label="状态" prop="dept.status">
                <template slot-scope="scope">
                  {{ switchStatusType(scope.row.status)}}
                </template>
              </el-table-column>
              <!--              <el-table-column label="创建时间" align="center" prop="createTime" width="160">-->
              <!--                <template slot-scope="scope">-->
              <!--                  <span>{{ parseTime(scope.row.createTime) }}</span>-->
              <!--                </template>-->
              <!--              </el-table-column>-->
              <!--              <el-table-column-->
              <!--                label="操作"-->
              <!--                align="center"-->
              <!--                width="180"-->
              <!--                class-name="small-padding fixed-width"-->
              <!--              >-->
              <!--                <template slot-scope="scope">-->
              <!--                  <el-button-->
              <!--                    size="mini"-->
              <!--                    type="text"-->
              <!--                    icon="el-icon-edit"-->
              <!--                    @click="handleUpdate(scope.row)"-->
              <!--                    v-hasPermi="['system:user:edit']"-->
              <!--                  >修改-->
              <!--                  </el-button>-->
              <!--                  <el-button-->
              <!--                    v-if="scope.row.userId !== 1"-->
              <!--                    size="mini"-->
              <!--                    type="text"-->
              <!--                    icon="el-icon-delete"-->
              <!--                    @click="handleDelete(scope.row)"-->
              <!--                    v-hasPermi="['system:user:remove']"-->
              <!--                  >删除-->
              <!--                  </el-button>-->
              <!--                  <el-button-->
              <!--                    size="mini"-->
              <!--                    type="text"-->
              <!--                    icon="el-icon-key"-->
              <!--                    @click="handleResetPwd(scope.row)"-->
              <!--                    v-hasPermi="['system:user:resetPwd']"-->
              <!--                  >重置-->
              <!--                  </el-button>-->
              <!--                </template>-->
              <!--              </el-table-column>-->
            </el-table>

            <pagination
              v-show="total>0"
              :total="total"
              :page.sync="queryParams.pageNum"
              :limit.sync="queryParams.pageSize"
              @pagination="getList"
            />
          </el-col>
        </el-row>
      </el-tab-pane>
      <!--<el-tab-pane label="项目架构" name="user2" :disabled="true"></el-tab-pane>-->
    </el-tabs>

    <!-- 添加或修改参数配置对话框 -->
    <el-dialog :title="title" :visible.sync="open" width="600px" append-to-body class="add_persion">
      <el-form ref="form" :model="form" :rules="rules" label-width="80px" label-position="top">
        <el-row  :gutter="20">
          <el-col :span="12">
            <el-form-item label="姓名" prop="nickName">
              <el-input v-model="form.nickName" placeholder="请输入用户姓名"/>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="用户性别">
              <el-radio-group v-model="form.sex">
                <el-radio
                  v-for="dict in sexOptions"
                  :key="dict.dictValue"
                  :label="dict.dictValue"
                >{{dict.dictLabel}}
                </el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row  :gutter="20">
          <el-col :span="12">
            <el-form-item v-if="form.userId == undefined" label="账号" prop="userName">
              <el-input v-model="form.userName" placeholder="请输入用户账号"/>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item v-if="form.userId == undefined" label="用户密码" prop="password">
              <el-input v-model="form.password" placeholder="请输入用户密码" type="password"/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row  :gutter="20">
          <el-col :span="12">
            <el-form-item label="手机号码" prop="phonenumber">
              <el-input v-model="form.phonenumber" placeholder="请输入手机号码" maxlength="11"/>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="邮箱" prop="email">
              <el-input v-model="form.email" placeholder="请输入邮箱" maxlength="50"/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row  :gutter="20">
          <el-col :span="12">
            <el-form-item label="归属部门" prop="deptId" readonly>
              <treeselect v-model="form.deptId" :options="deptOptions" :disabled="true" placeholder="请选择归属部门"/>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="职务">
              <el-select v-model="form.postIds" multiple placeholder="请选择">
                <el-option
                  v-for="item in postOptions"
                  :key="item.postId"
                  :label="item.postName"
                  :value="item.postId"
                  :disabled="item.status == 1"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row  :gutter="20">
          <el-col :span="24">
            <el-form-item label="角色">
              <el-select v-model="form.roleIds" filterable clearable multiple placeholder="请选择">
                <el-option
                  v-for="item in roleOptions"
                  :key="item.roleId"
                  :label="item.roleName"
                  :value="item.roleId"
                  :disabled="item.status == 1"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row  :gutter="20">
          <el-col :span="12">
            <el-form-item label="入职时间">
              <el-date-picker
                v-model="entryTime"
                type="date"
                placeholder="选择日期">
              </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="状态">
              <el-radio-group v-model="form.status">
                <el-radio
                  v-for="dict in statusOptions"
                  :key="dict.dictValue"
                  :label="dict.dictValue"
                >{{dict.dictLabel}}
                </el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
        <!--<el-row  :gutter="20">
          <el-col :span="24">
            <el-form-item label="备注">
              <el-input v-model="form.remark" type="textarea" placeholder="请输入内容"></el-input>
            </el-form-item>
          </el-col>
        </el-row>-->
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>

    <!-- 用户导入对话框 -->
    <el-dialog :title="upload.title" :visible.sync="upload.open" width="400px" append-to-body>
      <el-upload
        ref="upload"
        :limit="1"
        accept=".xlsx, .xls"
        :headers="upload.headers"
        :action="upload.url + '?updateSupport=' + upload.updateSupport"
        :disabled="upload.isUploading"
        :on-progress="handleFileUploadProgress"
        :on-success="handleFileSuccess"
        :auto-upload="false"
        drag
      >
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">
          将文件拖到此处，或
          <em>点击上传</em>
        </div>
        <div class="el-upload__tip" slot="tip">
          <el-checkbox v-model="upload.updateSupport"/>
          是否更新已经存在的用户数据
          <el-link type="info" style="font-size:12px;color: #1989FA;" @click="importTemplate">下载模板</el-link>
        </div>
        <div class="el-upload__tip" style="color:red" slot="tip">提示：仅允许导入“xls”或“xlsx”格式文件！</div>
      </el-upload>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitFileForm">确 定</el-button>
        <el-button @click="upload.open = false">取 消</el-button>
      </div>
    </el-dialog>

    <!-- 添加或修改部门对话框 -->
    <el-dialog :title="deptTitle" :visible.sync="deptOpen" width="600px" append-to-body>
      <el-form ref="form" :model="deptForm" :rules="rules" label-width="80px">
        <el-row>
          <el-col :span="24" v-if="deptForm.parentId !== 0">
            <el-form-item label="上级部门" prop="parentId">
              <el-input v-model="parentName" readonly/>
            </el-form-item>
          </el-col>
          <el-col :span="24">
            <el-form-item label="节点类型">
              <el-radio-group v-model="deptForm.orgType" :disabled="isEdit">
                <el-radio
                  v-for="dict in orgTypeOptions"
                  :key="dict.dictValue"
                  :label="dict.dictValue"
                >{{dict.dictLabel}}</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="部门名称" prop="deptName">
              <el-input v-model="deptForm.deptName" placeholder="请输入部门名称"/>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="显示排序" prop="orderNum">
              <el-input-number v-model="deptForm.orderNum" controls-position="right" :min="0"/>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="负责人">
              <!--<el-input v-model="deptForm.leader" placeholder="请输入负责人" maxlength="20"/>-->
              <el-select v-model="deptForm.leader" clearable  filterable remote :filter-method="dataFilter" @change="dataFilter('')"
                         v-loadmore="uploadUser" style="overflow:auto;float:left;width:100%;" placeholder="请输入负责人">
                <el-option
                  v-for="dict in userOption"
                  :key="dict.dictValue"
                  :label="dict.dictLabelName"
                  :value="dict.dictValue"
                />
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="联系电话" prop="phone">
              <el-input v-model="deptForm.phone" placeholder="请输入联系电话" maxlength="11"/>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="邮箱" prop="email">
              <el-input v-model="deptForm.email" placeholder="请输入邮箱" maxlength="50"/>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="部门状态">
              <el-radio-group v-model="deptForm.status">
                <el-radio
                  v-for="dict in statusOptions"
                  :key="dict.dictValue"
                  :label="dict.dictValue"
                >{{dict.dictLabel}}
                </el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="submitDeptForm">确 定</el-button>
        <el-button @click="cancel">取 消</el-button>
      </div>
    </el-dialog>

    <!--部门划转话框 -->
    <el-dialog title="人员划转" :visible.sync="deptChangeOpen" width="600px" append-to-body>
      <el-form ref="form" :model="deptChangeForm" :rules="rules" label-width="80px" style="padding: 0 50px">
        <el-row :gutter="40">
          <el-col :span="24">
            <el-form-item label="被划转人">
              <el-input v-model="deptChangeForm.names" placeholder="请输入用户昵称"/>
            </el-form-item>
          </el-col>
          <!--<el-col :span="24">
            <el-form-item label="划出部门">
              <el-input v-model="deptChangeForm.names" placeholder="请输入用户昵称"/>
            </el-form-item>
          </el-col>-->
          <el-col :span="24">
            <el-form-item label="转入部门" prop="deptId">
              <treeselect v-model="deptChangeForm.deptId" :options="deptOptions" placeholder="请选择归属部门"/>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="switchDeptHandle">确 定</el-button>
        <el-button @click="deptChangeOpen=false">取 消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import {
    listUser,
    getUser,
    delUser,
    addUser,
    updateUser,
    exportUser,
    resetUserPwd,
    changeUserStatus,
    importTemplate,
    setDeptLeader,
    switchDept,
    typeRole,
    typeRole1,
    getBaseUserlist
  } from "@/api/system/user";
  import {listDept, getDept, delDept, addDept, updateDept} from "@/api/system/dept";
  import {getToken} from "@/utils/auth";
  import {treeselect} from "@/api/system/dept";
  import Treeselect from "@riophae/vue-treeselect";
  import "@riophae/vue-treeselect/dist/vue-treeselect.css";

  export default {
    name: "User",
    components: {Treeselect},
    data() {
      return {
        // 角色搜索弹框显示
        typeSearchVis: false,
        // 选中角色
        checkList: [],
        scopeListFilter: [],
        // 角色搜索
        typeSearch: '',
        //角色列表
        scopeList:[],
        entryTime:"",//入职时间
        activeName: 'user',
        // 遮罩层
        loading: true,
        // 选中数组
        ids: [],
        selectedItem: [],
        // 非单个禁用
        single: true,
        // 非多个禁用
        multiple: true,
        // 总条数
        total: 0,
        // 用户表格数据
        userList: null,
        // 弹出层标题
        title: "",
        // 部门树选项
        deptOptions: undefined,
        // 是否显示弹出层
        open: false,
        // 部门名称
        deptName: undefined,
        // 默认密码
        initPassword: undefined,
        // 日期范围
        dateRange: [],
        // 状态数据字典
        statusOptions: [],
        // 性别状态字典
        sexOptions: [],
        // 职务选项
        postOptions: [],
        // 角色选项
        roleOptions: [],
        //用户选项
        userOption:[],
        //部门类型
        orgTypeOptions:[],
        isEdit:false,
        // 表单参数
        form: {},
        //部门相关
        defaultProps: {
          children: "children",
          label: "label"
        },
        deptTitle: "",
        parentName: '',
        deptOpen: false,
        deptForm: {},
        deptChangeOpen: false,
        deptChangeForm: {},
        // 属性菜单后边三个点 显示控制
        isTreeHandle: -1,
        // 用户导入参数
        upload: {
          // 是否显示弹出层（用户导入）
          open: false,
          // 弹出层标题（用户导入）
          title: "",
          // 是否禁用上传
          isUploading: false,
          // 是否更新已经存在的用户数据
          updateSupport: 0,
          // 设置上传的请求头部
          headers: {Authorization: "Bearer " + getToken()},
          // 上传的地址
          url: process.env.VUE_APP_BASE_API + "/system/user/importData"
        },
        // 查询参数
        queryParams: {
          pageNum: 1,
          pageSize: 10,
          searchValue: '',
          // userName: undefined,
          // phonenumber: undefined,
          // status: undefined,
          deptId: undefined,
          deptName: undefined,
          roleIds: undefined
        },
        //用户查询参数
        queryParams2: {
          pageNum: 1,
          pageSize: 10,
        },
        // 表单校验
        rules: {
          userName: [
            {required: true, message: "用户名称不能为空", trigger: "blur"}
          ],
          nickName: [
            {required: true, message: "用户昵称不能为空", trigger: "blur"}
          ],
          deptId: [
            {required: true, message: "归属部门不能为空", trigger: "blur"}
          ],
          password: [
            {required: true, message: "用户密码不能为空", trigger: "blur"}
          ],
          email: [
            // {required: true, message: "邮箱地址不能为空", trigger: "blur"},
            // {
            //   type: "email",
            //   message: "'请输入正确的邮箱地址",
            //   trigger: ["blur", "change"]
            // }
          ],
          phonenumber: [
            {required: true, message: "手机号码不能为空", trigger: "blur"},
            {
              pattern: /^1[3|4|5|6|7|8|9][0-9]\d{8}$/,
              message: "请输入正确的手机号码",
              trigger: "blur"
            }
          ],
          parentId: [
            {required: true, message: "上级部门不能为空", trigger: "blur"}
          ],
          deptName: [
            {required: true, message: "部门名称不能为空", trigger: "blur"}
          ],
          orderNum: [
            {required: true, message: "菜单顺序不能为空", trigger: "blur"}
          ],
          phone: [
            {
              pattern: /^1[3|4|5|6|7|8|9][0-9]\d{8}$/,
              message: "请输入正确的手机号码",
              trigger: "blur"
            }
          ]
        }
      };
    },
    watch: {
      // 根据名称筛选部门树
      deptName(val) {
        this.$refs.tree.filter(val);
      },
      typeSearch(val) {
        let value = val.trim();
        if (!value) {this.scopeListFilter =  this.scopeList; return};
        this.scopeListFilter = this.scopeList.filter(item => {
          return item.roleName.indexOf(value) > -1;
        })
      }
    },
    created() {
      this.getList();
      this.getTreeselect();
      this.getRoleList();
      //编辑时加载所有用户
      this.gethuman();
      this.getDicts("sys_normal_disable").then(response => {
        this.statusOptions = response.data;
      });
      this.getDicts("sys_user_sex").then(response => {
        this.sexOptions = response.data;
      });
      this.getConfigKey("sys.user.initPassword").then(response => {
        this.initPassword = response.msg;
      });
      this.getDicts("orgType").then(response => {
        this.orgTypeOptions = response.data;
      });
    },
    methods: {
      /** 角色搜索*/
      typeSearchHandle() {
        let str = undefined;
        let arr = [...this.checkList];
        if (arr.length > 0) {
          str = arr.join(',')
        }
        this.queryParams.roleIds = str;
        this.typeSearchVis = false;
        this.getList();
      },
      /** 获取角色列表*/
      getRoleList() {
        typeRole1().then(
          response => {
            this.scopeList = response.data;
            this.scopeListFilter = [...this.scopeList];
            //console.log(this.scopeList);
          }
        );
      },
      /** 人员划转 */
      switchDeptHandle() {
        if (this.deptChangeForm.deptId && this.deptChangeForm.usersId) {
          switchDept(this.deptChangeForm.deptId,this.deptChangeForm.usersId).then(response => {
            if (response.code === 200) {
              this.msgSuccess("人员划转成功");
              this.deptChangeOpen = false;
              this.deptChangeForm.deptId = undefined;
              this.deptChangeForm.usersId = undefined;
              this.getList();
            }
          });
        }
      },
      /** 设置部门负责人 */
      setleaderHandle() {
        let row = this.selectedItem[0];
        let data = {
          deptId: this.selectedItem[0].deptId,
          leader: this.selectedItem[0].nickName,
          phonenumber: this.selectedItem[0].phonenumber
        }
        setDeptLeader(data).then(response => {
          if (response.code === 200) {
            this.getList();
            this.msgSuccess("设置成功");
          }
        });
      },
      /** 查询用户列表 */
      getList() {
        this.loading = true;
        listUser(this.addDateRange(this.queryParams, this.dateRange)).then(response => {
            this.userList = response.rows;
            this.total = response.total;
            this.loading = false;
          }
        );
      },
      /** 查询部门下拉树结构 */
      getTreeselect() {
        treeselect().then(response => {
          if (!this.deptOptions && response.data.length > 0) {
            this.queryParams.deptName = response.data[0].label
            this.queryParams.deptId = response.data[0].id
          }
          this.deptOptions = response.data;
        });
      },
      // 筛选节点
      filterNode(value, data) {
        if (!value) return true;
        return data.label.indexOf(value) !== -1;
      },
      // 节点单击事件
      handleNodeClick(data) {
        this.queryParams.deptId = data.id;
        this.queryParams.deptName = data.label;
        this.getList();
      },
      // 用户状态修改
      handleStatusChange(type) {
        //单个修改用户状态
        /*let row = this.selectedItem[0];
        row.status = row.status === "0" ? "1" : "0";
        let text = row.status
        text = row.status === "0" ? "启用" : "停用";
        this.$confirm('确认要"' + text + '""' + row.userName + '"用户吗?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(function () {
          return changeUserStatus(row.userId, row.status);
        }).then(() => {
          this.msgSuccess(text + "成功");
          this.getList();
        }).catch(function () {
          row.status = row.status === "0" ? "1" : "0";
        });*/
        //如果没有选中项不执行
        let text = '';
        if(type==1){
          text="激活";
        }else{
          text="停用";
        }
        this.$confirm('确认要' + text + '选中的用户吗?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(_ => {

          let userIds = [];
          for(let i=0;i<this.selectedItem.length;i++){
            userIds.push(this.selectedItem[i].userId);
          }
          return changeUserStatus(userIds.join(","), type);
        }).then(() => {
          this.msgSuccess(text + "成功");
          this.getList();
        }).catch(function () {
          //row.status = row.status === "0" ? "1" : "0";
        });



      },
      // 取消按钮
      cancel() {
        this.open = false;
        this.deptOpen = false;
        this.reset();
        this.resetDept();
      },
      // 表单重置
      reset() {
        this.form = {
          userId: undefined,
          deptId: undefined,
          userName: undefined,
          nickName: undefined,
          password: undefined,
          phonenumber: undefined,
          email: undefined,
          sex: undefined,
          status: "0",
          remark: undefined,
          postIds: [],
          roleIds: []
        };
        this.resetForm("form");
      },
      /** 搜索按钮操作 */
      handleQuery() {
        this.queryParams.page = 1;
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
        this.ids = selection.map(item => item.userId);
        this.selectedItem = selection.map(item => item);
        this.single = selection.length != 1;
        this.multiple = !selection.length;

      },
      /** 新增按钮操作 */
      handleAdd() {
        this.reset();
        this.getTreeselect();
        getUser('', this.queryParams.deptId).then(response => {
          this.postOptions = response.posts;
          this.roleOptions = response.roles;
          this.open = true;
          this.title = "添加用户";
          this.form.deptId = this.queryParams.deptId;
          this.form.password = this.initPassword;
        });
      },
      /** 修改按钮操作 */
      handleUpdate(row) {
       /* this.$router.push({
          name:'Personnel',
          query: {personObj:row}
        })*/
        this.$router.push({
          path:'personDetail',
          query: {userId:row.userId}
        })
        /*this.reset();
        this.getTreeselect();
        const userId = row.userId || this.ids;
        getUser(userId).then(response => {
          this.form = response.data;
          this.postOptions = response.posts;
          this.roleOptions = response.roles;
          this.form.postIds = response.postIds;
          this.form.roleIds = response.roleIds;
          this.open = true;
          this.title = "修改用户";
          this.form.password = "";
        });*/
      },
      /** 重置密码按钮操作 */
      handleResetPwd(row) {
        this.$prompt('请输入"' + row.userName + '"的新密码', "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消"
        }).then(({value}) => {
          resetUserPwd(row.userId, value).then(response => {
            if (response.code === 200) {
              this.msgSuccess("修改成功，新密码是：" + value);
            } else {
              this.msgError(response.msg);
            }
          });
        }).catch(() => {
        });
      },
      /** 提交按钮 */
      submitForm: function () {
        this.$refs["form"].validate(valid => {
          if (valid) {
            if (this.form.userId != undefined) {
              updateUser(this.form).then(response => {
                if (response.code === 200) {
                  this.msgSuccess("修改成功");
                  this.open = false;
                  this.getList();
                } else {
                  this.msgError(response.msg);
                }
              });
            } else {
              addUser(this.form).then(response => {
                if (response.code === 200) {
                  this.msgSuccess("新增成功");
                  this.open = false;
                  this.getList();
                } else {
                  this.msgError(response.msg);
                }
              });
            }
          }
        });
      },
      /** 删除按钮操作 */
      handleDelete(row) {
        const userIds = row.userId || this.ids;
        this.$confirm('是否确认删除用户编号为"' + userIds + '"的数据项?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(function () {
          return delUser(userIds);
        }).then(() => {
          this.getList();
          this.msgSuccess("删除成功");
        }).catch(function () {
        });
      },
      /** 导出按钮操作 */
      handleExport() {
        const queryParams = this.queryParams;
        this.$confirm('是否确认导出所有用户数据项?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(function () {
          return exportUser(queryParams);
        }).then(response => {
          this.download(response.msg);
        }).catch(function () {
        });
      },
      /** 导入按钮操作 */
      handleImport() {
        this.upload.title = "用户导入";
        this.upload.open = true;
      },
      /** 下载模板操作 */
      importTemplate() {
        importTemplate().then(response => {
          this.download(response.msg);
        });
      },
      // 文件上传中处理
      handleFileUploadProgress(event, file, fileList) {
        this.upload.isUploading = true;
      },
      // 文件上传成功处理
      handleFileSuccess(response, file, fileList) {
        this.upload.open = false;
        this.upload.isUploading = false;
        this.$refs.upload.clearFiles();
        this.$alert(response.msg, "导入结果", {dangerouslyUseHTMLString: true});
        this.getList();
      },
      // 提交上传文件
      submitFileForm() {
        this.$refs.upload.submit();
      },
      //  部门操作
      resetDept() {
        this.deptForm = {
          deptId: undefined,
          parentId: undefined,
          deptName: undefined,
          orderNum: undefined,
          leader: undefined,
          phone: undefined,
          email: undefined,
          status: "0",
          orgType:'company'
        };
        this.resetForm("deptForm");
      },
      //  添加
      handleAddDept(node, data) {
        this.resetDept();
        if (data != undefined) {
          this.deptForm.parentId = data.id;
        }
        this.isEdit = false;
        this.parentName = data.label;
        this.deptOpen = true;
        this.deptTitle = "添加节点";
      },
      /** 修改按钮操作 */
      handleDeptUpdate(data, node) {
        this.resetDept();
        this.isEdit = true;
        debugger
        this.parentName = node.parent.data.label
        getDept(data.id).then(response => {
          this.deptForm = response.data;

          this.deptOpen = true;
          this.deptTitle = "编辑";
        });
      },
      /** 提交按钮 */
      submitDeptForm: function () {
        this.$refs["form"].validate(valid => {
          if (valid) {
            if (this.deptForm.deptId != undefined) {
              // alert('编辑')
              updateDept(this.deptForm).then(response => {
                if (response.code === 200) {
                  this.msgSuccess("修改成功");
                  this.deptOpen = false;
                  this.getTreeselect();
                } else {
                  this.msgError(response.msg);
                }
              });
            } else {
              // alert('新增')
              addDept(this.deptForm).then(response => {
                if (response.code === 200) {
                  this.msgSuccess("新增成功");
                  this.deptOpen = false;
                  this.getTreeselect();
                } else {
                  this.msgError(response.msg);
                }
              });
            }
          }
        });
      },
      /** 删除按钮操作 */
      handleDeptDelete(data) {
        this.$confirm('是否确认删除名称为"' + data.label + '"的数据项?', "警告", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning"
        }).then(function () {
          return delDept(data.id);
        }).then(() => {
          this.getTreeselect();
          this.msgSuccess("删除成功");
        }).catch(function () {
        });
      },
      /** 转换部门数据结构 */
      normalizer(node) {
        if (node.children && !node.children.length) {
          delete node.children;
        }
        return {
          id: node.deptId,
          label: node.deptName,
          children: node.children
        };
      },
      handleDeptChange(row) {
        let str = [], ids = [];
        str = this.selectedItem.map(item => `${item.userName}`)
        ids = this.selectedItem.map(item => `${item.userId}`)
        this.deptChangeForm.names = str.join('，')
        this.deptChangeForm.usersId = ids.join(',')
        this.deptChangeOpen = true
      },
      treeEnterHandle(id) {
        this.isTreeHandle = id;
      },
      switchStatusType(type) {
        var res = "";
        if (type === '0') {
          res = "正常"
        } else {
          res = "停用"
        }
        return res;
      },

      //操作树菜单
      opeTree(type){

        let self = this;
        // 将没有转换成树的原数据
        let list = this.deptOptions;
        //全部展开
        if(type==1){
          for (let i = 0; i < list.length; i++) {
            // 将没有转换成树的原数据设置key为... 的展开
            self.$refs.tree.store.nodesMap[list[i].id].expanded = true
          }
        }else if(type==2){//全部关闭
          for (let i = 0; i < list.length; i++) {
            self.$refs.tree.store.nodesMap[list[i].id].expanded = false
          }
        }else if(type==3){//全部展开子节点
          for(let i=0;i<this.$refs.tree.store._getAllNodes().length;i++){
            this.$refs.tree.store._getAllNodes()[i].expanded=true;
          }
        }else if(type==4){//全部关闭子节点
          for(let i=0;i<this.$refs.tree.store._getAllNodes().length;i++){
            this.$refs.tree.store._getAllNodes()[i].expanded=false;
          }
        }


      },
      uploadUser(){
        this.queryParams2["pageNum"] = parseInt(this.queryParams2["pageNum"])+1;
        getBaseUserlist(this.queryParams2).then(response => {
          let code = response.code;
          let mydata = response.rows;
          let arr = [];
          for(let i=0;i<mydata.length;i++){
            let obj ={};
            obj["dictLabelName"] = mydata[i].nickName+ "  "+mydata[i].deptName;
            obj["dictLabel"] = mydata[i].nickName;
            obj["dictValue"] = mydata[i].userId;
            //arr.push(obj);
            this.userOption.push(obj);
          }
        });
      },
      dataFilter(val){
        this.queryParams2["pageSize"] = 10;
        let param = this.queryParams2;
        param["searchValue"] = val;
        getBaseUserlist(param).then(response => {
          let code = response.code;
          let mydata = response.rows;
          let arr = [];
          for(let i=0;i<mydata.length;i++){
            let obj ={};
            obj["dictLabelName"] = mydata[i].nickName + "  " +mydata[i].deptName;
            obj["dictLabel"] = mydata[i].nickName;
            obj["dictValue"] = mydata[i].userId;
            arr.push(obj);
          }
          this.userOption=arr;
        });

      },
      //筛选人员，格式替换
      gethuman(param){

        getBaseUserlist("").then(response => {
          let code = response.code;
          let mydata = response.rows;
          let arr = [];
          for(let i=0;i<mydata.length;i++){
            let obj ={};
            obj["dictLabelName"] = mydata[i].nickName + "  " + mydata[i].deptName ;
            obj["dictLabel"] = mydata[i].nickName;
            obj["dictValue"] = mydata[i].userId;
            arr.push(obj);
          }
          this.userOption=arr;
        });
      },

      isDeptLeader({row,column,rowIndex,columnIndex}){
            if(row.isDeptLeader === '1' || row.isDeptLeader === 1){
                return 'isDeptLeader';
            }
     },

    }
  };
</script>
<style scoped>
  .custom-tree-node {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 14px;
    padding-right: 8px;
  }
  .tree-left {
    padding-top: 15px;
    border-right: 1px solid #eeeeee;
    min-height: calc(100vh - 200px);
  }
  .table-right {
    padding: 15px 0 0 0!important;
  }
  .design-list {
    font-size: 20px;
    color: #555555;
    padding: 0 0 15px 0;
  }
  .mbutton {
    color: #C0C4CC;
    cursor: pointer;
    background-image: none;
    background-color: #fff;
    border: 1px solid #e6ebf5;
    margin-left: 10px;
  }
  ::v-deep .el-input-number__decrease{
    display: block !important;
  }
</style>
<style>
  .app-container-nm .el-tabs--border-card>.el-tabs__content {
    padding-top: 0;
  }
  .add_persion .el-dialog__body{
    padding:10px 20px;
  }
  .add_persion .el-form-item{
    margin-bottom: 10px;
  }
  .add_persion .el-form--label-top .el-form-item__label{
    padding: 0;
  }
  .add_persion .el-select{
    width: 100%;
  }
  .add_persion .el-date-editor.el-input, .el-date-editor.el-input__inner{
    width: 100%;
  }
  ._type-search_ .el-checkbox {
    margin: 10px 0 0 3px;
  }
  .el-checkbox__inner{
    border:1px solid #ccc;
  }
  .el-input__inner{
    border:1px solid #ccc;
  }
  .isDeptLeader{
    font-weight: bold;
  }

  .table-tree{
    height: 600px;
    overflow-y: auto;
  }
</style>
