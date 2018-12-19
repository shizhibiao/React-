import React from 'react';

import './index.css'
import { Table, Row, Col, DatePicker, Button, Modal, Form, Input, Select, notification   } from 'antd';

const FormItem = Form.Item;
const { RangePicker } = DatePicker;
const Option = Select.Option;


// 下拉菜单数据
const invTypeData = ['挂号', '门诊', '住院', '体检'];
const purchUserData = ['收费员1', '收费员2', '收费员3', '收费员4', '收费员5']

const columns = [{
    title: '日期',
    dataIndex: 'purchDate',
  }, {
    title: '前缀',
    dataIndex: 'preFix',
  }, {
    title: '开始号码',
    dataIndex: 'stNo',
  }, {
    title: '结束号码',
    dataIndex: 'endNo',
  }, {
    title: '购入人',
    dataIndex: 'purchUser',
  }, {
    title: '当前可用号码',
    dataIndex: 'curNo',
  }, {
    title: '可用标记',
    dataIndex: 'available',
  }, {
    title: '票据类型',
    dataIndex: 'invtype',
  }, {
    title: '表ID',
    dataIndex: 'rowid',
  }, {
    title: 'Job',
    dataIndex: 'job',
  }, {
    title: '操作',
    dataIndex: 'handle',
  }];

const CollectionCreateForm = Form.create()(
  // eslint-disable-next-line
  class extends React.Component {
    render() {
      const {
        visible, onCancel, onCreate, form,
      } = this.props;
      const { getFieldDecorator } = form;
      const formItemLayout = {
        labelCol: {span: 4},
        wrapperCol: {span: 20},
      };
      return (
        <Modal
          visible={visible}
          title="新增"
          okText="确定"
          onCancel={onCancel}
          onOk={onCreate}
        >
          <Form layout="vertical">
            <FormItem label="票据类型" {...formItemLayout}>
              {getFieldDecorator('invType', {
                rules: [{ required: true, message: '票据类型不能为空' }],
              })(
                <Select
                  style={{ width: '100%' }}
                  onChange={this.handleProvinceChange}
                >
                  {invTypeData.map(province => <Option key={province}>{province}</Option>)}
                </Select>
              )}
            </FormItem>
            <FormItem label="购入人" {...formItemLayout}>
              {getFieldDecorator('purchUser', {
                rules: [{ required: true, message: '购入人不能为空' }],
              })(
                <Select
                  style={{ width: '100%' }}
                  onChange={this.handleProvinceChange}
                >
                  {purchUserData.map(province => <Option key={province}>{province}</Option>)}
                </Select>
              )}
            </FormItem>
            <FormItem label="前缀" {...formItemLayout}>
              {getFieldDecorator('prefix', {
                rules: [{ required: true, message: '前缀不能为空' }],
              })(
                <Input />
              )}
            </FormItem>
            <FormItem label="开始号码" {...formItemLayout}>
              {getFieldDecorator('stNo', {
                rules: [{ required: true, message: '开始号码不能为空' }],
              })(
                <Input />
              )}
            </FormItem>
            <FormItem label="结束号码" {...formItemLayout}>
              {getFieldDecorator('endNo', {
                rules: [{ required: true, message: '结束号码不能为空' }],
              })(
                <Input />
              )}
            </FormItem>
            {/* <FormItem label="Description">
              {getFieldDecorator('description')(<Input type="textarea" />)}
            </FormItem>
            <FormItem className="collection-create-form_last-form-item">
              {getFieldDecorator('modifier', {
                initialValue: 'public',
              })(
                <Radio.Group>
                  <Radio value="public">Public</Radio>
                  <Radio value="private">Private</Radio>
                </Radio.Group>
              )}
            </FormItem> */}
          </Form>
        </Modal>
      );
    }
  }
);

