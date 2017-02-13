/**
* @fileOverview room.list.view.js 接口列表
* @author 徐晨 ( xuchen@smartisan.com )
* @date：2016-07-14
* @update：2016-07-14
*/
'use strict';

import React, {Component, PropTypes} from 'react';
import { render } from 'react-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { RoomService } from './../service/room.service.js';

import * as roomAction from './../actions/room.action';

function loadData(props) {
    props.actions.fetchRoomList();
}

/**
 * @author 徐晨
 * @name HomeView
 * @class 公共头部
 * @constructor
 */
class RoomListView extends Component {

    constructor () {
        super();

        this.handleOpenOperation = this.handleOpenOperation.bind(this);
        this.handleStartRoom = this.handleStartRoom.bind(this);
    }

    render () {
        const { roomList } = this.props;

        return (
            <div className="page-room-list js-page-room-list" ref="roomList">
                <ul className="room-list js-room-list">
                    {
                        roomList.map((room) => (
                            this.viewRoom(room)
                        ))
                    }
                    {this.viewAddRoom()}
                </ul>
            </div>
        );
    }

    /**
     * room template view
     * @author 徐晨 ( xuchen@smartisan.com )
     * @param  {JSON}   room   room data
     */
    viewRoom (room) {
        const roomClassName = 'room-name js-room-name'
                            + (room.isRun ? ' running' : '');

        const apiLink = '#/api/list/' + room.name;
        return (
            <li className="js-room" key={room.GUID} data-name={room.name} ref="room" onClick={this.handleOpenOperation}>
                <div className="operation">
                    <div className="operation-case js-room-switch" data-status={room.isRun ? 1 : 0} onClick={this.handleStartRoom}>
                        <a>{room.isRun ? "关" : "启"}</a>
                    </div>

                    {this.viewRoomGo(room.isRun)}

                    <div className="operation-case js-room-update">
                        <a>改</a>
                    </div>
                    <div className="operation-case">
                        <a href={`#/api/list/?room=${room.GUID}`} target="_blank">API</a>
                    </div>
                </div>
                <div className={roomClassName}>
                    {room.name}
                </div>
            </li>
        );
    }

    /**
     * add room template view
     * @author 徐晨 ( xuchen@smartisan.com )
     * @param  {JSON}   room   room data
     */
    viewAddRoom () {
        return (
            <li className="js-add-room">
                <div className="update-panel js-update-panel">
                    <div className="update-case">
                        <input type="text" name="name" placeholder="名称" />
                    </div>
                    <div className="update-case">
                        <input type="text" name="port" placeholder="端口" />
                    </div>
                    <div className="update-case">
                            <input type="text" name="path" placeholder="静态目录" />
                        </div>
                </div>
                <div className="room-name">添加项目</div>
            </li>
        );
    }

    /**
     * room 启动后的跳转按钮 view
     * @author 徐晨 ( xuchen@smartisan.com )
     * @param  {Boolean}   isRun   room is run
     */
    viewRoomGo (isRun) {
        if ( isRun ) {
            return (
                <div className="operation-case js-room-go" data-port="{room.port}">
                    <a>GO</a>
                </div>
            );
        }
    }

    /**
     * 开启一个项目的服务
     * @author 徐晨 ( xuchen@smartisan.com )
     */
    handleStartRoom (event) {
        var self = this,
            $button = $(event.currentTarget),
            $room = $button.closest('.js-room'),
            $label = $button.find('a'),
            $show = $room.find('.js-room-name'),
            id = $room.data('name'),
            flag = $button.data('status') | 0;

        if ( !!flag ) {
            RoomService.endRoom(id).done(function (res) {
                $button.next().remove();
                $label.text('启');
                $button.data('status', 0);
                $show.toggleClass('running', false);
            });
        } else {
            RoomService.startRoom(id).done(function (res) {

                // var tpl = ct.get('tempOperationGo', true);

                // $button.after(
                //     ct.compile(tpl, {room : res})
                // );

                $label.text('关');
                $button.data('status', 1);
                $show.toggleClass('running', true);
            });
        }
    }

    componentWillMount () {
        loadData(this.props);
        // RoomService.getList().done(function (result) {
        //     this.setState({roomList: result.list});
        // }.bind(this));
    }

    componentDidMount () {}

    /**
     * 开启操作面板
     * @author 徐晨 ( xuchen@smartisan.com )
     */
    handleOpenOperation (event) {
        const $room = $(event.currentTarget);

        if ( $room.hasClass('on') ) {
            return;
        }

        $room.siblings().toggleClass('disabled-room', true);
        $room.toggleClass('on', true);

        setTimeout(function () {
            $(document).on('click.operation', function (ev) {
                var $btn = $(ev.target);

                if ( $btn.closest('.js-room-switch').length && $btn.closest('.js-room-switch').data('status') == 0
                    // || self.keepOpen && $btn.closest('.js-room').is($room)
                    ) {
                    return;
                }

                // !!self.keepOpen && self.closeUpdatePanel($room);

                // 如果是修改内容，不取消其他 room 的 disabled 样式
                !$btn.closest('.js-room-update').length && $room.siblings().toggleClass('disabled-room', false);

                $room.toggleClass('on', false);
                $(document).off('click.operation');
            });
        }, 0);
    }
};

function mapStateToProps(state, props) {
    const { roomList } = state;

    return {
        roomList
    }
}

/**
 * merge action medth
 */
function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(roomAction, dispatch)
    }
}

RoomListView.propTypes = {
    roomList: PropTypes.array.isRequired
};

// export { RoomListView };
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(RoomListView);
