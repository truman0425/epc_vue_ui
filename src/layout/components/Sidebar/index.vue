<template>
    <div :class="{'has-logo':showLogo}">
        <logo v-if="showLogo" :collapse="isCollapse" />
        <div class="slide-logo-bar"></div>
        <el-scrollbar wrap-class="scrollbar-wrapper">
            <el-menu
                :default-active="activeMenu"
                :collapse="isCollapse"
                :background-color="variables.menuBg"
                :text-color="variables.menuText"
                :unique-opened="true"
                :active-text-color="settings.theme"
                :collapse-transition="false"
                mode="vertical"
            >
                <sidebar-item
                    v-for="(route, index) in permission_routes"
                    :key="route.path  + index"
                    :item="route"
                    :base-path="route.path"
                    v-if="route.type!='xpm'"
                    :other="route.type"
                />
              <SidebarItemXpm
                id="side-menu"
                v-for="(route, index) in permission_routes"
                :key="route.path  + index"
                :item="route"
                :base-path="route.path"
                v-if="route.type=='xpm'"
                :other="route.type"
              /><!--:index="index"-->
              <!--v-bind:class="{ 'curSelectedNode':index==current}"
                @click="curSelectedNode(index)"-->
            </el-menu>
        </el-scrollbar>
    </div>
</template>

<script>
import { mapGetters, mapState } from "vuex";
import Logo from "./Logo";
import SidebarItem from "./SidebarItem";
import SidebarItemXpm from "./SidebarItemxpm";
import variables from "@/assets/styles/variables.scss";

export default {
    components: { SidebarItemXpm,SidebarItem, Logo },
    computed: {
        ...mapState(["settings"]),
        ...mapGetters(["permission_routes", "sidebar"]),
        activeMenu() {
            const route = this.$route;
            const { meta, path } = route;
            // if set path, the sidebar will highlight the path you set
            if (meta.activeMenu) {
                return meta.activeMenu;
            }
            return path;
        },
        showLogo() {
            return this.$store.state.settings.sidebarLogo;
        },
        variables() {
            return variables;
        },
        isCollapse() {
            return !this.sidebar.opened;
        }
    },
  data() {
    return {
      current:0,
    }
  },
  methods: {
    curSelectedNode(index){
      this.current=index;
    }
  }
};
</script>
<style>
  .curSelectedNode{
    color:#ff00ff;
  }

  .slide-logo-bar{
    width: 320px;
    height: 10px;
    background-color: #091926;
    opacity: 0.5;
  }
</style>
