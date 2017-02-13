/**
* @fileOverview api.operation.edit.detail.com.js 更新 API Detail Component
* @author 徐晨 ( xuchen@smartisan.com )
* @date：2016-08-09
* @update：2016-08-09
*/

'use strict';

import React, { Component, PropTypes } from 'react';
import { render } from 'react-dom';

import { VerifyInput } from '../verify/verify.input';
import { VerifyForm } from '../verify/verify.form';

/**
 * @author 徐晨
 * @name ApiOperationEditDetailCom
 * @class 创建/更新 API Detail Component
 * @constructor
 */
class ApiOperationEditDetailCom extends Component {

    // 静态数据
    state = {
        isOpen: false,
        type: 'updateDetail'
    };

    constructor (props) {
        super(props);

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleCloseView = this.handleCloseView.bind(this);
        this.openView = this.openView.bind(this);
    }

    render () {
        const { apiData, apiDetail } = this.props;
        const { isOpen, type } = this.state;
        let formData = {};

        switch ( type ) {
            case 'updateDetail':
                if ( apiData.usedData ) {
                    formData.tag = apiData.usedData.dataName;
                }

                if ( Object.keys(apiDetail).length ) {
                    formData.data = JSON.stringify(apiDetail);
                }

                if ( !formData.tag || !formData.data ) {
                    return null;
                }
            break;
            default:
                formData = {
                    tag: '',
                    data: ''
                };
        }

        return (
            <div className={`operation-update-detail-view ${isOpen ? 'on':''}`}>
                <div className="api-data-panel">
                    <div className="add-table update-panel">
                        <VerifyForm className="table js-add-api-form" ref="updateForm" formData={formData}>

                            <div className="module-form-row">
                                <label className="form-label">数据别名</label>
                                <VerifyInput
                                    type="text"
                                    name="tag"
                                    placeholder="数据别名"
                                    value={formData.tag}
                                    term=":notNull/strRange,{1-10}"
                                    ref="tag"
                                />
                            </div>

                            <div className="module-form-row textarea-item fn-clear">
                                <label className="form-label">新建数据</label>
                                <VerifyInput
                                    type="textarea"
                                    name="data"
                                    placeholder="接口数据"
                                    value={formData.data}
                                    term=":notNull/json"
                                    ref="data"
                                />
                            </div>

                            <div className="button-wrapper">
                                <div className="gray-btn js-cancel-api-data" onClick={this.handleCloseView}>
                                    <a>取消</a>
                                </div>
                                <div className="blue-btn js-add-api-data" onClick={this.handleSubmit}>
                                    <a>保存</a>
                                </div>
                            </div>
                        </VerifyForm>
                    </div>
                    <div className="add-preview js-add-preview"></div>
                </div>
            </div>
        );
    }

    /**
     * 提交表单
     * @author 徐晨 ( xuchen@smartisan.com )
     */
    handleSubmit (event) {
        const { apiData, handleSaveDetail } = this.props;
        const { type } = this.state;
        let postData = this.refs.updateForm.matchAll();

        if ( !!postData ) {
            postData.apiID = apiData.GUID;
            postData.tagID = apiData.usedID;

            switch ( type ) {
                case 'createDetail':
                    console.log('createDetail');
                    handleSaveDetail(postData, 'create');
                    this.handleCloseView();
                break;
                case 'updateDetail':
                    console.log('updateDetail');
                    handleSaveDetail(postData, 'update');
                    this.handleCloseView();
                break;
                default:

            }
        }
    }

    /**
     * 关闭 View
     * @author 徐晨 ( xuchen@smartisan.com )
     */
    handleCloseView (event) {
        this.setState({
            isOpen: false,
            type: ''
        });
    }

    /**
     * 打开 View
     * @author 徐晨 ( xuchen@smartisan.com )
     * @param  {String} type      模块类别
     *                            [createDetail]
     *                            [updateDetail]
     */
    openView (type) {
        let updateState = {
            isOpen: true,
            type
        };

        this.setState(updateState);
    }
};

export { ApiOperationEditDetailCom };
