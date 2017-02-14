/**
* @fileOverview api.data.view.js 接口列表
* @author 徐晨 ( xuchen@smartisan.com )
* @date：2016-08-29
* @update：2016-08-29
*/

'use strict';

import React, { Component, PropTypes } from 'react';
import { render } from 'react-dom';
import { hashHistory } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as apiAction from './../actions/api.action';
import * as roomAction from './../actions/room.action';

import { VerifyInput } from '../components/verify/verify.input';
import { VerifyForm } from '../components/verify/verify.form';

import { ApiService } from './../service/api.service';

/**
 * @author 徐晨
 * @name ApiDataView
 * @class API Data View
 * @constructor
 */
class ApiDataView extends Component {

    constructor (props) {
        super(props);

        // 静态数据
        this.state = {
            isCreate: !props.params.id
        };

        this.handleCancel = this.handleCancel.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    render () {
        const { apiData, apiGroup, roomList, location } = this.props;

        const type = location.query.type;

        let apiOptions = {
            group: [
                {
                    value: '0',
                    text: '新建分组'
                }
            ],
            rooms: [],
            method: [
                {
                    value: 'post',
                    text: 'POST'
                },
                {
                    value: 'get',
                    text: 'GET'
                }
            ],
            dataType: [
                {
                    value: 'json',
                    text: 'JSON 数据'
                },
                // {
                //     value: 'string',
                //     text: '字符串'
                // },
                // {
                //     value: 'upload',
                //     text: '上传文件'
                // },
                // {
                //     value: 'captcha',
                //     text: '验证码'
                // }
            ]
        };

        let formData = {
            group: 0,
            groupName: '',
            api: '',
            name: '',
            method: 'post',
            contactRoom: {},
            dataType: 'json',
            data:''
        };

        if ( !this.state.isCreate && !apiData.api || !Store.isArray(apiGroup) ) {
            return null;
        }

        if ( !this.state.isCreate ) {
            formData = {
                group: apiData.groupID,
                groupName: '',
                api: apiData.api,
                name: apiData.name,
                method: apiData.method,
                contactRoom: {},
                dataType: apiData.dataType
            }
        }

        apiGroup.map(item => {
            apiOptions.group.push({
                value: item.GUID,
                text: item.name
            });
        });

        roomList.map(item => {
            apiOptions.rooms.push({
                value: item.GUID,
                text: item.name
            });

            formData.contactRoom[item.GUID] = this.state.isCreate
                                            ? 0 : !!apiData.contactRoom[item.GUID];
        });

        return (
            <div className="page-api-data-form" ref="mainContent">
                <div className="api-header">{apiData.name || '创建 API'}</div>
                <div className="api-content">
                    <div className="api-data-panel">
                        <div className="add-table update-panel">
                            <VerifyForm className="table js-add-api-form" ref="updateForm" formData={formData}>

                                {this.moduleGroup(apiOptions.group, formData.group, formData.groupName)}

                                {this.moduleRoom(apiOptions.rooms, formData.contactRoom)}

                                {this.moduleApiName(formData.name)}

                                {this.moduleApiUrl(formData.api)}

                                {this.moduleMethod(apiOptions.method, formData.method)}

                                {this.moduleDatatype(apiOptions.dataType, formData.dataType)}

                                {this.moduleApiData(formData.data)}

                                <div className="button-wrapper">
                                    <div className="gray-btn" onClick={this.handleCancel}>
                                        <a>取消</a>
                                    </div>
                                    <div className="blue-btn" onClick={this.handleSubmit}>
                                        <a>保存</a>
                                    </div>
                                </div>
                            </VerifyForm>
                        </div>
                        <div className="add-preview js-add-preview"></div>
                    </div>
                </div>
            </div>
        );
    }

    /**
     * 分组模块
     */
    moduleGroup (options, selected, value) {
        const type = this.props.location.query.type;

        if ( this.state.isCreate || !type || type == 'group' ) {
            return (
                <div className="module-form-row fn-clear">
                    <label className="form-label">分组名称</label>
                    <VerifyInput
                        type="select"
                        name="group"
                        extraClass="small-item"
                        placeholder="通信类型"
                        options={options}
                        value={selected}
                        ref="group"
                    />
                    <VerifyInput
                        type="text"
                        name="groupName"
                        extraClass="big-item"
                        placeholder="分组名称"
                        value={value}
                        term=":notNull"
                        ref="groupName"
                    />
                </div>
            )
        } else {
            return null;
        }
    }

    /**
     * 应用项目模块
     */
    moduleRoom (options, value) {
        const type = this.props.location.query.type;

        if ( this.state.isCreate || !type || type == 'room' ) {
            return (
                <div className="module-form-row fn-clear">
                    <label className="form-label">应用项目</label>
                    <VerifyInput
                        type="checkbox"
                        name="contactRoom"
                        options={options}
                        value={value}
                        term=":notNull"
                        ref="contactRoom"
                    />
                </div>
            )
        } else {
            return null;
        }
    }

    /**
     * 接口名称模块
     */
    moduleApiName (value) {
        const type = this.props.location.query.type;

        if ( this.state.isCreate || !type || type == 'name' ) {
            return (
                <div className="module-form-row fn-clear">
                    <label className="form-label">接口名称</label>
                    <VerifyInput
                        type="text"
                        name="name"
                        placeholder="接口名称"
                        value={value}
                        term=":notNull"
                        ref="name"
                    />
                </div>
            )
        } else {
            return null;
        }
    }

    /**
     * 接口地址模块
     */
    moduleApiUrl (value) {
        const type = this.props.location.query.type;

        if ( this.state.isCreate || !type || type == 'api' ) {
            return (
                <div className="module-form-row fn-clear">
                    <label className="form-label">接口地址</label>
                    <VerifyInput
                        type="text"
                        name="api"
                        placeholder="接口地址"
                        value={value}
                        term=":notNull"
                        ref="api"
                    />
                </div>
            )
        } else {
            return null;
        }
    }

    /**
     * 通信类型模块
     */
    moduleMethod (options, value) {
        const type = this.props.location.query.type;

        if ( this.state.isCreate || !type ) {
            return (
                <div className="module-form-row fn-clear">
                    <label className="form-label">通信类型</label>
                    <VerifyInput
                        type="select"
                        name="method"
                        placeholder="通信类型"
                        options={options}
                        value={value}
                        term=":notNull"
                        ref="method"
                    />
                </div>
            )
        } else {
            return null;
        }
    }

    /**
     * 数据类型模块
     */
    moduleDatatype (options, value) {
        const type = this.props.location.query.type;

        if ( this.state.isCreate || !type ) {
            return (
                <div className="module-form-row fn-clear">
                    <label className="form-label">数据类型</label>
                    <VerifyInput
                        type="select"
                        name="dataType"
                        placeholder="通信类型"
                        options={options}
                        value={value}
                        term=":notNull"
                        ref="dataType"
                    />
                </div>
            )
        } else {
            return null;
        }
    }

    /**
     * 数据模块
     */
    moduleApiData (value) {

        if ( !this.state.isCreate ) {
            return null
        }

        return (
            <div className="module-form-row textarea-item fn-clear">
                <label className="form-label">新建数据</label>
                <VerifyInput
                    type="textarea"
                    name="data"
                    placeholder="接口数据"
                    value={value}
                    term=":notNull/json"
                    ref="data"
                />
            </div>
        );
    }

    /**
     * 取消新建 / 修改
     */
    handleCancel () {
        if ( this.state.isCreate ) {
            hashHistory.goBack();
        } else {
            hashHistory.push('/api/detail/' + this.props.params.id);
        }
    }

    /**
     * 新建/保存一个数据
     */
    handleSubmit (event) {
        const verData = this.refs.updateForm.matchAll();
        const { apiData } = this.props;
        const type = this.props.location.query.type;

        if ( !verData || verData.group == 0 && verData.groupName == '' ) {
            return;
        }

        let postData = {
            group: verData.group,
            groupName: verData.groupName,
            room: [],
            name: verData.name,
            api: verData.api,
            dataType: verData.dataType,
            method: verData.method,
            apiData: verData.data
        }

        Store.isObject(verData.contactRoom) && $.each(verData.contactRoom, function (key, checked) {
            !!checked && postData.room.push(key);
        });

        if ( postData.room.length ) {
            postData.room = postData.room.join(',');
        }
        // 未选择项目
        else {
            return;
        }

        if ( postData.group != 0 ) {
            delete postData.groupName;
        }

        console.log(postData);

        if ( this.state.isCreate ) {
            ApiService.createApi(postData).then(
                result => {
                    hashHistory.push('/api/detail/' + result.GUID);
                }
            );
        } else {
            postData.GUID = apiData.GUID;

            switch (type) {
                case 'api':
                    console.log('do client update api url');

                    ApiService.updateApiUrl(postData).then(
                        result => {
                            console.log('finish client update api url');
                            hashHistory.push('/api/detail/' + postData.GUID);
                        }
                    );
                break;
                case 'group':
                    console.log('do client update api group');

                    ApiService.updateApiGroup(postData).then(
                        result => {
                            console.log('finish client update api group');
                            hashHistory.push('/api/detail/' + postData.GUID);
                        }
                    );
                break;
                default:

                    // ApiService.saveApi(postData).then(
                    //     result => {
                    //         console.log('finish client save api');
                    //     }
                    // );
            }


        }

    }

    componentWillMount () {
        this.props.roomActions.fetchRoomList();
        this.props.apiActions.fetchApiGroup();
        this.props.params.id && this.props.apiActions.fetchApiData(this.props.params.id);
    }

    componentWillReceiveProps(nextProps) {}

    componentDidMount () {}
};

function mapStateToProps(state, props) {
    const { apiData, apiGroup, roomList } = state;

    return {
        apiData,
        apiGroup,
        roomList
    }
}

/**
 * merge action medth
 */
function mapDispatchToProps(dispatch) {
    return {
        apiActions: bindActionCreators(apiAction, dispatch),
        roomActions: bindActionCreators(roomAction, dispatch)
    }
}

ApiDataView.propTypes = {
    apiData: PropTypes.object.isRequired
};

export default connect (
    mapStateToProps,
    mapDispatchToProps
)(ApiDataView);
