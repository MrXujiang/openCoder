import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/'
import './registerServiceWorker'
import { Button, Layout, Menu, Icon, Avatar } from 'ant-design-vue'
// 1.1.2版本
Vue.component(Button.name, Button)
// 1.1.3之后版本会自动注册组件
Vue.use(Layout)
Vue.use(Menu)
Vue.use(Icon)
Vue.use(Avatar)


Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
