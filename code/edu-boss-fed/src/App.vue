<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import request from '@/utils/request'

request({
  method: 'GET',
  url: '/boss/v2/api-docs?group=edu-boss-boot'
})

export default Vue.extend({
  name: 'App'
})
</script>

<style lang="scss" scoped>
.text {
  color: $success-color;
}
</style>
