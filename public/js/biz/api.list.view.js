/**
* @fileOverview api.list.view.js 接口列表
* @author 徐晨 ( xuchen@smartisan.com )
* @date：2016-07-14
* @update：2016-07-14
*/

'use strict';

import React, {Component, PropTypes} from 'react';
import { render } from 'react-dom';
import { Link } from 'react-router';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { ApiService } from './../service/api.service.js';
import * as apiAction from './../actions/api.action';

/**
 * @author 徐晨
 * @name HomeView
 * @class 公共头部
 * @constructor
 */
class ApiListView extends Component {

    // 静态数据
    state = {
        apiList: [],
        groups: []
    };

    constructor (props) {
        super(props);
    }

    render () {
        let {  groups } = this.state,
            { type, groupID } = this.props.location.query;

        let listView;

        const { apiList, apiGroup } = this.props;

        switch (type) {
            case 'group':
                listView = this.viewGroups(groups);
            break;
            default:
                listView = this.viewApiList(apiList);
            break;
        }

        return (
            <div className="page-api-list js-page-api-list">
                <div className="api-header">
                    <div className="blue-main-btn normal-main-btn">
                        <Link to="/api/create">创建 API</Link>
                    </div>
                </div>
                <div className="api-content">
                    {this.groupMenu()}
                    {listView}
                </div>
            </div>
        );
    }

    groupMenu () {
        let { groupID, room } = this.props.location.query,
            groupMenuMap = {};

        const { apiList, apiGroup } = this.props;

        apiList.forEach((item, index) => {
            apiGroup.forEach((group, i) => {
                if ( group.apiList[item.GUID] ) {
                    groupMenuMap[group.GUID] = group.name;
                }
            });
        });

        return (
            <ul className="group-menu">
                <li className={`hide-row ${!groupID ? 'selected' : ''}`} key="0">
                    <Link to={`/api/list/?room=${room}`}>全部</Link>
                </li>
                {
                    Object.keys(groupMenuMap).map(key => {
                        const apiListLink = '/api/list/?room=' + room + '&groupID=' + key;

                        return (
                            <li className={`hide-row ${key == groupID ? 'selected' : ''}`} key={key}>
                                <Link to={apiListLink}>{groupMenuMap[key]}</Link>
                            </li>
                        );
                    })
                }
            </ul>
        );
    }

    viewApiList (list) {
        let { groupID } = this.props.location.query,
            listForGroup = [];

        const { apiGroup } = this.props;

        console.log(list);
        console.log(apiGroup);

        if ( groupID && apiGroup.length ) {
            apiGroup.forEach((group, i) => {
                if ( group.GUID == groupID ) {
                    console.log(group);
                    list.forEach(api => {
                        if ( group.apiList[api.GUID] ) {
                            listForGroup.push(api);
                        }
                    });
                }
            });
        } else {
            listForGroup = [].concat(list);
        }

        return (
            <ul className="api-list">
                {
                    listForGroup.map(function (api) {
                        const apiLink = '/api/detail/' + api.GUID;

                        return (
                            <li key={api.GUID}>
                                <Link to={apiLink}>{api.name}</Link>
                            </li>
                        );
                    })
                }
            </ul>
        );
    }

    viewGroups (list) {
        var arr = [];

        arr = list.map(function (group) {
            group.list = [];

            $.each(group.apiList, function(apiGUID, apiName) {
                group.list.push({
                    GUID: apiGUID,
                    name: apiName,
                });
            });

            return group;
        });

        return (
            <ul className="group-list">
                {
                    arr.map(function (group) {
                        return (
                            <li key={group.GUID}>
                                <div className="group-name">{group.name}</div>
                                {
                                    group.list.map(function (api) {
                                        return (<div key={api.GUID}>{api.name}</div>);
                                    })
                                }
                            </li>
                        );
                    })
                }
            </ul>
        );
    }

    // viewOperationBar () {
    //     return (
    //         <div className="fix-operation-bar">
    //             <div className="blue-btn">
    //                 <a>查看详情</a>
    //             </div>
    //             <div className="blue-btn">
    //                 <a>保存</a>
    //             </div>
    //             <div className="blue-btn">
    //                 <a>删除</a>
    //             </div>
    //         </div>
    //     );
    // }

    componentWillMount () {
        const query = this.props.location.query;
        let listFilterData = {};

        if ( query.room ) {
            listFilterData.room = query.room;
        }

        this.props.actions.fetchApiList(listFilterData);
        this.props.actions.fetchApiGroup();
    }

    componentDidMount () {
        // ApiService.getList().done(function (result) {
        //     this.setState({apiList: result.list});
        // }.bind(this));
        //
        // ApiService.getGroups().done(function (result) {
        //     this.setState({groups: result.list});
        // }.bind(this));
    }

};

function mapStateToProps(state, props) {
    const { apiList, apiGroup } = state;

    return {
        apiList,
        apiGroup
    }
}

/**
 * merge action medth
 */
function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(apiAction, dispatch)
    }
}

ApiListView.propTypes = {
    apiList: PropTypes.array.isRequired
};

// export { ApiListView };
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ApiListView);
