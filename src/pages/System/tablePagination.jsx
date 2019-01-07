import React from 'react';
import { Table, Form, Select, InputNumber, Input } from 'antd';

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
        data = []
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

// 需要外部传递columns， data， editingKey
export default class TablePagonation extends React.Component {

  

  isEditing = record => record.key === this.props.editingKey;

  render() {
      const components = {
          body: {
            row: EditableFormRow,
            cell: EditableCell,
          },
      };
      
      const columns = this.props.columns ? this.props.columns.map((col) => {
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
      }) : [];
    
      return (
        <div>
            <Table
            components={components}
            dataSource={this.props.data}
            columns={columns}
            rowClassName="editable-row"
            pagination={false}
          />
        </div>
      )
  }
}