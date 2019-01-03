import HeaderList from '../pages/Header/HeaderList.jsx'
import HeaderAdd from '../pages/Header/HeaderAdd.jsx'
import Nav from '../pages/Nav/index.jsx'
import Mine from '../pages/Mine/index.jsx'
// 基础数据
import User from '../pages/System/user.jsx';
import UserMaintenance from '../pages/System/userMaintenance.jsx';
import RoleMaintenance from '../pages/System/roleMaintenance.jsx';

// path：路由路径
// breadcrumbName: 面包屑的名称
// component：引入的组件

const RouterData = [
  {
    path: '/nav',
    breadcrumbName: [],
    component: Nav
  },
  {
    path: '/header/list',
    breadcrumbName: ["首页", "列表"],
    component: HeaderList
  },
  {
    path: '/header/add',
    breadcrumbName: ["首页", "新增"],
    component: HeaderAdd
  },
  {
    path: '/mine/add',
    breadcrumbName: ["我的", "列表"],
    component: Mine
  },
  {
    path: '/basic/system/user',
    breadcrumbName: ["基础数据", "系统资源", "用户"],
    component: User
  },
  {
    path: '/basic/system/user_maintenance',
    breadcrumbName: ["基础数据", "系统资源", "用户管理"],
    component: UserMaintenance
  },
  {
    path: '/basic/system/role_maintenance',
    breadcrumbName: ["基础数据", "系统资源", "角色管理"],
    component: RoleMaintenance
  }
];

export default RouterData