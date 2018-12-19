import React from 'react';
import { Link } from 'react-router-dom'
// 全局store
import store from '../store';
// 路由转载的数据
import routerData from '../routers/routerData'

import { Menu, Icon } from 'antd'
const SubMenu = Menu.SubMenu;


export default class Routers extends React.Component {
	// 在组件挂载到DOM前调用，且只会被调用一次
	componentWillMount() {
		// 刷新页面后导航栏的选中效果
		this.handleSelect()
	}
	// 点击左侧导航栏
	handleSelect() {
		let path = window.location.pathname
		// let path = '/' + args[args.length - 1]
        for (var i = 0; i < routerData.length; i++) {
			if (routerData[i].path === path) {
				
				// 给store赋值
				store.dispatch({
					type: 'breadcrumArr',
					value: routerData[i]
				})
			}
			// 如果为/则默认给第一条数据
			if (path === "/") {
				store.dispatch({
					type: 'breadcrumArr',
					value: routerData[0]
				})
			}
		}
	}
	render() {
		return (
			<div>
				<Menu theme="dark"
					mode="inline"
					defaultOpenKeys={store.getState().header.defaultOpenKeys}
					selectedKeys={store.getState().header.keys}
					onClick={this.handleSelect.bind(this)}
				>
					<Menu.Item key="nav">
						<Link to="/nav">
							<Icon type="global" />
							<span className="nav-text">引导页</span>
						</Link>
	                </Menu.Item>
					<SubMenu key="headers" title={<span><Icon type="home" /><span>首页</span></span>}>
						<Menu.Item key="headerList">
							<Link to="/header/list">
								<Icon type="ordered-list" />
								<span className="nav-text">列表</span>
							</Link>
						</Menu.Item>
						<Menu.Item key="headerAdd">
							<Link to="/header/add">
								<Icon type="zoom-in" />
								<span className="nav-text">添加</span>
							</Link>
						</Menu.Item>
					</SubMenu>
					<SubMenu key="mine" title={<span><Icon type="team" /><span>我的</span></span>}>
						<Menu.Item key="mineAdd">
							<Link to="/mine">
								<Icon type="zoom-in" />
								<span className="nav-text">添加</span>
							</Link>
						</Menu.Item>
					</SubMenu>
					<SubMenu key="sub2" title={<span><Icon type="crown" /><span>官网</span></span>}>
						<Menu.Item key="9">添加</Menu.Item>
						<Menu.Item key="10">查看</Menu.Item>
						<SubMenu key="sub3" title="子官网">
							<Menu.Item key="11">添加</Menu.Item>
							<Menu.Item key="12">查看</Menu.Item>
						</SubMenu>
					</SubMenu>
	            </Menu>
			</div>
		)
	}
}
