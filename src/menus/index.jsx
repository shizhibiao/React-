import React from 'react';
import { Link } from 'react-router-dom'

// 全局store
import store from '../store';
// 路由转载的数据
import routerData from '../routers/routerData'

import { Menu, Icon } from 'antd'
// const SubMenu = Menu.SubMenu;
import MenusData from './menusData'


export default class Routers extends React.Component {
	constructor() {
		super();
		this.state = {
			openKeys: [],
			selectedKeys: []
		}
	}
	componentDidMount() {
		// 初始化数据
		this.handleSelectedKeys()
		this.handleSelect()
	}
	handleSelectedKeys() {
		// 防止页面刷新侧边栏又初始化了
		const pathname = window.location.pathname
		//获取当前所在的目录层级
		const rank = pathname.split('/')
		switch (rank.length) {
		  case 2 :  //一级目录
			this.setState({
			  selectedKeys: [pathname]
			})
			break;
		  case 4 : //三级目录，要展开两个subMenu
			this.setState({
			  selectedKeys: [pathname],
			  openKeys: [rank.slice(0, 2).join('/'), rank.slice(0, 3).join('/')]
			})
			break;
		  default :
			this.setState({
			  selectedKeys: [pathname],
			  openKeys: [pathname.substr(0, pathname.lastIndexOf('/'))]
			})
		}
	}
	// 选中时触发
	handleSelect() {
		// 匹配路由将保存到redux
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
	//此函数的作用只展开当前父级菜单（父级菜单下可能还有子菜单）
	onOpenChange = (openKeys) => {
		if (openKeys.length === 0 || openKeys.length === 1) {
			this.setState({
				openKeys
			})
			return
		}
		//最新展开的菜单
		const latestOpenKey = openKeys[openKeys.length - 1]
		//判断最新展开的菜单是不是父级菜单，若是父级菜单就只展开一个，不是父级菜单就展开父级菜单和当前子菜单
		//因为我的子菜单的key包含了父级菜单，所以不用像官网的例子单独定义父级菜单数组，然后比较当前菜单在不在父级菜单数组里面。
		//只适用于3级菜单
		if (latestOpenKey.includes(openKeys[0])) {
			this.setState({
				openKeys
			})
		} else {
			this.setState({
				openKeys: [latestOpenKey]
			})
		}
	}
	renderMenuItem = ({path, icon, title}) => {
		return (
		  	<Menu.Item key={path}>
				<Link to={path}>
					{icon && <Icon type={icon}/>}
					<span>{title}</span>
				</Link>
		  	</Menu.Item>
		)
	}
	renderSubMenu = ({path, icon, title, subs}) => {
		return (
			<Menu.SubMenu key={path} title={<span>{icon && <Icon type={icon}/>}<span>{title}</span></span>}>
				{
					subs && subs.map(item => {
						return item.subs && item.subs.length > 0 ? this.renderSubMenu(item) : this.renderMenuItem(item)
					})
				}
			</Menu.SubMenu>
		)
	}
	render() {
		const {openKeys, selectedKeys} = this.state
		return (
			<div>
				<Menu 
					onOpenChange={this.onOpenChange.bind(this)}
					openKeys={openKeys}
					theme="dark"
					mode="inline"
					selectedKeys={selectedKeys}
					onClick={({key}) => this.setState({selectedKeys: [key]})}
					onSelect={this.handleSelect.bind(this)}
				>
					{
						MenusData && MenusData.map(item => {
							return item.subs && item.subs.length > 0 ? this.renderSubMenu(item) : this.renderMenuItem(item)
						})
					}
	            </Menu>
			</div>
		)
	}
}
