import React from 'react';
import './style.css';
import {
    Table, Input, InputNumber, Popconfirm, Form, Row, Col, Button, Select, Pagination
  } from 'antd';

import TablePagination from './tablePagination.jsx'

const Option = Select.Option;
  
  const data = [
    {
      key: 1,
      code: 'daff',
      describe1: 'shizi',
      describe2: 32,
      serial_number1: 'London Park',
      serial_number2: 'daff',
      menu_groups: 'dqa',
      menu_type: '1341'
    }
  ];
  
  const FormItem = Form.Item;
  const EditableContext = React.createContext();
  
  const EditableRow = ({ form, index, ...props }) => (
    <EditableContext.Provider value={form}>
      <tr {...props} />
    </EditableContext.Provider>
  );
  
  const EditableFormRow = Form.create()(EditableRow);

  // 下拉菜单数据
  const menuData = ['收费员1', '收费员2', '收费员3', '收费员4', '收费员5']

  
  class EditableCell extends React.Component {
    getInput = () => {
      // 数字框
      if (this.props.dataIndex === 'number') {
        return <InputNumber />;
      }
      else if (this.props.dataIndex === 'menu_type' || this.props.dataIndex === 'describe1') {
        let data = [];
        if (this.props.dataIndex === 'menu_type') { // 菜单类型
          data = menuData
        } else if (this.props.dataIndex === 'describe1') { // 描述
          data = ["1", "2", "3" ,"4"]
        }
        return(
          <Select
            style={{ width: '100%' }}
            onChange={this.handleProvinceChange}
          >
            {data.map(province => <Option key={province}>{province}</Option>)}
          </Select>
        )
      }
      else {
        return <Input />;
      }
      
    };
  
    render() {
      const {
        editing,
        dataIndex,
        title,
        inputType,
        record,
        index,
        ...restProps
      } = this.props;
      return (
        <EditableContext.Consumer>
          {(form) => {
            const { getFieldDecorator } = form;
            return (
              <td {...restProps}>
                {editing ? (
                  <FormItem style={{ margin: 0 }}>
                    {getFieldDecorator(dataIndex, {
                      rules: [{
                        required: true,
                        message: `Please Input ${title}!`,
                      }],
                      initialValue: record[dataIndex],
                    })(this.getInput())}
                  </FormItem>
                ) : restProps.children}
              </td>
            );
          }}
        </EditableContext.Consumer>
      );
    }
  }
  
