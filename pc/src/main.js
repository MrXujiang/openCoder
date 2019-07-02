import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './registerServiceWorker'

import { Button,
         Select,
         Table,
         TableColumn,
         Upload,
         Icon
} from 'element-ui';

Vue.component(Button.name, Button);
Vue.component(Select.name, Select);
Vue.component(Table.name, Table);
Vue.component(TableColumn.name, TableColumn);
Vue.component(Upload.name, Upload);
Vue.component(Icon.name, Icon);

Vue.config.productionTip = false

// 测试自定义环境变量
console.log(process.env);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
