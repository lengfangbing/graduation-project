# Toast组件使用说明

在此输入正文


**使用方法**

 - 引入该toast组件:
```javascript
import '@/packages/components/toast'; // toast组件路径
```

 - 也可以单独增加icon和图片映射配置:
```javascript
import '@/packages/components/toast'; // toast组件路径
Toast.addIconConfig('iconName', iconImage);

// 或者

import config from '@/packages/components/toast'; //toast 组件路径
config.addIconConfig('iconName', iconImage);

// iconImage可以是import的图片也可以是url
// 相同的iconName, 后者会覆盖前者iconImage**
```
 - 调用方法:
 
```javascript
window.Toast.show({
  title: '这是toast文案',
  icon: '这是toast的iconName, 默认有success, fail(可以通过上面提到的方法配置), 其他的所有iconName均会被认为空'
});

// 或者

window.showToast({
  title: '这是toast文案',
  icon: '这是toast的iconName, 默认有success, fail(可以通过上面提到的方法配置), 其他的所有iconName均会被认为空'
});
```

