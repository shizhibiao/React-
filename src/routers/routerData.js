import HeaderList from '../pages/Header/HeaderList.jsx'
import HeaderAdd from '../pages/Header/HeaderAdd.jsx'
import Nav from '../pages/Nav/index.jsx'
import Mine from '../pages/Mine/index.jsx'

// path：路由路径
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
  }
];

export default RouterData