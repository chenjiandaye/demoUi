import Vue from 'vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

import App from './examples/tree.vue'

import {tree} from './components/index';

Vue.use(ElementUI)
Vue.use(tree)

new Vue({
  render: h => h(App)
}).$mount('#app');
