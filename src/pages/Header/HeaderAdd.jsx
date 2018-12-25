import React from 'react';
import { 
    Card, Button, Form, Input, DatePicker, Col, TimePicker, Select, InputNumber, Row, Steps, Table
} from 'antd';
import './index.css'
const FormItem = Form.Item;
const Option = Select.Option;
const Step = Steps.Step;

const formItemLayout = {
    labelCol: {span: 4},
    wrapperCol: {span: 20},
};
const formItemLayout2 = {
    labelCol: {span: 2},
    wrapperCol: {span: 22},
}
// table
const columns = [{
    title: 'Name',
    dataIndex: 'name',
    width: 150,
  }, {
    title: 'Age',
    dataIndex: 'age',
    width: 150,
  }, {
    title: 'Address',
    dataIndex: 'address',
  }];
  
  const data = [];
  for (let i = 0; i < 10; i++) {
    data.push({
      key: i,
      name: `Edward King ${i}`,
      age: 32,
      address: `London, Park Lane no. ${i}`,
    });
  }
export default class HeaderAdd extends React.Component {
    render() {
        
        return (
            <div style={{position: 'relative', width: '100%', height: '100%'}}>
                <Card type="inner"
                    id="marginBottom"
                    title="基本信息"
                    extra={<a href="##">More</a>}>
                    <Form>
                        <Row>
                            <Col span={12}>
                                <FormItem
                                    {...formItemLayout}
                                    label="Fail"
                                    >
                                    <Input placeholder="unavailable choice" id="error" />
                                </FormItem>

                                <FormItem
                                    {...formItemLayout}
                                    label="Warning"
                                    >
                                    <Input placeholder="Warning" id="warning" />
                                </FormItem>

                                <FormItem
                                    {...formItemLayout}
                                    label="Validating"
                                    >
                                    <Input placeholder="I'm the content is being validated" id="validating" />
                                </FormItem>

                                <FormItem
                                    {...formItemLayout}
                                    label="Success"
                                    >
                                    <Input placeholder="I'm the content" id="success" />
                                </FormItem>

                                <FormItem
                                    {...formItemLayout}
                                    label="Warning"
                                    >
                                    <Input placeholder="Warning" id="warning" />
                                </FormItem>
                            </Col>
                            <Col span={12}>
                                <FormItem
                                    {...formItemLayout}
                                    label="Fail"
                                    >
                                    <Input placeholder="unavailable choice" id="error" />
                                </FormItem>

                                <FormItem
                                    {...formItemLayout}
                                    label="Success"
                                    hasFeedback
                                    >
                                    <DatePicker style={{ width: '100%' }} />
                                </FormItem>

                                <FormItem
                                    {...formItemLayout}
                                    label="Warning"
                                    hasFeedback
                                    >
                                    <TimePicker style={{ width: '100%' }} />
                                </FormItem>

                                <FormItem
                                    {...formItemLayout}
                                    label="Error"
                                    hasFeedback
                                    >
                                    <Select defaultValue="1">
                                        <Option value="1">Option 1</Option>
                                        <Option value="2">Option 2</Option>
                                        <Option value="3">Option 3</Option>
                                    </Select>
                                </FormItem>

                                <FormItem
                                    {...formItemLayout}
                                    label="Validating"
                                    hasFeedback
                                    >
                                    <Input placeholder="unavailable choice" />
                                </FormItem>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={24}>
                                <FormItem
                                    {...formItemLayout2}
                                    label="Success"
                                    hasFeedback
                                    >
                                    <InputNumber style={{ width: '100%' }} />
                                </FormItem>
                            </Col>
                        </Row>
                    </Form>
                </Card>
                <Card type="inner"
                    id="marginBottom"
                    title="历史记录"
                    extra={<a href="##">More</a>}>
                    <Steps current={1}>
                        <Step title="新建" description="This is a description." />
                        <Step title="初评" description="This is a description." />
                        <Step title="审核" description="This is a description." />
                        <Step title="结束" description="This is a description." />
                    </Steps>
                </Card>
                <Card type="inner"
                    id="marginBottom"
                    title="流程节点"
                    extra={<a href="##">More</a>}>
                    <Table columns={columns} dataSource={data} scroll={{ y: 240 }} pagination={false} />
                </Card>
                <Card type="inner"
                    id="marginBottom">
                    <Button type="primary">提交</Button>
                </Card>
            </div>
        )
    }
}