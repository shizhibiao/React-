import React from 'react';
import ReactDOM from 'react-dom';

import { LocaleProvider } from 'antd'
import zhCN from 'antd/lib/locale-provider/zh_CN';
// import moment from 'moment';
// 全局安装moment然后时间控件内部的也变成中文了
import 'moment/locale/zh-cn';

import './index.css';//引入样式
import App from './App.js';//引入自己写的组件(class)
// import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
    <LocaleProvider locale={zhCN}>
      <App />
    </LocaleProvider>
  , document.getElementById('root')
);

// registerServiceWorker();
//registerServiceWorker就是为react项目注册了一个service worker，
// 用来做资源的缓存，这样你下次访问时，就可以更快的获取资