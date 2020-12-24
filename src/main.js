import Vue from 'vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

import {tree} from './components/index';

import App from './examples/tree.vue'

Vue.use(ElementUI)
Vue.use(tree)

new Vue({
  render: h => h(App)
}).$mount('#app');
