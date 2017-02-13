/**
* @fileOverview api.detail.view.js 接口列表
* @author 徐晨 ( xuchen@smartisan.com )
* @date：2016-07-27
* @update：2016-07-27
*/

'use strict';

import React, { Component, PropTypes } from 'react';
import { render } from 'react-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as apiAction from './../actions/api.action';
import * as roomAction from './../actions/room.action';

import { ApiService } from './../service/api.service';

import { ApiListSidebarView } from './../components/api/api.list.sidebar.view';
import { ApiSidebarItemCom } from './../components/api/api.sidebar.item.com';
import { ApiOperationEditDetailCom } from './../components/api/api.operation.edit.detail.com';

/**
 * @author 徐晨
 * @name ApiDetailView
 * @class API Detail View
 * @constructor
 */
class ApiDetailView extends Component {

    // 静态数据
    state = {};

    constructor (props) {
        super(props);

        this.handleOpenApiList = this.handleOpenApiList.bind(this);
        this.handleChooseBackupDetail = this.handleChooseBackupDetail.bind(this);
        this.handleRemoveBackupDetail = this.handleRemoveBackupDetail.bind(this);
        this.handleSaveDetail = this.handleSaveDetail.bind(this);
        this.openCreateDetailView = this.openCreateDetailView.bind(this);
        this.openUpdateDetailView = this.openUpdateDetailView.bind(this);
    }

    render () {
        const { apiList, apiData, apiDetail, roomList } = this.props;

        return (
            <div className="page-api-detail js-page-api-detail" ref="mainContent">
                <div className="api-header">{apiData.name}</div>
                <div className="api-content">
                    {this.viewApiDetail(apiData)}
                    <div className="api-detail-view" ref="detailView"></div>
                    <div className="api-operation-view" ref="operationView">
                        <dl className="api-operation-btn-list">
                            <dt>API Data</dt>
                            <dd>
                                <a href={`#/api/update/${apiData.GUID}`}>修改当前 API Data</a>
                            </dd>
                            <dd>
                                <a href={`#/api/update/${apiData.GUID}?type=api`}>修改当前 API Data apiUrl</a>
                            </dd>
                            <dd>删除当前 API Data</dd>
                            <dt>API Detail</dt>
                            <dd onClick={this.openCreateDetailView}>新建 API Detail</dd>
                            <dd onClick={this.openUpdateDetailView}>修改当前 API Detail</dd>
                            <dd onClick={this.handleRemoveBackupDetail}>删除当前 API Detail</dd>
                        </dl>
                    </div>
                    <ApiOperationEditDetailCom
                        apiData={apiData}
                        apiDetail={apiDetail}
                        handleSaveDetail={this.handleSaveDetail}
                        ref="updateDetailView"
                    />
                </div>
                <ApiListSidebarView list={apiList} curGUID={apiData.GUID} />
            </div>
        );
    }

    viewApiDetail (apiData) {
        if ( !apiData.dataList ) {
            return null;
        }

        return (
            <div className="api-detail-list">
                <ul className="">
                {
                    apiData.dataList.map(function (detail) {
                        return (
                            <ApiSidebarItemCom
                                key={detail.GUID}
                                detail={detail}
                                apiData={apiData}
                                handleChooseBackupDetail={this.handleChooseBackupDetail}
                            />
                        );
                    }.bind(this))
                }
                </ul>
            </div>
        );
    }

    /**
     * 开启 API List 面板
     * @author 徐晨 ( xuchen@smartisan.com )
     */
    handleOpenApiList () {

    }

    /**
     * 选择一个数据
     * @author 徐晨 ( xuchen@smartisan.com )
     * @params {GUID}   detailGUID   API Detail GUID
     */
    handleChooseBackupDetail (detailGUID) {
        ApiService.selectBackup({
            apiID: this.props.apiData.GUID,
            tagID: detailGUID
        }).done((result) => {
            this.props.apiActions.selectBackup(detailGUID);
        });
    }

    /**
     * 打开创建数据的 View
     * @author 徐晨 ( xuchen@smartisan.com )
     */
    openCreateDetailView () {
        this.refs.updateDetailView.openView('createDetail');
    }

    /**
     * 打开更新数据的 View
     * @author 徐晨 ( xuchen@smartisan.com )
     */
    openUpdateDetailView () {
        this.refs.updateDetailView.openView('updateDetail');
    }

    /**
     * 新建/保存一个数据
     * @param  {JSON} detailData      数据
     * @param  {String} type          处理方式[create: 新建数据, update: 保存数据]
     */
    handleSaveDetail (detailData, type) {
        switch ( type ) {
            case 'create':
                ApiService.createBackup(detailData).then(
                    (result) => {
                        this.props.apiActions.fetchApiData(this.props.params.id);
                        this.props.apiActions.setApiDetail(detailData.data);
                    }
                );
            break;
            case 'update':
                ApiService.updateBackup(detailData).then(
                    (result) => {
                        this.props.apiActions.fetchApiData(this.props.params.id);
                        this.props.apiActions.setApiDetail(detailData.data);
                    }
                );
            break;
            default:
        }
    }

    /**
     * 删除一个数据
     * @author 徐晨 ( xuchen@smartisan.com )
     * @params {GUID}   detailGUID   API Detail GUID
     */
    handleRemoveBackupDetail () {
        let { apiData } = this.props;
        let dialogConfirm = confirm('是否删除当前数据？');

        dialogConfirm && ApiService.removeBackup({
            apiID: this.props.apiData.GUID,
            tagID: this.props.apiData.usedID
        }).done((curDetailGUID) => {
            this.props.apiActions.removeApiDetail(this.props.apiData.usedID, curDetailGUID);
        });
    }

    componentWillMount () {
        this.props.roomActions.fetchRoomList();
        this.props.apiActions.fetchApiList();
        this.props.apiActions.fetchApiData(this.props.params.id);
    }

    componentWillReceiveProps(nextProps) {
        if (!!nextProps.apiData.usedID && nextProps.apiData.usedID != this.props.apiData.usedID) {
            this.props.apiActions.fetchApiDetail(nextProps.apiData.usedID);
        }

        // 渲染 API 数据
        if (nextProps.apiDetail != this.props.apiDetail) {
            $(this.refs.detailView).JSONView(nextProps.apiDetail);
        }
    }

    componentDidMount () {}
};

function mapStateToProps(state, props) {
    const { apiList, apiData, apiDetail, roomList } = state;

    return {
        apiData,
        apiDetail,
        apiList,
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

ApiDetailView.propTypes = {
    apiData: PropTypes.object.isRequired,
    apiList: PropTypes.array.isRequired
};

export default connect (
    mapStateToProps,
    mapDispatchToProps
)(ApiDetailView);
