/**
* @fileOverview react.router.js 静态路由配置文件
* @author 徐晨 ( xuchen@smartisan.com )
* @date：2016-07-14
* @update：2016-07-14
*/

'use strict';

import React from 'react';
import { render } from 'react-dom';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk'

import HomeView from "./biz/home.view";
import ApiListView from "./biz/api.list.view";
import ApiDetailView from "./containers/api.detail.view";
import ApiDataView from "./containers/api.data.view";
import RoomListView from "./biz/room.list.view";

import configureStore from './store/configureStore'

const store = configureStore();
const history = syncHistoryWithStore(hashHistory, store);

let childRoutes = [
    {
        path: '/',
        component: HomeView,
        title: '变色龙代理系统',
    },
    {
        path: '/api/list(/)',
        component: ApiListView,
        title: 'API List',
    },
    {
        path: '/api/detail/:id',
        component: ApiDetailView,
        title: 'API Detail',
    },
    {
        path: '/api/create',
        component: ApiDataView,
        title: '创建 API DATA',
    },
    {
        path: '/api/update/:id',
        component: ApiDataView,
        title: '修改 API DATA',
    },
    {
        path: '/room/list',
        component: RoomListView,
        title: '项目列表',
    }
];

const rootRouter = {
    childRoutes: childRoutes.map(item => {
        return {
            path: item.path,
            component: item.component,
            onEnter: event => {
                document.title = item.title;
            }
        };
    })
};

// render (
//     <Provider store={store}>
//         <div>
//             <Router history={history}>
//                 <Route path="/">
//                     <IndexRoute component={HomeView}/>
//                     <Route path="/api/list" component={ApiListView}/>
//                 </Route>
//             </Router>
//         </div>
//     </Provider>,
//     $('#main').get(0)
// );

render (
    (
        <Provider store={store}>
            <Router
                history={history}
                routes={rootRouter}
            />
        </Provider>
    ),
    $('#main').get(0)
);
