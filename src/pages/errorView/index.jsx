import React from 'react';
import './errorView.css'

export default class ErrorView extends React.Component {
    // 返回上一页
    goBack() {
        window.history.go(-1)
    }
    render() {
        return (
            <div className="error-view">
                <div className="error">
                    <h1 className="header">404. 抱歉! 您访问的资源不存在!</h1>
                    <div className="content">
                        <p>
                            <strong>你似乎来到了没有知识存在的荒原…</strong>
                        </p>
                        <p>来源链接是否正确？用户、话题或问题是否存在？</p>
                        <hr />
                        <p>
                            <a href="http://localhost:3000/nav">返回首页</a>
                            <span>或者</span>
                            <a href="##" onClick={this.goBack.bind(this)}>返回上页</a>
                        </p>
                    </div>
                </div>
            </div>
        )
    }
}