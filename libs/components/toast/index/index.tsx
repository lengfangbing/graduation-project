import React from 'react';
import classnames from 'classnames';

import './index.less';
// @ts-ignore
import SuccessPng from '../assets/success.png';
// @ts-ignore
import FailPng from '../assets/fail.png';

interface Props {
  title: string,
  icon: string,
}
// 如要增加icon类型
// 1. 在iconClassList中加上类型
// 2. 在iconImage中加上icon类型及对应的图片映射
const iconClassList = ['success', 'fail'];
const iconImage: { [key: string]: any } = {
  success: () => SuccessPng,
  fail: () => FailPng,
}
// 增加可自行配置icon和方法
function addIconConfig(icon: string, image: object | string){
  iconClassList.push(icon);
  iconImage[icon] = () => image;
}
class ToastComponent extends React.PureComponent<Props>{
  render(){
    const { title, icon } = this.props;
    const toastContainerClass = classnames({
      'toast-container': true,
      icon: iconClassList.includes(icon),
    });
    const toastWrapperClass = classnames({
      'toast-wrapper': true,
      icon: iconClassList.includes(icon),
    });
    return (
      <div className={toastContainerClass}>
        {
          iconImage[icon]
            && (
              <img className="toast-image" alt='' src={iconImage[icon]()} />
            )
        }
        <p className={toastWrapperClass}>
          {title}
        </p>
      </div>
    );
  }
}


export default ToastComponent;
export { addIconConfig };
