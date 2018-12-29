import React from 'react';
import PropTypes from 'prop-types';

import InputText from '../../components/InputText/index.jsx';
import InputNumber from '../../components/InputNumber/index.jsx';
import DateRange from '../../components/DatePicker/index.jsx';

import { Modal, Form, Select } from 'antd';

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
                  })(
                    <DateRange />
                  )}
                </FormItem>
                <FormItem label="开始号码" {...formItemLayout}>
                  {getFieldDecorator('stNo', {
                    initialValue:userInfo.stNo,
                  })(
                    <InputText />
                  )}
                </FormItem>
                <FormItem label="结束号码" {...formItemLayout}>
                  {getFieldDecorator('endNo', {
                    initialValue:userInfo.endNo,
                  })(
                    <InputNumber type="int" />
                  )}
                </FormItem>
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