import React from 'react';
import { Card } from 'antd';
import './index.css'

export default class HeaderAdd extends React.Component {
    render() {
        return (
            <div>
                <Card type="inner"
                    className="marginBottom"
                    title="基本信息"
                    extra={<a href="##">More</a>}>
                    <p>Hello World!</p>
                    <p>Hello World!</p>
                    <p>Hello World!</p>
                    <p>Hello World!</p>
                </Card>
                <Card type="inner"
                    className="marginBottom"
                    title="流程节点"
                    extra={<a href="##">More</a>}>
                    <p>Hello World!</p>
                    <p>Hello World!</p>
                    <p>Hello World!</p>
                    <p>Hello World!</p>
                    <p>Hello World!</p>
                    <p>Hello World!</p>
                    <p>Hello World!</p>
                    <p>Hello World!</p>
                </Card>
            </div>
        )
    }
}