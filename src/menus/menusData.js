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
        title: '官网',
        icon: 'crown',
        path: '/sub2',
        subs: [
            {
                title: '子官网',
                icon: '',
                path: '/sub2/child',
                subs: [
                    {path: '/sub2/child/add', title: '添加', icon: 'zoom-in',},
                    {path: '/sub2/child/look', title: '查看', icon: 'zoom-in',},
                ]
            },
            {path: '/sub2/add', title: '添加', icon: 'zoom-in',},
            {path: '/sub2/look', title: '查看', icon: 'zoom-in',},
        ]
    }
];

export default MENUS_DATA;