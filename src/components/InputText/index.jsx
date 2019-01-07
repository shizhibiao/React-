import React from 'react';
import PropTypes from 'prop-types'
import { Input } from 'antd';

// 输入框中不得出现^或者#号类似的符号
export default class InputText extends React.Component {
    constructor() {
        super();
        this.state = {
            setValue: null
        }
        this.onKeyUpHandle = this.onKeyUpHandle.bind(this);
    }

    onKeyUpHandle(e) {
        // 匹配^和#，有则为空
        this.setState({setValue: e.target.value.replace(/\^|#/g,'')});
        // 将值传给父组件
        this.props.getData(e.target.value);
    }
    render() {
        const placeholder = this.props.placeholder ? this.props.placeholder : "";
        return(
            <Input 
                placeholder={placeholder}
                value={this.state.setValue}
                type="text"
                onChange={this.onKeyUpHandle.bind(this)}
                style={this.props.style}
            />
        )
    }
}

InputText.propTypes = {
    // 验证属性
    placeholder: PropTypes.string
}