export default  class EditableTable extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        // table数据
        data,
        editingKey: '',
        // 主菜单-代码
        code: '',
        // 主菜单-描述
        describe: '',
        detail_editingKey: '',
        // 代码
        detail_code: '',
        // 描述
        detail_describe: '',
        // 总页数
        total: 2
      };

      this.columns = [
        {
          title: '代码',
          dataIndex: 'code',
          editable: true,
        },
        {
          title: '描述',
          dataIndex: 'describe1',
          editable: true,
        },
        {
          title: '英文描述',
          dataIndex: 'describe2',
          editable: true,
        },
        {
          title: '链接地址',
          dataIndex: 'serial_number1',
          editable: true,
        },
        {
          title: '顺序号',
          dataIndex: 'serial_number2',
          editable: true,
        },
        {
          title: '菜单组',
          dataIndex: 'menu_groups',
          editable: true,
        },
        {
          title: '菜单类型',
          dataIndex: 'menu_type',
          editable: true,
        },
        {
          title: '操作',
          dataIndex: 'operation',
          render: (text, record) => {
            const editable = this.isEditing(record);
            return (
              <div>
                {editable ? (
                  <span>
                    <EditableContext.Consumer>
                      {form => (
                        <a
                          href="##"
                          onClick={() => this.save(form, record.key)}
                          style={{ marginRight: 8 }}
                        >
                          <Button type="primary" size="small">保存</Button>
                        </a>
                      )}
                    </EditableContext.Consumer>
                    <Popconfirm
                      title="确定退出编辑?"
                      onConfirm={() => this.cancel(record.key)}
                    >
                      <Button type="ghost" size="small">退出</Button>
                    </Popconfirm>
                  </span>
                ) : (
                  <div>
                    <Button type="dashed" size="small" onClick={() => this.handleCompile(record.key, "main")} style={{marginRight: '6px'}}>编辑</Button>
                    <Popconfirm title="删除不可恢复，你确定要删除吗?" onConfirm={() => this.handleDetele(this, record)} >
                      <Button type="danger" size="small">删除</Button>
                    </Popconfirm>
                  </div>
                )}
              </div>
            );
          },
        },
      ];

      this.detail_columns = [
        {
          title: '代码',
          dataIndex: 'code',
          editable: true,
        },
        {
          title: '描述',
          dataIndex: 'describe',
          editable: true,
        },
        {
          title: '英文描述',
          dataIndex: 'describe1',
          editable: true,
        },
        {
          title: '链接地址',
          dataIndex: 'serial_number6',
          editable: true,
        },
        {
          title: '顺序号',
          dataIndex: 'serial_number5',
          editable: true,
        },
        {
          title: '上级菜单',
          dataIndex: 'describe2',
          editable: true,
        },
        {
          title: '图片地址',
          dataIndex: 'serial_number4',
          editable: true,
        },
        {
          title: 'Tab菜单组',
          dataIndex: 'serial_number3',
          editable: true,
        },
        {
          title: '快捷键',
          dataIndex: 'menu_groups2',
          editable: true,
        },
        {
          title: '弹窗位置',
          dataIndex: 'menu_type',
          editable: true,
        },
        {
          title: '执行后台方法',
          dataIndex: 'serial_number2',
          editable: true,
        },
        {
          title: '参数',
          dataIndex: 'serial_number1',
          editable: true,
        },
        {
          title: '条件表达式',
          dataIndex: 'menu_groups1',
          editable: true,
        },
        {
          title: 'JS方法',
          dataIndex: 'menu_type2',
          editable: true,
        },
        {
          title: '提示信息',
          dataIndex: 'menu_type1',
          editable: true,
        },
        {
          title: '操作',
          dataIndex: 'operation',
          render: (text, record) => {
            const editable = this.detail_isEditing(record);
            return (
              <div>
                {editable ? (
                  <span>
                    <EditableContext.Consumer>
                      {form => (
                        <a
                          href="##"
                          onClick={() => this.save(form, record.key)}
                          style={{ marginRight: 8 }}
                        >
                          <Button type="primary" size="small">保存</Button>
                        </a>
                      )}
                    </EditableContext.Consumer>
                    <Popconfirm
                      title="确定退出编辑?"
                      onConfirm={() => this.detail_cancel(record.key)}
                    >
                      <Button type="ghost" size="small">退出</Button>
                    </Popconfirm>
                  </span>
                ) : (
                  <div>
                    <Button type="dashed" size="small" onClick={() => this.detail_handleCompile(record.key)} style={{marginRight: '6px'}}>编辑</Button>
                    <Popconfirm title="删除不可恢复，你确定要删除吗?" onConfirm={() => this.detail_handleDetele(this, record)} >
                      <Button type="danger" size="small">删除</Button>
                    </Popconfirm>
                  </div>
                )}
              </div>
            );
          },
        },
      ]
    }
    
    // 新增
    handleAdd = (flag) => {
      if (flag === "main") {
        console.log("主菜单")
      } else if(flag === "detail") {
        console.log("菜单明细")
      }
    }

    // 查询
    handleQuery = (flag) => {
      if (flag === "main") {
        console.log(this.state.code)
        console.log(this.state.describe)
      } else if(flag === "detail") {
        console.log(this.state.detail_code)
        console.log(this.state.detail_describe)
      }
    }
  
    isEditing = record => record.key === this.state.editingKey;

    detail_isEditing = record => record.key === this.state.detail_editingKey;
  
    // 主菜单--退出
    cancel = () => {
      this.setState({ editingKey: '' });
    };

    // 菜单明细--退出
    detail_cancel = () => {
      this.setState({ detail_editingKey: '' });
    };


    // 保存
    save(form, key) {
      form.validateFields((error, row) => {
        if (error) {
          return;
        }
        const newData = [...this.state.data];
        const index = newData.findIndex(item => key === item.key);
        if (index > -1) {
          const item = newData[index];
          newData.splice(index, 1, {
            ...item,
            ...row,
          });
          this.setState({ data: newData, editingKey: '' });
        } else {
          newData.push(row);
          this.setState({ data: newData, editingKey: '' });
        }
      });
    }
  
    // 编辑
    handleCompile(key) {
      this.setState({ editingKey: key });
    }

    // 菜单明细编辑
    detail_handleCompile(key) {
      this.setState({ detail_editingKey: key });
    }
    
    // 主菜单--删除
    handleDetele(record) {
      console.log("主菜单--删除:" + record)
    }

    // 菜单明细删除
    detail_handleDetele(record) {
      console.log("菜单明细删除:" + record)
    }

    // 查询条件 --- 代码
    onChangeCode = (e) => {
      this.setState({ code: e.target.value });
    }

    // 查询条件 --- 描述
    onChangeDescribe = (e) => {
      this.setState({ describe: e.target.value });
    }

    // 菜单明细--代码
    onChangeCode_detail = (e) => {
      this.setState({ detail_code: e.target.value });
    }

    // 菜单明细 --- 描述
    onChangeDescribe_detail = (e) => {
      this.setState({ detail_describe: e.target.value });
    }

    // 页码改变的回调，参数是改变后的页码及每页条数
    onChange = (page, pageNumber)=> {
      console.log(page, pageNumber);
    }
  
    render() {
      const components = {
        body: {
          row: EditableFormRow,
          cell: EditableCell,
        },
      };

      const columns = this.columns.map((col) => {
        if (!col.editable) {
          return col;
        }
        return {
          ...col,
          onCell: record => ({
            record,
            dataIndex: col.dataIndex,
            title: col.title,
            editing: this.isEditing(record),
          }),
        };
      });
      
      const detail_columns = this.detail_columns.map((col) => {
        if (!col.editable) {
          return col;
        }
        return {
          ...col,
          onCell: record => ({
            record,
            dataIndex: col.dataIndex,
            title: col.title,
            editing: this.detail_isEditing(record),
          }),
        };
      });
  
      return (
        <div>
          <div className="bg-color"><span>主菜单维护</span></div>
          <div style={{ padding: 24, marginBottom: 24 }}>
            <div className="table-operations" style={{marginBottom: '30px'}}>
                <Row>
                    <Col span={18}>
                        代码：<Input placeholder="请输入" value={this.state.code} style={{width: '150px', marginRight: '10px'}} onChange={this.onChangeCode} />
                        描述：<Input placeholder="请输入" value={this.state.describe} style={{width: '150px', marginRight: '10px'}} onChange={this.onChangeDescribe} />
                    </Col>
                    <Col span={6}>
                      <Button type="primary" className="margiRight16">重置</Button>
                        <Button type="primary" className="margiRight16" onClick={this.handleQuery.bind(this, 'main')}>查询</Button>
                        <Button type="primary" onClick={this.handleAdd.bind(this, 'main')}>新增</Button>
                    </Col>
                </Row>
            </div>
            <div>
              <Table
                components={components}
                dataSource={this.state.data}
                columns={columns}
                rowClassName="editable-row"
                pagination={false}
              />
              {/* 分页: total--总条数  defaultCurrent--默认的当前页 hideOnSinglePage--只有一页时隐藏分页器 */}
              <Pagination size="small" showQuickJumper showSizeChanger defaultCurrent={1} total={this.state.total} onChange={this.onChange} style={{textAlign: "right", marginTop: '10px'}} />,
            </div>
          </div>
          <div className="bg-color"><span>菜单明细维护</span></div>
          <div style={{ padding: 24, marginBottom: 24 }}>
            <div className="table-operations" style={{marginBottom: '30px'}}>
              <Row>
                <Col span={18}>
                    代码：<Input placeholder="请输入" value={this.state.detail_code} style={{width: '150px', marginRight: '10px'}} onChange={this.onChangeCode_detail} />
                    描述：<Input placeholder="请输入" value={this.state.detail_describe} style={{width: '150px', marginRight: '10px'}} onChange={this.onChangeDescribe_detail} />
                </Col>
                <Col span={6}>
                  <Button type="primary" className="margiRight16">重置</Button>
                    <Button type="primary" className="margiRight16" onClick={this.handleQuery.bind(this, "detail")}>查询</Button>
                    <Button type="primary" onClick={this.handleAdd.bind(this, "detail")}>新增</Button>
                </Col>
              </Row>
            </div>
            <TablePagination columns={detail_columns} data={this.state.data} editingKey={this.state.detail_editingKey} />
          </div>
        </div>
      );
    }
  }
  