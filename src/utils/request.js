// 基于 axios 封装的请求模块
import axios from 'axios'

// 创建一个 axios 实例，就是复制了一个 axios
// 通过实例去发请求，把需要的配置配置给这个实例来处理
const request = axios.create({
  baseURL: 'http://api-toutiao-web.itheima.net' // 请求的基本配置
})

// 暴露request,request相当于axios，跟axios 一样使用就行
export default request