export default class HeaderList extends React.Component {
      state = {
        selectedRowKeys: [], // Check here to configure the default column
        size: 'default',
        // 表格数据
        data: [],
        visible: false,
        confirmDirty: false,
        autoCompleteResult: [],
        rowData: {}
      };
      
      onSelectChange = (selectedRowKeys, selectedRows) => {
        this.setState({ selectedRowKeys });
        // 选中后的行数据
        // console.log(selectedRows[0])
        this.setState({rowData: selectedRows[0]})
      }
      // 挂载完成
      componentDidMount(){
        // 初始化数据
        // this.getData()
      }

      // 查询
      getData() {
        let obj = {
          code: 1003
        }
        fetch('http://172.18.13.23:57772/csp/user/testrest/Mutiple1', {
          method: 'post',
          mode: 'cors',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(obj)
        })
          .then(res => res.json())  ///解析json数据
          .then(result => {
            this.setState({
              data: result.results
            })
            // console.log(this.state.data)
          })
          .catch(e => console.log('错误:', e))   ///请求出错
      }

      // 显示弹出层
      showModal = () => {
        this.setState({
          visible: true,
        });
      }
      
      // 添加
      handleOk = (e) => {
        // console.log(e);
        this.setState({
          visible: false,
        });
      }

      // 取消
      handleCancel = (e) => {
        // console.log(e);
        this.setState({
          visible: false,
        });
      }
      // 确定
      handleCreate = () => {
        const form = this.formRef.props.form;
        form.validateFields((err, values) => {
          if (err) {
            return;
          }
          let obj = {};
          obj.code = 1002;
          obj.results = [];
          obj.results.push(values)
          // fetch axios
          fetch('http://172.18.13.23:57772/csp/user/testrest/Mutiple1', {
            method: 'post',
            mode: 'cors',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(obj)
          })
            .then(res => res.json())  ///解析json数据
            .then(result => {
              if (result.result && result.result[0].errcmsg === '成功') {
                notification.success({
                  // 主标题
                  message: '新增成功',
                  // 子标题
                  // description: 'This is the content of the notification. This is the content of the notification. This is the content of the notification.',
                });
                this.setState({ visible: false });
                this.getData()
              }
              
            })
            .catch(e => console.log('错误:', e))   ///请求出错
          form.resetFields();
        });
      }
    
      saveFormRef = (formRef) => {
        this.formRef = formRef;
      }
      
      // 修改
      compileAction() {
        console.log('111')
        // const form = this.formRef.props.form;
        // form.getFieldDecorator((err, value) => {})
      } 

      render() {
        const { selectedRowKeys, size } = this.state;
        const rowSelection = {
          selectedRowKeys,
          onChange: this.onSelectChange,
          hideDefaultSelections: true,
          onSelection: this.onSelection,
          type: 'radio'
        };
        return (
            <div style={{ padding: 24 }}>
                <div className="table-operations" style={{marginBottom: '30px'}}>
                <Row>
                    <Col span={16}>
                        日期：<RangePicker size={size} />
                    </Col>
                    <Col span={8}>
                        <Button type="primary" className="margiRight20" onClick={this.showModal}>添加</Button>
                        <Button type="primary" className="margiRight20" onClick={this.compileAction.bind(this)}>修改</Button>
                        <Button type="primary" className="margiRight20">删除</Button>
                        <Button type="primary" className="margiRight20" onClick={this.getData.bind(this)}>查询</Button>
                        <Button type="primary">打印明细</Button>
                    </Col>
                </Row>
                </div>
                <Table rowSelection={rowSelection}
                  columns={columns}
                  pagination={{pageSize: 15}}
                  dataSource={this.state.data}
                  rowKey={(record, index) => `complete${record.id}${index}`} />
                <div>
                  <CollectionCreateForm
                      wrappedComponentRef={this.saveFormRef}
                      visible={this.state.visible}
                      onCancel={this.handleCancel}
                      onCreate={this.handleCreate}
                    />
                </div>
            </div>
        );
    }
}