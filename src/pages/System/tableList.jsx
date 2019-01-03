import React from 'react';
import { Table, Pagination, Row, Col, Button, Input } from 'antd';

export default class TableList extends React.Component {
    constructor() {
        super();

        this.state = {
            userInfo: {},
            total: 1
        };
    }

    // 查询
    handleQuery = () => {
        console.log(111)
    }

    // 新增
    handleAdd = ()=> {
        // 打开抽屉
        console.log(111)
    }

    // 页码改变的回调，参数是改变后的页码及每页条数
    onChange = (page, pageNumber)=> {
        console.log(page, pageNumber);
    }

    

    render() {
        let {data, columns} = this.props
        return(
            <div style={{padding: "24px"}}>
                <div className="table-operations" style={{marginBottom: '30px'}}>
                    <Row>
                        <Col span={18}>
                            代码：<Input placeholder="请输入" style={{width: '150px', marginRight: '10px'}} />
                            描述：<Input placeholder="请输入" style={{width: '150px', marginRight: '10px'}} />
                        </Col>
                        <Col span={6}>
                            <Button type="primary" className="margiRight16" onClick={this.handleQuery}>查询</Button>
                            <Button type="primary" className="margiRight16" onClick={this.handleAdd}>新增</Button>
                        </Col>
                    </Row>
                </div>
                {/* 表格  bordered---加边框  */}
                <Table columns={columns} dataSource={data} pagination={false} />
                {/* 分页: total--总条数  defaultCurrent--默认的当前页 hideOnSinglePage--只有一页时隐藏分页器 */}
                <Pagination size="small" showQuickJumper showSizeChanger defaultCurrent={1} total={this.state.total} onChange={this.onChange} style={{textAlign: "right", marginTop: '10px'}} />,
            </div>
        )
    }
}