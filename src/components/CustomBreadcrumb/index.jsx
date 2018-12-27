import React from 'react';
// 全局管理数据
import store from '../../store'

import { Breadcrumb } from 'antd';


export default class Breadcrumbs extends React.Component {
        // {history, location, match}
        // console.log(history); // 包含一些跳转的方法push, go, goback等

        // console.log(location); // 包含参数,state以及路径

        // console.log(match); // 包含拼接在url后面的参数
    componentDidMount() {
      console.log(store.getState())
    }
    render() {
        // 获取面包屑的length的长度
        let propLen = store.getState().header.breadcrumbName ? store.getState().header.breadcrumbName.length : 0
        return (
            <div>
                <Breadcrumb style={{ margin: '12px 0' }}>
                    {
                        propLen > 1 ? store.getState().header.breadcrumbName.map((item, index) => {
                            return <Breadcrumb.Item key={index}>{item}</Breadcrumb.Item>
                        }) : <Breadcrumb.Item>{store.getState().header.breadcrumbName}</Breadcrumb.Item>
                    }
                </Breadcrumb>
            </div>
        )
    }
}