import React from 'react';
import PropTypes from 'prop-types'

import { Modal, Form, Input, Select } from 'antd';

const FormItem = Form.Item;
const Option = Select.Option;

// 下拉菜单数据
const invTypeData = ['挂号', '门诊', '住院', '体检'];
const purchUserData = ['收费员1', '收费员2', '收费员3', '收费员4', '收费员5']

const CollectionCreateForm = Form.create()(
    // eslint-disable-next-line
    class extends React.Component {

      componentDidMount() {
        // console.log(this.props.userInfo)
      }

      render() {
        const {
          visible, onCancel, onCreate, form,
        } = this.props;
        const { getFieldDecorator } = form;
        const formItemLayout = {
          labelCol: {span: 4},
          wrapperCol: {span: 20},
        };
        let userInfo = this.props.userInfo? this.props.userInfo : {}
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
                  {getFieldDecorator('invype', {
                    initialValue:userInfo.invtype,
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
                    initialValue:userInfo.purchUser,
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
                  {getFieldDecorator('preFix', {
                    initialValue:userInfo.preFix,
                    rules: [{ required: true, message: '前缀不能为空' }],
                  })(
                    <Input />
                  )}
                </FormItem>
                <FormItem label="开始号码" {...formItemLayout}>
                  {getFieldDecorator('stNo', {
                    initialValue:userInfo.stNo,
                    rules: [{ required: true, message: '开始号码不能为空' }],
                  })(
                    <Input />
                  )}
                </FormItem>
                <FormItem label="结束号码" {...formItemLayout}>
                  {getFieldDecorator('endNo', {
                    initialValue:userInfo.endNo,
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
export default CollectionCreateForm;

CollectionCreateForm.propTypes = {
  // 验证userInfo的属性
  userInfo: PropTypes.object
}