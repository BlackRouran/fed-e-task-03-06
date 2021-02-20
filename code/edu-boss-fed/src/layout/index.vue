<template>
  <el-container>
    <el-aside width='200px'>
      <app-aslide />
    </el-aside>
    <el-container>
      <el-header>
        <app-header />
      </el-header>
      <el-main>
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>

<script lang='ts'>
import Vue from 'vue'
import AppAslide from './components/app-aside.vue'
import AppHeader from './components/app-header.vue'

export default Vue.extend({
  name: 'Layout',
  components: {
    AppAslide,
    AppHeader
  }
})
</script>

<style lang='scss' scoped>
.el-container {
  height: 100vh;
  min-width:980px;
}
.el-aside{
  background: #d3dce6;
}
.el-header {
  background-color: #fff;
}
.el-main {
  background-color: #e9eef3;
}
</style>
