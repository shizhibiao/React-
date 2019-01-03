// 定义导航栏中的数据
const MENUS_DATA = [
    {
        title: '引导页',
        icon: 'global',
        path: '/nav'
    },{
        title: '首页',
        icon: 'home',
        path: '/header',
        subs: [
            {path: '/header/list', title: '列表', icon: 'ordered-list',},
            {path: '/header/add', title: '添加', icon: 'zoom-in',},
        ]
    },{
        title: '我的',
        icon: 'home',
        path: '/mine',
        subs: [
            {path: '/mine/add', title: '添加', icon: 'zoom-in',},
        ]
    },{
        title: '基础数据',
        icon: 'sliders',
        path: '/basic',
        subs: [
            {
                title: '系统资源',
                icon: 'deployment-unit',
                path: '/basic/system',
                subs: [
                    {path: '/basic/system/user', title: '用户', icon: 'user-delete',},
                    {path: '/basic/system/user_maintenance', title: '用户维护', icon: 'usergroup-add',},
                    {path: '/basic/system/role_maintenance', title: '角色维护', icon: 'usergroup-delete',}
                ]
            },
            {path: '/basic/add', title: '添加', icon: 'zoom-in',},
            {path: '/basic/look', title: '查看', icon: 'zoom-in',},
        ]
    }
];

export default MENUS_DATA;