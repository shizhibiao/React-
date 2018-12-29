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
    }
    onKeyUpHandle(e) {
        this.setState({setValue: e.target.value.replace(/\^|#/g,'')})
    }
    render() {
        const placeholder = this.props.placeholder ? this.props.placeholder : "";
        return(
            <Input 
                placeholder={placeholder}
                value={this.state.setValue}
                type="text"
                onChange={this.onKeyUpHandle.bind(this)}
            />
        )
    }
}

InputText.propTypes = {
    // 验证属性
    placeholder: PropTypes.string
}