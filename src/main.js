import Vue from 'vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

import {tree,LineChart} from './components/index';

import App from './examples/lineChart.vue'

Vue.use(ElementUI)
Vue.use(tree)
Vue.use(LineChart)

new Vue({
  render: h => h(App)
}).$mount('#app');
