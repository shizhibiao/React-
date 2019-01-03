import React from 'react';
import PropTypes from 'prop-types'
import { Input } from 'antd';
import "./style.css"

export default class InputNumber extends React.Component {
    constructor() {
        super();
        this.state = {
            setValue: null
        }
    }
    // 正整数(＋1，＋2，＋3)： positiveInt
    // 整数(正整数、0、负整数)： int  
    // 浮点数：float
    onKeyUpHandle(e) {
        let {type} = this.props;
        if (type === 'positiveInt') {
            this.setState({setValue: e.target.value.replace(/^((-\d+)|(0+)|(\.\d+))$/g,'')})
        } else if (type === 'int') {
            this.setState({setValue: e.target.value.replace(/\./g,'')})
        } else if (type === 'float') {
            this.setState({setValue: e.target.value.replace(/\/[^(-?\\d+)(\\.\\d+)?$]/g,'')})
        } else {
            this.setState({setValue: e.target.value.replace(/\D/g,'')})
        }
        
    }
    render() {
        const placeholder = this.props.placeholder ? this.props.placeholder : "";
        return(
            <Input 
                placeholder={placeholder}
                value={this.state.setValue}
                type="number"
                className="input-number"
                onChange={this.onKeyUpHandle.bind(this)}
                style={this.props.style}
            />
        )
    }
}

InputNumber.propTypes = {
    // 验证属性
    placeholder: PropTypes.string,
    type: PropTypes.string
  }