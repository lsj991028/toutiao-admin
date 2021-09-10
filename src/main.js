import Vue from 'vue'
import App from './App.vue'
import router from './router'
// 加载全局样式文件
import './style/index.less'

// 引入ElementUI组件库
import ElementUI from 'element-ui'
// 引入ElementUI组件库的样式
import 'element-ui/lib/theme-chalk/index.css'

Vue.config.productionTip = false
// 使用ElementUI
Vue.use(ElementUI)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
