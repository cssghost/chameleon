/**
* @fileOverview api.list.sidebar.view.js 侧边栏-API 列表
* @author 徐晨 ( xuchen@smartisan.com )
* @date：2016-07-27
* @update：2016-07-27
*/

'use strict';

import React from 'react';
import { render } from 'react-dom';

import { ApiService } from './../../service/api.service.js';

/**
 * @author 徐晨
 * @name HomeView
 * @class 公共头部
 * @constructor
 */
class ApiListSidebarView extends React.Component {

    // 静态数据
    state = {};

    constructor () {
        super();
    }

    render () {
        const { list = [], curGUID } = this.props;

        return (
            <ul className="api-list">
                {
                    list.map(function (api) {

                        return (
                            <li className={`cc ${curGUID == api.GUID ? 'selected' : ''}`} key={api.GUID}>{api.name}</li>
                        );
                    })
                }
            </ul>
        );
    }

    /**
     * 开启 API List 面板
     * @author 徐晨 ( xuchen@smartisan.com )
     */
    handleOpenApiList () {}

    componentWillMount () {}

    componentDidMount () {
    }

};

export { ApiListSidebarView };
