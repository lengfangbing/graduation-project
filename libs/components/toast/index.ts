import ReactDom from 'react-dom';
import React from 'react';
import ToastComponent, { addIconConfig } from './index/index';

interface Config {
  title: string,
  icon: string
}
interface Toast{
  show: Function,
  addIconConfig: Function
}

const val: any = [];
let timer: any = null;
let num = 0;

// 创建toast容器
const domContainer = document.createElement('div');
document.body.appendChild(domContainer);
function setData() {
  const { title, icon = '' } = val.shift();
  ReactDom.render(
    React.createElement(
      ToastComponent,
      {
        title,
        icon,
        key: ++num,
      },
    ),
    domContainer,
  );
}

const Toast: Toast = { show: () => {}, addIconConfig: () => {}};
Toast.show = (config: Config) => {
  if(config.title.length === 0){
    return;
  }
  val.push(config);
  if (!timer) {
    setData();
  }
  timer = timer || setInterval(() => {
    if (val.length === 0) {
      clearInterval(timer);
      timer = null;
    } else {
      setData();
    }
  }, 2700);
}
Toast.addIconConfig = addIconConfig;

window.Toast = Toast;
window.showToast = Toast.show;

export default { addIconConfig };
