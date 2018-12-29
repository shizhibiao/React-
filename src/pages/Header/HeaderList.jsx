import React from 'react';
import './index.css'
import PubSub from 'pubsub-js'

import CollectionCreateForm from './UserForm.jsx'

import { Table, Row, Col, DatePicker, Button, Modal, notification } from 'antd';
// 时间控件
const { RangePicker } = DatePicker;

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
  }];

export default class HeaderList extends React.Component {
      state = {
        selectedRowKeys: [], // Check here to configure the default column
        size: 'default',
        // 表格数据
        data: [],
        visible: false,
        confirmDirty: false,
        autoCompleteResult: [],
        rowData: [],
        // 保存点击的状态(新增与编辑)
        type: ''
      };
      componentWillUpdate(nextProps, nextState) {
        if(nextState.visible === false) {
          PubSub.publish("changeDate")
        }
      }
      onSelectChange = (selectedRowKeys, selectedRows) => {
        this.setState({ selectedRowKeys });
        // 选中后的行数据
        this.setState({rowData: selectedRows});
      }
      // 挂载完成
      componentDidMount(){
        // 初始化数据
        this.getData()
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

      // 取消
      handleCancel = (e) => {
        let {type} = this.state;
        // 如果是编辑时则需重置输入框
        if (type === 'compile') {
          const form = this.formRef.props.form;
          form.resetFields(); // 重置一组输入控件的值
        }
        // 如果选中一个列，则清空数据
        this.setState({rowData: []})
        // 取消选中
        this.setState({selectedRowKeys: []});
        this.setState({
          visible: false,
        });

        // 当点击取消时关闭时间控件
        
      }
      // 确定
      handleCreate = () => {
        let {type} = this.state;
        const form = this.formRef.props.form;
        if (type === 'add') {
          form.validateFields((err, values) => {
            console.log(values)
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
                  // 关闭弹框
                  this.handleCancel();
                  // 刷新页面数据
                  this.getData()
                }
                
              })
              .catch(e => console.log('错误:', e))   ///请求出错
          });
        } else if (type === 'compile') {
          console.log('编辑中')
        }
      }
    
      saveFormRef = (formRef) => {
        this.formRef = formRef;
      }
      // 添加
      AddAction() {
        // type
        this.setState({type: 'add'})
        // 如果选中一个列，则清空数据
        this.setState({rowData: []})
        // 取消选中
        this.setState({selectedRowKeys: []});
        // 显示弹出框
        this.showModal();
      }
      
      // 修改
      compileAction() {
        if (this.state.rowData.length >= 1) {
          // 保存修改的状态
          this.setState({type: 'compile'})
          // 显示弹出框
          this.showModal();
        } else {
          Modal.info({
            title: '信息',
            content: '请选择一个需要操作的数据'
          })
        }
      } 

      render() {
        const { selectedRowKeys, size } = this.state;
        const rowSelection = {
          // 去掉『全选』『反选』两个默认选项
          hideDefaultSelections: true,
          // 指定选中项的 key 数组，需要和 onChange 进行配合
          selectedRowKeys,
          // 选中项发生变化时的回调
          onChange: this.onSelectChange,
          // 用户手动选择/取消选择所有行的回调
          onSelect: this.onSelectAction,
          // 多选/单选，checkbox or radio
          type: 'radio'
        };
        const listData = [
          {
            purchDate: '2018-08-01',
            preFix: '_120adcd',
            stNo: '12345',
            endNo: '56789',
            purchUser: '张三',
            curNo: '10086',
            available: '231331',
            invtype: '安达充的撒',
            rowid: '121122',
            job: '啊大斗法'
          },
          {
            purchDate: '2018-08-01',
            preFix: '_120adcd',
            stNo: '12345',
            endNo: '56789',
            purchUser: '张三',
            curNo: '10086',
            available: '231331',
            invtype: '安达充的撒',
            rowid: '121122',
            job: '啊大斗法'
          },{
            purchDate: '2018-08-01',
            preFix: '_120adcd',
            stNo: '12345',
            endNo: '56789',
            purchUser: '张三',
            curNo: '10086',
            available: '231331',
            invtype: '安达充的撒',
            rowid: '121122',
            job: '啊大斗法'
          },{
            purchDate: '2018-08-01',
            preFix: '_120adcd',
            stNo: '12345',
            endNo: '56789',
            purchUser: '张三',
            curNo: '10086',
            available: '231331',
            invtype: '安达充的撒',
            rowid: '121122',
            job: '啊大斗法'
          },{
            purchDate: '2018-08-01',
            preFix: '_120adcd',
            stNo: '12345',
            endNo: '56789',
            purchUser: '张三',
            curNo: '10086',
            available: '231331',
            invtype: '安达充的撒',
            rowid: '121122',
            job: '啊大斗法'
          }
        ]
        return (
            <div style={{ padding: 24 }}>
                
                <div className="table-operations" style={{marginBottom: '30px'}}>
                <Row>
                    <Col span={16}>
                        日期：<RangePicker size={size} />
                    </Col>
                    <Col span={8}>
                        <Button type="primary" className="margiRight20" onClick={this.AddAction.bind(this)}>添加</Button>
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
                  // this.state.data
                  dataSource={listData}
                  rowKey={(record, index) => `complete${record.id}${index}`} />
                <div>
                  <CollectionCreateForm
                      wrappedComponentRef={this.saveFormRef}
                      visible={this.state.visible}
                      onCancel={this.handleCancel}
                      onCreate={this.handleCreate}
                      userInfo={this.state.rowData[0]}
                      onRef={this.onRef}
                    />
                </div>
            </div>
        );
    }
}