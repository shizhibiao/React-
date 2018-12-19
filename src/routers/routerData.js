import HeaderList from '../pages/Header/HeaderList.jsx'
import HeaderAdd from '../pages/Header/HeaderAdd.jsx'
import Nav from '../pages/Nav/index.jsx'
import Mine from '../pages/Mine/index.jsx'

// path：路由路径
// keys：刷新页面时左侧导航栏默认选中的标识
// defaultOpenKeys: 初始展开的 SubMenu 菜单项 key 数组(页面刷新后子菜单的父级展示)
// breadcrumbName：面包屑的需要显示的字符
// component：引入的组件

const RouterData = [
  {
    path: '/nav',
    keys: ['nav'],
    breadcrumbName: ['引导'],
    component: Nav
  },
  {
    path: '/header/list',
    keys: ['headers', 'headerList'],
    defaultOpenKeys: ['headers'],
    breadcrumbName: ['首页', '列表'],
    component: HeaderList
  },
  {
    path: '/header/add',
    keys: ['headers', 'headerAdd'],
    defaultOpenKeys: ['headers'],
    breadcrumbName: ['首页', '添加'],
    component: HeaderAdd
  },
  {
    path: '/mine',
    keys: ['mine','mineAdd'],
    defaultOpenKeys: ['mine'],
    breadcrumbName: ['我的', '添加'],
    component: Mine
  }
];

export default RouterData