import React from 'react';
import { DatePicker, Button } from 'antd';
import './style.css'
import PubSub from 'pubsub-js'

import Moment from 'moment' 

export default class DateRange extends React.Component {
    constructor() {
        super();
        this.state = {
            startValue: null,
            endValue: null,
            startOpen: false,
            endOpen: false
        };
    }
    componentDidMount() {
        // 监听changeDate变化
        PubSub.subscribe("changeDate", (msg, data) => {
            this.closeHandle()
        })
    }

    // 选了开始日期结束日期就不能选择开始日期之前的日期
    disabledStartDate = (startValue) => {
        const endValue = this.state.endValue;
            if (!startValue || !endValue) {
                return false;
            }
        return startValue.valueOf() > endValue.valueOf();
    }
    // 选了结束日期结束日期就不能选择结束日期之后的日期
    disabledEndDate = (endValue) => {
        const startValue = this.state.startValue;
            if (!endValue || !startValue) {
                return false;
            }
        return endValue.valueOf() <= startValue.valueOf();
    }
  
    onChange = (field, value) => {
        this.setState({
            [field]: value,
        });
    }
  
    onStartChange = (value) => {
        this.onChange('startValue', value);
    }
  
    onEndChange = (value) => {
        this.onChange('endValue', value);
    }
    // 进入或者离开时间控件的方法
    handleStartOpenChange = (open) => {
        if (!open) {
            this.setState({ endOpen: true });
            this.setState({ startOpen: false });
        } else {
            this.setState({ startOpen: true });
        }
    }

    // 当弹框关闭时时间控件也关闭
    closeHandle() {
        this.setState({ startOpen: false });
        this.setState({ endOpen: false });
    }
    // 显示结束日期关闭结束开始
    clickStartDate() {
        this.setState({ startOpen: false });
        this.setState({ endOpen: true });
    }
    // 显示开始日期关闭结束日期
    clickEndDate() {
        this.setState({ startOpen: true });
        this.setState({ endOpen: false });
    }
    handleEndOpenChange = (open) => {
        this.setState({ endOpen: open });
    }

    // 一天前
    oneTodayBefore = ()=> {
        if (this.state.endValue) {
            this.onChange('startValue', Moment(this.state.endValue).subtract(1, "days"));
            this.closeHandle()
        }else {
            this.onChange('startValue', Moment().subtract(1, "days"));
            this.clickStartDate()
        }
    }
    // 三天前
    threeDayBefore = () => {
        if (this.state.endValue) {
            this.onChange('startValue', Moment(this.state.endValue).subtract(3, "days"));
            this.closeHandle()
        }else {
            this.onChange('startValue', Moment().subtract(3, "days"));
            this.clickStartDate()
        }
    }
    // 一周前
    oneWeekBefore = () => {
        if (this.state.endValue) {
            this.onChange('startValue', Moment(this.state.endValue).subtract(7, "days"));
            this.closeHandle()
            
        }else {
            this.onChange('startValue', Moment().subtract(7, "days"));
            this.clickStartDate()
        }
    }
    // 一天后
    oneDayBack = () => {
        if (this.state.startValue) {
            this.onChange('endValue', Moment(this.state.startValue).add(1, "days"));
            this.closeHandle()
        }else {
            this.onChange('endValue', Moment().add(1, "days"));
            this.clickEndDate()
        }
    }

    // 三天后
    threeDayBack = () => {
        if (this.state.startValue) {
            this.onChange('endValue', Moment(this.state.startValue).add(3, "days"));
            this.closeHandle()
        }else {
            this.onChange('endValue', Moment().add(3, "days"));
            this.clickEndDate()
        }
    }

    // 七天后
    oneWeekBack = () => {
        if (this.state.startValue) {
            this.onChange('endValue', Moment(this.state.startValue).add(7, 'days')); 
            this.closeHandle()
        }else {
            this.onChange('endValue', Moment().add(7, 'days'));
            this.clickEndDate()
        }
    }
    render() {
        const { startValue, endValue, startOpen, endOpen } = this.state;
        return (
            <div className="date-picker">
                {/* showTime：增加时间功能 */}
                <DatePicker
                    disabledDate={this.disabledStartDate}
                    format="YYYY-MM-DD"
                    value={startValue}  
                    placeholder="开始日期"
                    onChange={this.onStartChange}
                    open={startOpen}
                    // 关闭今天按钮
                    showToday={false}
                    onOpenChange={this.handleStartOpenChange}
                    renderExtraFooter={() => {
                        return(
                            <div className="btnParent">
                                <Button className="dataBtn" onClick={this.oneTodayBefore}>一天前</Button>
                                <Button className="dataBtn" onClick={this.threeDayBefore}>三天前</Button>
                                <Button className="dataBtn" onClick={this.oneWeekBefore}>一周前</Button>
                            </div>
                        )
                    }}
                />
                <DatePicker
                    disabledDate={this.disabledEndDate}
                    format="YYYY-MM-DD"
                    value={endValue}
                    placeholder="结束日期"
                    onChange={this.onEndChange}
                    open={endOpen}
                    // 关闭今天按钮
                    showToday={false}
                    onOpenChange={this.handleEndOpenChange}
                    renderExtraFooter={() => {
                        return(
                            <div className="btnParent">
                                <Button className="dataBtn" onClick={this.oneDayBack}>一天后</Button>
                                <Button className="dataBtn" onClick={this.threeDayBack}>三天后</Button>
                                <Button className="dataBtn" onClick={this.oneWeekBack}>一周后</Button>
                            </div>
                        )
                    }}
                />
            </div>
        );
    }
}