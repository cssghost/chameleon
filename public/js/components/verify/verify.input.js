/**
* @fileOverview verify.input.js 验证控件 component
* @author 徐晨 ( xuchen@smartisan.com )
* @date：2016-08-22
* @update：2016-08-22
*/

'use strict';

import React, { Component, PropTypes } from 'react';
import { render } from 'react-dom';

import { VerifyService } from './../../service/verify.service';
import { VerifyInputCheckbox } from './verify.checkbox';

/**
 * @author 徐晨
 * @name VerifyInput
 * @class 验证控件
 * @constructor
 */
class VerifyInput extends Component {

    // 静态数据
    state = {
        verified: 0 // [0:未验证, 1:验证成功, 2:验证失败]
    };

    constructor (props) {
        super(props);

        this.handleChangeText = this.handleChangeText.bind(this);
        this.handleChangeCheckbox = this.handleChangeCheckbox.bind(this);
    }

    render () {
        const { type, term, value = '', text = '', options = [], extraClass = '', verifyStatus, ...props } = this.props;

        let verifiedClass = '';

        switch (verifyStatus) {
            case 1:
                verifiedClass = 'form-valid-item';
            break;
            case 2:
                verifiedClass = 'form-invalid-item';
            break;
            default:
        }

        switch ( type ) {
            case 'multiple':
                return (
                    <div className={`form-item ${extraClass} ${verifiedClass}`}>
                        <select
                            className="form-control js-verify"
                            multiple="true"
                            value={value}
                            data-verify={term}
                            onChange={this.handleChangeText}
                            {...props}
                        >
                            {
                                options.map((option) => {
                                    return (
                                        <option value={option.value} key={option.value}>{option.text}</option>
                                    );
                                })
                            }
                        </select>
                    </div>
                );
            break;
            case 'textarea':
                return (
                    <div className={`form-item ${extraClass} ${verifiedClass}`}>
                        <textarea
                            className="form-control js-verify"
                            value={value}
                            data-verify={term}
                            onChange={this.handleChangeText}
                            {...props}
                        ></textarea>
                    </div>
                );
            break;
            case 'select':
                return (
                    <div className={`form-item ${extraClass} ${verifiedClass}`}>
                        <select
                            className="form-control js-verify"
                            value={value}
                            data-verify={term}
                            onChange={this.handleChangeText}
                            {...props}
                        >
                            {
                                options.map((option) => {
                                    return (
                                        <option value={option.value} key={option.value}>{option.text}</option>
                                    );
                                })
                            }
                        </select>
                    </div>
                );
            break;
            /**
             * input:checkbox
             * @param {Array} options          复选框的选项数据
             * @param {String} options.value   复选框的选项值
             * @param {String} options.text    复选框的属性文案
             * @param {JSON} value             复选框的选中数据
             *                                 {
             *                                 	   options.value : [0:未选中, 1:已选中]
             *                                 }
             */
            case 'checkbox':
                return (
                    <div className={`form-item ${extraClass} ${verifiedClass}`}>
                        <ul className="form-checkbox-list fn-clear" {...props}>
                        {
                            options.map((option) => {
                                return (
                                    <VerifyInputCheckbox
                                        key={option.value}
                                        value={option.value}
                                        text={option.text}
                                        checked={value[option.value] == 1}
                                        changeChecked={this.handleChangeCheckbox}
                                    />
                                );
                            })
                        }
                        </ul>
                    </div>
                );
            break;
            default:
                return (
                    <div className={`form-item ${extraClass} ${verifiedClass}`}>
                        <input
                            type={type}
                            className="form-control js-verify"
                            value={value}
                            data-verify={term}
                            onChange={this.handleChangeText}
                            {...props}
                        />
                    </div>
                );
        };
    }

    /**
     * 输入框数据变更的事件
     * @param  {String} value input 控件的值
     */
    handleChangeText (value) {
        value.preventDefault();

        const { name, updateValue } = this.props;

        if (value && value.nativeEvent) {
            value = value.target.value;
        }

        updateValue(name, value, this.props.type);
    }

    /**
     * checkbox 数据变更的事件
     * @param  {String} value input 控件的值
     */
    handleChangeCheckbox (key, value) {
        const { name, updateValue } = this.props;
        console.log(key, value);
        // console.log($(value.currentTarget).attr('key'));
        //
        // const { name, updateValue } = this.props;
        //
        // if (value && value.nativeEvent) {
        //     value = value.target.value;
        // }
        //
        updateValue(name, {key, value}, this.props.type);
    }

    /**
     * 验证输入内容
     * @author 徐晨 ( xuchen@smartisan.com )
     */
    verify (value) {
        const { name } = this.props;

        if (value && value.nativeEvent) {
            value = value.target.value;
        }

        VerifyService.delayInput(name, () => this.parseVer(value) );

        this.props.updateValue(name, value);
    }

    /**
     * 拆分验证条件
     * @author 徐晨 ( xuchen@smartisan.com )
     * @param {String} value 被验证数据
     */
    parseVer (value) {
        const { type, term } = this.props;
        const verData = term.match(/(^.*)\:(.+)/);

        let name, vers, result;

        if ( !!verData ) {
            name = verData[1];
            vers = verData[2].split('/');

            if ( value.trim() == '' ) {

                if ( vers.indexOf('notNull') != -1 ) {
                    this.thrown('必填');
                } else {
                    this.verified();
                }

            } else {
                // for (var i = 0, l = vers.length; i < l; i++) {
                //
                //     result = self.match(val, name, vers[i], $input, useResult);
                //
                //     if ( result != "ajax" && !result ){
                //         break;
                //     }
                // }
            }
        }
    }

    /**
     * 验证成功
     */
    verified () {
        this.setState({verified: 1});
        console.log('verified');
    }

    /**
     * 验证失败
     * @param {String} msg 错误提示文字
     */
    thrown (msg) {
        this.setState({verified: 2});
    }

    componentWillMount () {}

    componentDidMount () {}
};

VerifyInput.propTypes = {
    name: PropTypes.string.isRequired,
    updateValue: PropTypes.func
}

export { VerifyInput };
