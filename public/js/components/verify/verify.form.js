/**
* @fileOverview verify.form.js 验证表单 component
* @author 徐晨 ( xuchen@smartisan.com )
* @date：2016-08-22
* @update：2016-08-22
*/

'use strict';

import React, { Children, Component, PropTypes, cloneElement } from 'react';
import { render } from 'react-dom';

import { VerifyInput } from './verify.input';

import { ApiService } from './../../service/api.service.js';

/**
 * @author 徐晨
 * @name VerifyForm
 * @class 验证表单
 * @constructor
 */
class VerifyForm extends React.Component {

    // 静态数据
    state = {};

    constructor (props) {
        super(props);

        const { formData } = props;

        Object.keys(formData).map((key) => {
            this.state[key] = {
                value: formData[key],
                verifyStatus: 0 // [0:未验证, 1:验证成功, 2:验证失败]
            };
        });

        this.updateValue = this.updateValue.bind(this);
    }

    renderChildren (children) {

        return Children.map(children, (child) => {
            if (!child) {
                return null;
            }

            if (typeof child === 'string') {
                return child;
            }

            let props = {};

            if ( child.type === VerifyInput && child.ref ) {
                props.updateValue = this.updateValue;
            }

            if ( child.props.children ) {
                props.children = this.renderChildren(child.props.children);
            }

            // 默认赋值
            if ( this.state[child.props.name] ) {
                props.value = this.state[child.props.name].value;
                props.verifyStatus = this.state[child.props.name].verifyStatus;
            }

            // return child;
            // if (typeof child === 'string') { return child; }
            // let { hintType, readOnly } = child.props;
            // let props = {
            //     hintType: hintType || this.props.hintType,
            //     readOnly: readOnly || disabled,
            //     layout: this.props.layout,
            // };
            // if (child.type === FormControl || child.type.displayName === 'FormItem') {
            //     props.itemBind = this.itemBind;
            //     props.itemUnbind = this.itemUnbind;
            //     props.itemChange = this.itemChange;
            //     props.formData = data;
            // } else if (child.type === FormSubmit) {
            //     props.disabled = disabled;
            //     if (fetchStatus !== FETCH_SUCCESS) {
            //         props.children = getLang('fetch.status')[fetchStatus];
            //     }
            // } else if (child.props.children) {
            //     props.children = this.renderChildren(child.props.children);
            // }
            //

            return cloneElement(child, props);
        });
    }

    render () {
        const { className, formData, children, ...props } = this.props;

        return (
            <div className={className}>
                {this.renderChildren(children)}
            </div>
        );
    }

    /**
     * 验证验证区域内所有的验证项
     * 通过则返回所有区域内所有 input 的值
     * 未通过返回 false
     * @author 徐晨 ( xuchen@smartisan.com )
     * @param {Boolean}     useRock    使用摇一摇
     */
    matchAll () {
        let response = {},
            flag = true;

        Object.keys(this.state).map((key) => {
            // if ( this.state[key].value.trim().length ) {
                // response[key] = this.state[key].value.trim();
                response[key] = this.state[key].value;
            // } else {
                // flag = false;
            // }
        });

        return flag ? response : false;
    }

    updateValue (key, value, type) {
        let updateState = {};

        switch ( type ) {
            case 'multiple':
                const selectOptions = this.state[key].value;

                // 移除已选择的，添加新的
                value = selectOptions.indexOf(value) != -1
                      ? selectOptions.filter((item) => item != value)
                      : selectOptions.concat(value)
            break;
            case 'checkbox':
                let checkboxValue = {};

                checkboxValue[value.key] = value.value;
                value = $.extend({}, this.state[key].value, checkboxValue);
            break;
            default:
        }

        updateState[key] = {
            value,
            verifyStatus: this.state[key].verifyStatus
        };

        this.setState(updateState);
    }

    // 初始化数据
    componentWillReceiveProps(nextProps) {
        let updateState = {},
            flag;

        Object.keys(nextProps.formData).map((key) => {
            if ( this.state[key] ) {

                if ( this.state[key].value != nextProps.formData[key] ) {
                    flag = true;
                }

                updateState[key] = {
                    value: nextProps.formData[key],
                    verifyStatus: this.state[key].verifyStatus
                };
            }
        });

        flag && this.setState(updateState);
    }

    componentWillMount () {}

    componentDidMount () {}
};

export { VerifyForm };
