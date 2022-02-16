<template>
  <div v-if="!item.hidden">
    <template v-if="hasOneShowingChild(item.children,item) && (!onlyOneChild.children||onlyOneChild.noShowingChildren)&&!item.alwaysShow">
      <app-link v-if="onlyOneChild.meta" :to="resolvePath(onlyOneChild.path)">
        <el-menu-item :index="resolvePath(onlyOneChild.path)" :class="{'submenu-title-noDropdown':!isNest}">
          <item :icon="onlyOneChild.meta.icon||(item.meta&&item.meta.icon)" :title="onlyOneChild.meta.title" />
        </el-menu-item>
      </app-link>
    </template>

    <!--<el-submenu v-else ref="subMenu" :index="resolvePath(item.path)" popper-append-to-body>{{item}}
      <template slot="title">
        <item v-if="item.meta" :icon="item.meta && item.meta.icon" :title="item.meta.title" />
      </template>
      <sidebar-item
        v-for="child in item.children"
        :key="child.path"
        :is-nest="true"
        :item="child"
        :base-path="resolvePath(child.path)"
        class="nest-menu"
      />
    </el-submenu>-->
    <el-menu v-else  :default-active="$route.path" background-color="#31405d" text-color="#BFCBD9" active-text-color="#1989FA">
      <!-- 一级菜单 -->
      <template>
        <el-submenu v-if="item.children && item.children.length" ref="subMenu" :index="resolvePath(item.path)">
          <template slot="title"><item v-if="item.meta" :icon="item.meta && item.meta.icon" :title="item.meta.title" /></template>

          <!-- 二级菜单 -->
          <template v-for="itemChild in item.children">
            <!-- 有子集-->
            <el-submenu v-if="itemChild.children && itemChild.children.length" :index="itemChild.path"
                        :key="itemChild.path" :base-path="resolvePath(itemChild.path)">
              <template slot="title">
                <item v-if="itemChild.meta.icon" :icon="itemChild.meta && itemChild.meta.icon" :title="itemChild.meta.title" />
              </template>

              <!-- 三级菜单 -->
              <sidebar-item-xpm
                v-for="itemChild_Child  in itemChild.children"
                :index="itemChild_Child.path"
                :key="itemChild_Child.path"
                :is-nest="true"
                :item="itemChild_Child"
                :base-path="resolvePathToXpm(itemChild_Child.path,itemChild_Child.modSid,itemChild_Child.modName)"
                class="nest-menu"
              />
            </el-submenu>
            <!--没有子集-->
            <sidebar-item-xpm v-else
                          :key="itemChild.path"
                          :is-nest="true"
                          :item="itemChild"
                          :base-path="resolvePathToXpm(itemChild.path,itemChild.modSid,itemChild.modName)"
                          class="nest-menu"
            />
          </template>
        </el-submenu>

        <el-menu-item v-else :index="item.path" :key="item.path"><i :class="item.meta.icon"></i><span slot="title">{{item.meta.title}}</span></el-menu-item>
      </template>

    </el-menu>
  </div>
</template>

<script>
  import path from 'path'
  import { isExternal } from '@/utils/validate'
  import Item from './Item'
  import AppLink from './Link'
  import FixiOSBug from './FixiOSBug'

  export default {
    name: 'SidebarItemXpm',
    components: { Item, AppLink },
    mixins: [FixiOSBug],
    props: {
      // route object
      item: {
        type: Object,
        required: true
      },
      isNest: {
        type: Boolean,
        default: false
      },
      basePath: {
        type: String,
        default: ''
      }
    },
    data() {
      this.onlyOneChild = null
      return {

      }
    },
    created() {
    },
    methods: {
      hasOneShowingChild(children = [], parent) {
        const showingChildren = children.filter(item => {
          // console.log(11,item)
          if (item.hidden) {
            return false
          } else {
            // Temp set(will be used if only has one showing child)
            this.onlyOneChild = item
            return true
          }
        })
        // console.log(22,showingChildren)
        // When there is only one child router, the child router is displayed by default
        if (showingChildren.length === 1) {
          return true
        }

        // Show parent if there are no child router to display
        if (showingChildren.length === 0) {
          this.onlyOneChild = { ... parent, path: '', noShowingChildren: true }
          return true
        }

        return false
      },
      resolvePath(routePath) {
        if (isExternal(routePath)) {
          return routePath
        }
        if (isExternal(this.basePath)) {
          return this.basePath
        }
        return path.resolve(this.basePath, routePath)
      },
      resolvePathToXpm(routePath,modSid,modName) {
        if (isExternal(routePath)) {
          return routePath
        }
        if (isExternal(this.basePath)) {
          return this.basePath
        }
        /*if(modSid == 'homepage'){
          return '/xpmhome'
        }else{
          return '/xpm?modSid=' + modSid + '&modName='+ modName;
        }*/
        return '/xpm?modSid=' + modSid + '&modName='+ modName;

      }
    }
  }
</script>
