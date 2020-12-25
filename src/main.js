import Vue from 'vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

import {tree,LineChart,BarChart,PieChart} from './components/index';

import App from './examples/pieChart.vue'

Vue.use(ElementUI)
Vue.use(tree)
Vue.use(LineChart)
Vue.use(BarChart)
Vue.use(PieChart)

new Vue({
  render: h => h(App)
}).$mount('#app');
