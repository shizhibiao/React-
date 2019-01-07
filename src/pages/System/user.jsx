import React from 'react';
import {
    Table, Input, InputNumber, Form, Select, Button, Popconfirm
  } from 'antd';
const Option = Select.Option;
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
      else if (this.props.dataIndex === 'menu_type' || this.props.dataIndex === 'describe') {
        let data = [];
        if (this.props.dataIndex === 'menu_type') { // 菜单类型
          data = menuData
        } else if (this.props.dataIndex === 'describe') { // 描述
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
  
  const data = [{
    key: 1,
    code: 'daff',
    describe1: 'shizi',
    describe2: 32,
    serial_number1: 'London Park',
    serial_number2: 'daff',
    menu_groups: 'dqa',
    menu_type: '1341',
    children: [{
        key: 2,
        code: 'daff',
        describe1: 'shizi',
        describe2: 32,
        serial_number1: 'London Park',
        serial_number2: 'daff',
        menu_groups: 'dqa',
        menu_type: '1341'
    }, {
        key: 3,
        code: 'daff',
        describe1: 'shizi',
        describe2: 32,
        serial_number1: 'London Park',
        serial_number2: 'daff',
        menu_groups: 'dqa',
        menu_type: '1341',
        children: [{
            key: 4,
            code: 'daff',
            describe1: 'shizi',
            describe2: 32,
            serial_number1: 'London Park',
            serial_number2: 'daff',
            menu_groups: 'dqa',
            menu_type: '1341'
      }],
    }],
  }, {
    key: 5,
    code: 'daff',
    describe1: 'shizi',
    describe2: 32,
    serial_number1: 'London Park',
    serial_number2: 'daff',
    menu_groups: 'dqa',
    menu_type: '1341'
  }];
  
export default class User extends React.Component {
    constructor() {
        super();
        this.state = {
            data: data,
            editingKey: ''
        }
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
                          <Button type="dashed" size="small" onClick={() => this.handleCompile(record.key)} style={{marginRight: '6px'}}>编辑</Button>
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
    }

    isEditing = record => record.key === this.state.editingKey;

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

      // 主菜单--删除
    handleDetele(record) {
        console.log("主菜单--删除:" + record)
      }

      cancel = () => {
        this.setState({ editingKey: '' });
      };
  
    render() {
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
        const components = {
            body: {
              row: EditableFormRow,
              cell: EditableCell,
            },
        };
        return (
            <div style={{ padding: 24, marginBottom: 24 }}>
                <Table
                    // 行上编辑
                    components={components}
                    // table头部
                    columns={columns}
                    // table数据
                    dataSource={this.state.data}
                    pagination={false}
                />
            </div>
        )
    }
}