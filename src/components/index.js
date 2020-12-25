import tree from './Tree/index';
import LineChart from './LineChart/index';
import BarChart from './BarChart/index';

const components = [
  tree,
  LineChart,
  BarChart
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
  BarChart
};
