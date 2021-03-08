import axios from 'axios'
import store from '@/store'
import { Message } from 'element-ui'
import router from '@/router'
import qs from 'qs'

const request = axios.create({
  // 配置项

})

function redirectLogin () {
  router.push({
    name: 'login',
    query: {
      redirect: router.currentRoute.fullPath
    }
  })
}

function reflashToken () {
  return axios.create()({
    method: 'POST',
    url: '/front/user/refresh_token',
    data: qs.stringify({
      refreshtoken: store.state.user.refresh_token
    })
  })
}

// 请求拦截器
request.interceptors.request.use(function (config) {
  // Do something before request is sent
  // 请求正常
  // console.log(config)
  const { user } = store.state
  if (user && user.access_token) {
    config.headers.Authorization = user.access_token
  }
  // 一定要返回config,否则请求无法发出
  return config
}, function (error) {
  // 如果请求本身出错了
  // Do something with request error
  return Promise.reject(error)
})

// 响应拦截器
let isReflash = false // 刷新token开关
let requests: any[] = [] // 储存刷新token期间储存的请求
request.interceptors.response.use(function (response) {
  // Do something with response data 2xx的状态码才会进入这里
  return response
}, async function (error) {
  // Do something with response error 超出2xx的状态码会进入这里
  if (error.response) { // 请求已经发出了且收到响应，但是状态码超过200
    // 400 401 403 404 500
    const { status } = error.response
    if (status === 400) {
      Message.error('请求参数错误')
    } else if (status === 401) { // token无效
      if (!store.state.user) {
        redirectLogin()
        return Promise.reject(error)
      }
      // 尝试刷新token
      if (!isReflash) {
        isReflash = true
        return reflashToken().then(res => {
          // 储存新的token
          if (!res.data.success) {
            throw new Error('刷新 token 失败')
          }
          // 刷新token成功
          store.commit('updateUser', res.data.content)
          // 遍历队列 重新执行之前储存的请求
          requests.forEach(cb => cb())
          requests = []
          return request(error.config)
        }).catch(err => {
          console.log(err)
          store.commit('updateUser', null)
          redirectLogin()
          return Promise.reject(error)
        }).finally(() => {
          isReflash = false
        })
      }
      // 刷新状态下 把请求挂起放在数组中
      return new Promise(resolve => {
        requests.push(() => {
          resolve(request(error.config))
        })
      })
    } else if (status === 403) {
      Message.error('没权限请联系管理员')
    } else if (status === 404) {
      Message.error('请求资源不存在')
    } else if (status >= 500) {
      Message.error('服务端错误')
    }
  } else if (error.request) { // 请求发出未收到响应
    Message.error('请求超时，请刷新后重试')
  } else { // 请求本身出错
    Message.error(`请求出错, ${error.message}`)
  }
  return Promise.reject(error)
})

export default request
