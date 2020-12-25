import tree from './Tree/index';
import LineChart from './LineChart/index';
import BarChart from './BarChart/index';
import PieChart from './PieChart/index';

const components = [
  tree,
  LineChart,
  BarChart,
  PieChart
];

let sime = {
  install(Vue) {
    components.forEach(component => {
      Vue.component(component.name, component);
    });
  }
};

export default sime;


export {
  tree,
  LineChart,
  BarChart,
  PieChart
};
