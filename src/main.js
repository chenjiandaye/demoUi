import Vue from 'vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

import {tree,LineChart,BarChart} from './components/index';

import App from './examples/barChart.vue'

Vue.use(ElementUI)
Vue.use(tree)
Vue.use(LineChart)
Vue.use(BarChart)

new Vue({
  render: h => h(App)
}).$mount('#app');
