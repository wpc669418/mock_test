import axios from 'axios'
import { config } from './config'

// 创建了一个实例
var http = axios.create({
  baseURL: config.base_url
})

// 请求发前拦截，header中添加token
http.interceptors.request.use(res => {
  res.headers.common['X-Token'] = localStorage.getItem('token') || ''
  return res
})

// 添加响应拦截器
http.interceptors.response.use(function(response) {
  // 对响应数据做点什么
  const res = response.data
  return res
}, function(error) {
  // 对响应错误做点什么
  return Promise.reject(error)
})

class HTTP {
  logout() {
    // 退出的处理
  }

  get(url, params, config = {}) {
    const that = this
    const result = http.get(url, { params }, config)

    result.then(res => {
      if (res.code === '401') {
        setTimeout(function() {
          that.logout()
        }, 1000)
      }
    }).catch(reason => {
      // 异常捕捉 防止代码无法执行
      console.log(reason)
    })
    return result
  }

  post(url, params, config = {}) {
    const that = this
    const result = http.post(url, params, config)
    result.then(res => {
      if (res.code === '401') {
        setTimeout(function() {
          that.logout()
        }, 1000)
      }
    }).catch(reason => {
      // 异常捕捉 防止代码无法执行
      console.log(reason)
    })
    return result
  }
}

export { HTTP }
