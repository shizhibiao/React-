import React from 'react';
import { Table, Pagination, Row, Col, Button, Input, Popconfirm } from 'antd';
// import InputText from '../../components/InputText/index.jsx'
import AddRoleMaintenance from './addRoleMaintenance.jsx'
  
export default class User extends React.Component {

    constructor() {
        super();

        this.state = {
            userInfo: {},
            total: 2
        };
        
        this.handleCompile = this.handleCompile.bind(this);
        this.handleDetele = this.handleDetele.bind(this);

        this.columns = [
            { title: '代码', dataIndex: 'address', key: '1' },
            { title: '名称', dataIndex: 'name', key: '2' },
            { title: '头菜单', dataIndex: 'age', key: '3' },
            { title: '测菜单', dataIndex: 'key', key: '4' },
            { title: '主界面', dataIndex: 'address', key: '5' },
            { title: '全部遗嘱', dataIndex: 'address', key: '6' },
            { title: '生效日期', dataIndex: 'address', key: '7' },
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

    // 编辑
    handleCompile(record, index) {
        // 打开抽屉
        console.log(record)
        console.log(index)
    }

    // 删除
    handleDetele(record, index) {
        console.log(record)
        console.log(index)
    }

    // 查询
    handleQuery = () => {
        console.log(111)
    }

    // 新增
    handleAdd = ()=> {
        // 打开抽屉
        this.child.showDrawer()
    }

    // 页码改变的回调，参数是改变后的页码及每页条数
    onChange = (page, pageNumber)=> {
        console.log(page, pageNumber);
    }

    // 调用子组件的连接事件
    onRef = (ref) => {
        this.child = ref
    }

    render() {
        const data = [{
            key: '1',
            name: 'John Brown',
            age: 32,
            address: 'New York Park',
        }, {
            key: '2',
            name: 'Jim Green',
            age: 40,
            address: 'London Park',
        }];
        return (
            <div style={{ padding: 24 }}>
                <div className="table-operations" style={{marginBottom: '30px'}}>
                    <Row>
                        <Col span={18}>
                            代码：<Input placeholder="请输入" style={{width: '150px', marginRight: '10px'}} />
                            名称：<Input placeholder="请输入" style={{width: '150px', marginRight: '10px'}} />
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
                <AddRoleMaintenance onRef={this.onRef} userInfo={this.state.userInfo} />
            </div>
        )
    }
}