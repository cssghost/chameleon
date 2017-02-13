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
            type = this.props.location.query.type;

        let listView;

        const { apiList, apiGroup } = this.props;

        console.log(apiGroup);

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
                {listView}
            </div>
        );
    }

    viewApiList (list) {
        return (
            <ul className="api-list">
                {
                    list.map(function (api) {
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
