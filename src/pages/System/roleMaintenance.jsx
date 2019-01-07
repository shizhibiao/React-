import React from 'react';
import { Table, Pagination, Row, Col, Button, Input, Popconfirm } from 'antd';
// import InputText from '../../components/InputText/index.jsx'
import AddRoleMaintenance from './addRoleMaintenance.jsx'
  
export default class User extends React.Component {

    constructor() {
        super();

        this.state = {
            // tab数据
            userInfo: {},
            // 分页总条数
            total: 2,
            // 代码
            code: '',
            // 名称
            name: ''
        };

        this.handleCompile = this.handleCompile.bind(this);
        this.handleDetele = this.handleDetele.bind(this);

        this.columns = [
            { title: '代码', dataIndex: 'code', key: '1' },
            { title: '名称', dataIndex: 'name', key: '2' },
            { title: '头菜单', dataIndex: 'first_menu', key: '3' },
            { title: '测菜单', dataIndex: 'measuring_menu', key: '4' },
            { title: '主界面', dataIndex: 'main_interface', key: '5' },
            { title: '全部医嘱', dataIndex: 'medical_advice', key: '6'},
            { title: '操作系统代码表', dataIndex: 'effective_date', key: '7' },
            { title: '向所有用户发送消息', dataIndex: 'code', key: '8' },
            { title: '安全级别', dataIndex: 'name', key: '9' },
            { title: '超时时间', dataIndex: 'first_menu', key: '10' },
            { title: '医嘱撤销执行', dataIndex: 'measuring_menu', key: '11' },
            { title: '列编辑权限', dataIndex: 'main_interface', key: '12' },
            { title: '布局权限', dataIndex: 'medical_advice', key: '13'},
            { title: '生效日期', dataIndex: 'effective_date', key: '14' },
            { title: '失效日期', dataIndex: 'effective_date', key: '15' },
            {
              title: '操作',
              key: 'operation',
              fixed: 'right',
              width: 200,
              render: (text,record,index) => (
                <div>
                    <Button type="dashed" size="small" onClick={this.handleCompile.bind(this, record, index)} style={{marginRight: '6px'}} >编辑</Button>
                    {/* onConfirm-- 点击确认的回调*/}
                    <Popconfirm title="删除不可恢复，你确定要删除吗?" onConfirm={this.handleDetele.bind(this, record, index)} >
                        <Button type="danger" size="small">删除</Button>
                    </Popconfirm>
                </div>
              )
            },
        ];
    }

    // 新增
    handleAdd = ()=> {
        // 打开抽屉
        this.child.showDrawer();
        // 初始化数据
        this.setState({userInfo: {}})
    }

    // 编辑
    handleCompile(record, row) {
        console.log(record)
        // 打开抽屉
        this.child.showDrawer();
        // 将值赋值给抽屉
        this.setState({userInfo: record});
    }

    // 删除
    handleDetele(record, row) {
        console.log(record)
    }

    // 查询
    handleQuery = () => {
        console.log(this.state.code)
        console.log(this.state.name)
    }

    // 页码改变的回调，参数是改变后的页码及每页条数
    onChange = (page, pageNumber)=> {
        console.log(page, pageNumber);
    }

    // 调用子组件的连接事件
    onRef = (ref) => {
        this.child = ref
    }
    
    // 查询条件 --- 代码
    onChangeCode = (e) => {
        this.setState({ code: e.target.value });
    }
  
    // 查询条件 --- 描述
    onChangeName = (e) => {
        this.setState({ name: e.target.value });
    }

    render() {
        const data = [{
            key: '1',
            code: '32',
            name: 'John Brown',
            first_menu: 'New York Park',
            measuring_menu: 'sada',
            main_interface: '1212',
            medical_advice: '1',
            effective_date: '2018-10-21'
        }, {
            key: '2',
            code: '40',
            name: 'Jim Green',
            first_menu: 'London Park',
            measuring_menu: 'sada',
            main_interface: '1212',
            medical_advice: '2',
            effective_date: '2018-10-22'
        }];
        let userInfoData = this.state.userInfo;
        return (
            <div style={{ padding: 24 }}>
                <div className="table-operations" style={{marginBottom: '30px'}}>
                    <Row>
                        <Col span={18}>
                            代码：<Input placeholder="请输入" value={this.state.code} style={{width: '150px', marginRight: '10px'}} onChange={this.onChangeCode} />
                            名称：<Input placeholder="请输入" value={this.state.name} style={{width: '150px', marginRight: '10px'}} onChange={this.onChangeName} />
                        </Col>
                        <Col span={6}>
                            <Button type="primary" className="margiRight16" onClick={this.handleQuery}>查询</Button>
                            <Button type="primary" className="margiRight16" onClick={this.handleAdd}>新增</Button>
                        </Col>
                    </Row>
                </div>
                <div>
                    {/* 表格 */}
                    <Table columns={this.columns} dataSource={data} pagination={false} />
                    {/* 分页: total--总条数  defaultCurrent--默认的当前页 hideOnSinglePage--只有一页时隐藏分页器 */}
                    <Pagination size="small" showQuickJumper showSizeChanger defaultCurrent={1} total={this.state.total} onChange={this.onChange} style={{textAlign: "right", marginTop: '20px'}} />,
                </div>
                {/* 抽屉 */}
                <AddRoleMaintenance onRef={this.onRef} userInfo={userInfoData} />
            </div>
        )
    }
}