import tree from './Tree/index';

const components = [
  tree
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
  tree
};
