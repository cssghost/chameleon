/**
* @fileOverview verify.checkbox.js checkbox 控件 component
* @author 徐晨 ( xuchen@smartisan.com )
* @date：2016-08-31
* @update：2016-08-31
*/

'use strict';

import React, { Component, PropTypes } from 'react';
import { render } from 'react-dom';

/**
 * @author 徐晨
 * @name VerifyInput
 * @class 验证控件
 * @constructor
 */
class VerifyInputCheckbox extends Component {

    constructor (props) {
        super(props);

        this.handleChange = this.handleChange.bind(this);
    }

    render () {
        const { value, text, checked } = this.props;

        let verifiedClass = '';
        return (
            <li
                className={`form-control form-checkbox ${checked ? 'checked' : ''}`}
                onClick={this.handleChange}
            >
                {text}
            </li>
        );
    }

    /**
     * checkbox 数据变更的事件
     */
    handleChange () {
        const { value, checked, changeChecked } = this.props;
        changeChecked(value, !checked);
    }

    componentWillMount () {}

    componentDidMount () {}
};

// VerifyInputCheckbox.propTypes = {
//     checked: PropTypes.Boolean.isRequired,
//     changeChecked: PropTypes.func
// }

export { VerifyInputCheckbox };
