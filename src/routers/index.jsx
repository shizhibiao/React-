import React from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
// 路由数据
import RouterData from './routerData'

// 错误地址可以跳转到一个错误页面（引入错误组件然后写到最后面）
import ErrorView from '../components/errorView/index.jsx'


export default class Routers extends React.Component {
    render() {
        return (
            <div>
                <Switch>
                    {RouterData.map((item, index) => {
                        return <Route key={index} path={item.path} component={item.component}></Route>
                    })}
                    {/* 重定向 */}
                    <Route path='/' exact render={()=> (
                        <Redirect to="/nav" />
                    )}/>
                    <Route component={ErrorView} />
                </Switch>
            </div>
        )
    }
}