/**
* @fileOverview api.sidebar.item.com.js 侧边栏-API Item
* @author 徐晨 ( xuchen@smartisan.com )
* @date：2016-08-05
* @update：2016-08-05
*/

'use strict';

import React from 'react';
import { render } from 'react-dom';

/**
 * @author 徐晨
 * @name ApiSidebarItemCom
 * @class API Data 侧边栏 Item
 * @constructor
 */
class ApiSidebarItemCom extends React.Component {

    constructor (props) {
        super(props);

        this.handleChooseData = this.handleChooseData.bind(this);
    }

    viewChooseBtn (isSelected) {

        if ( isSelected ) {
            return (
                <span className="gray-small-btn">已选中</span>
            );
        } else {
            return (
                <span className="blue-small-btn">选中</span>
            );
        }

    }

    render () {
        const { detail, apiData } = this.props;
        const isSelected = detail.GUID == apiData.usedID;

        return (
            <li className={`hide-row ${isSelected ? 'selected' : ''}`} onClick={this.handleChooseData}>
                {this.viewChooseBtn(isSelected)}
                {detail.dataName}
            </li>
        );
    }

    /**
     * 选择一个数据
     * @author 徐晨 ( xuchen@smartisan.com )
     */
    handleChooseData (event) {
        const { detail, apiData } = this.props;

        detail.GUID != apiData.usedID && this.props.handleChooseBackupDetail(detail.GUID);
    }
};

export { ApiSidebarItemCom };
