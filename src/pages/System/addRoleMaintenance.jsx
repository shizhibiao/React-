import React from 'react';
import {
    Drawer, Form, Button, Col, Row, Input, Select, DatePicker, Radio 
} from 'antd';

const { Option } = Select;
const RadioGroup = Radio.Group;

const AddRoleMaintenance = Form.create()(
    // eslint-disable-next-line
    class extends React.Component {

        state = { visible: false };
        
        componentDidMount(){
            this.props.onRef(this)
        }
        // 打开抽屉
        showDrawer = () => {
            this.setState({
              visible: true,
            });
        };
        // 关闭抽屉
        onClose = () => {
            this.setState({
                visible: false,
            });
        };

      render() {
        const { getFieldDecorator } = this.props.form;
        let userInfo = this.props.userInfo? this.props.userInfo : {};
        const formItemLayout = {
            labelCol: {span: 13},
            wrapperCol: {span: 11},
        };
        return (
            <div>
                <Drawer
                    title="新增角色"
                    width={720}
                    onClose={this.onClose}
                    visible={this.state.visible}
                    style={{
                        overflow: 'auto',
                        height: 'calc(100% - 108px)',
                        paddingBottom: '108px',
                    }}
                >
                {/* hideRequiredMark--隐藏所有表单项的必选标记 */}
                <Form layout="vertical" hideRequiredMark>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item label="代码">
                                {getFieldDecorator('name', {
                                    initialValue:userInfo.name,
                                    rules: [{ required: true, message: '请输入' }],
                                })(<Input placeholder="请输入" />)}
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item label="名称">
                                {getFieldDecorator('url', {
                                    initialValue:userInfo.url,
                                    rules: [{ required: true, message: '请输入' }],
                                })(
                                    <Input placeholder="请输入"  />
                                )}
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item label="头菜单">
                                {getFieldDecorator('owner', {
                                    initialValue:userInfo.owner,
                                    rules: [{ required: true, message: '请选择' }],
                                })(
                                    <Select placeholder="请选择">
                                        <Option value="xiao">Xiaoxiao Fu</Option>
                                        <Option value="mao">Maomao Zhou</Option>
                                    </Select>
                                )}
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item label="测菜单">
                                {getFieldDecorator('type', {
                                    initialValue:userInfo.type,
                                    rules: [{ required: true, message: '请选择' }],
                                })(
                                    <Select placeholder="请选择">
                                        <Option value="private">Private</Option>
                                        <Option value="public">Public</Option>
                                    </Select>
                                )}
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item label="安全等级">
                                {getFieldDecorator('grade', {
                                    initialValue:userInfo.grade,
                                    rules: [{ required: true, message: '请选择' }],
                                })(
                                    <Select placeholder="请选择">
                                        <Option value="jack">Jack Ma</Option>
                                        <Option value="tom">Tom Liu</Option>
                                    </Select>
                                )}
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item label="主界面">
                                {getFieldDecorator('approver', {
                                    initialValue:userInfo.approver,
                                    rules: [{ required: true, message: '请选择' }],
                                })(
                                    <Select placeholder="请选择">
                                        <Option value="jack">Jack Ma</Option>
                                        <Option value="tom">Tom Liu</Option>
                                    </Select>
                                )}
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item label="生效日期">
                                {getFieldDecorator('dateTime', {
                                    initialValue:userInfo.dateTime,
                                    rules: [{ required: true, message: '请选择' }],
                                })(
                                    <DatePicker style={{width: '100%'}} />
                                )}
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item label="失效日期">
                                {getFieldDecorator('DateInvalid', {
                                    initialValue:userInfo.DateInvalid,
                                    rules: [{ required: true, message: '请选择' }],
                                })(
                                    <DatePicker style={{width: '100%'}} />
                                )}
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item label="超时时间">
                                {getFieldDecorator('approver', {
                                    initialValue:userInfo.approver,
                                    rules: [{ required: true, message: '请选择' }],
                                })(
                                    <Input placeholder="请输入"  />
                                )}
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item label="是否允许全部医嘱" {...formItemLayout}>
                                {getFieldDecorator('radioGroup1', {
                                    initialValue:userInfo.radioGroup,
                                })(
                                    <RadioGroup>
                                        <Radio value="1">是</Radio>
                                        <Radio value="2">否</Radio>
                                    </RadioGroup>
                                )}
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item label="是否允许操作代码表" {...formItemLayout}>
                                {getFieldDecorator('radioGroup2', {
                                    initialValue:userInfo.radioGroup,
                                })(
                                    <RadioGroup>
                                        <Radio value="1">是</Radio>
                                        <Radio value="2">否</Radio>
                                    </RadioGroup>
                                )}
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item label="是否允许向所有用户发消息" {...formItemLayout}>
                                {getFieldDecorator('radioGroup3', {
                                    initialValue:userInfo.radioGroup,
                                })(
                                    <RadioGroup>
                                        <Radio value="1">是</Radio>
                                        <Radio value="2">否</Radio>
                                    </RadioGroup>
                                )}
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item label="是否允许界面编辑权限" {...formItemLayout} >
                                {getFieldDecorator('radioGroup4', {
                                    initialValue:userInfo.radioGroup,
                                })(
                                    <RadioGroup>
                                        <Radio value="1">是</Radio>
                                        <Radio value="2">否</Radio>
                                    </RadioGroup>
                                )}
                            </Form.Item>
                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={12}>
                            <Form.Item label="是否允许执行状态医嘱" {...formItemLayout}>
                                {getFieldDecorator('radioGroup5', {
                                    initialValue:userInfo.radioGroup,
                                })(
                                    <RadioGroup>
                                        <Radio value="1">是</Radio>
                                        <Radio value="2">否</Radio>
                                    </RadioGroup>
                                )}
                            </Form.Item>
                        </Col>
                        <Col span={12}>
                            <Form.Item label="是否允许列编辑权限" {...formItemLayout}>
                                {getFieldDecorator('radioGroup6', {
                                    initialValue:userInfo.radioGroup,
                                })(
                                    <RadioGroup>
                                        <Radio value="1">是</Radio>
                                        <Radio value="2">否</Radio>
                                    </RadioGroup>
                                )}
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
                <div
                    style={{
                    position: 'absolute',
                    left: 0,
                    bottom: 0,
                    width: '100%',
                    borderTop: '1px solid #e9e9e9',
                    padding: '10px 16px',
                    background: '#fff',
                    textAlign: 'right',
                    }}
                >
                    <Button onClick={this.onClose} style={{ marginRight: 8 }}>
                        返回
                    </Button>
                    <Button onClick={this.onClose} type="primary">
                        保存
                    </Button>
                </div>
                </Drawer>
            </div>
        )
      }
    }
  );
export default AddRoleMaintenance;