import React,{Component} from 'react';
import { BrowserRouter } from 'react-router-dom'
// 左侧导航栏
import Menus from './menus/index.jsx';
// center上的导航小标题
import Breadcrumbs from './breadcrumbs/index.jsx'
// 页面
import Routers from './routers/index.jsx';


import { Layout, Icon, Avatar, Badge } from 'antd';
import 'antd/dist/antd.css';
// import logo from './logo.svg';
import './App.css'
const { Header, Content, Footer, Sider } = Layout;



//自定义组件SiderDemo
class App extends Component {
    state = {
        collapsed: false,
        mode: 'inline',
    };

    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    }

    render() {
        return (
            <BrowserRouter>
                <Layout>
                    <Sider
                        trigger={null}
                        collapsible
                        collapsed={this.state.collapsed}
                    >
                        <div className="logo" />
                        {/* 左侧导航 */}
                        <Menus />
                    </Sider>
                    <Layout>
                        <Header style={{ background: '# ', padding: 0 }}>
                            <span style={{color:'#fff', paddingLeft:'2%', fontSize:'1.4em'}}>
                                <Icon
                                    className="trigger"
                                    type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
                                    onClick={this.toggle}
                                    style={{cursor: 'pointer'}}
                                />
                            </span>
                            <span style={{color:'#fff', paddingLeft:'2%', fontSize:'1.4em'}}>新园素后台管理系统</span>
                            <span style={{color:'#fff', float:'right', paddingRight:'3%'}}>
                                <Badge count={3} offset={[20, -16]}>
                                    <Icon type="message" size="large" style={{fontSize: 36,position: 'absolute', top: -21, left: -10}} />
                                </Badge>
                                
                                <Avatar size="large" icon="user" style={{marginLeft: 46}} />
                                {/* <img src={logo} className="App-logo" alt="logo" /> */}
                            </span>
                        </Header>
                        <Content style={{ margin: '0 16px'}}>
                            {/* 内容区上的小导航栏 */}
                            <Breadcrumbs />
                            {/* 内容区域出现滚动条：height: 780, overflowY: 'auto' */}
                            <div style={{ background: '#fff', height: 780, overflowY: 'auto', position: 'relative'}}>
                                {/* 内容区域的路由 */}
                                <Routers />
                            </div>
                        </Content>
                        <Footer style={{ textAlign: 'center' }}>
                            {/* 尾部标题 */}
                            Ant Design ©2018 Created by Ant UED
                        </Footer>
                    </Layout>
                </Layout>
            </BrowserRouter>
        );
    }
}   
 //输出组件
export default App;