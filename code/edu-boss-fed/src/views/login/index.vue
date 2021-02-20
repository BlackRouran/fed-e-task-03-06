<template>
  <div class="login">
    <el-form ref="form" class="login-form" :rules="rules" :model="form" label-width="80px" label-position="top">
      <el-form-item label="手机号" prop="phone">
        <el-input v-model="form.phone"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="form.password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" class="login-btn" :loading="isLoading" @click="onSubmit">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Form } from 'element-ui'
import { login } from '@/api/user'

export default Vue.extend({
  name: 'LoginIndex',
  data () {
    return {
      form: {
        phone: '18201288771',
        password: '111111'
      },
      rules: {
        phone: [
          { required: true, message: '请输入手机号', trigger: 'change' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'change' }
        ]
      },
      isLoading: false
    }
  },
  methods: {
    async onSubmit () {
      try {
        // 校验
        await (this.$refs.form as Form).validate()
        this.isLoading = true
        // 提交表单
        const { data } = await login(this.form)
        if (data.state !== 1) {
          return this.$message.error(data.message)
        } else {
          this.$store.commit('updateUser', data.content)
          // 如果成功跳转首页
          this.$router.push({
            name: 'home'
          })
          this.$message.success('登录成功')
        }
      } catch (err) {
        console.log('登录失败', err)
      }
      this.isLoading = false
    }
  }
})
</script>

<style lang="scss" scoped>
.login {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  .login-form {
    padding: 20px;
    width: 300px;
    background-color: #fff;
    border-radius: 5px;
  }
  .login-btn{
    width: 100%;
  }
}
</style>
