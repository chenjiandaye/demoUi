import tree from './Tree/index';
import LineChart from './LineChart/index';

const components = [
  tree,
  LineChart
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
  LineChart
};
