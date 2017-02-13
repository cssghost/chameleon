/**
* @fileOverview home.view.js 首页
* @author 徐晨 ( xuchen@smartisan.com )
* @date：2016-07-14
* @update：2016-07-14
*/

'use strict';

import React from 'react';
import { render } from 'react-dom';
import { Link } from 'react-router';
import { connect } from 'react-redux';

import { apiAction, fetchApiList } from './../actions/api.action';

/**
 * @author 徐晨
 * @name HomeView
 * @class 公共头部
 * @constructor
 */
class HomeView extends React.Component {
    constructor () {
        super();
    }

    render () {
        return (
            <div className="page-home js-page-home">
                <ul className="home-operation">
                    <li>
                        <div className="room-name">
                            <Link to="/api/list" >API List</Link>
                        </div>
                    </li>
                    <li>
                        <div className="room-name">
                            <Link to="/room/list" >Room List</Link>
                        </div>
                    </li>
                    <li>
                        <div className="room-name">
                            <Link to="/help" >Help</Link>
                        </div>
                    </li>
                    <li className="js-update-V2">
                        <div className="room-name">升级旧版本数据</div>
                    </li>
                </ul>
            </div>
        );
    }
};

function mapStateToProps(state) {
    return {
        test: 'test'
    }
}

// export { HomeView };
export default connect(
    mapStateToProps,
)(HomeView);
